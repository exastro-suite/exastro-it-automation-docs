==============
クラスタ管理
==============
はじめに
============
| 本書では、Exastro IT Automation（以下、ITA）におけるvCenterの接続情報の登録方法について説明します。
| 登録された情報は、ITAがvCenterへ接続する際に使用されます。

メニュー項目
============

.. _vcenter_server_master:

vCenter Server(マスタ)
~~~~~~~~~~~~~~~~~~~~~~~~~
| ITAがvCenterに接続するために必要な情報を登録します。

.. figure:: /images/ja/templates/vmware/cluster_management/vcenter_master_v2_5.png
   :width: 800px
   :alt: vCenter Server(マスタ)メニュー画面


.. list-table:: メニュー項目一覧（vCenter Server(マスタ)）
   :widths: 18 18 12 12 12
   :header-rows: 1
   :align: left

   * - | 項目
     - | 説明
     - | 入力必須
     - | 入力方法
     - | 制約事項
   * - | vCenterホスト名
     - | 接続対象のvCenterのホスト名を入力します。
     - | 〇
     - | 手動入力
     - | 最大長64バイト
   * - | vCenterユーザー名
     - | vCenterに接続するユーザー名を入力します。
     - | 〇
     - | 手動入力
     - | 最大長32バイト
   * - | vCenterパスワード
     - | vCenterに接続するパスワードを入力します。
     - | 〇
     - | 手動入力
     - | パスワード形式
       | 最大長32バイト
   * - | vCenterクラスター名
     - | 仮想マシンを作成する対象のクラスター名を入力します。
     - | 〇
     - | 手動入力
     - | 最大長64バイト




