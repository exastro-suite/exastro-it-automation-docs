
.. list-table:: 共通設定 (Exastro 共用データベース) のオプションパラメータ
   :widths: 25 25 5 5 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 設定・変更
     - 必須
     - デフォルト値・選択可能な設定値
   * - global.databaseDefinition.name
     -
     - 不可
     - ○
     - "mariadb"
   * - global.databaseDefinition.enabled
     -
     - 不可
     - ○
     - "true"
   * - global.databaseDefinition.secret.MARIADB_ROOT_PASSWORD
     -
     - 不可
     - ○
     - ""
   * - global.databaseDefinition.persistence.enabled
     -
     - 不可
     - ○
     - "true"
   * - global.databaseDefinition.persistence.reinstall
     -
     - 不可
     - ○
     - "false"
   * - global.databaseDefinition.persistence.accessMode
     -
     - 不可
     - ○
     - "ReadWriteOnce"
   * - global.databaseDefinition.persistence.size
     -
     - 不可
     - ○
     - "20Gi"
   * - global.databaseDefinition.persistence.volumeType
     -
     - 不可
     - ○
     - "hostPath"
   * - global.databaseDefinition.persistence.storageClass
     -
     - 不可
     - ○
     - "-"
