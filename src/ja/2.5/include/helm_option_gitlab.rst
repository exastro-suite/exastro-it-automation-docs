
.. list-table:: GitLab コンテナのオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - exastro-platform.gitlab.enabled
     - GitLab コンテナのデプロイの有無
     - 可
     - | :program:`true` : GitLab コンテナをデプロイします。
       | :program:`false` (デフォルト): GitLab コンテナをデプロイしません。
   * - exastro-platform.gitlab.extraEnv.GITLAB_OMNIBUS_CONFIG
     - GitLab コンテナの環境変数設定
     - 可
     - | postgresql['shared_buffers'] = "2048MB"
       | postgresql['work_mem'] = "128MB"
       | postgresql['maintenance_work_mem'] = "128MB"
       | postgresql['effective_cache_size'] = "128MB"
       | postgresql['checkpoint_segments'] = 16
       | postgresql['checkpoint_timeout'] = "10min"
       | external_url 'http://gitlab:40080'
       | nginx['listen_port'] = 40080
       | gitlab_rails['initial_root_password'] = "${GITLAB_ROOT_PASSWORD:-}"
       | gitlab_rails['registry_enabled'] = false;
       | gitlab_rails['db_prepared_statements'] = false;
       | gitlab_rails['monitoring_whitelist'] = ['0.0.0.0/0']
       | # gitlab_rails['env'] = {'MALLOC_CONF' => 'dirty_decay_ms:1000,muzzy_decay_ms:1000'}
       | # puma['worker_processes'] = 0
       | prometheus_monitoring['enable'] = false
       | # sidekiq['max_concurrency'] = 10
       | # gitaly['env'] = {'MALLOC_CONF' => 'dirty_decay_ms:1000,muzzy_decay_ms:1000', 'GITALY_COMMAND_SPAWN_MAX_PARALLEL' => '2'}
   * - exastro-platform.gitlab.extraEnv.GITLAB_POST_RECONFIGURE_SCRIPT
     - GitLab コンテナのトークン確認と作成コマンド
     - 不可
     - | while ! curl -sfI -o /dev/null http://localhost:40080/-/readiness;
       | do
       | echo "GitLab service is not ready."
       | sleep 1
       | done
       | echo "GitLab service started normally"
       | curl -Ssf -H "PRIVATE-TOKEN: ${GITLAB_ROOT_TOKEN:-}" "http://localhost:40080/api/v4/version" || (
       |   gitlab-rails runner "token = User.find_by_username('root').personal_access_tokens.create(scopes: [:api, :write_repository, :sudo], name: 'exastro system token'); token.set_token('${GITLAB_ROOT_TOKEN:-}'); token.save!"
       | )
       | echo "GitLab post reconfigure script ended."
   * - exastro-platform.gitlab.image.repository
     - コンテナイメージのリポジトリ名
     - 不可
     - "docker.io/gitlab/gitlab-ce"
   * - exastro-platform.gitlab.image.tag
     - コンテナイメージのタグ
     - 不可
     - "15.11.13-ce.0"
   * - exastro-platform.gitlab.image.pullPolicy
     - イメージプルポリシー
     - 可
     - | :program:`IfNotPresent` (デフォルト): コンテナイメージが存在しない場合のみプル
       | :program:`Always`: 毎回必ずプル
       | :program:`None`: プルしない
   * - exastro-platform.gitlab.persistence.enabled
     - Exastro 共用データベースのデータ永続化の有効フラグ
     - 可
     - | :program:`"true"` (デフォルト): データを永続化する
       | :program:`"false"`: データを永続化しない
   * - exastro-platform.gitlab.persistence.volumeName
     - 永続ボリュームのボリューム名
     - 不可
     - pv-gitlab
   * - exastro-platform.gitlab.persistence.reinstall
     - 再インストール時にデータ領域の初期化の要否
     - 不可
     - | :program:`"true"`: データを初期化(削除)する
       | :program:`"false"` (デフォルト): データを初期化(削除)しない
   * - exastro-platform.gitlab.persistence.accessMode
     - 永続ボリュームのアクセスモードの指定。
     - 可(データ永続化時)
     - "ReadWriteMany"
   * - exastro-platform.gitlab.persistence.size
     - 永続ボリュームのディスク容量
     - 可 (データ永続化時)
     - "20Gi"
   * - exastro-platform.gitlab.persistence.storageClass
     - 永続ボリュームにストレージクラスを利用する場合のクラスを指定
     - 可 (データ永続化時)
     - | :program:`"-"` (デフォルト): ストレージクラスを指定しない。
       | :program:`ストレージクラス名`: クラウドプロバイダなどから提供されるストレージクラス名を指定。
   * - exastro-platform.gitlab.persistence.matchLabels.name
     - 永続ボリュームのボリューム名
     - 不可
     - pv-gitlab
   * - exastro-platform.gitlab.resources.requests.memory
     - メモリ要求
     - 可
     - "4Gi"
   * - exastro-platform.gitlab.resources.requests.cpu
     - CPU要求
     - 可
     - "4"
   * - exastro-platform.gitlab.resources.limits.memory
     - メモリ上限
     - 可
     - "8Gi"
   * - exastro-platform.gitlab.resources.limits.cpu
     - CPU上限
     - 可
     - "8"
   * - exastro-platform.gitlab.service.type
     - GitLab のサービスタイプ
     - 可
     - | :program:`ClusterIP` (デフォルト): Ingress Controller を利用する場合などに選択
       | :program:`LoadBalancer` : LoadBalancer を利用する場合に選択
       | :program:`NodePort` : NodePort を利用する場合に選択
   * - exastro-platform.gitlab.service.name
     - | GitLab のサービス用名前
     - 不可
     - "gitlab"
   * - exastro-platform.gitlab.service.port
     - | GitLab のサービス用公開ポート番号
     - 可 (NodePort利用時)
     - "40080"
   * - exastro-platform.gitlab.service.nodePort
     - | GitLab のシステム管理用公開ポート番号
     - 可 (NodePort利用時)
     - "30082"
