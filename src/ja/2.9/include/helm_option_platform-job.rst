
.. list-table:: Exastro Platform JOB機能のオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - exastro-platform.platform-job.image.repository
     - コンテナイメージのリポジトリ名
     - 不可
     - "docker.io/exastro/exastro-platform-job"
   * - exastro-platform.platform-job.image.tag
     - コンテナイメージのタグ
     - 不可
     - ""
   * - exastro-platform.platform-job.extraEnv.SUB_PROCESS_TERMINATE_REQUEST_SECONDS
     - | JOBを処理するプロセスの再起動間隔（秒）
       | 全JOBのタイムアウト時間の最大値より長い時間を設定すること
     - 可
     - "7200"
   * - exastro-platform.platform-job.extraEnv.SUB_PROCESS_ACCEPTABLE
     - | JOBを処理するプロセス数
       | JOB処理のパフォーマンスやリソース使用量に影響します
     - 可
     - "2"
   * - exastro-platform.platform-job.extraEnv.SUB_PROCESS_MAX_JOBS
     - | 1プロセス当たりのJOB同時実行数
       | JOB処理のパフォーマンスやリソース使用量に影響します
     - 可
     - "10"
   * - exastro-platform.platform-job.extraEnv.SUB_PROCESS_WATCH_INTERVAL_SECONDS
     - JOBを処理するプロセスの監視間隔（秒）
     - 可
     - "1.0"
   * - exastro-platform.platform-job.extraEnv.SUB_PROCESS_DB_RECONNECT_INTERVAL_SECONDS
     - JOBのQUEUE監視のDB接続を維持する時間（秒）
     - 可
     - "60"
   * - exastro-platform.platform-job.extraEnv.SUB_PROCESS_DB_HEALTH_CHECK_INTERVAL_SECONDS
     - JOBのDB接続の健全性を確認する時間間隔（秒）
     - 可
     - "5"
   * - exastro-platform.platform-job.extraEnv.SUB_PROCESS_MAX_CANCEL_TIMEOUT
     - JOBを処理するプロセスを再起動を実施する、JOBの中断処理のタイムアウト発生回数
     - 可
     - "10"
   * - exastro-platform.platform-job.extraEnv.JOB_STATUS_WATCH_INTERVAL_SECONDS
     - | JOBのQUEUEを監視するインターバル時間（秒）
       | CPU使用量を下げたい場合に本パラメータを大きくしてください
     - 可
     - "1.0"
   * - exastro-platform.platform-job.extraEnv.JOB_CANCEL_TIMEOUT_SECONDS
     - | JOBの中断処理のタイムアウト時間（秒）
       | ご利用の環境でJOBの中断処理のタイムアウトが頻発する場合、設定を変更してください
     - 可
     - "5.0"
   * - exastro-platform.platform-job.extraEnv.KEYCLOAK_TOKEN_REFRESH_INTERVAL_SECONDS
     - | JOBで使用するKeyCloakのアクセストークンの再発行間隔（秒）
       | KeyCloakのアクセストークンの有効時間に合わせて設定します
     - 可
     - "30"
   * - exastro-platform.platform-job.extraEnv.JOB_NOTIFICATION_TIMEOUT_SECONDS
     - | 通知JOBのタイムアウト時間（秒）
       | ご利用の環境で通知JOBのタイムアウトが頻発する場合、設定を変更してください
     - 可
     - "20"
   * - exastro-platform.platform-job.extraEnv.JOB_NOTIFICATION_MAX_JOB_PER_PROCESS
     - | 1プロセス当たりの通知JOBの同時実行数
       | JOB処理のパフォーマンスやリソース使用量に影響します
     - 可
     - "10" ※SUB_PROCESS_MAX_JOBSと同値
   * - exastro-platform.platform-job.extraEnv.JOB_NOTIFICATION_TEAMS_CONNECTION_TIMEOUT
     - | Teams通知（Webhook）のHTTPコネクションタイムアウト時間（秒）
       | ご利用の環境でTeams通知のタイムアウトが頻発する場合、設定を変更してください
     - 可
     - "3.0"
   * - exastro-platform.platform-job.extraEnv.JOB_NOTIFICATION_TEAMS_READ_TIMEOUT
     - | Teams通知（Webhook）のHTTPリードタイムアウト時間（秒）
       | ご利用の環境でTeams通知のタイムアウトが頻発する場合、設定を変更してください
     - 可
     - "10.0"
   * - exastro-platform.platform-job.extraEnv.JOB_NOTIFICATION_SMTP_TIMEOUT
     - | メール通知のSMTPタイムアウト時間（秒）
       | ご利用の環境でメール通知のタイムアウトが頻発する場合、設定を変更してください
     - 可
     - "10.0"
   * - exastro-platform.platform-job.extraEnv.JOB_NOTIFICATION_SMTPS_SSL_VERIFY_ENABLED
     - | メール通知のSMTP暗号化のSSL VERIFY有効化/無効化
       | 通常はTRUEでお使いください
     - 可
     - | :program:`TRUE` (デフォルト): SMTP暗号化のSSL VERIFYを有効にする
       | :program:`FALSE` : SMTP暗号化のSSL VERIFYを無効にする
   * - exastro-platform.platform-job.extraEnv.JOB_USER_IMPORT_TIMEOUT_SECONDS
     - | ユーザインポートJOBのタイムアウト時間（秒）
       | ご利用の環境でJOBのタイムアウトが頻発する場合、設定を変更してください
     - 可
     - "3600"
   * - exastro-platform.platform-job.extraEnv.JOB_USER_IMPORT_MAX_JOB_PER_PROCESS
     - | 1プロセス当たりのユーザインポートJOBの同時実行数
       | JOB処理のパフォーマンスやリソース使用量に影響します
     - 可
     - "2"
   * - exastro-platform.platform-job.extraEnv.JOB_USER_IMPORT_MAX_ROWS_ALLOWD
     - | ユーザインポートJOBで読み込み可能なExcelファイルの最大行数
       | ユーザインポートで読み込み可能なExcelファイルの最大行数を変更したい場合に設定します
     - 可
     - "20000"
   * - exastro-platform.platform-job.extraEnv.JOB_USER_IMPORT_MAX_ROWS_ALLOWD
     - | ユーザインポートJOBで読み込み可能なExcelファイルの最大列数
       | ユーザインポートで読み込み可能なExcelファイルの最大列数を変更したい場合に設定します
     - 可
     - "20"
   * - exastro-platform.platform-job.extraEnv.JOB_USER_IMPORT_WAIT_MILLISECONDS
     - | ユーザインポートJOBで1件処理毎にウェイトする時間（ミリ秒）
       | ユーザインポートJOBのパフォーマンスやリソース使用量に影響します
     - 可
     - "10"
   * - exastro-platform.platform-job.extraEnv.JOB_USER_IMPORT_XL_BUFFERED_ROWS
     - | ユーザインポートJOBのExcelファイルの読み込みのバッファリングする件数
       | ユーザインポートJOBのパフォーマンスやリソース使用量に影響します
     - 可
     - "100"
   * - exastro-platform.platform-job.extraEnv.JOB_FORCE_UPDATE_STATUS_INTERVAL_SECONDS
     - 一定時間、処理中のまま止まったJOBのステータスを強制的に失敗にするJOBの起動間隔（秒）
     - 可
     - "180"
   * - exastro-platform.platform-job.extraEnv.JOB_FORCE_UPDATE_STATUS_TIMEOUT_SECONDS
     - | 一定時間、処理中のまま止まったJOBのステータスを強制的に失敗にするJOBのタイムアウト時間（秒）
       | ご利用の環境でJOBのタイムアウトが頻発する場合、設定を変更してください
     - 可
     - "60"
   * - exastro-platform.platform-job.extraEnv.JOB_FORCE_UPDATE_STATUS_PROGRASS_SECONDS
     - 一定時間、処理中のまま止まったJOBのステータスを強制的に失敗にする時間（秒）
     - 可
     - "600"


