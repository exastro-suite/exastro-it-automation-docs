===================================
Keycloakコンソール
===================================

はじめに
========

| 本書では、Exastro Suite におけるシステム管理の Keycloakコンソール について説明します。

KeyCloakコンソール詳細
======================

| システム管理者が、新たなシステム管理者を追加やオーガナイゼーション毎のユーザーパスワード変更やパスワードポリシー、ログイン方法などを変更する際に利用します。
| またユーザーの変更やロールの追加を行った際の監査ログも確認できます。

#. | Keyclaokコンソールの選択

   | メニューより :menuselection:`Keycloakコンソール` を選択することで、Keycloakコンソール画面を表示することができます。

   .. figure:: /images/ja/manuals/platform/keycloak_console/keycloak_console_menu_v2-4.png
      :width: 200px
      :align: left
      :class: with-border-thin

#. |  レルム（オーガナイゼーション）選択

   | 設定するレルム（オーガナイゼーション）を選択して作業を進めることができます。

   .. figure:: /images/ja/manuals/platform/keycloak_console/keycloak_console_realm_list_v2-9.png
      :width: 600px
      :align: left
      :class: with-border-thin

   .. danger::

      | 基本的には、設定変更しないようにお願いします。
      | 変更内容によっては、正常にアプリケーションが動作しなくなる可能性があります。

   .. note::

      | 各種ポリシーやログの確認方法などは、 `Keycloakの公式ドキュメント <https://www.keycloak.org/documentation.html>`_ をご参照ください。

システム管理者の追加
----------------------

#. | システム管理者の追加

   | システム管理者を追加する際に、上述のレルムで `master` を選択し、メニューから :menuselection:`ユーザー` を選択後、 :guilabel:`ユーザーの追加` ボタンを押下して、ユーザーを追加（情報入力）することができます。


   .. figure:: /images/ja/manuals/platform/keycloak_console/keycloak_console_user_list_v2-9.png
      :width: 600px
      :align: left
      :class: with-border-thin

#. | システム管理者のユーザー情報入力

   | ユーザー情報入力に新しいユーザー情報を入力します。

   .. figure:: /images/ja/manuals/platform/keycloak_console/keycloak_console_user_add_v2-9.png
      :width: 600px
      :align: left
      :class: with-border-thin

   .. list-table:: 項目説明
      :widths: 40 200
      :header-rows: 1
      :align: left

      * - 項目名
        - 説明
      * - | 必要なユーザーアクション
        - | 次回ログインした際に、どのような情報を設定するか設定できます
          | 詳しい設定値は、`Keycloakの公式ドキュメント <https://www.keycloak.org/documentation.html>`_ をご参照ください
      * - | メールアドレスが検証済み
        - | OFFを選択します
          | ※ONを選択してもメール送信用サーバー設定が設定されていないと動作しません
      * - | ロケールの選択
        - | 言語を選択します
      * - | ユーザー名
        - | ログイン時に使用するユーザー名を入力します
      * - | メールアドレス
        - | 追加するユーザーのE-mailアドレスを入力します
      * - | 名
        - | 追加するユーザーの名を入力します
      * - | 性
        - | 追加するユーザーの姓を入力します
      * - | グループ
        - | Exastro システムでは未対応のため、指定しないでください


#. | システム管理者のユーザー登録

   | 必要な情報を入力後、 :guilabel:`作成` ボタンを押下して、ユーザーを登録することができます。

   .. figure:: /images/ja/manuals/platform/keycloak_console/keycloak_console_user_add_ok_v2-9.png
      :width: 600px
      :align: left
      :class: with-border-thin

#. | 追加したユーザーのパスワード設定

   | ユーザーの登録ではパスワードの設定ができていないため、登録後次の画面からパスワードを設定する必要があります。
   | ユーザー詳細の :menuselection:`クレデンシャル` を選択し、パスワードを設定してください。
   | :menuselection:`パスワード設定` ボタンからパスワードを入力後、:guilabel:`保存` ボタンを押下してパスワード設定します。

   .. figure:: /images/ja/manuals/platform/keycloak_console/keycloak_console_user_add_password_v2-9.png
      :width: 600px
      :align: left
      :class: with-border-thin

   .. figure:: /images/ja/manuals/platform/keycloak_console/keycloak_console_user_add_password_set_v2-9.png
      :width: 400px
      :align: left
      :class: with-border-thin

   .. list-table:: 項目説明
      :widths: 40 200
      :header-rows: 1
      :align: left

      * - 項目名
        - 説明
      * - | パスワード
        - | ログイン時に使用するパスワードを入力します
      * - | 新しいパスワード（確認）
        - | 入力したパスワードと同じ内容を入力します
      * - | 一時的
        - | オンに設定した際、次回ログイン時にパスワード変更画面が表示されます
          | 通常はオンのままご利用ください

#. | 追加したユーザーのロール設定

   | 追加したユーザーに必要なRoleを割り当てすることで、システム管理者と同等の設定が行えるようになります。
   | ユーザー詳細の :menuselection:`ロールマッピング` を選択し、ロールを設定してください。
   | :menuselection:`ロールの割り当て` ボタンからロールを選択した後、:guilabel:`割り当て` ボタンを押下してアサインします。

   .. figure:: /images/ja/manuals/platform/keycloak_console/keycloak_console_user_add_role_v2-9.png
      :width: 600px
      :align: left
      :class: with-border-thin

   .. figure:: /images/ja/manuals/platform/keycloak_console/keycloak_console_user_add_role_set_v2-9.png
      :width: 400px
      :align: left
      :class: with-border-thin


   | これで、追加したユーザーがシステム管理者として、作業できるようになりました。

.. _access_token_lifespan_change:

アクセストークンの有効期間の変更
--------------------------------

| 大容量ファイルのアップロード・ダウンロードなど完了に時間が掛かる処理を行った際に、「認証に失敗しました。」とメッセージが表示されてしまう事象が多発する場合、
| アクセストークン有効期間の変更を行うと事象を解消できることがあります。

#. | クライアント（オーガナイゼーションIDと同じ値）選択

   | 上述の `レルム（オーガナイゼーション）選択` で目的のレルムを選択し、メニューから :menuselection:`クライアント` を選択します。
   | :menuselection:`クライアント一覧` 画面が表示されるので、 クライアントID列から :guilabel:`オーガナイゼーションIDと同じ値のクライアント` を選択します。

   .. figure:: /images/ja/manuals/platform/keycloak_console/keycloak_console_client_v2-9.png
      :width: 600px
      :align: left
      :class: with-border-thin

#. | 高度な設定（クライアント）の表示

   | :menuselection:`クライアント詳細` 画面が表示されるので、 :menuselection:`高度` を選択し、
   | 高度画面の右側 セクションへのジャンプ 高度な設定 を選択します。

   .. figure:: /images/ja/manuals/platform/keycloak_console/keycloak_console_client_advanced_v2-9.png
      :width: 600px
      :align: left
      :class: with-border-thin

#. | アクセストークンの有効期間の変更

   | アクセストークンの有効期間項目の、「レルム設定からの継承」を「有効期限」に変更、変更したい時間を入力します。
   | 画面を下にスクロールし、:guilabel:`保存` ボタンを押下してトークン有効期間の変更を保存します。

   .. figure:: /images/ja/manuals/platform/keycloak_console/keycloak_console_client_advanced_access_token_lifespan_v2-9.png
      :width: 600px
      :align: left
      :class: with-border-thin

   .. figure:: /images/ja/manuals/platform/keycloak_console/keycloak_console_client_advanced_access_token_lifespan_save_v2-9.png
      :width: 600px
      :align: left
      :class: with-border-thin

   .. note::
      | アクセストークンは、SSOセッション・アイドル/SSOセッション最大に指定した時間を過ぎると、有効期間内であってもトークンが無効化されます。
      | SSOセッションのデフォルト設定、SSOセッション・アイドル(1日)/SSOセッション最大(1日) を超える時間が、アクセストークン有効期間に必要な場合は、
      | あわせて SSOセッション・アイドル/SSOセッション最大 の時間も変更を行ってください。


SSOセッション・アイドル/SSOセッション最大の変更
-----------------------------------------------

#. | Session Settings画面の表示

   | 上述の `レルム（オーガナイゼーション）選択` で目的のレルムを選択し、メニューから :menuselection:`レルムの設定` を選択します。
   | :menuselection:`レルム設定` 画面が表示されるので、 :menuselection:`セッション` を選択し、:menuselection:`Session Settings` 画面を表示します。

   .. figure:: /images/ja/manuals/platform/keycloak_console/keycloak_console_realm_sessions_v2-9.png
      :width: 600px
      :align: left
      :class: with-border-thin

#. | アクセストークンの有効期間の変更

   | SSOセッション・アイドル/SSOセッション最大 項目に変更したい時間を入力します。
   | 画面を下にスクロールし、:guilabel:`保存` ボタンを押下してSSOセッションの変更を保存します。

   .. figure:: /images/ja/manuals/platform/keycloak_console/keycloak_console_realm_sessions_edit_v2-9.png
      :width: 600px
      :align: left
      :class: with-border-thin

   .. figure:: /images/ja/manuals/platform/keycloak_console/keycloak_console_realm_sessions_save_v2-9.png
      :width: 600px
      :align: left
      :class: with-border-thin


.. _offline_session_idle_change:

オフラインセッション・アイドルの変更
-----------------------------------------------

| オーガナイゼーション設定で ``refresh_token_max_lifespan_enabled`` を ``false`` （有効期限なし）に設定する場合は、
| あわせてオフラインセッション・アイドルの設定が必要です。

#. | Offline session settings画面の表示

   | 上述の `レルム（オーガナイゼーション）選択` で目的のレルムを選択し、メニューから :menuselection:`レルムの設定` を選択します。
   | :menuselection:`レルム設定` 画面が表示されるので、 :menuselection:`セッション` を選択し、:menuselection:`Offline session settings` 画面を表示します。

   .. figure:: /images/ja/manuals/platform/keycloak_console/keycloak_console_realm_offline_session_v2-9.png
      :width: 600px
      :align: left
      :class: with-border-thin

#. | オフラインセッション・アイドルの変更

   | 「オフラインセッション・アイドル」の初期値には ``999999999`` 秒が設定されているため、365日に変更してください。
   | 画面を下にスクロールし、:guilabel:`保存` ボタンを押下してオフラインセッションの変更を保存します。

   .. figure:: /images/ja/manuals/platform/keycloak_console/keycloak_console_realm_offline_session_edit_v2-9.png
      :width: 600px
      :align: left
      :class: with-border-thin



   .. figure:: /images/ja/manuals/platform/keycloak_console/keycloak_console_realm_sessions_save_v2-9.png
      :width: 600px
      :align: left
      :class: with-border-thin


   .. note::
      | 有効期限は無制限であっても、設定した期間（365日）未使用のrefresh_tokenは自動的に無効化されます。
