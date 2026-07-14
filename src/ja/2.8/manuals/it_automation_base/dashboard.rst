===========================
メインメニュー(DashBoard)
===========================


はじめに
========
| 本書は、ITAのメインメニュー(Dashboard)について記載したものです。

メインメニューについて
======================

| メインメニューにはWidgetが表示されます。
| Widgetの内容や配置は個人でカスタマイズすることができます。
| カスタマイズしたDashboardの構成情報は、ユーザー毎にシステム上に保存されるので、別環境からログインした場合でもカスタマイズした設定が利用できます。

1. | 画面構成

   | No.1～5のWidgetがデフォルトで表示されます。
   | No.6～9はデフォルトでは表示されません。（ :guilabel:`Dashboard編集` → :guilabel:`Widget追加` を押下することで追加できます）

.. figure:: /images/ja/dashboard/dashboard_base.drawio.png
   :width: 6.67391in
   :height: 3.20028in
   :align: left
   :alt: 各種Widget

   各種Widget


.. list-table:: Widget一覧（No.1～9）
   :header-rows: 1
   :align: left

   * - No
     - Widget名
     - 説明
     - デフォルト
   * - 1
     - メニューグループ
     - | 各メニューグループのパネルが表示されます。
       | パネルを押下することで指定のメニューグループのメインメニューへ遷移できます。
       | インストールしたドライバーのみが表示されます。
       | 「メニューグループ」Widgetを削除することはできません。
     - 表示
   * - 2
     - Movement
     - | 各オーケストレーションに登録されているMovementの件数が円グラフで表示されます。
       | 「SUM」列の数値またはグラフを押下することで、各ドライバの「Movement一覧」メニューへ遷移できます。
     - 表示
   * - 3
     - 作業状況
     - | Conductorの作業状況のステータスごとに件数が円グラフで表示されます。
       | 「CON」列の数値を押下することで、「Conductor」メニューグループの「Conductor作業履歴」メニューへ遷移できます。
     - 表示
   * - 4
     - 作業結果
     - | Conductorの作業結果のステータスごとに件数が円グラフで表示されます。
       | 「CON」列の数値を押下することで、「Conductor」メニューグループの「Conductor作業履歴」メニューへ遷移できます。
     - 表示
   * - 5
     - 作業履歴
     - | Conductorの作業履歴の日別の結果が棒グラフで表示されます。
       | 棒グラフにカーソルを合わせて押下すると件数の詳細が表示されます。
       | 「CON」列の数値を押下することで、「Conductor」メニューグループの「Conductor作業履歴」メニューへ遷移できます。
     - 表示
   * - 6
     - メニューセット
     - メインメニューとは別にメニューグループのセットを作成できます。
     - 非表示
   * - 7
     - リンク
     - リンクのリストを作成できます。
     - 非表示
   * - 8
     - 予約作業確認
     - | ステータスが「未実行（予約）」であるConductorの一覧を表示します。
       | インスタンスID 、Conductor名、オペレーション名、予約日時、予約日時までの残り時間が確認可能です。
       | インスタンスIDを押下すると、対象の作業確認画面へと遷移します。
     - 非表示
   * - 9
     - 画像
     - 画像を貼り付けできます。
     - 非表示

Dashboardの編集、操作
=====================

DashBoardの編集
---------------

| 画面右上の「:guilabel:`DashBoard編集` 」ボタンを押下することで編集画面に移行します。

.. figure:: /images/ja/dashboard/dashboard_edit.drawio.png
   :width: 6.67391in
   :height: 3.20028in
   :alt: DashBoard編集ボタン

   DashBoard編集ボタン

| 編集中は以下の操作が可能です。

- | Widget追加
  | 「:ref:`add_widget` 」を参照してください。
- | Widget編集、削除
  | 「:ref:`edit_widget` 」を参照してください。
- | 編集反映
  | :guilabel:`編集反映` から、Widgetの変更内容を反映します。
- | リセット
  | :guilabel:`リセット` から、Widgetの変更内容をリセットすることが可能です。初期状態に戻します。
- | 編集取消
  | :guilabel:`編集取消` から、Widgetの変更内容を取り消すことが可能です。変更前の状態に戻します。

.. _add_widget:

Widget追加
^^^^^^^^^^

#. | :guilabel:` Widget追加` で選択すると、Widget選択が表示されます。
   | 追加したいWidgetを選択し、:guilabel:`適用` を押下すると、選択したWidgetが追加されます。

   .. figure:: /images/ja/dashboard/dashboard_add_widget.gif
      :width: 6.67391in
      :height: 3.20028in
      :align: left
      :alt: Widget追加操作

      Widget追加操作

.. tip:: | Blankについて
         | 既存Widgetの上もしくは下にカーソルを合わせると、「 :guilabel:`＋Blank` 」ボタンが表示されます。
         | :guilabel:`＋Blank` 押下後、Blankが1行追加されます。
         | 行内にWidgetが配置されていない場合、Blank上を選択すると、Blankが1行削除されます。

         .. figure:: /images/ja/dashboard/dashboard_blank.gif
            :width: 6.67391in
            :height: 3.20028in
            :align: left
            :alt: Blankの追加、削除

            Blankの追加、削除

.. tip:: | メニューセットについて
         | 「メニューグループ」Widgetから「メニューセット」へ、パネルをドラッグ＆ドロップで移動させることができます。

         .. figure:: /images/ja/dashboard/dashboard_edit_menuset.gif
            :width: 6.67391in
            :height: 3.20028in
            :align: left
            :alt: メニューセットパネル追加

            メニューセットパネル追加

.. _edit_widget:

Widget編集、削除
^^^^^^^^^^^^^^^^

| 各Widgetの右上に表示される各種ボタンからWidgetを編集、削除することが可能です。

- | ：Widget編集が表示されます。各Widgetの編集項目は以下を参照してください。
- | ：Widgetを削除します。

.. figure:: /images/ja/dashboard/dashboard_widget_edit_del.gif
   :width: 6.67391in
   :height: 3.20028in
   :align: left
   :alt: Widget編集、削除操作

   Widget編集、削除操作

| Widget共通設定、各Widget固有設定は以下です。

.. tabs::
   .. tab:: 共通設定

      | Widget共通の基本設定は以下です。

      .. figure:: /images/ja/dashboard/dashboard_widget_setting_common.png
         :width: 3.67391in
         :height: 3.20028in
         :align: left
         :alt: Widget共通設定

         Widget共通設定

      .. list-table:: Widget基本設定
         :header-rows: 1
         :align: left

         * - No
           - 項目名
           - 説明
           - 入力項目
         * - 1
           - 名称
           - Widgetの名称を変更します。
           - 手動入力
         * - 2
           - 横 結合数
           - 横 結合数を変更します。
           - | 手動入力
             | スライドにて選択
         * - 3
           - 縦 結合数
           - 縦 結合数を変更します。
           - | 手動入力
             | スライドにて選択
         * - 4
           - Widget表示
           - 枠・背景の表示、非表示を変更します。
           - | 選択
             | ・表示する
             | ・表示しない
         * - 5
           - タイトルバー
           - 枠・背景の表示、非表示を変更します。
           - | 選択
             | ・表示する
             | ・表示しない
         * - 6
           - 枠・背景
           - 枠・背景の表示、非表示を変更します。
           - | 選択
             | ・表示する
             | ・表示しない

   .. tab:: メニューグループ

      | メニューグループ個別設定は以下です。

      .. figure:: /images/ja/dashboard/dashboard_widget_setting_menugroup.png
         :width: 3.67391in
         :height: 3.20028in
         :align: left
         :alt: Widget固有設定(メニューグループ)

         Widget固有設定(メニューグループ)

      .. list-table:: Widget固有設定(メニューグループ)
         :header-rows: 1
         :align: left

         * - No
           - 項目名
           - 説明
           - 入力項目
         * - 1
           - 1行項目数
           - 1行項目数を変更します。
           - | 手動入力
             | スライドにて選択
         * - 2
           - 表示形式
           - 表示形式を変更します。
           - | 選択
             | ・アイコン
             | ・リスト
         * - 3
           - メニュグループ名
           - メニュグループ名の表示、非表示を変更します。
           - | 選択
             | ・表示する
             | ・表示しない
         * - 4
           - ページ移動
           - ページ移動の方法を変更します。
           - | 選択
             | ・同じタブ
             | ・別タブ
             | ・別ウィンドウ

   .. tab:: Movement登録数

      | Movement登録数の個別設定は以下です。

      .. figure:: /images/ja/dashboard/dashboard_widget_setting_movement.png
         :width: 3.67391in
         :height: 3.20028in
         :align: left
         :alt: Widget固有設定(Movement登録数)

         Widget固有設定(Movement登録数)

      .. list-table:: Widget固有設定(Movement登録数)
         :header-rows: 1
         :align: left

         * - No
           - 項目名
           - 説明
           - 入力項目
         * - 1
           - ページ移動
           - ページ移動の方法を変更します。
           - | 選択
             | ・同じタブ
             | ・別タブ
             | ・別ウィンドウ

   .. tab:: Conductor作業状況

      | Conductor作業状況の個別設定は以下です。

      .. figure:: /images/ja/dashboard/dashboard_widget_setting_conductor_status.png
         :width: 3.67391in
         :height: 3.20028in
         :align: left
         :alt: Widget固有設定(Conductor作業状況)

         Widget固有設定(Conductor作業状況)

      .. list-table:: Widget固有設定(Conductor作業状況)
         :header-rows: 1
         :align: left

         * - No
           - 項目名
           - 説明
           - 入力項目
         * - 1
           - ページ移動
           - ページ移動の方法を変更します。
           - | 選択
             | ・同じタブ
             | ・別タブ
             | ・別ウィンドウ

   .. tab:: Conductor作業結果

      | Conductor作業結果の個別設定は以下です。

      .. figure:: /images/ja/dashboard/dashboard_widget_setting_conductor_result.png
         :width: 3.67391in
         :height: 3.20028in
         :align: left
         :alt: Widget固有設定(Conductor作業結果)

         Widget固有設定(Conductor作業結果)

      .. list-table:: Widget固有設定(Conductor作業結果)
         :header-rows: 1
         :align: left

         * - No
           - 項目名
           - 説明
           - 入力項目
         * - 1
           - ページ移動
           - ページ移動の方法を変更します。
           - | 選択
             | ・同じタブ
             | ・別タブ
             | ・別ウィンドウ

   .. tab:: Conductor作業履歴

      | Conductor作業履歴の個別設定は以下です。

      .. figure:: /images/ja/dashboard/dashboard_widget_setting_conductor_history.png
         :width: 3.67391in
         :height: 3.20028in
         :align: left
         :alt: Widget固有設定(Conductor作業履歴)

         Widget固有設定(Conductor作業履歴)

      .. list-table:: Widget固有設定(Conductor作業履歴)
         :header-rows: 1
         :align: left

         * - No
           - 項目名
           - 説明
           - 入力項目
         * - 1
           - 期間
           - 期間を変更します。
           - | 手動入力
             | スライドにて選択
         * - 2
           - ページ移動
           - ページ移動の方法を変更します。
           - | 選択
             | ・同じタブ
             | ・別タブ
             | ・別ウィンドウ

   .. tab:: メニューセット

      | メニューセットの個別設定は以下です。

      .. figure:: /images/ja/dashboard/dashboard_widget_setting_menugroup.png
         :width: 3.67391in
         :height: 3.20028in
         :align: left
         :alt: Widget固有設定(メニューセット)

         Widget固有設定(メニューセット)

      .. list-table:: Widget固有設定(メニューセット)
         :header-rows: 1
         :align: left

         * - No
           - 項目名
           - 説明
           - 入力項目
         * - 1
           - 1行項目数
           - 1行項目数を変更します。
           - | 手動入力
             | スライドにて選択
         * - 2
           - 表示形式
           - 表示形式を変更します。
           - | 選択
             | ・アイコン
             | ・リスト
         * - 3
           - メニュグループ名
           - メニュグループ名の表示、非表示を変更します。
           - | 選択
             | ・表示する
             | ・表示しない
         * - 4
           - ページ移動
           - ページ移動の方法を変更します。
           - | 選択
             | ・同じタブ
             | ・別タブ
             | ・別ウィンドウ

   .. tab:: リンクリスト

      | リンクリストの個別設定は以下です。

      .. figure:: /images/ja/dashboard/dashboard_widget_setting_link_list.png
         :width: 3.67391in
         :height: 3.20028in
         :align: left
         :alt: Widget固有設定(リンクリスト)

         Widget固有設定(リンクリスト)

      .. list-table:: Widget固有設定(リンクリスト)
         :header-rows: 1
         :align: left

         * - No
           - 項目名
           - 説明
           - 入力項目
         * - 1
           - 1行項目数
           - 1行項目数を変更します。
           - | 手動入力
             | スライドにて選択
         * - 2
           - ページ移動
           - ページ移動の方法を変更します。
           - | 選択
             | ・同じタブ
             | ・別タブ
             | ・別ウィンドウ
         * - 3
           - 項目
           - | 項目を設定します。
             | :guilabel:`項目を追加する` で入力欄を追加できます。
             | 表示順序の変更、項目の削除が可能です。
           - | 手動入力
             | ・名称
             | ・リンクURL

   .. tab:: Conductor予約作業確認

      | Conductor予約作業確認の個別設定は以下です。

      .. figure:: /images/ja/dashboard/dashboard_widget_setting_conductor_reserve.png
         :width: 3.67391in
         :height: 3.20028in
         :align: left
         :alt: Widget固有設定(Conductor予約作業確認)

         Widget固有設定(Conductor予約作業確認)

      .. list-table:: Widget固有設定(Conductor予約作業確認)
         :header-rows: 1
         :align: left

         * - No
           - 項目名
           - 説明
           - 入力項目
         * - 1
           - 期間
           - 期間を変更します。
           - | 手動入力
             | スライドにて選択
         * - 2
           - ページ移動
           - ページ移動の方法を変更します。
           - | 選択
             | ・同じタブ
             | ・別タブ
             | ・別ウィンドウ

   .. tab:: 画像

      | 画像の個別設定は以下です。

      .. figure:: /images/ja/dashboard/dashboard_widget_setting_image.png
         :width: 3.67391in
         :height: 3.20028in
         :align: left
         :alt: Widget固有設定(画像)

         Widget固有設定(画像)

      .. list-table:: Widget固有設定(画像)
         :header-rows: 1
         :align: left

         * - No
           - 項目名
           - 説明
           - 入力項目
         * - 1
           - 画像URL
           - 1画像URLを設定します。
           - | 手動入力
         * - 2
           - リンクURL
           - リンクURLを設定します。
           - | 手動入力
         * - 3
           - ページ移動
           - ページ移動の方法を変更します。
           - | 選択
             | ・同じタブ
             | ・別タブ
             | ・別ウィンドウ
