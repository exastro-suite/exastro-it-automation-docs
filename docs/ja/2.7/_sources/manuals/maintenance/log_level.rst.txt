.. _log_level:

==========
ログレベル
==========

はじめに
========

| 本書では、ITAにおける ログレベル について説明します。
| ログレベルの設定はシステム管理者のみ可能です（オーガナイゼーションユーザーからはアクセス出来ません）。

ログレベルとは
==============

| ITAの各サービスのログレベルを管理するためのものです。
| 指定したサービスに対して、ログレベルを変更することができます。
| サービスのログレベルは、全オーガナイゼーション、ワークスペースで共通です。

.. _ita_log_level_list:

ログレベルの設定値と出力について
--------------------------------

.. list-table:: ログレベルの設定値と出力について
    :header-rows: 1
    :align: left

    * - サービスのログレベルの設定値
      - ログに出力される対象
    * - INFO
      - | INFO
        | ERROR
    * - DEBUG
      - | INFO
        | ERROR
        | DEBUG

.. note:: インストール直後は、INFOで設定されています。

.. _ita_service_list:

ログレベル変更可能なサービス一覧
--------------------------------

| ログレベル変更可能なサービスの一覧は、以下です。

.. list-table:: サービス一覧
   :header-rows: 1
   :align: left

   * - サービス名
     - 機能概要
   * - ita-api-admin
     - ITA管理者機能API
   * - ita-api-organization
     - ITA利用者用API
   * - ita-by-ansible-execute
     - Ansible作業実行
   * - ita-by-ansible-legacy-role-vars-listup
     - Ansible-LegacyRole変数刈取
   * - ita-by-ansible-legacy-vars-listup
     - Ansible-Legacy変数刈取
   * - ita-by-ansible-pioneer-vars-listup
     - Ansible-Pionner変数刈取
   * - ita-by-ansible-towermaster-sync
     - Ansible Automation controller同期
   * - ita-by-cicd-for-iac
     - CI/CD実行
   * - ita-by-collector
     - 収集
   * - ita-by-conductor-regularly
     - Conductor定期作業実行
   * - ita-by-conductor-synchronize
     - Conductor作業実行
   * - ita-by-excel-export-import
     - Excel一括エクスポート・インポート実行
   * - ita-by-execinstance-dataautoclean
     - オペレーション削除
   * - ita-by-file-autoclean
     - ファイル削除
   * - ita-by-hostgroup-split
     - ホストグループ分割処理
   * - ita-by-menu-create
     - パラメータシート作成
   * - ita-by-menu-export-import
     - メニューエクスポート・インポート実行
   * - ita-by-terraform-cli-execute
     - Terraform-CLI作業実行
   * - ita-by-terraform-cli-vars-listup
     - Terraform-CLI変数刈取
   * - ita-by-terraform-cloud-ep-execute
     - Terraform-Cloud/EP作業実行
   * - ita-by-terraform-cloud-ep-vars-listup
     - Terraform-Cloud/EP変数刈取
   * - ita-api-oase-receiver
     - OASE利用者用API
   * - ita-by-oase-conclusion
     - OASE評価機能


ログレベル設定確認、設定手順
============================

..  include:: ../../include/setting_running_state_loglevel.rst
