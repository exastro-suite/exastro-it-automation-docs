============
ジョブフロー
============

| 本シナリオでは、:doc:`前のシナリオ <Legacy_scenario2>` で構築したデータベース用のサーバを Web サーバに作り直す作業を題材にして、複数のジョブを一連の流れで実行するための方法について学習します。
| 具体的には、

1. :doc:`Legacy_scenario1` で作成したホスト名変更作業により db01 から web01 にホスト名を変更
2. :doc:`Legacy_scenario2` で作成したパッケージのインストールを使って DB 用のパッケージをアンインストール後に、Web サーバ用のパッケージをインストール

| を実施します。

.. tip:: 本シナリオに入る前に、  :doc:`Legacy_scenario1` と :doc:`Legacy_scenario2` を完了させておく必要があります。


パラメータ設計
==============

| 本シナリオでは、 :doc:`Legacy_scenario1` と :doc:`Legacy_scenario2` で作成したパラメータシート(データシート)を使って、パラメーターの投入を行うため、パラメータシートを新たに作成する必要はありません。


作業手順の登録
==============

| 本シナリオでは、 :doc:`Legacy_scenario1` と :doc:`Legacy_scenario2` で作成した下記の Movement を使うため、新たに Movement を作成する必要はありません。

- ホスト名設定
- パッケージ管理

| しかし、これまでは Movement を単体で実行していましたが、これらを逐次実行するにはどうすればよいでしょうか。


ジョブフローの作成
------------------

| 複数の Movement を一連の作業として実行する方法に、Conductor という仕組みがあります。
| Conductor を利用することで、複数の Movement をまとめて実行できるだけでなく、Movement の実行結果に応じて、後続処理を分岐させたり、ユーザ確認の為に一時停止するといった複雑なロジックを組み込む事が可能です。

| :menuselection:`Conductor --> Conductor編集/作業実行` から、ジョブフローを定義します。

.. figure:: /images/learn/quickstart/Legacy_scenario3/ジョブフローの作成.gif
   :width: 1200px
   :alt: ジョブフローの作成

| 1. 右上のペイン :menuselection:`Conductor情報 --> 名称`  に、 :kbd:`サーバー構築` と入力します。
| 2. 右下のペインに、 :doc:`Legacy_scenario1` と :doc:`Legacy_scenario2` で作成した :kbd:`ホスト名設定` と :kbd:`パッケージ管理` の2つの Movement があります。これらを画面中央にドラッグアンドドロップします。
| 3. 各 Node 間を下記の様に接続します。

.. list-table:: Node 間の接続
   :widths: 10 10
   :header-rows: 1

   * - OUT
     - IN
   * - :kbd:`Start`
     - :kbd:`ホスト名設定`
   * - :kbd:`ホスト名設定`
     - :kbd:`パッケージ管理`
   * - :kbd:`パッケージ管理`
     - :kbd:`End`

| 4. 画面上部にある、 :guilabel:` 登録` を押下します。


作業対象の登録
==============

| 作業実施を行う対象機器の登録情報を更新します。

機器情報の更新
--------------

| 作業対象となるサーバーは :doc:`前のシナリオ <Legacy_scenario2>` で登録した db01 を利用しますが、今回は DB サーバーを Web サーバーに作り直すため、ホスト名を更新しておきます。
| 作業対象となるサーバー db01 のホスト名を web01 に変更します。

| :menuselection:`Ansible共通 --> 機器一覧` から、作業対象である db01 のホスト名を web01 に更新します。

.. figure:: /images/learn/quickstart/Legacy_scenario3/機器情報の更新.gif
   :width: 1200px
   :alt: 機器情報の更新

.. list-table:: 機器一覧の設定値
   :widths: 10 10 15 10 10 10
   :header-rows: 3

   * - HW機器種別
     - ホスト名
     - IPアドレス
     - ログインパスワード
     - ssh鍵認証情報
     - Ansible利用情報
   * -
     -
     -
     - ユーザ
     - ssh秘密鍵ファイル
     - Legacy/Role利用情報
   * -
     -
     -
     -
     -
     - 認証方式
   * - :kbd:`SV`
     - :kbd:`web01`
     - :kbd:`192.168.0.1 ※適切なIPアドレスを設定`
     - :kbd:`接続ユーザ名`
     - :kbd:`(秘密鍵ファイル)`
     - :kbd:`鍵認証(パスフレーズなし)`


サーバー再構築作業の実施
========================

作業概要の作成
--------------

| :doc:`前のシナリオ <Legacy_scenario2>` と同様に、まずは作業計画を立てましょう。

.. list-table:: 作業の方針
   :widths: 5 10
   :header-rows: 0

   * - 作業実施日時
     - 2024/04/03 12:00:00
   * - 作業対象
     - db01(RHEL8)
   * - 作業内容
     - Webサーバーへの作り直し

作業概要登録
------------

| :menuselection:`基本コンソール --> オペレーション一覧` から、作業実施日時や作業名を登録します。

.. figure:: /images/learn/quickstart/Legacy_scenario3/オペレーション登録.png
   :width: 1200px
   :alt: オペレーション登録

.. list-table:: オペレーション登録内容
   :widths: 15 10
   :header-rows: 1

   * - オペレーション名
     - 実施予定日時
   * - :kbd:`Webサーバーへの再構築`
     - :kbd:`2024/04/03 12:00:00`

パラメータ設定
--------------

| 本シナリオでは、db01 というホストに対して、 :kbd:`httpd` というパッケージをインストールしますが、前のシナリオで :kbd:`mariadb-server` というパッケージがインストール済みの状態となっています。
| db01 というホストを web01 という Web サーバーに作り変えるため、ホスト名と導入パッケージを変更する必要があります。

.. list-table:: サーバー再構築作業による変更内容
   :widths: 10 15 15
   :header-rows: 1

   * - 項目
     - 変更前
     - 変更後
   * - ホスト名
     - :kbd:`db01`
     - :kbd:`web01`
   * - :kbd:`mariadb-server` パッケージ
     - インストール済み
     - アンインストール済み
   * - :kbd:`httpd` パッケージ
     - 未インストール
     - インストール済み

| :menuselection:`入力用 --> サーバー基本情報` から、ホスト名に関するパラメータを登録します。

.. figure:: /images/learn/quickstart/Legacy_scenario3/サーバ基本情報登録.png
   :width: 1200px
   :alt: サーバ基本情報登録

.. list-table:: サーバー基本情報パラメータの設定値
  :widths: 5 20 10
  :header-rows: 2

  * - ホスト名
    - オペレーション
    - パラメータ
  * -
    - オペレーション名
    - ホスト名
  * - :kbd:`web01`
    - :kbd:`2024/04/03 12:00:00_Webサーバーへの再構築`
    - :kbd:`"{{ __inventory_hostname__ }}"`

| :menuselection:`入力用 --> 導入パッケージ` から、パッケージに関するパラメータを登録します。

.. figure:: /images/learn/quickstart/Legacy_scenario3/導入パッケージ登録.png
   :width: 1200px
   :alt: 導入パッケージ登録

.. list-table:: 導入パッケージパラメータの設定値
  :widths: 5 20 5 10 5
  :header-rows: 2

  * - ホスト名
    - オペレーション
    - 代入順序
    - パラメータ
    -
  * -
    - オペレーション名
    -
    - パッケージ名
    - 状態
  * - web01
    - :kbd:`2024/04/03 12:00:00_Webサーバーへの再構築`
    - :kbd:`1`
    - :kbd:`mariadb-server`
    - :kbd:`absent`
  * - web01
    - :kbd:`2024/04/03 12:00:00_Webサーバーへの再構築`
    - :kbd:`2`
    - :kbd:`httpd`
    - :kbd:`present`

作業実行
--------

1. 事前確認

   | 現在のサーバーの状態を確認しましょう。

   | ホスト名を確認します。

   .. code-block:: bash
      :caption: コマンド

      # ホスト名の取得
      hostnamectl status --static

   .. code-block:: bash
      :caption: 実行結果

      db01

   | サーバに SSH ログインし、パッケージのインストール状態を確認します。

   .. code-block:: bash
      :caption: コマンド

      rpm -q mariadb-server

   .. code-block:: bash
      :caption: 実行結果

      # 環境ごとにバージョンは異なります
      mariadb-server-10.3.35-1.module+el8.6.0+15949+4ba4ec26.x86_64

   .. code-block:: bash
      :caption: コマンド

      rpm -q httpd

   .. code-block:: bash
      :caption: 実行結果

      package httpd is not installed

2. 作業実行

   | :menuselection:`Conductor --> Conductor編集/作業実行` から、:guilabel:` 選択` を押下します。
   | :kbd:`サーバー構築` Conductor を選択し、:guilabel:`選択決定` を押下します。
   | 次に、画面上部の :guilabel:` 作業実行` で、オペレーションに :kbd:`Webサーバーへの再構築` を選択し、:guilabel:`作業実行` を押下します。

   | :menuselection:`Conductor作業確認` 画面が開き、実行が完了した後に、全ての Movement のステータスが「Done」になったことを確認します。

   .. figure:: /images/learn/quickstart/Legacy_scenario3/作業実行.png
      :width: 1200px
      :alt: Conductor作業実行

3. 事後確認

   | 再度サーバに SSH ログインし、Web サーバーに作り直しされていることを確認します。

   | ホスト名を確認します。

   .. code-block:: bash
      :caption: コマンド

      # ホスト名の取得
      hostnamectl status --static

   .. code-block:: bash
      :caption: 実行結果

      web01

   | サーバに SSH ログインし、パッケージのインストール状態を確認します。

   .. code-block:: bash
      :caption: コマンド

      rpm -q mariadb-server

   .. code-block:: bash
      :caption: 実行結果

      # 環境ごとにバージョンは異なります
      is not installed

   .. code-block:: bash
      :caption: コマンド

      rpm -q httpd

   .. code-block:: bash
      :caption: 実行結果

      httpd-2.4.37-51.module+el8.7.0+18026+7b169787.1.x86_64


まとめ
======

| 本シナリオでは、DB サーバーを Web サーバーに再構築するシナリオを通して、Exastro IT Automation のジョブフローである Conductor の運用方法について紹介をしました。

- Conductor を利用することで、複数の Movement をまとめて実行することが可能です。
- Conductor は様々な制御機能を持っています。

| :doc:`次のシナリオ <Legacy_practice1>` では、これまで扱ってきた各機能の確認をします。
