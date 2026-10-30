
.. list-table:: List of Values in ita-ag-oase
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - Parameters
     - Description
     - Change
     - Default Value / Available Options
   * - ita-ag-oase.agents.image.repository
     - Container Image Repository Name
     - Disabled
     - ``""``
   * - ita-ag-oase.agents.image.tag
     - Container Image Tag
     - Disabled
     - ``""``
   * - ita-ag-oase.agents.image.pullPolicy
     - Image Pull Policy
     - Enabled
     - | :program:`IfNotPresent` (Default): Pull only if the container image is not present
       | :program:`Always`: Always pull
       | :program:`None`: Do not pull
   * - ita-ag-oase.agents.extraEnv.TZ
     - Default Language Used by the OASE Agent System
     - Enabled
     - Asia/Tokyo
   * - ita-ag-oase.agents.extraEnv.DEFAULT_LANGUAGE
     - Language Used by the OASE Agent System
     - Enabled
     - ja
   * - ita-ag-oase.agents.extraEnv.LANGUAGE
     - OASE Agent Version
     - Enabled
     - en
   * - ita-ag-oase.agents.extraEnv.ITERATION
     - Number of retries before the OASE Agent initializes the settings (Maximum: 120, Minimum: 10)
     - Enabled
     - 500
   * - ita-ag-oase.agents.extraEnv.EXECUTE_INTERVAL
     - Interval (in seconds) for the OASE Agent (ita-ag-oase) to fetch events from the target (Minimum: 3 seconds)
     - Enabled
     - 10
   * - ita-ag-oase.agents.extraEnv.LOG_LEVEL
     - OASE Agent Log Level
     - Enabled
     - INFO
   * - ita-ag-oase.eagents.xtraEnv.AGENT_NAME
     - Name of the OASE Agent to be started
     - Enabled
     - oase-agent
   * - ita-ag-oase.agents.extraEnv.EXASTRO_URL
     - Exastro IT Automation Service URL
     - Enabled
     - http://platform-auth:8000
   * - ita-ag-oase.agents.extraEnv.EXASTRO_ORGANIZATION_ID
     - Organization ID created in Exastro IT Automation
     - Required
     - org001
   * - ita-ag-oase.agents.extraEnv.EXASTRO_WORKSPACE_ID
     - Workspace ID created in Exastro IT Automation
     - Required
     - ws01
   * - ita-ag-oase.agents.extraEnv.EVENT_COLLECTION_SETTINGS_NAMES
     - | Event Collection Setting Name created in OASE Management → Event Collection of Exastro IT Automation
       | Multiple entries can be specified, separated by commas
     - Required
     - id0001
   * - ita-ag-oase.agents.secret.EXASTRO_REFRESH_TOKEN
     - | Refresh token obtained from the Exastro system management screen
       | The user's role must have maintenance permissions for the OASE → Events → Event History menu.
     - Enabled
     - None
   * - ita-ag-oase.agents.secret.EXASTRO_USERNAME
     - | Username created in Exastro IT Automation
       | The user’s role must have permission to maintain the OASE → Events → Event History menu.
       | When not using EXASTRO_REFRESH_TOKEN (not recommended)
     - Enabled
     - admin
   * - ita-ag-oase.agents.secret.EXASTRO_PASSWORD
     - | Password created in Exastro IT Automation
       | If not using EXASTRO_REFRESH_TOKEN (not recommended)
     - Enabled
     - sample-password
   * - ita-ag-oase.agents.resources.requests.memory
     - Memory request
     - Enabled
     - "64Mi"
   * - ita-ag-oase.agents.resources.requests.cpu
     - CPU request
     - Enabled
     - "250m"
   * - ita-ag-oase.agents.resources.limits.memory
     - Memory limit
     - Enabled
     - "64Mi"
   * - ita-ag-oase.agents.resources.limits.cpu
     - CPU limit
     - Enabled
     - "250m"
   * - ita-ag-oase.nameOverride
     - | Exastro OASE Agent Definition Name
       | Required when deploying multiple agents within the same cluster
     - Enabled
     - ``""``
   * - ita-ag-oase.persistence.enabled
     - Deployment status of the OASE Agent container
     - Enabled
     - | :program:`true` (Default): Deploy the OASE Agent container.
       | :program:`false` : Do not deploy the OASE Agent container.
   * - ita-ag-oase.persistence.reinstall
     - Whether to initialize the data volume during reinstallation
     - Disabled
     - | :program:`true` : Initialize (delete) the data
       | :program:`false` (Default): Do not initialize (delete) the data
   * - ita-ag-oase.persistence.accessMode
     - Specify the access mode of the persistent volume.
     - Disabled
     - "ReadWriteMany"
   * - ita-ag-oase.persistence.size
     - Disk capacity of the persistent volume
     - Enabled (When data persistence is enabled)
     - "10Gi"
   * - ita-ag-oase.persistence.volumeType
     - Volume type of the persistent volume
     - Enabled (Currently disabled)
     - | :program:`hostPath` (Default): Store data on Kubernetes cluster nodes (deprecated)
       | :program:`AKS`: Use AKS storage class
   * - ita-ag-oase.persistence.storageClass
     - Specify the storage class to use for the persistent volume
     - Enabled (When data persistence is enabled)
     - | :program:`-` (Default): Do not specify a storage class.
       | :program:`storage class name`: Specify the storage class name provided by the cloud provider or similar.
   * - exastro-platform.mariadb.persistence.matchLabels.name
     - Specify the name of the persistent volume to use
     - Enabled(When data persistence is enabled)
     - ``""``
