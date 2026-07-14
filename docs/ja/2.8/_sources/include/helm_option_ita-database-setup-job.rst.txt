
.. list-table:: ita-database-setup-job における Values 一覧
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - exastro-it-automation.ita-database-setup-job.image.repository
     - コンテナイメージのリポジトリ名
     - 不可
     - ※現在このパラメータは使用していません。
   * - exastro-it-automation.ita-database-setup-job.image.tag
     - コンテナイメージのタグ
     - 不可
     - ※現在このパラメータは使用していません。
   * - exastro-it-automation.ita-database-setup-job.image.pullPolicy
     - イメージプルポリシー
     - 可
     - | :program:`IfNotPresent` (デフォルト): コンテナイメージが存在しない場合のみプル
       | :program:`Always`: 毎回必ずプル
       | :program:`None`: プルしない
       | ※現在このパラメータは使用していません。
