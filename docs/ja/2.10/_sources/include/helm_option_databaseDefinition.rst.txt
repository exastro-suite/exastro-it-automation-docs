
.. list-table:: 共通設定 (Exastro 共用データベース) のオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - global.databaseDefinition.name
     - Exastro 共用データベースの定義名
     - 不可
     - "mariadb"
   * - global.databaseDefinition.enabled
     - Exastro 共用データベースの定義の利用有無
     - 不可
     - true
   * - global.databaseDefinition.secret.MARIADB_ROOT_PASSWORD
     - Exastro 共用データベースの root アカウントに設定するパスワード(エンコードなし)
     - 必須
     - 任意の文字列
   * - global.databaseDefinition.persistence.enabled
     - Exastro 共用データベースのデータ永続化の有効フラグ
     - 可
     - | :program:`"true"` (デフォルト): データを永続化する
       | :program:`"false"`: データを永続化しない
   * - global.databaseDefinition.persistence.reinstall
     - 再インストール時にデータ領域の初期化の要否
     - 可 (データ永続化時)
     - | :program:`"true"` (デフォルト): データを初期化(削除)する
       | :program:`"false"`: データを初期化(削除)しない
   * - global.databaseDefinition.persistence.accessMode
     - 永続ボリュームのアクセスモードの指定。
     - 不可
     - "ReadWriteOnce"
   * - global.databaseDefinition.persistence.size
     - 永続ボリュームのディスク容量
     - 可 (データ永続化時)
     - "20Gi"
   * - global.databaseDefinition.persistence.volumeType
     - 永続ボリュームのボリュームタイプ
     - 可 (現在無効)
     - | :program:`"hostPath"` (デフォルト): Kubernetes クラスタのノード上にデータを保存(非推奨)
       | :program:`"AKS"`: AKS のストレージクラスを利用
   * - global.databaseDefinition.persistence.storageClass
     - 永続ボリュームにストレージクラスを利用する場合のクラスを指定
     - 可 (データ永続化時)
     - | :program:`"-"` (デフォルト): ストレージクラスを指定しない。
       | :program:`ストレージクラス名`: クラウドプロバイダなどから提供されるストレージクラス名を指定。
