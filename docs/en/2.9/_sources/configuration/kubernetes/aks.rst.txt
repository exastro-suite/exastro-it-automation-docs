========================
Azure Kubernetes Service
========================

Introduction
============

| This guide aims to explain how to set up Azure Kubernetes Service (AKS) cluster where Exastro IT Automation will be deployed.


Prerequisites
=============

- Azure CLI must be available.
- The user must have permission to do the actions written in this manual.

AKS cluster configuration
=========================


AKS cluster example
--------------------

| This section serves as an example on how to create an AKS cluster in order to connect to the Exastro Suite deployed to the AKS environment
| Make sure to check settings and input values suited for your own environment.

#. Start

   | This section explains how to configure External IP and register DNS to the Exastro Platform service so it access through the internet.
   | This guide will also contain steps on how to create a Public IP prefix, as it is required in order to confiure External IPs.
   | While there are way to create Public IP Prefixes using GUI, this guide will show you how to do it using Azure CLI.

#. Configure Variables

   | Define parameters when creating the clsuter.

   .. csv-table::
    :header: Variable, Description
    :widths: 30, 30

      RESOURCE_GROUP, Name of the resource group
      CLUSTER_NAME, Name of AKS cluster
      PUBLIC_IP_PREFIX_NAME, Public IP Prefix name
      AUTHORIZED_IP_RANGES, Set Source IP Address

   | Configure the variables needed in order to run commands.

   .. warning::
    | The following parameters are examples. Change the values to fit your environment.

   .. code:: bash

      # Name of the resource group
      RESOURCE_GROUP=exastro-suite-group
      # Name of AKS cluster
      CLUSTER_NAME=exastro-suite

      # Public IP Prefix name
      PUBLIC_IP_PREFIX_NAME=${CLUSTER_NAME}-ipprefix
      # Set Source IP Address
      AUTHORIZED_IP_RANGES=xxx.xxx.xxx.xxx/31

#. Create Public IP Prefix.

   .. code:: bash

      # Issue Public IP Address
      az network public-ip prefix create \
        --resource-group ${RESOURCE_GROUP} \
        --name ${PUBLIC_IP_PREFIX_NAME} \
        --length 31 \
        --location japaneast

      # Store Public IP Prefix results in Variables
      PUBLIC_IP_PREFIX_ID=$(az network public-ip prefix show --resource-group ${RESOURCE_GROUP} --name ${PUBLIC_IP_PREFIX_NAME} --query id --output tsv)
      AUTHORIZED_IP_RANGES+=,$(az network public-ip prefix show --resource-group ${RESOURCE_GROUP} --name ${PUBLIC_IP_PREFIX_NAME} --query ipPrefix --output tsv)

#. Create AKS cluster

   .. code:: bash

      # Create AKS cluster
      az aks create \
        --resource-group ${RESOURCE_GROUP} \
        --name ${CLUSTER_NAME} \
        --generate-ssh-keys \
        --kubernetes-version 1.23.8 \
        --node-count 1 \
        --node-vm-size Standard_D4a_v4 \
        --os-sku Ubuntu \
        --enable-node-public-ip \
        --node-public-ip-prefix-id ${PUBLIC_IP_PREFIX_ID} \
        --enable-addons http_application_routing \
        --api-server-authorized-ip-ranges ${AUTHORIZED_IP_RANGES}

.. _aks-dns:

Confirm Domain name
-------------------

| Check the domain name in order to connect to the AKS cluster from the internet.

.. code:: bash

   # Gather domain name configured to AKS cluster
   az aks show -g ${RESOURCE_GROUP} -n ${CLUSTER_NAME} --query addonProfiles.httpApplicationRouting.config.HTTPApplicationRoutingZoneName -o table

::

   Result
   ----------------------------------------
   xxxxxxx.japaneast.aksapp.io

| ※The output domain will also be used in configurations when using Ingress.

| When the AKS cluster configuration has finished, follow the  :doc:`../../installation/online/exastro/kubernetes` manual and install Exastro IT Automation.
