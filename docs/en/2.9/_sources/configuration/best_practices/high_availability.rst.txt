======================
High Availability (HA)
======================

| This document aims to explain the Exastro system's High Availability.
| Container orchestra storages such as Kubernetes becomes essential when using high availability architectures.

Goal
====
| When using Exastro to automate different tasks, users might need an architecture with high availability (for stable workloads)
| In order to achieve this, using the Kubernetes container orchestration becomes essential.
| Note that since constructing Exastro system with HA using the Container orchestration can be complicated,
| this document contains a sample and a diagram to make it a bit easier for the user to construct.


Structure diagram
=================


Target
======
| The scope of HA in this document contains the Load balancer, Reverse proxy and Exastro application (persistent data).
| ※The document does not contain any information regarding high availability for container orchestrations.


Exastro application
=======================

| High availability for the Exastro system application can be achieved with redundant configurations.
| ※In Exastro IT Automation Ver.2.4.0, some of the backend processes are not compatible with high availability. Support for said processes will be added in later versions.
| Users can configure the amount of replicas and the Pod's affinity settings to achieve a redundant configuration.

Load balancer/Reverse proxy
==================================

Storage
==========

