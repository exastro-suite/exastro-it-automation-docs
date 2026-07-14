==============
パッケージ管理
==============

| 本シナリオでは、パッケージのインストールやアンインストールといったパッケージ管理を通して、より実用的なパラメータシートの管理・運用のテクニックについて学習します。

.. tip:: 本シナリオに入る前に、 :doc:`前のシナリオ <scenario1>` を完了させておくことを推奨します。


パラメータ設計
==============

| 本シナリオで扱うパラメータシートの設定項目は、「パッケージ名」と「あるべきインストール状態」の2つの設定項目です。
| ここで検討すべきポイントは、

- 「あるべきインストール状態」である「インストールされている状態」か「インストールされていない状態」のいずれかの状態を管理する方法
- 不定数のパッケージを管理する方法

| の2点です。
| このポイントを中心に、パラメータシートの設計方法を見ていきましょう。

選択肢の作成
------------

| パラメータの登録時に手入力をすると、タイプミスなどにより作業ミスが発生する可能性が高くなります。
| パラメータの選択肢を作成することで、このようなパラメータの入力ミスを防止することができます。

| まずは、「あるべきインストール状態」である :kbd:`present` (インストールされている状態) と :kbd:`absent` (インストールされていない状態) の選択肢を作成します。
| 具体的には、データシートを作成し、その中に選択肢として表示するパラメータを投入します。

.. _quickstart_create_datasheet:

データシートの作成
^^^^^^^^^^^^^^^^^^

| データシートを作成します。

| :menuselection:`パラメータシート作成 --> パラメータシート定義・作成` から、データシートを登録します。

.. figure:: ../../../../images/learn/quickstart/scenario2/データシートの作成.gif
   :width: 1200px
   :alt: データシートの作成

.. list-table:: データシートの項目の設定値
   :widths: 10 10
   :header-rows: 1

   * - 設定項目
     - 項目1設定値
   * - 項目の名前
     - :kbd:`present-absent`
   * - 項目の名前(Rest API用)
     - :kbd:`present-absent`
   * - 入力方式
     - :kbd:`文字列(単一行)`
   * - 最大バイト数
     - :kbd:`16`
   * - 正規表現
     -
   * - 初期値
     -
   * - 必須
     - ✓
   * - 一意制約
     - ✓
   * - 説明
     -
   * - 備考
     -

.. list-table:: パラメータシート作成情報の設定値
   :widths: 5 10
   :header-rows: 1

   * - 項目名
     - 設定値
   * - 項番
     - (自動入力)
   * - メニュー名
     - :kbd:`状態`
   * - メニュー名(REST)
     - :kbd:`state`
   * - 作成対象
     - :kbd:`データシート`
   * - 表示順序
     - :kbd:`99999`
   * - 最終更新日時
     - (自動入力)
   * - 最終更新者
     - (自動入力)

選択肢を登録
^^^^^^^^^^^^

| パラメータリスト内に表示するパラメータを設定します。
| :menuselection:`入力用 --> 状態` から、パッケージのあるべきインストール状態を登録します。

.. figure:: ../../../../images/learn/quickstart/scenario2/選択肢を登録.gif
   :width: 1200px
   :alt: 選択肢を登録

.. list-table:: 状態の設定値
   :widths: 10 10
   :header-rows: 2

   * - パラメータ
     - 備考
   * - present-absent
     -
   * - :kbd:`present`
     - インストール
   * - :kbd:`absent`
     - アンインストール

パラメータシートの作成
----------------------

| サーバやネットワーク機器のパラメータを管理する際に、1つの設定項目に対して複数のパラメータが存在することがあります。
| 例えば、IP アドレスやユーザなどのように、一つの機器上に複数の値を管理する必要がある場合があります。
| こういったパラメータをテーブル形式で管理する場合、IPアドレスやユーザが増えるごとにテーブル内の項目を増やす必要があるため、パラメータシートのフォーマット修正が都度必要となり、管理が煩雑になってしまいます。

| そこで、本シナリオではバンドルというパラメータシートを使い、複数のパラメータを管理する方法を紹介します。

| :menuselection:`パラメータシート作成 --> パラメータシート定義・作成` から、パラメータシートを登録します。
| 項目1の :menuselection:`入力方式` を :kbd:`プルダウン選択` に設定することで、:ref:`quickstart_create_datasheet` で登録したデータシートを参照できるようになります。

.. figure:: ../../../../images/learn/quickstart/scenario2/パラメータ項目設定.gif
   :width: 1200px
   :alt: パラメータ項目設定

.. list-table:: パラメータ項目設定
   :widths: 10 10 10
   :header-rows: 1
   :class: filter-table

   * - 設定項目
     - 項目1設定値
     - 項目2設定値
   * - 項目の名前
     - :kbd:`パッケージ名`
     - :kbd:`状態`
   * - 項目の名前(Rest API用)
     - :kbd:`package_name`
     - :kbd:`state`
   * - 入力方式
     - :kbd:`文字列(単一行)`
     - :kbd:`プルダウン選択`
   * - 最大バイト数
     - :kbd:`64`
     - (項目なし)
   * - 正規表現
     -
     - (項目なし)
   * - 選択項目
     - (項目なし)
     - :kbd:`入力用:状態:present-absent`
   * - 参照項目
     - (項目なし)
     -

   * - 初期値
     -
     -
   * - 必須
     - ✓
     - ✓
   * - 一意制約
     -
     -
   * - 説明
     -
     -
   * - 備考
     -
     -

| パラメータシート作成情報で :menuselection:`バンドル利用` を「利用する」にチェックを入れることで、1つの設定項目に対して複数のパラメータを設定することが可能になります。

.. figure:: ../../../../images/learn/quickstart/scenario2/パラメータシートの作成情報設定.png
   :width: 1200px
   :alt: パラメータシート作成情報設定

.. list-table:: パラメータシート作成情報の設定値
   :widths: 5 10
   :header-rows: 1
   :class: filter-table

   * - 項目名
     - 設定値
   * - 項番
     - (自動入力)
   * - メニュー名
     - :kbd:`導入パッケージ`
   * - メニュー名(REST)
     - :kbd:`packages`
   * - 作成対象
     - :kbd:`パラメータシート（ホスト/オペレーションあり）`
   * - 表示順序
     - :kbd:`2`
   * - バンドル利用
     - 「利用する」にチェックを入れる(有効)
   * - 最終更新日時
     - (自動入力)
   * - 最終更新者
     - (自動入力)


作業手順の登録
==============

| 作業手順を登録するために、作業単位となるジョブ(Movement)を定義します。
| 定義した Movement に対して、Ansible Role パッケージを紐付け、更に Ansible Role パッケージ内の変数とパラメータシートの項目の紐付けを行います。

Movement 登録
-------------

| :menuselection:`Ansible-LegacyRole --> Movement一覧` から、ホスト名設定のための Movement を登録します。

.. figure:: ../../../../images/learn/quickstart/scenario2/Movement一覧登録1.png
   :width: 1200px
   :alt: Movement登録

.. list-table:: Movement 情報の設定値
   :widths: 10 10 10
   :header-rows: 2

   * - Movement名
     - Ansible利用情報
     -
   * -
     - ホスト指定形式
     - ヘッダーセクション
   * - :kbd:`パッケージ管理`
     - :kbd:`IP`
     - :kbd:`※ヘッダーセクションを参照`

.. code-block:: bash
   :caption: ヘッダーセクション

   - hosts: all
     remote_user: "{{ __loginuser__ }}"
     gather_facts: no
     become: yes

Ansible Role 登録
-----------------

| 利用するロールパッケージは :doc:`前のシナリオ <scenario1>` で登録した `Exastro Playbook Collection <https://github.com/exastro-suite/playbook-collection-docs/blob/master/ansible_role_packages/README.md>`_ を利用するため、作業は不要です。

Movement と Ansible Role の紐付け
---------------------------------

| :menuselection:`Ansible-LegacyRole --> Movement-ロール紐付` から、Movement と Ansible Role パッケージの紐付けを行います。
| 本シナリオでは、 `RPM管理用の Ansible Role パッケージ <https://github.com/exastro-playbook-collection/OS-RHEL8/tree/master/RH_rpm/OS_build>`_ を利用します。

.. figure:: ../../../../images/learn/quickstart/scenario2/MovementとRole紐づけ.png
   :width: 1200px
   :alt: MovementとRole紐づけ

.. list-table:: Movement-ロール紐付け情報の登録
  :widths: 10 30 10
  :header-rows: 1

  * - Movement名
    - ロールパッケージ名:ロール名
    - インクルード順序
  * - :kbd:`パッケージ管理`
    - :kbd:`OS-RHEL8:OS-RHEL8/RH_rpm/OS_build`
    - :kbd:`1`

変数ネスト管理
--------------

| ホスト名の場合、1台のサーバーに命名できるホスト名は1つだけなので、 VAR_RH_hostname は単純な変数として扱うように定義されています。

.. code-block:: yaml
   :caption: VAR_RH_hostname の変数構造

   # VAR_RH_hostname に対する、値は1つのみ
   VAR_RH_hostname: myhostname

| 一方で、パッケージの場合は、1台のサーバー上に複数のパッケージを管理することは一般的なため、VAR_RH_rpm は複数の変数のセットを配列で管理する多段変数として扱うように定義されています。

.. code-block:: yaml
   :caption: VAR_RH_rpm の変数構造(=多段変数)

   # VAR_RH_rpm に対して、変数のセット(action と pkg_name)が繰り返し、かつ、セット数が不定
   VAR_RH_rpm:
   - action: absent
     pkg_name: httpd
   - action: present
     pkg_name: vsftpd
   ...

| VAR_RH_rpm のような多段変数の場合、その上限数を予め決めておく必要があります。
| 本シナリオでは、管理するパッケージ数を 10 として、設定しておくこととします。

| :menuselection:`Ansible-LegacyRole --> 変数ネスト管理` から、管理するパッケージ数の上限値の設定を行います。

.. figure:: ../../../../images/learn/quickstart/scenario2/変数ネスト管理.gif
   :width: 1200px
   :alt: 変数ネスト管理

.. list-table:: 変数ネスト情報の登録
   :widths: 10 10 20 10
   :header-rows: 1

   * - Movement名
     - 変数名
     - メンバー変数名(繰返し有)
     - 最大繰返数
   * - パッケージ管理
     - VAR_RH_rpm
     - 0
     - :kbd:`10`

代入値自動登録設定
------------------

| OS-RHEL8 Ansible Role パッケージでは、:kbd:`VAR_RH_rpm` という変数に管理するパッケージ名と状態を代入することで、対象サーバーのホスト名を設定することができます。

| :menuselection:`Ansible-LegacyRole --> 代入値自動登録設定` から、導入パッケージパラメータシートのパッケージ名と状態の項目に入るパラメータを Ansible Role パッケージの :kbd:`VAR_RH_rpm` 内の変数の紐付けを行います。

.. figure:: ../../../../images/learn/quickstart/scenario2/代入値自動登録設定.png
   :width: 1200px
   :alt: 代入値自動登録設定

.. list-table:: 代入値自動登録設定の設定値
  :widths: 40 10 10 20 20 30
  :header-rows: 2

  * - パラメータシート(From)
    -
    - 登録方式
    - Movement名
    - IaC変数(To)
    -
  * - メニューグループ:メニュー:項目
    - 代入順序
    -
    -
    - Movement名:変数名
    - Movement名:変数名:メンバー変数
  * - :kbd:`代入値自動登録用:導入パッケージ:パッケージ名`
    - :kbd:`1`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[0].pkg_name`
  * - :kbd:`代入値自動登録用:導入パッケージ:状態`
    - :kbd:`1`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[0].action`
  * - :kbd:`代入値自動登録用:導入パッケージ:パッケージ名`
    - :kbd:`2`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[1].pkg_name`
  * - :kbd:`代入値自動登録用:導入パッケージ:状態`
    - :kbd:`2`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[1].action`
  * - :kbd:`代入値自動登録用:導入パッケージ:パッケージ名`
    - :kbd:`3`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[2].pkg_name`
  * - :kbd:`代入値自動登録用:導入パッケージ:状態`
    - :kbd:`3`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[2].action`
  * - :kbd:`代入値自動登録用:導入パッケージ:パッケージ名`
    - :kbd:`4`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[3].pkg_name`
  * - :kbd:`代入値自動登録用:導入パッケージ:状態`
    - :kbd:`4`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[3].action`
  * - :kbd:`代入値自動登録用:導入パッケージ:パッケージ名`
    - :kbd:`5`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[4].pkg_name`
  * - :kbd:`代入値自動登録用:導入パッケージ:状態`
    - :kbd:`5`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[4].action`
  * - :kbd:`代入値自動登録用:導入パッケージ:パッケージ名`
    - :kbd:`6`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[5].pkg_name`
  * - :kbd:`代入値自動登録用:導入パッケージ:状態`
    - :kbd:`6`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[5].action`
  * - :kbd:`代入値自動登録用:導入パッケージ:パッケージ名`
    - :kbd:`7`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[6].pkg_name`
  * - :kbd:`代入値自動登録用:導入パッケージ:状態`
    - :kbd:`7`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[6].action`
  * - :kbd:`代入値自動登録用:導入パッケージ:パッケージ名`
    - :kbd:`8`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[7].pkg_name`
  * - :kbd:`代入値自動登録用:導入パッケージ:状態`
    - :kbd:`8`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[7].action`
  * - :kbd:`代入値自動登録用:導入パッケージ:パッケージ名`
    - :kbd:`9`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[8].pkg_name`
  * - :kbd:`代入値自動登録用:導入パッケージ:状態`
    - :kbd:`9`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[8].action`
  * - :kbd:`代入値自動登録用:導入パッケージ:パッケージ名`
    - :kbd:`10`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[9].pkg_name`
  * - :kbd:`代入値自動登録用:導入パッケージ:状態`
    - :kbd:`10`
    - :kbd:`Value型`
    - :kbd:`パッケージ管理`
    - :kbd:`パッケージ管理:VAR_RH_rpm`
    - :kbd:`パッケージ管理:VAR_RH_rpm:[9].action`

| これだけの項目の設定に設定値を入力するのは、 Web 画面の操作ではかなり苦労することでしょう。
| このような大量のデータを一度に登録するような場合は、全件ダウンロード・ファイル一括登録を使って、ファイルからデータを投入する方法が適切です。
| :menuselection:`Ansible-Legacy --> 代入値自動登録設定 --> 全件ダウンロード・ファイル一括登録` から、新規登録用ファイルをダウンロードします。ダウンロードしたファイルを編集し、ファイル一括登録にてファイルを登録すると代入値自動登録設定が簡単に行うことが出来ます。

.. figure:: ../../../../images/learn/quickstart/scenario2/代入値自動登録設定_一括登録.gif
   :width: 1200px
   :alt: 代入値自動登録設定(一括登録)

作業対象の登録
==============

| 作業実施を行う対象機器の登録を行います。

機器登録
--------

| 作業対象となるサーバーは :doc:`前のシナリオ <scenario1>` で登録した db01 を利用するため、作業は不要です。


パッケージのインストール実施(1回目)
===================================

作業概要の作成(1回目)
---------------------

| :doc:`前のシナリオ <scenario1>` と同様に、まずは作業計画を立てましょう。

.. list-table:: 作業の方針
   :widths: 15 10
   :header-rows: 0

   * - 作業実施日時
     - 2023/04/02 12:00:00
   * - 作業対象
     - db01(RHEL8)
   * - 作業内容
     - パッケージのインストール・アンインストール

作業概要登録(1回目)
-------------------

| :menuselection:`基本コンソール --> オペレーション一覧` から、作業実施日時や作業名を登録します。

.. figure:: ../../../../images/learn/quickstart/scenario2/オペレーション登録.png
   :width: 1200px
   :alt: オペレーション登録

.. list-table:: オペレーション登録内容
   :widths: 15 10
   :header-rows: 1

   * - オペレーション名
     - 実施予定日時
   * - :kbd:`RHEL8のパッケージ管理`
     - :kbd:`2023/04/02 12:00:00`


パラメータ設定(1回目)
---------------------

| パラメータシートには、設定したい値を機器ごとに登録します。
| 本シナリオでは、db01 というホストに対して、 :kbd:`postgresql-server` というパッケージをインストールし DB サーバーを構築します。

| :menuselection:`入力用 --> 導入パッケージ` から、ホストに対するパラメータを登録します。

.. figure:: ../../../../images/learn/quickstart/scenario2/パラメータ設定.gif
   :width: 1200px
   :alt: パラメータ設定

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
  * - db01
    - :kbd:`2023/04/02 12:00:00_RHEL8のパッケージ管理`
    - :kbd:`1`
    - :kbd:`postgresql-server`
    - :kbd:`present`

作業実行(1回目)
---------------

1. 事前確認

   | まずは、現在のサーバーの状態を確認しましょう。
   | サーバに SSH ログインし、 postgresql-server のインストール状況を確認します。

   .. code-block:: bash
      :caption: コマンド

      rpm -q postgresql-server

   .. code-block:: bash
      :caption: 実行結果

      package postgresql-server is not installed

2. 作業実行

   | :menuselection:`Ansible-LegacyRole --> 作業実行` から、:kbd:`パッケージ管理` Movement を選択し、:guilabel:` 作業実行` を押下します。
   | 次に、:menuselection:`作業実行設定` で、オペレーションに :kbd:`RHEL8のパッケージ管理` を選択し、:guilabel:`作業実行` を押下します。

   | :menuselection:`作業状態確認` 画面が開き、実行が完了した後に、ステータスが「完了」になったことを確認します。

   .. figure:: ../../../../images/learn/quickstart/scenario2/作業実行.gif
      :width: 1200px
      :alt: 作業実行

3. 事後確認

   | 再度サーバに SSH ログインし、postgresql-server のインストール状況を確認し postgresql-server がインストールされていることを確認します。

   .. code-block:: bash
      :caption: コマンド

      rpm -q postgresql-server

   .. code-block:: bash
      :caption: 実行結果

      # 環境ごとにバージョンは異なります
      postgresql-server-10.23-1.module+el8.7.0+17280+3a452e1f.x86_64


パッケージのインストール実施(2回目)
===================================

作業概要の作成(2回目)
---------------------

| :doc:`前のシナリオ <scenario1>` と同様に、まずは作業計画を立てましょう。

.. list-table:: 作業の方針
   :widths: 15 10
   :header-rows: 0

   * - 作業実施日時
     - 2024/05/02 12:00:00
   * - 作業対象
     - db01(RHEL8)
   * - 作業内容
     - DBパッケージへ変更

作業概要登録(2回目)
-------------------

| :menuselection:`基本コンソール --> オペレーション一覧` から、作業実施日時や作業名を登録します。

.. figure:: ../../../../images/learn/quickstart/scenario2/変更用オペレーション登録.png
   :width: 1200px
   :alt: オペレーション登録

.. list-table:: オペレーション登録内容
   :widths: 15 10
   :header-rows: 1

   * - オペレーション名
     - 実施予定日時
   * - :kbd:`RHEL8をDBパッケージへ変更`
     - :kbd:`2024/05/02 12:00:00`


パラメータ設定(2回目)
---------------------

| 本シナリオでは、db01 というホストに対して、 :kbd:`postgresql-server` というパッケージをインストールし DB サーバーを構築しました。
| しかし、その後、postgresql-server ではなく mariadb-server に変更する必要が出てきました。

| :menuselection:`入力用 --> 導入パッケージ` から、新たなパラメータを登録します。

.. figure:: ../../../../images/learn/quickstart/scenario2/更新用パラメータ設定.png
   :width: 1200px
   :alt: パラメータ設定2

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
  * - db01
    - :kbd:`2024/05/02 12:00:00_RHEL8をDBパッケージへ変更`
    - :kbd:`1`
    - :kbd:`postgresql-server`
    - :kbd:`absent`
  * - db01
    - :kbd:`2024/05/02 12:00:00_RHEL8をDBパッケージへ変更`
    - :kbd:`2`
    - :kbd:`mariadb-server`
    - :kbd:`present`

作業実行(2回目)
---------------

1. 事前確認

   | 現在のサーバーの状態を確認しましょう。
   | サーバに SSH ログインし、パッケージのインストール状態を確認します。

   .. code-block:: bash
      :caption: コマンド

      rpm -q postgresql-server

   .. code-block:: bash
      :caption: 実行結果

      # 環境ごとにバージョンは異なります
      postgresql-server-10.23-1.module+el8.7.0+17280+3a452e1f.x86_64

   .. code-block:: bash
      :caption: コマンド

      rpm -q mariadb-server

   .. code-block:: bash
      :caption: 実行結果

      package mariadb-server is not installed

2. 作業実行

   | :menuselection:`Ansible-LegacyRole --> 作業実行` から、:kbd:`パッケージ管理` Movement を選択し、:guilabel:` 作業実行` を押下します。
   | 次に、:menuselection:`作業実行設定` で、オペレーションに :kbd:`RHEL8をDBパッケージへ変更` を選択し、:guilabel:`作業実行` を押下します。

   | :menuselection:`作業状態確認` 画面が開き、実行が完了した後に、ステータスが「完了」になったことを確認します。

   .. figure:: ../../../../images/learn/quickstart/scenario2/作業実行2.gif
      :width: 1200px
      :alt: 作業実行2

3. 事後確認

   | 再度サーバに SSH ログインし、postgresql-server がアンインストールされ、mariadb-server がインストールされていることを確認します。

   .. code-block:: bash
      :caption: コマンド

      rpm -q postgresql-server

   .. code-block:: bash
      :caption: 実行結果

      package postgresql-server is not installed

   .. code-block:: bash
      :caption: コマンド

      rpm -q mariadb-server

   .. code-block:: bash
      :caption: 実行結果

      mariadb-server-10.3.35-1.module+el8.6.0+15949+4ba4ec26.x86_64


まとめ
======

| 本シナリオでは、RHEL8 サーバ上のパッケージを管理するシナリオを通して、Exastro IT Automation のパラメータシートの運用方法について紹介をしました。

- 入力値が確定している場合は、データシートを利用して入力ミスを防ぐことが可能です。
- 複数かつ数が不定のパラメータを管理する場合は、「バンドル」を利用することで柔軟なパラメータ管理が行うことが可能です。
- 大量のパラメータを設定する場合は、「全件ダウンロード・ファイル一括登録」を利用することでファイルからのデータ登録を行うことが可能です。

| :doc:`次のシナリオ <scenario3>` では、一連の作業を実行する方法について紹介をします。
