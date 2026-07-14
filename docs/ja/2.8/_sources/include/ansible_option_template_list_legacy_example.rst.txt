

.. note:: | **Ansible-Legacy・Ansible-LegacyRoleでのテンプレート埋込変数の使用例**

   |  :menuselection:`Ansible共通 --> テンプレート管理` で登録したテンプレート素材をPlaybookに記述する場合、テンプレート埋込変数名を記述します。

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


   #. | 下記のようにPlaybookを記述します。
      | ※destはファイル名も記述してください。ファイル名の指定がない場合、登録したテンプレート素材のファイル名の前にITAの管理番号が付与された名前のファイル名で処理されます。
      | 　たとえば、dest=/etc/ とした場合、ファイル名は/etc/36桁の文字列_hostsとなります。

      | **Playbookの記述**


      .. code-block:: yaml

         - template: src='{{ TPF_hosts }}' dest=/etc/hosts

