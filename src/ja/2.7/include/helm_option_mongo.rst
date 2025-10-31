
.. list-table:: MongoDB コンテナのオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - exastro-platform.mongo.enabled
     - MongoDB コンテナのデプロイの有無
     - 可
     - | :program:`true` (デフォルト): MongoDB コンテナをデプロイします。
       | :program:`false` : MongoDB コンテナをデプロイしません。
   * - exastro-platform.mongo.image.repository
     - コンテナイメージのリポジトリ名
     - 不可
     - "mongo"
   * - exastro-platform.mongo.image.pullPolicy
     - イメージプルポリシー
     - 可
     - | :program:`IfNotPresent` (デフォルト): コンテナイメージが存在しない場合のみプル
       | :program:`Always`: 毎回必ずプル
       | :program:`None`: プルしない
   * - exastro-platform.mongo.image.tag
     - コンテナイメージのタグ
     - 不可
     - "6.0"
   * - exastro-platform.mongo.persistence.enabled
     - Exastro 共用データベースのデータ永続化の有効フラグ
     - 可
     - | :program:`true` (デフォルト): データを永続化する
       | :program:`false`: データを永続化しない
   * - exastro-platform.mongo.persistence.reinstall
     - 再インストール時にデータ領域の初期化の要否
     - 不可
     - | :program:`true` : データを初期化(削除)する
       | :program:`false` (デフォルト): データを初期化(削除)しない
   * - exastro-platform.mongo.persistence.accessMode
     - 永続ボリュームのアクセスモードの指定。
     - 不可
     - "ReadWriteOnce"
   * - exastro-platform.mongo.persistence.size
     - 永続ボリュームのディスク容量
     - 可 (データ永続化時)
     - "20Gi"
   * - exastro-platform.mongo.persistence.storageClass
     - 永続ボリュームにストレージクラスを利用する場合のクラスを指定
     - 可 (データ永続化時)
     - | :program:`-` (デフォルト): ストレージクラスを指定しない。
       | :program:`ストレージクラス名`: クラウドプロバイダなどから提供されるストレージクラス名を指定。
   * - exastro-platform.mongo.persistence.matchLabels.name
     - 利用する永続ボリューム名を指定
     - 不可
     - "コメントアウト"
   * - exastro-platform.mongo.resources.requests.memory
     - メモリ要求
     - 可
     - "256Mi"
   * - exastro-platform.mongo.resources.requests.cpu
     - CPU要求
     - 可
     - "1m"
   * - exastro-platform.mongo.resources.limits.memory
     - メモリ上限
     - 可
     - "2Gi"
   * - exastro-platform.mongo.resources.limits.cpu
     - CPU上限
     - 可
     - "4"
