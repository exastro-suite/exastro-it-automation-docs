=========
AWS管理者
=========

AWSリソースの確認
=================

1. AWS マネジメントコンソールにログインする
   
      | URL：https://xxxxxxxxxxxx.signin.aws.amazon.com/console
      | ユーザー名：1st-model-admin
      | パスワード：P@ssw0rd

2. | 「サービス > CloudFormation > スタック」へ移動する。
   | “aws-1st-model-01”でフィルターをかけて以下のスタックが作成されていないことを確認する

      | aws-1st-model-01-Create-User-aws-admin
      | aws-1st-model-01-Create-User-aws-admin-sub

3. | 「サービス > IAM > ユーザー」へ移動する。
   | “aws-admin”でフィルターをかけて以下のユーザーが作成されていないことを確認する

      | aws-admin
      | aws-admin-sub


Conductor実行
=============

1. ITAに「1stモデル管理者」でログインする

   .. tip::
      | 実行者：1stモデル管理者
      | ユーザー名：ita-1st-admin
      | パスワード：password

2. メインメニューの「Conductor」アイコンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin/admin_conductor_01.png
      :width: 4.72721in
      :height: 4.6604in

3. | 「Conductor一覧」画面の「Conductor名称」が”AWS管理者(IAMユーザー,ITAユーザー)の作成”のレコードの「詳細」ボタンを押下する。
   | フィルタの「Conductor名称」で検索すると間違いがない

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin/admin_conductor_02.png
      :width: 4.72721in
      :height: 4.6604in

4. 「Conductor編集/作業実行」画面の「作業実行」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin/admin_conductor_03.png
      :width: 4.72721in
      :height: 4.6604in

5. 「作業実行設定」ポップアップ画面の「オペレーション選択」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin/admin_conductor_04.png
      :width: 4.72721in
      :height: 4.6604in

6. 「オペレーション選択」ポップアップ画面の”共通オペレーション”のレコードを選択して「選択決定」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin/admin_conductor_05.png
      :width: 4.72721in
      :height: 4.6604in

7. 「作業実行設定」ポップアップ画面の「作業実行」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin/admin_conductor_06.png
      :width: 4.72721in
      :height: 4.6604in

8. ステータスに「正常終了」が表示されることを確認する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin/admin_conductor_07.png
      :width: 4.72721in
      :height: 4.6604in


.. _aws_admin_aws_resource_check_after_conductor:

AWSリソースの確認(Conductor実行後)
==================================

1. AWS マネジメントコンソールにログインする
   
      | URL：https://xxxxxxxxxxxx.signin.aws.amazon.com/console
      | ユーザー名：1st-model-admin
      | パスワード：P@ssw0rd

2. | 「サービス > CloudFormation > スタック」へ移動する。
   | “aws-1st-model-01”でフィルターをかけて以下のスタックが作成されていることを確認する

      | aws-1st-model-01-Create-User-aws-admin
      | aws-1st-model-01-Create-User-aws-admin-sub

3. | 「サービス > IAM > ユーザー」へ移動する。
   | “aws-admin”でフィルターをかけて以下のユーザーが作成されていることを確認する

      | aws-admin
      | aws-admin-sub

   | “aws-admin”を選択してアクセスキーを作成する

      | 作成したアクセスキー、シークレットアクセスキーをメモしておく（※1）


AWS認証情報管理の設定
=====================

1. ITAに「AWS管理者」でログインする
   
   .. tip::
      | 実行者：AWS管理者
      | ユーザー名：aws-admin
      | パスワード：password

2. メインメニューの「AWS認証情報管理」アイコンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin/admin_authentication_infomation_settings_01.png
      :width: 4.72721in
      :height: 4.6604in

3. 「AWS管理者【認証】」へ移動して「フィルタ」ボタンを押下する

4. 全てのレコードをチェックして「編集」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin/admin_authentication_infomation_settings_02.png
      :width: 4.72721in
      :height: 4.6604in

5. 全てのレコードの「アクセスキーID」「シークレットアクセスキー」に「:ref:`aws_admin_aws_resource_check_after_conductor`」の（※1）でメモしたアクセスキー、シークレットアクセスキーを入力して「編集確認」ボタンを押下する。

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin/admin_authentication_infomation_settings_03.png
      :width: 4.72721in
      :height: 4.6604in

6. 「編集確認」ポップアップ画面の「編集反映」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin/admin_authentication_infomation_settings_04.png
      :width: 4.72721in
      :height: 4.6604in


MS Teams ワークフローのWebhookを取得
====================================

.. note::
   | TeamsのIncoming Webhookは廃止されました。
   | Teamsへ通知する場合は、Teamsのワークフローで発行したWebhook URLを設定して下さい。

| Teams通知機能を使用しない場合、本手順の実施は不要です。
| 以下の手順はTeamsアプリケーション内で実施します。
| 例として「Webhook アラートを チャネル に送信する」テンプレートを選択した場合を説明します。

1. Teamsのサイドメニューから「…（その他のアプリを表示する）」>「ワークフロー」を選択する

2. テンプレート「Webhook アラートを チャネル に送信する」を選択し、送信先のチーム・チャネルを指定して「保存」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin/ms_teams_workflow_webhook_setting.png
      :width: 4.72721in

3. 「Webhook リンクをコピー」を押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin/ms_teams_workflow_webhook_link.png
      :width: 4.72721in

4. 各オペレーションで通知先が違う場合それぞれのMS Teams Webhookを取得する



   | 参考URL(受信 Webhook を使用して Teams でメッセージを送信する)：
   | https://support.microsoft.com/ja-jp/workflows/send-messages-in-teams-using-incoming-webhooks


MS Teamsメニューの更新
======================

Teams通知機能を使用しない場合、本手順の実施は不要です。

1. ITAに「AWS管理者」でログインする
   
   .. tip::
      | 実行者：AWS管理者
      | ユーザー名：aws-admin
      | パスワード：password

2. メインメニューの「通知先管理」アイコンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin/ms_teams_menu_update_01.png
      :width: 4.72721in
      :height: 4.6604in

3. 「MS Teams」へ移動して「フィルタ」ボタンを押下する
4. Teams通知を行う「オペレーション名」のレコードをチェックして「編集」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin/ms_teams_menu_update_02.png
      :width: 4.72721in
      :height: 4.6604in

5. 各オペレーションのレコードの「Webhook」にそれぞれのTeamsで取得したWebhookを入力して「編集確認」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin/ms_teams_menu_update_03.png
      :width: 4.72721in
      :height: 4.6604in

6. 「編集確認」ポップアップ画面の「編集反映」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/AWS_admin/ms_teams_menu_update_04.png
      :width: 4.72721in
      :height: 4.6604in



