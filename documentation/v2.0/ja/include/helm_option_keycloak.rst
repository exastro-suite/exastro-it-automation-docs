
.. list-table:: Keycloak 機能のオプションパラメータ
   :widths: 25 25 5 5 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 設定・変更
     - 必須
     - デフォルト値・選択可能な設定値
   * - keycloak.image.repository
     -
     - 不可
     - ○
     - "exastro/keycloak"
   * - keycloak.image.tag
     -
     - 不可
     - ○
     - "1.0.6"
   * - keycloak.image.pullPolicy
     -
     - 不可
     - ○
     - "IfNotPresent"
   * - keycloak.resources.requests.memory
     -
     - 不可
     - ○
     - "256Mi"
   * - keycloak.resources.requests.cpu
     -
     - 不可
     - ○
     - "1m"
   * - keycloak.resources.limits.memory
     -
     - 不可
     - ○
     - "2Gi"
   * - keycloak.resources.limits.cpu
     -
     - 不可
     - ○
     - "4"
