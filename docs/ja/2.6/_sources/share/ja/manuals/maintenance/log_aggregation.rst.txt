==========
ログの集約
==========

| 本説明では Exastro IT Automation の各コンテナのログを集約する(Kubernetes環境における)手段の例を以下に記載します。

コンテナログについて
====================

| Exastroシステムでは、各コンテナのログ出力を標準出力で行っております。（`The Twelve-Factor App <https://12factor.net/ja/logs>`_ の思想に基づく)
| 標準出力されたログは、Kubernetes環境の場合、コンテナがリスタートされたりすると標準出力されたログは削除されてしまいます、そのため、出力されたログを保存するには、その内容を別途保存する必要があります。
| またKubernetes環境における、複数ノードで実行している場合は、その情報が各ノードに保存されているために、監視アプリケーションで監視する際に非常に扱いにくいものとなっております。

| よって本説明では、監視アプリケーション等でも利用しやすいように、ノードごとに出力されたログを集約し、かつ、ファイル形式を :kbd:`JSON形式` で出力する方法の一例をあげたいと思います。

.. note::
   | Kubernetesにおけるロギングのアーキテクチャについては、
   | https://kubernetes.io/ja/docs/concepts/cluster-administration/logging/ を参照してください。

ログの集約方法
==============

| 本説明において、ログの集約方法に :kbd:`Fluent Bit` を使用して、ログの集約を実施する例を説明します。

Fluent Bitインストール
----------------------

| Fluent Bitのインストールは、公式サイトに基づき、Helm charts を利用してインストールします。
| 公式サイト: `Fluent Bit: Offcial Manual <https://docs.fluentbit.io/manual/installation/kubernetes>`_

前提条件
--------

| 本説明で使用する環境の前提条件は以下の通りとなります。

- | 使用する :kbd:`helm cli` は事前にインストールされていること
- | 出力先のNFSサーバーとKubernetesが動作するサーバー間は、接続できる状態となっていること
- | ログの集約先となるNFSサーバーのディレクトリは :kbd:`/var/PersistentVolume/ha-conf-k8s/exastro-logs` とし、アクセス権がフルアクセスとなっていること

事前準備
--------

| ログを集約するために、今回はNFSを用いた方法とし、出力先にKubernetesの永続ボリューム(PersistentVolume)を利用します。

永続ボリューム(PersistentVolume)の準備
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| 事前準備として、出力先の永続ボリューム(PV)とリソースの要求(PVC)のmanifestを作成します。

.. code-block:: yaml
   :linenos:
   :caption: fluentbit-pv.yaml

   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: pvc-exastro-logs
   spec:
     accessModes:
       - "ReadWriteMany"
     resources:
       requests:
         storage: "10Gi"
     storageClassName: ""
     # volumeName: pv-exastro-logs
   ---
   apiVersion: v1
   kind: PersistentVolume
   metadata:
     name: pv-exastro-logs
   spec:
     capacity:
       storage: 20Gi
     accessModes:
       - ReadWriteMany
     persistentVolumeReclaimPolicy: Retain
     storageClassName: ""
     nfs:
       server: 192.168.172.1
       path: /var/PersistentVolume/ha-conf-k8s/exastro-logs
     claimRef:
       name: pvc-exastro-logs
       namespace: default

Fluent Bit: helm chart values.yamlの準備
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| helm chartsでインストールする際に使用する :kbd:`values.yaml` は、以下のコマンドで抽出して、編集する

.. code-block:: shell
   :caption: コマンド

   helm show values fluent/fluent-bit > fluentbit-values.yaml

.. tip::
   | Fluent Bitのhelmリポジトリ登録は以下のコマンドで実施できます。 :kbd:`helm show values` を実行する前に１度だけ必要となります。

   .. code-block:: shell
      :caption: コマンド

      # Exastro システムの Helm リポジトリを登録
      helm repo add fluent https://fluent.github.io/helm-charts
      # リポジトリ情報の更新
      helm repo update

| 出力された :kbd:`fluentbit-values.yaml` を以下のように修正します。

.. literalinclude:: /share/ja/manuals/maintenance/literal_includes/fluentbit-values.yaml
   :diff: /share/ja/manuals/maintenance/literal_includes/fluentbit-values-org.yaml
   :language: yaml
   :linenos:
   :caption: fluentbit-values.yaml

.. note::

   | :kbd:`helm show values` で出力された内容をそのまま使用しているため、コメント化された内容もそのまま記載しています。

.. note::

   | ログファイルは、:kbd:`json形式` で出力されるように設定しています。
   | ログファイル名は、ログローテーションを考慮して、日付＋コンテナ名(namespace名含む)で出力されるように設定しています。

.. danger::

   | :kbd:`rewrite_tag` で、rewrite先が同じタグを継承すると永久ループとなり、サーバーが不安定になるので、rewriteのタグは違う内容となるように設定してください。

インストール
------------

| helmによるインストール手順は公式の手順に従ってインストールします。

.. note::
   | 公式の手順のまま実施しているため、namespaceは指定しておりません。

- | PV, PVCのapply

  .. code-block:: shell
     :caption: コマンド

     kubectl apply -f fluentbit-pv.yaml


- | Fluent Bit: インストール

  .. code-block:: shell
     :caption: コマンド

     helm upgrade --install fluent-bit fluent/fluent-bit -f fluentbit-values.yaml

- | インストールされた :kbd:`Fluent Bit` の確認

  .. code-block:: shell
     :caption: コマンド

     kubectl get po

  .. code-block:: shell
     :caption: 実行結果

     NAME               READY   STATUS              RESTARTS   AGE
     fluent-bit-gx2c5   1/1     Running             0          22s
     fluent-bit-tgbls   0/1     ContainerCreating   0          22s
     fluent-bit-xhm6w   0/1     ContainerCreating   0          22s

  .. code-block:: shell
     :caption: コマンド

     kubectl get daemonset

  .. code-block:: shell
     :caption: 実行結果

     NAME         DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
     fluent-bit   3         3         3       3            3           <none>          88m

出力された内容を確認
--------------------

| インストール完了後、すぐに設定された内容で、NFSサーバーにログファイルが集約されます。

- | 集約したログファイル一覧(例)

  .. code-block:: shell
     :caption: 実行結果

     -rw-r--r-- 1 root root   156434 Mar  5 14:53 exastro-suite.exastro.mongo.20240305.log
     -rw-r--r-- 1 root root   514599 Mar  5 14:53 exastro-suite.exastro.platform-api.20240305.log
     -rw-r--r-- 1 root root     6931 Mar  5 14:51 exastro-suite.exastro.platform-job.20240305.log

- | 集約したログファイルの内容(例)

  .. code-block:: text
     :caption: 集約したログファイルの内容

     {"stream":"stdout","logtag":"F","record_date":"20240301","log":"2024/03/01 16:40:09.098836 INFO (dumm) /app/controllers/internal_maintenance_mode_setting_controller.py(37) ### func:internal_get_maintenance_mode_setting"}
     {"stream":"stdout","logtag":"F","record_date":"20240301","log":"192.168.172.2 - - [01/Mar/2024:16:40:09 +0900] \"GET /internal-api/platform/maintenance-mode-setting HTTP/1.1\" 200 135 \"-\" \"python-requests/2.31.0\""}
     {"stream":"stdout","logtag":"F","record_date":"20240301","log":"192.168.172.2 - - [01/Mar/2024:16:40:09 +0900] \"GET /internal-api/platform/maintenance-mode-setting HTTP/1.1\" 200 135"}
     {"stream":"stdout","logtag":"F","record_date":"20240301","log":"2024/03/01 16:40:10.666816 INFO (dumm) /app/controllers/internal_maintenance_mode_setting_controller.py(37) ### func:internal_get_maintenance_mode_setting"}
     {"stream":"stdout","logtag":"F","record_date":"20240301","log":"192.168.172.2 - - [01/Mar/2024:16:40:10 +0900] \"GET /internal-api/platform/maintenance-mode-setting HTTP/1.1\" 200 135 \"-\" \"python-requests/2.31.0\""}
     {"stream":"stdout","logtag":"F","record_date":"20240301","log":"192.168.172.2 - - [01/Mar/2024:16:40:10 +0900] \"GET /internal-api/platform/maintenance-mode-setting HTTP/1.1\" 200 135"}
     {"stream":"stdout","logtag":"F","record_date":"20240301","log":"2024/03/01 16:40:12.326828 INFO (dumm) /app/controllers/internal_maintenance_mode_setting_controller.py(37) ### func:internal_get_maintenance_mode_setting"}
     {"stream":"stdout","logtag":"F","record_date":"20240301","log":"192.168.172.2 - - [01/Mar/2024:16:40:12 +0900] \"GET /internal-api/platform/maintenance-mode-setting HTTP/1.1\" 200 135 \"-\" \"python-requests/2.31.0\""}
     {"stream":"stdout","logtag":"F","record_date":"20240301","log":"192.168.172.2 - - [01/Mar/2024:16:40:12 +0900] \"GET /internal-api/platform/maintenance-mode-setting HTTP/1.1\" 200 135"}
     {"stream":"stdout","logtag":"F","record_date":"20240301","log":"2024/03/01 16:40:12.807144 INFO (dumm) /app/controllers/internal_maintenance_mode_setting_controller.py(37) ### func:internal_get_maintenance_mode_setting"}
     {"stream":"stdout","logtag":"F","record_date":"20240301","log":"192.168.172.2 - - [01/Mar/2024:16:40:12 +0900] \"GET /internal-api/platform/maintenance-mode-setting HTTP/1.1\" 200 135 \"-\" \"python-requests/2.31.0\""}
     {"stream":"stdout","logtag":"F","record_date":"20240301","log":"192.168.172.2 - - [01/Mar/2024:16:40:12 +0900] \"GET /internal-api/platform/maintenance-mode-setting HTTP/1.1\" 200 135"}
     {"stream":"stdout","logtag":"F","record_date":"20240301","log":"2024/03/01 16:40:12.836383 INFO (dumm) /app/controllers/internal_common_service_controller.py(153) ### func:internal_settings_system_config_list"}
     {"stream":"stdout","logtag":"F","record_date":"20240301","log":"192.168.172.2 - - [01/Mar/2024:16:40:12 +0900] \"GET /internal-api/platform/settings/common HTTP/1.1\" 200 223 \"-\" \"python-requests/2.31.0\""}
     {"stream":"stdout","logtag":"F","record_date":"20240301","log":"192.168.172.2 - - [01/Mar/2024:16:40:12 +0900] \"GET /internal-api/platform/settings/common HTTP/1.1\" 200 223"}
     {"stream":"stdout","logtag":"F","record_date":"20240301","log":"2024/03/01 16:40:12.858139 INFO (dumm) /app/controllers/internal_plan_service_controller.py(62) ### func:limits_get"}
     {"stream":"stdout","logtag":"F","record_date":"20240301","log":"192.168.172.2 - - [01/Mar/2024:16:40:12 +0900] \"GET /internal-api/platform/limits HTTP/1.1\" 200 239 \"-\" \"python-requests/2.31.0\""}
     {"stream":"stdout","logtag":"F","record_date":"20240301","log":"192.168.172.2 - - [01/Mar/2024:16:40:12 +0900] \"GET /internal-api/platform/limits HTTP/1.1\" 200 239"}
     {"stream":"stdout","logtag":"F","record_date":"20240301","log":"2024/03/01 16:40:15.921191 INFO (dumm) /app/controllers/internal_maintenance_mode_setting_controller.py(37) ### func:internal_get_maintenance_mode_setting"}

.. note::
   | 本説明では、ログファイルの削除に関する説明は行っておりません。
   | 出力先の容量（ディスクサイズ）に合わせて、ログファイルの削除を行うことをお勧めします。

