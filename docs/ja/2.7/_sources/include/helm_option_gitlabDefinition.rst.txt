
.. list-table:: 共通設定 (GitLab) のオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - global.gitlabDefinition.name
     - GitLab の定義名
     - 不可
     - gitlab
   * - global.gitlabDefinition.enabled
     - GitLab の定義の利用有無
     - 不可
     - true
   * - global.gitlabDefinition.config.GITLAB_PROTOCOL
     - GitLab エンドポイントのプロトコル
     - 可
     - http
   * - global.gitlabDefinition.config.GITLAB_HOST
     - GitLab エンドポイントへのホスト名、もしくは、FQDN
     - 可
     - gitlab
   * - global.gitlabDefinition.config.GITLAB_PORT
     - GitLab エンドポイントのポート番号
     - 可
     - 80
   * - global.gitlabDefinition.secret.GITLAB_ROOT_PASSWORD
     - GitLab の root 権限アカウントのユーザーパスワード
     - 必須
     - 任意の文字列（8文字以上で予測可能な単語等は利用不可）
   * - global.gitlabDefinition.secret.GITLAB_ROOT_TOKEN
     - GitLab の root 権限アカウントのアクセストークン
     - 必須
     - アクセエストークン(平文)
