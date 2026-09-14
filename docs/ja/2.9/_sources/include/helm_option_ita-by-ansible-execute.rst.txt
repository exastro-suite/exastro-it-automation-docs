
.. list-table:: ita-by-ansible-execute における Values 一覧
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - exastro-it-automation.ita-by-ansible-execute.replicaCount
     - Pod のレプリカ数
     - 不可
     - 1
   * - exastro-it-automation.ita-by-ansible-execute.image.repository
     - コンテナイメージのリポジトリ名
     - 不可
     - docker.io/exastro/exastro-it-automation-by-ansible-execute
   * - exastro-it-automation.ita-by-ansible-execute.image.tag
     - コンテナイメージのタグ
     - 不可
     - ""
   * - exastro-it-automation.ita-by-ansible-execute.image.pullPolicy
     - イメージプルポリシー
     - 可
     - | :program:`IfNotPresent` (デフォルト): コンテナイメージが存在しない場合のみプル
       | :program:`Always`: 毎回必ずプル
       | :program:`None`: プルしない
   * - exastro-it-automation.ita-by-ansible-execute.extraEnv.EXECUTE_INTERVAL
     - 処理終了後から次回実行時までの待機時間
     - 不可
     - 10
   * - exastro-it-automation.ita-by-ansible-execute.extraEnv.ANSIBLE_AGENT_IMAGE
     - Ansible Agent のコンテナイメージのリポジトリ名
     - 不可
     - exastro/exastro-it-automation-by-ansible-agent
   * - exastro-it-automation.ita-by-ansible-execute.extraEnv.ANSIBLE_AGENT_IMAGE_TAG
     - Ansible Agent のコンテナイメージのタグ
     - 不可
     - 2.0.0
   * - exastro-it-automation.ita-by-ansible-execute.extraEnv.PLATFORM_API_HOST
     - Exastro 共通基盤で公開する内部の API エンドポイントで利用するホスト名
     - 不可
     - "platform-api"
   * - exastro-it-automation.ita-by-ansible-execute.extraEnv.PLATFORM_API_PORT
     - Exastro 共通基盤で公開する内部の API エンドポイントで利用するポート番号(TCP)
     - 不可
     - "8000"
   * - exastro-it-automation.ita-by-ansible-execute.serviceAccount.create
     - Ansible Agent 用のサービスアカウントの作成要否
     - 可
     - | :program:`false` (デフォルト): サービスアカウントを作成しない
       | :program:`true`: サービスアカウントを作成する
   * - exastro-it-automation.ita-by-ansible-execute.serviceAccount.name
     - 作成するサービスアカウント名
     - 不可
     - exastro-it-automation.ita-by-ansible-execute-sa
