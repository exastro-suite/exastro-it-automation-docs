==============
収集・比較機能
==============

| 本シナリオでは、簡単な例として、ユーザー管理を題材に Exastro IT Automation の基本操作を学習します。


作業前システム情報の収集
========================

パラメータシートの作成
----------------------

| まずは、収集機能を使って現在のシステム情報を収集していきましょう。
| 収集機能は、登録された設定値から対象のファイルの値をパラメータシートに登録、更新します。

| 今回利用する Ansible Playbookは以下のPlaybookになります。下記のパラメータが管理できるようにパラメータシートを作成しましょう。

.. code-block:: bash
   :caption: system_collection.yml

   - name: set variable
     set_fact:
       test: "{{ VAR_hostname }}"

   - name: make yaml file
     blockinfile:
       create: yes
       mode: 644
       insertbefore: EOF
       marker: ""
       dest: "/tmp/system.yml"
       content: |
         ansible_architecture              : {{ ansible_architecture }}
         ansible_bios_version              : {{ ansible_bios_version }}
         ansible_default_ipv4__address     : {{ ansible_default_ipv4.address }}
         ansible_default_ipv4__interface   : {{ ansible_default_ipv4.interface }}
         ansible_default_ipv4__network     : {{ ansible_default_ipv4.network }}
         ansible_distribution              : {{ ansible_distribution }}
         ansible_distribution_file_path    : {{ ansible_distribution_file_path }}
         ansible_distribution_file_variety : {{ ansible_distribution_file_variety }}
         ansible_distribution_major_version: {{ ansible_distribution_major_version }}
         ansible_distribution_release      : {{ ansible_distribution_release }}
         ansible_distribution_version      : {{ ansible_distribution_version }}
         ansible_machine                   : {{ ansible_machine }}
         ansible_memtotal_mb               : {{ ansible_memtotal_mb }}
         ansible_nodename                  : {{ ansible_nodename }}
         ansible_os_family                 : {{ ansible_os_family }}
         ansible_pkg_mgr                   : {{ ansible_pkg_mgr }}
         ansible_processor_cores           : {{ ansible_processor_cores }}

   - name: Copy the make yaml file to local
     fetch:
       src: "/tmp/system.yml"
       dest: "{{ __parameter_dir__ }}/{{ inventory_hostname }}/"
       flat: yes


| :menuselection:`パラメータシート作成 --> パラメータシート定義・作成` から、システム情報を収集してくるために、「システム情報」というパラメータシートを作成します。

.. figure:: /images/learn/quickstart/collection/パラメータシート作成1.gif
   :width: 1200px
   :alt: パラメータシート作成

.. list-table:: パラメータシート作成の項目の設定値1
   :widths: 10 10 10 10 10 10 10
   :header-rows: 1

   * - 設定項目
     - 項目1設定値
     - 項目2設定値
     - 項目3設定値
     - 項目4設定値
     - 項目5設定値
     - 項目6設定値
   * - グループ
     -
     -
     - :kbd:`ansible_default_ipv4`
     - :kbd:`ansible_default_ipv4`
     - :kbd:`ansible_default_ipv4`
     -
   * - 項目の名前
     - :kbd:`ansible_architecture`
     - :kbd:`ansible_bios_version`
     - :kbd:`address`
     - :kbd:`interface`
     - :kbd:`network`
     - :kbd:`ansible_distribution`
   * - 項目の名前(Rest API用)
     - :kbd:`ansible_architecture`
     - :kbd:`ansible_bios_version`
     - :kbd:`address`
     - :kbd:`interface`
     - :kbd:`network`
     - :kbd:`ansible_distribution`
   * - 入力方式
     - :kbd:`文字列(単一行)`
     - :kbd:`文字列(単一行)`
     - :kbd:`文字列(単一行)`
     - :kbd:`文字列(単一行)`
     - :kbd:`文字列(単一行)`
     - :kbd:`文字列(単一行)`
   * - 選択項目
     - :kbd:`64`
     - :kbd:`64`
     - :kbd:`64`
     - :kbd:`64`
     - :kbd:`64`
     - :kbd:`64`
   * - 正規表現
     -
     -
     -
     -
     -
     -
   * - 初期値
     -
     -
     -
     -
     -
     -
   * - 必須
     -
     -
     -
     -
     -
     -
   * - 一意制約
     -
     -
     -
     -
     -
     -
   * - 説明
     -
     -
     -
     -
     -
     -
   * - 備考
     -
     -
     -
     -
     -
     -

.. figure:: /images/learn/quickstart/collection/パラメータシート作成2.gif
   :width: 1200px
   :alt: パラメータシート作成

.. list-table:: パラメータシート作成の項目の設定値2
   :widths: 10 10 10 10 10 10 10
   :header-rows: 1

   * - 設定項目
     - 項目7設定値
     - 項目8設定値
     - 項目9設定値
     - 項目10設定値
     - 項目11設定値
     - 項目12設定値
   * - グループ
     -
     -
     -
     -
     -
     -
   * - 項目の名前
     - :kbd:`ansible_distribution_file_path`
     - :kbd:`ansible_distribution_file_variety`
     - :kbd:`ansible_distribution_major_version`
     - :kbd:`ansible_distribution_release`
     - :kbd:`ansible_distribution_version`
     - :kbd:`ansible_machine`
   * - 項目の名前(Rest API用)
     - :kbd:`ansible_distribution_file_path`
     - :kbd:`ansible_distribution_file_variety`
     - :kbd:`ansible_distribution_major_version`
     - :kbd:`ansible_distribution_release`
     - :kbd:`ansible_distribution_version`
     - :kbd:`ansible_machine`
   * - 入力方式
     - :kbd:`文字列(単一行)`
     - :kbd:`文字列(単一行)`
     - :kbd:`文字列(単一行)`
     - :kbd:`文字列(単一行)`
     - :kbd:`文字列(単一行)`
     - :kbd:`文字列(単一行)`
   * - 選択項目
     - :kbd:`64`
     - :kbd:`64`
     - :kbd:`64`
     - :kbd:`64`
     - :kbd:`64`
     - :kbd:`64`
   * - 正規表現
     -
     -
     -
     -
     -
     -
   * - 初期値
     -
     -
     -
     -
     -
     -
   * - 必須
     -
     -
     -
     -
     -
     -
   * - 一意制約
     -
     -
     -
     -
     -
     -
   * - 説明
     -
     -
     -
     -
     -
     -
   * - 備考
     -
     -
     -
     -
     -
     -

.. figure:: /images/learn/quickstart/collection/パラメータシート作成3.gif
   :width: 1200px
   :alt: パラメータシート作成

.. list-table:: パラメータシート作成の項目の設定値3
   :widths: 10 10 10 10 10 10
   :header-rows: 1

   * - 設定項目
     - 項目13設定値
     - 項目14設定値
     - 項目15設定値
     - 項目16設定値
     - 項目17設定値
   * - グループ
     -
     -
     -
     -
     -
   * - 項目の名前
     - :kbd:`ansible_memtotal_mb`
     - :kbd:`ansible_nodename`
     - :kbd:`ansible_os_family`
     - :kbd:`ansible_pkg_mgr`
     - :kbd:`ansible_processor_cores`
   * - 項目の名前(Rest API用)
     - :kbd:`ansible_memtotal_mb`
     - :kbd:`ansible_nodename`
     - :kbd:`ansible_os_family`
     - :kbd:`ansible_pkg_mgr`
     - :kbd:`ansible_processor_cores`
   * - 入力方式
     - :kbd:`文字列(単一行)`
     - :kbd:`文字列(単一行)`
     - :kbd:`文字列(単一行)`
     - :kbd:`文字列(単一行)`
     - :kbd:`文字列(単一行)`
   * - 選択項目
     - :kbd:`64`
     - :kbd:`64`
     - :kbd:`64`
     - :kbd:`64`
     - :kbd:`64`
   * - 正規表現
     -
     -
     -
     -
     -
   * - 初期値
     -
     -
     -
     -
     -
   * - 必須
     -
     -
     -
     -
     -
   * - 一意制約
     -
     -
     -
     -
     -
   * - 説明
     -
     -
     -
     -
     -
   * - 備考
     -
     -
     -
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
     - :kbd:`システム情報`
   * - パラメータシート名(REST)
     - :kbd:`system_information`
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

| 次に、:menuselection:`パラメータシート作成 --> パラメータシート定義・作成` から、Ansibleを実行するために必要となる、「ホスト名紐付け用」というパラメータシートを作成します。

.. figure:: /images/learn/quickstart/collection/パラメータシート作成.png
   :width: 1200px
   :alt: パラメータシート作成

.. list-table:: パラメータシート作成(ホスト名紐付け用)の項目の設定値
   :widths: 10 10
   :header-rows: 1

   * - 設定項目
     - 項目1設定値
   * - 項目の名前
     - :kbd:`hostname`
   * - 項目の名前(Rest API用)
     - :kbd:`hostname`
   * - 入力方式
     - :kbd:`プルダウン選択`
   * - 選択項目
     - :kbd:`Ansible項目:機器一覧:ホスト名`
   * - 参照項目
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

.. list-table:: パラメータシート作成(ホスト名紐付け用)のパラメータシート作成情報の設定値
   :widths: 5 10
   :header-rows: 1

   * - 設定項目
     - 設定値
   * - 項番
     - (自動入力)
   * - パラメータシート名
     - :kbd:`ホスト名紐付け用`
   * - パラメータシート名(REST)
     - :kbd:`host_association`
   * - 作成対象
     - :kbd:`パラメータシート（ホスト/オペレーションあり）`
   * - 表示順序
     - :kbd:`2`
   * - バンドル利用
     - 「利用する」にチェックを入れない(無効)
   * - 最終更新日時
     - (自動入力)
   * - 最終更新者
     - (自動入力)

作業手順の登録
--------------

| 作業手順を登録するために、Exastro IT Automation で扱う作業単位である Movement (ジョブ)を定義します。
| 定義した Movement に対して、Ansible Playbook の紐付けを行います。

| :menuselection:`Ansible-Legacy --> Movement一覧` から、システム情報収集のための Movement を登録します。

.. figure:: /images/learn/quickstart/collection/Movement登録.png
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
   * - :kbd:`システム情報収集`
     - :kbd:`IP`
     - :kbd:`※ヘッダーセクションを参照`

.. code-block:: bash
   :caption: ヘッダーセクション

   - hosts: all
     remote_user: "{{ __loginuser__ }}"
     gather_facts: yes
     become: yes

Ansible Playbook 登録
---------------------

| Ansible Playbook の登録を行います。Ansible Playbook は運用手順書内に記載されたコマンドに該当します。
| 本シナリオでは system_collection.yml を使用します。

.. code-block:: bash
   :caption: system_collection.yml

   - name: set variable
     set_fact:
       test: "{{ VAR_hostname }}"

   - name: make yaml file
     blockinfile:
       create: yes
       mode: 644
       insertbefore: EOF
       marker: ""
       dest: "/tmp/system.yml"
       content: |
         ansible_architecture              : {{ ansible_architecture }}
         ansible_bios_version              : {{ ansible_bios_version }}
         ansible_default_ipv4__address     : {{ ansible_default_ipv4.address }}
         ansible_default_ipv4__interface   : {{ ansible_default_ipv4.interface }}
         ansible_default_ipv4__network     : {{ ansible_default_ipv4.network }}
         ansible_distribution              : {{ ansible_distribution }}
         ansible_distribution_file_path    : {{ ansible_distribution_file_path }}
         ansible_distribution_file_variety : {{ ansible_distribution_file_variety }}
         ansible_distribution_major_version: {{ ansible_distribution_major_version }}
         ansible_distribution_release      : {{ ansible_distribution_release }}
         ansible_distribution_version      : {{ ansible_distribution_version }}
         ansible_machine                   : {{ ansible_machine }}
         ansible_memtotal_mb               : {{ ansible_memtotal_mb }}
         ansible_nodename                  : {{ ansible_nodename }}
         ansible_os_family                 : {{ ansible_os_family }}
         ansible_pkg_mgr                   : {{ ansible_pkg_mgr }}
         ansible_processor_cores           : {{ ansible_processor_cores }}

   - name: Copy the make yaml file to local
     fetch:
       src: "/tmp/system.yml"
       dest: "{{ __parameter_dir__ }}/{{ inventory_hostname }}/"
       flat: yes

| :menuselection:`Ansible-Legacy --> Playbook素材集` から、上記のPlaybookを登録します。

.. figure:: /images/learn/quickstart/collection/Playbook素材集.png
   :width: 1200px
   :alt: Playbook登録

.. list-table:: Ansible Playbook 情報の登録
  :widths: 10 15
  :header-rows: 1

  * - Playbook素材名
    - Playbook素材
  * - :kbd:`system_collection`
    - :file:`system_collection.yml`

Movement と Ansible Playbook の紐付け
-------------------------------------

| :menuselection:`Ansible-Legacy --> Movement-ロール紐付` から、Movement と Ansible Playbook の紐付けを行います。
| 本シナリオでは、 system_collection.yml を利用します。

.. figure:: /images/learn/quickstart/collection/Movement-Playbook紐付.png
   :width: 1200px
   :alt: Movement-Playbook紐付け

.. list-table:: Movement-Playbook紐付け情報の登録
  :widths: 10 10 10
  :header-rows: 1

  * - Movement名
    - Playbook素材
    - インクルード順序
  * - :kbd:`システム情報収集`
    - :kbd:`system_collection`
    - :kbd:`1`

パラメータシートの項目と Ansible Playbook の変数の紐付け
--------------------------------------------------------

| system_collection.ymlでは、:kbd:`VAR_hostname` にシステム情報を収集したい作業対象ホストを入れます。

| :menuselection:`Ansible-Legacy --> 代入値自動登録設定` から、パラメータシートの項目と Ansible Playbook の変数の紐付けを行います。

.. figure:: /images/learn/quickstart/collection/代入値自動登録設定.png
   :width: 1200px
   :alt: 代入値自動登録設定

.. list-table:: グループの代入値自動登録設定の設定値
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
  * - :kbd:`代入値自動登録用:ホスト紐付け用:パラメータ/hostname`
    - :kbd:`入力無し`
    - :kbd:`Value型`
    - :kbd:`システム情報収集`
    - :kbd:`システム情報収集:VAR_hostname`
    - :kbd:`入力無し`

収集項目値管理
--------------

| 収集項目値管理 にて、作業実行結果（ソースファイル）とパラメータシートの項目の紐づけ設定がされていないと、収集機能は動作しません。

| :menuselection:`Ansible共通 --> 収集項目値管理` から、ソースファイルとパラメータシートの項目の紐付情報の登録をします。

.. figure:: /images/learn/quickstart/collection/収集項目値管理.gif
   :width: 1200px
   :alt: 収集項目値管理

.. list-table:: 収集項目値管理の設定値
  :widths: 10 10 10 20
  :header-rows: 2

  * - 収集項目(From)
    -
    -
    - パラメータシート(To)
  * - バース形式
    - PREFIX(ファイル名)
    - 変数名
    - メニューグループ:項目
  * - :kbd:`YAML`
    - :kbd:`system`
    - :kbd:`ansible_architecture`
    - :kbd:`入力用:システム情報:パラメータ/ansible_architecture`
  * - :kbd:`YAML`
    - :kbd:`system`
    - :kbd:`ansible_bios_version`
    - :kbd:`入力用:システム情報:パラメータ/ansible_bios_version`
  * - :kbd:`YAML`
    - :kbd:`system`
    - :kbd:`ansible_default_ipv4__address`
    - :kbd:`入力用:システム情報:パラメータ/ansible_default_ipv4/address`
  * - :kbd:`YAML`
    - :kbd:`system`
    - :kbd:`ansible_default_ipv4__interface`
    - :kbd:`入力用:システム情報:パラメータ/ansible_default_ipv4/interface`
  * - :kbd:`YAML`
    - :kbd:`system`
    - :kbd:`ansible_default_ipv4__network`
    - :kbd:`入力用:システム情報:パラメータ/ansible_default_ipv4/network`
  * - :kbd:`YAML`
    - :kbd:`system`
    - :kbd:`ansible_distribution`
    - :kbd:`入力用:システム情報:パラメータ/ansible_distribution`
  * - :kbd:`YAML`
    - :kbd:`system`
    - :kbd:`ansible_distribution_file_path`
    - :kbd:`入力用:システム情報:パラメータ/ansible_distribution_file_path`
  * - :kbd:`YAML`
    - :kbd:`system`
    - :kbd:`ansible_distribution_file_variety`
    - :kbd:`入力用:システム情報:パラメータ/ansible_distribution_file_variety`
  * - :kbd:`YAML`
    - :kbd:`system`
    - :kbd:`ansible_distribution_major_version`
    - :kbd:`入力用:システム情報:パラメータ/ansible_distribution_major_version`
  * - :kbd:`YAML`
    - :kbd:`system`
    - :kbd:`ansible_distribution_release`
    - :kbd:`入力用:システム情報:パラメータ/ansible_distribution_release`
  * - :kbd:`YAML`
    - :kbd:`system`
    - :kbd:`ansible_distribution_version`
    - :kbd:`入力用:システム情報:パラメータ/ansible_distribution_version`
  * - :kbd:`YAML`
    - :kbd:`system`
    - :kbd:`ansible_machine`
    - :kbd:`入力用:システム情報:パラメータ/ansible_machine`
  * - :kbd:`YAML`
    - :kbd:`system`
    - :kbd:`ansible_memtotal_mb`
    - :kbd:`入力用:システム情報:パラメータ/ansible_memtotal_mb`
  * - :kbd:`YAML`
    - :kbd:`system`
    - :kbd:`ansible_nodename`
    - :kbd:`入力用:システム情報:パラメータ/ansible_nodename`
  * - :kbd:`YAML`
    - :kbd:`system`
    - :kbd:`ansible_os_family`
    - :kbd:`入力用:システム情報:パラメータ/ansible_os_family`
  * - :kbd:`YAML`
    - :kbd:`system`
    - :kbd:`ansible_pkg_mgr`
    - :kbd:`入力用:システム情報:パラメータ/ansible_pkg_mgr`
  * - :kbd:`YAML`
    - :kbd:`system`
    - :kbd:`ansible_processor_cores`
    - :kbd:`入力用:システム情報:パラメータ/ansible_processor_cores`

| 登録する件数が多いので、ファイル一括登録（Excel）から登録するのを推奨します。

作業対象の登録
--------------

| 作業を行う対象機器を登録します。

機器登録
--------

| 作業対象となるサーバを機器一覧に登録します。

| :menuselection:`Ansible共通 --> 機器一覧` から、作業対象であるサーバーの接続情報を登録します。

.. figure:: /images/learn/quickstart/collection/機器一覧登録設定.gif
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

システム情報収集作業の実施
--------------------------

| まずは、いつ、どこの機器に対して、何を、どうするかといった情報を簡単に整理しておきましょう。

.. list-table:: 作業の方針
   :widths: 10 10
   :header-rows: 0

   * - 作業実施日時
     - 2024/04/01 12:00:00
   * - 作業対象
     - server01(RHEL8)
   * - 作業内容
     - 作業前データ収集


作業概要登録
------------

| オペレーション登録では、作業を実施する際の作業概要を定義します。
| 先に決めた作業の方針を元にオペレーション情報を記入しましょう。

| :menuselection:`基本コンソール --> オペレーション一覧` から、作業実施日時や作業名を登録します。

.. figure:: /images/learn/quickstart/collection/作業前オペレーション登録.png
   :width: 1200px
   :alt: オペレーション登録

.. list-table:: オペレーション登録内容
   :widths: 10 10
   :header-rows: 1

   * - オペレーション名
     - 実施予定日時
   * - :kbd:`作業前データ収集`
     - :kbd:`2024/04/01 12:00:00`

.. tip::
   | 作業実施日時は、本シナリオでは適当な日時で問題ありませんが、作業日が定まっている場合は、正確な作業実施の予定日時を設定することを推奨します。
   | 定期作業などの繰り返し行われる作業のように、作業日が定まっていない場合は現在の日時を登録しても問題ありません。

パラメータ設定
--------------

| 作成したパラメータシートに作業対象ホストとオペレーションを登録します。

| :menuselection:`入力用 --> ホスト名紐付け用` から、作業対象ホストとオペレーションとパラメータを登録します。

.. figure:: /images/learn/quickstart/collection/作業前パラメータ入力.png
   :width: 1200px
   :alt: 作業前のパラメータ登録

.. list-table:: 作業前システム情報の設定値
  :widths: 5 15 5
  :header-rows: 2

  * - ホスト名
    - オペレーション
    - パラメータ
  * -
    - オペレーション名
    - hostname
  * - :kbd:`server01`
    - :kbd:`2024/04/01 12:00:00_作業前データ収集`
    - :kbd:`server01`

作業実行
--------

1. 作業実行

   | :menuselection:`Ansible-Legacy --> 作業実行` から、:kbd:`システム情報収集` Movement を選択し、:guilabel:` 作業実行` を押下します。
   | 次に、:menuselection:`作業実行設定` で、オペレーションに :kbd:`作業前データ収集` を選択し、:guilabel:`作業実行` を押下します。

   | :menuselection:`作業状態確認` 画面が開き、実行が完了した後に、ステータスが「完了」になったことを確認します。

.. figure:: /images/learn/quickstart/collection/変更前収集作業実行.png
   :width: 1200px
   :alt: 作業実行

2. 事後確認

   | :menuselection:`入力用 --> システム情報` から、パラメータの入力情報を確認しましょう。
   | パラメータシート作成・定義で作成した、システム情報のパラメータが問題なく入力されているか確認しましょう。
   | また、この後の比較作業で実施日時を入力する必要があるので、:menuselection:`基本コンソール --> オペレーション一覧` から、実施した日付を確認しておきましょう。

ホスト名変更
============

| それでは次に、今収集したシステム情報の1部を変更してみましょう。
| 今回は簡単なホスト名(ansible_nodename)の変更をしてみましょう。ホスト名の変更については :doc:`クイックスタート <../quickstart/index>` を参照して任意のホスト名に変更しましょう。今回のシナリオではシステムのホスト名を admin_user に変更してこれ以降の作業を実施していきます。

作業後システム情報の収集
========================

| それではホスト名を変更した後(作業後)のシステム情報を収集していきましょう。
| 作業前とホスト名に変更が出ていますので、新しくオペレーションを作成し、新しいオペレーションと紐付いたパラメータを作成しましょう。

作業概要登録(実践)
------------------

| :menuselection:`基本コンソール --> オペレーション一覧` から、作業実施日時や作業名を登録します。

.. figure:: /images/learn/quickstart/collection/作業後オペレーション登録.png
   :width: 1200px
   :alt: オペレーション登録

.. list-table:: オペレーション登録内容
   :widths: 15 10
   :header-rows: 1

   * - オペレーション名
     - 実施予定日時
   * - :kbd:`作業後データ収集`
     - :kbd:`2024/05/01 12:00:00`

パラメータ設定(実践)
--------------------

| :menuselection:`入力用 --> ホスト名紐付け用` から、作業対象ホストとオペレーションとパラメータを登録します。

.. figure:: /images/learn/quickstart/collection/作業後パラメータ入力.png
   :width: 1200px
   :alt: 作業後のパラメータ登録

.. list-table:: 作業後システム情報の設定値
  :widths: 5 15 5
  :header-rows: 2

  * - ホスト名
    - オペレーション
    - パラメータ
  * -
    - オペレーション名
    - hostname
  * - :kbd:`admin_user`
    - :kbd:`2024/05/01 12:00:00_作業後データ収集`
    - :kbd:`admin_user`

作業実行(実践)
--------------

1. 作業実行

   | :menuselection:`Ansible-Legacy --> 作業実行` から、:kbd:`システム情報収集` Movement を選択し、:guilabel:` 作業実行` を押下します。
   | 次に、:menuselection:`作業実行設定` で、オペレーションに :kbd:`作業後データ収集` を選択し、:guilabel:`作業実行` を押下します。

   | :menuselection:`作業状態確認` 画面が開き、実行が完了した後に、ステータスが「完了」になったことを確認します。

.. figure:: /images/learn/quickstart/collection/変更後収集作業実行.png
   :width: 1200px
   :alt: 作業実行

2. 事後確認

   | :menuselection:`入力用 --> システム情報` から、パラメータの入力情報を確認しましょう。
   | パラメータシート作成・定義で作成した、システム情報のパラメータが問題なく入力されているか確認しましょう。
   | 問題なくシステム情報が収集出来ていれば、ホスト名変更前と変更後の2つのパラメータが入力されています。
   | また、この後の比較作業で実施日時を入力する必要があるので、:menuselection:`基本コンソール --> オペレーション一覧` から、実施した日付を確認しておきましょう。

システム情報の比較
==================

| それでは次に比較機能を使って、ホスト名変更前と変更後の収集データを比較して、結果にどのような差異が出ているのかを見てみましょう。

比較設定
--------

| パラメータの比較をする為に、まずは比較設定をしていきましょう。
| :menuselection:`比較 --> 比較設定` から、比較対象のパラメータを選択しましょう。

.. figure:: /images/learn/quickstart/collection/比較設定.png
   :width: 1200px
   :alt: 比較設定

.. list-table:: 比較設定
  :widths: 5 10 10 5 5
  :header-rows: 1

  * - 比較名称
    - 対象パラメータシート1
    - 対象パラメータシート2
    - 詳細設定フラグ
    - 備考
  * - :kbd:`システム情報の差異`
    - :kbd:`システム情報`
    - :kbd:`システム情報`
    - :kbd:`False`
    -

| 詳細設定フラグを設定すると、比較詳細設定を設定出来るようになります。
| 特定のパラメータのみ確認したい場合は詳細設定フラグをTrueにすると、特定のパラメータのみ比較出来るようになります。

比較実行
--------

| それでは比較機能を実行していきましょう。
| :menuselection:`比較 --> 比較実行` から、比較対象のパラメータを選択しましょう。

   | :menuselection:`比較実行 --> 比較設定選択` から、:kbd:`システム情報の差異` 比較設定 を選択し、次に :guilabel:` 対象ホスト` を選択し対象のホストを選択します。
   | 次に、比較対象のパラメータシートを実施した日時をそれぞれ入力、選択します。実施した日時は :menuselection:`入力用 --> システム情報` から最終実行日時を確認してみてください。
   | 最後に、:menuselection:`比較実行` を押下します。

   | そうすると画面右側に比較結果が表示されますので、そちらから先ほど変更したホスト名(ansible_nodename)の欄を確認してみましょう。すると、変更前に収集したパラメータと変更後に収集したパラメータの差異が出ているのが確認できると思います。

.. figure:: /images/learn/quickstart/collection/比較実行.png
   :width: 1200px
   :alt: 比較設定1

.. figure:: /images/learn/quickstart/collection/比較実行2.png
   :width: 1200px
   :alt: 比較設定2

.. list-table:: 比較実行
  :widths: 10 10 10 10
  :header-rows: 1

  * - 比較設定選択
    - ホスト選択
    - 基準日時1
    - 基準日時2
  * - :kbd:`システム情報の差異`
    - :kbd:`admin_user`
    - :kbd:`※例→2024/08/23 15:24:09`
    - :kbd:`※例→2024/08/23 15:31:39`

.. tip::
   | 基準日時は実際の最終更新日時を入力してください。

まとめ
======

| 本シナリオでは、システム情報を変更する前と後のデータを収集し、それらの収集してきたデータを比較するというシナリオで収集比較機能を学習しました。
| 収集機能を使うと、対象サーバのシステム情報を収集することができ、比較機能を使うと、パラメータシートで作成した項目の設定値の比較を行うことが出来ます。
| 比較機能を上手く使うと、パラメータシートの項目の設定値を簡単に管理することが出来ます。
| より詳細な情報を知りたい場合は、:doc:`../../../manuals/index` を参照してください。
