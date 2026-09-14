
.. note:: | **Ansible-Pioneerでのテンプレート埋込変数の使用例**

   |  :menuselection:`Ansible共通 --> テンプレート管理` で登録したテンプレート素材を対話ファイルに記述する場合、テンプレート埋込変数名を記述します。

   | ※ファイル名にスペースなどが含まれている場合、適切にクォーテーションで囲まないと、作業実行時にエラーになる場合があります。

   | e.g.) :menuselection:`Ansible共通 --> テンプレート管理` で登録したhostsファイルをテンプレート埋込変数を使用して作業対象サーバの/etc/配下に設置する場合

   #. | :menuselection:`Ansible共通 --> テンプレート管理` からhostsファイルを登録します。

      .. list-table:: テンプレート管理の登録内容
         :widths: 30 40
         :header-rows: 1
         :align: left

         * - テンプレート埋込変数名
           - テンプレート素材
         * - TPF_hosts
           - hosts


   #. | 下記のように対話ファイルを記述します。
      | ※転送先はファイル名も記述してください。ファイル名の指定がない場合、登録したテンプレート素材のファイル名の前にITAの管理番号が付与された名前のファイル名で処理されます。
      | 　たとえば、/etc/. とした場合、ファイル名は/etc/36桁の文字列_hostsとなります。

      | **対話ファイルの記述**

      .. code-block:: yaml

          conf:
            # ファイルのサイズでタイマ値調整
            timeout: 60
          exec_list:
            # 対象機器へのログインパスワード認証
            - expect: 'password:'
              exec: '{{ __loginpassword__ }}'
            # 作業対象側よりscpコマンドでAAC側に配置されているファイルを作業対象にファイル転送
            - expect: '{{ __loginuser__ }}@{{ __dnshostname__ }}'
              exec: 'scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null {{ VAR_scp_user }}@{{ VAR_aac_host }}:{{ TPF_hosts }} /etc/hosts'
            # scpコマンドのパスワードログイン認証(AAC側)
            - expect: 'password:'
              exec: '{{ VAR_scp_user_password }}'
            # 対話ファイル終了
            - expect: '{{ __loginuser__ }}@{{ __dnshostname__ }}'
              exec: exit

      .. list-table:: 変数の具体値
           :widths: 30 40
           :header-rows: 1
           :align: left

           * - 変数
             - 具体値
           * - VAR_scp_user
             - awx
           * - VAR_scp_user_password
             - awxユーザパスワード
           * - VAR_aac_host
             - Ansible Automation Controller
