========================================
Ansible Automation Controller
========================================

はじめに
========

| 本章では、Exastro Suite における Ansible Automation Controller について説明します。


Ansible Automation Controllerとは
=================================

| Ansible Automation Controllerとは、PF構築自動化ツールであるAnsibleにアクセスコントロール、ジョブスケジューリング、タスクの可視化などの機能を拡張した管理プラットフォームです。

Ansible Automation Controllerの登録
=======================================

| Ansible Automation Controllerの登録をすることで、“プロジェクト”、”インベントリ”、”認証情報”の組合せで”ジョブテンプレート”を作成しAnsibleを実行できます。
| 複数の“ジョブテンプレート”を組み合せて”ワークフロージョブテンプレート”を作成することによって、より多彩な作業フローを表現することができます。

前提条件
--------

| 本作業には下記のコマンドが必要となるため、事前にインストールをしてください。

- 作業クライアントに必要なアプリケーション

  - :kbd:`curl`
  - :kbd:`git`
  - :kbd:`jq`
 
Ansible Automation Controllerの一括登録
------------------------------------------

| Ansible Automation Controllerの一括登録には、下記の3通りの方法があります。
- :ref:`方法1: 設定ファイルを使った作成方法 <aac_create_method_1>`
- :ref:`方法2: Rest API による作成方法 <aac_create_method_2>`

.. _aac_create_method_1:

方法1: 設定ファイルを使った作成方法
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| GitHub リポジトリから取得した資材の中にある、シェルスクリプトを実行し Ansible Automation Controller を登録します。

#. Ansible Automation Controller登録用シェルスクリプトを、リポジトリから :kbd:`git clone` により取得します。

   .. code-block:: bash

      # Exastro Platform の資材を入手
      git clone https://github.com/exastro-suite/exastro-platform.git

#. 設定ファイルの :kbd:`CONF_BASE_URL` に Exastro Suite の管理用エンドポイント URL を設定します。

   .. code-block:: bash

      # Exastro Platform への接続のための設定情報を登録
      vi ./exastro-platform/test/tools/initial-settings-ansible.conf

   | 例えば、:ref:`サービス公開の設定 (Ingress の設定)<ingress_setting>` をした場合は下記のようになります。

   - initial-settings-ansible.conf

     .. code-block:: diff
  
       - CONF_BASE_URL=http://platform-auth:8001
       + CONF_BASE_URL=http://exastro-suite-mng.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io
         CURL_OPT=-sv
   
   .. tip::
      | 自己証明書を利用している場合、証明書エラーが発生します。
      | 設定ファイル内の :kbd:`CURL_OPT=-sv` を :kbd:`CURL_OPT=-svk` に変更することで証明書エラーを回避できますが、認証機関から発行された正しい証明書をインストールすることを推奨します。
      
#. Ansible Automation Controller情報の設定

   | Ansible Automation Controllerの登録情報として下記の項目を設定できます。

   .. list-table:: 
      :widths: 25 30 20
      :header-rows: 1
      :align: left
   
      * - 項目
        - 項目の内容
        - 形式
      * - input_limit_setting
        - | Ansible共通の「インターフェース情報(一部※)」と「Ansible AUtomation Controllerホスト一覧」の入力制限
          | true に設定することで、Ansible共通の「インターフェース情報(一部※)」と「Ansible AUtomation Controllerホスト一覧」をITAの画面上から編集できないようにする。
          |
          | ※「インターフェース情報」の入力制限がかかる項目について
          |   「実行エンジン」、「Ansible AUtomation Controller インターフェース」、「Proxy」
        -
      * - exection_engine_list
        - | Ansible共通の「インターフェース情報」の「実行エンジン」で選択可能な項目
          | Ansible-Core または Ansible Automation Controllerの指定可能
        - Ansible-Core と Ansible AUtomation Controllerの２つ指定することで、双方選択可能になる

   .. list-table:: Ansible共通「Ansible Automation Controllerホスト一覧」の初期設定データ
      :widths: 25 30 20
      :header-rows: 1
      :align: left

      * - 項目
        - 項目の内容
        - 形式
      * - ssh_private_key_file
        - ssh秘密鍵ファイルをbase64エンコードした値を入力
        - 
      * - host
        - 実行エンジンのホスト名
        - 
      * - authentication_method
        - | 認証方式の選択
          | Ansible・Ansible Automation Controller から機器へ接続する際の認証方式を選択します。 
          | ●パスワード認証
          | ログインパスワードの管理で●の選択と、ログインパスワードの入力が必須です。
          | ●鍵認証（パスフレーズなし）
          | ssh 秘密鍵ファイル(id_ras)のアップロードが必須です。
          | ●鍵認証（パスフレーズあり）
          | ssh 秘密鍵ファイル(id_ras)のアップロードと、パスフレーズの入力が必須です。
          | ●鍵認証（鍵交換済み）※
          | ssh 秘密鍵ファイル(id_ras)のアップロードは必要ありません。
        - 
      * - user
        - sshで Ansible Automation Controller に接続する場合のユーザ名
        - プロジェクトパス(/var/lib/aws/projects)への書き込み制限が必要
      * - password
        - | パスワード入力
          | パスワード認証する場合のパスワード
        - 最大長128バイト
      * - passphrase
        - ssh秘密鍵ファイルにパスフレーズが設定されている場合、パスフレーズを入力します。
        - 最大長256バイト
      * - isolated_tower
        - 対象ノードが Ansible Automation Controller のexecution nodeの場合に「True」を入力します。
        - 
      * - remarks
        - 備考
        - 
  
   .. tip::
      | ※ 認証方式が鍵認証（鍵交換済み）に設定する為に必要な公開鍵ファイルの配布
      | ・Ansible Core の場合
      | ansible がインストールされているサーバーの実行ユーザー「Ansible 共通コンソール=>インターフェース情報に設定されている実行ユーザー」から作業対象ホストに ssh 接続します。
      | 実行ユーザーの公開鍵ファイルをログイン先ユーザーの authorized_keys にコピーして下さい。
      |
      | ・Ansible Automation Controller の場合
      | Ansible Automation Controller の awx ユーザーから作業対象ホストに ssh 接続しています。
      | awx ユーザーの公開鍵ファイルをログイン先ユーザーの authorized_keys にコピーして下さい。ブラウザより Ansible Automation Controller にログインし、「設定」→「ジョブ」→「分離されたジョブに公開するパス」に「/var/lib/awx/.ssh/」を設定します。
    
   .. list-table:: Ansible共通「インターフェース情報」用の初期設定データ
      :widths: 25 30 20
      :header-rows: 1
      :align: left
      
      * - 項目
        - 項目の内容
        - 形式
      * - execution_engine
        - | 実行エンジンの指定
          | Ansible-Core または Ansible Automation Controller の指定可能
        - 
      * - representative_server
        - | 代表ホスト
          | 「Ansible Automation Controller ホスト一覧」に登録されいるホストの一覧より、ITA と通信する Ansible Automation Controller のホストを選択します。
        - 実行エンジンがAnsible Core 以外の場合に入力必須
      * - ansible_automation_controller_protocol
        - | プロトコル入力
          | Ansible Automation Controller サーバとのプロトコルをhttp / https のどちらかを入力します。 通常は https です。
        - 実行エンジンがAnsible Core 以外の場合に入力必須
      * - ansible_automation_controller_port
        - | ポート入力
          | Ansible Automation Controller サーバの接続ポート(80/443)を入力します。通常は HTTPS(443)です。 
        - 実行エンジンがAnsible Core 以外の場合に入力必須
      * - organization_name
        - | 組織名
          | Ansible Automation Controller サーバに登録されている組織名を選択します。 
        - 実行エンジンがAnsible Core 以外の場合に入力必須
      * - authentication_token
        - | 認証トークン入力
          | ITA から Ansible Automation Controller サーバに接続するユーザーの認証トークンを入力します。 
        - 実行エンジンがAnsible Core 以外の場合に入力必須
      * - delete_runtime_data
        - | 実行時データ削除
          | 作業実行時にITAとAnsible Automation Controller 内に一時的に生成されるデータリソースを作業終了後に削除するかを選択します。
        - 実行エンジンがAnsible Core 以外の場合に入力必須
      * - proxy_address
        - | プロキシサーバのアドレスを入力
          | ITAがプロキシ環境下にある場合、Ansible/ Ansible Automation Controllerサーバまでの疎通のために設定が必要な場合があります。
          | プロキシサーバのURLが http://procy.gate.co.jp:8080 の場合、Addressには http://procy.gate.co.jp を入力します。
          | Portには 8080を入力します。
        - 最大128バイト
      * - proxy_port
        - | プロキシサーバのポートを入力
          | ITAがプロキシ環境下にある場合、Ansible/ Ansible Automation Controllerサーバまでの疎通のために設定が必要な場合があります。 
        - 


   | 設定ファイルの作成は、:file:`./exastro-platform/test/tools/initial-settings-ansible.sample.json` を基に、作成する Ansible Automation Controller の情報を指定した JSON ファイルを基に作成します。

   .. raw:: html

      <details> 
        <summary>initial-settings-ansible.sample.json</summary>

   .. code-block:: json

      {
          "input_limit_setting": true,
          "execution_engine_list": [
              "string"
          ],
          "initial_data": {
              "ansible_automation_controller_host_list": [
                  {
                      "file": {
                          "ssh_private_key_file": "string"
                      },
                      "parameter": {
                          "host": "string",
                          "authentication_method": "string",
                          "user": "string",
                          "password": "string",
                          "ssh_private_key_file": "string",
                          "passphrase": "string",
                          "isolated_tower": "string",
                          "remarks": "string"
                      }
                  }
              ],
              "interface_info_ansible": {
                  "parameter": {
                      "execution_engine": "string",
                      "representative_server": "string",
                      "ansible_automation_controller_protocol": "string",
                      "ansible_automation_controller_port": "string",
                      "organization_name": "string",
                      "authentication_token": "string",
                      "delete_runtime_data": "string",
                      "proxy_address": "string",
                      "proxy_port": "string"
                  }
              }
          }
      }


   .. raw:: html

      </details>

   .. code-block:: bash

      cd exastro-platform/test/tools/

      cp -pi ./exastro-platform/test/tools/initial-settings-ansible{.sample,}.json

      vi ./exastro-platform/test/tools/initial-settings-ansible.json

.. 
  下記検証確認できていないため、オーガナイゼーションのままです
   
#. Ansible Automation Controller作成実行

   Platform管理者アカウントを登録していない場合は、\ `Platform管理者アカウントの追加 <http://10.197.17.190:30400/631aac9174a18b0047bb938c>`__

   -  コマンド

      .. code:: bash

         ./exastro-platform/test/tools/initial-settings-ansible.sh initial-settings-ansible.json

         your username : INPUT-YOUR-USERNAME # Platform管理者のユーザ名を入力します
         your password : INPUT-USER-PASSWORD # Platform管理者のパスワードを入力します

         Create an organization, are you sure? (Y/other) : Y # Y を入力するとAnsible Automation Controllerの登録処理が開始します

   -  成功時の結果表示
      resultが”000-00000”が、 Ansible Automation Controller の作成に成功したことを示しています。
      
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


.. _aac_create_method_2:

方法2: Rest API による作成方法
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Rest API を使って Ansible Automation Controller を登録します。

.. list-table:: 
   :widths: 25 30 20
   :header-rows: 1
   :align: left

   * - 項目
     - 項目の内容
     - 形式
   * - input_limit_setting
     - | Ansible共通の「インターフェース情報(一部※)」と「Ansible AUtomation Controllerホスト一覧」の入力制限
       | true に設定することで、Ansible共通の「インターフェース情報(一部※)」と「Ansible AUtomation Controllerホスト一覧」をITAの画面上から編集できないようにする。
       |
       | ※「インターフェース情報」の入力制限がかかる項目について
       |   「実行エンジン」、「Ansible AUtomation Controller インターフェース」、「Proxy」
     -
   * - exection_engine_list
     - | 実行エンジンの指定
       | Ansible-Core または Ansible Automation Controllerの指定可能
     - Ansible-Core と Ansible AUtomation Controllerの２つ指定することで、双方選択可能になる
 
.. list-table:: Ansible共通「Ansible Automation Controllerホスト一覧」の初期設定データ
   :widths: 25 30 20
   :header-rows: 1
   :align: left

   * - 項目
     - 項目の内容
     - 形式
   * - ssh_private_key_file
     - ssh秘密鍵ファイルをbase64エンコードした値を入力
     - 
   * - host
     - 実行エンジンのホスト名
     - 
   * - authentication_method
     - | 認証方式の選択
       | Ansible・Ansible Automation Controller から機器へ接続する際の認証方式を選択します。 
       | ●パスワード認証
       | ログインパスワードの管理で●の選択と、ログインパスワードの入力が必須です。
       | ●鍵認証（パスフレーズなし）
       | ssh 秘密鍵ファイル(id_ras)のアップロードが必須です。
       | ●鍵認証（パスフレーズあり）
       | ssh 秘密鍵ファイル(id_ras)のアップロードと、パスフレーズの入力が必須です。
       | ●鍵認証（鍵交換済み）
       | ssh 秘密鍵ファイル(id_ras)のアップロードは必要ありません。
     - 
   * - user
     - sshで Ansible Automation Controller に接続する場合のユーザ名
     - プロジェクトパス(/var/lib/aws/projects)への書き込み制限が必要
   * - password
     - | パスワード入力
       | パスワード認証する場合のパスワード
     - 最大長128バイト
   * - passphrase
     - ssh秘密鍵ファイルにパスフレーズが設定されている場合、パスフレーズを入力します。
     - 最大長256バイト
   * - isolated_tower
     - 対象ノードが Ansible Automation Controller のexecution nodeの場合に「True」を入力します。
     - 
   * - remarks
     - 備考
     - 

.. list-table:: Ansible共通「インターフェース情報」用の初期設定データ
   :widths: 25 30 20
   :header-rows: 1
   :align: left
   
   * - 項目
     - 項目の内容
     - 形式
   * - execution_engine
     - | 実行エンジンの指定
       | Ansible-Core または Ansible Automation Controller の指定可能
     - 
   * - representative_server
     - | 代表ホスト
       | 「Ansible Automation Controller ホスト一覧」に登録されいるホストの一覧より、ITA と通信する Ansible Automation Controller のホストを選択します。
     - 実行エンジンがAnsible Core 以外の場合に入力必須
   * - ansible_automation_controller_protocol
     - | プロトコル入力
       | Ansible Automation Controller サーバとのプロトコルをhttp / https のどちらかを入力します。 通常は https です。
     - 実行エンジンがAnsible Core 以外の場合に入力必須
   * - ansible_automation_controller_port
     - | ポート入力
       | Ansible Automation Controller サーバの接続ポート(80/443)を入力します。通常は HTTPS(443)です。 
     - 実行エンジンがAnsible Core 以外の場合に入力必須
   * - organization_name
     - | 組織名
       | Ansible Automation Controller サーバに登録されている組織名を選択します。 
     - 実行エンジンがAnsible Core 以外の場合に入力必須
   * - authentication_token
     - | 認証トークン入力
       | ITA から Ansible Automation Controller サーバに接続するユーザーの認証トークンを入力します。 
     - 実行エンジンがAnsible Core 以外の場合に入力必須
   * - delete_runtime_data
     - | 実行時データ削除
       | 作業実行時にITAとAnsible Automation Controller 内に一時的に生成されるデータリソースを作業終了後に削除するかを選択します。
     - 実行エンジンがAnsible Core 以外の場合に入力必須
   * - proxy_address
     - | プロキシサーバのアドレスを入力
       | ITAがプロキシ環境下にある場合、Ansible/ Ansible Automation Controllerサーバまでの疎通のために設定が必要な場合があります。
       | プロキシサーバのURLが http://procy.gate.co.jp:8080 の場合、Addressには http://procy.gate.co.jp を入力します。
       | Portには 8080を入力します。
     - 最大128バイト
   * - proxy_port
     - | プロキシサーバのポートを入力
       | ITAがプロキシ環境下にある場合、Ansible/ Ansible Automation Controllerサーバまでの疎通のために設定が必要な場合があります。 
     - 


| シェルスクリプトを介さずに、APIを直接実行する場合は、以下の様なコマンドを実行してください。
| BASIC 認証を行うために、Exastro Platform 管理者の認証情報を :kbd:`BASE64_BASIC` に設定する必要があります。
| 認証情報に関して、:ref:`インストール時に登録した認証情報 <DATABASE_SETUP>` で登録した内容となります。

| また、Exastro Platform の管理用 URL 情報を :kbd:`BASE_URL` に設定する必要があります。
| 例えば、:ref:`サービス公開の設定 (Ingress の設定) <ingress_setting>` をした場合は下記のようになります。

..
  下記修正お願いします。実際にAPI投げていない。
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
       "input_limit_setting": true,
       "execution_engine_list": [
           "string"
       ],
       "initial_data": {
           "ansible_automation_controller_host_list": [
               {
                   "file": {
                       "ssh_private_key_file": "string"
                   },
                   "parameter": {
                       "host": "string",
                       "authentication_method": "string",
                       "user": "string",
                       "password": "string",
                       "ssh_private_key_file": "string",
                       "passphrase": "string",
                       "isolated_tower": "string",
                       "remarks": "string"
                   }
               }
           ],
           "interface_info_ansible": {
               "parameter": {
                   "execution_engine": "string",
                   "representative_server": "string",
                   "ansible_automation_controller_protocol": "string",
                   "ansible_automation_controller_port": "string",
                   "organization_name": "string",
                   "authentication_token": "string",
                   "delete_runtime_data": "string",
                   "proxy_address": "string",
                   "proxy_port": "string"
               }
           }
       }
   }
   EOF


オーガナイゼーションへのアクセス
--------------------------------
..
  オーガナイゼーションのように確認方法あればこちらに記載お願いします。なければ削除でお願いします。

#. オーガナイゼーション用サイトが表示できるかWebブラウザから確認します。

   | http[s]://{Exastro Platform の管理用 URL}/{オーガナイゼーションID}/platform/
   | 例: http://exastro-suite-mng.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io/org002/platform/


その他制約事項・備考
--------------------

Ansible Automation Controller登録を再実行する場合
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. 下記文章の確認お願いします。

| Ansible Automation Controller登録の再実行する場合は、設定ファイルを再度編集してシェルスクリプトを実行して下さい。



.. code:: bash

   vi ./exastro-platform/test/tools/initial-settings-ansible.json


.. code:: bash

   ./exastro-platform/test/tools/initial-settings-ansible.sh ./exastro-platform/test/tools/initial-settings-ansible.sample.json

