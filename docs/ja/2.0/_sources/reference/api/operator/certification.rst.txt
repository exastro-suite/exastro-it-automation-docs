====
認証
====

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

実行手順（サンプル）
^^^^^^^^^^^^^^^^^^^^

| 以下のサンプルはBasic認証を使用して、Workspace一覧取得APIを呼出しています。

.. code-block:: bash

    BASEURL="https://severname"
    ORGANIZATION_ID="オーガナイゼーションID"
    USERNAME="ユーザー名"
    PASSWORD="パスワード"

    # Workspace一覧取得APIの呼び出し
    curl -u "${USERNAME}:${PASSWORD}" "${BASEURL}/api/${ORGANIZATION_ID}/platform/workspaces"



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
    ORGANIZATION_ID="オーガナイゼーションID"
    USERNAME="ユーザー名"
    PASSWORD="パスワード"

    # refresh_token払出
    curl -X POST \
    -d "client_id=_${ORGANIZATION_ID}-api" \
    -d "grant_type=password" \
    -d "scope=openid+offline_access" \
    -d "username=${USERNAME}" \
    -d "password=${PASSWORD}" \
    "${BASEURL}/auth/realms/${ORGANIZATION_ID}/protocol/openid-connect/token"



