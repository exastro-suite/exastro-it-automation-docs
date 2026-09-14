==========================
Workspace (ワークスペース)
==========================

はじめに
========

| 本書では、Exastro システム における Workspace (ワークスペース) について説明します。


ワークスペースとは
==================

| ワークスペースとは、システムの構成情報や自動化タスクのための設計情報を中央管理するための作業領域のことです。
| 1つのシステムの過去・現在・未来の設定値、設定ファイル、自動化ソフトウェアのIaCといったシステムを構成・管理・維持するために必要な情報を一元管理するための仕組みを提供します。

.. figure:: /images/ja/diagram/overview_of_the_workspace.png
    :alt: ワークスペース全体図

ワークスペースの作成
====================

| Exastro IT Automation の機能を利用するためには、ワークスペースの作成が必要となります。
| ワークスペースは通常、本番環境、検証環境、開発環境といった自動化の対象となるシステムの環境毎に作成します。

ワークスペースの作成手順
------------------------

| ワークスペースは、下記の手順で作成します。

#. | :doc:`../platform_management/organization` で作成したオーガナイゼーションにオーガナイゼーション管理者でログインします。

#. | メニューより :menuselection:`ワークスペース管理` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | :menuselection:`ワークスペース一覧` 画面が表示されるので、 :guilabel:`作成` をクリックします。

   .. figure:: /images/ja/manuals/platform/workspace/ワークスペース一覧.png
      :width: 600px
      :align: left

   .. warning::
      | オーガナイゼーション管理者以外でログインしている時は、 :guilabel:`作成` は表示されません。

#. | :menuselection:`新規ワークスペース` 画面が表示されるので、ワークスペースの情報を入力し、 :guilabel:`登録` をクリックします。

   .. figure:: /images/ja/manuals/platform/workspace/新規ワークスペース作成画面.png
      :width: 600px
      :align: left

   .. list-table:: 新規ワークスペース登録
      :widths: 40 200
      :header-rows: 1
      :align: left

      * - 項目名
        - 説明
      * - ワークスペースID
        - | ワークスペースに割り当てる一意のIDを指定します。
          | ここで指定した ID を使ってシステム間の連携を行います。
      * - ワークスペース名
        - | ワークスペースに割り当てる名前を指定します。
      * - 環境一覧
        - | 本番環境、検証環境、開発環境といった作成する環境の一覧を入力します。
          | この環境はオペレーションに割り当てることが可能です。
      * - 説明
        - | ワークスペースの説明を記載します。

   .. note::
      | ワークスペースの作成者（オーガナイゼーション管理者）は、以降のロールの設定等を行わなくても、自動的にワークスペースにアクセスできる状態となります。
      | 初回ログイン方法は、:doc:`../it_automation_base/general`  を参照してください。

ワークスペースの編集
--------------------

| ワークスペースの編集は、下記の手順で行ないます。

#. | Exastro システムにオーガナイゼーション管理者でログインします。

#. | メニューより :menuselection:`ワークスペース管理` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left


#. | :menuselection:`ワークスペース一覧` 画面が表示されるので、 :guilabel:`編集` をクリックします。

   .. figure:: /images/ja/manuals/platform/workspace/ワークスペース一覧画面_edit.png
      :width: 600px
      :align: left

   .. warning::
      | ワークスペース管理者でログインしている時は、 :guilabel:`編集` は表示されません。

#. | :menuselection:`ワークスペース編集` 画面が表示されるので、ワークスペースの情報を編集し、 :guilabel:`登録` をクリックします。

   .. figure:: /images/ja/manuals/platform/workspace/ワークスペース編集画面.png
      :width: 600px
      :align: left

   .. list-table:: ワークスペース編集
      :widths: 40 200
      :header-rows: 1
      :align: left

      * - 項目名
        - 説明
      * - ワークスペースID
        - | ワークスペースIDの変更は出来ません。
      * - ワークスペース名
        - | ワークスペースに割り当てる名前を指定します。
      * - 環境一覧
        - | 本番環境、検証環境、開発環境といった作成する環境の一覧を入力します。
          | この環境はオペレーションに割り当てることが可能です。
      * - 説明
        - | ワークスペースの説明を記載します。


ワークスペースの削除
--------------------

| ワークスペースの削除は、下記の手順で行ないます。

#. | Exastro システムにオーガナイゼーション管理者でログインします。

#. | メニューより :menuselection:`ワークスペース管理` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | :menuselection:`ワークスペース一覧` 画面が表示されるので、 :guilabel:`削除` をクリックします。

   .. figure:: /images/ja/manuals/platform/workspace/ワークスペース一覧画面_delete.png
      :width: 600px
      :align: left

   .. warning::
      | ワークスペース管理者でログインしている時は、 :guilabel:`編集` は表示されません。

#. | 確認メッセージが表示されるので、:kbd:`オーガナイゼーションID/ワークスペースID` を入力し、 :guilabel:`はい、削除します` をクリックします。

   .. figure:: /images/ja/manuals/platform/workspace/ワークスペース削除実行確認画面.png
      :width: 600px
      :align: left

   .. tip::
      | 一度削除したワークスペースを復元することは出来ません。

