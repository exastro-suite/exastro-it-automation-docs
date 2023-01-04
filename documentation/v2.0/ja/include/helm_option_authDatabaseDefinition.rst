
.. list-table:: 共通設定 (認証機能用データベース) のオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - global.authDatabaseDefinition.name
     - 認証機能用データベースの定義名
     - 不可
     - "auth-database"
   * - global.authDatabaseDefinition.enabled
     - | 認証機能用データベースの有効フラグ
       | ※現在このパラメータは使用していません。
     - 可 (無効)
     - | :program:`true` (デフォルト): -
   * - global.authDatabaseDefinition.config.DB_VENDOR
     - 認証機能用データベースで使用するデータベース
     - 可 (外部データベース利用時)
     - | :program:`"mariadb"` (デフォルト): MariaDB を利用
       | :program:`"mysql"`: MySQL を利用
   * - global.authDatabaseDefinition.config.DB_HOST
     - | 認証機能用データベース利用するDB
       | デフォルト状態では、同一の Kubernetes クラスタ内にデプロイされるコンテナを指定しています。
       | クラスタ外部の DB を利用する場合には設定が必要となります。 
     - 可 (外部データベース利用時)
     - "mariadb.exastro-platform.svc"
   * - global.authDatabaseDefinition.config.DB_PORT
     - 認証機能用データベースで利用するポート番号(TCP)
     - 可 (外部データベース利用時)
     - "3306"
   * - global.authDatabaseDefinition.config.DB_DATABASE
     - 認証機能用データベースで利用するデータベース名
     - 可 (外部データベース利用時)
     - "platform"
   * - global.authDatabaseDefinition.secret.DB_ADMIN_USER
     - 認証機能用データベースで利用する管理権限を持つDBユーザ名
     - 必須
     - 管理権限を持つDBユーザ名
   * - global.authDatabaseDefinition.secret.DB_ADMIN_PASSWORD
     - 認証機能用データベースで利用する管理権限を持つDBユーザのパスワード(エンコードなし)
     - 必須
     - 管理権限を持つDBユーザ名のパスワード
   * - global.authDatabaseDefinition.secret.DB_USER
     - 認証機能用データベースに作成するDBユーザ名
     - 必須
     - 任意の文字列
   * - global.authDatabaseDefinition.secret.DB_PASSWORD
     - 認証機能用データベースに作成するDBユーザのパスワード(エンコードなし)
     - 必須
     - 任意の文字列
