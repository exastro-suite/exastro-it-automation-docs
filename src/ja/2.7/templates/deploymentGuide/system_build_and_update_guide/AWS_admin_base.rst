=============
AWS管理者基盤
=============

共通パラメータの更新
====================

1. ITAに「1stモデル管理者」でログインする

   .. tip::
      | 実行者：1stモデル管理者
      | ユーザー名：ita-1st-admin
      | パスワード：password

2. メインメニューの「基盤管理」アイコンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin_base/parameter_update_01.png
      :width: 4.72721in
      :height: 4.6604in

3. 「共通パラメータ」へ移動して「フィルタ」ボタンを押下する
4. 全てのレコードをチェックして「編集」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin_base/parameter_update_02.png
      :width: 4.72721in
      :height: 4.6604in

5. 全ての項目に値を入力して「編集確認」ボタンを押下する

   .. tip::
      - 変更が必要
         - 「システム名」…英数字、ハイフンで任意の値を入力
         - 「アカウントID」…数字12桁で入力
      - 任意で変更
         - 「スタック作成リージョン」
         - 「システム環境」～「コストセンター」

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin_base/parameter_update_03.png
      :width: 4.72721in
      :height: 4.6604in

6. 「編集確認」ポップアップ画面の「編集反映」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin_base/parameter_update_04.png
      :width: 4.72721in
      :height: 4.6604in


AWS認証情報管理の設定
=====================

1. ITAに「1stモデル管理者」でログインする

   .. tip::
      | 実行者：1stモデル管理者
      | ユーザー名：ita-1st-admin
      | パスワード：password

2. メインメニューの「AWS認証情報管理」アイコンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin_base/authentication_information_settings_01.png
      :width: 4.72721in
      :height: 4.6604in

3. 「AWS管理者【認証】」へ移動して「フィルタ」ボタンを押下する

4. 全てのレコードをチェックして「編集」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin_base/authentication_information_settings_02.png
      :width: 4.72721in
      :height: 4.6604in

5. 全てのレコードの「アクセスキーID」「シークレットアクセスキー」に「Ⅱ.1stモデル導入手順 / 1.導入準備(3/3)」で取得したアクセスキー、シークレットアクセスキーを入力して「編集確認」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin_base/authentication_information_settings_03.png
      :width: 4.72721in
      :height: 4.6604in

6. 「編集確認」ポップアップ画面の「編集反映」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin_base/authentication_information_settings_04.png
      :width: 4.72721in
      :height: 4.6604in


AWSリソースの確認
=================

1. AWS マネジメントコンソールにログインする

      | URL：https://xxxxxxxxxxxx.signin.aws.amazon.com/console
      | ユーザー名：1st-model-admin
      | パスワード：P@ssw0rd

2. | 「サービス > CloudFormation > スタック」へ移動する
   | “aws-1st-model-01”でフィルターをかけて以下のスタックが作成されていないことを確認する
   
      aws-1st-model-01-AwsAdmin-Group

3. | 「サービス > IAM > ユーザーグループ」へ移動する
   | “CS-1st-”でフィルターをかけて以下のユーザーグループが作成されていないことを確認する
   
      CS-1st-AWS-Admin-Group


Conductor実行
=============

1. ITAに「1stモデル管理者」でログインする
   
   .. tip::
      | 実行者：1stモデル管理者
      | ユーザー名：ita-1st-admin
      | パスワード：password

2. メインメニューの「Conductor」アイコンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin_base/admin_base_conductor_01.png
      :width: 4.72721in
      :height: 4.6604in

3. | 「Conductor一覧」画面の「Conductor名称」が”AWS管理者基盤 / 構築・更新”のレコードの「詳細」ボタンを押下する
   | フィルタの「Conductor名称」で検索すると間違いがない

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin_base/admin_base_conductor_02.png
      :width: 4.72721in
      :height: 4.6604in

4. 「Conductor編集/作業実行」画面の「作業実行」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin_base/admin_base_conductor_03.png
      :width: 4.72721in
      :height: 4.6604in

5. 「作業実行設定」ポップアップ画面の「オペレーション選択」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin_base/admin_base_conductor_04.png
      :width: 4.72721in
      :height: 4.6604in

6. 「オペレーション選択」ポップアップ画面の”共通オペレーション”のレコードを選択して「選択決定」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin_base/admin_base_conductor_05.png
      :width: 4.72721in
      :height: 4.6604in

7. 「作業実行設定」ポップアップ画面の「作業実行」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin_base/admin_base_conductor_06.png
      :width: 4.72721in
      :height: 4.6604in

8. ステータスに「正常終了」が表示されることを確認する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin_base/admin_base_conductor_07.png
      :width: 4.72721in
      :height: 4.6604in


AWSリソースの確認(Conductor実行後)
==================================

1. AWS マネジメントコンソールにログインする
   
      | URL：https://xxxxxxxxxxxx.signin.aws.amazon.com/console
      | ユーザー名：1st-model-admin
      | パスワード：P@ssw0rd

2. | 「サービス > CloudFormation > スタック」へ移動する
   | “aws-1st-model-01”でフィルターをかけて以下のスタックが作成されていることを確認する
   
      aws-1st-model-01-AwsAdmin-Group

3. | 「サービス > IAM > ユーザーグループ」へ移動する
   | “CS-1st-”でフィルターをかけて以下のユーザーグループが作成されていることを確認する
   
      CS-1st-AWS-Admin-Group

