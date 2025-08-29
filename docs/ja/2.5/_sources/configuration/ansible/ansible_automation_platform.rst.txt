===========================
Ansible Automation Platform
===========================

はじめに
========

| Exastro IT Automation（以下、ITAとも記載する）で Ansible 連携機能 (以下、Ansible driver) として運用する為のシステム構成と環境構築について説明します。
| 本書ではそのうち Ansible Automation Platform を実行エンジンとしたシステム構成と環境構築について説明します。
|
| Ansible Core による構成を行う場合は、:doc:`./ansible_core` を参照してください。
|
| ITA Ansible driver を利用するにあたっては、Exastro IT Automation がインストール済みであることが前提です。
| Exastro IT Automation のインストール方法に関しては、 :doc:`../../installation/online/exastro/kubernetes` を参照してください。



システム構成
============

| Ansible driver は Exastro IT Automation のデプロイ時に標準機能として提供されます。
|
| Ansible 実行サーバのスケールアウトが必要な場合は、Ansible Automation Platform による構成を推奨します。
|
| 以下に Ansible Automation Platform における構成パターンと構成イメージを記載します。

システム構成パターン
--------------------

| Ansible Automation Controller は、Ansible 実行における拡張された機能の利用や、可用性を高めた構成で運用することが可能です。

.. warning::
   | ITA システムおよび Ansible Core とは個別の専用サーバを用意する必要があります。
   | また実行する Playbook を Ansible Vault で暗号化するため、Ansible Core (Ansible driver (Agent)) が必要となります。

| 以下に主な Ansible driver 機能利用の構成パターンと構成イメージを記載します。
| ※ITA システムは省略した構成図を記載します。


.. list-table:: システム構成パターン
   :widths: 5 50 80 25
   :header-rows: 1
   :align: left

   * - No
     - 構成
     - 説明
     - Ansibleスケールアウト可否
   * - 1
     - | Ansible Automation Platform (ハイブリッドパターン)
     - | Ansible Control ノード自体が、実行対象となる Managed ノードに対して作業を実行する構成です。
       | シンプルな構成の反面、各 Managed ノードに対して疎通ができる必要があります。
     - 〇
   * - 2
     - Ansible Automation Platform (実行ノード分離パターン)
     - | Ansible Control ノードが Ansible Execution ノードと連携し、Ansible Execution ノードが、実行対象となる各 Managed ノードに対して作業を実行する構成です。
       | 構成は複雑になりますが、Ansible Control ノードから Ansible Execution ノードに対しての疎通のみできればいいので、各 Managed ノードに対して通信設定をする必要がありません。
     - 〇

.. tabs::

   .. tab:: Ansible Automation Platform (ハイブリッドパターン)

      Ansible Automation Platform (ハイブリッドパターン)を下記に記載します。

      .. figure:: /images/ja/diagram/aap_hybrid.png
         :alt: Ansible Automation Platform (ハイブリッドパターン)
         :width: 900px

         Ansible Automation Platform (ハイブリッドパターン)


      .. list-table:: システム通信要件
         :widths: 10 20 20 40 100
         :header-rows: 1
         :align: left

         * - | 通信番号
             | ※1
           - FROM
           - TO
           - | プロトコル
             | [ポート番号　※2]
           - 主な用途
         * - ①
           - ITAシステム
           - Hybrid ノード
           - | http(s)
             | [80(443)/tcp]
           - Ansible Automation Platform 制御通信
         * - ②
           - ITAシステム
           - Hybrid ノード
           - ssh [22/tcp]
           - Ansible Automation Platform 作業実行用通信
         * - ③
           - ITAシステム
           - Git
           - | http(s)
             | [80(443)/tcp]
           - ファイル連携
         * - ④
           - Hybrid ノード
           - 対象機器
           - | Any
             | (ssh [22/tcp] telnet [23/tcp] 等 ※3）
           - 自動構成の対象機器へのコマンド実行
         * - ⑤
           - Hybrid ノード
           - Git
           - | http(s)
             | [80(443)/tcp]
           - ファイル連携

      | ※1 Ansible Automation Platform (ハイブリッドパターン)の構成イメージの番号と紐づく通信番号を記載。
      | ※2 ポート番号は標準的なポート番号を記載。
      | ※3 代表的な例を記載。Ansibleモジュールにより利用プロトコルが異なる。

   .. tab:: Ansible Automation Platform (実行ノード分離パターン)

      Ansible Automation Platform (実行ノード分離パターン)を下記に記載します。

      .. figure:: /images/ja/diagram/aap_divide.png
        :alt: Ansible Automation Platform (実行ノード分離パターン)
        :width: 1200px

        Ansible Automation Platform (実行ノード分離パターン)

      .. list-table:: システム通信要件
         :widths: 10 20 20 40 100
         :header-rows: 1
         :align: left

         * - | 通信番号
             | ※1
           - FROM
           - TO
           - | プロトコル
             | [ポート番号　※2]
           - 主な用途
         * - ①
           - ITAシステム
           - Controle ノード
           - | http(s)
             | [80(443)/tcp]
           - Ansible Automation Platform 制御通信
         * - ②
           - ITAシステム
           - Controle ノード
           - ssh [22/tcp]
           - Ansible Automation Platform 作業実行用通信
         * - ③
           - ITAシステム
           - Git
           - | http(s)
             | [80(443)/tcp]
           - ファイル連携
         * - ④
           - Controle ノード
           - 対象機器
           - | Any
             | (ssh [22/tcp] telnet [23/tcp] 等 ※3）
           - 自動構成の対象機器へのコマンド実行
         * - ⑤
           - Controle ノード
           - Git
           - | http(s)
             | [80(443)/tcp]
           - ファイル連携

      | ※1 Ansible Automation Controller (実行ノード分離パターン)の構成イメージに上記番号と紐づく通信番号を記載。
      | ※2 ポート番号は標準的なポート番号を記載。
      | ※3 代表的な例を記載。Ansibleモジュールにより利用プロトコルが異なる。



システム要件
============

| Ansible driver はITAシステムのシステム要件に準拠するため、 :doc:`../../installation/online/exastro/kubernetes` を参照してください。
| ここでは Ansible Automation Platform の要件を記載します。

..  include:: ../../include/aap_versions.rst


Playbook連携
============

| ITAとAnsible Automation Platform間のPlaybook連携について説明します。

.. figure:: /images/ja/diagram/playbook_link_between_aap_and_container.png
   :alt: ITAとAnsible Automation Platform2.xのPlaybook連携図
   :width: 600px

   ITAとAnsible Automatio Platform2.x間のPlaybook連携図


初期設定
========

| Ansible Automation Platformインストール後、実行エンジンに応じて各設定を行ってください。

.. list-table:: Ansible Core システム要件
   :widths: 45 55
   :header-rows: 1
   :align: center

   * - 設定項目
     - Ansible Automation Platform 2.x
   * - ITA作業用ディレクトリの準備
     - 〇
   * - ITA作業用ディレクトリの公開
     - 〇
   * - Ansible Automation Platformへのファイル転送ユーザーの準備
     - 〇
   * - Ansible Automation Platformと連携するGitへのユーザーの準備
     - 〇
   * - Proxy設定
     - △


| 〇:必須　△:必要に応じて



ITA作業用ディレクトリの準備
---------------------------

| Ansible Automation Platform サーバに ITA 作業用ディレクトリを作成してください。
| クラスタ構成の場合は、構成している全てのサーバにディレクトリを作成してください。
| ただし、Ansible Automation Platform の Hop ノードにはディレクトリ作成不要です。
|

.. list-table:: ITA作業用ディレクトリの作成情報
   :widths: 35 120
   :header-rows: 1
   :align: left

   * - 項目
     - 設定値
   * - ディレクトリパス
     - /var/lib/exastro
   * - オーナー・グループ
     - awx:awx
   * - パーミッション
     - 0755


ITA作業用ディレクトリの公開
---------------------------

| ブラウザより Ansible Automation Platform にログインし、:menuselection:`設定 --> ジョブ --> 分離されたジョブに公開するパス` に :file:`/var/lib/exastro/` を設定します。

.. figure:: /images/ja/diagram/publish_ita_operation_director.png
   :width: 600px


Ansible Automation Platform へのファイル転送ユーザーの準備
----------------------------------------------------------

| ITA から Ansible Automation Platformの プロジェクトを生成する際、Ansible Automation Platform の下記ディレクトリに Playbook 一式をファイル転送します必要があります。
| ファイル転送するLinuxユーザーを準備してください。
|
| ・SCM 管理ディレクトリ(/var/lib/awx/projects)
| 　※Ansible Tower3.xの場合にLinuxユーザーでPlaybook一式をファイル転送します。
| ・ITA作業用ディレクトリ(/var/lib/exastro)

| Linux ユーザーは、Ansible Automation Platform インストール時に生成される awx ユーザーにパスワードを設定し使用することを強く推奨します。

.. warning::
 | awx ユーザー以外のユーザーを用意し使用し、SCM 管理パス(/var/lib/awx/projects)のパーミッションの変更を行う運用は Red Hat のサポート対象外となりますのでご注意ください。

| 準備した Linux ユーザーは、ITA システムに登録する必要があります。 :ref:`ansible_common_ansible_automation_controller_hosts` を参照し、登録を行ってください。


Ansible Automation Platformと連携するGitへのユーザーの準備
----------------------------------------------------------

| ITA から Ansible Automation Platform のプロジェクトを生成する際の SCM タイプを Git にしています。
| 連携先の Git リポジトリは、Ansible driverのバックヤード機能がインストールされているホストに作成されます。
| Ansible Automation Platformから、この Git リポジトリにssh鍵認証で接続する Linux ユーザーを準備してください。
|
| ユーザーを作成操作可能なアクセストークンが必要となります。設定方法は :ref:`installation_kubernetes_gitlablinkage` を参照してください。


.. list-table:: ITA インストール時に生成される SSH 鍵認証用 Linux ユーザー情報
   :widths: 35 200
   :header-rows: 1
   :align: left

   * - 項目
     - 値
   * - ユーザー
     - awx
   * - パスワード
     - 未設定
   * - 秘密鍵
     - /home/awx/.ssh/rsa_awx_key
   * - 公開鍵
     - /home/awx/.ssh/rsa_awx_key.pub



Proxyの設定
-----------

| Ansible Automation Platform の設定に応じて作業実行時などに Red Hat 社の所定のサイトより実行環境のコンテナイメージのダウンロードが行われます。
| ブラウザより Ansible Automation Platform にログインし、:menuselection:`設定 --> ジョブ --> 追加の環境変数` に下記の環境変数を設定します。

-  https_proxy
-  http_proxy
-  no_proxy
-  HTTPS_PROXY
-  HTTP_PROXY
-  NO_PROXY

.. figure:: /images/ja/diagram/proxy_settings.png
   :width: 600px

.. warning::
  | Ansible Automation Platform が Proxy 環境下にある場合、Ansible Automation Platform に Proxy 設定が必要です。Proxy の設定がされていない状態で作業実行を行った場合、エラー原因が取得できない場合があります。


Organization 追加時の作業
=========================

.. _platform_make_organization:

組織作成
--------

| Organization 用の組織を作成します。
| Ansible Automation Platform は admin(管理ユーザー) でログインしてください。
|

#. | :menuselection:`アクセス --> 組織` の :guilabel:`追加` ボタンをクリックします。
#. | 該当項目を入力し、 :guilabel:`保存` ボタンをクリックしてください。
   |
   | 必須項目及び設定値については下記の表を参照してください。

.. list-table::
   :widths: 35 80 80
   :header-rows: 1
   :align: left

   * - 項目
     - 設定値
     - 備考
   * - 名前
     - 任意の名称
     -
   * - インスタンスグループ
     - ※未選択のままにする
     - 「:ref:`platform_connection_instance` 」で設定


.. _make_application:

アプリケーション登録
--------------------

| 接続トークン払出用のアプリケーション登録をします。
| Ansible Automation Platform は admin(管理ユーザー)でログインしてください。
|

#. | :menuselection:`管理 --> アプリケーション` の :guilabel:`追加` ボタンをクリックしてください。
#. | 該当項目を入力し、 :guilabel:`保存` ボタンをクリックしてください。
   |
   | 必須項目及び設定値については下記の表を参照してください。

.. list-table::
   :widths: 35 80 80
   :header-rows: 1
   :align: left

   * - 項目
     - 設定値
     - 備考
   * - 名前
     - 任意の名称
     - 「 :ref:`platform_output_token` 」で使用する
   * - 組織
     - 「 :ref:`platform_make_organization` 」で作成した組織を選択する
     -
   * - 認証付与タイプ
     - リソース所有者のパスワードベースを選択
     -
   * - クライアントタイプ
     - 秘密
     -

.. _platform_architecture_user:

ユーザー作成
------------

| Organization 用のユーザーを作成します。
| Ansible Automation Platform は admin(管理ユーザー)でログインしてください。
|

#. | :menuselection:`アクセス --> ユーザー` の :guilabel:`追加` ボタンをクリックしてください。
#. | 該当項目を入力し、 :guilabel:`保存` ボタンをクリックしてください。
   |
   | 必須項目及び設定値については下記の表を参照してください。


.. list-table::
   :widths: 35 80 80
   :header-rows: 1
   :align: left

   * - 項目
     - 設定値
     - 備考
   * - ユーザー名
     - 任意のユーザー名
     -
   * - パスワード
     - 任意のパスワード
     -
   * - パスワードの確認
     - 任意のパスワード
     -
   * - ユーザータイプ
     - 標準ユーザーを選択
     -
   * - 組織
     - 「 :ref:`platform_make_organization` 」で作成した組織を選択する
     -

.. _platform_organization_roles:

ロール設定
----------

| Organization 用ユーザーに紐づける組織に対してロールを設定します。
| Ansible Automation Platform は admin(管理ユーザー)でログインしてください。
|

#. | :menuselection:`アクセス --> ユーザー` より「 :ref:`platform_architecture_user` 」で作成したユーザー名をクリックしてください。
#. | ユーザーの詳細画面に遷移されるため、:menuselection:`ロール` タブを選択し、:guilabel:`追加` ボタンをクリックしてください。
#. | 下記表の通りにユーザー権限の追加をしてください。

   #. | リソースタイプの追加 では 「組織」 を選択し、:guilabel:`Next` ボタンをクリックしてください。
   #. | リストの項目の選択 では 「 :ref:`platform_make_organization` 」 で作成した組織 を選択し、:guilabel:`Next` ボタンをクリックしてください。
      | ※「 :ref:`platform_make_organization` 」で作成した組織以外のロールは付与しないでください。
   #. | 適用するロールの選択 では 「管理者」と「メンバー」の２つのロールを選択し、:guilabel:`保存` ボタンをクリックしてください



.. _platform_output_token:

認証トークン払出
----------------

| Ansible Automation Platform は :ref:`platform_architecture_user` で作成したユーザーでログインしてください。
|

#. | :menuselection:`アクセス --> ユーザー` の :guilabel:`追加` ボタンを押下する。
#. | 該当項目を入力し、 :guilabel:`保存` ボタンを押下する。
   |
   | 必須項目及び設定値については下記の表を参照してください。

.. list-table::
   :widths: 35 50 30
   :header-rows: 1
   :align: left

   * - 項目
     - 設定値
     - 備考
   * - アプリケーション
     - 「 :ref:`make_application` 」で作成したアプリケーションを選択
     -
   * - 範囲
     - 書き込みを選択
     -

ワークスペース追加時の作業
==========================

.. _platform_ansible_execution_environment:

インスタンスを組み込む
----------------------

| インスタンスであるAnsible Execution Environment (以下、Ansible ee とも表記) を組み込んてください。


インスタンスグループ作成
------------------------

| ※ 組み込んだ インスタンス (Ansible ee) を追加するインスタンスグループが既にある場合、次の 「 :ref:`platform_add_insetance` 」の手順に進んでください。

| Ansible Automation Platform は admin(管理ユーザー)でログインしてください。
|

#. | :menuselection:`管理 --> インスタンスグループ` の :ref:`platform_ansible_execution_environment` で組み込んだインスタンス( Ansible ee )を追加するインスタンスグループを選択してください。
#. | 該当項目を入力し、 :guilabel:`保存` ボタンを押下する。
   |
   | 必須項目及び設定値については下記の表を参照してください。

.. list-table::
   :widths: 35 30 50
   :header-rows: 1
   :align: left

   * - 項目
     - 設定値
     - 備考
   * - 名前
     - 任意の名称
     - 命名規則については下記をご参照ください


.. _platform_add_insetance:

インスタンスグループにインスタンスを追加
----------------------------------------

| インスタンスグループに「 :ref:`platform_ansible_execution_environment` 」で組み込んだインスタンス( Ansible ee )を追加します。
| Ansible Automation Platform は admin(管理ユーザー)でログインしてください。
|

#. | :menuselection:`管理 --> インスタンスグループ` より、「 :ref:`platform_ansible_execution_environment` 」で組み込んだインスタンス( Ansible ee )を追加するインスタンスグループ名をクリックしてください。
#. | インスタンスグループの詳細画面に遷移されるため、:menuselection:`インスタンス` タブを選択し、:guilabel:`関連付け` ボタンをクリックしてください。
#. | インスタンスの選択の画面に遷移され、組み込んだインスタンス( Ansible ee )が表示されるので選択し、:guilabel:`保存` ボタンをクリックしてください。


.. _platform_connection_instance:

組織とインスタンスグループの紐づけ
----------------------------------

| 「 :ref:`platform_make_organization` 」で作成した組織と上記で使用したインスタンスグループを紐づけます。
| Ansible Automation Platform は admin(管理ユーザー)でログインしてください。
|

#. | :menuselection:`アクセス --> 組織` より、「 :ref:`platform_make_organization` 」で作成した組織名をクリックしてください。
#. | 詳細画面に遷移されるため、:guilabel:`編集` ボタンをクリックしてください。
#. | 詳細の編集の画面に遷移されるため、インスタンスグループに上記で使用したインスタンスグループを選択し、:guilabel:`保存` ボタンをクリックしてください。
   | ※複数選択可能


ITA に認証トークンと組織を登録
------------------------------

| :ref:`ansible_common_interface_information` を参照し、:menuselection:`Ansible共通 --> インターフェース情報` に :ref:`platform_output_token` で作成した認証トークンと :ref:`platform_make_organization` で作成した組織の登録を行ってください。
|

.. warning:: | 組織名を登録する際は、認証トークンを登録してから1分程度経過後(※)、「 :ref:`ansible_common_interface_information` 」を再表示し、「 :ref:`platform_make_organization` 」で作成した組織名を選択してください。

  ※ バックヤードで各認証トークンに対応したユーザーに紐づいている組織を収集し、プルダウンに表示しているため。


.. note:: | 「 :ref:`platform_organization_roles` 」で作成したユーザーに複数の組織のロールを付与されていた場合、ランダムに選択された組織をデフォルト値とします。


