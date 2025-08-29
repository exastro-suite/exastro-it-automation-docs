
.. list-table:: ita-migration における Values 一覧
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - exastro-it-automation.ita-migration.extraEnv.PLATFORM_API_HOST
     - Exastro 共通基盤で公開する内部の API エンドポイントで利用するホスト名
     - 不可
     - "platform-api"
   * - exastro-it-automation.ita-migration.extraEnv.PLATFORM_API_PORT
     - Exastro 共通基盤で公開する内部の API エンドポイントで利用するポート番号(TCP)
     - 不可
     - "8000"
   * - exastro-it-automation.ita-migration.extraEnv.ORG_COMMON_MAINTENANCE_RECORDS_LIMIT_DEFAULT
     - Exastro 共通基盤のリソース既定値用の初期値(メンテナンス時のレコード処理件数の既定値)
     - 不可
     - "10000"
   * - exastro-it-automation.ita-migration.extraEnv.ORG_COMMON_MAINTENANCE_RECORDS_LIMIT_MAX
     - Exastro 共通基盤のリソース最大値用の初期値(メンテナンス時のレコード処理件数の最大値)
     - 不可
     - "100000"
   * - exastro-it-automation.ita-migration.extraEnv.ORG_COMMON_MAINTENANCE_RECORDS_LIMIT_DESCRIPTION
     - Exastro 共通基盤のリソース説明用の初期値(メンテナンス時の当該項目の説明)
     - 不可
     - "Maximum number of maintenance records processing for organization default"
   * - exastro-it-automation.ita-migration.image.repository
     - コンテナイメージのリポジトリ名
     - 不可
     - docker.io/exastro/exastro-it-automation-migration
   * - exastro-it-automation.ita-migration.image.tag
     - コンテナイメージのタグ
     - 不可
     - ""
   * - exastro-it-automation.ita-migration.image.pullPolicy
     - イメージプルポリシー
     - 可
     - | :program:`IfNotPresent` (デフォルト): コンテナイメージが存在しない場合のみプル
       | :program:`Always`: 毎回必ずプル
       | :program:`None`: プルしない

