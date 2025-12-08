
.. list-table:: Exastro OASE Database Configuration Parameters
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - Parameters
     - Description
     - Change
     - Default Value / Available Options
   * - global.mongoDefinition.config.MONGO_PROTOCOL
     - | Protocol used for the OASE database
     - Enabled
     - "http"
   * - global.mongoDefinition.config.MONGO_HOST
     - | Database used by OASE
       | By default, it specifies a container deployed within the same Kubernetes cluster.
       | If using an external database outside the cluster, configuration is required.
       | If automatic provisioning is not used, specify "" (an empty string).
     - Enabled (When using an external database outside the cluster)
     - "mongo"
   * - global.mongoDefinition.config.MONGO_PORT
     - TCP port number used by the OASE database
     - Enabled (When using an external database outside the cluster)
     - "27017"
   * - global.mongoDefinition.secret.MONGO_ADMIN_USER
     - Admin database username used by OASE
     - Required
     - Database username with administrative privileges
   * - global.mongoDefinition.secret.DB_ADMIN_PASSWORD
     - Plaintext password for the DB user with administrative privileges used by OASE
     - Required
     - Password for the database user with administrative privileges
