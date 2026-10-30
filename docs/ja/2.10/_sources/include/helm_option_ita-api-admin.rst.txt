
.. list-table:: ita-api-admin における Values 一覧
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - exastro-it-automation.ita-api-admin.replicaCount
     - Pod のレプリカ数
     - 不可
     - 1
   * - exastro-it-automation.ita-api-admin.image.repository
     - コンテナイメージのリポジトリ名
     - 不可
     - docker.io/exastro/exastro-it-automation-api-admin
   * - exastro-it-automation.ita-api-admin.image.tag
     - コンテナイメージのタグ
     - 不可
     - ""
   * - exastro-it-automation.ita-api-admin.image.pullPolicy
     - イメージプルポリシー
     - 可
     - | :program:`IfNotPresent` (デフォルト): コンテナイメージが存在しない場合のみプル
       | :program:`Always`: 毎回必ずプル
       | :program:`None`: プルしない
