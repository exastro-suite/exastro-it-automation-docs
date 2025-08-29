===============
ホストグループ
===============

| 本シナリオでは、簡単な例としてOSの設定を題材に Exastro IT Automation の基本操作を学習します。
| 詳しくは :doc:`../../../manuals/host_group/host_group` を参照してください。


パラメータ設計
===============

| 本シナリオで扱うパラメータシートの設定項目は、「タイムゾーンの設定」と「サーバ用パラメータ」、「ホスト名の設定」の3つです。
| ここで検討すべきポイントは、

- タイムゾーンの設定で作成したタイムゾーン名に対応する「UTC」と「JST」の設定方法です。

.. _hostgroup_create_datasheet:

データシートの作成
-------------------

| パラメータの登録時に手入力をすると、タイプミスなどにより作業ミスが発生する可能性が高くなります。
| パラメータの選択肢を作成することで、このようなパラメータの入力ミスを防止することができます。

| まずは、タイムゾーンの設定をするために必要な、:kbd:`Timezone` (タイムゾーン名) とタイムゾーンに設定する :kbd:`UTC` と :kbd:`JST` のデータシートを作成します。
| 具体的には、データシートを作成し、その中にタイムゾーンとして登録するパラメータを投入します。


| データシートを作成します。

| :menuselection:`パラメータシート作成 --> パラメータシート定義・作成` から、データシートを登録します。

.. figure:: /images/learn/quickstart/hostgroup/データシート作成.png
   :width: 1200px
   :alt: データシートの作成

.. list-table:: データシートの項目の設定値
   :widths: 10 10 10 10
   :header-rows: 1

   * - 設定項目
     - 項目1設定値
     - 項目2設定値
     - 項目3設定値
   * - 項目の名前
     - :kbd:`タイムゾーン`
     - :kbd:`UTC`
     - :kbd:`JST`
   * - 項目の名前(Rest API用) 
     - :kbd:`Timezone`
     - :kbd:`UTC`
     - :kbd:`JST`
   * - 入力方式
     - :kbd:`文字列(単一行)`
     - :kbd:`文字列(単一行)`
     - :kbd:`文字列(単一行)`
   * - 最大バイト数
     - :kbd:`64`
     - :kbd:`32`
     - :kbd:`32`
   * - 正規表現
     - 
     - 
     - 
   * - 初期値
     - 
     - 
     - 
   * - 必須
     - ✓
     - 
     - 
   * - 一意制約
     - ✓
     - 
     - 
   * - 説明
     - 
     - 
     - 
   * - 備考
     - 
     - 
     - 

.. list-table:: データシート作成情報の設定値
   :widths: 5 10
   :header-rows: 1

   * - 項目名
     - 設定値
   * - 項番
     - (自動入力)
   * - パラメータシート名
     - :kbd:`タイムゾーン一覧`
   * - パラメータシート名(REST)
     - :kbd:`Timezone_list`
   * - 作成対象
     - :kbd:`データシート`
   * - 表示順序
     - :kbd:`99999`
   * - 最終更新日時
     - (自動入力)
   * - 最終更新者
     - (自動入力)

データシート登録
-----------------

| パラメータリスト内に表示するパラメータを設定します。
| :menuselection:`入力用 --> タイムゾーン一覧` から、タイムゾーン名とUTC、JSTを登録します。

.. figure:: /images/learn/quickstart/hostgroup/データシート入力.png
   :width: 1200px
   :alt: データシートの設定値入力

.. list-table:: 状態の設定値
   :widths: 10 5 5 5
   :header-rows: 2

   * - パラメータ
     - 
     - 
     - 備考
   * - タイムゾーン
     - UTC
     - JST
     - 
   * - :kbd:`Asia/Tokyo`
     - :kbd:`+9`
     - :kbd:`0`
     - 
   * - :kbd:`America/New_York`
     - :kbd:`-4`
     - :kbd:`-13`
     - 

パラメータシートの作成
----------------------

| サーバのOS設定をする際に、1つの作業を複数のホストへ実行したい場合があると思います。
| 今回はホストグループという機能を使い、複数のホストへ一度に作業を実行する方法を紹介します。

| :menuselection:`パラメータシート作成 --> パラメータシート定義・作成` から、「サーバ用パラメータ」と「ホスト名変更用」というパラメータシートを登録します。
| まずは「サーバ用パラメータ」というパラメータシートを作成します。項目1の :menuselection:`入力方式` を :kbd:`プルダウン選択` に設定することで、:ref:`hostgroup_create_datasheet` で登録したデータシートを参照できるようになります。

.. figure:: /images/learn/quickstart/hostgroup/サーバ用パラメータパラメータシート項目設定.png
   :width: 1200px
   :alt: サーバ用パラメータパラメータシート作成情報設定

.. list-table:: パラメータ項目設定
   :widths: 5 10 5
   :header-rows: 1

   * - 設定項目
     - 項目1設定値
     - 項目2設定値
   * - 項目の名前
     - :kbd:`タイムゾーン`
     - :kbd:`Nameserver_ip`
   * - 項目の名前(Rest API用) 
     - :kbd:`Timezone`
     - :kbd:`VAR_nameserver_ip`
   * - 入力方式
     - :kbd:`プルダウン選択`
     - :kbd:`文字列(単一行)`
   * - 最大バイト数
     - (項目なし)
     - :kbd:`64`
   * - 正規表現
     - (項目なし)
     - 
   * - 選択項目
     - :kbd:`入力用:タイムゾーン一覧:パラメータ/タイムゾーン`
     - (項目なし)
   * - 参照項目
     - :kbd:`UTC、JST`
     - (項目なし)
   * - 初期値
     - 
     - 
   * - 必須
     - 
     - 
   * - 一意制約
     - 
     - 
   * - 説明
     - 
     - 
   * - 備考
     - 
     - 


.. list-table:: パラメータシート作成情報の設定値
   :widths: 5 10
   :header-rows: 1

   * - 項目名
     - 設定値
   * - 項番
     - (自動入力)
   * - パラメータシート名
     - :kbd:`サーバ用パラメータ`
   * - パラメータシート名(REST)
     - :kbd:`server_parameter`
   * - 作成対象
     - :kbd:`パラメータシート（ホスト/オペレーションあり）`
   * - 表示順序
     - :kbd:`1`
   * - ホストグループ利用
     - 「利用する」にチェックを入れる(有効)
   * - 最終更新日時
     - (自動入力)
   * - 最終更新者
     - (自動入力)

| 次に「ホスト名変更用」というパラメータシートを作成します。

.. figure:: /images/learn/quickstart/hostgroup/ホスト名変更用パラメータシート項目設定.png
   :width: 1200px
   :alt: ホスト名変更用パラメータシート作成情報設定

.. list-table:: パラメータ項目設定
   :widths: 10 10
   :header-rows: 1

   * - 設定項目
     - 項目1設定値
   * - 項目の名前
     - :kbd:`ホスト名`
   * - 項目の名前(Rest API用) 
     - :kbd:`VAR_hostname`
   * - 入力方式
     - :kbd:`文字列(単一行)`
   * - 最大バイト数
     - :kbd:`64`
   * - 正規表現
     - 
   * - 初期値
     - 
   * - 必須
     - 
   * - 一意制約
     - 
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
   * - パラメータシート名
     - :kbd:`ホスト名変更用`
   * - パラメータシート名(REST)
     - :kbd:`Hostname_change`
   * - 作成対象
     - :kbd:`パラメータシート（ホスト/オペレーションあり）`
   * - 表示順序
     - :kbd:`2`
   * - ホストグループ利用
     - 「利用する」にチェックを入れない(無効)
   * - 最終更新日時
     - (自動入力)
   * - 最終更新者
     - (自動入力)

作業手順の登録
==============

| 作業手順を登録するために、作業単位となるジョブ(Movement)を定義します。
| 定義した Movement に対して、Ansible Playbook を紐付け、更に Ansible Playbook 内の変数とパラメータシートの項目の紐付けを行います。

Movement 登録
-------------

| :menuselection:`Ansible-Legacy --> Movement一覧` から、基本設定のための Movement を登録します。

.. figure:: /images/learn/quickstart/hostgroup/Movement登録設定.png
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
   * - :kbd:`set_timezone`
     - :kbd:`IP`
     - :kbd:`※ヘッダーセクションを参照`
   * - :kbd:`add_nameserver`
     - :kbd:`IP`
     - :kbd:`※ヘッダーセクションを参照`
   * - :kbd:`set_hostname`
     - :kbd:`IP`
     - :kbd:`※ヘッダーセクションを参照`

.. code-block:: bash
   :caption: ヘッダーセクション

   - hosts: all
     remote_user: "{{ __loginuser__ }}"
     gather_facts: no
     become: yes

Ansible Playbook 登録
---------------------

| 本シナリオでは、 「set_timezone.yml」と「add_nameserver.yml」、「set_hostname.yml」の3つのPlaybookを利用します。
| 以下をコピーして、それぞれのPlaybookをyml形式で作成してください。

.. code-block:: bash
  :caption: set_timezone.yml

  - name: Set Timezone
    timezone:
      name: "{{ VAR_locale_timezone }}"

.. code-block:: bash
  :caption: add_nameserver.yml

  - name: Add Nameserver
    lineinfile:
      dest: /etc/resolv.conf
      line: nameserver {{ VAR_nameserver_ip }}

.. code-block:: bash
  :caption: set_hostname.yml

  - name: Set a hostname
    ansible.builtin.hostname:
      name: "{{ VAR_hostname }}"

| :menuselection:`Ansible-Legacy --> Playbook素材集` から、から、上記のPlaybookを登録します。

.. figure:: /images/learn/quickstart/hostgroup/Ansible-Playbook登録設定.png
   :width: 1200px
   :alt: ansible-playbook登録

.. list-table:: Ansible Playbook 情報の登録
  :widths: 10 10
  :header-rows: 1

  * - Playbook素材名
    - Playbook素材
  * - :kbd:`set_timezone`
    - :file:`set_timezone.yml`
  * - :kbd:`add_nameserver`
    - :file:`add_nameserver.yml`
  * - :kbd:`set_hostname`
    - :file:`set_hostname.yml`

Movement と Ansible Playbook の紐付け
-------------------------------------

| :menuselection:`Ansible-Legacy --> Movement-Playbook紐付` から、Movement と Ansible Playbook の紐付けを行います。

.. figure:: /images/learn/quickstart/hostgroup/MovementとPlaybook紐付け設定.png
   :width: 1200px
   :alt: MovementとPlaybook紐付け

.. list-table:: Movement-Playbook紐付け情報の登録
  :widths: 10 10 10
  :header-rows: 1

  * - Movement名
    - Playbook素材
    - インクルード順序
  * - :kbd:`set_timezone`
    - :kbd:`set_timezone`
    - :kbd:`1`
  * - :kbd:`add_nameserver`
    - :kbd:`add_nameserver`
    - :kbd:`1`
  * - :kbd:`set_hostname`
    - :kbd:`set_hostname`
    - :kbd:`1`

代入値自動登録設定
-------------------

| :menuselection:`Ansible-Legacy --> 代入値自動登録設定` から、作成したパラメータシートと Ansible Playbook 内の変数の紐付けを行います。

.. figure:: /images/learn/quickstart/hostgroup/代入値自動登録.png
  :width: 1200px
  :alt: 代入値自動登録設定

.. list-table:: 代入値自動登録設定の設定値
  :widths: 40 10 10 20 20 10
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
    - 代入順序
  * - :kbd:`代入値自動登録用:サーバ用パラメータ:パラメータ/タイムゾーン`
    - 
    - :kbd:`Value型`
    - :kbd:`set_timezone`
    - :kbd:`set_timezone:VAR_locale_timezone`
    - 
  * - :kbd:`代入値自動登録用:サーバ用パラメータ:パラメータ/Nameserver_ip`
    - 
    - :kbd:`Value型`
    - :kbd:`add_nameserver`
    - :kbd:`add_nameserver:VAR_nameserver_ip`
    - 
  * - :kbd:`代入値自動登録用:ホスト名変更用:パラメータ/ホスト名`
    - 
    - :kbd:`Value型`
    - :kbd:`set_hostname`
    - :kbd:`set_hostname:VAR_hostname`
    - 

ジョブフローの作成
===================

| 複数の Movement を一連の作業として実行する方法に、Conductor という仕組みがあります。
| Conductor を利用することで、複数の Movement をまとめて実行できるだけでなく、Movement の実行結果に応じて、後続処理を分岐させたり、ユーザ確認の為に一時停止するといった複雑なロジックを組み込む事が可能です。
| :menuselection:`Conductor --> Conductor編集/作業実行` から「サーバ基本設定」というジョブフローを定義します。

.. figure:: /images/learn/quickstart/hostgroup/ジョブフローの作成登録.gif
   :width: 1200px
   :alt: ジョブフローの作成

| 1. 右上のペイン :menuselection:`Conductor情報 --> 名称`  に、 :kbd:`サーバ基本設定` と入力します。
| 2. 右下のペインに、作成した :kbd:`set_timezone` と :kbd:`add_nameserver`  、 :kbd:`set_hostname` の3つの Movement があります。これらを画面中央にドラッグアンドドロップします。
| 3. 各 Node 間を下記の様に接続します。

.. list-table:: Node 間の接続
   :widths: 10 10
   :header-rows: 1

   * - OUT
     - IN
   * - :kbd:`Start`
     - :kbd:`set_timezone`
   * - :kbd:`set_timezone`
     - :kbd:`add_nameserver`
   * - :kbd:`add_nameserver`
     - :kbd:`set_hostname`
   * - :kbd:`set_hostname`
     - :kbd:`End`

| 4. 画面上部にある、 :guilabel:` 登録` を押下します。

.. _hostgroup_create_Equipment_list:

作業対象の登録
==============

| 作業実施を行う対象機器の登録を行います。

機器登録
--------

| 本シナリオでは計4台のサーバを登録します。下記登録を計4台分実施してください。

| :menuselection:`Ansible共通 --> 機器一覧` から、作業対象であるサーバーの接続情報を登録します。

.. figure:: /images/learn/quickstart/hostgroup/機器一覧登録設定.gif
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
     - :kbd:`dbA`
     - :kbd:`192.168.0.1 ※適切なIPアドレスを設定`
     - :kbd:`接続ユーザ名`
     - :kbd:`(秘密鍵ファイル)`
     - :kbd:`鍵認証(パスフレーズなし)`
   * - :kbd:`SV`
     - :kbd:`dbB`
     - :kbd:`192.168.0.1 ※適切なIPアドレスを設定`
     - :kbd:`接続ユーザ名`
     - :kbd:`(秘密鍵ファイル)`
     - :kbd:`鍵認証(パスフレーズなし)`
   * - :kbd:`SV`
     - :kbd:`webA`
     - :kbd:`192.168.0.1 ※適切なIPアドレスを設定`
     - :kbd:`接続ユーザ名`
     - :kbd:`(秘密鍵ファイル)`
     - :kbd:`鍵認証(パスフレーズなし)`
   * - :kbd:`SV`
     - :kbd:`webB`
     - :kbd:`192.168.0.1 ※適切なIPアドレスを設定`
     - :kbd:`接続ユーザ名`
     - :kbd:`(秘密鍵ファイル)`
     - :kbd:`鍵認証(パスフレーズなし)`

.. tip::
   | 今回のシナリオでは鍵認証で実行しますが、パスワード認証での実行も可能です。
   | 認証方式は、作業対象サーバーへのログインの方法に応じて適宜変更してください。

オペレーション登録
===================

作業概要の作成
--------------

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
     - 基本設定_全台用

作業概要登録
------------

| オペレーション登録では、作業を実施する際の作業概要を定義します。オペレーションは各作業ごとに1つ作成します。オペレーションは使いまわさないようにしましょう。
| 先に決めた作業の方針を元にオペレーション情報を記入しましょう。


| :menuselection:`基本コンソール --> オペレーション一覧` から、作業実施日時や作業名を登録します。

.. figure:: /images/learn/quickstart/hostgroup/オペレーション登録.png
   :width: 1200px
   :alt: オペレーション登録

.. list-table:: オペレーション登録内容
   :widths: 10 10
   :header-rows: 1

   * - オペレーション名
     - 実施予定日時
   * - :kbd:`基本設定_全台用`
     - :kbd:`2024/04/01 12:00:00`

.. tip::
   | 作業実施日時は、本シナリオでは適当な日時で問題ありませんが、作業日が定まっている場合は、正確な作業実施の予定日時を設定することを推奨します。
   | 定期作業などの繰り返し行われる作業のように、作業日が定まっていない場合は現在の日時を登録しても問題ありません。

.. _hostgroup_create_hostgroup:

ホストグループ設定
===================

ホストグループ定義
-------------------

| まずは、:ref:`hostgroup_create_Equipment_list` で登録したホストを登録する為にホストグループを定義します。
| :menuselection:`ホストグループ管理 --> ホストグループ一覧` からホストが所属するホストグループを作成します。

.. figure:: /images/learn/quickstart/hostgroup/ホストグループ登録.png
   :width: 1200px
   :alt: ホストグループ登録

.. list-table:: ホストグループ登録内容
   :widths: 10 10
   :header-rows: 1

   * - ホストグループ名
     - 優先順位
   * - :kbd:`All_SV`
     - :kbd:`1`
   * - :kbd:`db_SV`
     - :kbd:`2`
   * - :kbd:`web_SV`
     - :kbd:`3`

ホストグループの親子関係定義
-----------------------------

| 次に、今作成したホストグループ間の親子関係を定義します。
| :menuselection:`ホストグループ管理 --> ホストグループ親子紐付` からホストグループ間の親子関係を紐付けます。

.. figure:: /images/learn/quickstart/hostgroup/ホストグループ親子関係.png
   :width: 1200px
   :alt: ホストグループ親子関係

.. list-table:: ホストグループ親子関係紐付け
   :widths: 10 10
   :header-rows: 1

   * - 親ホストグループ
     - 子ホストグループ
   * - :kbd:`All_SV`
     - :kbd:`db_SV`
   * - :kbd:`All_SV`
     - :kbd:`web_SV`

ホストグループへの登録
----------------------

| 次に作成したホストグループに対して、作業対象ホストを紐付けます。
| :menuselection:`ホストグループ管理 --> ホスト紐付管理` から作成したホストグループに対して、作業対象ホストを紐付けます。

.. figure:: /images/learn/quickstart/hostgroup/ホストグループ作業対象ホスト登録.png
   :width: 1200px
   :alt: 作業対象ホスト登録

.. list-table:: 作業対象ホスト登録
   :widths: 10 10 10
   :header-rows: 1

   * - ホストグループ名
     - オペレーション
     - ホスト名
   * - :kbd:`db_SV`
     - :kbd:`基本設定_全台用`
     - :kbd:`dbA`
   * - :kbd:`db_SV`
     - :kbd:`基本設定_全台用`
     - :kbd:`dbB`
   * - :kbd:`web_SV`
     - :kbd:`基本設定_全台用`
     - :kbd:`webA`

作業実行1回目
=============

パラメータ設定
---------------

| 作業を実行するために作成したパラメータシートにパラメータを登録していきます。
| :menuselection:`入力用 --> サーバ用パラメータ` からパラメータを登録します。

.. figure:: /images/learn/quickstart/hostgroup/サーバ用パラメータパラメータ入力.png
   :width: 1200px
   :alt: サーバ用パラメータパラメータ入力

.. list-table:: サーバ用パラメータパラメータの設定値
  :widths: 5 15 10 10
  :header-rows: 2

  * - ホスト名
    - オペレーション
    - パラメータ
    - 
  * - 
    - オペレーション名
    - タイムゾーン
    - Nameserver_ip
  * - :kbd:`[HG]All_SV`
    - :kbd:`2024/04/01 12:00:00_基本設定_全台用`
    - :kbd:`Asia/Tokyo`
    - :kbd:`10.15.1.30`
  * - :kbd:`[HG]db_SV`
    - :kbd:`2024/04/01 12:00:00_基本設定_全台用`
    - :kbd:`Asia/Tokyo`
    - :kbd:`10.15.1.30`
  * - :kbd:`[HG]web_SV`
    - :kbd:`2024/04/01 12:00:00_基本設定_全台用`
    - :kbd:`Asia/Tokyo`
    - :kbd:`10.15.1.62`

| 次に、:menuselection:`入力用 --> ホスト名変更用` からパラメータを登録します。

.. figure:: /images/learn/quickstart/hostgroup/ホスト名変更用パラメータ入力.png
   :width: 1200px
   :alt: ホスト名変更用パラメータ入力

.. list-table:: ホスト名変更用パラメータの設定値
  :widths: 5 20 10
  :header-rows: 2

  * - ホスト名
    - オペレーション
    - パラメータ
  * - 
    - オペレーション名
    - ホスト名
  * - :kbd:`dbA`
    - :kbd:`2024/04/01 12:00:00_基本設定_全台用`
    - :kbd:`dbA`
  * - :kbd:`dbB`
    - :kbd:`2024/04/01 12:00:00_基本設定_全台用`
    - :kbd:`dbB`
  * - :kbd:`webA`
    - :kbd:`2024/04/01 12:00:00_基本設定_全台用`
    - :kbd:`webA`

作業実行
--------

1. 代入値自動登録用確認

   | :menuselection:`代入値自動登録用 --> サーバ用パラメータ` から登録した値が「ホストグループ分解機能」によって正しい値が指定されていることを確認します。

.. figure:: /images/learn/quickstart/hostgroup/作業実行1回目事前確認_サーバ用パラメータ.gif
   :width: 1200px
   :alt: 作業実行1回目事前確認

.. list-table:: サーバ用パラメータの代入値自動登録用確認
  :widths: 5 15 10 10 10
  :header-rows: 2

  * - ホスト名
    - オペレーション
    - パラメータ
    - 
    - 最終更新者
  * - 
    - オペレーション名
    - タイムゾーン
    - Nameserver_ip
    - 
  * - :kbd:`dbA`
    - :kbd:`2024/04/01 12:00:00_基本設定_全台用`
    - :kbd:`Asia/Tokyo`
    - :kbd:`10.15.1.30`
    - :kbd:`ホストグループ分解機能`
  * - :kbd:`dbB`
    - :kbd:`2024/04/01 12:00:00_基本設定_全台用`
    - :kbd:`Asia/Tokyo`
    - :kbd:`10.15.1.30`
    - :kbd:`ホストグループ分解機能`
  * - :kbd:`webA`
    - :kbd:`2024/04/01 12:00:00_基本設定_全台用`
    - :kbd:`Asia/Tokyo`
    - :kbd:`10.15.1.62`
    - :kbd:`ホストグループ分解機能`

1. 事前確認

   | 現在の各サーバーの状態を確認しましょう。
   | 作業対象サーバに SSH ログインし、現在のホスト名を確認します。

   .. code-block:: bash
      :caption: コマンド

      # ホスト名の取得
      hostnamectl status --static

   .. code-block:: bash
      :caption: 実行結果

      # 結果は環境ごとに異なります
      localhost

   | resolv.confファイルを確認します。

   .. code-block:: bash
      :caption: コマンド

      # resolv.confファイルの確認
      cat /etc/resolv.conf

   .. code-block:: bash
      :caption: 実行結果

      # 登録する情報が無いことを確認

2. 作業実行

   | :menuselection:`Conductor --> Conductor編集/作業実行` から、:guilabel:` 選択` を押下します。
   | :kbd:`サーバ基本設定` Conductor を選択し、:guilabel:`選択決定` を押下します。
   | 次に、画面上部の :guilabel:` 作業実行` で、オペレーションに :kbd:`基本設定_全台用` を選択し、:guilabel:`作業実行` を押下します。

   | :menuselection:`Conductor作業確認` 画面が開き、実行が完了した後に、全ての Movement のステータスが「Done」になったことを確認します。

.. figure:: /images/learn/quickstart/hostgroup/作業実行1回目操作.gif
  :width: 1200px
  :alt: Conductor作業実行1回目

4. 事後確認

   | 再度サーバに SSH ログインして下記を確認します。

   | ホスト名を確認します。

   .. code-block:: bash
      :caption: コマンド

      # ホスト名の取得
      hostnamectl status --static

   .. code-block:: bash
      :caption: 実行結果

      # 作業対象サーバによって異なります。
      dbA
      dbB
      webA

   | resolv.confファイルを確認します。パラメータで入力したデータが登録されていることを確認します。

   .. code-block:: bash
      :caption: コマンド

      # resolv.confファイルの確認
      cat /etc/resolv.conf

   .. code-block:: bash
      :caption: 実行結果

      # 作業対象サーバによって異なります。
      nameserver 10.15.1.30
      nameserver 10.15.1.30
      nameserver 10.15.1.62

追加オペレーション登録
=======================

作業概要の作成
--------------

| 具体的なパラメータの設定や作業手順を考える前に、作業計画を立てるところから初めます。
| まずは、いつ、どこの機器に対して、何を、どうするかといった情報を簡単に整理しておきましょう。

.. list-table:: 作業の方針
   :widths: 10 10
   :header-rows: 0

   * - 作業実施日時
     - 2024/04/02 12:00:00
   * - 作業対象
     - 作業対象サーバー(RHEL8)
   * - 作業内容
     - 基本設定_追加用

作業概要登録
------------

| オペレーション登録では、作業を実施する際の作業概要を定義します。オペレーションは各作業ごとに1つ作成します。オペレーションは使いまわさないようにしましょう。
| 先に決めた作業の方針を元にオペレーション情報を記入しましょう。


| :menuselection:`基本コンソール --> オペレーション一覧` から、作業実施日時や作業名を登録します。

.. figure:: /images/learn/quickstart/hostgroup/追加オペレーション登録.png
   :width: 1200px
   :alt: 追加オペレーション登録

.. list-table:: 追加オペレーション登録内容
   :widths: 10 10
   :header-rows: 1

   * - オペレーション名
     - 実施予定日時
   * - :kbd:`基本設定_追加用`
     - :kbd:`2024/04/02 12:00:00`

.. tip::
   | 作業実施日時は、本シナリオでは適当な日時で問題ありませんが、作業日が定まっている場合は、正確な作業実施の予定日時を設定することを推奨します。
   | 定期作業などの繰り返し行われる作業のように、作業日が定まっていない場合は現在の日時を登録しても問題ありません。

追加ホストグループ設定
=======================

ホストグループ定義
-------------------

| 今回は、:ref:`hostgroup_create_hostgroup` で登録したデータを使用するので、定義は不要です。

ホストグループの親子関係定義
-----------------------------

| 今回は、:ref:`hostgroup_create_hostgroup` で登録したデータを使用するので、定義は不要です。

ホストグループへの登録
-----------------------

| 次に、:ref:`hostgroup_create_hostgroup` で作成したホストグループに対して、作業対象ホストを紐付けます。
| :menuselection:`ホストグループ管理 --> ホスト紐付管理` から既存のホストグループに対して、追加で作業対象ホストを紐付けます。
| 作業対象ホストとホストグループを紐付ける際、追加で作成したオペレーションを選択することで、そのオペレーションを選択して作業実行をすると、同じホストグループでもオペレーションに紐付いているホストへのみ作業を実行することが出来ます。

.. figure:: /images/learn/quickstart/hostgroup/ホストグループ作業対象ホスト追加登録.png
   :width: 1200px
   :alt: 作業対象ホスト追加登録

.. list-table:: 作業対象ホスト追加登録
   :widths: 10 10 10
   :header-rows: 1

   * - ホストグループ名
     - オペレーション
     - ホスト名
   * - :kbd:`web_SV`
     - :kbd:`基本設定_追加用`
     - :kbd:`webB`

作業実行2回目
=============

パラメータ設定
---------------

| 追加したホストに作業を実行するために、作成したパラメータシートにパラメータを登録していきます。
| :menuselection:`入力用 --> サーバ用パラメータ` からパラメータを登録します。

.. figure:: /images/learn/quickstart/hostgroup/追加用サーバ用パラメータパラメータ入力.png
   :width: 1200px
   :alt: 追加用サーバ用パラメータパラメータ入力

.. list-table:: 追加用サーバ用パラメータパラメータの設定値
  :widths: 5 15 10 10
  :header-rows: 2

  * - ホスト名
    - オペレーション
    - パラメータ
    - 
  * - 
    - オペレーション名
    - Timezone
    - Nameserver_ip
  * - :kbd:`[HG]web_SV`
    - :kbd:`2024/04/02 12:00:00_基本設定_追加用`
    - :kbd:`Asia/Tokyo`
    - :kbd:`10.15.1.62`

| 次に :menuselection:`入力用 --> ホスト名変更用` からパラメータを登録します。

.. figure:: /images/learn/quickstart/hostgroup/追加用ホスト名変更用パラメータ入力.png
   :width: 1200px
   :alt: ホスト名変更用パラメータ入力

.. list-table:: ホスト名変更用パラメータの設定値
  :widths: 5 20 10
  :header-rows: 2

  * - ホスト名
    - オペレーション
    - パラメータ
  * - 
    - オペレーション名
    - ホスト名
  * - :kbd:`webB`
    - :kbd:`2024/04/02 12:00:00_基本設定_追加用`
    - :kbd:`webB`

作業実行
--------

1. 代入値自動登録用確認

   | :menuselection:`代入値自動登録用 --> 作成したパラメータシート` から追加登録した値が「ホストグループ分解機能」によって正しい値が指定されていることを確認します。

.. figure:: /images/learn/quickstart/hostgroup/作業実行2回目事前確認_サーバ用パラメータ.gif
   :width: 1200px
   :alt: 作業実行2回目事前確認

.. list-table:: 追加用サーバ用パラメータの代入値自動登録用確認
  :widths: 5 20 10 10 10
  :header-rows: 2

  * - ホスト名
    - オペレーション
    - パラメータ
    - 
    - 最終更新者
  * - 
    - オペレーション名
    - タイムゾーン
    - Nameserver_ip
    - 
  * - :kbd:`webB`
    - :kbd:`2024/04/02 12:00:00_基本設定_追加用`
    - :kbd:`Asia/Tokyo`
    - :kbd:`10.15.1.62`
    - :kbd:`ホストグループ分解機能`

1. 事前確認

   | 現在の各サーバーの状態を確認しましょう。
   | 作業対象サーバに SSH ログインし、現在のホスト名を確認します。

   .. code-block:: bash
      :caption: コマンド

      # ホスト名の取得
      hostnamectl status --static

   .. code-block:: bash
      :caption: 実行結果

      # 結果は環境ごとに異なります
      localhost

   | resolv.confファイルを確認します。

   .. code-block:: bash
      :caption: コマンド

      # resolv.confファイルの確認
      cat /etc/resolv.conf

   .. code-block:: bash
      :caption: 実行結果

      # 登録する情報が無いことを確認

2. 作業実行

   | :menuselection:`Conductor --> Conductor編集/作業実行` から、:guilabel:` 選択` を押下します。
   | :kbd:`サーバ基本設定` Conductor を選択し、:guilabel:`選択決定` を押下します。
   | 次に、画面上部の :guilabel:` 作業実行` で、オペレーションに :kbd:`基本設定_追加用` を選択し、:guilabel:`作業実行` を押下します。

   | :menuselection:`Conductor作業確認` 画面が開き、実行が完了した後に、全ての Movement のステータスが「Done」になったことを確認します。

   .. figure:: /images/learn/quickstart/hostgroup/作業実行2回目操作.gif
      :width: 1200px
      :alt: Conductor作業実行2回目

3. 事後確認

   | 再度サーバに SSH ログインし、下記を確認します。

   | ホスト名を確認します。

   .. code-block:: bash
      :caption: コマンド

      # ホスト名の取得
      hostnamectl status --static

   .. code-block:: bash
      :caption: 実行結果

      # 作業対象サーバによって異なります。
      webB

   | resolv.confファイルを確認します。パラメータで入力したデータが登録されていることを確認します。

   .. code-block:: bash
      :caption: コマンド

      # resolv.confファイルの確認
      cat /etc/resolv.conf

   .. code-block:: bash
      :caption: 実行結果

      # データが登録されていることを確認します。
      nameserver 10.15.1.62

まとめ
======

| 本シナリオでは、ホストグループという機能を使い複数のホストへ同時に作業を実行してみました。
| ホストグループの機能を使うことで、同時に作業を実行しても、ホストグループごとに違うパラメータの値を入力することが出来ます。
| このように同じホストグループに属していても、連携するオペレーションを変更することで作業対象のホストを絞って作業を実行することが出来ます。
| 詳しくは :doc:`../../../manuals/host_group/host_group` を参照してください。