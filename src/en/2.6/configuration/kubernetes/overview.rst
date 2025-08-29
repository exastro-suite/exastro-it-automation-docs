========
Overview
========

Introduction
============

| This guide aims to explain Kubernetes, a container operation management tool usable by the Exastro system.

Features
========

| The Exastro system operates on multiple containers. By using Kubernetes, userse can achieve a system architecture with higher availability amd services levels.

Availability
============

Automatic restoring
-------------------

| In the Exastro system, we can automatically restore the container by using Probe, the Kubernetes health-check function.
| By configuring Probe, the container status will be checked. We can then automatically reboot the system when a backup occurs.

| Probe are configured to the following front-end type containers.

- platform-auth
- platform-api
- platform-web
- ita-api-admin
- ita-api-organization
- ita-api-oase-receiver
- ita-web-server

.. warning::

   | As Probe is a Kubernetes function, it can only be used if Exastro is  :doc:`installed using Kubernetes<../../installation/online/exastro/kubernetes>`.

   | There are 3 types of Probes, Startup Probe, Liveness Probe and Readiness Probe.
   | Each container runs HTTP GET request to their own endpoint every 10 seconds to health-check themselves.
   | At initial startup, the container will restart if the Startup Probe fails 30 times. After that, the container will restart if the Liveness Probe fails 3 times.

.. list-table:: Probe types
   :widths: 20, 80
   :header-rows: 1
   :align: left

   * - Probe
     - Description
   * - Startup Probe
     - The Liveness Probe and Readiness Probe checks are deactivated until the Startup Probe succeeds.
   * - Liveness Probe
     - Checks whether to reboot the container or not.
   * - Readiness Probe
     - Checks if the Container is in a state to recieve traffic or not.

.. list-table:: Startup Probe setting value
   :widths: 30, 40, 30
   :header-rows: 1
   :align: left

   * - Parameter
     - Description
     - Setting value
   * - httpGet.path
     - Specifies path with HTTP GET request.
     - (Path for health-checks)
   * - httpGet.port
     - Specifies port with HTTP GET request.
     - port-http
   * - timeoutSeconds
     - Specifies Probe timeout(seconds).
     - 30
   * - periodSeconds
     - Specifies Probe interval time(seconds).
     - 10
   * - successThreshold
     - Specifies smallest number for Probe success.
     - 1
   * - failureThreshold
     - Specifies smallest number for Probe failure.
     - 30

.. list-table:: Liveness Probe setting value
   :widths: 30, 40, 30
   :header-rows: 1
   :align: left

   * - Parameter
     - Description
     - Setting value
   * - httpGet.path
     - Specifies path with HTTP GET request.
     - (Path for health-checks)
   * - httpGet.port
     - Specifies port with HTTP GET request.
     - port-http
   * - timeoutSeconds
     - Specifies Probe timeout(seconds).
     - 30
   * - periodSeconds
     - Specifies Probe interval time(seconds).
     - 10
   * - successThreshold
     - Specifies smallest number for Probe success.
     - 1
   * - failureThreshold
     - Specifies smallest number for Probe failure.
     - 3


.. list-table:: Readiness Probe setting value
   :widths: 30, 40, 30
   :header-rows: 1
   :align: left

   * - Parameter
     - Description
     - Setting value
   * - httpGet.path
     - Specifies path with HTTP GET request.
     - (Path for health-checks)
   * - httpGet.port
     - Specifies port with HTTP GET request.
     - port-http
   * - timeoutSeconds
     - Specifies Probe timeout(seconds).
     - 30
   * - periodSeconds
     - Specifies Probe interval time(seconds).
     - 10
   * - successThreshold
     - Specifies smallest number for Probe success.
     - 1
   * - failureThreshold
     - Specifies smallest number for Probe failure.
     - 3
