
.. list-table:: MongoDB container options parameters
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - Parameters
     - Description
     - Change
     - Default Value / Available Options
   * - exastro-platform.mongo.enabled
     - MongoDB Whether to deploy the container
     - Enabled
     - | :program:`true` (Default): Deploy the MongoDB container.
       | :program:`false` : Do not deploy the MongoDB container.
   * - exastro-platform.mongo.image.repository
     - Container image repository name
     - Disabled
     - "mongo"
   * - exastro-platform.mongo.image.pullPolicy
     -  Image Pull Policy
     - Enabled
     - | :program:`IfNotPresent` (Default): Pull the container image only if it is not already present (imagePullPolicy: IfNotPresent)
       | :program:`Always`: Always pull the container image
       | :program:`None`: Do not pull the container image
   * - exastro-platform.mongo.image.tag
     - Container image tag
     - Disabled
     - "6.0"
   * - exastro-platform.mongo.persistence.enabled
     - Flag to enable data persistence for the shared Exastro database
     - Enabled
     - | :program:`true` (Default): Persist data
       | :program:`false`: Do not persist data
   * - exastro-platform.mongo.persistence.reinstall
     - Whether to initialize the data volume upon reinstallation
     - Disabled
     - | :program:`true` : Initialize (the data volume)
       | :program:`false` (Default): Do not initialize (delete) data
   * - exastro-platform.mongo.persistence.accessMode
     - Specify the access mode for the persistent volume
     - Disabled
     - "ReadWriteOnce"
   * - exastro-platform.mongo.persistence.size
     - Disk capacity of the persistent volume
     - Enabled (During data persistence)
     - "20Gi"
   * - exastro-platform.mongo.persistence.storageClass
     - Specify the storage class to use for the persistent volume
     - Enabled (During data persistence)
     - | :program:`-` (Default): Do not specify a storage class
       | :program:`Storage class name`: Specify the storage class name provided by the cloud provider (or other infrastructure)
   * - exastro-platform.mongo.persistence.matchLabels.name
     - Specify the name of the persistent volume to use
     - Disabled
     - "comment out"
   * - exastro-platform.mongo.resources.requests.memory
     - Memory request
     - Enabled
     - "256Mi"
   * - exastro-platform.mongo.resources.requests.cpu
     - CPU request
     - Enabled
     - "1m"
   * - exastro-platform.mongo.resources.limits.memory
     - Memory upper limit
     - Enabled
     - "2Gi"
   * - exastro-platform.mongo.resources.limits.cpu
     - CPU upper limit
     - Enabled
     - "4"
