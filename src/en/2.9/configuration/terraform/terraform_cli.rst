=============
Terraform CLI
=============


Introduction
============

| This guide aims to explain the system configuration and environment needed to operate  Exastro IT Automation (hereinafter referred to as ITA)'s Terraform CLI connectivity function (herenafter referred to as Terraform CLI driver)
|
| Exastro IT Automation must be installed in order to use the Terraform CLI driver.
| For instructions on how to install Exastro IT Automation, please see :doc:`../../installation/online/exastro/kubernetes`


System configuration
====================
| The Terraform CLI driveris only provided if selected when deploying Exastro IT Automation.
|
| The diagram below illustrates a configuration pattern using Terraform Cloud/EP.


System configuration diagram
----------------------------

.. figure:: /images/ja/diagram/terraform_cli.png
    :alt: Terraform CLI system configuration diagram
    :width: 800px

    Terraform CLI system configuration diagram

.. list-table:: System communication requirements
   :widths: 1 1 1 2 3
   :header-rows: 1
   :align: left

   * - | Communication number
       | ※1
     - FROM
     - TO
     - | Protocol
       | (Port number※2)
     - Main application
   * - ①
     - | ITA server
       | (Backyard function)
     - | Terraform CLI
     - | -
     - | Runs Terraform commands from the Backyard function.
   * - ②
     - | Terraform
     - Target device
     - | Any
       | (Depends on the Terraform provider)
     - Runs commands and submits API from Terraform to target devices/ cloud service

| ※1 The communication numbers corresponds to the numbers illustrated in the Terraform CLI configuration diagram.


System requirements
===================

| The system requirements for the Terraform CLI driver are based on the ITA System requirements. See :doc:`../../installation/online/exastro/kubernetes` for more information.
