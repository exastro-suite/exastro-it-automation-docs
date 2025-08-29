========
通知管理
========

はじめに
========

| 本書では、Exastro システム における 通知管理 について説明します。

.. _notification_management:

通知先設定の登録
================

| 通知管理では、IT AutomationやOASEで利用するイベントごとの通知を受け取るための設定を行うことが出来ます。

.. _notification_entry:

通知先設定の登録手順
--------------------

| 通知先設定は、下記の手順で行ないます。

#. | Exastro システムにオーガナイゼーション管理者でログインします。

#. | メニューより :menuselection:`通知管理` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

   .. note:: | OASE機能について
      | OASE機能の詳細につきましては :doc:`../oase/oase_common` をご参照ください。

#. | :menuselection:`通知先ワークスペース一覧` 画面が表示されるので、通知先設定を行いたいワークスペースを選択、または :guilabel:`通知先設定` をクリックします。

   .. image:: /images/ja/manuals/platform/notification/通知先ワークスペース一覧画面.png
      :width: 600px
      :align: left

   .. note:: | アクセス権限のあるワークスペースのみ表示されます。


#. | :menuselection:`通知先設定一覧` 画面が表示されるので、 :guilabel:`作成` をクリックします。

   .. image:: /images/ja/manuals/platform/notification/通知先設定一覧画面.png
      :width: 600px
      :align: left

#. | :menuselection:`新規通知先設定` 画面が表示されるので、通知先の情報を入力し、 :guilabel:`登録` をクリックします。

   - 通知方法がMailの時の画面

     .. figure:: /images/ja/manuals/platform/notification/新規通知先設定画面_Mail.png
        :width: 600px
        :align: left

     .. list-table:: 新規通知先設定登録 - Mail
        :widths: 40 200
        :header-rows: 1
        :align: left

        * - 項目名
          - 説明
        * - 通知先ID
          - | 通知先に割り当てる一意のIDを指定します。
            | ここで指定した ID を使ってシステム間の連携を行います。
            | 初期値として自動的にIDが付与されます。
        * - 通知先名
          - | 通知先に割り当てる名前を指定します。
        * - 通知方法
          - | 通知方法を指定します。
        * - 通知先(to, cc, bcc)
          - | Mailで通知するメールアドレスを指定します。

   - 通知方法がTeams(Workflows)の時の画面

     .. figure:: /images/ja/manuals/platform/notification/新規通知先設定画面_TeamsWF.png
        :width: 600px
        :align: left

     .. list-table:: 新規通知先設定登録 - Teams(Workflows)
        :widths: 40 200
        :header-rows: 1
        :align: left

        * - 項目名
          - 説明
        * - 通知先ID
          - | 通知先に割り当てる一意のIDを指定します。
            | ここで指定した ID を使ってシステム間の連携を行います。
            | 初期値として自動的にIDが付与されます。
        * - 通知先名
          - | 通知先に割り当てる名前を指定します。
        * - 通知方法
          - | 通知方法を指定します。
        * - 通知先(URL)
          - | Teamsのワークフローの「Webhook要求を受信するとチャネルに投稿する」で発行したURLを指定します。

   - 通知方法がWebhookの時の画面

     .. figure:: /images/ja/manuals/platform/notification/新規通知先設定画面_Webhook.png
        :width: 600px
        :align: left

     .. list-table:: 新規通知先設定登録 - Webhook
        :widths: 40 200
        :header-rows: 1
        :align: left

        * - 項目名
          - 説明
        * - 通知先ID
          - | 通知先に割り当てる一意のIDを指定します。
            | ここで指定した ID を使ってシステム間の連携を行います。
            | 初期値として自動的にIDが付与されます。
        * - 通知先名
          - | 通知先に割り当てる名前を指定します。
        * - 通知方法
          - | 通知方法を指定します。
        * - 通知先(URL)
          - | Webhookを送信するURLを指定します。
        * - 通知先(Header)
          - | Webhookを送信する際のHTTP HeaderをJSON形式で指定します。

通知先設定の詳細確認
--------------------

| 通知先設定の詳細確認は、下記の手順で行ないます。

#. | Exastro システムにオーガナイゼーション管理者でログインします。

#. | メニューより :menuselection:`通知管理` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | :menuselection:`通知先ワークスペース一覧` 画面が表示されるので、通知先設定の詳細確認を行いたいワークスペースを選択、または :guilabel:`通知先設定` をクリックします。

   .. image:: /images/ja/manuals/platform/notification/通知先ワークスペース一覧画面.png
      :width: 600px
      :align: left

   .. tip:: | アクセス権限のあるワークスペースのみ表示されます。

#. | :menuselection:`通知先設定一覧` 画面が表示されるので、詳細確認を行いたい通知先設定をクリックします。

   .. image:: /images/ja/manuals/platform/notification/通知先設定一覧.png
      :width: 600px
      :align: left

#. | :menuselection:`通知先設定詳細` 画面が表示されます。
   | 詳細確認の他、編集、削除、通知テストが実施できます。

   .. image:: /images/ja/manuals/platform/notification/通知先設定詳細画面_v2-6.png
      :width: 600px
      :align: left

   .. tip::
      | 通知テストについて
      | 登録されている通知先設定の内容で、メッセージの通知テストを行う場合は、:guilabel:`通知テスト` ボタンを押下して、メッセージ通知を確認できます。
      | :guilabel:`通知テスト` ボタン押下後、確認画面が表示され、応答後、メッセージが指定された通知先に送信されます。
      | 送信されるタイトル・本文は"notification test"となります。


通知先設定編集
--------------

| 通知先設定の編集は、下記の手順で行ないます。

#. | Exastro システムにオーガナイゼーション管理者でログインします。
#. | メニューより :menuselection:`通知管理` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | :menuselection:`通知先ワークスペース一覧` 画面が表示されるので、通知先設定の編集を行いたいワークスペースを選択、または :guilabel:`通知先設定` をクリックします。

   .. image:: /images/ja/manuals/platform/notification/通知先ワークスペース一覧画面.png
      :width: 600px
      :align: left

   .. note:: | アクセス権限のあるワークスペースのみ表示されます。

#. | :menuselection:`通知先設定一覧` 画面が表示されるので、 :guilabel:`編集` をクリックします。

   .. image:: /images/ja/manuals/platform/notification/通知先設定一覧画面_edit.png
      :width: 600px
      :align: left

#. | :menuselection:`通知先設定編集` 画面が表示されるので、通知先の情報を編集し、 :guilabel:`登録` をクリックします。

   .. image:: /images/ja/manuals/platform/notification/新規通知先設定画面_Mail.png
      :width: 600px
      :align: left

   .. list-table:: 通知先設定編集
      :widths: 40 200
      :header-rows: 1
      :align: left

      * - 項目名
        - 説明
      * - 通知先ID
        - | 通知先IDは変更出来ません。
      * - 通知先名
        - | 通知先に割り当てる名前を指定します。
      * - 通知方法
        - | 通知方法を指定します。
      * - 通知先
        - | 指定した通知方法によって設定が異なります。
          | 詳細は :ref:`notification_entry` を参照ください。

通知先設定削除
--------------

#. | Exastro システムにオーガナイゼーション管理者でログインします。
#. | メニューより :menuselection:`通知管理` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | :menuselection:`通知先ワークスペース一覧` 画面が表示されるので、通知先設定の編集を行いたいワークスペースを選択、または :guilabel:`通知先設定` をクリックします。

   .. image:: /images/ja/manuals/platform/notification/通知先ワークスペース一覧画面.png
      :width: 600px
      :align: left

   .. note:: | アクセス権限のあるワークスペースのみ表示されます。

#. | :menuselection:`通知先設定一覧` 画面が表示されるので、 :guilabel:`削除` をクリックします。

   .. image:: /images/ja/manuals/platform/notification/通知先設定一覧画面_delete.png
      :width: 600px
      :align: left

#. | 確認メッセージが表示されるので、:kbd:`ワークスペースID/通知先ID` を入力し、 :guilabel:`はい、削除します` をクリックします。

   .. image:: /images/ja/manuals/platform/notification/通知先設定削除実行確認画面.png
      :width: 600px
      :align: left

   .. tip::
      | 一度削除した通知先設定を復元することは出来ません。
