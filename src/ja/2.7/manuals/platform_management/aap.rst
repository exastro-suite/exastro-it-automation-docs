================================
Ansible Automation Platform 連携
================================

目的
====

| 本書では、システム管理者がオーガナイゼーションに所属するユーザーに対して、Ansible Core、Ansible Automation Controller、Ansible Execution Agentの利用を制御するための方法について紹介します。


Ansible Automation Controller の登録
====================================

| Ansible Automation Controller の登録をすることで、“プロジェクト”、”インベントリ”、”認証情報”の組合せで”ジョブテンプレート”を作成しAnsibleを実行できます。
| 複数の“ジョブテンプレート”を組み合せて”ワークフロージョブテンプレート”を作成することによって、より多彩な作業フローを表現することができます。

前提条件
--------

| 本作業には下記のコマンドが必要となるため、事前にインストールをしてください。

- 作業クライアントに必要なアプリケーション

  - :kbd:`curl`
  - :kbd:`git`
  - :kbd:`jq`

登録方法
--------

| Ansible Automation Controller の Exastro IT Automation への登録には、下記の2通りの方法があります。

.. tabs::

   .. group-tab:: 設定ファイルとスクリプト利用

      - 特徴

      | Rest API を使った登録方法に比べ、利用するパラメータ情報の事前準備が不要なためユーザの操作に向いています。

      - 登録方法

      | GitHub リポジトリから取得した資材の中にある、シェルスクリプトを実行し Ansible Automation Controller を登録します。

      #. Ansible Automation Controller 登録用シェルスクリプトを、リポジトリから :kbd:`git clone` により取得します。

         .. code-block:: bash
            :caption: コマンド

            # Exastro Platform の資材を入手
            git clone https://github.com/exastro-suite/exastro-platform.git

      #. 設定ファイルの :kbd:`CONF_BASE_URL` に Exastro システムの管理用エンドポイント URL を設定します。

         .. code-block:: bash
            :caption: コマンド

            # Exastro Platform への接続のための設定情報を登録
            vi ./exastro-platform/tools/api-auth.conf

         | 例えば、:ref:`サービス公開の設定 (Ingress の設定) <ingress_setting>` をした場合は下記のようになります。

         .. code-block:: diff
            :caption: api-auth.conf

            - CONF_BASE_URL=http://platform-auth:8001
            + CONF_BASE_URL=http://exastro-suite-mng.example.local
              CURL_OPT=-sv

         .. tip::
            | 自己証明書を利用している場合、証明書エラーが発生します。
            | 設定ファイル内の :kbd:`CURL_OPT=-sv` を :kbd:`CURL_OPT=-svk` に変更することで証明書エラーを回避できますが、認証機関から発行された正しい証明書をインストールすることを推奨します。

      #. Ansible Automation Controller 情報の設定

         | 設定ファイルの作成は、:file:`./exastro-platform/tools/initial-settings-ansible.sample.json` を基に、作成する Ansible Automation Controller の情報を指定した JSON ファイルを基に作成します。

         .. code-block:: bash
            :caption: コマンド

            cp -pi ./exastro-platform/tools/initial-settings-ansible{.sample,}.json

            vi ./exastro-platform/tools/initial-settings-ansible.json


         .. raw:: html

            <details>
              <summary>initial-settings-ansible.sample.json</summary>

         .. code-block:: json

            {
              "input_limit_setting": true,
              "execution_engine_list": [
                "Ansible Automation Controller", "Ansible Execution Agent"
              ],
              "initial_data": {
                "ansible_automation_controller_host_list": [
                  {
                    "file": {
                      "ssh_private_key_file": "LS0tLS1CRUdJTiBPUEVOU1NIIFBSSVZBVEUgS0VZLS0tLS0KYjNCbGJuTnphQzFyWlhrdGRqRUFBQUFBQkc1dmJtVUFBQUFFYm05dVpRQUFBQUFBQUFBQkFBQUJsd0FBQUFkemMyZ3RjbgpOaEFBQUFBd0VBQVFBQUFZRUF0V0ZvVVA5ZkZSRlhUTTV0U2s4cmU1dTVEVjNqclF3VVd5d2swMkwrZ0tkNElsOFQ4TnBkCk40Z3ZGVkMxM1VueGNxc1pxVWdEWk41NnphSnMrdThQcTBlVjl2R0dkWmZDcU11OHRrbzh5WUw2MGQ2VUVoVXFOVVJkb1UKSEJ3bngzbjZidlNWMVE0em56V0JBNVBqOFl3SENiL0swVGFEMndvMkRkbFhqTXhhTlpXTXlpRFVMbE1pSk02VFdCU0lYMwo2emE5ZnI2cGFmak5Vc0hBTk9YSTdGbUFQcC9Jcy80TmtJVkhZN2M1UkJkUTUvNWgrTCtxRmlVazhKbE9vcFdnMjJOWWlXCkpKUGM0U09iTWxtRUY1OEdMdloxZTlCS0FvaXEvdWIvVmlhZG9hRFlyTzlEM0U3UW1NTldWMjNNMnMyN2tnS0ZKcFJJSUMKbmllZlJyaTdkOVhEYldoclBFY1FlRUMyZnNrRzVyY3Q0RFhrQUtVVCtSTkdwMll6bWZqSHlHNkRPWkJIa1RCNnJ5OVF3SgpRaFpFTjEvM3k2K0Q1V1BpbWlxeVFBNmtXdnZYZUtHWkhzZEhLdG5QaGZra1EyUWlteFgyWFRHaGZwdjRSUkUzZWNGUmxRClQvenRLeWg5enIzWmd4UU1nWHgwdEJ5V2dZSUJwZVZHa1dFTTVkeTNBQUFGa1BlMkRlYjN0ZzNtQUFBQUIzTnphQzF5YzIKRUFBQUdCQUxWaGFGRC9YeFVSVjB6T2JVcFBLM3VidVExZDQ2ME1GRnNzSk5OaS9vQ25lQ0pmRS9EYVhUZUlMeFZRdGQxSgo4WEtyR2FsSUEyVGVlczJpYlBydkQ2dEhsZmJ4aG5XWHdxakx2TFpLUE1tQyt0SGVsQklWS2pWRVhhRkJ3Y0o4ZDUrbTcwCmxkVU9NNTgxZ1FPVDQvR01Cd20veXRFMmc5c0tOZzNaVjR6TVdqV1ZqTW9nMUM1VElpVE9rMWdVaUY5K3Mydlg2K3FXbjQKelZMQndEVGx5T3haZ0Q2ZnlMUCtEWkNGUjJPM09VUVhVT2YrWWZpL3FoWWxKUENaVHFLVm9OdGpXSWxpU1QzT0VqbXpKWgpoQmVmQmk3MmRYdlFTZ0tJcXY3bS8xWW1uYUdnMkt6dlE5eE8wSmpEVmxkdHpOck51NUlDaFNhVVNDQXA0bm4wYTR1M2ZWCncyMW9henhIRUhoQXRuN0pCdWEzTGVBMTVBQ2xFL2tUUnFkbU01bjR4OGh1Z3ptUVI1RXdlcTh2VU1DVUlXUkRkZjk4dXYKZytWajRwb3Fza0FPcEZyNzEzaWhtUjdIUnlyWno0WDVKRU5rSXBzVjlsMHhvWDZiK0VVUk4zbkJVWlVFLzg3U3NvZmM2OQoyWU1VRElGOGRMUWNsb0dDQWFYbFJwRmhET1hjdHdBQUFBTUJBQUVBQUFHQkFMRHVJTzBKL3YwMUdqeXhETWswNjB5N2ZjCnM5TUErb3ZkNmw5QkpEK2RFVUM4c3poZWNuaTFEVlJtQjdoN3dpR2lYcUk3RU9yMGpoQVZmQVBxQ1ZQR3F1L09tVGRyOFUKMSswQ09NWjFLbEREdE5tdVRqQkpkdy9ZN2FDVTNXWlROZm1GeE51QzdKbUsrUWFKWk4yRWZTZVRjWVlNYXViL2JtUWc1RwpXZkhka1kyOW9VVzJ1bU9wOHArRzV4SS9qVHZpQXpHS3dmWG5FaUkxKzc0anQzZndTVzFkUEExKzVFUDRVZmphRUdwUlQzCnpaTlFnTTgrWDdNVWJyRklTdjJzQ0VWSU54cGJDSE9iQkRZcTdodUljeDdKUVEvcW5EMVJGdFhBa3d4M1ZkMFF4elZUTDUKZXF6ci9jc3h6S3l1M08yVE5weWVodE1SWVB6M2dXZ2xieFI1SStObWl1VGlTQWFHa1o2OXJqblY0bVNmL25xUnJwUWRpeAozS1E1bUZldVNUUFdEdXZQNFdWNlJybzBPajRjalZnNTlGNHVWM05xQmpvMFpXYmt1QnhZeDRBK2hsZjcwMmdMLzVMZTBPCllTc1dFS0U5aFhueHZ5b0NBUTBCLy9meDFnaHkxY2xQWi9JR3FpWDYwUEQrY0FmTnFWNmt6aFo5WmZmQmVOZ2x3NThRQUEKQU1FQTBqbVF4VVc2WW9ZRnovUFg5aXgrNEd3VXh4WWFTdlVYRDJHZGt4cGtkYS9EV3lKUlJFd1FjTzhPQTdhWUFhV0hxSwp1T1ZCWVJlY3h0Z01SbzUreUNpZjVoNE9HNzVyVEtSQ0NRLy9Td2hyS25iQjFoOVJ0Q2dWNjlSd0tMSUhxcXo0dGQ0V20wCkw0NmFtditjd0ZrVVdxOFRtdzNkR1NlV3AydURQcjVxSjVGWDlEdmZRWUNKSEVkNThnN2lESXdzMUd3VExKaTJ3L0J1QlEKbzB2MUw4dGo0eG1MTUxpcW1zdDZLRHM3cHBlOGpJYTgycHVTSUJ1ZWJ5Y3pKdXljcmNBQUFBd1FEbU5SV25qcisxWmJSdgpPRjJVT2hGQ2I2UVlpQkFsTzVuWVZQUnQ2amhMWmdvMjlkUVUwUmRnYzNObmtOdzY1ZFpQbnZVMTlaamkzcFBlRnVQczJQCnEyaDg1aFNCK3VRR3JodEovRGM2MU1ZS2k5cjkxQmtvd0ZHSDR3YW9mSUsyYmF1V2VFMGg3UFFmajhrSzZVbndLbnpPSTcKc1o2anJTZStxaHQwMzkxUzhTb2F1bkhnMXNsOTRYS092bG1RQUpQMHNuS2VMcGIyalZIR0ZTR0JRdG1GQUh2aXV6Zm5nUgpGc3hrd2ROSU1ERGxLNmxVMnFhbkppL0NBM0VOQldDLzhBQUFEQkFNbXoyUkVEbllkSjM0N2prWWFDNzNHdGtjWDZDN0NxCjZ6cGRXQkZ6Zjd0NkhJbzJMdUlPenVFa2IxV0VjOFZibTBHbTA1YkZ4YnFEYjF2OWpJRmErTG9qTHVOUmFoSEZHVFRRUDYKTk9DMzA2SDd2TWgwMStNUVJNaERKYW9GRlRRVy9uSVBIQldwcDVJNzFVN0FNa0d6cXJoWVU5dlVNSXBNS2taQUQyYWF3dwpreUp6eFZzTFhUQXhrT3BVU3lWZmJsZVBKZXJpVmIydmVXbm5RUmRnRm02empSeXpSTXlYODFkaldzelNDTVZUeWI2YW9GCjdBYjZPZzlib0lnRmVQU1FBQUFCTnpjR2hwYm5oQU1qWmxNR05pWkRrM05UZGxBUUlEQkFVRwotLS0tLUVORCBPUEVOU1NIIFBSSVZBVEUgS0VZLS0tLS0K"
                    },
                    "parameter": {
                      "host": "aap.example.com",
                      "authentication_method": "鍵認証(パスフレーズなし)",
                      "user": "awx",
                      "password": null,
                      "ssh_private_key_file": "aap_id_rsa",
                      "passphrase": null,
                      "ansible_automation_controller_port": null,
                      "execution_node": "False",
                      "remarks": null
                    }
                  }
                ],
                "interface_info_ansible": {
                  "parameter": {
                    "execution_engine": "Ansible Automation Controller",
                    "representative_server": "aap.example.com",
                    "ansible_automation_controller_protocol": "https",
                    "ansible_automation_controller_port": "443",
                    "organization_name": null,
                    "authentication_token": "LwWw3dwoHGx19ZhP1YQZU0JdZzobFv",
                    "delete_runtime_data": "True",
                    "proxy_address": null,
                    "proxy_port": null
                  }
                }
              }
            }

         .. tip:: | execution_engine_listについての補足
                  | execution_engine_listには、以下の3個の実行エンジンが記載できます。
                  | ・Ansible Core
                  | ・Ansible Automation Controller
                  | ・Ansible Execution Agent
                  | 記載した実行エンジンが利用可能となります。
                  | 上記JSONの例では、Ansible Automation ControllerとAnsible Execution Agentが利用可能になります。

         .. raw:: html

            </details>

         | 各パラメータについては下記を参照してください。

         .. raw:: html

           <details>
             <summary>Ansible Automation Controller 登録時のパラメータ(表示・非表示)</summary>

         .. include:: ../../include/api_option_initial_settings_ansible.rst

         .. tip::
             | ※ 認証方式が鍵認証（鍵交換済み）に設定する為に必要な公開鍵ファイルの配布
             | ・Ansible Core の場合
             | ansible がインストールされているサーバーの実行ユーザー「Ansible 共通コンソール=>インターフェース情報に設定されている実行ユーザー」から作業対象ホストに ssh 接続します。
             | 実行ユーザーの公開鍵ファイルをログイン先ユーザーの authorized_keys にコピーして下さい。
             |
             | ・ Ansible Automation Controller の場合
             | Ansible Automation Controller の awx ユーザーから作業対象ホストに ssh 接続しています。
             | awx ユーザーの公開鍵ファイルをログイン先ユーザーの authorized_keys にコピーして下さい。ブラウザより Ansible Automation Controller にログインし、「設定」→「ジョブ」→「分離されたジョブに公開するパス」に「/var/lib/awx/.ssh/」を設定します。

         .. raw:: html

           </details>


      #. Ansible Automation Controller 作成実行

         .. code-block:: bash
            :caption: コマンド

            ./exastro-platform/tools/initial-settings-ansible.sh ./exastro-platform/tools/initial-settings-ansible.json

            organization id : INPUT-ORGANIZATION-ID-TO-SET # 設定先のオーガナイゼーションID

            your username : INPUT-YOUR-USERNAME # システム管理者のユーザ名を入力します
            your password : INPUT-USER-PASSWORD # システム管理者のパスワードを入力します

            Create an organization, are you sure? (Y/other) : Y # Y を入力すると Ansible Automation Controller の登録処理が開始します


         -  成功時の結果表示

            resultが”000-00000”が、 Ansible Automation Controller の作成に成功したことを示しています。

            .. code-block:: bash
               :caption: 実行結果(成功時)

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

            .. code-block:: bash
               :caption: 実行結果(失敗時)

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
                 "message": "エラーメッセージ,
                 "result": "エラーコード",
                 "ts": "2022-08-18T05:29:35.643Z"
               }

   .. group-tab:: Rest API 利用

      - 特徴

      | Rest API は外部システムから Ansible Automation Controller の登録を行う際に有用です。

      - 登録方法

      1. SSH 鍵ファイルのエンコード

         | SSH 秘密鍵ファイルをアップロードする必要があるため、Base64 エンコードをします。

         .. code-block::
           :caption: コマンド

           MY_KEY=`base64 -w 0 my-aac-key.pem`

      2. コマンド

         | オーガナイゼーションIDを :kbd:`ORG_ID` に設定する必要があります。
         | また、Basic 認証を利用するためには、システム管理者の認証情報を :kbd:`BASE64_BASIC` に設定する必要があります。
         | 認証情報に関して、:ref:`インストール時に登録した認証情報 <create_system_manager>` で登録した内容となります。
         | cURL を使用する場合は、下記のようにコマンドを実行します。


         | 各パラメータについては下記を参照してください。

         .. raw:: html

            <details>
              <summary>Ansible Automation Controller 登録時のパラメータ</summary>

         .. include:: ../../include/api_option_initial_settings_ansible.rst

         .. raw:: html

            </details>

         .. code-block:: bash
            :caption: コマンド

            ORG_ID=org001
            BASE64_BASIC=$(echo -n "KEYCLOAK_USER:KEYCLOAK_PASSWORD" | base64)
            BASE_URL=http://exastro-suite-mng.example.local

            curl -X 'POST' \
              "http://${BASE_URL}/api/ita/${ORG_ID}/initial-settings/ansible/" \
              -H 'accept: application/json' \
              -H "Authorization: Basic ${BASE64_BASIC}" \
              -H 'Content-Type: application/json' \
              -d '{
                    "input_limit_setting": true,
                    "execution_engine_list": [
                      "Ansible Automation Controller", "Ansible Execution Agent"
                    ],
                    "initial_data": {
                      "ansible_automation_controller_host_list": [
                        {
                          "file": {
                            "ssh_private_key_file": "LS0tLS1CRUdJTiBPUEVOU1NIIFBSSVZBVEUgS0VZLS0tLS0KYjNCbGJuTnphQzFyWlhrdGRqRUFBQUFBQkc1dmJtVUFBQUFFYm05dVpRQUFBQUFBQUFBQkFBQUJsd0FBQUFkemMyZ3RjbgpOaEFBQUFBd0VBQVFBQUFZRUF0V0ZvVVA5ZkZSRlhUTTV0U2s4cmU1dTVEVjNqclF3VVd5d2swMkwrZ0tkNElsOFQ4TnBkCk40Z3ZGVkMxM1VueGNxc1pxVWdEWk41NnphSnMrdThQcTBlVjl2R0dkWmZDcU11OHRrbzh5WUw2MGQ2VUVoVXFOVVJkb1UKSEJ3bngzbjZidlNWMVE0em56V0JBNVBqOFl3SENiL0swVGFEMndvMkRkbFhqTXhhTlpXTXlpRFVMbE1pSk02VFdCU0lYMwo2emE5ZnI2cGFmak5Vc0hBTk9YSTdGbUFQcC9Jcy80TmtJVkhZN2M1UkJkUTUvNWgrTCtxRmlVazhKbE9vcFdnMjJOWWlXCkpKUGM0U09iTWxtRUY1OEdMdloxZTlCS0FvaXEvdWIvVmlhZG9hRFlyTzlEM0U3UW1NTldWMjNNMnMyN2tnS0ZKcFJJSUMKbmllZlJyaTdkOVhEYldoclBFY1FlRUMyZnNrRzVyY3Q0RFhrQUtVVCtSTkdwMll6bWZqSHlHNkRPWkJIa1RCNnJ5OVF3SgpRaFpFTjEvM3k2K0Q1V1BpbWlxeVFBNmtXdnZYZUtHWkhzZEhLdG5QaGZra1EyUWlteFgyWFRHaGZwdjRSUkUzZWNGUmxRClQvenRLeWg5enIzWmd4UU1nWHgwdEJ5V2dZSUJwZVZHa1dFTTVkeTNBQUFGa1BlMkRlYjN0ZzNtQUFBQUIzTnphQzF5YzIKRUFBQUdCQUxWaGFGRC9YeFVSVjB6T2JVcFBLM3VidVExZDQ2ME1GRnNzSk5OaS9vQ25lQ0pmRS9EYVhUZUlMeFZRdGQxSgo4WEtyR2FsSUEyVGVlczJpYlBydkQ2dEhsZmJ4aG5XWHdxakx2TFpLUE1tQyt0SGVsQklWS2pWRVhhRkJ3Y0o4ZDUrbTcwCmxkVU9NNTgxZ1FPVDQvR01Cd20veXRFMmc5c0tOZzNaVjR6TVdqV1ZqTW9nMUM1VElpVE9rMWdVaUY5K3Mydlg2K3FXbjQKelZMQndEVGx5T3haZ0Q2ZnlMUCtEWkNGUjJPM09VUVhVT2YrWWZpL3FoWWxKUENaVHFLVm9OdGpXSWxpU1QzT0VqbXpKWgpoQmVmQmk3MmRYdlFTZ0tJcXY3bS8xWW1uYUdnMkt6dlE5eE8wSmpEVmxkdHpOck51NUlDaFNhVVNDQXA0bm4wYTR1M2ZWCncyMW9henhIRUhoQXRuN0pCdWEzTGVBMTVBQ2xFL2tUUnFkbU01bjR4OGh1Z3ptUVI1RXdlcTh2VU1DVUlXUkRkZjk4dXYKZytWajRwb3Fza0FPcEZyNzEzaWhtUjdIUnlyWno0WDVKRU5rSXBzVjlsMHhvWDZiK0VVUk4zbkJVWlVFLzg3U3NvZmM2OQoyWU1VRElGOGRMUWNsb0dDQWFYbFJwRmhET1hjdHdBQUFBTUJBQUVBQUFHQkFMRHVJTzBKL3YwMUdqeXhETWswNjB5N2ZjCnM5TUErb3ZkNmw5QkpEK2RFVUM4c3poZWNuaTFEVlJtQjdoN3dpR2lYcUk3RU9yMGpoQVZmQVBxQ1ZQR3F1L09tVGRyOFUKMSswQ09NWjFLbEREdE5tdVRqQkpkdy9ZN2FDVTNXWlROZm1GeE51QzdKbUsrUWFKWk4yRWZTZVRjWVlNYXViL2JtUWc1RwpXZkhka1kyOW9VVzJ1bU9wOHArRzV4SS9qVHZpQXpHS3dmWG5FaUkxKzc0anQzZndTVzFkUEExKzVFUDRVZmphRUdwUlQzCnpaTlFnTTgrWDdNVWJyRklTdjJzQ0VWSU54cGJDSE9iQkRZcTdodUljeDdKUVEvcW5EMVJGdFhBa3d4M1ZkMFF4elZUTDUKZXF6ci9jc3h6S3l1M08yVE5weWVodE1SWVB6M2dXZ2xieFI1SStObWl1VGlTQWFHa1o2OXJqblY0bVNmL25xUnJwUWRpeAozS1E1bUZldVNUUFdEdXZQNFdWNlJybzBPajRjalZnNTlGNHVWM05xQmpvMFpXYmt1QnhZeDRBK2hsZjcwMmdMLzVMZTBPCllTc1dFS0U5aFhueHZ5b0NBUTBCLy9meDFnaHkxY2xQWi9JR3FpWDYwUEQrY0FmTnFWNmt6aFo5WmZmQmVOZ2x3NThRQUEKQU1FQTBqbVF4VVc2WW9ZRnovUFg5aXgrNEd3VXh4WWFTdlVYRDJHZGt4cGtkYS9EV3lKUlJFd1FjTzhPQTdhWUFhV0hxSwp1T1ZCWVJlY3h0Z01SbzUreUNpZjVoNE9HNzVyVEtSQ0NRLy9Td2hyS25iQjFoOVJ0Q2dWNjlSd0tMSUhxcXo0dGQ0V20wCkw0NmFtditjd0ZrVVdxOFRtdzNkR1NlV3AydURQcjVxSjVGWDlEdmZRWUNKSEVkNThnN2lESXdzMUd3VExKaTJ3L0J1QlEKbzB2MUw4dGo0eG1MTUxpcW1zdDZLRHM3cHBlOGpJYTgycHVTSUJ1ZWJ5Y3pKdXljcmNBQUFBd1FEbU5SV25qcisxWmJSdgpPRjJVT2hGQ2I2UVlpQkFsTzVuWVZQUnQ2amhMWmdvMjlkUVUwUmRnYzNObmtOdzY1ZFpQbnZVMTlaamkzcFBlRnVQczJQCnEyaDg1aFNCK3VRR3JodEovRGM2MU1ZS2k5cjkxQmtvd0ZHSDR3YW9mSUsyYmF1V2VFMGg3UFFmajhrSzZVbndLbnpPSTcKc1o2anJTZStxaHQwMzkxUzhTb2F1bkhnMXNsOTRYS092bG1RQUpQMHNuS2VMcGIyalZIR0ZTR0JRdG1GQUh2aXV6Zm5nUgpGc3hrd2ROSU1ERGxLNmxVMnFhbkppL0NBM0VOQldDLzhBQUFEQkFNbXoyUkVEbllkSjM0N2prWWFDNzNHdGtjWDZDN0NxCjZ6cGRXQkZ6Zjd0NkhJbzJMdUlPenVFa2IxV0VjOFZibTBHbTA1YkZ4YnFEYjF2OWpJRmErTG9qTHVOUmFoSEZHVFRRUDYKTk9DMzA2SDd2TWgwMStNUVJNaERKYW9GRlRRVy9uSVBIQldwcDVJNzFVN0FNa0d6cXJoWVU5dlVNSXBNS2taQUQyYWF3dwpreUp6eFZzTFhUQXhrT3BVU3lWZmJsZVBKZXJpVmIydmVXbm5RUmRnRm02empSeXpSTXlYODFkaldzelNDTVZUeWI2YW9GCjdBYjZPZzlib0lnRmVQU1FBQUFCTnpjR2hwYm5oQU1qWmxNR05pWkRrM05UZGxBUUlEQkFVRwotLS0tLUVORCBPUEVOU1NIIFBSSVZBVEUgS0VZLS0tLS0K"
                          },
                          "parameter": {
                            "host": "aap.example.com",
                            "authentication_method": "鍵認証(パスフレーズなし)",
                            "user": "awx",
                            "password": null,
                            "ssh_private_key_file": "aap_id_rsa",
                            "passphrase": null,
                            "ansible_automation_controller_port": null,
                            "execution_node": "False",
                            "remarks": null
                          }
                        }
                      ],
                      "interface_info_ansible": {
                        "parameter": {
                          "execution_engine": "Ansible Automation Controller",
                          "representative_server": "aap.example.com",
                          "ansible_automation_controller_protocol": "https",
                          "ansible_automation_controller_port": "443",
                          "organization_name": null,
                          "authentication_token": "LwWw3dwoHGx19ZhP1YQZU0JdZzobFv",
                          "delete_runtime_data": "True",
                          "proxy_address": null,
                          "proxy_port": null
                        }
                      }
                    }
                  }'

         .. tip:: | execution_engine_listについての補足
                  | execution_engine_listには、以下の3個の実行エンジンが記載できます。
                  | ・Ansible Core
                  | ・Ansible Automation Controller
                  | ・Ansible Execution Agent
                  | 記載した実行エンジンが利用可能となります。
                  | 上記コマンドの例では、Ansible Automation ControllerとAnsible Execution Agentが利用可能になります。


Ansible Automation Contoller 連携の確認
---------------------------------------

#. オーガナイゼーション作成結果を確認します。

.. tabs::

   .. group-tab:: 設定ファイルとスクリプト利用

      .. code-block:: bash
         :caption: コマンド

         ./exastro-platform/tools/get-initial-settings-ansible.sh

         organization id : INPUT-ORGANIZATION-ID-TO-SET # 設定先のオーガナイゼーションID

         your username : INPUT-YOUR-USERNAME # システム管理者のユーザ名を入力します
         your password : INPUT-USER-PASSWORD # システム管理者のパスワードを入力します

      -  結果表示

         resultが”000-00000”が、 Ansible Automation Controller の作成に成功したことを示しています。

         .. code-block:: json
            :caption: 実行結果(成功例)

            {
              "data": {
                "execution_engine_list": [
                  "Ansible Automation Controller"
                ],
                "initial_data": {
                  "ansible_automation_controller_host_list": [
                    {
                      "file": {
                        "ssh_private_key_file": "LS0tLS1CRUdJTiBPUEVOU1NIIFBSSVZBVEUgS0VZLS0tLS0KYjNCbGJuTnphQzFyWlhrdGRqRUFBQUFBQkc1dmJtVUFBQUFFYm05dVpRQUFBQUFBQUFBQkFBQUJsd0FBQUFkemMyZ3RjbgpOaEFBQUFBd0VBQVFBQUFZRUF0V0ZvVVA5ZkZSRlhUTTV0U2s4cmU1dTVEVjNqclF3VVd5d2swMkwrZ0tkNElsOFQ4TnBkCk40Z3ZGVkMxM1VueGNxc1pxVWdEWk41NnphSnMrdThQcTBlVjl2R0dkWmZDcU11OHRrbzh5WUw2MGQ2VUVoVXFOVVJkb1UKSEJ3bngzbjZidlNWMVE0em56V0JBNVBqOFl3SENiL0swVGFEMndvMkRkbFhqTXhhTlpXTXlpRFVMbE1pSk02VFdCU0lYMwo2emE5ZnI2cGFmak5Vc0hBTk9YSTdGbUFQcC9Jcy80TmtJVkhZN2M1UkJkUTUvNWgrTCtxRmlVazhKbE9vcFdnMjJOWWlXCkpKUGM0U09iTWxtRUY1OEdMdloxZTlCS0FvaXEvdWIvVmlhZG9hRFlyTzlEM0U3UW1NTldWMjNNMnMyN2tnS0ZKcFJJSUMKbmllZlJyaTdkOVhEYldoclBFY1FlRUMyZnNrRzVyY3Q0RFhrQUtVVCtSTkdwMll6bWZqSHlHNkRPWkJIa1RCNnJ5OVF3SgpRaFpFTjEvM3k2K0Q1V1BpbWlxeVFBNmtXdnZYZUtHWkhzZEhLdG5QaGZra1EyUWlteFgyWFRHaGZwdjRSUkUzZWNGUmxRClQvenRLeWg5enIzWmd4UU1nWHgwdEJ5V2dZSUJwZVZHa1dFTTVkeTNBQUFGa1BlMkRlYjN0ZzNtQUFBQUIzTnphQzF5YzIKRUFBQUdCQUxWaGFGRC9YeFVSVjB6T2JVcFBLM3VidVExZDQ2ME1GRnNzSk5OaS9vQ25lQ0pmRS9EYVhUZUlMeFZRdGQxSgo4WEtyR2FsSUEyVGVlczJpYlBydkQ2dEhsZmJ4aG5XWHdxakx2TFpLUE1tQyt0SGVsQklWS2pWRVhhRkJ3Y0o4ZDUrbTcwCmxkVU9NNTgxZ1FPVDQvR01Cd20veXRFMmc5c0tOZzNaVjR6TVdqV1ZqTW9nMUM1VElpVE9rMWdVaUY5K3Mydlg2K3FXbjQKelZMQndEVGx5T3haZ0Q2ZnlMUCtEWkNGUjJPM09VUVhVT2YrWWZpL3FoWWxKUENaVHFLVm9OdGpXSWxpU1QzT0VqbXpKWgpoQmVmQmk3MmRYdlFTZ0tJcXY3bS8xWW1uYUdnMkt6dlE5eE8wSmpEVmxkdHpOck51NUlDaFNhVVNDQXA0bm4wYTR1M2ZWCncyMW9henhIRUhoQXRuN0pCdWEzTGVBMTVBQ2xFL2tUUnFkbU01bjR4OGh1Z3ptUVI1RXdlcTh2VU1DVUlXUkRkZjk4dXYKZytWajRwb3Fza0FPcEZyNzEzaWhtUjdIUnlyWno0WDVKRU5rSXBzVjlsMHhvWDZiK0VVUk4zbkJVWlVFLzg3U3NvZmM2OQoyWU1VRElGOGRMUWNsb0dDQWFYbFJwRmhET1hjdHdBQUFBTUJBQUVBQUFHQkFMRHVJTzBKL3YwMUdqeXhETWswNjB5N2ZjCnM5TUErb3ZkNmw5QkpEK2RFVUM4c3poZWNuaTFEVlJtQjdoN3dpR2lYcUk3RU9yMGpoQVZmQVBxQ1ZQR3F1L09tVGRyOFUKMSswQ09NWjFLbEREdE5tdVRqQkpkdy9ZN2FDVTNXWlROZm1GeE51QzdKbUsrUWFKWk4yRWZTZVRjWVlNYXViL2JtUWc1RwpXZkhka1kyOW9VVzJ1bU9wOHArRzV4SS9qVHZpQXpHS3dmWG5FaUkxKzc0anQzZndTVzFkUEExKzVFUDRVZmphRUdwUlQzCnpaTlFnTTgrWDdNVWJyRklTdjJzQ0VWSU54cGJDSE9iQkRZcTdodUljeDdKUVEvcW5EMVJGdFhBa3d4M1ZkMFF4elZUTDUKZXF6ci9jc3h6S3l1M08yVE5weWVodE1SWVB6M2dXZ2xieFI1SStObWl1VGlTQWFHa1o2OXJqblY0bVNmL25xUnJwUWRpeAozS1E1bUZldVNUUFdEdXZQNFdWNlJybzBPajRjalZnNTlGNHVWM05xQmpvMFpXYmt1QnhZeDRBK2hsZjcwMmdMLzVMZTBPCllTc1dFS0U5aFhueHZ5b0NBUTBCLy9meDFnaHkxY2xQWi9JR3FpWDYwUEQrY0FmTnFWNmt6aFo5WmZmQmVOZ2x3NThRQUEKQU1FQTBqbVF4VVc2WW9ZRnovUFg5aXgrNEd3VXh4WWFTdlVYRDJHZGt4cGtkYS9EV3lKUlJFd1FjTzhPQTdhWUFhV0hxSwp1T1ZCWVJlY3h0Z01SbzUreUNpZjVoNE9HNzVyVEtSQ0NRLy9Td2hyS25iQjFoOVJ0Q2dWNjlSd0tMSUhxcXo0dGQ0V20wCkw0NmFtditjd0ZrVVdxOFRtdzNkR1NlV3AydURQcjVxSjVGWDlEdmZRWUNKSEVkNThnN2lESXdzMUd3VExKaTJ3L0J1QlEKbzB2MUw4dGo0eG1MTUxpcW1zdDZLRHM3cHBlOGpJYTgycHVTSUJ1ZWJ5Y3pKdXljcmNBQUFBd1FEbU5SV25qcisxWmJSdgpPRjJVT2hGQ2I2UVlpQkFsTzVuWVZQUnQ2amhMWmdvMjlkUVUwUmRnYzNObmtOdzY1ZFpQbnZVMTlaamkzcFBlRnVQczJQCnEyaDg1aFNCK3VRR3JodEovRGM2MU1ZS2k5cjkxQmtvd0ZHSDR3YW9mSUsyYmF1V2VFMGg3UFFmajhrSzZVbndLbnpPSTcKc1o2anJTZStxaHQwMzkxUzhTb2F1bkhnMXNsOTRYS092bG1RQUpQMHNuS2VMcGIyalZIR0ZTR0JRdG1GQUh2aXV6Zm5nUgpGc3hrd2ROSU1ERGxLNmxVMnFhbkppL0NBM0VOQldDLzhBQUFEQkFNbXoyUkVEbllkSjM0N2prWWFDNzNHdGtjWDZDN0NxCjZ6cGRXQkZ6Zjd0NkhJbzJMdUlPenVFa2IxV0VjOFZibTBHbTA1YkZ4YnFEYjF2OWpJRmErTG9qTHVOUmFoSEZHVFRRUDYKTk9DMzA2SDd2TWgwMStNUVJNaERKYW9GRlRRVy9uSVBIQldwcDVJNzFVN0FNa0d6cXJoWVU5dlVNSXBNS2taQUQyYWF3dwpreUp6eFZzTFhUQXhrT3BVU3lWZmJsZVBKZXJpVmIydmVXbm5RUmRnRm02empSeXpSTXlYODFkaldzelNDTVZUeWI2YW9GCjdBYjZPZzlib0lnRmVQU1FBQUFCTnpjR2hwYm5oQU1qWmxNR05pWkRrM05UZGxBUUlEQkFVRwotLS0tLUVORCBPUEVOU1NIIFBSSVZBVEUgS0VZLS0tLS0K"
                      },
                      "parameter": {
                        "authentication_method": "\u9375\u8a8d\u8a3c(\u30d1\u30b9\u30d5\u30ec\u30fc\u30ba\u306a\u3057)",
                        "host": "aap.example.com",
                        "ansible_automation_controller_port": null,
                        "execution_node": "False",
                        "passphrase": null,
                        "password": null,
                        "remarks": null,
                        "ssh_private_key_file": "aap_id_rsa",
                        "user": "awx"
                      }
                    }
                  ],
                  "interface_info_ansible": {
                    "parameter": {
                      "ansible_automation_controller_port": "443",
                      "ansible_automation_controller_protocol": "https",
                      "authentication_token": "LwWw3dwoHGx19ZhP1YQZU0JdZzobFv",
                      "delete_runtime_data": "True",
                      "execution_engine": "Ansible Automation Controller",
                      "organization_name": null,
                      "proxy_address": null,
                      "proxy_port": null,
                      "representative_server": "aap.example.com"
                    }
                  }
                },
                "input_limit_setting": true
              },
              "message": "SUCCESS",
              "result": "000-00000",
              "ts": "2023-02-03T14:47:10.185Z"
            }


      -  失敗時の結果表示イメージ

         .. code-block:: bash
            :caption: 実行結果(失敗例)

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
              "message": "エラーメッセージ,
              "result": "エラーコード",
              "ts": "2022-08-18T05:29:35.643Z"
            }

   .. group-tab:: Rest API 利用

      .. code-block:: bash
         :caption: コマンド

         curl -X 'GET' \
           'http://exastro-suite-mng.example.local/api/ita/org001/initial-settings/ansible/' \
            -H 'accept: application/json'

      -  結果表示

         resultが”000-00000”が、 Ansible Automation Controller の作成に成功したことを示しています。

         .. code-block:: json
            :caption: 実行結果(成功例)

            {
              "data": {
                "execution_engine_list": [
                  "Ansible Automation Controller"
                ],
                "initial_data": {
                  "ansible_automation_controller_host_list": [
                    {
                      "file": {
                        "ssh_private_key_file": "LS0tLS1CRUdJTiBPUEVOU1NIIFBSSVZBVEUgS0VZLS0tLS0KYjNCbGJuTnphQzFyWlhrdGRqRUFBQUFBQkc1dmJtVUFBQUFFYm05dVpRQUFBQUFBQUFBQkFBQUJsd0FBQUFkemMyZ3RjbgpOaEFBQUFBd0VBQVFBQUFZRUF0V0ZvVVA5ZkZSRlhUTTV0U2s4cmU1dTVEVjNqclF3VVd5d2swMkwrZ0tkNElsOFQ4TnBkCk40Z3ZGVkMxM1VueGNxc1pxVWdEWk41NnphSnMrdThQcTBlVjl2R0dkWmZDcU11OHRrbzh5WUw2MGQ2VUVoVXFOVVJkb1UKSEJ3bngzbjZidlNWMVE0em56V0JBNVBqOFl3SENiL0swVGFEMndvMkRkbFhqTXhhTlpXTXlpRFVMbE1pSk02VFdCU0lYMwo2emE5ZnI2cGFmak5Vc0hBTk9YSTdGbUFQcC9Jcy80TmtJVkhZN2M1UkJkUTUvNWgrTCtxRmlVazhKbE9vcFdnMjJOWWlXCkpKUGM0U09iTWxtRUY1OEdMdloxZTlCS0FvaXEvdWIvVmlhZG9hRFlyTzlEM0U3UW1NTldWMjNNMnMyN2tnS0ZKcFJJSUMKbmllZlJyaTdkOVhEYldoclBFY1FlRUMyZnNrRzVyY3Q0RFhrQUtVVCtSTkdwMll6bWZqSHlHNkRPWkJIa1RCNnJ5OVF3SgpRaFpFTjEvM3k2K0Q1V1BpbWlxeVFBNmtXdnZYZUtHWkhzZEhLdG5QaGZra1EyUWlteFgyWFRHaGZwdjRSUkUzZWNGUmxRClQvenRLeWg5enIzWmd4UU1nWHgwdEJ5V2dZSUJwZVZHa1dFTTVkeTNBQUFGa1BlMkRlYjN0ZzNtQUFBQUIzTnphQzF5YzIKRUFBQUdCQUxWaGFGRC9YeFVSVjB6T2JVcFBLM3VidVExZDQ2ME1GRnNzSk5OaS9vQ25lQ0pmRS9EYVhUZUlMeFZRdGQxSgo4WEtyR2FsSUEyVGVlczJpYlBydkQ2dEhsZmJ4aG5XWHdxakx2TFpLUE1tQyt0SGVsQklWS2pWRVhhRkJ3Y0o4ZDUrbTcwCmxkVU9NNTgxZ1FPVDQvR01Cd20veXRFMmc5c0tOZzNaVjR6TVdqV1ZqTW9nMUM1VElpVE9rMWdVaUY5K3Mydlg2K3FXbjQKelZMQndEVGx5T3haZ0Q2ZnlMUCtEWkNGUjJPM09VUVhVT2YrWWZpL3FoWWxKUENaVHFLVm9OdGpXSWxpU1QzT0VqbXpKWgpoQmVmQmk3MmRYdlFTZ0tJcXY3bS8xWW1uYUdnMkt6dlE5eE8wSmpEVmxkdHpOck51NUlDaFNhVVNDQXA0bm4wYTR1M2ZWCncyMW9henhIRUhoQXRuN0pCdWEzTGVBMTVBQ2xFL2tUUnFkbU01bjR4OGh1Z3ptUVI1RXdlcTh2VU1DVUlXUkRkZjk4dXYKZytWajRwb3Fza0FPcEZyNzEzaWhtUjdIUnlyWno0WDVKRU5rSXBzVjlsMHhvWDZiK0VVUk4zbkJVWlVFLzg3U3NvZmM2OQoyWU1VRElGOGRMUWNsb0dDQWFYbFJwRmhET1hjdHdBQUFBTUJBQUVBQUFHQkFMRHVJTzBKL3YwMUdqeXhETWswNjB5N2ZjCnM5TUErb3ZkNmw5QkpEK2RFVUM4c3poZWNuaTFEVlJtQjdoN3dpR2lYcUk3RU9yMGpoQVZmQVBxQ1ZQR3F1L09tVGRyOFUKMSswQ09NWjFLbEREdE5tdVRqQkpkdy9ZN2FDVTNXWlROZm1GeE51QzdKbUsrUWFKWk4yRWZTZVRjWVlNYXViL2JtUWc1RwpXZkhka1kyOW9VVzJ1bU9wOHArRzV4SS9qVHZpQXpHS3dmWG5FaUkxKzc0anQzZndTVzFkUEExKzVFUDRVZmphRUdwUlQzCnpaTlFnTTgrWDdNVWJyRklTdjJzQ0VWSU54cGJDSE9iQkRZcTdodUljeDdKUVEvcW5EMVJGdFhBa3d4M1ZkMFF4elZUTDUKZXF6ci9jc3h6S3l1M08yVE5weWVodE1SWVB6M2dXZ2xieFI1SStObWl1VGlTQWFHa1o2OXJqblY0bVNmL25xUnJwUWRpeAozS1E1bUZldVNUUFdEdXZQNFdWNlJybzBPajRjalZnNTlGNHVWM05xQmpvMFpXYmt1QnhZeDRBK2hsZjcwMmdMLzVMZTBPCllTc1dFS0U5aFhueHZ5b0NBUTBCLy9meDFnaHkxY2xQWi9JR3FpWDYwUEQrY0FmTnFWNmt6aFo5WmZmQmVOZ2x3NThRQUEKQU1FQTBqbVF4VVc2WW9ZRnovUFg5aXgrNEd3VXh4WWFTdlVYRDJHZGt4cGtkYS9EV3lKUlJFd1FjTzhPQTdhWUFhV0hxSwp1T1ZCWVJlY3h0Z01SbzUreUNpZjVoNE9HNzVyVEtSQ0NRLy9Td2hyS25iQjFoOVJ0Q2dWNjlSd0tMSUhxcXo0dGQ0V20wCkw0NmFtditjd0ZrVVdxOFRtdzNkR1NlV3AydURQcjVxSjVGWDlEdmZRWUNKSEVkNThnN2lESXdzMUd3VExKaTJ3L0J1QlEKbzB2MUw4dGo0eG1MTUxpcW1zdDZLRHM3cHBlOGpJYTgycHVTSUJ1ZWJ5Y3pKdXljcmNBQUFBd1FEbU5SV25qcisxWmJSdgpPRjJVT2hGQ2I2UVlpQkFsTzVuWVZQUnQ2amhMWmdvMjlkUVUwUmRnYzNObmtOdzY1ZFpQbnZVMTlaamkzcFBlRnVQczJQCnEyaDg1aFNCK3VRR3JodEovRGM2MU1ZS2k5cjkxQmtvd0ZHSDR3YW9mSUsyYmF1V2VFMGg3UFFmajhrSzZVbndLbnpPSTcKc1o2anJTZStxaHQwMzkxUzhTb2F1bkhnMXNsOTRYS092bG1RQUpQMHNuS2VMcGIyalZIR0ZTR0JRdG1GQUh2aXV6Zm5nUgpGc3hrd2ROSU1ERGxLNmxVMnFhbkppL0NBM0VOQldDLzhBQUFEQkFNbXoyUkVEbllkSjM0N2prWWFDNzNHdGtjWDZDN0NxCjZ6cGRXQkZ6Zjd0NkhJbzJMdUlPenVFa2IxV0VjOFZibTBHbTA1YkZ4YnFEYjF2OWpJRmErTG9qTHVOUmFoSEZHVFRRUDYKTk9DMzA2SDd2TWgwMStNUVJNaERKYW9GRlRRVy9uSVBIQldwcDVJNzFVN0FNa0d6cXJoWVU5dlVNSXBNS2taQUQyYWF3dwpreUp6eFZzTFhUQXhrT3BVU3lWZmJsZVBKZXJpVmIydmVXbm5RUmRnRm02empSeXpSTXlYODFkaldzelNDTVZUeWI2YW9GCjdBYjZPZzlib0lnRmVQU1FBQUFCTnpjR2hwYm5oQU1qWmxNR05pWkRrM05UZGxBUUlEQkFVRwotLS0tLUVORCBPUEVOU1NIIFBSSVZBVEUgS0VZLS0tLS0K"
                      },
                      "parameter": {
                        "authentication_method": "\u9375\u8a8d\u8a3c(\u30d1\u30b9\u30d5\u30ec\u30fc\u30ba\u306a\u3057)",
                        "host": "aap.example.com",
                        "ansible_automation_controller_port": null,
                        "execution_node": "False",
                        "passphrase": null,
                        "password": null,
                        "remarks": null,
                        "ssh_private_key_file": "aap_id_rsa",
                        "user": "awx"
                      }
                    }
                  ],
                  "interface_info_ansible": {
                    "parameter": {
                      "ansible_automation_controller_port": "443",
                      "ansible_automation_controller_protocol": "https",
                      "authentication_token": "LwWw3dwoHGx19ZhP1YQZU0JdZzobFv",
                      "delete_runtime_data": "True",
                      "execution_engine": "Ansible Automation Controller",
                      "organization_name": null,
                      "proxy_address": null,
                      "proxy_port": null,
                      "representative_server": "aap.example.com"
                    }
                  }
                },
                "input_limit_setting": true
              },
              "message": "SUCCESS",
              "result": "000-00000",
              "ts": "2023-02-03T14:47:10.185Z"
            }


      -  失敗時の結果表示イメージ

         .. code-block:: bash
            :caption: 実行結果(失敗例)

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
              "message": "エラーメッセージ,
              "result": "エラーコード",
              "ts": "2022-08-18T05:29:35.643Z"
            }


その他制約事項・備考
--------------------

Ansible Automation Controller 登録を再実行する場合
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Ansible Automation Controller 登録の再実行する場合は、設定ファイルを編集後、再度スクリプトを実行して下さい。

.. code-block:: bash
   :caption: コマンド

   vi ./exastro-platform/tools/initial-settings-ansible.json

.. code-block:: bash
   :caption: コマンド

   ./exastro-platform/tools/initial-settings-ansible.sh ./exastro-platform/tools/initial-settings-ansible.json

