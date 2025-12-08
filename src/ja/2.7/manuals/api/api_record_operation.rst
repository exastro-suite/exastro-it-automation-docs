.. _api_authentication:

APIのアクセス（認証）について
=============================

| 利用する対象のAPIのエンドポイント、パラメータ、詳細については、各利用者向けの、「:ref:`api_operator`」、「:ref:`api_system_manager`」を参照してください。
| Bearer認証を使用して、API実行を行う場合、各利用者向けの「APIのアクセス（認証）について - Bearer認証」 の参照して、認証方式を変更してください。

.. warning::
   | API実行時の言語について

   - 最終ログイン時の言語情報が参照されます。

.. tip::
   | 作成直後のユーザー情報で、Basic認証を使用したAPI実行について

   - 初回ログイン後の設定が行われていない為、認証エラーとなります。
     「:ref:`first_login`」参照して、必要な対応を実施してください。

   .. code-block:: bash

      {
          "data": null,
          "message": "認証に失敗しました。",
          "result": "401-00002",
          "ts": "2023-10-13T08:19:22.913Z"
      }


.. _api_execution_example:

登録、編集のAPI、関連APIの実行例
================================

| 以下、登録、編集のAPI、及び関連APIの実行の例について記載します。

-  :ref:`api_execution_example_filter`
-  :ref:`api_execution_example_maintenance`
-  :ref:`parameter_information`

| 以下のAPI実行の説明において、認証方式は、Basic認証を使用しています。
| Bearer認証を使用したAPIの実行を行う場合、「:ref:`operator_certification_bearer`」を参照してください。

.. tip::
   | APIのエンドポイントで使用するメニュー名の確認方法ついて

   - 「:menuselection:`管理コンソール --> メニュー管理`」から該当するメニューのレコードを確認し、「:menuselection:`メニュー名(rest)` 」の値を使用してください。


.. tip:: | パラメータで使用する、JSONデータ、FOEMデータに関する補足
    | パラメータ指定時の形式、指定方法について
    | コンテンツタイプ、パラメータ指定の方法や、curlの実行環境等により、適切なもので対応してください。

    - JSONデータをJSONファイルで保存し、パラメータにJSONファイルを指定して使用する
    - JSONデータのシングルクォーテーション「'」が使用できない場合、ダブルクォーテーション「 "」 を用いて、かつ内部で使用されたダブルクォーテーションをエスケープした書き方に変更する
    - 末尾の「\\」、「^」については、ご利用環境で適切なものに変更する

    | 以下、コンテンツタイプによるパラメータの指定方法の詳細は、「:ref:`maintenance_parameters_by_content_type`」を参照してください。

    .. code-block:: bash
       :caption: JSONデータを使用する場合

       curl -X POST \
       "http://servername/api/organization_1/workspaces/workspace_1/ita/menu/playbook_files/maintenance/all/" \
       -H "Authorization: Basic dXNlcl9pZDpwYXNzd29yZA==" \
       -H "Content-Type: application/json" \
       --data-raw [ { \"file\": { \"playbook_file\": \"LSBuYW1lOiBydW4gImVjaG8iCiAgY29tbWFuZDogZWNobyB7eyBWQVJfU1RSXzEgfX0=\" }, \"parameter\": { \"discard\": \"0\", \"item_no\": null, \"playbook_name\": \"echo\", \"playbook_file\": \"echo.yml\", \"remarks\": null, \"last_update_date_time\": null, \"last_updated_user\": null }, \"type\": \"Register\" } ]


    .. code-block:: bash
       :caption: JSONファイルを使用する場合

       curl -X POST \
       "http://servername/api/organization_1/workspaces/workspace_1/ita/menu/playbook_files/maintenance/all/" \
       -H "Authorization: Basic dXNlcl9pZDpwYXNzd29yZA==" \
       -H "Content-Type: application/json" \
       -d @playbook_files_sample.json


    .. code-block:: json
       :caption: playbook_files_sampleの内容

       [
           {
               "file": {
                   "playbook_file": "LSBuYW1lOiBydW4gImVjaG8iCiAgY29tbWFuZDogZWNobyB7eyBWQVJfU1RSXzEgfX0="
               },
               "parameter": {
                   "discard": "0",
                   "item_no": null,
                   "playbook_name": "echo",
                   "playbook_file": "echo.yml",
                   "remarks": null,
                   "last_update_date_time": null,
                   "last_updated_user": null
               },
               "type": "Register"
           }
       ]

    .. code-block:: bash
       :caption: シングルクォーテーションを使用しない場合

       curl -X POST \
       "http://servername/api/organization_1/workspaces/workspace_1/ita/menu/playbook_files/maintenance/all/" \
       -H "Authorization: Basic dXNlcl9pZDpwYXNzd29yZA==" \
       -F "json_parameters=[{\"parameter\":{\"discard\":\"0\",\"item_no\":null,\"playbook_name\":\"echo\",\"playbook_file\":\"echo.yml\",\"remarks\":null,\"last_update_date_time\":null,\"last_updated_user\":null},\"type\":\"Register\"}] " \
       -F "0.playbook_file=@echo.yml"


.. _api_execution_example_filter:

一覧取得（Menu Filter：レコードの取得）
---------------------------------------

| 以下のサンプルはBasic認証を使用して、「:menuselection:`機器一覧`」 のレコード取得APIを呼出しています。

.. code-block:: bash
   :caption: 機器一覧のレコード取得APIを呼出

    BASEURL="https://servername"
    ORGANAIZATION_ID="オーガナイゼーションID"
    WORKSPACE_ID="ワークスペースID"
    MENU="device_list"
    USERNAME="ユーザー名"
    PASSWORD="パスワード"
    BASE64_BASIC=$(echo -n "ユーザー名を設定してください:パスワードを設定してください" | base64)

    # 機器一覧の全レコードを取得する
    curl -X GET -u "${USERNAME}:${PASSWORD}" "${BASEURL}/api/${ORGANAIZATION_ID}/workspaces/${WORKSPACE_ID}/ita/menu/${MENU}/filter/"

    # 機器一覧の全レコードを取得する
    curl -X GET \
      "${BASEURL}/api/${ORGANAIZATION_ID}/workspaces/${WORKSPACE_ID}/ita/menu/${MENU}/filter/" \
      -H "Authorization: Basic ${BASE64_BASIC}" \

    # 機器一覧の条件指定した、レコードを取得する（条件：廃止済みを除く）
    curl -X POST \
      "${BASEURL}/api/${ORGANAIZATION_ID}/workspaces/${WORKSPACE_ID}/ita/menu/${MENU}/filter/" \
      -H "Authorization: Basic ${BASE64_BASIC}" \
      -H "Content-Type: application/json" \
      --data-raw "{\"discard\":{\"LIST\":[\"0\"]}}"

.. tip::
  | 一覧取得時の条件指定について
  | 条件指定で利用可能な検索方法を以下に記載します。

  .. list-table:: 一覧取得で指定可能な検索のオプション
     :header-rows: 1
     :align: left

     * - **オプション**
       - **説明**
       - **設定例**
       - **制約事項**
     * - NORMAL
       - | あいまい検索を実施します。
         | 指定した語句を含むレコードを検索します。
       - {"対象のキー":{"NORMAL":"検索条件"}}
       -
     * - LIST
       - | 完全一致検索を実施します。
         | 指定した語句に一致するレコードを検索します。
       - {"対象のキー":{"LIST":["検索条件"]}}
       -
     * - RANGE
       - | 範囲指定による検索を実施します。
         | 指定した範囲内に一致するレコードを検索します。
         | STARTのみ指定時には、指定条件以上のレコードを検索します。
         | ENDのみ指定時には、指定条件以下のレコードを検索します。
       - {"対象のキー":{"RANGE":{"START":"検索条件","END":"検索条件"}}}
       -
  .. code-block:: json
     :caption: 一覧取得時の条件のパラメータ構成について

      {
          "対象のキー": {
              "NORMAL": "検索条件を指定"
          },
          "対象のキー": {
              "LIST": [
                  "検索条件を指定",
                  "検索条件を指定"
              ]
          },
          "対象のキー": {
              "RANGE": {
                  "START": "検索条件を指定",
                  "END": "検索条件を指定"
              }
          }
      }

  | 機器一覧の条件指定した検索のパラメータ:

  - 廃止含まず
  - ホスト名に「host」を含む
  - 最終更新日時が「2023/01/01 00:00:00」～「2023/12/31 00:00:00」の間

  .. code-block:: json
     :caption: 機器一覧の条件指定した検索例

      {
          "host_name": {
              "NORMAL": "host"
          },
          "discard": {
              "LIST": [
                  "0"
              ]
          },
          "last_update_date_time": {
              "RANGE": {
                  "START": "2023/01/01 00:00:00",
                  "END": "2023/12/31 00:00:00"
              }
          }
      }

.. tip::
   | レコードの廃止(論理削除)について

   - | 論理削除状態のレコードのことを指します。
   - | 各レコードのdiscardの値で、レコードの論理削除状態を示します。
     | - "0"：有効なレコード
     | - "1"：廃止されたレコード

   - 廃止状態のレコードは、バリデーションの対象には含まれません。


.. tip::
   | ファイルの出力について

   - ファイルのデータは、base64エンコードした文字列で出力されます。必要に応じて、base64デコードして使用してください。

.. tip::
   | 一部の暗号化行う項目ついて

   - パスワード等の一部の項目について、暗号化された形で保存されます。
   - 一覧取得のAPIで出力される値は、nullとなり登録された値は、出力されません。

   | ※暗号化された形で、保存される項目については、各メニューのマニュアルを参照してください。


.. _api_execution_example_maintenance:

登録、編集（Menu MaintenanceAll レコードの一括操作）
----------------------------------------------------

| 登録、編集のAPIのパラメータの指定方式として、以下のContent-Typeで選択可能です。

- application/json 形式

  - パラメータをJSONデータで送信します。
  - ファイルデータは、パラメータ内に、base64文字列として記載し送信します。

- multipart/form-data 形式

  - パラメータ、ファイルをformデータとして送信します。
  - ファイルのformデータのキーは、パラメータのJSONデータのindexと、対象のキーを「.」で接続して使用します。


| 以下のサンプルはBasic認証を使用して、「:menuselection:`Ansible共通 --> 機器一覧`」、「:menuselection:`Ansible-Legacy --> Playbook素材集`」のレコード操作のAPIを呼出しています。

- :ref:`api_execution_example_maintenance_device_list`
- :ref:`api_execution_example_maintenance_playbook_files`

.. tip::
   | 登録、編集時のバリデーションについて

   - APIによる登録、編集時も画面側からの操作で、登録、編集実施した際と同じバリデーションがかかります。
   - 各項目のバリデーションについては、各メニューのマニュアルを参照してください。


.. _maintenance_parameters_by_content_type:

Content-Typeによるパラメータの構造の違いについて
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| 以下は、各Content-Type毎の、パラメータの構成について説明します。
| パラメータで使用する対象キーの取得、確認方法については、「:ref:`parameter_information`」を参照してください。

- Content-Type: application/json

.. code-block:: json
   :caption: パラメータの構成について(application/json)

    [
        {
            "file": {
                "対象のキー": "ファイルデータをbase64エンコードした文字列"
            },
            "parameter": {
                "対象のキー": "値"
            },
            "type":"Register"
        }
    ]

- Content-Type: multipart/form-data

.. code-block:: bash
   :caption: パラメータの構成について(multipart/form-data)

    json_parameters='
        [
            {
                "parameter": {
                    "対象のキー": "値",
                },
                "type":"Register"
            }
        ]'
    X.<対象のキー>=@echo.yml

    # Xについては、json_parametersのインデックスに対応する数値を指定してください。

| 以下、登録、更新時のパラメータ例について記載します。

- 「:menuselection:`Ansible-Legacy --> Playbook素材集`」の登録のサンプル

.. code-block:: json
   :caption: Content-Type: application/jsonの場合の curlの --data-raw のパラメータ

    [
        {
            "file": {
                "playbook_file": "LSBuYW1lOiBydW4gImVjaG8iCiAgY29tbWFuZDogZWNobyB7eyBWQVJfU1RSXzEgfX0="
            },
            "parameter": {
                "discard": "0",
                "item_no": null,
                "playbook_name": "echo",
                "playbook_file": "echo.yml",
                "remarks": null,
                "last_update_date_time": null,
                "last_updated_user": null
            },
            "type": "Register"
        }
    ]


.. code-block:: bash
   :caption:  Content-Type: multipart/form-dataの場合の curlの -F のパラメータ

   json_parameters='[
       {
           "parameter": {
               "discard": "0",
               "item_no": null,
               "playbook_name": "echo",
               "playbook_file": "echo.yml",
               "remarks": null,
               "last_update_date_time": null,
               "last_updated_user": null
           },
           "type": "Register"
       }
   ]'
   # ファイルデータ
   0.playbook_file=@echo.yml

    ※ 見栄えの為、改行、インデントを入れた形で表記しています。

- 「:menuselection:`Ansible-Legacy --> Playbook素材集`」の更新のサンプル

.. code-block:: json
    :caption: Content-Type: application/jsonの場合の curlの --data-raw のパラメータ

    [
        {
            "file": {
                "playbook_file": "LSBuYW1lOiBydW4gImVjaG8iDQogIGNvbW1hbmQ6IGVjaG8ge3sgVkFSX1NUUl8xIH19DQoNCi0gbmFtZTogcGF1c2UNCiAgcGF1c2U6DQogICAgc2Vjb25kczogMTAw"
            },
            "parameter": {
                "discard": "0",
                "item_no": "00000000-0000-0000-0000-000000000000",
                "playbook_name": "echo_pause100",
                "playbook_file": "echo_pause100.yml",
                "remarks": null,
                "last_update_date_time": "2023/10/11 09:24:09.928044",
                "last_updated_user": "ユーザー名"
            },
            "type": "Update"
        }
    ]

.. code-block:: bash
    :caption: Content-Type: multipart/form-dataの場合の curlの -F のパラメータ

    json_parameters='[
        {
            "parameter": {
                "discard": "0",
                "item_no": "00000000-0000-0000-0000-000000000000",
                "playbook_name": "echo_pause100",
                "playbook_file": "echo_pause100.yml",
                "remarks": null,
                "last_update_date_time": "2023/10/11 09:24:09.928044",
                "last_updated_user": "ユーザー名"
            },
            "type": "Register"
        }
    ]'
    # ファイルデータ
    0.playbook_file=@echo_pause100.yml

    ※ 見栄えの為、改行、インデントを入れた形で表記しています。


.. tip::
   | レコード更新時のlast_update_date_timeの値について

   - last_update_date_timeには、FILTERで取得した最新の該当レコードの値を使用してください。
   - 最新の値と一致しない場合、レコードの更新は行われません。

.. tip::
   | application/jsonを利用したファイル操作について

   - | ファイルの登録、更新方法
     | parameter、file配下の指定のキーに、登録、更新する値を指定してください。
     | ファイル名は、parameter配下の対象のキーに指定し、file配下の対象のキーに、ファイルをbase64エンコードした文字列を指定してください。

   - | ファイル名の変更方法
     | ファイル名のみ変更したい場合は、parameter配下の対象のキーの値を変更し、file配下の対象のキーに、ファイルをbase64エンコードした文字列を指定してください。
     | ファイルのデータに変更がない場合でも、file配下の対象のキーに指定してください。
     | parameter配下の対象のキーのみ値を変更し、file配下の対象のキーが存在しない場合、更新の対象から除外されます。

   - | ファイルの削除方法
     | parameter配下の対象のキーを""又は、nullで指定してください。"null"とするとファイル名として認識します。

.. tip::
   | multipart/form-dataを利用したファイル操作について

   - | ファイルの登録、更新方法
     | parameter配下の指定のキーに、登録、更新する値を指定してください。
     | ファイル名は、parameter配下の対象のキーに指定してください。
     | ファイルデータは、JSONデータのインデックス+対象のキーを「.」で接続したものを、-F のキー指定しに、ファイルのパスを指定してください。

   - | ファイル名の変更方法
     | ファイル名のみ変更したい場合は、parameter配下の対象のキーの値を変更し、json_parametersのJSONデータのインデックス+の対象のキーを「.」で接続したものを、-F のキーに、ファイルのパスを指定してください。
     | ファイルのデータに変更がない場合でも、JSONデータのインデックス+対象のキーを「.」で接続したものを、-F のキー指定しに、ファイルのパスを指定してください。
     | parameter配下の対象のキーのみ値を変更し、ファイルデータを指定しない場合、更新の対象から除外されます。

   - | ファイルの削除方法
     | parameter配下の対象のキーを""又は、nullで指定してください。"null"とするとファイル名として認識します。


.. tip::
   | ファイルのデータ、ファイル名を変更しないで、他の項目の値のみを更新する場合について

   - parameter配下の変更する対象の項目の値のみ変更して、file配下、もしくは、-F でファイル指定せずに、対象項目のキーを含めずに更新してください。

.. tip::
   | プルダウン項目の値について

   - プルダウン項目の対象、使用可能な値については、「:ref:`parameter_information_pulldown_info` 」で取得できる情報を参照してください。

.. _api_execution_example_maintenance_device_list:

Ansible共通 - 機器一覧
^^^^^^^^^^^^^^^^^^^^^^
.. code-block:: bash
   :caption: 実行手順(サンプル)：機器一覧

   BASEURL="https://servername"
   ORGANAIZATION_ID="オーガナイゼーションID"
   WORKSPACE_ID="ワークスペースID"
   MENU="device_list"
   USERNAME="ユーザー名"
   PASSWORD="パスワード"
   BASE64_BASIC=$(echo -n "ユーザー名を設定してください:パスワードを設定してください" | base64)

   # Content-Type: application/json
   curl -X POST \
     "${BASEURL}/api/${ORGANAIZATION_ID}/workspaces/${WORKSPACE_ID}/ita/menu/${MENU}/maintenance/all/" \
     -H "Authorization: Basic ${BASE64_BASIC}" \
     -H "Content-Type: application/json" \
     --data-raw "[{ \"file\": {\"ssh_private_key_file\": \"\", \"server_certificate\": \"\"}, \"parameter\": { \"authentication_method\": \"パスワード認証\", \"connection_options\": null, \"connection_type\": \"machine\", \"discard\": \"0\", \"host_dns_name\": null, \"host_name\": \"exastro-test\", \"hw_device_type\": null, \"instance_group_name\": null, \"inventory_file_additional_option\": null, \"ip_address\": \"127.0.0.1\", \"lang\": \"utf-8\", \"login_password\": \"password\", \"login_user\": \"root\", \"os_type\": null, \"passphrase\": null, \"port_no\": null, \"protocol\": \"ssh\", \"remarks\": null, \"server_certificate\": null, \"ssh_private_key_file\": null }} ]"

   ※ file配下のssh_private_key_file, server_certificateについて、ファイルをbase64エンコードしたものを指定してください。

   # Content-Type: Multipart/form-data
   curl -X POST \
     "${BASEURL}/api/${ORGANAIZATION_ID}/workspaces/${WORKSPACE_ID}/ita/menu/${MENU}/maintenance/all/" \
     -H "Authorization: Basic ${BASE64_BASIC}" \
     -F 'json_parameters="[ { "parameter": { "discard": "0", "managed_system_item_number": null, "hw_device_type": null, "host_name": "exastro-test", "host_dns_name": null, "ip_address": "127.0.0.1", "login_user": "root", "login_password": "asdfghjkl", "ssh_private_key_file": "ssh_key_file.pem", "authentication_method": "パスワード認証","port_no": null, "server_certificate": "certificate_file.crt", "protocol": "ssh", "os_type": null, "lang": "utf-8", "connection_options": null, "inventory_file_additional_option": null, "instance_group_name": null,"connection_type": "machine", "remarks": null,"last_update_date_time": null, "last_updated_user": null}, "type": "Register" }]"' \
     -F '0.ssh_private_key_file=@/ssh_key_file.pem' \
     -F '0.server_certificate=@/certificate_file.crt' \


.. _api_execution_example_maintenance_playbook_files:

Ansible-Legacy - Playbook素材集
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash
   :caption: 実行手順(サンプル)：Playbook素材集

   BASEURL="https://servername"
   ORGANAIZATION_ID="オーガナイゼーションID"
   WORKSPACE_ID="ワークスペースID"
   MENU="playbook_files"
   USERNAME="ユーザー名"
   PASSWORD="パスワード"
   BASE64_BASIC=$(echo -n "ユーザー名を設定してください:パスワードを設定してください" | base64)

   # Content-Type: application/json
   curl -X POST \
     "${BASEURL}/api/${ORGANAIZATION_ID}/workspaces/${WORKSPACE_ID}/ita/menu/${MENU}/maintenance/all/" \
     -H "Authorization: Basic ${BASE64_BASIC}" \
     -H "Content-Type: application/json" \
     --data-raw "[{\"file\":{\"playbook_file\":\"LSBuYW1lOiBydW4gImVjaG8iCiAgY29tbWFuZDogZWNobyB7eyBWQVJfU1RSXzEgfX0=\"},\"parameter\":{\"discard\":\"0\",\"item_no\":null,\"playbook_name\":\"echo\",\"playbook_file\":\"echo.yml\",\"remarks\":null,\"last_update_date_time\":null,\"last_updated_user\":null},\"type\":\"Register\"}]"

   # Content-Type: Multipart/form-data
   curl -X POST
    "${BASEURL}/api/${ORGANAIZATION_ID}/workspaces/${WORKSPACE_ID}/ita/menu/${MENU}/maintenance/all/" \
    -H "Authorization: Basic ${BASE64_BASIC}" \
    -F "json_parameters=[{\"parameter\":{\"discard\":\"0\",\"item_no\":null,\"playbook_name\":\"echo\",\"playbook_file\":\"echo.yml\",\"remarks\":null,\"last_update_date_time\":null,\"last_updated_user\":null},\"type\":\"Register\"}] " \
    -F "0.playbook_file=@echo.yml"


.. _parameter_information:

APIのパラメータ関連情報（Menu Info メニュー情報の取得）
-------------------------------------------------------

| レコードの一括操作パラメータの作成について
| レコードの一括操作のパラメータ、項目の構成については、以下を参照してください。

-  :ref:`parameter_information_menu_info`
-  :ref:`parameter_information_column_info`
-  :ref:`parameter_information_pulldown_info`

.. _parameter_information_menu_info:

メニュー情報
^^^^^^^^^^^^

| :ref:`api_execution_example_maintenance` で使用する、メニューの構成情報、カラムグループ、カラムに関する設定値を取得できます。


- | /api/{organization_id}/workspaces/{workspace_id}/ita/menu/{menu}/info/

  .. code-block:: bash
     :caption: メニューの構成情報取得API

     BASEURL="https://servername"
     ORGANAIZATION_ID="オーガナイゼーションID"
     WORKSPACE_ID="ワークスペースID"
     MENU="対象メニュー"
     USERNAME="ユーザー名"
     PASSWORD="パスワード"
     BASE64_BASIC=$(echo -n "ユーザー名を設定してください:パスワードを設定してください" | base64)

     curl -X GET \
       "${BASEURL}/api/${ORGANAIZATION_ID}/workspaces/${WORKSPACE_ID}/ita/menu/${MENU}/info/" \
       -H "Authorization: Basic ${BASE64_BASIC}" \

  .. code-block:: text
     :caption: メニューの構成情報について

     {
         "data": {
             "column_group_info": {},
             "column_info": {
                 "cX": {
                     "column_name": "",     # 画面で表示される項目名
                     "column_name_rest": "", # APIのパラメータで指定する項目名
                     "auto_input": "",      # 自動入力フラグ
                     "input_item": "",      # 入力対象フラグ
                     "view_item": "",       # 出力対象フラグ
                     "required_item": "",   # 必須入力フラグ
                     "unique_item": "",     # 一意制約フラグ
                     "...省略...": ""      #
                 },
             },
             "custom_menu": {
                 "...省略...": "",
             },
             "menu_info": {
                 "...省略...": "",
             }
         },
         "message": "SUCCESS",
         "result": "000-00000",
         "ts": "2023-10-11T05:41:27.678Z"
     }

.. tip:: | レコードの一括操作のパラメータに関するメニューの項目情報と設定値について
    | メニューの情報取得APIの、項目情報(column_info)のキーと設定値について

    .. list-table:: メニューの項目情報のキーと設定値
       :header-rows: 1
       :align: left

       * - **キー**
         - **説明**
         - **設定値**
       * - column_name
         - 画面で表示される項目名
         - 文字列
       * - column_name_rest
         - APIのパラメータで指定する項目名
         - 文字列
       * - auto_input
         - | 自動入力フラグ
           | システムで自動入力される項目
         - | "0":非対象
           | "1":対象
       * - input_item
         - | 入力対象フラグ
           | 登録、編集のAPI実行時の入力対象項目
         - | "0": 非対象
           | "1": 対象
           | "2": 非表示
       * - view_item
         - | 出力対象フラグ
           | filterのAPI実行時の出力対象項目
         - | "0": 非対象
           | "1": 対象
       * - required_item
         - | 必須入力フラグ
           | 登録、編集のAPI実行時の必須対象項目
         - | "0": 非対象
           | "1": 対象
       * - unique_item
         - | 一意制約フラグ
           | 登録、編集のAPI実行時の一意制約対象項目
         - | "0": 非対象
           | "1": 対象

    | ※バリデーションについては、各メニューのマニュアルを参照してください。

.. _parameter_information_column_info:

パラメータの項目情報
^^^^^^^^^^^^^^^^^^^^
| :ref:`api_execution_example_maintenance` で使用するパラメータの情報、を取得できます。
| より詳細な設定を確認したい場合は、:ref:`parameter_information_menu_info` も併せて参照してください。

- | /api/{organization_id}/workspaces/{workspace_id}/ita/menu/{menu}/info/column/

  .. code-block:: bash
     :caption: パラメータの項目取得API

     BASEURL="https://servername"
     ORGANAIZATION_ID="オーガナイゼーションID"
     WORKSPACE_ID="ワークスペースID"
     MENU="対象メニュー"
     USERNAME="ユーザー名"
     PASSWORD="パスワード"
     BASE64_BASIC=$(echo -n "ユーザー名を設定してください:パスワードを設定してください" | base64)

     curl -X GET \
       "${BASEURL}/api/${ORGANAIZATION_ID}/workspaces/${WORKSPACE_ID}/ita/menu/${MENU}/column/" \
       -H "Authorization: Basic ${BASE64_BASIC}" \


  - | 例: 「:menuselection:`Playbook素材集`」のレスポンス

  .. code-block:: bash
     :caption: メニューのカラム情報について：Playbook素材集

     {
         "data": {
             "discard": "廃止フラグ",
             "item_no": "項番",
             "last_update_date_time": "最終更新日時",
             "last_updated_user": "最終更新者",
             "playbook_file": "Playbook素材",
             "playbook_name": "Playbook素材名",
             "remarks": "備考"
         },
         "message": "SUCCESS",
         "result": "000-00000",
         "ts": "2023-10-11T06:48:10.697Z"
     }


.. _parameter_information_pulldown_info:

プルダウン項目で使用可能なリスト
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| :ref:`api_execution_example_maintenance` で使用可能なプルダウン項目の一覧を取得できます。

- | /api/{organization_id}/workspaces/{workspace_id}/ita/menu/{menu}/info/pulldown/

  .. code-block:: bash
     :caption: プルダウン項目情報取得API

     BASEURL="https://servername"
     ORGANAIZATION_ID="オーガナイゼーションID"
     WORKSPACE_ID="ワークスペースID"
     MENU="対象メニュー"
     USERNAME="ユーザー名"
     PASSWORD="パスワード"
     BASE64_BASIC=$(echo -n "ユーザー名を設定してください:パスワードを設定してください" | base64)

     curl -X GET \
       "${BASEURL}/api/${ORGANAIZATION_ID}/workspaces/${WORKSPACE_ID}/ita/menu/${MENU}/info/pulldown/" \
       -H "Authorization: Basic ${BASE64_BASIC}" \

  - | 例: 「:menuselection:`機器一覧`」のレスポンス

  .. code-block:: json
     :caption: プルダウン項目の一覧について：機器一覧

     {
         "data": {
             "authentication_method": {
                 "1": "鍵認証(パスフレーズなし)",
                 "2": "パスワード認証",
                 "4": "鍵認証(パスフレーズあり)",
                 "5": "パスワード認証(winrm)"
             },
             "connection_type": {
                 "1": "machine",
                 "4": "network"
             },
             "hw_device_type": {
                 "1": "SV",
                 "2": "ST",
                 "3": "NW"
             },
             "instance_group_name": {
             },
             "lang": {
                 "1": "utf-8",
                 "2": "shift_jis",
                 "3": "euc"
             },
             "os_type": {
             },
             "protocol": {
                 "1": "telnet",
                 "2": "ssh"
             }
         },
         "message": "SUCCESS",
         "result": "000-00000",
         "ts": "2023-10-13T09:07:04.036Z"
     }

.. _api_apply:

パラメータ適用（API）
=============================

| 本APIは、オペレーションの生成からパラメータの適用までを行いConductor作業実行を行うAPIです。
| 尚、Conductor作業実行の完了確認は行いません。完了確認は、 :menuselection:`Conductor  -->  Conductor作業履歴` より行って下さい。

.. _api_apply_request_format_description:

request形式
-----------------------

| 本APIのrequest形式についての説明を記載します。

.. list-table:: request形式について説明
   :header-rows: 1
   :align: left

   * - 項目
     - 説明
   * - APIカテゴリ
     - Apply
   * - API名
     - パラメータ適用
   * - URL
     - /api/{organizaiton_id}/workspaces/{workspace_id}/ita/apply/
   * - method
     - POST
   * - headers
     - | content-type: application/json
       | Authorization: Basic認証またはBearer認証
       | Bearer認証を使用したAPIの実行を行う場合、「:ref:`operator_certification_bearer`」を参照してください。
   * - Request body
     - | Request bodyを参照して下さい。

.. _api_apply_request_body_description:

Request body
-----------------------

| Request bodyについての説明を記載します。

.. table:: Request bodyについての説明
   :widths: 10 10 20 30 15 15 100
   :align: left

   +----------------------------------------+------------------------+------+------------------+-------------------------------------------------------------------------------------------------------------------------------+
   | キー                                   | 項目                   | 必須 | 型               | 説明                                                                                                                          |
   +========================================+========================+======+==================+===============================================================================================================================+
   | conductor_class_name                   | Conductor名            | ○    | 文字列           | | 作業実行を要求するConductor名を指定します。                                                                                 |
   |                                        |                        |      |                  | | Conductor名は、:menuselection:`Conductor  -->  Conductor一覧` に登録されている :menuselection:`Conductor名称` を指定します。|
   |                                        |                        |      |                  | | :menuselection:`Conductor  -->  Conductor一覧` に登録されていないConductor名を指定した場合はエラーになります。              |
   +----------------------------------------+------------------------+------+------------------+-------------------------------------------------------------------------------------------------------------------------------+
   | operation_name                         | オペレーション名       |      | 文字列           | | 作業実行を行うオペレーション名を指定します。                                                                                |
   |                                        |                        |      |                  |                                                                                                                               |
   |                                        |                        |      |                  | + | 既存オペレーション                                                                                                        |
   |                                        |                        |      |                  |   | :menuselection:`基本コンソール  -->  オペレーション一覧` に登録されている :menuselection:`オペレーション名` を指定します。|
   |                                        |                        |      |                  |                                                                                                                               |
   |                                        |                        |      |                  | + | 新規オペレーション                                                                                                        |
   |                                        |                        |      |                  |   | :menuselection:`基本コンソール  -->  オペレーション一覧` に登録されていない :menuselection:`オペレーション名` \           |
   |                                        |                        |      |                  |     を指定します。                                                                                                            |
   |                                        |                        |      |                  |   | 指定されたoperation_nameが :menuselection:`基本コンソール  -->  オペレーション一覧` に登録されます。                      |
   |                                        |                        |      |                  |                                                                                                                               |
   |                                        |                        |      |                  | + | オペレーション自動採番                                                                                                    |
   |                                        |                        |      |                  |   | operation_nameの指定がない場合や省略した場合は、以下の採番ルールで :menuselection:`オペレーション名` を採番し\            |
   |                                        |                        |      |                  |     :menuselection:`基本コンソール  -->  オペレーション一覧` に登録されます。                                                 |
   |                                        |                        |      |                  |   |  　採番ルール：「yyyymmddhhmissffffffN」                                                                                  |
   |                                        |                        |      |                  |   |  　y:年 m:月 d:日 h:時 mi:分 s:秒 f:マイクロ秒 N:0-9の通番                                                                |
   |                                        |                        |      |                  |                                                                                                                               |
   +----------------------------------------+------------------------+------+------------------+-------------------------------------------------------------------------------------------------------------------------------+
   | schedule_date                          | 予約日時               |      | 文字列           | | Conductor作業実行の予約日時を yyyy/mm/dd hh:mi:ss で指定します。                                                            |
   |                                        |                        |      |                  | | 指定しない場合や省略した場合は、即時実行となります。                                                                        |
   +----------------------------------------+------------------------+------+------------------+-------------------------------------------------------------------------------------------------------------------------------+
   | parameter_info                         | パラメータ情報         |      | 配列             | | 登録/更新/廃止/復活の操作を行うパラメータ情報を指定します。                                                                 |
   |                                        |                        |      |                  | | 複数メニューが対象で順序性を考慮する必要がある場合は、配列の順番で調整して下さい。                                          |
   |                                        |                        |      |                  | | Conductor作業実行のみを行う場合は省略して下さい。                                                                           |
   +----------------+-----------------------+------------------------+------+------------------+-------------------------------------------------------------------------------------------------------------------------------+
   | ※1             | (menu_name_rest)      | メニュー名(REST)       |      | 配列             | | :menuselection:`管理コンソール  -->  メニュー管理` の :menuselection:`メニュー名(Rest)` を指定します。                      |
   |                |                       |                        |      |                  | | 複数レコードが対象で順序性を考慮する必要がある場合は、配列の順番で調整して下さい。                                          |
   |                +--------+--------------+------------------------+------+------------------+-------------------------------------------------------------------------------------------------------------------------------+
   |                |        | type         | レコード操作種別       |      | 文字列           | | 以下のいずれかを指定します。                                                                                                |
   |                |        |              |                        |      |                  | | 登録の場合： Register                                                                                                       |
   |                |        |              |                        |      |                  | | 更新の場合： Update                                                                                                         |
   |                |        |              |                        |      |                  | | 廃止の場合： Discard                                                                                                        |
   |                |        |              |                        |      |                  | | 復活の場合： Restore                                                                                                        |
   |                |        +--------------+------------------------+------+------------------+-------------------------------------------------------------------------------------------------------------------------------+
   |                |        | file         | アップロードファイル   |      | 辞書             | | アップロードファイルカラムがある場合、カラムキーと値の組み合わせを指定します。                                              |
   |                |        |              |                        |      |                  | | 値には、ファイルデータをbase64でエンコードした文字列を指定します。                                                          |
   |                |        +--------------+------------------------+------+------------------+-------------------------------------------------------------------------------------------------------------------------------+
   |                |        | parameter    | パラメータ             |      | 辞書             | | 対象メニューのカラムキーと値の組み合わせを指定します。                                                                      |
   |                |        |              |                        |      |                  | | operation_nameで「新規オペレーション」や「オペレーション自動採番」を指定した場合、オペレーション名に相当する\               |
   |                |        |              |                        |      |                  |   カラムキーと値の組み合わせの指定は必要ありません。                                                                          |
   |                |        |              |                        |      |                  | | また、conductor_class_nameで、Conductor call function（以降、サブConductorと称す。）が含まれるConductor名を指定した場合\    |
   |                |        |              |                        |      |                  |   で、サブConductorの個別オペレーションを明示的に指定する必要がある場合、該当のオペレーション名を指定します。                 |
   +----------------+--------+--------------+------------------------+------+------------------+-------------------------------------------------------------------------------------------------------------------------------+

.. tip:: | ※1  (menu_name_rest) からparameterまでのRequest bodyは、以下のレコード操作を行うAPIと同じ仕様です。
   | ・「Menu MaintenanceAll」


.. _api_apply_request_body_example:

Request bodyの具体例
-----------------------

| Request bodyの具体例を記載します。

既存オペレーションで登録済みパラメータを使用したConductorの作業実行
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  .. code-block:: json

     {
       "conductor_class_name"  : "sample_conductor",
       "operation_name"        : "sample_operation"
     }


既存オペレーションで登録済みパラメータを使用したConductorの予約実行
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  .. code-block:: json

     {
       "conductor_class_name"  : "sample_conductor",
       "operation_name"        : "sample_operation",
       "schedule_date"         : "2024/12/31 23:59"
     }


既存オペレーションでパラメータ適用をしたConductorの作業実行
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  .. figure:: /images/ja/api/Apply_API_request_body_exp3.png
     :align: left

  .. code-block:: json

     {
         "conductor_class_name": "sample_conductor",
         "operation_name" : "sample_operation",
         "schedule_date" : "",
         "parameter_info" : [
             {
                 "sample_menu_001" : [
                     {
                         "type" : "Register",
                         "parameter" : {
                             "host_name"             : "sample_host1",
                             "operation_name_select" : "2024/01/01 00:00_sample_operation",
                             "column_1"              : "value",
                             "column_2"              : "value.txt"
                         },
                         "file" : {
                             "column_2"              : "c2FtcGxlIGZpbGU="
                         }
                      }
                  ]
              }
         ]
     }

  .. tip::
      | オペレーション「operation_name_select」の指定について
      | 既存オベーションの場合、オペレーション「operation_name_select」に設定する値は、該当オペレーションの「実施予定日」(YYYY/MM/DD hh:mm)_「オペレーション名」で指定します。


新規オペレーションでパラメータ適用をしたConductorの作業実行
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  .. figure:: /images/ja/api/Apply_API_request_body_exp4.png
     :align: left

  .. code-block:: json

     {
         "conductor_class_name": "sample_conductor",
         "operation_name" : "new_operation",
         "schedule_date" : "",
         "parameter_info" : [
             {
                 "sample_menu_001" : [
                     {
                         "type" : "Register",
                         "parameter" : {
                             "host_name"             : "sample_host1",
                             "column_1"              : "value",
                             "column_2"              : "value.txt"
                         },
                         "file" : {
                             "column_2"              : "c2FtcGxlIGZpbGU="
                         }
                     }
                 ]
             }
         ]
     }

  .. tip::
      | オペレーション「operation_name_select」の指定について
      | 新規オペレーションの場合、オペレーション「operation_name_select」の指定は不要です。


オペレーション自動採番でパラメータ適用をしたConductorの予約実行
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  .. figure:: /images/ja/api/Apply_API_request_body_exp5.png
     :align: left

  .. code-block:: json

     {
         "conductor_class_name": "sample_conductor",
         "schedule_date" : "",
         "parameter_info" : [
             {
                 "sample_menu_001" : [
                     {
                         "type" : "Register",
                         "parameter" : {
                             "host_name"             : "sample_host1",
                             "column_1"              : "value",
                             "column_2"              : "value.txt"
                         },
                         "file" : {
                             "column_2"              : "c2FtcGxlIGZpbGU="
                         }
                     }
                 ]
             }
         ]
     }

  .. tip::
      | オペレーション「operation_name_select」の指定について
      | オペレーション自動採番の場合、オペレーション「operation_name_select」の指定は不要です。


複数メニューに対して複数レコードのパラメータ適用をしたConductor作業実行
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  .. figure:: /images/ja/api/Apply_API_request_body_exp6.png
     :align: left

  .. code-block:: json

     {
         "conductor_class_name": "sample_conductor",
         "operation_name" : "",
         "schedule_date" : "",
         "parameter_info" : [
             {
                 "sample_menu_001" : [
                     {
                         "type" : "Register",
                         "parameter" : {
                             "host_name"             : "sample_host1",
                             "column_1"              : "value11",
                             "column_2"              : "value.txt"
                         },
                         "file" : {
                             "column_2"              : "c2FtcGxlIGZpbGU="
                         }
                     },{
                         "type" : "Register",
                         "parameter" : {
                             "host_name"             : "sample_host2",
                             "column_1"              : "value11",
                             "column_2"              : "value.txt"
                         },
                         "file" : {
                             "column_2"              : "c2FtcGxlIGZpbGU="
                         }
                     }
                 ]
             },{
                 "sample_menu_002" : [
                     {
                         "type" : "Register",
                         "parameter" : {
                             "host_name"             : "sample_host1",
                             "column_1"              : "value",
                             "column_2"              : "value.txt"
                         },
                         "file" : {
                             "column_2"              : "c2FtcGxlIGZpbGU="
                         }
                     },{
                         "type" : "Register",
                         "parameter" : {
                             "host_name"             : "sample_host2",
                             "column_1"              : "value",
                             "column_2"              : "value.txt"
                         },
                         "file" : {
                             "column_2"              : "c2FtcGxlIGZpbGU="
                         }
                     }
                 ]
             }
         ]
     }

サブConductorの個別オペレーションを明示的に指定してパラメータ適用でConductor作業実行
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  .. figure:: /images/ja/api/Apply_API_request_body_exp7.png
     :align: left

  .. code-block:: json

     {
         "conductor_class_name": "sample_main_conductor",
         "operation_name" : "",
         "schedule_date" : "",
         "parameter_info" : [
             {
                 "sample_menu_001" : [
                     {
                         "type" : "Register",
                         "parameter" : {
                             "host_name"             : "sample_host1",
                             "column_1"              : "value11",
                             "column_2"              : "value.txt"
                         },
                         "file" : {
                             "column_2"              : "c2FtcGxlIGZpbGU="
                         }
                     },{
                         "type" : "Register",
                         "parameter" : {
                             "host_name"             : "sample_host2",
                             "column_1"              : "value11",
                             "column_2"              : "value.txt"
                         },
                         "file" : {
                             "column_2"              : "c2FtcGxlIGZpbGU="
                         }
                     }
                 ]
             },{
                 "sample_menu_002" : [
                     {
                         "type" : "Register",
                         "parameter" : {
                             "host_name"             : "sample_host1",
                             "operation_name_select" : "2024/01/01 00:00_sample_operation",
                             "column_1"              : "value",
                             "column_2"              : "value.txt"
                         },
                         "file" : {
                             "column_2"              : "c2FtcGxlIGZpbGU="
                         }
                     },{
                         "type" : "Register",
                         "parameter" : {
                             "host_name"             : "sample_host2",
                             "operation_name_select" : "2024/01/01 00:00_sample_operation",
                             "column_1"              : "value",
                             "column_2"              : "value.txt"
                         },
                         "file" : {
                             "column_2"              : "c2FtcGxlIGZpbGU="
                         }
                     }
                 ]
             }
         ]
     }

.. _api_apply_response_format_description:

response body
-----------------------

| 本APIのresponse bodyについての説明を記載します。

  .. code-block:: json
     :caption: 正常時

     {
         "data" : {
         "conductor_instance_id" : "conductord作業実行時に採番されたID"
         }	,
         "message" : "SUCCESS",
         "result"  : "000-00000",
         "ts"      : "処理日時"
     }

  .. code-block:: json
     :caption: 異常時

     {
         "message" : "エラーメッセージ",
         "result"  : "エラーコード",
         "ts"      : "処理日時"
     }

  .. code-block:: none
     :caption: エラーメッセージの例

     Request bodyで指定しているメニュー名(REST):sample_menu_001 の 1レコード目(0オリジン) の キー:column_1 に指定した値の文字数の不備でエラーが発生した場合の例
     {
         "message": {
             "1": {                                                                                    メニュー名(REST)のレコード番号が0オリジンで表示されます。
                "column_1": [ "文字長エラー (閾値 : 値<=8byte, 値 : 30byte), menu : sample_menu_001"]  キー：エラーとなった項目のREST名、値：エラー内容、menu : エラーとなったメニュー名（REST)
                  }
         },
         "result": "499-00201",
         "ts": "実施日時"
     }

.. _api_apply_important_notice:

留意事項
-----------------------

| 本APIは、ITAで更新可能なメニューに対してパラメータ適用を行う事が出来ます。
| しかし、トランザクション処理の影響により、以下の留意事項があります。

ホストグループへのパラメータ適用
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   | 「:menuselection:`ホストグループ管理`」にパラメータ適用をした場合、指定されたホストグループに属するホスト解析が処理されない状態でconductor作業実行が行われます。
   | 「:menuselection:`ホストグループ管理`」へのパラメータ適用は、以下のレコード操作を行うAPIで事前に登録を行ってください。
   |   ・「Menu MaintenanceAll」
   |   ・「Menu Maintenance」

変数抜出対象のメニューへのパラメータ適用
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   | 変数抜出対象のメニューにパラメータ適用は、指定されたパラメータ内で使用している変数の刈取りが処理されない状態でconductor作業実行が行われます。
   | 変数抜出対象のメニューへのパラメータ適用は、以下のレコード操作を行うAPIで事前に登録を行ってください。
   |   ・「Menu MaintenanceAll」
   |   ・「Menu Maintenance」
   | 変数抜出対象のメニューについては、「:doc:`../terraform_driver/terraform_common` -> :ref:`terraform_common_variable_handling`」\
    「:doc:`../ansible-driver/ansible_common` -> :ref:`ansible_common_var_listup`」を参照してください。

エラー時のロールバック
^^^^^^^^^^^^^^^^^^^^^^^
   | 本APIは、トランザクション処理でデータベースの更新を行っています。
   | Request bodyの指定不備などで、データベースの更新に失敗した場合は、トランザクション処理内で更新した情報はロールバックされます。

