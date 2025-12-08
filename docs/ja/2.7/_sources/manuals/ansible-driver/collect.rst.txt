========
収集機能
========

はじめに
========

| 本書では、ITAの収集機能および操作方法について説明します。

収集機能概要
============

| 本章では収集機能について説明します。

収集機能について
----------------

| 収集機能とは、ITAで実施した、作業実行結果（規定のフォーマットで出力されたソースファイル）を元に、パラメータシートへ値を自動で登録する機能です。
| 本機能は、Ansible-Driverを対象としています。
| Ansibleの詳細情報については、「Ansibleの製品マニュアル」を参照してください。
| Ansible-Driverの詳細については、「:doc:`./index`」を参照してください。
| パラメータシートの詳細については、「:doc:`../create_param/menu_creation`」を参照してください。

収集機能概要図
~~~~~~~~~~~~~~
| 以下は、収集機能実行までの全体の概要図です。

.. _overview_all:

.. figure:: /images/ja/ansible_common/collect_flow/overview_all.drawio.png
   :width: 6.67391in
   :height: 3.20028in
   :align: left
   :alt: 収集機能概要図

   収集機能概要図

収集機能データ登録処理概要図
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| 以下は、収集機能のデータ登録処理の概要図です。
| ファイル格納先、収集項目値管理の設定値に従い、パラメータシートへの登録、更新を行います。

.. figure:: /images/ja/ansible_common/collect_flow/overview_process.drawio.png
   :width: 6.67391in
   :height: 3.20028in
   :align: left
   :alt: 収集機能データ登録処理概要図

   収集機能データ登録処理概要図

.. tip:: | ※収集機能のデータ型の取り扱い例については、「 :ref:`about_values_for_collected_files` 」をご参照ください。

パラメータシートへの登録方法について
------------------------------------

| 収集機能は、登録された設定値から対象のファイルの値をパラメータシートに登録、更新します。

収集機能の動作要件
~~~~~~~~~~~~~~~~~~

| ITAで以下の設定がされている必要があります。

- | :menuselection:`パラメータシート定義・作成` にて、パラメータシート（ホスト/オペレーションあり）が作成されている
- | :menuselection:`収集項目値管理` にて、作業実行結果（ソースファイル）とパラメータシートの項目と紐づけ設定がされている
- | 収集対象機器（ホスト名）が、機器一覧に登録済み

| 作業実行後に、以下の状態である場合、パラメータシートへの登録を実施します。

- | 作業実行の結果、正常に完了している
- | 作業実行の出力結果として、規定の構造でディレクトリ、ファイルが配置されている

.. note:: | パラメータシートへの登録元となるソースファイルを生成するIaC（Playbook、Role）については、各ユーザー様で準備する必要があります。
          | 参考： Ansible Playbook Collection（OS設定収集）
          | https://github.com/exastro-suite/playbook-collection-docs/blob/master/README.ja.md

収集機能でのディレクトリ、ファイル構造、変数取り扱い
====================================================

| 本章では収集機能で扱うディレクトリ、ファイル構造、変数について説明します。

.. _target_directory_file_structure:

収集対象ディレクトリ、ファイル構造
----------------------------------

1.  収集対象のファイルフォーマット

    .. code-block:: bash
       :caption: Yaml形式で出力されたファイル

       ■ファイル名：RH_snmp.yml
       ■ファイルの内容：
       VAR_RH_sshd_config:
         - key: PermitRootLogin
           value: yes
         - key: PasswordAuthentication
           value: no


2.  収集対象ディレクトリ構造

| 収集対象ディレクトリについて、収集対象ディレクトリパス（ソースファイルの出力先として）をIaC(Playbook,Role)内にて、で以下の変数として扱えます。

.. _table_ita_original_variable:
.. list-table:: 収集機能対象ディレクトリITA独自変数
   :widths: 10 15 3
   :header-rows: 1
   :align: left

   * - ITA独自変数
     - 変数指定内容
     - 備考
   * - __parameter_dir__
     -  作業結果ディレクトリ配下の「_parameters」のパスへ変換されます。
     -
   * - __parameters_file_dir__
     -  作業結果ディレクトリ配下の「_parameters_file」のパスへ変換されます。
     -
   * -  __parameters_dir_for_epc__
     -  作業ディレクトリ配下の「_parameters」のパスへ変換されます。
     -
   * - __parameters_file_dir_for_epc__
     -  作業ディレクトリ配下の「_parameters_file」のパスへ変換されます。
     -

| 収集対象のディレクトリ（_parameters）の上位ディレクトリのパスについて、Ansible-Driverの実行モード、実施した作業Noに依存します。

.. code-block:: text
   :caption: 収集対象ディレクトリパス

   |-  _parameters           ※1
   |   |-  localhost         ※2
   |       |-  SAMPLE.yml    ※3
   |-  _parameters_file      ※4
   |   |-  localhost         ※2
           |-  test.txt      ※5

| ※上位ディレクトリのパス以降の階層構造

- | 備考
  | ※1 収集対象ディレクトリ（名称固定）
  | ※2 ホスト名（機器一覧に登録されているものが収集対象）
  | ※3 収集対象ファイル
  | ※4 収集対象ディレクトリファイルアップロード用（名称固定）
  | ※5 ファイルアップロード対象ファイル


.. note:: | ソースファイルを生成するPlaybookを作成する際の出力先について、「:ref:`table_ita_original_variable`」を使用しない場合、以下の構造を認識してPlaybookを記述する必要があります。


.. list-table:: Ansible-Driverモード別上位ディレクトリパス
   :widths: 5 5 15 3
   :header-rows: 1
   :align: left

   * - モード
     - モード別識別子
     - 階層構造
     - 備考
   * - Ansible-Legacy
     - legacy
     - /<上位ディレクトリ(Ansible）>/legacy/
     -
   * - Ansible-Pioneer
     - pioneer
     - /<上位ディレクトリ(Ansible）>/pioneer/
     -
   * - Ansible-LegacyRole
     - legacy_role
     - /<上位ディレクトリ(Ansible）>/legacy_role/
     -

.. note:: | ※上位ディレクトリ(Ansible）は、 :file:`/storage/<Organization>/<Workspace>/driver/ansible/` です。


| ■　e.g.) 収集対象ファイルのファイルパス、ディレクトリ構造

.. code-block:: bash
   :caption: 収集対象ファイルのファイルパス、ディレクトリ構造

   実行モード： Ansible-Legacy
   作業No： 00000000-0000-0000-0000-000000000001
   対象ホスト： localhost
   作業実行ディレクトリ    ： /storage/Organization/Workspace/driver/ansible/legacy/00000000-0000-0000-0000-000000000001/in/
   作業実行結果ディレクトリ： /storage/Organization/Workspace/driver/ansible/legacy/00000000-0000-0000-0000-000000000001/out/
   収集対象ファイルパス、ディレクトリ構造：
     - /storage/Organization/Workspace/driver/ansible/legacy/00000000-0000-0000-0000-000000000001/in/_parameters/localhost/SAMPLE.yml
     - /storage/Organization/Workspace/driver/ansible/legacy/00000000-0000-0000-0000-000000000001/in/_parameters/localhost/OS/RH_snmpd.yml
     - /storage/Organization/Workspace/driver/ansible/legacy/00000000-0000-0000-0000-000000000001/in/_parameters_file/localhost/TEST.txt
     - /storage/Organization/Workspace/driver/ansible/legacy/00000000-0000-0000-0000-000000000001/out/_parameters/localhost/SAMPLE.yml
     - /storage/Organization/Workspace/driver/ansible/legacy/00000000-0000-0000-0000-000000000001/out/_parameters/localhost/OS/RH_snmpd.yml
     - /storage/Organization/Workspace/driver/ansible/legacy/00000000-0000-0000-0000-000000000001/out/_parameters_file/localhost/TEST.txt


| ファイルアップロード項目のパラメータシートを収集対象とする場合、ソースファイルの変数の値（ファイル名/ファイルパス）と該当するファイルが、_parameters_file配下に配置されている必要があります。
| 収集項目値管理の設定は、「収集項目値管理」参照してください。
| ファイルアップロードの最大ファイルサイズについて、「:doc:`../create_param/menu_creation`」を参照してください。
| \_parameters_file配下に配置されているアップロード対象ファイルの指定方法として、以下の記載方法があります。


.. list-table:: アップロード対象ファイルの指定方法
   :widths: 5 15 3
   :header-rows: 1
   :align: left

   * - 指定方式
     - YAMLファイルへの記載方法
     - 備考
   * - ファイル名指定
     - VAR_FILE_NAME : <‘ファイル名> ’
     -
   * - ファイルパス指定 (後方一致)
     - VAR_FILE_NAME : ‘/<階層X>/<ファイル名>’
     -

..   * - ファイルパス指定 (完全一致)
     - VAR_FILE_NAME : ‘/<上位ディレクトリ>/_parameters_file/localhost/<階層X>/<ファイル名>’
     -

.. tip:: | ファイル名指定時、該当するファイルが複数存在する場合、対象となるファイルは、ランダムとなります。
         | ファイルパス指定(後方一致)時、該当するファイルが複数ある場合、対象となるファイルは、ランダムとなります。

..       | ファイルパス指定(完全一致)時、該当するパスにあるファイルとなります。

| ■　e.g.) 通常変数の構造の変数の場合のディレクトリ構造とソースファイルの内容

.. code-block:: text
   :caption: 通常変数の構造の変数の場合のディレクトリ構造とソースファイルの内容

    ■構造
    【上位ディレクトリ】
       |-  _parameters
       |   |-  localhost
       |       |-  SAMPLE.yml             ※ソースファイル
       |-  _parameters_file
       |   |-  localhost
       |      |-  test.txt                ※アップロード対象ファイル
       |      |-  APP001
                 |-  config               ※アップロード対象ファイル
    ■収集対象ファイル名：SAMPLE.yml
    ■ファイルの内容
    VAR_upload_file: test.txt
    VAR_upload_fileX: config
    VAR_upload_fileZ: '/APP001/config'

..    VAR_upload_fileY: '/<上位ディレクトリ>/_parameters_file/localhost/APP001/config'

取り扱う変数と種類
------------------

| 収集機能で扱うソースファイル内で扱える変数は以下の3種類があります。

- | 通常変数
  |  変数名に対して具体値を1つ定義できる変数です。

.. code-block:: yaml
   :caption: 通常変数の場合

   VAR_users: root

- | 複数具体値変数
  |  変数名に対して具体値を複数定義できる変数です。

.. code-block:: yaml
   :caption: 複数具体値の構造の変数の場合

    VAR_users:
      - root
      - mysql

- | 多段変数
  |  階層化された変数です。

.. code-block:: yaml
   :caption: 多段変数の構造の変数の場合

    VAR_users:
       - user-name: alice      #メンバ変数
         authorized: password

.. tip::
         | 変数名は、下記の7文字を除くascii文字\(0x20～0x7e)が使用出来ます。
         |  " . [ ] ' \\ :
         | 尚、クォーテーションで囲まないと変数名の先頭に使用出来ない文字がいくつかあります。
         | 詳しくは、Ansibleドキュメント `Yamlsyntax <https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html#gotchas>`__\ を参照下さい。


収集機能 メニュー構成
=====================

| 本章では、収集機能のメニュー構成について説明します。

メニュー/画面一覧
-----------------

#. | :menuselection:`Ansible共通` のメニュー
   | :menuselection:`Ansible共通` のメニュー一覧を以下に記述します。

.. list-table:: Ansible共通 メニュー/画面一覧
   :header-rows: 1
   :align: left

   * - No
     - メニューグループ
     - メニュー・画面
     - 説明
   * - 1
     - Ansible共通
     - 収集項目値管理
     - | 作業実行の出力結果（ソースファイル）と、パラメータシートの項目の紐づけ設定を行い、
       | 収集機能で登録する対象パラメータを管理します。

.. figure:: /images/ja/ansible_common/collect_flow/collected_item_value_list.png
   :width: 6.67391in
   :height: 3.20028in
   :align: left
   :alt: 設定項目値管理画面

   設定項目値管理画面


#. | Ansible driver メニュー
   | Ansible driverの各メニューグループに対応するメニュー一覧を以下に記述します。

.. list-table:: Ansible driver メニュー/画面一覧
   :header-rows: 1
   :align: left

   * - No
     - メニューグループ
     - メニュー・画面
     - 説明
   * - 1
     - Ansible-Legacy
     - 作業管理
     - 作業実行履歴を管理します。収集機能によるパラメータシートの登録状況、実行ログを参照します。
   * - 2
     - Ansible-LegacyRole
     - 作業管理
     - 作業実行履歴を管理します。収集機能によるパラメータシートの登録状況、実行ログを参照します。
   * - 3
     - Ansible-Pioneer
     - 作業管理
     - 作業実行履歴を管理します。収集機能によるパラメータシートの登録状況、実行ログを参照します。

.. figure:: /images/ja/ansible_common/collect_flow/execution_list_legacy.png
   :width: 6.67391in
   :height: 3.20028in
   :align: left
   :alt: 作業管理画面

   作業管理画面


収集機能の利用手順
==================

| 収集機能の利用手順について説明します

作業フロー
----------

| 収集機能の実施における標準的なフローは以下のとおりです。
| ITA Ansible-Driverの利用方法は、「:doc:`./index`」を参照してください。
| ITA 基本コンソールの利用方法は、「:doc:`../it_automation_base/basic_console`」を参照してください。



収集機能作業フロー
~~~~~~~~~~~~~~~~~~

| 以下は、Ansibleで作業を実行し、パラメータシートへ収集するまでの流れです。

-  作業フロー詳細と参照先

   #. | パラメータシート（ホスト/オペレーションあり）の作成
      | :menuselection:`パラメータシート作成` の :menuselection:`パラメータシート定義・作成` の画面からのパラメータシートを作成します。
      | 詳細は「:doc:`../create_param/menu_creation`」を参照してください。

   #. | :menuselection:`収集項目値管理` の登録
      | :menuselection:`Ansible共通` の :menuselection:`収集項目値管理` の画面から、ソースファイルとパラメータシートの項目の紐付情報の登録をします。
      | 詳細は「:ref:`about_collected_item_value_list`」を参照してください。

   #. | 作業準備
      | 作業実行のための準備を行います。
      | 詳細は、「:doc:`./index`」 、「:doc:`../it_automation_base/conductor`」を参照してください。

   #. | 作業実行
      | 実行日時、投入オペレーション、Movement、ワークフローを選択し処理の実行を指示します。
      | 実行について「:doc:`./index`」 、「:doc:`../it_automation_base/conductor`」を参照してください。

   #. | 収集機能実行
      | 作業実行が完了した作業Noを収集機能の対象として、パラメータシートへの登録処理を実施します。
      | 詳細は「:ref:`about_backyard`」を参照してください。

   #. | 収集状況確認
      | 「:menuselection:`Ansible-Legacy` 」/「:menuselection:`Ansible-Pioneer` 」/「:menuselection:`Ansible-LegacyRole` 」の :menuselection:`作業管理` の画面では、完了した作業の収集状態の確認、ログファイルがDL可能です。
      | 詳細は「:ref:`about_collect_status`」を参照してください。


収集機能・操作方法説明
======================

| 本章では、収集機能で利用するメニューの機能について説明します。
| 登録方法の詳細は、関連マニュアルの「:doc:`../it_automation_base/basic_console`」をご参照下さい。

Ansible 共通
----------------------

| 本節では、:menuselection:`Ansible共通` での操作について記載します。


.. _about_collected_item_value_list:

収集項目値管理
~~~~~~~~~~~~~~

#. | :menuselection:`収集項目値管理` では、収集項目とパラメータシートの項目の紐付設定を行います。

   .. figure:: /images/ja/ansible_common/collect_flow/submenu_collected_item_value_list.png
      :width: 6.67391in
      :height: 3.20028in
      :align: left
      :alt: サブメニュー画面（収集項目値管理）

      サブメニュー画面（収集項目値管理）

#. | :menuselection:`一覧 --> 登録 or 編集` より、収集項目の登録を行います。

   .. figure:: /images/ja/ansible_common/collect_flow/edit_collected_item_value_list.png
      :width: 6.67391in
      :height: 3.20028in
      :align: left
      :alt: 登録、編集画面（収集項目値管理）

      登録、編集画面（収集項目値管理）


#. | :menuselection:`収集項目値管理` 画面の項目一覧は以下のとおりです。

.. list-table:: 登録画面項目一覧（収集項目値管理）：収集項目(From)
   :header-rows: 1
   :align: left

   * - 項目：収集項目(From)
     - 説明
     - 入力必須
     - 制約事項
   * - パース形式
     - YAML:YAML形式のファイルを解析し、パラメータを生成します。
     - 〇
     - ※1
   * - PREFIX（ファイル名）
     - ファイル名の拡張子を除いて入力して下さい。
     - 〇
     - ※1
   * - 変数名
     - | 収集対象の変数名を入力して下さい。
       | 配列、ハッシュ構造の場合、メンバ変数の入力が必須となります。
     - 〇
     - ※1
   * - メンバ変数
     - 変数が複数具体値、多段変数の場合入力して下さい。
     -
     - ※1


.. list-table:: 登録画面項目一覧（収集項目値管理）：パラメータシート(To)
   :header-rows: 1
   :align: left

   * - 項目：パラメータシート(To)
     - 説明
     - 入力必須
     - 制約事項
   * - メニューグループ:メニュー:項目
     - | 項目を選択して下さい。
       | メニューグループ名、メニュー名、項目名を「:」区切りで接続した形で表示されます。
     -
     - ※2

.. note:: | ※1 ファイル名、変数、メンバ変数入力値の例
          | ※2 同一の「:menuselection:`パラメータシート(To)` - :menuselection:`メニューグループ：メニュー：項目` 」に対して、複数の「:menuselection:`PREFIX(ファイル名)` - :menuselection:`変数名` 」を設定している場合、ファイル順に処理が実行されます。詳しくは「:ref:`about_execute_example`」参照。


| ■e.g.) 通常変数の構造の変数の場合

.. code-block:: text
   :caption: 通常変数の構造の変数の場合

   ■ファイル名: SAMPLE.yml
   ■ファイルの内容

   VAR_sample_config_1: yes
   VAR_sample_config_2: test_parameter

   ■収集値項目管理の収集項目(FROM)の入力可能な値

   PREFIX(ファイル名): SAMPLE
   変数名： VAR_sample_config_1
            VAR_sample_config_2


| ■ e.g.) 複数具体値の構造の変数の場合1


.. code-block:: text
   :caption: 複数具体値の構造の変数の場合1

   ■ファイル名: SAMPLE_2.yml
   ■ファイルの内容

   VAR_sample2_conf:
     - SAMPLE1
     - SAMPLE2
     - SAMPLE3

   ■収集値項目管理の収集項目(FROM)の入力可能な値
   PREFIX(ファイル名): SAMPLE_2
   変数名： VAR_sample2_conf
   メンバ変数：  [0]
                [1]
                [2]


| ■ e.g.) 複数具体値の構造の変数の場合2

.. code-block:: text
   :caption: 複数具体値の構造の変数の場合2

   ■ファイル名: RH_sshd.yml
   ■ファイルの内容

   VAR_RH_sshd_config:
     - key: PermitRootLogin
       value: yes
     - key: PasswordAuthentication
       value: no

    ■収集値項目管理の収集項目(FROM)の入力可能な値
    PREFIX(ファイル名): RH_sshd
    変数名： VAR_RH_sshd_config:
    メンバ変数：  [0].key
                 [0].value
                 [1].key
                 [1].value


| ■e.g.)複数具体値の構造の変数の場合3

.. code-block:: text
   :caption: 複数具体値の構造の変数の場合3

   ■ファイル名: RH_snmp.yml
   ■ファイルの内容

   VAR_RH_snmpd_info:
     com2sec:
       - sec_name: "testsec"
         source: "192.168.1.0/24"
         community: "public"
       - sec_name: "local"
         source: "localhost"
         community: "private"

   ■収集値項目管理の収集項目(FROM)の入力可能な値
   PREFIX(ファイル名): RH_snmp
   変数名： VAR_RH_snmp_config:
   メンバ変数：  com2sec[0].sec_name
                com2sec[0].source
                com2sec[0].community
                com2sec[1].sec_name
                com2sec[1].source
                com2sec[1].community


Ansible-Legacy、Ansible-Pioneer、Ansible-LegacyRole
-------------------------------------------------------------

.. _about_collect_status:

収集状況の確認
~~~~~~~~~~~~~~

| 各メニューグループ（:menuselection:`Ansible-Legacy` /:menuselection:`Ansible-Pioneer` /:menuselection:`Ansible-LegacyRole` ）の :menuselection:`作業管理` の画面では、完了した作業の収集状態の確認、ログファイルがDL可能です。

.. figure:: /images/ja/ansible_common/collect_flow/submenu_execution_list_legacy.png
   :width: 6.67391in
   :height: 3.20028in
   :align: left
   :alt: 作業管理画面

   作業管理画面


.. list-table:: 作業管理画面収集状況詳細
   :header-rows: 1
   :align: left

   * - 項目
     - 説明
     - 備考
   * - ステータス
     - | 収集機能の実行状況の表示
       | 対象外：収集機能対象外　（対象ファイルなし）
       | 収集済み：収集機能実施済み
       | 収集済み（通知あり）：登録/更新中に不備があった場合
       | 収集エラー：Movementのオペレーション、ホストに不備がある場合
     - ※
   * - 収集ログ
     - 収集機能実行のログをダウンロード
     -

.. list-table:: 収集状況詳細
   :header-rows: 1
   :align: left

   * - | 作業状態
       | ステータス
     - 収集機能対象
     - 対象ファイル
     - | 収集状況
       | ステータス
     - 収集ログ
     - 備考
   * - 完了以外
     - なし
     - 対象外
     - 空
     - 空
     -
   * - 完了以外
     - あり
     - 対象外
     - 空
     - 空
     -
   * - 完了
     - なし
     - 対象
     - 対象外
     - ログファイルあり
     -
   * - 完了
     - あり
     - 対象
     - 収集済み
     - ログファイルあり
     -
   * - 完了
     - あり
     - 対象
     - 収集済み(通知あり）
     - ログファイルあり
     -
   * - 完了
     - あり
     - 対象
     - 収集エラー
     - ログファイルあり
     -


.. note:: | ※ステータスの表記について
          | 作業状態が完了でない場合、収集機能対象外の為、:menuselection:`収集状況` は更新されないため、空のままとなります。
          | 作業状態が完了で、収集対象ファイルが存在しない場合、ステータスは収集済み、収集ログは空の状態となります。
          | :menuselection:`設定項目値管理` の不備により、登録処理が失敗した場合でも収集済み（通知あり）となります。詳細は、以下ログファイル出力内容例を参照してください。

| **ログファイル出力内容例**


| ■ e.g.) ログファイル出力内容例

.. code-block:: text
   :caption: ログファイル出力例 - 収集済み

    Collect START (host name: exastro-test-1 file name: ['Ansible_conf'])
    REST DATA (host name: exastro-test-1 menu ID: collect_001 operation NO: 4001e182-51d2-4918-96e0-5981c4dc6d5f)
    Collect END (host name: exastro-test-1 file name: ['Ansible_conf'])
    Collect START (host name: exastro-test-2 file name: ['Ansible_conf'])
    REST DATA (host name: exastro-test-2 menu ID: collect_001 operation NO: 4001e182-51d2-4918-96e0-5981c4dc6d5f)
    Collect END (host name: exastro-test-2 file name: ['Ansible_conf'])
    Collect START (host name: exastro-test-3 file name: ['Ansible_conf'])
    REST DATA (host name: exastro-test-3 menu ID: collect_001 operation NO: 4001e182-51d2-4918-96e0-5981c4dc6d5f)
    Collect END (host name: exastro-test-3 file name: ['Ansible_conf'])


.. code-block:: text
   :caption: ログファイル出力例 - 収集済み(通知あり)

   Collect START (host name: exastro-test-1 file name: ['Ansible_conf'])
   {'item_1': [{'status_code': '', 'msg_args': '', 'msg': 'Regular expression error (1,Value:sample_value)'}]}
   [Process] Failed to register or update data in CMDB. (1/1)
   Collect END (host name: exastro-test-1 file name: ['Ansible_conf'])
   Collect START (host name: exastro-test-2 file name: ['Ansible_conf'])
   {'item_1': [{'status_code': '', 'msg_args': '', 'msg': 'Regular expression error (1,Value:sample_value)'}]}
   [Process] Failed to register or update data in CMDB. (1/1)
   Collect END (host name: exastro-test-2 file name: ['Ansible_conf'])
   Collect START (host name: exastro-test-3 file name: ['Ansible_conf'])
   {'item_1': [{'status_code': '', 'msg_args': '', 'msg': 'Regular expression error (1,Value:sample_value)'}]}
   [Process] Failed to register or update data in CMDB. (1/1)
   Collect END (host name: exastro-test-3 file name: ['Ansible_conf'])


.. code-block:: text
   :caption: ログファイル出力例 - 収集エラー[Operation]

   [Process] Operation is abolished, so registration and update processing is skipped (Operation No: 4001e182-51d2-4918-96e0-5981c4dc6d5f)


.. code-block:: text
   :caption: ログファイル出力例 - 収集エラー[host]

   [Process] The registration / update process is skipped because the target device has not been registered or has been abolished (host name: exastro-test-1).
   [Process] The registration / update process is skipped because the target device has not been registered or has been abolished (host name: exastro-test-2).
   [Process] The registration / update process is skipped because the target device has not been registered or has been abolished (host name: exastro-test-3).


.. code-block:: text
   :caption: ログファイル出力例 - 対象外

   [Process] There is no file in the collection target directory.


.. _about_backyard:

BackYardコンテンツ
------------------

#.  パラメータシートへの登録処理の概要

    #. | 正常に完了した作業の一覧を取得します。
       | 収集対象ステータス： 完了

    #. | 収集対象作業Noから以下の情報を取得します。
       | - オペレーション情報
       | - 対象ホスト
       | - 対象ソースファイル

    #. | 対象のホストが機器一覧に登録されているか確認します。

       | 登録： 収集対象
       | 未登録： 対象外

    #. | 対象ソースファイルと収集項目値管理から対象パラメータシートのメニューIDを取得
       | ※対象ソースファイルが複数ある場合、ファイル名の昇順で処理を実行します。

    #. | 1～4 の情報から登録、更新用のパラメータを生成します。
       | 対象のメニューに対して、データ確認を実施し、登録、更新かを判定します。
       | 登録：　オペレーション、ホスト組み合わせで、一意のデータが登録されていない
       | 更新：　オペレーション、ホスト組み合わせで、一意のデータが登録されている

    #. | パラメータシートへのデータの登録/更新を実施します。

    #. | 作業Noに収集状況のステータスを更新します。



| なお、パラメータシートへのデータ登録のタイミングはBackyardの実行プロセスの周期に依存します。
| 対象の作業結果については、「:doc:`./index`」を参照してください。


付録
====

参考資材
--------

| 以下、IaC(Playbook、Role)の参考例となります。

#. | Exastro Playbook Collection
   | https://github.com/exastro-suite/playbook-collection-docs/blob/master/README.ja.md

#. | Ansibleコンフィグ取得、パラメータ生成Playbook

   .. code-block:: bash
      :name: makeYml_Ansible.yml
      :caption: makeYml_Ansible.yml

       - name: make yaml file
         blockinfile:
           create: yes
           mode: 0644
           insertbefore: EOF
           marker: ""
           dest: "{{ __parameter_dir__  }}/{{ inventory_hostname }}/Ansible_conf.yml"
           content: |
             ansible_architecture: {{ ansible_architecture }}
             ansible_bios_version: {{ ansible_bios_version }}
             ansible_default_ipv4__address: {{ ansible_default_ipv4.address }}
             ansible_default_ipv4__interface: {{ ansible_default_ipv4.interface }}
             ansible_default_ipv4__network: {{ ansible_default_ipv4.network }}
             ansible_distribution: {{ ansible_distribution }}
             ansible_distribution_file_path: {{ ansible_distribution_file_path }}
             ansible_distribution_file_variety: {{ ansible_distribution_file_variety }}
             ansible_distribution_major_version: {{ ansible_distribution_major_version }}
             ansible_distribution_release: {{ ansible_distribution_release }}
             ansible_distribution_version: {{ ansible_distribution_version }}
             ansible_machine: {{ ansible_machine }}
             ansible_memtotal_mb: {{ ansible_memtotal_mb }}
             ansible_nodename: {{ ansible_nodename }}
             ansible_os_family: {{ ansible_os_family }}
             ansible_pkg_mgr: {{ ansible_pkg_mgr }}
             ansible_processor_cores: {{ ansible_processor_cores }}
             ansible_processor_count: {{ ansible_processor_count }}
             ansible_processor_threads_per_core: {{ ansible_processor_threads_per_core }}
             ansible_processor_vcpus: {{ ansible_processor_vcpus }}
             ansible_product_name: {{ ansible_product_name }}
             ansible_product_serial: {{ ansible_product_serial }}
             ansible_product_uuid: {{ ansible_product_uuid }}
             ansible_product_version: {{ ansible_product_version }}
             ansible_python__executable: {{ ansible_python.executable }}
             ansible_python_version: {{ ansible_python_version }}
             ansible_service_mgr: {{ ansible_service_mgr }}
             vconsole_config: vconsole.conf
             yum_config: yum.conf

      - name: get vconsole config
        fetch:
          src: /etc/vconsole.conf
          dest: "{{ __parameters_file_dir__ }}/{{ inventory_hostname }}/"
          flat: yes

      - name: get yum config
        fetch:
          src: /etc/yum.conf
          dest: "{{ __parameters_file_dir__ }}/{{ inventory_hostname }}/"
          flat: yes

.. note::
         | ※　makeYml_Ansible.yml実行して、収集対象のソースファイル(yaml)を生成する場合、gather_factsを有効にする必要があります。
         | 「Ansible-Legacy」-「Movement一覧」編集時、「ヘッダーセクション」に以下を記載してください。
         | 設定変更については、「:doc:`./index`」を参照してください。


.. code-block:: yaml
   :caption: gather_facts有効設定例

   - hosts: all
     remote_user: "{{ __loginuser__ }}"
     gather_facts: yes
     become: yes

.. _about_execute_example:

収集実行例
----------

複数ファイルの同一メニューを対象とした場合
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| 収集項目値管理にて、一つの「メニュー-項目」に対して、複数の「PREFIX(ファイル名)-変数名」の設定をしている場合、対象ホストの収集対象ディレクトリ内に、該当する複数のソースファイルがある場合の収集処理の例について記載します。


.. code-block:: text
   :name: 収集対象ファイル
   :caption: 収集対象ファイル

   【上位ディレクトリ】
      |-  _parameters
          |-  ita-sample01
              |-  SAMPLE_01.yml
              |-  SAMPLE_02.yml


| **■ 収集項目値管理設定**

| ■ファイル名：SAMPLE_01.yml ,SAMPLE_02.yml

.. list-table:: ファイルの内容
   :widths: 10 10
   :header-rows: 1
   :align: left

   * - SAMPLE_01.yml
     - SAMPLE_02.yml
   * - | VAR_sample_config_1: 1
       | VAR_sample_config_2: 2
       | VAR_sample_config_3: 3
     - | VAR_sample_config_1: “A”
       | VAR_sample_config_B: “B”
       | VAR_sample_config_X: “X”


| **■ 収集値項目管理の設定と対象メニュー項目の収集例**

1. 収集値項目管理の設定と対象メニュー-項目

.. figure:: /images/ja/ansible_common/collect_flow/link_parameter_collected_item_value_list.drawio.png
   :width: 6.67391in
   :height: 3.20028in
   :align: left
   :alt: 収集値項目管理の設定とパラメータシート

   収集値項目管理の設定とパラメータシート

| **■対象ファイル、収集値項目管理の設定内容に沿って、ファイル単位に収集処理を実行**

1. SAMPLE_01.yml の登録処理（登録）

.. figure:: /images/ja/ansible_common/collect_flow/var_sample_01_register.png
   :alt: SAMPLE_01.yml の登録処理（登録）
   :width: 6.00785in
   :height: 0.51786in

2. SAMPLE_02.yml の登録処理（更新）

.. figure:: /images/ja/ansible_common/collect_flow/var_sample_02_update.png
   :alt: SAMPLE_02.yml の登録処理（更新）
   :width: 6.06086in
   :height: 0.52304in

3. 収集機能完了後のレコードの状態

.. figure:: /images/ja/ansible_common/collect_flow/var_sample_03_end.png
   :alt: 収集機能完了後のレコードの状態
   :width: 6.06086in
   :height: 0.52834in


.. _about_values_for_collected_files:

収集対象ファイルの値の取り扱い
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| Yaml形式で出力された収集対象ファイルについて、パラメータシートへの登録処理時の値の取り扱いについて以下として扱います。

.. code-block:: yaml
   :name: 収集対象ファイル例
   :caption: Sample.yml

   VAR_TEST: TEST
   VAR_STR_TEST1: 'TEST1'
   VAR_STR_TEST2: "TEST2"
   VAR_null: null
   VAR_NULL: NULL
   VAR_STR_null: "null"
   VAR_STR_NULL: "NULL"
   VAR_true: true
   VAR_false: false
   VAR_STR_true: "true"
   VAR_STR_false: "false"
   VAR_YES: YES
   VAR_NO: NO
   VAR_STR_YES: "YES"
   VAR_STR_NO: "NO"
   VAR_NON:
   VAR_Quotation: ''
   VAR_WQuotation: ""
   VAR_INT: 100


| ■ 収集対象YAML(sample.yml)のキーと値

.. list-table:: 収集対象YAML(sample.yml)のキーと値
   :widths: 3 10 10 5
   :header-rows: 1
   :align: left

   * - No
     - キー
     - 値
     - 備考
   * - 1
     - VAR_TEST
     - TEST
     -
   * - 2
     - VAR_STR_TEST1
     - 'TEST1'
     -
   * - 3
     - VAR_STR_TEST2
     - "TEST2"
     -
   * - 4
     - VAR_null
     - null
     -
   * - 5
     - VAR_NULL
     - NULL
     -
   * - 6
     - VAR_STR_null
     - "null"
     -
   * - 7
     - VAR_STR_NULL
     -  "NULL"
     -
   * - 8
     - VAR_true
     - true
     -
   * - 9
     - VAR_false
     - false
     -
   * - 10
     - VAR_STR_true
     -  "true"
     -
   * - 11
     - VAR_STR_false
     - "false"
     -
   * - 12
     - VAR_YES
     - YES
     -
   * - 13
     - VAR_NO
     - NO
     -
   * - 14
     - VAR_STR_YES
     - "YES"
     -
   * - 15
     - VAR_STR_NO
     - "NO"
     -
   * - 16
     - VAR_NON
     -
     -
   * - 17
     - VAR_Quotation
     - ``''``
     -
   * - 18
     - VAR_WQuotation
     - ``""``
     -
   * - 19
     - VAR_INT
     - 100
     -


| ■ 収集対象YAML(sample.yml)の収集

.. list-table:: 収集対象YAML(sample.yml)の収集
   :header-rows: 1
   :align: left

   * - No
     - 収集対象 (キー:値)
     - | パラメータシート
       | 項目名
     - | RESTAPIレスポンス
       | 値
     - | RESTAPIレスポンス
       | データ型
     - WEB画面表示
   * - 1
     - VAR_TEST: TEST
     - パラメータ/VAR_TEST
     - "TEST"
     - string
     - TEST
   * - 2
     - VAR_STR_TEST1: 'TEST1'
     - パラメータ/VAR_STR_TEST1
     - "TEST1"
     - string
     - TEST1
   * - 3
     - VAR_STR_TEST2: "TEST2"
     - パラメータ/VAR_STR_TEST2
     - "TEST2"
     - string
     - TEST2
   * - 4
     - VAR_null: null
     - パラメータ/VAR_null
     - null
     - null
     -
   * - 5
     - VAR_NULL: NULL
     - パラメータ/VAR_NULL
     - null
     - null
     -
   * - 6
     - VAR_STR_null: "null"
     - パラメータ/VAR_STR_null
     - "null"
     - string
     -  null
   * - 7
     - VAR_STR_NULL: "NULL"
     - パラメータ/VAR_STR_NULL
     -  "NULL"
     -  string
     -  NULL
   * - 8
     - VAR_true: true
     - パラメータ/VAR_true
     - "true"
     - string
     - true
   * - 9
     - VAR_false: false
     - パラメータ/VAR_false
     - "false"
     - string
     - false
   * - 10
     - VAR_STR_true: "true"
     - パラメータ/VAR_STR_true
     - "true"
     - string
     - true
   * - 11
     - VAR_STR_false: "false"
     - パラメータ/VAR_STR_false
     - "false"
     - string
     - false
   * - 12
     - VAR_YES: YES
     - パラメータ/VAR_YES
     - "true"
     - string
     - true
   * - 13
     - VAR_NO: NO
     - パラメータ/VAR_NO
     - "false"
     - string
     - false
   * - 14
     - VAR_STR_YES: "YES"
     - パラメータ/VAR_STR_YES
     - "YES"
     - string
     - YES
   * - 15
     - VAR_STR_NO: "NO"
     - パラメータ/VAR_STR_NO
     - "NO"
     - string
     - NO
   * - 16
     - VAR_NON:
     - パラメータ/VAR_NON
     - null
     - null
     -
   * - 17
     - VAR_Quotation: ''
     - パラメータ/VAR_Quotation
     - ``""``
     - string
     -
   * - 18
     - VAR_WQuotation: ""
     - パラメータ/VAR_WQuotation
     - ``""``
     - string
     -
   * - 19
     - VAR_INT: 100
     - パラメータ/VAR_INT
     - "100"
     - string
     - 100


| ※RESTAPIレスポンスの値、データ型、WEB画面上の表示について記載しています。
| ※パラメータシートの項目は、文字列(単一行)の場合です。

-  対象パラメータシートの画面上の表示結果

.. figure:: /images/ja/ansible_common/collect_flow/val_test_filter_item1_9.png
   :alt: 対象パラメータシートの画面上の表示結果1
   :width: 6.96252in
   :height: 1.98221in

   対象パラメータシートの画面上の表示結果1

.. figure:: /images/ja/ansible_common/collect_flow/val_test_filter_item10_19.png
   :alt: 対象パラメータシートの画面上の表示結果2
   :width: 6.96252in
   :height: 1.98221in

   対象パラメータシートの画面上の表示結果2

-  対象パラメータシートのRESTAPI(filter)での取得結果

.. code-block:: json
   :caption: RESTAPI(filter)のレスポンス

   {
       "data": [
           {
               "file": {},
               "parameter": {
                   "base_datetime": "2023/05/17 13:58:47",
                   "discard": "0",
                   "host_name": "exastro-test-1",
                   "item_1": "TEST",
                   "item_10": "true",
                   "item_11": "false",
                   "item_12": "true",
                   "item_13": "false",
                   "item_14": "YES",
                   "item_15": "NO",
                   "item_16": null,
                   "item_17": "",
                   "item_18": "",
                   "item_19": "100",
                   "item_2": "TEST1",
                   "item_3": "TEST2",
                   "item_4": null,
                   "item_5": null,
                   "item_6": "null",
                   "item_7": "NULL",
                   "item_8": "true",
                   "item_9": "false",
                   "last_execute_timestamp": "2023/05/17 13:58:47",
                   "last_update_date_time": "2023/05/17 14:00:07.944031",
                   "last_updated_user": "収集作業機能",
                   "operation_date": "2023/01/01 00:00:00",
                   "operation_name_disp": "OP1",
                   "operation_name_select": "2023/01/01 00:00_OP1",
                   "remarks": null,
                   "uuid": "ede113f8-14b1-48bf-8b3f-409f68b107ae"
               }
           }
       ],
       "message": "SUCCESS",
       "result": "000-00000",
       "ts": "2023-05-17T05:54:03.937Z"
   }


複数の同一ファイル名がアップロード対象ファイルの指定例
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| Yaml形式で出力された収集対象ファイルについて、同一ホストで、階層別で同一ファイル名を取り扱う必要がある場合に、アップロード対象ファイルの指定例について記載します。

.. code-block:: text
   :caption: 収集対象ファイルのファイルパス、ディレクトリ構造(複数の同一ファイル名)

   【上位ディレクトリ】
      |-  _parameters
      |   |-  localhost
      |       |-  SAMPLE.yml
      |-  _parameters_file
      |   |-  localhost
                |-  APP001
                    |-  config                   #①
                |-  APP002
                    |-  config                   #②
                |-  APP003
                    |-  config                   #③
                |-  APP002
                    |-  config                   #④

     ■収集対象ファイル名：SAMPLE.yml
     ■ファイルの内容
     VAR_upload_file_1: config
     VAR_upload_file_2: ‘/APP002/config’
     VAR_upload_file_3: ‘/APP001/config’
     VAR_upload_file_4: ‘/APP003/APP002/config’

..     VAR_upload_file_2: ‘/<上位ディレクトリ>/_parameters_file/localhost/APP002/config’

| ※上位ディレクトリについては、「:ref:`target_directory_file_structure`」をご参照ください。
| 収集対象ファイルの内容収集時に対処となるファイルの実体は以下となります。

.. list-table:: 収集対象ファイルとファイルの実体
   :widths: 10 10 5
   :header-rows: 1
   :align: left

   * - 収集項目(FROM)/変数名
     - 対象ファイル
     - 備考
   * - VAR_upload_file_1
     - ①、②、③、④のファイルからランダム
     -
   * - VAR_upload_file_2
     - ②、④のファイルからランダム
     -
   * - VAR_upload_file_3
     - ①のファイルが対象
     -
   * - VAR_upload_file_4
     - ④のファイルが対象
     -

..   * - VAR_upload_file_2
     - ②のファイルが対象

ファイル削除時の収集対象ファイル内の記載例
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| ファイルアップロード項目のファイル削除する場合の収集対象ファイルの指定例について記載します。
| 削除するファイルについて対象の変数名の値を空文字として設定することで削除可能です。

.. code-block:: text
   :caption: ファイルアップロード項目の削除収集対象ファイルのファイルパス、ディレクトリ構造

   【上位ディレクトリ】
      |-  _parameters
      |   |-  localhost
      |       |-  SAMPLE.yml   ※ソースファイル
      |-  _parameters_file
      |   |-  localhost

    ■収集対象ファイル名: SAMPLE.yml
    ■ファイルの内容
    VAR_upload_file: ""         ※アップロード対象ファイル
