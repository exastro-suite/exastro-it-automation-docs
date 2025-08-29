.. raw:: html

   <script>
   $(window).on('load', function () {
      setTimeout(function(){
        for (var i = 0; i < $("table.filter-table").length; i++) {
          $("[id^='ft-data-" + i + "-2-r']").removeAttr("checked");
          $("[id^='select-all-" + i + "-2']").removeAttr("checked");
          $("[id^='ft-data-" + i + "-2-r'][value^='可']").prop('checked', true);
          $("[id^='ft-data-" + i + "-2-r'][value*='必須']").prop('checked', true);
          tFilterGo(i);
        }
      },200);
   });
   </script>

=================================
Helm chart (Kubernetes) - Online
=================================

Introduction
============

| This document aims to explain how to install Exastro Platform and/or Exastro IT Automation on Kubernetes.

Features
========

| This method allows the user to install Exastro IT Automation with the highest level of availability and service.
| For a more simple installation for testing and temporary usage, we recommend the :doc:`Docker Compose version<docker_compose>`.

Prerequisites
=============

- Client requirements

  | The following describes confirmed compatible client application as well as their versions.

  .. list-table:: Client requirements
   :widths: 20, 20
   :header-rows: 1

   * - Application
     - Version
   * - Helm
     - v3.9.x
   * - kubectl
     - 1.23

- Deploy environment

  | The following describes confirmed compatible operation systems as well as their versions.

  .. list-table:: Hardware requirements (minimum requirements)
   :widths: 20, 20
   :header-rows: 1

   * - Resource type
     - Required resource
   * - CPU
     - 2 Cores (3.0 GHz, x86_64)
   * - Memory
     - 4GB
   * - Storage (Container image size)
     - 10GB
   * - Kubernetes (Container image size)
     - 1.23 or later

  .. list-table:: Hardware requirements (Recommended requirements)
   :widths: 20, 20
   :header-rows: 1

   * - Resource type
     - Required resource
   * - CPU
     - 4 Cores (3.0 GHz, x86_64)
   * - Memory
     - 16GB
   * - Storage (Container image size)
     - 120GB
   * - Kubernetes (Container image size)
     - 1.23 or later

  .. warning::
    | The required resources for the minimum configuration are for Exastro IT Automation's core functions. Additional resources will be required if you are planning to deploy external systems, such as GitLab and Ansible Automation Platform.
    | Users will have to prepare an additional storage area if they wish to persist databases or files.
    | The storage space is only an estimate and varies based on the user's needs. Make sure to take that into account when securing storage space.

- Communication Protocols

  - The client must be able to access the deploying container environment.
  - The user will need 2 ports. One for the Platform administrator and one for normal users.
  - The user must be able to connect to Docker Hub in order to acquire the container image from the container environment.

- External components

  - MariaDB or MySQL server
  - Must be able to create Gitlab accounts and repositories.

  .. warning::
    | If the user is construcing the GitLab environment on the same cluster, the GitLab's minimum system requirements changes in order to support the additional load.
    | If the user is construcing the Database environment on the same cluster, the Database's minimum system requirements changes in order to support the additional load.


Preparation
==================

Register Helm repository
------------------------

| The Exastro system is constructed by the following 2 applications.
| All the Exastro tools exists on the same Helm repository.

- Shared Platform (Exastro Platform)
- Exastro IT Automation

.. csv-table::
 :header: Repository
 :widths: 50

 https://exastro-suite.github.io/exastro-helm/

.. code-block:: shell
   :linenos:
   :caption: Cmmand

   # Register Exastro system's Helm repository.
   helm repo add exastro https://exastro-suite.github.io/exastro-helm/ --namespace exastro
   # Update repository information
   helm repo update

Fetch default setting values
----------------------------

| The following command outputs the values.yaml default values. This makes it easier to manage the input parameters.

.. code-block:: shell
   :caption: Command

   helm show values exastro/exastro > exastro.yaml

.. raw:: html

   <details>
     <summary>exastro.yaml</summary>

.. literalinclude:: ../../literal_includes/exastro.yaml
   :caption: exastro.yaml
   :language: yaml
   :linenos:

.. raw:: html

   </details>

| In the next section, the manual will explain how to set the correct parameters to :file:`exastro.yaml` needed to install Exastro.

.. _service_setting:

Service publish settings
------------------------

| There are 3 main methods to publish Exastro.

- Ingress
- LoadBalancer
- NodePort

.. note::
  | There are different methods other than the ones introduced in this manual. We recommend that the users uses one that fits their environment.

Parameters
^^^^^^^^^^

| See the following for what parameters can be used.

.. include:: ../../../include/helm_option_platform-auth.rst

Setting example
^^^^^^^^^^^^^^^

| This sections displays examples of the settings for publishing the service.

.. tabs::

   .. group-tab:: Ingress

      .. _ingress_setting:

      - Features

      | The service can be published if Ingress Controller is usable through Public clouds or other means.
      | This method requires the user to construct a loadBalancer within the cluster and comes with benefits and merits if the user wants to be able to operate it themselves.

      - Setting example

      | The service is published using DNS by registering the Service domain information to Ingress.
      | For checking Domain names in Azure, see :doc:`../../../configuration/kubernetes/aks`.
      | Specify the :kbd:`annotations` required by the Cloud provider.
      | The following example uses AKS's Ingress Controller.


        .. literalinclude:: ../../literal_includes/exastro_ingress_setting.yaml
           :diff: ../../literal_includes/exastro.yaml
           :caption: exastro.yaml
           :language: yaml

        | ※ Make sure to configure max time-out time (seconds) for processes where large amount of files might be uploaded.

        .. code-block:: shell
           :caption: ingress - annotations

           nginx.ingress.kubernetes.io/proxy-read-timeout: "300"

        | ※ If HTTPS connectivity is activated while using Ingress, the following settings must be configured.

      .. code-block:: diff
         :caption: exastro.yaml

          platform-auth:
            extraEnv:
              # Please set the URL to access
           -      EXTERNAL_URL: "http://exastro-suite.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io"
           -      EXTERNAL_URL_MNG: "http://exastro-suite-mng.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io"
           +      EXTERNAL_URL: "https://exastro-suite.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io"
           +      EXTERNAL_URL_MNG: "https://exastro-suite-mng.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io"
                ingress:
                  enabled: true
                  annotations:
                    kubernetes.io/ingress.class: addon-http-application-routing
                    nginx.ingress.kubernetes.io/proxy-body-size: "0"
                    nginx.ingress.kubernetes.io/proxy-read-timeout: "300"
                    nginx.ingress.kubernetes.io/proxy-buffer-size: 256k
                    nginx.ingress.kubernetes.io/server-snippet: |
                      client_header_buffer_size 100k;
                      large_client_header_buffers 4 100k;
                  hosts:
                    - host: exastro-suite.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io
                      paths:
                        - path: /
                          pathType: Prefix
                          backend: "http"
                    - host: exastro-suite-mng.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io
                      paths:
                        - path: /
                          pathType: Prefix
                          backend: "httpMng"
           -      tls: []
           +      tls:
           +        - secretName: exastro-suite-tls
           +          hosts:
           +            - exastro-suite.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io
           +            - exastro-suite-mng.xxxxxxxxxxxxxxxxxx.japaneast.aksapp.io
           -      secrets: []
           +      secrets:
           +        - name: exastro-suite-tls
           +          certificate: |-
           +            -----BEGIN CERTIFICATE-----
           +            ...
           +            -----END CERTIFICATE-----
           +          key: |-
           +            -----BEGIN PRIVATE KEY-----
           +            ...
           +            -----END PRIVATE KEY-----

   .. group-tab:: LoadBalancer

      |

      - Features

      | The service can be published using LoadBalancer if it is usable through a public cloud or other means.
      | Different from using Ingress, the LoadBalancer is deployed externally from the cluster (often on the public cloud service). This means that the user don't have to operate it.

      - Setting example

      | The service is published using LoadBalancer by configuring :kbd:`LoadBalancer` to :kbd:`service.type`.
      | The following example uses LoadBalancer.

        .. literalinclude:: ../../literal_includes/exastro_loadbalancer_setting.yaml
           :diff: ../../literal_includes/exastro.yaml
           :caption: exastro.yaml
           :language: yaml

   .. group-tab:: NodePort

      |

      - Features

      | The service can be deployed using Nodeport if the user has prepared a LoadBalancer on their own environment or if the user is using a test environment.
      | Different from using Ingress and LoadBalancer, this publication method can be done natively on Kubernetes.

      - Setting example

      | The service can be published with Nodeport by setting :kbd:`NodePort` to :kbd:`service.type`.
      | The following example uses NodePort.

        .. literalinclude:: ../../literal_includes/exastro_nodeport_setting.yaml
           :diff: ../../literal_includes/exastro.yaml
           :caption: exastro.yaml
           :language: yaml

.. _DATABASE_SETUP:

Database link
----------------

| In order to use the Exastro service, the user will need a database for managing CMDB and Organizations.
| This document will describe 3 different setting methods when using databases.

- External database
- Database container

.. tabs::

   .. tab:: External database

      - Features

      | If the user is using external databases, make sure to follow the contents below when installing.

      | This uses a database external to the Kubernetes cluster.
      | As the database is not on the Kubernetes cluster, it will have to be managed seperately from the environment.

      .. warning::

        | If constructing multiple ITA environments, make sure to unify the "lower_case_table_names" settings.
        | ※If the settings are not unified, the "Menu export/import function might not work properly.

      - | Setting example

      | Configure the required connection information in order to operate the external database.

      .. warning::
        | The DB management user specified with :command:`DB_ADMIN_USER` and :command:`MONGO_ADMIN_USER` must have permission to create databases and users.

      .. warning::
        | Authorization information can be all plaintext(Base64 encoding not required).

      .. warning::
         | All certification information can be written in plaintext (no need for base64 encoding).

      1. | Exastro IT Automation database settings

          | Configure the database's connection information.

         .. include:: ../../../include/helm_option_itaDatabaseDefinition.rst

         .. literalinclude:: ../../literal_includes/exastro_ita_database.yaml
            :diff: ../../literal_includes/exastro.yaml
            :caption: exastro.yaml
            :language: yaml

      2. | Exastro platform database settings

          | Configure database's connection information.

         .. include:: ../../../include/helm_option_pfDatabaseDefinition.rst

         .. literalinclude:: ../../literal_includes/exastro_pf_database.yaml
            :diff: ../../literal_includes/exastro.yaml
            :caption: exastro.yaml
            :language: yaml

      3.  OASE database settings

          | Configure OASE database's connection information (Not required if not using OASE).

          .. warning::
             | If using MongoDB user and databases through "Automatic payout, make sure to specify :command:`MONGO_HOST`.
             | The :command:`MONGO_ADMIN_USER` must have permission to create and delete users and databases (root or role with same permissions).
             | If the user doesnt have said permissions, the user must soecify "Python connection string".
             | If the user is not using Automatic payout, :command:`MONGO_HOST` does not need to be specified.

          .. include:: ../../../include/helm_option_mongoDefinition.rst

          .. literalinclude:: ../../literal_includes/exastro_mongo_database.yaml
             :diff: ../../literal_includes/exastro.yaml
             :caption: exastro.yaml
             :language: yaml

      4.  Deactivating database containers

          | Configure the database container so it does not start.

          .. include:: ../../../include/helm_option_databaseDefinition.rst

          .. literalinclude:: ../../literal_includes/exastro_database_disabled.yaml
             :diff: ../../literal_includes/exastro.yaml
             :caption: exastro.yaml
             :language: yaml

          | Configure the MongoDB database container so it does not start.(Not required if not using OASE)

          .. include:: ../../../include/helm_option_mongo.rst

          .. literalinclude:: ../../literal_includes/exastro_mongodb_disabled.yaml
             :diff: ../../literal_includes/exastro.yaml
             :caption: exastro.yaml
             :language: yaml

   .. tab:: Database container

      - | Features

      | This method uses the Database container deployed within the Kubernetes cluster.
      | This database container can be managed as a container on the same Exastro and Kubernetes cluster.

      - | Setting example

      | Create a password for the database container's root and configure the root account password to the database so it can be accessed from other containers.
      | Then specify the using storage so the data can be persisted.

      .. warning::
        | The DB management user specified with :command:`DB_ADMIN_USER` and :command:`MONGO_ADMIN_USER` must have permission to create databases and users.

      .. warning::
        | Authorization information can be all plaintext(Base64 encoding not required).

      .. _configuration_database_container:

      1. | Configure Database container

          | Configure password for the Database container's root.
          | Then specify the using storage so the data can be persisted.

          .. include:: ../../../include/helm_option_databaseDefinition.rst

          .. tabs::

            .. tab:: Using Storage Class

              .. literalinclude:: ../../literal_includes/exastro_database_storage_class.yaml
                 :diff: ../../literal_includes/exastro.yaml
                 :caption: exastro.yaml
                 :language: yaml

            .. tab:: Using hostPath

              .. literalinclude:: ../../literal_includes/exastro_database_hostpath.yaml
                 :diff: ../../literal_includes/exastro.yaml
                 :caption: exastro.yaml
                 :language: yaml


      2.  | Configure Exastro IT Automation database

          | Configure the root acount password created in the :ref:`DATABASE_SETUP` section in order to make the database accessible from the Exastro IT Automation container.

          .. include:: ../../../include/helm_option_itaDatabaseDefinition.rst

          .. literalinclude:: ../../literal_includes/exastro_database_ita_setting.yaml
             :diff: ../../literal_includes/exastro.yaml
             :caption: exastro.yaml
             :language: yaml

      3.  | Configure Exastro platform database

          | Configure the root account password created in "1. Configure Database container" in order to make the database accessible from the Exastro Platform container.

          .. include:: ../../../include/helm_option_pfDatabaseDefinition.rst

          .. literalinclude:: ../../literal_includes/exastro_database_pf_setting.yaml
             :diff: ../../literal_includes/exastro.yaml
             :caption: exastro.yaml
             :language: yaml

      4.  Configure OASE database

          | Configure connection information to the OASE database.

          .. warning::
             | If using MongoDB user and databases through "Automatic payout, make sure to specify :command:`MONGO_HOST`.
             | The :command:`MONGO_ADMIN_USER` must have permission to create and delete users and databases (root or role with same permissions).
             | If the user doesnt have said permissions, the user must soecify "Python connection string".
             | If the user is not using Automatic payout, :command:`MONGO_HOST` does not need to be specified.

          .. include:: ../../../include/helm_option_mongoDefinition.rst

          .. literalinclude:: ../../literal_includes/exastro_database_mongo_setting.yaml
             :diff: ../../literal_includes/exastro.yaml
             :caption: exastro.yaml
             :language: yaml

      5.  Configure MongoDB container.

          | Specify storage for persisting database data.

          .. warning::
             | If the user is not using MongoDB container, make sure to set :command:`exastro-platform.mongo.enabled` to false.

          .. include:: ../../../include/helm_option_mongo.rst

          .. tabs::

            .. tab:: Using hostPath

               .. literalinclude:: ../../literal_includes/exastro_mongodb_hostpath.yaml
                  :diff: ../../literal_includes/exastro.yaml
                  :caption: exastro.yaml
                  :language: yaml

      6.  Configure Database container's Probe.

          | The database container or MongoDB container's LivenessProbe and ReadinessProbe has the following values applied by default.

          .. tabs::

            .. tab:: Database container

                .. include:: ../../../include/helm_option_database_probe.rst

            .. tab:: MongoDB container

                .. include:: ../../../include/helm_option_mongodb_probe.rst

          | In order to change setting values for the database container or MongoDB container's LivenessProbe and ReadinessProbe, add the parameters as seen below.

          .. literalinclude:: ../../literal_includes/exastro_database_probe_setting.yaml
             :diff: ../../literal_includes/exastro.yaml
             :caption: exastro.yaml
             :language: yaml

          .. | In order to deactivate the Database or MongoDB container probes, do as seen below.

          .. .. literalinclude:: ../../literal_includes/exastro_database_probe_invalid_setting.yaml
          ..    :diff: ../../literal_includes/exastro.yaml
          ..    :caption: exastro.yaml
          ..    :language: yaml

          .. .. tip::
          ..    | Installing while the Probe settings are deactivated, a warning message will be displayed while installing. This message can be discarded.

          ..    .. code-block:: shell
          ..       :caption: Message

          ..       warning: cannot overwrite table with non table for exastro.exastro-platform.mariadb.livenessProbe
          ..       warning: cannot overwrite table with non table for exastro.exastro-platform.mariadb.readinessProbe


.. _installation_kubernetes_Keycloak settings:

App DB user settings
--------------------------------

| Configure DB users in for applications in Exastro.

Setting example
^^^^^^^^^^^^^^^

| Configure DB users for each of the following.

- Exastro IT Automation
- Exastro platform
- Keycloak

.. warning::
  | Authorization information can be all plaintext(Base64 encoding not required).

1.  Configure Exastro IT Automation database

    | Configure DB user that will be used and created by applications.

   .. include:: ../../../include/helm_option_itaDatabaseDefinition.rst

   .. literalinclude:: ../../literal_includes/exastro_db_user_ita.yaml
      :diff: ../../literal_includes/exastro.yaml
      :caption: exastro.yaml
      :language: yaml


2.  Configure Keycloak database

    | Configure DB user that will be used and created by applications.

   .. include:: ../../../include/helm_option_keycloakDefinition.rst

   .. literalinclude:: ../../literal_includes/exastro_db_user_keycloak.yaml
      :diff: ../../literal_includes/exastro.yaml
      :caption: exastro.yaml
      :language: yaml


3.  Configure Exastro platform database

    | Configure DB user that will be used and created by applications.

   .. include:: ../../../include/helm_option_pfDatabaseDefinition.rst

   .. literalinclude:: ../../literal_includes/exastro_db_user_pf.yaml
      :diff: ../../literal_includes/exastro.yaml
      :caption: exastro.yaml
      :language: yaml

.. _installation_kubernetes_gitlablinkage:

GitLab link settings
--------------------

| Configure connection information in order to link with GitLab.

- External Gitlab
- GitLab container

.. include:: ../../../include/helm_option_gitlabDefinition.rst


.. warning::

  | The GITLAB_ROOT_TOKEN needs a token that contains permissions for the following:
  | ・api
  | ・write_repository
  | ・sudo

| The following is an example of GitLab link configurations.

.. literalinclude:: ../../literal_includes/exastro_gitlab_setting.yaml
   :diff: ../../literal_includes/exastro.yaml
   :caption: exastro.yaml
   :language: yaml

.. _installation_kubernetes_proxy_settings:

Proxy settings
--------------

| Configure the following information when running Exastro under a Proxy environment.

.. include:: ../../../include/helm_option_proxyDefinition.rst

.. _create_system_manager:

Create Exastro system admin
----------------------------

| Configure the infomation that will be used to create the Exastro system admin when setting up Keycloak.

.. include:: ../../../include/helm_option_keycloakDefinition.rst

.. literalinclude:: ../../literal_includes/exastro_usercreate_system_manager.yaml
   :diff: ../../literal_includes/exastro.yaml
   :caption: exastro.yaml
   :language: yaml

.. _persistent_volume:

Configure Persistent volume
---------------------------

| In order to persist databases( for container within clusters) and files, the user will have to configure a persistent volume.
| For more information regarding persistent volumes, see `Persistent Volumes - Kubernetes <https://kubernetes.io/docs/concepts/storage/persistent-volumes/>`_.

| This document describes 2 persisting methods for the following:

.. note::
    | If outputting monitoring logs to a persistent volume, a persistent volume must be configured.


- Managed disk
- Kubernetes note directory

.. tabs::

   .. tab:: Managed disk

      |

      - Features

      | Storage construction and maintenance is not required if the user is using a storage service provided by a public cloud.

      - Setting example

      | If the user is using storage from Azure, the user can persist data by defining StorageClass as shown below.
      | For more information, see  `Storage options for applications in Azure Kubernetes Service (AKS) <https://learn.microsoft.com/en-us/azure/aks/concepts-storage#storage-classes>`_.

        .. literalinclude:: ../../literal_includes/storage-class-exastro-suite.yaml

        :caption: storage-class-exastro-suite.yaml
        :linenos:

      .. code-block:: diff
        :caption: exastro.yaml

          itaGlobalDefinition:
            persistence:
              enabled: true
              accessMode: ReadWriteMany
              size: 10Gi
              volumeType: hostPath # e.g.) hostPath or AKS
        -      storageClass: "-" # e.g.) azurefile or - (None)
        +      storageClass: "azurefile" # e.g.) azurefile or - (None)

      | ※ The following has been configured in :ref:`DATABASE_SETUP`.

        .. code-block:: diff
           :caption: exastro.yaml

             databaseDefinition:
               persistence:
                 enabled: true
                 reinstall: false
                 accessMode: ReadWriteOnce
                 size: 20Gi
                 volumeType: hostPath # e.g.) hostPath or AKS
           -      storageClass: "-" # e.g.) azurefile or - (None)
           +      storageClass: "exastro-suite-azurefile-csi-nfs" # e.g.) azurefile or - (None)

        | ※ Configure the following in order to output monitoring logs to a persistent volume.

        .. code-block:: diff
           :caption: exastro.yaml

             pfAuditLogDefinition:
               name: pf-auditlog
               persistence:
           -      enabled: false
           +      enabled: true
                 reinstall: false
                 accessMode: ReadWriteMany
                 size: 10Gi
                 volumeType: hostPath # e.g.) hostPath or AKS
           -      storageClass: "-" # e.g.) azurefile or - (None)
           +      storageClass: "exastro-suite-azurefile-csi-nfs" # e.g.) azurefile or - (None)

   .. tab:: Kubernetes node directory

      - Features

      | This method uses storage on the Kubernetes node. There is no need to provide seperate storage, but we recommend that this method is only used for testing and developing.

      .. tip::
          | The user must have permission to access the directory specified with hostpath must.
          | Example) chmod 777 [corresponding directory]

      .. danger::
          | While persisting data is possible, data might be deleted if compute nodes are changed. We strongly recommend against using this method to persist data in production.
          | Note that if AKS clusters created with Azure are stopped, the AKS cluster's node will be released. This means that all saved information will be deleted.

      - Example

      | The example below uses hostPath.

        .. literalinclude:: ../../literal_includes/pv-database.yaml
           :caption: pv-database.yaml (Database volume)
           :linenos:

        .. literalinclude:: ../../literal_includes/pv-ita-common.yaml
           :caption: pv-ita-common.yaml (File volume)
           :linenos:

        .. literalinclude:: ../../literal_includes/pv-mongo.yaml
           :caption: pv-mongo.yaml (OASE volume) ※Not required if not using OASE
           :linenos:

        .. literalinclude:: ../../literal_includes/pv-gitlab.yaml
            :caption: pv-gitlab.yaml (GitLab volume) ※Not required if using external GitLab
            :linenos:

        | ※ Configure the following for outputting the monitoring log to persistent volumes.

        .. code-block:: diff
           :caption: exastro.yaml

             pfAuditLogDefinition:
               name: pf-auditlog
               persistence:
           -      enabled: false
           +      enabled: true
                 reinstall: false
                 accessMode: ReadWriteMany
                 size: 10Gi
                 volumeType: hostPath # e.g.) hostPath or AKS
                 storageClass: "-" # e.g.) azurefile or - (None)

        .. literalinclude:: ../../literal_includes/pv-pf-auditlog.yaml
           :caption: pv-pf-auditlog.yaml (Volume for monitoring log file)
           :linenos:


.. _Install1:

Install
============

.. note::
   | If the installation fails, follow :ref:`ita_uninstall` and try reinstalling.

Create Persistent volumes
-------------------------

| Apply the manifest file created in :ref:`persistent_volume` and create persistent volume.

.. code-block:: bash

    # pv-database.yaml
    kubectl apply -f pv-database.yaml

    # pv-ita-common.yaml
    kubectl apply -f pv-ita-common.yaml

    # pv-mongo.yaml ※Not required if not using OASE
    kubectl apply -f pv-mongo.yaml

    # pv-gitlab.yaml ※Not required if using external GitLab
    kubectl apply -f pv-gitlab.yaml

    # pv-pf-auditlog.yaml ※Not required 監査ログを永続ボリュームに出力しない場合は設定不要
    kubectl apply -f pv-pf-auditlog.yaml


.. code-block:: bash

    # 確認
    kubectl get pv

.. code-block:: bash

    NAME            CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM                                  STORAGECLASS   REASON   AGE
    pv-database     20Gi       RWO            Retain           Available                                                                  6s
    pv-gitlab       20Gi       RWX            Retain           Available                                                                  5s
    pv-ita-common   10Gi       RWX            Retain           Available                                                                  6s
    pv-mongo        20Gi       RWO            Retain           Available   exastro/volume-mongo-storage-mongo-0                           5s

.. _ita_install:

Install
------------

| See the  `exastro-helm site <https://github.com/exastro-suite/exastro-helm>` for more information regarding the Helm and Application versions.

.. include:: ../../../include/helm_versions.rst

| The access method changes depending on which publication method was used during installation.
| This section describes the methods for Ingress, LoadBalancer and NodePort.

.. tabs::

   .. group-tab:: Ingress

      | Follow the steps below and start installing.

      1. Use Helm command to install on Kubernetes environment.

         .. code-block:: bash
            :caption: Command

            helm upgrade exastro exastro/exastro --install \
              --namespace exastro --create-namespace \
              --values exastro.yaml

         .. code-block:: bash
            :caption: Output results

            NAME: exastro
            LAST DEPLOYED: Sat Jan 28 15:00:02 2023
            NAMESPACE: exastro
            STATUS: deployed
            REVISION: 1
            TEST SUITE: None
            NOTES:
            Exastro install completion!

            1. Execute the following command and wait until the pod becomes "Running" or "Completed":

              # NOTE: You can also append "-w" to the command or wait until the state changes with "watch command"

              kubectl get pods --namespace exastro

            2. Get the ENCRYPT_KEY by running these commands:

              # Exastro IT Automation ENCRYPT_KEY
              kubectl get secret ita-secret-ita-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

              # Exastro Platform ENCRYPT_KEY
              kubectl get secret platform-secret-pf-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

              !!! Please save the output ENCRYPT_KEY carefully. !!!

            3. Run the following command to get the application URL and go to the URL or go to the displayed URL:
              *************************
              * Service Console       *
              *************************
              http://exastro-suite.example.local/

              *************************
              * Administrator Console *
              *************************
              http://exastro-suite-mng.example.local/auth/


            # Note: You can display this note again by executing the following command.

         | Use the output results from the last step for the following steps.

      2. | Check install status

         .. include:: ../../../include/check_installation_status.rst

      3. Backup encrypt key

         .. include:: ../../../include/backup_encrypt_key_k8s.rst

      4. Check connection

         | Follow the output results and access the :menuselection:`Administrator Console` URL.
         | The following is an example. Please change the host name with the one set in :ref:`service_setting`.

         .. code-block:: bash
            :caption: Output results(Example)

            *************************
            * Service Console       *
            *************************
            http://exastro-suite.example.local/

            *************************
            * Administrator Console *
            *************************
            http://exastro-suite-mng.example.local/auth/

         .. list-table:: Connection check URL
            :widths: 20 40
            :header-rows: 0
            :align: left

            * - Managment console
              - http://exastro-suite-mng.example.local/auth/

   .. group-tab:: LoadBalancer

      | Follow the steps below and start installing.

      1. Use Helm command to install on Kubernetes environment.

         .. code-block:: bash
            :caption: Command

            helm upgrade exastro exastro/exastro --install \
              --namespace exastro --create-namespace \
              --values exastro.yaml

         .. code-block:: bash
            :caption: Output results(Example)

            NAME: exastro
            LAST DEPLOYED: Sat Jan 28 15:00:02 2023
            NAMESPACE: exastro
            STATUS: deployed
            REVISION: 1
            TEST SUITE: None
            NOTES:
            Exastro install completion!

            1. Execute the following command and wait until the pod becomes "Running" or "Completed":

              # NOTE: You can also append "-w" to the command or wait until the state changes with "watch command"

              kubectl get pods --namespace exastro

            2. Get the ENCRYPT_KEY by running these commands:

              # Exastro IT Automation ENCRYPT_KEY
              kubectl get secret ita-secret-ita-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

              # Exastro Platform ENCRYPT_KEY
              kubectl get secret platform-secret-pf-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

              !!! Please save the output ENCRYPT_KEY carefully. !!!

            3. Run the following command to get the application URL and go to the URL or go to the displayed URL:
              # NOTE: It may take a few minutes for the LoadBalancer IP to be available.
              #       You can watch the status of by running 'kubectl get --namespace exastro svc -w platform-auth'

              export NODE_SVC_PORT=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.spec.ports[0].nodePort}")
              export NODE_MGT_PORT=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.spec.ports[1].nodePort}")
              export NODE_IP=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.status.loadBalancer.ingress[0].ip}")
              # *************************
              # * Administrator Console *
              # *************************
              echo http://$NODE_IP:$NODE_MGT_PORT/auth/

              # *************************
              # * Service Console       *
              # *************************
              echo http://$NODE_IP:$NODE_SVC_PORT

            # Note: You can display this note again by executing the following command.

         | Follow the output results for the following steps.

      2. | Check installation

         .. include:: ../../../include/check_installation_status.rst

      3. Backup encrypt key

         .. include:: ../../../include/backup_encrypt_key_k8s.rst

      4. Check connection

         | Copy and paste the commands output from step 1.:command:`helm install` to the console and run them.

         .. code-block:: bash
            :caption: Command

            # Running the commands from the helm install results
            export NODE_SVC_PORT=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.spec.ports[0].nodePort}")
            export NODE_MGT_PORT=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.spec.ports[1].nodePort}")
            export NODE_IP=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.status.loadBalancer.ingress[0].ip}")
            # *************************
            # * Administrator Console *
            # *************************
            echo http://$NODE_IP:$NODE_MGT_PORT/auth/

            # *********************
            # * Service Console       *
            # *************************
            echo http://$NODE_IP:$NODE_SVC_PORT

         | Follow the output results and access the URL to :menuselection:`Administrator Console`.
         | The following is an example. Please change the following with the data from the commands results.

         .. code-block:: bash
            :caption: Output results(Example)

            *************************
            * Administrator Console *
            *************************
            http://172.16.20.XXX:32031/auth/

            *************************
            * Service Console       *
            *************************
            http://172.16.20.XXX:31798

         .. list-table:: Connection check URL
            :widths: 20 40
            :header-rows: 0
            :align: left

            * - Managment console
              - http://172.16.20.xxx:32031/auth/

   .. group-tab:: NodePort

      | Follow the steps below to start installing.

      1. Use Helm command to install on Kubernetes environment.

         .. code-block:: bash
            :caption: Command

            helm upgrade exastro exastro/exastro --install \
              --namespace exastro --create-namespace \
              --values exastro.yaml

         .. code-block:: bash
            :caption: Output results

            NAME: exastro
            LAST DEPLOYED: Sun Jan 29 12:18:02 2023
            NAMESPACE: exastro
            STATUS: deployed
            REVISION: 1
            TEST SUITE: None
            NOTES:
            Exastro install completion!

            1. Execute the following command and wait until the pod becomes "Running" or "Completed":

              # NOTE: You can also append "-w" to the command or wait until the state changes with "watch command"

              kubectl get pods --namespace exastro

            2. Get the ENCRYPT_KEY by running these commands:

              # Exastro IT Automation ENCRYPT_KEY
              kubectl get secret ita-secret-ita-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

              # Exastro Platform ENCRYPT_KEY
              kubectl get secret platform-secret-pf-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

              !!! Please save the output ENCRYPT_KEY carefully. !!!

            3. Run the following command to get the application URL and go to the URL or go to the displayed URL:


              export NODE_SVC_PORT=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.spec.ports[0].nodePort}")
              export NODE_MGT_PORT=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.spec.ports[1].nodePort}")
              export NODE_IP=$(kubectl get nodes --namespace exastro -o jsonpath="{.items[0].status.addresses[0].address}")
              # *************************
              # * Administrator Console *
              # *************************
              echo http://$NODE_IP:$NODE_MGT_PORT/auth/

              # *************************
              # * Service Console       *
              # *************************
              echo http://$NODE_IP:$NODE_SVC_PORT

            # Note: You can display this note again by executing the following command.

         | Follow the output results for the following steps.

      2. | Check install status

         .. include:: ../../../include/check_installation_status.rst

      3. Backup encrypt key

         .. include:: ../../../include/backup_encrypt_key_k8s.rst

      4. Check connection

         | 1. Copy and paste the commands output from step 1.:command:`helm install` to the console and run them.

         .. code-block:: bash
            :caption: Command

            export NODE_SVC_PORT=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.spec.ports[0].nodePort}")
            export NODE_MGT_PORT=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.spec.ports[1].nodePort}")
            export NODE_IP=$(kubectl get nodes --namespace exastro -o jsonpath="{.items[0].status.addresses[0].address}")
            # *************************
            # * Administrator Console *
            # *************************
            echo http://$NODE_IP:$NODE_MGT_PORT/auth/

            # *************************
            # * Service Console       *
            # *************************
            echo http://$NODE_IP:$NODE_SVC_PORT

         | Follow the output results and access the URL to :menuselection:`Administrator Console`.
         | The following is an example. Please change the following with the data from the commands results.

         .. code-block:: bash
            :caption: Output results(Example)

            *************************
            * Administrator Console *
            *************************
            http://172.16.20.xxx:30081/auth/

            *************************
            * Service Console       *
            *************************
            http://172.16.20.xxx:30080


         .. list-table:: Connection check URL
            :widths: 20 40
            :header-rows: 0
            :align: left

            * - Managment console
              - http://172.16.20.xxx:30081/auth/

Log in to Managment console
---------------------------

| If the page belows is displayed, select :menuselection:`Administration Console` and log in.

.. figure:: /images/ja/manuals/platform/keycloak/administrator-console.png
  :alt: administrator-console
  :width: 600px
  :name: Management console

| The Login ID and password are the :kbd:`KEYCLOAK_USER` and :kbd:`KEYCLOAK_PASSWORD` registered in :ref:`create_system_manager`.

.. figure:: /images/ja/manuals/platform/login/exastro-login.png
  :alt: login
  :width: 300px
  :name: Login page

| Open the Keycloak managment page.

.. figure:: /images/ja/manuals/platform/keycloak/keycloak-home.png
  :alt: login
  :width: 600px
  :name: Keycloak management page


Update
==============

| This section describes how to update the Exastro system.


Update preparation
--------------------

.. warning::
  | We recommend that back up the data before updating.

Update Helm repository
^^^^^^^^^^^^^^^^^^^^^^

| Update the Exastro system's Helm repository.

| Check the version before updating.

.. code-block:: shell
   :linenos:
   :caption: Command

   # Check Repository information
   helm search repo exastro

.. code-block:: shell
   :linenos:
   :caption: Run results
   :emphasize-lines: 3

   helm search repo exastro
   NAME                            CHART VERSION   APP VERSION     DESCRIPTION
   exastro/exastro                 1.0.0           2.0.3           A Helm chart for Exastro. Exastro is an Open So...
   exastro/exastro-it-automation   1.2.0           2.0.3           A Helm chart for Exastro IT Automation. Exastro...
   exastro/exastro-platform        1.5.0           1.4.0           A Helm chart for Exastro Platform. Exastro Plat...

| Update the Helm repository.

.. code-block:: shell
   :linenos:
   :caption: Command

   # Update Repository information
   helm repo update

| Check that it has been updated to the latest version.

.. code-block:: shell
   :linenos:
   :caption: Command

   # Check Repository information
   helm search repo exastro

.. code-block:: shell
   :linenos:
   :caption: Run results
   :emphasize-lines: 3

   helm search repo exastro
   NAME                            CHART VERSION   APP VERSION     DESCRIPTION
   exastro/exastro                 1.0.1           2.1.0           A Helm chart for Exastro. Exastro is an Open So...
   exastro/exastro-it-automation   1.2.0           2.0.3           A Helm chart for Exastro IT Automation. Exastro...
   exastro/exastro-platform        1.5.0           1.4.0           A Helm chart for Exastro Platform. Exastro Plat...


Check default setting values and update data
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Check the updated default values.
| Compare the :file:`exastro.yaml` file pre and post update.

.. code-block:: shell
   :caption: Command

   diff -u exastro.yaml <(helm show values exastro/exastro)


.. code-block:: diff
   :caption: Run results

   exastro-platform:
     platform-api:
       image:
         repository: "exastro/exastro-platform-api"
          tag: ""

     platform-auth:
   +    extraEnv:
   +      # Please set the URL to access
   +      EXTERNAL_URL: ""
   +      EXTERNAL_URL_MNG: ""
       ingress:
         enabled: true
         hosts:
           - host: exastro-suite.example.local
             paths:

Update setting values
^^^^^^^^^^^^^^^^^^^^^
.. warning::
  | Both the username and password must be the same as before updating the system.

| After comparing the default setting values, add any desired items and setting values before updating.
| If no setting value update is needed, skip this step.
| E.g. In the example below, :kbd:`exastro-platform.platform-auth.extraEnv` is added, meaning that the corresponding setting items and values in :file:`exastro.yaml` must be added.


.. code-block:: diff
   :caption: Run results

   exastro-platform:
     platform-api:
       image:
         repository: "exastro/exastro-platform-api"
          tag: ""

     platform-auth:
   +    extraEnv:
   +      # Please set the URL to access
   +      EXTERNAL_URL: ""
   +      EXTERNAL_URL_MNG: ""
       ingress:
         enabled: true
         hosts:
           - host: exastro-suite.example.local
             paths:

.. _change_encrypt_key:

Specify Encryption key
^^^^^^^^^^^^^^^^^^^^^^

| Specify the encryption key backed up.

.. literalinclude:: ../../literal_includes/update_exastro.yaml
   :diff: ../../literal_includes/exastro.yaml
   :caption: exastro.yaml
   :language: yaml

.. _ita_upgrade:

Update
--------------

.. warning::
  | If updating from version 2.2.1 or before to 2.3.0 or later, the user must perform :ref:`ita_uninstall`'s :ref:`delete_pv` and then re-run :ref:`ita_install`.

.. danger::
  | Do not run :ref:`delete_data`.
  | Deleting persistent data will delete all data before the update.

Stop service
^^^^^^^^^^^^

.. include:: ../../../include/stop_service_k8s.rst

Start Update
^^^^^^^^^^^^^^^^^^

| Start the update.

.. code-block:: bash
  :caption: Command

  helm upgrade exastro exastro/exastro --install \
    --namespace exastro --create-namespace \
    --values exastro.yaml

.. code-block:: bash
  :caption: Output results

  NAME: exastro
  LAST DEPLOYED: Sat Jan 28 15:00:02 2023
  NAMESPACE: exastro
  STATUS: deployed
  REVISION: 2
  TEST SUITE: None
  NOTES:
  Exastro install completion!

  1. Execute the following command and wait until the pod becomes "Running" or "Completed":

    # NOTE: You can also append "-w" to the command or wait until the state changes with "watch command"

    kubectl get pods --namespace exastro

  2. Get the ENCRYPT_KEY by running these commands:

    # Exastro IT Automation ENCRYPT_KEY
    kubectl get secret ita-secret-ita-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

    # Exastro Platform ENCRYPT_KEY
    kubectl get secret platform-secret-pf-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

    !!! Please save the output ENCRYPT_KEY carefully. !!!

  3. Run the following command to get the application URL and go to the URL or go to the displayed URL:
    *************************
    * Service Console       *
    *************************
    http://exastro-suite.example.local/

    *************************
    * Administrator Console *
    *************************
    http://exastro-suite-mng.example.local/auth/


    # Note: You can display this note again by executing the following command.


Restart service
^^^^^^^^^^^^^^^

※ The replicas specified in :file:`exastro.yaml` will be re-started. There is therefore no need to restart them manually.

Move on to :ref:`helm_on_kubernetes_upgrade_status`.


.. include:: ../../../include/start_service_k8s.rst

.. _helm_on_kubernetes_upgrade_status:

Confirm Update status.
^^^^^^^^^^^^^^^^^^^^^^

.. include:: ../../../include/check_installation_status.rst


.. _ita_uninstall:

Uninstall
================

| This section explains how to uninstall Exastro.

Uninstall preparation
----------------------

.. warning::
  | We recommend that back up the data before uninstalling.

Uninstall
----------------

Start Uninstall
^^^^^^^^^^^^^^^^^^^^

| Start the uninstall process.

.. code-block:: bash
  :caption: Command

  helm uninstall exastro --namespace exastro

.. code-block:: bash
  :caption: Output results

  release "exastro" uninstalled

.. _delete_pv:

Delete persistent volumes
^^^^^^^^^^^^^^^^^^^^^^^^^^
| This section describes how to delete data if a persistent volume(PV) has been created on Kubernetes using hostPath.
| If using external databases (managed databases included), make sure to delete environmental data as well.

For Databases
**************

.. code-block:: bash
  :caption: Command

  kubectl delete pv pv-database

.. code-block:: bash
  :caption: Execution results

  persistentvolume "pv-database" deleted


For Files
**********

.. code-block:: bash
  :caption: Command

  kubectl delete pv pv-ita-common

.. code-block:: bash
  :caption: Execution results

  persistentvolume "pv-ita-common" deleted

For OASE
********

.. code-block:: bash
  :caption: Command

  kubectl delete pv pv-mongo

.. code-block:: bash
  :caption: Execution results

  persistentvolume "pv-mongo" deleted

.. code-block:: bash
  :caption: Command

  kubectl delete pvc volume-mongo-storage-mongo-0 --namespace exastro

.. code-block:: bash
  :caption: Execution results

  persistentvolumeclaim "volume-mongo-storage-mongo-0" deleted

For GitLab
**********

.. code-block:: bash
  :caption: Command

  kubectl delete pv pv-gitlab

.. code-block:: bash
  :caption: Execution results

  persistentvolume "pv-gitlab" deleted

For Monitoring log files
************************

.. code-block:: bash
  :caption: Command

  kubectl delete pv pv-auditlog

.. code-block:: bash
  :caption: Execution results

  persistentvolume "pv-auditlog" deleted

.. _delete_data:

Deleting Persistent data
^^^^^^^^^^^^^^^^^^^^^^^^

| Log in to the Kubernetes Control node and delete the data.


For Databases
**************

| The following command is an example where the hostPath is specified to :file:`/var/data/exastro-suite/exastro-platform/database` when the Persistent Volume was created.


.. code-block:: bash
   :caption: Command

   # Log in to control node that has persistent data
   ssh user@contol.node.example

   # Delete persistent data
   sudo rm -rf /var/data/exastro-suite/exastro-platform/database


For Files
^^^^^^^^^^^^^^^^^^^^

| The following command is an example where the hostPath is specified to :file:`/var/data/exastro-suite/exastro-it-automation/ita-common` when the Persistent Volume was created.

.. code-block:: bash
   :caption: Command

   # Log in to control node that has persistent data
   ssh user@contol.node.example

   # Delete persistent data
   sudo rm -rf /var/data/exastro-suite/exastro-it-automation/ita-common

For OASE
********

| The following command is an example where the hostPath is specified to  :file:`/var/data/exastro-suite/exastro-platform/mongo` when the Persistent Volume was created.

.. code-block:: bash
   :caption: Command

   # Log in to control node that has persistent data
   ssh user@contol.node.example

   # Delete persistent data
   sudo rm -rf /var/data/exastro-suite/exastro-platform/mongo

For GitLab
**********

| The following command is an example where the hostPath is specified to  :file:`/var/data/exastro-suite/exastro-platform/gitlab` when the Persistent Volume was created.

.. code-block:: bash
   :caption: Command

   # Log in to control node that has persistent data
   ssh user@contol.node.example

   # Delete persistent data
   sudo rm -rf /var/data/exastro-suite/exastro-platform/gitlab


For Monitoring log files
************************

| The following command is an example where the hostPath is specified to  :file:`/var/log/exastro` when the Persistent Volume was created.

.. code-block:: bash
   :caption: Command

   # Log in to control node that has persistent data
   ssh user@contol.node.example

   # Delete persistent data
   sudo rm -rf /var/log/exastro
