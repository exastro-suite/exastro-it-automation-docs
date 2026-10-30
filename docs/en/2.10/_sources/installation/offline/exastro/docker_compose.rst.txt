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

===================================
Exastro on Docker Compose - Offline
===================================

Introduction
============

| This document aims to explain how to install Exastro Platform or Exastro IT Automation on Docker or Podman.

Features
========

| This is the easiest and simplest way of installing Exastro IT Automation
| For higher availability and service level, we recommend :doc:`Kubernetes version<kubernetes>`

Pre-requisites
==============

| The server that is collecting files must be able to run :command:`docker`. (When using Podman, the podman-docker must be installed.)
| The construction status (OS version and installed pakcages) for both the file collecting environment and the installing environment must be the same.

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
     - 40GB

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

  .. warning::
    | The required resources for the minimum configuration are for Exastro IT Automation's core functions. Additional resources will be required if you are planning to deploy external systems, such as GitLab and Ansible Automation Platform.
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


- Applications

  | The user must be able to run :command:`curl` and :command:`sudo` commands.

.. warning::
   | The Exastro process must be able to be run with normal user permissions (it is not possible to install with root user).
   | Any normal users must be sudoer and have complete permissions.

.. _docker_prep_offline:

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


General flow
============
| After preparing the online environment, the user can now install on to the offline system.

.. figure:: /images/ja/installation/docker_compose/flowimage.png
   :width: 800px
   :alt: Flow image

Online environment
^^^^^^^^^^^^^^^^^^^^^^

| ①Download Container image
| ②Download RPM packages
| ③Download docker-compose resources
| ④Download Exastro resources


Offline environment
^^^^^^^^^^^^^^^^^^^^^^
| ⑤Install RPM packages
| ⑥Upload Container image
| ⑦Install docker-compose resources
| ⑧Install Exastro resources
| ⑨Boot Exastro ITA


Guide for Online environment(Environment that can connect to the internet)
==========================================================================

| First, fetch the files.
| In the following example, the user is "test_user" and the home directory is /home/test_user.

①Upload container image
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Create the container image list and the shell script that will download the container image in a partition that has over 25GB space.
| These two must be created in the same directory.
| The save.sh's ["x.x.x"]="x.x.x" contains both the Exastro IT Automation App Version and the Exastro Platform App Version.
| Refer to the `Component version <https://github.com/exastro-suite/exastro-helm?tab=readme-ov-file#component-version>`_ and replace them with the newest versions.

.. code-block:: shell
   :caption: Command

   vi save.sh


.. code-block:: shell
   :caption: Copy and paste the code below and rewrite the version

   #!/bin/bash

   ITA_VERSION=$1
   declare -A PF_VERSION=(
     ["x.x.x"]="x.x.x"
   )
   if [ ! -d $1 ]; then
     mkdir $ITA_VERSION
   fi

   readarray -t image_list < "./image.list"
   for image in ${image_list[@]}
   do
     image_fullname=$(echo ${image} | sed -e "s/#__ITA_VERSION__#/${ITA_VERSION}/" -e "s/#__PF_VERSION__#/${PF_VERSION[$ITA_VERSION]}/")
     image_name=$(basename ${image_fullname} | sed -e "s/:/-/")
     if [ ! -e ${ITA_VERSION}/${image_name}.tar.gz ]; then
       echo $image_fullname $image_name
       docker pull ${image_fullname}
       if [ $? -eq 0 ]; then
         docker save ${image_fullname} | gzip -c > ${ITA_VERSION}/${image_name}.tar.gz
       fi
     fi
   done



.. code-block:: shell
   :caption: Command

   vi image.list

.. code-block:: shell
   :caption: Copy and paste the following code

   docker.io/mariadb:10.9.8
   docker.io/mariadb:10.11.4
   docker.io/gitlab/gitlab-ce:15.11.13-ce.0
   docker.io/mongo:6.0.7
   docker.io/exastro/keycloak:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-auth:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-web:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-api:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-job:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-migration:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-migration:#__PF_VERSION__#
   docker.io/exastro/exastro-it-automation-api-organization:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-api-admin:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-api-oase-receiver:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-web-server:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-agent:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-execute:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-execute-onpremises:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-legacy-role-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-legacy-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-pioneer-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-towermaster-sync:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-collector:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-conductor-synchronize:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-conductor-regularly:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-menu-create:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-menu-export-import:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-excel-export-import:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cloud-ep-execute:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cloud-ep-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cli-execute:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cli-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-hostgroup-split:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-cicd-for-iac:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-oase-conclusion:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-execinstance-dataautoclean:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-file-autoclean:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-migration:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-agent:#__ITA_VERSION__#


.. tabs::

   .. group-tab:: docker

      If the user is not added to a group, and permission error might occur.
      The following is not required if done in advanced.


      .. code-block:: shell
         :caption: Command

         cat /etc/group | grep docker
         #If the user is not added to any groups, run the following.
         sudo usermod -aG docker ${USER}
         cat /etc/group | grep docker
         #Check that the user has been added to the group and reboot the server.
         sudo reboot


      After connecting to an online environment, run the following shell script and download the container image.
      The parameter specifies the version of ITA. This command can take several minutes before finishing(Depends on the server specs and the connection speeds).


      .. code-block:: shell
         :caption: Command

         sudo systemctl start docker
         sudo chmod a+x save.sh
         sh ./save.sh x.x.x


   .. group-tab:: podman

      Run the following shell script and download the container image.The parameter specifies the version of ITA
      The parameter specifies the version of ITA. This command can take several minutes before finishing(Depends on the server specs and the connection speeds).

      .. code-block:: shell
         :caption: Command

         sudo chmod a+x save.sh
         sh ./save.sh x.x.x

②Download RPM packages
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|	Download the RPM packages.

.. tabs::

   .. group-tab:: docker

      | In the example below, the download destination directory is set to /tmp/docker-repo, and the installation destination directory is set to /tmp/docker-installroot.

      .. code-block:: shell
         :caption: Command

         #Add repository
         sudo dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo
         #Confirm current OS version
         cat /etc/os-release
         #Specify version fetched above for  --releasever=x.x.
         sudo dnf install -y --downloadonly --downloaddir=/tmp/docker-repo --installroot=/tmp/docker-installroot --releasever=x.x docker-ce docker-ce-cli containerd.io git container-selinux


      | Install createrepo.

      .. code-block:: shell
         :caption: Command

         sudo dnf install -y createrepo


      | Create local repository.
      |	Since its not possible to access an online repository server from an offline environment, it is not possible to install packages with dnf.
      |	It is only possible to install them with dnf if we add the packages to a local repository.

      .. code-block:: shell
         :caption: Command

         sudo createrepo /tmp/docker-repo


   .. group-tab:: podman


      | In this example, the download destination directory is /tmp/podman-repo, and the install destination directory is /tmp/podman-installroot.

      .. code-block:: shell
         :caption: Command

         #Confirm current OS version
         cat /etc/os-release
         #Specify version fetched above for  --releasever=x.x.
         sudo dnf install -y --downloadonly --downloaddir=/tmp/podman-repo --installroot=/tmp/podman-installroot --releasever=x.x container-selinux git podman podman-docker


      | Install createrepo.

      .. code-block:: shell
         :caption: Command

         sudo dnf install -y createrepo


      | Create local repository.
      |	Since its not possible to access an online repository server from an offline environment, it is not possible to install packages with dnf.
      |	It is only possible to install them with dnf if we add the packages to a local repository.

      .. code-block:: shell
         :caption: Command

         sudo createrepo /tmp/podman-repo


③Download docker-compose resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| Download `docker-compose-linux-x86_64 <https://github.com/docker/compose/releases>`_.
| Change the URL to fit the user's desired version.
| The version used in the example below is version 2.28.0.

.. code-block:: shell
   :caption: Command

   curl -LO https://github.com/docker/compose/releases/download/v2.28.0/docker-compose-linux-x86_64


④Download Exastro resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|	Download the docker-compose version's Exastro resources.
| The following example downloads to the /tmp directory.


.. code-block:: shell
   :caption: Command

   cd /tmp
   curl -OL https://github.com/exastro-suite/exastro-docker-compose/archive/main.tar.gz



Transfer files
^^^^^^^^^^^^^^
| Transfer the files fetched in the online environment and to the offline environment with storage mediums such as FPT, SCP and SFTP.
| Feel free to zip the files if they are too big.
| The transfer files and their destinations are as following.


- Container image:Free directoy
- RPM Package: below /tmp
- Exastro resource:Under normal user's home directory
- docker-compose-linux-x86_64:/usr/local/bin


Offline environment(Environment unable to connect to the internet)
==================================================================

| After the steps for the online environment is finished, follow the steps below to install to the offline environment.


⑤Install RPM packages
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tabs::

   .. group-tab:: docker

      | Create Local repository Configuration file.

      .. code-block:: shell
         :caption: Command

         sudo touch /etc/yum.repos.d/docker-repo.repo


      |	Write the following information to the created configuration file (※add three slashes after file:)

      .. code-block:: shell
         :caption: Command

         sudo vi /etc/yum.repos.d/docker-repo.repo

         [docker-repo]
         name=AlmaLinux-$releaserver - docker
         baseurl=file:///tmp/docker-repo
         enabled=1
         gpgcheck=0
         gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-AlmaLinux



      | Install package

      .. code-block:: shell
         :caption: Command

         sudo dnf -y --disablerepo=\* --enablerepo=docker-repo install docker-ce docker-ce-cli containerd.io git container-selinux

      | If an error mesage displays, search for the displayed modules and install all of them.


      .. code-block:: shell
         :caption: Message example

         No available modular metadata for modular package 'perl-Mozilla-CA-20160104-7.module_el8.5.0+2812+ed912d05.noarch', it cannot be installed on the system
         No available modular metadata for modular package 'perl-Net-SSLeay-1.88-2.module_el8.6.0+2811+fe6c84b0.x86_64', it cannot be installed on the system
         Error: No available modular metadata for modular package


      .. code-block:: shell
         :caption: Check all the dispalyed modules and install all of them.

         #If the target is perl-Mozilla-CA or perl-Net-SSLeay
         cd /tmp/docker-repo
         ls -l | grep -E "perl-Mozilla-CA|perl-Net-SSLeay"
         sudo dnf -y --disablerepo=\* --enablerepo=docker-repo perl-Mozilla-CA-20160104-7.module_el8.5.0+2812+ed912d05.noarch.rmp perl-Net-SSLeay-1.88-2.module_el8.6.0+2811+fe6c84b0.x86_64.rpm

      | Reinstall the packages

      .. code-block:: shell
         :caption: Command

         sudo dnf -y --disablerepo=\* --enablerepo=docker-repo install docker-ce docker-ce-cli containerd.io git container-selinux


      | Add the user to the docker group.

      .. code-block:: shell
         :caption: Command

         sudo systemctl enable --now docker
         cat /etc/group | grep docker
         sudo usermod -aG docker ${USER}
         #Confirm that the user name displays
         cat /etc/group | grep docker
         sudo  reboot
         #Reconnect to the offline environment.



   .. group-tab:: podman

      | Create the local repository's configuration file.

      .. code-block:: shell
         :caption: Command

         sudo touch /etc/yum.repos.d/podman-repo.repo


      |	Write the following information to the created configuration file (※add three slashes after file:)

      .. code-block:: shell
         :caption: Command

         sudo vi /etc/yum.repos.d/podman-repo.repo

         [podman-repo]
         name=RedHat-$releaserver - podman
         baseurl=file:///tmp/podman-repo
         enabled=1
         gpgcheck=0
         gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release


      | Install package

      .. code-block:: shell
         :caption: Command

         sudo dnf -y --disablerepo=\* --enablerepo=podman-repo install container-selinux git podman podman-docker


⑥Upload Container image
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Create the container image list and the shell script that will download the container image in a partition that has over 25GB space.
| These two must be created in the same directory. The image.list contains the same as the one created in the online environment.
| The load.sh's ["x.x.x"]="x.x.x" must be the same version written in save.sh.


.. code-block:: shell
   :caption: Command

   vi load.sh

.. code-block:: shell
   :caption: Copy and paste the code below and rewrite the version

   ITA_VERSION=$1
   declare -A PF_VERSION=(
     ["x.x.x"]="x.x.x"
   )

   readarray -t image_list < "./image.list"
   for image in ${image_list[@]}
   do
     image_fullname=$(echo ${image} | sed -e "s/#__ITA_VERSION__#/${ITA_VERSION}/" -e "s/#__PF_VERSION__#/${PF_VERSION[$ITA_VERSION]}/")
     image_name=$(basename ${image_fullname} | sed -e "s/:/-/")
     docker load < ${ITA_VERSION}/${image_name}.tar.gz
   done

   wait


.. code-block:: shell
   :caption: Command

   vi image.list

.. code-block:: shell
   :caption: Copy and paste the following code

   docker.io/mariadb:10.9.8
   docker.io/mariadb:10.11.4
   docker.io/gitlab/gitlab-ce:15.11.13-ce.0
   docker.io/mongo:6.0.7
   docker.io/exastro/keycloak:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-auth:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-web:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-api:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-job:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-migration:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-migration:#__PF_VERSION__#
   docker.io/exastro/exastro-it-automation-api-organization:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-api-admin:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-api-oase-receiver:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-web-server:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-agent:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-execute:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-execute-onpremises:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-legacy-role-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-legacy-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-pioneer-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-towermaster-sync:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-collector:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-conductor-synchronize:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-conductor-regularly:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-menu-create:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-menu-export-import:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-excel-export-import:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cloud-ep-execute:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cloud-ep-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cli-execute:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cli-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-hostgroup-split:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-cicd-for-iac:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-oase-conclusion:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-execinstance-dataautoclean:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-file-autoclean:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-migration:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-agent:#__ITA_VERSION__#


.. tabs::

   .. group-tab:: docker

      | Execute Container image.	The parameter specifies the version of ITA.

      .. code-block:: shell
         :caption: Command

         sudo chmod a+x load.sh
         sh ./load.sh x.x.x


   .. group-tab:: podman

      | Execute Container image.	The parameter specifies the version of ITA.

      .. code-block:: shell
         :caption: Command

         sudo systemctl start podman
         sudo chmod a+x load.sh
         sh ./load.sh x.x.x


⑦Install docker-compose resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|	 Add required permissions to the docker-compose-linux-x86_64 in /usr/local/bin.

.. code-block:: shell
   :caption: Command

   cd /usr/local/bin
   sudo mv docker-compose-linux-x86_64 docker-compose
   sudo chmod a+x /usr/local/bin/docker-compose
   sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose


⑧Install Exastro resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Extract the docker-compose version's Exastro resources under the home directory of a normal user. After that, change the directory name to exastro-docker-compose.


.. code-block:: shell
   :caption: Command

   tar -zxvf main.tar.gz
   sudo mv exastro-docker-compose-main exastro-docker-compose


.. tabs::

   .. group-tab:: docker


      | Change the SELinux mode to SELINUX=permissive.


      .. code-block:: shell
         :linenos:
         :caption: Command

         sudo vi /etc/selinux/config

      .. code-block:: shell
         :caption: /etc/selinux/config example

         # This file controls the state of SELinux on the system.
         # SELINUX= can take one of these three values:
         #     enforcing - SELinux security policy is enforced.
         #     permissive - SELinux prints warnings instead of enforcing.
         #     disabled - No SELinux policy is loaded.
         # See also:
         # https://docs.fedoraproject.org/en-US/quick-docs/getting-started-with-selinux/#getting-started-with-selinux-selinux-states-and-modes
         #
         # NOTE: In earlier Fedora kernel buil, SELINUX=disabled would also
         # fully disable SELinux during boot. If you need a system with SELinux
         # fully disabled instead of SELinux running with no policy loaded, you
         # need to pass selinux=0 to the kernel command line. You can use grubby
         # to persistently set the bootloader to boot with selinux=0:
         #
         #    grubby --update-kernel ALL --args selinux=0
         #
         # To revert back to SELinux enabled:
         #
         #    grubby --update-kernel ALL --remove-args selinux
         #
         SELINUX=permissive
         # SELINUXTYPE= can take one of these three values:
         #     targeted - Targeted processes are protected,
         #     minimum - Modification of targeted policy. Only selected processes are protected.
         #     mls - Multi Level Security protection.
         SELINUXTYPE=targeted

      .. code-block:: shell
         :caption: Command

         sudo reboot
         #Reconnect to the offline environment


      | This setup.sh is the same used in Exastro on Docker Compose - Online. Follow the steps below to comment out the repository settings.

      .. code-block:: shell
         :caption: Command

         sed -i 's/sudo dnf config-manager/#sudo dnf config-manager/' setup.sh



      | Install the Exastro Service packages and Exastro source file.

      .. code-block:: shell
         :caption: Command

         cd ~/exastro-docker-compose && sh ./setup.sh install


      | When the required packages are installed, the user should be met with an interactible installation process where they can input setting values.
      | In order to edit detailed settings, input :command:`n` or :command:`no`  and skip the next processes.
      | In order to boot the Exastro system container groups, input :command:`y` or :command:`yes`.
      | Deploying the Exastro system can take up to several minutes.(Depends on the server specs and the connection speeds)


      .. code-block:: shell
         :caption: OASE container deployment confirmation

         Deploy OASE container ? (y/n) [default: y]:

      .. code-block:: shell
         :caption: Gitlab deployment confirmation

         Deploy Gitlab containser? (y/n) [default: n]:

      .. code-block:: shell
         :caption: Password token automatic creation confirmation

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

            .. code-block:: shell
               :caption: Exastro service URL

               #Input 30800 for the port number if the OS is Red Hat Enterprise Linux. For everything else, input 80.
               Input the Exastro service URL: http://ita.example.com:30080

            .. code-block:: shell
               :caption:  Exastro management service URL

               #Input 30801 for the port number if the OS is Red Hat Enterprise Linux. For everything else, input 81.
               Input the Exastro management URL: http://ita.example.com:30081


      .. code-block:: shell
         :caption: Gitlab container URL(Required if deploying Gitlab container).

         #Specify 40080 for the port number.
         Input the external URL of Gitlab container  [default: (nothing)]:

      .. code-block:: shell
         :caption: Configuration file generation confirmation

         System parametes are bellow.

         System administrator password:    ********
         Database password:                ********
         OASE deployment                   true
         MongoDB password                  ********
         Service URL:                      http://ita.example.com:30080
         Manegement URL:                   http://ita.example.com:30081
         Docker GID:                       985
         Docker Socket path:               /var/run/docker.sock
         GitLab deployment:                false

         Generate .env file with these settings? (y/n) [default: n]


      | Reboot server

      .. code-block:: shell
         :caption: Command

         sudo reboot


      .. code-block:: shell
         :caption: Command

         cd ~/exastro-docker-compose && sh ./setup.sh install


      .. code-block:: shell
         :caption: Reconfirm .env

         #Press enter without inputting anything.
         Regenerate .env file? (y/n) [default: n]:

      .. code-block:: shell
         :caption: Exastro container deploy confirmation

         #Input y.
         Deploy Exastro containers now? (y/n) [default: n]:



      | Check that the Container STATUS says UP.

      .. code-block:: shell
         :caption: Command

         docker ps



   .. group-tab:: podman

      | Change the SELinux mode to SELINUX=permissive.


      .. code-block:: shell
         :linenos:
         :caption: Command

         sudo vi /etc/selinux/config

      .. code-block:: shell
         :caption: /etc/selinux/config example

         # This file controls the state of SELinux on the system.
         # SELINUX= can take one of these three values:
         #     enforcing - SELinux security policy is enforced.
         #     permissive - SELinux prints warnings instead of enforcing.
         #     disabled - No SELinux policy is loaded.
         # See also:
         # https://docs.fedoraproject.org/en-US/quick-docs/getting-started-with-selinux/#getting-started-with-selinux-selinux-states-and-modes
         #
         # NOTE: In earlier Fedora kernel builds, SELINUX=disabled would also
         # fully disable SELinux during boot. If you need a system with SELinux
         # fully disabled instead of SELinux running with no policy loaded, you
         # need to pass selinux=0 to the kernel command line. You can use grubby
         # to persistently set the bootloader to boot with selinux=0:
         #
         #    grubby --update-kernel ALL --args selinux=0
         #
         # To revert back to SELinux enabled:
         #
         #    grubby --update-kernel ALL --remove-args selinux
         #
         SELINUX=permissive
         # SELINUXTYPE= can take one of these three values:
         #     targeted - Targeted processes are protected,
         #     minimum - Modification of targeted policy. Only selected processes are protected.
         #     mls - Multi Level Security protection.
         SELINUXTYPE=targeted

      .. code-block:: shell
         :caption: Command

         sudo reboot
         #Reconnect to the offline environment


      | Install the Exastro Service packages and Exastro source file.

      .. code-block:: shell
         :caption: Command

         cd ~/exastro-docker-compose && sh ./setup.sh install


      | When the required packages are installed, the user should be met with an interactible installation process where they can input setting values.
      | In order to edit detailed settings, input :command:`n` or :command:`no`  and skip the next processes.
      | In order to boot the Exastro system container groups, input :command:`y` or :command:`yes`.
      | Deploying the Exastro system can take up to several minutes.(Depends on the server specs and the connection speeds)


      .. code-block:: shell
         :caption: OASE deployment confirmation

         Deploy OASE container URL? (y/n) [default: y]:

      .. code-block:: shell
         :caption: Gitlab deployment confirmation

         Deploy Gitlab containser? (y/n) [default: n]:

      .. code-block:: shell
         :caption: Password token automatic creation confirmation

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

            .. code-block:: shell
               :caption: Exastro service URL

               #Input 30800 for the port number if the OS is Red Hat Enterprise Linux. For everything else, input 80.
               Input the Exastro service URL: http://ita.example.com:30080

            .. code-block:: shell
               :caption:  Exastro management service URL

               #Input 30801 for the port number if the OS is Red Hat Enterprise Linux. For everything else, input 81.
               Input the Exastro management URL: http://ita.example.com:30081

      .. code-block:: shell
         :caption: GitLab deployment confirmation(Required if deploying Gitlab container).

         #Specify 40080 for the port number.
         Input the external URL of Gitlab container  [default: (nothing)]:

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

         Generate .env file with these settings? (y/n) [default: n]


      | Reboot server

      .. code-block:: shell
         :caption: Command

         sudo reboot


      .. code-block:: shell
         :caption: Command

         cd ~/exastro-docker-compose && sh ./setup.sh install


      .. code-block:: shell
         :caption: Confirm that .env has been regenerated

         #Press enter without inputting anything.
         Regenerate .env file? (y/n) [default: n]:

      .. code-block:: shell
         :caption: Exastro container deploy confirmation

         #Input y
         Deploy Exastro containers now? (y/n) [default: n]:


      | Check that the Container STATUS says UP.

.. code-block:: shell

      .. code-block:: shell
         :caption: Command

         podman ps


Login
========

| Confirm the username and password information of the user.


.. code-block:: shell
   :linenos:
   :caption: command

   cd ~/exastro-docker-compose
   cat .env

.. code-block:: shell
   :linenos:
   :caption: Login information

   ### Initial account information for creating system administrators
   #### Specify the username and password
   # SYSTEM_ADMIN=<Username>
   SYSTEM_ADMIN_PASSWORD=<Password>

Create Organization
==========================

| After rebooting and logging in to the system, create an organization.

.. tip::
   | When linked to GitLab, the GitLab must be running in order to create Organizations.


Create Workspace
====================

| After creating an organization, log in to it and create a workspace.
