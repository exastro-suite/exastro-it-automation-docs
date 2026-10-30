======================
オペレーション削除管理
======================

はじめに
========

| 本書では、ITAにおける　オペレーション削除管理　について説明します。

オペレーション削除機能の概要
============================

| :menuselection:`基本コンソール --> オペレーション一覧` に登録されているオペレーションの実施予定日に紐づくデータを、指定した「論理削除日数」と「物理削除日数」に基づき削除する設定を行います。
| 「論理削除日数」を過ぎた場合は廃止、「物理削除日数」を過ぎた場合はデータベースから削除し、そのデータに紐づくファイルも削除します。
| オペレーション削除の実行は、1日1回、00:02に実行されます。

オペレーション削除機能のメニュー、画面構成
==========================================

| 本章では、オペレーション削除管理のメニュー、画面構成について説明します。

メニュー/画面一覧
-----------------

#. | :menuselection:`オペレーション削除機能` のメニュー
   | :menuselection:`オペレーション削除機能` のメニュー一覧を以下に記述します。

.. list-table:: オペレーション削除管理 メニュー/画面一覧
   :header-rows: 1
   :align: left

   * - No
     - メニューグループ
     - メニュー・画面
     - 説明
   * - 1
     - 管理コンソール
     - オペレーション削除管理
     - オペレーションが保存期間切れのデータを削除する情報をメンテナンス(閲覧/登録/更新/廃止)出来ます。


.. figure:: /images/ja/operation_autoclean/operation_autoclean_list_filter.png
   :width: 5.22863in
   :height: 0.99251in
   :alt: オペレーション削除機能画面

   オペレーション削除機能画面

.. list-table:: 初期設定値一覧
   :header-rows: 1
   :align: left

   * - 項番
     - 論理削除日数
     - 物理削除日数
     - メニューグループ:メニュー名
     - データストレージパス
   * - 1
     - 3600
     - 7200
     - Ansible-Legacy:作業対象ホスト
     -
   * - 2
     - 3600
     - 7200
     - Ansible-Legacy:代入値管理
     -
   * - 3
     - 3600
     - 7200
     - Ansible-Legacy:作業管理
     - /driver/ansible/legacy
   * - 4
     - 3600
     - 7200
     - Ansible-Pioneer:作業対象ホスト
     -
   * - 5
     - 3600
     - 7200
     - Ansible-Pioneer:代入値管理
     -
   * - 6
     - 3600
     - 7200
     - Ansible-Pioneer:作業管理
     - /driver/ansible/pioneer
   * - 7
     - 3600
     - 7200
     - Ansible-LegacyRole:作業対象ホスト
     -
   * - 8
     - 3600
     - 7200
     - Ansible-LegacyRole:代入値管理
     -
   * - 9
     - 3600
     - 7200
     - Ansible-LegacyRole:作業管理
     - /driver/ansible/legacy_role
   * - 10
     - 3600
     - 7200
     - Conductor:Conductorインスタンス一覧
     - /driver/conductor
   * - 11
     - 3600
     - 7200
     - Conductor:ConductorNodeインスタンス一覧
     -
   * - 12
     - 3600
     - 7200
     - Terraform-Cloud/EP:作業管理
     - /driver/terraform_cloud_ep/execute

   * - 13
     - 3600
     - 7200
     - Terraform-Cloud/EP:代入値管理
     -
   * - 14
     - 3600
     - 7200
     - Terraform-CLI:作業管理
     - /driver/terraform_cli/execute
   * - 15
     - 3600
     - 7200
     - Terraform-CLI:代入値管理
     -
   * - 16
     - 3610
     - 7210
     - 基本コンソール:オペレーション一覧
     -
   * - 17
     - 3600
     - 7200
     - ルール:評価結果
     -


.. figure:: /images/ja/operation_autoclean/operation_autoclean_list_edit.png
   :width: 5.22863in
   :height: 0.99251in
   :alt: オペレーション削除機能編集画面

   オペレーション削除機能編集画面


.. list-table:: 登録画面項目一覧
   :widths: 10 50 10 10 30
   :header-rows: 1
   :align: left

   * - 項目
     - 説明
     - 入力必須
     - 入力形式
     - 制約事項
   * - 論理削除日数
     - マシン日時を基準にして、オペレーションの実施予定日が指定した日数を経過していたら、論理削除（廃止）を行います。
     - 〇
     - 手動入力
     - 数値のみ
   * - 物理削除日数
     - マシン日時を基準にして、オペレーションの実施予定日が指定した日数を経過していたら、①データベースから、履歴を含めた対象レコードの物理削除と②データストレージパスにある、対象レコードに紐づくファイルの削除、を行います。
     - 〇
     - 手動入力
     - 数値のみ
   * - メニューグループ：メニュー名
     - :menuselection:`管理コンソール --> メニュー管理` 内「メニューグループ」:「メニュー名」に登録されているメニューが反映されます。
     - 〇
     - リスト選択
     - オペレーションを持っていないメニューは選択可能ですが削除対象にはなりません。
   * - データストレージパス
     - | データストレージパスで管理しているファイルがある場合、そのパスを入力します。
       | /storage/<<organization>>/<<workspace>>/配下の相対パスを記載します。
       | exp)
       | Ansible Legacy
       | /driver/ansible/legacy
       | Ansible pioneer
       | /driver/ansible/pioneer
       |
       | 実際に削除される対象は/storage/<<organization>>/<<workspace>>/<<データストレージパス>>/<<一意項目（ID、No等）>>となります。
     -
     - 手動入力
     -
   * - 備考
     - 自由記述欄。レコードの廃止・復活時にも記載可能。
     -
     - 手動入力
     -
