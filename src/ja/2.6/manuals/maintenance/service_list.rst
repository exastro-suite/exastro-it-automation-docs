============
サービス一覧
============

| 本書では Exastro IT Automation の各サービスを以下に記載します。

サービス一覧詳細
================

| 以下の一覧の「監視対象」列には監視すべきサービスを記載しています。
| 監視対象のサービスは「〇」、対象外のサービスは「×」を記載しています。

.. list-table::
   :widths: 15 1 25 25
   :header-rows: 1
   :align: left

   * - | サービス
     - | 監視対象
     - | 説明
     - | 備考
   * - | ita-ag-oase
     - | 〇
     - | OASEとイベント収集したい外部サービスとのエージェント
     - |
   * - | ita-api-admin
     - | 〇
     - | システム管理関連の利用を受け付けるAPI
     - |
   * - | ita-api-oase-receiver
     - | 〇
     - | OASE専用の利用を受け付けるAPI
     - |
   * - | ita-api-organization
     - | 〇
     - | ITA全般のAPI
     - |
   * - | ita-by-ansible-agent
     - | ×
     - | Ansible-Coreで作業実行を行う際の作業対象用エージェント
     - | ita-by-ansible-executeで監視しているため監視対象としない。
   * - | ita-by-ansible-execute
     - | 〇
     - | Ansible作業実行を管理するバックグラウンド実行サービス
     - |
   * - | ita-by-ansible-legacy-role-vars-listup
     - | 〇
     - | Ansible-LegacyRoleで利用する変数を刈り取るバックグラウンド実行サービス
     - |
   * - | ita-by-ansible-legacy-vars-listup
     - | 〇
     - | Ansible-Legacyで利用する変数を刈り取るバックグラウンド実行サービス
     - |
   * - | ita-by-ansible-pioneer-vars-listup
     - | 〇
     - | Ansible-Pioneerで利用する変数を刈り取るバックグラウンド実行サービス
     - |
   * - | ita-by-ansible-towermaster-sync
     - | 〇
     - | Ansible Towerの登録情報をITAに同期するバックグラウンド実行サービス
     - |
   * - | ita-by-cicd-for-iac
     - | 〇
     - | CI/CD for IaCの設定を元に、リモートリポジトリとITAの資材を紐づけるバックグラウンド実行サービス
     - |
   * - | ita-by-collector
     - | 〇
     - | 収集項目値管理の設定を元に、Ansibleの作業実行結果をパラメータシートへ自動で登録するバックグラウンド実行サービス
     - |
   * - | ita-by-conductor-regularly
     - | 〇
     - | Conductor定期作業実行を行うバックグラウンド実行サービス
     - |
   * - | ita-by-conductor-synchronize
     - | 〇
     - | Conductor作業を管理するバックグラウンド実行サービス
     - |
   * - | ita-by-excel-export-import
     - | 〇
     - | 一括Excelエクスポート/インポートを実行するバックグラウンド実行サービス
     - |
   * - | ita-by-execinstance-dataautoclean
     - | 〇
     - | オペレーション削除管理の設定を元に、期限を過ぎたオペレーションに紐づくデータ削除を行うバックグラウンド実行サービス
     - |
   * - | ita-by-file-autoclean
     - | 〇
     - | ファイル削除管理の設定を元に、期限を過ぎたファイル削除を行うバックグラウンド実行サービス
     - |
   * - | ita-by-hostgroup-split
     - | 〇
     - | ホストグループの設定を元に、パラメータシートに登録されたデータをホストごとに分解して登録するバックグラウンド実行サービス
     - |
   * - | ita-by-menu-create
     - | 〇
     - | メニュー（パラメータシート）を作成するバックグラウンド実行サービス
     - |
   * - | ita-by-menu-export-import
     - | 〇
     - | メニューエクスポート/インポートを実行するバックグラウンド実行サービス
     - |
   * - | ita-by-oase-conclusion
     - | 〇
     - | OASEのルール判定を実行するバックグラウンド実行サービス
     - |
   * - | ita-by-terraform-cli-execute
     - | 〇
     - | Terraform-CLI作業実行を管理するバックグラウンド実行サービス
     - |
   * - | ita-by-terraform-cli-vars-listup
     - | 〇
     - | Terraform-CLIで利用する変数を刈り取るバックグラウンド実行サービス
     - |
   * - | ita-by-terraform-cloud-ep-execute
     - | 〇
     - | Terraform-Cloud/EP作業実行を管理するバックグラウンド実行サービス
     - |
   * - | ita-by-terraform-cloud-ep-vars-listup
     - | 〇
     - | Terraform-Cloud/EPで利用する変数を刈り取るバックグラウンド実行サービス
     - |
   * - | ita-migration
     - | ×
     - | ITAのマイグレーション用サービス
     - | インストール/アップグレード時のみのため監視対象としない。
   * - | ita-web-server
     - | 〇
     - | ITAのフロントエンドWebサービス
     - |
   * - | platform-api
     - | 〇
     - | 共通基盤APIコントローラーサービス
     - |
   * - | platform-auth
     - | 〇
     - | 共通基盤認証・認可サービス
     - |
   * - | platform-job
     - | 〇
     - | 共通基盤ジョブサービス
     - |
   * - | platform-migration
     - | ×
     - | 共通基盤マイグレーションサービス
     - | インストール/アップグレード時のみのため監視対象としない。
   * - | platform-web
     - | 〇
     - | 共通基盤フロントエンドWebサービス
     - |
   * - | keycloak
     - | 〇
     - | ID管理・アクセス管理サービス
     - | Exastro システムのユーザー管理全般
   * - | mariadb
     - | 〇
     - | データベース
     - | Exastro システムの主データベース
   * - | mongodb
     - | 〇
     - | ドキュメント指向データベース
     - | 主にOASE機能で利用
   * - | gitlab
     - | 〇
     - | DevSecOpsプラットフォームサービス
     - | 主にExastro IT AutomationでGitリポジトリ機能として利用
