========================
オーガナイゼーション設定
========================

.. This is a comment11.

はじめに
========

| 本書はオーガナイゼーション管理者が、カスタマイズ可能なシステムの設定について記載しています。
| ※記載のAPIを実行するにはオーガナイゼーション管理者の権限が必要です。


前提条件
========

| 本作業には下記のコマンドが必要となるため、事前にインストールをしてください。

- 作業クライアントに必要なアプリケーション

  - :kbd:`curl`

設定項目のカテゴリについて
==========================

| カテゴリ毎に設定内容を記載しています。詳細は該当のカテゴリのセクションを参照ください。


.. list-table:: 設定項目のカテゴリ
    :widths: 20, 40
    :header-rows: 1
    :align: left

    * - カテゴリ
      - 設定内容
    * - トークン
      - APIで使用するトークンの有効期間の設定


トークンの設定
==============

| APIで使用するrefresh_tokenやaccess_tokenの有効期限の期間の設定が可能です。
|
| ※ 有効日数を短縮した場合、全ユーザーの発行済みのトークンの有効期限も短縮されます。
| 　 ただし、有効日数を延長しても全ユーザーの発行済みのトークンの有効期限は延長されません。

- 設定確認

  - コマンド

    .. code-block:: bash

       BASEURL="https://severname"
       ORGANAIZATION_ID="オーガナイゼーションID"
       USERNAME="ユーザー名"
       PASSWORD="パスワード"

       curl -u "${USERNAME}:${PASSWORD}" \
       "${BASEURL}/api/${ORGANAIZATION_ID}/platform/setting" \
       | jq ".data.token"


  - 実行結果

    .. code-block:: bash

       {
        "access_token_lifespan_minutes": 2880,
        "refresh_token_max_lifespan_days": 365,
        "refresh_token_max_lifespan_enabled": true
       }

- 設定変更

  - コマンド

    .. code-block:: bash

       BASEURL="https://severname"
       ORGANAIZATION_ID="オーガナイゼーションID"
       USERNAME="ユーザー名"
       PASSWORD="パスワード"

       cat <<EOS | curl -u "${USERNAME}:${PASSWORD}" -H "Content-type: application/json" \
       -X PATCH -d @- "${BASEURL}/api/${ORGANAIZATION_ID}/platform/setting"
       {
           "token": {
             "refresh_token_max_lifespan_enabled": true,
             "refresh_token_max_lifespan_days": 365,
             "access_token_lifespan_minutes": 2880
           }
       }
       EOS

  - 実行結果（成功時）

    .. code-block:: bash

        {
        "data": null,
        "message": "SUCCESS",
        "result": "000-00000",
        "ts": "2023-01-24T05:12:16.382Z"
        }


- 項目について

  .. list-table:: トークンの項目説明
      :widths: 20, 40
      :header-rows: 1
      :align: left

      * - 項目
        - 内容
      * - refresh_token_max_lifespan_enabled
        -  | refresh_tokenの有効期限の有無(必須)
           | true: 有効期限あり
           | false: 有効期限なし
           | デフォルト: true
      * - refresh_token_max_lifespan_days
        -  | refresh_tokenの有効日数
           | ※refresh_token_max_lifespan_enabled=trueの場合のみ必須
           | デフォルト: 365 (1年)
           | 最小値: 1
           | 最大値: 1,095(3年)
      * - access_token_lifespan_minutes
        -  | access_tokenの有効分数(必須)
           | デフォルト: 1,440 (1日)
           | 最小値: 1
           | 最大値: 10,080 (7日)


