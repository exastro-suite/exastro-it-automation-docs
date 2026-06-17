============
パラメータ集
============

| 本シナリオでは、ユーザー管理の設定を題材にパラメータ集の機能について学習します。

ユーザー管理
============

パラメータ設計
--------------

| システムの構成情報のフォーマットを設計します。

| システムにある全ての情報をパラメータとして管理する必要はありません。今後管理が必要になったタイミングで適宜追加や見直しをしましょう。

.. _quickstart_server_information_parmeter_parameter:

データシートの作成
------------------

| まずは、「あるべきグループ、ユーザーの状態」である present (新規グループ、ユーザーを作成する状態) と absent (新規グループ、ユーザーを削除する状態) の選択肢を作成します。
| 具体的には、データシートを作成し、その中に選択肢として表示するパラメータを投入します。
| :doc:`Ansible-Legacy <../ansible_legacy/Legacy_scenario2>` と :doc:`Ansible-LegacyRole <../ansible_legacy_role/scenario2>` のシナリオでデータシートを作成している場合、データシートの作成は不要です。

| :menuselection:`パラメータシート作成 --> パラメータシート定義・作成` から、データシートを登録します。

.. figure:: /images/learn/quickstart/parameter/データシート作成.png
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
   * - パラメータシート名
     - :kbd:`状態`
   * - パラメータシート名(REST)
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

.. figure:: /images/learn/quickstart/parameter/データシート入力.png
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
     - 作成
   * - :kbd:`absent`
     - 削除

パラメータシートの作成
----------------------

| :menuselection:`パラメータシート作成` では、作業時に利用する設定値(パラメータ)を登録するためのパラメータシートを管理します。

| グループとユーザーを作成するためのパラメータシートを作成します。
| 利用する Ansible Playbook は以下のPlaybookになります、下記のパラメータが管理できるようにパラメータシートを作成しましょう。
| 以下の System_group_add.yml と System_user_add.yml は、Playbook素材集にデフォルトで登録されています。

.. code-block:: bash
   :caption: System_group_add.yml

   - name: Add group
     group:
       name: "{{ item }}"
       state: present
     with_items:
       - "{{ ITA_DFLT_Groups }}"

.. code-block:: bash
   :caption: System_user_add.yml

   - name: Add user
     user:
       name: "{{ item.0 }}"
       group: "{{ item.1 }}"
       state: present
     with_together:
       - "{{ ITA_DFLT_User_Names }}"
       - "{{ ITA_DFLT_User_Group_Names }}"

| :menuselection:`パラメータシート作成 --> パラメータシート定義・作成` から、グループとユーザーを作成するために、「グループ作成情報」と「ユーザー作成情報」を管理するパラメータシートを作成します。

.. tip::
   | パラメータシート作成情報で :menuselection:`バンドル利用` を「利用する」にチェックを入れることで、1つの設定項目に対して複数のパラメータを設定することが可能になります。

グループのパラメータシート作成
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. figure:: /images/learn/quickstart/parameter/新規グループパラメータシート作成.png
   :width: 1200px
   :alt: パラメータシート作成

.. list-table:: パラメータシート作成(グループ作成情報)の項目の設定値
   :widths: 10 10 10
   :header-rows: 1

   * - 設定項目
     - 項目1設定値
     - 項目2設定値
   * - 項目の名前
     - :kbd:`グループ名`
     - :kbd:`状態`
   * - 項目の名前(Rest API用)
     - :kbd:`ITA_DFLT_Groups`
     - :kbd:`state`
   * - 入力方式
     - :kbd:`文字列(単一行)`
     - :kbd:`プルダウン選択`
   * - 選択項目
     - :kbd:`32`
     - :kbd:`入力用:状態:パラメータ/present-absent`
   * - 正規表現
     -
     -
   * - 初期値
     -
     -
   * - 必須
     - ✓
     - ✓
   * - 一意制約
     - ✓
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
     - :kbd:`新規グループ`
   * - パラメータシート名(REST)
     - :kbd:`New_groups`
   * - 作成対象
     - :kbd:`パラメータシート（ホスト/オペレーションあり）`
   * - 表示順序
     - :kbd:`1`
   * - バンドル利用
     - 「利用する」にチェックを入れる(有効)
   * - 最終更新日時
     - (自動入力)
   * - 最終更新者
     - (自動入力)

ユーザーのパラメータシート作成
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. figure:: /images/learn/quickstart/parameter/新規ユーザーパラメータシート作成.png
   :width: 1200px
   :alt: パラメータシート作成

.. list-table:: パラメータシート作成(ユーザー作成情報)の項目の設定値
   :widths: 10 10 10 10
   :header-rows: 1

   * - 設定項目
     - 項目1設定値
     - 項目2設定値
     - 項目3設定値
   * - 項目の名前
     - :kbd:`ユーザー名`
     - :kbd:`グループ`
     - :kbd:`状態`
   * - 項目の名前(Rest API用)
     - :kbd:`ITA_DFLT_User_Names`
     - :kbd:`ITA_DFLT_User_Group_Names`
     - :kbd:`state`
   * - 入力方式
     - :kbd:`文字列(単一行)`
     - :kbd:`プルダウン選択`
     - :kbd:`プルダウン選択`
   * - 選択項目
     - :kbd:`32`
     - :kbd:`入力用:新規グループ:パラメータ/グループ名`
     - :kbd:`入力用:状態:パラメータ/present-absent`
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
     - ✓
     - ✓
   * - 一意制約
     -
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

.. list-table:: パラメータシート作成情報の設定値
   :widths: 5 10
   :header-rows: 1
   :class: filter-table

   * - 項目名
     - 設定値
   * - 項番
     - (自動入力)
   * - パラメータシート名
     - :kbd:`新規ユーザー`
   * - パラメータシート名(REST)
     - :kbd:`New_users`
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
--------------

| 作業手順を登録するために、Exastro IT Automation で扱う作業単位である Movement (ジョブ)を定義します。
| 定義した Movement に対して、Ansible Playbook を紐付け、更に Ansible Playbook 内の変数と :ref:`quickstart_server_information_parmeter_parameter` で登録したパラメータシートの項目の紐付けを行います。


作業項目の設定
--------------

| Exastro IT Automation では、Movement という単位で作業を管理します。Movementは作業手順書における作業項目に該当します。
| Movement は、Ansible Playbook のような IaC (Infrastrucure as Code) を紐付けたり、IaC 内の変数とパラメータシートの設定値を紐付ける際に利用します。

| :menuselection:`Ansible-Legacy --> Movement一覧` から、ユーザー登録のための Movement を登録します。

.. figure:: /images/learn/quickstart/parameter/Movement登録設定.png
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
   * - :kbd:`新規ユーザー登録`
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

| Ansible Playbook の登録を行います。Ansible Playbook は運用手順書内に記載されたコマンドに該当します。
| Ansible-Legacyモードではご自身で作成したPlaybookを利用することを想定しています。
| Ansible-Legacyモードを使用することのメリットとして、自身の用途に合ったPlaybookを作成することで自由に手順を作成できることが挙げられます。
| ver2.4.0 からはデフォルトでPlaybookが登録されています、自分の用途に合ったPlaybookを使用してみましょう。

| 本シナリオでは System_group_add.yml と System_user_add.yml を使用します。
| こちらは既に登録されているので、新規で登録する必要はありません。

.. code-block:: bash
   :caption: System_group_add.yml

   - name: Add group
     group:
       name: "{{ item }}"
       state: present
     with_items:
       - "{{ ITA_DFLT_Groups }}"

.. code-block:: bash
   :caption: System_user_add.yml

   - name: Add user
     user:
       name: "{{ item.0 }}"
       group: "{{ item.1 }}"
       state: present
     with_together:
       - "{{ ITA_DFLT_User_Names }}"
       - "{{ ITA_DFLT_User_Group_Names }}"


Movement と Ansible Playbook の紐付け
-------------------------------------

| :menuselection:`Ansible-Legacy --> Movement-ロール紐付` から、Movement と Ansible Playbook の紐付けを行います。
| 本シナリオでは、 System_group_add.yml と System_user_add.yml を利用します。

.. figure:: /images/learn/quickstart/parameter/Movement-Playbook紐付.png
   :width: 1200px
   :alt: Movement-Playbook紐付け

.. list-table:: Movement-Playbook紐付け情報の登録
  :widths: 10 10 10
  :header-rows: 1

  * - Movement名
    - Playbook素材
    - インクルード順序
  * - :kbd:`新規ユーザー登録`
    - :kbd:`~[Exastro standard] Add group`
    - :kbd:`1`
  * - :kbd:`新規ユーザー登録`
    - :kbd:`~[Exastro standard] Add user`
    - :kbd:`2`


パラメータシートの項目と Ansible Playbook の変数の紐付け
--------------------------------------------------------

| System_group_add.ymlでは、:kbd:`ITA_DFLT_Groups` に作成したいグループ名を入れます。
| System_user_add.yml では、:kbd:`ITA_DFLT_User_Names` に作成したいユーザー名、:kbd:`ITA_DFLT_User_Group_Names` にグループ作成で作成したグループ名を入れます。

| :menuselection:`Ansible-Legacy --> 代入値自動登録設定` から、パラメータシートの項目と Ansible Playbook の変数の紐付けを行います。

.. figure:: /images/learn/quickstart/parameter/グループ代入値自動登録.png
   :width: 1200px
   :alt: グループの代入値自動登録設定

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
  * - :kbd:`代入値自動登録用:新規グループ:パラメータ/グループ名`
    - :kbd:`1`
    - :kbd:`Value型`
    - :kbd:`新規ユーザー登録`
    - :kbd:`新規ユーザー登録:ITA_DFLT_Groups`
    - :kbd:`1`
  * - :kbd:`代入値自動登録用:新規グループ:パラメータ/グループ名`
    - :kbd:`2`
    - :kbd:`Value型`
    - :kbd:`新規ユーザー登録`
    - :kbd:`新規ユーザー登録:ITA_DFLT_Groups`
    - :kbd:`2`
  * - :kbd:`代入値自動登録用:新規グループ:パラメータ/グループ名`
    - :kbd:`3`
    - :kbd:`Value型`
    - :kbd:`新規ユーザー登録`
    - :kbd:`新規ユーザー登録:ITA_DFLT_Groups`
    - :kbd:`3`
  * - :kbd:`代入値自動登録用:新規グループ:パラメータ/グループ名`
    - :kbd:`4`
    - :kbd:`Value型`
    - :kbd:`新規ユーザー登録`
    - :kbd:`新規ユーザー登録:ITA_DFLT_Groups`
    - :kbd:`4`
  * - :kbd:`代入値自動登録用:新規グループ:パラメータ/グループ名`
    - :kbd:`5`
    - :kbd:`Value型`
    - :kbd:`新規ユーザー登録`
    - :kbd:`新規ユーザー登録:ITA_DFLT_Groups`
    - :kbd:`5`

.. figure:: /images/learn/quickstart/parameter/ユーザー代入値自動登録.png
   :width: 1200px
   :alt: ユーザーの代入値自動登録設定

.. list-table:: ユーザーの代入値自動登録設定の設定値
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
  * - :kbd:`代入値自動登録用:新規ユーザー:パラメータ/ユーザー名`
    - :kbd:`1`
    - :kbd:`Value型`
    - :kbd:`新規ユーザー登録`
    - :kbd:`新規ユーザー登録:ITA_DFLT_User_Names`
    - :kbd:`1`
  * - :kbd:`代入値自動登録用:新規ユーザー:パラメータ/グループ`
    - :kbd:`1`
    - :kbd:`Value型`
    - :kbd:`新規ユーザー登録`
    - :kbd:`新規ユーザー登録:ITA_DFLT_User_Group_Names`
    - :kbd:`1`
  * - :kbd:`代入値自動登録用:新規ユーザー:パラメータ/ユーザー名`
    - :kbd:`2`
    - :kbd:`Value型`
    - :kbd:`新規ユーザー登録`
    - :kbd:`新規ユーザー登録:ITA_DFLT_User_Names`
    - :kbd:`2`
  * - :kbd:`代入値自動登録用:新規ユーザー:パラメータ/グループ`
    - :kbd:`2`
    - :kbd:`Value型`
    - :kbd:`新規ユーザー登録`
    - :kbd:`新規ユーザー登録:ITA_DFLT_User_Group_Names`
    - :kbd:`2`
  * - :kbd:`代入値自動登録用:新規ユーザー:パラメータ/ユーザー名`
    - :kbd:`3`
    - :kbd:`Value型`
    - :kbd:`新規ユーザー登録`
    - :kbd:`新規ユーザー登録:ITA_DFLT_User_Names`
    - :kbd:`3`
  * - :kbd:`代入値自動登録用:新規ユーザー:パラメータ/グループ`
    - :kbd:`3`
    - :kbd:`Value型`
    - :kbd:`新規ユーザー登録`
    - :kbd:`新規ユーザー登録:ITA_DFLT_User_Group_Names`
    - :kbd:`3`
  * - :kbd:`代入値自動登録用:新規ユーザー:パラメータ/ユーザー名`
    - :kbd:`4`
    - :kbd:`Value型`
    - :kbd:`新規ユーザー登録`
    - :kbd:`新規ユーザー登録:ITA_DFLT_User_Names`
    - :kbd:`4`
  * - :kbd:`代入値自動登録用:新規ユーザー:パラメータ/グループ`
    - :kbd:`4`
    - :kbd:`Value型`
    - :kbd:`新規ユーザー登録`
    - :kbd:`新規ユーザー登録:ITA_DFLT_User_Group_Names`
    - :kbd:`4`
  * - :kbd:`代入値自動登録用:新規ユーザー:パラメータ/ユーザー名`
    - :kbd:`5`
    - :kbd:`Value型`
    - :kbd:`新規ユーザー登録`
    - :kbd:`新規ユーザー登録:ITA_DFLT_User_Names`
    - :kbd:`5`
  * - :kbd:`代入値自動登録用:新規ユーザー:パラメータ/グループ`
    - :kbd:`5`
    - :kbd:`Value型`
    - :kbd:`新規ユーザー登録`
    - :kbd:`新規ユーザー登録:ITA_DFLT_User_Group_Names`
    - :kbd:`5`


作業対象の登録
--------------

| 作業を行う対象機器を登録します。

機器登録
--------

| 作業対象となるサーバー server01 を機器一覧に登録します。

| :menuselection:`Ansible共通 --> 機器一覧` から、作業対象である server01 の接続情報を登録します。

.. figure:: /images/learn/quickstart/parameter/機器一覧登録設定.gif
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


ユーザー管理作業の実施
----------------------

| まずは、いつ、どこの機器に対して、何を、どうするかといった情報を簡単に整理しておきましょう。

.. list-table:: 作業の方針
   :widths: 15 10
   :header-rows: 0

   * - 作業実施日時
     - 2024/04/01 12:00:00
   * - 作業対象
     - server01(RHEL8)
   * - 作業内容
     - 新規ユーザー登録


作業概要登録
------------

| オペレーション登録では、作業を実施する際の作業概要を定義します。
| 先に決めた作業の方針を元にオペレーション情報を記入しましょう。

| :menuselection:`基本コンソール --> オペレーション一覧` から、作業実施日時や作業名を登録します。

.. figure:: /images/learn/quickstart/parameter/オペレーション登録.png
   :width: 1200px
   :alt: オペレーション登録

.. list-table:: オペレーション登録内容
   :widths: 15 10
   :header-rows: 1

   * - オペレーション名
     - 実施予定日時
   * - :kbd:`新規ユーザー登録`
     - :kbd:`2024/04/01 12:00:00`

.. tip::
   | 作業実施日時は、本シナリオでは適当な日時で問題ありませんが、作業日が定まっている場合は、正確な作業実施の予定日時を設定することを推奨します。
   | 定期作業などの繰り返し行われる作業のように、作業日が定まっていない場合は現在の日時を登録しても問題ありません。


パラメータ設定
--------------

| :menuselection:`入力用 --> 新規グループ` から、グループに対するパラメータを登録します。

.. figure:: /images/learn/quickstart/parameter/グループパラメータ入力.png
   :width: 1200px
   :alt: グループのパラメータ登録

.. list-table:: グループパラメータの設定値
  :widths: 5 15 5 5 5
  :header-rows: 2

  * - ホスト名
    - オペレーション
    - 代入順序
    - パラメータ
    -
  * -
    - オペレーション名
    -
    - グループ名
    - 状態
  * - :kbd:`server01`
    - :kbd:`2024/04/01 12:00:00_新規ユーザー登録`
    - :kbd:`1`
    - :kbd:`test01`
    - :kbd:`present`
  * - :kbd:`server01`
    - :kbd:`2024/04/01 12:00:00_新規ユーザー登録`
    - :kbd:`2`
    - :kbd:`test02`
    - :kbd:`present`

| :menuselection:`入力用 --> 新規ユーザー` から、ユーザーに対するパラメータを登録します。

.. figure:: /images/learn/quickstart/parameter/ユーザーパラメータ入力.png
   :width: 1200px
   :alt: ユーザのパラメータ登録

.. list-table:: ユーザーパラメータの設定値
  :widths: 5 20 5 5 5 5
  :header-rows: 2

  * - ホスト名
    - オペレーション
    - 代入順序
    - パラメータ
    -
    -
  * -
    - オペレーション名
    -
    - ユーザー名
    - グループ
    - 状態
  * - :kbd:`server01`
    - :kbd:`2024/04/01 12:00:00_新規ユーザー登録`
    - :kbd:`1`
    - :kbd:`testuser01`
    - :kbd:`test01`
    - :kbd:`present`
  * - :kbd:`server01`
    - :kbd:`2024/04/01 12:00:00_新規ユーザー登録`
    - :kbd:`2`
    - :kbd:`testuser02`
    - :kbd:`test01`
    - :kbd:`present`
  * - :kbd:`server01`
    - :kbd:`2024/04/01 12:00:00_新規ユーザー登録`
    - :kbd:`3`
    - :kbd:`testuser03`
    - :kbd:`test02`
    - :kbd:`present`
  * - :kbd:`server01`
    - :kbd:`2024/04/01 12:00:00_新規ユーザー登録`
    - :kbd:`4`
    - :kbd:`testuser04`
    - :kbd:`test02`
    - :kbd:`present`

作業実行
--------

1. 事前確認

   | 現在のサーバーの状態を確認しましょう。

   | グループ一覧を確認します。

   .. code-block:: bash
      :caption: コマンド

      # グループ一覧の取得
      cat /etc/group|grep -E "test01|test02"

   .. code-block:: bash
      :caption: 実行結果

      # 何も表示されない

   | ユーザー一覧を確認します。

   .. code-block:: bash
      :caption: コマンド

      # ユーザー一覧の取得
      cat /etc/passwd|grep -E "test"

   .. code-block:: bash
      :caption: 実行結果

      # 何も表示されない

2. 作業実行

   | :menuselection:`Ansible-Legacy --> 作業実行` から、:kbd:`新規ユーザー登録` Movement を選択し、:guilabel:` 作業実行` を押下します。
   | 次に、:menuselection:`作業実行設定` で、オペレーションに :kbd:`新規ユーザー登録` を選択し、:guilabel:`作業実行` を押下します。

   | :menuselection:`作業状態確認` 画面が開き、実行が完了した後に、ステータスが「完了」になったことを確認します。

.. figure:: /images/learn/quickstart/parameter/作業実行.gif
   :width: 1200px
   :alt: 作業実行

1. 事後確認

   | 再度サーバーに下記のグループとユーザーが設定されていることを確認しましょう。

   | グループ一覧を確認します。

   .. code-block:: bash
      :caption: コマンド

      # グループ一覧の取得
      cat /etc/group|grep -E "test01|test02"

   .. code-block:: bash
      :caption: 実行結果

      test01
      test02

   | ユーザー一覧を確認します。

   .. code-block:: bash
      :caption: コマンド

      # ユーザー一覧の取得
      cat /etc/passwd|grep -E "test"

   .. code-block:: bash
      :caption: 実行結果

      testuser01
      testuser02
      testuser03
      testuser04


ユーザー更新
============

| 次に先ほど作成したユーザーのユーザー名を更新するために、更新用のオペレーションとパラメータの入力をしてみましょう。
| まずは、いつ、どこの機器に対して、何を、どうするかといった情報を簡単に整理しておきましょう。

.. list-table:: 作業の方針
   :widths: 15 10
   :header-rows: 0

   * - 作業実施日時
     - 2024/05/01 12:00:00
   * - 作業対象
     - server01(RHEL8)
   * - 作業内容
     - ユーザー更新


作業概要登録(ユーザー更新)
--------------------------

| オペレーション登録では、作業を実施する際の作業概要を定義します。
| 先に決めた作業の方針を元にオペレーション情報を記入しましょう。
| ユーザーの更新作業を実施するために、新規オペレーションを作成します。

| :menuselection:`基本コンソール --> オペレーション一覧` から、作業実施日時や作業名を登録します。

.. figure:: /images/learn/quickstart/parameter/更新用オペレーション登録.png
   :width: 1200px
   :alt: オペレーション登録

.. list-table:: オペレーション登録内容
   :widths: 15 10
   :header-rows: 1

   * - オペレーション名
     - 実施予定日時
   * - :kbd:`ユーザー設定変更`
     - :kbd:`2024/05/01 12:00:00`

.. tip::
   | 作業実施日時は、本シナリオでは適当な日時で問題ありませんが、作業日が定まっている場合は、正確な作業実施の予定日時を設定することを推奨します。
   | 定期作業などの繰り返し行われる作業のように、作業日が定まっていない場合は現在の日時を登録しても問題ありません。


パラメータ更新
--------------

| 次にグループ名を更新（変更）するために、パラメータの更新をしましょう。

| まずは新しいグループを作成してみましょう。
| :menuselection:`入力用 --> 新規グループ` から、グループに対するパラメータを登録します。

.. figure:: /images/learn/quickstart/parameter/更新用グループパラメータ入力.png
   :width: 1200px
   :alt: グループのパラメータ登録

.. list-table:: グループパラメータの設定値
  :widths: 5 15 5 5 5
  :header-rows: 2

  * - ホスト名
    - オペレーション
    - 代入順序
    - パラメータ
    -
  * -
    - オペレーション名
    -
    - グループ名
    - 状態
  * - :kbd:`server01`
    - :kbd:`2024/05/01 12:00:00_ユーザー設定変更`
    - :kbd:`1`
    - :kbd:`update_test01`
    - :kbd:`present`
  * - :kbd:`server01`
    - :kbd:`2024/05/01 12:00:00_ユーザー設定変更`
    - :kbd:`2`
    - :kbd:`update_test02`
    - :kbd:`present`

| 次にユーザーの所属グループを変更・更新しましょう。
| :menuselection:`入力用 --> 新規ユーザー` から、ユーザーに対するパラメータを登録します。

.. figure:: /images/learn/quickstart/parameter/更新用ユーザーパラメータ入力.png
   :width: 1200px
   :alt: ユーザのパラメータ更新

.. list-table:: ユーザーパラメータの設定値
  :widths: 5 20 5 5 5 5
  :header-rows: 2

  * - ホスト名
    - オペレーション
    - 代入順序
    - パラメータ
    -
    -
  * -
    - オペレーション名
    -
    - ユーザー名
    - グループ
    - 状態
  * - :kbd:`server01`
    - :kbd:`2024/05/01 12:00:00_ユーザー設定変更`
    - :kbd:`1`
    - :kbd:`testuser01`
    - :kbd:`update_test01`
    - :kbd:`present`
  * - :kbd:`server01`
    - :kbd:`2024/05/01 12:00:00_ユーザー設定変更`
    - :kbd:`2`
    - :kbd:`testuser02`
    - :kbd:`update_test01`
    - :kbd:`present`
  * - :kbd:`server01`
    - :kbd:`2024/05/01 12:00:00_ユーザー設定変更`
    - :kbd:`3`
    - :kbd:`testuser03`
    - :kbd:`update_test02`
    - :kbd:`present`
  * - :kbd:`server01`
    - :kbd:`2024/05/01 12:00:00_ユーザー設定変更`
    - :kbd:`4`
    - :kbd:`testuser04`
    - :kbd:`update_test02`
    - :kbd:`present`


パラメータ表示
==============

パラメータ登録
--------------

| パラメータ集の機能を使用する前に、パラメータシートにホストを登録しましょう。
| パラメータシートにホストを登録しないと、パラメータ集の機能、対象ホスト選択時に一覧に表示がされません。

| :menuselection:`パラメータシート作成 --> パラメータシート定義・作成` から、ホストを登録するために、「ホスト登録」というパラメータシートを作成します。

.. figure:: /images/learn/quickstart/parameter/ホストパラメータシート作成.png
   :width: 1200px
   :alt: パラメータシート作成

.. list-table:: パラメータシート作成(サーバー基本情報)の項目の設定値
   :widths: 10 10
   :header-rows: 1

   * - 設定項目
     - 項目1設定値
   * - 項目の名前
     - :kbd:`ホスト`
   * - 項目の名前(Rest API用)
     - :kbd:`host`
   * - 入力方式
     - :kbd:`プルダウン選択`
   * - 選択項目
     - :kbd:`Ansible共通:機器一覧:ホスト名`
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

.. list-table:: パラメータシート作成(サーバー基本情報)のパラメータシート作成情報の設定値
   :widths: 5 10
   :header-rows: 1

   * - 設定項目
     - 設定値
   * - 項番
     - (自動入力)
   * - パラメータシート名
     - :kbd:`ホスト登録`
   * - パラメータシート名(REST)
     - :kbd:`host_register`
   * - 作成対象
     - :kbd:`パラメータシート（ホスト/オペレーションあり）`
   * - 表示順序
     - :kbd:`9999`
   * - バンドル利用
     - 「利用する」にチェックを入れない(無効)
   * - 最終更新日時
     - (自動入力)
   * - 最終更新者
     - (自動入力)

| :menuselection:`入力用 --> ホスト登録` から対象のホストを登録していきます。

.. figure:: /images/learn/quickstart/parameter/ホストパラメータ入力.png
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
    - ホスト
  * - :kbd:`server01`
    - :kbd:`2024/04/01 12:00:00_新規ユーザ登録`
    - :kbd:`server01`
  * - :kbd:`server01`
    - :kbd:`2024/05/01 12:00:00_ユーザー設定変更`
    - :kbd:`server01`


パラメータ集の表示
------------------

| それでは今まで登録してきた内容をもとにパラメータ集を表示させてみましょう。
| :menuselection:`メインメニュー --> パラメータ集` を選択して、パラメータシートの情報を取得してみましょう。

パラメータモード選択
--------------------

| 最初にパラメータモードを選択します。パラメータモードには、ホストとオペレーションの2種類があります。
| 今回はパラメータシートの複数のオペレーションのデータを取得したいので、ホストを選択していきます。

.. list-table:: パラメータモード選択
  :widths: 30
  :header-rows: 1

  * - :kbd:`パラメータモード`
  * - :kbd:`ホスト`

オペレーション選択
------------------

| オペレーションタイムラインからオペレーションを選択します。
| パラメータモードがホストの場合、オペレーションを1つ以上選択します。
| 今回は先ほど作成した、新規ユーザー登録 と ユーザー設定変更 の2つのオペレーションを選択していきます。

対象パラメータ選択
------------------

| 検索する対象となるパラメータを選択します。
| 選択ボタンを押下してパラメータシート一覧から、検索したいパラメータシートを選択します。

.. list-table:: 対象パラメータ選択
  :widths: 10 10
  :header-rows: 1

  * - 対象パラメータ
    -
  * - :kbd:`新規グループ`
    - :kbd:`新規ユーザー`

対象ホスト選択
--------------

| 選択可能なホストはパラメータシートに登録されているホストのみです。
| 選択ボタンを押下してホスト一覧から、対象ホストを選択します。

.. list-table:: 対象ホスト選択
  :widths: 20
  :header-rows: 1

  * - 対象ホスト
  * - :kbd:`server01`

パラメータ表示実行
------------------

| それでは実際にパラメータ表示を実行していきましょう。
| パラメータモードがホストの場合、オペレーション毎にパラメータシートの各項目の値が表示されます。
| 必要な項目の入力が終わると、対象ホスト選択の下のパラメータ表示ボタンが選択出来るようになりますので、こちらを選択していきます。

| パラメータ表示を実行すると画像のように、選択したオペレーションごとに設定したパラメータを一覧表示で確認することが出来ます。

.. figure:: /images/learn/quickstart/parameter/パラメータ集表示.gif
   :width: 1200px
   :alt: パラメータ登録


まとめ
======

| 本シナリオでは、グループとユーザー作成、更新作業を通してパラメータ集の操作方法を学習しました。
| パラメータ集の機能を使えば、オペレーションごとに設定したパラメータを簡単に確認することが出来ます。
| より詳細な情報を知りたい場合は、:doc:`../../../manuals/index` を参照してください。
