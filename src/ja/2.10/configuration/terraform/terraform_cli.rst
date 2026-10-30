=============
Terraform CLI
=============


はじめに
========

| Exastro IT Automation（以下、ITAとも記載する）で Terraform CLI 連携機能 (以下、Terraform CLI driver) として運用する為のシステム構成と環境構築について説明します。
|
| Terraform CLI driver を利用するにあたっては、Exastro IT Automation がインストール済みであることが前提です。
| Exastro IT Automation のインストール方法に関しては、:doc:`../../installation/online/exastro/kubernetes` を参照してください。


システム構成
============
| Terraform CLI driver は Exastro IT Automation のデプロイ時に選択した場合にのみ提供されます。
|
| 以下に Terraform CLI におけるシステム構成イメージを記載します。


システム構成イメージ
--------------------

.. figure:: /images/ja/diagram/terraform_cli.png
    :alt: Terraform CLI システム構成イメージ
    :width: 800px

    Terraform CLI システム構成イメージ

.. list-table:: システム通信要件
   :widths: 1 1 1 2 3
   :header-rows: 1
   :align: left

   * - | 通信番号
       | ※1
     - FROM
     - TO
     - | プロトコル
       | (ポート番号※2)
     - 主な用途
   * - ①
     - | ITAサーバ
       | (Backyard機能)
     - | Terraform CLI
     - | -
     - | Backyard機能からTerraform コマンドの実行
   * - ②
     - | Terraform
     - 対象機器
     - | Any
       | (利用する Terraformプロバイダにより異なる)
     - Terraform から対象機器/クラウドサービスへのAPI 投入やコマンド実行

| ※1 Terraform CLIの構成イメージの番号と紐づく通信番号を記載。


システム要件
============

| Terraform CLI driver は Exastro IT Automation システムのシステム要件に準拠するため、:doc:`../../installation/online/exastro/kubernetes` を参照してください。
