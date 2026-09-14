=====================================
インスタンスのスケールイン実施 (解答)
=====================================

問題 (再掲)
===========

| 以下のようなリクエスト数が閾値内に回復したイベントが発生したときに、スケールインのアクションが実行されるようにOASEの設定を行ってください。

.. list-table:: 通知メール一覧
   :widths: 5 10 10
   :header-rows: 1

   * - 通知内容
     - ２台稼働時にリクエスト数が閾値内に回復した場合
     - ３台稼働時にリクエスト数が閾値内に回復した場合
   * - :kbd:`件名`
     - :kbd:`[info] Requests: Threshold recovery`
     - :kbd:`[info] Requests: Threshold recovery`
   * - :kbd:`本文`
     - | :kbd:`リクエスト数が、閾値内に回復しました。`
       | :kbd:`RequestCount < 50`
     - | :kbd:`リクエスト数が、閾値内に回復しました。`
       | :kbd:`RequestCount < 100`

自動化する作業の具体的な検討
==============================

| まずは作業計画を立てましょう。

| 今回のシナリオでは、以下の保守作業を自動的に実行します。

- 作業C インスタンスをスケールインする作業

|

| 今回想定している構成から作業Cが実行されるのは、

 | すでに1台スケールアウトし2台稼働している状況において、リクエスト数がスケールイン後の閾値50リクエスト/min内に回復したとき。
 | すでに2台スケールアウトし3台稼働している状況において、リクエスト数がスケールイン後の閾値100リクエスト/min内に回復したとき。

| となります。

| ここまで整理できたら、具体的に以下のOASEの設定を行っていきましょう。

1. イベント収集設定
2. ラベルの設定
3. OASEエージェントの設定
4. ルールの設定

イベント収集設定
================

イベント収集設定方法
--------------------

| イベント収集設定では、エージェントがどの外部サービスからイベントを収集するかを設定します。

.. Warning::
   | これまでのシナリオで設定したものが残っているようであれば、こちらの設定は不要です。

| :menuselection:`OASE管理 --> イベント収集` から、外部サービスの情報を登録します。

| :guilabel:`登録` ボタンを押し、以下のイベント収集の登録をしていきます。

.. figure:: /images/learn/quickstart/oase/OASE_answer_scale-in/OASE_answer_scale-in_エージェント登録詳細画面.png
   :width: 1200px
   :alt: イベント収集登録画面

.. list-table:: イベント収集設定値
   :widths: 15 10 10 10 10 10 10
   :header-rows: 2

   * - イベント収集設定名
     - 接続方式
     - リクエストメソッド
     - 接続先
     - 認証情報
     -
     - TTL
   * -
     -
     -
     -
     - ユーザー名
     - パスワード
     -
   * - :kbd:`リクエスト監視`
     - :kbd:`IMAP パスワード認証`
     - :kbd:`IMAP: Plaintext`
     - :kbd:`**.***.**.***`
     - :kbd:`*****@**.***`
     - :kbd:`**`
     - :kbd:`60`

| 入力が終わったら、:menuselection:`編集確認` ボタンを押して登録します。

.. tip::
   | `*` の部分は、各自の外部サービスの情報を入力してください。

ラベルの設定
============

| 収集するイベントに付与するラベルの作成と付与する条件を設定します。

.. list-table:: ラベル一覧
   :widths: 10 15
   :header-rows: 1

   * - ラベルキー
     - 利用目的
   * - subject
     - イベントの内容を特定できるようにするラベル
   * - requestcount
     - 基準となった閾値を把握するためのラベル
   * - instance
     - 作業Cの作業結果を示すためのラベル

.. note::
   | イベントに含まれる全ての情報をラベルとして管理する必要はありません。今後必要になったタイミングで適宜追加や見直しをしましょう。

ラベルの作成
-------------

.. Warning::
   | これまでのシナリオで設定したものが残っているようであれば、こちらの設定は不要です。

| :menuselection:`ラベル作成` では、イベントを特定する時に利用するキー(ラベル)を作成します。

| :menuselection:`OASE --> ラベル --> ラベル作成` から、ラベルを作成します。

| :guilabel:`登録` ボタンを押し、以下のラベルの設定を追加していきます。
| 必要に応じて、:guilabel:`追加` ボタンを押して行数を追加しましょう。

.. figure:: /images/learn/quickstart/oase/OASE_answer_scale-in/OASE_answer_scale-in_ラベル作成登録詳細画面.png
   :width: 1200px
   :alt: ラベル作成画面

.. list-table:: ラベル作成の設定値
   :widths: 10 10
   :header-rows: 1

   * - ラベルキー
     - カラーコード
   * - :kbd:`subject`
     - :kbd:`#FBFF00`
   * - :kbd:`requestcount`
     - :kbd:`#7F76F9`
   * - :kbd:`instance`
     - :kbd:`#00FF33`

| 入力が終わったら、:guilabel:`編集確認` ボタンを押して登録します。

.. note::
   | ラベルそれぞれにカラーコードを設定することで、付与されたときに見分けやすくなります。

ラベルを付与する条件の設定
---------------------------

| :menuselection:`ラベル付与` では、イベントにラベルを付与する条件と、条件に合った際に付与するラベルの内容を設定します。
| 今回は、リクエスト数閾値内回復を知らせるものであるかどうかを示すラベルを付与する必要があります。

.. Warning::
   | 「リクエスト数監視」に関しては、これまでのシナリオで設定したものが残っているようであれば、設定は不要です。

| :menuselection:`OASE --> ラベル --> ラベル付与` から、ラベルを付与するための設定を行います。

| :guilabel:`登録` ボタンを押し、以下のラベル付与の設定を追加していきます。
| 必要に応じて、:guilabel:`追加` ボタンを押して行数を追加しましょう。

.. figure:: /images/learn/quickstart/oase/OASE_answer_scale-in/OASE_answer_scale-in_ラベル付与詳細画面.png
   :width: 1200px
   :alt: ラベル付与

.. list-table:: ラベル付与の設定値
   :widths: 10 10 10 10 10 20 10 10
   :header-rows: 2

   * - ラベリング設定名
     - イベント収集設定名
     - 検索条件
     -
     -
     -
     - ラベル
     -
   * -
     -
     - キー
     - 値のデータ型
     - 比較方法
     - 比較する値
     - キー
     - 値
   * - :kbd:`通知名`
     - :kbd:`リクエスト監視`
     - :kbd:`subject`
     - :kbd:`文字列`
     - :kbd:`==`
     - :kbd:`[info] Requests: Threshold recovery`
     - :kbd:`subject`
     - :kbd:`リクエスト数回復`
   * - :kbd:`リクエスト数監視`
     - :kbd:`リクエスト監視`
     - :kbd:`body.plain`
     - :kbd:`その他`
     - :kbd:`RegExp`
     - :kbd:`RequestCount . (\\d{2,3})`
     - :kbd:`requestcount`
     - :kbd:`\\1`

| 入力が終わったら、:guilabel:`編集確認` ボタンを押して登録します。

.. tip::
   | ラベリング設定名とイベント収集設定名は任意で設定可能です。わかりやすいものを設定しましょう。
   | メールの件名から通知内容を特定する、「subject」のラベルを付与する設定を行います。
   | メールの本文から通知の基準となった閾値を参照でする、「requestcount」のラベルを付与する設定を行います。

OASEエージェントの設定
=======================

| OASEエージェントの設定を行い、エージェントを実行します。

.. Warning::
   | これまでのシナリオで設定したものが残っているようであれば、こちらの設定は不要です。

.. note::
   | OASEエージェントの詳細は、下記のページにてご確認ください。
   | :doc:`OASE Agent on Docker Compose - Online <../../installation/online/oase_agent/docker_compose>`

.envの設定
----------

| .envの項目にこれまでの工程で設定した値を設定します。

| :file:`exastro-docker-compose/ita_ag_oase/.env` に下記の内容を入力します。

.. figure:: /images/learn/quickstart/oase/OASE_answer_scale-in/OASE_answer_scale-in_OASEエージェント設定画面.png
   :width: 1200px
   :alt: .env

.. list-table:: .envの設定値
   :widths: 10 10
   :header-rows: 1

   * - 項目名
     - 設定値
   * - :kbd:`AGENT_NAME`
     - :kbd:`ita-oase-agent-01`
   * - :kbd:`EXASTRO_URL`
     - :kbd:`http://********`
   * - :kbd:`EXASTRO_ORGANIZATION_ID`
     - :kbd:`********`
   * - :kbd:`EXASTRO_WORKSPACE_ID`
     - :kbd:`********`
   * - :kbd:`EXASTRO_USERNAME`
     - :kbd:`********`
   * - :kbd:`EXASTRO_PASSWORD`
     - :kbd:`********`
   * - :kbd:`EVENT_COLLECTION_SETTINGS_NAMES`
     - :kbd:`リクエスト監視`
   * - :kbd:`EXECUTE_INTERVAL`
     - :kbd:`5`
   * - :kbd:`LOG_LEVEL`
     - :kbd:`INFO`

.. tip::
   | `*` の部分は、各自の情報を入力してください。
   | 「EXASTRO_USERNAME」と「EXASTRO_PASSWORD」は、ワークスペースのものになります。
   | 各項目の詳細は、下記のページ :menuselection:`2.8.1. OASE Agentの処理フローと.envの設定値` を参照ください。
   | :doc:`OASE 管理 <../../manuals/oase/oase_management>`

エージェントの実行
-------------------

| 次のコマンドを使い、コンテナを起動してみましょう。

.. code-block:: shell
   :caption: docker コマンドを利用する場合(Docker環境)

   docker compose up -d --wait

.. code-block:: shell
   :caption: docker-compose コマンドを利用する場合(Podman環境)

   docker-compose up -d --wait

| 状態が `Healthy` になっていることを確認します。

| 正常に接続できているか、以下のコマンドでLogの確認をします。

.. code-block:: shell
   :caption: docker コマンドを利用する場合(Docker環境)

   docker compose logs -f

.. code-block:: shell
   :caption: docker-compose コマンドを利用する場合(Podman環境)

   docker-compose logs -f

| エラーが出ている場合は、.envファイルの各設定値が正しいか確認してください。

ルールの設定
==============

| :menuselection:`ルール` では、イベントを特定する条件と、その条件に合致したイベントが発生した場合に実行したい作業を紐づけることができます。
| イベントを特定する条件は :menuselection:`フィルター` 、実行したい作業は :menuselection:`アクション` 、でそれぞれ設定します。
| :menuselection:`ルール` では、:menuselection:`フィルター` と :menuselection:`アクション` を紐づける形で設定します。

.. note::
  | :menuselection:`イベントフロー` では、OASEエージェントが収集したイベント等、イベントが時系列に表示されます。
  | 表示されたイベントには、ラベル付与での設定に沿ってラベルが付与されています。
  | この画面から :menuselection:`フィルター` 、:menuselection:`アクション` 、:menuselection:`ルール` の設定をそれぞれ行うこともできます。

| まずは、以下のような、２台稼働時のリクエスト数閾値内回復のイベントを発生させて、設定を進めましょう。

.. list-table:: 通知メール一覧
   :widths: 5 10
   :header-rows: 1

   * - 通知内容
     - リクエスト数回復
   * - :kbd:`件名`
     - :kbd:`[info] Requests: Threshold recovery`
   * - :kbd:`本文`
     - | :kbd:`リクエスト数が、閾値内に回復しました。`
       | :kbd:`RequestCount < 50`

フィルターの設定
------------------

| :menuselection:`フィルター` では、ラベルをもとにイベントを検知するための条件を設定します。
| イベントの件名と本文からスケールインを実施する条件に合うイベントを特定できるように条件を設定してみましょう。

.. note::
  | スケールインを実施するのは、インスタンスが3台未満の稼働の状態で、リクエスト数が閾値内に回復した場合です。
  | 閾値は、インスタンス1台につき50リクエスト/minです。

| :menuselection:`OASE --> ルール --> フィルター` から、:menuselection:`フィルター` を設定します。

| :guilabel:`登録` ボタンを押し、以下のフィルターの設定を追加していきます。

.. figure:: /images/learn/quickstart/oase/OASE_answer_scale-in/OASE_answer_scale-in_フィルター設定詳細画面.png
   :width: 1200px
   :alt: フィルター

.. list-table:: フィルターの設定値
   :widths: 10 10 20 10
   :header-rows: 1

   * - 有効
     - フィルター名
     - フィルター条件
     - 検索方法
   * - :kbd:`True`
     - :kbd:`request_range`
     - :kbd:`[["subject", "==", "リクエスト数回復"], ["requestcount", "≠", "150"]]`
     - :kbd:`ユニーク`

| 入力が終わったら、:guilabel:`編集確認` ボタンを押して登録します。

| フィルターは:menuselection:`OASE --> イベント --> イベントフロー` からも設定することが可能です。

.. tip::
   | フィルター名は任意で設定可能です。わかりやすいものを設定しましょう。
   | ラベル「subject」の値から、リクエスト数が閾値内に回復したことを通知するイベントであることを特定できるようにフィルター条件を設定します。
   | ラベル「requestcount」の値から、通知の基準となった閾値を特定できるようにフィルター条件を設定します。
   | 今回は、閾値として50か100の場合を条件として同じアクションを実行するので150以外と設定しましたが、それぞれの閾値でアクションを変えるなど、個別の設定がしたい場合は、それぞれの閾値で別のフィルターを設定しましょう。

   | ラベル「requestcount」だけでは超過したイベントなのか回復したイベントなのか判別できないため、ラベル「subject」をフィルター条件に設定し、イベントを一意に特定できるようにします。
   | このように、イベントごとに特定のラベルを付与しなくても、必要に応じてフィルター条件を複数設定することで、イベントを一意に特定することできます。

.. note::
  | 未知のイベントが発生した場合は、:menuselection:`OASE --> イベント --> イベントフロー` からの設定がおすすめです。
  | イベントを参照しながら直感的に設定できます。

| :menuselection:`OASE --> イベント --> イベントフロー` からは以下のように設定します。

.. figure:: /images/learn/quickstart/oase/OASE_answer_scale-in/OASE_answer_scale-in_フィルター設定.gif
   :width: 1200px
   :alt: イベントフロー_フィルター

.. Warning::
  | フィルターでイベントを検出するには、そのイベント発生前に設定しておく必要があります。

アクションの設定
-----------------

| :menuselection:`アクション` では、ITAで作成したConductorとオペレーションを指定できます。
| インスタンスを1台スケールインするアクションを登録してみましょう。

| :menuselection:`OASE --> イベント --> イベントフロー` から、:menuselection:`アクション` を設定します。

.. figure:: /images/learn/quickstart/oase/OASE_answer_scale-in/OASE_answer_scale-in_アクション設定.gif
   :width: 1200px
   :alt: イベントフロー_アクション

.. list-table:: アクションの設定値
   :widths: 10 10 10 10
   :header-rows: 2

   * - アクション名
     - Conductor名称
     - オペレーション名
     - ホスト
   * -
     -
     -
     - イベント連携
   * - :kbd:`scale-in`
     - :kbd:`インスタンススケールイン`
     - :kbd:`インスタンススケールイン`
     - :kbd:`false`

.. tip::
   | アクション名は任意で設定可能です。わかりやすいものを設定しましょう。
   | Conductor名称とオペレーション名は、事前に設定してあるものから選択します。今回はスケールイン用に準備したものを選択しましょう。

.. Warning::
  | 発生したイベントに適用したい場合、そのイベントのTTL内に設定する必要があります。
  | TTL内に設定が難しいようであれば、事前に設定しておきましょう。

| :menuselection:`OASE --> ルール --> アクション` からは以下のように設定します。

| :guilabel:`登録` ボタンを押し、以下のアクションの設定を追加していきます。

.. figure:: /images/learn/quickstart/oase/OASE_answer_scale-in/OASE_answer_scale-in_アクション設定詳細画面.png
   :width: 1200px
   :alt: アクション

| 入力が終わったら、:guilabel:`編集確認` ボタンを押して登録します。

ルールの設定方法
----------------

| :menuselection:`ルール` では、フィルターとアクションを紐づけます。
| そのフィルターでイベントを検知した場合に実行したいアクションを紐づけましょう。

| :menuselection:`OASE --> イベント --> イベントフロー` から、:menuselection:`ルール` を設定します。

.. figure:: /images/learn/quickstart/oase/OASE_answer_scale-in/OASE_answer_scale-in_ルール設定.gif
   :width: 1200px
   :alt: イベントフロー_ルール

.. list-table:: ルールの設定値
   :widths: 10 10 10 10 10 10 20 10 15 10
   :header-rows: 3

   * - 有効
     - ルール名
     - ルールラベル名
     - 優先順位
     - 条件
     - アクション
     - 結論イベント
     -
     -
     -
   * -
     -
     -
     -
     - フィルターA
     - アクションID
     - 元イベントのラベル継承
     -
     - 結論ラベル設定
     - TTL
   * -
     -
     -
     -
     -
     -
     - アクション
     - イベント
     -
     -
   * - :kbd:`True`
     - :kbd:`スケールイン`
     - :kbd:`スケールイン`
     - :kbd:`1`
     - :kbd:`request_range`
     - :kbd:`scale-in`
     - :kbd:`True`
     - :kbd:`False`
     - :kbd:`[["instance", "scale-in"]]`
     - :kbd:`60`

.. tip::
   | ルール名・ルールラベル名は任意で設定可能です。わかりやすいものを設定しましょう。
   | 条件では、フィルターの設定で設定したフィルター「request_range」を選択します。
   | アクションでは、アクションの設定で設定したアクション「scale-in」を選択します。
   | これにより、フィルタ―「request_range」でイベントを検知したら、アクション「scale-in」が実行されます。

   | 結論ラベル設定には、アクションが実行されたことを示す結論イベントに付与するラベルを設定します。
   | 結論イベントが判別しやすいようなラベルを設定するとよいでしょう。
   | 分間で集計したリクエスト数をもとに通知されるため、TTLは60秒とします。

.. Warning::
  | 発生したイベントに適用したい場合、そのイベントのTTL内に設定する必要があります。
  | TTL内に設定が難しいようであれば、事前に設定しておきましょう。

| :menuselection:`OASE --> ルール --> ルール` からは以下のように設定します。

| :guilabel:`登録` ボタンを押し、以下のルールの設定を追加していきます。

.. figure:: /images/learn/quickstart/oase/OASE_answer_scale-in/OASE_answer_scale-in_ルール設定詳細画面.png
   :width: 1200px
   :alt: ルール

| 入力が終わったら、:guilabel:`編集確認` ボタンを押して登録します。

結果の確認
-----------
| 以上の設定が完了したら、発生したイベントをもとにアクションが実行される様子を、:menuselection:`イベントフロー` 画面から確認してみましょう。

.. tip::
   | ルールの設定の間に発生させたイベントのTTLが切れてしまったら、改めて同じイベントを発生させてください。

.. list-table:: 通知メール一覧
   :widths: 5 10
   :header-rows: 1

   * - 通知内容
     - リクエスト数回復
   * - :kbd:`件名`
     - :kbd:`[info] Requests: Threshold recovery`
   * - :kbd:`本文`
     - | :kbd:`リクエスト数が、閾値内に回復しました。`
       | :kbd:`RequestCount < 50`

| :menuselection:`OASE --> イベント --> イベントフロー` の画面では、時系列に沿ってイベントが発生している様子を確認できます。
| アクションが実行されたことを示す結論イベントに :menuselection:`ルール` で設定したラベルが付与されていることも確認しましょう。

.. figure:: /images/learn/quickstart/oase/OASE_answer_scale-in/OASE_answer_scale-in_結果確認.gif
   :width: 1200px
   :alt: イベントフロー_結論イベント

| さて次に、2台稼働時のリクエスト数閾値内回復のイベントを発生させてみましょう。

.. list-table:: 通知メール一覧
   :widths: 5 10
   :header-rows: 1

   * - 通知内容
     - リクエスト数回復
   * - :kbd:`件名`
     - :kbd:`[info] Requests: Threshold recovery`
   * - :kbd:`本文`
     - | :kbd:`リクエスト数が、閾値内に回復しました。`
       | :kbd:`RequestCount < 100`

| そうすると、事前に設定したルールが適用され、結論イベントの発生まで確認できます。

.. figure:: /images/learn/quickstart/oase/OASE_answer_scale-in/OASE_answer_scale-in_結果確認2.gif
   :width: 1200px
   :alt: イベントフロー_結論イベント_2回目
