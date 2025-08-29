==============
インフラ管理者
==============

AWSリソースの確認
=================

1. AWS マネジメントコンソールにログインする

      | URL：https://xxxxxxxxxxxx.signin.aws.amazon.com/console
      | ユーザー名：1st-model-admin
      | パスワード：P@ssw0rd

2. | 「サービス > CloudFormation > スタック」へ移動する。
   | “aws-1st-model-01”でフィルターをかけて以下のスタックが作成されていないことを確認する

      | aws-1st-model-01-Create-User-1st-infra-admin
      | aws-1st-model-01-Create-User-1st-infra-admin-sub

3. | 「サービス > IAM > ユーザー」へ移動する。
   | “infra-admin”でフィルターをかけて以下のユーザーが作成されていないことを確認する

      | infra-admin
      | infra-admin-sub


Conductor実行
=============

1. ITAに「AWS管理者」でログインする
   
   .. tip::
      | 実行者：AWS管理者
      | ユーザー名：aws-admin
      | パスワード：password

2. メインメニューの「Conductor」アイコンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/infrastructure_admin/infrastructure_admin_conductor_01.png
      :width: 4.72721in
      :height: 4.6604in

3. | 「Conductor一覧」画面の「Conductor名称」が”インフラ管理者(ITAユーザー,IAMユーザー)の作成”のレコードの「詳細」ボタンを押下する。
   | フィルタの「Conductor名称」で検索すると間違いがない

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/infrastructure_admin/infrastructure_admin_conductor_02.png
      :width: 4.72721in
      :height: 4.6604in

4. 「Conductor編集/作業実行」画面の「作業実行」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/infrastructure_admin/infrastructure_admin_conductor_03.png
      :width: 4.72721in
      :height: 4.6604in

5. 「作業実行設定」ポップアップ画面の「オペレーション選択」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/infrastructure_admin/infrastructure_admin_conductor_04.png
      :width: 4.72721in
      :height: 4.6604in

6. 「オペレーション選択」ポップアップ画面の”共通オペレーション”のレコードを選択して「選択決定」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/infrastructure_admin/infrastructure_admin_conductor_05.png
      :width: 4.72721in
      :height: 4.6604in

7. 「作業実行設定」ポップアップ画面の「作業実行」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/infrastructure_admin/infrastructure_admin_conductor_06.png
      :width: 4.72721in
      :height: 4.6604in

8. ステータスに「正常終了」が表示されることを確認する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/infrastructure_admin/infrastructure_admin_conductor_07.png
      :width: 4.72721in
      :height: 4.6604in


.. _infrastructure_admin_aws_resource_check_after_conductor:

AWSリソースの確認(Conductor実行後)
==================================

1. AWS マネジメントコンソールにログインする

      | URL：https://xxxxxxxxxxxx.signin.aws.amazon.com/console
      | ユーザー名：1st-model-admin
      | パスワード：P@ssw0rd

2. | 「サービス > CloudFormation > スタック」へ移動する。
   | “aws-1st-model-01”でフィルターをかけて以下のスタックが作成されていることを確認する

      | aws-1st-model-01-Create-User-1st-infra-admin
      | aws-1st-model-01-Create-User-1st-infra-admin-sub

3. | 「サービス > IAM > ユーザー」へ移動する。
   | “infra-admin”でフィルターをかけて以下のユーザーが作成されていることを確認する

      | infra-admin
      | infra-admin-sub

   | “infra-admin”を選択してアクセスキーを作成する
   | 作成したアクセスキー、シークレットアクセスキーをメモしておく（※2）


AWS認証情報管理の設定
=====================

1. ITAに「AWS管理者」でログインする

   .. tip::
      | 実行者：AWS管理者
      | ユーザー名：aws-admin
      | パスワード：password

2. メインメニューの「AWS認証情報管理」アイコンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/infrastructure_admin/infrastructure_admin_authentication_settings_01.png
      :width: 4.72721in
      :height: 4.6604in

3. 「インフラ管理者【認証】」へ移動して「フィルタ」ボタンを押下する

4. 全てのレコードをチェックして「編集」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/infrastructure_admin/infrastructure_admin_authentication_settings_02.png
      :width: 4.72721in
      :height: 4.6604in

5. 全てのレコードの「アクセスキーID」「シークレットアクセスキー」に「:ref:`infrastructure_admin_aws_resource_check_after_conductor`」の（※2）でメモしたアクセスキー、シークレットアクセスキーを入力して「編集確認」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/infrastructure_admin/infrastructure_admin_authentication_settings_03.png
      :width: 4.72721in
      :height: 4.6604in

6. 「編集確認」ポップアップ画面の「編集反映」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/infrastructure_admin/infrastructure_admin_authentication_settings_04.png
      :width: 4.72721in
      :height: 4.6604in

