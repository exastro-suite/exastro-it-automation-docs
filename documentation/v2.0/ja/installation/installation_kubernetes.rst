  =============================
  インストール方法 (Kubernetes)
  =============================

  はじめに
  ========

  | 本章では、Exastro IT Automation を利用する際に必要となる、Exastro Platform および Exastro IT Automation を導入する手順について説明します。

  前提条件
  ========

  - クライアント要件

    | 動作確認が取れているクライアントアプリケーションのバージョンは下記のとおりです。
    
    .. csv-table:: クライアント要件
    :header: アプリケーション, バージョン
    :widths: 30, 30
    
    Helm, v3.9.x
    kubectl, 1.23

  - デプロイ環境

    | 動作確認が取れているコンテナ環境の最小要求リソースとバージョンは下記のとおりです。

    .. csv-table:: デプロイ環境
    :header: リソース種別, 要求リソース
    :widths: 20, 20
    
    CPU,2 Cores (3.0 GHz)
    Memory, 4GB
    Storage (Container image size),10GB
    Kubernetes, 1.23

    .. warning::
      | データベースおよびファイルの永続化のために、別途ストレージ領域を用意する必要があります。
      | Storage サイズには、Exastro IT Automation が使用する入出力データのファイルは含まれていないため、利用状況に応じて容量を見積もる必要があります。

  - 通信要件

    - クライアントからデプロイ先のコンテナ環境にアクセスできる必要があります。
    - Platform管理者用と一般ユーザー用の2つ通信ポートが使用となります。
    - コンテナ環境からコンテナイメージの取得のために、Docker Hub に接続できる必要があります。

  - 外部コンポーネント

    - MariaDB、もしくは、MySQL サーバ
    - GitLabリポジトリ、および、アカウントの払い出しが可能なこと

    .. warning::
      | GitLab環境を同一クラスタに構築する場合は、GitLabのシステム要件に対応する最小要件を追加で容易する必要があります。
      | Database環境を同一クラスタに構築する場合は、使用するDatabaseのシステム要件に対応する最小要件を定義する必要があります


  インストールの準備
  ==================

  1. Helm リポジトリの登録

    | Exastro Suite は、以下の2つのアプリケーションから構成されています。
    - 共通基盤 (Exastro Platform)
    - Exastro IT Automation
    | そのため、以下の Helm リポジトリより、2つのHelmリポジトリを登録する必要があります。

    .. csv-table::
      :header: アプリケーション名, リポジトリ
      :widths: 20, 50

      共通基盤, https://exastro-suite.github.io/exastro-platform/charts/
      Exastro IT Automation, https://exastro-suite.github.io/exastro-it-automation/charts/

    .. code:: shell

        # 共通基盤 (Exastro Platform) の Helm リポジトリを登録
        helm repo add exastro-platform https://exastro-suite.github.io/exastro-platform/charts/ -n exastro-platform
        # Exastro IT Automation の Helm リポジトリを登録
        helm repo add exastro-it-automation https://exastro-suite.github.io/exastro-it-automation/charts/ -n exastro-it-automation
        # リポジトリ情報の更新
        helm repo update

  2. デフォルト設定値の取得

    | 下記のコマンドから共通基盤 values.yaml のデフォルト値を出力します。

    .. code:: shell

        helm show values exastro-platform/exastro-platform > exastro-platform.yaml

    .. raw:: html

        <details>
          <summary>exastro-platform.yaml</summary>

    .. code:: yaml

        # Default values for platform.
        # This is a YAML-formatted file.
        # Declare variables to be passed into your templates.
        global:
          authGlobalDefinition:
            name: auth-global
            enabled: true
            image:
              registry: "docker.io"
              organization: exastro
              package: exastro-platform
            config:
              DEFAULT_LANGUAGE: "ja"
              LANGUAGE: "en"
              TZ: "Asia/Tokyo"
              PYTHONIOENCODING: utf-8
              PLATFORM_API_PROTOCOL: "http"
              PLATFORM_API_HOST: "platform-api"
              PLATFORM_API_PORT: "8000"
              PLATFORM_WEB_PROTOCOL: "http"
              PLATFORM_WEB_HOST: "platform-web"
              PLATFORM_WEB_PORT: "8000"
            persistence:
              enabled: true
              accessMode: ReadWriteMany
              size: 10Gi
              volumeType: hostPath # e.g.) hostPath or AKS
              storageClass: "-" # e.g.) azurefile or - (None)
              # matchLabels:
              #   release: "stable"
              # matchExpressions:
              #   - {key: environment, operator: In, values: [dev]}
          keycloakDefinition:
            name: keycloak
            enabled: true
            config:
              API_KEYCLOAK_PROTOCOL: "http"
              API_KEYCLOAK_HOST: "keycloak.exastro-platform.svc"
              API_KEYCLOAK_PORT: "8080"
              KEYCLOAK_PROTOCOL: "http"
              KEYCLOAK_HOST: "keycloak.exastro-platform.svc"
              KEYCLOAK_PORT: "8080"
              KEYCLOAK_MASTER_REALM: "master"
              KEYCLOAK_DB_DATABASE: "keycloak"
            secret:
              KEYCLOAK_USER: ""
              KEYCLOAK_PASSWORD: ""
              KEYCLOAK_DB_USER: ""
              KEYCLOAK_DB_PASSWORD: ""
          itaDefinition:
            name: ita
            enabled: true
            config:
              ITA_WEB_PROTOCOL: "http"
              ITA_WEB_HOST: "ita-web-server.exastro-it-automation.svc"
              ITA_WEB_PORT: "8000"
              ITA_API_PROTOCOL: "http"
              ITA_API_HOST: "ita-api-organization.exastro-it-automation.svc"
              ITA_API_PORT: "8080"
              ITA_API_ADMIN_PROTOCOL: "http"
              ITA_API_ADMIN_HOST: "ita-api-admin.exastro-it-automation.svc"
              ITA_API_ADMIN_PORT: "8080"
          authDatabaseDefinition:
            name: auth-database
            enabled: true
            config:
              DB_VENDOR: "mariadb"
              DB_HOST: "mariadb.exastro-platform.svc"
              DB_PORT: "3306"
              DB_DATABASE: "platform"
            secret:
              DB_ADMIN_USER: ""
              DB_ADMIN_PASSWORD: ""
              DB_USER: ""
              DB_PASSWORD: ""
          databaseDefinition:
            name: mariadb
            enabled: true
            secret:
              MARIADB_ROOT_PASSWORD: ""
            persistence:
              enabled: true
              reinstall: false
              accessMode: ReadWriteOnce
              size: 20Gi
              volumeType: hostPath # e.g.) hostPath or AKS
              storageClass: "-" # e.g.) azurefile or - (None)
              # matchLabels:
              #   release: "stable"
              # matchExpressions:
              #   - {key: environment, operator: In, values: [dev]}

        platform-api:
          image:
            repository: "exastro/exastro-platform-api"
            tag: "1.0.2"

        platform-auth:
          ingress:
            enabled: true
            hosts:
              - host: exastro-suite.example.local
                paths:
                  - path: /
                    pathType: Prefix
                    backend: "http"
              - host: exastro-suite-mng.example.local
                paths:
                  - path: /
                    pathType: Prefix
                    backend: "httpMng"
          service:
            type: ClusterIP
          image:
            repository: "exastro/exastro-platform-auth"
            tag: "1.0.2"

        platform-setup:
          keycloak:
            image:
              repository: "exastro/exastro-platform-job"
              tag: "1.0.2"

        platform-web:
          image:
            repository: "exastro/exastro-platform-web"
            tag: "1.0.2"

        mariadb:
          image:
            repository: "mariadb"
            tag: "10.9"
            pullPolicy: IfNotPresent
          resources:
            requests:
              memory: "256Mi"
              cpu: "1m"
            limits:
              memory: "2Gi"
              cpu: "4"

        keycloak:
          image:
            repository: "exastro/keycloak"
            tag: "1.0.2"
            pullPolicy: IfNotPresent
          resources:
            requests:
              memory: "256Mi"
              cpu: "1m"
            limits:
              memory: "2Gi"
              cpu: "4"

    .. raw:: html

        </details>

    | 同様に、下記のコマンドから Exastro IT Automation の values.yaml のデフォルト値を出力します。

    .. code:: shell

        helm show values exastro-it-automation/exastro-it-automation > exastro-it-automation.yaml

    .. raw:: html

        <details>
        <summary>exastro-it-automation.yaml</summary>

    .. code:: yaml

        # Default values for Exastro IT Automation.
        # This is a YAML-formatted file.
        # Declare variables to be passed into your templates.
        global:
          itaGlobalDefinition:
            name: ita-global
            enabled: true
            image:
              registry: "docker.io"
              organization: exastro
              package: exastro-it-automation
            config:
              DEFAULT_LANGUAGE: "ja"
              LANGUAGE: "en"
              CONTAINER_BASE: "kubernetes"
              TZ: "Asia/Tokyo"
              STORAGEPATH: "/storage/"
            persistence:
              enabled: true
              accessMode: ReadWriteMany
              size: 10Gi
              volumeType: hostPath # e.g.) hostPath or AKS
              storageClass: "-" # e.g.) azurefile or - (None)
              # matchLabels:
              #   release: "stable"
              # matchExpressions:
              #   - {key: environment, operator: In, values: [dev]}
          gitlabDefinition:
            name: gitlab
            enabled: true
            config:
              GITLAB_PROTOCOL: "http"
              GITLAB_HOST: "gitlab.exastro-platform.svc"
              GITLAB_PORT: "80"
            secret:
              GITLAB_ROOT_TOKEN: ""
          itaDatabaseDefinition:
            name: ita-database
            enabled: true
            config:
              DB_VENDOR: "mariadb"
              DB_HOST: "mariadb.exastro-platform.svc"
              DB_PORT: "3306"
              DB_DATABASE: "ITA_DB"
            secret:
              DB_ROOT_PASSWORD: ""
              DB_USER: ""
              DB_PASSWORD: ""

        ita-api-admin:
          replicaCount: 1
          image:
            repository: "exastro/exastro-it-automation-api-admin"
            tag: "2.0.0"
            pullPolicy: IfNotPresent

        ita-api-organization:
          replicaCount: 1
          image:
            repository: "exastro/exastro-it-automation-api-organization"
            tag: "2.0.0"
            pullPolicy: IfNotPresent

        ita-by-ansible-execute:
          replicaCount: 1
          image:
            repository: "exastro/exastro-it-automation-by-ansible-execute"
            tag: "2.0.0"
            pullPolicy: IfNotPresent
          extraEnv:
            EXECUTE_INTERVAL: "10"
            ANSIBLE_AGENT_IMAGE: "exastro/exastro-it-automation-by-ansible-agent"
            ANSIBLE_AGENT_IMAGE_TAG: "2.0.0"

        ita-by-ansible-legacy-role-vars-listup:
          replicaCount: 1
          extraEnv:
            EXECUTE_INTERVAL: "10"
          image:
            repository: "exastro/exastro-it-automation-by-ansible-legacy-role-vars-listup"
            tag: "2.0.0"
            pullPolicy: IfNotPresent

        ita-by-ansible-towermaster-sync:
          replicaCount: 1
          extraEnv:
            EXECUTE_INTERVAL: "10"
          image:
            repository: "exastro/exastro-it-automation-by-ansible-towermaster-sync"
            tag: "2.0.0"
            pullPolicy: IfNotPresent

        ita-by-conductor-synchronize:
          replicaCount: 1
          extraEnv:
            EXECUTE_INTERVAL: "10"
          image:
            repository: "exastro/exastro-it-automation-by-conductor-synchronize"
            tag: "2.0.0"
            pullPolicy: IfNotPresent

        ita-by-menu-create:
          replicaCount: 1
          extraEnv:
            EXECUTE_INTERVAL: "10"
          image:
            repository: "exastro/exastro-it-automation-by-menu-create"
            tag: "2.0.0"
            pullPolicy: IfNotPresent

        ita-database-setup-job:
          image:
            repository: ""
            tag: ""
            pullPolicy: IfNotPresent

        ita-web-server:
          replicaCount: 1
          image:
            repository: "exastro/exastro-it-automation-web-server"
            tag: "2.0.0"
            pullPolicy: IfNotPresent

    .. raw:: html

        </details>

  .. _ingress_setting:

  3. サービス公開の設定 (Ingress の設定)

    | サービス公開用のドメイン情報を Ingress に登録することでDNSを使ったサービス公開を行います。
    | Azure におけるドメイン名の確認方法については :ref:`aks-dns` を確認してください。
    | 下記は、AKSのIngress Controller を使用する際の例を記載しております。

    -  exastro-platform.yaml

        .. code:: diff

            platform-auth:
              ingress:
                enabled: true
          +    annotations:
          +      kubernetes.io/ingress.class: addon-http-application-routing
          +      nginx.ingress.kubernetes.io/proxy-body-size: 100m
          +      nginx.ingress.kubernetes.io/proxy-buffer-size: 256k
          +      nginx.ingress.kubernetes.io/server-snippet: |
          +        client_header_buffer_size 100k;
          +        large_client_header_buffers 4 100k;
                hosts:
          -      - host: exastro-suite.example.local
          +      - host: exastro-suite.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io ★ここにドメイン名を記載
                    paths:
                      - path: /
                        pathType: Prefix
                        backend: "http"
          -      - host: exastro-suite-mng.example.local
          +      - host: exastro-suite-mng.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io ★ここにドメイン名を記載
                    paths:
                      - path: /
                        pathType: Prefix
                        backend: "httpMng"

  .. _DATABASE_SETUP:

  4. データベース起動の有無

    Kubernetes クラスタ内にデータベース用Podの起動有無を選択します。

    -  データベースコンテナ起動ありの場合: 対応不要

    -  データベースコンテナ起動なし(外部DB利用)の場合: DB接続情報の修正

        .. code:: diff

            # exastro-platform.yaml
            global:
              keycloakDefinition:
                name: keycloak
                enabled: true
                secret:
          -      KEYCLOAK_USER: ""
          -      KEYCLOAK_PASSWORD: ""
          -      KEYCLOAK_DB_USER: ""
          -      KEYCLOAK_DB_PASSWORD: ""
          +      KEYCLOAK_USER: "KeyCloakログインユーザ"
          +      KEYCLOAK_PASSWORD: "KeyCloakログインパスワード"
          +      KEYCLOAK_DB_USER: "KeyCloak用DBユーザ"
          +      KEYCLOAK_DB_PASSWORD: "KeyCloak用DBパスワード"
              authDatabaseDefinition:
                name: auth-database
                enabled: true
                config:
                  DB_VENDOR: "mariadb"
          -      DB_HOST: "mariadb.exastro-platform.svc"
          -      DB_PORT: "3306"
          +      DB_HOST: "外部DBの接続先"
          +      DB_PORT: "外部DBのポート番号"
                  DB_DATABASE: "platform"
            databaseDefinition:
              name: mariadb
          -   enabled: true
          +   enabled: false

        .. code:: diff

            # exastro-it-automation.yaml
            global:
              itaDatabaseDefinition:
                name: ita-database
                enabled: true
                config:
                  DB_VENDOR: "mariadb"
          -      DB_HOST: "mariadb.exastro-platform.svc"
          -      DB_PORT: "3306"
          +      DB_HOST: "外部DBの接続先"
          +      DB_PORT: "外部DBのポート番号"
                  DB_DATABASE: "platform"

  5. データベース接続アカウントの設定

    | データベース接続のためのアカウント情報を登録します。

    .. warning::
      | アカウントには、データベースを作成する権限が必要です。

    .. warning::
      | 認証情報などはすべて平文で問題ありません。(Base64エンコードは不要)

    .. code:: diff

        # exastro-platform.yaml
        global:
            authDatabaseDefinition:
            name: auth-database
            enabled: true
            config:
                DB_VENDOR: "mariadb"
                DB_HOST: "mariadb.exastro-platform.svc"
                DB_PORT: "3306"
                DB_DATABASE: "platform"
            secret:
        -      DB_ADMIN_USER: ""
        -      DB_ADMIN_PASSWORD: ""
        -      DB_USER: ""
        -      DB_PASSWORD: ""
        +      DB_ADMIN_USER: "DBの管理ユーザ名"
        +      DB_ADMIN_PASSWORD: "DBの管理ユーザのパスワード"
        +      DB_USER: "認証基盤用ユーザ名"
        +      DB_PASSWORD: "認証基盤用ユーザのパスワード"
            databaseDefinition:
            name: mariadb
            enabled: true
            secret:
        -      MARIADB_ROOT_PASSWORD: ""
        +      MARIADB_ROOT_PASSWORD: "DBのルートパスワード"
            persistence:
                enabled: true
                reinstall: false
                accessMode: ReadWriteOnce

    .. code:: diff

        # exastro-it-automation.yaml
        global:
            itaDatabaseDefinition:
            name: ita-database
            enabled: true
            config:
                DB_VENDOR: "mariadb"
                DB_HOST: "mariadb.exastro-platform.svc"
                DB_PORT: "3306"
                DB_DATABASE: "ITA_DB"
            secret:
        -      DB_ADMIN_USER: ""
        -      DB_ADMIN_PASSWORD: ""
        -      DB_USER: ""
        -      DB_PASSWORD: ""
        +      DB_ADMIN_USER: "DBの管理ユーザ名"
        +      DB_ADMIN_PASSWORD: "DBの管理ユーザのパスワード"
        +      DB_USER: "認証基盤用ユーザ名"
        +      DB_PASSWORD: "認証基盤用ユーザのパスワード"

  6. GitLab 連携設定

    | GitLab 連携のためのアカウント情報を登録します。

    .. warning::
      | アカウントには、GitLab のアカウントを作成する権限が必要です。

    -  exastro-it-automation.yaml (Exastro IT Automation) の修正箇所

        .. code:: diff

          # exastro-it-automation.yaml
          global:
            gitlabDefinition:
              name: gitlab
              enabled: true
              config:
          -     GITLAB_PROTOCOL: "http"
          -     GITLAB_HOST: "gitlab.exastro-platform.svc"
          -     GITLAB_PORT: "80"
          +     GITLAB_PROTOCOL: "接続プロトコル http or https"
          +     GITLAB_HOST: "接続先"
          +     GITLAB_PORT: "接続ポート"
              secret:
          -     GITLAB_ROOT_TOKEN: ""
          +     GITLAB_ROOT_TOKEN: "GitLabのRoot権限を持ったトークン"
            itaDatabaseDefinition:
              name: ita-database

  7. 永続ボリューム - PersistentVolume(pv)の設定例

    | データベースのデータ永続化 (クラスタ内コンテナがある場合)、および、ファイルの永続化のために、永続ボリュームを設定する必要があります。
    
    - マネージドディスクを使用する場合 (本番向け)

      | Azure のストレージを利用する場合、下記のように StorageClass を定義することで利用が可能です。
      | ※以下を適用した際は、values.yaml ファイルの値も合わせて修正する必要があります。
    
      -  storage-class-exastro-suite.yaml
    
          .. code:: yaml
    
            apiVersion: storage.k8s.io/v1
            kind: StorageClass
            metadata:
              name: exastro-suite-azurefile-csi-nfs
            provisioner: file.csi.azure.com
            allowVolumeExpansion: true
            parameters:
              protocol: nfs
            mountOptions:
              - nconnect=8
    
      -  exastro-it-automation.yaml (helm valuesファイル)
    
          .. code:: diff
    
                persistence:
                  enabled: true
                  accessMode: ReadWriteMany
                  size: 10Gi
                  volumeType: hostPath # e.g.) hostPath or AKS
            -     storageClass: "-" # e.g.) azurefile or - (None)
            +     storageClass: "exastro-suite-azurefile-csi-nfs" # e.g.) azurefile or - (None)
                  # matchLabels:
                  #   release: "stable"
                  # matchExpressions:
                  #   - {key: environment, operator: In, values: [dev]}

    - Kubernetes ノードのディレクトリを利用する場合 (テスト・検証向け)

      | 設定方法は各サーバやサービスなどによって異なりますが、ここでは hostPath を使用した例を記載します。
      | ※マネージドサービスを利用する場合は、後続の例を参照してください。

      .. danger::
          | データの永続化自体は可能ですが、コンピュートノードの増減や変更によりデータが消えてしまう可能性があるため本番環境では使用しないでください。
          | また、Azure で構築した AKS クラスタは、クラスタを停止すると AKS クラスターの Node が解放されるため、保存していた情報は消えてしまいます。そのため、Node が停止しないように注意が必要となります。
    
      -  pv-database.yaml (データベース用ボリューム)
    
          .. code:: yaml
    
            # pv-database.yaml
            apiVersion: v1
            kind: PersistentVolume
            metadata:
              name: pv-database
            spec:
              capacity:
                storage: 20Gi
              accessModes:
                - ReadWriteOnce
              persistentVolumeReclaimPolicy: Retain
              hostPath:
                path: /var/data/exastro-suite/exastro-platform/database
                type: DirectoryOrCreate
    
      -  pv-ita-common.yaml (ファイル用ボリューム)
    
          .. code:: yaml
    
            # pv-ita-common.yaml
            apiVersion: v1
            kind: PersistentVolume
            metadata:
              name: pv-ita-common
            spec:
              capacity:
                storage: 10Gi
              accessModes:
                - ReadWriteMany
              persistentVolumeReclaimPolicy: Retain
              hostPath:
                path: /var/data/exastro-suite/exastro-it-automation/ita-common
                type: DirectoryOrCreate

  .. _インストール-1:

  インストール
  ============

  1. Namespace (名前空間) の作成

    -  コマンドラインから以下のコマンドで Namespace を作成します。

        .. code:: bash

          # 共通基盤用の Namespace 作成
          kubectl create ns exastro-platform
          # Exastro IT Automation 用の Namespace 作成
          kubectl create ns exastro-it-automation

  2. インストール

    -  Helm を使い Kubernetes 環境にインストールを行います。

        .. code:: bash

          # 共通基盤用のリソースをデプロイ
          helm install exastro-platform exastro-platform/exastro-platform -n exastro-platform -f exastro-platform.yaml
          # Exastro IT Automation 用のリソースをデプロイ
          helm install exastro-it-automation exastro-it-automation/exastro-it-automation -n exastro-it-automation -f exastro-it-automation.yaml

  インストール状況確認
  ====================

  1. Pod状態確認

    - 共通基盤 (Exastro Platform)

      | コマンドラインから以下のコマンドを入力して、インストールが完了していることを確認します。
    
      .. code:: bash
    
          # Pod の一覧を取得
          kubectl get po -n exastro-platform
    
      | 正常動作している場合は、すべて “Running” もしくは “Completed” となります。
      | ※正常に起動するまで数分かかる場合があります。
    
      .. code:: bash
    
          $ kubectl get po -n exastro-platform
    
          NAME                                 READY   STATUS      RESTARTS   AGE
          keycloak-64df696bf5-5667l        1/1     Running     0          51s
          mariadb-7b4fb98469-6j4sg         1/1     Running     0          51s
          platform-api-6b644ddcd-sfrzs     1/1     Running     0          51s
          platform-auth-6ddd9457bf-6pphj   1/1     Running     0          51s
          platform-setup-tq8vn             0/1     Completed   0          51s
          platform-web-7c57c6994-ntxvh     1/1     Running     0          51s
    
    - Exastro IT Automation

      | コマンドラインから以下のコマンドを入力して、インストールが完了していることを確認します。

      .. code:: bash
    
          kubectl get po -n exastro-it-automation
    
      .. code:: bash
    
          $ kubectl get po -n exastro-it-automation
    
          NAME                                                         READY   STATUS      RESTARTS   AGE
          ita-api-admin-65b976ccf5-w2rd6                           1/1     Running     0          28s
          ita-api-organization-759c486d5b-z7pbv                    1/1     Running     0          28s
          ita-by-ansible-execute-6c854b74cb-7s5ls                  1/1     Running     0          28s
          ita-by-ansible-legacy-role-vars-listup-b5bcdb44c-gq7pr   1/1     Running     0          28s
          ita-by-ansible-towermaster-sync-576d54b94c-b7t4s         1/1     Running     0          28s
          ita-by-conductor-synchronize-7dc96dcff5-q657p            1/1     Running     0          28s
          ita-by-menu-create-7c667fd48c-9zlqg                      1/1     Running     0          28s
          ita-setup-5g6nh                                          0/1     Completed   0          28s
          ita-web-server-785cc9447-hwggj                           1/1     Running     0          28s
    
  | 以上で設定が完了となり、Ingress で登録したホスト名でログイン可能になります。

  .. warning::
    | 初期データ設定が完了するまでは、Exastro Suite の GUI および API は呼び出せませんのでご注意ください。


  接続確認
  ========

  | ブラウザより、Ingress で登録した管理者側のホスト名で設定した URL を使って設定画面に入れることを確認します。

  https://exastro-suite-mng.xxxxxxx.japaneast.aksapp.io/auth/

  | 以下の画面が表示された場合、:menuselection:`Administration Console` を選択して、ログインできることを確認してください。

  .. figure:: /images/platform/administrator-console.png
    :alt: administrator-console
    :scale: 80%
    :align: center

  .. note::
    | ログイン ID とパスワードは、exastro-platform.yaml ファイルで設定した内容となります。

  | インストールが完了したら、:doc:`../platform/organization` の作成を行います。
