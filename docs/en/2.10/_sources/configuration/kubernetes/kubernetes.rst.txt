=====================
Kubernetes cluster
=====================

Introduction
============

| This document aims to explain how to construct the Exastro IT Automation's deploy destination, the Kubernetes cluster, using Kubespray.


Pre-requisites
==============

- The user must have an Ansible execution environment that can use Kubespray.
- The user must have somewhere to install the Kubernetes cluster (This guide uses the following OS: :kbd:`Red Hat Enterprise Linux 8`).

Kubernetes cluster structure
============================

This guide follows steps noted on the official website. The steps might change depending on the Kubernetes version.

Official site: https://kubernetes.io/ja/docs/setup/production-environment/tools/kubespray/

Preparing the Ansible environment
---------------------------------

Install tools
~~~~~~~~~~~~~~~~~~~~

| Install the following tools to the Kubespray execution environment.

#. | Change to root user

   .. code-block:: bash
      :caption: Command

      sudo su -

#. | Install Python3.9

   .. code-block:: bash
      :caption: Command

      yum -y install python39

#. | Install pip3.9

   .. code-block:: bash
      :caption: Command

      pip3.9 install ruamel-yaml

#. | Install git

   .. code-block:: bash
      :caption: Command

      yum -y install git

.. note::
   | The steps can be skipped if the different softwares are already installed.

Configure HOST
~~~~~~~~~~~~~~

| Next, we will register the destination inforamtion to the HOSTS.
| ※In this guide, we will use 3 Kubernetes clusters.

.. code-block:: bash
   :caption: Command

   vi /etc/hosts

.. code-block:: text
   :name: /etc/hosts
   :caption: hosts

   # Add Kubernetes cluster information
   192.168.1.1 ha-conf-k8s-01.cluster.local ha-conf-k8s-01
   192.168.1.2 ha-conf-k8s-02.cluster.local ha-conf-k8s-02
   192.168.1.3 ha-conf-k8s-03.cluster.local ha-conf-k8s-03

.. note::
   | Chabnge the Cluster names and IP addresses accordingly.

Create SSH key
~~~~~~~~~~~~~~

.. code-block:: bash
   :caption: Command

   ssh-keygen -t rsa


| Deploy the SSH key ( :file:`/root/.ssh/id_ras.pub` ) in the cluster.


Install Kubespray
~~~~~~~~~~~~~~~~~~~~~

| Install Kubespray using :kbd:`git clone`.

.. code-block:: bash
   :caption: Command

   git clone https://github.com/kubernetes-sigs/kubespray.git -b release-2.23

   cd kubespray/

   pip3.9 install -r requirements.txt

If it outputs :kbd:`Successfully installed`, :kbd:`Kubespray` has been installed successfully.


Kubernetes cluster preparation
----------------------------------

| Follow the following steps for all the Kubernetes cluster environments.

Activating IPv4 forwarding
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. | Change to Root user

   .. code-block:: bash
      :caption: Command

      sudo su -

#. | Rewrite :file:`/etc/sysctl.conf`

   | Add the following line; net.ipv4.ip_forward=1

   .. code-block:: bash
      :caption: Command

      vi /etc/sysctl.conf

   .. code-block:: diff
      :name: /etc/sysctl.conf
      :caption: sysctl.conf

      # sysctl settings are defined through files in
      # /usr/lib/sysctl.d/, /run/sysctl.d/, and /etc/sysctl.d/.
      #
      # Vendors settings live in /usr/lib/sysctl.d/.
      # To override a whole file, create a new file with the same in
      # /etc/sysctl.d/ and put new settings there. To override
      # only specific settings, add a file with a lexically later
      # name in /etc/sysctl.d/ and put new settings there.
      #
      # For more information, see sysctl.conf(5) and sysctl.d(5).
      +net.ipv4.ip_forward=1

#. | Install/Deactivate firewall

   .. code-block:: bash
      :caption: Command

      dnf install firewalld

      disable firewalld

      stop firewalld

      status firewalld

#. | Deactivate SELinux

   | Confirm current status

   .. code-block:: bash
      :caption: Command

      getenforce

   | The next step can be skipped if it says "Disabled".

   | Configure the SELINUX=disabled option

   .. code-block:: bash
      :caption: Command

      vi /etc/selinux/config

   .. code-block:: diff
      :caption: sysctl.conf

      # This file controls the state of SELinux on the system.
      # SELINUX= can take one of these three values:
      #       enforcing - SELinux security policy is enforced.
      #       permissive - SELinux prints warnings instead of enforcing.
      #       disabled - No SELinux policy is loaded.
      +SELINUX=disabled
      # SELINUXTYPE= can take one of these two values:
      #       targeted - Targeted processes are protected,
      #       mls - Multi Level Security protection.
      SELINUXTYPE=targeted

   | Reboot the system after finishing configuring the settings.

   .. code-block:: bash
      :caption: Command

      reboot

   | Check that it says "Disabled".

   .. code-block:: bash
      :caption: Command

      getenforce

Install Kubernetes
----------------------

| In the Ansible execution environment, follow the following steps  to install Kubernetes to the Kubernetes cluster environments.

Create hosts.yml
~~~~~~~~~~~~~~~~

| The Kubernetes clusters are created based on the contents of the :file:`hosts.yml` file.
| First, follow the steps below to create the :file:`hosts.yml` file.

#. | Change to Root user

   .. code-block:: bash
      :caption: Command

      sudo su -

#. | Change the directory to the :kbd:`git cloned` Kubespray folder.

   .. code-block:: bash
      :caption: Command

      cd kubespray/

#. | Copy the sample inventory file.

   .. code-block:: bash
      :caption: Command

      cp -rfp inventory/sample inventory/k8s_cluster

#. | Configure the IP variable for the Kubernetes clusters

   .. code-block:: bash
      :caption: Command

      declare -a IPS=(192.168.1.1 192.168.1.2 192.168.1.3)

#. Create :file:`hosts.yml`

   .. code-block:: bash
      :caption: Command

      CONFIG_FILE=inventory/k8s_cluster/hosts.yml python3.9 contrib/inventory_builder/inventory.py ${IPS[@]}

#. Confirm :file:`hosts.yml`

   .. code-block:: bash
      :caption: Command

      cat inventory/k8s_cluster/hosts.yml

Edit the hosts.yml file
~~~~~~~~~~~~~~~~~~~~~~~
| Replace the contents of the :file:`hosts.yml` with the information that will create the Kubernetes clusters.
| In this guide, we will configure the Kubernetes clustesr to work as Controle planes and work nodes.

.. literalinclude:: literal_includes/hosts.yml
   :caption: hosts.yml
   :language: yaml
   :linenos:

Configure proxy
~~~~~~~~~~~~~~~
| If the user needs to use a proxy, they must edit the file below.

- :file:`inventory/k8s_cluster/group_vars/all/all.yml`

Installing Kubernetes
~~~~~~~~~~~~~~~~~~~~~

| Execute Kubesparay and install Kubernetes to the Kubernetes cluster environments.

.. code-block:: bash
   :caption: Command

   ansible-playbook -i inventory/k8s_cluster/hosts.yml --become --become-user=root cluster.yml --private-key=~/.ssh/id_rsa -e "download_retries=10" | tee ~/kubespray_$(date +%Y%m%d%H%M).log

| This step may take 20-30 minutes depending on the environment and the number of clusters.

Confirm Kubernetes environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
| After the previous step has finished, connect to the created Kubernetes cluster environment and run the following command to check the control planes and worker nodes.

.. code-block:: bash
   :caption: Command

   kubectl get nodes

| If the results displays something similar to the example below, you are finished.

.. code-block:: bash
   :caption: Results

   NAME             STATUS   ROLES           AGE     VERSION
   v2ha-k8s-node1   Ready    control-plane   8m48s   v1.27.7
   v2ha-k8s-node2   Ready    control-plane   7m28s   v1.27.7
   v2ha-k8s-node3   Ready    control-plane   7m17s   v1.27.7
