
.. list-table:: 共通設定 (Keycloak) のオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - global.keycloakDefinition.name
     - Keycloak の定義名
     - 不可
     - keycloak
   * - global.keycloakDefinition.enabled
     - Keycloak の定義の利用有無
     - 不可
     - true
   * - global.keycloakDefinition.config.API_KEYCLOAK_PROTOCOL
     - Keycloak API エンドポイントのプロトコル
     - 不可
     - "http”
   * - global.keycloakDefinition.config.API_KEYCLOAK_HOST
     - Keycloak API エンドポイントのホスト名、もしくは、FQDN
     - 不可
     - "keycloak"
   * - global.keycloakDefinition.config.API_KEYCLOAK_PORT
     - Keycloak API エンドポイントのポート番号
     - 不可
     - "8080"
   * - global.keycloakDefinition.config.KEYCLOAK_PROTOCOL
     - Keycloak エンドポイントのプロトコル
     - 不可
     - "http"
   * - global.keycloakDefinition.config.KEYCLOAK_HOST
     - Keycloak エンドポイントのホスト名、もしくは、FQDN
     - 不可
     - "keycloak"
   * - global.keycloakDefinition.config.KEYCLOAK_PORT
     - Keycloak API エンドポイントのポート番号
     - 不可
     - "8080"
   * - global.keycloakDefinition.config.KEYCLOAK_MASTER_REALM
     - Keycloak のマスターレルム名
     - 不可
     - "master"
   * - global.keycloakDefinition.config.KEYCLOAK_DB_DATABASE
     - Keycloak が利用するデータベース名
     - 不可
     - "keycloak"
   * - global.keycloakDefinition.secret.SYSTEM_ADMIN
     - | Keycloak のマスターレルムにおける管理権限を持ったユーザ名を指定。
       | 指定した Keycloak ユーザが作成される。
       | ※KEYCLOAK_USER→SYSTEM_ADMINに変更
     - 必須
     - 任意の文字列
   * - global.keycloakDefinition.secret.SYSTEM_ADMIN_PASSWORD
     - | Keycloak のマスターレルムにおける管理権限を持ったユーザに設定するパスワード(エンコードなし)
       | ※KEYCLOAK_PASSWORD→SYSTEM_ADMIN_PASSWORDに変更
     - 必須
     - 任意の文字列
   * - global.keycloakDefinition.secret.KEYCLOAK_DB_USER
     - | Keycloak が使用するデータベースユーザ。
       | 指定した DB ユーザが作成される。
     - 必須
     - 任意の文字列
   * - global.keycloakDefinition.secret.KEYCLOAK_DB_PASSWORD
     - Keycloak が使用するデータベースユーザのパスワード(エンコードなし)
     - 必須
     - 任意の文字列
