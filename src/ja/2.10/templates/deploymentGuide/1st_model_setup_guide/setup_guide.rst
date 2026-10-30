========
導入準備
========

導入サーバの準備
================

| ITAをインストールするサーバ(物理/仮想)を用意します。
| また本サーバはAWSと接続(http/https)できる環境を用意してください。

| 構築ガイドは以下を参照ください。
| https://ita-docs.exastro.org/ja/2.4/configuration/index.html [構成・構築ガイド]

| サーバ動作要件は以下のドキュメントの各インストール方法の [前提条件]を参照ください。
| https://ita-docs.exastro.org/ja/2.4/installation/index.html [インストール]


ITAをインストール
=================

| ITAバージョンは2.4.2をインストールしてください。

| インストール手順は以下ドキュメントを参照ください。
| https://ita-docs.exastro.org/ja/2.4/installation/index.html [インストール]


Dockerファイルの修正
====================

| ITAをインストールしたサーバーにSSH等で接続し以下のファイルの赤枠部分のコードを追加してサーバーを再起動してください。
| ファイルパス：~/exastro-docker-compose/ita_by_ansible_execute/templates/work/Dockerfile

.. code-block:: bash

   ARG ANSIBLE_AGENT_IMAGE
   ARG ANSIBLE_AGENT_IMAGE_TAG

   FROM ${ANSIBLE_AGENT_IMAGE}:${ANSIBLE_AGENT_IMAGE_TAG}

   ## Add module command bellow, if you need to use extend ansible module.

   # Example:
   # RUN ansible-galaxy collection install amazon.aws \
   #  &&  pip3.9 install --upgrade boto3 botocore

   # RUN ansible-galaxy collection install servicenow.servicenow \
   #  &&  pip3.9 install --upgrade pysnow

   RUN ansible-galaxy collection install community.vmware \
    && pip3.9 install --upgrade pyvmomi

   # 以下追加するコード
   USER 0

   RUN dnf -y install sudo

   RUN dnf -y install nmap-ncat

   RUN USERNAME=$(getent passwd 1000 | cut -d: -f1) && echo "$USERNAME       ALL=(ALL)       NOPASSWD: ALL" >> /etc/sudoers

   USER 1000


AWS環境の準備
=============

- 「1stモデル管理者」が使用するAWSアカウントを用意する
- 「1stモデル管理者」として使用するIAMユーザーを準備する
- 上記のIAMユーザーにCloudFormationFullAccess、IAMFullAccess権限を付与する
- 上記IAMユーザーの「アクセスキーID」「シークレットキー」を作成して保管しておく (後ほどITAに登録)

【参考】 IAMユーザーの認証情報の作成手順概要
============================================
1. AWSマネジメントコンソールにて実施します。

2. IAM ＞ ユーザー ＞「IAMユーザー準備」で用意したユーザー名を押下します。

3. 認証情報 ＞ アクセスキーIDを作成を押下します

4. アクセスキーIDとシークレットアクセスキーを取得する。

   .. figure:: /images/ja/templates/deploymentGuide/1st_model_setup_guide/setup_guide/IAMuser_create_guide.png
      :width: 4.72721in
      :height: 4.6604in
