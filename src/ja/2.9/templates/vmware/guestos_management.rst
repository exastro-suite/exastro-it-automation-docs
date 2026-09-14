==============
ゲストOS管理
==============
はじめに
============
| 本書では、Exastro IT Automation（ITA）におけるゲストOSへのファイル配布に関する設定方法について説明します。

メニュー項目
============

ファイル配布
~~~~~~~~~~~~~~~~~~~~~~
| ファイル配布を行うためのメニュー項目です。

.. figure:: /images/ja/templates/vmware/guestos_management/file_copy_v2_5.png
   :width: 800px
   :alt: ファイル配布(マスタ)メニュー画面

.. list-table:: メニュー項目一覧（ファイル配布）
   :widths: 10 18 10 12 20
   :header-rows: 1
   :align: left

   * - | 項目
     - | 説明
     - | 入力必須
     - | 入力方法
     - | 制約事項
   * - | 配布先パス
     - | ファイルの配布先パスを入力します。
     - | 〇
     - | 手動入力
     - | 最大長64バイト
       | 末尾にスラッシュ（/）を付けない
       | (例)/etcディレクトリに配布する場合は、 **/etc** と入力
   * - | ファイル名
     - | 配布するファイル名を入力します。
     - | 〇
     - | 手動入力
     - | 最大長64バイト
       | (例)test.txt
   * - | ファイル埋込変数
     - | 配布対象のファイル変数を選択します。
     - | 〇
     - | リスト選択
     - | 冒頭がCPF_であること

.. note::
   | ファイル埋込変数は :menuselection:`Ansible共通 --> ファイル管理` メニューで定義されています。
   | 詳細は「 :ref:`ansible_common_file_list` 」を参照してください。

   .. figure:: /images/ja/templates/vmware/file_list_v2-4.png
      :width: 600px
      :alt: ファイル管理


利用手順(ファイル管理)
==========================
#. | **対象ホストと配布ファイル情報の登録**
   | :menuselection:`VMware --> ゲストOS管理 --> ファイル配布` から、対象のホストと配布先パス、ファイル情報を登録します。

#. | **Conductorの選択**

   | 2-1 メインメニューから :menuselection:`Conductor` メニューを選択します。

   .. figure:: /images/ja/templates/vmware/mainmenu/conductor_mainmenuv2_5.png
      :width: 800px
      :alt: メインメニュー画面

   | 2-2 :menuselection:`Conductor一覧` メニューを選択します。

   | 2-3 :menuselection:`ファイル配布` の詳細ボタンを押下します。

   .. figure:: /images/ja/templates/vmware/mainmenu/conductorlist_v2_5.png
      :width: 800px
      :alt: Conductor一覧画面

#. | **Conductorの実行**

   | 3-1 作業実行ボタンを押下します。

   .. figure:: /images/ja/templates/vmware/mainmenu/conductor_execute_filev2_5.png
      :width: 800px
      :alt: Conductorファイル配布画面

   | 3-2 オペレーション選択ボタンより、ファイル配布を実行するオペレーションを選択します。

   | 3-3 作業実行ボタンより、ファイル配布の作業を実行します。

   .. figure:: /images/ja/templates/vmware/mainmenu/conductor_execute2_filev2_5.png
      :width: 800px
      :alt: Conductorファイル配布画面
