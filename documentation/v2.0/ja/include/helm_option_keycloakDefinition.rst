
.. list-table:: 共通設定 (Keycloak) のオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - global.keycloakDefinition.name
     - Keycloak の定義名
     - 不可
     - "keycloak"
   * - global.keycloakDefinition.enabled
     - | Exastro Platform と同一のクラスタ内への Keycloak のデプロイ要否
       | ※現在このパラメータは使用していません。
     - 可 (無効)
     - | :program:`true` (デフォルト): 同一クラスタ内に Keycloak をデプロイします。
       | :program:`false` : 同一クラスタ内に Keycloak をデプロイしません。(別途 Keycloak の容易が必要です。)
   * - global.keycloakDefinition.config.API_KEYCLOAK_PROTOCOL
     - Keycloak API エンドポイントのプロトコル
     - 可 (外部Keycloak利用時)
     - "http”
   * - global.keycloakDefinition.config.API_KEYCLOAK_HOST
     - Keycloak API エンドポイントのホスト名、もしくは、FQDN
     - 可 (外部Keycloak利用時)
     - "keycloak.exastro-platform.svc"
   * - global.keycloakDefinition.config.API_KEYCLOAK_PORT
     - Keycloak API エンドポイントのポート番号
     - 可 (外部Keycloak利用時)
     - "8080"
   * - global.keycloakDefinition.config.KEYCLOAK_PROTOCOL
     - Keycloak エンドポイントのプロトコル
     - 可 (外部Keycloak利用時)
     - "http"
   * - global.keycloakDefinition.config.KEYCLOAK_HOST
     - Keycloak エンドポイントのホスト名、もしくは、FQDN
     - 可 (外部Keycloak利用時)
     - "keycloak.exastro-platform.svc"
   * - global.keycloakDefinition.config.KEYCLOAK_PORT
     - Keycloak API エンドポイントのポート番号
     - 可 (外部Keycloak利用時)
     - "8080"
   * - global.keycloakDefinition.config.KEYCLOAK_MASTER_REALM
     - Keycloak のマスターレルム名
     - 可
     - "master"
   * - global.keycloakDefinition.config.KEYCLOAK_DB_DATABASE
     - Keycloak が利用するデータベース名
     - 可
     - "keycloak"
   * - global.keycloakDefinition.secret.KEYCLOAK_USER
     - | Keycloak のマスターレルムにおける管理権限を持ったユーザ名を指定。
       | 指定したユーザが作成される。
     - 必須
     - 任意の文字列
   * - global.keycloakDefinition.secret.KEYCLOAK_PASSWORD
     - Keycloak のマスターレルムにおける管理権限を持ったユーザに設定するパスワード(エンコードなし)
     - 必須
     - 任意の文字列
   * - global.keycloakDefinition.secret.KEYCLOAK_DB_USER
     - Keycloak が使用するデータベースユーザ
     - 必須
     - 任意の文字列
   * - global.keycloakDefinition.secret.KEYCLOAK_DB_PASSWORD
     - Keycloak が使用するデータベースユーザのパスワード(エンコードなし)
     - 必須
     - 任意の文字列
