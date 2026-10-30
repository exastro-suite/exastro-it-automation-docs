=========================
Helm オプションパラメータ
=========================

| Helm を使ってインストールする際にはコマンドラインオプション、もしくは、values.yaml 内の設定値として下記のオプションパラメータが利用できます。

Exastro Platform
================

共通設定 (認証機能)
-------------------

.. include:: ../../include/helm_option_pfGlobalDefinition.rst

共通設定 (Keycloak)
-------------------

.. include:: ../../include/helm_option_keycloakDefinition.rst

共通設定 (Exastro ITA)
----------------------
.. warning:: 2.3にてItaDefinition→pfItaDefinitionへ変更

.. include:: ../../include/helm_option_pfitaDefinition.rst

共通設定 (認証機能用データベース)
---------------------------------

.. include:: ../../include/helm_option_pfDatabaseDefinition.rst

共通設定 (Exastro 共用データベース)
-----------------------------------
.. warning:: 2.3にてMariaDBへ統合したため使用不可

.. include:: ../../include/helm_option_databaseDefinition.rst

共通設定 (Proxy設定)
--------------------

.. include:: ../../include/helm_option_proxyDefinition.rst

Exastro Platform API 機能
-------------------------

.. include:: ../../include/helm_option_platform-api.rst

Exastro Platform 認証機能
-------------------------

.. include:: ../../include/helm_option_platform-auth.rst

Exastro Platform Web 機能
-------------------------

.. include:: ../../include/helm_option_platform-web.rst

Exastro Platform JOB 機能
-------------------------

.. include:: ../../include/helm_option_platform-job.rst

Exastro Platform セットアップ機能
---------------------------------

.. include:: ../../include/helm_option_platform-migration.rst

MariaDB
-------

.. include:: ../../include/helm_option_mariadb.rst

Keycloak
--------

.. include:: ../../include/helm_option_keycloak.rst

MongoDB
--------

.. include:: ../../include/helm_option_mongo.rst

GitLab
--------

.. include:: ../../include/helm_option_gitlab.rst

Exastro IT Automation
=====================

共通設定 (Exastro IT Automation)
--------------------------------

.. include:: ../../include/helm_option_itaGlobalDefinition.rst

共通設定 (Exastro IT Automation 用データベース)
-----------------------------------------------

.. include:: ../../include/helm_option_itaDatabaseDefinition.rst

共通設定 (GitLab)
-----------------

.. include:: ../../include/helm_option_gitlabDefinition.rst

ita-api-admin
-------------

.. include:: ../../include/helm_option_ita-api-admin.rst

ita-api-organization
--------------------

.. include:: ../../include/helm_option_ita-api-organization.rst

ita-by-ansible-execute
----------------------

.. include:: ../../include/helm_option_ita-by-ansible-execute.rst

ita-by-ansible-legacy-role-vars-listup
--------------------------------------

.. include:: ../../include/helm_option_ita-by-ansible-legacy-role-vars-listup.rst

ita-by-ansible-legacy-vars-listup
--------------------------------------

.. include:: ../../include/helm_option_ita-by-ansible-legacy-vars-listup.rst

ita-by-ansible-pioneer-vars-listup
--------------------------------------

.. include:: ../../include/helm_option_ita-by-ansible-pioneer-vars-listup.rst

ita-by-ansible-towermaster-sync
-------------------------------

.. include:: ../../include/helm_option_ita-by-ansible-towermaster-sync.rst

ita-by-cicd-for-iac
-------------------------------

.. include:: ../../include/helm_option_ita-by-cicd-for-iac.rst

ita-by-collector
-------------------------------

.. include:: ../../include/helm_option_ita-by-collector.rst

ita-by-conductor-regularly
-------------------------------

.. include:: ../../include/helm_option_ita-by-conductor-regularly.rst

ita-by-conductor-synchronize
----------------------------

.. include:: ../../include/helm_option_ita-by-conductor-synchronize.rst

ita-by-excel-export-import
----------------------------

.. include:: ../../include/helm_option_ita-by-excel-export-import.rst

ita-by-execinstance-dataautoclean
---------------------------------

.. include:: ../../include/helm_option_ita-by-execinstance-dataautoclean.rst

ita-by-file-autoclean
----------------------------

.. include:: ../../include/helm_option_ita-by-file-autoclean.rst

ita-by-hostgroup-split
----------------------------

.. include:: ../../include/helm_option_ita-by-hostgroup-split.rst

ita-by-menu-create
------------------

.. include:: ../../include/helm_option_ita-by-menu-create.rst

ita-by-menu-export-import
-------------------------

.. include:: ../../include/helm_option_ita-by-menu-export-import.rst

ita-by-terraform-cli-execute
----------------------------

.. include:: ../../include/helm_option_ita-by-terraform-cli-execute.rst

ita-by-terraform-cli-vars-listup
--------------------------------

.. include:: ../../include/helm_option_ita-by-terraform-cli-vars-listup.rst

ita-by-terraform-cloud-ep-execute
---------------------------------

.. include:: ../../include/helm_option_ita-by-terraform-cloud-ep-execute.rst

ita-by-terraform-cloud-ep-vars-listup
-------------------------------------

.. include:: ../../include/helm_option_ita-by-terraform-cloud-ep-vars-listup.rst

ita-database-setup-job
----------------------

.. warning:: 2.3にて削除したため利用不可

.. include:: ../../include/helm_option_ita-database-setup-job.rst

ita-web-server
--------------

.. include:: ../../include/helm_option_ita-web-server.rst

ita-migration
--------------

.. include:: ../../include/helm_option_ita-migration.rst

Exastro OASE
============

共通設定 (MongoDB)
------------------

.. include:: ../../include/helm_option_mongoDefinition.rst

ita-by-oase-conclusion
----------------------

.. include:: ../../include/helm_option_ita-by-oase-conclusion.rst

ita-api-oase-receiver
---------------------

.. include:: ../../include/helm_option_ita-api-oase-receiver.rst


Exastro OASE Agent
==================

共通設定 (OASE Agent)
---------------------

.. include:: ../../include/helm_option_agentGlobalDefinition.rst

ita-ag-oase
-----------

.. include:: ../../include/helm_option_ita-ag-oase.rst
