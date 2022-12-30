
.. list-table:: Exastro Platform 認証機能のオプションパラメータ
   :widths: 25 25 5 5 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 設定・変更
     - 必須
     - デフォルト値・選択可能な設定値
   * - platform-auth.ingress.enabled
     -
     - 不可
     - ○
     - "true"
   * - platform-auth.ingress.hosts[0].host
     -
     - 不可
     - ○
     - "exastro-suite.example.local"
   * - platform-auth.ingress.hosts[0].paths[0].path
     -
     - 不可
     - ○
     - "/"
   * - platform-auth.ingress.hosts[0].paths[0].pathType
     -
     - 不可
     - ○
     - "Prefix"
   * - platform-auth.ingress.hosts[0].paths[0].backend
     -
     - 不可
     - ○
     - "http"
   * - platform-auth.ingress.hosts[1].host
     -
     - 不可
     - ○
     - "exastro-suite-mng.example.local"
   * - platform-auth.ingress.hosts[1].paths[0].path
     -
     - 不可
     - ○
     - "/"
   * - platform-auth.ingress.hosts[1].paths[0].pathType
     -
     - 不可
     - ○
     - "Prefix"
   * - platform-auth.ingress.hosts[1].paths[0].backend
     -
     - 不可
     - ○
     - "httpMng"
   * - platform-auth.service.type
     -
     - 不可
     - ○
     - "ClusterIP"
   * - platform-auth.image.repository
     -
     - 不可
     - ○
     - "exastro/exastro-platform-auth"
   * - platform-auth.image.tag
     -
     - 不可
     - ○
     - "1.0.6"
