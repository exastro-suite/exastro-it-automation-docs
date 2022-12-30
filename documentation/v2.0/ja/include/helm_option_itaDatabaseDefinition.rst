
.. list-table:: 共通設定 (認証機能用データベース) のオプションパラメータ
   :widths: 25 25 5 5 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 設定・変更
     - 必須
     - デフォルト値・選択可能な設定値
   * - global.itaDatabaseDefinition.name
     - 
     - 不可
     - ○
     - ita-database 
   * - global.itaDatabaseDefinition.enabled
     - 
     - 不可
     - ○
     - true 
   * - global.itaDatabaseDefinition.config.DB_VENDOR
     - 
     - 不可
     - ○
     - mariadb 
   * - global.itaDatabaseDefinition.config.DB_HOST
     - 
     - 不可
     - ○
     - mariadb.exastro-platform.svc 
   * - global.itaDatabaseDefinition.config.DB_PORT
     - 
     - 不可
     - ○
     - 3306 
   * - global.itaDatabaseDefinition.config.DB_DATABASE
     - 
     - 不可
     - ○
     - ITA_DB 
   * - global.itaDatabaseDefinition.secret.DB_ADMIN_USER
     - 
     - 不可
     - ○
     -  
   * - global.itaDatabaseDefinition.secret.DB_ADMIN_PASSWORD
     - 
     - 不可
     - ○
     -  
   * - global.itaDatabaseDefinition.secret.DB_USER
     - 
     - 不可
     - ○
     -  
   * - global.itaDatabaseDefinition.secret.DB_PASSWORD
     - 
     - 不可
     - ○
     -  
