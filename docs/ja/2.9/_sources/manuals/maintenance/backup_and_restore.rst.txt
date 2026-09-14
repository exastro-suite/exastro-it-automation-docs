============================
データバックアップ・リストア
============================

目的
====

| 本書では、Exastroシステムで利用する永続データのバックアップとリストア手順について説明します。
| パブリッククラウドの仕組みにより、データバックアップの仕組みが利用可能であればそちらを利用しても問題ありません。


前提条件
========

| 本頁で紹介するバックアップ・リストア手順では、下記の前提条件を満たしている必要があります。

条件
----

- | 下記のコマンドが利用可能なこと

  - :command:`tar`
  - :command:`kubectl`

- | 作業環境のサーバで充分なディスクの空き容量があること

.. _backup_encrypt_key:

暗号化キーのバックアップ
------------------------

.. include:: ../../include/backup_encrypt_key_k8s.rst

概要
====

| バックアップ・リストア対象となるデータは下記の3つです。

- | バックアップ・リストア対象

  - Exastro Platform のデータベース
  - Exastro IT Automation のデータベース
  - Exastro IT Automation の共有ファイル
  - Exastro IT Automation OASE のMongoDB

| これらのデータを :command:`kubectl` コマンドを利用してバックアップ・リストアします。

| 作業の流れは、まず、ユーザからのデータの書き込みを制限するために、リバースプロキシを停止します。
| 次にバックヤード処理を停止し、データのバックアップを実施します。
| 最後に、作業前の数に Pod 数を戻します。

| リストアの際の作業も同様の流れになります。

.. danger::
  | 本手順では、サービスの停止が発生します。

バックアップ
============

サービス停止
------------

.. include:: ../../include/stop_service_k8s_backup.rst

バックアップ
------------

| Exastro システム内で、Exastro Platform と Exastro IT Automation でデータベースを共有するか、分離するかによって手順が異なります。


#. メンテナンス用コンテナの作成

   | データベース、ファイルのバックアップ作業用コンテナの作成をします。

   .. code-block:: bash
      :caption: コマンド
      :linenos:

      cat <<_EOF_ | kubectl apply -f - --namespace exastro
      apiVersion: v1
      kind: Pod
      metadata:
        name: exastro-maintenance
        namespace: exastro
      spec:
        containers:
        - command:
          - sh
          - -c
          args:
          - |
            #!/bin/bash
            sleep 3600
          env:
          - name: PF_DB_DATABASE
            valueFrom:
              configMapKeyRef:
                key: DB_DATABASE
                name: platform-params-pf-database
          - name: PF_DB_HOST
            valueFrom:
              configMapKeyRef:
                key: DB_HOST
                name: platform-params-pf-database
          - name: PF_DB_PORT
            valueFrom:
              configMapKeyRef:
                key: DB_PORT
                name: platform-params-pf-database
          - name: PF_DB_ADMIN_PASSWORD
            valueFrom:
              secretKeyRef:
                key: DB_ADMIN_PASSWORD
                name: platform-secret-pf-database
          - name: PF_DB_ADMIN_USER
            valueFrom:
              secretKeyRef:
                key: DB_ADMIN_USER
                name: platform-secret-pf-database
          - name: ITA_DB_DATABASE
            valueFrom:
              configMapKeyRef:
                key: DB_DATABASE
                name: ita-params-ita-database
          - name: ITA_DB_HOST
            valueFrom:
              configMapKeyRef:
                key: DB_HOST
                name: ita-params-ita-database
          - name: ITA_DB_PORT
            valueFrom:
              configMapKeyRef:
                key: DB_PORT
                name: ita-params-ita-database
          - name: ITA_STORAGEPATH
            valueFrom:
              configMapKeyRef:
                key: STORAGEPATH
                name: ita-params-ita-global
          - name: ITA_DB_ADMIN_PASSWORD
            valueFrom:
              secretKeyRef:
                key: DB_ADMIN_PASSWORD
                name: ita-secret-ita-database
          - name: ITA_DB_ADMIN_USER
            valueFrom:
              secretKeyRef:
                key: DB_ADMIN_USER
                name: ita-secret-ita-database
          image: mariadb:10.9
          imagePullPolicy: IfNotPresent
          name: exastro-maintenance
          resources: {}
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: false
            runAsGroup: 1000
            runAsNonRoot: true
            runAsUser: 1000
          volumeMounts:
          - mountPath: /storage
            name: volume-ita-backup-storage
        volumes:
        - name: volume-ita-backup-storage
          persistentVolumeClaim:
            claimName: pvc-ita-global
        restartPolicy: Always
        securityContext: {}
        serviceAccount: default
        serviceAccountName: default
      _EOF_

   | インストール時に設定したMongoDBを利用している場合、MongoDBのバックアップ作業用コンテナの作成をします。

   .. code-block:: bash
      :caption: コマンド
      :linenos:

      cat <<_EOF_ | kubectl apply -f - --namespace exastro
      apiVersion: v1
      kind: Pod
      metadata:
        name: exastro-oase-maintenance
        namespace: exastro
      spec:
        containers:
        - command:
          - sh
          - -c
          args:
          - |
            #!/bin/bash
            sleep 3600
          env:
          - name: ITA_MONGO_HOST
            valueFrom:
              configMapKeyRef:
                key: MONGO_HOST
                name: ita-params-mongo
          - name: ITA_MONGO_PORT
            valueFrom:
              configMapKeyRef:
                key: MONGO_PORT
                name: ita-params-mongo
          - name: ITA_MONGO_ADMIN_USER
            valueFrom:
              secretKeyRef:
                key: MONGO_ADMIN_USER
                name: ita-secret-mongo
          - name: ITA_MONGO_ADMIN_PASSWORD
            valueFrom:
              secretKeyRef:
                key: MONGO_ADMIN_PASSWORD
                name: ita-secret-mongo
          image: mongo:6.0
          imagePullPolicy: IfNotPresent
          name: exastro-oase-maintenance
          resources: {}
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: false
          volumeMounts:
          - mountPath: /storage
            name: volume-ita-backup-storage
        volumes:
        - name: volume-ita-backup-storage
          persistentVolumeClaim:
            claimName: pvc-ita-global
        restartPolicy: Always
        securityContext: {}
        serviceAccount: default
        serviceAccountName: default
      _EOF_

#. データベースのバックアップ取得

   | データベースに対して :command:`mysqldump` バックアップを取得します。
   | Exastro Platform と Exastro IT Automation でデータベースサーバを共有するか、分離するかによって手順が異なります。

   .. tabs::

      .. group-tab:: データベースサーバを共有

          .. code-block:: bash
             :caption: アプリケーション用データベースバックアップコマンド

             kubectl exec -it exastro-maintenance --namespace exastro -- sh -c 'mysqldump -h ${PF_DB_HOST} -P ${PF_DB_PORT} -u ${PF_DB_ADMIN_USER} -p${PF_DB_ADMIN_PASSWORD} --all-databases --ignore-table=mysql.global_priv --add-drop-table' | gzip > exastro_mysqldump_platform_db_`date +"%Y%m%d-%H%M%S"`.sql.gz

          .. code-block:: bash
             :caption: ユーザ用データベースバックアップコマンド

             kubectl exec -it exastro-maintenance --namespace exastro -- sh -c 'mysqldump -h ${PF_DB_HOST} -P ${PF_DB_PORT} -u ${PF_DB_ADMIN_USER} -p${PF_DB_ADMIN_PASSWORD} --allow-keywords --no-create-info mysql global_priv --where="user NOT IN (\"mariadb.sys\", \"root\", \"keycloak\", \"admin\", \"healthcheck\", \"pf-user\", \"ITA_USER\")"' | gzip > exastro_mysqldump_platform_user_`date +"%Y%m%d-%H%M%S"`.sql.gz

      .. group-tab:: データベースサーバを分離

          .. code-block:: bash
             :caption: Exastro Platform アプリケーション用データベースバックアップコマンド

             kubectl exec -it exastro-maintenance --namespace exastro -- sh -c 'mysqldump -h ${PF_DB_HOST} -P ${PF_DB_PORT} -u ${PF_DB_ADMIN_USER} -p${PF_DB_ADMIN_PASSWORD} --all-databases --ignore-table=mysql.global_priv --add-drop-table' | gzip > exastro_mysqldump_platform_db_`date +"%Y%m%d-%H%M%S"`.sql.gz

          .. code-block:: bash
             :caption: Exastro Platform ユーザ用データベースバックアップコマンド

             kubectl exec -it exastro-maintenance --namespace exastro -- sh -c 'mysqldump -h ${PF_DB_HOST} -P ${PF_DB_PORT} -u ${PF_DB_ADMIN_USER} -p${PF_DB_ADMIN_PASSWORD} --allow-keywords --no-create-info mysql global_priv --where="user NOT IN (\"mariadb.sys\", \"root\", \"keycloak\", \"admin\", \"healthcheck\", \"pf-user\", \"ITA_USER\")"' | gzip > exastro_mysqldump_platform_user_`date +"%Y%m%d-%H%M%S"`.sql.gz

          .. code-block:: bash
             :caption: Exastro IT Automation アプリケーション用データベースバックアップコマンド

             kubectl exec -it exastro-maintenance --namespace exastro -- sh -c 'mysqldump -h ${ITA_DB_HOST} -P ${ITA_DB_PORT} -u ${ITA_DB_ADMIN_USER} -p${ITA_DB_ADMIN_PASSWORD} --all-databases --add-drop-table' | gzip > exastro_mysqldump_ita_db_`date +"%Y%m%d-%H%M%S"`.sql.gz

          .. code-block:: bash
             :caption: Exastro IT Automation ユーザ用データベースバックアップコマンド

             kubectl exec -it exastro-maintenance --namespace exastro -- sh -c 'mysqldump -h ${ITA_DB_HOST} -P ${ITA_DB_PORT} -u ${ITA_DB_ADMIN_USER} -p${ITA_DB_ADMIN_PASSWORD} --allow-keywords --no-create-info mysql global_priv --where="user NOT IN (\"mariadb.sys\", \"root\", \"keycloak\", \"admin\", \"healthcheck\", \"pf-user\", \"ITA_USER\")"' | gzip > exastro_mysqldump_ita_user_`date +"%Y%m%d-%H%M%S"`.sql.gz

#. ファイルのバックアップ取得

   | Exastro IT Automation のファイルのバックアップを取得します。

   .. code-block:: bash
      :caption: コマンド

      kubectl exec -i exastro-maintenance --namespace exastro -- sh -c 'tar zcvf - ${ITA_STORAGEPATH}' > exastro_storage_backup_ita_`date +"%Y%m%d-%H%M%S"`.tar.gz

#. MongoDBのバックアップ取得

   | OASEでインストール時に設定したMongoDBを利用している場合、MongoDBに対して :command:`mongodump` バックアップを取得します。

   .. code-block:: bash
      :caption: コマンド

      kubectl exec -it exastro-oase-maintenance --namespace exastro -- sh -c 'mongodump --host=${ITA_MONGO_HOST} --port=${ITA_MONGO_PORT} --username=${ITA_MONGO_ADMIN_USER} --password=${ITA_MONGO_ADMIN_PASSWORD} --out=/storage/exastro_mongodump'

   .. code-block:: bash

      sudo tar cvfz ~/exastro_mongodump_`date +"%Y%m%d-%H%M%S"`.tar.gz --directory=/var/data/exastro-suite/exastro-it-automation/ita-common exastro_mongodump --remove-files

#. メンテナンス用コンテナの削除

   | バックアップ作業用コンテナを削除します。

   .. code-block:: bash
      :caption: コマンド

      kubectl delete pod exastro-maintenance --namespace exastro

   | ※MongoDBを利用している場合

   .. code-block:: bash

      kubectl delete pod exastro-oase-maintenance --namespace exastro

サービス再開
------------

.. include:: ../../include/start_service_k8s_backup.rst


リストア
========

.. _check_replica_count_restore:

サービス停止
------------

.. include:: ../../include/stop_service_k8s_backup.rst

リストア
--------

| Exastro システム内で、Exastro Platform と Exastro IT Automation でデータベースを共有するか、分離するかによって手順が異なります。

#. メンテナンス用コンテナの作成

   | データベース、ファイルのリストア作業用コンテナの作成をします。

   .. code-block:: bash
      :caption: コマンド
      :linenos:

      cat <<_EOF_ | kubectl apply -f - --namespace exastro
      apiVersion: v1
      kind: Pod
      metadata:
        name: exastro-maintenance
        namespace: exastro
      spec:
        containers:
        - command:
          - sh
          - -c
          args:
          - |
            #!/bin/bash
            sleep 3600
          env:
          - name: PF_DB_DATABASE
            valueFrom:
              configMapKeyRef:
                key: DB_DATABASE
                name: platform-params-pf-database
          - name: PF_DB_HOST
            valueFrom:
              configMapKeyRef:
                key: DB_HOST
                name: platform-params-pf-database
          - name: PF_DB_PORT
            valueFrom:
              configMapKeyRef:
                key: DB_PORT
                name: platform-params-pf-database
          - name: PF_DB_ADMIN_PASSWORD
            valueFrom:
              secretKeyRef:
                key: DB_ADMIN_PASSWORD
                name: platform-secret-pf-database
          - name: PF_DB_ADMIN_USER
            valueFrom:
              secretKeyRef:
                key: DB_ADMIN_USER
                name: platform-secret-pf-database
          - name: ITA_DB_DATABASE
            valueFrom:
              configMapKeyRef:
                key: DB_DATABASE
                name: ita-params-ita-database
          - name: ITA_DB_HOST
            valueFrom:
              configMapKeyRef:
                key: DB_HOST
                name: ita-params-ita-database
          - name: ITA_DB_PORT
            valueFrom:
              configMapKeyRef:
                key: DB_PORT
                name: ita-params-ita-database
          - name: ITA_STORAGEPATH
            valueFrom:
              configMapKeyRef:
                key: STORAGEPATH
                name: ita-params-ita-global
          - name: ITA_DB_ADMIN_PASSWORD
            valueFrom:
              secretKeyRef:
                key: DB_ADMIN_PASSWORD
                name: ita-secret-ita-database
          - name: ITA_DB_ADMIN_USER
            valueFrom:
              secretKeyRef:
                key: DB_ADMIN_USER
                name: ita-secret-ita-database
          image: mariadb:10.9
          imagePullPolicy: IfNotPresent
          name: exastro-maintenance
          resources: {}
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: false
            runAsGroup: 1000
            runAsNonRoot: true
            runAsUser: 1000
          volumeMounts:
          - mountPath: /storage
            name: volume-ita-backup-storage
        volumes:
        - name: volume-ita-backup-storage
          persistentVolumeClaim:
            claimName: pvc-ita-global
        restartPolicy: Always
        securityContext: {}
        serviceAccount: default
        serviceAccountName: default
      _EOF_

   | インストール時に設定したMongoDBを利用している場合、MongoDBのリストア作業用コンテナの作成をします。

   .. code-block:: bash
      :caption: コマンド
      :linenos:

      cat <<_EOF_ | kubectl apply -f - --namespace exastro
      apiVersion: v1
      kind: Pod
      metadata:
        name: exastro-oase-maintenance
        namespace: exastro
      spec:
        containers:
        - command:
          - sh
          - -c
          args:
          - |
            #!/bin/bash
            sleep 3600
          env:
          - name: ITA_MONGO_HOST
            valueFrom:
              configMapKeyRef:
                key: MONGO_HOST
                name: ita-params-mongo
          - name: ITA_MONGO_PORT
            valueFrom:
              configMapKeyRef:
                key: MONGO_PORT
                name: ita-params-mongo
          - name: ITA_MONGO_ADMIN_USER
            valueFrom:
              secretKeyRef:
                key: MONGO_ADMIN_USER
                name: ita-secret-mongo
          - name: ITA_MONGO_ADMIN_PASSWORD
            valueFrom:
              secretKeyRef:
                key: MONGO_ADMIN_PASSWORD
                name: ita-secret-mongo
          image: mongo:6.0
          imagePullPolicy: IfNotPresent
          name: exastro-oase-maintenance
          resources: {}
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: false
          volumeMounts:
          - mountPath: /storage
            name: volume-ita-backup-storage
        volumes:
        - name: volume-ita-backup-storage
          persistentVolumeClaim:
            claimName: pvc-ita-global
        restartPolicy: Always
        securityContext: {}
        serviceAccount: default
        serviceAccountName: default
      _EOF_

#. データベースのリストア実施

   | データベースに対して :command:`mysqldump` リストアを実施します。
   | Exastro Platform と Exastro IT Automation でデータベースサーバを共有するか、分離するかによって手順が異なります。

   .. tabs::

      .. group-tab:: データベースサーバを共有

          .. code-block:: bash
             :caption: ユーザ用データベースリストアコマンド

             gzip -dc exastro_mysqldump_platform_user_YYYYMMDD-HHmmss.sql.gz | kubectl exec -i exastro-maintenance --namespace exastro -- sh -c 'mysql -h ${PF_DB_HOST} -P ${PF_DB_PORT} -u ${PF_DB_ADMIN_USER} -p${PF_DB_ADMIN_PASSWORD} mysql'

          .. code-block:: bash
             :caption: アプリケーション用データベースリストアコマンド

             gzip -dc exastro_mysqldump_platform_db_YYYYMMDD-HHmmss.sql.gz | sed -e 's/DEFINER[ ]*=[ ]*[^*]*\*/\*/'| kubectl exec -i exastro-maintenance --namespace exastro -- sh -c 'mysql -h ${PF_DB_HOST} -P ${PF_DB_PORT} -u ${PF_DB_ADMIN_USER} -p${PF_DB_ADMIN_PASSWORD}'

          .. code-block:: bash
             :caption: データベース権限更新コマンド

             kubectl exec -it <MariaDB Pod名> --bash -c "mysql -u root -ppassword -e 'FLUSH PRIVILEGES;'"

      .. group-tab:: データベースサーバを分離

          .. code-block:: bash
             :caption: Exastro Platform ユーザ用データベースリストアコマンド

             gzip -dc exastro_mysqldump_platform_user_YYYYMMDD-HHmmss.sql.gz | kubectl exec -i exastro-maintenance --namespace exastro -- sh -c 'mysql -h ${PF_DB_HOST} -P ${PF_DB_PORT} -u ${PF_DB_ADMIN_USER} -p${PF_DB_ADMIN_PASSWORD} mysql'

          .. code-block:: bash
             :caption: Exastro Platform アプリケーション用データベースリストアコマンド

             gzip -dc exastro_mysqldump_platform_db_YYYYMMDD-HHmmss.sql.gz | sed -e 's/DEFINER[ ]*=[ ]*[^*]*\*/\*/'| kubectl exec -i exastro-maintenance --namespace exastro -- sh -c 'mysql -h ${PF_DB_HOST} -P ${PF_DB_PORT} -u ${PF_DB_ADMIN_USER} -p${PF_DB_ADMIN_PASSWORD}'

          .. code-block:: bash
             :caption: Exastro Platform データベース権限更新コマンド

             kubectl exec -it <MariaDB Pod名> --bash -c "mysql -u root -ppassword -e 'FLUSH PRIVILEGES;'"

          .. code-block:: bash
             :caption: Exastro IT Automation ユーザ用データベースリストアコマンド

             gzip -dc exastro_mysqldump_ita_user_YYYYMMDD-HHmmss.sql.gz | kubectl exec -i exastro-maintenance --namespace exastro -- sh -c 'mysql -h ${ITA_DB_HOST} -P ${ITA_DB_PORT} -u ${ITA_DB_ADMIN_USER} -p${ITA_DB_ADMIN_PASSWORD} mysql'

          .. code-block:: bash
             :caption: Exastro IT Automation アプリケーション用データベースリストアコマンド

             gzip -dc exastro_mysqldump_ita_db_YYYYMMDD-HHmmss.sql.gz | sed -e 's/DEFINER[ ]*=[ ]*[^*]*\*/\*/'| kubectl exec -i exastro-maintenance --namespace exastro -- sh -c 'mysql -h ${ITA_DB_HOST} -P ${ITA_DB_PORT} -u ${ITA_DB_ADMIN_USER} -p${ITA_DB_ADMIN_PASSWORD}'

          .. code-block:: bash
             :caption: Exastro IT Automation データベース権限更新コマンド

             kubectl exec -it <MariaDB Pod名> --bash -c "mysql -u root -ppassword -e 'FLUSH PRIVILEGES;'"

#. ファイルのリストア実施

   | Exastro IT Automation のファイルのリストアを実施します。

   .. code-block:: bash
      :caption: コマンド

      kubectl exec -i exastro-maintenance --namespace exastro -- sh -c 'tar zxvf - -C /' < exastro_storage_backup_ita_YYYYMMDD-HHmmss.tar.gz

#. MongoDBのリストア実施

   | OASEでインストール時に設定したMongoDBを利用している場合、MongoDBのリストアを実施します。

   .. code-block:: bash
      :caption: コマンド

      tar -zxvf exastro_mongodump_YYYYMMDD-HHmmss.tar.gz -C /var/data/exastro-suite/exastro-it-automation/ita-common

   .. code-block:: bash

      kubectl exec -it exastro-oase-maintenance --namespace exastro -- sh -c 'mongorestore --host=${ITA_MONGO_HOST} --port=${ITA_MONGO_PORT} --username=${ITA_MONGO_ADMIN_USER} --password=${ITA_MONGO_ADMIN_PASSWORD} /storage/exastro_mongodump'

   .. code-block:: bash

      sudo rm -rf /var/data/exastro-suite/exastro-it-automation/ita-common/exastro_mongodump/

#. メンテナンス用コンテナの削除

   | バックアップ作業用コンテナを削除します。

   .. code-block:: bash
      :caption: コマンド

      kubectl delete pod exastro-maintenance --namespace exastro

   | ※MongoDBを利用している場合

   .. code-block:: bash

      kubectl delete pod exastro-oase-maintenance --namespace exastro

サービス再開
------------

.. include:: ../../include/start_service_k8s_backup.rst

