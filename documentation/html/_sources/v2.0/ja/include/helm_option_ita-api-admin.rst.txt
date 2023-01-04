
.. list-table:: ita-api-admin における Values 一覧
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - ita-api-admin.replicaCount
     - Pod のレプリカ数
     - 不可
     - 1
   * - ita-api-admin.image.repository
     - コンテナイメージのリポジトリ名
     - 不可
     - exastro/exastro-it-automation-api-admin
   * - ita-api-admin.image.tag
     - コンテナイメージのタグ
     - 不可
     - 2.0.1
   * - ita-api-admin.image.pullPolicy
     - イメージプルポリシー
     - 可
     - | :program:`IfNotPresent` (デフォルト): コンテナイメージが存在しない場合のみプル
       | :program:`Always`: 毎回必ずプル
       | :program:`None`: プルしない
