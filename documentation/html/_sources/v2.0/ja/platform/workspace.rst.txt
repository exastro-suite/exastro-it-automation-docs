==========================
Workspace (ワークスペース)
==========================

はじめに
========

| 本章では、Exastro Suite における Workspace (ワークスペース) について説明します。


オーガナイゼーションとは
========================

| Exastro IT Automation 2.0 から導入されたマルチテナント機能におけるテナントの単位のことで、論理的に組織の空間を区分する単位のことを指します。
| Exastro Suite の各アプリケーションの利用を開始するためには、オーガナイゼーションを作成する必要があります。


オーガナイゼーションの作成
==========================

| オーガナイゼーション作成を行うことで、オーガナイゼーション管理者のアカウントが作成され、オーガナイゼーションごとのエンドポイントURLにアクセスすることができるようになります。
| また、システム内部では下記の処理が実行されます。
- Keycloak に、オーガナイゼーション用のレルムデータと管理者ユーザが登録されます。
- MariaDB や MySQL といったリレーショナルデータベースに、オーガナイゼーション用のデータが登録されます。
- Exastro IT Automation の永続ボリュームに、オーガナイゼーション用のディレクトリが作成されます。
- GitLab に、オーガナイゼーション用のユーザが登録されます。

前提条件
--------

| 本作業には下記のコマンドが必要となるため、事前にインストールをしてください。

- 作業クライアントに必要なアプリケーション

  - :kbd:`curl`
  - :kbd:`git`
  - :kbd:`jq`
 
オーガナイゼーション作成
------------------------

| オーガナイゼーションの作成方法には、下記の3通りの方法があります。
- :ref:`方法1: 設定ファイルを使った作成方法 <org_create_method_1>`
- :ref:`方法2: 対話型による作成方法 <org_create_method_2>`
- :ref:`方法3: Rest API による作成方法 <org_create_method_3>`

.. _org_create_method_1:

方法1: 設定ファイルを使った作成方法
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| GitHub リポジトリから取得した資材の中にある、シェルスクリプトを実行しオーガナイゼーションを作成します。

#. オーガナイゼーション作成用シェルスクリプトを、リポジトリから :kbd:`git clone` により取得します。

   .. code-block:: bash

      # Exastro Platform の資材を入手
      git clone https://github.com/exastro-suite/exastro-platform.git

#. 設定ファイルの :kbd:`CONF_BASE_URL` に Exastro Suite の管理用エンドポイント URL を設定します。

   .. code-block:: bash

      # Exastro Platform への接続のための設定情報を登録
      vi ./exastro-platform/test/tools/create-organization.conf

   | 例えば、:ref:`サービス公開の設定 (Ingress の設定)<ingress_setting>` をした場合は下記のようになります。

   - create-organization.conf

     .. code-block:: diff
  
       - CONF_BASE_URL=http://platform-auth:8001
       + CONF_BASE_URL=http://exastro-suite-mng.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io
         CURL_OPT=-sv
   
   .. tip::
      | 自己証明書を利用している場合、証明書エラーが発生します。
      | 設定ファイル内の :kbd:`CURL_OPT=-sv` を :kbd:`CURL_OPT=-svk` に変更することで証明書エラーを回避できますが、認証機関から発行された正しい証明書をインストールすることを推奨します。
      
#. オーガナイゼーション情報の設定

   | オーガナイゼーション作成時の初期登録情報として下記の項目を設定できます。

   .. list-table:: オーガナイゼーション作成パラメータ
      :widths: 25 30 35
      :header-rows: 1
      :align: left
   
      * - 項目
        - 項目の内容
        - 形式
      * - id
        - オーガナイゼーションID
        - | 英小文字、数字、ハイフン、アンダースコア。
          | 最大36文字。
          | ※先頭文字は英小文字であること。
          | ※予約語(後述)に合致しないこと。
      * - name
        - オーガナイゼーション名
        - 最大255文字
      * - organization_managers
        - オーガナイゼーション管理者の情報
        - ※複数名登録するときは繰り返し指定可能
      * - organization_managers[*].username
        - オーガナイゼーション管理者のユーザ名（ログインするときのID）
        - 
      * - organization_managers[*].email
        - オーガナイゼーション管理者のE-mailアドレス
        - 
      * - organization_managers[*].firstName
        - オーガナイゼーション管理者の名
        - 
      * - organization_managers[*].lastName
        - オーガナイゼーション管理者の姓
        - 
      * - organization_managers[*].credentials[0].value
        - オーガナイゼーション管理者の初期パスワード
        - 
      * - options.sslRequired
        - | :program:`external` (既定): プライベート IP アドレスに固定する限り、ユーザは SSL 無しで Keycloak と通信可能。
          | :program:`none`: SSL の設定なし。
          | :program:`all`: すべての IP アドレスに対し、SSL を要求。(内部の API が HTTP アクセスのため選択不可)
        - 


   | 設定ファイルの作成は、:file:`./exastro-platform/test/tools/create-organization.sample.json` を基に、作成するオーガナイゼーションの情報を指定した JSON ファイルを基に作成します。

   .. raw:: html

      <details>
        <summary>create-organization.sample.json</summary>

   .. code-block:: json

      {
          "id"    :   "org002",
          "name"  :   "org002-name",
          "organization_managers" : [
              {
                  "username"  :   "admin",
                  "email"     :   "admin@example.com",
                  "firstName" :   "admin",
                  "lastName"  :   "admin",
                  "credentials"   :   [
                      {
                          "type"      :   "password",
                          "value"     :   "password",
                          "temporary" :   true
                      }
                  ],
                  "requiredActions": [
                      "UPDATE_PROFILE"
                  ],
                  "enabled": true
              }
          ],
          "options": {}
      }

   .. raw:: html

      </details>

   .. code-block:: bash

      cd exastro-platform/test/tools/

      cp -pi ./exastro-platform/test/tools/create-organization{.sample,}.json

      vi ./exastro-platform/test/tools/create-organization.json

   
   .. tip::
      | optionsの値に :program:`"sslRequired": "none"` を指定することで、オーガナイゼーションユーザが http でのアクセスが可能となります。

#. オーガナイゼーション作成実行

   Platform管理者アカウントを登録していない場合は、\ `Platform管理者アカウントの追加 <http://10.197.17.190:30400/631aac9174a18b0047bb938c>`__

   -  コマンド

      .. code:: bash

         ./exastro-platform/test/tools/create-organization.sh create-organization.json

         your username : INPUT-YOUR-USERNAME # Platform管理者のユーザ名を入力します
         your password : INPUT-USER-PASSWORD # Platform管理者のパスワードを入力します

         Create an organization, are you sure? (Y/other) : Y # Y を入力するとオーガナイゼーションの作成処理が開始します

   -  成功時の結果表示
      resultが”000-00000”が、オーガナイゼーションの作成に成功したことを示しています。
      
      .. code:: bash

         ...
         < HTTP/1.1 200 OK
         < Date: Thu, 18 Aug 2022 01:49:13 GMT
         < Server: Apache/2.4.37 (Red Hat Enterprise Linux) mod_wsgi/4.7.1 Python/3.9
         < Content-Length: 107
         < Content-Type: application/json
         < 
         {
           "data": null, 
           "message": "SUCCESS", 
           "result": "000-00000", 
           "ts": "2022-08-18T01:49:17.251Z"
         }
         * Connection #0 to host platform-auth left intact


   -  失敗時の結果表示イメージ

      .. code:: bash

         ...
         < HTTP/1.1 400 BAD REQUEST
         < Date: Thu, 18 Aug 2022 05:29:35 GMT
         < Server: Apache/2.4.37 (Red Hat Enterprise Linux) mod_wsgi/4.7.1 Python/3.9
         < Content-Length: 252
         < Connection: close
         < Content-Type: application/json
         < 
         { [252 bytes data]
         * Closing connection 0
         {
           "data": null,
           "message": "指定されたorganization(org002)は作成済みのため、作成できません。",
           "result": "400-23001",
           "ts": "2022-08-18T05:29:35.643Z"
         }

.. _org_create_method_2:

方法2: 対話型による作成方法
^^^^^^^^^^^^^^^^^^^^^^^^^^

| 画面の指示に従ってオーガナイゼーション情報を指定し、オーガナイゼーションを作成します

.. tip::
   | この方法の場合、オーガナイゼーション管理者は1人のみ指定できます。
   | 複数名オーガナイゼーション管理者を作成する場合は、:ref:`設定ファイルを使った作成手順 <org_create_method_1>` で行ってください。


| GitHub リポジトリから取得した資材の中にある、シェルスクリプトを実行しオーガナイゼーションを作成します。

#. オーガナイゼーション作成用シェルスクリプトを、リポジトリから :kbd:`git clone` しダウンロードします。

   .. code-block:: bash

      # Exastro Platform の資材を入手
      git clone https://github.com/exastro-suite/exastro-platform.git

#. 設定ファイルの :kbd:`CONF_BASE_URL` に Exastro Suite の管理用エンドポイント URL を設定します。

   .. code-block:: bash

      # クローンしたディレクトリに移動
      cd exastro-platform/test/tools/

      # 接続先の
      vi ./exastro-platform/test/tools/create-organization.conf

      CONF_BASE_URL={Exastro Suite の管理用エンドポイント URL}

   | 例えば、:ref:`サービス公開の設定 (Ingress の設定)<ingress_setting>` をした場合は下記のようになります。

   - create-organization.conf

     .. code-block:: diff
  
       - CONF_BASE_URL=http://platform-auth:8001
       + CONF_BASE_URL=http://exastro-suite-mng.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io
         CURL_OPT=-sv

   .. tip::
      | 自己証明書を利用している場合、証明書エラーが発生します。
      | 設定ファイル内の :kbd:`CURL_OPT=-sv` を :kbd:`CURL_OPT=-svk` に変更することで証明書エラーを回避できますが、認証機関から発行された正しい証明書をインストールすることを推奨します。

#. オーガナイゼーション作成実行

   | オーガナイゼーション作成時の初期登録情報として下記の項目を設定できます。

   .. list-table:: オーガナイゼーション作成パラメータ
      :widths: 25 30 20
      :header-rows: 1
      :align: left

      * - 項目
        - 項目の内容
        - 形式
      * - organization id
        - オーガナイゼーションID
        - | 英小文字、数字、ハイフン、アンダースコア
          | 最大36文字
          | ※先頭文字は英小文字であること
          | ※予約語(後述)に合致しないこと
      * - organization name
        - オーガナイゼーション名
        - 最大255文字
      * - organization manager's username
        - オーガナイゼーション管理者のユーザ名（ログインするときのID）
        - 
      * - organization manager's email
        - オーガナイゼーション管理者のE-mailアドレス
        - 
      * - organization manager's firstname
        - オーガナイゼーション管理者の名
        - 
      * - organization manager's lastname
        - オーガナイゼーション管理者の姓
        - 
      * - organization manager's initial password
        - オーガナイゼーション管理者の初期パスワード
        - 

-  コマンド

   .. code:: bash

      bash ./exastro-platform/test/tools/create-organization.sh

-  コマンド実行後に入力 (入力例)

   .. code:: bash

      Please enter the organization information to be created
  
      organization id : org001 # オーガナイゼーションIDを入力します
      organization name : organization001 # オーガナイゼーション名を入力します
      organization manager's username : org-manager # オーガナイゼーション管理者のユーザ名（ログインするときのID）を入力します
      organization manager's email : # オーガナイゼーション管理者のE-mailアドレスを入力します
      organization manager's first name : # オーガナイゼーション管理者の名を入力します
      organization manager's last name : # オーガナイゼーション管理者の姓を入力します
      organization manager's initial password : # オーガナイゼーション管理者の初期パスワードを入力します
  
      your username : INPUT-YOUR-USERNAME # Platform管理者のユーザ名を入力します
      your password : INPUT-USER-PASSWORD # Platform管理者のパスワードを入力します
 
      Create an organization, are you sure? (Y/other) : Y # "Y"を入力すると実行します


-  成功時の結果表示
   resultが”000-00000”が、オーガナイゼーションの作成に成功したことを示しています。
   
   .. code:: bash

      ...
      < HTTP/1.1 200 OK
      < Date: Thu, 18 Aug 2022 01:49:13 GMT
      < Server: Apache/2.4.37 (Red Hat Enterprise Linux) mod_wsgi/4.7.1 Python/3.9
      < Content-Length: 107
      < Content-Type: application/json
      < 
      {
         "data": null, 
         "message": "SUCCESS", 
         "result": "000-00000", 
         "ts": "2022-08-18T01:49:17.251Z"
      }
      * Connection #0 to host platform-auth left intact


-  失敗時の結果表示イメージ

   .. code:: bash

      ...
      < HTTP/1.1 400 BAD REQUEST
      < Date: Thu, 18 Aug 2022 05:29:35 GMT
      < Server: Apache/2.4.37 (Red Hat Enterprise Linux) mod_wsgi/4.7.1 Python/3.9
      < Content-Length: 252
      < Connection: close
      < Content-Type: application/json
      < 
      { [252 bytes data]
      * Closing connection 0
      {
         "data": null,
         "message": "指定されたorganization(org002)は作成済みのため、作成できません。",
         "result": "400-23001",
         "ts": "2022-08-18T05:29:35.643Z"
      }

.. _org_create_method_3:

方法3: Rest API による作成方法
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Rest API を使ってオーガナイゼーションを作成します。

.. list-table:: オーガナイゼーション作成パラメータ
   :widths: 25 40 20
   :header-rows: 1
   :align: left

   * - 項目
     - 項目の内容
     - 形式
   * - id
     - オーガナイゼーションID
     - | 英小文字、数字、ハイフン、アンダースコア。
       | 最大36文字。
       | ※先頭文字は英小文字であること。
       | ※予約語(後述)に合致しないこと。
   * - name
     - オーガナイゼーション名
     - 最大255文字
   * - organization_managers
     - オーガナイゼーション管理者の情報
     - ※複数名登録するときは繰り返し指定可能
   * - organization_managers[*].username
     - オーガナイゼーション管理者のユーザ名（ログインするときのID）
     - 
   * - organization_managers[*].email
     - オーガナイゼーション管理者のE-mailアドレス
     - 
   * - organization_managers[*].firstName
     - オーガナイゼーション管理者の名
     - 
   * - organization_managers[*].lastName
     - オーガナイゼーション管理者の姓
     - 
   * - organization_managers[*].credentials[0].value
     - オーガナイゼーション管理者の初期パスワード
     - 
   * - options.sslRequired
     - | :program:`external` (既定): プライベートIPアドレスに固定する限り、ユーザはSSL無しでKeycloakと通信可能。
       | :program:`none`: SSLの設定なし。
       | :program:`all`: すべてのIPアドレスに対し、SSLを要求。(内部のAPIがHTTPアクセスのため選択不可)
     - 


| シェルスクリプトを介さずに、APIを直接実行する場合は、以下の様なコマンドを実行してください。
| BASIC 認証を行うために、Exastro Platform 管理者の認証情報を :kbd:`BASE64_BASIC` に設定する必要があります。
| 認証情報に関して、:ref:`インストール時に登録した認証情報 <DATABASE_SETUP>` で登録した内容となります。

| また、Exastro Platform の管理用 URL 情報を :kbd:`BASE_URL` に設定する必要があります。
| 例えば、:ref:`サービス公開の設定 (Ingress の設定) <ingress_setting>` をした場合は下記のようになります。

.. code:: bash

   BASE64_BASIC=$(echo -n "KEYCLOAK_USER:KEYCLOAK_PASSWORD" | base64)
   BASE_URL=http://exastro-suite-mng.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io

   curl -k -X POST \
       -H "Content-Type: application/json" \
       -H "Authorization: basic ${BASE64_BASIC}" \
       -d  @- \
       "${BASE_URL}/api/platform/organizations?retry=1" \
       << EOF
   {
     "id": "org002",
     "name": "org002-name",
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
     "options": {}
   }
   EOF


オーガナイゼーションへのアクセス
--------------------------------


#. オーガナイゼーション用サイトが表示できるかWebブラウザから確認します。

   | http[s]://{Exastro Platform の管理用 URL}/{オーガナイゼーションID}/platform/
   | 例: http://exastro-suite-mng.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io/org002/platform/


その他制約事項・備考
--------------------

オーガナイゼーションIDの予約語
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| オーガナイゼーション作成で失敗した場合、オーガナイゼーション作成の再実行をしても「指定されたorganization(xxx)は作成済みのため、作成できません。」というエラーが表示されることがあります。
| このように、失敗したオーガナイゼーション ID でオーガナイゼーションの作成ができない場合は、コマンドパラメータに :kbd:`--retry` オプションを付与して実行することで再作成をすることが可能です。

.. code:: bash

   ./exastro-platform/test/tools/create-organization.sh --retry

.. code:: bash

   ./exastro-platform/test/tools/create-organization.sh ./exastro-platform/test/tools/create-organization.sample.json
