Quick Start
===========

| This scenario teaches you the basic operations of Exastro IT Automation by using a simple example: changing a hostname.
| The goal of this scenario is to help you understand the greatest benefit of automation with Exastro IT Automation.

| For this scenario, you'll need to perform the following preparatory steps:

- :ref:`Preparation <quickstart_prepared>`

  #. :ref:`Create a Parameter Sheet <quickstart_server_information_parmeter>`
  #. :ref:`Configure Work Items <quickstart_create_movement>`
  #. :ref:`Register an Ansible Playbook <quickstart_regist_playbook>`
  #. :ref:`Link Movements and Ansible Playbooks <quickstart_asign_playbook_with_movement>`
  #. :ref:`Link Parameter Sheet Items and Ansible Playbook Variables <quickstart_asign_playbook_variable_with_parameters>`
  #. :ref:`Register Devices <quickstart_regist_host>`

| After completing the preparatory steps, you'll perform the minimum necessary operations, such as registering an operation overview and configuring parameters, to repeatedly execute the task.

- :ref:`Repetitive Task (1st Time) <quickstart_1st>`

  #. :ref:`Register Operation Overview (1st Time) <quickstart_1st_regist_operation>`
  #. :ref:`Set Parameters (1st Time) <quickstart_1st_regist_parameter>`
  #. :ref:`Execute Task (1st Time) <quickstart_1st_run>`

- :ref:`Repetitive Task (2nd Time) <quickstart_2nd>`

  #. :ref:`Register Operation Overview (2nd Time) <quickstart_2nd_regist_operation>`
  #. :ref:`Set Parameters (2nd Time) <quickstart_2nd_regist_parameter>`
  #. :ref:`Execute Task (2nd Time) <quickstart_2nd_run>`

| The goal of this scenario is for you to understand that once you complete the initial setup, you can perform the same task repeatedly with simple operations.

Prerequisites
=============

| The following conditions are necessary to run this scenario:

 1. An available server (RHEL8).
 2. The user must be able to log in via SSH and have full sudoer privileges.
 3. A workspace for the task.

.. _quickstart_prepared:

Preparation
===========

 | Design the format for system configuration information.

 | You don't need to manage all system information as parameters. You can add or review them as needed when management becomes necessary in the future.

.. _quickstart_server_information_parmeter:

Create a Parameter Sheet
------------------------

| :menuselection:`Parameter Sheet Creation`, you manage parameter sheets for registering configuration values (parameters) used during operations.

| Create a parameter sheet to manage hostnames.
| :menuselection:`Parameter Sheet Creation --> Parameter Sheet Definition/Creation`, Create a parameter sheet named "Server Basic Information" to manage hostnames.

.. figure:: /images/learn/quickstart/Legacy_scenario1/パラメータシート作成定義.png
   :width: 1200px
   :alt: Create a parameter sheet

.. list-table:: Parameter Sheet Creation (Server Basic Information) - Item Settings
   :widths: 10 10
   :header-rows: 1

   * - Setting Item
     - Setting Value (Item 1)
   * - Field Name
     - :kbd:`Hostname`
   * - Field Name(For Rest API)
     - :kbd:`Hostname`
   * - Input Method
     - :kbd:`String(Single Line)`
   * -  Maximum Bytes
     - :kbd:`64`
   * - Regexp
     -
   * - Initial Value
     -
   * - Required
     - ✓
   * - Unique Constraint
     -
   * - Description
     -
   * - Remarks
     -

.. list-table:: Configuration values for the creation of the Server Basic Information Parameter Sheet
   :widths: 5 10
   :header-rows: 1

   * - Setting Item
     - Setting Value
   * - Item Number
     - (Automatic Input)
   * - Parameter Sheet Name
     - :kbd:`Server Basic Information`
   * - Parameter Sheet Name(REST)
     - :kbd:`Server_Information`
   * - Object To Be Created
     - :kbd:`Parameter Sheet(Hosted with Operations)`
   * -  Display Order
     - :kbd:`1`
   * - Bundle Usage
     - Uncheck "Use" (Disabled)
   * - Last Updated Timestamp
     - (Automatic Input)
   * - Last Updated User
     - (Automatic Input)

.. _quickstart_create_movement:

Configure Work Items
---------------------

| To register a work procedure, you define a Movement (Job), which is the work unit handled in Exastro IT Automation.

| In Exastro IT Automation, work is managed in units called Movements. A Movement corresponds to a work item in a work procedure manual.
| A Movement is used to associate IaC (Infrastructure as Code) like an Ansible Playbook, or to link variables within the IaC to setting values in a parameter sheet.

| :menuselection: From `Ansible-Legacy --> Movement list`, you register a Movement for hostname settings.

.. figure:: /images/learn/quickstart/Legacy_scenario1/Movement登録.png
   :width: 1200px
   :alt: Movement Registration

.. list-table:: Movement Information Settings
   :widths: 10 10 10
   :header-rows: 2

   * - Movement Name
     - Ansible Usage Information
     -
   * -
     - Host Specification Format
     - Header Section
   * - :kbd:`Hostname settings`
     - :kbd:`IP`
     - :kbd:`*See the Header section.`

.. code-block:: bash
   :caption: Header Section

   - hosts: all
     remote_user: "{{ __loginuser__ }}"
     gather_facts: no
     become: yes

.. _quickstart_regist_playbook:

Register an Ansible Playbook
-----------------------------

| You will now register an Ansible Playbook. An Ansible Playbook corresponds to a command described in an operation manual.
| In Ansible-Legacy mode, it is assumed that you will use a Playbook that you have created yourself.
| A benefit of using Ansible-Legacy mode is the ability to freely create procedures by developing Playbooks that suit your specific needs.
| However, to use Ansible-Legacy mode, you need knowledge of Playbook creation, as you must create the Playbooks yourself.

| In this scenario, you'll use the following Playbook. Please copy the code below and create hostname.yml in YAML format.

.. code-block:: bash
   :caption: hostname.yml

   - name: Set a hostname
     ansible.builtin.hostname:
       name: "{{ hostname }}"

| :menuselection:`Ansible-Legacy --> Playbook Library`, you'll register the Playbook mentioned above.

.. figure:: /images/learn/quickstart/Legacy_scenario1/Playbook素材集.png
   :width: 1200px
   :alt: Playbook登録

.. list-table:: Ansible Playbook Information registration
  :widths: 10 10
  :header-rows: 1

  * - Playbook Material Name
    - Playbook Material
  * - :kbd:`hostname`
    - :file:`hostname.yml`

.. _quickstart_asign_playbook_with_movement:

Link Movements and Ansible Playbooks
--------------------------------------------------

| You will now associate an Ansible Playbook with the defined Movement. Additionally, you will link the variables within the Ansible Playbook to the parameter sheet items registered in :ref:`quickstart_server_information_parmeter`.

| :menuselection:`Ansible-Legacy --> Movement-Role Association`, you will now associate a Movement with an Ansible Playbook.
| In this scenario, we will use hostname.yml.

.. figure:: /images/learn/quickstart/Legacy_scenario1/Movement-Playbook紐付.png
   :width: 1200px
   :alt: Movement-Playbook linkage

.. list-table:: Registering Movement-Playbook Association Information
  :widths: 10 10 10
  :header-rows: 1

  * - Movement Name
    - Playbook Material
    - Include order
  * - :kbd:`Hostname settings`
    - :kbd:`hostname.yml`
    - :kbd:`1`

.. _quickstart_asign_playbook_variable_with_parameters:

Link Parameter Sheet Items and Ansible Playbook Variables
------------------------------------------------------------

| In hostname.yml, you can set the hostname for the target server by assigning the hostname to the :kbd:`hostname` variable.

| :menuselection:`Ansible-Legacy --> Auto-Assignment Registration Settings` You will now configure the settings to assign the parameter from the hostname field in the Server Basic Information Parameter Sheet to the :kbd:`hostname` variable in the Ansible Playbook.

.. figure:: /images/learn/quickstart/Legacy_scenario1/代入値自動登録.png
   :width: 1200px
   :alt: Automatic Value Assignment Settings

.. list-table:: Automatic value assignment settings
  :widths: 40 10 20 20
  :header-rows: 2

  * - Parameter Sheet(From)
    - Registration Method
    - Movement Name
    - IaC Variable(To)
  * - Menu Group:Menu:Item
    -
    -
    - Movement Name:Variable Name
  * - :kbd:`For Automatic Value Registration:Server Basic Information:Hostname`
    - :kbd:`Value Type`
    - :kbd:`Hostname Settings`
    - :kbd:`Hostname Settings:hostname`

.. _quickstart_regist_host:

Register Devices
----------------------

| Register the target servers in the device list.

| :menuselection:`Ansible Common --> Device list`,you register the connection information for the target servers.

.. figure:: /images/learn/quickstart/Legacy_scenario1/機器一覧登録設定.gif
   :width: 1200px
   :alt: Device list registration

.. list-table:: Device list settings
   :widths: 10 10 15 10 10 10
   :header-rows: 3

   * - HW Device Type
     - Host Name
     - IP Address
     - Login Password
     - SSH Key Authentication Information
     - Ansible Usage Information
   * -
     -
     -
     - User
     - SSH Private Key File
     - Legacy/Role Usage Information
   * -
     -
     -
     -
     -
     - Authentication Method
   * - :kbd:`SV`
     - :kbd:`server01`
     - :kbd:`192.168.0.1 *Set a proper IP address`
     - :kbd:`Connection Username`
     - :kbd:`(Private Key File)`
     - :kbd:`Key Authentication(No Passphrase)`

.. tip::
   In this scenario, we'll use key authentication, but you can also use password authentication.
   Please change the authentication method as needed, depending on how you log in to the target server.

.. _quickstart_1st:

Repetitive task (1st time)
==========================

Before we consider the specific parameter settings and work procedures, we'll start by creating a work plan.
First, let's briefly organize the key information: what to do, how to do it, when to do it, and which devices to do it on.

.. list-table:: Work Approach
   :widths: 10 10
   :header-rows: 0

   * - Execution Date And Time
     - 2024/04/01 12:00:00
   * - Target
     - Target Server(RHEL8)
   * - Work Details
     - Hostname Change

.. _quickstart_1st_regist_operation:

Register Operation Overview (1st time)
--------------------------------------

| When you register an operation, you define the work summary for carrying out the task. You must create one operation for each task, and you should not reuse operations.
| Based on the work policy you've already decided on, let's fill in the operation details.

| :menuselection:`Basic Console --> Operation List`, register the task execution date and time, as well as the task name.

.. figure:: /images/learn/quickstart/Legacy_scenario1/オペレーション登録.png
   :width: 1200px
   :alt: Operation Registration

.. list-table:: Operation Registration Details
   :widths: 15 10
   :header-rows: 1

   * - Operation Name
     - Execution Schedule
   * - :kbd:`RHEL8 Hostname Change Task`
     - :kbd:`2024/04/01 12:00:00`

.. tip::
   | In this scenario, the task execution date and time can be set arbitrarily. However, if the actual work date has been determined, it is recommended to set the exact scheduled execution date and time.
   | For tasks that are performed repeatedly, such as periodic operations, if the exact work date is not determined, it is acceptable to register the current date and time.

.. _quickstart_1st_regist_parameter:

Set Parameters (1st time)
----------------------------

| The parameter sheet is used to register the parameters to be configured for each device.
| For the operation, select the task created in the task overview registration, such as :kbd:`RHEL8 Hostname Change Task`. By selecting an operation, you can associate the target server and parameters with that operation.
| In this scenario, the hostname :kbd:`server01` is set as the target server for the task.

| :menuselection:`Input --> Basic Server Information`, parameters are registered for the host.

.. figure:: /images/learn/quickstart/Legacy_scenario1/パラメータ登録.png
   :width: 1200px
   :alt: Parameter Registration

.. list-table:: Basic Server Parameter Settings
  :widths: 5 20 5
  :header-rows: 2

  * - Host Name
    - Operation
    - Parameters
  * -
    - Operation Name
    - Host Name
  * - :kbd:`server01`
    - :kbd:`2024/04/01 12:00:00_RHEL8 Hostname Change Task`
    - :kbd:`server01`

.. _quickstart_1st_run:

Execute Task (1st time)
------------------------

#. Pre-execution Check

   | First, let's check the current status of the server.
   | Log in to the target server via SSH and check the current hostname.

   .. code-block:: bash
      :caption: Command

      # Getting the Hostname
      hostnamectl status --static

   .. code-block:: bash
      :caption: Execution Result

      # The results will differ between environments.
      localhost

#. Task Execution

   | :menuselection:`Ansible-Legacy --> Task Execution`, select the :kbd:`Setting the Hostname` Movement, then click :guilabel:` Task Execution`.
   | Next, in :menuselection:`Task Execution Settings`, select :kbd:`RHEL8 Hostname Change Task` for the operation, and click :guilabel:`Confirm Selection`.
   | Finally, review the execution details and click :guilabel:`Confirm Selection`.

   | :menuselection:`Check Task Status` After the screen opens and the execution is complete, verify that the status has changed to 'Completed'.

.. figure:: /images/learn/quickstart/Legacy_scenario1/作業実行.gif
   :width: 1200px
   :alt: Task Execution

#. Post-check

   | Log in to the target server via SSH again and verify that the hostname has been changed.

   .. code-block:: bash
      :caption: Command

      # Getting the Hostname
      hostnamectl status --static

   .. code-block:: bash
      :caption: Execution Result

      server01

.. _quickstart_2nd:

Repetitive task (2nd time)
==========================

Before considering specific parameter settings or task procedures, start by creating a work plan.
First, let's briefly organize the information: when, on which device, what will be done, and how it will be carried out.

.. list-table:: Task Policy
   :widths: 10 10
   :header-rows: 0

   * - Execution Schedule
     - 2024/05/01 12:00:00
   * - Target of the Task
     - Target Server(RHEL8)
   * - Task Details
     - Hostname Update

.. _quickstart_2nd_regist_operation:

Register Operation Overview (2nd time)
--------------------------------------

| During operation registration, the task overview for performing the work is defined. Create one operation per task. Operations should not be reused.
| Enter the operation details based on the previously established work policy.

| :menuselection:`Basic Console --> Operation List`, register the task execution date and time, as well as the task name.

.. figure:: /images/learn/quickstart/Legacy_scenario1/更新用オペレーション登録.png
   :width: 1200px
   :alt: Operation Registration

.. list-table:: Operation Registration Details
   :widths: 15 10
   :header-rows: 1

   * - Operation Name
     - Scheduled Date and Time
   * - :kbd:`RHEL8 Hostname Update Operation`
     - :kbd:`2024/05/01 12:00:00`

.. tip::
   | For this scenario, any appropriate date and time can be used for the task execution date and time. However, if the work date is fixed, it is recommended to set the accurate scheduled execution date and time.
   | For recurring tasks such as regular maintenance where the exact work date is not determined, it is acceptable to register the current date and time.

.. _quickstart_2nd_regist_parameter:

Set Parameters (2nd time)
-----------------------------

| In this scenario, the hostname :kbd:`server01` was set as the parameter value.
| However, the hostname is also managed in the :menuselection:`Device List`, resulting in duplicate management of the hostname.

| In Exastro IT Automation, device information can be acquired via ansible_common_ita_original_variable, and the hostname of the target host can be obtained using the variable :kbd:`__inventory_hostname__`. This enables centralized management of parameters.

| :menuselection:`Input --> Basic Console`, let's register the hostname listed in the device list using the ITA-specific variables.

.. figure:: /images/learn/quickstart/Legacy_scenario1/更新用パラメータ設定.png
   :width: 1200px
   :alt: Parameter Settings

.. list-table:: Configuration Values for Basic Server Parameters
  :widths: 5 10 5
  :header-rows: 2

  * - Host Name
    - Operation
    - Parameter
  * -
    - Operation Name
    - Host Name
  * - :kbd:`server01`
    - :kbd:`2024/05/01 12:00:00_RHEL8 Hostname Update Operation`
    - :kbd:`"{{ __inventory_hostname__ }}"`

| Using the __inventory_hostname__ variable enables referencing the host information stored in the device list.
| Next, update the hostname of the target server to db01.

| :menuselection:`Ansible Common --> Device list`, update the hostname of the target server to db01

.. figure:: /images/learn/quickstart/Legacy_scenario1/機器一覧ホスト名変更.gif
   :width: 1200px
   :alt: Parameter Registration

.. list-table:: Configuration Values in the Device List
   :widths: 10 10 15 10 10 10
   :header-rows: 3

   * - HWDevice Type
     - Host Name
     - IP Address
     - Login Password
     - ssh Authentication Key Info
     - Ansible Configuration Information
   * -
     -
     -
     - User
     - ssh Authentication Key Info
     - Linkegacy/Role Usage Information
   * -
     -
     -
     -
     -
     - Authentication Method
   * - :kbd:`SV`
     - :kbd:`db01`
     - :kbd:`192.168.0.1 *Set the appropriate IP address`
     - :kbd:`Connection Username`
     - :kbd:`(Private Key File)`
     - :kbd:`Key Authentication(No Passphrase)`

.. _quickstart_2nd_run:

Execute Task (2nd time)
-----------------------

#. Execute Task

   | In :menuselection:`Ansible-Legacy --> Execution`, select the :kbd:`Host Name Setting` Movement, and click :guilabel:` Working execution` to run the task.
   | Next, in :menuselection:`Working execution setting`, select the :kbd:`RHEL8 Hostname Update Task` operation, then click :guilabel:`Decision to select`.
   | Finally, review the execution detail, then click :guilabel:`Working execution`.

   | Open the :menuselection:`Check operation status`, after the execution is complete, confirm that the status has changed to "Completed."

.. figure:: /images/learn/quickstart/Legacy_scenario1/更新作業実行.gif
   :width: 1200px
   :alt: Execute Task

#. Post-Execution Check

   | Log in to the server again via SSH and verify that the hostname has been changed.

   .. code-block:: bash
      :caption: Command

      # Getting the Hostname
      hostnamectl status --static

   .. code-block:: bash
      :caption: Execution Result

      db01

| The following steps, :menuselection:`Ansible Common --> Device list`, by simply changing the hostname and executing the task, you can update the hostname.


Overview
========

| Through the scenario of setting the hostname on a RHEL8 server, you have learned the basic operation of Exastro IT Automation.
| Additionally, you have learned about the greatest benefit of automation with Exastro IT Automation: improving efficiency by automating repetitive tasks.
