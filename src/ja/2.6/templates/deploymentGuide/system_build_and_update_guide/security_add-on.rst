====================
セキュリティ付帯機能
====================

AWSリソースの確認
=================

1. AWS マネジメントコンソールにログインする

      | URL：https://xxxxxxxxxxxx.signin.aws.amazon.com/console
      | ユーザー名：1st-model-admin
      | パスワード：P@ssw0rd

2. | 「サービス > CloudFormation > スタック」へ移動する。
   | “aws-1st-model-01”でフィルターをかけて以下のスタックが作成されていないことを確認する

      | aws-1st-model-01-1-SecurityHub
      | aws-1st-model-01-2-Config
      | aws-1st-model-01-3-GuardDuty


Conductor実行
=============

1. ITAに「インフラ管理者」でログインする

   .. tip::
      | 実行者：インフラ管理者
      | ユーザー名：infra-admin
      | パスワード：password

2. メインメニューの「Conductor」アイコンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/security_add-on/security_add-on_conductor_01.png
      :width: 4.72721in
      :height: 4.6604in

3. | 「Conductor一覧」画面の「Conductor名称」が”セキュリティ付帯機能 / 構築・更新”のレコードの「詳細」ボタンを押下する。
   | フィルタの「Conductor名称」で検索すると間違いがない

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/security_add-on/security_add-on_conductor_02.png
      :width: 4.72721in
      :height: 4.6604in

4. 「Conductor編集/作業実行」画面の「作業実行」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/security_add-on/security_add-on_conductor_03.png
      :width: 4.72721in
      :height: 4.6604in

5. 「作業実行設定」ポップアップ画面の「オペレーション選択」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/security_add-on/security_add-on_conductor_04.png
      :width: 4.72721in
      :height: 4.6604in

6. 「オペレーション選択」ポップアップ画面の”環境A(1stモデル)”のレコードを選択して「選択決定」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/security_add-on/security_add-on_conductor_05.png
      :width: 4.72721in
      :height: 4.6604in

7. 「作業実行設定」ポップアップ画面の「作業実行」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/security_add-on/security_add-on_conductor_06.png
      :width: 4.72721in
      :height: 4.6604in

8. ステータスに「正常終了」が表示されることを確認する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/security_add-on/security_add-on_conductor_07.png
      :width: 4.72721in
      :height: 4.6604in


AWSリソースの確認(Conductor実行後)
==================================

1. AWS マネジメントコンソールにログインする
   
      | URL：https://xxxxxxxxxxxx.signin.aws.amazon.com/console
      | ユーザー名：1st-model-admin
      | パスワード：P@ssw0rd

2. | 「サービス > CloudFormation > スタック」へ移動する。
   | “aws-1st-model-01”でフィルターをかけて以下のスタックが作成されていることを確認する

      | aws-1st-model-01-1-SecurityHub
      | aws-1st-model-01-2-Config
      | aws-1st-model-01-3-GuardDuty


