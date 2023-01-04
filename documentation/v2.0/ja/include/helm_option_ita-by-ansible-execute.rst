
.. list-table:: ita-by-ansible-execute における Values 一覧
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - ita-by-ansible-execute.replicaCount
     - Pod のレプリカ数
     - 不可
     - 1
   * - ita-by-ansible-execute.image.repository
     - コンテナイメージのリポジトリ名
     - 不可
     - exastro/exastro-it-automation-by-ansible-execute
   * - ita-by-ansible-execute.image.tag
     - コンテナイメージのタグ
     - 不可
     - 2.0.1
   * - ita-by-ansible-execute.image.pullPolicy
     - イメージプルポリシー
     - 可
     - | :program:`IfNotPresent` (デフォルト): コンテナイメージが存在しない場合のみプル
       | :program:`Always`: 毎回必ずプル
       | :program:`None`: プルしない
   * - ita-by-ansible-execute.extraEnv.EXECUTE_INTERVAL
     - 処理終了後から次回実行時までの待機時間
     - 不可
     - 10
   * - ita-by-ansible-execute.extraEnv.ANSIBLE_AGENT_IMAGE
     - Ansible Agent のコンテナイメージのリポジトリ名
     - 不可
     - exastro/exastro-it-automation-by-ansible-agent
   * - ita-by-ansible-execute.extraEnv.ANSIBLE_AGENT_IMAGE_TAG
     - Ansible Agent のコンテナイメージのタグ
     - 不可
     - 2.0.0
   * - ita-by-ansible-execute.serviceAccount.create
     - Ansible Agent 用のサービスアカウントの作成要否
     - 可
     - | :program:`false` (デフォルト): サービスアカウントを作成しない
       | :program:`true`: サービスアカウントを作成する
   * - ita-by-ansible-execute.serviceAccount.name
     - 作成するサービスアカウント名
     - 不可
     - ita-by-ansible-execute-sa 