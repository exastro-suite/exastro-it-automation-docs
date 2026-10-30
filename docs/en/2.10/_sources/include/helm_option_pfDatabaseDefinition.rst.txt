
.. list-table:: Database Configuration Options for Exastro Common Platform
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - Parameters
     - Description
     - Change
     - Default Value / Available Options
   * - global.pfDatabaseDefinition.name
     - Definition name for the authentication functionality database
     - Disabled
     - "pf-database"
   * - global.pfDatabaseDefinition.enabled
     - Flag to enable or disable the authentication database definition
     - Disabled
     - true
   * - global.pfDatabaseDefinition.config.DB_VENDOR
     - Database engine used by the authentication functionality database
     - Enabled (When using an external database outside the cluster)
     - | :program:`"mariadb"` (Default): Use MariaDB
       | :program:`"mysql"`: Use MySQL
   * - global.pfDatabaseDefinition.config.DB_HOST
     - | Database engine used by the authentication functionality database
       | By default, it specifies a container deployed within the same Kubernetes cluster.
       | If using an external database outside the cluster, configuration is required.
     - Enabled (When using an external database outside the cluster)
     - "mariadb"
   * - global.pfDatabaseDefinition.config.DB_PORT
     - TCP port number used by the authentication functionality database
     - Enabled (When using an external database outside the cluster)
     - "3306"
   * - global.pfDatabaseDefinition.config.DB_DATABASE
     - Database name used by the authentication functionality database
     - Enabled (When using an external database outside the cluster)
     - "platform"
   * - global.pfDatabaseDefinition.secret.DB_ADMIN_USER
     - Database username with administrative privileges used by the authentication functionality
     - Required
     - Database username with administrative privileges
   * - global.pfDatabaseDefinition.secret.DB_ADMIN_PASSWORD
     - Plaintext password for the database user with administrative privileges used by the authentication functionality database
     - Required
     - Password for the database user with administrative privileges
   * - global.pfDatabaseDefinition.secret.DB_USER
     - | Database username to be created for the authentication function
       | The specified DB user will be created.
     - Required
     - Any string
   * - global.pfDatabaseDefinition.secret.DB_PASSWORD
     - Password for the database user to be created for the authentication function (without encoding)
     - Required
     - Any string
