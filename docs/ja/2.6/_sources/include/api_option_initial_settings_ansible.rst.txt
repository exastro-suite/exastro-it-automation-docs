
.. list-table:: Ansible Automation Controller 登録時のパラメータ
   :widths: 15 20 15
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 設定値
   * - input_limit_setting
     - | Exastro IT Automation の画面上から :menuselection:`Ansible共通 --> インターフェース情報` (一部※) と :menuselection:`Ansible Automation Controller ホスト一覧` の編集可否を指定。
       | ▼ :menuselection:`Ansible共通 --> インターフェース情報` の入力制限がかかる項目:
       | - :menuselection:`実行エンジン`
       | - :menuselection:`Ansible Automation Controller インターフェース`
       | - :menuselection:`Proxy`
     - | :program:`true`: Exastro IT Automation の画面上から編集不可
       | :program:`false`: Exastro IT Automation の画面上から編集可能
   * - execution_engine_list
     - | :menuselection:`Ansible共通 --> インターフェース情報 --> 実行エンジン` の選択肢に入れる項目を指定。
     - | :kbd:`Ansible-Core`: コミュニティ版Ansible
       | :kbd:`Ansible Automation Controller`: Red Hat Ansible Automation Controller
       | :kbd:`Ansible Execution Agent`: Ansible実行エージェント
       | 上記のいずれか、または、全てを指定。
   * - initial_data.ansible_automation_controller_host_list[*].file.ssh_private_key_file
     - Ansible Automation Controller に接続するために登録する秘密鍵ファイルを Base64 エンコードした値。
     - 秘密鍵ファイルのBase64 エンコード文字列
   * - initial_data.ansible_automation_controller_host_list[*].parameter.host
     - Ansible Automation Controller のコントロールノードのホスト名を指定。
     - Ansible Automation Controller のコントロールノードのホスト名
   * - initial_data.ansible_automation_controller_host_list[*].parameter.authentication_method
     - | 認証方式の選択
       | Ansible Core または Ansible Automation Controller から作業対象の機器へ接続する際の認証方式を選択します。
     - | :kbd:`パスワード認証` : ログインパスワードの管理で●の選択と、ログインパスワードの入力が必須です。
       | :kbd:`鍵認証(パスフレーズなし)` : SSH 秘密鍵ファイル(id_ras)のアップロードが必須です。
       | :kbd:`鍵認証(パスフレーズあり)` : SSH 秘密鍵ファイル(id_ras)のアップロードと、パスフレーズの入力が必須です。
   * - initial_data.ansible_automation_controller_host_list[*].parameter.user
     - | Ansible Automation Controller に SSH 接続する場合のユーザ名を指定。
       | プロジェクトパス(/var/lib/awx/projects)への書き込み制限が必要
     - | awx
   * - initial_data.ansible_automation_controller_host_list[*].parameter.password
     - | パスワード認証する場合のパスワードを指定。
       | ※ 最大長128バイト
     - 任意の文字列
   * - initial_data.ansible_automation_controller_host_list[*].parameter.ssh_private_key_file
     - Ansible Automation Controller に接続するために登録する秘密鍵ファイルのファイル名。
     - 秘密鍵ファイルのファイル名
   * - initial_data.ansible_automation_controller_host_list[*].parameter.passphrase
     - | SSH 秘密鍵ファイルにパスフレーズが設定されている場合、そのパスフレーズを指定。
       | ※ 最大長256バイト
     - パスフレーズ
   * - initial_data.ansible_automation_controller_host_list[*].parameter.ansible_automation_controller_port
     - Ansible Automation Controllerにsshで接続するポート番号を指定。未設定の場合は22。
     - ポート番号
   * - initial_data.ansible_automation_controller_host_list[*].parameter.execution_node
     - このノードが Ansible Automation Controller の Execution node であるかどうかを指定。
     - | :kbd:`True` : Execution node である場合。
       | :kbd:`False` : Execution node でない場合。
       | key名はexecution_nodeの代わりにisolated_towerでも可。
   * - initial_data.ansible_automation_controller_host_list[*].parameter.remarks
     - 備考
     - 任意の文字列
   * - initial_data.parameter.execution_engine
     - | 実行エンジンの指定
     - | :kbd:`Ansible-Core`: コミュニティ版Ansible
       | :kbd:`Ansible Automation Controller`: Red Hat Ansible Automation Controller
       | :kbd:`Ansible Execution Agent`: Ansible実行エージェント
       | 上記のいずれかを指定。
   * - initial_data.parameter.representative_server
     - | 代表ホスト
       | :menuselection:`Ansible Automation Controller ホスト一覧` に登録されいるホストの一覧より、 Exastro IT Automation と通信する Ansible Automation Controller のホストを選択します。
       | ※ 実行エンジンが Ansible Automation Controller の場合に入力必須
     - Ansible Automation Controller ホスト
   * - initial_data.parameter.ansible_automation_controller_protocol
     - | Ansible Automation Controller サーバとの通信プロトコルを :kbd:`http` か :kbd:`https` のどちらかを入力します。
       | 通常は https です。
       | ※ 実行エンジンが Ansible Automation Controller の場合に入力必須
     - | :kbd:`http`
       | :kbd:`https`
       | 上記のいずれか。
   * - initial_data.parameter.ansible_automation_controller_port
     - | Ansible Automation Controller サーバの接続ポート(80/443)を入力します。通常は HTTPS(443)です。
       | ※ 実行エンジンが Ansible Automation Controller の場合に入力必須
     - ポート番号
   * - initial_data.parameter.organization_name
     - | Ansible Automation Controller サーバに登録されている組織名を選択します
       | ※ 実行エンジンが Ansible Core 以外の場合に入力必須
     - 組織名の文字列
   * - initial_data.parameter.authentication_token
     - | Exastro IT Automation から Ansible Automation Controller サーバに接続するユーザーの認証トークンを入力します。
       | ※ 実行エンジンが Ansible Automation Controller の場合に入力必須
     - 認証トークン文字列
   * - initial_data.parameter.delete_runtime_data
     - | 作業実行時に Exastro IT Automation と Ansible Automation Controller 内に一時的に生成されるデータリソースを作業終了後に削するかを選択します。
       | ※ 実行エンジンが Ansible Automation Controller の場合に入力必須
     - | :kbd:`True` : 作業終了時にリソースを削除する
       | :kbd:`False` : 作業終了時にリソースを削除しない
   * - initial_data.parameter.proxy_address
     - | Exastro IT Automation がプロキシ環境下にある場合、Ansible/ Ansible Automation Controller サーバまでの疎通のために設定が必要な場合があります。
       | プロキシサーバのURLが http://proxy.example.com:8080 の場合、:kbd:`http://proxy.example.com` を入力します。
       | ※ 最大128バイト
     - プロキシサーバのURL
   * - initial_data.parameter.proxy_port
     - | Exastro IT Automation がプロキシ環境下にある場合、Ansible/ Ansible Automation Controller サーバまでの疎通のために設定が必要な場合があります。
       | プロキシサーバのURLが http://proxy.example.com:8080 の場合、:kbd:`8080` を入力します。
     - プロキシサーバのポート番号
