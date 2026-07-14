
.. list-table:: MariaDB コンテナのオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - exastro-platform.mariadb.enabled
     - MariaDB コンテナのデプロイの有無
     - 可
     - | :program:`true` (デフォルト): MariaDB コンテナをデプロイします。
       | :program:`false` : MariaDB コンテナをデプロイしません。
   * - exastro-platform.mariadb.image.repository
     - コンテナイメージのリポジトリ名
     - 不可
     - "docker.io/mariadb"
   * - exastro-platform.mariadb.image.tag
     - コンテナイメージのタグ
     - 不可
     - "10.11"
   * - exastro-platform.mariadb.image.pullPolicy
     - イメージプルポリシー
     - 可
     - | :program:`IfNotPresent` (デフォルト): コンテナイメージが存在しない場合のみプル
       | :program:`Always`: 毎回必ずプル
       | :program:`None`: プルしない
   * - exastro-platform.mariadb.persistence.enabled
     - Exastro 共用データベースのデータ永続化の有効フラグ
     - 可
     - | :program:`"true"` (デフォルト): データを永続化する
       | :program:`"false"`: データを永続化しない
   * - exastro-platform.mariadb.persistence.reinstall
     - 再インストール時にデータ領域の初期化の要否
     - 不可
     - | :program:`"true"`: データを初期化(削除)する
       | :program:`"false"` (デフォルト): データを初期化(削除)しない
   * - exastro-platform.mariadb.persistence.accessMode
     - 永続ボリュームのアクセスモードの指定。
     - 可(データ永続化時)
     - "ReadWriteOnce"
   * - exastro-platform.mariadb.persistence.size
     - 永続ボリュームのディスク容量
     - 可 (データ永続化時)
     - "20Gi"
   * - exastro-platform.mariadb.persistence.storageClass
     - 永続ボリュームにストレージクラスを利用する場合のクラスを指定
     - 可 (データ永続化時)
     - | :program:`"-"` (デフォルト): ストレージクラスを指定しない。
       | :program:`ストレージクラス名`: クラウドプロバイダなどから提供されるストレージクラス名を指定。
   * - exastro-platform.mariadb.persistence.matchLabels.name
     - 利用する永続ボリューム名を指定
     - 可(データ永続化時)
     - "pv-database"
   * - exastro-platform.mariadb.resources.requests.memory
     - メモリ要求
     - 可
     - "256Mi"
   * - exastro-platform.mariadb.resources.requests.cpu
     - CPU要求
     - 可
     - "1m"
   * - exastro-platform.mariadb.resources.limits.memory
     - メモリ上限
     - 可
     - "2Gi"
   * - exastro-platform.mariadb.resources.limits.cpu
     - CPU上限
     - 可
     - "4"
