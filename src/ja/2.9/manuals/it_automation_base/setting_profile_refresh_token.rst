
トークン発行
------------

本システムにおいて、APIを呼び出す際に必要となるアクセストークンがありますが、アクセストークンの発行には、本説明で説明するリフレッシュトークンが必要となります。

.. tip::
   | APIの認証については、:doc:`../../reference/index` - :doc:`../../reference/api/index` - :doc:`../../reference/api/operator/index` - :doc:`../../reference/api/operator/certification` 、 :doc:`../../reference/api/system_manager/index` - :doc:`../../reference/api/system_manager/certification` 参照

#. | ログインユーザーのアイコンを選択して表示されるメニューから :menuselection:`トークン発行` を選択することにより、API実行に必要なトークンの発行ならびに発行したトークンの一覧表示を行うことができます。

   .. figure:: /images/ja/manuals/platform/login/setting_profile_token_v2-4.png
      :alt: トークン発行
      :width: 600px
      :align: left
      :class: with-border-thin

#. | 初めてトークンを発行する際は、:guilabel:`発行` ボタンを押下して、必要な情報を入力しトークンを発行することができます。

   | 二要素認証を使用している場合は、二要素認証で使用しているアプリケーションのワンタイムパスワードを入力する必要があります。

   .. figure:: /images/ja/manuals/platform/login/setting_profile_token_create_v2-4.png
      :alt: トークン一覧
      :width: 600px
      :align: left
      :class: with-border-thin

   .. figure:: /images/ja/manuals/platform/login/setting_profile_token_issue.png
      :alt: トークン発行
      :width: 600px
      :align: left

#. | 発行されたトークンは、再表示できませんので必ず発行結果の画面のトークンを保存する必要があります。

   .. figure:: /images/ja/manuals/platform/login/setting_profile_token_issue_ok.png
      :alt: トークン発行OK
      :width: 600px
      :align: left

#. | 発行したトークンの有効期限は、トークン一覧で確認できます。

   .. figure:: /images/ja/manuals/platform/login/setting_profile_token_list_v2-4.png
      :alt: トークン一覧有効期限
      :width: 600px
      :align: left
      :class: with-border-thin

#. | 発行したトークンが不要となった際は、:guilabel:`削除` ボタンを押下して、トークンを削除することができます。

   .. figure:: /images/ja/manuals/platform/login/setting_profile_token_list_delete_v2-4.png
      :alt: トークン一覧(削除)
      :width: 600px
      :align: left
      :class: with-border-thin

   | 削除確認で本当に削除する場合は、:kbd:`yes` を入力して、:guilabel:`はい、削除します` ボタンを押下します。

   .. figure:: /images/ja/manuals/platform/login/setting_profile_token_delete.png
      :alt: トークン削除
      :width: 600px
      :align: left

   .. warning::

      |  削除した際、すべてのトークンが無効となります。
