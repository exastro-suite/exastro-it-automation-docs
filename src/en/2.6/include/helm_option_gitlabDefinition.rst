
.. list-table:: Optional Parameters for Common Settings (GitLab)
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - Parameters
     - Description
     - Change
     - Default Value / Available Options
   * - global.gitlabDefinition.name
     - GitLab Definition Name
     - Disabled
     - gitlab
   * - global.gitlabDefinition.enabled
     - Enable or Disable GitLab Definition
     - Disabled
     - true
   * - global.gitlabDefinition.config.GITLAB_PROTOCOL
     - Protocol for GitLab Endpoint
     - Enabled
     - http
   * - global.gitlabDefinition.config.GITLAB_HOST
     - Hostname or FQDN for GitLab Endpoint
     - Enabled
     - gitlab
   * - global.gitlabDefinition.config.GITLAB_PORT
     - Port Number of GitLab Endpoint
     - Enabled
     - 80
   * - global.gitlabDefinition.secret.GITLAB_ROOT_PASSWORD
     - User Password for GitLab Root Privileged Account
     - Required
     - Any string (8 characters or more; predictable words are not allowed)
   * - global.gitlabDefinition.secret.GITLAB_ROOT_TOKEN
     - Access Token for GitLab Root Privileged Account
     - Required
     - Access Token (Plain Text)
