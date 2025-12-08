
.. list-table:: Optional Parameters for Common Settings (Exastro IT Automation Database)
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - Parameters
     - Description
     - Change
     - Default Value / Available Options
   * - global.itaDatabaseDefinition.name
     - Definition Name for Exastro IT Automation Database
     - Disabled
     - "ita-database"
   * - global.itaDatabaseDefinition.enabled
     - Enable or Disable the Definition for the Exastro IT Automation Database
     - Disabled
     - true
   * - global.itaDatabaseDefinition.config.DB_VENDOR
     - Database Used by Exastro IT Automation Database
     - Enabled (When Using an External Database)
     - | :program:`"mariadb"` (Default): Use MariaDB
       | :program:`"mysql"`: Use MySQL
   * - global.itaDatabaseDefinition.config.DB_HOST
     - | Database to Be Used for Exastro IT Automation
       | By default, the containers deployed within the same Kubernetes cluster are specified.
       | If you use a database outside the cluster, configuration is required.
     - Enabled (When Using an External Database)
     - "mariadb"
   * - global.itaDatabaseDefinition.config.DB_PORT
     - TCP Port Number Used for the Exastro IT Automation Database
     - Enabled (When Using an External Database)
     - "3306"
   * - global.itaDatabaseDefinition.config.DB_DATABASE
     - Database Name Used for the Exastro IT Automation Database
     - Enabled (When Using an External Database)
     - "platform"
   * - global.itaDatabaseDefinition.secret.DB_ADMIN_USER
     - Database Username with Administrative Privileges for Exastro IT Automation Database
     - Required
     - Database Username with Administrative Privileges
   * - global.itaDatabaseDefinition.secret.DB_ADMIN_PASSWORD
     - Password (Unencoded) for Database User with Administrative Privileges Used by Exastro IT Automation
     - Required
     - Password for the Database User with Administrative Privileges
   * - global.itaDatabaseDefinition.secret.DB_USER
     - | Database Username to Be Created for the Exastro IT Automation Database
       | The specified database user will be created.
     - Required
     - Arbitrary string
   * - global.itaDatabaseDefinition.secret.DB_PASSWORD
     - Password (Unencoded) for Database User to Be Created for Exastro IT Automation Database
     - Required
     - Arbitrary string
