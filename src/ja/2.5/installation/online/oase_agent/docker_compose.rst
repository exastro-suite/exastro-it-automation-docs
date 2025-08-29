.. raw:: html

   <script>
   $(window).on('load', function () {
      setTimeout(function(){
        for (var i = 0; i < $("table.filter-table").length; i++) {
          $("[id^='ft-data-" + i + "-2-r']").removeAttr("checked");
          $("[id^='select-all-" + i + "-2']").removeAttr("checked");
          $("[id^='ft-data-" + i + "-2-r'][value^='可']").prop('checked', true);
          $("[id^='ft-data-" + i + "-2-r'][value*='必須']").prop('checked', true);
          tFilterGo(i);
        }
      },200);
   });
   </script>

.. _oase_agent_docker compose install:

=====================================
OASE Agent on Docker Compose - Online
=====================================

目的
====

| 本書では、Exastro IT AutomationにおいてOASEを利用する際に、外部との連携に必要となる、Exastro OASE Agentを導入する手順について説明します。

特徴
====

| OASEを利用するための絶対条件である、Exastro OASE Agentの導入方法となります。
| Docker Compose を利用することで、Exastro OASE Agentを簡単に起動することが可能です。
| Exastro OASE Agentの設定や運用については、:ref:`エージェント概要<agent_about>` をご参照ください。

前提条件
========

- Exastro IT Automationについて

  | Exastro OASE Agentの運用には、Exastro OASE AgentとExastro IT Automationのバージョンが一致している必要があります。

- デプロイ環境

  | 動作確認が取れているコンテナ環境の最小要求リソースとバージョンは下記のとおりです。

  .. list-table:: ハードウェア要件(最小構成)
   :widths: 1, 1
   :header-rows: 1

   * - リソース種別
     - 要求リソース
   * - CPU
     - 2 Cores (3.0 GHz, x86_64)
   * - Memory
     - 4GB
   * - Storage (Container image size)
     - 10GB

- 動作確認済みオペレーティングシステム

  以下は、動作確認済のバージョンとなります。

  .. list-table:: オペレーティングシステム
   :widths: 20, 20
   :header-rows: 1

   * - 種別
     - バージョン
   * - Red Hat Enterprise Linux
     - バージョン	8
   * - AlmaLinux
     - バージョン	8
   * - Ubuntu
     - バージョン	22.04

- 動作確認済みコンテナプラットフォーム

  手動でインストールする際には、下記のコンテナプラットフォームを準備してください。
  以下は、動作確認済のバージョンとなります。

  .. list-table:: コンテナプラットフォーム
   :widths: 20, 10
   :header-rows: 1

   * - ソフトウェア
     - バージョン
   * - Podman Engine ※Podman 利用時
     - バージョン	4.4
   * - Docker Compose ※Podman 利用時
     - バージョン	2.20
   * - Docker Engine ※Docker 利用時
     - バージョン	24


- アプリケーション

  | :command:`sudo` コマンドが実行できる必要があります。

.. warning::
   | Exastro OASE Agent のプロセスは一般ユーザ権限で起動する必要があります。(rootユーザーでのインストールはできません)
   | また、利用する一般ユーザは sudoer で、全操作権限を持っている必要があります。


.. include:: ../../../include/oase_agent_recommendations.rst

インストール
============

準備
----

| はじめに、各種構成ファイルを取得します。docker-compose.ymlなどの起動に必要なファイル群を取得します。

.. code-block:: shell

   git clone https://github.com/exastro-suite/exastro-docker-compose.git

| 以降は、exastro-docker-compose/ita_ag_oaseディレクトリで作業をします。

.. code-block:: shell

   cd exastro-docker-compose/ita_ag_oase

| 環境変数の設定ファイル（.env）を、サンプルから作成します。

.. code-block:: shell
   :caption: （Docker利用時）サンプルからコピー

   cp .env.docker.sample .env

.. code-block:: shell
   :caption: （Podman利用時）サンプルからコピー

   cp .env.podman.sample .env

| 末尾のパラメータ一覧を参考に、起動に必要な情報を .env に登録します。

.. code-block:: shell

   vi .env

起動
----

| docker もしくは docker-compose コマンドを使いコンテナを起動します。

.. code-block:: shell
   :caption: docker コマンドを利用する場合(Docker環境)

   docker compose up -d --wait

.. code-block:: shell
   :caption: docker-compose コマンドを利用する場合(Podman環境)

   docker-compose up -d --wait

パラメータ一覧
==============

| Exastro OASE Agentの仕様と一部のパラメータの関連については、:ref:`oase_agent_flow` にて説明しています。

.. list-table::
 :widths: 5, 7, 1, 5
 :header-rows: 1

 * - パラメータ
   - 説明
   - 変更
   - デフォルト値・選択可能な設定値
 * - NETWORK_ID
   - OASE エージェント で利用する Docker ネットワークのID
   - 可
   - 20230101
 * - LOGGING_MAX_SIZE
   - コンテナ毎のログファイルの1ファイルあたりのファイルサイズ
   - 可
   - 10m
 * - LOGGING_MAX_FILE
   - コンテナ毎のログファイルの世代数
   - 可
   - 10
 * - TZ
   - OASE エージェント システムで使用するタイムゾーン
   - 可
   - Asia/Tokyo
 * - DEFAULT_LANGUAGE
   - OASE エージェント システムで使用する規定の言語
   - 可
   - ja
 * - LANGUAGE
   - OASE エージェント システムで使用する言語
   - 可
   - en
 * - ITA_VERSION
   - OASE エージェント のバージョン
   - 可
   - 2.3.0
 * - UID
   - OASE エージェント の実行ユーザ
   - 不要
   - 1000 (デフォルト): Docker 利用の場合

     0: Podman 利用の場合
 * - HOST_DOCKER_GID
   - ホスト上の Docker のグループID
   - 不要
   - 999: Docker 利用の場合

     0: Podman 利用の場合
 * - AGENT_NAME
   - 起動する OASEエージェントの名前
   - 可
   - ita-oase-agent-01
 * - EXASTRO_URL
   - Exastro IT Automation の Service URL
   - 可
   - http://localhost:30080
 * - EXASTRO_ORGANIZATION_ID
   - Exastro IT Automation で作成した OrganizationID
   - 必須
   - 無し
 * - EXASTRO_WORKSPACE_ID
   - Exastro IT Automation で作成した WorkspaceID
   - 必須
   - 無し
 * - EXASTRO_REFRESH_TOKEN
   - | Exastro システム管理画面から取得したリフレッシュトークン※
     | ※ユーザーのロールが、OASE - イベント - イベント履歴メニューをメンテナンス可能である必要があります。
   - 可
   - 無し
 * - EXASTRO_USERNAME
   - | Exastro IT Automation で作成した ユーザー名
     | ※ユーザーのロールが、OASE - イベント - イベント履歴メニューをメンテナンス可能である必要があります。
     | ※EXASTRO_REFRESH_TOKENを使わない場合（非推奨）
   - 可
   - admin
 * - EXASTRO_PASSWORD
   - | Exastro IT Automation で作成した パスワード
     | ※EXASTRO_REFRESH_TOKENを使わない場合（非推奨）
   - 可
   - Ch@ngeMe
 * - EVENT_COLLECTION_SETTINGS_NAMES
   - Exastro IT Automation のOASE管理 イベント収集 で作成した イベント収集設定名
   - 必須
   - 無し※カンマ区切りで複数指定可能
 * - ITERATION
   - OASE エージェント が設定を初期化するまでの、処理の繰り返し数
   - 可
   - 10（上限値: 120、下限値: 10）
 * - EXECUTE_INTERVAL
   - OASE エージェント のデータ収集処理の実行間隔
   - 可
   - 5（下限値: 3）
 * - LOG_LEVEL
   - OASE エージェント のログレベル
   - 可
   - INFO

| ※リフレッシュトークンの取得に関しては :ref:`exastro_refresh_token` を参照してください。

アップグレード
==============

| Exastro OASE Agentのアップグレード方法について紹介します。


アップグレードの準備
--------------------

.. warning::
  | アップグレード実施前に、バックアップを取得しておくことを推奨します。
  | バックアップ対象は :file:`~/exastro-docker-compose/ita_ag_oase/.volumes/` です。

リポジトリの更新
^^^^^^^^^^^^^^^^

| exastro-docker-composeリポジトリを更新します。

.. code-block:: shell
   :linenos:
   :caption: コマンド

   # exastro-docker-composeリポジトリの確認
   cd ~/exastro-docker-compose/ita_ag_oase
   git pull

デフォルト設定値の更新の確認
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| デフォルト値の更新を確認します。
| インストール時に作成した設定ファイル :file:`~/exastro-docker-compose/.env` とアップグレード後の設定ファイルを比較します。

.. code-block:: shell
   :caption: コマンド

   cd ~/exastro-docker-compose/ita_ag_oase

   # OSがAlmaLinuxまたはUbuntuの場合
   diff .env .env.docker.sample
   # OSがRed Hat Enterprise Linuxの場合
   diff .env .env.podman.sample

設定値の更新
^^^^^^^^^^^^

| デフォルト設定値の比較結果から、項目の追加などにより設定値の追加が必要な場合は更新をしてください。
| 設定値の更新が不要であればこの手順はスキップしてください。

アップグレード
--------------

アップグレード実施
^^^^^^^^^^^^^^^^^^

| アップグレードを実施します。

.. code-block:: shell
   :caption: コマンド

   cd ~/exastro-docker-compose/ita_ag_oase

.. code-block:: shell
   :caption: docker コマンドを利用する場合(Docker環境)

   docker compose up -d --wait

.. code-block:: shell
   :caption: docker-compose コマンドを利用する場合(Podman環境)

   docker-compose up -d --wait


アンインストール
================

| Exastro OASE Agentのアンインストール方法について紹介します。

アンインストールの準備
----------------------

.. warning::
  | アンインストール実施前に、バックアップを取得しておくことを推奨します。
  | バックアップ対象は :file:`~/exastro-docker-compose/ita_ag_oase/.volumes/` です。

アンインストール
----------------

アンインストール実施
^^^^^^^^^^^^^^^^^^^^

| アンインストールを実施します。


.. code-block:: shell
   :caption: コマンド

   cd ~/exastro-docker-compose/ita_ag_oase

.. code-block:: shell
   :caption: docker コマンドを利用する場合(Docker環境)

   # コンテナのみ削除する場合
   docker compose down

   # コンテナ＋コンテナイメージ＋ボリュームを削除する場合
   docker compose down --rmi all --volumes

.. code-block:: shell
   :caption: docker-compose コマンドを利用する場合(Podman環境)

   # コンテナのみ削除する場合
   docker-compose down

   # コンテナ＋コンテナイメージ＋ボリュームを削除する場合
   docker-compose down --rmi all --volumes

.. code-block:: bash
   :caption: コマンド

   # データを削除する場合
   rm -rf ~/exastro-docker-compose/ita_ag_oase/.volumes/storage/*

