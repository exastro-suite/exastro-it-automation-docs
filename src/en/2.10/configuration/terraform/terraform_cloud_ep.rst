==================
Terraform Cloud/EP
==================


Introduction
============

| This guide aims to explain the system configuration and environment needed to operate  Exastro IT Automation (hereinafter referred to as ITA)'s Terraform Cloud/Enterprise connectivity function.
|
| Exastro IT Automation must be installed in order to use the Terraform Cloud/EP driver.
| For instructions on how to install Exastro IT Automation, please see :doc:`../../installation/online/exastro/kubernetes`.


System configuration
====================

| The Terraform Cloud/EP driver is only provided if selected when deploying Exastro IT Automation.
|
| In order to use Terraform, the user must have Terraform Enterprise on a server different from the ITA server or be using Terraform Cloud.
| If the Terraform Automated configuration's execution target is on-premise and cannot directly be connected from the cloud, you might want to consider using a configuration that uses Terraform Cloud Agents.

|
| The diagram below illustrates a configuration pattern using Terraform Cloud/EP.


System configuration diagram
----------------------------

.. figure:: /images/ja/diagram/terraform_cloud_ep.png
    :alt: Terraform Cloud/EP Systen configuration diagram
    :width: 800px

    Terraform Cloud/EP system configuration diagram

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
       | (Web/AP function)
     - | Terraform
       | ※3
     - | https
       | [443/tcp]
     - | ・Registers Organization/Workspaces from ITA to Terraform.
       | ・Gathers Organizations/Workspaces/Policies/Policy sets in ITA.
   * - ②
     - | ITA server
       | (Backyard function)
     - | Terraform
       | ※3
     - | https
       | [443/tcp]
     - | Runs Plan/PolicyCheck/Apply to Terraform or acquires their results when running operations.
   * - ③
     - | Terraform
       | ※3
     - Target device
     - | Any
       | (Depends on the Terraform provider)
     -  Runs commands and submits API from Terraform to target devices/ cloud service
   * - ④-1
     - Terraform Cloud Agents
     - | Terraform
       | ※3
     - | https
       | [443/tcp]
     - API connects to the Terraform system from the Terraform Cloud Agent.
   * - ④-2
     - Terraform Cloud Agents
     - Target device
     - | Any
       | (Depends on the Terraform provider)
     - Runs commands and submits API from Terraform to target devices/ cloud service


| ※1 The communication numbers corresponds to the numbers illustrated in the Terraform Cloud/EP configuration diagram.
| ※2 The port numbers written are standard port numbers.
| ※3 "Terraform" in this manual can specify both Terraform Enterprise and Terraform cloud


System requirements
===================

| The system requirements for Terraform Cloud/EP driver are based on the ITA System requirements. See :doc:`../../installation/online/exastro/kubernetes` for more information.
| This section covers the system requirements for Terraform Enterprise and Terraform cloud.

.. list-table:: Confirmed compatible Terraform versions
   :widths: 1 1 2
   :header-rows: 1
   :align: left

   * - | System
     - | Terraform version
     - | Caution
   * - | Terraform Enterprise
     - | ・1.4.6
       | ・1.1.0
     - |
   * - | Terraform Cloud
     - | ・1.4.6
       | ・1.4.0
     - |


.. _configuration_terraform_cloud_ep_initial_setting:

Initial settings
================

| In order to link with Terraform Cloud/EP driver from Terraform, the user must issue a User token from Terraform.
| Log in to Terraform through a web browser and press the [Create an API token] button under  [User Settings] > [Tokens].


.. figure:: /images/ja/terraform_cloud_ep_driver/common/create_user_token.png
    :alt: Issue User token
    :width: 800px

    Issue User token

| The user token must be registered to the Exastro IT Automation system.
