===================================
Organization (オーガナイゼーション)
===================================

はじめに
========

| 本書では、Exastro システム における Organization (オーガナイゼーション) について説明します。


オーガナイゼーションとは
========================

| Exastro IT Automation 2.0 から導入されたマルチテナント機能におけるテナントの単位のことで、論理的に組織の空間を区分する単位のことで、たとえ同一の Exastro システムであってもデータの共有がされることのない、完全にプライベートな空間です。
| Exastro システム の各アプリケーションの利用を開始するためには、オーガナイゼーションを作成する必要があります。


.. figure:: /images/ja/diagram/overview_of_the_organization.png
    :alt: オーガナイゼーション全体図

オーガナイゼーションの作成方法
==============================

| オーガナイゼーションの作成方法について説明します。

目的
----

| オーガナイゼーション作成を行うことで、オーガナイゼーション管理者のアカウントが作成され、オーガナイゼーションごとのエンドポイントURLにアクセスすることができるようになります。
| また、システム内部では下記の処理が実行されます。

- 処理のながれ

  #. Keycloak に、オーガナイゼーション用のレルムデータと管理者ユーザーが登録されます。
  #. MariaDB や MySQL といったリレーショナルデータベースに、オーガナイゼーション用のデータが登録されます。
  #. Exastro IT Automation の永続ボリュームに、オーガナイゼーション用のディレクトリが作成されます。
  #. GitLab に、オーガナイゼーション用のユーザーが登録されます。

前提条件
--------

| 本作業には下記のコマンドが必要となるため、事前にインストールをしてください。

- 前提条件

  - インストールが完了し、Keycloak の管理コンソールにログインできること
  - システム管理に必要な下記の情報があること

    - 管理コンソールの URL
    - システム管理者のユーザーID
    - システム管理者のパスワード

  - 作業クライアントに必要なアプリケーションがインストールされていること

    - :kbd:`curl`
    - :kbd:`git`
    - :kbd:`jq`

.. _organization_creation:

オーガナイゼーション作成
------------------------

| オーガナイゼーションの作成方法には、下記の2通りの方法があります。

.. tabs::

   .. group-tab:: 画面操作

      - 特徴

      | 画面からオーガナイゼーションの作成を行うことができます。

      - 作成方法

      #. メニューより :menuselection:`オーガナイゼーション管理` を選択します。

         .. figure:: /images/ja/manuals/platform/organization/org_management.png
            :width: 200px
            :align: left
            :class: with-border-thin

      #. オーガナイゼーション一覧が表示されますので、 :guilabel:`作成` ボタンを押下して、新しいオーガナイゼーションを作成することができます。

         .. figure:: /images/ja/manuals/platform/organization/オーガナイゼーション一覧_作成.png
            :width: 600px
            :align: left
            :class: with-border-thin

      #. 新しく作成するオーガナイゼーションの情報を入力し、 :guilabel:`登録` ボタンを押下します。

         .. figure:: /images/ja/manuals/platform/organization/オーガナイゼーション作成_登録.png
            :width: 600px
            :align: left
            :class: with-border-thin

         .. table:: オーガナイゼーション作成 入力項目
            :widths: 2 1 2 5
            :align: left

            +----------------------------------+------------------------+------------------------+-------------------------------------------------------------------------------------------------+
            |            入力エリア            |                      項目名                     |                                                     説明                                        |
            +==================================+========================+========================+=================================================================================================+
            | オーガナイゼーション基本情報設定 | オーガナイゼーションID                          | オーガナイゼーションに割り当てる一意のIDを指定します。                                          |
            |                                  |                                                 |                                                                                                 |
            |                                  |                                                 | ここで指定した ID を使ってシステム間の連携を行います。                                          |
            +                                  +------------------------+------------------------+-------------------------------------------------------------------------------------------------+
            |                                  | オーガナイゼーション名                          | オーガナイゼーションに割り当てる名前を指定します。                                              |
            |                                  |                                                 |                                                                                                 |
            +                                  +------------------------+------------------------+-------------------------------------------------------------------------------------------------+
            |                                  | リソースプラン                                  | オーガナイゼーションに紐づけるリソースプランを指定します。                                      |
            |                                  |                                                 |                                                                                                 |
            |                                  |                                                 | 省略時はデフォルトのリソースプランが指定されます。                                              |
            |                                  |                                                 |                                                                                                 |
            |                                  |                                                 | リソースプランについては、:doc:`./plan` を参照してください。                                    |
            +----------------------------------+------------------------+------------------------+-------------------------------------------------------------------------------------------------+
            | オーガナイゼーション管理者設定   | ユーザー名                                      | オーガナイゼーション管理者のユーザー名を指定します。                                            |
            |                                  |                                                 |                                                                                                 |
            +                                  +------------------------+------------------------+-------------------------------------------------------------------------------------------------+
            |                                  | パスワード                                      | オーガナイゼーション管理者の初期パスワードを指定します。                                        |
            |                                  |                                                 |                                                                                                 |
            +                                  +------------------------+------------------------+-------------------------------------------------------------------------------------------------+
            |                                  | email                                           | オーガナイゼーション管理者のE-mailアドレスを指定します。                                        |
            |                                  |                                                 |                                                                                                 |
            +                                  +------------------------+------------------------+-------------------------------------------------------------------------------------------------+
            |                                  | 名                                              | オーガナイゼーション管理者の名を指定します。                                                    |
            |                                  |                                                 |                                                                                                 |
            +                                  +------------------------+------------------------+-------------------------------------------------------------------------------------------------+
            |                                  | 性                                              | オーガナイゼーション管理者の姓を指定します。                                                    |
            |                                  |                                                 |                                                                                                 |
            +                                  +------------------------+------------------------+-------------------------------------------------------------------------------------------------+
            |                                  | 有効                                            | オーガナイゼーション機能の有効無効を指定します。                                                |
            |                                  |                                                 |                                                                                                 |
            |                                  |                                                 | 作成の際には基本的に有効にしてください。                                                        |
            +----------------------------------+------------------------+------------------------+-------------------------------------------------------------------------------------------------+
            | Exastro IT Automation\           | インストールドライバ                            | インストールするドライバを指定します                                                            |
            | オプション設定                   |                                                 |                                                                                                 |
            |                                  |                                                 |                                                                                                 |
            +                                  +------------------------+------------------------+-------------------------------------------------------------------------------------------------+
            |                                  |                        | CI/CD for IaC          | ドライバの詳細については、各ドキュメントを参照してください。                                    |
            |                                  |                        |                        |                                                                                                 |
            |                                  |                        |                        | :doc:`../cicd_for_iac/index`                                                                    |
            +                                  +                        +------------------------+-------------------------------------------------------------------------------------------------+
            |                                  |                        | Exastro OASE           | Exastro OASEをインストールするためにはMongoDBが必要です。\                                      |
            |                                  |                        |                        | MongoDBに接続するための設定を入力する必要があります。                                           |
            |                                  |                        |                        |                                                                                                 |
            |                                  |                        |                        | ・ Document Store : "mongodb"が固定で入力されます。                                             |
            |                                  |                        |                        |                                                                                                 |
            |                                  |                        |                        | ・ 自動払い出し : インストール時に設定したMongoDBを利用する場合はチェックを入れます。\          |
            |                                  |                        |                        | 利用しない場合はチェックを外し、Python接続文字列を入力します。                                  |
            |                                  |                        |                        |                                                                                                 |
            |                                  |                        |                        | ・ Python接続文字列 : 利用するMongoDBのPython接続文字列を入力します。\                          |
            |                                  |                        |                        | MondoDBのアカウントがrootロールまたは同等の権限がない場合こちらを入力します。                   |
            |                                  |                        |                        |                                                                                                 |
            |                                  |                        |                        | 例: mongodb://username:password@hostname:27017/                                                 |
            |                                  |                        |                        |                                                                                                 |
            |                                  |                        |                        | ドライバの詳細については、各ドキュメントを参照してください。                                    |
            |                                  |                        |                        |                                                                                                 |
            |                                  |                        |                        | :doc:`../oase/index`                                                                            |
            +                                  +                        +------------------------+-------------------------------------------------------------------------------------------------+
            |                                  |                        | Terraform CLI driver   | ドライバの詳細については、各ドキュメントを参照してください。                                    |
            |                                  |                        |                        |                                                                                                 |
            |                                  |                        |                        | :doc:`../terraform_driver/terraform_cli`                                                        |
            +                                  +                        +------------------------+-------------------------------------------------------------------------------------------------+
            |                                  |                        | Terraform Cloud/EP \   | ドライバの詳細については、各ドキュメントを参照してください。                                    |
            |                                  |                        | driver                 |                                                                                                 |
            |                                  |                        |                        | :doc:`../terraform_driver/terraform_cloud_ep`                                                   |
            +----------------------------------+------------------------+------------------------+-------------------------------------------------------------------------------------------------+

   .. group-tab:: Rest API による実行

      - 特徴

      | 外部システムからオーガナイゼーションの作成を行う場合は、Rest API を使います。

      - 作成方法

      #. オーガナイゼーション作成実行

         | Rest API を使ってオーガナイゼーションを作成します。
         | 利用可能なパラメータは下記のとおりです。
         | 詳細は、:doc:`../../reference/api/system_manager/platform-api` を参照してください。

         .. list-table:: オーガナイゼーション作成パラメータ
            :widths: 25 30 20 35
            :header-rows: 1
            :align: left

            * - 項目
              - 説明
              - 変更
              - デフォルト値・選択可能な設定値
            * - organization id
              - | オーガナイゼーションIDを指定。
                | 英小文字、数字、ハイフン、アンダースコアが利用可能。
                | 最大36文字。
                | ※先頭文字は英小文字であること。
                | ※予約語(後述)に合致しないこと。
              - 可
              - :kbd:`org001`
            * - organization name
              - | オーガナイゼーション名を指定。
                | 最大255文字
              - 可
              - :kbd:`org001-name`
            * - organization manager's username
              - オーガナイゼーション管理者のユーザー名（ログインするときのID）を指定。
              - 可
              - :kbd:`admin`
            * - organization manager's email
              - オーガナイゼーション管理者のE-mailアドレスを指定。
              - 可
              - :kbd:`admin@example.com`
            * - organization manager's firstName
              - オーガナイゼーション管理者の名を指定。
              - 可
              - :kbd:`admin`
            * - organization manager's lastName
              - オーガナイゼーション管理者の姓を指定。
              - 可
              - :kbd:`admin`
            * - organization manager's initial password
              - オーガナイゼーション管理者の初期パスワードを指定。
              - 可
              - :kbd:`password`
            * - options.sslRequired
              - SSL 接続の有無を指定。
              - 可
              - | :program:`external` (既定): プライベート IP アドレスに固定する限り、ユーザーは SSL 無しで Keycloak と通信可能。
                | :program:`none`: SSL の設定なし。
                | :program:`all`: すべての IP アドレスに対し、SSL を要求。(内部の API が HTTP アクセスのため選択不可)
            * - optionsIta.drivers
              - | 対象のドライバについて、インストールする場合はtrue、インストールしない場合はfalseを指定。
                | Exastro OASEをインストールするためにはMongoDBが必要です。MongoDBがない（環境変数「MONGO_HOST」の記載が空である）場合は有効にできません。
              - 可
              - | 各ドライバに対応した以下のkeyに対してtrue/falseを指定し、ワークスペース作成時にインストールされるかどうかを設定。省略可。
                | :program:`ci_cd`: CI/CD for IaC
                | :program:`oase`: Exastro OASE
                | :program:`terraform_cloud_ep`: Terraform Cloud/EP driver
                | :program:`terraform_cli`: Terraform CLI driver
                | 例：:program:`"optionsIta": {"drivers": {"ci_cd": true, "oase": true, "terraform_cli": false, "terraform_cloud_ep": true}}`
            * - optionsIta.services.document_store.name
              - | optionsIta.driversのExastro OASEを有効にした際に必要なパラメータです。
                | 値は"mongodb"固定です。
              - 不可
              - :kbd:`mongodb`
            * - optionsIta.services.document_store.owner
              - | optionsIta.driversのExastro OASEを有効にした際に必要なパラメータです。
                | インストール時に設定したMongoDBを利用する場合はtrueを設定します。利用するMongoDBを指定する場合はfalseを設定します。optionsIta.services.document_store.connection_stringの入力が必要です。
              - 可
              - :kbd:`true or false`
            * - optionsIta.services.document_store.connection_string
              - | optionsIta.driversのExastro OASEを有効にした際に必要なパラメータです。
                | 利用するMongoDBのPython接続文字列を入力します。
              - 可
              - | 例: mongodb://username:password@hostname:27017/

      | cURL を使って Rest API を利用する場合は、以下の様なコマンドを実行してください。
      | BASIC 認証で使用する認証情報は:ref:`create_system_manager` で登録した、:kbd:`KEYCLOAK_USER` 及び :kbd:`KEYCLOAK_PASSWORD` です。

      .. warning::
         | BASIC 認証を行うために、Exastro Platform 管理者の認証情報を :kbd:`BASE64_BASIC` に設定する必要があります。

      | また、Exastro Platform の管理用 URL 情報を :kbd:`BASE_URL` に設定する必要があります。
      | 例えば、 :ref:`サービス公開の設定 (Ingress の設定) <ingress_setting>` をした場合は下記のようになります。

      .. code-block:: bash

        BASE64_BASIC=$(echo -n "KEYCLOAK_USER:KEYCLOAK_PASSWORD" | base64)
        BASE_URL=http://exastro-suite-mng.example.local

        curl -X 'POST' \
          "${BASE_URL}/api/platform/organizations" \
          -H 'accept: application/json' \
          -H "Authorization: Basic ${BASE64_BASIC}" \
          -H 'Content-Type: application/json' \
          -d '{
          "id": "org001",
          "name": "org001-name",
          "organization_managers": [
            {
              "username": "admin",
              "email": "admin@example.com",
              "firstName": "admin",
              "lastName": "admin",
              "credentials": [
                {
                  "type": "password",
                  "value": "password",
                  "temporary": true
                }
              ],
              "requiredActions": [
                "UPDATE_PROFILE"
              ],
              "enabled": true
            }
          ],
          "plan": {},
          "options": {},
          "optionsIta": {
            "drivers": {
              "terraform_cloud_ep": true,
              "terraform_cli": true,
              "ci_cd": true,
              "oase": true
            },
            "services": {
              "document_store": {
                "name": "mongodb",
                "owner": false,
                "connection_string": "mongodb://username:password@hostname:27017/"
              }
            }
          }
        }'



オーガナイゼーション一覧
------------------------

| オーガナイゼーション一覧の確認方法には、下記の2通りの方法があります。

.. tabs::

   .. group-tab:: 画面操作

      以下の手順で実行

      #. メニューより :menuselection:`オーガナイゼーション管理` を選択します。

         .. figure:: /images/ja/manuals/platform/organization/org_management.png
            :width: 200px
            :align: left
            :class: with-border-thin

      #. | オーガナイゼーション一覧が表示され、作成されているオーガナイゼーションを確認することができます。

         .. figure:: /images/ja/manuals/platform/organization/オーガナイゼーション一覧_選択.png
            :width: 600px
            :align: left
            :class: with-border-thin

      #. | 任意のオーガナイゼーションを押下することにより、 オーガナイゼーション詳細が表示され、オーガナイゼーションの詳細情報を確認できます。

         .. figure:: /images/ja/manuals/platform/organization/オーガナイゼーション詳細_v2-4.png
            :width: 600px
            :align: left
            :class: with-border-thin

   .. group-tab:: Rest API による実行

     | cURL を使って Rest API を利用する場合は、以下の様なコマンドを実行してください。

     .. code-block:: bash

      BASE64_BASIC=$(echo -n "システム管理者のユーザー名を設定してください:システム管理者のパスワードを設定してください" | base64)
      BASE_URL=システム管理者用サイトアドレスを設定してください

      curl -k -X GET \
        -H "Content-Type: application/json" \
        -H "Authorization: basic ${BASE64_BASIC}" \
        -d  @- \
        "${BASE_URL}/api/platform/organizations"

     | 返却される項目の説明は以下になります。

     .. list-table:: 返却項目説明
        :widths: 40, 200
        :header-rows: 1
        :align: left

        * - 項目
          - 項目の内容
        * - data.id
          - オーガナイゼーションID
        * - data.name
          - オーガナイゼーション名
        * - data.optionsIta.drivers
          - | 各ドライバの有効無効
            | true:有効 false:無効
        * - data.organization_managers
          - オーガナイゼーション管理者情報
        * - data.active_plan.id
          - 情報取得時点の該当プランID
        * - data.plans
          - オーガナイゼーション設定済みのプラン情報
        * - data.enabled
          - | オーガナイゼーション有効無効
            | true:有効 false:無効
        * - data.status
          - | オーガナイゼーション作成状態
            | 状態については後述

     | オーガナイゼーション作成時、以下の順でステータスが変化していきます。

     .. list-table:: オーガナイゼーション作成状態
        :widths: 40, 200
        :header-rows: 1
        :align: left

        * - status値
          - 説明
        * - Organization Create Start
          - オーガナイゼーション登録開始(ステータス情報登録完了)
        * - Realm Create Complete
          - Platform オーガナイゼーションRealm登録完了
        * - Client Create Complete
          - Platform アプリケーション初期設定完了
        * - Client Role Setting Complete
          - Platform アプリケーションロール初期設定完了
        * - Service Account Setting Complete
          - Platform サービスアカウント設定完了
        * - Organization User Create Complete
          - Platform オーガナイゼーションユーザー登録完了
        * - Organization User Role Setting Complete
          - Platform オーガナイゼーションユーザーロール設定完了
        * - Organization DB Create Complete
          - Platform オーガナイゼーションDB作成完了
        * - Organization DB Update Complete
          - Platform オーガナイゼーション情報によるDB更新完了
        * - IT Automation Organization Create Complete
          - IT Automation オーガナイゼーション作成・初期化完了
        * - Organization Plan Create Complete
          - Platform オーガナイゼーションプラン設定完了
        * - Realm Enabled Complete
          - Platform オーガナイゼーション有効化完了
        * - Organization Create Complete
          - 正常にオーガナイゼーション作成完了


.. _organization_edit:

オーガナイゼーション編集
------------------------

| オーガナイゼーションの編集方法には、下記の2通りの方法があります。

.. tabs::

   .. group-tab:: 画面操作

      | オーガナイゼーション名の変更と、オーガナイゼーションに紐づけるリソースプランを設定することができます。

      #. メニューより :menuselection:`オーガナイゼーション管理` を選択します。

         .. figure:: /images/ja/manuals/platform/organization/org_management.png
            :width: 200px
            :align: left
            :class: with-border-thin

      #. | オーガナイゼーション一覧が表示されますので、編集したいオーガナイゼーションの行にある :guilabel:`編集` ボタンを押下します。

         .. figure:: /images/ja/manuals/platform/organization/オーガナイゼーション編集.png
            :width: 600px
            :align: left
            :class: with-border-thin

      #. | オーガナイゼーション名を変更することができます。

         .. figure:: /images/ja/manuals/platform/organization/orgname_edit_v2-5.png
            :width: 600px
            :align: left
            :class: with-border-thin

         .. tip::
            | オーガナイゼーションIDを変更することは出来ません。

      #. | 追加したいドライバをONにすることで、インストールするドライバを追加することができます。
         | 削除したいドライバをOFFにすることで、アンインストールするドライバを追加することができます。
         | 内容に間違いがなければ、 :guilabel:`登録` ボタンを押下します。

         .. figure:: /images/ja/manuals/platform/organization/org_edit_driver_v2-5.png
            :width: 600px
            :align: left
            :class: with-border-thin

      #. | ドライバをアンインストールする場合は、削除確認画面で :kbd:`delete` を入力して、 :guilabel:`はい、削除します` ボタンを押下します。

         .. figure:: /images/ja/manuals/platform/organization/オーガナイゼーション編集_ドライバ削除.png
            :width: 600px
            :align: left
            :class: with-border-thin

         .. warning::
            | アンインストールするドライバに関連するデータはすべて削除されます。復活することはできませんので、削除する際は十分にお気を付けください。


      #. | :guilabel:`リソースプラン設定` ボタンを押下して、オーガナイゼーションにリソースプランを紐づけることができます。
         | 紐づけるリソースプランIDをプルダウンで選択し、開始日時を指定して、 :guilabel:`適用` ボタンを押下します。

         .. figure:: /images/ja/manuals/platform/organization/オーガナイゼーション編集_リソースプラン設定.png
            :width: 600px
            :align: left
            :class: with-border-thin

      #. | オーガナイゼーションに紐づけるリソースプランが行に追加されます。
         | 内容に間違いがなければ、 :guilabel:`登録` ボタンを押下します。

         .. figure:: /images/ja/manuals/platform/organization/オーガナイゼーション編集_登録_v2-5.png
            :width: 600px
            :align: left
            :class: with-border-thin

      #. | 紐づいているリソースプランが不要になった場合は、 :guilabel:`解除` ボタンを押下して、オーガナイゼーションとリソースプランの紐づけを解除することができます。

         .. figure:: /images/ja/manuals/platform/organization/オーガナイゼーション編集_リソースプラン解除_v2-5.png
            :width: 600px
            :align: left
            :class: with-border-thin

      #. | 解除確認画面で紐づけを解除する :kbd:`リソースプランID` を入力して、 :guilabel:`はい、解除します` ボタンを押下します。

         .. figure:: /images/ja/manuals/platform/organization/オーガナイゼーション編集_解除確認.png
            :width: 600px
            :align: left
            :class: with-border-thin

      #. | 紐づけが解除されるリソースプランの行がグレーアウトされます。
         | 内容に間違いがなければ、 :guilabel:`登録` ボタンを押下します。

         .. figure:: /images/ja/manuals/platform/organization/オーガナイゼーション編集_リソースプラン解除登録_v2-5.png
            :width: 600px
            :align: left
            :class: with-border-thin

      .. tip::
         | リソースプラン設定とリソースプラン解除の手順を繰り返し行い、:guilabel:`登録` ボタンを押下することで、
         | 複数のリソースプランの紐づけや解除を、同時に行うことが可能です。

   .. group-tab:: Rest API による実行

     | cURL を使って Rest API を利用する場合は、以下の様なコマンドを実行してください。

     - | オーガナイゼーションの編集

     | 利用可能なパラメータは下記のとおりです。
     | 詳細は、:doc:`../../reference/api/system_manager/platform-api` を参照してください。

     .. list-table:: オーガナイゼーションパラメータ
        :widths: 25 30 20 35
        :header-rows: 1
        :align: left

        * - 項目
          - 説明
          - 変更
          - デフォルト値・選択可能な設定値
        * - organization name
          - | オーガナイゼーション名を指定します。
            | 最大255文字
          - 可
          - :kbd:`org001-name`
        * - enabled
          - | オーガナイゼーションが使用できる状態を有効・無効で選択します。
          - 不可
          - :kbd:`true`
        * - optionsIta.driver
          - | インストール・アンインストールするドライバを指定します。※
          - | 可
          - :kbd:`true or false`
        * - optionsIta.services.document_store.name
          - | optionsIta.driversのExastro OASEを有効にした際に必要なパラメータです。既にExastro OASEが有効の場合は不要な項目です。
            | 値は"mongodb"固定です。
          - 不可
          - :kbd:`mongodb`
        * - optionsIta.services.document_store.owner
          - | optionsIta.driversのExastro OASEを有効にした際に必要なパラメータです。既にExastro OASEが有効の場合は不要な項目です。
            | インストール時に設定したMongoDBを利用する場合はtrueを設定します。利用するMongoDBを指定する場合はfalseを設定します。optionsIta.services.document_store.connection_stringの入力が必要です。
          - 可（すでに値が設定されている場合は不可）
          - :kbd:`true or false`
        * - optionsIta.services.document_store.connection_string
          - | optionsIta.driversのExastro OASEを有効にした際に必要なパラメータです。既にExastro OASEが有効かつ値に変更がない場合は不要です。
            | 利用するMongoDBのPython接続文字列を入力します。
          - 可
          - | 例: mongodb://username:password@hostname:27017/

     .. warning::
        | アンインストールするドライバに関連するデータはすべて削除されます。復活することはできませんので、削除する際は十分にお気を付けください。

     .. code-block:: bash

         BASE64_BASIC=$(echo -n "システム管理者のユーザー名を設定してください:システム管理者のパスワードを設定してください" | base64)
         BASE_URL=システム管理者用サイトアドレスを設定してください
         ORG_ID=取得するorganization idを設定してください


         curl -k -X 'PUT' \
           -H "Content-Type: application/json" \
           -H "Authorization: basic ${BASE64_BASIC}" \
           -d  @- \
           "${BASE_URL}/api/platform/organizations/${ORG_ID}" \
           << EOF
         {
           "name": "name of org1",
           "enabled": true,
           "optionsIta": {
             "drivers": {
               "terraform_cloud_ep": true,
               "terraform_cli": true,
               "ci_cd": true,
               "oase": true
             }
           }
         }

     - | 設定済みオーガナイゼーションリソースプランの確認

     .. code-block:: bash

         BASE64_BASIC=$(echo -n "システム管理者のユーザー名を設定してください:システム管理者のパスワードを設定してください" | base64)
         BASE_URL=システム管理者用サイトアドレスを設定してください
         ORG_ID=取得するorganization idを設定してください

         curl -k -X GET \
             -H "Content-Type: application/json" \
             -H "Authorization: basic ${BASE64_BASIC}" \
             -d  @- \
             "${BASE_URL}/api/platform/${ORG_ID}/plans"

     - | オーガナイゼーションへのリソースプラン設定

     .. code-block:: bash

         BASE64_BASIC=$(echo -n "システム管理者のユーザー名を設定してください:システム管理者のパスワードを設定してください" | base64)
         BASE_URL=システム管理者用サイトアドレスを設定してください
         ORG_ID=リソースプランを設定するorganization idを設定してください

         curl -k -X POST \
             -H "Content-Type: application/json" \
             -H "Authorization: basic ${BASE64_BASIC}" \
             -d  @- \
             "${BASE_URL}/api/platform/${ORG_ID}/plans" \
             << EOF
         {
             "id": "plan-standard",
             "start_datetime": "2022-12-01 00:00:00"
         }
         EOF

     - | オーガナイゼーションへのリソースプラン解除

     .. code-block:: bash

         BASE64_BASIC=$(echo -n "システム管理者のユーザー名を設定してください:システム管理者のパスワードを設定してください" | base64)
         BASE_URL=システム管理者用サイトアドレスを設定してください
         ORG_ID=リソースプラン解除するorganization idを設定してください
         START_DATETIME=リソースプラン解除する開始日時を設定してください(yyyy-mm-dd hh:mm:ss形式)

         curl -k -X DELETE \
             -H "Content-Type: application/json" \
             -H "Authorization: basic ${BASE64_BASIC}" \
             "${BASE_URL}/api/platform/${ORG_ID}/plans/`echo ${START_DATETIME} | sed 's/ /%20/g;s/:/%3A/g'`"


オーガナイゼーション削除
------------------------

| オーガナイゼーションの削除方法には、下記の2通りの方法があります。

.. tabs::

   .. group-tab:: 画面操作

       | 以下の手順で実行

       #. メニューより :menuselection:`オーガナイゼーション管理` を選択します。

          .. figure:: /images/ja/manuals/platform/organization/org_management.png
             :width: 200px
             :align: left
             :class: with-border-thin

       #. | オーガナイゼーション一覧が表示されますので、削除したいオーガナイゼーションの行にある :guilabel:`削除` ボタンを押下します。

          .. figure:: /images/ja/manuals/platform/organization/オーガナイゼーション削除_一覧から選択.png
             :width: 600px
             :align: left
             :class: with-border-thin

       #. | 削除確認で本当に削除する場合は、 :kbd:`platform/削除するオーガナイゼーションID` を入力して、 :guilabel:`はい、削除します` ボタンを押下します。

          .. figure:: /images/ja/manuals/platform/organization/オーガナイゼーション削除_実行確認.png
             :width: 600px
             :align: left
             :class: with-border-thin

   .. group-tab:: Rest API による実行

      | cURL を使って Rest API を利用する場合は、以下の様なコマンドを実行してください。

      .. code-block:: bash

        BASE64_BASIC=$(echo -n "システム管理者のユーザー名を設定してください:システム管理者のパスワードを設定してください" | base64)
        BASE_URL=システム管理者用サイトアドレスを設定してください
        ORGANIZATION_ID=削除するorganization idを設定してください

        curl -k -X DELETE \
          -H "Authorization: basic ${BASE64_BASIC}" \
          "${BASE_URL}/api/platform/organizations/${ORGANIZATION_ID}"

.. warning::

   | 削除されたオーガナイゼーションは、復活することはできませんので、削除する際は十分にお気を付けください。

オーガナイゼーションへのアクセス
================================

| オーガナイゼーション用サイトが表示できるかWebブラウザから確認します。
| Helm chart版の場合は、 :ref:`サービス公開設定<service_setting>` で設定した EXTERNAL_URL_MNG にアクセスします。
| Docker Compose版の場合は、 :ref:`事前準備<docker_prep>` で設定した Exastro管理用サービスURL にアクセスします。

.. code-block::
   :caption: 書式

   http[s]://{Exastro Platform の管理用 URL}:{Exastro Platform の管理用ポート}/{オーガナイゼーションID}/platform/


.. code-block::
   :caption: 具体例

   # Helm chart版 利用時
   http://exastro-suite-mng.example.local:30081/org001/platform/

   # Docker Compose版 (RHEL環境) 利用時
   http://exastro-suite-mng.example.local:81/org001/platform/

   # Docker Compose版 (非RHEL環境) 利用時
   http://exastro-suite-mng.example.local:30081/org001/platform/


その他制約事項・備考
====================

オーガナイゼーションIDの予約語
------------------------------

| 以下に示すパターンに合致するワードは、オーガナイゼーションの ID として使用できません。

- master
- platform
- account
- account-console
- admin-cli
- broker
- realm-management
- security-admin-console
- \*-workspaces
- system-\*-auth


オーガナイゼーション作成を再実行する場合
----------------------------------------

| オーガナイゼーション作成で失敗した場合、オーガナイゼーション作成の再実行をしても「指定されたorganization(xxx)は作成済みのため、作成できません。」というエラーが表示されることがあります。
| このように、失敗したオーガナイゼーション ID でオーガナイゼーションの作成ができない場合は、コマンドパラメータに :kbd:`--retry` オプションを付与して実行することで再作成をすることが可能です。

.. code-block:: bash

   ./exastro-platform/tools/create-organization.sh --retry

.. code-block:: bash

   ./exastro-platform/tools/create-organization.sh ./exastro-platform/tools/create-organization.sample.json
