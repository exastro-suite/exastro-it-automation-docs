
.. list-table:: ita-by-conductor-synchronize における Values 一覧
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - ita-by-conductor-synchronize.replicaCount
     - Pod のレプリカ数
     - 不可
     - 1
   * - ita-by-conductor-synchronize.extraEnv.EXECUTE_INTERVAL
     - 処理終了後から次回実行時までの待機時間
     - 不可
     - 10
   * - ita-by-conductor-synchronize.image.repository
     - コンテナイメージのリポジトリ名
     - 不可
     - exastro/exastro-it-automation-by-conductor-synchronize
   * - ita-by-conductor-synchronize.image.tag
     - コンテナイメージのタグ
     - 不可
     - 2.0.1
   * - ita-by-conductor-synchronize.image.pullPolicy
     - イメージプルポリシー
     - 可
     - | :program:`IfNotPresent` (デフォルト): コンテナイメージが存在しない場合のみプル
       | :program:`Always`: 毎回必ずプル
       | :program:`None`: プルしない
