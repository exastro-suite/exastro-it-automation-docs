
.. list-table:: 共通設定 (Exastro 共通基盤) のオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - global.pfGlobalDefinition.name
     - Exastro 共通基盤の定義名
     - 不可
     - pf-global
   * - global.pfGlobalDefinition.enabled
     - Exastro 共通基盤の定義の有効フラグ
     - 不可
     - true
   * - global.pfGlobalDefinition.image.registry
     - Exastro 共通基盤で利用するデフォルトイメージレジストリ
     - 不可
     - "docker.io"
   * - global.pfGlobalDefinition.image.organization
     - Exastro 共通基盤で利用するデフォルトイメージレジストリの組織名
     - 不可
     - exastro
   * - global.pfGlobalDefinition.image.package
     - Exastro 共通基盤で利用するデフォルトイメージレジストリのパッケージ名
     - 不可
     - exastro-platform
   * - global.pfGlobalDefinition.config.DEFAULT_LANGUAGE
     - Exastro 共通基盤で使用する既定の言語
     - 不可
     - "ja"
   * - global.pfGlobalDefinition.config.LANGUAGE
     - Exastro 共通基盤で使用する言語
     - 不可
     - "en"
   * - global.pfGlobalDefinition.config.TZ
     - Exastro 共通基盤で使用するタイムゾーン
     - 不可
     - "Asia/Tokyo"
   * - global.pfGlobalDefinition.config.PYTHONIOENCODING
     - Exastro 共通基盤で使用する Python ファイルの文字コード
     - 不可
     - utf-8
   * - global.pfGlobalDefinition.config.PLATFORM_API_PROTOCOL
     - Exastro 共通基盤で公開する内部の API エンドポイントで利用するプロトコル
     - 不可
     - "http"
   * - global.pfGlobalDefinition.config.PLATFORM_API_HOST
     - Exastro 共通基盤で公開する内部の API エンドポイントで利用するホスト名
     - 不可
     - "platform-api"
   * - global.pfGlobalDefinition.config.PLATFORM_API_PORT
     - Exastro 共通基盤で公開する内部の API エンドポイントで利用するポート番号(TCP)
     - 不可
     - "8000"
   * - global.pfGlobalDefinition.config.PLATFORM_WEB_PROTOCOL
     - Exastro 共通基盤で公開する内部の Web エンドポイントで利用するプロトコル
     - 不可
     - "http"
   * - global.pfGlobalDefinition.config.PLATFORM_WEB_HOST
     - Exastro 共通基盤で公開する内部の Web エンドポイントで利用するホスト名
     - 不可
     - "platform-web"
   * - global.pfGlobalDefinition.config.PLATFORM_WEB_PORT
     - Exastro 共通基盤で公開する内部の Web エンドポイントで利用するポート番号(TCP)
     - 不可
     - "8000"
   * - global.pfGlobalDefinition.config.EXTERNAL_URL
     - | Exastro Platform エンドポイントの公開URL。
       | リバースプロキシや PAT(Port Address Transport) などにより、Exastro のエンドポイントと公開時の URL に齟齬が発生することで、サービス接続に失敗する場合に設定をする必要があります。
     - 可
     - | 公開用エンドポイントのURL
       | (http[s]://your-exastro.domain:port)
   * - global.pfGlobalDefinition.config.EXTERNAL_URL_MNG
     - | Exastro Platform 管理コンソールのエンドポイントの公開URL。
       | リバースプロキシや PAT(Port Address Transport) などにより、Exastro のエンドポイントと公開時の URL に齟齬が発生することで、サービス接続に失敗する場合に設定をする必要があります。
     - 可
     - | 公開用エンドポイントのURL
       | (http[s]://your-exastro.domain:port)
   * - global.pfGlobalDefinition.secret.ENCRYPT_KEY
     - | Exastro Platform 内で保管するデータの暗号化と復号のための AES キー。
       | 任意の32バイト ASCII 文字を BASE64 エンコードした値
     - 可
     - | ランダムな32バイト ASCII 文字を BASE64 エンコードした値
   * - global.pfGlobalDefinition.persistence.enabled
     - | Exastro 共通基盤におけるデータの永続化の有無
       | ※2.3にて削除されました。
     - 削除
     - | :program:`true` (デフォルト): 永続化する。
       | :program:`false`: 永続化しない。
   * - global.pfGlobalDefinition.persistence.accessMode
     - | Exastro 共通基盤における Persisten Volume Claim のアクセスモード
       | ※2.3にて削除されました。
     - 削除
     - | :program:`ReadWriteMany` (デフォルト): ボリュームは多数のNodeで読み取り専用としてマウント。
       | :program:`ReadWriteOnce`: ボリュームは単一のNodeで読み取り/書き込みとしてマウント。
   * - global.pfGlobalDefinition.persistence.size
     - | Exastro 共通基盤における Persisten Volume Claim のボリュームに要求するサイズ(Bytes)
       | ※2.3にて削除されました。
     - 削除
     - "10Gi"
   * - global.pfGlobalDefinition.persistence.volumeType
     - | Exastro 共通基盤における Persisten Volume のボリュームタイプ
       | Storage Class を利用する場合は設定は不要です。
       | ※2.3にて削除されました。
     - 削除
     - "hostPath"
   * - global.pfGlobalDefinition.persistence.storageClass
     - | Exastro 共通基盤におけるデータの永続化のために利用する Storage Class
       | Persistent Volume を利用する場合は設定は不要です。
       | ※2.3にて削除されました。
     - 削除
     - 不可
