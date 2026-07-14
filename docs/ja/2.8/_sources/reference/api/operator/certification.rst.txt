====
認証
====

.. _operator_certifications:

APIのアクセス（認証）について
=============================

はじめに
--------

| 本内容はExastro Suite (IT Automation 2.0系)のAPIを利用するためのユーザー向け手順について記載しています。
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

| 以下のサンプルはBasic認証を使用して、Workspace一覧取得APIを呼出しています。

.. code-block:: bash

    BASEURL="https://severname"
    ORGANAIZATION_ID="オーガナイゼーションID"
    USERNAME="ユーザー名"
    PASSWORD="パスワード"

    # Workspace一覧取得APIの呼び出し
    curl -u "${USERNAME}:${PASSWORD}" "${BASEURL}/api/${ORGANAIZATION_ID}/platform/workspaces"



.. _operator_certification_bearer:

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


.. _operator_refresh_token:

事前準備手順（サンプル） - refresh_tokenの払い出し
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| 以下のサンプルはrefresh_tokenを払い出すサンプルです。
| ※二要素認証の設定の有無によって、パラメータに違いがあります。

- | 二要素認証を設定していないユーザの場合


.. code-block:: bash

    BASEURL="https://severname"
    ORGANAIZATION_ID="オーガナイゼーションID"
    USERNAME="ユーザー名"
    PASSWORD="パスワード"

    # refresh_token払出
    curl -X POST \
    -d "client_id=_${ORGANAIZATION_ID}-api" \
    -d "grant_type=password" \
    -d "scope=openid+offline_access" \
    -d "username=${USERNAME}" \
    -d "password=${PASSWORD}" \
    "${BASEURL}/auth/realms/${ORGANAIZATION_ID}/protocol/openid-connect/token"

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| 以下のサンプルはBearer認証を使用して、オペレーションの一覧取得APIを呼出しています。

.. code-block:: bash

  BASEURL="https://severname"
  REFRESH_TOKEN="eyJhbGci..." # 事前準備手順で払い出したrefresh_token
  ORGANAIZATION_ID="オーガナイゼーションID"
  WORKSPACE_ID="ワークスペースID"

  # access_token払出
  ACCESS_TOKEN=$(\
      curl -X POST \
      -d "client_id=_platform-api" \
      -d "grant_type=refresh_token" \
      -d "refresh_token=${REFRESH_TOKEN}" \
      "${BASEURL}/auth/realms/master/protocol/openid-connect/token" \
      | jq -r ".access_token" \
  )

  # オペレーションの一覧（全件）取得APIの呼び出し
  curl -X GET \
    "${BASEURL}/api/${ORGANAIZATION_ID}/workspaces/${WORKSPACE_ID}/ita/menu/operation_list/filter/" \
    -H "Authorization: Bearer ${ACCESS_TOKEN}" \
