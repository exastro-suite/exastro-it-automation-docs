====
認証
====

APIのアクセス（認証）について
=============================

はじめに
--------

| 本内容はExastro Suite (IT Automation 2.0系)のAPIを利用するためのシステム管理者向け手順について記載しています。
| Exastro Suite (IT Automation 2.0系)のAPIの呼び出し方法として、次の２つがあります。

- APIの呼び出し方法

  - :kbd:`Basic認証`

  - :kbd:`Bearer認証`

| ※Exastro PlatformおよびExastroIT Automationの全てのAPIはどちらの方法でも利用することが出来ます。（※token発行APIを除く）

Basic認証
---------

| ユーザー名、パスワードを指定してAPIを呼出す、簡易的な認証方式として利用することが出来ます。
| 使用するユーザーが二要素認証を設定している場合は、この認証方式は使用出来ません。

実行手順（サンプル・Basic認証）
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| 以下のサンプルはBasic認証を使用して、オーガナイゼーション一覧取得APIを呼出しています。

.. code-block:: bash

    BASEURL="https://severname"
    USERNAME="ユーザー名"
    PASSWORD="パスワード"

    # オーガナイゼーション一覧取得APIの呼び出し
    curl -u "${USERNAME}:${PASSWORD}" "${BASEURL}/api/platform/organizations"


Bearer認証
----------

| アクセストークンを指定してAPIを呼び出す認証方式です。
| 本実行手順の中には２つのトークンがあります、それぞれの役割・特徴は次の通りです。

.. list-table:: トークンの種類
    :widths: 20, 40
    :header-rows: 1
    :align: left

    * - トークン
      - 役割・特徴
    * - refresh_token
      - | 事前に準備するトークンで、access_tokenを発行するために必要です。
        | トークンの有効期限が長い（デフォルト：1年）
    * -  access_token
      - | APIを呼出す際に指定するトークンです。
        | トークンの有効期限が短い（デフォルト：1日）


事前準備手順（サンプル） - refresh_tokenの払い出し
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| 以下のサンプルはrefresh_tokenを払い出すサンプルです。
| ※二要素認証の設定の有無によって、パラメータに違いがあります。

- | 二要素認証を設定していないユーザの場合

.. code-block:: bash

    BASEURL="https://severname"
    USERNAME="ユーザー名"
    PASSWORD="パスワード"

    # refresh_token払出
    curl -X POST \
    -d "client_id=_platform-api" \
    -d "grant_type=password" \
    -d "scope=openid+offline_access" \
    -d "username=${USERNAME}" \
    -d "password=${PASSWORD}" \
    "${BASEURL}/auth/realms/master/protocol/openid-connect/token"

- | 二要素認証を設定しているユーザの場合

.. code-block:: bash

  BASEURL="https://severname"
  USERNAME="ユーザー名"
  PASSWORD="パスワード"
  ONETIME_PASSWORD="ワンタイムパスワード"　# Google Authenticator等で取得したワンタイムパスワード

  # refresh_token払出
  curl -X POST \
  -d "client_id=_platform-api" \
  -d "grant_type=password" \
  -d "scope=openid+offline_access" \
  -d "username=${USERNAME}" \
  -d "password=${PASSWORD}" \
  -d "totp=${ONETIME_PASSWORD}" \
  "${BASEURL}/auth/realms/master/protocol/openid-connect/token"

- | 実行結果

| 以下の応答の中のrefresh_tokenを保存します（API呼出の際に使用します）。
| ※この実行結果以外で後からrefresh_tokenを再度表示することは出来ないので、発行したrefresh_tokenは大切に保管してください。

.. code-block:: bash

  {
    "access_token": "eyJhbGci...",
    "expires_in": 172800,
    "refresh_expires_in": 31536000,
    "refresh_token": "eyJhbGci...",
    "token_type": "Bearer",
    "id_token": "eyJhbGci...",
    "not-before-policy": 0,
    "session_state": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    "scope": "openid email profile offline_access"
  }

実行手順（サンプル・Bearer認証）
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| 以下のサンプルはBearer認証を使用して、オーガナイゼーション一覧取得APIを呼出しています。

.. code-block:: bash

  BASEURL="https://severname"
  REFRESH_TOKEN="eyJhbGci..." # 事前準備手順で払い出したrefresh_token

  # access_token払出
  ACCESS_TOKEN=$(\
      curl -X POST \
      -d "client_id=_platform-api" \
      -d "grant_type=refresh_token" \
      -d "refresh_token=${REFRESH_TOKEN}" \
      "${BASEURL}/auth/realms/master/protocol/openid-connect/token" \
      | jq -r ".access_token" \
  )

  # オーガナイゼーション一覧取得APIの呼び出し
  curl -H "Authorization: Bearer ${ACCESS_TOKEN}" "${BASEURL}/api/platform/organizations"

付録
----

発行済みのrefresh_tokenの有効期限の確認
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- | Basic認証

.. code-block:: bash

  BASEURL="https://severname"
  USERNAME="ユーザー名"
  PASSWORD="パスワード"

  curl -u "${USERNAME}:${PASSWORD}" \
  "${BASEURL}/api/platform/users/_current/refresh_tokens"

- | Bearer認証

.. code-block:: bash

  BASEURL="https://severname"
  ACCESS_TOKEN="eyJhbGci..." # 前述の手順で払い出したaccess_token

  curl -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  "${BASEURL}/api/platform/users/_current/refresh_tokens"

- | 実行結果

.. code-block:: json

  {
    "data": [
      {
        "expire_timestamp": "2024-01-24T03:57:09.000Z",
        "id": "XXXXXXXX-XXXX-XXXXXXXXXXXXXXXXXXXXXX",
        "lastaccess_timestamp": "2023-01-24T03:57:09.000Z",
        "start_timestamp": "2023-01-24T03:57:09.000Z"
      },
      {
        "expire_timestamp": "2024-01-24T02:38:21.000Z",
        "id": "XXXXXXXX-XXXX-XXXXXXXXXXXXXXXXXXXXXX",
        "lastaccess_timestamp": "2023-01-24T02:38:21.000Z",
        "start_timestamp": "2023-01-24T02:38:21.000Z"
      }
    ],
    "message": "SUCCESS",
    "result": "000-00000",
    "ts": "2023-01-24T03:57:25.377Z"
  }


.. list-table:: 発行済みのrefresh_tokenの有効期限の確認
    :widths: 20, 40
    :header-rows: 1
    :align: left

    * - 項目
      - 内容
    * - .data[*].expire_timestamp
      - 有効期限(UTC時間)
    * - .date[*].lastaccess_timestamp
      - 最終アクセス日時(UTC時間)
    * - .data[*].start_timestamp
      - 発行日時(UTC時間)
    * - .data[*].id
      - セッションID

発行済みのrefresh_tokenの無効化
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| 発行者本人分の全てのrefresh_tokenを無効化し、使用できないようにするには以下のAPIを実行します。

.. danger::
  | 特定の１つのrefresh_tokenだけを無効化する方法はありません。


- | Basic認証

.. code-block:: bash

  BASEURL="https://severname"
  USERNAME="ユーザー名"
  PASSWORD="パスワード"

  curl -X DELETE -u "${USERNAME}:${PASSWORD}" \
  "${BASEURL}/api/platform/users/_current/refresh_tokens"

- | Bearer認証

.. code-block:: bash

  BASEURL="https://severname"
  ACCESS_TOKEN="eyJhbGci..." # 前述の手順で払い出したaccess_token

  curl -X DELETE -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  "${BASEURL}/api/platform/users/_current/refresh_tokens"

- | 実行結果（成功時）

.. code-block:: bash

  {
    "data": null,
    "message": "SUCCESS",
    "result": "000-00000",
    "ts": "2023-01-24T08:47:27.318Z"
  }

トークンの有効期限の設定変更
----------------------------

| トークンの有効期限の日数は、以下で設定出来ます。
| ※設定はシステム管理者のtokenにのみに反映されます

1. | 以下のURLよりkeycloakにアクセスします。

.. code-block:: bash

  {システム管理者サイトアドレス}/auth/admin/master/console/#/realms/master

2. | 未ログインの際は、ログイン画面が表示されますのでログインしてください

.. figure:: /images/ja/manuals/platform/login/exastro-login.png
   :width: 400px
   :alt: ログイン画面


- | refresh tokenの有効期限設定

  1. | 「Realm Settings」の「Tokens」を選択します。

  .. figure:: /images/ja/manuals/platform/keycloak/keycloak_tokens.png
     :width: 500px
     :alt: Tokens

  2. | 「Offline Session Max Limited」をONに設定し、「Offline Session Idle」と「Offline Session Max」にrefresh tokenの有効期限に設定したい値を入力します。
     | 各項目についての詳細は Keycloakのドキュメント <https://www.keycloak.org/docs/latest/server_admin/index.html> をご確認ください。

     | 例)refresh tokenの有効期限を365日に設定したい場合

     - | Offline Session Idle：365 Days
     - | Offline Session Max：365 Days

  .. figure:: /images/ja/manuals/platform/keycloak/keycloak_offline_session_max_limited.png
     :width: 500px
     :alt: Offline Session Max Limited

- | access tokenの有効期限設定

  1. | 「Clients」を選択します。

  .. figure:: /images/ja/manuals/platform/keycloak/keycloak_clients.png
     :width: 500px
     :alt: Clients

  2. | 「_platform-api」を選択します。

  .. figure:: /images/ja/manuals/platform/keycloak/keycloak_platform-api.png
     :width: 500px
     :alt: platform-api

  3. | 「Advanced Settings」の中の「Access Token Lifespan」と「Client Session Idle」と「Client Session Max」にaccess tokenの有効期限に設定したい値を入力します。
     | 各項目についての詳細は Keycloakのドキュメント <https://www.keycloak.org/docs/latest/server_admin/index.html> をご確認ください。

     | 例)access tokenの有効期限を1日に設定したい場合

     - | Access Token Lifespan：1 Days
     - | Client Session Idle：1 Days
     - | Client Session Max：1 Days

  .. figure:: /images/ja/manuals/platform/keycloak/keycloak_advanced_settings.png
     :width: 500px
     :alt: Advanced Settings

