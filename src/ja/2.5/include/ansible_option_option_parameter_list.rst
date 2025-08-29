
| :menuselection:`Ansible共通 --> インターフェース情報` と :menuselection:`各モード --> Movement一覧` の :menuselection:`オプションパラメータ` について説明します。
| ITAでは、以下の優先順位でオプションパラメータを設定します。単一の値しか許容していないパラメータを複数定義した場合、 :menuselection:`各モード --> Movement一覧` の :menuselection:`オプションパラメータ` が有効になります。

#. | :menuselection:`各モード --> Movement一覧` の :menuselection:`オプションパラメータ`
#. | :menuselection:`Ansible共通 --> インターフェース情報` の :menuselection:`オプションパラメータ`

| ▼ :menuselection:`Ansible共通 --> インターフェース情報` の :menuselection:`実行エンジン` が「Ansible Core」と「Ansible Execution Agent」の場合
| 　　ansible-playbookコマンドのオプションパラメータを入力します。
| 　　ansible-playbookコマンドのオプションパラメータの仕様については、以下のコマンドを実行して表示されたヘルプを参照してください。

.. code-block:: none

   ansible-playbook -h

|
| ▼ :menuselection:`Ansible共通 --> インターフェース情報` の :menuselection:`実行エンジン` が「Ansible Automation Controller」の場合に
| 　　入力可能なオプションパラメータは以下のとおりです。
|

.. list-table:: Ansible Automation Controllerの場合に指定可能なオプションパラメータ一覧
   :widths: 20 30 40 50
   :header-rows: 1
   :align: left

   * - オプションパラメータ
     - 指定方法
     - Ansible Automation Controllerの設定箇所
     - 備考
   * - | -v
       | --verbose
     - | -v
       | -vv
       | -vvv
       | -vvvv
       | -vvvvv
       | --verbose
     - :menuselection:`テンプレート` の :menuselection:`詳細` に v の数が設定される。
     - | ・vの合計値を適用
       | ・--verboseは、-vと同様
       | 例：--verbose -vvv の場合、-vvvvと同様
       | ・vを6以上指定した場合 、vは5の指定となる
   * - | -f
       | --forks
     - | -f FORKS
       | --forks=FORKS
     - :menuselection:`テンプレート` の :menuselection:`フォーク` にFORKSの値が設定される。
     - | ・FORKSには数値を指定
       | ・複数定義した場合、最後に定義したパラメータが有効
       | 例：-f 1-forks=10の場合、--forks=10が有効となる
       | ・数値以外が指定された場合、エラーとなる
   * - | -l
       | --limit
     - | -l SUBSET
       | --limit=SUBSET
     - :menuselection:`テンプレート` の :menuselection:`制限` にSUBMITの値が設定される。
     - | ・SUBSET:機器一覧にあるホスト名
       | ・複数定義した場合、最後に定義したパラメータが有効
   * - | -e
       | --extra-vars
     - | -e EXTRA_VARS
       | --extra-vars=EXTRA_VARS
     - :menuselection:`テンプレート` の :menuselection:`追加変数` にEXTRA_VARSの値が設定される。
     - | ・EXTRA_VARS:変数名、具体値をjson形式またはyaml形式
       | e.g.) json形式の場合
       | 　-extra-vars={"VAR_1":"directory"}
       | e.g.) yaml形式の場合
       | 　-extra-vars=VAR_1:directory
       | ・複数定義した場合、最後に定義したパラメータが有効
   * - | -t
       | --tags
     - | -t TAGS
       | --tags=TAGS
     - :menuselection:`テンプレート` の :menuselection:`ジョブタグ` にTAGSの値が設定される。
     - | ・TAGS:タグ名
       | ・複数個のパラメータを許容
   * - | -b
       | --become
     - | -b
       | --become
     - :menuselection:`テンプレート` の :menuselection:`権限昇格の有効化` がチェックされる。
     - ・少なくとも1つ指定すればパラメータが有効
   * - | -D
       | --diff
     - | -D
       | --diff
     - :menuselection:`テンプレート` の :menuselection:`変更` の表示が有効化される。
     - ・少なくとも1つ指定すればパラメータが有効
   * - --skip-tags
     - --skip-tags=SKIP_TAGS
     - :menuselection:`テンプレート` の :menuselection:`スキップタグ` にSKIP_TAGSの値が設定される。
     - | ・SKIP_TAGS:スキップタグ名
       | ・複数個のパラメータを許容
   * - --start-at-task
     - --start-at-task=START_AT_TASK
     - | ※Ansible Automation ControllerのWebUI には--start-at-taskの表示はありません。
       | ansible-playbookコマンドの--start-at-taskと同様の扱いになります。
     - ・複数定義した場合、最後に定義したパラメータが有効
   * - | -ufc
       | --use _fact_cache
     - | -ufc
       | --use_fact_cache
     - :menuselection:`テンプレート` の :menuselection:`ファクトキャッシュの有効化` がチェックされる。
     - ・少なくとも1つ指定すればパラメータが有効
   * - | -as
       | --allow_simultaneous
     - | -as
       | --allow_simultaneous
     - :menuselection:`テンプレート` の :menuselection:`同時実行ジョブの有効化` がチェックされる。
     - ・少なくとも1つ指定すればパラメータが有効
   * - | -jsc
       | --jobslice_count
     - | -jsc ジョブスライス数
       | --job_slice_count=ジョブスライス数
     - :menuselection:`テンプレート` の :menuselection:`ジョブスライス数` にジョブスライス数の値が設定される。
     - | ・ジョブスライス数には数値を指定
       | ・複数定義した場合、最後に定義したパラメータが有効



| ※Ansible Automation Controllerのオプションパラメータの仕様については、Ansible Automation Controller公式マニュアルのユーザガイドのジョブテンプレートを参照してください。

