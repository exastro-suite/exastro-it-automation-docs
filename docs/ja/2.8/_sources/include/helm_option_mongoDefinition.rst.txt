
.. list-table:: OASE設定 (Exastro OASE用データベース) のオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - global.mongoDefinition.config.MONGO_PROTOCOL
     - | OASE用データベースで利用するDBのプロトコル
     - 可
     - "http"
   * - global.mongoDefinition.config.MONGO_HOST
     - | OASE用データベース利用するDB
       | デフォルト状態では、同一の Kubernetes クラスタ内にデプロイされるコンテナを指定しています。
       | クラスタ外部の DB を利用する場合には設定が必要となります。
       | 自動払い出しを利用しない場合は、""（空）を指定してください。
     - 可 (外部データベース利用時)
     - "mongo"
   * - global.mongoDefinition.config.MONGO_PORT
     - OASE用データベースで利用するポート番号(TCP)
     - 可 (外部データベース利用時)
     - "27017"
   * - global.mongoDefinition.secret.MONGO_ADMIN_USER
     - OASE用データベースで利用する管理権限を持つDBユーザ名
     - 必須
     - 管理権限を持つDBユーザ名
   * - global.mongoDefinition.secret.MONGO_ADMIN_PASSWORD
     - OASE用データベースで利用する管理権限を持つDBユーザのパスワード(エンコードなし)
     - 必須
     - 管理権限を持つDBユーザ名のパスワード
