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

.. _oase_agent_docker compose install:

=====================================
OASE Agent on Docker Compose - Online
=====================================

Introduction
============

| This document aims to explain how to install the Exastro OASE Agent, which is used to link with external services when using OASE.

Features
========

| This document contains information on how to install the Exastro OASE Agent, which is required in order to use Exastro OASE.
| Users can easily boot the Exastro OASE Agent by using Docker Compose.

Pre-requisites
==============

- Exastro IT Automation

  | In order to operate the Exastro OASE Agent, both the Exastro OASE Agent and the Exastro IT Automation must be operating on the same version.

- Deploy environment

  | The following describes confirmed compatible container environments as well as their resources and versions.

  .. list-table:: Hardware requirements(Minimum)
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

- Confirmed compatible Operation systems

  The following describes confirmed compatible operation systems as well as their versions.

  .. list-table:: Operating systems
   :widths: 20, 20
   :header-rows: 1

   * - Type
     - Version
   * - Red Hat Enterprise Linux
     - Version	8
   * - AlmaLinux
     - Version	8
   * - Ubuntu
     - Version	22.04

- Confirmed compatible Operation systems and container platforms

  The following describes confirmed compatible operation systems as well as their versions.

  .. list-table:: Container Platforms
   :widths: 20, 10
   :header-rows: 1

   * - Software
     - Version
   * - Podman Engine ※When using Podman
     - Version	4.4
   * - Docker Compose ※When using Podman
     - Version	2.20
   * - Docker Engine ※When using Docker
     - Version	24


Application

  | The user must be able to run :command:`sudo` commands.

.. warning::
   | The Exastro OASE Agent process must be able to be run with normal user permissions (it is not possible to install with root user).
   | Any normal users must be sudoer and have complete permissions.


Install
============

Preparation
-----------

| First, the user must fetch the different structure files. In this section, we will fetch the file groups required to boot the agent, such as docker-compose.yml.

.. code-block:: shell

   git clone https://github.com/exastro-suite/exastro-docker-compose.git

| The following steps will be done in the exastro-docker-compose/ita_ag_oase directory.

.. code-block:: shell

   cd exastro-docker-compose/ita_ag_oase

| Make a environment setting file（.env） from the sample.

.. code-block:: shell
   :caption: Copied from sample （When using Docker）

   cp .env.docker.sample .env

.. code-block:: shell
   :caption: Copied from sample  （When using Podman）

   cp .env.podman.sample .env

| Refer to the parameter list and register an .env file.

.. code-block:: shell

   vi .env

Boot
----

| Use either docker or docker-compose command to boot the container.

.. code-block:: shell
   :caption: Using docker command(Docke environment)

   docker compose up -d --wait

.. code-block:: shell
   :caption: using docker-compose command(Podman environment)

   docker-compose up -d --wait

Parameter list
==============

.. list-table::
 :widths: 5, 7, 1, 5
 :header-rows: 1

 * - Parameter
   - Description
   - Changeable
   - Default value/Selectable setting value
 * - NETWORK_ID
   - Docker Network ID used by the OASE Agent
   - Yes
   - 20230101
 * - LOGGING_MAX_SIZE
   - Max file size for the container's log files.
   - Yes
   - 10m
 * - LOGGING_MAX_FILE
   - Maximum amount of generations for the container's log files.
   - Yes
   - 10
 * - TZ
   - The Time zone used by the OASGE Agent system.
   - Yes
   - Asia/Tokyo
 * - DEFAULT_LANGUAGE
   - Default language used by the OASE Agent System.
   - Yes
   - ja
 * - LANGUAGE
   - Language used by the OASE Agent System.
   - Yes
   - en
 * - ITA_VERSION
   - OASE Agent version
   - Yes
   - 2.3.0
 * - UID
   - OASE Agent execution user
   - Not required
   - 1000 (Default): Using Docker

     0: When using Podman
 * - HOST_DOCKER_GID
   - Docker group ID on the host
   - Not required
   - 999: Using Docker

     0: When using Podman
 * - AGENT_NAME
   - Name of the OASE Agent
   - Yes
   - ita-oase-agent-01
 * - EXASTRO_URL
   - Exastro IT Automation's Service URL
   - Yes
   - http://localhost:30080
 * - EXASTRO_ORGANIZATION_ID
   - OrganizationID created in Exastro IT Automation
   - Required
   - None
 * - EXASTRO_WORKSPACE_ID
   - WorkspaceID created in Exastro IT Automation
   - Required
   - None
 * - EXASTRO_REFRESH_TOKEN
   - | Refresh token fetched from the Exastro System management page※
     | ※The user's role must have edit permission for the OASE - Event - Event history menu.
   - Yes
   - None
 * - EXASTRO_USERNAME
   - | Username created in Exastro IT Automation
     | ※Refresh token fetched from the Exastro System management page.
     | ※If not using EXASTRO_REFRESH_TOKEN（Not recommended）
   - Yes
   - admin
 * - EXASTRO_PASSWORD
   - | Password created in Exastro IT Automation.
     | ※If not using EXASTRO_REFRESH_TOKEN（Not recommended）
   - Yes
   - Ch@ngeMe
 * - EVENT_COLLECTION_SETTINGS_NAMES
   - The Event collection setting name created in Exastro IT Automation's OASE Management event collection.
   - Required
   - None ※Multiple can be specified by dividing with commas.
 * - ITERATION
   - Number of process iterations before the OASE Agent settings resets.
   - Yes
   - 10（Max: 120, Min: 10）
 * - EXECUTE_INTERVAL
   - OASE Agent's data fetch process execution interval
   - Yes
   - 5（Min: 3）
 * - LOG_LEVEL
   - OASE Agent's log level
   - Yes
   - INFO


Update
==============

| This section explains how to update the Exastro OASE Agent.


Update preparation
--------------------

.. warning::
  | We highly recommend taking a backup before updating the system.
  | Backup target is :file:`~/exastro-docker-compose/ita_ag_oase/.volumes/`.

Update repository
^^^^^^^^^^^^^^^^^

| Update the exastro-docker-compose repository.

.. code-block:: shell
   :linenos:
   :caption: Command

   # Confirm exastro-docker-compose repository
   cd ~/exastro-docker-compose/ita_ag_oase
   git pull

Check the updated default setting values.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Check the updated default values.
| Compare the settings filed created when installing the system :file:`~/exastro-docker-compose/.env` and the settings file after the update.

.. code-block:: shell
   :caption: Command

   cd ~/exastro-docker-compose/ita_ag_oase

   # If the OS is AlmaLinux or Ubuntu
   diff .env .env.docker.sample
   # If the OS is Red Hat Enterprise Linux
   diff .env .env.podman.sample

Update setting values
^^^^^^^^^^^^^^^^^^^^^

| Use the comparison results to check if there are any added items that needs setting values added to. If there are none or the user does not need to change any values, proceed to the next step.

Update Execute
--------------

Update the system
^^^^^^^^^^^^^^^^^^

| Start the Update process.

.. code-block:: shell
   :caption: Command

   cd ~/exastro-docker-compose/ita_ag_oase

.. code-block:: shell
   :caption: For using docker command(Docker environment)

   docker compose up -d --wait

.. code-block:: shell
   :caption: For using docker-compose command(Podman environment)

   docker-compose up -d --wait


Uninstall
================

| This sections explains how to uninstall the Exastro OASE agent

Uninstallment preparation
-------------------------

.. warning::
  | We highly recommend taking a backup before uninstalling the system.
  | The backup target is :file:`~/exastro-docker-compose/ita_ag_oase/.volumes/`.

Uninstall Execute
-----------------

Start Uninstallment process
^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Start uninstalling


.. code-block:: shell
   :caption: Command

   cd ~/exastro-docker-compose/ita_ag_oase

.. code-block:: shell
   :caption: For using docker command(Docker environment)

   # For only deleting the Container
   docker compose down

   # For deleting the Container+ Container Image+ Volume
   docker compose down --rmi all --volumes

.. code-block:: shell
   :caption: For using docker-compose command(Podman environment)

   # For only deleting the Container
   docker-compose down

   # For deleting the Container+ Container Image+ Volume
   docker-compose down --rmi all --volumes

.. code-block:: bash
   :caption: Command

   # For deleting the data
   rm -rf ~/exastro-docker-compose/ita_ag_oase/.volumes/storage/*

