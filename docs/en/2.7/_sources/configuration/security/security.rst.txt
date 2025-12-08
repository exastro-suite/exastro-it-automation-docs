============
Security
============

Introduction
------------

| We recommend implementing seperate measures for system risks that the Exastro system cannot deal with alone.
| This document contains information regarding the different security measure that the system administrator should consider.


Security measures
--------------------

| Install and implement the following security measures if needed.

.. table:: User measures for Security risks
   :widths: 10 10 10 25
   :align: left

   +---------------------+----------------------------------------+----------------------------------------+----------------------------------------------------------------------+
   | Category            | Security threat                        | Measure type                           | Measure                                                              |
   +=====================+========================================+========================================+======================================================================+
   | Unauthorized access | Brute force attacks, Dictionary attac\ | Fraud monitoring/Tracking authenticat\ | Measure using Keycloack account settings.\                           |
   |                     | ks, Rainbow attacks, Password list at\ | ion methods                            |                                                                      |
   |                     | tacks, etc.                            |                                        | Identify Unauthorized access with :ref:`security_audit_log_get`.     |
   +---------------------+----------------------------------------+----------------------------------------+----------------------------------------------------------------------+
   | Impersonation       | Social engineering, replay attacks, e\ | Usage of personal information          | Apply for all organizations \                                        |
   |                     | call                                   |                                        | `two-factor authentication`.                                         |
   |                     +----------------------------------------+----------------------------------------+                                                                      |
   |                     | IP spoofing, MAC address spoofing, etc.| Device impersonation                   |                                                                      |
   |                     |                                        |                                        |                                                                      |
   |                     +----------------------------------------+----------------------------------------+----------------------------------------------------------------------+
   |                     | Session Hijacking, etc.                | Web/Network measure                    | Implement Web Application Firewall(WAF).                             |
   +---------------------+----------------------------------------+----------------------------------------+----------------------------------------------------------------------+
   | Tapping/Bugging     | Directory traversal, etc.              | Web measure                            | Implement Web Application Firewall(WAF).                             |
   |                     |                                        |                                        |                                                                      |
   +---------------------+----------------------------------------+----------------------------------------+----------------------------------------------------------------------+
   | Denial of Service   | DDoS attacks, Reflector attacks \      | Network measure                        | Implement IDS/IPS.                                                   |
   |                     | HTTP Flood attacks, Volumetric attack\ |                                        |                                                                      |
   |                     | s, etc.                                |                                        |                                                                      |
   +---------------------+----------------------------------------+----------------------------------------+----------------------------------------------------------------------+
   | Attacks aimed at v\ | SQL injection, cross-site scripting \  | Web measure                            | Implement Web Application Firewall(WAF).                             |
   | ulnerabilities      | (XSS), cross-site request forgery \    |                                        |                                                                      |
   |                     | (CSRF), etc.                           |                                        |                                                                      |
   |                     +----------------------------------------+----------------------------------------+----------------------------------------------------------------------+
   |                     | Buffer overflow, remote code executio\ | System target                          | Implement Web Application Firewall(WAF).                             |
   |                     | n, zero-day attacks, etc.              |                                        |                                                                      |
   |                     |                                        |                                        |                                                                      |
   |                     +----------------------------------------+----------------------------------------+----------------------------------------------------------------------+
   |                     | ARP spoofing, DNS spoofing, Domain n\  | Network measure                        | Implement Web Application Firewall(WAF).                             |
   |                     | ame hijack attacks, etc.               |                                        |                                                                      |
   |                     |                                        |                                        |                                                                      |
   |                     +----------------------------------------+----------------------------------------+----------------------------------------------------------------------+
   |                     | Route kit attacks, etc.                | Virus measure                          | Implement Anti-virus software.                                       |
   +---------------------+----------------------------------------+----------------------------------------+----------------------------------------------------------------------+

.. warning::
   | We recommend configuring the Exastro Platform authentication function's option parameters for :menuselection:`Endpoint for service(EXTERNAL_URL)` and :menuselection:`Endpoint for System management(EXTERNAL_URL_MNG)` seperately from each other to prevent unauthorized access.
   | For more information, see :doc:`../../../installation/index`.
