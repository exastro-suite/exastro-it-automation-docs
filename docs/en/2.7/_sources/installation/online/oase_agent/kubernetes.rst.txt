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

.. _oase_agent_kubernetes_install:

=================================
OASE Agent on Kubernetes - Online
=================================

Introduction
============
| This document aims to explain how to install the Exastro OASE Agent, which is used to link with external services when using OASE, on Kubernetes.

Features
========

| This document contains information on how to install Exastro OASE Agent with high availability and service level.
| For a more simple installation for testing and temporary usage, we recommend the :doc:`Docker Compose version of the OASE Agent <docker_compose>`.

Prerequisites
=============

- Exastro IT Automation

  | Both the Exastro OASE Agent and the Exastro IT Automation must be on the same version in order to operate the Exastro OASE Agent.

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
   :widths: 1, 1
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

- Communication Protocols

  - The user must be able to access the target fetch server from the OASE Agent.
  - The user must be able to connect to Docker Hub in order to acquire the container image from the container environment.

  .. warning::
    | If deploying to an environment constructed in :doc:`Helm chart (Kubernetes) version <../exastro/kubernetes>`, make sure that the environment has enough specs to meet additional minimum specs of the OASE Agent.

Preparation
==================

Register Helm repository
------------------------

| The Exastro OASE Agent exists on the same helm repository as the Exastro system.

- Exastro OASE Agent

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

   helm show values exastro/exastro-agent > exastro-agent.yaml

.. raw:: html

   <details>
     <summary>exastro-agent.yaml</summary>

.. code-block:: yaml
   :linenos:

   # Default values for exastro-agent.
   # This is a YAML-formatted file.
   # Declare variables to be passed into your templates.
   global:
     agentGlobalDefinition:
       name: agent-global
       enabled: true
       image:
         registry: "docker.io"
         organization: exastro
         package: exastro-it-automation

   ita-ag-oase:
     agents:
       - image:
           repository: ""
           # Overrides the image tag whose default is the chart appVersion.
           tag: ""
           pullPolicy: IfNotPresent
         extraEnv:
           TZ: Asia/Tokyo
           DEFAULT_LANGUAGE: ja
           LANGUAGE: "en"
           ITERATION: "500"
           EXECUTE_INTERVAL: "10"
           LOG_LEVEL: INFO
           AGENT_NAME: "oase-agent"
           EXASTRO_URL: "http://platform-auth:8000"
           EXASTRO_ORGANIZATION_ID: "org001"
           EXASTRO_WORKSPACE_ID: "ws01"
           # ROLES: "_ws_admin"
           EVENT_COLLECTION_SETTINGS_NAMES: "id0001"
         secret:
           EXASTRO_REFRESH_TOKEN: "exastro_refresh_token"
           # EXASTRO_USERNAME: "admin"
           # EXASTRO_PASSWORD: "sample-password"
         resources: {}
           # requests:
           #   memory: "64Mi"
           #   cpu: "250m"
           # limits:
           #   memory: "64Mi"
           #   cpu: "250m"

     imagePullSecrets: []
     nameOverride: ""
     fullnameOverride: ""

     initContainerImage:
       repository: "registry.access.redhat.com/ubi8/ubi-init"
       pullPolicy: IfNotPresent
       # Overrides the image tag whose default is the chart appVersion.
       tag: ""

     serviceAccount:
       # Specifies whether a service account should be created
       create: false
       # Annotations to add to the service account
       annotations: {}
       # The name of the service account to use.
       # If not set and create is true, a name is generated using the fullname template
       name: ""

     persistence:
       enabled: true
       reinstall: false
       accessMode: ReadWriteMany
       size: 10Gi
       volumeType: hostPath # e.g.) hostPath or AKS
       storageClass: "-" # e.g.) azurefile or - (None)
       # matchLabels:
       #   release: "stable"
       # matchExpressions:
       #   - {key: environment, operator: In, values: [dev]}
       mountPath:
         storage: /storage
         homeDir: /home/app_user
         pid:
           path: /var/run_app_user/httpd/pid
           subPath: httpd-pid
         socket:
           path: /var/run_app_user/httpd/socket
           subPath: httpd-socket
         tmp: /tmp

     podAnnotations: {}

     podSecurityContext: {}
       # fsGroup: 2000

     securityContext:
       allowPrivilegeEscalation: false
       readOnlyRootFilesystem: true
       runAsUser: 1000
       runAsGroup: 1000
       runAsNonRoot: true

     service: {}

     ingress:
       enabled: false
       className: ""
       annotations: {}
         # kubernetes.io/ingress.class: nginx
         # kubernetes.io/tls-acme: "true"
       hosts:
         - host: chart-example.local
           paths:
             - path: /
               pathType: ImplementationSpecific
       tls: []
     #  - secretName: chart-example-tls
       #    hosts:
       #      - chart-example.local

     nodeSelector: {}

     tolerations: []

     affinity: {}

.. raw:: html

   </details>


| The following steps will configure required parameters to :file:`exastro-agent.yaml`.

OASE Agent settings
-------------------

| OASE Agentを立ち上げる際の代表的な設定方法について紹介します。
| In the following example, the persistent volume is configured to hostPath.

- Simple architecture
- Multiple agents (Same Pod)
- Multiple agents (Different Pod)

Parameter
^^^^^^^^^^

| See the following in order to see the usable parameters.

.. include:: ../../../include/helm_option_ita-ag-oase.rst


OASE Agent parameter setting example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| The following is a sample of Agent settings.

.. tabs::

   .. group-tab:: Simple architecture

      - Features

      | Simple architecture with 1 container for 1 pod.


      - Setting example

      1.  OASE Agent settings

          | Configure the OASE Agent.

          .. code-block:: diff
           :caption: exastro-agent.yaml
           :linenos:
           :lineno-start: 13

           ita-ag-oase:
             agents:
               - image:
                   repository: ""
                   # Overrides the image tag whose default is the chart appVersion.
                   tag: "alpha.4ccca4.20240124-110529"
                   pullPolicy: IfNotPresent
                 extraEnv:
                   TZ: Asia/Tokyo
                   DEFAULT_LANGUAGE: ja
                   LANGUAGE: "en"
                   ITERATION: "500"
                   EXECUTE_INTERVAL: "10"
                   LOG_LEVEL: INFO
                   AGENT_NAME: "oase-agent"
           -       EXASTRO_URL: "http://platform-auth:8000"
           +       EXASTRO_URL: "http://your-exastro-url"                                   # Exastro IT Automation Service URL
           -       EXASTRO_ORGANIZATION_ID: "org001"
           +       EXASTRO_ORGANIZATION_ID: "your-organization-id"                          # Organization created in Exastro IT Automation
           -       EXASTRO_WORKSPACE_ID: "ws01"
           +       EXASTRO_WORKSPACE_ID: "your-workspace-id"                                # WorkspaceID created in Exastro IT Automation
                   # ROLES: "_ws_admin"
           -       EVENT_COLLECTION_SETTINGS_NAMES: "id0001"
           +       EVENT_COLLECTION_SETTINGS_NAMES: "your-event-collection-settigs-names"   # The Event collection setting name created in Exastro IT Automation's OASE Management event collection.
                 secret:
           -       EXASTRO_REFRESH_TOKEN: "exastro_refresh_token"
           +       EXASTRO_REFRESH_TOKEN: "your_exastro_refresh_token"                      # Refresh token fetched from the Exastro System management page.
                   # EXASTRO_USERNAME: "admin"
                   # EXASTRO_PASSWORD: "sample-password"
           +       # EXASTRO_USERNAME: "your-ita-user-name"                # Username created in Exastro IT Automation.(Remember to uncomment if using this)
           +       # EXASTRO_PASSWORD: "your-ita-user-password"            # Password created in Exastro IT Automation.(Remember to uncomment if using this)

   .. group-tab:: Multiple Agents (Same pod)

      - Features

      | Architecture where multiple containers are built on 1 Pod.
      | While multiple constructions can be done by increasing the following image, make sure to increase the amount of resources to compensate.


      - Setting example

      1.  OASE Agent settings

          | Configure OASE Agent

          .. code-block:: diff
           :caption: exastro-agent.yaml
           :linenos:
           :lineno-start: 13

           ita-ag-oase:
             agents:
               - image:
                   repository: ""
                   # Overrides the image tag whose default is the chart appVersion.
                   tag: "alpha.4ccca4.20240124-110529"
                   pullPolicy: IfNotPresent
                 extraEnv:
                   TZ: Asia/Tokyo
                   DEFAULT_LANGUAGE: ja
                   LANGUAGE: "en"
                   ITERATION: "500"
                   EXECUTE_INTERVAL: "10"
                   LOG_LEVEL: INFO
                   AGENT_NAME: "oase-agent"
           +       AGENT_NAME: "oase-agent-1"                                               # Name of the OASE Agent
           -       EXASTRO_URL: "http://platform-auth:8000"
           +       EXASTRO_URL: "http://your-exastro-url"                                   # Exastro IT Automation Service URL
           -       EXASTRO_ORGANIZATION_ID: "org001"
           +       EXASTRO_ORGANIZATION_ID: "your-organization-id"                          # Organization created in Exastro IT Automation
           -       EXASTRO_WORKSPACE_ID: "ws01"
           +       EXASTRO_WORKSPACE_ID: "your-workspace-id"                                # WorkspaceID created in Exastro IT Automation
                   # ROLES: "_ws_admin"
           -       EVENT_COLLECTION_SETTINGS_NAMES: "id0001"
           +       EVENT_COLLECTION_SETTINGS_NAMES: "your-event-collection-settigs-names"   # The Event collection setting name created in Exastro IT Automation's OASE Management event collection.
                 secret:
           -       EXASTRO_REFRESH_TOKEN: "exastro_refresh_token"
           +       EXASTRO_REFRESH_TOKEN: "your_exastro_refresh_token"                      # Refresh token fetched from the Exastro System management page.
                   # EXASTRO_USERNAME: "admin"
                   # EXASTRO_PASSWORD: "sample-password"
           +       # EXASTRO_USERNAME: "your-ita-user-name"                # Username created in Exastro IT Automation.(Remember to uncomment if using this)
           +       # EXASTRO_PASSWORD: "your-ita-user-password"            # Password created in Exastro IT Automation.(Remember to uncomment if using this)
           +   - image:
           +       repository: ""
           +       # Overrides the image tag whose default is the chart appVersion.
           +       tag: "alpha.4ccca4.20240124-110529"
           +       pullPolicy: IfNotPresent
           +     extraEnv:
           +       TZ: Asia/Tokyo
           +       DEFAULT_LANGUAGE: ja
           +       LANGUAGE: "en"
           +       ITERATION: "500"
           +       EXECUTE_INTERVAL: "10"
           +       LOG_LEVEL: INFO
           +       AGENT_NAME: "oase-agent-2"                                               # Name of the OASE Agent
           +       EXASTRO_URL: "http://your-exastro-url"                                   # Exastro IT Automation Service URL
           +       EXASTRO_ORGANIZATION_ID: "your-organization-id"                          # Organization created in Exastro IT Automation
           +       EXASTRO_WORKSPACE_ID: "your-workspace-id-2"                                # WorkspaceID created in Exastro IT Automation
           +       # ROLES: "_ws_admin"
           +       EVENT_COLLECTION_SETTINGS_NAMES: "your-event-collection-settigs-names-2"   # The Event collection setting name created in Exastro IT Automation's OASE Management event collection.
           +     secret:
           +       EXASTRO_REFRESH_TOKEN: "your_exastro_refresh_token"                      # Refresh token fetched from the Exastro System management page.
           +       EXASTRO_USERNAME: "your-ita-user-name"                                   # Username created in Exastro IT Automation.(Remember to uncomment if using this)
           +       EXASTRO_PASSWORD: "your-ita-user-password"                               # Password created in Exastro IT Automation.(Remember to uncomment if using this)


   .. group-tab:: Multiple Agents (Different Pod)

      - Features

      | Architecture built on multiple Pods.
      | While there are merits to being able to stop single agents,
      | The user must prepare persistent volumes for each Pod.

      - Setting example

      1.  Prepare Setting value file

          | Copy exastro-agent.yaml and prepare exastro-agent-1.yaml
          | Copy exastro-agent.yaml and prepare exastro-agent-2.yaml

      2.  First OASE Agent

          .. code-block:: diff
           :caption: exastro-agent-1.yaml
           :linenos:
           :lineno-start: 13

           ita-ag-oase:
             agents:
               - image:
                   repository: ""
                   # Overrides the image tag whose default is the chart appVersion.
                   tag: ""
                   pullPolicy: IfNotPresent
                 extraEnv:
                   TZ: Asia/Tokyo
                   DEFAULT_LANGUAGE: ja
                   LANGUAGE: "en"
                   ITERATION: "500"
                   EXECUTE_INTERVAL: "10"
                   LOG_LEVEL: INFO
                   AGENT_NAME: "oase-agent"
           -       EXASTRO_URL: "http://platform-auth:8000"
           +       EXASTRO_URL: "http://your-exastro-url"                                   # Exastro IT Automation Service URL
           -       EXASTRO_ORGANIZATION_ID: "org001"
           +       EXASTRO_ORGANIZATION_ID: "your-organization-id"                          # Organization created in Exastro IT Automation
           -       EXASTRO_WORKSPACE_ID: "ws01"
           +       EXASTRO_WORKSPACE_ID: "your-workspace-id"                                # WorkspaceID created in Exastro IT Automation
                   # ROLES: "_ws_admin"
           -       EVENT_COLLECTION_SETTINGS_NAMES: "id0001"
           +       EVENT_COLLECTION_SETTINGS_NAMES: "your-event-collection-settigs-names"   # The Event collection setting name created in Exastro IT Automation's OASE Management event collection.
                 secret:
           -       EXASTRO_REFRESH_TOKEN: "exastro_refresh_token"
           +       EXASTRO_REFRESH_TOKEN: "your_exastro_refresh_token"                      # Refresh token fetched from the Exastro System management page.
                   # EXASTRO_USERNAME: "admin"
                   # EXASTRO_PASSWORD: "sample-password"
           +       # EXASTRO_USERNAME: "your-ita-user-name"                # Username created in Exastro IT Automation.(Remember to uncomment if using this)
           +       # EXASTRO_PASSWORD: "your-ita-user-password"            # Password created in Exastro IT Automation.(Remember to uncomment if using this)

      3.  Configure First OASE Agent definition name

          .. code-block:: diff
           :caption: exastro-agent-1.yaml
           :linenos:
           :lineno-start: 45

             imagePullSecrets: []
           - nameOverride: ""
           + nameOverride: "ita-ag-oase-1"    # Exastro OASE Agent definition name
             fullnameOverride: ""

      4.  Configure first OASE Agent's matchLabels

          .. code-block:: diff
           :caption: exastro-agent-1.yaml
           :linenos:
           :lineno-start: 64

             persistence:
               enabled: true
               reinstall: false
               accessMode: ReadWriteMany
               size: 10Gi
               volumeType: hostPath # e.g.) hostPath or AKS
               storageClass: "-" # e.g.) azurefile or - (None)
           -   # matchLabels:
           -   #   release: "stable"
           +   matchLabels:
           +     release: "pv-ita-ag-oase-1"    # Specify the name of the presistent volume that will be used

      5. Configure Second OASE Agent definition name

          .. code-block:: diff
           :caption: exastro-agent-2.yaml
           :linenos:
           :lineno-start: 13

           ita-ag-oase:
             agents:
               - image:
                   repository: ""
                   # Overrides the image tag whose default is the chart appVersion.
                   tag: ""
                   pullPolicy: IfNotPresent
                 extraEnv:
                   TZ: Asia/Tokyo
                   DEFAULT_LANGUAGE: ja
                   LANGUAGE: "en"
                   ITERATION: "500"
                   EXECUTE_INTERVAL: "10"
                   LOG_LEVEL: INFO
                   AGENT_NAME: "oase-agent"
           -       EXASTRO_URL: "http://platform-auth:8000"
           +       EXASTRO_URL: "http://your-exastro-url"                                   # Exastro IT Automation Service URL
           -       EXASTRO_ORGANIZATION_ID: "org001"
           +       EXASTRO_ORGANIZATION_ID: "your-organization-id"                          # Organization created in Exastro IT Automation
           -       EXASTRO_WORKSPACE_ID: "ws01"
           +       EXASTRO_WORKSPACE_ID: "your-workspace-id-2"                                # WorkspaceID created in Exastro IT Automation
                   # ROLES: "_ws_admin"
           -       EVENT_COLLECTION_SETTINGS_NAMES: "id0001"
           +       EVENT_COLLECTION_SETTINGS_NAMES: "your-event-collection-settigs-names"   # The Event collection setting name created in Exastro IT Automation's OASE Management event collection.
                 secret:
           -       EXASTRO_REFRESH_TOKEN: "exastro_refresh_token"
           +       EXASTRO_REFRESH_TOKEN: "your_exastro_refresh_token"                      # Refresh token fetched from the Exastro System management page.
                   # EXASTRO_USERNAME: "admin"
                   # EXASTRO_PASSWORD: "sample-password"
           +       # EXASTRO_USERNAME: "your-ita-user-name"                # Username created in Exastro IT Automation.(Remember to uncomment if using this)
           +       # EXASTRO_PASSWORD: "your-ita-user-password"            # Password created in Exastro IT Automation.(Remember to uncomment if using this)

      6.  Configure Second OASE Agent definition name

          .. code-block:: diff
           :caption: exastro-agent-2.yaml
           :linenos:
           :lineno-start: 45

             imagePullSecrets: []
           - nameOverride: ""
           + nameOverride: "ita-ag-oase-2"    # Exastro OASE Agent definition name
             fullnameOverride: ""

      7.  Configure Second OASE Agent's matchLabels

          .. code-block:: diff
           :caption: exastro-agent-2.yaml
           :linenos:
           :lineno-start: 64

             persistence:
               enabled: true
               reinstall: false
               accessMode: ReadWriteMany
               size: 10Gi
               volumeType: hostPath # e.g.) hostPath or AKS
               storageClass: "-" # e.g.) azurefile or - (None)
           -   # matchLabels:
           -   #   release: "stable"
           +   matchLabels:
           +     release: "pv-ita-ag-oase-2"    # Specify the name of the presistent volume that will be used

.. _agent_persistent_volume:

Persistent volume settings
--------------------------

| In order to persist data in a database(if the container is within a cluster), or files, the user will need to configure a persistent volume.
| For more information regarding persistent volumes, see `Persistent volumes - Kubernetes <https://kubernetes.io/ja/docs/concepts/storage/persistent-volumes/#%E6%B0%B8%E7%B6%9A%E3%83%9C%E3%83%AA%E3%83%A5%E3%83%BC%E3%83%A0>`_ を参照してください。

.. tabs::

   .. group-tab:: Kubernetes Node directory

      - Features

      | This method uses storage on the Kubernetes node. There is no need to provide seperate storage, but we recommend that this method is only used for testing and developing.

      .. danger::
          | While persisting data is possible, data might be deleted if compute nodes are changed. We strongly recommend against using this method to persist data in production.
          | Note that if AKS clusters created with Azure are stopped, the AKS cluster's node will be released. This means that all saved information will be deleted.

      - Example

      | The example below uses hostPath.

      .. tabs::

         .. group-tab:: Simple architecture and Multiple Agents (Same Pod)

            .. code-block:: diff
              :caption: pv-ita-ag-oase.yaml
              :linenos:

              # pv-ita-ag-oase.yaml
              apiVersion: v1
              kind: PersistentVolume
              metadata:
                name: pv-ita-ag-oase
              spec:
                claimRef:
                  name: pvc-ita-ag-oase
                  namespace: exastro
                capacity:
                  storage: 10Gi
                accessModes:
                  - ReadWriteMany
                persistentVolumeReclaimPolicy: Retain
                hostPath:
                  path: /var/data/exastro-suite/exastro-agent/ita-ag-oase
                  type: DirectoryOrCreate


         .. group-tab:: Multiple Agents (Different Pod)

            .. code-block:: diff
              :caption: pv-ita-ag-oase-1.yaml
              :linenos:

              # pv-ita-ag-oase-1.yaml
              apiVersion: v1
              kind: PersistentVolume
              metadata:
                name: pv-ita-ag-oase-1
              spec:
                claimRef:
                  name: pvc-ita-ag-oase-1
                  namespace: exastro
                capacity:
                  storage: 10Gi
                accessModes:
                  - ReadWriteMany
                persistentVolumeReclaimPolicy: Retain
                hostPath:
                  path: /var/data/exastro-suite/exastro-agent/ita-ag-oase-1
                  type: DirectoryOrCreate

            .. code-block:: diff
              :caption: pv-ita-ag-oase-2.yaml
              :linenos:

              # pv-ita-ag-oase-2.yaml
              apiVersion: v1
              kind: PersistentVolume
              metadata:
                name: pv-ita-ag-oase-2
              spec:
                claimRef:
                  name: pvc-ita-ag-oase-2
                  namespace: exastro
                capacity:
                  storage: 10Gi
                accessModes:
                  - ReadWriteMany
                persistentVolumeReclaimPolicy: Retain
                hostPath:
                  path: /var/data/exastro-suite/exastro-agent/ita-ag-oase-2
                  type: DirectoryOrCreate

.. _Install2:

Install
============

.. note::
   | If the installation fails, follow :ref:`ita_uninstall` and try reinstalling.

Create Persistent volumes
-------------------------

| Apply the manifest file created in :ref:`agent_persistent_volume` and create persistent volume.

.. code-block:: bash

    # pv-ita-ag-oase.yaml
    kubectl apply -f pv-ita-ag-oase.yaml

    # Run the following for Multiple Agents (Different Pod)
    # pv-ita-ag-oase-1.yaml
    kubectl apply -f pv-ita-ag-oase-1.yaml

    # pv-ita-ag-oase-2.yaml
    kubectl apply -f pv-ita-ag-oase-2.yaml


.. code-block:: bash

    # Confirm
    kubectl get pv

.. code-block:: bash

    NAME              CAPACITY   ACCESS MODES   RECLAIM POLICY    STATUS      CLAIM     STORAGECLASS   REASON   AGE
    pv-ita-ag-oase     10Gi       RWX            Retain           Available                                     6s

.. code-block:: bash

    NAME              CAPACITY   ACCESS MODES   RECLAIM POLICY    STATUS      CLAIM     STORAGECLASS   REASON   AGE
    pv-ita-ag-oase-1   10Gi       RWX            Retain           Available                                     5s
    pv-ita-ag-oase-2   10Gi       RWX            Retain           Available                                     6s

Install
------------

| See the  `exastro-helm site <https://github.com/exastro-suite/exastro-helm>` for more information regarding the Helm and Application versions.

.. tabs::

   .. group-tab:: Simple architecture & Multiple Agent (Same Pod)

      1. Use Helm command to install on Kubernetes environment.

         .. code-block:: bash
            :caption: Command

            helm install exastro-agent exastro/exastro-agent \
              --namespace exastro --create-namespace \
              --values exastro-agent.yaml

         .. code-block:: bash
            :caption: Output results

            NAME: exastro-agent
            LAST DEPLOYED: Wed Feb 14 14:36:27 2024
            NAMESPACE: exastro
            STATUS: deployed
            REVISION: 1
            TEST SUITE: None

      2. Confirm Installation status

         .. code-block:: bash
             :caption: Command

             # Fetch Pod  list
             kubectl get po --namespace exastro

             | If running normally, the status will say "Running".
             | ※The user might have to wait a couple of minutes before the status changes to "Running".

         .. code-block:: bash
             :caption: Output results

              NAME                             READY   STATUS    RESTARTS   AGE
              ita-ag-oase-66cb7669c6-m2q8c     1/1     Running   0          16m

   .. group-tab:: Multiple Agents (Different Pod)

      1. Use Helm command to install on Kubernetes environment.

         .. code-block:: bash
            :caption: Command

            helm install exastro-agent-1 exastro/exastro-agent \
              --namespace exastro --create-namespace \
              --values exastro-agent-1.yaml

         .. code-block:: bash
            :caption: Output results

            NAME: exastro-agent-1
            LAST DEPLOYED: Wed Feb 14 14:36:27 2024
            NAMESPACE: exastro
            STATUS: deployed
            REVISION: 1
            TEST SUITE: None

         .. code-block:: bash
            :caption: Command

            helm install exastro-agent-2 exastro/exastro-agent \
              --namespace exastro --create-namespace \
              --values exastro-agent-2.yaml

         .. code-block:: bash
            :caption: Output results

            NAME: exastro-agent-2
            LAST DEPLOYED: Wed Feb 14 14:36:27 2024
            NAMESPACE: exastro
            STATUS: deployed
            REVISION: 1
            TEST SUITE: None

      2. | Check install status

         .. code-block:: bash
             :caption: Command

             # Pod の一覧を取得
             kubectl get po --namespace exastro

             | If running normally, the status will say "Running".
             | ※The user might have to wait a couple of minutes before the status changes to "Running".

         .. code-block:: bash
             :caption: Output results

              NAME                             READY   STATUS    RESTARTS   AGE
              ita-ag-oase-1-66cb7669c6-m2q8c   1/1     Running   0          16m
              ita-ag-oase-2-787fb97f75-9s7xj   1/1     Running   0          13m


Update
==============

| This section describes how to update the OASE Agent.


Update preparation
--------------------

.. warning::
  | We recommend that back up the data before updating.

| Check the version before updating.

.. code-block:: shell
   :linenos:
   :caption: Command

   # Check Repository information
   helm search repo exastro

.. code-block:: shell
   :linenos:
   :caption: Run results
   :emphasize-lines: 4

   helm search repo exastro
   NAME                            CHART VERSION   APP VERSION     DESCRIPTION
   exastro/exastro                         1.3.24          2.3.0           A Helm chart for Exastro. Exastro is an Open So...
   exastro/exastro-agent                   1.0.3           2.3.0           A Helm chart for Exastro IT Automation. Exastro...
   exastro/exastro-it-automation           1.4.22          2.3.0           A Helm chart for Exastro IT Automation. Exastro...
   exastro/exastro-platform                1.7.14          1.7.0           A Helm chart for Exastro Platform. Exastro Plat...

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
   :emphasize-lines: 4

   helm search repo exastro
   NAME                            CHART VERSION   APP VERSION     DESCRIPTION
   exastro/exastro                    1.4.3           2.4.0           A Helm chart for Exastro. Exastro is an Open So...
   exastro/exastro-agent              2.4.0           2.4.0           A Helm chart for Exastro IT Automation. Exastro...
   exastro/exastro-it-automation      2.4.1           2.4.0           A Helm chart for Exastro IT Automation. Exastro...
   exastro/exastro-platform           1.8.1           1.8.0           A Helm chart for Exastro Platform. Exastro Plat...

Update
--------------

Stop service
^^^^^^^^^^^^

.. include:: ../../../include/stop_service_k8s_agent.rst

Start Update
^^^^^^^^^^^^^^^^^^

| Start the update.

.. code-block:: bash
  :caption: Command

  helm upgrade exastro-agent exastro/exastro-agent \
    --namespace exastro \
    --values exastro-agent.yaml

.. code-block:: bash
  :caption: Output results

  Release "exastro-agent" has been upgraded. Happy Helming!
  NAME: exastro-agent
  LAST DEPLOYED: Mon Apr 22 14:42:59 2024
  NAMESPACE: exastro
  STATUS: deployed
  REVISION: 2
  TEST SUITE: None

Restart service
^^^^^^^^^^^^^^^

.. include:: ../../../include/start_service_k8s_agent.rst


Check Update status
^^^^^^^^^^^^^^^^^^^^^^

| Input the following commands from the command line and check that the agent has been updated.

.. code-block:: bash
   :caption: Command

   # Fetc Pod list
   kubectl get po --namespace exastro

| If running normally, the status will say "Running".
| ※The user might have to wait a couple of minutes before the status changes to "Running".

.. code-block:: bash
   :caption: Output results

   NAME                                                      READY   STATUS      RESTARTS   AGE
   ita-ag-oase-7ff9488b55-rrn58                              1/1     Running     0             81s

Uninstall
================

| This section explains how to uninstall the OASE Agent.

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

  helm uninstall exastro-agent --namespace exastro

.. code-block:: bash
  :caption: Output results

  release "exastro-agent" uninstalled

Delete persistent volumes
^^^^^^^^^^^^^^^^^^^^^^^^^^
| This section describes how to delete data if a persistent volume(PV) has been created on Kubernetes using hostPath.
| If using external databases (managed databases included), make sure to delete environmental data as well.

For Agents
**************

.. warning::
  | If there are multiple persistent volumes for Agents, make sure to delete them all.

.. code-block:: bash
  :caption: Command

  kubectl delete pv pv-ita-ag-oase

.. code-block:: bash
  :caption: Execution results

  persistentvolume "pv-ita-ag-oase" deleted

Deleting Persistent data
^^^^^^^^^^^^^^^^^^^^^^^^

| Log in to the Kubernetes Control node and delete the data.


For Agents
**************

| The following command is an example where the hostPath is specified to :file:`/var/data/exastro-suite/exastro-agent/ita-ag-oase` when the Persistent Volume was created.


.. code-block:: bash
   :caption: Command

   # Log in to control node that has persistent data
   ssh user@contol.node.example

   # Delete persistent data
   sudo rm -rf /var/data/exastro-suite/exastro-agent/ita-ag-oase

