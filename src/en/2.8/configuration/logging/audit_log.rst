==============
Monitoring log
==============

Introduction
------------

| The Exastro system operates on API base, the monitoring log outputs When Who did What.
| This document contains description regarding the different setting values for the Monitoring log.

.. _security_audit_log:

Monitoring log output destination
---------------------------------

| The monitoring log is output to the playform-auth container's "/var/log/exastro" directory with the file name "exastro-audio.log"(default).
|
| In the Kubernetes environment, users can specify persistent vlumes to output to a directory in a persistent volume.
| ※For more information regarding Persistent volumes, see the Installation documents:doc:`../../installation/online/exastro/kubernetes`.

Monitoring log setting items.
-----------------------------

| The items that can be configured are the :kbd:`AUDIT_LOG` items of the Exastro Platform authentication function's Option Parameters.

.. include:: ../../include/helm_option_platform-auth.rst

Monitoring log contents
-----------------------

| The monitoring log is output in :kbd:`Json format`.
| 1 event(API call) starts a detailed section and contains the following:

.. list-table:: Monitoring log contents
   :widths: 15 20 30 20
   :header-rows: 1
   :align: left

   * - Item name
     - Description
     - Log example
     - Remarks
   * - ts
     - Event call date/time
     - "2024-03-11T01:15:58.147Z"
     -
   * - user_id
     - User ID
     - "155427e2-c154-49d8-a2b7-9496bb0e6b25"
     -
   * - username
     - Username
     - "admin_user"
     -
   * - org_id
     - Organization ID
     - "org1"
     - If operated from the System admin side, "-" will be output.
   * - ws_id
     - Workspace ID
     - "ws1"
     - If the operation comes from outside the workspace, "-" will be output.
   * - level
     - Message level
     - "INFO"
     - "INFO"= :API call succeeded. "ERROR"= :API call failed.
   * - full_path
     - Called endpoint and parameter.
     - "/api/org1/platform/workspaces?"
     -
   * - access_route
     - Access route's IP address
     - ["0.0.0.0"]
     - If there are multiple routes, divide them with commas.
   * - remote_addr
     - Remote access IP address
     - "0.0.0.0"
     -
   * - request_headers
     - Request header when the API is called.
     -
     -
   * - request_user_headers
     - Request header when the API is called.
     -
        | {
        |   "User-Id": "4c5c8c11-d7fa-4963-9dc5-5a7c3d923ad6",
        |   "Roles": "",
        |   "Org-Roles": "X29yZ2FuaXphdGlvbi1tYW5hZ2Vy",
        |   "Language": null
        | }
     - Roles, Org-Roles information is a base64 encoded value.
   * - request_body
     - Request body when the API is called.
     - null
     - If not contents, "null" will be output.
   * - request_form
     - Request from when the API is called.
     - null
     - If not contents, "null" will be output.
   * - request_files
     - Request files when the API is called.
     - null
     - If not contents, "null" will be output.
   * - status_code
     - Status code when the API is called.
     - 200
     -
   * - name
     - "audit" fixed
     - "audit"
     -
   * - message
     - Response message
     - "audit: response. 200"
     -
   * - message_id
     - API response message ID
     - "-"
     - If the API call results contains a response message, this will display the Message ID.
   * - message_text
     - API response message
     - "-"
     - If the API call results contains a response message, this will display the Message.
   * - stack_info
     - Stack information when API meets an error.
     - null
     - Outputs the Stack information when an API error occurs. If there are no errors, "null" will be output.
   * - process
     - Process ID
     - 7
     - Process ID
   * - log_ts
     - Log output date/time
     - "2024-03-12T01:29:36.357Z"
     -
   * - userid
     - Process user ID
     - "76541d8f-6de4-4b49-8fe6-58640c15a965"
     -
   * - method
     - Method when API is called.
     - "GET"
     - Method when "GET","POST","PUT","PATCH","DELETE" is called.
   * - content_type
     - Media type when API is called.
     - "application/json"
     -

.. _security_audit_log_get:

Fetching Monitoring log
-----------------------

| The Monitoring logs can be downloaded from the Organization management page.

.. figure:: /images/ja/log/audit_log/audit_log_top.png
    :alt: Top monitoring log
    :width: 1200px

| In the :menuselection:`Download` tab, users can specify what part of the monitoring log to download.
| Specify the values for the  monitoring period in :guilabel:`` and press :guilabel:`Apply`.
| Press the :guilabel:`Download` button at the bottom of the page to create an archive of the Monitoring log. The log will automatically be downloaded after it is done.

.. figure:: /images/ja/log/audit_log/audit_log_target_period.png
    :alt: Monitoring log target period
    :width: 1200px

| In the :menuselection:`History` tab, all created archives of the created monitoring logs are displayed. Users can check the status of them and download them from this page.

.. tip::
   | Monitoring logs are saved for 365 days after creation by default.
   | Archived Monitoring logs are deleted after 7 days after creation by default.
   | Up to 100 Monitoring log archives can be created.

.. figure:: /images/ja/log/audit_log/audit_log_history.png
    :alt: Monitoring log history
    :width: 1200px


.. list-table:: Monitoring log history item list
   :widths: 20 80
   :header-rows: 1
   :align: left

   * - Item name
     - Description
   * - (Download button)
     - Allows users to download the monitoring log file from the specified period.
   * - Download date/time
     - Displays when the Monitoring log was downloaded.
   * - Status
     - | Displays the process status of the Archived monitoring log. The Status codes are as following.
       | NotExecuted
       | Executing
       | Completion
       | Failed
       | NoData
   * - Target period
     - Displays the target period in the following format: [To] ～ [From]
   * - Number of output targets
     - Displays the number of monitoring logs within the specified period.指定した対象期間範囲内での監査ログの件数が表示されます。
   * - Process result message
     - Displays an error message if an error occurs while the Archive is being created.
   * - User
     - Displays the user who downloaded the monitoring log.
