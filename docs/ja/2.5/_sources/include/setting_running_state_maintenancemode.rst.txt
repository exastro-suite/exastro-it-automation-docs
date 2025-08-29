#. | Exastro システムにシステム管理者でログインします。

#. | メニューより :menuselection:`システム状態設定` をクリックします。

   .. image:: /images/ja/manuals/platform/settings_running_state/settings_running_state_menu.png
      :width: 200px
      :align: left

#. | :menuselection:`システム状態一覧` 画面に現在のメンテナンスモードの設定値が表示されます。変更したいメンテナンスモードの設定を切り替え、 :guilabel:`登録` をクリックします。

   .. figure:: /images/ja/manuals/platform/settings_running_state/settings_running_state_maintenancemode.png
      :width: 600px
      :align: left

   .. list-table::
      :widths: 40 200
      :header-rows: 1
      :align: left

      * - 項目名
        - 説明
      * - サーバーサイドジョブ停止
        - | ONにするとサーバーサイドジョブが起動停止します。
      * - 読み取り専用モード
        - | ONにすると読み取り専用モードとなり、データの書き込みが停止します。
          | ONの場合、ログレベルの変更は反映されません。
