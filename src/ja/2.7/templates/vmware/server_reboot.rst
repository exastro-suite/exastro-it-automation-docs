==============
サーバー再起動
==============

| 本書では、サーバー再起動の機能および操作方法について説明します。

概要
====
VMWareを介してVMの再起動を行う機能です。

メニュー項目
============
サーバー再起動メニュー
----------------------
vCenter内のVMの再起動を行うためのメニュー項目です。

.. figure:: /images/ja/templates/vmware/menuRS_v2-4.png
   :width: 800px
   :alt: サーバー再起動メニュー画面

.. list-table:: メニュー項目一覧（サーバー再起動）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * -  項目
     -  説明
     -  入力必須
     -  入力方法
     -  制約事項
   * -  サーバー状態
     -  サーバーの起動状態を管理します。
     -  〇
     -  手動入力
     -  最大長32バイト
   * -  起動オプション
     -  サーバーの起動設定(起動、停止、再起動)を指定します。
     -  〇
     -  リスト選択
     -  説明欄記載の通り

起動オプション
--------------
vCenter内のVMの操作を指定するためのメニュー項目です。

.. figure:: /images/ja/templates/vmware/menuOB_v2-4.png
   :width: 800px
   :alt: 起動オプションメニュー画面

.. list-table:: メニュー項目一覧（起動オプション）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * -  項目
     -  説明
     -  入力必須
     -  入力方法
     -  制約事項
   * -  起動オプション
     -  VMの起動設定を入力します。
     -  〇
     -  手動入力
     -  最大長32バイト

操作方法
========
1.VMWareのメニューを選択します。

.. figure:: /images/ja/templates/vmware/mainmenu_v2-4.png
   :width: 800px
   :alt: メインメニュー画面

2.サーバー再起動のメニューを選択します。

3.サーバー再起動では、サーバー再起動のメンテナンス(閲覧/登録/更新/廃止)ができます。サーバー再起動の入力画面の項目は以下の通りです。

.. figure:: /images/ja/templates/vmware/rebootserver_v2-4.png
   :width: 800px
   :alt: サーバー再起動入力画面

.. list-table:: 入力画面項目一覧（サーバー再起動）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * -  項目
     -  説明
     -  入力必須
     -  入力方法
     -  制約事項
   * -  サーバー状態
     -  サーバーの起動状態を管理します。
     -  〇
     -  手動入力
     -  最大長32バイト
   * -  起動オプション
     -  サーバーの起動設定(起動、停止、再起動)を指定します。
     -  〇
     -  リスト選択
     -  説明欄記載の通り

4.メインメニューからConductorのメニューを選択します。

5.Condutor一覧のメニューを選択します。

6.詳細ボタンより、サーバー再起動を選択します。

.. figure:: /images/ja/templates/vmware/conductorlist_v2-4.png
   :width: 800px
   :alt: Conductor一覧画面

7.作業実行ボタンをクリックします。

.. figure:: /images/ja/templates/vmware/conductorRS_v2-4.png
   :width: 800px
   :alt: Conductorサーバー再起動画面

8.オペレーション選択ボタンより、サーバー再起動を行うオペレーションを選択します。

9.スケジュールボタンより、サーバー再起動を行う日時を選択します。

10.作業実行ボタンより、サーバー再起動の作業を実行します。

.. figure:: /images/ja/templates/vmware/executeRS_v2-4.png
   :width: 800px
   :alt: サーバー再起動作業実行画面


