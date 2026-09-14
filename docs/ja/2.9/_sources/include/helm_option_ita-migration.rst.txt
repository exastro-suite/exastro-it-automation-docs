
.. _helm_option_ita-migration:
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
   * - exastro-it-automation.ita-migration.extraEnv.SYSTEM_ANSIBLE_EXECUTION_LIMIT
     - Exastro 共通基盤のリソース既定値用の初期値(システム全体のメAnsible driver の Movement 最大実行数の既定値)
     - 不可
     - "25"
   * - exastro-it-automation.ita-migration.extraEnv.ORG_ANSIBLE_EXECUTION_LIMIT_DEFAULT
     - Exastro 共通基盤のリソース既定値用の初期値(Ansible driver の Movement 最大実行数の既定値)
     - 不可
     - "25"
   * - exastro-it-automation.ita-migration.extraEnv.ORG_ANSIBLE_EXECUTION_LIMIT_MAX
     - Exastro 共通基盤のリソース最大値用の初期値(Ansible driver の Movement 最大実行数の最大値)
     - 不可
     - "100"
   * - exastro-it-automation.ita-migration.extraEnvORG_ANSIBLE_EXECUTION_LIMIT_DESCRIPTION
     - Exastro 共通基盤のリソース説明用の初期値(Ansible driver の Movement 最大実行数の説明)
     - 不可
     - "Maximum number of movement executions for organization default"
   * - exastro-it-automation.ita-migration.extraEnv.ORG_COMMON_UPLOAD_FILE_LIMIT_DEFAULT
     - Exastro 共通基盤のリソース既定値用の初期値(アップロード可能なファイルサイズの既定値)
     - 不可
     - "104857600"
   * - exastro-it-automation.ita-migration.extraEnv.ORG_COMMON_UPLOAD_FILE_LIMIT_MAX
     - Exastro 共通基盤のリソース最大値用の初期値(アップロード可能なファイルサイズの最大値)
     - 不可
     - "107374182400"
   * - exastro-it-automation.ita-migration.extraEnv.ORG_COMMON_UPLOAD_FILE_LIMIT_DESCRIPTION
     - Exastro 共通基盤のリソース説明用の初期値(アップロード可能なファイルサイズの説明)
     - 不可
     - "Maximum byte size of upload file for organization default"
   * - exastro-it-automation.ita-migration.extraEnv.SYSTEM_MENU_EXPORT_IMPORT_BUFFER_SIZE
     - Exastro 共通基盤のリソース既定値用の初期値(システム全体のメニューエクスポート/インポートのバッファサイズの既定値)
     - 不可
     - "10000"
   * - exastro-it-automation.ita-migration.extraEnv.SYSTEM_MENU_EXPORT_IMPORT_BUFFER_SIZE_DESCRIPTION
     - Exastro 共通基盤のリソース説明用の初期値(システム全体のメニューエクスポート/インポートのバッファサイズの説明)
     - 不可
     - "Maximum buffer size of menu Export/import for System default (Used for DB fetch size, file stream read size)"
   * - exastro-it-automation.ita-migration.extraEnv.ORG_MENU_EXPORT_IMPORT_BUFFER_SIZE_DEFAULT
     - Exastro 共通基盤のリソース既定値用の初期値(メニューエクスポート/インポートのバッファサイズの既定値)
     - 不可
     - "1000"
   * - exastro-it-automation.ita-migration.extraEnv.ORG_MENU_EXPORT_IMPORT_BUFFER_SIZE_MAX
     - Exastro 共通基盤のリソース最大値用の初期値(メニューエクスポート/インポートのバッファサイズの最大値)
     - 不可
     - "10000"
   * - exastro-it-automation.ita-migration.extraEnv.ORG_MENU_EXPORT_IMPORT_BUFFER_SIZE_DESCRIPTION
     - Exastro 共通基盤のリソース説明用の初期値(メニューエクスポート/インポートのバッファサイズの説明)
     - 不可
     - "Maximum buffer size of menu Export/import for Organization default (Used for DB fetch size, file stream read size)"
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

