========
ユーザー
========

はじめに
========

| 本書では、Exastro システム におけるユーザーについて説明します。


ユーザーの登録
==============
| Exastro システムで使用するユーザーを登録出来ます。
| ユーザーは、付与されているロールでユーザーの役割を区別します。
| ユーザーに割り当てられるロールの詳細につきましては :doc:`../organization_management/role` をご参照ください。

ユーザーの作成
--------------

| ユーザーは、下記の手順で作成します。

#. | Exastro システムにオーガナイゼーション管理者でログインします。

#. | メニューより :menuselection:`ユーザー一覧` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | :menuselection:`ユーザー一覧` 画面が表示されるので、 :guilabel:`作成` をクリックします。

   .. figure:: /images/ja/manuals/platform/user/ユーザー一覧画面.png
      :width: 600px
      :align: left

   .. note:: | ユーザー管理権限を有するロールに紐づくユーザー以外でログインしている時は、メニューに :menuselection:`ユーザー管理` は表示されません。
      | ユーザー管理権限を有するロールは以下の3つとなります。
      | _orgnization-manager,_orgnization-user-manager,_orgnization-user-role-manager

#. | :menuselection:`新規ユーザー` 画面が表示されるので、ユーザーの情報を入力し、 :guilabel:`登録` をクリックします。

   .. figure:: /images/ja/manuals/platform/user/新規ユーザー作成画面.png
      :width: 600px
      :align: left

   .. list-table:: 新規ユーザー登録
      :widths: 40 200
      :header-rows: 1
      :align: left

      * - 項目名
        - 説明
      * - ユーザーID
        - | ユーザーに割り当てる一意のIDを自動で付与します。
      * - ユーザー名
        - | ログイン時に使用するユーザー名を入力します。
      * - パスワード
        - | アカウントにログインするためのパスワードを設定します。
          | ONに設定した際、次回ログイン時にパスワード変更画面が表示されます。
          | 通常はONのまま、ご利用ください。
      * - email
        - | 追加するユーザーのE-mailアドレスを入力します。
      * - 名
        - | 追加するユーザーの名を入力します。
      * - 姓
        - | 追加するユーザーの姓を入力します。
      * - 有効
        - | 追加するユーザーの使用できる状態を有効・無効で選択します。
      * - 所属
        - | 追加するユーザーの所属を入力します。
      * - 説明
        - | ユーザーの説明を入力します。

ユーザーの編集
---------------

| ユーザーの編集は、下記の手順で行ないます。

#. | Exastro システムにオーガナイゼーション管理者でログインします。

#. | メニューより :menuselection:`ユーザー一覧` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | :menuselection:`ユーザー一覧` 画面が表示されるので、 :guilabel:`編集` をクリックします。

   .. figure:: /images/ja/manuals/platform/user/ユーザー一覧画面_edit.png
      :width: 600px
      :align: left

#. | :menuselection:`ユーザー編集` 画面が表示されるので、ユーザーの情報を編集し、 :guilabel:`登録` をクリックします。

   .. figure:: /images/ja/manuals/platform/user/ユーザー編集画面.png
      :width: 600px
      :align: left

   .. list-table:: ユーザー編集
      :widths: 40 200
      :header-rows: 1
      :align: left

      * - 項目名
        - 説明
      * - ユーザーID
        - | ユーザーIDの変更は出来ません。
      * - ユーザー名
        - | ユーザー名の変更は出来ません。
      * - パスワード
        - | アカウントにログインするためのパスワードを設定します。
          | ONに設定した際、次回ログイン時にパスワード変更画面が表示されます。
          | 通常はONのまま、ご利用ください。
      * - email
        - | 追加するユーザーのE-mailアドレスを入力します。
      * - 名
        - | 追加するユーザーの名を入力します。
      * - 姓
        - | 追加するユーザーの姓を入力します。
      * - 有効
        - | 追加するユーザーの使用できる状態を有効・無効で選択します。
      * - 所属
        - | 追加するユーザーの所属を入力します。
      * - 説明
        - | ユーザーの説明を入力します。

ユーザーの削除
--------------

| ユーザーの削除は、下記の手順で行ないます。

#. | Exastro システムにオーガナイゼーション管理者でログインします。

#. | メニューより :menuselection:`ユーザー一覧` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | :menuselection:`ユーザー一覧` 画面が表示されるので、 :guilabel:`削除` をクリックします。

   .. figure:: /images/ja/manuals/platform/user/ユーザー一覧画面_delete.png
      :width: 600px
      :align: left

#. | 確認メッセージが表示されるので、:kbd:`オーガナイゼーションID/ユーザー名` を入力し、 :guilabel:`はい、削除します` をクリックします。

   .. figure:: /images/ja/manuals/platform/user/ユーザー削除実行確認画面.png
      :width: 600px
      :align: left

   .. tip::
      | 一度削除したユーザーを復元することは出来ません。
      | オーガナイゼーション管理者を削除することは出来ません。

ユーザーの一括登録・削除
------------------------

| ユーザーを一括してエクセル形式でダウンロードすることが出来ます。
| また、同じ形式のファイルで、一括してユーザーを登録・削除することが出来ます。

#. | Exastro システムにオーガナイゼーション管理者でログインします。

#. | メニューより :menuselection:`ユーザー一括登録・削除` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | :menuselection:`ユーザー一括登録・削除` 画面が表示されるので、 目的に合ったファイルをダウンロードします。

   - | 登録されている情報の更新/削除を行う場合は :guilabel:`全件ダウンロード` をクリックし、ファイルをダウンロードして下さい。
   - | 新規に登録を行う場合は :guilabel:`新規登録用ダウンロード`  をクリックしてファイルをダウンロードして下さい。

   .. figure:: /images/ja/manuals/platform/user/ユーザー一括登録・削除画面.png
      :width: 600px
      :align: left

#. | ダウンロードしたファイルを編集し、保存して下さい。

   - | 編集内容についてはダウンロードしたファイル上部の注意事項を参照し、編集して下さい。

   .. warning::
      | 登録/更新を行う場合に、「実行処理種別」に「削除」を選択しているユーザーが含まれる場合、登録/更新が実行されません。
      | 削除を行う場合に、「実行処理種別」に「登録/更新」を選択しているユーザーが含まれる場合、削除が実行されません。

#. | :guilabel:`ファイル一括登録` または :guilabel:`ファイル一括削除` をクリックし、対象のファイルを選択し、表示された確認メッセージで :guilabel:`OK` をクリックして下さい。

   .. figure:: /images/ja/manuals/platform/user/ユーザー一括登録・削除画面_confirm.png
      :width: 600px
      :align: left

#. | :menuselection:`一括処理結果` 画面が表示されるので、一括登録・削除処理の結果を閲覧することができます。

   - | :guilabel:`更新` ボタンで表示を更新することができ、:guilabel:`ダウンロード` ボタンで一括登録・削除がエラーとなったときの情報を確認することができます。

   .. figure:: /images/ja/manuals/platform/user/ユーザー一括登録・削除画面_results.png
      :width: 600px
      :align: left

   | 一括処理結果画面の項目は以下の通りです。

   .. list-table::
      :widths: 50 100
      :header-rows: 1
      :align: left

      * - 項目名
        - 説明
      * - エラー処理結果
        - | 処理がエラーとなったとき、処理結果ファイルをダウンロードすることができます。
          | 処理結果ファイルには、エラーとなった項目の情報が記載されます。
      * - 実行日時
        - 一括登録・削除を行った日時
      * - 実行区分
        - | ファイル一括登録/ファイル一括削除
      * - ステータス
        - | ステータスには以下の状態が存在します。
          | ・NotExecuted
          | ・Executing
          | ・Completion
          | ・Failed
      * - 対象件数
        - 一括登録・削除の対処となったユーザーの件数
      * - 成功件数
        - 一括登録・削除が成功したユーザーの件数
      * - エラー件数
        - 一括登録・削除がエラーとなったユーザーの件数
      * - 処理結果メッセージ
        - 処理がエラーとなった際、エラーメッセージが表示されます。
      * - ユーザー
        - 処理を実施したユーザー
