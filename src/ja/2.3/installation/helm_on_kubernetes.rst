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

=======================
Helm chart (Kubernetes)
=======================

目的
====

| 本書では、Exastro IT Automation を利用する際に必要となる、Exastro Platform および Exastro IT Automation を Kubernetes 上に導入する手順について説明します。

特徴
====

| 高い可用性やサービスレベルを必要とされる際の、Exastro IT Automation の導入方法となります。
| 評価や一時的な利用など、簡単に利用を開始したい場合には、:doc:`Docker Compose 版<docker_compose>` の利用を推奨します。

前提条件
========

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

  | 動作確認が取れているコンテナ環境の最小要求リソースとバージョンは下記のとおりです。

  .. list-table:: ハードウェア要件(最小構成)
   :widths: 20, 20
   :header-rows: 1

   * - リソース種別
     - 要求リソース
   * - CPU
     - 2 Cores (3.0 GHz, x86_64)
   * - Memory
     - 4GB
   * - Storage (Container image size)
     - 10GB
   * - Kubernetes (Container image size)
     - 1.23 以上

  .. list-table:: ハードウェア要件(推奨構成)
   :widths: 20, 20
   :header-rows: 1

   * - リソース種別
     - 要求リソース
   * - CPU
     - 4 Cores (3.0 GHz, x86_64)
   * - Memory
     - 16GB
   * - Storage (Container image size)
     - 120GB
   * - Kubernetes (Container image size)
     - 1.23 以上

  .. warning::
    | 要求リソースは Exastro IT Automation のコア機能に対する値です。同一クラスタ上に Keycloak や MariaDB などの外部ツールをデプロイする場合は、その分のリソースが別途必要となります。
    | データベースおよびファイルの永続化のために、別途ストレージ領域を用意する必要があります。
    | Storage サイズには、Exastro IT Automation が使用する入出力データのファイルは含まれていないため、利用状況に応じて容量を見積もる必要があります。

- 通信要件

  - クライアントからデプロイ先のコンテナ環境にアクセスできる必要があります。
  - Platform 管理者用と一般ユーザー用の2つ通信ポートが使用となります。
  - コンテナ環境からコンテナイメージの取得のために、Docker Hub に接続できる必要があります。

- 外部コンポーネント

  - MariaDB、もしくは、MySQL サーバ
  - GitLab リポジトリ、および、アカウントの払い出しが可能なこと

  .. warning::
    | GitLab 環境を同一クラスタに構築する場合は、GitLab のシステム要件に対応する最小要件を追加で容易する必要があります。
    | Database 環境を同一クラスタに構築する場合は、使用する Database のシステム要件に対応する最小要件を定義する必要があります


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
   helm repo add exastro https://exastro-suite.github.io/exastro-helm/ -n exastro
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

.. literalinclude:: literal_includes/exastro.yaml
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
  | ここで紹介する方法以外にもサービス公開方法はあります。ユーザの環境ごとに適切な構成・設定を選択してください。

パラメータ
^^^^^^^^^^

| 利用可能なパラメータについては下記を参照してください。

.. include:: ../include/helm_option_platform-auth.rst

設定例
^^^^^^

| 各サービス公開方法の設定例を下記に記載します。

.. tabs::

   .. group-tab:: Ingress

      .. _ingress_setting:

      - 特徴

      | パブリッククラウドなどで Ingress Controller が利用可能な場合、Ingress を使ったサービス公開ができます。
      | クラスタ内にロードバランサーを構築して、ユーザ自身が運用したい場合などにメリットがあります。

      - 設定例

      | サービス公開用のドメイン情報を Ingress に登録することでDNSを使ったサービス公開を行います。
      | Azure におけるドメイン名の確認方法については :ref:`aks-dns` を確認してください。
      | クラウドプロバイダ毎に必要な :kbd:`annotations` を指定してください。
      | 下記は、AKS の Ingress Controller を使用する際の例を記載しています。

      .. code-block:: diff
         :caption: exastro.yaml
         :linenos:
         :lineno-start: 353

          platform-auth:
            extraEnv:
              # Please set the URL to access
         -    EXTERNAL_URL: ""
         -    EXTERNAL_URL_MNG: ""
         +    EXTERNAL_URL: "http://exastro-suite.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io"
         +    EXTERNAL_URL_MNG: "http://exastro-suite-mng.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io"
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
         +      - host: exastro-suite.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io
                  paths:
                    - path: /
                      pathType: Prefix
                      backend: "http"
         -      - host: exastro-suite-mng.example.local
         +      - host: exastro-suite-mng.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io
                  paths:
                    - path: /
                      pathType: Prefix
                      backend: "httpMng"

   .. group-tab:: LoadBalancer

      - 特徴

      | パブリッククラウドなどで LoadBalancer が利用可能な場合、LoadBalancer を使ったサービス公開ができます。
      | Ingress とは異なり、クラスタ外部(多くは、パブリッククラウドのサービス上)にロードバランサーがデプロイされるため、ユーザ自身が運用する必要がないことにメリットがあります。

      - 設定例

      | :kbd:`service.type` に :kbd:`LoadBalancer` を設定することで、LoadBalancer を使ったサービス公開ができます。
      | 下記は、LoadBalancer を使用する際の例を記載しています。

      .. code-block:: diff
         :caption: exastro.yaml
         :linenos:
         :lineno-start: 353

          platform-auth:
            extraEnv:
              # Please set the URL to access
         -    EXTERNAL_URL: ""
         -    EXTERNAL_URL_MNG: ""
         +    EXTERNAL_URL: "https://your-exastro.domain"
         +    EXTERNAL_URL_MNG: "https://your-exastro-mng.domain"
            ingress:
         -    enabled: true
         +    enabled: false
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
         -    type: ClusterIP
         +    type: LoadBalancer
              # http:
              #   nodePort: 30080
              # httpMng:
              #   nodePort: 30081

   .. group-tab:: NodePort

      - 特徴

      | ユーザ自身の環境でロードバランサーを準備する、もしくは、検証などの環境では NodePort を使ったサービス公開ができます。
      | Ingress や LoadBalancer とは異なり、ネイティブな Kubernetes で利用可能です。

      - 設定例

      | :kbd:`service.type` に :kbd:`NodePort` を設定することで、NodePort を使ったサービス公開ができます。
      | 下記は、NodePort を使用する際の例を記載しています。

      .. code-block:: diff
        :caption: exastro.yaml
        :linenos:
        :lineno-start: 353

          platform-auth:
            extraEnv:
              # Please set the URL to access
        -     EXTERNAL_URL: ""
        -     EXTERNAL_URL_MNG: ""
        +     EXTERNAL_URL: "http://10.10.10.10:30080"
        +     EXTERNAL_URL_MNG: "http://10.10.10.10:30081"
            ingress:
        -    enabled: true
        +    enabled: false
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
        -    type: ClusterIP
        -    # http:
        -    #   nodePort: 30080
        -    # httpMng:
        -    #   nodePort: 30081
        +    type: NodePort
        +    http:
        +      nodePort: 30080
        +    httpMng:
        +      nodePort: 30081

.. _DATABASE_SETUP:

データベース連携
----------------

| Exastro サービスを利用するためには、CMDB やオーガナイゼーションの管理のためのデータベースが必要となります。
| データベース利用時の3つの設定方法について説明します。

- 外部データベース
- データベースコンテナ

.. tabs::

   .. tab:: 外部データベース

      - 特徴

      | マネージドデータベースや別途用意した Kubernetes クラスタ外のデータベースを利用します。
      | Kubernetes クラスタ外にあるため、環境を分離して管理することが可能です。

      .. warning::
        | 複数のITAを構築する場合はlower_case_table_namesの設定を統一してください。
        | ※統一しないと環境間でのメニューエクスポート・インポートが正常に動作しなくなる可能性があります。

      - 設定例

      | 外部データベースを操作するために必要な接続情報を設定します。

      .. warning::
        | :command:`DB_ADMIN_USER` と :command:`MONGO_ADMIN_USER` で指定するDBの管理ユーザには、データベースとユーザを作成する権限が必要です。

      .. warning::
        | 認証情報などはすべて平文で問題ありません。(Base64エンコードは不要)

      1.  Exastro IT Automation 用データベースの設定

          | データベースの接続情報を設定します。

          .. include:: ../include/helm_option_itaDatabaseDefinition.rst

          .. code-block:: diff
            :caption: exastro.yaml
            :linenos:
            :lineno-start: 22

              itaDatabaseDefinition:
                config:
            -     DB_VENDOR: "mariadb"
            -     DB_HOST: "mariadb"
            -     DB_PORT: "3306"
            +     DB_VENDOR: "mariadb"                # mariadb or mysql
            +     DB_HOST: "your.database.endpoint"   # データベースのエンドポイント
            +     DB_PORT: "3306"                     # データベース接続ポート
                  DB_DATABASE: "ITA_DB"               # 変更不要
                secret:
            -     DB_ADMIN_USER: "root"
            -     DB_ADMIN_PASSWORD: "Ch@ngeMeDBAdm"
            +     DB_ADMIN_USER: "your-admin-account"      # データベースの管理権限を持つユーザ
            +     DB_ADMIN_PASSWORD: "your-admin-password" # データベースの管理権限を持つユーザのパスワード
                  DB_USER: "ITA_USER"
                  DB_PASSWORD: "Ch@ngeMeITADB"

      2.  Exastro 共通基盤用データベースの設定

          | データベースの接続情報を設定します。

          .. include:: ../include/helm_option_pfDatabaseDefinition.rst

          .. code-block:: diff
            :caption: exastro.yaml
            :linenos:
            :lineno-start: 40

              pfDatabaseDefinition:
                config:
            -     DB_VENDOR: "mariadb"
            -     DB_HOST: "mariadb"
            -     DB_PORT: "3306"
            +     DB_VENDOR: "mariadb"                # mariadb or mysql
            +     DB_HOST: "your.database.endpoint"   # データベースのエンドポイント
            +     DB_PORT: "3306"                     # データベース接続ポート
                  DB_DATABASE: "platform"             # 変更不要
                secret:
            -     DB_ADMIN_USER: "root"
            -     DB_ADMIN_PASSWORD: "Ch@ngeMeDBAdm"
            +     DB_ADMIN_USER: "your-admin-account"      # データベースの管理者ユーザ
            +     DB_ADMIN_PASSWORD: "your-admin-password" # データベースの管理者ユーザのパスワード
                  DB_USER: "ITA_USER"
                  DB_PASSWORD: "Ch@ngeMeITADB"

      3.  OASE用データベースの設定

          | OASE用データベースの接続情報を設定します。(OASEを利用しない場合設定不要)

          .. include:: ../include/helm_option_mongoDefinition.rst

          .. code-block:: diff
            :caption: exastro.yaml
            :linenos:
            :lineno-start: 65

              mongoDefinition:
                config:
            -     MONGO_PROTOCOL: "http"
            -     MONGO_HOST: "mongo"
            -     MONGO_PORT: "27017"
            +     MONGO_PROTOCOL: "your.protocol"        # http or https
            +     MONGO_HOST: "your.database.endpoint"   # OASE用データベースのエンドポイント
            +     MONGO_PORT: "your.port"                # OASE用データベース接続ポート
                secret:
            -     MONGO_ADMIN_USER: "admin"
            -     MONGO_ADMIN_PASSWORD: "Ch@ngeMeMGAdm"
            +     MONGO_ADMIN_USER: "your-admin-account"      # OASE用データベースの管理者ユーザ
            +     MONGO_ADMIN_PASSWORD: "your-admin-password" # OASE用データベースの管理者ユーザのパスワード

      4.  データベースコンテナの無効化

          | データベースコンテナが起動しないように設定します。

          .. include:: ../include/helm_option_mariadb.rst

          .. code-block:: diff
            :caption: exastro.yaml
            :linenos:
            :lineno-start: 415

              mariadb:
            -   enabled: true
            +   enabled: false

          | OASE用データベースコンテナが起動しないように設定します。

          .. include:: ../include/helm_option_mongo.rst

          .. code-block:: diff
            :caption: exastro.yaml
            :linenos:
            :lineno-start: 524

              mongo:
            -   enabled: true
            +   enabled: false

   .. tab:: データベースコンテナ

      - 特徴

      | Kubernetes クラスタ内にデプロイしたデータベースコンテナを利用します。
      | Exastro と同じ Kubernetes クラスタにコンテナとして管理できます。

      - 設定例

      | データベースコンテナの root パスワードを作成し、他のコンテナからもアクセスできるように作成した root アカウントのパスワードを設定します。
      | また、データベースのデータを永続化するために利用するストレージを指定します。

      .. warning::
        | :command:`DB_ADMIN_USER` と :command:`MONGO_ADMIN_USER` で指定するDBの管理ユーザには、データベースとユーザを作成する権限が必要です。

      .. warning::
        | 認証情報などはすべて平文で問題ありません。(Base64エンコードは不要)

      .. _configuration_database_container:

      1.  データベースコンテナの設定

          | データベースコンテナの root パスワードを設定します。
          | また、データベースのデータを永続化するために利用するストレージを指定します。

          .. include:: ../include/helm_option_mariadb.rst

          .. tabs::

            .. tab:: Storage Class 利用

                .. code-block:: diff
                  :caption: exastro.yaml
                  :linenos:
                  :lineno-start: 415

                      mariadb:                                             # 旧databaseDefinition
                        enabled: true
                        image:
                          repository: "docker.io/mariadb"
                          tag: "10.11"
                          pullPolicy: IfNotPresent
                        imagePullSecrets: []
                        persistence:
                          enabled: true
                          reinstall: false
                          accessMode: ReadWriteOnce
                  -       size: 20Gi
                  +       size: XXGi                                       # 必要な容量に変更
                  -       storageClass: "-" # e.g.) azurefile or - (None)
                  +       storageClass: "exastro-suite-azurefile-csi-nfs"  # 利用する Storage Class を指定

            .. tab:: hostPath 利用

                .. code-block:: diff
                  :caption: exastro.yaml
                  :linenos:
                  :lineno-start: 415

                      mariadb:                                             # 旧databaseDefinition
                        enabled: true
                        image:
                          repository: "docker.io/mariadb"
                          tag: "10.11"
                          pullPolicy: IfNotPresent
                        imagePullSecrets: []
                        persistence:
                          enabled: true
                          reinstall: false
                          accessMode: ReadWriteOnce
                  -       size: 20Gi
                  +       size: XXGi                                       # 必要な容量に変更
                          storageClass: "-" # e.g.) azurefile or - (None)

      2.  Exastro IT Automation 用データベースの設定

          | Exastro IT Automation コンテナがデータベースに接続できるようにするために、:ref:`DATABASE_SETUP` で作成した root アカウントのパスワードを設定します。

          .. include:: ../include/helm_option_itaDatabaseDefinition.rst

          .. code-block:: diff
            :caption: exastro.yaml
            :linenos:
            :lineno-start: 22

              itaDatabaseDefinition:
                config:
                  DB_VENDOR: "mariadb"
                  DB_HOST: "mariadb"
                  DB_PORT: "3306"
                  DB_DATABASE: "ITA_DB"
                secret:
                  DB_ADMIN_USER: "root"
            -     DB_ADMIN_PASSWORD: "Ch@ngeMeDBAdm"
            +     DB_ADMIN_PASSWORD: "your-admin-password" # 「1.  データベースコンテナの設定」で設定したコンテナデータベースの root のパスワード
                  DB_USER: "ITA_USER"
                  DB_PASSWORD: "Ch@ngeMeITADB"

      3.  Exastro 共通基盤用データベースの設定

          | Exastro 共通基盤のコンテナがデータベースに接続できるようにするために、「1.  データベースコンテナの設定」で作成した root アカウントのパスワードを設定します。

          .. include:: ../include/helm_option_pfDatabaseDefinition.rst

          .. code-block:: diff
            :caption: exastro.yaml
            :linenos:
            :lineno-start: 40

              pfDatabaseDefinition:
                config:
                  DB_VENDOR: "mariadb"
                  DB_HOST: "mariadb"
                  DB_PORT: "3306"
                  DB_DATABASE: "platform"
                secret:
                  DB_ADMIN_USER: "root" 
            -     DB_ADMIN_PASSWORD: "Ch@ngeMeDBAdm"
            +     DB_ADMIN_PASSWORD: "your-admin-password" # 「1.  データベースコンテナの設定」で設定したコンテナデータベースの root のパスワード
                  DB_USER: "pf-user"
                  DB_PASSWORD: "Ch@ngeMePFDB"

      4.  OASE用データベースの設定

          | OASE用データベースの接続情報を設定します。(OASEを利用しない場合設定不要)

          .. include:: ../include/helm_option_mongoDefinition.rst

          .. code-block:: diff
            :caption: exastro.yaml
            :linenos:
            :lineno-start: 65

              mongoDefinition:
                config:
            -     MONGO_PROTOCOL: "http"
            -     MONGO_HOST: "mongo"
            -     MONGO_PORT: "27017"
                secret:
            -     MONGO_ADMIN_USER: "admin"
            -     MONGO_ADMIN_PASSWORD: "Ch@ngeMeMGAdm"
            +     MONGO_ADMIN_USER: "your-admin-account"      # OASE用データベースの管理者ユーザ
            +     MONGO_ADMIN_PASSWORD: "your-admin-password" # OASE用データベースの管理者ユーザのパスワード

.. _installation_kubernetes_Keycloak 設定:

アプリケーションの DB ユーザ設定
--------------------------------

| Exastro でアプリケーションのために作成する DB ユーザの設定をします。

設定例
^^^^^^

| 下記のアプリケーションが利用・作成する DB ユーザをそれぞれ設定します。

- Exastro IT Automation
- Exastro 共通基盤
- Keycloak

.. warning::
  | 認証情報などはすべて平文で問題ありません。(Base64エンコードは不要)

1.  Exastro IT Automation 用データベースの設定

    | アプリケーションが利用・作成する DB ユーザを設定します。

    .. include:: ../include/helm_option_itaDatabaseDefinition.rst

    .. code-block:: diff
      :caption: exastro.yaml
      :linenos:
      :lineno-start: 22

        itaDatabaseDefinition:
          enabled: true
          config:
            DB_VENDOR: "mariadb"
            DB_HOST: "mariadb"
            DB_PORT: "3306"
            DB_DATABASE: "ITA_DB"
          secret:
            DB_ADMIN_USER: ""
            DB_ADMIN_PASSWORD: ""
      -     DB_USER: ""
      -     DB_PASSWORD: ""
      +     DB_USER: "ita-db-user"                # Exastro IT Automation のアプリが使うDBユーザ
      +     DB_PASSWORD: "ita-db-user-password"   # Exastro IT Automation のアプリが使うDBユーザのパスワード


2.  Keycloak 用データベースの設定

    | アプリケーションが利用・作成する DB ユーザを設定します。

    .. include:: ../include/helm_option_keycloakDefinition.rst

    .. code-block:: diff
      :caption: exastro.yaml
      :linenos:
      :lineno-start: 51

        keycloakDefinition:
          secret:
            SYSTEM_ADMIN: "admin"
            SYSTEM_ADMIN_PASSWORD: "Ch@ngeMeKCAdm"
      -     KEYCLOAK_DB_USER: "keycloak"
      -     KEYCLOAK_DB_PASSWORD: "Ch@ngeMeKCADB"
      +     KEYCLOAK_DB_USER: "keycloak-db-user"               # Keycloak が使うDBユーザ
      +     KEYCLOAK_DB_PASSWORD: "keycloak-db-user-password"  # Keycloak が使うDBユーザのパスワード


3.  Exastro 共通基盤用データベースの設定

    | アプリケーションが利用・作成する DB ユーザを設定します。

    .. include:: ../include/helm_option_pfDatabaseDefinition.rst

    .. code-block:: diff
      :caption: exastro.yaml
      :linenos:
      :lineno-start: 40

        pfDatabaseDefinition:
          config:
            DB_VENDOR: "mariadb"
            DB_HOST: "mariadb"
            DB_PORT: "3306"
            DB_DATABASE: "platform"
          secret:
            DB_ADMIN_USER: "root"
            DB_ADMIN_PASSWORD: "Ch@ngeMeDBAdm"
      -     DB_USER: "pf-user"
      -     DB_PASSWORD: "Ch@ngeMePFDB"
      +     DB_USER: "pf-db-user"           # Exastro 共通基盤が使うDBユーザ
      +     DB_PASSWORD: "pf-db-password"   # Exastro 共通基盤が使うDBユーザのパスワード


.. _installation_kubernetes_gitlablinkage:

GitLab 連携設定
---------------

| GitLab 連携のための接続情報を登録します。

.. warning::
     | GitLab 連携を利用しない場合は、下記のように設定してください。
     | GITLAB_HOST: ""

- 外部GitLab
- GitLabコンテナ

.. tabs::

   .. tab:: 外部GitLab

      - 特徴

      | マネージドGitLabや別途用意した Kubernetes クラスタ外のGitLabを利用します。
      | Kubernetes クラスタ外にあるため、環境を分離して管理することが可能です。

      - 設定例

      | 外部GitLabを操作するために必要な接続情報を設定します。

      1.  GitLabデータベースの設定

          | GitLabコンテナに接続できるようにするための設定します。

      .. include:: ../include/helm_option_gitlabDefinition.rst

      .. warning::
        | GITLAB_ROOT_TOKEN は下記の権限スコープが割り当てられたトークンが必要です。
        | ・api
        | ・write_repository
        | ・sudo

      | 下記は、GitLab 連携の設定例を記載しています。

      .. code-block:: diff
        :caption: exastro.yaml
        :linenos:
        :lineno-start: 57

            gitlabDefinition:
              config:
        -       GITLAB_PROTOCOL: "http"
        -       GITLAB_HOST: ""
        -       GITLAB_PORT: "8080"
        +       GITLAB_PROTOCOL: "接続プロトコル http or https"
        +       GITLAB_HOST: "接続先"
        +       GITLAB_PORT: "接続ポート"
              secret:
        -       GITLAB_ROOT_PASSWORD: "Ch@ngeMeGL"
        -       GITLAB_ROOT_TOKEN: "change-this-token"
        +       GITLAB_ROOT_PASSWORD: "GitLabのRoot権限のパスワード"
        +       GITLAB_ROOT_TOKEN: "GitLabのRoot権限を持ったトークン"

   .. tab:: GitLabコンテナ

      - 特徴

      | Kubernetes クラスタ内にデプロイしたGitLabコンテナを利用します。
      | Exastro と同じ Kubernetes クラスタにコンテナとして管理できます。

      - 設定例

      | GitLabコンテナの root パスワードを作成し、他のコンテナからもアクセスできるように作成した root アカウントのパスワードを設定します。
      | また、GitLabのデータを永続化するために利用するストレージを指定します。

      1.  GitLabデータベースの設定

          | GitLabコンテナに接続できるようにするための設定します。

      .. include:: ../include/helm_option_gitlabDefinition.rst

      .. warning::
         | トークンはGITLAB_ROOT_TOKENで指定された平文で作成されます。

      | 下記は、GitLab 連携の設定例を記載しています。

      .. code-block:: diff
          :caption: exastro.yaml
          :linenos:
          :lineno-start: 57

            gitlabDefinition:
                config:
                  GITLAB_PROTOCOL: "http"
          -       GITLAB_HOST: ""
          -       GITLAB_PORT: "8080"
          +       GITLAB_HOST: "your.database.endpoint" # 起動する Gitalb コンテナの公開時のURL。AAPから接続できる必要がある。
          +       GITLAB_PORT: "30082" # 起動する Gitalb コンテナの公開時のポート番号
                secret:
          -       GITLAB_ROOT_PASSWORD: "Ch@ngeMeGL"
          -       GITLAB_ROOT_TOKEN: "change-this-token"
          +       GITLAB_ROOT_PASSWORD: "GitLabのRoot権限のパスワード"
          +       GITLAB_ROOT_TOKEN: "GitLabのRoot権限を持ったトークン"

      1.  GitLabコンテナの有効化

          | GitLabコンテナを起動するように設定します。
          | 下記は、NodePort を使用する際の例を記載しています。

          .. include:: ../include/helm_option_gitlab.rst

          .. code-block:: diff
            :caption: exastro.yaml
            :linenos:
            :lineno-start: 464

              gitlab:
            -   enabled: false
            +   enabled: true
                extraEnv:
                  GITLAB_OMNIBUS_CONFIG: |
                    postgresql['shared_buffers'] = "2048MB"
                    postgresql['work_mem'] = "128MB"
                    postgresql['maintenance_work_mem'] = "128MB"
                    postgresql['effective_cache_size'] = "128MB"
                    postgresql['checkpoint_segments'] = 16
                    postgresql['checkpoint_timeout'] = "10min"
            -       external_url 'http://gitlab:40080'
            +       external_url 'http://your.database.endpoint:30082'
                ～ 略 ～
                service:
            -     type: ClusterIP
            +     type: NodePort
                  name: gitlab
                  port: 40080
            -     # nodePort: 30082
            +     nodePort: 30082
   
   .. _create_system_manager:

.. _install_helm:

Exastro システム管理者の作成
----------------------------

| Keycloak セットアップ時に Exastro システム管理者の初期ユーザを作成するための情報を設定します。

.. include:: ../include/helm_option_keycloakDefinition.rst

.. code-block:: diff
  :caption: exastro.yaml
  :linenos:
  :lineno-start: 51

    keycloakDefinition:
      secret:
  -     KEYCLOAK_USER: "admin"
  -     KEYCLOAK_PASSWORD: "Ch@ngeMeKCAdm"
  +     KEYCLOAK_USER: "admin"               # Exastro システムの管理者
  +     KEYCLOAK_PASSWORD: "admin-password"  # Exastro システムの管理者のパスワード
        KEYCLOAK_DB_USER: "keycloak"
        KEYCLOAK_DB_PASSWORD: "Ch@ngeMeKCADB"

.. _persistent_volume:

永続ボリュームの設定
--------------------

| データベースのデータ永続化 (クラスタ内コンテナがある場合)、および、ファイルの永続化のために、永続ボリュームを設定する必要があります。
| 永続ボリュームの詳細については、 `永続ボリューム - Kubernetes <https://kubernetes.io/ja/docs/concepts/storage/persistent-volumes/#%E6%B0%B8%E7%B6%9A%E3%83%9C%E3%83%AA%E3%83%A5%E3%83%BC%E3%83%A0>`_ を参照してください。

| ストレージ利用時の2つの方法について説明します。

- マネージドディスク
- Kubernetes ノードのディレクトリ

.. tabs::

   .. tab:: マネージドディスク

      - 特徴

      | パブリッククラウドで提供されるストレージサービスを利用することでストレージの構築や維持管理が不要となります。

      - 設定例

      | Azure のストレージを利用する場合、下記のように StorageClass を定義することで利用が可能です。
      | 詳細は、 `Azure Kubernetes Service (AKS) でのアプリケーションのストレージ オプション <https://learn.microsoft.com/ja-jp/azure/aks/concepts-storage#storage-classes>`_ を参照してください。

      .. code-block:: diff
        :caption: storage-class-exastro-suite.yaml
        :linenos:

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

      .. code-block:: diff
        :caption: exastro.yaml
        :linenos:
        :lineno-start: 5

          itaGlobalDefinition:
            config:
              DEFAULT_LANGUAGE: "ja"
              LANGUAGE: "en"
              TZ: "Asia/Tokyo"
            secret:
              ENCRYPT_KEY: ""
            persistence:
              enabled: true
              accessMode: ReadWriteMany
              size: 10Gi
              volumeType: hostPath # e.g.) hostPath or AKS
        -      storageClass: "-" # e.g.) azurefile or - (None)
        +      storageClass: "azurefile" # e.g.) azurefile or - (None)

      | ※ 下記は、:ref:`DATABASE_SETUP` で設定済みです。

      - mariadb

      .. code-block:: diff
        :caption: exastro.yaml
        :linenos:
        :lineno-start: 415

          mariadb:
            persistence:
              enabled: true
              reinstall: false
              accessMode: ReadWriteOnce
              size: 20Gi
              volumeType: hostPath # e.g.) hostPath or AKS
        -      storageClass: "-" # e.g.) azurefile or - (None)
        +      storageClass: "exastro-suite-azurefile-csi-nfs" # e.g.) azurefile or - (None)

      - gitlab

      .. code-block:: diff
        :caption: exastro.yaml
        :linenos:
        :lineno-start: 464

          gitlab:
        -   enabled: false
        +   enabled: true
             ～ 略 ～
            persistence:
              enabled: true
              volumeName: pv-gitlab
              accessMode: ReadWriteMany
              size: 20Gi
        -     storageClass: "-" # e.g.) azurefile or - (None)
        +     storageClass: "exastro-suite-azurefile-csi-nfs" # e.g.) azurefile or - (None)

      - mongo

      .. code-block:: diff
        :caption: exastro.yaml
        :linenos:
        :lineno-start: 524

          mongo:
            enabled: true
            image:
              repository: "docker.io/mongo"
              pullPolicy: IfNotPresent
              # Overrides the image tag whose default is the chart appVersion.
              tag: "6.0"
            persistence:
              enabled: true
              accessMode: ReadWriteOnce
              size: 20Gi
        -     storageClass: "-" # e.g.) azurefile, local-path or - (None)
        +     storageClass: "exastro-suite-azurefile-csi-nfs" # e.g.) azurefile or - (None)

   .. tab:: Kubernetes ノードのディレクトリ

      - 特徴

      | Kubernetes のノード上のストレージ領域を利用するため、別途ストレージを調達する必要はありませんが、この方法は非推奨のため検証や開発時のみの利用

      .. danger::
          | データの永続化自体は可能ですが、コンピュートノードの増減や変更によりデータが消えてしまう可能性があるため本番環境では使用しないでください。
          | また、Azure で構築した AKS クラスタは、クラスタを停止すると AKS クラスターの Node が解放されるため、保存していた情報は消えてしまいます。そのため、Node が停止しないように注意が必要となります。

      - 利用例

      | hostPath を使用した例を記載します。

      .. code-block:: diff
        :caption: pv-database.yaml (データベース用ボリューム)
        :linenos:

        # pv-database.yaml
        apiVersion: v1
        kind: PersistentVolume
        metadata:
          name: pv-database
        spec:
          claimRef:
            name: pvc-mariadb
            namespace: exastro
          capacity:
            storage: 20Gi
          accessModes:
            - ReadWriteOnce
          persistentVolumeReclaimPolicy: Retain
          hostPath:
            path: /var/data/exastro-suite/exastro-platform/database
            type: DirectoryOrCreate

      .. code-block:: diff
        :caption: pv-ita-common.yaml (ファイル用ボリューム)
        :linenos:

        # pv-ita-common.yaml
        apiVersion: v1
        kind: PersistentVolume
        metadata:
          name: pv-ita-common
        spec:
          claimRef:
            name: pvc-ita-global
            namespace: exastro
          capacity:
            storage: 10Gi
          accessModes:
            - ReadWriteMany
          persistentVolumeReclaimPolicy: Retain
          hostPath:
            path: /var/data/exastro-suite/exastro-it-automation/ita-common
            type: DirectoryOrCreate

      .. code-block:: diff
        :caption: pv-mongo.yaml (OASE用ボリューム) ※OASEを利用しない場合設定不要
        :linenos:

        # pv-mongo.yaml
        apiVersion: v1
        kind: PersistentVolume
        metadata:
          name: pv-mongo
        spec:
          claimRef:
            name: volume-mongo-storage-mongo-0
            namespace: exastro
          capacity:
            storage: 20Gi
          accessModes:
            - ReadWriteOnce
          persistentVolumeReclaimPolicy: Retain
          hostPath:
            path: /var/data/exastro-suite/exastro-platform/mongo
            type: DirectoryOrCreate

      .. code-block:: diff
        :caption: pv-gitlab.yaml (GitLab用ボリューム) ※外部GitLabを利用する場合設定不要
        :linenos:

        # pv-gitlab.yaml
        apiVersion: v1
        kind: PersistentVolume
        metadata:
          name: pv-gitlab
        spec:
          claimRef:
            name: pvc-gitlab
            namespace: exastro
          capacity:
            storage: 20Gi
          accessModes:
            - ReadWriteMany
          persistentVolumeReclaimPolicy: Retain
          hostPath:
            path: /var/data/exastro-suite/exastro-platform/gitlab
            type: DirectoryOrCreate


.. _インストール-1:

インストール
============

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

.. code-block:: bash

    # 確認
    kubectl get pv

.. code-block:: bash

    NAME            CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM                                  STORAGECLASS   REASON   AGE
    pv-database     20Gi       RWO            Retain           Available                                                                  6s
    pv-gitlab       20Gi       RWX            Retain           Available                                                                  5s
    pv-ita-common   10Gi       RWX            Retain           Available                                                                  6s
    pv-mongo        20Gi       RWO            Retain           Available   exastro/volume-mongo-storage-mongo-0                           5s


インストール
------------

| Helm バージョンとアプリケーションのバージョンについては下記を確認してください。

.. include:: ../include/helm_versions.rst

| インストール時にサービスの公開方法によって、アクセス方法が異なります。
| Ingress, LoadBalancer, NodePort それぞれの方法について説明します。

.. tabs::

   .. group-tab:: Ingress

      1. Helm コマンドを使い Kubernetes 環境にインストールを行います。

         .. code-block:: bash
            :caption: コマンド

            helm install exastro exastro/exastro \
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
              kubectl get secret ita-secret-ita-global -n exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

              # Exastro Platform ENCRYPT_KEY
              kubectl get secret platform-secret-pf-global -n exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

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

      .. include:: ../include/check_installation_status.rst

      1. 暗号化キーのバックアップ

         .. include:: ../include/backup_encrypt_key_k8s.rst

      2. 接続確認

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

      1. Helm コマンドを使い Kubernetes 環境にインストールを行います。

         .. code-block:: bash
            :caption: コマンド

            helm install exastro exastro/exastro \
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
              kubectl get secret ita-secret-ita-global -n exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

              # Exastro Platform ENCRYPT_KEY
              kubectl get secret platform-secret-pf-global -n exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

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

      .. include:: ../include/check_installation_status.rst

      1. 暗号化キーのバックアップ

         .. include:: ../include/backup_encrypt_key_k8s.rst

      2. 接続確認

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

      1. Helm コマンドを使い Kubernetes 環境にインストールを行います。

         .. code-block:: bash
            :caption: コマンド

            helm install exastro exastro/exastro \
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
              kubectl get secret ita-secret-ita-global -n exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

              # Exastro Platform ENCRYPT_KEY
              kubectl get secret platform-secret-pf-global -n exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

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

      .. include:: ../include/check_installation_status.rst

      1. 暗号化キーのバックアップ

         .. include:: ../include/backup_encrypt_key_k8s.rst

      2. 接続確認

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

| ログインが確認できたら、:doc:`../manuals/platform_management/organization` の作成を行います。

アップグレード
==============

| Exastro システムのアップグレード方法について紹介します。


アップグレードの準備
--------------------

.. warning::
  | アップグレード実施前に :doc:`../manuals/maintenance/backup_and_restore` の手順に従い、バックアップを取得しておくことを推奨します。

Helm リポジトリの更新
^^^^^^^^^^^^^^^^^^^^^

| Exastro システムの Helm リポジトリを更新します。

| 更新前のバージョンを確認します。

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

   diff exastro.yaml <(helm show values exastro/exastro)


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

アップグレード
--------------

サービス停止
^^^^^^^^^^^^

.. include:: ../include/stop_service_k8s.rst

アップグレード実施
^^^^^^^^^^^^^^^^^^

| アップグレードを実施します。

.. code-block:: bash
  :caption: コマンド

  helm upgrade exastro exastro/exastro \
    --namespace exastro \
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
    kubectl get secret ita-secret-ita-global -n exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

    # Exastro Platform ENCRYPT_KEY
    kubectl get secret platform-secret-pf-global -n exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

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

.. include:: ../include/start_service_k8s.rst

アップグレード状況確認
^^^^^^^^^^^^^^^^^^^^^^

| コマンドラインから以下のコマンドを入力して、アップグレードが完了していることを確認します。

.. code-block:: bash
   :caption: コマンド

   # Pod の一覧を取得
   kubectl get po -n exastro

| 正常に起動している場合は、ita-migration-xxxとplatform-migration-xxxが “Completed” 、その他すべてが “Running” となります。
| ※正常に起動するまで数分かかる場合があります。

.. code-block:: bash
   :caption: 出力結果

    NAME                                                      READY   STATUS      RESTARTS   AGE
    ita-api-admin-64657656c6-r4s2l                            1/1     Running     0          30m
    ita-api-oase-receiver-6647cb4457-46d2                     1/1     Running     0          30m
    ita-api-organization-75ff9d599c-gthvl                     1/1     Running     0          30m
    ita-by-ansible-execute-fdd8dfc57-7676h                    1/1     Running     0          30m
    ita-by-ansible-legacy-role-vars-listup-6cd558d78b-xxl6x   1/1     Running     0          30m
    ita-by-ansible-legacy-vars-listup-5db44d54d8-zxqj7        1/1     Running     0          30m
    ita-by-ansible-pioneer-vars-listup-6bf744f5b6-k8ctx       1/1     Running     0          30m
    ita-by-ansible-towermaster-sync-59594b5d84-phbg7          1/1     Running     0          30m
    ita-by-cicd-for-iac-f6855c588-r6w4k                       1/1     Running     0          30m
    ita-by-collector-6fc8c7b4d4-hjwck                         1/1     Running     0          30m
    ita-by-conductor-regularly-5897dcb9f6-4npz7               1/1     Running     0          30m
    ita-by-conductor-synchronize-6fd6dcd5f4-qgdhx             1/1     Running     0          30m
    ita-by-excel-export-import-df76d77c4-ms4j2                1/1     Running     0          30m
    ita-by-hostgroup-split-86746f758-b796k                    1/1     Running     0          30m
    ita-by-menu-create-8588c9747d-66xwn                       1/1     Running     0          30m
    ita-by-menu-export-import-6b8498f476-zwml7                1/1     Running     0          30m
    ita-by-oase-conclusion-567c85567b-8tgvq                   1/1     Running     0          30m
    ita-by-terraform-cli-execute-8478554d8d-qztbv             1/1     Running     0          30m
    ita-by-terraform-cli-vars-listup-bf688659d-zgh8d          1/1     Running     0          30m
    ita-by-terraform-cloud-ep-execute-5dbbb599b-qh8rc         1/1     Running     0          30m
    ita-by-terraform-cloud-ep-vars-listup-5564fcb5b-nphm7     1/1     Running     0          30m
    ita-migration-1.0.4-0wdt                                  0/1     Completed   0          30m
    ita-web-server-854bcdbbf4-s7fdb                           1/1     Running     0          30m
    keycloak-56d8b4556c-tndnv                                 1/1     Running     0          30m
    platform-api-bddb446db-s9zjh                              1/1     Running     0          30m
    platform-auth-799f57fb6c-wlbtf                            1/1     Running     0          30m
    platform-migration-1.4.2-6sks                             0/1     Completed   0          30m
    platform-web-88db7c489-wkmn9                              1/1     Running     0          30m

アンインストール
================

| Exastro システムのアンインストール方法について紹介します。

アンインストールの準備
----------------------

.. warning::
  | アンインストール実施前に :doc:`../manuals/maintenance/backup_and_restore` の手順に従い、バックアップを取得しておくことを推奨します。

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


データベースのデータの削除
^^^^^^^^^^^^^^^^^^^^^^^^^^

| Persitent Volume を Kubernetes 上に hostPath で作成した場合の方法を記載します。
| マネージドデータベースを含む外部データベースを利用している場合は、環境にあったデータ削除方法を実施してください。

.. code-block:: bash
  :caption: コマンド

  kubectl delete pv pv-database

.. code-block:: bash
  :caption: 実行結果

  persistentvolume "pv-database" deleted

| Kubernetes のコントロールノードにログインし、データを削除します。
| 下記コマンドは、Persistent Volume 作成時の hostPath に :file:`/var/data/exastro-suite/exastro-platform/database` を指定した場合の例です。

.. code-block:: bash
   :caption: コマンド

   # 永続データがあるコントロールノードにログイン
   ssh user@contol.node.example

   # 永続データの削除
   sudo rm -rf /var/data/exastro-suite/exastro-platform/database


ファイルデータの削除
^^^^^^^^^^^^^^^^^^^^

| Persitent Volume を Kubernetes 上に hostPath で作成した場合の方法を記載します。
| マネージドストレージを含む外部ストレージを利用している場合は、環境にあったデータ削除方法を実施してください。

.. code-block:: bash
  :caption: コマンド

  kubectl delete pv pv-ita-common

.. code-block:: bash
  :caption: 実行結果

  persistentvolume "pv-ita-common" deleted

| Kubernetes のコントロールノードにログインし、データを削除します。
| 下記コマンドは、Persistent Volume 作成時の hostPath に :file:`/var/data/exastro-suite/exastro-it-automation/ita-common` を指定した場合の例です。

.. code-block:: bash
   :caption: コマンド

   # 永続データがあるコントロールノードにログイン
   ssh user@contol.node.example

   # 永続データの削除
   sudo rm -rf /var/data/exastro-suite/exastro-it-automation/ita-common