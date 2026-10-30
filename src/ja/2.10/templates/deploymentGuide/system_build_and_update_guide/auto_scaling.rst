=========================
オートスケールWebシステム
=========================

AWSリソースの確認
=================

1. AWS マネジメントコンソールにログインする

      | URL：https://xxxxxxxxxxxx.signin.aws.amazon.com/console
      | ユーザー名：1st-model-admin
      | パスワード：P@ssw0rd

2. | 「サービス > CloudFormation > スタック」へ移動する。
   | “aws-1st-model-01”でフィルターをかけて以下のスタックが作成されていないことを確認する

      | aws-1st-model-01-1-KMS
      | aws-1st-model-01-2-S3
      | aws-1st-model-01-3-SNS
      | aws-1st-model-01-4-CloudTrail
      | aws-1st-model-01-5-Network
      | aws-1st-model-01-6-SecurityGroup
      | aws-1st-model-01-7-Bastion
      | aws-1st-model-01-8-AutoScale
      | aws-1st-model-01-9-VPCflowlogs
      | aws-1st-model-01-11-CloudWatchAlarm
      | aws-1st-model-01-12-WAF
      | aws-1st-model-01-13-Metricsfilter

3. | 「サービス > EC2 > インスタンス」へ移動する。
   | “aws-1st-model-01”でフィルターをかけて以下のEC2インスタンスが作成されていないことを確認する

      | ec2-aws-1st-model-01-bas-001
      | ec2-aws-1st-model-01-web（4台）

4. 必要に応じて以下のリソースが作成されていないことも確認する。
   
   - VPC

      | vpc-aws-1st-model-01-001

   - サブネット

      | sub-aws-1st-model-01-public-001
      | sub-aws-1st-model-01-private-001
      | sub-aws-1st-model-01-private-002

   - セキュリティグループ

      | sgp-aws-1st-model-01-elb-001
      | sgp-aws-1st-model-01-scl-001
      | sgp-aws-1st-model-01-bas-001
      | aws-1st-model-01-Dev-BastionSecurityGroup
      | aws-1st-model-01-Dev-ELBSecurityGroup
      | aws-1st-model-01-Dev-ScaleoutSecurityGroup


Conductor実行
=============

1. ITAに「インフラ管理者」でログインする

   .. tip::
      | 実行者：インフラ管理者
      | ユーザー名：infra-admin
      | パスワード：password

2. メインメニューの「Conductor」アイコンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/auto_scaling/auto_scaling_conductor_01.png
      :width: 4.72721in
      :height: 4.6604in

3. | 「Conductor一覧」画面の「Conductor名称」が”オートスケールWebシステム / 構築・更新”のレコードの「詳細」ボタンを押下する。
   | フィルタの「Conductor名称」で検索すると間違いがない

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/auto_scaling/auto_scaling_conductor_02.png
      :width: 4.72721in
      :height: 4.6604in

4. 「Conductor編集/作業実行」画面の「作業実行」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/auto_scaling/auto_scaling_conductor_03.png
      :width: 4.72721in
      :height: 4.6604in

5. 「作業実行設定」ポップアップ画面の「オペレーション選択」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/auto_scaling/auto_scaling_conductor_04.png
      :width: 4.72721in
      :height: 4.6604in

6. 「オペレーション選択」ポップアップ画面の”環境A(1stモデル)”のレコードを選択して「選択決定」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/auto_scaling/auto_scaling_conductor_05.png
      :width: 4.72721in
      :height: 4.6604in

7. 「作業実行設定」ポップアップ画面の「作業実行」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/auto_scaling/auto_scaling_conductor_06.png
      :width: 4.72721in
      :height: 4.6604in

8. ステータスに「正常終了」が表示されることを確認する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/auto_scaling/auto_scaling_conductor_07.png
      :width: 4.72721in
      :height: 4.6604in


.. _auto_scaling_aws_resource_check_after_conductor:

AWSリソースの確認(Conductor実行後)
==================================

1. AWS マネジメントコンソールにログインする

      | URL：https://xxxxxxxxxxxx.signin.aws.amazon.com/console
      | ユーザー名：1st-model-admin
      | パスワード：P@ssw0rd

2. | 「サービス > CloudFormation > スタック」へ移動する。
   | “aws-1st-model-01”でフィルターをかけて以下のスタックが作成されていることを確認する

      | aws-1st-model-01-1-KMS
      | aws-1st-model-01-2-S3
      | aws-1st-model-01-3-SNS
      | aws-1st-model-01-4-CloudTrail
      | aws-1st-model-01-5-Network
      | aws-1st-model-01-6-SecurityGroup
      | aws-1st-model-01-7-Bastion
      | aws-1st-model-01-8-AutoScale
      | aws-1st-model-01-9-VPCflowlogs
      | aws-1st-model-01-11-CloudWatchAlarm
      | aws-1st-model-01-12-WAF
      | aws-1st-model-01-13-Metricsfilter

3. | 「サービス > EC2 > インスタンス」へ移動する。
   | “aws-1st-model-01”でフィルターをかけて以下のEC2インスタンスが作成されていることを確認する

      | ec2-aws-1st-model-01-bas-001
      | ec2-aws-1st-model-01-web（4台）

4. 必要に応じて以下のリソースも確認する。

   - VPC

      | vpc-aws-1st-model-01-001

   - サブネット

      | sub-aws-1st-model-01-public-001
      | sub-aws-1st-model-01-private-001
      | sub-aws-1st-model-01-private-002

   - セキュリティグループ

      | sgp-aws-1st-model-01-elb-001
      | sgp-aws-1st-model-01-scl-001
      | sgp-aws-1st-model-01-bas-001
      | aws-1st-model-01-Dev-BastionSecurityGroup
      | aws-1st-model-01-Dev-ELBSecurityGroup
      | aws-1st-model-01-Dev-ScaleoutSecurityGroup

5. | 「サービス > EC2 > ロードバランサー」へ移動する。
   | “aws-1st-model-01”でフィルターをかけて以下のロードバランサーが作成されていることを確認する

      | elb-aws-1st-model-01

   | “elb-aws-1st-model-01”の「DNS名」をメモしておく（※3）


Webページの確認
===============

1. ブラウザのアドレスバーに「:ref:`auto_scaling_aws_resource_check_after_conductor`」の（※3）でメモしたELB DNS名を張り付けてEnterキーを押下する

2. 下図の画面が表示されることを確認する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/auto_scaling/auto_scaling_web_page.png
      :width: 4.72721in
      :height: 4.6604in
