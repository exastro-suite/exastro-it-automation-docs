
.. list-table:: ita-by-conductor-synchronize における Values 一覧
   :widths: 25 25 5 5 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 設定・変更
     - 必須
     - デフォルト値・選択可能な設定値
   * - ita-by-conductor-synchronize.replicaCount
     - 
     - 不可
     - ○
     - 1 
   * - ita-by-conductor-synchronize.extraEnv.EXECUTE_INTERVAL
     - 
     - 不可
     - ○
     - 10 
   * - ita-by-conductor-synchronize.image.repository
     - 
     - 不可
     - ○
     - exastro/exastro-it-automation-by-conductor-synchronize 
   * - ita-by-conductor-synchronize.image.tag
     - 
     - 不可
     - ○
     - 2.0.1 
   * - ita-by-conductor-synchronize.image.pullPolicy
     - 
     - 不可
     - ○
     - IfNotPresent 
