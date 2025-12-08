.. _ansible_execution_agent:

================================
Ansible Execution Agent - Online
================================

.. _ansible_execution_agent_purpose:

Goal
====

| This document aims to explain how to install the Ansible Execution Agent, which is required in order to execute Ansible in PULL-form.


.. _ansible_execution_agent_feature:

Features
========

| The Ansible Execution Agent comes with an agent function that allows users to execute Ansible-Legacy, Anslbie-Pioneer and Ansible-LegacyRole in PULL form in ITA.

- The connection between the ITA system only accepts outbound http/https from closed environments (PULL-form)
- Can generate Ansible execution environment by using Ansible Builder and Ansible Runner(Use any environment/module)
- Allows for redundant systems（exclusive control）
- Can confirm the version of the agent


.. _ansible_execution_agent_precondition:

Pre-requisites
==============

| The following must be finished.

- :ref:`ansible_exrcution_agent_hardware_requirements`
- :ref:`ansible_exrcution_agent_os_requirements`
- :ref:`ansible_exrcution_agent_oftware_requirements`
- :ref:`ansible_exrcution_agent_communication_requirements`
- :ref:`ansible_exrcution_agent_other_requirements`


.. _ansible_exrcution_agent_hardware_requirements:

Hardware requirements
---------------------

- Confirmed working specifications

.. list-table:: Confirmed working minimal specs
   :header-rows: 1
   :align: left

   * - Resource type
     - Required resource
   * - CPU
     - 2 Cores (3.0 GHz, x86_64)
   * - Memory
     - 6GB
   * - Storage
     - 40GB

.. list-table:: Confirmed working recommended specs
   :header-rows: 1
   :align: left

   * - Resource type
     - Required resource
   * - CPU
     - 4 Cores (3.0 GHz, x86_64)
   * - Memory
     - 8GB
   * - Storage
     - 80GB

.. warning::
  | ※The required disk space depends on the amount of Agent services, the Operation execution result deletion settings and the size of the image built.
  | Make sure to maintain and size the disk space to fit the user's needs.

.. _ansible_exrcution_agent_communication_requirements:

Connection requirements
-----------------------

| エージェントサーバから、外部NWへの通信が可能である必要があります。

- Connection destination ITA
- 各種インストール、及びモジュール、BaseImage取得先等（インターネットへの接続を含む）
- 作業対象サーバ

.. figure:: /images/ja/installation/agent_service/ae_agent_nw.drawio.png
   :alt: Agent server connection requirements
   :align: center
   :width: 600px

.. _ansible_exrcution_agent_os_requirements:

OS requirements
---------------

| The confirmed compatible operation systems are as following.

.. list-table:: Confirmed compatible OS.
   :header-rows: 1
   :align: left

   * - OS type
     - Version
   * - RHEL9
     - Red Hat Enterprise Linux release 9.4 (Plow)
   * - Almalinux8
     - AlmaLinux release 8.9 (Midnight Oncilla)


.. tip::
    | SELinux must be set to Permissive

    .. code-block:: bash

        $ sudo vi /etc/selinux/config
        SELINUX=Permissive

    .. code-block:: bash

        $ getenforce
        Permissive

.. _ansible_exrcution_agent_oftware_requirements:

Software requirements
---------------------

- Python 3.9 must be installed and have an alias for python 3 commands and pip3 commands
- The user must be able to run the following commands

.. code-block:: bash

    $ sudo

.. code-block:: bash

    $ python3 -V
    Python 3.9.18

    $ pip3 -V
    pip 21.2.3 from /usr/lib/python3.9/site-packages/pip  *python 3.9

.. _ansible_exrcution_agent_other_requirements:

Other requirements
------------------

.. _ansible_exrcution_agent_rhel_support_requirements:

RHEL(if using license with support)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If the user is using the paid version of Ansible-builder or Ansible-runner, make sure to register the subscription and activate the repository before running the installer.

- Red Hat container registry confirmation

  .. code-block:: bash

      podman login registry.redhat.io

- Repository used

  .. code-block:: bash

      rhel-9-for-x86_64-baseos-rpms
      rhel-9-for-x86_64-appstream-rpms
      ansible-automation-platform-2.5-for-rhel-9-x86_64-rpms

- Confirming activated repository/activating repository

  .. code-block:: bash

      sudo subscription-manager repos --list-enabled
      sudo subscription-manager repos --enable=rhel-9-for-x86_64-baseos-rpms
      sudo subscription-manager repos --enable=rhel-9-for-x86_64-appstream-rpms
      sudo subscription-manager repos --enable=ansible-automation-platform-2.5-for-rhel-9-x86_64-rpms


.. _ansible_exrcution_agent_base_images:

Base images confirmed compatible with Ansible builder
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- The following base images are confirmed to be compatible

.. list-table:: Confirmed compatible base images
   :header-rows: 1
   :align: left

   * - Base image type
     - Image fetch destination
     - Remarks
   * - ubi9
     - registry.access.redhat.com/ubi9/ubi-init:latest
     -
   * - rhel9
     - registry.redhat.io/ansible-automation-platform-24/ee-supported-rhel9:latest
     - For license with support


.. _ansible_execution_agent_parameter_list:

Parameter list
==============

| The following list contains inforamtio nregarding the parameters found in the env file generated by the installer.

.. list-table:: Parameters in env
   :header-rows: 1
   :align: left

   * - Parameter name
     - Contents
     - Default value
     - Changeable
     - Added version
     - Remarks
   * - IS_NON_CONTAINER_LOG
     - Settting item that outputs log as file
     - 1
     - No
     - 2.5.1
     -
   * - LOG_LEVEL
     - Level of information for the output log[INFO/DEBUG]
     - INFO
     - Yes
     - 2.5.1
     -
   * - LOGGING_MAX_SIZE
     - Log rotation file size
     - 10485760
     - Yes
     - 2.5.1
     - Default state is "Comment out"
   * - LOGGING_MAX_FILE
     - Log rotation backup numbers
     - 30
     - Yes
     - 2.5.1
     - Default state is "Comment out"
   * - LANGUAGE
     - Language settings
     - en
     - Yes
     - 2.5.1
     -
   * - TZ
     - Time zone
     - Asia/Tokyo
     - Yes
     - 2.5.1
     -
   * - PYTHON_CMD
     - python execution command of the executing virtual environment
     - <PATH of the installed environment>/poetry run python3
     - No
     - 2.5.1
     -
   * - PYTHONPATH
     - python execution command of the executing virtual environment
     - <Installation path input in the interactive item>/ita_ag_ansible_execution/
     - Yes
     - 2.5.1
     -
   * - APP_PATH
     - Install destination PATH
     - <Installation path input in the interactive item>
     - Yes
     - 2.5.1
     -
   * - STORAGEPATH
     - Data storage destination PATH
     - <Save location input in the interactive item>/<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>/storage
     - Yes
     - 2.5.1
     -
   * - LOGPATH
     - Log storage destination PATH
     - <Save location input in the interactive item>/<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>/log
     - Yes
     - 2.5.1
     -
   * - EXASTRO_ORGANIZATION_ID
     - Connection destination ORGANIZATION_ID
     - <ORGANIZATION_ID input in the interactive item>
     - Yes
     - 2.5.1
     -
   * - EXASTRO_WORKSPACE_ID
     - Connection destination WORKSPACE_ID
     - <WORKSPACE_ID input in the interactive item>
     - Yes
     - 2.5.1
     -
   * - EXASTRO_URL
     - Connection destination ITA URL
     - <URL input in the interactive item>
     - Yes
     - 2.5.1
     -
   * - EXASTRO_REFRESH_TOKEN
     - Connection destination ITAのEXASTRO_REFRESH_TOKEN
     - <input in the interactive item EXASTRO_REFRESH_TOKEN>
     - Yes
     - 2.5.1
     -
   * - EXECUTION_ENVIRONMENT_NAMES
     - | Users can specify the execution environment.
       | If blank, all execution environments will be target.
       | Divide execution environments with "," if specifying multiple.
     - Blank
     - Yes
     - 2.5.1
     -
   * - AGENT_NAME
     - Agent identifier registered to the service.
     - ita-ag-ansible-execution-<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>
     - No
     - 2.5.1
     -
   * - USER_ID
     - Agent identifier.
     - <Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>
     - No
     - 2.5.1
     -
   * - ITERATION
     - Number of process iterations before the settings initialize
     - 10
     - Yes
     - 2.5.1
     -
   * - EXECUTE_INTERVAL
     - Interval after main processes
     - 5
     - Yes
     - 2.5.1
     -


.. tip::
  | EXECUTION_ENVIRONMENT_NAMES: Specify if dividing the target execution environments.
  | Divide with "," if specifying multiple.


  .. code-block:: bash

         EXECUTION_ENVIRONMENT_NAMES=<Execution environment name 1>,<Execution environment name 2>


.. _ansible_execution_agent_install:

Install
============

Preparation
-----------

| Fetch the newest setup.sh and add execution permissions.

.. code-block:: bash

    $ wget https://raw.githubusercontent.com/exastro-suite/exastro-it-automation/refs/heads/main/ita_root/ita_ag_ansible_execution/setup.sh

    $ chmod 755 ./setup.sh


Interactive items
----------------------

- Agent's version information
- Service name
- Source code installat destination
- Data storage destination
- Ansible-builder and Ansible-runner
- Connection destination ITA's connection information（URL、ORGANIZATION_ID、WORKSPACE_ID、REFRESH_TOKEN）


Install Ansible Execution Agent
-------------------------------------

| Run setup.sh and follow the instructions.

.. code-block:: bash

    $ ./setup.sh install


#. | The user will be asked about the agent's installation mode. Specify which mode to use.
   | 1: Installs required modules and source code for the service(s), and register and executes service
   | 2: Registers and executes additional services.
   | 3: Specify env file and registers/executes servicse.
   | ※ Mode 2 and 3 requires that 1 is already executed.

.. code-block:: text

    Please select which process to execute.
        1: Create ENV, Install, Register service
        2: Create ENV, Register service
        3: Register service
        q: Quit installer
    select value: (1, 2, 3, q)  :

.. tip:: | In the following section, items with "default: xxxxxx" set will have the default value applied if the Enter key is pressed.

#.  Pressing the Enter key in the following step starts an interactive installation process where the user can input the data for the required items.

.. tabs::

   .. tab:: 1.Boot agent service from installer

      | ① Press Enter to start inputing data in an interactive format.

      .. code-block:: bash

         'No value + Enter' is input while default value exists, the default value will be used.
         ->  Enter

      | ② Users can specify the version of the agent they want to install. The default value uses the newest source code.

      .. code-block:: bash

         Input the version of the Agent. Tag specification: X.Y.Z, Branch specification: X.Y [default: No Input+Enter(Latest release version)]:
         Input Value [default: main ]:

      | ③ If the user wants to specify a name for the agent service, input "n" and press enter.

      .. code-block:: bash

         The Agent service name is in the following format: ita-ag-ansible-execution-20241112115209622. Select n to specify individual names. (y/n):
         Input Value [default: y ]:

      | ④ This step is only displayed if "n" is input for step ③.

      .. code-block:: bash

         Input the Agent service name . The string ita-ag-ansible-execution- is added to the start of the name.:
         Input Value :

      | ⑤ Input if the user wants to specify the install destination for the source code.

      .. code-block:: bash

         Specify full path for the install location.:
         Input Value [default: /home/<Login user>/exastro ]:

      | ⑥ Input if the user wants to specify the data storage destination.

      .. code-block:: bash

         Specify full path for the data storage location.:
         Input Value [default: /home/<Login user>/exastro ]:

      | ⑦ Specify the Ansible-builder and Ansible-runner.
      |   If using the paid version, specify 2 only after the repository has been activated.

      .. code-block:: bash

         Select which Ansible-builder and/or Ansible-runner to use(1, 2) [1=Ansible 2=Red Hat Ansible Automation Platform] :
         Input Value [default: 1 ]:

      | ⑧ Specify the URL of the connection destination ITA. e.g. http://exastro.example.com:30080

      .. code-block:: bash

         Input the ITA connection URL.:
         Input Value :

      | ⑨ Specify the ORGANIZATION of the connection destination ITA.

      .. code-block:: bash

         Input ORGANIZATION_ID.:
         Input Value :

      | ⑩ Specify the WORKSPACE of the connection destination ITA.

      .. code-block:: bash

         Input WORKSPACE_ID.:
         Input Value :

      | ⑪ Specify the connection destination ITA's refresh token.
      |
      |   Press Enter if the user wants to specify the refresh token later.
      |   Rewrite the .env's EXASTRO_REFRESH_TOKEN.

      .. code-block:: bash

         Input a REFRESH_TOKEN for a user that can log in to ITA. If the token cannot be input here, change the EXASTRO_REFRESH_TOKEN in the generated .env file.:
         Input Value [default:  ]:

      | ⑫ Select y in order to boot the service. If the service is not booted now, make sure to boot it later.

      .. code-block:: bash

         Do you want to start the Agent service? (y/n)y

      | ⑬ Displays the information of the installed service.

      .. code-block:: bash

         Install Ansible Execution Agent Infomation:
             Agent Service id:   <Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>
             Agent Service Name: ita-ag-ansible-execution-<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>
             Storage Path:       /home/<Login user>/exastro/<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>/storage
             Env Path:           /home/<Login user>/exastro/<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>/.env

   .. tab:: 2.Add and/or boot agent service

      | ① Pressing the Enter key in the following step starts an interactive installation process where the user can input the data for the required items.

      .. code-block:: bash

         'No value + Enter' is input while default value exists, the default value will be used.
         ->  Enter

      | ② If the user wants to specify a name for the agent service, input "n" and press enter.

      .. code-block:: bash

         The Agent service name is in the following format: ita-ag-ansible-execution-20241112115209622. Select n to specify individual names. (y/n):
         Input Value [default: y ]:

      | ③ This step is only displayed if "n" is input for step ②.

      .. code-block:: bash

         Input the Agent service name . The string ita-ag-ansible-execution- is added to the start of the name.:
         Input Value :

      | ④ Input if the user wants to specify the install destination for the source code.

      .. code-block:: bash

         Specify full path for the install location.:
         Input Value [default: /home/<Login user>/exastro ]:

      | ⑤ Input if the user wants to specify the data storage destination.

      .. code-block:: bash

         Specify full path for the data storage location.:
         Input Value [default: /home/<Login user>/exastro ]:


      | ⑥ Specify the URL of the connection destination ITA. e.g. http://exastro.example.com:30080

      .. code-block:: bash

         Input the ITA connection URL.:
         Input Value :

      | ⑦ Specify the ORGANIZATION of the connection destination ITA.

      .. code-block:: bash

         Input ORGANIZATION_ID.:
         Input Value :

      | ⑧ Specify the WORKSPACE of the connection destination ITA.

      .. code-block:: bash

         Input WORKSPACE_ID.:
         Input Value :

      | ⑨ Specify the connection destination ITA's refresh token.
      |
      |   Press Enter if the user wants to specify the refresh token later.
      |   Rewrite the .env's EXASTRO_REFRESH_TOKEN.

      .. code-block:: bash

         Input a REFRESH_TOKEN for a user that can log in to ITA. If the token cannot be input here, change the EXASTRO_REFRESH_TOKEN in the generated .env file.:
         Input Value [default:  ]:

      | ⑩ Select y in order to boot the service. If the service is not booted now, make sure to boot it later.

      .. code-block:: bash

         Do you want to start the Agent service? (y/n)y

      | ⑪ Displays the information of the installed service.

      .. code-block:: bash

         Install Ansible Execution Agent Infomation:
             Agent Service id:   <Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>
             Agent Service Name: ita-ag-ansible-execution-<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>
             Storage Path:       /home/<Login user>/exastro/<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>/storage
             Env Path:           /home/<Login user>/exastro/<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>/.env


   .. tab:: 3.Boot service


      | ① Pressing the Enter key in the following step starts an interactive installation process where the user can input the data for the required items.

      .. code-block:: bash

         'No value + Enter' is input while default value exists, the default value will be used.
         ->  Enter

      | ② Specify the .env file that will be used. The service registration/boot process will use the .env information.

      .. code-block:: bash

         Input the full path for the .env file.:
         Input Value :

      | ③ Select y in order to boot the service. If the service is not booted now, make sure to boot it later.

      .. code-block:: bash

        Do you want to start the Agent service? (y/n)y

      | ④ Displays the information of the installed service.

      .. code-block:: bash

         Install Ansible Execution Agent Infomation:
             Agent Service id:   <Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>
             Agent Service Name: ita-ag-ansible-execution-<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>
             Storage Path:       /home/<Login user>/exastro/<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>/storage
             Env Path:           /home/<Login user>/exastro/<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>/.env


.. _ansible_execution_agent_uninstall:

Uninstall
================

| Run setup.sh and follow the instructions.

.. code-block:: bash

    $ ./setup.sh uninstall

.. tip:: | The uninstaller allows users to delete the service and the data. However, the source code for the application will not be deleted.
         | If the user wants to delete the source code, do so manually.

#. | The user will be asked about the agent's uninstallation mode. Specify which mode to use.
   | 1: Deletes service and data.
   | 2: Deletes service. The data will not be deleted.
   | 3: Deletes data only.
   | ※ 3 requires that 2 has been executed.

.. code-block:: text

    Please select which process to execute.
        1: Delete service, Delete Data
        2: Delete service
        3: Delete Data
        q: Quit uninstaller
    select value: (1, 2, 3, q)  :


#.  Pressing the Enter key in the following step starts an interactive installation process where the user can input the data for the required items.

.. tabs::

   .. tab:: 1.Delete Agent service and data

      | ① Specify the name of the service name of the agent that will be uninstalled（ita-ag-ansible-execution-<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>）.

      .. code-block:: bash

        Input a SERVICE_NAME.(e.g. ita-ag-ansible-execution-xxxxxxxxxxxxx):

      | ② Specify the storage path of the data of the service name specified in step ①.

      .. code-block:: bash

        Input a STORAGE_PATH.(e.g. /home/cloud-user/exastro/<SERVICE_ID>):

   .. tab:: 2.Delete Agent service

      | ① Specify the name of the service name of the agent that will be uninstalled（ita-ag-ansible-execution-<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>）.

      .. code-block:: bash

        Input a SERVICE_NAME.(e.g. ita-ag-ansible-execution-xxxxxxxxxxxxx):

   .. tab:: 3.Delete data

      | ① Specify the service's data storage path.

      .. code-block:: bash

        Input a STORAGE_PATH.(e.g. /home/cloud-user/exastro/<SERVICE_ID>):


.. _ansible_execution_agent_service_cmd:

Manually operating/confirming service.
======================================

| The user can use the following commands to check the service state.

.. tabs::

   .. tab:: AlmaLinux8

     .. code-block:: bash

        # Displaying changes in the setting file
        $ sudo systemctl daemon-reload
        # Check service status
        $ sudo systemctl status  ita-ag-ansible-execution-<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>
        # Start service
        $ sudo systemctl start ita-ag-ansible-execution-<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>
        # Stop service
        $ sudo systemctl stop  ita-ag-ansible-execution-<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>
        # Restart service
        $ sudo systemctl restart  ita-ag-ansible-execution-<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>

   .. tab:: RHEL9

     .. code-block:: bash

        # Displaying changes in the setting file
        $ systemctl --user daemon-reload
        # Check service status
        $ systemctl --user status  ita-ag-ansible-execution-<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>
        # Start service
        $ systemctl --user start ita-ag-ansible-execution-<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>
        # Stop service
        $ systemctl --user stop  ita-ag-ansible-execution-<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>
        # Restart service
        $ systemctl --user restart  ita-ag-ansible-execution-<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>


.. _ansible_execution_agent_service_log:

Confirming service log
======================

- | Application log

.. code-block:: bash

   /home/<Login user>/exastro/<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>/log/
        ita-ag-ansible-execution-<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>.log
        ita-ag-ansible-execution-<Service unique identifier:yyyyMMddHHmmssfff or String specified in the interactive item>.log.xx

  ※Log rotated files have numeric values added to the end. Use it to find log rotation size and storage period.

- | System and components logs

.. code-block:: bash

   /var/log/message

※For information regarding Ansible-builder, Ansible-runner, podman and other related components, see the different component's log output destination.
