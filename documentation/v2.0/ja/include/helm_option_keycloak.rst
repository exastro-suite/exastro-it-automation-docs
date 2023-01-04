
.. list-table:: Keycloak 機能のオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - keycloak.image.repository
     - コンテナイメージのリポジトリ名
     - 不可
     - "exastro/keycloak"
   * - keycloak.image.tag
     - コンテナイメージのタグ
     - 不可
     - "1.0.6"
   * - keycloak.image.pullPolicy
     - イメージプルポリシー
     - 可
     - | :program:`IfNotPresent` (デフォルト): コンテナイメージが存在しない場合のみプル
       | :program:`Always`: 毎回必ずプル
       | :program:`None`: プルしない
   * - keycloak.resources.requests.memory
     - メモリ要求
     - 可
     - "256Mi"
   * - keycloak.resources.requests.cpu
     - CPU要求
     - 可
     - "1m"
   * - keycloak.resources.limits.memory
     - メモリ上限
     - 可
     - "2Gi"
   * - keycloak.resources.limits.cpu
     - CPU上限
     - 可
     - "4"
