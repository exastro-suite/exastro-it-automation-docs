============
ホスト名管理
============

| 本シナリオでは、簡単な例として、ホスト名の設定を題材に Exastro IT Automation の基本操作を学習します。


作業概要の作成
==============

| 具体的なパラメータの設定や作業手順を考える前に、作業計画を立てるところから初めます。
| まずは、いつ、どこの機器に対して、何を、どうするかといった情報を簡単に整理しておきましょう。

.. list-table:: 作業の方針
   :widths: 15 10
   :header-rows: 0

   * - 作業実施日時
     - 2023/04/01 12:00:00
   * - 作業対象
     - server01(RHEL8)
   * - 作業内容
     - ホスト名の変更

作業概要登録
------------

| オペレーション登録では、作業を実施する際の作業概要を定義します。
| 先に決めた作業の方針を元にオペレーション情報を記入しましょう。


| :menuselection:`基本コンソール --> オペレーション一覧` から、作業実施日時や作業名を登録します。

.. figure:: /images/learn/quickstart/scenario1/オペレーション登録.gif
   :width: 1200px
   :alt: オペレーション登録

.. list-table:: オペレーション登録内容
   :widths: 15 10
   :header-rows: 1

   * - オペレーション名
     - 実施予定日時
   * - :kbd:`RHEL8のホスト名変更作業`
     - :kbd:`2023/04/01 12:00:00`

.. tip::
   | 作業実施日時は、本シナリオでは適当な日時で問題ありませんが、作業日が定まっている場合は、正確な作業実施の予定日時を設定することを推奨します。
   | 定期作業などの繰り返し行われる作業のように、作業日が定まっていない場合は現在の日時を登録しても問題ありません。


パラメータ設計
==============

| システムの構成情報のフォーマットを設計します。

| システムにある全ての情報をパラメータとして管理する必要はなく、今後管理が必要になったタイミングで適宜追加や見直しをしましょう。

.. _quickstart_server_information_parmeter:

パラメータシートの作成
----------------------

| :menuselection:`パラメータシート作成` では、作業時に利用する設定値(パラメータ)を登録するためのパラメータシートを管理します。


| ホスト名を管理するためのパラメータシートを作成します。
| :menuselection:`パラメータシート作成 --> パラメータシート定義・作成` から、ホスト名を管理するために、「サーバー基本情報」というパラメータシートを作成します。

.. figure:: /images/learn/quickstart/scenario1/パラメータシート作成.png
   :width: 1200px
   :alt: パラメータシート作成

.. list-table:: パラメータシート作成(サーバー基本情報)の項目の設定値
   :widths: 10 10
   :header-rows: 1

   * - 設定項目
     - 項目1設定値
   * - 項目の名前
     - :kbd:`ホスト名`
   * - 項目の名前(Rest API用) 
     - :kbd:`hostname`
   * - 入力方式
     - :kbd:`文字列(単一行)`
   * - 最大バイト数
     - :kbd:`64`
   * - 正規表現
     - 
   * - 初期値
     - 
   * - 必須
     - ✓
   * - 一意制約
     - 
   * - 説明
     - 
   * - 備考
     - 

.. list-table:: パラメータシート作成(サーバー基本情報)のパラメータシート作成情報の設定値
   :widths: 5 10
   :header-rows: 1

   * - 設定項目
     - 設定値
   * - 項番
     - (自動入力)
   * - メニュー名
     - :kbd:`サーバー基本情報`
   * - メニュー名(REST)
     - :kbd:`server_information`
   * - 作成対象
     - :kbd:`パラメータシート（ホスト/オペレーションあり）`
   * - 表示順序
     - :kbd:`1`
   * - バンドル利用
     - 「利用する」にチェックを入れない(無効)
   * - 最終更新日時
     - (自動入力)
   * - 最終更新者
     - (自動入力)


作業対象の登録
==============

| 作業を行う対象機器を登録します。

機器登録
--------

| 作業対象となるサーバー server01 を機器一覧に登録します。

| :menuselection:`Ansible共通 --> 機器一覧` から、作業対象である server01 の接続情報を登録します。

.. figure:: /images/learn/quickstart/scenario1/機器一覧登録.gif
   :width: 1200px
   :alt: 機器一覧登録

.. list-table:: 機器一覧の設定値
   :widths: 10 10 20 10 10 20
   :header-rows: 3

   * - HW機器種別
     - ホスト名
     - IPアドレス
     - ログインパスワード
     - 
     - Ansible利用情報
   * - 
     - 
     - 
     - ユーザ
     - パスワード
     - Legacy/Role利用情報
   * - 
     - 
     - 
     - 
     - 
     - 認証方式
   * - :kbd:`SV`
     - :kbd:`server01`
     - :kbd:`192.168.0.1` ※適切なIPアドレスを設定
     - :kbd:`root`
     - (パスワード)
     - :kbd:`パスワード認証`

作業手順の登録
==============

| 作業手順を登録するために、Exastro IT Automation で扱う作業単位である Movement (ジョブ)を定義します。
| 定義した Movement に対して、Ansible Role パッケージを紐付け、更に Ansible Role パッケージ内の変数と :ref:`quickstart_server_information_parmeter` で登録したパラメータシートの項目の紐付けを行います。


作業項目の設定
--------------

| Exastro IT Automation では、Movement という単位で作業を管理し、作業手順書における作業項目に該当します。
| Movement は、Ansible Playbook のような IaC (Infrastrucure as Code) を紐付けたり、IaC 内の変数とパラメータシートの設定値を紐付けの際に利用します。

| :menuselection:`Ansible-LegacyRole --> Movement一覧` から、ホスト名設定のための Movement を登録します。

.. figure:: /images/learn/quickstart/scenario1/Movement登録設定.png
   :width: 1200px
   :alt: Movement登録

.. list-table:: Movement 情報の設定値
   :widths: 10 10
   :header-rows: 2

   * - Movement名
     - Ansible利用情報
   * - 
     - ホスト指定形式
   * - :kbd:`ホスト名設定`
     - :kbd:`IP`

Ansible Role 登録
-----------------

| Ansible Role の登録を行います。Ansible Role は運用手順書内に記載されたコマンドに該当します。
| 手作業で Ansible Role を作成することも可能ですが、Ansible Legacy-Role モードは、作成済みの Ansible Role を利用することを想定しています。
| 本シナリオでは、 `Exastro Playbook Collection <https://github.com/exastro-suite/playbook-collection-docs/blob/master/ansible_role_packages/README.md>`_ を利用します。

| `ここをクリックして Ansible Role Package の OS-RHEL8 をダウンロードしてください。 <https://github.com/exastro-playbook-collection/OS-RHEL8/releases/download/v23.03/OS-RHEL8.zip>`_ 

| :menuselection:`Ansible-LegacyRole --> ロールパッケージ管理` から、ダウンロードした `OS-RHEL8.zip <https://github.com/exastro-playbook-collection/OS-RHEL8/releases/download/v23.03/OS-RHEL8.zip>`_ を登録します。

.. figure:: /images/learn/quickstart/scenario1/ロールパッケージ管理.gif
   :width: 1200px
   :alt: ロールパッケージ管理

.. list-table:: Ansible Role パッケージ情報の登録
  :widths: 10 20
  :header-rows: 1

  * - ロールパッケージ名
    - ロールパッケージファイル(ZIP形式)
  * - :kbd:`OS-RHEL8`
    - :file:`OS-RHEL8.zip`

Movement と Ansible Role の紐付け
---------------------------------

| :menuselection:`Ansible-LegacyRole --> Movement-ロール紐付` から、Movement と Ansible Role パッケージの紐付けを行います。
| 本シナリオでは、 `ホスト名管理用の Ansible Role パッケージ <https://github.com/exastro-playbook-collection/OS-RHEL8/tree/master/RH_hostname/OS_build>`_ を利用します。

.. figure:: /images/learn/quickstart/scenario1/Movement-ロール紐付け.png
   :width: 1200px
   :alt: Movement-ロール紐付け

.. list-table:: Movement-ロール紐付け情報の登録
  :widths: 10 30 10
  :header-rows: 1

  * - Movement名
    - ロールパッケージ名:ロール名
    - インクルード順序
  * - :kbd:`ホスト名設定`
    - :kbd:`OS-RHEL8:OS-RHEL8/RH_hostname/OS_build`
    - :kbd:`1`

パラメータシートの項目と Ansible Role の変数の紐付け
----------------------------------------------------

| OS-RHEL8 Ansible Role パッケージでは、:kbd:`VAR_RH_hostname` という変数にホスト名を代入することで、対象サーバーのホスト名を設定することができます。

| :menuselection:`Ansible-LegacyRole --> 代入値自動登録設定` から、サーバー基本情報パラメータシートのホスト名の項目に入るパラメータを、Ansible Role パッケージの :kbd:`VAR_RH_hostname` に代入する設定を行います。

.. figure:: /images/learn/quickstart/scenario1/代入値自動登録設定.gif
   :width: 1200px
   :alt: 代入値自動登録設定

.. list-table:: 代入値自動登録設定の設定値
  :widths: 40 10 20 20 30
  :header-rows: 2

  * - パラメータシート(From)
    - 登録方式
    - Movement名
    - IaC変数(To)
    -
  * - メニューグループ:メニュー:項目
    -
    -
    - Movement名:変数名
    - Movement名:変数名:メンバー変数
  * - :kbd:`代入値自動登録用:サーバー基本情報:ホスト名`
    - :kbd:`Value型`
    - :kbd:`ホスト名設定`
    - :kbd:`ホスト名設定:VAR_RH_hostname`
    - 


ホスト名変更作業実施(1回目)
===========================

| パラメータシートには、設定したい値を機器ごとにパラメータを登録します。
| 本シナリオでは、:kbd:`server01` というホスト名、RHEL8 サーバに設定します。

パラメータ設定
--------------

| :menuselection:`入力用 --> サーバー基本情報` から、ホストに対するパラメータを登録します。

.. figure:: /images/learn/quickstart/scenario1/パラメータ登録.gif
   :width: 1200px
   :alt: パラメータ登録

.. list-table:: サーバー基本情報パラメータの設定値
  :widths: 5 20 5
  :header-rows: 2

  * - ホスト名
    - オペレーション
    - パラメータ
  * - 
    - オペレーション名
    - ホスト名
  * - server01
    - :kbd:`2023/04/01 12:00:00_RHEL8のホスト名変更作業`
    - :kbd:`server01`

作業実行
--------

1. 事前確認

   | まずは、現在のサーバーの状態を確認しましょう。
   | サーバに SSH ログインし、現在のホスト名を確認します。

   .. code-block:: bash
      :caption: コマンド

      # ホスト名の取得
      hostnamectl status --static

   .. code-block:: bash
      :caption: 実行結果

      # 結果は環境ごとに異なります
      localhost

2. 作業実行

   | :menuselection:`Ansible-LegacyRole --> 作業実行` から、:kbd:`ホスト名設定` Movement を選択し、:guilabel:` 作業実行` を押下します。
   | 次に、:menuselection:`作業実行設定` で、オペレーションに :kbd:`RHEL8のホスト名変更作業` を選択し :guilabel:`選択決定` を押下します。
   | 最後に、実行内容を確認し、:guilabel:`作業実行` を押下します。

   | :menuselection:`作業状態確認` 画面が開き、実行が完了した後に、ステータスが「完了」になったことを確認します。

.. figure:: /images/learn/quickstart/scenario1/作業実行.gif
   :width: 1200px
   :alt: 作業実行

3. 事後確認

   | 再度サーバに SSH ログインし、ホスト名が変更されていることを確認します。

   .. code-block:: bash
      :caption: コマンド

      # ホスト名の取得
      hostnamectl status --static

   .. code-block:: bash
      :caption: 実行結果

      server01


ホスト名変更作業実施(2回目)
===========================

| 本シナリオでは、:kbd:`server01` というホスト名をパラメータ値として設定しました。
| しかし、:menuselection:`機器一覧` でもホスト名を管理しており、ホスト名の管理が多重管理状態となっています。

| Exastro IT Automation では、機器の情報を :ref:`ansible_common_ita_original_variable` で取得することができ、ログイン先のホスト名は  :kbd:`__inventory_hostname__` という、変数を使うことで取得できるため、パラメータの一元管理が可能となります。

パラメータ設定
--------------

| :menuselection:`入力用 --> サーバー基本情報` から、ITA 独自変数を使って機器一覧に登録してあるホスト名を登録してみましょう。

.. figure:: /images/learn/quickstart/scenario1/パラメータ設定.png
   :width: 1200px
   :alt: パラメータ設定

.. list-table:: サーバー基本情報パラメータの設定値
  :widths: 5 10 5
  :header-rows: 2

  * - ホスト名
    - オペレーション
    - パラメータ
  * - 
    - オペレーション名
    - ホスト名
  * - :kbd:`server01`
    - :kbd:`2023/04/01 12:00:00_RHEL8のホスト名変更作業`
    - :kbd:`"{{ __inventory_hostname__ }}"`


機器情報の更新
--------------

| 作業対象となるサーバー server01 のホスト名を db01 に変更します。

| :menuselection:`Ansible共通 --> 機器一覧` から、作業対象である server01 のホスト名を db01 に更新します。

.. figure:: /images/learn/quickstart/scenario1/機器一覧変更.png
   :width: 1200px
   :alt: パラメータ登録

.. list-table:: 機器一覧の設定値
   :widths: 10 10 20 10 10 20
   :header-rows: 3

   * - HW機器種別
     - ホスト名
     - IPアドレス
     - ログインパスワード
     - 
     - Ansible利用情報
   * - 
     - 
     - 
     - ユーザ
     - パスワード
     - Legacy/Role利用情報
   * - 
     - 
     - 
     - 
     - 
     - 認証方式
   * - :kbd:`SV`
     - :kbd:`db01`
     - :kbd:`192.168.0.1` ※適切なIPアドレスを設定
     - :kbd:`root`
     - (パスワード)
     - :kbd:`パスワード認証`


作業実行
--------

1. 作業実行

   | :menuselection:`Ansible-LegacyRole --> 作業実行` から、:kbd:`ホスト名設定` Movement を選択し、:guilabel:` 作業実行` を押下します。
   | 次に、:menuselection:`作業実行設定` で、オペレーションに :kbd:`RHEL8のホスト名変更作業` を選択し :guilabel:`選択決定` を押下します。
   | 最後に、実行内容を確認し、:guilabel:`作業実行` を押下します。

   | :menuselection:`作業状態確認` 画面が開き、実行が完了した後に、ステータスが「完了」になったことを確認します。

.. figure:: /images/learn/quickstart/scenario1/作業実行.gif
   :width: 1200px
   :alt: 作業実行

2. 事後確認

   | 再度サーバに SSH ログインし、ホスト名が変更されていることを確認します。

   .. code-block:: bash
      :caption: コマンド

      # ホスト名の取得
      hostnamectl status --static

   .. code-block:: bash
      :caption: 実行結果

      db01

| 以降は、 :menuselection:`Ansible共通 --> 機器一覧` から、ホスト名を変更し、作業実行をするだけでホスト名の更新を行うことが可能です。


まとめ
======

| 本シナリオでは、RHEL8 サーバに対してホスト名を設定するシナリオを通して、Exastro IT Automation の基本的な操作方法やコンセプトについて紹介をしました。
| :doc:`次のシナリオ <scenario2>` では、より実用的なパラメータシートの管理方法について紹介をします。