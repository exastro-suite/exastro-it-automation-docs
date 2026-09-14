===================
クイックスタート
===================


| 本シナリオでは、簡単な例として、ホスト名の変更を題材に Exastro IT Automation の基本操作を学習します。
| また、本シナリオを通して、Exastro IT Automation により自動化の最大のメリットを理解することを目的としています。

| 今回の題材では、作業を実行するために以下の事前準備を行います。

- :ref:`事前準備 <quickstart_prepared>`

  #. :ref:`パラメータシート作成 <quickstart_server_information_parmeter>`
  #. :ref:`作業項目の設定 <quickstart_create_movement>`
  #. :ref:`Ansible Playbook 登録 <quickstart_regist_playbook>`
  #. :ref:`Movement と Ansible Playbook 紐付け <quickstart_asign_playbook_with_movement>`
  #. :ref:`パラメータシートの項目と Ansible Playbook の変数の紐付け <quickstart_asign_playbook_variable_with_parameters>`
  #. :ref:`機器登録 <quickstart_regist_host>`

| 事前準備を終えた後は、作業概要の登録やパラメータの設定といった必要最低限の操作を行い、繰り返し作業を実施します。

- :ref:`繰り返し作業(1回目) <quickstart_1st>`

  #. :ref:`作業概要登録 <quickstart_1st_regist_operation>`
  #. :ref:`パラメータ設定 <quickstart_1st_regist_parameter>`
  #. :ref:`作業実行 <quickstart_1st_run>`

- :ref:`繰り返し作業(2回目) <quickstart_2nd>`

  #. :ref:`作業概要登録 <quickstart_2nd_regist_operation>`
  #. :ref:`パラメータ設定 <quickstart_2nd_regist_parameter>`
  #. :ref:`作業実行 <quickstart_2nd_run>`

| このシナリオでは、最初に1回だけ準備作業を行っておけば、作業を実施する際には簡単な操作だけで何度でも同じ作業を実施できることを理解することを目的としています。

前提
====

| 本シナリオを実行するために必要となる条件は、下記の通りです。

#. 作業可能なサーバ(RHEL8)がある。
#. 利用するユーザはsshでログイン可能で、sudoer で全操作権限を持っている必要があります。
#. 作業用ワークスペース


.. _quickstart_prepared:

事前準備
========

| システムの構成情報のフォーマットを設計します。

| システムにある全ての情報をパラメータとして管理する必要はありません。今後管理が必要になったタイミングで適宜追加や見直しをしましょう。

.. _quickstart_server_information_parmeter:

パラメータシート作成
--------------------

| :menuselection:`パラメータシート作成` では、作業時に利用する設定値(パラメータ)を登録するためのパラメータシートを管理します。

| ホスト名を管理するためのパラメータシートを作成します。
| :menuselection:`パラメータシート作成 --> パラメータシート定義・作成` から、ホスト名を管理するために、「サーバー基本情報」というパラメータシートを作成します。

.. figure:: /images/learn/quickstart/Legacy_scenario1/パラメータシート作成定義.png
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
   * - パラメータシート名
     - :kbd:`サーバー基本情報`
   * - パラメータシート名(REST)
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

.. _quickstart_create_movement:

作業項目の設定
--------------

| 作業手順を登録するために、Exastro IT Automation で扱う作業単位である Movement (ジョブ)を定義します。

| Exastro IT Automation では、Movement という単位で作業を管理します。Movementは作業手順書における作業項目に該当します。
| Movement は、Ansible Playbook のような IaC (Infrastrucure as Code) を紐付けたり、IaC 内の変数とパラメータシートの設定値を紐付ける際に利用します。

| :menuselection:`Ansible-Legacy --> Movement一覧` から、ホスト名設定のための Movement を登録します。

.. figure:: /images/learn/quickstart/Legacy_scenario1/Movement登録.png
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
   * - :kbd:`ホスト名設定`
     - :kbd:`IP`
     - :kbd:`※ヘッダーセクションを参照`

.. code-block:: bash
   :caption: ヘッダーセクション

   - hosts: all
     remote_user: "{{ __loginuser__ }}"
     gather_facts: no
     become: yes

.. _quickstart_regist_playbook:

Ansible Playbook 登録
---------------------

| Ansible Playbook の登録を行います。Ansible Playbook は運用手順書内に記載されたコマンドに該当します。
| Ansible-Legacyモードではご自身で作成したPlaybookを利用することを想定しています。
| Ansible-Legacyモードを使用することのメリットとして、自身の用途に合ったPlaybookを作成することで、自由に手順を作成できることが挙げられます。
| ですが、Ansible-Legacyモードを利用するにはご自身でPlaybookを作成していただく必要があるため、Playbook作成の知識が必要となります。

| 本シナリオでは、 以下のPlaybookを利用します。以下をコピーして、yml形式でhostname.ymlを作成してください。

.. code-block:: bash
   :caption: hostname.yml

   - name: Set a hostname
     ansible.builtin.hostname:
       name: "{{ hostname }}"

| :menuselection:`Ansible-Legacy --> Playbook素材集` から、上記のPlaybookを登録します。

.. figure:: /images/learn/quickstart/Legacy_scenario1/Playbook素材集.png
   :width: 1200px
   :alt: Playbook登録

.. list-table:: Ansible Playbook 情報の登録
  :widths: 10 10
  :header-rows: 1

  * - Playbook素材名
    - Playbook素材
  * - :kbd:`hostname`
    - :file:`hostname.yml`

.. _quickstart_asign_playbook_with_movement:

Movement と Ansible Playbook の紐付け
-------------------------------------

| 定義した Movement に対して、Ansible Playbook を紐付け、更に Ansible Playbook 内の変数と :ref:`quickstart_server_information_parmeter` で登録したパラメータシートの項目の紐付けを行います。

| :menuselection:`Ansible-Legacy --> Movement-ロール紐付` から、Movement と Ansible Playbook の紐付けを行います。
| 本シナリオでは、 hostname.ymlを利用します。

.. figure:: /images/learn/quickstart/Legacy_scenario1/Movement-Playbook紐付.png
   :width: 1200px
   :alt: Movement-Playbook紐付け

.. list-table:: Movement-Playbook紐付け情報の登録
  :widths: 10 10 10
  :header-rows: 1

  * - Movement名
    - Playbook素材
    - インクルード順序
  * - :kbd:`ホスト名設定`
    - :kbd:`hostname.yml`
    - :kbd:`1`

.. _quickstart_asign_playbook_variable_with_parameters:

パラメータシートの項目と Ansible Playbook の変数の紐付け
--------------------------------------------------------

| hostname.ymlでは、:kbd:`hostname` という変数にホスト名を代入することで、対象サーバーのホスト名を設定することができます。

| :menuselection:`Ansible-Legacy --> 代入値自動登録設定` から、サーバー基本情報パラメータシートのホスト名の項目に入るパラメータを、Ansible Playbook の :kbd:`hostname` に代入する設定を行います。

.. figure:: /images/learn/quickstart/Legacy_scenario1/代入値自動登録.png
   :width: 1200px
   :alt: 代入値自動登録設定

.. list-table:: 代入値自動登録設定の設定値
  :widths: 40 10 20 20
  :header-rows: 2

  * - パラメータシート(From)
    - 登録方式
    - Movement名
    - IaC変数(To)
  * - メニューグループ:メニュー:項目
    -
    -
    - Movement名:変数名
  * - :kbd:`代入値自動登録用:サーバー基本情報:ホスト名`
    - :kbd:`Value型`
    - :kbd:`ホスト名設定`
    - :kbd:`ホスト名設定:hostname`

.. _quickstart_regist_host:

機器登録
--------

| 作業対象となるサーバを機器一覧に登録します。

| :menuselection:`Ansible共通 --> 機器一覧` から、作業対象であるサーバーの接続情報を登録します。

.. figure:: /images/learn/quickstart/Legacy_scenario1/機器一覧登録設定.gif
   :width: 1200px
   :alt: 機器一覧登録

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
     - :kbd:`server01`
     - :kbd:`192.168.0.1 ※適切なIPアドレスを設定`
     - :kbd:`接続ユーザ名`
     - :kbd:`(秘密鍵ファイル)`
     - :kbd:`鍵認証(パスフレーズなし)`

.. tip::
   | 今回のシナリオでは鍵認証で実行しますが、パスワード認証での実行も可能です。
   | 認証方式は、作業対象サーバーへのログインの方法に応じて適宜変更してください。

.. _quickstart_1st:

繰り返し作業(1回目)
===================

| 具体的なパラメータの設定や作業手順を考える前に、作業計画を立てるところから初めます。
| まずは、いつ、どこの機器に対して、何を、どうするかといった情報を簡単に整理しておきましょう。

.. list-table:: 作業の方針
   :widths: 10 10
   :header-rows: 0

   * - 作業実施日時
     - 2024/04/01 12:00:00
   * - 作業対象
     - 作業対象サーバー(RHEL8)
   * - 作業内容
     - ホスト名の変更

.. _quickstart_1st_regist_operation:

作業概要登録(1回目)
-------------------

| オペレーション登録では、作業を実施する際の作業概要を定義します。オペレーションは各作業ごとに1つ作成します。オペレーションは使いまわさないようにしましょう。
| 先に決めた作業の方針を元にオペレーション情報を記入しましょう。

| :menuselection:`基本コンソール --> オペレーション一覧` から、作業実施日時や作業名を登録します。

.. figure:: /images/learn/quickstart/Legacy_scenario1/オペレーション登録.png
   :width: 1200px
   :alt: オペレーション登録

.. list-table:: オペレーション登録内容
   :widths: 15 10
   :header-rows: 1

   * - オペレーション名
     - 実施予定日時
   * - :kbd:`RHEL8のホスト名変更作業`
     - :kbd:`2024/04/01 12:00:00`

.. tip::
   | 作業実施日時は、本シナリオでは適当な日時で問題ありませんが、作業日が定まっている場合は、正確な作業実施の予定日時を設定することを推奨します。
   | 定期作業などの繰り返し行われる作業のように、作業日が定まっていない場合は現在の日時を登録しても問題ありません。

.. _quickstart_1st_regist_parameter:

パラメータ設定(1回目)
---------------------

| パラメータシートには、設定したいパラメータを機器ごとに登録します。
| オペレーションには、作業概要登録で作成した :kbd:`RHEL8のホスト名変更作業` を選択します。オペレーションを選択することでオペレーションに対して、作業対象サーバとパラメータが紐付けされます。
| 本シナリオでは、:kbd:`server01` というホスト名を作業対象サーバに設定します。

| :menuselection:`入力用 --> サーバー基本情報` から、ホストに対するパラメータを登録します。

.. figure:: /images/learn/quickstart/Legacy_scenario1/パラメータ登録.png
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
  * - :kbd:`server01`
    - :kbd:`2024/04/01 12:00:00_RHEL8のホスト名変更作業`
    - :kbd:`server01`

.. _quickstart_1st_run:

作業実行(1回目)
---------------

#. 事前確認

   | まずは、現在のサーバーの状態を確認しましょう。
   | 作業対象サーバに SSH ログインし、現在のホスト名を確認します。

   .. code-block:: bash
      :caption: コマンド

      # ホスト名の取得
      hostnamectl status --static

   .. code-block:: bash
      :caption: 実行結果

      # 結果は環境ごとに異なります
      localhost

#. 作業実行

   | :menuselection:`Ansible-Legacy --> 作業実行` から、:kbd:`ホスト名設定` Movement を選択し、:guilabel:` 作業実行` を押下します。
   | 次に、:menuselection:`作業実行設定` で、オペレーションに :kbd:`RHEL8のホスト名変更作業` を選択し :guilabel:`選択決定` を押下します。
   | 最後に、実行内容を確認し、:guilabel:`作業実行` を押下します。

   | :menuselection:`作業状態確認` 画面が開き、実行が完了した後に、ステータスが「完了」になったことを確認します。

.. figure:: /images/learn/quickstart/Legacy_scenario1/作業実行.gif
   :width: 1200px
   :alt: 作業実行

#. 事後確認

   | 再度作業対象サーバに SSH ログインし、ホスト名が変更されていることを確認します。

   .. code-block:: bash
      :caption: コマンド

      # ホスト名の取得
      hostnamectl status --static

   .. code-block:: bash
      :caption: 実行結果

      server01

.. _quickstart_2nd:

繰り返し作業(2回目)
===================

| 具体的なパラメータの設定や作業手順を考える前に、作業計画を立てるところから初めます。
| まずは、いつ、どこの機器に対して、何を、どうするかといった情報を簡単に整理しておきましょう。

.. list-table:: 作業の方針
   :widths: 10 10
   :header-rows: 0

   * - 作業実施日時
     - 2024/05/01 12:00:00
   * - 作業対象
     - 作業対象サーバー(RHEL8)
   * - 作業内容
     - ホスト名の更新

.. _quickstart_2nd_regist_operation:

作業概要登録(2回目)
-------------------

| オペレーション登録では、作業を実施する際の作業概要を定義します。オペレーションは各作業ごとに1つ作成します。オペレーションは使いまわさないようにしましょう。
| 先に決めた作業の方針を元にオペレーション情報を記入しましょう。

| :menuselection:`基本コンソール --> オペレーション一覧` から、作業実施日時や作業名を登録します。

.. figure:: /images/learn/quickstart/Legacy_scenario1/更新用オペレーション登録.png
   :width: 1200px
   :alt: オペレーション登録

.. list-table:: オペレーション登録内容
   :widths: 15 10
   :header-rows: 1

   * - オペレーション名
     - 実施予定日時
   * - :kbd:`RHEL8のホスト名更新作業`
     - :kbd:`2024/05/01 12:00:00`

.. tip::
   | 作業実施日時は、本シナリオでは適当な日時で問題ありませんが、作業日が定まっている場合は、正確な作業実施の予定日時を設定することを推奨します。
   | 定期作業などの繰り返し行われる作業のように、作業日が定まっていない場合は現在の日時を登録しても問題ありません。

.. _quickstart_2nd_regist_parameter:

パラメータ設定(2回目)
---------------------

| 本シナリオでは、:kbd:`server01` というホスト名をパラメータ値として設定しました。
| しかし、:menuselection:`機器一覧` でもホスト名を管理しており、ホスト名の管理が多重管理状態となっています。

| Exastro IT Automation では、機器の情報を :ref:`ansible_common_ita_original_variable` で取得することができ、ログイン先のホスト名は  :kbd:`__inventory_hostname__` という変数を使うことで取得できるため、パラメータの一元管理が可能となります。

| :menuselection:`入力用 --> サーバー基本情報` から、ITA 独自変数を使って機器一覧に登録してあるホスト名を登録してみましょう。

.. figure:: /images/learn/quickstart/Legacy_scenario1/更新用パラメータ設定.png
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
    - :kbd:`2024/05/01 12:00:00_RHEL8のホスト名更新作業`
    - :kbd:`"{{ __inventory_hostname__ }}"`

| `__inventory_hostname__` 変数を使うことで、機器一覧に登録したホスト情報を参照できるようになりました。
| 次に、作業対象となるサーバーのホスト名を db01 に変更します。

| :menuselection:`Ansible共通 --> 機器一覧` から、作業対象サーバのホスト名を db01 に更新します。

.. figure:: /images/learn/quickstart/Legacy_scenario1/機器一覧ホスト名変更.gif
   :width: 1200px
   :alt: パラメータ登録

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
     - :kbd:`db01`
     - :kbd:`192.168.0.1 ※適切なIPアドレスを設定`
     - :kbd:`接続ユーザ名`
     - :kbd:`(秘密鍵ファイル)`
     - :kbd:`鍵認証(パスフレーズなし)`

.. _quickstart_2nd_run:

作業実行(2回目)
---------------

#. 作業実行

   | :menuselection:`Ansible-Legacy --> 作業実行` から、:kbd:`ホスト名設定` Movement を選択し、:guilabel:` 作業実行` を押下します。
   | 次に、:menuselection:`作業実行設定` で、オペレーションに :kbd:`RHEL8のホスト名更新作業` を選択し :guilabel:`選択決定` を押下します。
   | 最後に、実行内容を確認し、:guilabel:`作業実行` を押下します。

   | :menuselection:`作業状態確認` 画面が開き、実行が完了した後に、ステータスが「完了」になったことを確認します。

.. figure:: /images/learn/quickstart/Legacy_scenario1/更新作業実行.gif
   :width: 1200px
   :alt: 作業実行

#. 事後確認

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

| RHEL8 サーバに対してホスト名を設定するシナリオを通して、Exastro IT Automation の基本的な操作方法を学習しました。
| また、Exastro IT Automation により自動化の最大のメリットである、繰り返し作業による作業の効率化について学習しました。
| :doc:`次のシナリオ <../ansible_legacy/Legacy_scenario2>` では、より実用的なパラメータシートの管理方法について紹介をします。

