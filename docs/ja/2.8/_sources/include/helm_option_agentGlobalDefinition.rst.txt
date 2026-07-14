
.. list-table:: 共通設定 (Exastro OASE Agent) のオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - global.agentGlobalDefinition.name
     - Exastro OASE Agent の定義名
     - 不可
     - agent-global
   * - global.agentGlobalDefinition.enabled
     - Exastro OASE Agent の定義の利用有無
     - 不可
     - true
   * - global.agentGlobalDefinition.image.registry
     - Exastro OASE Agent で利用するデフォルトイメージレジストリ
     - 不可
     - docker.io
   * - global.agentGlobalDefinition.image.organization
     - Exastro OASE Agent で利用するデフォルトイメージレジストリの組織名
     - 不可
     - exastro
   * - global.agentGlobalDefinition.image.package
     - Exastro OASE Agent で利用するデフォルトイメージレジストリのパッケージ名
     - 不可
     - exastro-it-automation
