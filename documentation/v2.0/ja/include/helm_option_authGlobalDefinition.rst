
.. list-table:: 共通設定 (認証機能) のオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - global.authGlobalDefinition.name
     - 認証機能の定義名
     - 不可
     - auth-global
   * - global.authGlobalDefinition.enabled
     - 認証機能の有効フラグ
     - 不可
     - true
   * - global.authGlobalDefinition.image.registry
     - 認証機能で利用するデフォルトイメージレジストリ
     - 不可
     - "docker.io"
   * - global.authGlobalDefinition.image.organization
     - 認証機能で利用するデフォルトイメージレジストリの組織名
     - 不可
     - exastro
   * - global.authGlobalDefinition.image.package
     - 認証機能で利用するデフォルトイメージレジストリのパッケージ名
     - 不可
     - exastro-platform
   * - global.authGlobalDefinition.config.DEFAULT_LANGUAGE
     - 認証機能で使用する既定の言語
     - 不可
     - "ja"
   * - global.authGlobalDefinition.config.LANGUAGE
     - 認証機能で使用する言語
     - 不可
     - "en"
   * - global.authGlobalDefinition.config.TZ
     - 認証機能で使用するタイムゾーン
     - 不可
     - "Asia/Tokyo"
   * - global.authGlobalDefinition.config.PYTHONIOENCODING
     - 認証機能で使用する Python ファイルの文字コード
     - 不可
     - utf-8
   * - global.authGlobalDefinition.config.PLATFORM_API_PROTOCOL
     - 認証機能で公開する内部の API エンドポイントで利用するプロトコル
     - 不可
     - "http"
   * - global.authGlobalDefinition.config.PLATFORM_API_HOST
     - 認証機能で公開する内部の API エンドポイントで利用するホスト名
     - 不可
     - "platform-api"
   * - global.authGlobalDefinition.config.PLATFORM_API_PORT
     - 認証機能で公開する内部の API エンドポイントで利用するポート番号(TCP)
     - 不可
     - "8000"
   * - global.authGlobalDefinition.config.PLATFORM_WEB_PROTOCOL
     - 認証機能で公開する内部の Web エンドポイントで利用するプロトコル
     - 不可
     - "http"
   * - global.authGlobalDefinition.config.PLATFORM_WEB_HOST
     - 認証機能で公開する内部の Web エンドポイントで利用するホスト名
     - 不可
     - "platform-web"
   * - global.authGlobalDefinition.config.PLATFORM_WEB_PORT
     - 認証機能で公開する内部の Web エンドポイントで利用するポート番号(TCP)
     - 不可
     - "8000"
   * - global.authGlobalDefinition.secret.ENCRYPT_KEY
     - | Exastro Platform 内で保管するデータの暗号化と復号のための AES キー。
       | 任意の32バイト ASCII 文字を BASE64 エンコードした値
     - 可
     - | ランダムな32バイト ASCII 文字を BASE64 エンコードした値
   * - global.authGlobalDefinition.persistence.enabled
     - | 認証機能におけるデータの永続化の有無
       | ※現在このパラメータは使用していません。
     - 可 (無効)
     - | :program:`true` (デフォルト): 永続化する。
       | :program:`false`: 永続化しない。
   * - global.authGlobalDefinition.persistence.accessMode
     - | 認証機能における Persisten Volume Claim のアクセスモード
       | ※現在このパラメータは使用していません。
     - 可 (無効)
     - | :program:`ReadWriteMany` (デフォルト): ボリュームは多数のNodeで読み取り専用としてマウント。
       | :program:`ReadWriteOnce`: ボリュームは単一のNodeで読み取り/書き込みとしてマウント。
   * - global.authGlobalDefinition.persistence.size
     - | 認証機能における Persisten Volume Claim のボリュームに要求するサイズ(Bytes)
       | ※現在このパラメータは使用していません。
     - 可 (無効)
     - "10Gi"
   * - global.authGlobalDefinition.persistence.volumeType
     - | 認証機能における Persisten Volume のボリュームタイプ
       | Storage Class を利用する場合は設定は不要です。
       | ※現在このパラメータは使用していません。
     - 可 (無効)
     - "hostPath"
   * - global.authGlobalDefinition.persistence.storageClass
     - | 認証機能におけるデータの永続化のために利用する Storage Class
       | Persistent Volume を利用する場合は設定は不要です。
       | ※現在このパラメータは使用していません。
     - 可 (無効)
     - 不可
