======
VM作成
======

| 本書では、VM作成の機能および操作方法について説明します。

概要
====
VMWareを介してVM（仮想マシン）を作成する機能です。

メニュー項目
============

.. _create_server:

サーバー作成
------------
VM作成を行うためのメニュー項目です。

.. figure:: /images/ja/templates/vmware/menuCS_v2-4.png
   :width: 800px
   :alt: サーバー作成メニュー画面

.. list-table:: メニュー項目一覧（サーバー作成）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * -  項目
     -  説明
     -  入力必須
     -  入力方法
     -  制約事項
   * -  vCenter表示名
     -  vCenter内に作成されるVMの表示名を指定します。
     -  〇
     -  リスト選択
     -  ー
   * -  IPアドレス
     -  作成するVMに配布されるIPアドレスを指定します。
     -  〇
     -  リスト選択
     -  ー
   * -  フォルダ
     -  作成するVMを格納するフォルダ名を指定します。
     -  〇
     -  リスト選択
     -  ー
   * -  テンプレート
     -  作成するVMのテンプレート名を指定します。
     -  〇
     -  リスト選択
     -  ー
   * -  CPU
     -  作成するVMのCPU数を指定します。
     -  〇
     -  リスト選択
     -  ー
   * -  メモリ(MB)
     -  作成するVMのメモリ容量をMBで指定します。
     -  〇
     -  リスト選択
     -  ー
   * -  ディスク(GB)
     -  作成するVMのディスク容量をGBで指定します。
     -  〇
     -  リスト選択
     -  ー
   * -  申請者
     -  VM作成の申請者を入力します。
     -  〇
     -  手動入力
     -  最大長32バイト
   * -  用途
     -  作成するVMの用途を入力します。
     -  ー
     -  手動入力
     -  最大長128バイト

.. _vcenter_connectinfo:

vCenter接続情報
---------------
vCenterに接続する情報を入力するためのメニュー項目です。

.. figure:: /images/ja/templates/vmware/menuVC_v2-4.png
   :width: 800px
   :alt: vCenter接続情報メニュー画面

.. list-table:: メニュー項目一覧（vCenter接続情報）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * -  項目
     -  説明
     -  入力必須
     -  入力方法
     -  制約事項
   * -  vCenterホスト名
     -  vCenterに接続するホスト名を入力します。
     -  〇
     -  手動入力
     -  最大長64バイト
   * -  ユーザー名
     -  vCenterに接続するユーザー名を入力します。
     -  〇
     -  手動入力
     -  最大長32バイト
   * -  パスワード
     -  vCenterに接続するパスワードを入力します。
     -  〇
     -  手動入力
     -  パスワード形式
   * -  vCenterクラスター名
     -  vCenterに接続するvCenterのクラスター名を入力します。
     -  〇
     -  手動入力
     -  最大長64バイト

.. _ip_address:

IPアドレス
----------
vCenter内に作成されるIPアドレスを入力するためのメニュー項目です。

.. figure:: /images/ja/templates/vmware/menuIP_v2-4.png
   :width: 800px
   :alt: IPアドレスメニュー画面

.. list-table:: メニュー項目一覧（IPアドレス）
   :widths: 8 18 12 12 12
   :header-rows: 1
   :align: left

   * -  項目
     -  説明
     -  入力必須
     -  入力方法
     -  制約事項
   * -  IPアドレス
     -  作成するVMに配布されるIPアドレスを入力します。
     -  〇
     -  手動入力
     -  最大長64バイト
   * -  サブネットマスク
     -  入力するIPアドレスに関係するサブネットマスクを入力します。
     -  〇
     -  手動入力
     -  最大長64バイト
   * -  デフォルトゲートウェイ
     -  入力するIPアドレスに関係するデフォルトゲートウェイを入力します。
     -  〇
     -  手動入力
     -  最大長64バイト
   * -  DNS名①
     -  入力するIPアドレスに関係する1つ目のDNS名を入力します。
     -  ー
     -  手動入力
     -  最大長64バイト
   * -  DNS名②
     -  入力するIPアドレスに関係する2つ目のDNS名を入力します。
     -  ー
     -  手動入力
     -  最大長64バイト

.. _foldername:

フォルダ名
----------
vCenter内に作成されるフォルダ名を入力するためのメニュー項目です。

.. figure:: /images/ja/templates/vmware/menuFN_v2-4.png
   :width: 800px
   :alt: フォルダ名メニュー画面

.. list-table:: メニュー項目一覧（フォルダ）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * -  項目
     -  説明
     -  入力必須
     -  入力方法
     -  制約事項
   * -  フォルダ名
     -  作成するVMを格納するフォルダ名を入力します。
     -  〇
     -  手動入力
     -  最大長64バイト

.. _template:

テンプレート
------------
vCenter内に作成されるテンプレートを入力するためのメニュー項目です。

.. figure:: /images/ja/templates/vmware/menuTE_v2-4.png
   :width: 800px
   :alt: テンプレートメニュー画面

.. list-table:: メニュー項目一覧（テンプレート）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * -  項目
     -  説明
     -  入力必須
     -  入力方法
     -  制約事項
   * -  テンプレート名
     -  作成するVMのテンプレート名を入力します。
     -  〇
     -  手動入力
     -  最大長64バイト
   * -  ルートディスク
     -  入力するテンプレートに関係するルートディスクを入力します。
     -  ー
     -  手動入力
     -  最大長32バイト
   * -  ボリュームグループ
     -  入力するテンプレートに関係するボリュームグループを入力します。
     -  ー
     -  手動入力
     -  最大長32バイト
   * -  ユーザー
     -  入力するテンプレートにログインするユーザーを入力します。
     -  〇
     -  手動入力
     -  最大長32バイト
   * -  パスワード
     -  入力するテンプレートにログインするパスワードを入力します。
     -  〇
     -  手動入力
     -  パスワード形式
   * -  ssh秘密鍵ファイル
     -  入力するテンプレートにログインするためのssh秘密鍵ファイルを指定します。
     -  ー
     -  ファイル選択
     -  最大サイズ100Mバイト
   * -  データストア
     -  接続するvCenter内のデータストア名を入力します。
     -  〇
     -  手動入力
     -  最大長64バイト
   * -  ネットワーク名
     -  接続するvCenter内のネットワーク名を入力します。
     -  〇
     -  手動入力
     -  最大長64バイト


CPU
---
vCenter内に作成されるVMのCPU数を入力するためのメニュー項目です。

.. figure:: /images/ja/templates/vmware/menuCPU_v2-4.png
   :width: 800px
   :alt: CPUメニュー画面

.. list-table:: メニュー項目一覧（CPU）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * -  項目
     -  説明
     -  入力必須
     -  入力方法
     -  制約事項
   * -  CPU
     -  作成するVMのCPU数を入力します。
     -  〇
     -  手動入力
     -  最大長32バイト


メモリ(MB)
----------
vCenter内に作成されるVMのメモリ容量を入力するためのメニュー項目です。

.. figure:: /images/ja/templates/vmware/menuME_v2-4.png
   :width: 800px
   :alt: メモリメニュー画面

.. list-table:: メニュー項目一覧（メモリ(MB)）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * -  項目
     -  説明
     -  入力必須
     -  入力方法
     -  制約事項
   * -  メモリ(MB)
     -  作成するVMのメモリ容量をMBで入力します。
     -  〇
     -  手動入力
     -  最大長32バイト


ディスク(GB)
------------
vCenter内に作成されるVMのディスク容量を入力するためのメニュー項目です。

.. figure:: /images/ja/templates/vmware/menuDC_v2-4.png
   :width: 800px
   :alt: ディスクメニュー画面

.. list-table:: メニュー項目一覧（ディスク(GB)）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * -  項目
     -  説明
     -  入力必須
     -  入力方法
     -  制約事項
   * -  ディスク(GB)
     -  作成するVMのディスク容量をGBで入力します。
     -  〇
     -  手動入力
     -  最大長32バイト


利用手順
========
| VM作成の利用手順について説明します。

VM作成作業フロー
------------------------
| 以下は、VM作成でサーバー作成を実行するまでの流れです。

-  **作業フロー詳細と参照先**

   #. | **オペレーション名の登録**
      | :menuselection:`基本コンソール --> オペレーション一覧` から、作業用のオペレーション名を登録します。
      | 詳細は「 :ref:`basic_console_operation` 」を参照してください。

   #. | **グローバル変数管理の編集**
      | :menuselection:`Ansible共通 --> グローバル変数管理` から、対象のグローバル変数の具体値を編集します。
      | 詳細は「 :ref:`ansible_common_global_variable_list` 」を参照してください。

      .. figure:: /images/ja/templates/vmware/global_variable_list_v2-4.png
           :alt: 具体値を編集する
           :align: left
           :width: 600px

   #. | **作業対象へのvCenter接続情報を登録**
      | :menuselection:`VM作成 --> vCenter接続情報` から、作業対象へのvCenter接続情報を登録します。
      | 詳細は「 :ref:`vcenter_connectinfo` 」を参照してください。

   #. | **作業対象のIPアドレスを登録**
      | :menuselection:`VM作成 --> IPアドレス` から、作業対象のIPアドレスを登録します。
      | 詳細は「 :ref:`ip_address` 」を参照してください。

   #. | **作業対象のフォルダ名を登録**
      | :menuselection:`VM作成 --> フォルダ名` から、作業対象のフォルダ名を登録します。
      | 詳細は「 :ref:`foldername` 」を参照してください。

   #. | **作業対象のテンプレートを登録**
      | :menuselection:`VM作成 --> テンプレート` から、作業対象のテンプレートを登録します。
      | 詳細は「 :ref:`template` 」を参照してください。

   #. | **作業対象の情報を登録**
      | :menuselection:`VM作成 --> サーバー作成` から、作業対象の情報を登録します。
      | 詳細は「 :ref:`create_server` 」を参照してください。

   #. | **サーバー作成を選択**
      | :menuselection:`Condutor --> Condutor一覧` から、サーバー作成の詳細をクリックします。
      | 詳細は「 :ref:`conductor_list` 」を参照してください。

      .. figure:: /images/ja/templates/vmware/conductor_create_server_v2-4.png
           :alt: サーバー作成
           :align: left
           :width: 600px

   #. | **サーバー作成を実行**
      | サーバー作成の作業実行ボタンをクリックします。
      | 詳細は「 :ref:`conductor_editandexcute_list` 」を参照してください。

   #. | **サーバー作成の実行状況を確認**
      | :menuselection:`Condutor --> Conductor作業履歴` から、サーバー作成の作業状態を確認できます。
      | 詳細は「 :ref:`conductor_conductor_job_list` 」を参照してください。

.. warning::
  | Conductor作業履歴で「想定外エラー」や「異常終了」になっている場合は :menuselection:`VM作成` の各メニューや :menuselection:`Ansible共通 --> グローバル変数管理` に入力した情報に誤りが無いか確認してみてください。

