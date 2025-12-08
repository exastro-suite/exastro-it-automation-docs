==================
Terraform Cloud/EP
==================


はじめに
========

| Exastro IT Automation（以下、ITAとも記載する）で Terraform Cloud/Enterprise 連携機能 (以下、Terraform Cloud/EP driver) として運用する為のシステム構成と環境構築について説明します。
|
| Terraform Cloud/EP driver を利用するにあたっては、Exastro IT Automation がインストール済みであることが前提です。
| Exastro IT Automation のインストール方法に関しては、:doc:`../../installation/online/exastro/kubernetes` を参照してください。


システム構成
============

| Terraform Cloud/EP driver は Exastro IT Automation のデプロイ時に選択した場合にのみ提供されます。
|
| Terraform の利用については、ITA サーバとは別に Terraform Enterprise サーバか、クラウドサービスである Terraform Cloud を利用する必要があります。
| Terraform の自動構成の実行対象がクラウド上から直接通信できないオンプレミス上にある場合は、Terraform Cloud Agents を利用して投入する構成が考えられます。
|
| 以下に Terraform Cloud/EP におけるシステム構成イメージを記載します。


システム構成イメージ
--------------------

.. figure:: /images/ja/diagram/terraform_cloud_ep.png
    :alt: Terraform Cloud/EP システム構成イメージ
    :width: 800px

    Terraform Cloud/EP システム構成イメージ

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
       | (Web/AP機能)
     - | Terraform
       | ※3
     - | https
       | [443/tcp]
     - | ・ITA 画面での Organization/Workspace を Terraform 側への登録。
       | ・ITA 画面での Organization/Workspace/Policy/PolicySet の情報取得。
   * - ②
     - | ITAサーバ
       | (Backyard機能)
     - | Terraform
       | ※3
     - | https
       | [443/tcp]
     - | 作業実行時の Terraform へのPlan/PolicyCheck/Apply の実行および結果の取得。
   * - ③
     - | Terraform
       | ※3
     - 対象機器
     - | Any
       | (利用する Terraformプロバイダにより異なる)
     - Terraform から対象機器/クラウドサービスへのAPI 投入やコマンド実行
   * - ④-1
     - Terraform Cloud Agents
     - | Terraform
       | ※3
     - | https
       | [443/tcp]
     - Terraform Cloud Agent から Terraform 本体へAPI 通信を行う。
   * - ④-2
     - Terraform Cloud Agents
     - 対象機器
     - | Any
       | (利用する Terraformプロバイダにより異なる)
     - Terraform から対象機器/クラウドサービスへのAPI 投入やコマンド実行


| ※1 Terraform Cloud/EPの構成イメージの番号と紐づく通信番号を記載。
| ※2 ポート番号は標準的なポート番号を記載。
| ※3 本記載の Terraform は、Terraform Enterprise および Terraform Cloudを指します。


システム要件
============

| Terraform Cloud/EP driver は Exastro IT Automation システムのシステム要件に準拠するため、:doc:`../../installation/online/exastro/kubernetes` を参照してください。
| ここではTerraform Enterprise および Terraform Cloudのシステム要件を記載します。

.. list-table:: Terraform 動作確認済みバージョン
   :widths: 1 1 2
   :header-rows: 1
   :align: left

   * - | システム
     - | Terraformバージョン
     - | 注意事項
   * - | Terraform Enterprise
     - | ・1.4.6
       | ・1.1.0
     - |
   * - | Terraform Cloud
     - | ・1.4.6
       | ・1.4.0
     - |


.. _configuration_terraform_cloud_ep_initial_setting:

初期設定
========

| Terraform Cloud/EP driver から Terraform に連携するために、Terraform からユーザトークンを発行する必要があります。
| ブラウザより、Terraform にログインし [User Settings] > [Tokens] > [Create an API token]の順に押下することで発行されます。


.. figure:: /images/ja/terraform_cloud_ep_driver/common/create_user_token.png
    :alt: ユーザトークン発行
    :width: 800px

    ユーザトークン発行

| 発行されたユーザトークンは Exastro IT Automation システムに登録する必要があります。
| マニュアル「:doc:`../../manuals/terraform_driver/terraform_cloud_ep` -> :ref:`terraform_cloud_ep_interface_information`」 を参照し、登録を行ってください。
