============
ログイン方法
============

はじめに
------------

| 本書は、システム管理の画面操作する際のログイン方法について記載したものです。

.. _system_manager_login:

ログイン
------------

#. | ログイン時は、必ずユーザー名とパスワードを準備の上、ログインしてください。

   .. figure:: /images/ja/manuals/platform/login/exastro-login_v2-4.png
      :alt: ログイン
      :width: 600px
      :align: left
      :class: with-border-thin

   .. list-table:: 項目説明
      :widths: 40 200
      :header-rows: 1
      :align: left

      * - 項目名
        - 説明
      * - | ユーザー名(Username)
        - | インストール時に指定したシステム管理者のユーザー名
          | e.g. admin ※
      * - | パスワード(Password)
        - | インストール時に指定したシステム管理者のパスワード
          | e.g. password ※

   .. tip::
             |  ユーザー名、パスワードは、インストール時に指定したシステム管理者のユーザー名、パスワードを使用してください。
             |  docker版でインストールした際のユーザー名、パスワードは、:ref:`install_docker_compose` を参照
             |  helm版でインストールした際のユーザー名、パスワードは、:ref:`install_helm` を参照

#. | ログイン後、下記のようにオーガナイゼーション管理画面が表示されます。

   .. figure:: /images/ja/manuals/platform/login/login_platform_manager.png
      :alt: オーガナイゼーション管理画面（一覧）
      :width: 600px
      :align: left
      :class: with-border-thin

.. include:: ../it_automation_base/setting_profile_account_management.rst

.. _exastro_refresh_token:

.. include:: ../it_automation_base/setting_profile_refresh_token.rst
