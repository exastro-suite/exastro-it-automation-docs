
.. list-table:: Exastro Platform 認証機能のオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - platform-auth.ingress.enabled
     - Exastro Platform における Ingress 利用の要否
     - 可
     - | :program:`true` (デフォルト): Exastro Platform にアクセスするための Ingress Controller をデプロイします。
       | :program:`false` : Ingress Controller をデプロイしません。
   * - platform-auth.ingress.hosts[0].host
     - | Exastro Platform 管理コンソールエンドポイントのホスト名、もしくは、FQDN
       | 別途、DNSへのレコード登録が必要です。
     - 可 (Ingress利用時)
     - "exastro-suite.example.local"
   * - platform-auth.ingress.hosts[0].paths[0].path
     - Exastro Platform 管理コンソールエンドポイントのパスのルール
     - 不可
     - "/"
   * - platform-auth.ingress.hosts[0].paths[0].pathType
     - Exastro Platform 管理コンソールエンドポイントのパスの一致条件
     - 不可
     - "Prefix"
   * - platform-auth.ingress.hosts[0].paths[0].backend
     - Exastro Platform 管理コンソールのサービス名
     - 不可
     - "http"
   * - platform-auth.ingress.hosts[1].host
     - | Exastro Platform エンドポイントのホスト名、もしくは、FQDN
       | 別途、DNSへのレコード登録が必要です。
     - 可 (Ingress利用時)
     - "exastro-suite-mng.example.local"
   * - platform-auth.ingress.hosts[1].paths[0].path
     - Exastro Platform エンドポイントのパスのルール
     - 不可
     - "/"
   * - platform-auth.ingress.hosts[1].paths[0].pathType
     - Exastro Platform エンドポイントのパスの一致条件
     - 不可
     - "Prefix"
   * - platform-auth.ingress.hosts[1].paths[0].backend
     - Exastro Platform エンドポイントのエンドポイントのサービス名
     - 不可
     - "httpMng"
   * - platform-auth.service.type
     - | Exastro Platform のサービスタイプ
       | ※ 現在 ClusterIP 以外のタイプには対応していません。
     - 不可
     - :program:`ClusterIP`
   * - platform-auth.image.repository
     - コンテナイメージのリポジトリ名
     - 不可
     - "exastro/exastro-platform-auth"
   * - platform-auth.image.tag
     - コンテナイメージのタグ
     - 不可
     - "1.0.6"
