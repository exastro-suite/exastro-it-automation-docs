
.. list-table:: Probe Option Parameters for the Database Container
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - Parameters
     - Description
     - Change
     - Default Value / Available Options
   * - exastro-platform.mariadb.livenessProbe.exec.command
     - Command executed during livenessProbe
     - Disabled
     - healthcheck.sh --su-mysql --connect --innodb_initialized
   * - exastro-platform.mariadb.livenessProbe.initialDelaySeconds
     - Number of seconds to wait before the first livenessProbe is executed
     - Enabled
     - 30
   * - exastro-platform.mariadb.livenessProbe.periodSeconds
     - Interval (in seconds) between livenessProbe executions
     - Enabled
     - 10
   * - exastro-platform.mariadb.livenessProbe.timeoutSeconds
     - Number of seconds after which the liveness probe times out
     - Enabled
     - 3
   * - exastro-platform.mariadb.readinessProbe.exec.command
     - Command executed during readinessProbe
     - Disabled
     - healthcheck.sh --su-mysql --connect --innodb_initialized
   * - exastro-platform.mariadb.readinessProbe.initialDelaySeconds
     - Number of seconds to wait before the first readinessProbe is executed
     - Enabled
     - 30
   * - exastro-platform.mariadb.readinessProbe.periodSeconds
     - How often (in seconds) to perform the readiness probe
     - Enabled
     - 10
   * - exastro-platform.mariadb.readinessProbe.timeoutSeconds
     - Number of seconds after which the readiness probe times out
     - Enabled
     - 3
