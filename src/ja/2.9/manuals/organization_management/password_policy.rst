==================
パスワードポリシー
==================

はじめに
========

| 本書では、Exastro システム におけるパスワードポリシーの機能について説明します。

目的
====

| オーガナイゼーション管理者が不正アクセスのリスクを低減するため、パスワードの強度を一定水準に高めるために設定します。


パスワードポリシーの設定
========================

パスワードポリシーの項目
------------------------

| パスワードポリシーには下記の項目が設定可能です。

.. list-table:: パスワードポリシーの項目
    :widths: 20, 40
    :header-rows: 1
    :align: left

    * - パスワードポリシーの項目
      - 内容
    * - Expire Password
      - 定期的なパスワードの変更を強制させるための日数を指定します。
    * - Not Recently Used
      - 同じパスワードを使い続けないようにするために、使用不可とする直近のパスワードの個数を指定します。
    * - Minimum Length
      - 短すぎるパスワードを使用させないように、パスワードの最小文字数を指定します。
    * - Not Username
      - ユーザー名と同じパスワードを使用禁止にします。
    * - Not Email
      - メールアドレス同じパスワードを使用禁止にします。
    * - Special Characters
      - パスワードを複雑にさせるために、パスワードに含める必要のある記号の最小文字数を指定します。
    * - Uppercase Characters
      - パスワードを複雑にさせるために、パスワードに含める必要のある英大文字の最小文字数を指定します。
    * - Lowercase Characters
      - パスワードを複雑にさせるために、パスワードに含める必要のある英小文字の最小文字数を指定します。
    * - Digits
      - パスワードを複雑にさせるために、パスワードに含める必要のある数字の最小文字数を指定します。
    * - Maximum Authentication Age
      - パスワードの変更を行う際に再認証を不要とする秒数を指定します。
    * - Maximum Length
      - パスワードの最大文字数を指定します。


パスワードポリシーの登録
------------------------

| パスワードポリシーは、下記の手順で登録します。

#. | Exastro システムにオーガナイゼーション管理者でログインします。

#. | メニューより :menuselection:`パスワードポリシー` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | :menuselection:`パスワードポリシー` 画面が表示されます。

   .. figure:: /images/ja/manuals/platform/password_policy/パスワードポリシー設定.png
      :width: 600px
      :align: left

#. | :guilabel:`Add Policy` のドロップダウンリストから追加するパスワードポリシーの項目を選択します。
   | パスワードポリシーの項目によって、文字数や日数等の項目を入力します。

   .. figure:: /images/ja/manuals/platform/password_policy/パスワードポリシー設定_設定済み.png
      :width: 600px
      :align: left

#. | パスワードポリシーの入力を終えたら、:guilabel:`保存` をクリックします。


パスワードポリシーの解除
------------------------

| パスワードポリシーは、下記の手順で解除します。

#. | Exastro システムにオーガナイゼーション管理者でログインします。

#. | メニューより :menuselection:`パスワードポリシー` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | 解除するパスワードポリシーの右側の :guilabel:`-` をクリックします。

   .. figure:: /images/ja/manuals/platform/password_policy/パスワードポリシー設定_設定済み.png
      :width: 600px
      :align: left

#. | 解除するパスワードポリシーの指定を終えたら、:guilabel:`保存` をクリックします。
