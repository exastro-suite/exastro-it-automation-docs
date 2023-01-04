
.. list-table:: ita-by-menu-create における Values 一覧
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - ita-by-menu-create.replicaCount
     - Pod のレプリカ数
     - 不可
     - 1
   * - ita-by-menu-create.extraEnv.EXECUTE_INTERVAL
     - 処理終了後から次回実行時までの待機時間
     - 不可
     - 10
   * - ita-by-menu-create.image.repository
     - コンテナイメージのリポジトリ名
     - 不可
     - exastro/exastro-it-automation-by-menu-create
   * - ita-by-menu-create.image.tag
     - コンテナイメージのタグ
     - 不可
     - 2.0.1
   * - ita-by-menu-create.image.pullPolicy
     - イメージプルポリシー
     - 可
     - | :program:`IfNotPresent` (デフォルト): コンテナイメージが存在しない場合のみプル
       | :program:`Always`: 毎回必ずプル
       | :program:`None`: プルしない
