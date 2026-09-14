
.. list-table:: MongoDB Container Probe Configuration Options
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - Parameters
     - Description
     - Change
     - Default Value / Available Options
   * - exastro-platform.mariadb.livenessProbe.tcpSocket.port
     - Port number to access MongoDB
     - Disabled
     - port-mongo
   * - exastro-platform.mariadb.livenessProbe.initialDelaySeconds
     - Time to wait (in seconds) before executing the first liveness probe
     - Enabled
     - 5
   * - exastro-platform.mariadb.livenessProbe.periodSeconds
     - Probe interval for liveness checks (seconds)
     - Enabled
     - 10
   * - exastro-platform.mariadb.livenessProbe.timeoutSeconds
     - TimeoutSeconds for the liveness probe (seconds)
     - Enabled
     - 3
   * - exastro-platform.mariadb.readinessProbe.tcpSocket.port
     - Port number to access MongoDB
     - Disabled
     - port-mongo
   * - exastro-platform.mariadb.readinessProbe.initialDelaySeconds
     - Time (in seconds) to wait before executing the first readiness probe
     - Enabled
     - 5
   * - exastro-platform.mariadb.readinessProbe.periodSeconds
     - Readiness probe interval (seconds)
     - Enabled
     - 10
   * - exastro-platform.mariadb.readinessProbe.timeoutSeconds
     - Timeout for readiness probe (seconds)
     - Enabled
     - 3
