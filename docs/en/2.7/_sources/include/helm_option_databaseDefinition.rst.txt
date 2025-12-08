
.. list-table:: Optional Parameters for Common Settings (Exastro Shared Database)
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - Parameters
     - Description
     - Change
     - Default Value / Available Options
   * - global.databaseDefinition.name
     - Definition Name of the Exastro Shared Database
     - Disabled
     - "mariadb"
   * - global.databaseDefinition.enabled
     - Enablement of the Exastro Shared Database Definition
     - Disabled
     - true
   * - global.databaseDefinition.secret.MARIADB_ROOT_PASSWORD
     - Password to set for the root account of the Exastro Shared Database (plain text)
     - Required
     - Arbitrary string
   * - global.databaseDefinition.persistence.enabled
     - Enable flag for data persistence of the Exastro Shared Database
     - Enabled
     - | :program:`"true"` (Default): Persist the data
       | :program:`"false"`: Do not persist the data
   * - global.databaseDefinition.persistence.reinstall
     - Whether to initialize the data area during reinstallation
     - Enabled (When data is persisted)
     - | :program:`"true"` (Default): Initialize (delete) the data
       | :program:`"false"`: Do not initialize (delete) the data
   * - global.databaseDefinition.persistence.accessMode
     - Specify the access mode for the persistent volume
     - Disabled
     - "ReadWriteOnce"
   * - global.databaseDefinition.persistence.size
     - Disk size of the persistent volume
     - Enabled (When data persistence is enabled)
     - "20Gi"
   * - global.databaseDefinition.persistence.volumeType
     - Volume type of the persistent volume
     - Enabled (Currently disabled)
     - | :program:`"hostPath"` (Default): Store data on Kubernetes cluster nodes (not recommended)
       | :program:`"AKS"`: Use the storage class provided by AKS
   * - global.databaseDefinition.persistence.storageClass
     - Specify the storage class to use for the persistent volume
     - Enabled (When data persistence is enabled)
     - | :program:`"-"` (Default): Do not specify a storage class.
       | :program:`Storage Class Name`: Specify the name of the storage class provided by the cloud provider.
