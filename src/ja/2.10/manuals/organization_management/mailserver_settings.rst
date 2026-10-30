======================
メール送信サーバー設定
======================


はじめに
========

| 本書では、Exastro Suite における メール送信サーバー設定  について説明します。

.. _email_sending_server_settings:

メール送信サーバーの設定
========================

| IT AutomationやOASEで利用するイベントごとの通知をメールで受け取るためには、送信用メールサーバーの設定を行う必要があります。

メール送信サーバーの登録
------------------------

| メール送信サーバーは、下記の手順で登録します。

#. | Exastro システムにオーガナイゼーション管理者でログインします。

#. | メニューより :menuselection:`メール送信サーバー設定` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | :menuselection:`メール送信サーバー設定` 画面が表示されるので、メール送信サーバーの情報を入力し、 :guilabel:`登録` をクリックします。
   | これによりログイン画面に :guilabel:`パスワードをお忘れですか？` というボタンが表示されるようになります。

   .. figure:: /images/ja/manuals/platform/mailserver_settings/メール送信サーバ設定.png
      :width: 600px
      :align: left

   .. list-table:: メール送信サーバー設定登録
      :widths: 40 200
      :header-rows: 1
      :align: left

      * - 項目名
        - 説明
      * - SMTPサーバーホスト
        - | SMTPサーバーのホストを指定します。
      * - 暗号化方式
        - | 暗号化の方式を指定します。
      * - SMTPサーバーポート
        - | SMTPを使用するためのポートを指定します。
      * - 認証あり
        - | SMTPサーバーにユーザー認証を行う際にチェックします。
      * - 認証ユーザー
        - | SMTPサーバーの認証ユーザーIDを入力します。
      * - 認証パスワード
        - | SMTPサーバーの認証パスワードを入力します。
      * - 送信元メールアドレス(From)
        - | 送信元のメールアドレスを入力します。
      * - 送信元表示名
        - | 送信元として表示される名前を入力します。
      * - 返信先メールアドレス(Reply-to)
        - | 返信先のメールアドレスを入力します。
      * - 返信先表示名
        - | 返信元として表示される名前を入力します。
      * - 差出人メールアドレス(Envelope-From)
        - | 差出人のメールアドレスを入力します。

メール送信サーバーの削除
------------------------

| メール送信サーバー設定の削除は、下記の手順で行ないます。

#. | Exastro システムにオーガナイゼーション管理者でログインします。

#. | メニューより :menuselection:`メール送信サーバー設定` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | :menuselection:`メール送信サーバー設定` 画面が表示されるので、 :guilabel:`設定削除` をクリックします。

   .. figure:: /images/ja/manuals/platform/mailserver_settings/メール送信サーバ設定_delete.png
      :width: 600px
      :align: left

#. | 確認メッセージが表示されるので、:kbd:`削除` を入力し、 :guilabel:`はい、削除します` をクリックします。
   | これによりログイン画面にあった :guilabel:`パスワードをお忘れですか？` というボタンが表示されなくなります。

   .. figure:: /images/ja/manuals/platform/mailserver_settings/メール送信サーバ設定削除実行確認画面.png
      :width: 600px
      :align: left

   .. tip::
      | 一度削除したメール送信サーバー設定を復元することは出来ません。
