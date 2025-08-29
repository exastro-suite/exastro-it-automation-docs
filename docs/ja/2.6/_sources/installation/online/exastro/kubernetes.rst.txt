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

==============================
Exastro on Kubernetes - Online
==============================

目的
====

| 本書では、Exastro IT Automation を利用する際に必要となる、Exastro Platform および Exastro IT Automation を Kubernetes 上に導入する手順について説明します。

特徴
====

| 高い可用性やサービスレベルを必要とされる際の、Exastro IT Automation の導入方法となります。
| 評価や一時的な利用など、簡単に利用を開始したい場合には、:doc:`Docker Compose 版<docker_compose>` の利用を推奨します。

前提条件
========

| Kubernetesクラスターのシステム要件については :doc:`構成・構築ガイド<../../../configuration/kubernetes/kubernetes>` を参照してください。

- クライアント要件

  | 動作確認が取れているクライアントアプリケーションのバージョンは下記のとおりです。

  .. list-table:: クライアント要件
   :widths: 20, 20
   :header-rows: 1

   * - アプリケーション
     - バージョン
   * - Helm
     - v3.9.x, v3.18
   * - kubectl
     - 1.23, 1.31

インストールの準備
==================

Helm リポジトリの登録
---------------------

| Exastro システムは、以下の2つのアプリケーションから構成されています。
| Exastro の全ツールは同一の Helm リポジトリ上に存在しています。

- 共通基盤 (Exastro Platform)
- Exastro IT Automation

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

   helm show values exastro/exastro > exastro.yaml

.. raw:: html

   <details>
     <summary>exastro.yaml</summary>

.. literalinclude:: ../../literal_includes/exastro.yaml
   :caption: exastro.yaml
   :language: yaml
   :linenos:

.. raw:: html

   </details>

| 以降の手順では、この :file:`exastro.yaml` に対してインストールに必要なパラメータを設定してきいます。

.. _service_setting:

サービス公開の設定
------------------

| Exastro サービスを公開するための代表的な3つの設定方法について紹介します。

- Ingress
- LoadBalancer
- NodePort

.. note::
  | ここで紹介する方法以外にもサービス公開方法はあります。ユーザーの環境ごとに適切な構成・設定を選択してください。

パラメータ
^^^^^^^^^^

| 利用可能なパラメータについては下記を参照してください。

.. include:: ../../../include/helm_option_platform-auth.rst

設定例
^^^^^^

| 各サービス公開方法の設定例を下記に記載します。

.. tabs::

   .. group-tab:: Ingress

      .. _ingress_setting:

      |

      - 特徴

        | パブリッククラウドなどで Ingress Controller が利用可能な場合、Ingress を使ったサービス公開ができます。
        | クラスタ内にロードバランサーを構築して、ユーザー自身が運用したい場合などにメリットがあります。

      - 設定例

        | サービス公開用のドメイン情報を Ingress に登録することでDNSを使ったサービス公開を行います。
        | Azure におけるドメイン名の確認方法については :doc:`../../../configuration/kubernetes/aks` を確認してください。
        | クラウドプロバイダ毎に必要な :kbd:`annotations` を指定してください。
        | 下記は、AKS の Ingress Controller を使用する際の例を記載しています。

        .. literalinclude:: ../../literal_includes/exastro_ingress_setting.yaml
           :diff: ../../literal_includes/exastro.yaml
           :caption: exastro.yaml
           :language: yaml

        | ※ 大容量ファイルのアップロードなどで処理に時間が掛かる場合は、想定する最大時間(秒数)の設定が必要となります。

        .. code-block:: shell
           :caption: ingress - annotations

           nginx.ingress.kubernetes.io/proxy-read-timeout: "300"

        | ※ Ingress を使用して HTTPS 接続を有効にする際は、以下の設定が必要となります。

        .. code-block:: diff
           :caption: exastro.yaml

              platform-auth:
                extraEnv:
                  # Please set the URL to access
           -      EXTERNAL_URL: "http://exastro-suite.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io"
           -      EXTERNAL_URL_MNG: "http://exastro-suite-mng.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io"
           +      EXTERNAL_URL: "https://exastro-suite.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io"
           +      EXTERNAL_URL_MNG: "https://exastro-suite-mng.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io"
                ingress:
                  enabled: true
                  annotations:
                    kubernetes.io/ingress.class: addon-http-application-routing
                    nginx.ingress.kubernetes.io/proxy-body-size: "0"
                    nginx.ingress.kubernetes.io/proxy-read-timeout: "300"
                    nginx.ingress.kubernetes.io/proxy-buffer-size: 256k
                    nginx.ingress.kubernetes.io/server-snippet: |
                      client_header_buffer_size 100k;
                      large_client_header_buffers 4 100k;
                  hosts:
                    - host: exastro-suite.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io
                      paths:
                        - path: /
                          pathType: Prefix
                          backend: "http"
                    - host: exastro-suite-mng.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io
                      paths:
                        - path: /
                          pathType: Prefix
                          backend: "httpMng"
           -      tls: []
           +      tls:
           +        - secretName: exastro-suite-tls
           +          hosts:
           +            - exastro-suite.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io
           +            - exastro-suite-mng.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io
           -      secrets: []
           +      secrets:
           +        - name: exastro-suite-tls
           +          certificate: |-
           +            -----BEGIN CERTIFICATE-----
           +            ...
           +            -----END CERTIFICATE-----
           +          key: |-
           +            -----BEGIN PRIVATE KEY-----
           +            ...
           +            -----END PRIVATE KEY-----


   .. group-tab:: LoadBalancer

      |

      - 特徴

        | パブリッククラウドなどで LoadBalancer が利用可能な場合、LoadBalancer を使ったサービス公開ができます。
        | Ingress とは異なり、クラスタ外部(多くは、パブリッククラウドのサービス上)にロードバランサーがデプロイされるため、ユーザー自身が運用する必要がないことにメリットがあります。

      - 設定例

        | :kbd:`service.type` に :kbd:`LoadBalancer` を設定することで、LoadBalancer を使ったサービス公開ができます。
        | 下記は、LoadBalancer を使用する際の例を記載しています。

        .. literalinclude:: ../../literal_includes/exastro_loadbalancer_setting.yaml
           :diff: ../../literal_includes/exastro.yaml
           :caption: exastro.yaml
           :language: yaml

   .. group-tab:: NodePort

      |

      - 特徴

        | ユーザー自身の環境でロードバランサーを準備する、もしくは、検証などの環境では NodePort を使ったサービス公開ができます。
        | Ingress や LoadBalancer とは異なり、ネイティブな Kubernetes で利用可能です。

      - 設定例

        | :kbd:`service.type` に :kbd:`NodePort` を設定することで、NodePort を使ったサービス公開ができます。
        | 下記は、NodePort を使用する際の例を記載しています。

        .. literalinclude:: ../../literal_includes/exastro_nodeport_setting.yaml
           :diff: ../../literal_includes/exastro.yaml
           :caption: exastro.yaml
           :language: yaml

.. _DATABASE_SETUP:

データベース連携
----------------

| Exastro サービスを利用するためには、CMDB やオーガナイゼーションの管理のためのデータベースが必要となります。
| データベース利用時の3つの設定方法について説明します。

- 外部データベース
- データベースコンテナ

.. tabs::

   .. tab:: 外部データベース

      | 外部データベースを利用する場合は、以下の内容に従ってインストールを進める必要があります。

      - | 特徴

      | マネージドデータベースや別途用意した Kubernetes クラスタ外のデータベースを利用します。
      | Kubernetes クラスタ外にあるため、環境を分離して管理することが可能です。

      .. warning::

         | 複数のITAを構築する場合はlower_case_table_namesの設定を統一してください。
         | ※統一しないと環境間でのメニューエクスポート・インポートが正常に動作しなくなる可能性があります。

      - | 設定例

      | 外部データベースを操作するために必要な接続情報を設定します。

      .. warning::
        | :command:`DB_ADMIN_USER` と :command:`MONGO_ADMIN_USER` で指定するDBの管理ユーザには、データベースとユーザを作成する権限が必要です。

      .. warning::
        | 認証情報などはすべて平文で問題ありません。(Base64エンコードは不要)

      .. warning::
         | :command:`DB_ADMIN_USER` で指定するDBの管理ユーザーには、データベースとユーザーを作成する権限が必要です。

      .. warning::
         | 認証情報などはすべて平文で問題ありません。(Base64エンコードは不要)

      1. | Exastro IT Automation 用データベースの設定

         | データベースの接続情報を設定します。

         .. include:: ../../../include/helm_option_itaDatabaseDefinition.rst

         .. literalinclude:: ../../literal_includes/exastro_ita_database.yaml
            :diff: ../../literal_includes/exastro.yaml
            :caption: exastro.yaml
            :language: yaml

      2. | Exastro 共通基盤用データベースの設定

         | データベースの接続情報を設定します。

         .. include:: ../../../include/helm_option_pfDatabaseDefinition.rst

         .. literalinclude:: ../../literal_includes/exastro_pf_database.yaml
            :diff: ../../literal_includes/exastro.yaml
            :caption: exastro.yaml
            :language: yaml

      3.  OASE用データベースの設定

          | OASE用データベースの接続情報を設定します。(OASEを利用しない場合設定不要)

          .. warning::
             | MongoDBのユーザやデータベースを「自動払い出し( :ref:`organization_creation` )」で利用する場合は、:command:`MONGO_HOST` の指定が必要です。
             | :command:`MONGO_ADMIN_USER` がユーザやデータベースの作成・削除が可能（rootロールまたは同等の権限）である必要があります。
             | 上記の権限がない場合は「Python接続文字列( :ref:`organization_creation` )」の指定が必要です。
             | また、自動払い出しを利用しない場合は :command:`MONGO_HOST` の指定は不要です。

          .. include:: ../../../include/helm_option_mongoDefinition.rst

          .. literalinclude:: ../../literal_includes/exastro_mongo_database.yaml
             :diff: ../../literal_includes/exastro.yaml
             :caption: exastro.yaml
             :language: yaml

      4.  データベースコンテナの無効化

          | データベースコンテナが起動しないように設定します。

          .. include:: ../../../include/helm_option_databaseDefinition.rst

          .. literalinclude:: ../../literal_includes/exastro_database_disabled.yaml
             :diff: ../../literal_includes/exastro.yaml
             :caption: exastro.yaml
             :language: yaml

      5.  MongoDBコンテナの無効化

          | MongoDBコンテナが起動しないように設定します。(OASEを利用しない場合も設定必要)

          .. include:: ../../../include/helm_option_mongo.rst

          .. literalinclude:: ../../literal_includes/exastro_mongodb_disabled.yaml
             :diff: ../../literal_includes/exastro.yaml
             :caption: exastro.yaml
             :language: yaml

   .. tab:: データベースコンテナ

      - | 特徴

      | Kubernetes クラスタ内にデプロイしたデータベースコンテナを利用します。
      | Exastro と同じ Kubernetes クラスタにコンテナとして管理できます。

      - | 設定例

      | データベースコンテナの root パスワードを作成し、他のコンテナからもアクセスできるように作成した root アカウントのパスワードを設定します。
      | また、データベースのデータを永続化するために利用するストレージを指定します。

      .. warning::
        | :command:`DB_ADMIN_USER` と :command:`MONGO_ADMIN_USER` で指定するDBの管理ユーザには、データベースとユーザを作成する権限が必要です。

      .. warning::
        | 認証情報などはすべて平文で問題ありません。(Base64エンコードは不要)

      .. _configuration_database_container:

      1. | データベースコンテナの設定

         | データベースコンテナの root パスワードを設定します。
         | また、データベースのデータを永続化するために利用するストレージを指定します。

         .. include:: ../../../include/helm_option_databaseDefinition.rst

         .. tabs::

           .. tab:: Storage Class 利用

              .. literalinclude:: ../../literal_includes/exastro_database_storage_class.yaml
                 :diff: ../../literal_includes/exastro.yaml
                 :caption: exastro.yaml
                 :language: yaml

           .. tab:: hostPath 利用

              .. literalinclude:: ../../literal_includes/exastro_database_hostpath.yaml
                 :diff: ../../literal_includes/exastro.yaml
                 :caption: exastro.yaml
                 :language: yaml

      2.  | Exastro IT Automation 用データベースの設定

          | Exastro IT Automation コンテナがデータベースに接続できるようにするために、:ref:`DATABASE_SETUP` で作成した root アカウントのパスワードを設定します。

          .. include:: ../../../include/helm_option_itaDatabaseDefinition.rst

          .. literalinclude:: ../../literal_includes/exastro_database_ita_setting.yaml
             :diff: ../../literal_includes/exastro.yaml
             :caption: exastro.yaml
             :language: yaml

      3.  | Exastro 共通基盤用データベースの設定

          | Exastro 共通基盤のコンテナがデータベースに接続できるようにするために、「1.  データベースコンテナの設定」で作成した root アカウントのパスワードを設定します。

          .. include:: ../../../include/helm_option_pfDatabaseDefinition.rst

          .. literalinclude:: ../../literal_includes/exastro_database_pf_setting.yaml
             :diff: ../../literal_includes/exastro.yaml
             :caption: exastro.yaml
             :language: yaml

      4.  OASE用データベースの設定

          | OASE用データベースの接続情報を設定します。

          .. warning::
             | MongoDBのユーザやデータベースを「自動払い出し( :ref:`organization_creation` )」で利用する場合は、:command:`MONGO_HOST` の指定が必要です。
             | :command:`MONGO_ADMIN_USER` がユーザやデータベースの作成・削除が可能（rootロールまたは同等の権限）である必要があります。
             | 上記の権限がない場合は「Python接続文字列( :ref:`organization_creation` )」の指定が必要です。
             | また、自動払い出しを利用しない場合は :command:`MONGO_HOST` の指定は不要です。

          .. include:: ../../../include/helm_option_mongoDefinition.rst

          .. literalinclude:: ../../literal_includes/exastro_database_mongo_setting.yaml
             :diff: ../../literal_includes/exastro.yaml
             :caption: exastro.yaml
             :language: yaml

      5.  MongoDBコンテナの設定

          | データベースのデータを永続化するために利用するストレージを指定します

          .. warning::
             | MongoDBコンテナを利用しない場合、:command:`exastro-platform.mongo.enabled` をfalseに指定して下さい。

          .. include:: ../../../include/helm_option_mongo.rst

          .. tabs::

            .. tab:: hostPath 利用

               .. literalinclude:: ../../literal_includes/exastro_mongodb_hostpath.yaml
                  :diff: ../../literal_includes/exastro.yaml
                  :caption: exastro.yaml
                  :language: yaml

      6.  データベースコンテナのProbe設定

          | データベースコンテナおよびMongoDBコンテナのLivenessProbe, ReadinessProbeはデフォルトで以下の設定値が適用されています。

          .. tabs::

            .. tab:: データベースコンテナ

                .. include:: ../../../include/helm_option_database_probe.rst

            .. tab:: MongoDBコンテナ

                .. include:: ../../../include/helm_option_mongodb_probe.rst

          | データベースコンテナおよびMongoDBコンテナのLivenessProbe, ReadinessProbeの設定値を変更したい場合は、以下のようにパラメータを追記します。

          .. literalinclude:: ../../literal_includes/exastro_database_probe_setting.yaml
             :diff: ../../literal_includes/exastro.yaml
             :caption: exastro.yaml
             :language: yaml

          .. | データベースコンテナおよびMongoDBコンテナのProbeを無効にしたい場合は、以下のようにパラメータを追記します。

          .. .. literalinclude:: ../../literal_includes/exastro_database_probe_invalid_setting.yaml
          ..    :diff: ../../literal_includes/exastro.yaml
          ..    :caption: exastro.yaml
          ..    :language: yaml

          .. .. tip::
          ..    | Probe設定を無効にしてインストールすると、インストール中に以下のようなwarningメッセージが表示されますが、無視して問題ありません。

          ..    .. code-block:: shell
          ..       :caption: メッセージ

          ..       warning: cannot overwrite table with non table for exastro.exastro-platform.mariadb.livenessProbe
          ..       warning: cannot overwrite table with non table for exastro.exastro-platform.mariadb.readinessProbe

.. _installation_kubernetes_Keycloak 設定:

アプリケーションの DB ユーザー設定
----------------------------------

| Exastro でアプリケーションのために作成する DB ユーザーの設定をします。

設定例
^^^^^^

| 下記のアプリケーションが利用・作成する DB ユーザーをそれぞれ設定します。

- Exastro IT Automation
- Exastro 共通基盤
- Keycloak

.. warning::
  | 認証情報などはすべて平文で問題ありません。(Base64エンコードは不要)

1. | Exastro IT Automation 用データベースの設定

   | アプリケーションが利用・作成する DB ユーザーを設定します。

   .. include:: ../../../include/helm_option_itaDatabaseDefinition.rst

   .. literalinclude:: ../../literal_includes/exastro_db_user_ita.yaml
      :diff: ../../literal_includes/exastro.yaml
      :caption: exastro.yaml
      :language: yaml

2. | Keycloak 用データベースの設定

   | アプリケーションが利用・作成する DB ユーザーを設定します。

   .. include:: ../../../include/helm_option_keycloakDefinition.rst

   .. literalinclude:: ../../literal_includes/exastro_db_user_keycloak.yaml
      :diff: ../../literal_includes/exastro.yaml
      :caption: exastro.yaml
      :language: yaml

3. | Exastro 共通基盤用データベースの設定

   | アプリケーションが利用・作成する DB ユーザーを設定します。

   .. include:: ../../../include/helm_option_pfDatabaseDefinition.rst

   .. literalinclude:: ../../literal_includes/exastro_db_user_pf.yaml
      :diff: ../../literal_includes/exastro.yaml
      :caption: exastro.yaml
      :language: yaml

.. _installation_kubernetes_gitlablinkage:

GitLab 連携設定
---------------

| GitLab 連携のための接続情報を登録します。

.. warning::
     | GitLab 連携を利用しない場合は、下記のように設定してください。
     | GITLAB_HOST: ""

.. include:: ../../../include/helm_option_gitlabDefinition.rst

.. warning::
  | GITLAB_ROOT_TOKEN は下記の権限スコープが割り当てられたトークンが必要です。
  | ・api
  | ・write_repository
  | ・sudo

| 下記は、GitLab 連携の設定例を記載しています。

.. literalinclude:: ../../literal_includes/exastro_gitlab_setting.yaml
   :diff: ../../literal_includes/exastro.yaml
   :caption: exastro.yaml
   :language: yaml

.. _installation_kubernetes_proxy_settings:

Proxy設定
---------

| Proxy環境下で、Exastroシステムを利用する際の情報を設定します。

.. include:: ../../../include/helm_option_proxyDefinition.rst

.. _create_system_manager:
.. _install_helm:

システム管理者の作成
--------------------

| セットアップ時に システム管理者の初期ユーザーを作成するための情報を設定します。

.. include:: ../../../include/helm_option_keycloakDefinition.rst

.. literalinclude:: ../../literal_includes/exastro_usercreate_system_manager.yaml
   :diff: ../../literal_includes/exastro.yaml
   :caption: exastro.yaml
   :language: yaml

.. _persistent_volume:

永続ボリュームの設定
--------------------

| データベースのデータ永続化 (クラスタ内コンテナがある場合)、および、ファイルの永続化のために、永続ボリュームを設定する必要があります。
| 永続ボリュームの詳細については、 `永続ボリューム - Kubernetes <https://kubernetes.io/ja/docs/concepts/storage/persistent-volumes/#%E6%B0%B8%E7%B6%9A%E3%83%9C%E3%83%AA%E3%83%A5%E3%83%BC%E3%83%A0>`_ を参照してください。

| ストレージ利用時の2つの方法について説明します。

.. note::
    | 監査ログを永続ボリュームに出力する際は、永続ボリュームの設定が必要となります。

- マネージドディスク
- Kubernetes ノードのディレクトリ

.. tabs::

   .. tab:: マネージドディスク

      |

      - 特徴

        | パブリッククラウドで提供されるストレージサービスを利用することでストレージの構築や維持管理が不要となります。

      - 設定例

        | Azure のストレージを利用する場合、下記のように StorageClass を定義することで利用が可能です。
        | 詳細は、 `Azure Kubernetes Service (AKS) でのアプリケーションのストレージ オプション <https://learn.microsoft.com/ja-jp/azure/aks/concepts-storage#storage-classes>`_ を参照してください。

        .. literalinclude:: ../../literal_includes/storage-class-exastro-suite.yaml
           :caption: storage-class-exastro-suite.yaml
           :linenos:

        .. code-block:: diff
           :caption: exastro.yaml

             itaGlobalDefinition:
               persistence:
                 enabled: true
                 accessMode: ReadWriteMany
                 size: 10Gi
                 volumeType: hostPath # e.g.) hostPath or AKS
           -      storageClass: "-" # e.g.) azurefile or - (None)
           +      storageClass: "azurefile" # e.g.) azurefile or - (None)

        | ※ 下記は、:ref:`DATABASE_SETUP` で設定済みです。

        .. code-block:: diff
           :caption: exastro.yaml

             databaseDefinition:
               persistence:
                 enabled: true
                 reinstall: false
                 accessMode: ReadWriteOnce
                 size: 20Gi
                 volumeType: hostPath # e.g.) hostPath or AKS
           -      storageClass: "-" # e.g.) azurefile or - (None)
           +      storageClass: "exastro-suite-azurefile-csi-nfs" # e.g.) azurefile or - (None)

        | ※ 監査ログを永続ボリュームに出力する際は、以下の設定が必要となります

        .. code-block:: diff
           :caption: exastro.yaml

             pfAuditLogDefinition:
               name: pf-auditlog
               persistence:
           -      enabled: false
           +      enabled: true
                 reinstall: false
                 accessMode: ReadWriteMany
                 size: 10Gi
                 volumeType: hostPath # e.g.) hostPath or AKS
           -      storageClass: "-" # e.g.) azurefile or - (None)
           +      storageClass: "exastro-suite-azurefile-csi-nfs" # e.g.) azurefile or - (None)

   .. tab:: Kubernetes ノードのディレクトリ

      |

      - 特徴

        | Kubernetes のノード上のストレージ領域を利用するため、別途ストレージを調達する必要はありませんが、この方法は非推奨のため検証や開発時のみの利用

      .. tip::
          | hostpathで指定するディレクトリは、アクセス権を設定する必要があります
          | 例） chmod 777 [該当のディレクトリ]

      .. danger::
          | データの永続化自体は可能ですが、コンピュートノードの増減や変更によりデータが消えてしまう可能性があるため本番環境では使用しないでください。
          | また、Azure で構築した AKS クラスタは、クラスタを停止すると AKS クラスターの Node が解放されるため、保存していた情報は消えてしまいます。そのため、Node が停止しないように注意が必要となります。

      - 利用例

        | hostPath を使用した例を記載します。

        .. literalinclude:: ../../literal_includes/pv-database.yaml
           :caption: pv-database.yaml (データベース用ボリューム)
           :linenos:

        .. literalinclude:: ../../literal_includes/pv-ita-common.yaml
           :caption: pv-ita-common.yaml (ファイル用ボリューム)
           :linenos:

        .. literalinclude:: ../../literal_includes/pv-mongo.yaml
           :caption: pv-mongo.yaml (OASE用ボリューム) ※OASEを利用しない場合設定不要
           :linenos:

        .. literalinclude:: ../../literal_includes/pv-gitlab.yaml
           :caption: pv-gitlab.yaml (GitLab用ボリューム) ※外部GitLabを利用する場合設定不要
           :linenos:

        | ※ 監査ログを永続ボリュームに出力する際は、以下の設定が必要となります

        .. code-block:: diff
           :caption: exastro.yaml

             pfAuditLogDefinition:
               name: pf-auditlog
               persistence:
           -      enabled: false
           +      enabled: true
                 reinstall: false
                 accessMode: ReadWriteMany
                 size: 10Gi
                 volumeType: hostPath # e.g.) hostPath or AKS
                 storageClass: "-" # e.g.) azurefile or - (None)

        .. literalinclude:: ../../literal_includes/pv-pf-auditlog.yaml
           :caption: pv-pf-auditlog.yaml (監査ログファイル用ボリューム)
           :linenos:

.. _インストール-1:

インストール
============

.. note::
   | インストールに失敗した場合は、 :ref:`ita_uninstall` を実施して、再度インストールを実施してください。

永続ボリュームの作成
--------------------

| :ref:`persistent_volume` で作成したマニフェストファイルを適用し、ボリュームを作成します。

.. code-block:: bash

    # pv-database.yaml
    kubectl apply -f pv-database.yaml

    # pv-ita-common.yaml
    kubectl apply -f pv-ita-common.yaml

    # pv-mongo.yaml ※OASEを利用しない場合設定不要
    kubectl apply -f pv-mongo.yaml

    # pv-gitlab.yaml ※外部GitLabを利用する場合設定不要
    kubectl apply -f pv-gitlab.yaml

    # pv-pf-auditlog.yaml ※監査ログを永続ボリュームに出力しない場合は設定不要
    kubectl apply -f pv-pf-auditlog.yaml

.. code-block:: bash

    # 確認
    kubectl get pv

.. code-block:: bash

    NAME            CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS   REASON   AGE
    pv-auditlog     10Gi       RWX            Retain           Available                                   26s
    pv-database     20Gi       RWO            Retain           Available                                   19s
    pv-gitlab       20Gi       RWX            Retain           Available                                   5s
    pv-ita-common   10Gi       RWX            Retain           Available                                   9s
    pv-mongo        20Gi       RWO            Retain           Available                                   5s

.. _ita_install:

インストール
------------

| Helm バージョンとアプリケーションのバージョンについては `exastro-helmのサイト <https://github.com/exastro-suite/exastro-helm>`_ をご確認ください。

.. include:: ../../../include/helm_versions.rst

| インストール時にサービスの公開方法によって、アクセス方法が異なります。
| Ingress, LoadBalancer, NodePort それぞれの方法について説明します。

.. tabs::

   .. group-tab:: Ingress

      | 以下の手順でインストールを行います。

      1. Helm コマンドを使い Kubernetes 環境にインストールを行います。

         .. code-block:: bash
            :caption: コマンド

            helm upgrade exastro exastro/exastro --install \
              --namespace exastro --create-namespace \
              --values exastro.yaml

         .. code-block:: bash
            :caption: 出力結果

            NAME: exastro
            LAST DEPLOYED: Sat Jan 28 15:00:02 2023
            NAMESPACE: exastro
            STATUS: deployed
            REVISION: 1
            TEST SUITE: None
            NOTES:
            Exastro install completion!

            1. Execute the following command and wait until the pod becomes "Running" or "Completed":

              # NOTE: You can also append "-w" to the command or wait until the state changes with "watch command"

              kubectl get pods --namespace exastro

            2. Get the ENCRYPT_KEY by running these commands:

              # Exastro IT Automation ENCRYPT_KEY
              kubectl get secret ita-secret-ita-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

              # Exastro Platform ENCRYPT_KEY
              kubectl get secret platform-secret-pf-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

              !!! Please save the output ENCRYPT_KEY carefully. !!!

            3. Run the following command to get the application URL and go to the URL or go to the displayed URL:
              *************************
              * Service Console       *
              *************************
              http://exastro-suite.example.local/

              *************************
              * Administrator Console *
              *************************
              http://exastro-suite-mng.example.local/auth/


            # Note: You can display this note again by executing the following command.

         | 以下、上記の出力結果に従って操作をします。

      2. | インストール状況確認

         .. include:: ../../../include/check_installation_status.rst

      3. 暗号化キーのバックアップ

         .. include:: ../../../include/backup_encrypt_key_k8s.rst

      4. 接続確認

         | 出力結果に従って、:menuselection:`Administrator Console` の URL にアクセスします。
         | 下記は、実行例のため :ref:`service_setting` で設定したホスト名に読み替えてください。

         .. code-block:: bash
            :caption: 出力結果(例)

            *************************
            * Service Console       *
            *************************
            http://exastro-suite.example.local/

            *************************
            * Administrator Console *
            *************************
            http://exastro-suite-mng.example.local/auth/

         .. list-table:: 接続確認用URL
            :widths: 20 40
            :header-rows: 0
            :align: left

            * - 管理コンソール
              - http://exastro-suite-mng.example.local/auth/

   .. group-tab:: LoadBalancer

      | 以下の手順でインストールを行います。

      1. Helm コマンドを使い Kubernetes 環境にインストールを行います。

         .. code-block:: bash
            :caption: コマンド

            helm upgrade exastro exastro/exastro --install \
              --namespace exastro --create-namespace \
              --values exastro.yaml

         .. code-block:: bash
            :caption: 出力結果(例)

            NAME: exastro
            LAST DEPLOYED: Sat Jan 28 15:00:02 2023
            NAMESPACE: exastro
            STATUS: deployed
            REVISION: 1
            TEST SUITE: None
            NOTES:
            Exastro install completion!

            1. Execute the following command and wait until the pod becomes "Running" or "Completed":

              # NOTE: You can also append "-w" to the command or wait until the state changes with "watch command"

              kubectl get pods --namespace exastro

            2. Get the ENCRYPT_KEY by running these commands:

              # Exastro IT Automation ENCRYPT_KEY
              kubectl get secret ita-secret-ita-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

              # Exastro Platform ENCRYPT_KEY
              kubectl get secret platform-secret-pf-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

              !!! Please save the output ENCRYPT_KEY carefully. !!!

            3. Run the following command to get the application URL and go to the URL or go to the displayed URL:
              # NOTE: It may take a few minutes for the LoadBalancer IP to be available.
              #       You can watch the status of by running 'kubectl get --namespace exastro svc -w platform-auth'

              export NODE_SVC_PORT=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.spec.ports[0].nodePort}")
              export NODE_MGT_PORT=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.spec.ports[1].nodePort}")
              export NODE_IP=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.status.loadBalancer.ingress[0].ip}")
              # *************************
              # * Administrator Console *
              # *************************
              echo http://$NODE_IP:$NODE_MGT_PORT/auth/

              # *************************
              # * Service Console       *
              # *************************
              echo http://$NODE_IP:$NODE_SVC_PORT

            # Note: You can display this note again by executing the following command.

         | 以下、上記の出力結果に従って操作をします。

      2. | インストール状況確認

         .. include:: ../../../include/check_installation_status.rst

      3. 暗号化キーのバックアップ

         .. include:: ../../../include/backup_encrypt_key_k8s.rst

      4. 接続確認

         | 1. で実行した :command:`helm install` の出力結果のコマンドをコンソール上に貼り付けて実行します。

         .. code-block:: bash
            :caption: コマンド

            # helm install コマンドの実行結果を貼り付けて実行
            export NODE_SVC_PORT=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.spec.ports[0].nodePort}")
            export NODE_MGT_PORT=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.spec.ports[1].nodePort}")
            export NODE_IP=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.status.loadBalancer.ingress[0].ip}")
            # *************************
            # * Administrator Console *
            # *************************
            echo http://$NODE_IP:$NODE_MGT_PORT/auth/

            # *************************
            # * Service Console       *
            # *************************
            echo http://$NODE_IP:$NODE_SVC_PORT

         | 出力結果に従って、:menuselection:`Administrator Console` の URL にアクセスします。
         | 下記は、実行例のため実際のコマンド実行結果に読み替えてください。

         .. code-block:: bash
            :caption: 出力結果(例)

            *************************
            * Administrator Console *
            *************************
            http://172.16.20.XXX:32031/auth/

            *************************
            * Service Console       *
            *************************
            http://172.16.20.XXX:31798

         .. list-table:: 接続確認用URL
            :widths: 20 40
            :header-rows: 0
            :align: left

            * - 管理コンソール
              - http://172.16.20.xxx:32031/auth/

   .. group-tab:: NodePort

      | 以下の手順でインストールを行います。

      1. Helm コマンドを使い Kubernetes 環境にインストールを行います。

         .. code-block:: bash
            :caption: コマンド

            helm upgrade exastro exastro/exastro --install \
              --namespace exastro --create-namespace \
              --values exastro.yaml

         .. code-block:: bash
            :caption: 出力結果

            NAME: exastro
            LAST DEPLOYED: Sun Jan 29 12:18:02 2023
            NAMESPACE: exastro
            STATUS: deployed
            REVISION: 1
            TEST SUITE: None
            NOTES:
            Exastro install completion!

            1. Execute the following command and wait until the pod becomes "Running" or "Completed":

              # NOTE: You can also append "-w" to the command or wait until the state changes with "watch command"

              kubectl get pods --namespace exastro

            2. Get the ENCRYPT_KEY by running these commands:

              # Exastro IT Automation ENCRYPT_KEY
              kubectl get secret ita-secret-ita-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

              # Exastro Platform ENCRYPT_KEY
              kubectl get secret platform-secret-pf-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

              !!! Please save the output ENCRYPT_KEY carefully. !!!

            3. Run the following command to get the application URL and go to the URL or go to the displayed URL:


              export NODE_SVC_PORT=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.spec.ports[0].nodePort}")
              export NODE_MGT_PORT=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.spec.ports[1].nodePort}")
              export NODE_IP=$(kubectl get nodes --namespace exastro -o jsonpath="{.items[0].status.addresses[0].address}")
              # *************************
              # * Administrator Console *
              # *************************
              echo http://$NODE_IP:$NODE_MGT_PORT/auth/

              # *************************
              # * Service Console       *
              # *************************
              echo http://$NODE_IP:$NODE_SVC_PORT

            # Note: You can display this note again by executing the following command.

         | 以下、上記の出力結果に従って操作をします。

      2. | インストール状況確認

         .. include:: ../../../include/check_installation_status.rst

      3. 暗号化キーのバックアップ

         .. include:: ../../../include/backup_encrypt_key_k8s.rst

      4. 接続確認

         | 1. で実行した :command:`helm install` の出力結果のコマンドをコンソール上に貼り付けて実行します。

         .. code-block:: bash
            :caption: コマンド

            export NODE_SVC_PORT=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.spec.ports[0].nodePort}")
            export NODE_MGT_PORT=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.spec.ports[1].nodePort}")
            export NODE_IP=$(kubectl get nodes --namespace exastro -o jsonpath="{.items[0].status.addresses[0].address}")
            # *************************
            # * Administrator Console *
            # *************************
            echo http://$NODE_IP:$NODE_MGT_PORT/auth/

            # *************************
            # * Service Console       *
            # *************************
            echo http://$NODE_IP:$NODE_SVC_PORT

         | 出力結果に従って、:menuselection:`Administrator Console` の URL にアクセスします。
         | 下記は、実行例のため実際のコマンド実行結果に読み替えてください。

         .. code-block:: bash
            :caption: 出力結果(例)

            *************************
            * Administrator Console *
            *************************
            http://172.16.20.xxx:30081/auth/

            *************************
            * Service Console       *
            *************************
            http://172.16.20.xxx:30080


         .. list-table:: 接続確認用URL
            :widths: 20 40
            :header-rows: 0
            :align: left

            * - 管理コンソール
              - http://172.16.20.xxx:30081/auth/

管理コンソールへのログイン
--------------------------

| 以下の画面が表示された場合、:menuselection:`Administration Console` を選択して、ログイン画面を開きます。

.. figure:: /images/ja/manuals/platform/keycloak/administrator-console.png
  :alt: administrator-console
  :width: 600px
  :name: 管理コンソール

| ログイン ID とパスワードは :ref:`create_system_manager` で登録した、:kbd:`KEYCLOAK_USER` 及び :kbd:`KEYCLOAK_PASSWORD` です。

.. figure:: /images/ja/manuals/platform/login/exastro-login.png
  :alt: login
  :width: 300px
  :name: ログイン画面

| Keycloak の管理画面が開きます。

.. figure:: /images/ja/manuals/platform/keycloak/keycloak-home.png
  :alt: login
  :width: 600px
  :name: Keycloak 管理画面

| ログインが確認できたら、:doc:`../../../manuals/platform_management/organization` の作成を行います。

アップグレード
==============

| Exastro システムのアップグレード方法について紹介します。

アップグレードの事前確認
------------------------

.. danger::
   | Ansible Core を実行エンジンとしたシステム構成の場合、アップグレードに伴い作業対象機器のシステム要件が変更される場合があります。
   | アップグレード実施前に :doc:`../../../configuration/ansible/ansible_core` の作業対象機器のシステム要件を確認してください。

アップグレードの準備
--------------------

.. warning::
  | アップグレード実施前に :doc:`../../../manuals/maintenance/backup_and_restore` の手順に従い、バックアップを取得しておくことを推奨します。

Helm リポジトリの更新
^^^^^^^^^^^^^^^^^^^^^

| Exastro システムの Helm リポジトリを更新します。

| 更新前のバージョンを確認します。
| ※下記に記載のバージョンは環境によって異なります。

.. code-block:: shell
   :linenos:
   :caption: コマンド

   # リポジトリ情報の確認
   helm search repo exastro

.. code-block:: shell
   :linenos:
   :caption: 実行結果
   :emphasize-lines: 3

   helm search repo exastro
   NAME                            CHART VERSION   APP VERSION     DESCRIPTION
   exastro/exastro                 1.0.0           2.0.3           A Helm chart for Exastro. Exastro is an Open So...
   exastro/exastro-it-automation   1.2.0           2.0.3           A Helm chart for Exastro IT Automation. Exastro...
   exastro/exastro-platform        1.5.0           1.4.0           A Helm chart for Exastro Platform. Exastro Plat...

| Helm リポジトリを更新します。

.. code-block:: shell
   :linenos:
   :caption: コマンド

   # リポジトリ情報の更新
   helm repo update

| 更新後のバージョンを確認します。
| ※下記に記載のバージョンは環境によって異なります。

.. code-block:: shell
   :linenos:
   :caption: コマンド

   # リポジトリ情報の確認
   helm search repo exastro

.. code-block:: shell
   :linenos:
   :caption: 実行結果
   :emphasize-lines: 3

   helm search repo exastro
   NAME                            CHART VERSION   APP VERSION     DESCRIPTION
   exastro/exastro                 1.0.1           2.1.0           A Helm chart for Exastro. Exastro is an Open So...
   exastro/exastro-it-automation   1.2.0           2.0.3           A Helm chart for Exastro IT Automation. Exastro...
   exastro/exastro-platform        1.5.0           1.4.0           A Helm chart for Exastro Platform. Exastro Plat...


デフォルト設定値の更新の確認
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| デフォルト値の更新を確認します。
| インストール時に作成した設定ファイル :file:`exastro.yaml` とアップグレード後の設定ファイルを比較します。

.. code-block:: shell
   :caption: コマンド

   diff -u exastro.yaml <(helm show values exastro/exastro)

.. code-block:: diff
   :caption: 実行結果

   exastro-platform:
     platform-api:
       image:
         repository: "exastro/exastro-platform-api"
          tag: ""

     platform-auth:
   +    extraEnv:
   +      # Please set the URL to access
   +      EXTERNAL_URL: ""
   +      EXTERNAL_URL_MNG: ""
       ingress:
         enabled: true
         hosts:
           - host: exastro-suite.example.local
             paths:

設定値の更新
^^^^^^^^^^^^

.. warning::
  | ユーザ名やパスワードはバージョンアップ前のものと合わせる必要があります。

| デフォルト設定値の比較結果から、項目の追加などにより設定値の追加が必要な場合は更新をしてください。
| 設定値の更新が不要であればこの手順はスキップしてください。
| 例えば下記の差分確認結果から、:kbd:`exastro-platform.platform-auth.extraEnv` が追加されていますので、必要に応じて、:file:`exastro.yaml` に項目と設定値を追加します。


.. code-block:: diff
   :caption: 実行結果

   exastro-platform:
     platform-api:
       image:
         repository: "exastro/exastro-platform-api"
          tag: ""

     platform-auth:
   +    extraEnv:
   +      # Please set the URL to access
   +      EXTERNAL_URL: ""
   +      EXTERNAL_URL_MNG: ""
       ingress:
         enabled: true
         hosts:
           - host: exastro-suite.example.local
             paths:

.. _change_encrypt_key:

暗号化キーの指定
^^^^^^^^^^^^^^^^

| :ref:`backup_encrypt_key` でバックアップした暗号化キーを指定します。

.. literalinclude:: ../../literal_includes/update_exastro.yaml
   :diff: ../../literal_includes/exastro.yaml
   :caption: exastro.yaml
   :language: yaml

.. _ita_upgrade:

アップグレード
--------------

.. warning::
  | バージョン2.2.1以前から2.3.0以降へのアップグレードを行う場合は一度 :ref:`ita_uninstall` の :ref:`delete_pv` まで行い、再度 :ref:`ita_install` してください。

.. danger::
  | :ref:`delete_data` は行わないでください。
  | 永続データの削除を行うとアップグレード前のデータがすべて消えてしまいます。

メンテナンスモードへ移行
^^^^^^^^^^^^^^^^^^^^^^^^

| アップグレード中の不整合によるエラーの発生を防ぐためにメンテナンスモードに移行します。
| メンテナンスモードの移行の手順は :doc:`../../../manuals/maintenance/maintenance_mode` を参照してください。


サービス停止
^^^^^^^^^^^^

.. include:: ../../../include/stop_service_k8s.rst

アップグレード実施
^^^^^^^^^^^^^^^^^^

| アップグレードを実施します。

.. code-block:: bash
  :caption: コマンド

  helm upgrade exastro exastro/exastro --install \
    --namespace exastro --create-namespace \
    --values exastro.yaml

.. code-block:: bash
  :caption: 出力結果

  NAME: exastro
  LAST DEPLOYED: Sat Jan 28 15:00:02 2023
  NAMESPACE: exastro
  STATUS: deployed
  REVISION: 2
  TEST SUITE: None
  NOTES:
  Exastro install completion!

  1. Execute the following command and wait until the pod becomes "Running" or "Completed":

    # NOTE: You can also append "-w" to the command or wait until the state changes with "watch command"

    kubectl get pods --namespace exastro

  2. Get the ENCRYPT_KEY by running these commands:

    # Exastro IT Automation ENCRYPT_KEY
    kubectl get secret ita-secret-ita-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

    # Exastro Platform ENCRYPT_KEY
    kubectl get secret platform-secret-pf-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

    !!! Please save the output ENCRYPT_KEY carefully. !!!

  3. Run the following command to get the application URL and go to the URL or go to the displayed URL:
    *************************
    * Service Console       *
    *************************
    http://exastro-suite.example.local/

    *************************
    * Administrator Console *
    *************************
    http://exastro-suite-mng.example.local/auth/


    # Note: You can display this note again by executing the following command.


サービス再開
^^^^^^^^^^^^

※ :file:`exastro.yaml` で指定されたreplicasで、再開されますので、基本的には再開不要です。

:ref:`helm_on_kubernetes_upgrade_status` にお進みください。


.. include:: ../../../include/start_service_k8s.rst

.. _helm_on_kubernetes_upgrade_status:

アップグレード状況確認
^^^^^^^^^^^^^^^^^^^^^^


.. include:: ../../../include/check_installation_status.rst


メンテナンスモードの解除
^^^^^^^^^^^^^^^^^^^^^^^^

| アップグレード前に行ったメンテナンスモードを解除します。
| メンテナンスモードの解除の手順は :doc:`../../../manuals/maintenance/maintenance_mode` を参照してください。



.. _ita_uninstall:

アンインストール
================

| Exastro システムのアンインストール方法について紹介します。

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

  helm uninstall exastro --namespace exastro

.. code-block:: bash
  :caption: 出力結果

  release "exastro" uninstalled

.. _delete_pv:

永続ボリュームを削除
^^^^^^^^^^^^^^^^^^^^

| Persitent Volume（PV） を Kubernetes 上に hostPath で作成した場合の方法を記載します。
| マネージドデータベースを含む外部データベースを利用している場合は、環境にあったデータ削除方法を実施してください。

データベース用
**************

.. code-block:: bash
  :caption: コマンド

  kubectl delete pv pv-database

.. code-block:: bash
  :caption: 実行結果

  persistentvolume "pv-database" deleted


ファイル用
**********

.. code-block:: bash
  :caption: コマンド

  kubectl delete pv pv-ita-common

.. code-block:: bash
  :caption: 実行結果

  persistentvolume "pv-ita-common" deleted

OASE用
******

.. code-block:: bash
  :caption: コマンド

  kubectl delete pv pv-mongo

.. code-block:: bash
  :caption: 実行結果

  persistentvolume "pv-mongo" deleted

.. code-block:: bash
  :caption: コマンド

  kubectl delete pvc volume-mongo-storage-mongo-0 --namespace exastro

.. code-block:: bash
  :caption: 実行結果

  persistentvolumeclaim "volume-mongo-storage-mongo-0" deleted

GitLab用
********

.. code-block:: bash
  :caption: コマンド

  kubectl delete pv pv-gitlab

.. code-block:: bash
  :caption: 実行結果

  persistentvolume "pv-gitlab" deleted

監査ログファイル用
******************

.. code-block:: bash
  :caption: コマンド

  kubectl delete pv pv-auditlog

.. code-block:: bash
  :caption: 実行結果

  persistentvolume "pv-auditlog" deleted

.. _delete_data:

永続データを削除
^^^^^^^^^^^^^^^^

| Kubernetes のコントロールノードにログインし、データを削除します。

データベース用
**************

| 下記コマンドは、Persistent Volume 作成時の hostPath に :file:`/var/data/exastro-suite/exastro-platform/database` を指定した場合の例です。

.. code-block:: bash
   :caption: コマンド

   # 永続データがあるコントロールノードにログイン
   ssh user@contol.node.example

   # 永続データの削除
   sudo rm -rf /var/data/exastro-suite/exastro-platform/database

ファイル用
**********

| 下記コマンドは、Persistent Volume 作成時の hostPath に :file:`/var/data/exastro-suite/exastro-it-automation/ita-common` を指定した場合の例です。

.. code-block:: bash
   :caption: コマンド

   # 永続データがあるコントロールノードにログイン
   ssh user@contol.node.example

   # 永続データの削除
   sudo rm -rf /var/data/exastro-suite/exastro-it-automation/ita-common

OASE用
******

| 下記コマンドは、Persistent Volume 作成時の hostPath に :file:`/var/data/exastro-suite/exastro-platform/mongo` を指定した場合の例です。

.. code-block:: bash
   :caption: コマンド

   # 永続データがあるコントロールノードにログイン
   ssh user@contol.node.example

   # 永続データの削除
   sudo rm -rf /var/data/exastro-suite/exastro-platform/mongo

GitLab用
********

| 下記コマンドは、Persistent Volume 作成時の hostPath に :file:`/var/data/exastro-suite/exastro-platform/gitlab` を指定した場合の例です。

.. code-block:: bash
   :caption: コマンド

   # 永続データがあるコントロールノードにログイン
   ssh user@contol.node.example

   # 永続データの削除
   sudo rm -rf /var/data/exastro-suite/exastro-platform/gitlab


監査ログファイル用
******************

| 下記コマンドは、Persistent Volume 作成時の hostPath に :file:`/var/log/exastro` を指定した場合の例です。

.. code-block:: bash
   :caption: コマンド

   # 永続データがあるコントロールノードにログイン
   ssh user@contol.node.example

   # 永続データの削除
   sudo rm -rf /var/log/exastro
