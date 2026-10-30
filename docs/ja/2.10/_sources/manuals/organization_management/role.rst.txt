======
ロール
======

はじめに
========

| 本書では、Exastro システム におけるロールについて説明します。


ロールとは
==========

| ロールとは、ユーザやワークスペース内のデータといった Exastro システムにおけるリソースに対する操作(作成、更新、削除)権限の集合のことです。
| Exastro システムのロールの種類としては以下のものがあります。

- | オーガナイゼーションロール
  | オーガナイゼーションの管理を行うロールで以下の３つがあります

.. list-table:: オーガナイゼーションロール
   :widths: 20 30
   :header-rows: 1
   :align: left

   * - **ロール**
     - **説明**
   * - | オーガナイゼーション管理者
       | （_organization-manager)
     - ワークスペースの追加やユーザーおよびロールの管理が可能です。
   * - | ユーザー・ロール管理者
       | （_organization-user-role-manager)
     - ユーザーおよびロールの管理が可能です。
   * - | ユーザー管理者
       | （_organization-user-manager)
     - ユーザーの管理が可能です。


- | ワークスペースロール

.. list-table:: ワークスペースロール
   :widths: 20 30
   :header-rows: 1
   :align: left

   * - **ロール**
     - **説明**
   * - | ワークスペース管理者
       | (_{ワークスペースID}-admin)
     - ワークスペースの管理が可能です。
   * - | Ansible実行エージェント用
       | (_{ワークスペースID}-ansible-execution-agent)
     - | Ansible実行エージェントが動作するのに必要な権限を持ちます。
       | :doc:`サービスアカウントユーザー<../../../manuals/organization_management/service_account_users>` と紐づけられます。
   * - | OASEエージェント用
       | (_{ワークスペースID}-oase-agent)
     - | OASEエージェントが動作するのに必要な権限を持ちます。
       | :doc:`サービスアカウントユーザー<../../../manuals/organization_management/service_account_users>` と紐づけられます。
   * - カスタムロール
     - | ユーザーが作成したロールで使用可能なワークスペースを指定および、Exastro IT Automationの使用可能なメニューを指定出来ます。
       | （Exastro IT Automationの使用可能なメニューの設定は :ref:`コチラ<management_console_introduction>` を参照）


ロール作成とユーザへの紐づけ
============================

| ロールの新規作成方法とユーザへの紐づけ方法について下記の流れで説明します。

#. | :ref:`role_workspace`
   | ロールごとにワークスペースへのアクセス権限をメンテナンスできます。
#. | :ref:`role_user`
   | ユーザ毎にアクセスを許可するロールを付与することで、ユーザごとにワークスペースへのアクセスを制御することができます。

.. _role_workspace:

ロール追加・ワークスペース紐づけ
--------------------------------

#. | Exastro システムにオーガナイゼーション管理者 または _${ws-id}-adminロールに紐づくユーザでログインします。


#. | メニューより :menuselection:`ロール管理` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

   .. note:: | オーガナイゼーション管理者（ロール管理・ロール付与権限を有するユーザー）またはワークスペース管理者のユーザーでログインしている時のみ、メニューに :menuselection:`ロール管理` が表示されます。

#. | :menuselection:`ロール一覧` 画面が表示されるので、:guilabel:`作成` ボタンをクリックします。

   .. figure:: /images/ja/manuals/platform/role/platform_role_create.png
      :width: 600px
      :align: left

#. | :menuselection:`新規ロール` 画面が表示されるので、ロールの情報を入力し、:guilabel:`登録` ボタンをクリックします。

   .. figure:: /images/ja/manuals/platform/role/platform_role_register.png
      :width: 600px
      :align: left

   .. list-table:: 新規ロール登録
      :widths: 40 200
      :header-rows: 1
      :align: left

      * - 項目名
        - 説明
      * - ロール名
        - | ロールに割り当てる名前を入力します。
      * - ロール種別
        - | workspace固定です。
      * - 説明
        - | ロールの説明を入力します。
      * - 使用ワークスペース
        - | 使用するワークスペースを指定します。

| :menuselection:`使用ワークスペース` にワークスペースの一覧が表示されるので、当該ロールに紐づけるワークスペースを選択します。

.. figure:: /images/ja/manuals/platform/role/platform_role_workspace_used.png
   :width: 600px
   :align: left

.. note:: | ワークスペース管理者でログインしているときは、ログインしているユーザーがワークスペース管理者となっているワークスペースのみ選択可能です。

.. _role_user:

ユーザ・ロール紐づけ
--------------------

#. | Exastro システムにオーガナイゼーション管理者 または _${ワークスペースID}-adminロールに紐づくユーザでログインします。
#. | メニューより :menuselection:`ロール管理` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

   .. note:: | オーガナイゼーション管理者（ロール管理・ロール付与権限を有するユーザー）またはワークスペース管理者のユーザーでログインしている時のみ、メニューに :menuselection:`ロール管理` が表示されます。

#. | :menuselection:`ロール一覧` 画面が表示されるので、ユーザとロールの紐づけを変更したいロールを選択し :guilabel:`ユーザ` ボタンをクリックします。

   .. figure:: /images/ja/manuals/platform/role/platform_role_list.png
      :width: 600px
      :align: left

#. | :menuselection:`ロール付与・解除` 画面が表示されるので、ロールとの紐づけを変更したいユーザを選択し、 :guilabel:`付与` ボタンをクリックします。

   .. figure:: /images/ja/manuals/platform/role/platform_role_grant.png
      :width: 600px
      :align: left

ロールの編集
------------

| ロールの編集は、下記の手順で行ないます。

#. | システムにオーガナイゼーション管理者でログインします。
#. | メニューより :menuselection:`ロール管理` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

   .. note:: | オーガナイゼーション管理者（ロール管理・ロール付与権限を有するユーザー）またはワークスペース管理者のユーザーでログインしている時のみ、メニューに :menuselection:`ロール管理` が表示されます。

#. | :menuselection:`ロール一覧` 画面が表示されるので、:guilabel:`編集` ボタンをクリックします。

   .. figure:: /images/ja/manuals/platform/role/platform_role_list_edit.png
      :width: 600px
      :align: left

#. | :menuselection:`ロール編集` 画面が表示されるので、ロールの情報を編集し、:guilabel:`登録` ボタンをクリックします。

   .. figure:: /images/ja/manuals/platform/role/platform_role_edit.png
      :width: 600px
      :align: left

   .. list-table:: ロール編集
      :widths: 40 200
      :header-rows: 1
      :align: left

      * - 項目名
        - 説明
      * - ロール名
        - | ロール名の変更は出来ません。
      * - ロール種別
        - | workspace固定です。
      * - 説明
        - | ロールの説明を入力します。
      * - 使用ワークスペース
        - | 使用するワークスペースを指定します。

ロールの削除
------------

| ロールの削除は、下記の手順で行ないます。

#. | Exastro システムにオーガナイゼーション管理者でログインします。

#. | メニューより :menuselection:`ロール管理` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

   .. note:: | オーガナイゼーション管理者（ロール管理・ロール付与権限を有するユーザー）またはワークスペース管理者のユーザーでログインしている時のみ、メニューに :menuselection:`ロール管理` が表示されます。

#. | :menuselection:`ロール一覧` 画面が表示されるので、:guilabel:`削除` ボタンをクリックします。

   .. figure:: /images/ja/manuals/platform/role/platform_role_list_delete.png
      :width: 600px
      :align: left

#. | 確認メッセージが表示されるので、:kbd:`オーガナイゼーションID/ロールID` を入力し、 :guilabel:`はい、削除します` をクリックします。

   .. figure:: /images/ja/manuals/platform/role/platform_role_delete.png
      :width: 600px
      :align: left

   .. tip::
      | 一度削除したロールを復元することは出来ません。
