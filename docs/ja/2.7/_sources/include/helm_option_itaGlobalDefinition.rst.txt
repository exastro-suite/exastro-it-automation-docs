
.. list-table:: 共通設定 (Exastro IT Automation) のオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - global.itaGlobalDefinition.name
     - Exastro IT Automation の定義名
     - 不可
     - ita-global
   * - global.itaGlobalDefinition.enabled
     - Exastro IT Automation の定義の利用有無
     - 不可
     - true
   * - global.itaGlobalDefinition.image.registry
     - Exastro IT Automation で利用するデフォルトイメージレジストリ
     - 不可
     - docker.io
   * - global.itaGlobalDefinition.image.organization
     - Exastro IT Automation で利用するデフォルトイメージレジストリの組織名
     - 不可
     - exastro
   * - global.itaGlobalDefinition.image.package
     - Exastro IT Automation で利用するデフォルトイメージレジストリのパッケージ名
     - 不可
     - exastro-it-automation
   * - global.itaGlobalDefinition.config.DEFAULT_LANGUAGE
     - Exastro IT Automation で使用する既定の言語
     - 不可
     - "ja"
   * - global.itaGlobalDefinition.config.LANGUAGE
     - Exastro IT Automation で使用する言語
     - 不可
     - en
   * - global.itaGlobalDefinition.config.CONTAINER_BASE
     - デプロイ先のコンテナ環境
     - 不可
     - kubernetes
   * - global.itaGlobalDefinition.config.TZ
     - Exastro IT Automation で使用するタイムゾーン
     - 不可
     - Asia/Tokyo
   * - global.itaGlobalDefinition.config.STORAGEPATH
     - 共有ディレクトリのマウントポイント
     - 不可
     - /storage/
   * - global.itaGlobalDefinition.secret.ENCRYPT_KEY
     - | Exastro Platform 内で保管するデータの暗号化と復号のための AES キー。
       | 任意の32バイト ASCII 文字を BASE64 エンコードした値
     - 可
     - | ランダムな32バイト ASCII 文字を BASE64 エンコードした値
   * - global.itaGlobalDefinition.persistence.enabled
     - | Exastro IT Automation におけるデータの永続化の有無
     - 可
     - | :program:`true` (デフォルト): 永続化する。
       | :program:`false`: 永続化しない。
   * - global.itaGlobalDefinition.persistence.accessMode
     - | Exastro IT Automation における Persisten Volume Claim のアクセスモード
     - 可 (データ永続化時)
     - | :program:`ReadWriteMany` (デフォルト): ボリュームは多数のNodeで読み取り専用としてマウント。
       | :program:`ReadWriteOnce`: ボリュームは単一のNodeで読み取り/書き込みとしてマウント。
   * - global.itaGlobalDefinition.persistence.size
     - | Exastro IT Automation における Persisten Volume Claim のボリュームに要求するサイズ(Bytes)
     - 可 (データ永続化時)
     - "10Gi"
   * - global.itaGlobalDefinition.persistence.volumeType
     - | Exastro IT Automation における Persisten Volume のボリュームタイプ
       | Storage Class を利用する場合は設定は不要です。
     - 可 (データ永続化時)
     - "hostPath"
   * - global.itaGlobalDefinition.persistence.storageClass
     - | Exastro IT Automation におけるデータの永続化のために利用する Storage Class
       | Persistent Volume を利用する場合は設定は不要です。
     - 可 (データ永続化時)
     - | :program:`"-"` (デフォルト): ストレージクラスを指定しない。
       | :program:`ストレージクラス名`: クラウドプロバイダなどから提供されるストレージクラス名を指定。
