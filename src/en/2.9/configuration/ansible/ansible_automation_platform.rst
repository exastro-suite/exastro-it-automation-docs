===========================
Ansible Automation Platform
===========================

Introduction
============

| This guide aims to explain the system configuration and environment needed to operate Exastro IT Automation (hereinafter referred to as ITA)'s Ansible connectivity function (referred to as Ansible Driver)
| This guide will also explain system configurations and environments for using Ansible Automation Platform as an execution engine.
|
| For Ansible Core configurations, please see :doc:`./ansible_core`.

| Exastro IT Automation must be installed in order to use the ITA Ansible driver.
| For instructions on how to install Exastro IT Automation, please see :doc:`../../installation/online/exastro/kubernetes`.



Systen configuration
====================

| The Ansible driver is a standard function available when deploying Exastro IT Automation.
|
| We recommend using Ansible Automation Platform configurations for scale-out architectures for the Ansible execution server.
|
| The diagram below illustrates an Ansible Automation Platform configuration pattern.

Systen configuration pattern
----------------------------

| Ansible Automation Controller allows for operation of systems with better availability and the use of expanded functions when running Ansible.

.. warning::
   | The ITA system and Ansible core must be own their own servers.
   | Ansible Core (Ansibler driver (Agent)) is required, as it the Playbooks are encrypted using Ansible Vault.

| The following image illustrates a configuration pattern with the main Ansible driver functions.
| ※ The diagram does not include the Exastro ITA system.


.. list-table:: System configuration pattern
   :widths: 5 50 80 25
   :header-rows: 1
   :align: left

   * - No
     - Configuration
     - Description
     - Ansible scaleout
   * - 1
     - | Ansible Automation Platform (Hybrid pattern)
     - | A configuration pattern that allows the Ansible Control node execute operations for Managed nodes.
       | While simple, this configuration requires a communication for each Managed node
     - Yes
   * - 2
     - Ansible Automation Platform (Seperate Execution node pattern)
     - | A configuration where the Ansible Control node links with the Ansible Execution node in order to execute operations for Managed nodes.
       | In contrast to the Ansible Automation Platform (Hybrid pattern), this configuration is more complicated. In return, it allows the user to execute operations to the managed nodes as long as the Ansible Control node can communicate with the Ansible Execution node. The user does not need to configure communication settings for each Managed node.
     - Yes

.. tabs::

   .. tab:: Ansible Automation Platform (Hybrid pattern)

      The following diagram illustrates the configuration for Ansible Automation Platform (Hybrid pattern).

      .. figure:: /images/ja/diagram/aap_hybrid.png
         :alt: Ansible Automation Platform (Hybrid pattern)
         :width: 900px

         Ansible Automation Platform (Hybrid pattern)


      .. list-table:: System communication requirements
         :widths: 10 20 20 40 100
         :header-rows: 1
         :align: left

         * - | Communication number
             | ※1
           - FROM
           - TO
           - | Protocol
             | [Port number　※2]
           - Main application
         * - ①
           - ITA system
           - Hybrid node
           - | http(s)
             | [80(443)/tcp]
           - Ansible Automation Platform control communication
         * - ②
           - ITA system
           - Hybrid node
           - ssh [22/tcp]
           - Ansible Automation Platform execution communication
         * - ③
           - ITA system
           - Git
           - | http(s)
             | [80(443)/tcp]
           - File link
         * - ④
           - Hybrid node
           - Target device
           - | Any
             | (ssh [22/tcp] telnet [23/tcp] etc. ※3）
           - Run commands to aumtomatic configuration devices
         * - ⑤
           - Hybrid node
           - Git
           - | http(s)
             | [80(443)/tcp]
           - File link

      | ※1 The communication numbers corresponds to the numbers illustrated in the Ansible Automation Platform (Hybrid pattern) diagram.
      | ※2 The port numbers written are standard port numbers.
      | ※3 These are examples. The protocols depends on the Ansible module.

   .. tab:: Ansible Automation Platform (Seperate Execution node pattern)

      The following diagram illustrates the configuration for Ansible Automation Platform (Seperate Execution node pattern).

      .. figure:: /images/ja/diagram/aap_divide.png
        :alt: Ansible Automation Platform (Seperate Execution node pattern)
        :width: 1200px

        Ansible Automation Platform (Seperate Execution node pattern)

      .. list-table:: System communication requirements
         :widths: 10 20 20 40 100
         :header-rows: 1
         :align: left

         * - | Communication number
             | ※1
           - FROM
           - TO
           - | Protocol
             | [Port number　※2]
           - Main application
         * - ①
           - ITA system
           - Control node
           - | http(s)
             | [80(443)/tcp]
           - Ansible Automation Platform control communication
         * - ②
           - ITA system
           - Control node
           - ssh [22/tcp]
           - Ansible Automation Platform execution communication
         * - ③
           - ITA system
           - Git
           - | http(s)
             | [80(443)/tcp]
           - File link
         * - ④
           - Control node
           - Target device
           - | Any
             | (ssh [22/tcp] telnet [23/tcp] etc. ※3）
           - Run commands to aumtomatic configuration devices
         * - ⑤
           - Control node
           - Git
           - | http(s)
             | [80(443)/tcp]
           - File link

      | ※1 The communication numbers corresponds to the numbers illustrated in the Ansible Automation Platform (Seperate Execution node pattern) diagram.
      | ※2 The port numbers written are standard port numbers.
      | ※3 These are examples. The protocols depends on the Ansible module.



System requirements
===================

| The system requirements for Ansible driver are based on the ITA System requirements. See :doc:`../../installation/online/exastro/kubernetes` for more information.
| The following are the system requirements for Ansible Automation Platform.

..  include:: ../../include/aap_versions.rst


Playbook link
=============

| The following diagram illustrates The Playbook links between ITA and Ansible Automation Platform.

.. figure:: /images/ja/diagram/playbook_link_between_aap_and_container.png
   :alt: ITA and Ansible Automation Platform 2.x Playbook link Diagram
   :width: 600px

   ITA and Ansible Automation Platform 2.x Playbook link Diagram


Initial settings
================

| After installing Ansible Automation Platform, configure the following settings depending on the Execution engine.

.. list-table:: Ansible Core system requirements
   :widths: 45 55
   :header-rows: 1
   :align: center

   * - Setting
     - Ansible Automation Platform 2.x
   * - ITA Operation directory preparation
     - 〇
   * - ITA Operation directory publication
     - 〇
   * - Ansible Automation Platform file transfer user preparation
     - 〇
   * - Ansible Automation Platform Git user preparation
     - 〇
   * - Proxy settings
     - △


| 〇:Required　△:Required depending on user conditions



ITA Operation directory preparation
-----------------------------------

| Create a directory for ITA operations in the Ansible Automation Platform server.
| For cluster configurations, create the directory on all the configurating servers.
| The Ansible Automation Platform's Hon node does not need a directory.
|

.. list-table:: ITA Operation directory information
   :widths: 35 120
   :header-rows: 1
   :align: left

   * - Item
     - Setting value
   * - Directory path
     - /var/lib/exastro
   * - Owner/Group
     - awx:awx
   * - Permission
     - 0755


ITA Operation directory publication
-----------------------------------

| Log in to the Ansible Automation Platform through your browser and set:menuselection:`Settings --> Job --> Path for publishing seperated jobs` to :file:`/var/lib/exastro/`.

.. figure:: /images/ja/diagram/publish_ita_operation_director.png
   :width: 600px


Ansible Automation Platform file transfer user preparation
----------------------------------------------------------

| When generating Ansible Automation Platform projects from ITA, you must transfer a set of Playbook files to the following directory in Ansible Automation Platform.
| Make sure to prepare a Linux user for file transfers.
|
| ・SCM management directory(/var/lib/awx/projects)
| 　※Use the linux user for Playbook transfers for Ansible Tower3.x.
| ・ITA operation directory(/var/lib/exastro)

| We highly recommend that the Linux user configures a password for the awx user generated when Ansible Automation Platform is installing.

.. warning::
 | Preparing and using users other than the awx user to change SCM management path (/var/lib/awx/projects) permissions is not within the scope of Red Hat support.

| The Linux user needs to be registered to the ITA System.


Ansible Automation Platform Git user preparation
----------------------------------------------------------

| The SCM type for projects generated from ITA to Ansible Automation Platform is using Git.
| The destination Git repository is created by the host installed by the Ansible driver backyard function.
| Make sure to prepare a Linux user for connecting to the Git repository with ssh key authentication from Ansible Automation Platform.

| The user will need a access token that allows them to create and operate.For more information, see :ref:`installation_kubernetes_gitlablinkage`.


.. list-table:: ITA Generated Linux user information for SSH authentication
   :widths: 35 200
   :header-rows: 1
   :align: left

   * - Item
     - Value
   * - User
     - awx
   * - Password
     - Not set
   * - Secret key
     - /home/awx/.ssh/rsa_awx_key
   * - Public key
     - /home/awx/.ssh/rsa_awx_key.pub



Proxy settings
--------------

| When running Operations with Ansible Automation Platform settings, an execution environment container image is downloaded from a website specified by Red Hat.
| Log in to Ansible Automation Platform through your browser, access :menuselection:`Settings --> Job --> Add Environment variables` and configure the following environment variables.

-  https_proxy
-  http_proxy
-  no_proxy
-  HTTPS_PROXY
-  HTTP_PROXY
-  NO_PROXY

.. figure:: /images/ja/diagram/proxy_settings.png
   :width: 600px

.. warning::
  | If the Ansible Automation Platform is running under a Proxy environment, the Proxy settings needs to be configured to Ansible Automation Platform. Running operations without Proxy settings might cause errors with unknown causes


Adding Organizations
=========================

.. _platform_make_organization:

Create Organizations
--------------------

| Create an Organization.
| Log in as admin (administrator) to Ansible Automation Platform.
|

#. | Click the :guilabel:`Add` button under :menuselection:`Access --> Organization`.
#. | Fill out the corresponding items and click :guilabel:`Save`.
   |
   | See the table below for the required items and their values.

.. list-table::
   :widths: 35 80 80
   :header-rows: 1
   :align: left

   * - Item
     - Set value
     - Remarks
   * - Name
     - (User-set name)
     -
   * - Instance group
     - ※Leave as unselected
     - Set with ":ref:`platform_connection_instance` "


.. _make_application:

Register Application
--------------------

| Register Application for paying out connection tokens.
| Log in as admin (administrator) to Ansible Automation Platform.
|

#. | Click the :guilabel:`Add` button under :menuselection:`Management --> Application`.
#. | Fill out the corresponding items and click :guilabel:`Save`.
   |
   | See the table below for the required items and their values.

.. list-table::
   :widths: 35 80 80
   :header-rows: 1
   :align: left

   * - Item
     - Set value
     - Remarks
   * - Name
     - (User-set name)
     - Use with「 :ref:`platform_output_token` 」
   * - Organization
     - Select organization created here:" :ref:`platform_make_organization` "
     -
   * - Authentication grant type
     - Select Resource owner password base
     -
   * - Client type
     - Secret
     -

.. _platform_architecture_user:

Create user
------------

| Create user for Organization.
| Log in as admin (administrator) to Ansible Automation Platform.
|

#. | Click the :guilabel:`Add` button under :menuselection:`Access --> User`.
#. | Fill out the corresponding items and click :guilabel:`Save`.
   |
   | See the table below for the required items and their values.


.. list-table::
   :widths: 35 80 80
   :header-rows: 1
   :align: left

   * - Item
     - Set value
     - Remarks
   * - Name
     - (User-set name)
     -
   * - Password
     - (User-set password)
     -
   * - Confirm Password
     - (User-set password)
     -
   * - User type
     - Select Standard user
     -
   * - Organization
     - Select organization created here: ":ref:`platform_make_organization` "
     -

.. _platform_organization_roles:

Configure Roles
---------------

| Configure roles that will link the Users to the Organizations.
| Log in as admin (administrator) to Ansible Automation Platform.
|

#. | Click the username you created in :ref:`platform_architecture_user`  under :menuselection:`Access --> User`.
#. | This will move you to the User details menu. Select "Role" and click the :guilabel:`Add` button.
#. | Follow the instructions below and add the required user permissions.

   #. | When adding Resource types, select "Organization" and click the :guilabel:`Next` button.
   #. | When selecting List items, select the organization created in :ref:`platform_make_organization` and click the :guilabel:`Next` button.
      | ※Do not grant any roles to organizations that were not created in :ref:`platform_make_organization`.
   #. | When selecting role, select both "Admin" and "Member" and click :guilabel:`Save`.



.. _platform_output_token:

Authentication token pay-out
----------------------------

| Log in as :ref:`platform_architecture_user` to Ansible Automation Platform.
|

#. | Press the :guilabel:`Add` button under :menuselection:`Access --> User`.
#. | Fill out the corresponding items and click :guilabel:`Save`.
   |
   | See the table below for the required items and their values.

.. list-table::
   :widths: 35 50 30
   :header-rows: 1
   :align: left

   * - Item
     - Set value
     - Remarks
   * - Application
     - Select application created here: " :ref:`make_application` ""
     -
   * - Range
     - Select Write
     -

Add Workspaces
==========================

.. _platform_ansible_execution_environment:

Add Instances
----------------------

| Add the Ansible Execution Environment Instance (hereinafter written as Ansible ee).


Create Instance groups
------------------------

| ※ If there already is an instance group for Ansible ee, jump to :ref:`platform_add_insetance`.

| Log in as admin (administrator) to Ansible Automation Platform.
|

#. | Select the Instance group you are adding the Ansible ee Instance in :ref:`platform_ansible_execution_environment` under :menuselection:`Management --> Instance group`.
#. | Fill out the corresponding items and click :guilabel:`Save`.
   |
   | See the table below for the required items and their values.

.. list-table::
   :widths: 35 30 50
   :header-rows: 1
   :align: left

   * - Item
     - Set value
     - Remarks
   * - Name
     - (User-set name)
     - See the following for rules regarding names.


.. _platform_add_insetance:

Add Instance to Instance group
----------------------------------------

| Add the Ansible ee instance from :ref:`platform_ansible_execution_environment` to the Instance group.
| Log in as admin (administrator) to Ansible Automation Platform.
|

#. | Select the Instance group you are adding the Ansible ee Instance in :ref:`platform_ansible_execution_environment` under :menuselection:`Management --> Instance group`.
#. | This will move you to the Instance group details menu. Press the :menuselection:`Instance` tab and click the :guilabel:`Associate` button.
#. | This will move you to the Instance selection menu. the Ansible ee Instance should be displayed. Select it and press the :guilabel:`Save` button.


.. _platform_connection_instance:

Link Organization and Instance group
------------------------------------

|  Link the Instance group from earlier with the organization created in :ref:`platform_make_organization`.
|  Log in as admin (administrator) to Ansible Automation Platform.
|

#. | Go to :menuselection:`Access --> Organization` and select the name of the Organization created in :ref:`platform_make_organization`.
#. | This will move you to the Details menu. Press the :guilabel:`Edit` button.
#. | This will move you to the Edit menu. Select the Instance group from earlier and click the :guilabel:`Save` button.
   | ※Multiple selectable


Register Authentication token and Organization to ITA
-----------------------------------------------------

| Register the Authentication token created in :ref:`platform_output_token` and the Organization created in :ref:`platform_make_organization` to :menuselection:`Ansible common --> Interface information`

.. warning:: | When registering Organization names, make sure to open interface information,  and select the name of the Organization created in ":ref:`platform_make_organization`" approximately 1 minute after registering the Authentication token.

  ※The Backyard collects the organizations associated with the users corresponding to each authentication token and displays them in the pull-down.


.. note:: | If a user created in the " :ref:`platform_organization_roles`" section has been granted multiple organization roles, a randomly selected organization will be used as the default value.


