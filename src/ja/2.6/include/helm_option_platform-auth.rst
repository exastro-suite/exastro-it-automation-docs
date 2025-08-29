
.. list-table:: Exastro Platform 認証機能のオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - exastro-platform.platform-auth.extraEnv.EXTERNAL_URL
     - | Exastro Platform エンドポイントの公開URL。
       | リバースプロキシや PAT(Port Address Transport) などにより、Exastro のエンドポイントと公開時の URL に齟齬が発生することで、サービス接続に失敗する場合に設定をする必要があります。
     - 可
     - | 公開用エンドポイントのURL
       | (http[s]://your-exastro.domain:port)
   * - exastro-platform.platform-auth.extraEnv.EXTERNAL_URL_MNG
     - | Exastro Platform 管理コンソールのエンドポイントの公開URL。
       | リバースプロキシや PAT(Port Address Transport) などにより、Exastro のエンドポイントと公開時の URL に齟齬が発生することで、サービス接続に失敗する場合に設定をする必要があります。
     - 可
     - | 公開用エンドポイントのURL
       | (http[s]://your-exastro.domain:port)
   * - exastro-platform.platform-auth.extraEnv.AUDIT_LOG_ENABLED
     - | 監査ログの出力有無。
     - 可
     - | :program:`True` (デフォルト): 出力する
       | :program:`False`: 出力しない
   * - exastro-platform.platform-auth.extraEnv.AUDIT_LOG_PATH
     - | 監査ログのファイル名（ファイルパス）。
     - 可
     - | :program:`exastro-audit.log` (デフォルト)
   * - exastro-platform.platform-auth.extraEnv.AUDIT_LOG_FILE_MAX_BYTE
     - | 監査ログファイルの最大サイズ(Byte)を指定できます。
     - 可
     - | :program:`100000000` (デフォルト)
   * - exastro-platform.platform-auth.extraEnv.AUDIT_LOG_BACKUP_COUNT
     - | 監査ログファイルのバックアップカウント数。
       | 監査ログファイルの最大サイズ(Byte)を超えた際、ファイル名に"."＋数値で指定された値の分、バックアップされます。
     - 可
     - | :program:`30` (デフォルト)
   * - exastro-platform.platform-auth.ingress.enabled
     - Exastro Platform における Ingress 利用の要否
     - 可
     - | :program:`true` (デフォルト): Exastro Platform にアクセスするための Ingress Controller をデプロイします。
       | :program:`false` : Ingress Controller をデプロイしません。
   * - exastro-platform.platform-auth.ingress.hosts[0].host
     - | Exastro Platform 管理コンソールエンドポイントのホスト名、もしくは、FQDN
       | 別途、DNSへのレコード登録が必要です。
     - 可 (Ingress利用時)
     - "exastro-suite.example.local"
   * - exastro-platform.platform-auth.ingress.hosts[0].paths[0].path
     - Exastro Platform 管理コンソールエンドポイントのパスのルール
     - 不可
     - "/"
   * - exastro-platform.platform-auth.ingress.hosts[0].paths[0].pathType
     - Exastro Platform 管理コンソールエンドポイントのパスの一致条件
     - 不可
     - "Prefix"
   * - exastro-platform.platform-auth.ingress.hosts[0].paths[0].backend
     - Exastro Platform 管理コンソールのサービス名
     - 不可
     - "http"
   * - exastro-platform.platform-auth.ingress.hosts[1].host
     - | Exastro Platform エンドポイントのホスト名、もしくは、FQDN
       | 別途、DNSへのレコード登録が必要です。
     - 可 (Ingress利用時)
     - "exastro-suite-mng.example.local"
   * - exastro-platform.platform-auth.ingress.hosts[1].paths[0].path
     - Exastro Platform エンドポイントのパスのルール
     - 不可
     - "/"
   * - exastro-platform.platform-auth.ingress.hosts[1].paths[0].pathType
     - Exastro Platform エンドポイントのパスの一致条件
     - 不可
     - "Prefix"
   * - exastro-platform.platform-auth.ingress.hosts[1].paths[0].backend
     - Exastro Platform エンドポイントのエンドポイントのサービス名
     - 不可
     - "httpMng"
   * - exastro-platform.platform-auth.ingress.tls[0].secretName
     - Exastro Platform 公開用エンドポイントのSSL/TLS 証明書を保管している Kubernetes シークレット名
     - 可 (Ingress利用時)
     - 任意の文字列
   * - exastro-platform.platform-auth.ingress.tls[0].hosts
     - Exastro Platform 公開用エンドポイントのSSL/TLSを使用するホスト名、もしくは、FQDN
     - 可 (Ingress利用時)
     - 任意の文字列
   * - exastro-platform.platform-auth.ingress.secrets[0].name
     - Exastro Platform 公開用エンドポイントのSSL/TLS 証明書を保管する Kubernetes シークレット名
     - 可 (Ingress利用時)
     - 任意の文字列
   * - exastro-platform.platform-auth.ingress.secrets[0].certificate
     - Exastro Platform 公開用エンドポイントのSSL/TLS 証明書に使用する証明書ファイルの値
     - 可 (Ingress利用時)
     - | 証明書ファイルの値の例
       | -----BEGIN CERTIFICATE-----
       | ...
       | -----END CERTIFICATE-----
   * - exastro-platform.platform-auth.ingress.secrets[0].key
     - Exastro Platform 公開用エンドポイントのSSL/TLS 証明書に使用する鍵ファイルの値
     - 可 (Ingress利用時)
     - | 鍵ファイルの値の例
       | -----BEGIN PRIVATE KEY-----
       | ...
       | -----END PRIVATE KEY-----
   * - exastro-platform.platform-auth.service.type
     - Exastro Platform のサービスタイプ
     - 可
     - | :program:`ClusterIP` (デフォルト): Ingress Controller を利用する場合などに選択
       | :program:`LoadBalancer` : LoadBalancer を利用する場合に選択
       | :program:`NodePort` : NodePort を利用する場合に選択
   * - exastro-platform.platform-auth.service.http.nodePort
     - | Exastro Platform のサービス用公開ポート番号
     - 可 (NodePort利用時)
     - "30080"
   * - exastro-platform.platform-auth.service.httpMng.nodePort
     - | Exastro Platform のシステム管理用公開ポート番号
     - 可 (NodePort利用時)
     - "30081"
   * - exastro-platform.platform-auth.image.repository
     - コンテナイメージのリポジトリ名
     - 不可
     - "docker.io/exastro/exastro-platform-auth"
   * - exastro-platform.platform-auth.image.tag
     - コンテナイメージのタグ
     - 不可
     - ""
