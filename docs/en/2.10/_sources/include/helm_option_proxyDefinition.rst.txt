.. warning::
     | Available with Exastro IT Automation version 2.4 or later and Exastro Platform version 1.8.1 or later.
     | This setting is required when using IdP integration in a proxy environment.
     | This setting does not apply to other features.

.. list-table:: Optional parameters for common settings (Proxy configuration)
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - Parameters
     - Description
     - Change
     - Default Value / Available Options
   * - | global.proxyDefinition.name
     - | Proxy definition name
     - Disabled
     - proxy-global
   * - | global.proxyDefinition.enabled
     - | Proxy definition usage
     - Enabled
     - false
   * - | global.proxyDefinition.config.HTTP_PROXY
     - | Proxy definition: HTTP_PROXY setting
     - Enabled
     - ``""``
   * - | global.proxyDefinition.config.HTTPS_PROXY
     - | Proxy definition: HTTP_PROXY setting
     - Enabled
     - ``""``
   * - | global.proxyDefinition.config.NO_PROXY
     - | Proxy definition: NO_PROXY setting
       | Only modify this if additional configuration is required.
     - Enabled
     - "127.0.0.1,localhost,platform-auth,platform-api,ita-api-admin,ita-api-organization,ita-api-oase-receiver"
