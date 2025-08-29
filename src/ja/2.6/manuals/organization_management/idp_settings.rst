=======
IdP設定
=======


はじめに
========

| 本書では、Exastro Suite における アイデンティティー・プロバイダー(以降IdP)を利用する手順について説明します。
| IdPを使用するにあたっては、オーガナイゼーション管理者が使用する認証サービスごとの設定が必要となりますが、
| 本説明においては、Microsoft EntraIDを利用した場合の例として記載しています。

利用条件
========

システム条件
^^^^^^^^^^^^

| Exastro システムのアプリケーションバージョンは、以下の通りです。


.. list-table::
   :widths: 20 15
   :header-rows: 1
   :align: left

   * - | アプリケーション
     - | バージョン
   * - | Exastro IT Automation
     - | 2.4.0以降
   * - | Exastro Platform
     - | 1.8.1以降

| Helmでインストールする際は、Helm chartsバージョン 1.4.4 以降が対象となります。

認証サービス情報
^^^^^^^^^^^^^^^^

| 利用する認証サービスの情報をあらかじめ取得しておきます。
| 例）Microsoft EntraIDの場合、以下の情報で設定できます。

- | リモートIDPディスカバリー・ディスクリプターのメタデータ
- | クライアントID
- | クライアント・シークレット

IdP設定方法
===========

アイデンティティー・プロバイダー設定登録
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. | Exastro システムにオーガナイゼーション管理者でログインします。

#. | メニューより :menuselection:`アイデンティティー・プロバイダー` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

   .. note:: | 利用できない場合は、メニューに :menuselection:`アイデンティティー・プロバイダー` は表示されません。

#. | パネルより :menuselection:`OpenID Connect v1.0` をクリックします。

   .. figure:: /images/ja/manuals/platform/idp_settings/idp_settings_select_provider.png
      :width: 600px
      :align: left

   .. note:: | 本説明では、OpenID Connect v1.0を利用した際の設定を記述しております。
      | 登録する種類や設定によって、選択するパネルは異なります。

#. | 事前に準備した情報の入力ならびに、エリアス・表示名・クライアント認証を入力・選択して、 :guilabel:`追加` ボタンをクリックします。

   .. figure:: /images/ja/manuals/platform/idp_settings/idp_settings_regist_provider.png
      :width: 600px
      :align: left

#. | メタデータの情報で各種情報が設定されますので、 :guilabel:`保存` ボタンをクリックします。

   .. figure:: /images/ja/manuals/platform/idp_settings/idp_settings_save_provider.png
      :width: 600px
      :align: left

アイデンティティー・プロバイダー設定一覧
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. | Exastro システムにオーガナイゼーション管理者でログインします。

#. | メニューより :menuselection:`アイデンティティー・プロバイダー` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | 登録済みの設定がある場合は、一覧表示されます。

   .. figure:: /images/ja/manuals/platform/idp_settings/idp_settings_providers_list.png
      :width: 600px
      :align: left

アイデンティティー・プロバイダー設定追加
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. | Exastro システムにオーガナイゼーション管理者でログインします。

#. | メニューより :menuselection:`アイデンティティー・プロバイダー` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. |  :guilabel:`Add Provider` をクリックし、該当のサービスを選択して追加します。

   .. figure:: /images/ja/manuals/platform/idp_settings/idp_settings_add_provider.png
      :width: 600px
      :align: left

   .. figure:: /images/ja/manuals/platform/idp_settings/idp_settings_select_add_provider.png
      :width: 600px
      :align: left

アイデンティティー・プロバイダー設定編集
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. | Exastro システムにオーガナイゼーション管理者でログインします。

#. | メニューより :menuselection:`アイデンティティー・プロバイダー` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | 一覧から編集対象のプロバイダーを選択して編集します。

   .. figure:: /images/ja/manuals/platform/idp_settings/idp_settings_select_edit_provider.png
      :width: 600px
      :align: left

アイデンティティー・プロバイダー設定削除
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. | Exastro システムにオーガナイゼーション管理者でログインします。

#. | メニューより :menuselection:`アイデンティティー・プロバイダー` をクリックします。

   .. image:: /images/ja/manuals/platform/platform_menu.png
      :width: 200px
      :align: left

#. | 一覧から削除対象の設定の :guilabel:`...` をクリックし、表示された :guilabel:`Delete` ボタンをクリックします。

   .. figure:: /images/ja/manuals/platform/idp_settings/idp_settings_select_delete_provider.png
      :width: 600px
      :align: left

#. | 表示された確認メッセージの :guilabel:`Delete` ボタンをクリックします。

   .. figure:: /images/ja/manuals/platform/idp_settings/idp_settings_delete_provider.png
      :width: 600px
      :align: left

ログイン
========

#. | 上述の設定完了後、ログイン画面に設定した表示名が表示されるようになります。

   .. figure:: /images/ja/manuals/platform/idp_settings/idp_settings_login.png
      :width: 600px
      :align: left

#. | 設定した表示名をクリックしログインしてください。

   .. note:: | はじめてログインした際は、プロフィール情報を入力する必要があります。
      | 連携元の情報によって不足している内容は、その際に入力する必要があります。
