============
Ansible Core
============


Introduction
============

| This guide aims to explain the system configuration and environment needed to operate Exastro IT Automation (hereinafter referred to as ITA)'s Ansible connectivity function (referred to as Ansible Driver)
| This guide will also explain system configurations and environments for using Ansible Core as an execution engine.
|
| For Ansible Automation Platform configurations, please see :doc:`./ansible_automation_platform`.
|
| Exastro IT Automation must be installed in order to use the ITA Ansible driver.
| For instructions on how to install Exastro IT Automation, please see :doc:`../../installation/online/exastro/kubernetes`.


System configuration
====================

| The Ansible driver is a standard function available when deploying Exastro IT Automation.
|
| Ansible Core configurations allows for simple Ansible executions.
|
| The diagram below illustrates an Ansible Core configuration pattern.

System configuration pattern
----------------------------

.. list-table:: System configuration pattern
   :widths: 50 50 50
   :header-rows: 1
   :align: left

   * - Configuration
     - Description
     - Ansible scaleout
   * - Ansible Core
     - Configuration where the Exastro IT Automation system and Ansible Core is on the same environment
     - ○ (Limited to Kubernetes environments)


System configuration diagram
--------------------------------------------------------

.. figure:: /images/ja/diagram/ansible_core.png
    :alt: Ansible Core
    :width: 600px

    Ansible Core

.. list-table:: System communication requirements
   :widths: 10 20 20 40 80
   :header-rows: 1
   :align: left

   * - | Coomunication Number
       | ※1
     - FROM
     - TO
     - | Protocol
       | (Port number※2)
     - Main application
   * - ①
     - Ansible Core
     - Storage device
     - | File system, NFS, iSCSI, etc.
       | (Storage I/O、Protocol connection ports)
     - | Links Ansible command execution information(Playbook host_vars etc.)
   * - ②
     - Ansible Core
     - Target device
     - | Any
       | (22/tcp(ssh), 23/tcp(telnet) etc. ※3）
     - Runs commands to target device.

| ※1 The communication numbers corresponds to the numbers illustrated in the Ansible Core configuration diagram.
| ※2 The port numbers written are standard port numbers.
| ※3 These are examples. The protocols depends on the Ansible module.


System requirements
===================

| The system requirements for Ansible driver are based on the ITA System requirements. See :doc:`../../installation/online/exastro/kubernetes` for more information.


Playbook link
=============

| The following diagram illustrates the Playbook links between ITA and Ansible Core.
| Exastro IT Automation relay connects with filesystems so it can work with Playbooks and Parameter values.

.. figure:: /images/ja/diagram/playbook_link_containers.png
   :alt: Exastro IT Automation and Ansible Core file link diagram
   :width: 750px

   Exastro IT Automation and Ansible Core file link diagram


Initial settings
================

| After installing Ansible Core, make sure to prepare a shared directory that can be accessed by both Exastro IT Automation and Ansible Core.
| The shared directory should be created within the volume created in this manual;:ref:`persistent_volume`.

