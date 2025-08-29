
.. list-table:: 共通設定 (Exastro IT Automation 用データベース) のオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - global.itaDatabaseDefinition.name
     - Exastro IT Automation 用データベースの定義名
     - 不可
     - "ita-database"
   * - global.itaDatabaseDefinition.enabled
     - Exastro IT Automation 用データベースの定義の利用有無
     - 不可
     - true
   * - global.itaDatabaseDefinition.config.DB_VENDOR
     - Exastro IT Automation 用データベースで使用するデータベース
     - 可 (外部データベース利用時)
     - | :program:`"mariadb"` (デフォルト): MariaDB を利用
       | :program:`"mysql"`: MySQL を利用
   * - global.itaDatabaseDefinition.config.DB_HOST
     - | Exastro IT Automation 用データベース利用するDB
       | デフォルト状態では、同一の Kubernetes クラスタ内にデプロイされるコンテナを指定しています。
       | クラスタ外部の DB を利用する場合には設定が必要となります。
     - 可 (外部データベース利用時)
     - "mariadb"
   * - global.itaDatabaseDefinition.config.DB_PORT
     - Exastro IT Automation 用データベースで利用するポート番号(TCP)
     - 可 (外部データベース利用時)
     - "3306"
   * - global.itaDatabaseDefinition.config.DB_DATABASE
     - Exastro IT Automation 用データベースで利用するデータベース名
     - 可 (外部データベース利用時)
     - "platform"
   * - global.itaDatabaseDefinition.secret.DB_ADMIN_USER
     - Exastro IT Automation 用データベースで利用する管理権限を持つDBユーザ名
     - 必須
     - 管理権限を持つDBユーザ名
   * - global.itaDatabaseDefinition.secret.DB_ADMIN_PASSWORD
     - Exastro IT Automation 用データベースで利用する管理権限を持つDBユーザのパスワード(エンコードなし)
     - 必須
     - 管理権限を持つDBユーザ名のパスワード
   * - global.itaDatabaseDefinition.secret.DB_USER
     - | Exastro IT Automation 用データベースに作成するDBユーザ名。
       | 指定した DB ユーザが作成される。
     - 必須
     - 任意の文字列
   * - global.itaDatabaseDefinition.secret.DB_PASSWORD
     - Exastro IT Automation 用データベースに作成するDBユーザのパスワード(エンコードなし)
     - 必須
     - 任意の文字列
