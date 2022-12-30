
.. list-table:: MariaDB のオプションパラメータ
   :widths: 25 25 5 5 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 設定・変更
     - 必須
     - デフォルト値・選択可能な設定値
   * - mariadb.image.repository
     -
     - 不可
     - ○
     - "mariadb"
   * - mariadb.image.tag
     -
     - 不可
     - ○
     - "10.9"
   * - mariadb.image.pullPolicy
     -
     - 不可
     - ○
     - "IfNotPresent"
   * - mariadb.resources.requests.memory
     -
     - 不可
     - ○
     - "256Mi"
   * - mariadb.resources.requests.cpu
     -
     - 不可
     - ○
     - "1m"
   * - mariadb.resources.limits.memory
     -
     - 不可
     - ○
     - "2Gi"
   * - mariadb.resources.limits.cpu
     -
     - 不可
     - ○
     - "4"