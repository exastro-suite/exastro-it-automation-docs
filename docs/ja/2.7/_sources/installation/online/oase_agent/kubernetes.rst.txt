.. raw:: html

   <script>
   $(window).on('load', function () {
      setTimeout(function(){
        for (var i = 0; i < $("table.filter-table").length; i++) {
          $("[id^='ft-data-" + i + "-2-r']").removeAttr("checked");
          $("[id^='select-all-" + i + "-2']").removeAttr("checked");
          $("[id^='ft-data-" + i + "-2-r'][value^='可']").prop('checked', true);
          $("[id^='ft-data-" + i + "-2-r'][value*='必須']").prop('checked', true);
          tFilterGo(i);
        }
      },200);
   });
   </script>

.. _oase_agent_kubernetes_install:

=================================
OASE Agent on Kubernetes - Online
=================================

目的
====

| 本書では、Exastro IT AutomationにおいてOASEを利用する際に、外部との連携に必要となる、Exastro OASE Agentを導入する手順について説明します。
| Exastro OASE Agentの設定や運用については、:ref:`エージェント概要<agent_about>` をご参照ください。

前提条件
========

- Exastro IT Automationについて

  | Exastro OASE Agentの運用には、Exastro OASE AgentとExastro IT Automationのバージョンが一致している必要があります。

- クライアント要件

  | 動作確認が取れているクライアントアプリケーションのバージョンは下記のとおりです。

  .. list-table:: クライアント要件
   :widths: 20, 20
   :header-rows: 1

   * - アプリケーション
     - バージョン
   * - Helm
     - v3.9.x
   * - kubectl
     - 1.23

- デプロイ環境

  | デプロイ環境のシステム要件については :doc:`構成・構築ガイド<../../../configuration/OASE_agent/kubernetes>` を参照してください。

- 通信要件

  - コンテナ環境からコンテナイメージの取得のために、Docker Hub に接続できる必要があります。


.. include:: ../../../include/oase_agent_recommendations.rst


インストールの準備
==================

Helm リポジトリの登録
---------------------

| Exastro OASE AgentはExastro システムと同一の Helm リポジトリ上に存在しています。

- Exastro OASE Agent

.. csv-table::
 :header: リポジトリ
 :widths: 50

 https://exastro-suite.github.io/exastro-helm/

.. code-block:: shell
   :linenos:
   :caption: コマンド

   # Exastro システムの Helm リポジトリを登録
   helm repo add exastro https://exastro-suite.github.io/exastro-helm/ --namespace exastro
   # リポジトリ情報の更新
   helm repo update

デフォルト設定値の取得
----------------------

| 投入するパラメータを管理しやすくするために、下記のコマンドから共通基盤 values.yaml のデフォルト値を出力します。

.. code-block:: shell
   :caption: コマンド

   helm show values exastro/exastro-agent > exastro-agent.yaml

.. raw:: html

   <details>
     <summary>exastro-agent.yaml</summary>

.. code-block:: yaml
   :linenos:

   # Default values for exastro-agent.
   # This is a YAML-formatted file.
   # Declare variables to be passed into your templates.
   global:
     agentGlobalDefinition:
       name: agent-global
       enabled: true
       image:
         registry: "docker.io"
         organization: exastro
         package: exastro-it-automation

   ita-ag-oase:
     agents:
       - image:
           repository: ""
           # Overrides the image tag whose default is the chart appVersion.
           tag: ""
           pullPolicy: IfNotPresent
         extraEnv:
           TZ: Asia/Tokyo
           DEFAULT_LANGUAGE: ja
           LANGUAGE: "en"
           ITERATION: "500"
           EXECUTE_INTERVAL: "10"
           LOG_LEVEL: INFO
           AGENT_NAME: "oase-agent"
           EXASTRO_URL: "http://platform-auth:8000"
           EXASTRO_ORGANIZATION_ID: "org001"
           EXASTRO_WORKSPACE_ID: "ws01"
           # ROLES: "_ws_admin"
           EVENT_COLLECTION_SETTINGS_NAMES: "id0001"
         secret:
           EXASTRO_REFRESH_TOKEN: "exastro_refresh_token"
           # EXASTRO_USERNAME: "admin"
           # EXASTRO_PASSWORD: "sample-password"
         resources: {}
           # requests:
           #   memory: "64Mi"
           #   cpu: "250m"
           # limits:
           #   memory: "64Mi"
           #   cpu: "250m"

     imagePullSecrets: []
     nameOverride: ""
     fullnameOverride: ""

     initContainerImage:
       repository: "registry.access.redhat.com/ubi8/ubi-init"
       pullPolicy: IfNotPresent
       # Overrides the image tag whose default is the chart appVersion.
       tag: ""

     serviceAccount:
       # Specifies whether a service account should be created
       create: false
       # Annotations to add to the service account
       annotations: {}
       # The name of the service account to use.
       # If not set and create is true, a name is generated using the fullname template
       name: ""

     persistence:
       enabled: true
       reinstall: false
       accessMode: ReadWriteMany
       size: 10Gi
       volumeType: hostPath # e.g.) hostPath or AKS
       storageClass: "-" # e.g.) azurefile or - (None)
       # matchLabels:
       #   release: "stable"
       # matchExpressions:
       #   - {key: environment, operator: In, values: [dev]}
       mountPath:
         storage: /storage
         homeDir: /home/app_user
         pid:
           path: /var/run_app_user/httpd/pid
           subPath: httpd-pid
         socket:
           path: /var/run_app_user/httpd/socket
           subPath: httpd-socket
         tmp: /tmp

     podAnnotations: {}

     podSecurityContext: {}
       # fsGroup: 2000

     securityContext:
       allowPrivilegeEscalation: false
       readOnlyRootFilesystem: true
       runAsUser: 1000
       runAsGroup: 1000
       runAsNonRoot: true

     service: {}

     ingress:
       enabled: false
       className: ""
       annotations: {}
         # kubernetes.io/ingress.class: nginx
         # kubernetes.io/tls-acme: "true"
       hosts:
         - host: chart-example.local
           paths:
             - path: /
               pathType: ImplementationSpecific
       tls: []
     #  - secretName: chart-example-tls
       #    hosts:
       #      - chart-example.local

     nodeSelector: {}

     tolerations: []

     affinity: {}

.. raw:: html

   </details>


| 以降の手順では、この :file:`exastro-agent.yaml` に対してインストールに必要なパラメータを設定してきいます。

OASE Agentの設定
----------------

| OASE Agentを立ち上げる際の代表的な設定方法について紹介します。
| 下記の例では、永続ボリュームはhostPathで設定してます。

- シンプル構成
- 複数エージェント（同一Pod）
- 複数エージェント（別Pod）

パラメータ
^^^^^^^^^^

| 利用可能なパラメータについては下記を参照してください。

.. include:: ../../../include/helm_option_ita-ag-oase.rst

| ※リフレッシュトークンの取得に関しては :ref:`exastro_refresh_token` を参照してください。

OASE Agentのパラメータ設定例
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Agentの設定例を下記に記載します。

.. tabs::

   .. group-tab:: シンプル構成

      - 特徴

      | 1Podに1コンテナのシンプルな構成


      - 設定例

      1.  OASE Agentの設定

          | OASE Agentの設定します。

          .. code-block:: diff
           :caption: exastro-agent.yaml
           :linenos:
           :lineno-start: 13

           ita-ag-oase:
             agents:
               - image:
                   repository: ""
                   # Overrides the image tag whose default is the chart appVersion.
                   tag: "alpha.4ccca4.20240124-110529"
                   pullPolicy: IfNotPresent
                 extraEnv:
                   TZ: Asia/Tokyo
                   DEFAULT_LANGUAGE: ja
                   LANGUAGE: "en"
                   ITERATION: "500"
                   EXECUTE_INTERVAL: "10"
                   LOG_LEVEL: INFO
                   AGENT_NAME: "oase-agent"
           -       EXASTRO_URL: "http://platform-auth:8000"
           +       EXASTRO_URL: "http://your-exastro-url"                                   # Exastro IT Automation の Service URL
           -       EXASTRO_ORGANIZATION_ID: "org001"
           +       EXASTRO_ORGANIZATION_ID: "your-organization-id"                          # Exastro IT Automation で作成した OrganizationID
           -       EXASTRO_WORKSPACE_ID: "ws01"
           +       EXASTRO_WORKSPACE_ID: "your-workspace-id"                                # Exastro IT Automation で作成した WorkspaceID
                   # ROLES: "_ws_admin"
           -       EVENT_COLLECTION_SETTINGS_NAMES: "id0001"
           +       EVENT_COLLECTION_SETTINGS_NAMES: "your-event-collection-settigs-names"   # OASE管理 イベント収集 で作成した イベント収集設定名
                 secret:
           -       EXASTRO_REFRESH_TOKEN: "exastro_refresh_token"
           +       EXASTRO_REFRESH_TOKEN: "your_exastro_refresh_token"                      # サービスアカウントユーザー管理機能から取得したリフレッシュトークン
                   # EXASTRO_USERNAME: "admin"
                   # EXASTRO_PASSWORD: "sample-password"
           +       # EXASTRO_USERNAME: "your-ita-user-name"                # Exastro IT Automation で作成した ユーザー名（こちらを使用する場合はアンコメントしてください）
           +       # EXASTRO_PASSWORD: "your-ita-user-password"            # Exastro IT Automation で作成した パスワード（こちらを使用する場合はアンコメントしてください）

   .. group-tab:: 複数エージェント（同一Pod）

      - 特徴

      | 1Podに複数コンテナを立てる構成。
      | image以下を増やしていくことで複数構築可能だが、その分リソースは増やす必要があります。


      - 設定例

      1.  OASE Agentの設定

          | OASE Agentの設定します。

          .. code-block:: diff
           :caption: exastro-agent.yaml
           :linenos:
           :lineno-start: 13

           ita-ag-oase:
             agents:
               - image:
                   repository: ""
                   # Overrides the image tag whose default is the chart appVersion.
                   tag: "alpha.4ccca4.20240124-110529"
                   pullPolicy: IfNotPresent
                 extraEnv:
                   TZ: Asia/Tokyo
                   DEFAULT_LANGUAGE: ja
                   LANGUAGE: "en"
                   ITERATION: "500"
                   EXECUTE_INTERVAL: "10"
                   LOG_LEVEL: INFO
                   AGENT_NAME: "oase-agent"
           +       AGENT_NAME: "oase-agent-1"                                               # 起動する OASEエージェントの名前
           -       EXASTRO_URL: "http://platform-auth:8000"
           +       EXASTRO_URL: "http://your-exastro-url"                                   # Exastro IT Automation の Service URL
           -       EXASTRO_ORGANIZATION_ID: "org001"
           +       EXASTRO_ORGANIZATION_ID: "your-organization-id"                          # Exastro IT Automation で作成した OrganizationID
           -       EXASTRO_WORKSPACE_ID: "ws01"
           +       EXASTRO_WORKSPACE_ID: "your-workspace-id-1"                                # Exastro IT Automation で作成した WorkspaceID
                   # ROLES: "_ws_admin"
           -       EVENT_COLLECTION_SETTINGS_NAMES: "id0001"
           +       EVENT_COLLECTION_SETTINGS_NAMES: "your-event-collection-settigs-names-1"   # OASE管理 イベント収集 で作成した イベント収集設定名
                 secret:
           -       EXASTRO_REFRESH_TOKEN: "exastro_refresh_token"
           +       EXASTRO_REFRESH_TOKEN: "your_exastro_refresh_token"                      # Exastro システム管理画面から取得したリフレッシュトークン
                   # EXASTRO_USERNAME: "admin"
                   # EXASTRO_PASSWORD: "sample-password"
           +       # EXASTRO_USERNAME: "your-ita-user-name"                # Exastro IT Automation で作成した ユーザー名（こちらを使用する場合はアンコメントしてください）
           +       # EXASTRO_PASSWORD: "your-ita-user-password"            # Exastro IT Automation で作成した パスワード（こちらを使用する場合はアンコメントしてください）
           +   - image:
           +       repository: ""
           +       # Overrides the image tag whose default is the chart appVersion.
           +       tag: "alpha.4ccca4.20240124-110529"
           +       pullPolicy: IfNotPresent
           +     extraEnv:
           +       TZ: Asia/Tokyo
           +       DEFAULT_LANGUAGE: ja
           +       LANGUAGE: "en"
           +       ITERATION: "500"
           +       EXECUTE_INTERVAL: "10"
           +       LOG_LEVEL: INFO
           +       AGENT_NAME: "oase-agent-2"                                               # 起動する OASEエージェントの名前
           +       EXASTRO_URL: "http://your-exastro-url"                                   # Exastro IT Automation の Service URL
           +       EXASTRO_ORGANIZATION_ID: "your-organization-id"                          # Exastro IT Automation で作成した OrganizationID
           +       EXASTRO_WORKSPACE_ID: "your-workspace-id-2"                                # Exastro IT Automation で作成した WorkspaceID
           +       # ROLES: "_ws_admin"
           +       EVENT_COLLECTION_SETTINGS_NAMES: "your-event-collection-settigs-names-2"   # OASE管理 イベント収集 で作成した イベント収集設定名
           +     secret:
           +       EXASTRO_REFRESH_TOKEN: "your_exastro_refresh_token"                      # Exastro システム管理画面から取得したリフレッシュトークン
           +       EXASTRO_USERNAME: "your-ita-user-name"                                   # Exastro IT Automation で作成した ユーザー名
           +       EXASTRO_PASSWORD: "your-ita-user-password"                               # Exastro IT Automation で作成した パスワード


   .. group-tab:: 複数エージェント（別Pod）

      - 特徴

      | 複数のPodを立てる構成。
      | 不要エージェントを個別に停止できる利点がありますが、
      | それぞれのPodに対して永続化ボリュームを作成する必要があります。

      - 設定例

      1.  設定値ファイルを用意

          | exastro-agent.yamlをコピーして、exastro-agent-1.yamlを用意してください。
          | exastro-agent.yamlをコピーして、exastro-agent-2.yamlを用意してください。

      2.  一つ目のOASE Agentの設定

          .. code-block:: diff
           :caption: exastro-agent-1.yaml
           :linenos:
           :lineno-start: 13

           ita-ag-oase:
             agents:
               - image:
                   repository: ""
                   # Overrides the image tag whose default is the chart appVersion.
                   tag: ""
                   pullPolicy: IfNotPresent
                 extraEnv:
                   TZ: Asia/Tokyo
                   DEFAULT_LANGUAGE: ja
                   LANGUAGE: "en"
                   ITERATION: "500"
                   EXECUTE_INTERVAL: "10"
                   LOG_LEVEL: INFO
                   AGENT_NAME: "oase-agent"
           -       EXASTRO_URL: "http://platform-auth:8000"
           +       EXASTRO_URL: "http://your-exastro-url"                                   # Exastro IT Automation の Service URL
           -       EXASTRO_ORGANIZATION_ID: "org001"
           +       EXASTRO_ORGANIZATION_ID: "your-organization-id"                          # Exastro IT Automation で作成した OrganizationID
           -       EXASTRO_WORKSPACE_ID: "ws01"
           +       EXASTRO_WORKSPACE_ID: "your-workspace-id-1"                                # Exastro IT Automation で作成した WorkspaceID
                   # ROLES: "_ws_admin"
           -       EVENT_COLLECTION_SETTINGS_NAMES: "id0001"
           +       EVENT_COLLECTION_SETTINGS_NAMES: "your-event-collection-settigs-names-1"   # OASE管理 イベント収集 で作成した イベント収集設定名
                 secret:
           -       EXASTRO_REFRESH_TOKEN: "exastro_refresh_token"
           +       EXASTRO_REFRESH_TOKEN: "your_exastro_refresh_token"                      # Exastro システム管理画面から取得したリフレッシュトークン
                   # EXASTRO_USERNAME: "admin"
                   # EXASTRO_PASSWORD: "sample-password"
           +       # EXASTRO_USERNAME: "your-ita-user-name"                # Exastro IT Automation で作成した ユーザー名（こちらを使用する場合はアンコメントしてください）
           +       # EXASTRO_PASSWORD: "your-ita-user-password"            # Exastro IT Automation で作成した パスワード（こちらを使用する場合はアンコメントしてください）

      3.  一つ目のOASE Agentの定義名を設定

          .. code-block:: diff
           :caption: exastro-agent-1.yaml
           :linenos:
           :lineno-start: 45

             imagePullSecrets: []
           - nameOverride: ""
           + nameOverride: "ita-ag-oase-1"    # Exastro OASE Agent の定義名
             fullnameOverride: ""

      4.  一つ目のOASE AgentのmatchLabelsを設定

          .. code-block:: diff
           :caption: exastro-agent-1.yaml
           :linenos:
           :lineno-start: 64

             persistence:
               enabled: true
               reinstall: false
               accessMode: ReadWriteMany
               size: 10Gi
               volumeType: hostPath # e.g.) hostPath or AKS
               storageClass: "-" # e.g.) azurefile or - (None)
           -   # matchLabels:
           -   #   release: "stable"
           +   matchLabels:
           +     release: "pv-ita-ag-oase-1"    # 利用する永続ボリューム名を指定

      5.  二つ目のOASE Agentの設定

          .. code-block:: diff
           :caption: exastro-agent-2.yaml
           :linenos:
           :lineno-start: 13

           ita-ag-oase:
             agents:
               - image:
                   repository: ""
                   # Overrides the image tag whose default is the chart appVersion.
                   tag: ""
                   pullPolicy: IfNotPresent
                 extraEnv:
                   TZ: Asia/Tokyo
                   DEFAULT_LANGUAGE: ja
                   LANGUAGE: "en"
                   ITERATION: "500"
                   EXECUTE_INTERVAL: "10"
                   LOG_LEVEL: INFO
                   AGENT_NAME: "oase-agent"
           -       EXASTRO_URL: "http://platform-auth:8000"
           +       EXASTRO_URL: "http://your-exastro-url"                                     # Exastro IT Automation の Service URL
           -       EXASTRO_ORGANIZATION_ID: "org001"
           +       EXASTRO_ORGANIZATION_ID: "your-organization-id"                            # Exastro IT Automation で作成した OrganizationID
           -       EXASTRO_WORKSPACE_ID: "ws01"
           +       EXASTRO_WORKSPACE_ID: "your-workspace-id-2"                                # Exastro IT Automation で作成した WorkspaceID
                   # ROLES: "_ws_admin"
           -       EVENT_COLLECTION_SETTINGS_NAMES: "id0001"
           +       EVENT_COLLECTION_SETTINGS_NAMES: "your-event-collection-settigs-names-2"   # OASE管理 イベント収集 で作成した イベント収集設定名
                 secret:
           -       EXASTRO_REFRESH_TOKEN: "exastro_refresh_token"
           +       EXASTRO_REFRESH_TOKEN: "your_exastro_refresh_token"                      # Exastro システム管理画面から取得したリフレッシュトークン
                   # EXASTRO_USERNAME: "admin"
                   # EXASTRO_PASSWORD: "sample-password"
           +       # EXASTRO_USERNAME: "your-ita-user-name"                # Exastro IT Automation で作成した ユーザー名（こちらを使用する場合はアンコメントしてください）
           +       # EXASTRO_PASSWORD: "your-ita-user-password"            # Exastro IT Automation で作成した パスワード（こちらを使用する場合はアンコメントしてください）

      6.  二つ目のOASE Agentの定義名を設定します。

          .. code-block:: diff
           :caption: exastro-agent-2.yaml
           :linenos:
           :lineno-start: 45

             imagePullSecrets: []
           - nameOverride: ""
           + nameOverride: "ita-ag-oase-2"    # Exastro OASE Agent の定義名
             fullnameOverride: ""

      7.  二つ目のOASE AgentのmatchLabelsを設定

          .. code-block:: diff
           :caption: exastro-agent-2.yaml
           :linenos:
           :lineno-start: 64

             persistence:
               enabled: true
               reinstall: false
               accessMode: ReadWriteMany
               size: 10Gi
               volumeType: hostPath # e.g.) hostPath or AKS
               storageClass: "-" # e.g.) azurefile or - (None)
           -   # matchLabels:
           -   #   release: "stable"
           +   matchLabels:
           +     release: "pv-ita-ag-oase-2"    # 利用する永続ボリューム名を指定

.. _agent_persistent_volume:

永続ボリュームの設定
--------------------

| データベースのデータ永続化 (クラスタ内コンテナがある場合)、および、ファイルの永続化のために、永続ボリュームを設定する必要があります。
| 永続ボリュームの詳細については、 `永続ボリューム - Kubernetes <https://kubernetes.io/ja/docs/concepts/storage/persistent-volumes/#%E6%B0%B8%E7%B6%9A%E3%83%9C%E3%83%AA%E3%83%A5%E3%83%BC%E3%83%A0>`_ を参照してください。

.. tabs::

   .. group-tab:: Kubernetes ノードのディレクトリ

      - 特徴

      | Kubernetes のノード上のストレージ領域を利用するため、別途ストレージを調達する必要はありませんが、この方法は非推奨のため検証や開発時のみの利用

      .. danger::
          | データの永続化自体は可能ですが、コンピュートノードの増減や変更によりデータが消えてしまう可能性があるため本番環境では使用しないでください。
          | また、Azure で構築した AKS クラスタは、クラスタを停止すると AKS クラスターの Node が解放されるため、保存していた情報は消えてしまいます。そのため、Node が停止しないように注意が必要となります。

      - 利用例

      | hostPath を使用した例を記載します。

      .. tabs::

         .. group-tab:: シンプル構成 & 複数エージェント（同一Pod）

            .. code-block:: diff
              :caption: pv-ita-ag-oase.yaml
              :linenos:

              # pv-ita-ag-oase.yaml
              apiVersion: v1
              kind: PersistentVolume
              metadata:
                name: pv-ita-ag-oase
              spec:
                claimRef:
                  name: pvc-ita-ag-oase
                  namespace: exastro
                capacity:
                  storage: 10Gi
                accessModes:
                  - ReadWriteMany
                persistentVolumeReclaimPolicy: Retain
                hostPath:
                  path: /var/data/exastro-suite/exastro-agent/ita-ag-oase
                  type: DirectoryOrCreate


         .. group-tab:: 複数エージェント（別Pod）

            .. code-block:: diff
              :caption: pv-ita-ag-oase-1.yaml
              :linenos:

              # pv-ita-ag-oase-1.yaml
              apiVersion: v1
              kind: PersistentVolume
              metadata:
                name: pv-ita-ag-oase-1
              spec:
                claimRef:
                  name: pvc-ita-ag-oase-1
                  namespace: exastro
                capacity:
                  storage: 10Gi
                accessModes:
                  - ReadWriteMany
                persistentVolumeReclaimPolicy: Retain
                hostPath:
                  path: /var/data/exastro-suite/exastro-agent/ita-ag-oase-1
                  type: DirectoryOrCreate

            .. code-block:: diff
              :caption: pv-ita-ag-oase-2.yaml
              :linenos:

              # pv-ita-ag-oase-2.yaml
              apiVersion: v1
              kind: PersistentVolume
              metadata:
                name: pv-ita-ag-oase-2
              spec:
                claimRef:
                  name: pvc-ita-ag-oase-2
                  namespace: exastro
                capacity:
                  storage: 10Gi
                accessModes:
                  - ReadWriteMany
                persistentVolumeReclaimPolicy: Retain
                hostPath:
                  path: /var/data/exastro-suite/exastro-agent/ita-ag-oase-2
                  type: DirectoryOrCreate

.. _インストール-2:

インストール
============

永続ボリュームの作成
--------------------

| :ref:`agent_persistent_volume` で作成したマニフェストファイルを適用し、ボリュームを作成します。

.. code-block:: bash

    # pv-ita-ag-oase.yaml
    kubectl apply -f pv-ita-ag-oase.yaml

    # 複数エージェント（別Pod）の場合は下記を実施
    # pv-ita-ag-oase-1.yaml
    kubectl apply -f pv-ita-ag-oase-1.yaml

    # pv-ita-ag-oase-2.yaml
    kubectl apply -f pv-ita-ag-oase-2.yaml


.. code-block:: bash

    # 確認
    kubectl get pv

.. code-block:: bash

    NAME              CAPACITY   ACCESS MODES   RECLAIM POLICY    STATUS      CLAIM     STORAGECLASS   REASON   AGE
    pv-ita-ag-oase     10Gi       RWX            Retain           Available                                     6s

.. code-block:: bash

    NAME              CAPACITY   ACCESS MODES   RECLAIM POLICY    STATUS      CLAIM     STORAGECLASS   REASON   AGE
    pv-ita-ag-oase-1   10Gi       RWX            Retain           Available                                     5s
    pv-ita-ag-oase-2   10Gi       RWX            Retain           Available                                     6s

インストール
------------

| Helm バージョンとアプリケーションのバージョンについては `exastro-helmのサイト <https://github.com/exastro-suite/exastro-helm>`_ をご確認ください。

.. tabs::

   .. group-tab:: シンプル構成 & 複数エージェント（同一Pod）

      | 1. Helm コマンドを使い Kubernetes 環境にインストールを行います。

      .. code-block:: bash
         :caption: コマンド

         helm install exastro-agent exastro/exastro-agent \
           --namespace exastro --create-namespace \
           --values exastro-agent.yaml

      .. code-block:: bash
         :caption: 出力結果

         NAME: exastro-agent
         LAST DEPLOYED: Wed Feb 14 14:36:27 2024
         NAMESPACE: exastro
         STATUS: deployed
         REVISION: 1
         TEST SUITE: None

      | 2. インストール状況確認

      .. code-block:: bash
         :caption: コマンド

         # Pod の一覧を取得
         kubectl get po --namespace exastro

         | 正常に起動している場合は、“Running” となります。
         | ※正常に起動するまで数分かかる場合があります。

      .. code-block:: bash
         :caption: 出力結果

         NAME                             READY   STATUS    RESTARTS   AGE
         ita-ag-oase-66cb7669c6-m2q8c     1/1     Running   0          16m

   .. group-tab:: 複数エージェント（別Pod）

      | 1. Helm コマンドを使い Kubernetes 環境にインストールを行います。

      .. code-block:: bash
         :caption: コマンド

         helm install exastro-agent-1 exastro/exastro-agent \
           --namespace exastro --create-namespace \
           --values exastro-agent-1.yaml

      .. code-block:: bash
         :caption: 出力結果

         NAME: exastro-agent-1
         LAST DEPLOYED: Wed Feb 14 14:36:27 2024
         NAMESPACE: exastro
         STATUS: deployed
         REVISION: 1
         TEST SUITE: None

      .. code-block:: bash
         :caption: コマンド

         helm install exastro-agent-2 exastro/exastro-agent \
           --namespace exastro --create-namespace \
           --values exastro-agent-2.yaml

      .. code-block:: bash
         :caption: 出力結果

         NAME: exastro-agent-2
         LAST DEPLOYED: Wed Feb 14 14:36:27 2024
         NAMESPACE: exastro
         STATUS: deployed
         REVISION: 1
         TEST SUITE: None

      | 2. インストール状況確認

      .. code-block:: bash
         :caption: コマンド

         # Pod の一覧を取得
         kubectl get po --namespace exastro

         | 正常に起動している場合は、“Running” となります。
         | ※正常に起動するまで数分かかる場合があります。

      .. code-block:: bash
         :caption: 出力結果

         NAME                             READY   STATUS    RESTARTS   AGE
         ita-ag-oase-1-66cb7669c6-m2q8c   1/1     Running   0          16m
         ita-ag-oase-2-787fb97f75-9s7xj   1/1     Running   0          13m


アップグレード
==============

| OASE Agentのアップグレード方法について紹介します。

アップグレードの準備
--------------------

.. warning::
  | アップグレード実施前に :doc:`../../../manuals/maintenance/backup_and_restore` の手順に従い、バックアップを取得しておくことを推奨します。
  | バックアップ対象は、ファイル（`name: ITA_STORAGEPATH`）に含まれます。

| 更新前のバージョンを確認します。

.. code-block:: shell
   :linenos:
   :caption: コマンド

   # リポジトリ情報の確認
   helm search repo exastro

.. code-block:: shell
   :linenos:
   :caption: 実行結果
   :emphasize-lines: 4

   helm search repo exastro
   NAME                            CHART VERSION   APP VERSION     DESCRIPTION
   exastro/exastro                         1.3.24          2.3.0           A Helm chart for Exastro. Exastro is an Open So...
   exastro/exastro-agent                   1.0.3           2.3.0           A Helm chart for Exastro IT Automation. Exastro...
   exastro/exastro-it-automation           1.4.22          2.3.0           A Helm chart for Exastro IT Automation. Exastro...
   exastro/exastro-platform                1.7.14          1.7.0           A Helm chart for Exastro Platform. Exastro Plat...

| Helm リポジトリを更新します。

.. code-block:: shell
   :linenos:
   :caption: コマンド

   # リポジトリ情報の更新
   helm repo update

| 更新後のバージョンを確認します。

.. code-block:: shell
   :linenos:
   :caption: コマンド

   # リポジトリ情報の確認
   helm search repo exastro

.. code-block:: shell
   :linenos:
   :caption: 実行結果
   :emphasize-lines: 4

   helm search repo exastro
   NAME                            CHART VERSION   APP VERSION     DESCRIPTION
   exastro/exastro                    1.4.3           2.4.0           A Helm chart for Exastro. Exastro is an Open So...
   exastro/exastro-agent              2.4.0           2.4.0           A Helm chart for Exastro IT Automation. Exastro...
   exastro/exastro-it-automation      2.4.1           2.4.0           A Helm chart for Exastro IT Automation. Exastro...
   exastro/exastro-platform           1.8.1           1.8.0           A Helm chart for Exastro Platform. Exastro Plat...

アップグレード
--------------

サービス停止
^^^^^^^^^^^^

.. include:: ../../../include/stop_service_k8s_agent.rst

アップグレード実施
^^^^^^^^^^^^^^^^^^

| アップグレードを実施します。

.. code-block:: bash
  :caption: コマンド

  helm upgrade exastro-agent exastro/exastro-agent \
    --namespace exastro \
    --values exastro-agent.yaml

.. code-block:: bash
  :caption: 出力結果

  Release "exastro-agent" has been upgraded. Happy Helming!
  NAME: exastro-agent
  LAST DEPLOYED: Mon Apr 22 14:42:59 2024
  NAMESPACE: exastro
  STATUS: deployed
  REVISION: 2
  TEST SUITE: None

サービス再開
^^^^^^^^^^^^

.. include:: ../../../include/start_service_k8s_agent.rst


アップグレード状況確認
^^^^^^^^^^^^^^^^^^^^^^

| コマンドラインから以下のコマンドを入力して、アップグレードが完了していることを確認します。

.. code-block:: bash
   :caption: コマンド

   # Pod の一覧を取得
   kubectl get po --namespace exastro

| 正常に起動している場合は、Running” となります。
| ※正常に起動するまで数分かかる場合があります。

.. code-block:: bash
   :caption: 出力結果

   NAME                                                      READY   STATUS      RESTARTS   AGE
   ita-ag-oase-7ff9488b55-rrn58                              1/1     Running     0             81s

アンインストール
================

| OASE Agentのアンインストール方法について紹介します。

アンインストールの準備
----------------------

.. warning::
  | アンインストール実施前に :doc:`../../../manuals/maintenance/backup_and_restore` の手順に従い、バックアップを取得しておくことを推奨します。

アンインストール
----------------

アンインストール実施
^^^^^^^^^^^^^^^^^^^^

| アンインストールを実施します。

.. code-block:: bash
  :caption: コマンド

  helm uninstall exastro-agent --namespace exastro

.. code-block:: bash
  :caption: 出力結果

  release "exastro-agent" uninstalled

永続ボリュームを削除
^^^^^^^^^^^^^^^^^^^^

| Persitent Volume（PV） を Kubernetes 上に hostPath で作成した場合の方法を記載します。
| マネージドデータベースを含む外部データベースを利用している場合は、環境にあったデータ削除方法を実施してください。

エージェント用
**************

.. warning::
  | エージェント用のPVが複数存在する場合はそれらすべての削除を実施してください。

.. code-block:: bash
  :caption: コマンド

  kubectl delete pv pv-ita-ag-oase

.. code-block:: bash
  :caption: 実行結果

  persistentvolume "pv-ita-ag-oase" deleted

永続データを削除
^^^^^^^^^^^^^^^^

| Kubernetes のコントロールノードにログインし、データを削除します。

エージェント用
**************

| 下記コマンドは、Persistent Volume 作成時の hostPath に :file:`/var/data/exastro-suite/exastro-agent/ita-ag-oase` を指定した場合の例です。

.. code-block:: bash
   :caption: コマンド

   # 永続データがあるコントロールノードにログイン
   ssh user@contol.node.example

   # 永続データの削除
   sudo rm -rf /var/data/exastro-suite/exastro-agent/ita-ag-oase

