========================
実装のベストプラクティス
========================

| この章では、設計した自動化の仕組みを実際のExastroコンポーネントとして実装する際のベストプラクティスを学習します。
| 良い実装は運用時の安定性と拡張性を大きく左右するため、実践的なテクニックを身につけることが重要です。

実装の全体的なアプローチ
========================

段階的実装戦略
--------------

| 自動化の実装は以下の段階で進めることを推奨します：

.. mermaid::

   graph TD
       A[プロトタイプ] --> B[MVP実装]
       B --> C[段階的拡張]
       C --> D[本格運用]
       
       A1[基本機能のみ] --> A
       B1[コア機能中心] --> B
       C1[順次機能追加] --> C
       D1[フル機能運用] --> D

**各段階の特徴**:

1. **プロトタイプ段階**
   - 最小限の機能で動作確認
   - 単一環境での検証
   - エラー処理は最低限

2. **MVP(Minimum Viable Product)段階**
   - 実用最小限の機能セット
   - 基本的なエラー処理を実装
   - 限定的な本番適用

3. **段階的拡張段階**
   - 順次機能を追加・改善
   - 運用フィードバックを反映
   - パフォーマンス最適化

4. **本格運用段階**
   - 全機能が安定動作
   - 包括的なエラー処理
   - 監視・メトリクス完備

パラメータシートの実装
======================

既存資産からの段階的実装アプローチ
----------------------------------

| パラメータシートの実装は、既存の構築手順書やPlaybookを分析し、段階的に実装していくことが成功の鍵です。

**ステップ1: 既存手順書の詳細分析**

| まず、既存の手順書から実装に必要な情報を体系的に抽出します：

.. code-block:: text
   :caption: 手順書分析の実例（Apache構築手順より）

   ========== 元の手順書 ==========
   1. Apache HTTPDパッケージをインストール
      $ sudo yum install httpd
   
   2. 設定ファイルを編集
      ファイル: /etc/httpd/conf/httpd.conf
      - ServerName: www.example.com  ← 環境により変更
      - Listen: 80                   ← 環境により変更
      - DocumentRoot: /var/www/html  ← 固定値
      - ErrorLog: logs/error_log     ← 固定値
      - LogLevel: warn               ← 環境により変更（dev:debug, prod:warn）
   
   3. SSL設定（本番環境のみ）
      ファイル: /etc/httpd/conf.d/ssl.conf
      - SSLEngine: on
      - SSLCertificateFile: /etc/ssl/certs/server.crt    ← 環境により変更
      - SSLCertificateKeyFile: /etc/ssl/private/server.key ← 環境により変更
   
   4. ファイアウォール設定
      $ sudo firewall-cmd --permanent --add-port=80/tcp
      $ sudo firewall-cmd --permanent --add-port=443/tcp  ← SSL有効時のみ
   
   5. サービス起動
      $ sudo systemctl enable httpd
      $ sudo systemctl start httpd

**分析結果とパラメータ抽出**

.. list-table:: 手順書分析結果
   :header-rows: 1
   :widths: 20 15 15 20 30

   * - 設定項目
     - データ型
     - 必須性
     - 変更タイミング
     - 抽出理由
   * - **ServerName**
     - string
     - 必須
     - 環境構築時
     - 環境ごとに異なるFQDN
   * - **Listen**
     - integer
     - 必須
     - 構築時/設定変更時
     - セキュリティ要件で変更される
   * - **LogLevel**
     - select
     - 任意
     - 運用中
     - 環境ごとのデバッグレベル
   * - **SSL関連**
     - boolean+paths
     - 条件付き
     - 構築時
     - 本番環境でのみ必要
   * - **DocumentRoot**
     - string
     - 任意
     - まれ
     - 標準パスから変更の可能性

**ステップ2: パラメータシート設計の具体的実装**

.. code-block:: yaml
   :caption: 抽出結果からのパラメータシート設計

   # パラメータシート: Apache Webサーバ設定
   parameter_sheet_name: "WebServer_Configuration"
   description: "Apache HTTPDサーバの構築・運用パラメータ"
   
   # 基本設定グループ
   basic_settings:
     hostname:
       display_name: "サーバホスト名"
       data_type: "string"
       required: true
       max_length: 63
       validation_pattern: "^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$"
       description: "サーバのホスト名（FQDN形式推奨）"
       example: "web01.example.com"
       input_helper: "例: web01.example.com"
     
     server_name:
       display_name: "Apache ServerName"
       data_type: "string"
       required: true
       default_expression: "{{ hostname }}"
       description: "Apache設定のServerName（通常はホスト名と同じ）"
       linked_parameter: "hostname"
     
     http_port:
       display_name: "HTTPポート番号"
       data_type: "integer"
       required: false
       default: 80
       min_value: 1
       max_value: 65535
       validation_note: "1024未満のポートは管理者権限が必要"
       common_values: [80, 8080, 8000, 8888]
   
   # 環境設定グループ
   environment_settings:
     environment_type:
       display_name: "環境種別"
       data_type: "pulldown"
       required: true
       options:
         - value: "development"
           label: "開発環境"
         - value: "staging" 
           label: "ステージング環境"
         - value: "production"
           label: "本番環境"
       description: "デプロイ対象の環境種別"
     
     log_level:
       display_name: "ログレベル"
       data_type: "pulldown"
       required: false
       default_by_environment:
         development: "debug"
         staging: "info"
         production: "warn"
       options:
         - value: "debug"
           label: "DEBUG（詳細ログ）"
         - value: "info"
           label: "INFO（情報ログ）"
         - value: "warn"
           label: "WARN（警告のみ）"
         - value: "error"
           label: "ERROR（エラーのみ）"
       description: "Apache ErrorLogのログレベル"
   
   # SSL設定グループ（条件付き表示）
   ssl_settings:
     ssl_enabled:
       display_name: "SSL有効化"
       data_type: "boolean"
       required: false
       default_by_environment:
         development: false
         staging: true
         production: true
       description: "HTTPS通信を有効にする"
       conditional_display: true
     
     ssl_certificate_file:
       display_name: "SSL証明書ファイルパス"
       data_type: "string"
       required_when: "ssl_enabled == true"
       validation_pattern: "^/.+\\.(crt|pem)$"
       description: "SSL証明書ファイルの絶対パス"
       example: "/etc/ssl/certs/server.crt"
       file_existence_check: true
     
     ssl_private_key_file:
       display_name: "SSL秘密鍵ファイルパス"
       data_type: "string"
       required_when: "ssl_enabled == true"
       validation_pattern: "^/.+\\.(key|pem)$"
       description: "SSL秘密鍵ファイルの絶対パス"
       example: "/etc/ssl/private/server.key"
       file_existence_check: true
       security_level: "high"
     
     https_port:
       display_name: "HTTPSポート番号"
       data_type: "integer"
       required_when: "ssl_enabled == true"
       default: 443
       min_value: 1
       max_value: 65535
       validation_rule: "http_port != https_port"
       description: "HTTPS通信用のポート番号"

**ステップ3: 高度なバリデーション実装**

.. code-block:: yaml
   :caption: 実装レベルでのバリデーション詳細

   # 複合バリデーションルール
   advanced_validations:
     environment_consistency:
       name: "環境整合性チェック"
       trigger_parameters: ["environment_type", "ssl_enabled", "log_level"]
       validation_logic:
         rules:
           - condition: "environment_type == 'production' AND ssl_enabled == false"
             severity: "error"
             message: "本番環境ではSSLの有効化が必須です"
             auto_fix: "ssl_enabled = true"
           
           - condition: "environment_type == 'production' AND log_level == 'debug'"
             severity: "warning"
             message: "本番環境でDEBUGログレベルはパフォーマンスに影響します"
             recommendation: "log_level = 'warn'"
           
           - condition: "ssl_enabled == true AND (ssl_certificate_file == '' OR ssl_private_key_file == '')"
             severity: "error"
             message: "SSL有効時は証明書ファイルと秘密鍵ファイルの指定が必要です"
     
     network_configuration:
       name: "ネットワーク設定チェック"
       trigger_parameters: ["http_port", "https_port"]
       validation_logic:
         pre_execution_checks:
           - name: "ポート重複チェック"
             test: "port_availability_check"
             target_ports: ["{{ http_port }}", "{{ https_port if ssl_enabled }}"]
           
           - name: "ファイアウォール確認"
             test: "firewall_rule_check"
             required_ports: ["{{ http_port }}", "{{ https_port if ssl_enabled }}"]
   
   # カスタムバリデーション関数
   custom_validators:
     certificate_validation:
       function_name: "validate_ssl_certificate"
       parameters: ["ssl_certificate_file", "ssl_private_key_file"]
       implementation: |
         # SSL証明書と秘密鍵の整合性チェック
         cert_modulus = execute("openssl x509 -noout -modulus -in {{ ssl_certificate_file }}")
         key_modulus = execute("openssl rsa -noout -modulus -in {{ ssl_private_key_file }}")
         
         if cert_modulus != key_modulus:
           return ValidationError("証明書と秘密鍵が一致しません")
         
         # 証明書有効期限チェック
         expiry_date = execute("openssl x509 -noout -enddate -in {{ ssl_certificate_file }}")
         if days_until(expiry_date) < 30:
           return ValidationWarning("証明書の有効期限が30日以内です")
         
         return ValidationSuccess()
     
     performance_estimation:
       function_name: "estimate_performance_impact"
       parameters: ["log_level", "ssl_enabled", "expected_concurrent_users"]
       implementation: |
         # パフォーマンス影響の概算
         base_performance = 1000  # req/sec
         
         if log_level == "debug":
           performance_multiplier *= 0.7  # 30%低下
         elif log_level == "info":
           performance_multiplier *= 0.9  # 10%低下
         
         if ssl_enabled:
           performance_multiplier *= 0.8  # 20%低下
         
         estimated_capacity = base_performance * performance_multiplier
         
         if expected_concurrent_users > estimated_capacity:
           return ValidationWarning("予想負荷がサーバ性能を超過する可能性があります")

**ステップ4: Playbook連携の実装**

.. code-block:: yaml
   :caption: パラメータシートとPlaybook変数の自動マッピング

   # パラメータマッピング定義
   parameter_mapping:
     target_playbook: "apache_setup.yml"
     variable_mapping:
       # 直接マッピング
       direct_mapping:
         hostname: "target_hostname"
         server_name: "apache_server_name"
         http_port: "apache_http_port"
         log_level: "apache_log_level"
       
       # 条件付きマッピング
       conditional_mapping:
         ssl_settings:
           condition: "ssl_enabled == true"
           variables:
             ssl_certificate_file: "apache_ssl_cert_path"
             ssl_private_key_file: "apache_ssl_key_path"
             https_port: "apache_https_port"
       
       # 計算マッピング
       calculated_mapping:
         firewall_ports:
           expression: "[{{ http_port }}] + ([{{ https_port }}] if {{ ssl_enabled }} else [])"
           target_variable: "firewall_allowed_ports"
         
         ssl_enabled_flag:
           expression: "{{ ssl_enabled | lower }}"
           target_variable: "apache_ssl_enable"
   
   # 実行時変数生成
   runtime_variables:
     auto_generated:
       deployment_timestamp:
         value: "{{ ansible_date_time.iso8601 }}"
         description: "デプロイ実行時刻"
       
       parameter_checksum:
         value: "{{ (parameter_values | to_json | hash('sha256'))[:8] }}"
         description: "パラメータ設定のチェックサム（変更検出用）"
       
       environment_tag:
         value: "env:{{ environment_type }}-app:apache-ver:{{ apache_version | default('latest') }}"
         description: "環境識別タグ"

段階的実装とテスト戦略
----------------------

**フェーズ1: 基本パラメータシートの実装**

.. code-block:: yaml
   :caption: 最小限のパラメータシート（MVP版）

   # MVP: 最小限の実用パラメータシート
   mvp_parameter_sheet:
     name: "Apache_Basic_Config"
     description: "Apache基本構築用最小パラメータセット"
     
     essential_parameters:
       hostname:
         type: "string"
         required: true
         validation: "basic_hostname_pattern"
       
       environment:
         type: "select"
         options: ["dev", "stg", "prod"]
         required: true
       
       ssl_enabled:
         type: "boolean"
         default: false
     
     # 簡易バリデーション
     basic_validations:
       - rule: "hostname != ''"
         message: "ホスト名は必須です"
       - rule: "environment in ['dev', 'stg', 'prod']"
         message: "正しい環境を選択してください"

**フェーズ2: 高度な機能の追加**

.. code-block:: yaml
   :caption: 機能拡張版パラメータシート

   # 機能拡張版
   enhanced_parameter_sheet:
     name: "Apache_Advanced_Config"
     inherit_from: "Apache_Basic_Config"
     
     additional_parameters:
       performance_tuning:
         worker_processes:
           type: "integer"
           min: 1
           max: 32
           default_calculation: "{{ ansible_processor_vcpus * 2 }}"
           description: "Workerプロセス数（CPU数の2倍を推奨）"
         
         max_connections:
           type: "integer"
           min: 100
           max: 10000
           default: 1000
           dependency: "worker_processes * 25"
       
       monitoring:
         status_page_enabled:
           type: "boolean"
           default: true
           description: "サーバステータスページの有効化"
         
         access_log_format:
           type: "select"
           options: ["common", "combined", "custom"]
           default: "combined"
     
     # 高度なバリデーション
     advanced_validations:
       performance_check:
         condition: "max_connections > (worker_processes * 100)"
         severity: "warning"
         message: "接続数設定がWorkerプロセス数に対して高すぎる可能性があります"

**フェーズ3: 運用統合版の実装**

.. code-block:: yaml
   :caption: 運用統合版パラメータシート

   # 運用統合版
   production_ready_sheet:
     name: "Apache_Production_Config"
     inherit_from: "Apache_Advanced_Config"
     
     operational_parameters:
       backup_settings:
         config_backup_enabled:
           type: "boolean"
           default: true
           description: "設定変更時の自動バックアップ"
         
         backup_retention_days:
           type: "integer"
           min: 7
           max: 365
           default_by_environment:
             dev: 7
             stg: 30
             prod: 90
       
       maintenance:
         auto_restart_enabled:
           type: "boolean"
           default: false
           description: "設定変更時の自動再起動"
         
         maintenance_window:
           type: "time_range"
           format: "HH:MM-HH:MM"
           example: "02:00-04:00"
           description: "メンテナンス実行可能時間帯"
     
     # 運用レベルバリデーション
     operational_validations:
       maintenance_schedule:
         condition: "auto_restart_enabled == true"
         requirement: "maintenance_window != ''"
         message: "自動再起動を有効にする場合はメンテナンス時間帯の指定が必要です"
       
       backup_storage:
         condition: "config_backup_enabled == true"
         pre_check: "disk_space_available"
         minimum_space: "1GB"
         message: "バックアップ用のディスク容量が不足しています"

実装のベストプラクティス
------------------------

**1. パラメータシートの可読性向上**

.. code-block:: yaml
   :caption: 可読性を高める実装テクニック

   # グループ化と表示制御
   parameter_groups:
     basic_info:
       display_name: "基本設定"
       description: "サーバの基本的な設定項目"
       icon: "server"
       expanded_by_default: true
       
     ssl_config:
       display_name: "SSL/TLS設定"
       description: "HTTPS通信に関する設定"
       icon: "shield"
       visible_when: "ssl_enabled == true"
       help_text: "本番環境では必ずSSLを有効にしてください"
     
     advanced_tuning:
       display_name: "詳細チューニング"
       description: "パフォーマンス関連の詳細設定"
       icon: "tune"
       collapsed_by_default: true
       warning_text: "これらの設定は上級者向けです"
   
   # 入力支援機能
   input_assistance:
     hostname:
       placeholder: "例: web01.example.com"
       auto_completion:
         source: "dns_lookup"
         suggestions: ["web01", "web02", "app01"]
       
       real_time_validation:
         dns_resolution: true
         format_check: true
         duplicate_check: true
     
     ssl_certificate_file:
       file_browser: true
       file_filters: [".crt", ".pem", ".cert"]
       preview_enabled: true
       validation_preview: "certificate_info_display"

**2. パフォーマンス最適化**

.. code-block:: yaml
   :caption: 大規模環境での最適化

   # 大量データ対応
   performance_optimizations:
     lazy_loading:
       enabled: true
       parameters_per_page: 50
       search_index: ["hostname", "environment", "server_name"]
     
     bulk_operations:
       bulk_update_enabled: true
       validation_mode: "background"
       progress_tracking: true
     
     caching:
       parameter_schema_cache: "1hour"
       validation_result_cache: "5minutes"
       dependency_calculation_cache: "30minutes"
   
   # バリデーション最適化
   validation_optimization:
     async_validation:
       enabled: true
       timeout: "30seconds"
       retry_count: 3
     
     batch_validation:
       group_size: 10
       parallel_execution: true
       max_parallel_groups: 3

Playbook実装のベストプラクティス
================================

モジュール化の技法
------------------

| Playbookは以下の構造でモジュール化します：

**1. 役割別ディレクトリ構造**

.. code-block:: text

   playbooks/
   ├── common/              # 共通処理
   │   ├── setup.yml       # 初期設定
   │   ├── security.yml    # セキュリティ設定
   │   └── monitoring.yml  # 監視設定
   ├── webserver/          # Webサーバ関連
   │   ├── install.yml     # インストール
   │   ├── configure.yml   # 設定
   │   └── maintain.yml    # メンテナンス
   └── database/           # データベース関連
       ├── install.yml
       ├── backup.yml
       └── restore.yml

**2. 共通タスクの抽象化**

.. code-block:: yaml
   :caption: 共通タスクの例

   # common/package_management.yml
   - name: "パッケージ管理の共通処理"
     block:
       - name: "パッケージキャッシュの更新"
         package:
           update_cache: yes
         when: ansible_os_family == "Debian"
       
       - name: "パッケージのインストール"
         package:
           name: "{{ packages }}"
           state: present
       
       - name: "インストール結果の確認"
         command: "{{ item }} --version"
         loop: "{{ packages }}"
         register: version_check
         failed_when: version_check.rc != 0

エラーハンドリングの実装
------------------------

| 堅牢なエラーハンドリングを実装します：

**1. 前提条件チェック**

.. code-block:: yaml
   :caption: 前提条件チェックの例

   - name: "前提条件チェック"
     block:
       - name: "ディスク容量チェック"
         assert:
           that:
             - ansible_facts['mounts'][0]['size_available'] > 1073741824
           fail_msg: "ディスク容量が不足しています（最低1GB必要）"
       
       - name: "メモリ容量チェック"
         assert:
           that:
             - ansible_facts['memtotal_mb'] > 512
           fail_msg: "メモリ容量が不足しています（最低512MB必要）"
       
       - name: "ネットワーク接続チェック"
         uri:
           url: "https://example.com"
           method: HEAD
           timeout: 10
         delegate_to: localhost

**2. グレースフルなエラー処理**

.. code-block:: yaml
   :caption: グレースフルエラー処理の例

   - name: "Webサーバ設定変更"
     block:
       - name: "設定ファイルのバックアップ"
         copy:
           src: "{{ config_file }}"
           dest: "{{ config_file }}.backup.{{ ansible_date_time.epoch }}"
           remote_src: yes
       
       - name: "新しい設定ファイルの配布"
         template:
           src: "httpd.conf.j2"
           dest: "{{ config_file }}"
           backup: yes
         notify: restart_httpd
       
       - name: "設定ファイルの構文チェック"
         command: "httpd -t"
         register: syntax_check
     
     rescue:
       - name: "設定ファイルの復元"
         copy:
           src: "{{ config_file }}.backup.{{ ansible_date_time.epoch }}"
           dest: "{{ config_file }}"
           remote_src: yes
       
       - name: "エラーログの出力"
         debug:
           msg: "設定変更に失敗しました: {{ syntax_check.stderr | default('Unknown error') }}"
       
       - name: "処理の中断"
         fail:
           msg: "Webサーバ設定変更に失敗しました。設定を復元しました。"

ログとデバッグの実装
--------------------

| 運用時の問題解決を支援するログ機能を実装します：

**1. 構造化ログ**

.. code-block:: yaml
   :caption: 構造化ログの例

   - name: "構造化ログの出力"
     debug:
       msg:
         timestamp: "{{ ansible_date_time.iso8601 }}"
         hostname: "{{ inventory_hostname }}"
         task: "{{ ansible_task_name }}"
         status: "{{ task_status }}"
         duration: "{{ task_duration }}"
         details: "{{ task_details }}"

**2. パフォーマンス測定**

.. code-block:: yaml
   :caption: パフォーマンス測定の例

   - name: "処理時間測定の開始"
     set_fact:
       task_start_time: "{{ ansible_date_time.epoch }}"
   
   - name: "時間のかかる処理"
     command: "some_long_running_command"
     register: result
   
   - name: "処理時間の計算と記録"
     set_fact:
       task_duration: "{{ ansible_date_time.epoch | int - task_start_time | int }}"
   
   - name: "パフォーマンスログの出力"
     debug:
       msg: "処理時間: {{ task_duration }}秒 - {{ ansible_task_name }}"

Movement実装のパターン
======================

標準的なMovementパターン
------------------------

| よく使用されるMovementパターンを標準化します：

**1. インストールパターン**

.. code-block:: yaml
   :caption: インストールMovementの例

   # Movement: Apache Webサーバインストール
   phases:
     - name: "事前チェック"
       tasks:
         - 前提条件確認
         - リソース確認
         - 既存インストール確認
     
     - name: "インストール実行"
       tasks:
         - パッケージインストール
         - 初期設定
         - サービス有効化
     
     - name: "事後確認"
       tasks:
         - インストール確認
         - サービス起動確認
         - 疎通確認

**2. 設定変更パターン**

.. code-block:: yaml
   :caption: 設定変更Movementの例

   # Movement: 設定ファイル更新
   phases:
     - name: "変更前処理"
       tasks:
         - 現在設定のバックアップ
         - 変更内容の妥当性確認
         - 影響範囲の特定
     
     - name: "設定変更実行"
       tasks:
         - 設定ファイル更新
         - 構文チェック
         - サービス再起動
     
     - name: "変更後確認"
       tasks:
         - 動作確認
         - ログ確認
         - 性能確認

Conductor実装の高度なテクニック
===============================

条件分岐とループ制御
--------------------

| Conductorで複雑なワークフローを実装します：

**1. 動的な分岐制御**

.. code-block:: yaml
   :caption: 動的分岐の例

   workflow:
     - name: "環境タイプ判定"
       movement: "check_environment_type"
       register: env_type
     
     - name: "本番環境処理"
       movement: "production_deployment"
       when: "env_type.result == 'production'"
       parallel: false
     
     - name: "検証環境処理"
       movement: "staging_deployment"
       when: "env_type.result == 'staging'"
       parallel: true
       parallel_count: 3

**2. 動的なループ処理**

.. code-block:: yaml
   :caption: 動的ループの例

   workflow:
     - name: "対象サーバリスト取得"
       movement: "get_target_servers"
       register: server_list
     
     - name: "サーバ別処理実行"
       movement: "server_maintenance"
       loop: "{{ server_list.servers }}"
       loop_var: "target_server"
       parallel: true
       max_parallel: 5

テスト実装の自動化
==================

テスト用Movementの作成
----------------------

| 自動化の品質を保証するテスト用Movementを作成します：

**1. 単体テスト用Movement**

.. code-block:: yaml
   :caption: 単体テスト用Movementの例

   # Movement: Apache設定テスト
   test_cases:
     - name: "設定ファイル構文テスト"
       command: "httpd -t"
       expected_rc: 0
     
     - name: "サービス起動テスト"
       service:
         name: httpd
         state: started
       register: service_status
     
     - name: "ポート待受テスト"
       wait_for:
         port: 80
         timeout: 30
     
     - name: "HTTP応答テスト"
       uri:
         url: "http://{{ inventory_hostname }}"
         method: GET
       register: http_response

**2. 統合テスト用Conductor**

.. code-block:: yaml
   :caption: 統合テスト用Conductorの例

   integration_test:
     - name: "環境初期化"
       movement: "environment_reset"
     
     - name: "システム構築"
       movement: "full_system_build"
     
     - name: "機能テスト実行"
       movement: "functional_tests"
       register: test_results
     
     - name: "パフォーマンステスト実行"
       movement: "performance_tests"
       when: "test_results.success == true"
     
     - name: "テスト結果レポート"
       movement: "generate_test_report"

継続的改善の仕組み
==================

メトリクス収集の実装
--------------------

| 自動化の効果を測定するメトリクスを収集します：

.. code-block:: yaml
   :caption: メトリクス収集の例

   metrics_collection:
     - name: "実行時間メトリクス"
       vars:
         start_time: "{{ ansible_date_time.epoch }}"
       tasks:
         - name: "処理実行"
           # ... 実際の処理 ...
         - name: "実行時間記録"
           uri:
             url: "{{ metrics_endpoint }}/execution_time"
             method: POST
             body_format: json
             body:
               timestamp: "{{ ansible_date_time.iso8601 }}"
               movement: "{{ movement_name }}"
               duration: "{{ ansible_date_time.epoch | int - start_time | int }}"
               status: "success"

フィードバックループの実装
--------------------------

| 運用フィードバックを自動化改善に活用する仕組みを実装します：

.. mermaid::

   graph LR
       A[運用実行] --> B[メトリクス収集]
       B --> C[分析・評価]
       C --> D[改善提案]
       D --> E[実装・検証]
       E --> A

次のステップ
============

| 実装技法を理解したら、次は :doc:`../operations/index` で運用のベストプラクティスを学習しましょう。
| 運用フェーズでは、実装した自動化基盤を継続的に改善・発展させる方法を解説します。