==========================================
ルール設定について
==========================================

.. tip::
   | 新規のワークスペースを作成し、以下シナリオを実施してください。

| これまでの検討を踏まえて、具体的に以下の順にOASEの設定を行っていきましょう。

1. イベント収集設定
2. ラベルの設定
3. OASEエージェントの設定
4. ルールの設定

イベント収集設定
==================

イベント収集設定方法
--------------------

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
   * - instance
     - 現在のインスタンス数を示すラベル
   * - page
     - Sorry画面への切り替え状況を示すラベル

ラベルの作成
-------------

| :menuselection:`ラベル作成` では、イベントを特定する時に利用するキー(ラベル)を作成します。

| :menuselection:`OASE --> ラベル --> ラベル作成` から、ラベルを作成します。

| :guilabel:`登録` ボタンを押し、以下のラベルの設定を追加していきます。

.. figure:: /images/learn/quickstart/oase/OASE_master_setting/OASE_master_setting_ラベル.png
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
   * - :kbd:`page`
     - :kbd:`#FF2600`
   * - :kbd:`pattern`
     - :kbd:`#A1DEB8`

| 入力が終わったら、:guilabel:`編集確認` ボタンを押して登録します。

.. note::
   | ラベルそれぞれにカラーコードを設定することで、付与されたときに見分けやすくなります。

ラベルを付与する条件の設定
---------------------------

| :menuselection:`OASE --> ラベル --> ラベル付与` から、ラベルを付与するための設定を行います。

| :guilabel:`登録` ボタンを押し、以下のラベル付与の設定を追加していきます。
| 必要に応じて、:guilabel:`追加` ボタンを押して行数を追加しましょう。

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
     - :kbd:`[alert] Requests: Threshold reached`
     - :kbd:`subject`
     - :kbd:`リクエスト数超過`
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
=============

| では、イベントの発生とイベントが発生した時に稼働しているインスタンスの台数によってアクションが実行されるルールを作成していきましょう。

| リクエスト数に関するイベントだけでなく、現在Sorry画面に切り替わっているかどうかも条件に設定していきます。

フィルターの設定
-----------------

| :menuselection:`OASE --> ルール --> フィルター` から、:menuselection:`フィルター` を設定します。

| フィルターは、:doc:`OASE_master_design` で検討したように、

 | インスタンスが何台稼働しているか
 | どのような通知が来たか

| さらに、

 | sorry画面に切り替わっているか

| という三種類のものが必要です。

| :guilabel:`登録` ボタンを押し、以下のフィルターの設定を追加していきます。

.. figure:: /images/learn/quickstart/oase/OASE_master_setting/OASE_master_setting_フィルター.png
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
     - :kbd:`パターン2`
     - :kbd:`[["instance", "==", "2"], ["pattern", "≠", "2"]]`
     - :kbd:`ユニーク`
   * - :kbd:`True`
     - :kbd:`パターン3`
     - :kbd:`[["instance", "==", "3"], ["pattern", "≠", "3"]]`
     - :kbd:`ユニーク`
   * - :kbd:`True`
     - :kbd:`パターン4`
     - :kbd:`[["page", "==", "sorry"], ["pattern", "≠", "4"]]`
     - :kbd:`ユニーク`
   * - :kbd:`True`
     - :kbd:`パターン5`
     - :kbd:`[["instance", "==", "3"], ["pattern", "≠", "5"]]`
     - :kbd:`ユニーク`
   * - :kbd:`True`
     - :kbd:`パターン6`
     - :kbd:`[["instance", "==", "2"], ["pattern", "≠", "6"]]`
     - :kbd:`ユニーク`
   * - :kbd:`True`
     - :kbd:`超過_通知`
     - :kbd:`[["subject", "==", "リクエスト数超過"], ["_exastro_type", "≠", "conclusion"]]`
     - :kbd:`ユニーク`
   * - :kbd:`True`
     - :kbd:`超過_閾値50以外`
     - :kbd:`[["requestcount", "≠", "50"], ["subject", "==", "リクエスト数超過"]]`
     - :kbd:`ユニーク`
   * - :kbd:`True`
     - :kbd:`超過_閾値150`
     - :kbd:`[["requestcount", "==", "150"], ["subject", "==", "リクエスト数超過"]]`
     - :kbd:`ユニーク`
   * - :kbd:`True`
     - :kbd:`回復_通知`
     - :kbd:`[["subject", "==", "リクエスト数回復"], ["_exastro_type", "≠", "conclusion"]]`
     - :kbd:`ユニーク`
   * - :kbd:`True`
     - :kbd:`回復_閾値150以外`
     - :kbd:`[["requestcount", "≠", "150"], ["subject", "==", "リクエスト数回復"]]`
     - :kbd:`ユニーク`
   * - :kbd:`True`
     - :kbd:`回復_閾値50`
     - :kbd:`[["requestcount", "==", "50"], ["subject", "==", "リクエスト数回復"]]`
     - :kbd:`ユニーク`

| 入力が終わったら、:guilabel:`編集確認` ボタンを押して登録します。

フィルターの設定ポイント
-------------------------

フィルター名について
 | 任意で設定可能です。わかりやすいものを設定しましょう。

それぞれのフィルターの性格について
 | 「パターン＊」は、それぞれ、パターンごとの状況把握のためのフィルターになります。
 | それ以外のものは、通知内容を確認するものになります。

「超過_通知」「回復_通知」について
 | こちらのフィルターは以下のパターンで用います。

 - パターン1 インスタンス1台のとき、リクエスト数超過通知:50/100/150
 - パターン4 sorry画面に切り替わっているとき、リクエスト数回復通知:50/100/150

 | イベントが発生したら、閾値に関わらず、アクションが実行されるものです。
 | ["_exastro_type", "≠", "conclusion"]が設定されているのは、「subject」だけだと、ほかの「元イベントのラベル継承」をした結論イベントでも該当するからです。
 | 意図せず、条件にあってしまうことを避けるために設定します。

「超過_通知」「回復_通知」以外の通知内容を把握するフィルターについて
 | これらのフィルターでは、

   | 通知内容が届いたときのイベントから通知内容をフィルタリングする場合
   | 通知内容と状況に基づいてアクションが実行された後の結論イベントから通知内容をフィルタリングする場合

 | があるため、["_exastro_type", "≠", "conclusion"]は条件に入っていません。

 | また、それぞれ閾値の指定があるのは、

 - パターン2 インスタンス2台のとき、リクエスト数超過通知:100/150
 - パターン3 インスタンス3台のとき、リクエスト数超過通知:150
 - パターン5 インスタンス3台のとき、リクエスト数回復通知:50/100
 - パターン6 インスタンス2台のとき、リクエスト数回復通知:50

 | の閾値によって条件付けされているパターンに対応するためです。

アクションの設定
----------------

| :menuselection:`OASE --> ルール --> アクション`  から、:menuselection:`アクション` を設定します。

| :guilabel:`登録` ボタンを押し、以下のアクションの設定を追加していきます。

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
   * - :kbd:`scale-out`
     - :kbd:`インスタンススケールアウト`
     - :kbd:`インスタンススケールアウト`
     - :kbd:`false`
   * - :kbd:`scale-in`
     - :kbd:`インスタンススケールイン`
     - :kbd:`インスタンススケールイン`
     - :kbd:`false`
   * - :kbd:`sorry_switch`
     - :kbd:`Sorry画面切り替え`
     - :kbd:`Sorry画面切り替え`
     - :kbd:`false`
   * - :kbd:`sorry_switch-back`
     - :kbd:`sorry画面切り戻し`
     - :kbd:`sorry画面切り戻し`
     - :kbd:`false`

| 入力が終わったら、:guilabel:`編集確認` ボタンを押して登録します。

.. tip::
   | アクション名は任意で設定可能です。わかりやすいものを設定しましょう。
   | Conductor名称とオペレーション名は、事前に設定してあるものから選択します。

ルールの設定方法
----------------

| それでは、フィルターとアクションを以下の6パターンに合わせて紐づけていきましょう。

| scale-outが実行される状況

- パターン1 インスタンス1台のとき、リクエスト数超過通知:50/100/150
- パターン2 インスタンス2台のとき、リクエスト数超過通知:100/150

| sorry画面への切り替えが実行される状況

- パターン3 インスタンス3台のとき、リクエスト数超過通知:150

| sorry画面からの切り戻しが実行される状況

- パターン4 sorry画面に切り替わっているとき、リクエスト数回復通知:50/100/150

| scale-inが実行される状況

- パターン5 インスタンス3台のとき、リクエスト数回復通知:50/100
- パターン6 インスタンス2台のとき、リクエスト数回復通知:50

| :menuselection:`OASE --> ルール --> ルール` から、:menuselection:`ルール` を設定します。

| :guilabel:`登録` ボタンを押し、以下のルールの設定を追加していきます。

.. figure:: /images/learn/quickstart/oase/OASE_master_setting/OASE_master_setting_ルール.png
   :width: 1200px
   :alt: ルール

.. list-table:: ルールの設定値
   :widths: 6 10 15 10 18 15 16 15 20 9 16 6
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
     - :kbd:`パターン1`
     - :kbd:`インスタンス数2台へscale-out`
     - :kbd:`2`
     - :kbd:`超過_通知`
     -
     -
     - :kbd:`scale-out`
     - :kbd:`True`
     - :kbd:`True`
     - :kbd:`[["instance", "2"], ["pattern", "1"]]`
     - :kbd:`3600`
   * - :kbd:`True`
     - :kbd:`パターン2`
     - :kbd:`インスタンス数3台へscale-out`
     - :kbd:`1`
     - :kbd:`超過_閾値50以外`
     - :kbd:`A and B`
     - :kbd:`パターン2`
     - :kbd:`scale-out`
     - :kbd:`True`
     - :kbd:`True`
     - :kbd:`[["instance", "3"], ["pattern", "2"]]`
     - :kbd:`3600`
   * - :kbd:`True`
     - :kbd:`パターン3`
     - :kbd:`Sorryへ切り替え`
     - :kbd:`1`
     - :kbd:`超過_閾値150`
     - :kbd:`A and B`
     - :kbd:`パターン3`
     - :kbd:`sorry_switch`
     - :kbd:`True`
     - :kbd:`false`
     - :kbd:`[["page", "sorry"], ["pattern", "3"]]`
     - :kbd:`3600`
   * - :kbd:`True`
     - :kbd:`パターン4`
     - :kbd:`Sorry切り戻し`
     - :kbd:`1`
     - :kbd:`回復_通知`
     - :kbd:`A and B`
     - :kbd:`パターン4`
     - :kbd:`sorry_switch-back`
     - :kbd:`True`
     - :kbd:`True`
     - :kbd:`[["page", "normal"], ["pattern", "4"], ["instance", "3"]]`
     - :kbd:`3600`
   * - :kbd:`True`
     - :kbd:`パターン5`
     - :kbd:`インスタンス数2台へscale-in`
     - :kbd:`1`
     - :kbd:`回復_閾値150以外`
     - :kbd:`A and B`
     - :kbd:`パターン5`
     - :kbd:`scale-in`
     - :kbd:`True`
     - :kbd:`True`
     - :kbd:`[["instance", "2"], ["pattern", "5"]]`
     - :kbd:`3600`
   * - :kbd:`True`
     - :kbd:`パターン6`
     - :kbd:`インスタンス数1台へscale-in`
     - :kbd:`1`
     - :kbd:`回復_閾値50`
     - :kbd:`A and B`
     - :kbd:`パターン6`
     - :kbd:`scale-in`
     - :kbd:`True`
     - :kbd:`false`
     - :kbd:`[["instance", "1"], ["pattern", "6"]]`
     - :kbd:`10`

| 入力が終わったら、:guilabel:`編集確認` ボタンを押して登録します。

ルールの設定ポイント
-------------------------

ルール名・ルールラベル名について
 | 任意で設定可能です。わかりやすいものを設定しましょう。

条件について
 | パターンの条件に合うフィルターを選択します。

 | パターン1では、平常時のインスタンス数1台である状態をOASEのイベントとしては管理していないので、条件は「超過_通知」のみとなります。
 | リクエスト数超過通知のイベントが発生したときに、前提となる状況を示す結論イベントがなければ、こちらのルールが適用されるように、優先順位を「2」とします。

 | パターン1以外のパターンでは、前提となる状況を示す結論イベントが条件の一つになりますので、そちらを選択します。

 | 複数の条件がある場合は、それぞれの項目を以下のように設定します。

  | フィルターA : 通知内容をフィルタリングするためのフィルター
  | フィルター演算子 :「A and B」
  | フィルターB : 前提となる状況をフィルタリングするためのフィルター

 | 同じキーがフィルターAとフィルターBそれぞれにフィルタリングされるイベントの両方に付与されていた場合、
 | フィルターAでフィルタリングされたイベントのラベルの値が継承される仕様のためです。
 | 通知内容を示すラベルが次のアクションのために必要なので、通知内容を示すイベントのラベルをフィルタリングするフィルターをフィルターAに設定します。

結論ラベルについて
 | アクションが実行された結果がわかるように、ラベルを付与するよう設定を行います。
 | 元イベントから継承するラベルの中に結論ラベル設定で設定するキーがある場合は、結論ラベル設定で設定した値が付与される仕様です。
 | こちらの仕様を活用して、アクションが実行される前の状況を示す値となっているラベルの値を、アクションが実行された後の状況を示す値に更新するように設定を行います。
 | これにより、結論イベントがその結論イベントを発生させたルールに再適用されるループの発生を回避することもできます。

TTLについて
 | 前提となる状況を示す結論イベントが各ルールの条件となるため、:doc:`OASE_advanced_sorry-switch-back` でも説明したように、
 | TTLを通知内容を示すイベントが発生するまで伸ばす必要があります。
 | 今回は :doc:`OASE_advanced_sorry-switch-back` で提示したTTL切れを防ぐ方法のうち、TTLを長めに設定する方法を採用しました。
 | もし結論イベントをループさせたい場合は、各ルールで発生する結論イベントにループ用の["event_status", "progress"]などを付与し、
 | こちらのラベルが付与されたイベントをフィルタリングするフィルターを条件としたルールを追加してください。
 | その際に、ループが発生するように「元イベントのラベル継承」をTrueにし、優先順位は「3」としましょう。
 | これにより、ほかのルールが適用されなかった場合、このルールが適用されるようになります。

パターン6について
 | 平常時に戻った状態となり、次のイベントの条件になることはありません。
 | そのため、意図しない形でほかの条件となってしまわないように、TTLを最小値にし、念のため、「元イベントのラベル継承」を「false」に設定しておくとよいでしょう。

結果の確認
-----------

| では、:menuselection:`イベントフロー` 画面から、ルールに従ってイベントが発生していく様子を確認してみましょう。

| :menuselection:`OASE --> イベント --> イベントフロー` の画面に、時系列にイベントが発生しているのが確認できます。
| 複数のアクションが連続して発生している様子を確認してみましょう。

| 以下は、インスタンス1台のときに閾値150リクエスト/minを超過したというリクエスト数超過通知が来た場合と、
| その後、閾値150リクエスト/min未満に回復したというリクエスト数回復通知が来た場合のものになります。

.. figure:: /images/learn/quickstart/oase/OASE_master_setting/OASE_master_setting_結果確認.gif
   :width: 1200px
   :alt: イベントフロー_結論イベント





