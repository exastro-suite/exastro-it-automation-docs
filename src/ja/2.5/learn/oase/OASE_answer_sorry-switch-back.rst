===================================
Sorry画面からの切り戻し実施 (解答)
===================================

問題 (再掲)
===========

| 以下のようなリクエスト数が閾値内に回復したイベントが発生したときに、Sorry画面切り戻しのアクションが実行されるようにOASEの設定を行ってください。

.. list-table:: 通知メール一覧
   :widths: 5 10
   :header-rows: 1

   * - 通知内容
     - Sorry画面切り替え中にリクエスト数が閾値内に回復した場合
   * - :kbd:`件名`
     - :kbd:`[info] Requests: Threshold recovery`
   * - :kbd:`本文`
     - | :kbd:`リクエスト数が、閾値内に回復しました。`
       | :kbd:`RequestCount < 150`

自動化する作業の具体的な検討
============================

| まずは作業計画を立てましょう。

| 今回のシナリオでは、以下の保守作業を自動的に実行します。

- 作業D Sorry画面から切り戻す作業

|

| 今回想定している構成から作業Dが実行されるのは、

 | すでに3台稼働し、Sorry画面に切り替わっている状況において、リクエスト数が3台稼働時の閾値150リクエスト/min内に回復したとき。

| となります。

| ここまで整理できたら、具体的に以下のOASEの設定を行っていきましょう。

1. イベント収集設定
2. ラベルの設定
3. OASEエージェントの設定
4. ルールの設定

イベント収集設定
==================

イベント収集設定
-----------------

.. Warning::
   | 前シナリオで設定したものが残っているようであれば、こちらの設定は不要です。

| イベント収集設定では、エージェントがどの外部サービスからイベントを収集するかを設定します。

| :menuselection:`OASE管理 --> イベント収集` から、外部サービスの情報を登録します。

| :guilabel:`登録` ボタンを押し、以下のエージェントの登録をしていきます。

.. figure:: /images/learn/quickstart/oase/OASE_answer_sorry-switch-back/OASE_answer_sorry-switch-back_エージェント登録詳細画面.png
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

| 入力が終わったら、:guilabel:`編集確認` ボタンを押して登録します。

.. tip::
   | `*` の部分は、各自の外部サービスの情報を入力してください。

ラベルの設定
=============

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
   * - page
     - 作業Dの作業結果を示すためのラベル

.. note::
   | イベントに含まれる全ての情報をラベルとして管理する必要はありません。今後必要になったタイミングで適宜追加や見直しをしましょう。

ラベルの作成
-------------

.. Warning::
   | 前シナリオで設定したものが残っているようであれば、こちらの設定は不要です。

| :menuselection:`ラベル作成` では、イベントを特定する時に利用するキー(ラベル)を作成します。

| :menuselection:`OASE --> ラベル --> ラベル作成` から、ラベルを作成します。

| :guilabel:`登録` ボタンを押し、以下のラベルの設定を追加していきます。
| 必要に応じて、:guilabel:`追加` ボタンを押して行数を追加しましょう。

.. figure:: /images/learn/quickstart/oase/OASE_answer_sorry-switch-back/OASE_answer_sorry-switch-back_ラベル作成詳細画面.png
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
   * - :kbd:`page`
     - :kbd:`#FF2600`

| 入力が終わったら、:guilabel:`編集確認` ボタンを押して登録します。

.. note::
   | ラベルそれぞれにカラーコードを設定することで、付与されたときに見分けやすくなります。

ラベルを付与する条件の設定
---------------------------

| :menuselection:`ラベル付与` では、イベントにラベルを付与する条件と、条件に合った際に付与するラベルの内容を設定します。
| 今回は、リクエスト数閾値内回復を知らせるものであるかどうかを示すラベルを付与する必要があります。

.. Warning::
   | 前シナリオで設定したものが残っているようであれば、こちらの設定は不要です。

| :menuselection:`OASE --> ラベル --> ラベル付与` から、ラベルを付与するための設定を行います。

| :guilabel:`登録` ボタンを押し、以下のラベル付与の設定を追加していきます。
| 必要に応じて、:guilabel:`追加` ボタンを押して行数を追加しましょう。

.. figure:: /images/learn/quickstart/oase/OASE_answer_sorry-switch-back/OASE_answer_sorry-switch-back_ラベル付与詳細画面.png
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
   | メールの本文から通知の基準となった閾値を参照する、「requestcount」のラベルを付与する設定を行います。

OASEエージェントの設定
=======================

| OASEエージェントの設定を行い、エージェントを実行します。

.. Warning::
   | 前シナリオで設定したものが残っているようであれば、こちらの設定は不要です。

.. note::
   | OASEエージェントの詳細は、下記のページにてご確認ください。
   | :doc:`OASE Agent on Docker Compose - Online <../../installation/online/oase_agent/docker_compose>`

.envの設定
----------

| .envの項目にこれまでの工程で設定した値を設定します。

| :file:`exastro-docker-compose/ita_ag_oase/.env` に下記の内容を入力します。

.. figure:: /images/learn/quickstart/oase/OASE_answer_sorry-switch-back/OASE_answer_sorry-switch-back_OASEエージェント設定画面.png
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

.. Warning::
  | UIDが1000以外のユーザで実行する場合は、「chown -R 1000:1000 保存先のボリュームのパス」を実行してください。

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
=============

| では、今度はイベントの発生に合わせてSorry画面からの切り戻し作業を自動的に実行する設定を行っていきましょう。

| 今回は応用として、リクエスト数に関するイベントだけでなく、現在Sorry画面に切り替わっているかどうかも条件に設定していきます。

| 下記のSorry画面に切り替わっているときのリクエスト数回復のイベントを発生させて、設定を進めましょう。

.. list-table:: 通知メール一覧
   :widths: 5 10
   :header-rows: 1

   * - 通知内容
     - リクエスト数回復
   * - :kbd:`件名`
     - :kbd:`[info] Requests: Threshold recovery`
   * - :kbd:`本文`
     - | :kbd:`リクエスト数が、閾値内に回復しました。`
       | :kbd:`RequestCount < 150`

フィルターの設定
-----------------

| :menuselection:`OASE --> ルール --> フィルター` から、:menuselection:`フィルター` を設定します。

| :guilabel:`登録` ボタンを押し、以下のフィルターの設定を追加していきます。

.. figure:: /images/learn/quickstart/oase/OASE_answer_sorry-switch-back/OASE_answer_sorry-switch-back_フィルター設定詳細画面.png
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
     - :kbd:`request_range_max`
     - :kbd:`[["subject", "==", "リクエスト数回復"], ["requestcount", "==", "150"]]`
     - :kbd:`ユニーク`

| 入力が終わったら、:guilabel:`編集確認` ボタンを押して登録します。

.. tip::
   | フィルター名は任意で設定可能です。わかりやすいものを設定しましょう。
   | ラベル「subject」の値から、リクエスト数が閾値内に回復したことを通知するイベントであることを特定できるようにフィルター条件を設定します。
   | ラベル「requestcount」の値から、通知の基準となった閾値を特定できるようにフィルター条件を設定します。
   | 今回は、閾値として150の場合のみを条件としてアクションを実行するので150と設定しました。

   | ラベル「requestcount」だけでは超過したイベントなのか回復したイベントなのか判別できないため、ラベル「subject」をフィルター条件に設定し、イベントを一意に特定できるようにします。
   | このように、イベントごとに特定のラベルを付与しなくても、必要に応じてフィルター条件を複数設定することで、イベントを一意に特定することできます。

| フィルターは :menuselection:`OASE --> イベント --> イベントフロー` からも設定することが可能です。

.. note::
  | 未知のイベントが発生した場合は、:menuselection:`OASE --> イベント --> イベントフロー` からの設定がおすすめです。
  | イベントを参照しながら直感的に設定できます。

| :menuselection:`OASE --> イベント --> イベントフロー` からは以下のように設定します。

.. figure:: /images/learn/quickstart/oase/OASE_answer_sorry-switch-back/OASE_answer_sorry-switch-back_フィルター設定.gif
   :width: 1200px
   :alt: イベントフロー_フィルター

.. Warning::
  | フィルターでイベントを検出するには、そのイベント発生前に設定しておく必要があります。

| 合わせて、Sorry画面に切り替えが行われているのかどうかを把握するためのフィルターも設定しましょう。

.. tip::
   | Sorry画面に切り替えが行われているのかどうかは、Sorry画面に切り替えたアクションの結論イベントに付与したラベルから特定することができます。
   | Sorry画面に切り替えたときの結論イベントのTTLが切れている場合は、改めて、:doc:`OASE_scenario_sorry-switch` に沿って、Sorry画面に切り替えたアクションの結論イベントを発生させましょう。
   | 結論イベントについては、:doc:`OASE_advanced_sorry-switch-back` や :doc:`OASE_advanced2_sorry-switch-back` も参考にしてください。

| :menuselection:`OASE --> ルール --> フィルター` から、:menuselection:`フィルター` を設定します。

| :guilabel:`登録` ボタンを押し、以下のフィルターの設定を追加していきます。

.. figure:: /images/learn/quickstart/oase/OASE_answer_sorry-switch-back/OASE_answer_sorry-switch-back_フィルター設定詳細画面2.png
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
     - :kbd:`sorry_switch`
     - :kbd:`[["page", "==", "sorry"], ["_exastro_type", "==", "conclusion"]]`
     - :kbd:`ユニーク`

| 入力が終わったら、:guilabel:`編集確認` ボタンを押して登録します。

.. tip::
   | フィルター名は任意で設定可能です。わかりやすいものを設定しましょう。
   | ラベル「page」の値から、現在、Sorry画面に切り替わっている状況を特定できるようにフィルター条件を設定します。
   | ラベル「_exastro_type」の値から、結論イベントであることを特定できるようにフィルター条件を設定します。

| フィルターは :menuselection:`OASE --> イベント --> イベントフロー` からも設定することが可能です。

.. note::
  | 未知のイベントが発生した場合は、:menuselection:`OASE --> イベント --> イベントフロー` からの設定がおすすめです。
  | イベントを参照しながら直感的に設定できます。

| :menuselection:`OASE --> イベント --> イベントフロー` からは以下のように設定します。

.. figure:: /images/learn/quickstart/oase/OASE_answer_sorry-switch-back/OASE_answer_sorry-switch-back_フィルター設定2.gif
   :width: 1200px
   :alt: イベントフロー_フィルター

.. Warning::
  | フィルターでイベントを検出するには、そのイベント発生前に設定しておく必要があります。

アクションの設定
----------------

| :menuselection:`アクション` では、ITAで作成したConductorとオペレーションを指定できます。
| Sorry画面からの切り戻しを実施するアクションを指定してみましょう。

| :menuselection:`OASE --> イベント --> イベントフロー` から、:menuselection:`アクション` を設定します。

.. figure:: /images/learn/quickstart/oase/OASE_answer_sorry-switch-back/OASE_answer_sorry-switch-back_アクション設定.gif
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
   * - :kbd:`sorry_switch-back`
     - :kbd:`sorry画面切り戻し`
     - :kbd:`sorry画面切り戻し`
     - :kbd:`false`

.. tip::
   | アクション名は任意で設定可能です。わかりやすいものを設定しましょう。
   | Conductor名称とオペレーション名は、事前に設定してあるものから選択します。今回はSorry画面切り戻し用に準備したものを選択しましょう。

.. Warning::
  | 設定する際に参照したイベントに適用したい場合は、そのイベントのTTL内に設定する必要があります。
  | TTL内に設定が難しいようであれば、事前に :menuselection:`OASE --> ルール --> アクション` から設定しておきましょう。

| :menuselection:`OASE --> ルール --> アクション` からは以下のように設定します。

| :guilabel:`登録` ボタンを押し、以下のアクションの設定を追加していきます。

.. figure:: /images/learn/quickstart/oase/OASE_answer_sorry-switch-back/OASE_answer_sorry-switch-back_アクション設定詳細画面.png
   :width: 1200px
   :alt: アクション

| 入力が終わったら、:guilabel:`編集確認` ボタンを押して登録します。

ルールの設定
------------

| そのフィルターでイベントを検知した場合に実行したいアクションを紐づけましょう。

.. note::
  | Sorry画面からの切り戻しを実施するのは、Sorry画面への切り替えが行われている状況で、リクエスト数が閾値内に回復したイベントが発生した場合です。
  | フィルター演算子を用いることで、二つのフィルターを条件にできます。

| :menuselection:`OASE --> イベント --> イベントフロー` から、:menuselection:`ルール` を設定します。

.. figure:: /images/learn/quickstart/oase/OASE_answer_sorry-switch-back/OASE_answer_sorry-switch-back_ルール詳細画面.gif
   :width: 1200px
   :alt: イベントフロー_ルール2

.. list-table:: ルールの設定値
   :widths: 7 20 20 10 15 20 20 20 25 10 20 5
   :header-rows: 3

   * - 有効
     - ルール名
     - ルールラベル名
     - 優先順位
     - 条件
     -
     -
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
     - フィルター演算子
     - フィルターB
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
     -
     -
     - アクション
     - イベント
     -
     -
   * - :kbd:`True`
     - :kbd:`sorry画面切り戻し`
     - :kbd:`sorry画面切り戻し`
     - :kbd:`1`
     - :kbd:`sorry_switch`
     - :kbd:`A -> B`
     - :kbd:`request_range_max`
     - :kbd:`sorry_switch-back`
     - :kbd:`True`
     - :kbd:`False`
     - :kbd:`[["page", "normal"]]`
     - :kbd:`60`

.. tip::
   | ルール名・ルールラベル名は任意で設定可能です。わかりやすいものを設定しましょう。
   | 条件では、フィルターの設定で設定したフィルター「sorry_switch」と「request_range_max」を選択します。
   | アクションでは、アクションの設定で設定したアクション「sorry_switch-back」を選択します。
   | これにより、フィルタ―「sorry_switch」でイベントを検知したあとに、「request_range_max」でイベントを検知したら、アクション「sorry_switch-back」が実行されます。

   | 条件が成立するためには、フィルタ―「sorry_switch」で検知したイベントのTTL内に「request_range_max」でイベントが検知される必要があります。
   | そのため、:doc:`OASE_scenario_sorry-switch` のルール設定の際にTTLを長めに設定しました。

   | 結論ラベル設定には、アクションが実行されたことを示す結論イベントに付与するラベルを設定します。
   | 結論イベントが判別しやすいようなラベルを設定するとよいでしょう。

.. Warning::
  | 設定する際に参照したイベントに適用したい場合は、そのイベントのTTL内に設定する必要があります。
  | TTL内に設定が難しいようであれば、事前に :menuselection:`OASE --> ルール --> ルール` から設定しておきましょう。

| :menuselection:`OASE --> ルール --> ルール` からは以下のように設定します。

| :guilabel:`登録` ボタンを押し、以下のルールの設定を追加していきます。

.. figure:: /images/learn/quickstart/oase/OASE_answer_sorry-switch-back/OASE_answer_sorry-switch-back_ルール設定詳細画面.png
   :width: 1200px
   :alt: ルール

| 入力が終わったら、:guilabel:`編集確認` ボタンを押して登録します。

結果の確認
-----------

| 以上の設定が完了すると、発生したイベントをもとにアクションが実行される様子を、:menuselection:`イベントフロー` 画面から確認してみましょう。

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
       | :kbd:`RequestCount < 150`

| :menuselection:`OASE --> イベント --> イベントフロー` の画面に、時系列にイベントが発生しているのが確認できます。
| アクションが実行されたことを示す結論イベントには、スケールインの時とは違う、:menuselection:`ルール` で設定したラベルが付与されているのも確認しましょう。

.. figure:: /images/learn/quickstart/oase/OASE_answer_sorry-switch-back/OASE_answer_sorry-switch-back_結果確認.gif
   :width: 1200px
   :alt: イベントフロー_結論イベント2
