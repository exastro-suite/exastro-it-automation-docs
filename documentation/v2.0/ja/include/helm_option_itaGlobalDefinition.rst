
.. list-table:: 共通設定 (Exastro IT Automation) のオプションパラメータ
   :widths: 25 25 5 5 20
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 設定・変更
     - 必須
     - デフォルト値・選択可能な設定値

   * - global.itaGlobalDefinition.name
     - 
     - 不可
     - ○
     - ita-global 
   * - global.itaGlobalDefinition.enabled
     - 
     - 不可
     - ○
     - true 
   * - global.itaGlobalDefinition.image.registry
     - 
     - 不可
     - ○
     - docker.io 
   * - global.itaGlobalDefinition.image.organization
     - 
     - 不可
     - ○
     - exastro 
   * - global.itaGlobalDefinition.image.package
     - 
     - 不可
     - ○
     - exastro-it-automation 
   * - global.itaGlobalDefinition.config.DEFAULT_LANGUAGE
     - 
     - 不可
     - ○
     - ja 
   * - global.itaGlobalDefinition.config.LANGUAGE
     - 
     - 不可
     - ○
     - en 
   * - global.itaGlobalDefinition.config.CONTAINER_BASE
     - 
     - 不可
     - ○
     - kubernetes 
   * - global.itaGlobalDefinition.config.TZ
     - 
     - 不可
     - ○
     - Asia/Tokyo 
   * - global.itaGlobalDefinition.config.STORAGEPATH
     - 
     - 不可
     - ○
     - /storage/ 
   * - global.itaGlobalDefinition.persistence.enabled
     - 
     - 不可
     - ○
     - true 
   * - global.itaGlobalDefinition.persistence.accessMode
     - 
     - 不可
     - ○
     - ReadWriteMany 
   * - global.itaGlobalDefinition.persistence.size
     - 
     - 不可
     - ○
     - 10Gi 
   * - global.itaGlobalDefinition.persistence.volumeType
     - 
     - 不可
     - ○
     - hostPath 
   * - global.itaGlobalDefinition.persistence.storageClass
     - 
     - 不可
     - ○
     - - 
