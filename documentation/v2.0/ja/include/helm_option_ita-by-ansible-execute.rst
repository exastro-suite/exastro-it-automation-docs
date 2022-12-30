
.. list-table:: ita-by-ansible-execute における Values 一覧
   :widths: 25 25 5 5 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 設定・変更
     - 必須
     - デフォルト値・選択可能な設定値
   * - ita-by-ansible-execute.replicaCount
     - 
     - 不可
     - ○
     - 1 
   * - ita-by-ansible-execute.image.repository
     - 
     - 不可
     - ○
     - exastro/exastro-it-automation-by-ansible-execute 
   * - ita-by-ansible-execute.image.tag
     - 
     - 不可
     - ○
     - 2.0.1 
   * - ita-by-ansible-execute.image.pullPolicy
     - 
     - 不可
     - ○
     - IfNotPresent 
   * - ita-by-ansible-execute.extraEnv.EXECUTE_INTERVAL
     - 
     - 不可
     - ○
     - 10 
   * - ita-by-ansible-execute.extraEnv.ANSIBLE_AGENT_IMAGE
     - 
     - 不可
     - ○
     - exastro/exastro-it-automation-by-ansible-agent 
   * - ita-by-ansible-execute.extraEnv.ANSIBLE_AGENT_IMAGE_TAG
     - 
     - 不可
     - ○
     - 2.0.0 
   * - ita-by-ansible-execute.serviceAccount.create
     - 
     - 不可
     - ○
     - false 
   * - ita-by-ansible-execute.serviceAccount.name
     - 
     - 不可
     - ○
     - ita-by-ansible-execute-sa 