
.. _plan:

==============
リソースプラン
==============

はじめに
========

| 本書では、Exastro Suite における リソースプラン設定 について説明します。
| リソースプランの設定はシステム管理者のみ可能です（オーガナイゼーションユーザーからはアクセス出来ません）。

リソースプランとは
==================

| オーガナイゼーションごとに使用可能なリソース量を管理するためのものです。
| プランに複数のリソースの上限値を設定しておき、オーガナイゼーション毎にプランを割り当てることで使用リソースを制限することができます。

.. list-table:: リソースプラン設定例
    :widths: 20, 20, 20, 20, 20
    :header-rows: 1
    :align: left

    * - オーガナイゼーション
      - リソースプラン
      - ワークスペース数
      - ユーザー数
      - ロール数
    * - org1
      - スタンダードプラン
      - 上限20
      - 上限30
      - 上限30
    * - org2
      - プレミアムプラン
      - 上限50
      - 上限100
      - 上限100

リソースプラン設定可能項目一覧
------------------------------

| リソースプランで設定できる項目は以下の通りとなります。

.. list-table:: リソースプラン設定可能項目一覧
   :widths: 70 30 30 120
   :header-rows: 1

   * - 項目名
     - 既定値
     - 最大値
     - 説明
   * - | platform.roles
     - | 1000
     - | 1000
     - | ロールの最大数
       | 登録可能なロールの最大数を調整したい場合に設定してください。
   * - | platform.users
     - | 1000
     - | 1000
     - | ユーザーの最大数
       | 登録可能なユーザーの最大数を調整したい場合に設定してください。
   * - | platform.workspaces
     - | 100
     - | 1000
     - | ワークスペースの最大数
       | 登録可能なワークスペースの最大数を調整したい場合に設定してください。
   * - | ita.organization.ansible.execution_limit
     - | 25
     - | 1000
     - | Ansible driver の Movement同時実行数の上限値
       | 最大数を増やすことにより、パフォーマンスを向上させることが可能ですが、使用するリソースが増大しますので、リソースに見合った値を設定してください。
   * - | ita.organization.common.maintenance_records_limit
     - | 10000
     - | 100000
     - | ITAにおけるレコード一括更新時の最大処理件数
       | API `/api/{organization_id}/workspaces/{workspace_id}/ita/menu/{menu}/maintenance/all/`
       | レコードの一括更新時のパフォーマンス(応答エラーになるなど)によって、値を調整してください。
   * - | ita.organization.common.upload_file_size_limit
     - | 104857600
     - | 107374182400
     - | ITAにおけるファイルアップロード、Ansible処理におけるファイルサイズの最大サイズ(Byte)
       | お使いの環境に合わせてファイルのアップロード最大サイズを調整してください。
   * - | ita.organization.menu_export_import.buffer_size
     - | 1000
     - | 10000
     - | ITAにおけるメニュー一括エクスポート・インポート時の非同期処理中に、データベースから一度に取得するデータ量の上限値
       | 最大数を増やすことにより、パフォーマンスを向上させることが可能ですが、使用するリソースが増大しますので、リソースに見合った値を設定してください。

.. note:: ita.organization.ansible.execution_limitについて

   | オーガナイゼーションごとの同時実行数上限は、設定した内容となりますが、Exastro システム全体での最大同時実行数があるため、システム設定値で設定されている値が同時実行数上限となります。
   | システム全体の最大同時実行数を超えるMovement実行は、実行待ちとなります。

.. note:: ita.organization.common.maintenance_records_limitについて

   | Coudのファイルストレージを利用した環境下では、ファイルの扱いで処理件数が多い更新(削除)応答エラーになる場合があります。その際は最大処理件数を小さくすることで応答エラーを回避することも可能となります。

.. tip::

   | システムの上限値は、APIを利用して取得することができます。
   | APIの利用方法については :doc:`../../reference/api/system_manager/certification` を参照してください。
   | 取得するAPIについては :doc:`../../reference/api/system_manager/platform-api` を参照してください。

リソースプラン設定手順
----------------------

| オーガナイゼーションへリソースプランを適用する場合は、あらかじめリソースプランを登録する必要があります。
| 登録したリソースプランを適用する方法は、 :ref:`organization_creation` を参照してください。

運用とシステムの動きについて
----------------------------

| 例） １月まで「最大ワークスペース数＝５のリソースプラン」、２月から「最大ワークスペース数＝３のリソースプラン」に変更

.. figure:: /images/ja/diagram/operation_and_system_movement_num.png
    :alt: 運用とシステムの動き

1. | ユーザーから「最大ワークスペース数＝３」へのリソースプラン変更申し込みがあった場合、登録済みデータが「ワークスペース数＝４」であるため、2月からリミット値が超過することをシステム管理者から警告します。

2. | 登録済みデータが「ワークスペース数＝４」であるため、リミット値であるリソースプランの「最大ワークスペース数＝５」を超過せずユーザーはワークスペースの追加が出来ます。

3. | 登録済みデータが「ワークスペース数＝５」であるため、リミット値であるリソースプランの「最大ワークスペース数＝５」を超過したワークスペースの追加が出来ません（エラーになります）。

4. | 「最大ワークスペース数＝３」を超過しているが、利用停止等のシステム的な規制はありません。

5. | 登録済みデータが「ワークスペース数＝５」であるため、リミット値であるリソースプランの「最大ワークスペース数＝３」を超過したワークスペースの追加が出来ません（エラーになります）。

6. | 登録済みデータを「ワークスペース数＝５」から「ワークスペース数＝２」に削除することが出来ます。

7. | 登録済みデータが「ワークスペース数＝２」であるため、リミット値であるリソースプランの「最大ワークスペース数＝３」を超過せずユーザーはワークスペースの追加が出来ます。

リソースプラン設定
==================

前提条件
--------

| 本作業には下記のコマンドが必要となるため、事前にインストールをしてください。

- 作業クライアントに必要なアプリケーション

  - :kbd:`curl`
  - :kbd:`git`
  - :kbd:`jq`

.. note::

   画面からリソースプランを作成する際は、前提条件は必要ありません

事前準備
--------

| オーガナイゼーションの作成を行います。
| オーガナイゼーションの詳細については、 :doc:`../../../manuals/platform_management/organization` を参照してください。

.. note::

   画面からリソースプランを作成する際は、事前準備は必要ありません

リソースプラン設定の流れ
------------------------

| リソースプランを登録する流れは以下の通りとなります。

#. | :ref:`plan_list`
#. | :ref:`plan_create`
#. | :ref:`plan_check`

※リソースプランの適用は、 :ref:`オーガナイゼーション作成 または 変更<organization_creation>` をご参照ください。


.. _plan_list:

現状のリソースプラン項目確認
----------------------------

| リソースプラン項目の確認方法には、下記の3通りの方法があります。

.. tabs::

   .. group-tab:: 画面操作

      | リソースプラン項目確認の画面操作はありません。
      | リソースプラン作成時に、設定が必要な項目が表示されます。


   .. group-tab:: 設定ファイルとスクリプトによる実行

      以下の手順で実行

      - | リソースプラン設定項目の確認

        | 新たなリソースプランを作成するにあたって、指定可能なリソースの種類(ID)を確認します。
        | 表示される内容は、バージョンによって異なります。

        - | コマンド

          .. code-block:: bash

             ./get-plan-item-list.sh


        - | コマンド実行後に入力（入力例）

          .. code-block:: bash

             your username : システム管理者自身のユーザー名を入力します
             your password : システム管理者自身のパスワードを入力します

        - | 成功時の結果表示

          | `"result": "000-00000"` が、成功したことを示しています。

          .. code-block:: bash

            < HTTP/1.1 200 OK
            < Date: Fri, 09 Dec 2022 06:58:26 GMT
            < Server: Apache/2.4.37 (Red Hat Enterprise Linux) mod_wsgi/4.7.1 Python/3.9
            < Content-Length: 451
            < Content-Type: application/json
            <
            { [451 bytes data]
            * Connection #0 to host platform-auth left intact
            {
              "data": [
                {
                  "id": "ita.organization.ansible.execution_limit",
                  "informations": {
                    "default": 25,
                    "description": "Maximum number of movement executions for organization default",
                    "max": 1000
                  }
                },
                {
                  "id": "ita.organization.common.upload_file_size_limit",
                  "informations": {
                    "default": 104857600,
                    "description": "Maximum byte size of upload file for organization default",
                    "max": 107374182400
                  }
                },
                {
                  "id": "platform.roles",
                  "informations": {
                    "default": 1000,
                    "description": "Maximum number of roles for organization default",
                    "max": 1000
                  }
                },
                {
                  "id": "platform.users",
                  "informations": {
                    "default": 10000,
                    "description": "Maximum number of users for organization default",
                    "max": 10000
                  }
                },
                {
                  "id": "platform.workspaces",
                  "informations": {
                    "default": 100,
                    "description": "Maximum number of workspaces for organization default",
                    "max": 1000
                  }
                }
              ],
              "message": "SUCCESS",
              "result": "000-00000",
              "ts": "2022-12-09T06:58:26.764Z"
            }

   .. group-tab:: Rest APIによる実行

      以下の手順で実行

      - | RestAPIを直接呼び出す場合は以下の内容で呼び出すことが出来ます。

        .. code-block:: bash

           BASE64_BASIC=$(echo -n "システム管理者のユーザー名を設定してください:システム管理者のパスワードを設定してください" | base64)
           BASE_URL=システム管理者用サイトアドレスを設定してください

           curl -k -X GET \
               -H "Content-Type: application/json" \
               -H "Authorization: basic ${BASE64_BASIC}" \
               -d  @- \
               "${BASE_URL}/api/platform/plan_items"

.. _plan_create:

リソースプラン登録
--------------------------

| リソースプランの登録方法には、下記の3通りの方法があります。

.. tabs::

   .. group-tab:: 画面操作

      | メニューより :menuselection:`リソースプラン管理` を選択します。

      .. figure:: /images/ja/manuals/platform/plan/plan_menu.png
         :width: 200px
         :align: left
         :class: with-border-thin

      | リソースプラン一覧が表示されますので、:guilabel:`作成` ボタンを押下して、新しいリソースプランを登録することができます。

      .. figure:: /images/ja/manuals/platform/plan/plan_list_0_v1_9.png
         :width: 600px
         :align: left
         :class: with-border-thin

      - | リソースプラン登録

        - | 登録するリソースプランのjsonファイルを設定

          | 取得した toolsフォルダ配下にある、 `add-plan.sample.json` を コピーして使用してください。

        .. figure:: /images/ja/manuals/platform/plan/plan_create_v1_9.png
           :width: 600px
           :align: left
           :class: with-border-thin

        .. list-table:: 項目説明
           :widths: 40 200
           :header-rows: 1
           :align: left

           * - 項目名
             - 説明
           * - リソースプランID
             - | リソースプランに割り当てる一意のIDを指定します。
               | ここで指定した ID を使って、オーガナイゼーションへのリソースプランを紐づけることができます。
           * - リソースプラン名
             - | リソースプランに割り当てる名前を指定します。
           * - 説明
             - | リソースプランの説明を記載します。
           * - リソースプラン制限値設定
             - | オーガナイゼーションにおける、リソースの制限を指定します。
               | 各項目の最大値、既定値は以下の通り
               | ita.organization.ansible.execution_limit:【最大:1000】【既定:25】
               | ita.organization.common.upload_file_size_limit:【最大:107374182400】【既定:104857600】
               | platform.roles:【最大:1000】【既定:1000】
               | platform.users:【最大:10000】【既定:10000】
               | platform.workspaces:【最大:1000】【既定:100】

   .. group-tab:: 設定ファイルとスクリプトによる実行

      以下の手順で実行

      - | リソースプラン登録

        - | 登録するリソースプランのjsonファイルを設定

          | 取得した toolsフォルダ配下にある、 `add-plan.sample.json` を コピーして使用してください。


      - | 登録するリソースプランの設定

        | add-plan.jsonにコピーした例

        .. code-block:: bash

            vi add-plan.json


        .. code-block:: bash

            {
                "id": "plan-standard",
                "name": "スタンダードプラン",
                "informations": {
                    "description": ""
                },
                "limits": {
                    "ita.organization.ansible.execution_limit": 25,
                    "ita.organization.common.upload_file_size_limit": 104857600,
                    "platform.workspaces": 500,
                    "platform.users": 1000,
                    "platform.roles": 500
                }
            }

        .. tip::

           | ※limitsは、リソースプラン設定項目の確認で取得した内容をもとに作成します

      - | 項目説明

        .. list-table:: リソースプラン設定項目
           :widths: 20, 20, 40
           :header-rows: 1
           :align: left

           * - 項目
             - 項目の内容
             - 形式
           * - id
             - リソースプランID
             - | 英小文字、数字、ハイフン、アンダースコア(最大３６文字)
               | ※先頭文字は英小文字であること
               | ※予約語(後述)に合致しないこと
           * - name
             - リソースプラン名
             - 最大２５５文字
           * - informations.description
             - 説明
             - 最大２５５文字
           * - limits.xxxxxx.xxxxx
             - 取得したリソースプラン項目の内容を設定
             - 数値

      - | コマンド

        .. code-block:: bash

            ./add-plan.sh add-plan.json


      - | コマンド実行後に入力（入力例）

        .. code-block:: bash

            your username : システム管理者自身のユーザー名を入力します
            your password : システム管理者自身のパスワードを入力します

      - | 成功時の結果表示

        | `"result": "000-00000"` が、成功したことを示しています。

        .. code-block:: bash

            < HTTP/1.1 200 OK
            < Date: Fri, 09 Dec 2022 08:12:35 GMT
            < Server: Apache/2.4.37 (Red Hat Enterprise Linux) mod_wsgi/4.7.1 Python/3.9
            < Content-Length: 104
            < Content-Type: application/json
            <
            { [104 bytes data]
            * Connection #0 to host platform-auth left intact
            {
            "data": null,
            "message": "SUCCESS",
            "result": "000-00000",
            "ts": "2022-12-09T08:12:36.219Z"
            }

      - | 失敗時の結果表示イメージ

        .. code-block:: bash

            < HTTP/1.1 400 BAD REQUEST
            < Date: Fri, 09 Dec 2022 08:16:09 GMT
            < Server: Apache/2.4.37 (Red Hat Enterprise Linux) mod_wsgi/4.7.1 Python/3.9
            < Content-Length: 265
            < Connection: close
            < Content-Type: application/json
            <
            { [265 bytes data]
            * Closing connection 0
            {
              "data": null,
              "message": "指定されたプランはすでに存在しているため作成できません。",
              "result": "400-27001",
              "ts": "2022-12-09T08:16:09.830Z"
            }

   .. group-tab:: Rest APIによる実行

      以下の手順で実行

      - | RestAPIを直接呼び出す場合は以下の内容で呼び出すことができます。

        .. code-block:: bash

          BASE64_BASIC=$(echo -n "システム管理者のユーザー名を設定してください:システム管理者のパスワードを設定してください" | base64)
          BASE_URL=システム管理者用サイトアドレスを設定してください

          curl -k -X POST \
              -H "Content-Type: application/json" \
              -H "Authorization: basic ${BASE64_BASIC}" \
              -d  @- \
              "${BASE_URL}/api/platform/plans" \
              << EOF
          {
            "id": "plan-standard",
            "name": "スタンダードプラン",
            "informations": {
              "description": ""
            },
            "limits": {
              "ita.organization.ansible.execution_limit": 25,
              "platform.workspaces": 500,
              "platform.users": 1000,
              "platform.roles": 500
            }
          }
          EOF

.. _plan_check:

リソースプラン確認
--------------------------

| リソースプランの確認方法には、下記の3通りの方法があります。

.. tabs::

   .. group-tab:: 画面操作

      | メニューより :menuselection:`リソースプラン管理` を選択します。

      .. figure:: /images/ja/manuals/platform/plan/plan_menu.png
         :width: 200px
         :align: left
         :class: with-border-thin

      | リソースプラン一覧が表示され、登録されているリソースプランを確認することができます。

      .. figure:: /images/ja/manuals/platform/plan/plan_list_1.png
         :width: 600px
         :align: left
         :class: with-border-thin

   .. group-tab:: 設定ファイルとスクリプトによる実行

      以下の手順で実行

      - | 設定済みリソースプランの確認

        - | コマンド

          .. code-block:: bash

              ./get-plan-list.sh


        - | コマンド実行後に入力（入力例）

          .. code-block:: bash

             your username : システム管理者自身のユーザー名を入力します
             your password : システム管理者自身のパスワードを入力します


        - | 成功時の結果表示

          | `"result": "000-00000"` が、成功したことを示しています。

          .. code-block:: bash

              < HTTP/1.1 200 OK
              < Date: Thu, 12 Jan 2023 08:26:42 GMT
              < Server: Apache/2.4.37 (Red Hat Enterprise Linux) mod_wsgi/4.7.1 Python/3.9
              < Content-Length: 4274
              < Content-Type: application/json
              <
              { [4274 bytes data]
              * Connection #0 to host platform-auth left intact
              {
                "data": [
                  {
                    "create_timestamp": "2022-12-07T06:04:31.000Z",
                    "create_user": "system",
                    "id": "_default",
                    "informations": {
                      "description": "default plan"
                    },
                    "last_update_timestamp": "2022-12-07T06:04:31.000Z",
                    "last_update_user": "system",
                    "limits": {
                      "ita.organization.ansible.execution_limit": 25,
                      "platform.workspaces": 100,
                      "platform.roles": 1000,
                      "platform.users": 10000
                    },
                    "name": "_default plan"
                  },
                  {
                    "create_timestamp": "2022-12-09T08:12:36.000Z",
                    "create_user": "bd09d674-298f-4b55-9777-0758bf6f294e",
                    "id": "plan-standard",
                    "informations": {
                      "description": ""
                    },
                    "last_update_timestamp": "2022-12-09T08:12:36.000Z",
                    "last_update_user": "bd09d674-298f-4b55-9777-0758bf6f294e",
                    "limits": {
                      "ita.organization.ansible.execution_limit": 25,
                      "platform.workspaces": 500,
                      "platform.users": 1000,
                      "platform.roles": 500
                    },
                    "name": "スタンダードプラン"
                  }
                ],
                "message": "SUCCESS",
                "result": "000-00000",
                "ts": "2023-01-12T08:26:42.375Z"
              }

   .. group-tab:: Rest APIによる実行

      以下の手順で実行

      - | RestAPIを直接呼び出す場合は以下の内容で呼び出すことができます。

        .. code-block:: bash

          BASE64_BASIC=$(echo -n "システム管理者のユーザー名を設定してください:システム管理者のパスワードを設定してください" | base64)
          BASE_URL=システム管理者用サイトアドレスを設定してください

          curl -k -X GET \
              -H "Content-Type: application/json" \
              -H "Authorization: basic ${BASE64_BASIC}" \
              -d  @- \
              "${BASE_URL}/api/platform/plans"

.. tip::

   | 現在リソースプランの変更や削除は未対応となっております。

.. note::

   | 作成したリソースプランの適用は、 :doc:`オーガナイゼーション作成 または 変更<./organization>` を参照してください。


.. _plan_organization_status:

使用状況確認
----------------------------------------------------

| オーガナイゼーション毎のリソース使用状況（ワークスペース数、ユーザー数、ロール数）を確認できます。
| リソース使用状況の確認方法には、下記の2通りの方法があります。

.. tip::

   | オーガナイゼーション毎の使用状況確認の画面操作はありません。
   | 「設定ファイルとスクリプトによる実行」または「Rest APIによる実行」をご利用ください。

.. tabs::

   .. group-tab:: 設定ファイルとスクリプトによる実行

      以下の手順で実行

      - | オーガナイゼーション毎の使用状況確認

        - | コマンド

          .. code-block:: bash

            ./get-usage-list.sh

        - | コマンド実行後に入力（入力例）

          .. code-block:: bash

            organization id : 取得するorganization idを入力します（省略時は全オーガナイゼーション）

            your username : システム管理者自身のユーザー名を入力します
            your password : システム管理者自身のパスワードを入力します

        - | 成功時の結果表示

          | `"result": "000-00000"` が、成功したことを示しています。

          .. code-block:: bash

            < HTTP/1.1 200 OK
            < Date: Mon, 30 Jan 2023 08:18:57 GMT
            < Server: Apache/2.4.37 (Red Hat Enterprise Linux) mod_wsgi/4.7.1 Python/3.9
            < Content-Length: 432
            < Content-Type: application/json
            <
            { [432 bytes data]
            * Connection #0 to host platform-auth left intact
            {
              "data": [
                {
                  "organization_id": "org1",
                  "usages": [
                    {
                      "current_value": 0,
                      "id": "platform.workspaces"
                    },
                    {
                      "current_value": 1,
                      "id": "platform.users"
                    },
                    {
                      "current_value": 0,
                      "id": "platform.roles"
                    }
                  ]
                }
              ],
              "message": "SUCCESS",
              "result": "000-00000",
              "ts": "2023-01-30T08:18:57.887Z"
            }


   .. group-tab:: Rest APIによる実行

      以下の手順で実行

      - | RestAPIを直接呼び出す場合は以下の内容で呼び出すことができます。

        .. code-block:: bash

          BASE64_BASIC=$(echo -n "システム管理者のユーザー名を設定してください:システム管理者のパスワードを設定してください" | base64)
          BASE_URL=システム管理者用サイトアドレスを設定してください
          ORG_ID=取得するorganization idを設定してください

          curl -k -X GET \
              -H "Content-Type: application/json" \
              -H "Authorization: basic ${BASE64_BASIC}" \
              "${BASE_URL}/api/platform/usages?organization_id=${ORG_ID}"

        .. note::

           | すべてのオーガナイゼーションの使用状況を取得する場合は、"?organization_id=${ORG_ID}" の条件を指定せずに実行してください
