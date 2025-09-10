===================
仮想マシン管理
===================

はじめに
============
| 本書では、Exastro IT Automation（以下、ITA）における仮想マシンを作成する機能と操作手順について説明します。

メニュー項目
============

.. _vmware_vmcreate:

仮想マシン
~~~~~~~~~~~~~~~~~~~~~~
| 仮想マシン作成を行うための中心的なメニューです。本メニューで登録された情報に基づいて仮想マシンが作成されます。
| ※ホスト名は「localhost」を設定してください。仮想マシンはオペレーション単位で管理をしてください。

.. figure:: /images/ja/templates/vmware/vm_management/vm_v2_5.png
   :width: 800px
   :alt: 仮想マシンメニュー画面


.. list-table:: メニュー項目一覧（仮想マシン作成）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * -  項目
     -  説明
     -  入力必須
     -  入力方法
     -  制約事項
   * -  仮想マシン
     -  vCenter内に作成される仮想マシンの表示名を選択します。
     -  〇
     -  リスト選択
     -  ー
   * -  テンプレート
     -  作成する仮想マシンのテンプレート名を選択します。
     -  〇
     -  リスト選択
     -  ー
   * -  IPアドレス
     -  作成する仮想マシンに割り当てるIPアドレスを選択します。
     -  〇
     -  リスト選択
     -  ー
   * -  vCenterホスト名
     -  接続対象のvCenterのホスト名を選択します。
     -  〇
     -  リスト選択
     -  ー
   * -  データストア
     -  vCenter内で使用するデータストア名を選択します。
     -  〇
     -  リスト選択
     -  ー
   * -  フォルダ
     -  作成する仮想マシンを格納するフォルダ名を選択します。
     -  〇
     -  リスト選択
     -  ー
   * -  CPU
     -  作成する仮想マシンのCPU数を選択します。
     -  〇
     -  リスト選択
     -  ー
   * -  メモリ
     -  作成する仮想マシンのメモリ容量(MB)を選択します。
     -  〇
     -  リスト選択
     -  ー
   * -  ディスク
     -  作成する仮想マシンのディスク容量(GB)を選択します。
     -  〇
     -  リスト選択
     -  ー

.. _vmware_vmcreate_master:

仮想マシン(マスタ)
~~~~~~~~~~~~~~~~~~~~~~
| 仮想マシン作成時に使用する仮想マシン名を登録します。

.. figure:: /images/ja/templates/vmware/vm_management/vm_master_v2_5.png
   :width: 800px
   :alt: 仮想マシン(マスタ)メニュー画面

.. list-table:: メニュー項目一覧（仮想マシン(マスタ)）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * - | 項目
     - | 説明
     - | 入力必須
     - | 入力方法
     - | 制約事項
   * - | 仮想マシン名
     - | vCenter内に作成される仮想マシンの表示名を登録します。
     - | 〇
     - | 手動入力
     - | 最大長64バイト

.. _vmware_template_master:

テンプレート(マスタ)
~~~~~~~~~~~~~~~~~~~~~~
| 仮想マシン作成時に使用するテンプレート情報を登録します。

.. figure:: /images/ja/templates/vmware/vm_management/template_master_v2_5.png
   :width: 800px
   :alt: テンプレート(マスタ)メニュー画面

.. list-table:: メニュー項目一覧（テンプレート(マスタ)）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * - | 項目
     - | 説明
     - | 入力必須
     - | 入力方法
     - | 制約事項
   * - | テンプレート名
     - | 作成する仮想マシンのテンプレート名を入力します。
     - | 〇
     - | 手動入力
     - | 最大長128バイト
   * - | ユーザー
     - | 設定したテンプレートにログインするユーザー名を入力します。
     - | 〇
     - | 手動入力
     - | 最大長32バイト
   * - | パスワード
     - | 設定したテンプレートにログインするパスワードを入力します。
     - | 〇
     - | 手動入力
     - | パスワード形式
       | 最大長32バイト

.. _vmware_datastore_master:

データストア(マスタ)
~~~~~~~~~~~~~~~~~~~~~~
| 仮想マシンの作成時に使用するデータストア情報を登録します。

.. figure:: /images/ja/templates/vmware/vm_management/datastore_master_v2_5.png
   :width: 800px
   :alt: データストア(マスタ)メニュー画面

.. list-table:: メニュー項目一覧（データストア(マスタ)）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * - | 項目
     - | 説明
     - | 入力必須
     - | 入力方法
     - | 制約事項
   * - | データストア名
     - | vCenter内で使用するデータストア名を入力します。
     - | 〇
     - | 手動入力
     - | 最大長42バイト

.. _vmware_nw_master:

ネットワーク(マスタ)
~~~~~~~~~~~~~~~~~~~~~~
| 仮想マシン作成時に使用するネットワーク情報を登録します。

.. figure:: /images/ja/templates/vmware/vm_management/nw_master_v2_5.png
   :width: 800px
   :alt: ネットワーク(マスタ)メニュー画面

.. list-table:: メニュー項目一覧（ネットワーク(マスタ)）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * -  項目
     -  説明
     -  入力必須
     -  入力方法
     -  制約事項
   * -  IPアドレス
     -  作成する仮想マシンに割り当てるIPアドレスを入力します。
     -  〇
     -  手動入力
     -  最大長64バイト
   * -  ネットワーク名
     -  vCenter内で使用するネットワーク名を入力します。
     -  〇
     -  手動入力
     -  最大長64バイト
   * -  サブネットマスク
     -  設定したIPアドレスに対応するサブネットマスクを入力します。
     -  〇
     -  手動入力
     -  最大長64バイト
   * -  デフォルトゲートウェイ
     -  設定したIPアドレスに対応するデフォルトゲートウェイを入力します。
     -  〇
     -  手動入力
     -  最大長64バイト
   * -  DNSサーバ①
     -  設定したIPアドレスに対応する1つ目のDNSサーバを入力します。
     -  ー
     -  手動入力
     -  最大長64バイト
   * -  DNSサーバ②
     -  設定したIPアドレスに対応する2つ目のDNSサーバを入力します。
     -  ー
     -  手動入力
     -  最大長64バイト

.. _vmware_folder_master:

フォルダ(マスタ)
~~~~~~~~~~~~~~~~~~~~~~
| 仮想マシン作成時に使用するフォルダ情報を登録します。

.. figure:: /images/ja/templates/vmware/vm_management/folder_master_v2_5.png
   :width: 800px
   :alt: フォルダ(マスタ)メニュー画面

.. list-table:: メニュー項目一覧（フォルダ）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * - | 項目
     - | 説明
     - | 入力必須
     - | 入力方法
     - | 制約事項
   * - | フォルダ名
     - | 作成する仮想マシンを格納するフォルダ名を入力します。
     - | 〇
     - | 手動入力
     - | 最大長128バイト

.. _vmware_cpu_master:

CPU(マスタ)
~~~~~~~~~~~~~~~~~~~~~~
| 仮想マシン作成時に使用するCPU数を登録します。
| テンプレートの仕様に合わせて設定してください。

.. figure:: /images/ja/templates/vmware/vm_management/cpu_master_v2_5.png
   :width: 800px
   :alt: CPU(マスタ)メニュー画面

.. list-table:: メニュー項目一覧（CPU(マスタ)）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * - | 項目
     - | 説明
     - | 入力必須
     - | 入力方法
     - | 制約事項
   * - | CPU
     - | 作成する仮想マシンのCPU数を入力します。
     - | 〇
     - | 手動入力
     - | 最大長32バイト

.. _vmware_memory_master:

メモリ(マスタ)
~~~~~~~~~~~~~~~~~~~~~~
| 仮想マシン作成時に使用するメモリ容量を登録します。
| テンプレートの仕様に合わせて設定してください。

.. figure:: /images/ja/templates/vmware/vm_management/memory_master_v2_5.png
   :width: 800px
   :alt: メモリ(マスタ)メニュー画面

.. list-table:: メニュー項目一覧（メモリ(マスタ)）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * - | 項目
     - | 説明
     - | 入力必須
     - | 入力方法
     - | 制約事項
   * - | メモリ(MB)
     - | 作成する仮想マシンのメモリ容量をMB単位で入力します。
     - | 〇
     - | 手動入力
     - | 最大長32バイト

.. _vmware_disk_master:

ディスク(マスタ)
~~~~~~~~~~~~~~~~~~~~~~
| 仮想マシン作成時に使用するディスク容量を登録します。
| テンプレートの仕様に合わせて設定してください。

.. figure:: /images/ja/templates/vmware/vm_management/disk_master_v2_5.png
   :width: 800px
   :alt: ディスク(マスタ)メニュー画面

.. list-table:: メニュー項目一覧（ディスク(マスタ)）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * - | 項目
     - | 説明
     - | 入力必須
     - | 入力方法
     - | 制約事項
   * - | ディスク(GB)
     - | 作成する仮想マシンのディスク容量をGB単位で入力します。
     - | 〇
     - | 手動入力
     - | 最大長32バイト

.. _vmware_vmstate_master:

仮想マシン状態(マスタ)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
| 仮想マシンの状態管理に必要な「状態名」と「状態」を定義します。
| 本メニューは、ITAにおける仮想マシン状態のMovementで使用され、仮想マシンの起動・停止・再起動・サスペンドなどの操作を制御するためのマスタデータとして機能します。

| なお、起動設定はすでにマスタとして登録済みです。

.. figure:: /images/ja/templates/vmware/vm_management/vm_state_master_v2_5.png
   :width: 800px
   :alt: 仮想マシン状態(マスタ)メニュー画面

.. list-table:: メニュー項目一覧（仮想マシン状態(マスタ)）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * - | 項目
     - | 説明
     - | 入力必須
     - | 入力方法
     - | 制約事項
   * - | 状態名
     - | 仮想マシンの操作名称を管理します。
       | （例：起動、停止、サスペンド）
     - | 〇
     - | 手動入力
     - | 最大長64バイト
   * - | 状態
     - | 仮想マシンに対して実行される状態を入力します。
       | （例：powered-On、powered-Off、suspended）
     - | 〇
     - | 手動入力
     - | 最大長64バイト

利用手順(仮想マシン作成)
===============================
| 仮想マシン作成の利用手順について説明します。
| 本手順を実行する前に、**vCenter上で仮想マシン作成用のテンプレートを事前に作成しておく必要があります**。

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

#. | **仮想マシン名を登録**
   | :menuselection:`仮想マシン管理 --> 仮想マシン(マスタ)` から、作成する仮想マシン名の情報を登録します。
   | 詳細は「 :ref:`vmware_vmcreate_master` 」を参照してください。

#. | **テンプレート名を登録**
   | :menuselection:`仮想マシン管理 --> テンプレート(マスタ)` から、作成する仮想マシンのテンプレート名を登録します。
   | 詳細は「 :ref:`vmware_template_master` 」を参照してください。

#. | **データストア名を登録**
   | :menuselection:`仮想マシン管理 --> データストア(マスタ)` から、接続するvCenter内のデータストア名の情報を登録します。
   | 詳細は「 :ref:`vmware_datastore_master` 」を参照してください。

#. | **ネットワーク名を登録**
   | :menuselection:`仮想マシン管理 -->ネットワーク(マスタ)` から、作成する仮想マシンのネットワーク名を登録します。
   | 詳細は「 :ref:`vmware_nw_master` 」を参照してください。

#. | **フォルダ名を登録**
   | :menuselection:`仮想マシン管理 --> フォルダ(マスタ)` から、作成する仮想マシンを格納するフォルダ名を登録します。
   | 詳細は「 :ref:`vmware_folder_master` 」を参照してください。

#. | **CPU数を登録**
   | :menuselection:`仮想マシン管理 -->CPU(マスタ)` から、作成する仮想マシンのCPU数を登録します。
   | この値はテンプレートの仕様に基づいて設定してください。
   | 詳細は「 :ref:`vmware_cpu_master` 」を参照してください。

#. | **メモリ容量を登録**
   | :menuselection:`仮想マシン管理 --> メモリ(マスタ)` から、作成する仮想マシンのメモリ容量を登録します。
   | この値はテンプレートの仕様に基づいて設定してください。
   | 詳細は「 :ref:`vmware_memory_master` 」を参照してください。

#. | **ディスク容量を登録**
   | :menuselection:`仮想マシン管理 --> ディスク(マスタ)` から、作成する仮想マシンのディスク容量を登録します。
   | この値はテンプレートの仕様に基づいて設定してください。
   | 詳細は「 :ref:`vmware_disk_master` 」を参照してください。

#. | **作業対象の仮想マシン情報を登録**
   | :menuselection:`仮想マシン管理 --> 仮想マシン` から、作業対象の仮想マシン情報を登録します。
   | 詳細は「 :ref:`vmware_vmcreate` 」を参照してください。

#. | **Conductorの選択**

   | 12-1 メインメニューから :menuselection:`Conductor` メニューを選択します。

   .. figure:: /images/ja/templates/vmware/mainmenu/conductor_mainmenuv2_5.png
      :width: 800px
      :alt: メインメニュー画面

   | 12-2 :menuselection:`Conductor一覧` メニューを選択します。

   | 12-3 :menuselection:`仮想マシン作成` の詳細ボタンを押下します。

   .. figure:: /images/ja/templates/vmware/mainmenu/conductorlist_v2_5.png
      :width: 800px
      :alt: Conductor一覧画面

#. | **Conductorの実行**

   | 13-1 作業実行ボタンを押下します。

   .. figure:: /images/ja/templates/vmware/mainmenu/conductor_execute_createvmv2_5.png
      :width: 800px
      :alt: Conductor仮想マシン作成画面

   | 13-2 オペレーション選択ボタンより、仮想マシン作成を実行するオペレーションを選択します。


   | 13-3 作業実行ボタンより、仮想マシン作成の作業を実行します。

   .. figure:: /images/ja/templates/vmware/mainmenu/conductor_execute2_createvmv2_5.png
      :width: 800px
      :alt: Conductor仮想マシン作成画面

.. warning::
  | Conductor作業履歴で「想定外エラー」や「異常終了」と表示された場合は、
  | :menuselection:`仮想マシン管理` の各メニューや :menuselection:`Ansible共通 --> グローバル変数管理` に入力した情報に誤りが無いか確認をお願いいたします。


利用手順(仮想マシン状態管理)
===============================
| 仮想マシン状態の利用手順について説明します。
| :menuselection:`仮想マシン管理 --> 仮想マシン` の「サーバー状態」項目より、仮想マシンの起動・停止・再起動・サスペンドなどの操作を制御することができます。
| ※本手順は、仮想マシン作成のMovementを実行して作業対象の仮想マシンが作成済みであることを前提としています。


#. | **作業対象の仮想マシン情報の起動状態を登録**
   | :menuselection:`仮想マシン管理 --> 仮想マシン` の「サーバー状態」項目より、作業対象の仮想マシンの起動状態を登録します。

   .. figure:: /images/ja/templates/vmware/vm_management/vmstate_v2_5.png
        :alt: サーバー状態の編集画面
        :align: left
        :width: 800px

#. | **Conductorの選択**

   | 2-1 メインメニューから :menuselection:`Conductor` メニューを選択します。

   .. figure:: /images/ja/templates/vmware/mainmenu/conductor_mainmenuv2_5.png
      :width: 800px
      :alt: メインメニュー画面

   | 2-2 :menuselection:`Conductor一覧` メニューを選択します。

   | 2-3 :menuselection:`仮想マシン状態` の詳細ボタンを押下します。

   .. figure:: /images/ja/templates/vmware/mainmenu/conductorlist_v2_5.png
      :width: 800px
      :alt: Conductor一覧画面

#. | **Conductorの実行**

   | 3-1 作業実行ボタンを押下します。

   .. figure:: /images/ja/templates/vmware/mainmenu/conductor_execute_vmstatev2_5.png
      :width: 800px
      :alt: Conductor仮想マシン状態画面

   | 3-2 オペレーション選択ボタンより、仮想マシン状態を実行するオペレーションを選択します。


   | 3-3 作業実行ボタンより、仮想マシン状態の作業を実行します。

   .. figure:: /images/ja/templates/vmware/mainmenu/conductor_execute2_vmstatev2_5.png
      :width: 800px
      :alt: Conductor仮想マシン状態画面

