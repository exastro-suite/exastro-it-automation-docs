==========================================
Excel一括エクスポート・インポート
==========================================

はじめに
========

| 本書は、ITAのExcel一括エクスポート・インポートの機能および操作方法について説明します。

Excel一括エクスポート・インポートの概要
=======================================

| 本章ではExcel一括エクスポート・インポートについて説明します。

Excel一括エクスポート・インポート
---------------------------------

機能について
^^^^^^^^^^^^

| Execl一括エクスポート・インポートは、各メニューにあるダウンロード可能なExcelファイルをzipファイルにまとめて一括でエクスポート・インポートを行うものです。ダウンロード可能なファイルについては『\ :ref:`管理コンソール<management_console_download_all_and_edit_file_uploads>`\』を参照してください。
| エクスポート可能なメニューは :menuselection:`ロール・メニュー紐付管理` メニューにて『紐付け』項目が『閲覧のみ』もしくは『メンテナンス可』かつ、編集用Excelファイルのあるメニューのみです。
| インポート可能なメニューは :menuselection:`ロール・メニュー紐付管理` メニューにて『紐付け』項目が『メンテナンス可』かつ、編集用Excelファイルのあるメニューのみです。

Execl一括エクスポート・インポートのメニュー、画面構成
=====================================================

| 本章では、Excel一括エクスポート・インポートのメニュー、画面構成について説明します。

メニュー一覧
-------------

| Excel一括エクスポート・インポートのメニューを以下に示します。

.. list-table:: ITAメニュー一覧
   :header-rows: 1
   :align: left

   * - No
     - メニュー・画面
     - 説明
   * - 1
     - Excel一括エクスポート
     - 各メニューにあるダウンロード可能なファイルをzipにまとめ、エクスポートします。
   * - 2
     - Excel一括インポート
     - ダウンロード可能なファイルをまとめたzipをインポートします。
   * - 3
     - Excel一括エクスポート・インポート管理
     -  :menuselection:`Excel一括エクスポート` メニューで実行したエクスポートと、 :menuselection:`Excel一括エクスポート` メニューで実行したインポートの状況を管理します。

機能・操作方法説明
==================

Excel一括エクスポート
---------------------

| 各メニューにあるダウンロード可能なファイルをzipにまとめ、エクスポートします。

| (1) エクスポートする廃止情報を選択します。
| 廃止情報一覧を以下に示します。

.. list-table:: 廃止情報一覧
   :header-rows: 1
   :align: left

   * - 名称
     - 説明
   * - 全レコード
     - すべてのデータをエクスポートします。
   * - 廃止を除く
     - 廃止状態のデータを除いたデータをエクスポートします。
   * - 廃止のみ
     - 廃止状態のデータのみエクスポートします。

| (2) エクスポートするメニューを選択します
| 表示されるメニューは :menuselection:`ロール・メニュー紐付管理` メニューの『紐付』項目が『メンテナンス可』もしくは『閲覧のみ』かつ、編集用Excelファイルのあるメニューのみです。

.. figure:: /images/ja/export_import/excel_export_menu_list.png
   :width: 800px
   :alt: Excel一括エクスポート メニューリスト
   :align: center

   Excel一括エクスポート画面

| (3) メニューを選択後、《エクスポート》ボタンを押下します。
| エクスポート処理の実行№が表示されるので、 :menuselection:`Excel一括エクスポート・インポート管理` メニューで処理のステータスを確認してください。

.. figure:: /images/ja/export_import/excel_export_execute.gif
   :width: 800px
   :alt: Excel一括エクスポート エクスポート実行
   :align: center

   Excel一括エクスポート画面(2)

| (4) エクスポートしたファイルの中身は以下の通りです。

.. code-block::
   :name: エクスポート ファイル構成

   ITA_FILES_YYYYMMDDhhmmss.zip …①                                     
   ├─ MENU_LIST.txt …②
   └─ 101_管理コンソール …③
       └─ システム設定_20210708235959.xlsx …④
  
.. list-table:: エクスポート ファイル構成
   :header-rows: 1
   :align: left

   * - No
     - 名称
     - 拡張子
     - 説明
   * - 1
     - ファイル名
     - ファイル
     - ファイル名は『ITA_FILES_YYYYMMDDhhmmss.zip』です。
   * - 2
     - MENU_LIST.txt
     - txt
     - エクスポートしたメニューREST名とファイル名の一覧が出力されます。
   * - 3
     - メニューグループフォルダ
     - フォルダ
     - | メニューグループごとに生成されます。
       | フォルダ名は『メニューグループID_メニューグループ名』です。
       | フォルダ名が200文字を超える場合は前方から200文字のみ出力されます。
   * - 4
     - ダウンロードファイル
     - xlsx
     - | Excelとして出力されます。
       | 所属するメニューグループフォルダの下に配置されます。


Excel一括インポート
-------------------

|  :menuselection:`Excel一括エクスポート` メニューでエクスポートしたデータを編集し、インポートします。

1. Zipファイルの編集

   #. | インポートするファイルリストを作成します。
      |  :menuselection:`Excel一括エクスポート` メニューでエクスポートしたzip内にあるMENU_LIST.txtを編集することによって、インポートするファイルリストを編集することが出来ます。
      | MENU_LIST.txtはエクスポートした時点のメニューREST名とファイル名が記載されています。
      | 『#』から始まる行はコメントとして入力することが出来ます。
      | フォーマットは以下の通りです。
      | メニューREST名:ファイル名

      .. code-block::
         :name: MENU_LIST.txt

         #管理コンソール
         system_settings:システム設定_20230425162004.xlsx                                     
         #基本コンソール
         operation_list:オペレーション一覧_20230425162005.xlsx

      | ※インポートするメニューは :menuselection:`Excel一括インポート` メニューでも選択可能です。

   #. インポートするファイルを編集します。

   #. |  編集したファイルをzipにまとめます。
      | インポートに必要なファイルは以下の通りです。
      | ・MENU_LIST.txt
      | ・インポートするファイル

   #. | インポートするファイルの中身は以下の通りです。

      .. code-block::
         :name: インポート ファイル構成

         ITA_FILES_YYYYMMDDhhmmss.zip …①                                     
         ├─ MENU_LIST.txt …②
         └─ 101_管理コンソール …③
             └─ システム設定_20210708235959.xlsx …④

      .. list-table:: インポート ファイル構成
         :header-rows: 1
         :align: left

         * - No
           - 名称
           - 拡張子
           - 説明
         * - 1
           - ファイル名
           - ファイル
           - ファイル名は任意です。
         * - 2
           - MENU_LIST.txt
           - txt
           - インポートするメニューのREST名とファイル名を記載します。
         * - 3
           - メニューグループフォルダ
           - フォルダ
           - | メニューグループごとに作成します。
             | フォルダ名は『メニューグループID_メニューグループ名』です。
         * - 4
           - 編集用Excelファイル
           - xlsx
           - 編集用Excelファイルをメニューグループフォルダ配下に置きます。

2. インポート処理

   #. | 《ファイル選択》ボタンを押下し、インポートするzipをアップロードします。

      .. figure:: /images/ja/export_import/excel_upload_execute.gif
         :width: 800px
         :alt: Excel一括インポート アップロード実行
         :align: center

         Excel一括インポート画面(1)

   #. | インポートしたファイル内のメニューの一覧が表示されます。インポートするメニューを選択して《インポート》ボタンを押下します。
      | チェックボックスがチェックされているメニューがインポートされます。
      | インポートする必要がないメニューは、チェックを外してください。
      | インポート処理の実行№が表示されるので、 :menuselection:`Excel一括エクスポート・インポート管理` メニューで処理のステータスを確認してください。

      .. figure:: /images/ja/export_import/excel_import_menu_list.png
         :width: 800px
         :alt: Excel一括インポートメニューリスト
         :align: center

         Excel一括インポート画面(2)

      | 以下の条件に当てはまる場合、エラーとなりチェックボックスが非活性化されます。
      | １．MENU_LIST.txtに２つ以上同じメニューREST名を指定する
      | ２．MENU_LIST.txtに２つ以上の別メニューに同じファイル名を指定する
      | ３．MENU_LIST.txtのフォーマットに沿ってない記述がある
      | ４．MENU_LIST.txtで存在しないメニューREST名を記載する
      | ５．MENU_LIST.txtでインポートしたzip内に存在しないファイルを指定する
      | ６．別のフォルダに同名のファイルが２つ以上ある
      | ７．MENU_LIST.txtが含まれていない
      | ８．メニューグループフォルダ名が「メニューグループID_メニューグループ名」の組み合わせになっていない。
      | ９．対象メニューに対しログインユーザが『メンテナンス可』の権限を有していない

Excel一括エクスポート・インポート管理
-------------------------------------

|  :menuselection:`Excel一括エクスポート` メニューで実行したエクスポートと、 :menuselection:`Excel一括インポート` メニューで実行したインポートの状況を管理します。

.. figure:: /images/ja/export_import/excel_export_import_list.png
   :width: 800px
   :alt: Excel一括エクスポート・インポート管理
   :align: center

   Excel一括エクスポート・インポート管理画面

.. list-table:: 一覧画面項目一覧（メニューエクスポート・インポート管理）
   :header-rows: 1
   :align: left

   * - 項目
     - 説明
   * - 実行No.
     - 一意のIDが自動採番されます。
   * - ステータス
     - | 〔未実行〕、〔実行中〕、〔完了〕の順に遷移します。
       | エラーが発生した場合は、〔完了(異常)〕になります。
   * - 処理種別
     - | エクスポート・・・Excel一括エクスポート
       | インポート・・・Excel一括インポート
   * - 廃止情報
     - 〔全レコード〕、〔廃止を除く〕または〔廃止のみ〕が表示されます。
   * - 実行ユーザ
     - エクスポート処理またはインポート処理を実行したユーザが表示されます。
   * - ファイル名
     - | エクスポートの場合、〔完了〕になるとエクスポートデータが表示されるので、ダウンロードして使用してください。
       | インポートの場合、インポートしたデータが表示されます。 
   * - 言語
     - | ログインユーザの取扱う言語が表示されます。
       | この言語でファイルがエクスポートされます。 
   * - 結果
     - | インポートした結果を記載したテキストファイルが表示されます。
       | ダウンロードして使用してください。

| 結果ファイルのサンプルを以下に示します。
| インポートしたファイル単位で結果が出力されます。

.. code-block::

   101_管理コンソール:10101_システム設定
   入力ファイル:システム設定_20230425155441.xlsx

   登録: 0件
   更新: 2件
   廃止: 1件
   復活: 1件
   エラー: 0件

   202_Ansible-Legacy:20201_Movement一覧
   入力ファイル:Movement一覧_20230425155442.xlsx

   登録: 0件
   更新: 0件
   廃止: 0件
   復活: 0件
   エラー: 1件
   movement_name: ['必須項目です。:(12行目)']

   202_Ansible-Legacy:20202_Playbook素材集
   入力ファイル:Playbook素材集_20230425155443.xlsx
   このメニューの編集用Excelファイルではありません。
