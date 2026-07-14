===========
AWS環境設定
===========

.. _aws_environment_configuration:

AWS環境設定
===========

-  オートスケールWebシステム構築に必要な以下の①～③の設定をAWS管理コンソールで実施する
-  ①～③の設定はオートスケールWebシステムを構築するリージョンで実施する
-  取得した設定情報はITAに登録するため控えておく


オートスケールWebシステム構築のためのAWS環境設定項目
----------------------------------------------------

①AMI(Amazonマシンイメージ)の登録
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- | EC2 > イメージ > AMI に使用するAMIイメージを登録し、「AMI ID」を取得する。
  | (参考)AMI(https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/AMIs.html)

②キーペアの作成
^^^^^^^^^^^^^^^^

- | EC2 > ネットワーク&セキュリティ > キーペアの「キーペアを作成」からキーを作成し
  | 「踏み台サーバ」「Webサーバ」で使用する「キーペアファイル（.pem）」と「キーペア名」を取得する。
  | (参考)キーペア(https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/ec2-key-pairs.html)

③ELB用のSSL証明書の登録
^^^^^^^^^^^^^^^^^^^^^^^^

- | Certificate Manager に証明書を登録し「ARN(Amazonリソースネーム)」を取得する。
  | (参考)Cerrificate Manager(https://aws.amazon.com/jp/certificate-manager/)




