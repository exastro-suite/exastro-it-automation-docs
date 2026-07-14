
.. _host_group:

==================
ホストグループ機能
==================

はじめに
========

| 本書は、Exastro IT Automationのホストグループの機能および操作方法について説明します。

ホストグループの概要と利点
==========================

ホストグループの概要
--------------------

| ホストグループとは、ホスト群を論理的な単位（機能・役割）でまとめたグループのことを指します。
| ホストグループの概念図は下のようになります。

.. figure:: /images/ja/host_group/overview_base.drawio.png
   :width: 6.67391in
   :height: 3.20028in
   :align: left
   :alt: ホストグループ概要図

   ホストグループ概要図

| 上図は、以下の要素で構成されています。

| ■ホストグループ
| 図中の単線枠の四角形で記載しています。all、dc1、dc3、zabbix1、zabbix3が該当します。


| ■作業対象ホスト
| 対象の機器を示すホスト。
| 図中の丸角の四角形で記載。host11、host12、host31、host32が該当します。

| 上位のホストグループを親ホストグループ、下位のホストグループを子ホストグループと呼び、それらは親子関係にあります。
| 更に下位となる末端のホストグループは作業対象ホストと紐付きます。
| 上図の例では、dc1から見た子ホストグループはzabbix1となり、zabbix1から見た親ホストグループはdc1となります。


| 階層の数え方はホストグループ1つで1階層、1組の親子で2階層となり、頂点となるホストグループから末端のホストグループまでは最大15階層まで定義できます。
| 上図の例では、allからzabbix1まで辿ると3階層となります。


ホストグループの利点
--------------------

ホストグループ間のパラメータの継承
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| 親ホストグループに設定したパラメータは子ホストグループに継承されます。

| 下図の例では、dc1に設定したパラメータ（例えばユーザのパスワードなど）がzabbix1にも同じパラメータの設定が継承されます。
| ただし、具体値がない場合は継承されません。

.. figure:: /images/ja/host_group/overview_inheritance_1.drawio.png
   :width: 6.67391in
   :height: 3.20028in
   :align: left
   :alt: ホストグループ概要図(ホストグループ間のパラメータの継承1)

   ホストグループ概要図(ホストグループ間のパラメータの継承1)

| このように設定箇所を局所化することで、設定の付与/変更作業の簡略化ができます。

| 子ホストグループを追加した場合にもパラメータの設定は自動で継承されます。
| 下図の例では、zabbixサーバを1台追加した際に、zabbix12をzabbix1に紐付けています。
| これにより、zabbix12には、zabbix11と同じように、zabbix1の設定が継承されます。

.. figure:: /images/ja/host_group/overview_inheritance_2.drawio.png
   :width: 6.67391in
   :height: 3.20028in
   :align: left
   :alt: ホストグループ概要図(ホストグループ間のパラメータの継承2)

   ホストグループ概要図(ホストグループ間のパラメータの継承2)

| 子ホストグループは複数の親ホストグループに紐付けることができ、親ホストグループが複数ある場合のパラメータの継承について説明します。
| 下図の例では、zabbix11、zabbix12はzabbix1とvirtualserverに属しています。

.. figure:: /images/ja/host_group/overview_inheritance_3.drawio.png
   :width: 6.67391in
   :height: 3.20028in
   :align: left
   :alt: ホストグループ概要図(ホストグループ間のパラメータの継承3)

   ホストグループ概要図(ホストグループ間のパラメータの継承3)


| ホストグループ間でパラメータが重複していた場合は最も下位のホストグループから適用されます。
| 上図の例では、dcxとzabbix1に同じパラメータを設定していた場合に、zabbix11、zabbix12に継承されるのはdcxからではなく、下位のzabbix1のパラメータとなります。

| 同じ階層でパラメータが重複していた場合は優先順位が高い親ホストグループから継承されます。
| 上図の例ではvirtualserverとzabbix1に同じパラメータを設定していた場合にvirtualserverの優先順位が1で、zabbix1の優先順位が2であれば、zabbix1の優先順位が大きいため、子ホストグループに継承されるのはzabbix1のパラメータとなります。
| 優先順位の設定方法は「:ref:`hostgroup_register`」で説明します。


ホストグループ機能の主要機能
============================

| ホストグループの設定管理、および、パラメータシートのホストグループ単位のレコードをホスト単位に分割する機能です。
|
| ■以下の操作により、全パラメータシートを対象に分割処理が実行されます。
| ・ホストグループ関連メニューの各メニューで、登録/更新/廃止/復活を行う。
|   - :menuselection:`ホストグループ一覧`
|   - :menuselection:`ホストグループ親子紐付`
|   - :menuselection:`ホスト紐付管理`
|
| ■以下の操作により、該当のパラメータシートのみを対象に分割処理が実行されます。
| ・パラメータシート（ホストグループ利用）の登録/更新/廃止/復活を行う。
| ・:menuselection:`パラメータシート定義・作成` で、ホストグループ利用選択時のパラメータシートで、作成、編集、初期化を行う。

ホストグループ機能のメニューグループ
====================================

| :menuselection:`ホストグループ機能` のメニューグループと、それに所属するメニューは以下となります。


.. list-table:: ホストグループ機能
   :header-rows: 1
   :align: left


   * - | No
     - | メニューグループ
     - | メニュー・画面
     - | 説明
   * - | 1
     - | ホストグループ管理
     - | ホストグループ一覧
     - | ホストグループの登録を行います。
   * - | 2
     - | ホストグループ管理
     - | ホストグループ親子紐付
     - | ホストグループ親子関係の紐付を行います。
   * - | 3
     - | ホストグループ管理
     - | ホスト紐付管理
     - | ホストグループとオペレーションと作業対象ホストの紐付けを行います。
   * - | 4
     - | ホストグループ管理
     - | ホストグループ分割対象
     - | ホストグループ単位からホスト単位へ分割する対象パラメータシートの情報、分割処理の状態を管理します。

メニューグループ「ホストグループ管理」について
--------------------------------------------------------

| :menuselection:`ホストグループ一覧` 、:menuselection:`ホストグループ親子紐付` 、:menuselection:`ホスト紐付管理` は、ホストグループを登録し、どのオペレーションでどのホストを作業対象とするかを定義するために必要なメニューとなります。
| 操作の詳細は「:ref:`hostunit_setting` 」で説明します。

.. _hostunit_setting:

ホストグループからホスト単位へのレコード分割と各作業について
============================================================

| 各メニューを使用して、ホストグループを登録し、ホスト単位の情報を作業実行へ設定するフローは以下、表のようになります。
| 作業の詳細は各段落で説明します。

.. _hostgroup_workflows:

.. list-table:: 各作業の作業内容と対象メニュー
   :widths: 5 10 5 10 10 10
   :header-rows: 1
   :align: left
   :name: 各作業の作業内容と対象メニュー

   * - No
     - 作業内容
     - ユーザ操作
     - 使用するメニューグループ
     - 使用するメニュー
     - 備考
   * - 1
     - :ref:`para_create`
     - あり
     - パラメータシート作成
     - | パラメータシート定義・作成
     - ー
   * - 2
     - :ref:`hostgroup_register`
     - あり
     - ホストグループ管理
     - ホストグループ一覧
     - ー
   * - 3
     - :ref:`hostgroup_definition`
     - あり
     - ホストグループ管理
     - ホストグループ親子紐付
     - ー
   * - 4
     - :ref:`host_tie`
     - あり
     - ホストグループ管理
     - ホスト紐付管理
     - ー
   * - 5
     - :ref:`para_register`
     - あり
     - ※2
     - 「:ref:`para_create`」で作成したメニュー
     - ー
   * - 6
     - :ref:`hosted`
     - | なし
       | ※1
     - ※2
     - 「:ref:`para_create`」で作成したメニュー
     - 手動での登録/更新不可。
   * - 7
     - :ref:`setvalue_tie`
     - あり
     - ※2
     - 代入値自動登録設定
     - | 代入値自動登録設定については、以下を参照してください。
       | 「:doc:`../create_param/menu_creation`」
       | 「:doc:`../ansible-driver/index`」
   * - 8
     - :ref:`host_reflection`
     - | なし
       | ※1
     - ※3
     - 作業対象ホスト
     - | 作業対象ホストについては、以下を参照してください。
       | 「:doc:`../ansible-driver/index`」
   * - 9
     - :ref:`value_reflect`
     - | なし
       | ※1
     - ※3
     - 代入値管理
     - | 代入値管理については以下を参照してください。
       | 「:doc:`../ansible-driver/index`」

.. note:: | ※1 内部の処理で実行するのでユーザ操作は不要です。処理結果はメニュー画面で確認可能です。
          | ※2 :menuselection:`パラメータシート定義・作成` で作成先に指定したメニューグループになります。
          | ※3 :menuselection:`代入値自動登録設定` が行えるメニューグループです。各作業により、レコードのイメージは以下 :ref:`hostgroup_workflows_image` を参照してください。


.. _hostgroup_workflows_image:

作業内容とレコードのイメージ
----------------------------

| :ref:`hostgroup_workflows` のNoの作業内容の各メニューのレコードイメージです。
| 作業内容の詳細は :ref:`hostgroup_workflows_details` を参照してください。

#. | :ref:`para_create`

   .. list-table::
      :header-rows: 1
      :align: left

      * - | 作業対象ホスト
          | or
          | ホストグループ
        - オペレーション
        - 項目1
        - 項目2
      * - \_
        -
        -
        -
      * - \_
        -
        -
        -


#. | :ref:`hostgroup_register`

   .. list-table::
      :header-rows: 1
      :align: left

      * - ホストグループ
      * - HG_1
      * - HG_2
      * - hg_1a
      * - hg_1b
      * - hg_2a
      * - hg_2b


#. | :ref:`hostgroup_definition`

   .. list-table::
      :header-rows: 1
      :align: left

      * - 親ホストグループ
        - 子ホストグループ
      * - HG_1
        - hg_1a
      * - HG_1
        - hg_1b
      * - HG_2
        - hg_2a
      * - HG_2
        - hg_2b


#. | :ref:`host_tie`

   .. list-table::
      :header-rows: 1
      :align: left

      * - ホストグループ
        - オペレーション
        - 作業対象ホスト
      * - hg_1a
        - OP1
        - host_1a
      * - hg_1b
        - OP1
        - host_1b
      * - hg_2a
        - OP1
        - host_2a
      * - hg_2b
        - OP1
        - host_2b


#. | :ref:`para_register`

   .. list-table::
      :header-rows: 1
      :align: left

      * - | 作業対象ホスト
          | or
          | ホストグループ
        - オペレーション
        - 項目1
        - 項目2
      * - HG_1
        - 2023/01/01 00:00_OP1
        - 111
        - AAA
      * - HG_2
        - 2023/01/01 00:00_OP1
        - ー
        - BBB


#. | :ref:`hosted`

   .. list-table::
      :header-rows: 1
      :align: left

      * - 作業対象ホスト
        - オペレーション
        - 実施予定
        - 項目1
        - 項目2
      * - host_1a
        - OP1
        - 2023/01/01 00:00:00
        - 111
        - AAA
      * - host_1b
        - OP1
        - 2023/01/01 00:00:00
        - 111
        - AAA
      * - host_2a
        - OP1
        - 2023/01/01 00:00:00
        - ー
        - BBB
      * - host_2b
        - OP1
        - 2023/01/01 00:00:00
        - ー
        - BBB


#. | :ref:`setvalue_tie`

   .. list-table::
      :header-rows: 1
      :align: left

      * - メニューグループ:メニュー名:項目名
        - Movement
        - 変数名
      * - 代入値自動登録用:HGパラメータ管理:項目1
        - Movement1
        - VAR_変数_1
      * - 代入値自動登録用:HGパラメータ管理:項目2
        - Movement2
        - VAR_変数_2


#. | :ref:`host_reflection`

   .. list-table::
      :header-rows: 1
      :align: left

      * - オペレーション
        - Movement
        - 作業対象ホスト
      * - OP1
        - Movement1
        - host_1a
      * - OP1
        - Movement1
        - host_1b
      * - OP1
        - Movement2
        - host_1a
      * - OP1
        - Movement2
        - host_1b
      * - OP1
        - Movement2
        - host_2a
      * - OP1
        - Movement2
        - host_2b


#. | :ref:`value_reflect`

   .. list-table::
      :header-rows: 1
      :align: left

      * - オペレーション
        - Movement
        - 作業対象 ホスト
        - 変数名
        - 具体値
      * - 2023/01/01 00:00_OP1
        - Movement1
        - host_1a
        - VAR_変数 1
        - 111
      * - 2023/01/01 00:00_OP1
        - Movement1
        - host_1b
        - VAR_変数 1
        - 111
      * - 2023/01/01 00:00_OP1
        - Movement2
        - host_1a
        - VAR_変数 2
        - AAA
      * - 2023/01/01 00:00_OP1
        - Movement2
        - host_1b
        - VAR_変数 2
        - AAA
      * - 2023/01/01 00:00_OP1
        - Movement2
        - host_2a
        - VAR_変数 2
        - BBB
      * - 2023/01/01 00:00_OP1
        - Movement2
        - host_2b
        - VAR_変数 2
        - BBB


.. _hostgroup_workflows_details:

作業内容の詳細について
----------------------

|  :ref:`hostgroup_workflows` に基づき、の作業内容の詳細ついて説明します。
| 作業内容のレコードイメージは :ref:`hostgroup_workflows_image` を参照してください。

.. _para_create:

パラメータシート作成
^^^^^^^^^^^^^^^^^^^^

| パラメータシート作成機能を利用してパラメータシートメニューを作成します。
| パラメータシート作成機能の詳細については「:doc:`../create_param/menu_creation`」を参照してください。

.. _hostgroup_register:

ホストグループの登録
^^^^^^^^^^^^^^^^^^^^

| :menuselection:`ホストグループ一覧` メニューを使用してホストグループを登録します。

.. figure:: /images/ja/host_group/hostgroup_management_register.png
   :alt: ホストグループの登録
   :width: 6.4939in
   :height: 4.56706in

.. list-table:: ホストグループ一覧の登録
   :header-rows: 1
   :align: left

   * - | 項目
     - | 説明
     - | 入力必須
     - | 入力形式
     - | 制約事項
   * - | ホストグループ名
     - | ホストグループの名称を入力します。
     - | ○
     - | 手動入力
     - | 最大長255バイトです。
   * - | 優先順位
     - | 優先順位を入力します。
     - |
     - | 手動入力
     - | 入力範囲は0～2,147,483,647です。

.. tip::
         | 優先順位を入力しない場合、同一階層のホストグループが複数ある場合、優先されるホストグループの順序は、ランダムになります。


.. _hostgroup_definition:


ホストグループ親子関係の定義
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| :menuselection:`ホストグループ親子紐付` メニューを使用してホストグループの親子関係を定義します。

.. figure:: /images/ja/host_group/hostgroup_parent_child_link_list_register.png
   :alt: ホストグループ親子紐付
   :width: 6.33388in
   :height: 4.82042in

.. list-table:: ホストグループ親子紐付の登録
   :header-rows: 1
   :align: left

   * - | 項目
     - | 説明
     - | 入力必須
     - | 入力形式
     - | 制約事項
   * - | 親ホストグループ
     - | 親となるホストグループ名を選択します。
     - | ○
     - | リスト選択
     - |
   * - | 子ホストグループ
     - | ホストグループに紐付く子ホストグループ名を選択します。
     - | ○
     - | リスト選択
     - |

.. tip:: | 親子関係がループしているホストグループがあれば、登録、更新時にエラーが表示されます。
         | 下記の例では、「HG1（親）とHG2(子)」と「HG2（親）とHG3(子)」の親子関係が既に定義されているにも関わらず、更に「HG3（親）とHG1(子)」という逆の親子関係を定義しており、親子関係がループとなっています。

.. figure:: /images/ja/host_group/hostgroup_parent_child_link_list_error_loop.png
   :alt: 一覧/更新：エラー（親子関係がループ）
   :width: 5.22863in
   :height: 0.99251in

   一覧/更新：エラー（親子関係がループ）


.. _host_tie:

ホストグループとオペレーションと作業対象ホストの紐付け
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| :menuselection:`ホスト紐付管理` メニューを使用してホストグループとオペレーションに紐付く作業対象ホストを登録します。

.. figure:: /images/ja/host_group/host_link_list_register.png
   :alt: ホストグループ管理
   :width: 5.92051in
   :height: 4.22037in

.. list-table:: ホスト紐付管理
   :header-rows: 1
   :align: left

   * - | 項目
     - | 説明
     - | 入力必須
     - | 入力形式
     - | 制約事項
   * - | ホストグループ名
     - | ホストグループを選択します。
     - | ○
     - | リスト選択
     - |
   * - | オペレーション
     - | オペレーションを選択します。
     - |
     - | リスト選択
     - | ※1
   * - | ホスト名
     - | 作業対象ホストを選択します。
     - | ○
     - | リスト選択
     - |

.. tip:: | ※1  :menuselection:`ホスト紐付管理` では、 :menuselection:`オペレーション` は空登録も可能です。空登録した場合は、すべてのオペレーションで紐付が有効になります。


| ホストグループとオペレーションと作業対象ホストを紐付けることで、下図のように、ホストグループ内で作業対象ホストの選択操作が可能となります。

- | 例1
  | ホストグループに所属する全てのホストを作業対象ホストとしたい場合

.. figure:: /images/ja/diagram/ホストグループ_作業対象ホスト1.png
   :alt: 作業対象ホスト
   :width: 4.72721in
   :height: 4.6604in

- | 例2
  | 一部のホストを作業対象ホストとしたい場合

.. figure:: /images/ja/diagram/ホストグループ_作業対象ホスト2.png
   :alt: 作業対象ホスト
   :width: 4.72721in
   :height: 4.6604in

- | 例3
  | 例２のパターンの組み合わせ

.. figure:: /images/ja/diagram/ホストグループ_作業対象ホスト3.png
   :alt: 作業対象ホスト
   :width: 4.72721in
   :height: 4.6604in


- |  :menuselection:`ホスト紐付管理` のオペレーション設定例

.. figure:: /images/ja/host_group/hostgroup_parent_child_link_list_ex1.png
   :alt: ホストグループ親子紐付（例1）
   :width: 6.22721in
   :height: 4.6604in

.. figure:: /images/ja/host_group/host_link_list_ex1.png
   :alt: ホスト紐付管理（例1）
   :width: 6.29388in
   :height: 2.78024in

| 上記の例ではオペレーションを空登録したホストグループzabbix1、zabbix2の紐付はすべてのオペレーションで有効になります。
| 一方、オペレーション登録したホストグループzabbix3は、登録したオペレーション「OP10」でのみ有効となります。

- | オペレーション「OP10」でのホストグループ紐付

.. figure:: /images/ja/host_group/overview_inheritance_ex1_op1.drawio.png
   :width: 6.67391in
   :height: 3.20028in
   :align: left
   :alt: オペレーション「OP1」でのホストグループ紐付

- | オペレーション「OP10」以外でのホストグループ紐付

.. figure:: /images/ja/host_group/overview_inheritance_ex1_op10.drawio.png
   :width: 6.67391in
   :height: 3.20028in
   :align: left
   :alt: オペレーション「OP1」以外でのホストグループ紐付


.. _para_register:

パラメータシートへの登録
^^^^^^^^^^^^^^^^^^^^^^^^

| 「 :ref:`para_create`」で作成したホストグループ用のパラメータシートメニューで、作業対象ホストまたはホストグループがもつ項目に、オペレーションごとの具体値を登録します。
| 登録後は参照/更新/廃止/復活が可能です。

.. figure:: /images/ja/host_group/parameter_sheet_as_hostgroup_register.png
   :alt: パラメータシート(ホストグループ利用)
   :width: 5.36046in
   :height: 4.67374in

.. list-table:: パラメータシート(ホストグループ利用)
   :header-rows: 1
   :align: left

   * - | 項目
     - | 説明
     - | 入力必須
     - | 入力形式
     - | 制約事項
   * - | ホスト名
     - | 作業対象ホストまたはホストグループを選択します。
       | 接頭辞[H]が作業対象ホスト、[HG]がホストグループです。
     - | ○
     - | リスト選択
     - |
   * - | オペレーション名
     - | オペレーションを選択します。
     - | ○
     - | リスト選択
     - |
   * - | 基準日時
     - | 基準日時が表示されます。
     - | -
     - | -
     - | 選択されたオペレーションの基準日時が表示されます。
   * - | 実施予定日
     - | 実施予定日が表示されます。
     - | -
     - | -
     - | 選択されたオペレーションの実施予定日が表示されます。
   * - | 最終実行日時
     - | 最終実行日時が表示されます。
     - | -
     - | -
     - | 選択されたオペレーションのオペレーションの最終実行日時が表示されます。
   * - | パラメータシートの対象項目
     - | 項目の具体値を入力します。「:ref:`value_reflect`」でオペレーションとMovementおよび、
       | 作業対象ホストに紐付く変数の具体値として反映されます。
     - | ※
     - | ※
     - | ※パラメータシート作成で定義した項目名、項目の設定になります。

| 「:menuselection:`ホスト名` 」と「:menuselection:`オペレーション`」の組み合わせは一意で登録します。
| 同じホストでも異なるオペレーションと組み合わせれば登録が可能です。


.. _hosted:

ホスト化
^^^^^^^^

|  「 :ref:`para_register` 」で登録した情報は、内部の処理「ホストグループ分解機能」により、オペレーション毎にまとめ、更にホストグループの紐付けに従い作業対象ホスト単位まで継承が行われます。
| 作業対象ホスト単位に継承された情報は、「 :ref:`para_create`」で作成したホスト用のパラメータシートメニューで参照することができます。
| 代入値自動登録用のメニューグループに所属するメニューになります。 参照のみ可能で、登録/更新/廃止/復活は不可です。

.. figure:: /images/ja/host_group/parameter_sheet_as_hg_subst_filter_0.png
   :alt: ホスト化(代入値自動登録用メニュー)
   :width: 6.45389in
   :height: 4.55373in


| ホスト化の流れの例を以下で説明します。

#. | パラメータシートメニューへ登録した項目は以下とします。
   | （「 :ref:`para_register` 」で登録する情報）

   .. list-table:: 「 :ref:`para_register`」で登録する情報
      :widths: 10 10 5 5
      :header-rows: 1
      :align: left

      * - 作業対象ホストorホストグループ
        - オペレーション
        - 項目1
        - 項目2
      * - HG_1
        - 2023/01/01_00:00_OP1
        - 111
        - AAA
      * - HG_2
        - 2023/01/01_00:00_OP1
        - ー
        - BBB
      * - host_1a
        - 2023/01/01_00:00_OP1
        - 222
        - ー

#. | ホストグループの親子関係は以下とします。
   | （「:ref:`hostgroup_definition`」で登録する情報）

   .. list-table:: ホストグループの親子関係
      :widths: 10 10
      :header-rows: 1
      :align: left

      * - 親ホストグループ
        - 子ホストグループ
      * - HG_1
        - hg_1a
      * - HG_1
        - hg_1b
      * - HG_2
        - hg_2a
      * - HG_2
        - hg_2b


#. | :menuselection:`ホストグループ` 、:menuselection:`オペレーション` 、:menuselection:`作業対象ホスト` の紐付情報は以下とします。
   | （「:ref:`host_tie`」で登録する情報）

   .. list-table:: 作業対象ホストの紐付情報
      :widths: 10 10 10
      :header-rows: 1
      :align: left

      * - ホストグループ
        - オペレーション
        - 作業対象ホスト
      * - hg_1a
        - 2023/01/01_00:00_OP1
        - host_1a
      * - hg_1b
        - 2023/01/01_00:00_OP1
        - host_1b
      * - hg_2a
        - 2023/01/01_00:00_OP1
        - host_2a
      * - hg_2b
        - 2023/01/01_00:00_OP1
        - host_2b


#. | （1）～（3）に情報が登録されている状態でホスト化が行われると、レコードは以下の内容となり、ホストグループに所属している作業対象ホスト単位に情報が設定されていることがわかります。

.. figure:: /images/ja/host_group/parameter_sheet_as_hg_filter.png
   :alt: ホスト化(入力用メニュー)
   :width: 6.45389in
   :height: 4.55373in

.. figure:: /images/ja/host_group/parameter_sheet_as_hg_subst_filter.png
   :alt: ホスト化(代入値自動登録用メニュー)
   :width: 6.45389in
   :height: 4.55373in


.. note::
   | ホストグループと作業対象ホストで項目を登録すると、作業対象ホストの項目が優先されます。従って、host_1aに登録した「222」が適用されています。
   | 作業対象ホストの項目が優先されますが、空の場合は上位から継承されます。host1_aの項目2は空だったので、親ホストグループであるHG_1の「AAA」が継承されています。
   | host_2aとhost_2bの項目1は空になっていますが、これはHG_2の項目1が空のためです。

.. _setvalue_tie:

オペレーションと作業対象ホストごとの項目の設定値を紐付け
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|  :menuselection:`代入値自動登録設定` メニュー画面で連携対象としたメニューと項目を、Movementの変数に紐付けます。登録/更新/廃止/復活が可能です。
| 登録した情報は内部の処理により :menuselection:`代入値管理` 」メニュー画面と「 :menuselection:`作業対象ホスト` 」メニュー画面に反映されます。
| 詳細については、「:ref:`para_create`」を参照してください。

.. _host_reflection:

オペレーションに紐付く作業対象ホストの反映
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| オペレーションに関連付く作業対象ホストが自動で反映されます。
| 反映結果は「 :menuselection:`作業対象ホスト` 」メニュー画面で確認できます。
| 詳細については、「:ref:`para_create`」を参照してください。

.. _value_reflect:

代入値の反映
^^^^^^^^^^^^

| オペレーションごとに、対象のMovement で利用されるPlaybookやテンプレートファイル内の変数に代入する具体値が自動で反映されます。
| ここでの具体値は「 :ref:`para_register`」で入力した具体値となります。
| 反映結果は「 :menuselection:`代入値管理` 」メニュー画面で確認できます。
| 詳細については、「:ref:`para_create`」を参照してください。
