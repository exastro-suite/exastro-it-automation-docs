
.. list-table:: ita-ag-oase における Values 一覧
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - ita-ag-oase.agents.image.repository
     - コンテナイメージのリポジトリ名
     - 不可
     - ""
   * - ita-ag-oase.agents.image.tag
     - コンテナイメージのタグ
     - 不可
     - ""
   * - ita-ag-oase.agents.image.pullPolicy
     - イメージプルポリシー
     - 可
     - | :program:`IfNotPresent` (デフォルト): コンテナイメージが存在しない場合のみプル
       | :program:`Always`: 毎回必ずプル
       | :program:`None`: プルしない
   * - ita-ag-oase.agents.extraEnv.TZ
     - OASE エージェント システムで使用する規定の言語
     - 可
     - Asia/Tokyo
   * - ita-ag-oase.agents.extraEnv.DEFAULT_LANGUAGE
     - OASE エージェント システムで使用する言語
     - 可
     - ja
   * - ita-ag-oase.agents.extraEnv.LANGUAGE
     - OASE エージェント のバージョン
     - 可
     - en
   * - ita-ag-oase.agents.extraEnv.ITERATION
     - OASE エージェント が設定を初期化するまでの、処理の繰り返し数（上限値: 120、下限値: 10）
     - 可
     - 500
   * - ita-ag-oase.agents.extraEnv.EXECUTE_INTERVAL
     - ita-ag-oaseがイベント取得対象に対してイベント取得の間隔（秒）（下限値: 3）
     - 可
     - 10
   * - ita-ag-oase.agents.extraEnv.LOG_LEVEL
     - OASE エージェント のログレベル
     - 可
     - INFO
   * - ita-ag-oase.eagents.xtraEnv.AGENT_NAME
     - 起動する OASEエージェントの名前
     - 可
     - oase-agent
   * - ita-ag-oase.agents.extraEnv.EXASTRO_URL
     - Exastro IT Automation の Service URL
     - 可
     - http://platform-auth:8000
   * - ita-ag-oase.agents.extraEnv.EXASTRO_ORGANIZATION_ID
     - Exastro IT Automation で作成した OrganizationID
     - 必須
     - org001
   * - ita-ag-oase.agents.extraEnv.EXASTRO_WORKSPACE_ID
     - Exastro IT Automation で作成した WorkspaceID
     - 必須
     - ws01
   * - ita-ag-oase.agents.extraEnv.EVENT_COLLECTION_SETTINGS_NAMES
     - | Exastro IT Automation のOASE管理 イベント収集 で作成した イベント収集設定名
       | カンマ区切りで複数指定可能
     - 必須
     - id0001
   * - ita-ag-oase.agents.secret.EXASTRO_REFRESH_TOKEN
     - | Exastro システム管理画面から取得したリフレッシュトークン※
       | ※ユーザーのロールが、OASE - イベント - イベント履歴メニューをメンテナンス可能である必要があります。
     - 可
     - 無し
   * - ita-ag-oase.agents.secret.EXASTRO_USERNAME
     - | Exastro IT Automation で作成した ユーザー名
       | ※ユーザーのロールが、OASE - イベント - イベント履歴メニューをメンテナンス可能である必要があります。
       | ※EXASTRO_REFRESH_TOKENを使わない場合（非推奨）
     - 可
     - admin
   * - ita-ag-oase.agents.secret.EXASTRO_PASSWORD
     - | Exastro IT Automation で作成した パスワード
       | ※EXASTRO_REFRESH_TOKENを使わない場合（非推奨）
     - 可
     - sample-password
   * - ita-ag-oase.agents.resources.requests.memory
     - メモリ要求
     - 可
     - "64Mi"
   * - ita-ag-oase.agents.resources.requests.cpu
     - CPU要求
     - 可
     - "250m"
   * - ita-ag-oase.agents.resources.limits.memory
     - メモリ上限
     - 可
     - "64Mi"
   * - ita-ag-oase.agents.resources.limits.cpu
     - CPU上限
     - 可
     - "250m"
   * - ita-ag-oase.nameOverride
     - | Exastro OASE Agent の定義名
       | ※同一クラスタ内に複数エージェントを構築する際は必須
     - 可
     - ""
   * - ita-ag-oase.persistence.enabled
     - OASE エージェントコンテナのデプロイの有無
     - 可
     - | :program:`true` (デフォルト): OASE エージェントコンテナをデプロイします。
       | :program:`false` : OASE エージェントコンテナをデプロイしません。
   * - ita-ag-oase.persistence.reinstall
     - 再インストール時にデータ領域の初期化の要否
     - 不可
     - | :program:`true` : データを初期化(削除)する
       | :program:`false` (デフォルト): データを初期化(削除)しない
   * - ita-ag-oase.persistence.accessMode
     - 永続ボリュームのアクセスモードの指定。
     - 不可
     - "ReadWriteMany"
   * - ita-ag-oase.persistence.size
     - 永続ボリュームのディスク容量
     - 可 (データ永続化時)
     - "10Gi"
   * - ita-ag-oase.persistence.volumeType
     - 永続ボリュームのボリュームタイプ
     - 可 (現在無効)
     - | :program:`hostPath` (デフォルト): Kubernetes クラスタのノード上にデータを保存(非推奨)
       | :program:`AKS`: AKS のストレージクラスを利用
   * - ita-ag-oase.persistence.storageClass
     - 永続ボリュームにストレージクラスを利用する場合のクラスを指定
     - 可 (データ永続化時)
     - | :program:`-` (デフォルト): ストレージクラスを指定しない。
       | :program:`ストレージクラス名`: クラウドプロバイダなどから提供されるストレージクラス名を指定。
   * - exastro-platform.mariadb.persistence.matchLabels.name
     - 利用する永続ボリューム名を指定
     - 可(データ永続化時)
     - ""
