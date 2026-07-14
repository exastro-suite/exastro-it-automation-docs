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

=======================
Docker Compose - Online
=======================

Introduction
============

| This document aims to explain how to install Exastro Platform or Exastro IT Automation on Docker or Podman.

Features
========

| This is the easiest and simplest way of installing Exastro IT Automation
| For higher availability and service level, we recommend :doc:`Kubernetes version<kubernetes>`

Pre-requisites
==============

- Deploy environment

  | The hardware requirements for the Container environment are as follows.

  .. list-table:: Hardware requirements(Minimum)
   :widths: 20, 20
   :header-rows: 1

   * - Resource type
     - Required resource
   * - CPU
     - 2 Cores (3.0 GHz, x86_64)
   * - Memory
     - 4GB
   * - Storage (Container image size)
     - 35GB

  .. list-table:: Hardware requirements(Recommended)
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

| ※ The system must have disk space as partitions.
| ▼RHEL
| ・Container image
| /home/Username/.local  25GB
| ・Exastro data
| /home/Username/exastro-docker-compose 10GB(rough estimate. May change depending on usecases).
|
| ▼Other than RHEL
| ・Container image
| /var/lib/ 25GB
| ・Exastro data
| /home/Username/exastro-docker-compose 10GB(rough estimate. May change depending on usecases).
|

  .. warning::
    | The required resources for the minimum configuration are for when both Gitlab Container and OASE container are not deployed. Additional resources will be required if you are planning to deploy them.
    | Users will have to prepare an additional storage area if they wish to persist databases or files.
    | The storage space is only an estimate and varies based on the user's needs. Make sure to take that into account when securing storage space.


- Communication Protocols

  .. list-table:: Communication Protocols
   :widths: 15, 20, 10, 10, 5
   :header-rows: 1

   * - Use
     - Description
     - Source
     - Destination
     - Default
   * - For Exastro service
     - For connecting to Exastro service
     - Client
     - Exastro system
     - 30080/tcp
   * - Exastro system (management)
     - For Exastro system management function
     - Client
     - Exastro system
     - 30081/tcp
   * - GitLab service(options)
     - For connecting to GitLab when linked with AAP
     - Ansible Automation Platform
     - Exastro system
     - 40080/tcp
   * - For GitLab service (option)
     - For monitoring GitLab service
     - Exastro system
     - Exastro system
     - 40080/tcp
   * - File acquisition
     - GitHub, Container images, Packages, etc.
     - Exastro system
     - Internet
     - 443/tcp

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

  .. list-table:: Tested environments
   :widths: 25, 20, 20, 20
   :header-rows: 1

   * - OS version
     - podman version
     - Docker Compose version
     - Docker version
   * - Red Hat Enterprise Linux release 9.4 (Plow)
     - podman version 4.9.4-rhel
     - Docker Compose version v2.20.3
     - ー
   * - Red Hat Enterprise Linux release 8.9 (Ootpa)
     - podman version 4.9.4-rhel
     - Docker Compose version v2.20.3
     - ー
   * - AlmaLinux release 8.9 (Midnight Oncilla)
     - ー
     - ー
     - Docker version 26.1.3, build b72abbb

.. tip::
   | Some users have been meeting errors where the name cannot be resolved correctly in rootless mode in RHEL 8.2 or podman 4.x. Make sure to use RHEL 8.3 or later.
   |
   | https://github.com/containers/podman/issues/10672
   | https://github.com/containers/podman/issues/12565

- Applications

  | The user must be able to run :command:`curl` and :command:`sudo` commands.

.. warning::
   | The Exastro process must be able to be run with normal user permissions (it is not possible to install with root user).
   | Any normal users must be sudoer and have complete permissions.


.. _docker_prep:

Preparation
===========

| The user must prepare an URL for releasing the service.

.. list-table:: Example 1) Releasing service with IP Address
 :widths: 15, 20
 :header-rows: 1

 * - Service
   - URL
 * - Exastro service
   - http://172.16.0.1:30080
 * - Exastro management service
   - http://172.16.0.1:30081
 * - GitLab service
   - http://172.16.0.1:40080

.. list-table:: Example 2) Releasing service with Domain
 :widths: 15, 20
 :header-rows: 1

 * - Service
   - URL
 * - Exastro service
   - http://ita.example.com:30080
 * - Exastro management service
   - http://ita.example.com:30081
 * - GitLab service
   - http://ita.example.com:40080

.. list-table:: Example 3) Releasing service through LoadBalancer
 :widths: 15, 20
 :header-rows: 1

 * - Service
   - URL
 * - Exastro service
   - https://ita.example.com
 * - Exastro management service
   - https://ita-mng.example.com
 * - GitLab service
   - https://gitlab.example.com

.. tip::
   | If the user is using HTTPS, they must use either LoadBalancer or Reverse proxy.
   | If the user plans to use LoadBalancer or Reverse proxy, they will have to prepare that themselves.


Installation (Automatic)
========================

.. note::
   | The installer selects either Docker or Podman depending on the user OS.

.. note::
   | If the installer fails, run :ref:`docker_compose_uninstall`'s :ref:`docker_compose_uninstall_all` or :ref:`docker_compose_uninstall_container` and try installing again.

| The easiest way of installing Exastro ITA is to use the the Installation script.
| This allows users to start the installation process with 1 command.
| The following is an example where the user is "test_user" and the home directory is "/home/test_user".


.. code-block:: shell
   :caption: Install command

   sh <(curl -sf https://ita.exastro.org/setup) install

| After the install command is run, the system will check that the system requirements are met before starting the Container construction process.
| When all the required packages are installed, the user will be able to customize the installation with the following values:

.. code-block:: shell
   :caption: Confirm OASE container deployment

   Deploy OASE containers? (y/n) [default: y]:

.. code-block:: shell
   :caption: Confirm GitLab container deployment

   Deploy GitLab container? (y/n) [default: n]:

.. code-block:: shell
   :caption: Confirm automatic password generation?

   # Asks to automatically generate Maria DB and System admin password.
   Generate all password and token automatically? (y/n) [default: y]:
.. tabs::

  .. group-tab:: https encrypted connection

     .. code-block:: shell
        :caption: Exastro service URL

        #Input 30800 for the port number if the OS is Red Hat Enterprise Linux. For everything else, input 80.
        Input the Exastro service URL: https://ita.example.com:30080

     .. code-block:: shell
        :caption:  Exastro management service URL

        #Input 30801 for the port number if the OS is Red Hat Enterprise Linux. For everything else, input 81.
        Input the Exastro management URL: https://ita.example.com:30081

     .. code-block:: shell
        :caption:  Self-signed SSL/TSL certificate generation (If Exastro service URL/Exastro management service URL is set to https)

        Generate self-signed SSL certificate? (y/n) [default: y]:

     .. code-block:: shell
        :caption:  Server certificate/Secret key file path (If Self-signed SSL/TSL certificate generation is set to "n")

        #Specify the server certificate file path for the certificate file path and the secret key file's file path for the private-key file path.
        Input path to your SSL certificate file.
        certificate file path:
        private-key file path:

  .. group-tab:: http connection
         Input the Exastro service URL:

      .. tip::
         | Input the URL in the following format: http://～:(Port number)
         | Input 30800 for the port number if the OS is Red Hat Enterprise Linux. For everything else, input 80.

      .. code-block:: shell
         :caption:  Exastro Management service URL

         Input the Exastro management URL:

      .. tip::
         | Input the URL in the following format: http://～:(Port number)
         | Input 30801 for the port number if the OS is Red Hat Enterprise Linux. For everything else, input 81.


.. code-block:: shell
   :caption:  Gitlab container URL(Required if deploying Gitlab container).

   Input the external URL of GitLab container [default: (nothing)]:

.. tip::
   | Make sure to include the port number in the URL.
   | Specify 40080 for the port number.


.. code-block:: shell
   :caption: Exastro service URL

   Service URL? [default: http://127.0.0.1:30080]: http://ita.example.com:30080

.. code-block:: shell
   :caption:  Exastro management service URL

   Management URL? [default: http://127.0.0.1:30081]: http://ita.example.com:30081

.. code-block:: shell
   :caption: Confirm generated settings file

   System parametes are bellow.

   System administrator password:    ********
   Database password:                 ********
   OASE deployment                   true
   MongoDB password                  ********
   Service URL:                      http://ita.example.com:30080
   Manegement URL:                   http://ita.example.com:30081
   Docker GID:                       1000
   Docker Socket path:               /run/user/1000/podman/podman.sock
   GitLab deployment:                false

   Generate .env file with these settings? (y/n) [default: n]:

| Inputting either :command:`y` or :command:`yes` will download all Docker Compose files needed to run Exastro from GitHub and change the firewall settings.

.. code-block:: shell
   :caption: Check Exastro container deployment

   Deploy Exastro containers now? (y/n) [default: n]:

| Input either :command:`n` or :command:`no` to edit settings on a more granular level and skip skip the following process.
| Input either :command:`y` or :command:`yes` to run the Exastro system container group.
| The Exastro system deployment process may take several minutes (Depends on the network situation and server specs).

.. code-block:: shell
   :caption: Running Exastro container deployment

   Please wait for a little while. It will take 10 minutes or later..........

| When the Exastro system deployment is finnished, the service connection information will be output.

.. code-block:: shell
   :caption: Service connection information outpu

   System manager page:
     URL:                http://ita.example.com:30081/
     Login user:         admin
     Initial password:   ******************

   Organization page:
     URL:                http://ita.example.com:30080/{{ Organization ID }}/platform


   GitLab service is has completely started!

   Run creation organization command:
      bash /home/test_user/exastro-docker-compose/create-organization.sh


   ! ! ! ! ! ! ! ! ! ! ! ! ! ! !
   ! ! !   C A U T I O N   ! ! !
   ! ! ! ! ! ! ! ! ! ! ! ! ! ! !

   Be sure to reboot the you host operating system to ensure proper system operation.

   Reboot now? (y/n) [default: y]: y

| If neccesary, save the output information and press :command:`y` or :command:`yes` to restart the system.

.. note::
   | The generated parameters are saved under :file:`~/exastro-docker-compose/.env`.


Create Organization
==========================

| After rebooting and logging in to the system, create an organization.

.. tip::
   | When linked to GitLab, the GitLab must be running in order to create Organizations.


Create Workspace
====================

| After creating an organization, log in to it and create a workspace.

Let's give it a Try!!
=====================

| We recommend users go through :doc:`../../../learn/quickstart/index` in order to learn how to use the software.
| The Quickstart guide guides the user through scenarios where they learn how to use Exastro IT Automation, how the parameter sheets works, etc.

Update
==============

| This section describes how to update the Exastro system.


Update preparation
--------------------

.. warning::
  | We recommend that the back up their data before updating.
  | The backup target is :file:`~/exastro-docker-compose/.volumes`.

Update repository
^^^^^^^^^^^^^^^^^^^^^

| Update the exastro-docker-compose repository.

.. code-block:: shell
   :linenos:
   :caption: Command

   # Check exastro-docker-compose repository
   cd ~/exastro-docker-compose
   git pull



Check default setting values and update data
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Check the updated default values.
| Compare the :file:`exastro.yaml` file pre and post update.

.. code-block:: shell
   :caption: Command

   cd ~/exastro-docker-compose

   # For AlmaLinux or Ubuntu OS
   diff .env .env.docker.sample
   # For Red Hat Enterprise Linux OS
   diff .env .env.podman.sample

Update setting values
^^^^^^^^^^^^^^^^^^^^^

| After comparing the default setting values, add any desired items and setting values before updating.
| If no setting value update is needed, skip this step.

Update Execute
--------------

Start update
^^^^^^^^^^^^^^^^^^

| Start the update.

.. code-block:: bash
  :caption: Command

  sh <(curl -sf https://ita.exastro.org/setup) install


.. _docker_compose_uninstall:

Uninstall
================

| This section explains how to uninstall Exastro.


Uninstall preparation
----------------------

.. warning::
  | We recommend that back up the data before uninstalling.
  | The backup target is :file:`~/exastro-docker-compose/.volumes`.


Uninstall Execute
-----------------

Start uninstall
^^^^^^^^^^^^^^^^^^^^

.. _docker_compose_uninstall_all:

Deleting Container and Data
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Deletes the Container image as well.

.. code-block:: bash
   :caption: Command

   sh <(curl -sf https://ita.exastro.org/setup) remove -c


.. _docker_compose_uninstall_container:

Leaving the Container image
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Delete Container
****************

.. code-block:: bash
   :caption: Command

   sh <(curl -sf https://ita.exastro.org/setup) remove

Delete Volume
*************

.. code-block:: bash
   :caption: Command

   docker volume rm $(docker volume ls -qf dangling=true)

   # Confirm that the Volume has been deleted
   docker volume ls

Delete .volumes
****************

.. code-block:: bash
   :caption: Command

   cd ~/exastro-docker-compose

   sudo rm -rf .volumes

Recreate .volumes
*****************

.. note::
   | Make sure to run the command below if re-installing.

.. code-block:: bash
   :caption: Command

   cd ~/exastro-docker-compose

   git checkout .volumes
