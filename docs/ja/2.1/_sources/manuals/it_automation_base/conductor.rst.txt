=========
Conductor
=========

はじめに
========

本書は、Exastro IT AutomationのConductorの機能および操作方法について説明します。

Conductorの概要
===============

| 本章では Conductorの機能、操作方法について説明します。
| Conductorでは、Exastro IT Automationを利用して作業を行う上で共通に必要となる以下の機能を提供します。

Conductor のメニュー、画面構成
===============================

| 本章では、Conductorのメニュー 、画面構成について説明します。


Conductor メニュー 一覧
-----------------------

| :menuselection:`Conductorメニューグループ` のメニューについて以下に示します。

.. table:: Exastro IT Automation Conductor メニュー 一覧
   :align: left

   +--------+----------------------+---------------------------------+------------------------------------------------------------------------------------------+
   | **No** | **メニューグループ** | **メニュー**                    | **説明**                                                                                 |
   |        |                      |                                 |                                                                                          |
   |        |                      |                                 |                                                                                          |
   |        |                      |                                 |                                                                                          |
   |        |                      |                                 |                                                                                          |
   |        |                      |                                 |                                                                                          |
   |        |                      |                                 |                                                                                          |
   +========+======================+=================================+==========================================================================================+
   | 1      | Conductor            | Conductorインターフェース情報   | Conductorのインターフェース情報をメンテナンス(閲覧/更新)出来ます。                       |
   |        |                      |                                 |                                                                                          |
   |        |                      |                                 | 本メニューは必ず1レコードである必要があります。                                          |
   +--------+                      +---------------------------------+------------------------------------------------------------------------------------------+
   | 2      |                      | Conductor通知先定義             | Conductor で作業時に実行される通知に関する定義をメンテナンス(閲覧/登録/更新)出来ます。   |
   +--------+                      +---------------------------------+------------------------------------------------------------------------------------------+
   | 3      |                      | Conductor一覧                   | Conductorをメンテナンス(閲覧/廃止)出来ます。                                             |
   |        |                      |                                 |                                                                                          |
   |        |                      |                                 | :guilabel:`詳細` をクリックするとConductor編集/作業実行メニューに遷移します。            |
   +--------+                      +---------------------------------+------------------------------------------------------------------------------------------+
   | 4      |                      | Conductor編集作業実行           | Conductorを編集/作業実行出来ます。                                                       |
   +--------+                      +---------------------------------+------------------------------------------------------------------------------------------+
   | 5      |                      | Conductor作業一覧               | Conductor一覧(実行履歴)を閲覧出来ます。                                                  |
   |        |                      |                                 |                                                                                          |
   |        |                      |                                 | :guilabel:`詳細` をクリックするとConductor作業確認に遷移します。                         |
   +--------+                      +---------------------------------+------------------------------------------------------------------------------------------+
   | 6      |                      | Conductor作業確認               | Conductor作業の実行結果を確認出来ます。                                                  |
   +--------+                      +---------------------------------+------------------------------------------------------------------------------------------+
   | 7      |                      | Conductor定期作業実行           | スケジュールに従って定期的に実行するConductor作業をメンテナンス(閲覧/登録/更新)出来ます。|
   |        |                      |                                 |                                                                                          |
   |        |                      |                                 | :guilabel:`作業一覧確認` をクリックするとConductor作業一覧に遷移します。                 |
   +--------+----------------------+---------------------------------+------------------------------------------------------------------------------------------+

ITA Conductor利用手順
=====================

作業フロー
----------

| ITA Conductorにおける標準的な作業フローは以下の通りです。

#. | 機器情報を登録/確認する(Ansible共通)
#. | オペレーションを登録/確認する(基本コンソール)
#. | ITAの各DriverからMovementを登録する
#. | Movementを確認する(基本コンソール)
#. | Conductorのインターフェース情報を登録する
#. | Conductorを登録する
#. | Conductorを確認する
#. | Conductor実行する
#. | Conductor実行結果を確認する
#. | Conductor実行履歴を確認する

- | 「機器情報」の登録方法については、「Ansible共通 :ref:`ansible_common_device_list` 」を参照して下さい。
- | 「オペレーション」の登録方法については、「基本コンソール - :ref:`basic_console_operation` 」を参照して下さい。
- | Movementの登録方法については、各Driverの利用手順マニュアルを参照して下さい。 
- | Conductor実行時の各 Movementで共有するディレクトリパスが利用可能です。
  | Movement間で情報伝達する必要がある場合、共有するディレクトリパスを利用する事で情報の受け渡しが可能となります。
  | 共有対象については、「Ansible driver」を対象としています。
  | 「Ansible driver」に関する詳細は、「:doc:`../ansible-driver/index`」を参照して下さい。

  .. | 共有対象については、「Ansible driver」と「Terraformdriver」を対象としています。
  .. | 「Ansible driver」に関する詳細は、別紙、「利用手順マニュアルAnsible-driver」を参照して下さい。
  .. | 「Terraform driver」に関する詳細は、別紙、「利用手順マニュアルTerraform-driver」を参照して下さい。

- | 「Conductor call」で実行した作業フローについては、それぞれ個別に共有ディレクトリパスを持ちます。
  | （作業フローを跨いでいるMovemetについては、共有の対象外となります。）


機能・操作方法説明
==================

Conductorインターフェース情報
------------------------------

1. :menuselection:`「Conductorインターフェース情報」メニュー` では、Conductorから実行される各Movementで共有するディレクトリのパスと :menuselection:`「Conductor作業確認」メニュー` のリフレッシュ間隔を設定します。

   .. figure:: /images/ja/conductor/conductor_interface/conductor_interface.png
      :width: 800px
      :alt: Conductorインターフェース情報

      Conductorインターフェース情報

2. :menuselection:`「Conductorインターフェース情報」メニュー-->「一覧」サブメニュー` の詳細は以下の通りです。

   .. table:: 「一覧」サブメニュー
      :widths: 10 30 8 8 8
      :align: left

      +-----------------------------+----------------------------------------------------------------------------------------------------------------------------+----------+-----------+-------------------+
      | 項目                        | 説明                                                                                                                       | 入力必須 | 入力形式  | 制約事項          |
      +=============================+============================================================================================================================+==========+===========+===================+
      | ConductorインターフェースID | システム側で自動採番されるため、編集不可です。                                                                             |          | 自動入力  |                   |
      +-----------------------------+----------------------------------------------------------------------------------------------------------------------------+----------+-----------+-------------------+
      | 状態監視周期（単位ミリ秒）  |  「Conductor作業実行」の表示をリフレッシュする間隔を入力します。通常は3000ミリ秒程\                                        |  ○       | 手動入力  | 最小値1000ミリ秒  |
      |                             |  度が推奨値です。                                                                                                          |          |           |                   |
      +-----------------------------+----------------------------------------------------------------------------------------------------------------------------+----------+-----------+-------------------+
      | 備考                        | 自由記述欄です。                                                                                                           | ー       | 手動入力  | ー                |
      +-----------------------------+----------------------------------------------------------------------------------------------------------------------------+----------+-----------+-------------------+

.. _conductor_notice:


Conductor通知先定義
-------------------

1. :menuselection:`「Conductor通知先定義」` メニューでは、Conductor で作業時に実行される通知に関する定義を設定出来ます。

   .. figure:: /images/ja/conductor/conductor_notice/conductor_notice.png
      :width: 800px
      :alt: Conductor通知先定義

      Conductor通知先定義

2. :menuselection:`「Conductor通知先定義」メニュー-->「一覧」サブメニュー` の詳細は以下の通りです。

   .. list-table:: 「一覧」サブメニュー
      :header-rows: 1
      :align: left

      * - 項目
        - 説明
        - 入力必須
        - 入力形式
      * - Conductor通知ID
        - システム側で自動採番されるため、編集不可です。
        - 
        - 自動入力
      * - 通知名称
        - 通知名称を入力してください。
        - ○
        - 手動入力
      * - 通知先URL
        - 通知先の URL を入力してください。 
        - ○
        - 手動入力
      * - ヘッダー
        - HTTP ヘッダフィールドを JSON 形式で入力してください。
        - ○
        - 手動入力
      * - メッセージ
        - メッセージ内容を通知先のサービスの仕様に沿って入力してください。
        - ○
        - 手動入力
      * - PROXY URL
        - PROXYの設定が必要な場合、URL を入力してください。
        - ○
        - 手動入力
      * - PROXY PORT
        - PROXY の設定が必要な場合、PORT を入力してください。
        - ○
        - 手動入力
      * - 作業確認URL
        - 作業確認用 URL の予約変数で使用する,FQDN を入力してください。
        - ○
        - 手動入力
      * - 抑止開始日時
        - 通知を抑止したい場合、入力してください。
        - ○
        - 手動入力
      * - 抑止終了日時
        - 通知を抑止したい場合、入力してください。
        - ○
        - 手動入力
      * - 備考
        - 自由記述欄です。
        - ー
        - 手動入力

   ※メッセージで利用可能な ITA 独自変数は、以下の表参照してください。

   .. list-table:: Conductor 通知先定義 ITA 独自変数
      :header-rows: 1
      :align: left

      * - ITA 独自変数
        - 変数指定内容
      * - __CONDUCTOR_INSTANCE_ID__ 
        - Conductor インスタンス ID
      * - __CONDUCTOR_NAME__ 
        - Conductor インスタンス名
      * - __STATUS_ID__    
        - ステータス ID
      * - __OPERATION_ID__  
        - オペレーション ID
      * - __OPERATION_NAME__   
        - 実行時のオペレーション名
      * - __EXECUTION_USER__
        - 作業実行ユーザー
      * - __PARENT_CONDUCTOR_INSTANCE_ID__ 
        - 親ConductorインスタンスID
      * - __PARENT_CONDUCTOR_NAME__   
        - 親Conductor名称
      * - __TOP_CONDUCTOR_INSTANCE_ID__
        - 最上位ConductorインスタンスID
      * - __TOP_CONDUCTOR_NAME__ 
        - 最上位Conductor名称
      * - __ABORT_EXECUTE_FLAG__   
        - 緊急停止フラグ
      * - __REGISTER_TIME__    
        - 登録日時
      * - __TIME_BOOK__    
        - 予約日時
      * - __TIME_START__    
        - 開始日時
      * - __TIME_END__     
        - 終了日時
      * - __NOTICE_NAME__    
        - 通知ログ
      * - __NOTE__    
        - 備考
      * - __JUMP_URL__     
        - Conductor作業確認画面のURL(作業確認URLを使用)

   | ※ステータスIDに対応するステータス名は以下となります。

   .. list-table:: ステータス一覧
      :header-rows: 1
      :align: left

      * - ステータスID
        - ステータス名
      * - 3
        - 実行中
      * - 4
        - 実行中（遅延）
      * - 5
        - 一時停止
      * - 6
        - 正常終了
      * - 7
        - 異常終了
      * - 8
        - 警告終了
      * - 9
        - 緊急停止
      * - 10
        - 予約取消
      * - 11
        - 想定外エラー
   
   | ※作業確認 URL の出力内容は、「作業確認 URL(FQDN)」の入力内容が使用され以下の形で出力されます。

    例:作業確認 URL(FQDN)の値を「http://localhost:38000」としていた場合
    http://localhost:38000/org002/workspaces/workspace1/ita/?menu=conductor_confirmation&conductor_instance_id=X

.. _conductor_list:


Conductor一覧
-------------

#. | :menuselection:`「Conductor一覧」` メニューでは、登録済みのConductorを参照/廃止出来ます。

   | :menuselection:`「一覧」サブメニュー` の  :guilabel:`詳細` をクリックすると、 :ref:`conductor_editandexcute` 画面へ遷移出来ます。

.. figure:: /images/ja/conductor/conductor_class_list/conductor-list.gif
   :width: 800px
   :alt: 「Conductor一覧」メニュー

   「Conductor一覧」メニュー

.. _conductor_editandexcute:


Conductor編集/作業実行
----------------------

.. table:: モード一覧
   :widths: 15,30
   :align: left

   +------------+---------------------------------------------------------------------------------------------------------+
   | **モード** | **説明**                                                                                                |
   +============+=========================================================================================================+
   | 編集\      | - | 新規Conductorを作成できるモード                                                                     |
   | モード     |                                                                                                         |
   |            | - | 「Conductor編集/作業実行」メニューのデフォルトのモード                                              |
   |            |                                                                                                         |
   |            | - | 編集モードから :guilabel:`選択` クリック後に任意のConductorを選択することで、閲覧モードへ変更       |
   +------------+---------------------------------------------------------------------------------------------------------+
   | 閲覧\      | - | Conductorを閲覧のみできるモード                                                                     |
   | モード     |                                                                                                         |
   |            | - | 「Conductor一覧」メニューの :guilabel:`詳細` から画面遷移後のモード                                 |
   |            |                                                                                                         |
   |            | - | 閲覧モードから :guilabel:`編集` クリック後に、更新モードへ変更                                      |
   +------------+---------------------------------------------------------------------------------------------------------+
   | 更新\      | - | 既存のConductorを編集できるモード                                                                   |
   | モード     |                                                                                                         |
   |            | - | 更新モードから :guilabel:`更新` クリック後に、閲覧モードへ変更                                      |
   +------------+---------------------------------------------------------------------------------------------------------+


| ※各モードで可能な操作については「 :ref:`conductor_editandexcute_list` 」を参照。


「編集」モードについて
~~~~~~~~~~~~~~~~~~~~~~

* | Conductor 名称、作業フローを構成する各パーツ（以下、Node）を登録します。
* | 選択したNodeにより、画面右上（詳細情報）に表示される内容が変わります。
  
.. figure:: /images/ja/conductor/condudtor_edit_and_excute/conductor_edit_mode.png
   :width: 800px
   :alt: Conductor編集/作業実行メニュー画面(編集モード)

   Conductor編集/作業実行メニュー画面(編集モード)


.. _node_list:

Node一覧
^^^^^^^^

* | 画面右側下部の領域には、利用可能なNodeが表示されます。
* | 以下のタブから構成されます。
  
  * | Movementタブ
  
    * | 登録済みのMovementのIDと名称の一覧

  * | Functionタブ
  
    * | Conductor end
    * | Conductor pause
    * | Conductor call
    * | Conditional branch
    * | Parallel branch
    * | Parallel merge
    * | Status File branch

* | 各Nodeについて、動作内容は以下の通りです。

.. table:: 各Node動作一覧
   :widths: 10 10 30
   :align: left

   +----------------+------------------------------+-----------------------------------+
   | **画像**       | **名称**                     | **動作説明**                      |
   +================+==============================+===================================+
   | |image1|       | Conductor start              | Conductorを開始します             |
   +----------------+------------------------------+-----------------------------------+
   | |image2|       | Conductor end                | Conductor終了します。             |
   |                |                              |                                   |
   |                |                              | ※複数のConductor \                |
   |                |                              | endがある場合、全てのConductor \  |
   |                |                              | endが終了を待ちます。             |
   +----------------+------------------------------+-----------------------------------+
   | |image3|       | Conductor pause              | 作業フローを一時停止します。      |
   |                |                              |                                   |
   |                |                              | 一時停止を\                       |
   |                |                              | 解除すると、次の処理へ進みます。  |
   +----------------+------------------------------+-----------------------------------+
   | |image4|       | Conductor call               | 別の登録済みのCond\               |
   |                |                              | uctorを呼び出し実行します。       |
   |                |                              |                                   |
   |                |                              | ※\                                |
   |                |                              | 呼び出し先のConductorが警告終了で\|
   |                |                              | 終了した場合、正常終了と同じよう\ |
   |                |                              | に後続の処理を実行して、呼び出し\ |
   |                |                              | 元のステータスには影響しません。  |
   +----------------+------------------------------+-----------------------------------+
   | |image6|       | Conditional branch           | 接続\                             |
   |                |                              | された、「Movement」、「Conducto\ |
   |                |                              | r call」\                         |
   |                |                              | の結果によ\                       |
   |                |                              | って、後続の処理を分岐させます。  |
   |                |                              |                                   |
   |                |                              | 指定可能\                         |
   |                |                              | なステータスは、以下になります。  |
   |                |                              |                                   |
   |                |                              | ・正常終了                        |
   |                |                              |                                   |
   |                |                              | ・異常終了                        |
   |                |                              |                                   |
   |                |                              | ・緊急停止                        |
   |                |                              |                                   |
   |                |                              | ・準備エラー                      |
   |                |                              |                                   |
   |                |                              | ・想定外エラー                    |
   |                |                              |                                   |
   |                |                              | ・SKIP完了                        |
   |                |                              |                                   |
   |                |                              | ・警告終了                        |
   +----------------+------------------------------+-----------------------------------+
   | |image7|       | Parallel branch              | 並\                               |
   |                |                              | 列して、「Movement」、「Conducto\ |
   |                |                              | r call」\                         |
   |                |                              | を実行します。                    |
   |                |                              |                                   |
   |                |                              | ※並列可能な実行数は、ITAの構成\   |
   |                |                              | やサーバースペックに依存します。  |
   +----------------+------------------------------+-----------------------------------+
   | |image8|       | Parallel merge               | 接続している全Nodeの処理\         |
   |                |                              | が完了後、次の処理を実行します。  |
   +----------------+------------------------------+-----------------------------------+
   | |image9|       | Status file branch           | 接続された、「\                   |
   |                |                              | Movement」の作業結果ディレクトリ\ |
   |                |                              | 内のステータスファイルの内容によ\ |
   |                |                              | って、後続の処理を分岐させます。  |
   +----------------+------------------------------+-----------------------------------+
   | |image10|      | Movement各種                 | Movementを実行します。            |
   +----------------+------------------------------+-----------------------------------+



.. |image1| image:: /images/ja/conductor/condudtor_edit_and_excute/conductor_start.png
   :width: 1.1811in
   :height: 0.4086in
.. |image2| image:: /images/ja/conductor/condudtor_edit_and_excute/conductor_end.png
   :width: 1.1811in
   :height: 0.4086in
.. |image3| image:: /images/ja/conductor/condudtor_edit_and_excute/conductor_pause.png
   :width: 1.1811in
   :height: 0.31287in
.. |image4| image:: /images/ja/conductor/condudtor_edit_and_excute/node_conductor_call.png
   :width: 1.22047in
   :height: 0.34259in
.. |image6| image:: /images/ja/conductor/condudtor_edit_and_excute/conductor_branch.png
   :width: 1.1811in
   :height: 0.67068in
.. |image7| image:: /images/ja/conductor/condudtor_edit_and_excute/parallel_branch.png
   :width: 1.1811in
   :height: 0.9765in
.. |image8| image:: /images/ja/conductor/condudtor_edit_and_excute/parallel_merge.png
   :width: 1.1811in
   :height: 0.67667in
.. |image9| image:: /images/ja/conductor/condudtor_edit_and_excute/status_file_branch.png
   :width: 1.12963in
   :height: 0.59834in
.. |image10| image:: /images/ja/conductor/condudtor_edit_and_excute/node_movement_alr.png
   :width: 1.1811in
   :height: 1.49864in


* | Nodeにおける制約事項は以下の通りです。

  * | 登録/更新を行うには、全てのNodeのIN/OUTが接続されている必要があります。

  .. figure:: /images/ja/conductor/condudtor_edit_and_excute/Node制約事項正常例Parallel_branch.png
      :width: 600px
      :alt: Node制約事項（正常例：Parallel branch）

      Node制約事項（正常例：Parallel branch）

  * | Parallel mergeを使用する場合、Parallel branchを使用している必要があります。

  .. figure:: /images/ja/conductor/condudtor_edit_and_excute/Node制約事項NG例Parallel_branch.png
     :width: 600px
     :alt: Node制約事項（NG例：Parallel branch）

     Node制約事項（NG例：Parallel branch）

  * | Conditional branch で分岐されたフローについてParallel mergeでマージする事はできません。

  .. figure:: /images/ja/conductor/condudtor_edit_and_excute/Node制約事項NG例Conditional_branch.png
     :width: 600px
     :alt: Node制約事項（NG例：Conditional branch）

     Node制約事項（NG例：Conditional branch）

  * | Parallel branch、Conditional branch、Parallel merge、Conductor pauseについて、連続して同じ種類のNodeを接続する事はできません。
  
  .. figure:: /images/ja/conductor/condudtor_edit_and_excute/Node制約事項NG例連続使用.png
     :width: 600px
     :alt: Node制約事項（NG例：連続使用）

     Node制約事項（NG例：連続使用）

  * | 更新中のConductorをConductor callで指定し、更新することはできません。
  
  * | 各NodeをNode一覧からドラッグ&ドロップで追加することが可能です。
 
  * | Node選択時、画面右上（詳細情報）に表示される「備考」欄には、処理説明やコメントをメモすることが可能です。

  * | 「備考」欄の記述は処理実行に影響はありません。Web上でのみ参照できるメモ欄です。

  * | Node設定後、:guilabel:`+登録` をクリックしてConductorを登録します。

各Node詳細情報
^^^^^^^^^^^^^^
* | 画面右側上部の領域には、選択しているNodeの詳細情報が表示されます。
* | 選択しているNodeによってタブの名称が変わります。


  #. | Node未選択時（Conductorタブ）

     * | Node未選択の場合表示されます。

     * | タブ内の項目は以下の通りです。

     * | :guilabel:`通知設定` ボタンをクリックすると「通知設定」のポップアップが表示されます。

     .. figure:: /images/ja/conductor/condudtor_edit_and_excute/conductor_notice_popup.png
        :width: 600px
        :alt: Conductor通知設定ポップアップ

        Conductor通知設定ポップアップ

     .. list-table:: 「Conductor」タブ
        :widths: 8 25 5 5 5
        :header-rows: 1
        :align: left
        
        * - **項目**
          - **説明**
          - **入力必須**
          - **入力形式**
          - **制約事項**
        * - ID
          - Conductorに対応した一意のIDが自動入力されます。
          - \-
          - 自動入力
          - \-
        * - 名称 
          - 任意のConductor名称を入力します。
          - ○
          - 手動入力
          - \-
        * - 更新日時 
          - 選択したConductorが更新された日時が自動入力されます。
          - \-
          - 自動入力
          - \-
        * - 通知 
          - | 実行する通知を選択します。
            | 各ステータスに対して、実行する通知を複数選択できます。
            | 選択できる通知は、「 :ref:`conductor_notice` 」で登録したものが対象となります。
          - \-
          - チェックボックス
          - \-
        * - Movement共通表示設定 
          - Movementノードの表示に関する設定(ノードの幅とMovement名の表示形式)を選択します。
          - \-
          - リスト選択
          - \-
        * - 備考 
          - Conductorに対する説明やコメントを入力します。
          - \-
          - 手動入力
          - \-

  #. | Movement選択時
  
     * |  「:ref:`node_list` 」における「Movement」タブ内のNodeを選択した場合表示されます。
     * | タブ名は選択したMovementのオーケストレータ名が表示されます（例_Ansible Legacy Role）。

     .. （オーケストレータ名：Ansible Legacy、Ansible Pioneer、Ansible Legacy Role、Terraform　）

     * | タブ内の項目は以下の通りです。

     .. list-table:: オーケストレータ名（Ansible Legacy Role）タブ
        :widths: 10 30 5 5 5
        :header-rows: 1
        :align: left
        
        * - **項目**
          - **説明**
          - **入力必須**
          - **入力形式**
          - **制約事項**
        * - Movement ID
          - 選択したMovementのIDが表示されます。
          - \-
          - 自動入力
          - \-
        * - 名称
          - 選択したMovementの名称が表示されます。
          - \-
          - 自動入力
          - \-
        * - スキップ
          - 対象作業をスキップする場合にチェックします。「Conductor作業実行」メニューにて、変更可能なパラメータです。
          - \-
          - 手動入力
          - \-
        * - 個別オペレーション
          - | :guilabel:`オペレーション選択` クリックして表示される一覧から任意の値を選択出来ます。
            | 選択したオペレーション名が表示されます。
          - \-
          - 選択
          - \-
        * - 備考
          - Nodeに対する説明やコメントを入力出来ます。
          - \-
          - 手動入力
          - \-


  #. 各Node選択時の「備考」欄
  
     * | 「:ref:`node_list` 」における「Movement」タブおよび「Function」タブ内の各Nodeを選択した場合表示されます。
     * | タブ内の項目は以下の通りです。
  
     .. list-table:: 各Node選択時のタブ
        :widths: 10 30 5 5 5
        :header-rows: 1
        :align: left
        
        * - **項目**
          - **説明**
          - **入力必須**
          - **入力形式**
          - **制約事項**
        * - 備考
          - Nodeに対する説明やコメントを入力出来ます。
          - \-
          - 手動入力
          - \-
  
  
  #. Conductor call選択時
  
     * | 「:ref:`node_list` 」における「Function」タブ内の「Conductor call」を選択した場合表示されます。
     * | タブ内の項目は以下の通りです。
  
     .. list-table:: 「Conductor call」タブ
        :widths: 10 30 5 5 5
        :header-rows: 1
        :align: left
        
        * - **項目**
          - **説明**
          - **入力必須**
          - **入力形式**
          - **制約事項**
        * - スキップ
          - | 対象作業をスキップする場合にチェックします。
            | Conductor作業実行画面にて、変更可能なパラメータです。
          - \-
          - ラジオボタン
          - \-
        * - 呼び出しConductor
          - | :guilabel:`Conductor選択` をクリックして表示される一覧からConductorを選択出来ます。
            | 指定したConductor名称が表示されます。
          - \-
          - 選択
          - \-
        * - 個別オペレーション
          - | :guilabel:`オペレーション選択` をクリックして表示される一覧から、任意のオペレーションを選択出来ます。
            | 指定したオペレーション名が表示されます。
          - \-
          - 選択
          - \-
  
  #. Conditional branch選択時
  
     * | 「:ref:`node_list` 」における「Function」タブ内の「Conditional branch」を選択した場合表示されます。
     * | タブ内の項目は以下の通りです。
    
  
     .. table:: 「Conditional branch」タブ
        :align: left
  
        +------+----------------------------------------------+---------------+---------------+---------------+
        | **項\| **説明**                                     | **入力必須**  | **入力形式**  | **制約事項**  |
        | 目** |                                              |               |               |               | 
        |      |                                              |               |               |               |
        |      |                                              |               |               |               |
        |      |                                              |               |               |               |
        |      |                                              |               |               |               |
        |      |                                              |               |               |               |
        |      |                                              |               |               |               |
        |      |                                              |               |               |               |
        +======+==============================================+===============+===============+===============+
        | 条件\| 分岐数を設定します。　                       |  \-           |  選択         |  \-           |
        | 分岐\| :guilabel:`分岐追加` /:guilabel:`分岐削除` \ |               |               |               |
        | 設定 | をクリックして、分岐を増減します。\          |               |               |               |
        |      | 最大6件のcaseを追加出来ます。                |               |               |               |
        +------+----------------------------------------------+---------------+---------------+---------------+
        | case | Movement、Conductor                          |  \-           |  選択         |  \-           |
        |      | call\                                        |               |               |               |
        |      | の実行\                                      |               |               |               |
        |      | 結果による条件分岐を設定します。             |               |               |               |
        |      |                                              |               |               |               |
        |      | ドラッグアン\                                |               |               |               |
        |      | ドドロップで設定を変更出来ます。             |               |               |               |
        |      |                                              |               |               |               |
        |      | デフォルトは以下の通りです。                 |               |               |               |
        |      |                                              |               |               |               |
        |      | +-----------------+-----------------------+  |               |               |               |
        |      | | **case1**       | 正常終了              |  |               |               |               |
        |      | |                 |                       |  |               |               |               |
        |      | |                 |                       |  |               |               |               |
        |      | +-----------------+-----------------------+  |               |               |               |
        |      | | **Other**       | 異常\                 |  |               |               |               |
        |      | |                 | 終了、緊急停止、準備\ |  |               |               |               |
        |      | |                 | エラー、想定外エラー\ |  |               |               |               |
        |      | |                 | 、Skip終了、警告終了  |  |               |               |               |
        |      | +-----------------+-----------------------+  |               |               |               |
        +------+----------------------------------------------+---------------+---------------+---------------+
    
  
  #. Parallel branch選択時
  
     * | 「:ref:`node_list` 」における「Function」タブ内の「Parallelbranch」を選択した場合表示されます。
     * | タブ内の項目は以下の通りです。
  
     .. list-table:: 「Parallel branch」タブ
        :widths: 10 30 5 5 5
        :header-rows: 1
        :align: left
        
        * - **項目**
          - **説明**
          - **入力必須**
          - **入力形式**
          - **制約事項**
        * - 平行分岐設定
          - | 分岐数を設定します。 :guilabel:`分岐追加` / :guilabel:`分岐削除` をクリックして、分岐を増減します。
            | デフォルトの分岐数は2です。2以下の値は設定できません。
          - \-
          - 選択
          - \-
  
  
  #. Parallel Merge選択時
  
     * | 「:ref:`node_list` 」における「Function」タブ内の「Parallel merge」を選択した場合表示されます。
     * | タブ内の項目は以下の通りです。
  
     .. list-table:: 「Parallel Merge」タブ
        :widths: 10 30 5 5 5
        :header-rows: 1
        :align: left
        
        * - **項目**
          - **説明**
          - **入力必須**
          - **入力形式**
          - **制約事項**
        * - case
          - | 分岐数を設定します。 :guilabel:`マージ追加` / :guilabel:`マージ削除` クリックして、分岐を増減します。
            | デフォルトの分岐数は2です。2以下の値は設定できません。
          - \-
          - 選択
          - \-
  

  #. Conductor end選択時
  
     * | 「:ref:`node_list` 」における「Function」タブ内の「Conductor end」を選択した場合表示されます。
     * | タブ内の項目は以下の通りです。
  
     .. list-table:: 「End」タブ
        :widths: 10 30 5 5 5
        :header-rows: 1
        :align: left
        
        * - **項目**
          - **説明**
          - **入力必須**
          - **入力形式**
          - **制約事項**
        * - 終了ステータス
          - | Endまで処理された際に、選択されたステータスが、Conductorのステータスへ反映されます。
            | - 正常 (デフォルト値)  
            | - 警告 
            | - 異常  
            | 
            | 複数のEndノードまで処理された場合、反映されるステータスの優先度は以下です。
            |  優先度： 正常 < 警告 < 異常
          - \-
          - 選択
          - \-
  
  #. Status file branch選択時（Status file branchタブ）
  
     * | 「:ref:`node_list` 」における「Function」タブ内の「Status file branch」を選択した場合表示されます。
     * | タブ内の項目は以下の通りです。
  
     .. list-table:: 「Status file branch」タブ
        :widths: 10 30 5 5 5
        :header-rows: 1
        :align: left
        
        * - **項目**
          - **説明**
          - **入力必須**
          - **入力形式**
          - **制約事項**
        * - ステータスファイル分岐設定
          - | Movement のステータスファイルによる条件分岐を設定します。
            |  :guilabel:`条件追加`  /  :guilabel:`条件削除` をクリックして、分岐を増減します。
            | デフォルトの分岐は「if」と「else」です。
          - \-
          - 選択
          - \-
        * - 備考
          - Nodeに対する説明やコメントを入力出来ます。
          - \-
          - 手動入力
          - \-
  
     .. note:: | **参照するステータスファイルについて**
  
      * | 参照するステータスファイルは、各Movmentの作業結果ディレクトリ配下の「MOVEMENT_STATUS_FILE」を参照します。
      * | ステータスファイルが存在しない場合、「else」側の処理を行います。
      * | ステータスファイル内の内容が、複数行（改行コードを含む）場合、改行コード以降は、除外した値を評価対象とします。
      
      | 例）改行含むステータスファイルの内容
  
      .. code-block:: 
  
         1
  
         23
  
         4
  
      | ステータスファイルの内容を「1」として、評価を行います。
  
      .. list-table:: ステータスファイルITA独自変数
         :widths: 15 25 5
         :header-rows: 1
         :align: left
          
         * - **ITA独自変数**
           - **変数指定内容**
           - **制約事項**
         * - __movement_status_filepath__ 
           - 作業結果ディレクトリ配下の「MOVEMENT_STATUS_FILE」のパス
           - ※
  
      .. | ※ 「 :ref:`ansible_legacyrole_work_flow` 」で対応しています。
  
  #. 「Node」タブ
  
     *  「:ref:`node_list` 」における「Movement」タブおよび「Function」タブ内のNodeを複数選択した場合表示されます。
     * グリッド内の整列をすることが可能になります。
     * Nodeを複数選択する方法については、ドラッグアンドドロップでの範囲選択の他、「shift」キーをクリックしながらの選択が可能です。
     * タブ内の項目は以下の通りです。
     
     .. figure:: /images/ja/conductor/condudtor_edit_and_excute/conductor_align_nodes.gif
        :width: 800px
        :alt: Nodeの整列

        Nodeの整列

     .. list-table:: 「Node」タブ
        :widths: 10 30 5 5 5
        :header-rows: 1
        :align: left
        
        * - **項目**
          - **説明**
          - **入力必須**
          - **入力形式**
          - **制約事項**
        * - |image11|
          - 複数選択したNodeを左揃えに整列します。
          - \-
          - 選択
          - \-
        * - |image12|
          - 複数選択したNodeを左右中央揃えに整列します。
          - \-
          - 選択
          - \-
        * - |image13|
          - 複数選択したNodeを右揃えに整列します。
          - \-
          - 選択
          - \-
        * - |image14|
          - 複数選択したNodeを上揃えに整列します。
          - \-
          - 選択
          - \-
        * - |image15|
          - 複数選択したNodeを上下中央揃えに整列します。
          - \-
          - 選択
          - \-
        * - |image16|
          - 複数選択したNodeを下揃えに整列します。
          - \-
          - 選択
          - \-
        * - |image17|
          - 複数選択したNodeを左右等間隔にします。
          - \-
          - 選択
          - \-
        * - |image18|
          - 複数選択したNodeを上下等間隔にします。
          - \-
          - 選択
          - \-

.. |image11| image:: /images/ja/conductor/condudtor_edit_and_excute/left_align.png
   :width: 0.3937in
   :height: 0.3937in
.. |image12| image:: /images/ja/conductor/condudtor_edit_and_excute/LR_Center_align.png
   :width: 0.3937in
   :height: 0.43032in
.. |image13| image:: /images/ja/conductor/condudtor_edit_and_excute/right_align.png
   :width: 0.3937in
   :height: 0.41045in
.. |image14| image:: /images/ja/conductor/condudtor_edit_and_excute/top_align.png
   :width: 0.3937in
   :height: 0.38532in
.. |image15| image:: /images/ja/conductor/condudtor_edit_and_excute/TB_Center_align.png
   :width: 0.3937in
   :height: 0.41082in
.. |image16| image:: /images/ja/conductor/condudtor_edit_and_excute/bottom_align.png
   :width: 0.3937in
   :height: 0.40276in
.. |image17| image:: /images/ja/conductor/condudtor_edit_and_excute/LR_Equal_space.png
   :width: 0.37391in
   :height: 0.39758in
.. |image18| image:: /images/ja/conductor/condudtor_edit_and_excute/TB_Equal_space.png
   :width: 0.3937in
   :height: 0.40298in



* | 「Conductor編集/作業実行」メニューで実行可能な操作は以下の通りです。

.. _conductor_editandexcute_list:
.. table:: 「Conductor編集/作業実行」メニュー実行操作一覧
   :align: left

   +-------------+-----------------------------------+----------+---------+---------+------+
   | **項目**    | **説明**                          | **新規** | **更新**          | **備 |
   |             |                                   |          |                   | 考** |
   |             |                                   |          |                   |      |
   |             |                                   |          |                   |      |
   |             |                                   +----------+---------+---------+      |
   |             |                                   | **EDIT** | **VIEW**| **EDIT**|      |
   |             |                                   |          |         |         |      |
   |             |                                   |          |         |         |      |
   |             |                                   |          |         |         |      |
   +=============+===================================+==========+=========+=========+======+
   | JSON保存    | 現在の表示中のConductorの構成情\  | 〇       |         |         |      |
   |             | 報(JSON形式)を出力します。        |          |         |         |      |
   +-------------+-----------------------------------+----------+---------+---------+------+
   | JSON読\     | Conductorの構成情報(JSON形式)を\  |   〇     |         |         |      |
   | 込          | 読み込み、表示します。            |          |         |         |      |
   +-------------+-----------------------------------+----------+---------+---------+------+
   | 操作取\     | 直前の処理を取り消します。        | 〇       |         |  〇     |      |
   | り消し      |                                   |          |         |         |      |
   +-------------+-----------------------------------+----------+---------+---------+------+
   | 操作や\     | 直前の取り消しをやり直します。    | 〇       |         | 〇      |      |
   | り直し      |                                   |          |         |         |      |
   +-------------+-----------------------------------+----------+---------+---------+------+
   | 選択ノー\   | 選択しているNodeを削除します。    | 〇       |         | 〇      |      |
   | ド削除      |                                   |          |         |         |      |
   +-------------+-----------------------------------+----------+---------+---------+------+
   | 登録        | 登録を実施します。                | 〇       |         | 〇      |      |
   +-------------+-----------------------------------+----------+---------+---------+------+
   | リセット    | 初期状態へ戻します。              |  〇      |         |         |      |
   +-------------+-----------------------------------+----------+---------+---------+------+
   | 編集        | EDITモードへ変\                   |          | 〇      | 〇      |      |
   |             | 更し、Conductorの編集を行います。 |          |         |         |      |
   +-------------+-----------------------------------+----------+---------+---------+------+
   | 流\         | 登録済のConducto\                 |          | 〇      |  〇     |      |
   | 用新規      | rを流用して、新規作成が行えます。 |          |         |         |      |
   +-------------+-----------------------------------+----------+---------+---------+------+
   | 更新        | 編集内容を更新します。            |          |         |  〇     |      |
   +-------------+-----------------------------------+----------+---------+---------+------+
   | 再読込      | 変更をキャン\                     |          |         | 〇      |      |
   |             | セルし、変更前の状態へ戻します。  |          |         |         |      |
   +-------------+-----------------------------------+----------+---------+---------+------+
   | キャ\       | 変更をキャン\                     |          |         | 〇      |      |
   | ンセル      | セルし、VIEWモードへ変更します。  |          |         |         |      |
   +-------------+-----------------------------------+----------+---------+---------+------+
   | グリッドに\ | チェックを入れると、ノードの\     | 〇       |         | 〇      |      |
   | スナップ    | 移動がグリッド線に合わせて移動\   |          |         |         |      |
   |             | します。                          |          |         |         |      |
   +-------------+-----------------------------------+----------+---------+---------+------+   

「閲覧」モードについて
~~~~~~~~~~~~~~~~~~~~~~

| 「Conductor一覧」メニューから遷移した場合や、登録が完了した場合は、以下の画面が表示されます。

.. figure:: /images/ja/conductor/condudtor_edit_and_excute/conductor_view_mode.png
   :width: 800px
   :alt: 「Conductor編集/作業実行」メニュー（「閲覧」モード）

   「Conductor編集/作業実行」メニュー（「閲覧」モード）

.. list-table:: 「閲覧」モード
   :widths: 10 30 
   :header-rows: 1
   :align: left
   
   * - **項目**
     - **説明**
   * - :guilabel:`選択`
     - 登録済みのConductorを選択して閲覧出来ます。
   * - :guilabel:`編集`
     - 登録済みのConductorを編集出来ます。
   * - :guilabel:`作業実行`
     - 選択したConductorの作業実行を行います。
   * - :guilabel:`流用新規`
     - 登録済みのConductorをコピーして新規作成が行えます。
   * - :guilabel:`新規`
     - Conductorの新規作成が行えます。

「更新」モードについて
~~~~~~~~~~~~~~~~~~~~~~

| 閲覧モードにて :guilabel:`編集` をクリックした場合は、以下の画面が表示されます。

.. figure:: /images/ja/conductor/condudtor_edit_and_excute/conductor_update_mode.png
   :width: 800px
   :alt: 「Conductor編集/作業実行」メニュー（「更新」モード）

   「Conductor編集/作業実行」メニュー（「更新」モード）

.. list-table:: 「更新」モード
   :widths: 10 30 
   :header-rows: 1
   :align: left
   
   * - **項目**
     - **説明**
   * - :guilabel:`更新`
     - 編集内容が保存されます。
   * - :guilabel:`再読み込み`
     - 編集内容が破棄されて登録内容の状態に戻ります。
   * - :guilabel:`キャンセル`
     - :guilabel:`編集` クリック前の状態に戻ります。
   * - :guilabel:`フルスクリーン`
     - | ブラウザの表示がフルスクリーンになります。
       | ※フルスクリーン時は :guilabel:`フルスクリーン解除` に変わります。
   * - :guilabel:`全体表示`
     - Node すべてが表示される縮尺で表示されます。


Conductor作業実行について
~~~~~~~~~~~~~~~~~~~~~~~~~

| 閲覧モードにて、 :guilabel:`作業実行` をクリックすると作業実行設定画面が表示されます。

* | :guilabel:`オペレーション選択` をクリックすると、 :menuselection:`「基本コンソール」メニューグループ --> 「オペレーション一覧」メニュー` で登録したオペレーションが表示されます。
  | ※「基本コンソール -  :ref:`basic_console_operation` 」を参照。
* オペレーションを選択し :guilabel:`実行` をクリックすると :menuselection:`「Conductor作業確認」メニュー` に遷移し、作業のトレースが始まります。
* | 「スケジュール」にて予約日時を入力して :guilabel:`実行` をクリックすると、作業予約が作られます。登録情報は「 :ref:`conductor_conductor_job_list` 」で確認出来ます。
  | ※現在時刻より過去の日時は入力できません
* | Movement、Conductor Callのオペレーション, スキップのみ、設定値を変更可能です。
  | ※Conductor編集で登録したデータへ変更は反映されません。作業実行にのみ反映されます。
* 実行したConductorに設定されるアクセス権について、実行時に選択したConductor、オペレーションに設定されたアクセス権の共通するロールを継承します。共通するロールが存在しない場合、作業実行できません。

* 「作業実行設定」共通項目は以下の通りです。

.. list-table:: 「作業実行設定」共通項目一覧
   :widths: 10 25 5 5 5
   :header-rows: 1
   :align: left
      
   * - **項目**
     - **説明**
     - **入力必須**
     - **入力形式**
     - **制約事項**
   * - 作業実行 Conductor
     - 選択したしたConductorが表示されます。
     - \-
     - 自動入力
     - 
   * - オペレーション
     - :guilabel:`オペレーション選択` をクリックし、オペレーションを選択します。
     - ○
     - 選択
     - 
   * - スケジュール
     - Conductorの実行予定日時を指定します。
     - \-
     - 手動入力
     - 現在時刻より過去の日時は入力不可
   * - 作業実行
     - 登録したConductorを実行します。 
     - ○
     - ボタン
     - 

.. figure:: /images/ja/conductor/condudtor_edit_and_excute/conductor_execute.gif
   :width: 800px
   :alt: 作業実行

   作業実行

.. tip:: | **オペレーションの指定について**
   | グリッド内の「Movement」Nodeを選択し、 :guilabel:`オペレーション選択` をクリックすると、オペレーションのリストが表示されます。
   | 作業実行設定画面のラジオボタンで指定したオペレーションのオペレーションIDとは別のオペレーションを指定することが出来ます。
   | これにより、そのMovementの属するオーケストレータの「 :ref:`ansible_legacy_substitution_value_list` 」メニューで、ほかのオペレーションIDのものとして登録した「具体値」を代入して実行することが出来ます。
   | Conductor編集画面で個別指定したオペレーションIDはConductor :guilabel:`登録` / :guilabel:`更新` により設定が保存されます。
   | また、Conductor実行画面でも実行前に個別指定ができ、既に :ref:`conductor_editandexcute` で個別指定登録をして保存されているオペレーションIDについても更に変更を行いConductor実行することが出来ます。
   | ただし、Conductor実行画面で個別指定したオペレーションIDは実行時のみの反映となり、設定は保存されません。
   | 同じMovementを流用し、別なサーバを操作したい時などにご活用下さい。
   |
   | **スキップについて**
   | スキップのチェックを変更することが出来ます。
   | 編集/更新モードでスキップの設定は :guilabel:`登録` / :guilabel:`更新` により設定が保存されます。
   | また、閲覧モードでも実行前に個別指定ができ、既にConductor編集で保存されているスキップについて変更を行いConductor実行することが出来ます。
   | ただし、閲覧モードでは実行時のみの反映となり、設定は保存されません。
   | 一時的に、処理を飛ばして、又は実施して、作業実行したい時などにご活用下さい。

.. _conductor_conductor_job_list:

Conductor作業一覧
-----------------

#. | [Conductor作業一覧]画面では、実行済みのConductorの作業を管理します。
   | 条件を指定し :guilabel:`フィルタ` ボタンをクリックすると、作業一覧テーブルを表示します。
   | 作業表示欄の :guilabel:`詳細` ボタンをクリックすると、 :ref:`conductor_check_conductor_job` 画面へ遷移します。
   | :guilabel:`投入データ一式(zip)` をクリックすると、実行された全てのConductor配下のMovement(*)の実行ファイルなどをまとめてダウンロードすることが出来ます。
   | :guilabel:`結果データ一式(zip)` をクリックすると、実行された全てのConductor配下のMovement(*)の実行ログ、エラーログなどをまとめてダウンロードすることが出来ます。
   
   | ※Conductorが階層構造になっている場合は、末端のMovementも対象になります。


.. _conductor_check_conductor_job:

Conductor作業確認
-----------------

| :menuselection:`「Conductor作業確認」メニュー` では、Conductorの実行状態を表示します。

*  | 実行中以降のステータスになっている実行状況サークルをクリックすると、各ドライバの「作業状態確認」メニューに遷移し作業実行状況の詳細を確認することが可能です。
*  | 「 :ref:`conductor_conductor_job_list` 」の :guilabel:`詳細` をクリックすると、選択したConductor作業の処理状況をモニター表示します。状況に応じて「予約取消」、「停止解除」や「緊急停止」の投入が可能です。
   | ※「Movement」、「Conductor Call」のNodeについては、Node選択後に、画面右側に表示される :guilabel:`作業情報確認` からも「作業状態確認」メニューに遷移出来ます。

.. figure:: /images/ja/conductor/condudtor_edit_and_excute/conductor_job_detail.gif
   :width: 800px
   :alt: Conductor作業実行

   Conductor作業実行


.. tip:: | :menuselection:`「Conductor作業実行」メニュー` で実行した、作業実行済みのConductorを「 :ref:`conductor_editandexcute` 」メニューで編集すると、作業実行時のConductorと異なる状態となるため :guilabel:`詳細` ボタンをクリックしても処理状況が表示されない場合があります。
   | 作業実行済みのConductorを編集して再度実行する場合は、 :menuselection:`「Conductor編集/作業実行」メニュー` の :guilabel:`流用新規` にて、別のConductorを作成してご利用いただくことを推奨します。

* | 選択したConductor作業に予約日時が設定されていて、かつ未実行の場合は、 :guilabel:`予約取消` が表示されます。
* | :guilabel:`予約取消` をクリックすると、「 :ref:`conductor_conductor_job_list` 」で確認できるステータスが「予約取消」となり、実行されなくなります。
* | :menuselection:`「Conductor作業確認」メニュー` の共通項目は以下の通りです。

.. list-table:: 「Conductor作業確認」共通項目一覧
      :widths: 4 15 5 5 10
      :header-rows: 1
      :align: left
      
      * - **項目**
        - **説明**
        - **入力必須**
        - **入力形式**
        - **制約事項**
      * - 停止解除
        - 「Couductor pause」Nodeの三角アイコンをクリックすることで解除します。
        - \-
        - ボタン
        - 
      * - 緊急停止 
        - Conductorの実行を中止します。
        - \-
        - ボタン
        - 
      * - 予約取消
        - Conductorの実行予約を取り消します。
        - \-
        - ボタン
        - 予約日時が設定されていて、かつ未実行の場合に表示される。

.. figure:: /images/ja/conductor/conductor_verification/conductor_pause_status.png
   :width: 800px
   :alt: Conductor実行中/Conductor Pause状態画面

   Conductor実行中/Conductor Pause状態画面
   
.. figure:: /images/ja/conductor/conductor_verification/conductor_reserved.png
   :width: 800px
   :alt: 日時予約されたConductor実行画面（未実行）

   日時予約されたConductor実行画面(未実行)

* 画面右側上部の領域には、Conductorの詳細情報が表示されます。
* Nodeを選択すると、選択しているNodeの詳細情報が表示されます。

  #. 「Conductor」タブ
  
     * Node未選択の場合表示されます。
     * タブ内の項目は以下の通りです。
  
     .. table:: 「Conductor」タブ
        :align: left
     
        +---------------------------------+------------------------------------------+
        | **項目**                        | **説明**                                 |
        +==================+==============+==========================================+
        | Conductor\       | ID           | Conductorインスタンスに対応した一意のID\ |
        | インスタンス\    |              | が自動採番されます。                     |
        | 情報             +--------------+------------------------------------------+
        |                  | 名称         | 実行中の Conductor 名称を\               |
        |                  |              | 表示します。                             |
        |                  +--------------+------------------------------------------+
        |                  | ステータス   | 実行中のConductorのステータスを表示し\   |
        |                  |              | ます。ステータスには以下の状態が\        |
        |                  |              | 存在します。                             |
        |                  |              |                                          |
        |                  |              | ・未実行                                 |
        |                  |              |                                          |
        |                  |              | ・未実行（予約）                         |
        |                  |              |                                          |
        |                  |              | ・実行中                                 |
        |                  |              |                                          |
        |                  |              | ・実行中（遅延）                         |
        |                  |              |                                          |
        |                  |              | ・一時停止                               |
        |                  |              |                                          |
        |                  |              | ・正常終了                               |
        |                  |              |                                          |
        |                  |              | ・異常終了                               |
        |                  |              |                                          |
        |                  |              | ・警告終了                               |
        |                  |              |                                          |
        |                  |              | ・緊急停止                               |
        |                  |              |                                          |
        |                  |              | ・予約取消                               |
        |                  |              |                                          |
        |                  |              | ・想定外エラー                           |
        |                  +--------------+------------------------------------------+
        |                  | 開始時間     | 実行開始日時を表示します。               |
        |                  +--------------+------------------------------------------+
        |                  | 終了時間     | 実行終了日時を表示します。               |
        |                  +--------------+------------------------------------------+
        |                  | 実行ユーザ   | Conductorを実行したユーザを表示します。  |
        |                  +--------------+------------------------------------------+
        |                  | 予約日時     | 予約中のConductorの実行日時を表示します。|
        |                  +--------------+------------------------------------------+
        |                  | 緊急停止     | 実行中の Conductor が緊急停止された場合\ |
        |                  |              | 「True」、それ以外の場合は\              |
        |                  |              | 「False」を表示します。                  |
        +------------------+--------------+------------------------------------------+
        | オペレーション                  | オペレーション名を表示します。           |
        +---------------------------------+------------------------------------------+
        | 備考                            | Conductorに対する説明や\                 |
        |                                 | コメントを表示します。                   |
        +---------------------------------+------------------------------------------+
  
  #. 「Node」タブ
  
     *  Nodeを選択した場合表示されます。
     *  タブ内の項目は以下の通りです。
   
     .. table:: 「Node」タブ
        :align: left
     
        +---------------------------------+------------------------------------------+
        | **項目**                        | **説明**                                 |
        +==================+==============+==========================================+
        | Node\            | ID           | Nodeインスタンスに対応した一意のID\      |
        | インスタンス\    |              | が自動採番されます。                     |
        | 情報             +--------------+------------------------------------------+
        |                  | 種別         | Node の種類を表示します。                |
        |                  +--------------+------------------------------------------+
        |                  | Node ID      | Conductorの構成情報(JSON形式)上\         |
        |                  |              | のNodeのIDを表示します。                 |
        |                  +--------------+------------------------------------------+
        |                  | ステータス   | 実行中のConductorのステータスを表示し\   |
        |                  |              | ます。ステータスには以下の状態が\        |
        |                  |              | 存在します。                             |
        |                  |              |                                          |
        |                  |              | ・未実行                                 |
        |                  |              |                                          |
        |                  |              | ・準備中                                 |
        |                  |              |                                          |
        |                  |              | ・実行中                                 |
        |                  |              |                                          |
        |                  |              | ・実行中（遅延）                         |
        |                  |              |                                          |
        |                  |              | ・正常終了                               |
        |                  |              |                                          |
        |                  |              | ・異常終了                               |
        |                  |              |                                          |
        |                  |              | ・想定外エラー                           |
        |                  |              |                                          |
        |                  |              | ・緊急停止                               |
        |                  |              |                                          |
        |                  |              | ・一時停止                               |
        |                  |              |                                          |
        |                  |              | ・準備エラー                             |
        |                  |              |                                          |
        |                  |              | ・Skip終了                               |
        |                  |              |                                          |
        |                  |              | ・警告終了                               |
        |                  +--------------+------------------------------------------+
        |                  | Stファイル   | 選択した Node が Movement の場合、\      |
        |                  |              | Status file の値を表示します。           |
        |                  +--------------+------------------------------------------+
        |                  | 開始日時     | 実行開始日時を表示します。               |
        |                  +--------------+------------------------------------------+
        |                  | 終了日時     | 実行終了日時を表示します。               |
        +------------------+--------------+------------------------------------------+
        | 個別オペレーション              | Movement毎にオペレーションを指定した\    |
        |                                 | 場合は、そのオペレーション名を表示\      |
        |                                 | します。                                 |
        +---------------------------------+------------------------------------------+
        | 備考                            | Nodeに対する説明や\                      |
        |                                 | コメントを表示します。                   |
        +---------------------------------+------------------------------------------+

Conductor定期作業実行
---------------------

1. :menuselection:`「Conductor定期作業実行」メニュー` では、スケジュールに従って定期的に実行するConductor作業を管理します。
2. | :menuselection:`「Conductor定期作業実行」メニュー-->「一覧」サブメニュー` の :guilabel:`作業一覧確認` ボタンをクリックすると、その定期作業で実行した対象をフィルタした状態で
   | :ref:`conductor_conductor_job_list` 画面へ遷移できます。

3. :guilabel:`登録` ボタンより、定期作業実行の登録を行います。 

.. figure:: /images/ja/conductor/conductor_scheduled_execution/conductor_scheduled_execution_register.gif
   :width: 800px
   :alt: Conductor定期作業実行登録

   Conductor定期作業実行登録

   スケジュールの詳細は :guilabel:`スケジュール設定` ボタンをクリックすることで表示されるウインドウからのみ設定できます。

.. figure:: /images/ja/conductor/conductor_scheduled_execution/conductor_scheduled_execution.png
   :width: 600px
   :alt: Conductor定期作業実行 スケジュール設定

   Conductor定期作業実行 スケジュール設定

.. table:: Conductor定期作業実行 登録項目一覧
   :widths: 5 5 30 5 5 5
   :align: left

   +---------------------------------+--------------------------------------------------------------+--------------+---------------+-----------------------+
   | **項目**                        | **説明**                                                     | **入力必須** | **入力形式**  | **制約事項**          |
   +=================================+==============================================================+==============+===============+=======================+
   | 定期作業実行ID                  | 定期作業実行に対応した一意のIDが自動採番されます。           | ー           | 自動入力      |                       |
   +---------------------------------+--------------------------------------------------------------+--------------+---------------+-----------------------+
   | Conductor名称                   | 「:ref:`conductor_list`」で登録したConductorがリストに\      | ○            | リスト選択    | ー                    |
   |                                 | 表示されます。                                               |              |               |                       |
   +---------------------------------+--------------------------------------------------------------+--------------+---------------+-----------------------+
   | オペレーション名                | 「基本コンソール - :ref:`basic_console_operation`」で\       | ○            | リスト選択    | ー                    |
   |                                 | 登録したオペレーションがリストに表示されます。               |              |               |                       |
   +---------------------------------+--------------------------------------------------------------+--------------+---------------+-----------------------+
   | ステータス                      | 下記「:ref:`status_list`」参照                               | ー           | 自動入力      |                       |
   +---------------------------------+--------------------------------------------------------------+--------------+---------------+-----------------------+
   | 実行ユーザ                      | 「登録」「更新」を実行したユーザが Conductor を実行す\       | ー           | 自動入力      |                       |
   |                                 | るユーザとして登録されます。                                 |              |               |                       |
   |                                 | 定期作業実行が「:ref:`conductor_list`」へ作業登録をす\       |              |               |                       |
   |                                 | る際、「実行ユーザ」が引き継がれて登録されます。             |              |               |                       |
   +---------------------------------+--------------------------------------------------------------+--------------+---------------+-----------------------+
   | スケジュール設定                | 詳細なスケジュールを設定するウインドウをオープンする\        | ー           | ー            | ー                    |
   |                                 | ボタンです。                                                 |              |               |                       |
   +------------------+--------------+--------------------------------------------------------------+--------------+---------------+-----------------------+
   | スケジュール     | 次回実行日付 | 登録完了後にスケジュール設定に基づいて、次に作業を実行\      | ー           | 自動入力      | ー                    |
   |                  |              | する日付が自動的に更新されます。                             |              |               |                       |
   +                  +--------------+--------------------------------------------------------------+--------------+---------------+-----------------------+
   |                  | 開始日付     | 定期作業実行を開始する日付を入力します。                     | ○            | 手動入力      | スケジューラ設定から\ |
   |                  |              | 「次回実行日付」は必ず「開始日付」以降の日付で\              |              |               | のみ入力可能          |
   |                  |              | 更新されます。                                               |              |               |                       |
   +                  +--------------+--------------------------------------------------------------+--------------+---------------+-----------------------+
   |                  | 終了日付     | 定期作業実行を終了する日付を入力します。                     | ー           | 手動入力      | スケジューラ設定から\ |
   |                  |              | 「次回実行日付」が「終了日付」を超えた場合にステータス\      |              |               | のみ入力可能          |
   |                  |              | が「完了」となります。                                       |              |               |                       |
   +                  +--------------+--------------------------------------------------------------+--------------+---------------+-----------------------+
   |                  | 周期         | 定期的に実行する周期を選択します。                           | ○            | ラジオボタン  | スケジューラ設定から\ |
   |                  |              | 「時」「日」「週」「月(日付指定)」「月(曜日指定)」「月\      |              |               | のみ入力可能          |
   |                  |              | 末」があります。                                             |              |               |                       |
   +                  +--------------+--------------------------------------------------------------+--------------+---------------+-----------------------+
   |                  | 間隔         | 設定した周期に基づいた、定期的に実行する間隔を入力しま\      | ○            | 手動入力      | スケジューラ設定から\ |
   |                  |              | す。                                                         |              |               | のみ入力可能          |
   +                  +--------------+--------------------------------------------------------------+--------------+---------------+-----------------------+
   |                  | 週番号       | 周期で「月(曜日指定)」を選択した場合に利用する、定期的\      | ※1           | リスト選択    | スケジューラ設定から\ |
   |                  |              | に実行する週番号を選択します。                               |              |               | のみ入力可能          |
   +                  +--------------+--------------------------------------------------------------+--------------+---------------+-----------------------+
   |                  | 曜日         | 周期で「曜日」「月(曜日指定)」を選択した場合に利用する\      | ※2           | リスト選択    | スケジューラ設定から\ |
   |                  |              | 、定期的に実行する曜日を選択します。                         |              |               | のみ入力可能          |
   +                  +--------------+--------------------------------------------------------------+--------------+---------------+-----------------------+
   |                  | 日           | 周期で「月(日付指定)」を選択した場合に利用する、定期的\      | ※3           | 手動入力      | スケジューラ設定から\ |
   |                  |              | に実行する日にちを入力します。                               |              |               | のみ入力可能          |
   +                  +--------------+--------------------------------------------------------------+--------------+---------------+-----------------------+
   |                  | 時間         | 定期的に実行する時間を入力します。                           | ※4           | 手動入力      | スケジューラ設定から\ |
   |                  |              |                                                              |              |               | のみ入力可能          |
   +------------------+--------------+--------------------------------------------------------------+--------------+---------------+-----------------------+
   | 作業停止期間     | 開始         | 作業停止期間の開始日付を入力します。                         | ※5           | 手動入力      | スケジューラ設定から\ |
   |                  |              | 開始日付以降から終了日付以前までの間、Conductor作業登\       |              |               | のみ入力可能          |
   |                  |              | 録が実行されないようにします。                               |              |               |                       |
   +                  +--------------+--------------------------------------------------------------+--------------+---------------+-----------------------+
   |                  | 終了         | 作業停止期間の終了日付を入力します。                         | ※5           | 手動入力      | スケジューラ設定から\ |
   |                  |              | 開始日付以降から終了日付以前までの間、Conductor作業登\       |              |               | のみ入力可能          |
   |                  |              | 録が実行されないようにします。                               |              |               |                       |
   +------------------+--------------+--------------------------------------------------------------+--------------+---------------+-----------------------+
   | 備考                            | 自由記述欄です。                                             | ー           | 手動入力      | ー                    |
   +------------------+--------------+--------------------------------------------------------------+--------------+---------------+-----------------------+

| ※1 週番号は周期に「月(曜日指定)」を選択した場合は必須です。
| ※2 曜日は周期に「月(曜日指定)」を選択した場合は必須です。
| ※3 日は周期に「月(日付指定)」を選択した場合は必須です。
| ※4 時間は周期に「日」「週」「月(日付指定)」「月(曜日指定)」「月末」を選択した場合は必須です。
| ※5 作業停止期間を設定する場合は「開始」と「終了」両方が入力されていることが必須です。

.. _status_list:

.. table:: ステータス一覧
   :align: left

   +-------------------------+---------------------------------------------------------------------------------+
   | **ステータス名**        | **説明**                                                                        |
   +=========================+=================================================================================+
   | 準備中                  | 登録した直後のステータスです。                                                  |
   |                         | backyard が「次回実行日付」を自動更新するタイミングで「稼働中」になります。     |
   +-------------------------+---------------------------------------------------------------------------------+
   | 稼働中                  | 正常稼働中のステータスです。                                                    |
   |                         | 「次回実行日付」より「Conductorインターバル時間設定」に登録されている時間前に\  |
   |                         | 「:ref:`conductor_list`」への作業登録を実行し、再びスケジュール設定に基づいて\  |
   |                         | 「次回実行日付」が更新されます。                                                |
   +-------------------------+---------------------------------------------------------------------------------+
   | 完了                    | 「次回実行日付」が「終了日付」を超えた場合になるステータスです。                |
   |                         | 以降はConductor 作業登録を行いません。                                          |
   +-------------------------+---------------------------------------------------------------------------------+
   | 不整合エラー            | スケジュールの設定値に不正がある場合になるステータスです。                      |
   +-------------------------+---------------------------------------------------------------------------------+
   | 紐付けエラー            | 「:ref:`conductor_list`」への作業登録が失敗した場合になるステータスです。       |
   |                         | ステータス「稼働中」同様、「:ref:`conductor_list`」への作業登録を実行し、再び\  |
   |                         | スケジュール設定に基づいて「次回実行日付」を更新するという動作をします。        |
   |                         | その際再び作業登録が失敗した場合、ステータス「紐付けエラー」が継続されます。    |
   +-------------------------+---------------------------------------------------------------------------------+
   | 想定外エラー            | ステータス「不整合エラー」「紐付けエラー」以外の不具合が発生した場合になるステ\ |
   |                         | ータスです。                                                                    |
   +-------------------------+---------------------------------------------------------------------------------+
   | Conductor廃止           | 登録したConductorが廃止された場合になるステータスです。                         |
   |                         | 廃止されたConductorを復活させた場合はステータス「準備中」へと更新されます。     |
   +-------------------------+---------------------------------------------------------------------------------+
   | operation廃止           | 登録したoperationが廃止された場合になるステータスです。                         |
   |                         | 廃止されたoperationを復活させた場合はステータス「準備中」へと更新されます。     |
   +-------------------------+---------------------------------------------------------------------------------+

1. | 定期作業実行に登録した直後はステータスが「準備中」となり、その後 backyard がスケジュール設定に基づいて「次回実行日付」を更新し、そのタイミングでステータスは「稼働中」となります。
   | ステータスが「稼働中」か「紐付けエラー」の作業は「次回実行日付」より「Conductorインターバル時間設定」に登録されている時間前に「:ref:`conductor_list`」への作業登録を実行し、再びスケジュール設定に基づいて「次回実行日付」が更新されます。

2. | 「Conductorインターバル時間設定」は「管理コンソール - :ref:`system_setting`」より「次回実行日付」の何分前に作業登録を実行するか設定可能です。

付録
====

Conductor通知先定義
-------------------

Conductor通知先定義設定例
~~~~~~~~~~~~~~~~~~~~~~~~~
.. table:: Teams設定例
   :align: left

   +-----------------------+--------------------------------------------------+
   |項目                   | 設定値                                           |
   +=======================+==================================================+
   | 通知名称              | test                                             |
   +-----------------------+--------------------------------------------------+
   | ヘッダー              |  [ "Content-Type: application/json" ]            |
   | (CURLOPT_HTTPHEADER)  |                                                  |
   +-----------------------+--------------------------------------------------+
   | メッセージ(C\         | {"text": "通知名：__NOTICE_NAME__, <br>          |
   | URLOPT_POSTFIELDS)    | Conductor名称: \__CONDUCTOR_NAME__, <br>         |
   |                       | Con                                              |
   |                       | ductorインスタンスID:__CONDUCTOR_INSTANCE_ID__,  |
   |                       | <br>ステータスID: \__STATUS_ID__,                |
   |                       | 作業URL: \__JUMP_URL__, <br> "}                  |
   +-----------------------+--------------------------------------------------+
   | PROXY / URL           |                                                  |
   | (CURLOPT_PROXY)       |                                                  |
   +-----------------------+--------------------------------------------------+
   | PROXY / PORT          |                                                  |
   | (\                    |                                                  |
   | CURLOPT_PROXYPORT)    |                                                  |
   +-----------------------+--------------------------------------------------+
   | 作業確認URL(FQDN)     | http://localhost:38000                           |
   +-----------------------+--------------------------------------------------+
   | その他                |                                                  |
   +-----------------------+--------------------------------------------------+
   | 開始日時              |                                                  |
   +-----------------------+--------------------------------------------------+
   | 終了日時              |                                                  |
   +-----------------------+--------------------------------------------------+

.. figure:: /images/ja/conductor/conductor_notice/conductor_teams_notice.png
   :alt: Teams通知表示例

   Teams通知表示例

.. table:: Slack設定例
   :align: left

   +-----------------------+--------------------------------------------------+
   |項目                   | 設定値                                           |
   +=======================+==================================================+
   | 通知名称              | test2                                            |
   +-----------------------+--------------------------------------------------+
   | 通\                   | 通知先のSlackのWebhook URLを入力して下さい。     |
   | 知先(CURLOPT_URL)     |                                                  |
   +-----------------------+--------------------------------------------------+
   | ヘッダー(C\           | [ "Content-Type: application/json" ]             |
   | URLOPT_HTTPHEADER)    |                                                  |
   +-----------------------+--------------------------------------------------+
   | メッセージ(C\         | {"text": "通知名：__NOTICE_NAME__, <br>          |
   | URLOPT_POSTFIELDS)    | Conductor名称: \__CONDUCTOR_NAME__, <br>         |
   |                       | Con                                              |
   |                       | ductorインスタンスID:__CONDUCTOR_INSTANCE_ID__,  |
   |                       | <br>ステータスID: \__STATUS_ID__,                |
   |                       | 作業URL: \__JUMP_URL__, <br> "}                  |
   +-----------------------+--------------------------------------------------+
   | PROXY / URL           |                                                  |
   | (CURLOPT_PROXY)       |                                                  |
   +-----------------------+--------------------------------------------------+
   | PROXY / PORT          |                                                  |
   | (\                    |                                                  |
   | CURLOPT_PROXYPORT)    |                                                  |
   +-----------------------+--------------------------------------------------+
   | 作業確認URL(FQDN)     | http://localhost:38000                           |
   +-----------------------+--------------------------------------------------+
   | その他                |                                                  |
   +-----------------------+--------------------------------------------------+
   | 開始日時              |                                                  |
   +-----------------------+--------------------------------------------------+
   | 終了日時              |                                                  |
   +-----------------------+--------------------------------------------------+

.. figure:: /images/ja/conductor/conductor_notice/conductor_slack_notice.png
   :alt: Slack通知表示例

   Slack通知表示例

.. table:: 設定サンプル(Proxy設定、通知抑止設定、その他設定あり)
   :align: left

   +--------------------+-------------------------------------------------+
   | 通知名称           | 通知サンプル                                    |
   +====================+=================================================+
   | 通\                | https://sample.webhook.xxx.com/yyyyyyyy         |
   | 知先(CURLOPT_URL)  |                                                 |
   +--------------------+-------------------------------------------------+
   | ヘッダー(C\        | [ "Content-Type: application/json" ]            |
   | URLOPT_HTTPHEADER) |                                                 |
   +--------------------+-------------------------------------------------+
   | メッセージ(C\      | {"text": "通知内容"}                            |
   | URLOPT_POSTFIELDS) |                                                 |
   +--------------------+-------------------------------------------------+
   | PROXY / URL        | http://proxy.co.jp                              |
   | (CURLOPT_PROXY)    |                                                 |
   +--------------------+-------------------------------------------------+
   | PROXY / PORT       | 8080                                            |
   | (\                 |                                                 |
   | CURLOPT_PROXYPORT) |                                                 |
   +--------------------+-------------------------------------------------+
   | 作業確認URL(FQDN)  | http://exastro-it-automation.local              |
   +--------------------+-------------------------------------------------+
   | その他             | {"CURLOPT_TIMEOUT":"10"}                        |
   +--------------------+-------------------------------------------------+
   | 開始日時           | 2020/01/01 00:00:00                             |
   +--------------------+-------------------------------------------------+
   | 終了日時           | 2020/01/01 00:00:00                             |
   +--------------------+-------------------------------------------------+
   | 備考               | 自由記述欄です                                  |
   +--------------------+-------------------------------------------------+

.. _conductor_notification_log:

通知ログ出力例
~~~~~~~~~~~~~~

通知ログの構造
^^^^^^^^^^^^^^

.. code-block:: 

   [
    {
        "conductor_status_id": "XXX",
        "exec_time": "YYYY/MM/dd HH:ii:ss",                                                                  
        "result": [
            {
                "notice_name": "XXX",
                "notice_info": [
                    XXX
                ],
                "status_code": "XXX",
                "response.headers": {
                      "XXX": "XXX"
                  },
                "response.text": "XXX"
            }
        ]
     }
   ]                                                                

例) 通知実行ログ(正常)
^^^^^^^^^^^^^^^^^^^^^^
.. code-block:: 

  [
      {
          "conductor_status_id": "3",
          "exec_time": "2023/07/05 16:29:50",
          "result": [
              {
                  "notice_name": "test",
                  "notice_info": [
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8",
                      "9",
                      "10",
                      "11"
                  ],
                  "status_code": 200,
                  "response.headers": {
                      "XXX": "XXX"
                  },
                  "response.text": "1"
              }
          ]
      }
  ]


例) 通知実行ログ(異常)
^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: 

  [
      {
          "conductor_status_id": "3",
          "exec_time": "2023/07/05 19:46:06",
          "result": [
              {
                  "notice_name": "test",
                  "notice_info": [
                      "3",
                      "6"
                  ],
                  "status_code": 400,
                  "response.headers": {
                      "XXX": "XXX"
                  },
                  "response.text": "Invalid webhook URL",
                  "err_type": "HTTPError"
              }
          ]
      }
  ] 
