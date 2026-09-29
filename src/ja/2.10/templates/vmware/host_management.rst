==============
ホスト管理
==============

はじめに
============
| 本書では、Exastro IT Automation（以下、ITA）におけるホスト管理の機能および操作方法について説明します。
| ※本機能は、1つのvCenterホストに対して1クラスタ構成を前提としています。

メニュー項目
============

.. _host_resource_check:

ホストリソース確認
~~~~~~~~~~~~~~~~~~~~~~
| vCenter内のクラスター内に存在するESXiのリソースを表示するためのメニュー項目です。
| 「ホスト情報取得先」で設定したホストをもとに、「ホストリソース確認」のMovementを実行すると、本メニューに自動登録されます。

.. figure:: /images/ja/templates/vmware/host_management/hostresouce_check_v2_5.png
   :width: 800px
   :alt: ホストリソース確認メニュー画面

.. list-table:: メニュー項目一覧（ホストリソース確認）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * - | 項目
     - | 説明
     - | 入力必須
     - | 入力方法
     - | 制約事項
   * - | vCenterクラスター名
     - | vCenter内のクラスター名を管理します。
     - | 〇
     - | 自動入力
     - | Movement実行により自動登録
   * - | ESXi名
     - | vCenter内の各ESXiを管理します。
     - | 〇
     - | 自動入力
     - | Movement実行により自動登録
   * - | メモリ現在(GB)
     - | 現在のメモリ容量をGBで管理します。
     - | 〇
     - | 自動入力
     - | Movement実行により自動登録
   * - | メモリ最大(GB)
     - | 最大のメモリ容量をGBで管理します。
     - | 〇
     - | 自動入力
     - | Movement実行により自動登録
   * - | メモリ残容量(GB)
     - | メモリ残容量をGBで管理します。
     - | 〇
     - | 自動入力
     - | Movement実行により自動登録
   * - | CPU現在(コア数)
     - | 現在のCPUをコア数で管理します。
     - | 〇
     - | 自動入力
     - | Movement実行により自動登録
   * - | CPU最大(コア数)
     - | 最大のCPUをコア数で管理します。
     - | 〇
     - | 自動入力
     - | Movement実行により自動登録
   * - | オーバーコミット率(%)
     - | CPUのオーバーコミット率を%で管理します。
     - | 〇
     - | 自動入力
     - | Movement実行により自動登録
   * - | ディスク現在(GB)
     - | 現在のディスク容量をGBで管理します。
     - | 〇
     - | 自動入力
     - | Movement実行により自動登録
   * - | ディスク最大(GB)
     - | 最大のディスク容量をGBで管理します。
     - | 〇
     - | 自動入力
     - | Movement実行により自動登録
   * - | ディスク残容量(GB)
     - | ディスク残容量をGBで管理します。
     - | 〇
     - | 自動入力
     - | Movement実行により自動登録

.. _host_information_source:

ホスト情報取得先
~~~~~~~~~~~~~~~~~~
| リソースの取得先を登録するためのメニュー項目です。
| この情報をもとに、「ホストリソース確認」のMovementを実行することで、ESXiのリソース情報が自動的に取得・登録されます。
| ※ホスト名は「localhost」を設定してください。

.. figure:: /images/ja/templates/vmware/host_management/host_souce_v2_5.png
   :width: 800px
   :alt: ホスト情報取得先メニュー画面

.. list-table:: メニュー項目一覧（ホスト情報取得先）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * - | 項目
     - | 説明
     - | 入力必須
     - | 入力方法
     - | 制約事項
   * - | vCenterホスト名
     - | vCenterに接続するホスト名を選択します。
     - | 〇
     - | リスト選択
     - | ー


利用手順(ホストリソース確認)
====================================

#. | **vCenter接続情報を登録**
   | :menuselection:`VMware --> クラスタ管理 --> vCenter Server(マスタ)` から、接続先vCenterの情報を登録します。
   | 詳細は「 :ref:`vcenter_server_master` 」を参照してください。

#. | **グローバル変数管理の編集**
   | :menuselection:`Ansible共通 --> グローバル変数管理` から、対象のグローバル変数に具体値を設定します。
   | 詳細は「 :ref:`ansible_common_global_variable_list` 」を参照してください。

   .. figure:: /images/ja/templates/vmware/global_variable_list_v2-4.png
        :alt: グローバル変数の編集画面
        :align: left
        :width: 800px

#. | **ホスト情報先登録**
   | :menuselection:`ホスト情報取得先` よりホスト情報取得先を登録します。

#. | **Conductorの選択**

   | 4-1 メインメニューから :menuselection:`Conductor` メニューを選択します。

   .. figure:: /images/ja/templates/vmware/mainmenu/conductor_mainmenuv2_5.png
      :width: 800px
      :alt: メインメニュー画面

   | 4-2 :menuselection:`Conductor一覧` メニューを選択します。

   | 4-3 :menuselection:`ホストリソース確認` の詳細ボタンを押下します。

   .. figure:: /images/ja/templates/vmware/mainmenu/conductorlist_v2_5.png
      :width: 800px
      :alt: Conductor一覧画面

#. | **Conductorの実行**

   | 5-1 作業実行ボタンを押下します。

   .. figure:: /images/ja/templates/vmware/mainmenu/conductor_execute_resoucev2_5.png
      :width: 800px
      :alt: Conductorリソース管理画面

   | 5-2 オペレーション選択ボタンより、ホストリソース確認を実行するオペレーションを選択します。


   | 5-3 作業実行ボタンより、ホストリソース確認の作業を実行します。

   .. figure:: /images/ja/templates/vmware/mainmenu/conductor_execute2_resoucev2_5.png
      :width: 800px
      :alt: Conductorリソース管理画面

#. | **ホストリソースの確認**
   |  :menuselection:`ホストリソース確認` より対象のホストのリソースを確認することができます。

.. note::
   | ホストリソース確認メニューはMovement実行により登録されるため、原則手動でのメンテナンスは実施しないようにしてください。
