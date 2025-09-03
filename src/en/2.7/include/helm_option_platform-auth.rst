
.. list-table:: Exastro Platform authentication optional settings
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - Parameters
     - Description
     - Change
     - Default Value / Available Options
   * - exastro-platform.platform-auth.extraEnv.EXTERNAL_URL
     - | Exastro Platform Endpoint's public URL
       | This setting must be configured when service connection failures occur due to discrepancies between the Exastro endpoint and the public URL caused by reverse proxies or PAT (Port Address Translation).
     - Enabled
     - | Public endpoint URL
       | (http[s]://your-exastro.domain:port)
   * - exastro-platform.platform-auth.extraEnv.EXTERNAL_URL_MNG
     - | Public URL of the Exastro Platform Management Console endpoint
       | This setting is required when a mismatch occurs between the Exastro endpoint and the public URL due to reverse proxies or PAT (Port Address Translation), which can lead to service connection failures.
     - Enabled
     - | Public endpoint URL
       | (http[s]://your-exastro.domain:port)
   * - exastro-platform.platform-auth.extraEnv.AUDIT_LOG_ENABLED
     - | Enable audit log output
     - Enabled
     - | :program:`True` (Default): Output
       | :program:`False`: Do not output
   * - exastro-platform.platform-auth.extraEnv.AUDIT_LOG_PATH
     - | Audit log file name (file path)
     - Enabled
     - | :program:`exastro-audit.log` (Default)
   * - exastro-platform.platform-auth.extraEnv.AUDIT_LOG_FILE_MAX_BYTE
     - | You can specify the maximum size (in bytes) of the audit log file.
     - Enabled
     - | :program:`100000000` (Default)
   * - exastro-platform.platform-auth.extraEnv.AUDIT_LOG_BACKUP_COUNT
     - | Number of backup audit log files
       | When the audit log file exceeds the specified maximum size (in bytes), backup files are created with the original file name appended by a '.' and a number, up to the specified backup count.
     - Enabled
     - | :program:`30` (Default)
   * - exastro-platform.platform-auth.ingress.enabled
     - Whether to use Ingress in the Exastro Platform
     - Enabled
     - | :program:`true` (Default): Deploy an Ingress Controller to enable access to the Exastro Platform.
       | :program:`false` : Do not deploy the Ingress Controller.
   * - exastro-platform.platform-auth.ingress.hosts[0].host
     - | Hostname or FQDN of the Exastro Platform Management Console endpoint
       | DNS record registration is required separately
     - Enabled (When using Ingress)
     - "exastro-suite.example.local"
   * - exastro-platform.platform-auth.ingress.hosts[0].paths[0].path
     - Rules for the Management Console endpoint path in Exastro Platform
     - Disabled
     - "/"
   * - exastro-platform.platform-auth.ingress.hosts[0].paths[0].pathType
     - Path match condition for the Exastro Platform Management Console endpoint
     - Disabled
     - "Prefix"
   * - exastro-platform.platform-auth.ingress.hosts[0].paths[0].backend
     - Exastro Platform Management Console service name
     - Disabled
     - "http"
   * - exastro-platform.platform-auth.ingress.hosts[1].host
     - | Exastro Platform endpoint hostname or FQDN
       | A DNS record must be registered separately
     - Enabled (When using Ingress)
     - "exastro-suite-mng.example.local"
   * - exastro-platform.platform-auth.ingress.hosts[1].paths[0].path
     - Endpoint path rules for Exastro Platform
     - Disabled
     - "/"
   * - exastro-platform.platform-auth.ingress.hosts[1].paths[0].pathType
     - Exastro Platform endpoint path match condition
     - Disabled
     - "Prefix"
   * - exastro-platform.platform-auth.ingress.hosts[1].paths[0].backend
     - Exastro Platform endpoint service name
     - Disabled
     - "httpMng"
   * - exastro-platform.platform-auth.ingress.tls[0].secretName
     - Name of the Kubernetes secret storing the SSL/TLS certificate for the public Exastro Platform endpoint
     - Enabled (When using Ingress)
     - Any string
   * - exastro-platform.platform-auth.ingress.tls[0].hosts
     - Hostname or FQDN for the Exastro Platform public endpoint using SSL/TLS
     - Enabled (When using Ingress)
     - Any string
   * - exastro-platform.platform-auth.ingress.secrets[0].name
     - Name of the Kubernetes secret that stores the SSL/TLS certificate for the Exastro Platform public endpoint
     - Enabled (When using Ingress)
     - Any string
   * - exastro-platform.platform-auth.ingress.secrets[0].certificate
     - Value of the certificate file used for the SSL/TLS certificate of the Exastro Platform public endpoint
     - Enabled (When using Ingress)
     - | Example of a certificate file value
       | -----BEGIN CERTIFICATE-----
       | ...
       | -----END CERTIFICATE-----
   * - exastro-platform.platform-auth.ingress.secrets[0].key
     - Value of the key file used for the SSL/TLS certificate of the Exastro Platform public endpoint
     - Enabled (When using Ingress)
     - | Example of a key file value
       | -----BEGIN PRIVATE KEY-----
       | ...
       | -----END PRIVATE KEY-----
   * - exastro-platform.platform-auth.service.type
     - Exastro Platform service type
     - Enabled
     - | :program:`ClusterIP` (Default): Select when using an Ingress Controller
       | :program:`LoadBalancer` : Select when using a LoadBalancer
       | :program:`NodePort` : Select when using NodePort
   * - exastro-platform.platform-auth.service.http.nodePort
     - | Service public port number for Exastro Platform
     - Enabled (When using  NodePort)
     - "30080"
   * - exastro-platform.platform-auth.service.httpMng.nodePort
     - | Exastro Platform system administration public port number
     - Enabled (When using NodePort)
     - "30081"
   * - exastro-platform.platform-auth.image.repository
     - "Container image repository name
     - Disabled
     - "docker.io/exastro/exastro-platform-auth"
   * - exastro-platform.platform-auth.image.tag
     - Container image tag
     - Disabled
     - `""`
