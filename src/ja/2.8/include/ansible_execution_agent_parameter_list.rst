.. list-table:: env内のパラメータ
   :header-rows: 1
   :align: left

   * - パラメータ名
     - 内容
     - デフォルト値
     - 変更可否
     - 追加されたバージョン
     - 備考
   * - IS_NON_CONTAINER_LOG
     - ログをファイル出力する設定項目
     - 1
     - 不可
     - 2.5.1
     -
   * - LOG_LEVEL
     - ログを出力レベルの設定値[INFO/DEBUG]
     - INFO
     - 可
     - 2.5.1
     -
   * - LOGGING_MAX_SIZE
     - ログローテーションのファイルサイズ
     - 10485760
     - 可
     - 2.5.1
     - 初期状態は、コメントアウト
   * - LOGGING_MAX_FILE
     - ログローテーションのバックアップ数
     - 30
     - 可
     - 2.5.1
     - 初期状態は、コメントアウト
   * - LANGUAGE
     - 言語設定
     - en
     - 可
     - 2.5.1
     -
   * - TZ
     - タイムゾーン
     - Asia/Tokyo
     - 可
     - 2.5.1
     -
   * - PYTHON_CMD
     - 実行する仮想環境のpythonの実行コマンド
     - <インストールした環境のPATH>/poetry run python3
     - 不可
     - 2.5.1
     -
   * - PYTHONPATH
     - 実行する仮想環境のpythonの実行コマンド
     - <対話事項で入力したインストール先>/ita_ag_ansible_execution/
     - 可
     - 2.5.1
     -
   * - APP_PATH
     - インストール先のPATH
     - <対話事項で入力したインストール先>
     - 可
     - 2.5.1
     -
   * - STORAGEPATH
     - データの保存先のPATH
     - <対話事項で入力した保存先>/<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>/storage
     - 可
     - 2.5.1
     -
   * - LOGPATH
     - ログの保存先のPATH
     - <対話事項で入力した保存先>/<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>/log
     - 可
     - 2.5.1
     -
   * - EXASTRO_ORGANIZATION_ID
     - 接続先のORGANIZATION_ID
     - <対話事項で入力したORGANIZATION_ID>
     - 可
     - 2.5.1
     -
   * - EXASTRO_WORKSPACE_ID
     - 接続先のWORKSPACE_ID
     - <対話事項で入力したWORKSPACE_ID>
     - 可
     - 2.5.1
     -
   * - EXASTRO_URL
     - 接続先のITAのURL
     - <対話事項で入力したURL>
     - 可
     - 2.5.1
     -
   * - EXASTRO_REFRESH_TOKEN
     - 接続先のITAのEXASTRO_REFRESH_TOKEN
     - <対話事項で入力したEXASTRO_REFRESH_TOKEN>
     - 可
     - 2.5.1
     -
   * - EXECUTION_ENVIRONMENT_NAMES
     - | 実行する環実行環境指定できます。
       | 空の場合、全実行環境を作業対象とします。
       | 複数指定する場合は、「,」区切りで指定してください。
     - 空
     - 可
     - 2.5.1
     -
   * - AGENT_NAME
     - サービスに登録する、エージェントの識別子です。
     - ita-ag-ansible-execution-<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>
     - 不可
     - 2.5.1
     -
   * - USER_ID
     - エージェントの識別子です。
     - <サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>
     - 不可
     - 2.5.1
     -
   * - ITERATION
     - 設定を初期化するまでの、処理の繰り返し数
     - 10
     - 可
     - 2.5.1
     -
   * - EXECUTE_INTERVAL
     - メインプロセス終了後のインターバル
     - 5
     - 可
     - 2.5.1
     -
   * - EXECUTION_LIMIT
     - エージェントが同時に処理できる作業の最大数を制御できます。
     - 5
     - 可
     - 2.7.0
     -
   * - MOVEMENT_LIMIT
     - エージェントが一度に取得する未実行の作業の最大数を制御できます。
     - 1
     - 可
     - 2.7.0
     -