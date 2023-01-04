
.. list-table:: 共通設定 (Exastro ITA) のオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - global.itaDefinition.name
     - Exastro IT Automation の定義名
     - 不可
     - "ita"
   * - global.itaDefinition.enabled
     - | Exastro Platform と同一のクラスタ内への Exastro IT Automation のデプロイ要否
       | 現在は同一クラスタ内でのみ利用可能。(マルチクラスタへの分散配置は不可)
     - 不可
     - "true"
   * - global.itaDefinition.config.ITA_WEB_PROTOCOL
     - Exastro IT Automation エンドポイントのプロトコル
     - 不可
     - http"
   * - global.itaDefinition.config.ITA_WEB_HOST
     - Exastro IT Automation エンドポイントのホスト名、もしくは、FQDN
     - 不可
     - "ita-web-server.exastro-it-automation.svc"
   * - global.itaDefinition.config.ITA_WEB_PORT
     - Exastro IT Automation エンドポイントのポート番号
     - 不可
     - "8000"
   * - global.itaDefinition.config.ITA_API_PROTOCOL
     - Exastro IT Automation API エンドポイントのプロトコル
     - 不可
     - "http"
   * - global.itaDefinition.config.ITA_API_HOST
     - Exastro IT Automation API エンドポイントのホスト名、もしくは、FQDN
     - 不可
     - "ita-api-organization.exastro-it-automation.svc"
   * - global.itaDefinition.config.ITA_API_PORT
     - Exastro IT Automation API エンドポイントのポート番号
     - 不可
     - "8080"
   * - global.itaDefinition.config.ITA_API_ADMIN_PROTOCOL
     - Exastro IT Automation API Admin エンドポイントのプロトコル
     - 不可
     - "http"
   * - global.itaDefinition.config.ITA_API_ADMIN_HOST
     - Exastro IT Automation API Admin エンドポイントのホスト名、もしくは、FQDN
     - 不可
     - "ita-api-admin.exastro-it-automation.svc"
   * - global.itaDefinition.config.ITA_API_ADMIN_PORT
     - Exastro IT Automation API Admin エンドポイントのポート番号
     - 不可
     - "8080"
