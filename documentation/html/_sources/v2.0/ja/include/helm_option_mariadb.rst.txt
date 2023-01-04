
.. list-table:: MariaDB のオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - mariadb.image.repository
     - コンテナイメージのリポジトリ名
     - 不可
     - "mariadb"
   * - mariadb.image.tag
     - コンテナイメージのタグ
     - 不可
     - "10.9"
   * - mariadb.image.pullPolicy
     - イメージプルポリシー
     - 可
     - | :program:`IfNotPresent` (デフォルト): コンテナイメージが存在しない場合のみプル
       | :program:`Always`: 毎回必ずプル
       | :program:`None`: プルしない
   * - mariadb.resources.requests.memory
     - メモリ要求
     - 可
     - "256Mi"
   * - mariadb.resources.requests.cpu
     - CPU要求
     - 可
     - "1m"
   * - mariadb.resources.limits.memory
     - メモリ上限
     - 可
     - "2Gi"
   * - mariadb.resources.limits.cpu
     - CPU上限
     - 可
     - "4"