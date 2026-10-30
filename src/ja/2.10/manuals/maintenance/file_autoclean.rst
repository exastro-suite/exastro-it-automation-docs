================
ファイル削除機能
================

はじめに
========

| 本書では、ITAにおける ファイル削除機能 について説明します。

ファイル削除機能の概要
======================

| ワークスペース内のストレージ上にある、ファイルの最終更新日を確認して、保存期間が過ぎているファイル、ディレクトリの削除を行います。
| サービスのファイル削除機能の対象は、自身のワークスペースのディレクトリを対象とします。
| ファイル削除の実行は、1日1回、00:01に実行されます。

ファイル削除管理のメニュー、画面構成
========================================

| 本章では、ファイル削除機能のメニュー 、画面構成について説明します。

メニュー/画面一覧
-----------------

#. | :menuselection:`ファイル削除機能` のメニュー
   | :menuselection:`ファイル削除機能` のメニュー一覧を以下に記述します。

.. list-table:: ファイル削除管理 メニュー/画面一覧
   :header-rows: 1
   :align: left

   * - No
     - メニューグループ
     - メニュー・画面
     - 説明
   * - 1
     - 管理コンソール
     - ファイル削除管理
     - | 保存期間切れのデータを削除する情報を管理します。


.. figure:: /images/ja/file_autoclean/file_delete_list_filter.png
   :alt: ファイル削除機能画面
   :width: 5.22863in
   :height: 0.99251in

   ファイル削除機能画面

.. list-table:: 初期設定値一覧
   :header-rows: 1
   :align: left

   * - 項番
     - 削除日数
     - 削除対象ディレクトリ
     - 削除対象ファイル
     - サブディレクトリ削除有無
     - 備考
   * - 1
     - 1
     - /tmp/
     - \*
     - False
     - Temporary directory for Workspace
   * - 2
     - 1
     - /tmp/driver/ansible/
     - \*
     - True
     - Temporary directory for Ansible
   * - 3
     - 1
     - /driver/ansible/git_repositories/
     - \*
     - True
     - Temporary directory for Ansible(Git)
   * - 4
     - 1
     - /tmp/driver/cicd/
     - \*
     - True
     - Temporary directory for CI/CD for IaC
   * - 5
     - 1
     - /tmp/driver/conductor/
     - \*
     - True
     - Temporary directory for Conductor
   * - 6
     - 1
     - /tmp/driver/terraform_cli/
     - \*
     - True
     - Temporary directory for Terraform-CLI
   * - 7
     - 1
     - /tmp/driver/terraform_cloud_ep/
     - \*
     - True
     - Temporary directory for Terraform-Cloud/EP
   * - 8
     - 1
     - /tmp/bulk_excel/import/import/
     - \*
     - True
     - Temporary directory for Export/Import
   * - 9
     - 1
     - /tmp/bulk_excel/import/upload/
     - \*
     - True
     - Temporary directory for Export/Import


.. figure:: /images/ja/file_autoclean/file_delete_list_edit.png
   :alt: ファイル削除登録画面
   :width: 5.22863in
   :height: 0.99251in

   ファイル削除登録画面


.. list-table:: 登録画面項目一覧
   :header-rows: 1
   :align: left

   * - | 項目
     - | 説明
     - | 入力必須
     - | 入力形式
     - | 制約事項
   * - 削除日数
     - | 対象ファイルのタイムスタンプが、指定した日数を経過していたら、ファイル削除を行います。
       | 数値のみ入力可です。
     - ○
     - 手動入力
     -
   * - 削除対象ディレクトリ
     - | 削除対象ファイルが格納されているディレクトリを設定します。
       | :file:`/storage/<<organization>>/<<workspace>>/` 配下のパスの場合は、
       | :file:`/storage/<<organization>>/<<workspace>>` から先のパスを記載します。
     - ○
     - 手動入力
     - 最大長1024バイト
   * - 削除対象ファイル
     - | 削除対象のファイル名を指定します。
       | ワイルドカードでの設定が可能です。
     - ○
     - 手動入力
     -
   * - サブディレクトリ削除有無
     - | 削除対象ディレクトリ直下のディレクトリも削除するかどうか設定します。
       | 「True」の場合、削除対象ディレクトリ直下のディレクトリの名前と最終更新日を確認して、削除対象であれば削除します。
     - ○
     - リスト選択
     -
