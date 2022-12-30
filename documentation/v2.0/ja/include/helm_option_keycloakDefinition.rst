
.. list-table:: 共通設定 (Keycloak) のオプションパラメータ
   :widths: 25 25 5 5 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 設定・変更
     - 必須
     - デフォルト値・選択可能な設定値
   * - global.keycloakDefinition.name
     - Keycloak の定義名
     - 可
     - ○
     - "keycloak"
   * - global.keycloakDefinition.enabled
     - Exastro Platform と同一のクラスタ内への Keycloak のデプロイ要否
     - 不可
     - ○
     - | :program:`true` (デフォルト): 同一クラスタ内に Keycloak をデプロイします。
       | :program:`false` : 同一クラスタ内に Keycloak をデプロイしません。(別途 Keycloak の容易が必要です。)
   * - global.keycloakDefinition.config.API_KEYCLOAK_PROTOCOL
     - Keycloak API エンドポイントのプロトコル
     - 可
     - ○
     - "http”
   * - global.keycloakDefinition.config.API_KEYCLOAK_HOST
     - Keycloak API エンドポイントのホスト名、もしくは、FQDN
     - 可
     - ○
     - "keycloak.exastro-platform.svc"
   * - global.keycloakDefinition.config.API_KEYCLOAK_PORT
     - Keycloak API エンドポイントのポート番号
     - 可
     - ○
     - "8080"
   * - global.keycloakDefinition.config.KEYCLOAK_PROTOCOL
     - Keycloak エンドポイントのプロトコル
     - 可
     - ○
     - "http"
   * - global.keycloakDefinition.config.KEYCLOAK_HOST
     - Keycloak エンドポイントのホスト名、もしくは、FQDN
     - 不可
     - ○
     - "keycloak.exastro-platform.svc"
   * - global.keycloakDefinition.config.KEYCLOAK_PORT
     - Keycloak API エンドポイントのポート番号
     - 不可
     - ○
     - "8080"
   * - global.keycloakDefinition.config.KEYCLOAK_MASTER_REALM
     -
     - 不可
     - ○
     - "master"
   * - global.keycloakDefinition.config.KEYCLOAK_DB_DATABASE
     -
     - 不可
     - ○
     - "keycloak"
   * - global.keycloakDefinition.secret.KEYCLOAK_USER
     -
     - 不可
     - ○
     - ""
   * - global.keycloakDefinition.secret.KEYCLOAK_PASSWORD
     -
     - 不可
     - ○
     - ""
   * - global.keycloakDefinition.secret.KEYCLOAK_DB_USER
     -
     - 不可
     - ○
     - ""
   * - global.keycloakDefinition.secret.KEYCLOAK_DB_PASSWORD
     -
     - 不可
     - ○
     - ""
