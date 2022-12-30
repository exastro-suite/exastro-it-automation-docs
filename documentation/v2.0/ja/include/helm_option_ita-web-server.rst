
.. list-table:: ita-web-server における Values 一覧
   :widths: 25 25 5 5 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 設定・変更
     - 必須
     - デフォルト値・選択可能な設定値
   * - ita-web-server.replicaCount
     - 
     - 不可
     - ○
     - 1 
   * - ita-web-server.image.repository
     - 
     - 不可
     - ○
     - exastro/exastro-it-automation-web-server 
   * - ita-web-server.image.tag
     - 
     - 不可
     - ○
     - 2.0.1 
   * - ita-web-server.image.pullPolicy
     - 
     - 不可
     - ○
     - IfNotPresent