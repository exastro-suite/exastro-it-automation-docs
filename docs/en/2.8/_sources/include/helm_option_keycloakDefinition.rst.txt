
.. list-table:: Common Settings (Optional Parameters)
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - Parameters
     - Description
     - Change
     - Default Value / Available Options
   * - global.keycloakDefinition.name
     - Keycloak Alias
     - Disabled
     - keycloak
   * - global.keycloakDefinition.enabled
     - Keycloak Definition
     - Disabled
     - true
   * - global.keycloakDefinition.config.API_KEYCLOAK_PROTOCOL
     - Keycloak API Endpoint Protocol
     - Disabled
     - "http”
   * - global.keycloakDefinition.config.API_KEYCLOAK_HOST
     - Keycloak API Endpoint Host Name or FQDN
     - Disabled
     - "keycloak"
   * - global.keycloakDefinition.config.API_KEYCLOAK_PORT
     - Keycloak API Endpoint Port Number
     - Disabled
     - "8080"
   * - global.keycloakDefinition.config.KEYCLOAK_PROTOCOL
     - Keycloak Endpoint Protocol
     - Disabled
     - "http"
   * - global.keycloakDefinition.config.KEYCLOAK_HOST
     - Keycloak Endpoint Host Name or FQDN
     - Disabled
     - "keycloak"
   * - global.keycloakDefinition.config.KEYCLOAK_PORT
     - Keycloak API Endpoint Port Number
     - Disabled
     - "8080"
   * - global.keycloakDefinition.config.KEYCLOAK_MASTER_REALM
     - Keycloak Master Realm Name
     - Disabled
     - "master"
   * - global.keycloakDefinition.config.KEYCLOAK_DB_DATABASE
     - Keycloak Database Name
     - Disabled
     - "keycloak"
   * - global.keycloakDefinition.secret.SYSTEM_ADMIN
     - | Specify the username with administrative privileges in the Keycloak master realm.
       | The specified Keycloak user will be created.
       | Change From KEYCLOAK_USER to SYSTEM_ADMIN
     - Required
     - Any string
   * - global.keycloakDefinition.secret.SYSTEM_ADMIN_PASSWORD
     - | Password to be set for the user with administrative privileges in the Keycloak master realm (not encoded).
       | Change From KEYCLOAK_PASSWORD to SYSTEM_ADMIN_PASSWORD
     - Required
     - Any string
   * - global.keycloakDefinition.secret.KEYCLOAK_DB_USER
     - | The database user used by Keycloak.
       | The specified database user will be created.
     - Required
     - Any string
   * - global.keycloakDefinition.secret.KEYCLOAK_DB_PASSWORD
     - Plaintext password for the database user used by Keycloak
     - Required
     - Any string
