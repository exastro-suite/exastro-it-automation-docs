=========
hosts配布
=========

| 本書では、hosts配布の機能および操作方法について説明します。

概要
====
hostsファイルをファイル埋込変数に指定して、VMに配布する機能です。

メニュー項目
============

hosts配布メニュー
-----------------
hosts配布を行うためのメニュー項目です。

.. figure:: /images/ja/templates/vmware/menuCF_v2-4.png
   :width: 800px
   :alt: hosts配布メニュー画面

.. list-table:: メニュー項目一覧（hosts配布）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * -  項目
     -  説明
     -  入力必須
     -  入力方法
     -  制約事項
   * -  ファイル埋込変数
     -  hostsファイルの配布対象を指定します。
     -  〇
     -  リスト選択
     -  冒頭がCPF_であること


操作方法
========
1.VMWareのメニューを選択します。

.. figure:: /images/ja/templates/vmware/mainmenu_v2-4.png
   :width: 800px
   :alt: メインメニュー画面

2.hosts配布のメニューを選択します。

3.hosts配布では、hosts配布のメンテナンス(閲覧/登録/更新/廃止)ができます。hosts配布の入力画面の項目は以下の通りです。

.. figure:: /images/ja/templates/vmware/copyfile_v2-4.png
   :width: 800px
   :alt: hosts配布入力画面

.. list-table:: 入力画面項目一覧（hosts配布）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * -  項目
     -  説明
     -  入力必須
     -  入力方法
     -  制約事項
   * -  ファイル埋込変数
     -  hostsファイルの配布対象を指定します。
     -  〇
     -  リスト選択
     -  冒頭がCPF_であること

.. note:: | ファイル埋込変数は :menuselection:`Ansible共通 --> ファイル管理` メニューで定義されています。
   | 詳細は「 :ref:`ansible_common_file_list` 」を参照してください。

   .. figure:: /images/ja/templates/vmware/file_list_v2-4.png
      :width: 600px
      :alt: ファイル管理

4.メインメニューからConductorのメニューを選択します。

5.Condutor一覧のメニューを選択します。

6.詳細ボタンより、hosts配布を選択します。

.. figure:: /images/ja/templates/vmware/conductorlist_v2-4.png
   :width: 800px
   :alt: Conductor一覧画面

7.作業実行ボタンをクリックします。

.. figure:: /images/ja/templates/vmware/conductorCF_v2-4.png
   :width: 800px
   :alt: Conductorhosts配布画面

8.オペレーション選択ボタンより、hosts配布を行うオペレーションを選択します。

9.スケジュールボタンより、hosts配布を行う日時を選択します。

10.作業実行ボタンより、hosts配布の作業を実行します。

.. figure:: /images/ja/templates/vmware/executeCF_v2-4.png
   :width: 800px
   :alt: hosts配布作業実行画面

