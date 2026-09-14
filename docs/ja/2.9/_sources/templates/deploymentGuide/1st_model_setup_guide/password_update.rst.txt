=======================
API実行ユーザーのPW変更
=======================

API実行ユーザーのパスワードを変更していない場合本手順の実施は不要です。


グローバル変数管理の変更​ 
==========================

1. ITAに「1stモデル管理者」でログインする

   .. tip::
      | 実行者：1stモデル管理者
      | ユーザー名：ita-1st-admin
      | パスワード：password

2. メインメニューの「Ansible共通」アイコンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/1st_model_setup_guide/password_update/API_user_PW_update_01.png
      :width: 4.72721in
      :height: 4.6604in

3. 「グローバル変数管理」へ移動して「フィルタ」ボタンを押下する。

4. | 「グローバル変数名」が”GBL_API_PASSWORD”のレコードをチェックして「編集」ボタンを押下する。
   | フィルタの「グローバル変数名」で検索すると間違いがない

   .. figure:: /images/ja/templates/deploymentGuide/1st_model_setup_guide/password_update/API_user_PW_update_02.png
      :width: 4.72721in
      :height: 4.6604in

5. 「具体値」に変更後のAPI実行ユーザーのパスワードと同じパスワードを入力して「編集確認」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/1st_model_setup_guide/password_update/API_user_PW_update_03.png
      :width: 4.72721in
      :height: 4.6604in

6. 「編集確認」ポップアップ画面の「編集反映」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/1st_model_setup_guide/password_update/API_user_PW_update_04.png
      :width: 4.72721in
      :height: 4.6604in
