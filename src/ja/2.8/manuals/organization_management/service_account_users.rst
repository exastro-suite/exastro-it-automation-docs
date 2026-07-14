==============================
サービスアカウントユーザー管理
==============================

はじめに
========

| 本書では、Exastro システム におけるサービスアカウントユーザー管理の機能について説明します。

目的
====

| OASE AgentやAnsible Execution AgentがExastro システムにアクセスするためのユーザーを作成します。
| また、OASE AgentやAnsible Execution Agentのインストールパラメータであるリフレッシュトークンを本機能で発行します。


サービスアカウントユーザーの設定
================================

| サービスアカウントユーザーはワークスペースに属し、ワークスペース管理者によって追加・更新・削除を行うことができます。
| サービスアカウントユーザーはリフレッシュトークンを有しており、このリフレッシュトークンを使ってExastro システムにアクセスします。

.. tip::
   | リフレッシュトークンには有効期限があります。（デフォルトの設定の場合はリフレッシュトークン発行の1年後が有効期限になります）
   | 有効期限が切れる前にリフレッシュトークンの再発行を本機能で行った後にOASE AgentやAnsible Execution Agentに再設定する必要があります。


サービスアカウントユーザーの登録
--------------------------------

| サービスアカウントユーザーは、下記の手順で登録します。

#. | Exastro システムにワークスペース管理者でログインします。

#. | メニューより :menuselection:`サービスアカウント管理` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | :menuselection:`ワークスペース選択` 画面が表示されるので、サービスアカウントユーザーの登録を行いたいワークスペースを選択、または :guilabel:`サービスアカウントユーザー設定` をクリックします。

   .. image:: /images/ja/manuals/platform/service_account_users/ワークスペース選択.png
      :width: 600px
      :align: left

   .. note:: | ワークスペース管理者権限のあるワークスペースのみ表示されます。

#. | :menuselection:`サービスアカウントユーザー一覧` 画面が表示されるので、 :guilabel:`作成` をクリックします。

   .. image:: /images/ja/manuals/platform/service_account_users/サービスアカウント一覧.png
      :width: 600px
      :align: left

#. | :menuselection:`新規サービスアカウントユーザー` 画面が表示されるので、サービスアカウントユーザーの情報を入力し、 :guilabel:`登録` をクリックします。

   .. figure:: /images/ja/manuals/platform/service_account_users/新規サービスアカウントユーザー.png
      :width: 600px
      :align: left

   .. list-table:: 新規サービスアカウントユーザー項目
      :widths: 150 400
      :header-rows: 1
      :align: left

      * - 項目名
        - 説明
      * - サービスアカウントユーザー名
        - | サービスアカウントユーザーの名前を指定します。
      * - サービスアカウントユーザー種別
        - | サービスアカウントユーザーの種別（用途）を選択します。
          | ここで選択した種別によって、サービスアカウントユーザーに必要なロールが割り振られます。
      * - 説明
        - | サービスアカウントユーザーに関する説明を指定します。

#. | サービスアカウントユーザーの登録に成功するとリフレッシュトークンが表示されます。
   | この値はOASE AgentやAnsible Execution Agentのインストールパラメータとして使用しますので、別途保管願います。

   .. figure:: /images/ja/manuals/platform/service_account_users/トークン発行後モーダル.png
      :width: 600px
      :align: left


サービスアカウントユーザーのリフレッシュトークンの再発行
--------------------------------------------------------

| サービスアカウントユーザーのリフレッシュトークンの再発行は、下記の手順で行います。

#. | Exastro システムにワークスペース管理者でログインします。

#. | メニューより :menuselection:`サービスアカウント管理` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | :menuselection:`サービスアカウントユーザー一覧` 画面が表示されるので、 再発行を行うサービスユーザーアカウントの明細の :guilabel:`トークン発行` をクリックします。

   .. image:: /images/ja/manuals/platform/service_account_users/サービスアカウント一覧.png
      :width: 600px
      :align: left

#. | :menuselection:`サービスアカウントトークン発行` 画面が表示されるので、:guilabel:`発行` をクリックします。

   .. image:: /images/ja/manuals/platform/service_account_users/サービスアカウントユーザートークン発行.png
      :width: 600px
      :align: left

#. | リフレッシュトークンの発行に成功するとリフレッシュトークンが表示されます。
   | この値はOASE AgentやAnsible Execution Agentのインストールパラメータとして使用しますので、別途保管願います。

   .. figure:: /images/ja/manuals/platform/service_account_users/トークン発行後モーダル.png
      :width: 600px
      :align: left


サービスアカウントユーザーの削除
--------------------------------

| OASE AgentやAnsible Execution Agentを廃止した等の理由により、使用していたサービスアカウントユーザーを削除する場合は下記の手順で行います。

#. | Exastro システムにワークスペース管理者でログインします。

#. | メニューより :menuselection:`サービスアカウント管理` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | :menuselection:`サービスアカウントユーザー一覧` 画面が表示されるので、 削除するサービスユーザーアカウントの明細の :guilabel:`削除` をクリックします。

   .. image:: /images/ja/manuals/platform/service_account_users/サービスアカウント一覧.png
      :width: 600px
      :align: left

#. | 確認メッセージが表示されるので、 画面の指示通りに入力を行い、 :guilabel:`はい、削除します` をクリックします。

   .. image:: /images/ja/manuals/platform/service_account_users/サービスアカウント削除確認ダイアログ.png
      :width: 600px
      :align: left

   .. tip::
      | 一度削除したサービスアカウントユーザーを復元することは出来ません。


サービスアカウントユーザーのリフレッシュトークンの削除
------------------------------------------------------

| 何らかの理由で発行済みのリフレッシュトークンを使用できないようにする場合は、下記の手順でリフレッシュトークンを削除します。

.. tip::
   | リフレッシュトークンの削除は、当該のサービスアカウントユーザーで発行済みの全てのリフレッシュトークンを使用できないようにします。

#. | Exastro システムにワークスペース管理者でログインします。

#. | メニューより :menuselection:`サービスアカウント管理` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | :menuselection:`サービスアカウントユーザー一覧` 画面が表示されるので、 対象のサービスユーザーアカウントの明細の :guilabel:`トークン発行` をクリックします。

   .. image:: /images/ja/manuals/platform/service_account_users/サービスアカウント一覧.png
      :width: 600px
      :align: left

#. | :menuselection:`サービスアカウントトークン発行` 画面が表示されるので、:guilabel:`削除` をクリックします。

   .. image:: /images/ja/manuals/platform/service_account_users/サービスアカウントユーザートークン発行.png
      :width: 600px
      :align: left

#. | 確認メッセージが表示されるので、 画面の指示通りに入力を行い、 :guilabel:`はい、削除します` をクリックします。

   .. image:: /images/ja/manuals/platform/service_account_users/トークン削除確認ダイアログ.png
      :width: 600px
      :align: left

   .. tip::
      | 一度削除したリフレッシュトークンを復元することは出来ません。
