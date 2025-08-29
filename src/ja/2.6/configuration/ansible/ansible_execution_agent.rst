=======================
Ansible Execution Agent
=======================


はじめに
========

| Exastro IT Automation（以下、ITAとも記載する）のAnsible連携機能（以下、Ansible driver）を運用するためのシステム構成とシステム要件について説明します。
| 本書では、実行エンジンに Ansible Execution Agent を使用した際のシステム構成とシステム要件について解説します。

| Ansible Execution Agentは、Exastro IT Automationで実行される **「Ansible-Legacy」、「Ansible-Pioneer」、「Ansible-LegacyRole」** といった作業を、PULL型で実行するためのエージェント機能です。


システム構成
============

| Ansible driver は、Exastro IT Automation をインストールすることにより、標準機能としてご利用できます。
| Exastro IT Automation のインストール方法に関しては、 :doc:`../../installation/index` を参照してください。
|
| クローズド環境下での Ansible 実行を行いたい場合は、Ansible Execution Agent による構成により可能となります。
|
| 以下に Ansible Execution Agent における構成パターンと構成イメージを記載します。

構成パターン
------------

.. list-table:: システム構成パターン
   :widths: 50 50 50
   :header-rows: 1
   :align: left

   * - | 構成
     - | 説明
     - | Ansibleスケールアウト可否
   * - | Ansible Execution Agent
     - | Exastro IT Automation システムと Ansible Execution Agent を別環境(クローズド環境)に構成可能
       | Ansible BuilderとAnsible Runnerを使った動的なAnsible作業実行環境の生成 ​（任意の環境・モジュールを利用可能）
     - | ○ (Kubernetes環境に限る)

システム構成イメージ
--------------------

.. figure:: /images/ja/configuration/ansible/ansible_overview_ansible_execution_agent_diagram.drawio.png
   :alt: Ansible Execution Agent システム構成イメージ
   :align: center

.. _ansible_execution_agent_system_requirements:

システム要件
============

| Ansible driver は Exastro IT Automation システムのシステム要件に準拠するため、:doc:`Kubernetes クラスターのシステム要件<../kubernetes/kubernetes>` を参照してください。

| ここでは Ansible Execution Agent に関するシステム要件を記載します。
| Ansible Execution Agent を利用するには以下の要件を満たしていることが前提となります。

- :ref:`ansible_execution_agent_hardware_requirements`
- :ref:`ansible_execution_agent_os_requirements`
- :ref:`ansible_execution_agent_node_to_work_on`
- :ref:`ansible_execution_agent_communication_requirements`
- :ref:`ansible_execution_agent_other_requirements`

.. _ansible_execution_agent_hardware_requirements:

ハードウェア要件
----------------

- 動作確認済み構成

.. list-table:: 動作確認済み最小構成
   :header-rows: 1
   :align: left

   * - リソース種別
     - 要求リソース
   * - CPU
     - 2 Cores (3.0 GHz, x86_64)
   * - Memory
     - 6GB
   * - Storage
     - 40GB

.. list-table:: 動作確認済み推奨構成
   :header-rows: 1
   :align: left

   * - リソース種別
     - 要求リソース
   * - CPU
     - 4 Cores (3.0 GHz, x86_64)
   * - Memory
     - 8GB
   * - Storage
     - 80GB

.. warning::
  | ※ディスク容量は、エージェントサービスの件数や、作業実行結果の削除設定、ビルドするimageサイズに依存するため、
  | 必要に応じて、サイジング、及びメンテナンス（Docker Image や Build Cache等について）を実行してください。

.. _ansible_execution_agent_os_requirements:

OS要件
------

| 動作確認済みのOSは以下です。

.. list-table:: 動作確認済みOS
   :header-rows: 1
   :align: left

   * - OS種別
     - バージョン
   * - RHEL9
     - Red Hat Enterprise Linux release 9.4 (Plow)
   * - Almalinux8
     - AlmaLinux release 8.9 (Midnight Oncilla)
   * - Almalinux9
     - AlmaLinux release 9.6 (Sage Margay)

| なお、動作確認済みのOSにおいても以下の設定が必要となります。

- | SELinuxがPermissiveに変更されていること。

.. code-block:: bash

    $ sudo vi /etc/selinux/config
    SELINUX=Permissive

.. code-block:: bash

    $ getenforce
    Permissive

.. _ansible_execution_agent_node_to_work_on:

作業対象機器
------------

| Ansible Coreで接続する作業対象機器には下記のソフトウェアのいずれかが必要となります。

.. _ansible_execution_agent_software_requirements:

ソフトウェア要件
^^^^^^^^^^^^^^^^

.. list-table:: ソフトウェア要件
   :widths: 50 50
   :header-rows: 1
   :align: left

   * - | ソフトウェア
     - | バージョン
   * - | ansible-builder
     - | 3.1.0
   * - | ansible-runner
     - | 2.4.1
   * - | Python
     - | 3.9 - 3.13
   * - | PowerShell
     - | 5.1

.. tip::
   | →Python3.11以上がインストールされている必要があります。また、AlmaLinuxの場合、python3コマンドとpip3コマンドに、上記バージョンのpythonのエイリアスが紐づいていること。
   | RHELの場合、python3コマンドとpip3コマンドに、python3.9以上のエイリアスが紐づいていること。

.. note::
   | Exastro IT Automation 2.6 で使用する Ansible Core のバージョンは 2.18 です。

.. danger::
   | 作業対象機器のソフトウェア要件 は Exastro IT Automation のバージョン（Ansible Coreのバージョン）によって変更される可能性があります。
   | Exastro IT Automationのバージョンを変更する際は、必ず作業対象機器のソフトウェア要件を確認してください。


.. _ansible_execution_agent_communication_requirements:

通信要件
--------

| エージェントサーバから、外部NWへの通信が可能である必要があります。

- 接続先のITA
- 各種インストール、及びモジュール、BaseImage取得先等（インターネットへの接続を含む）
- 作業対象サーバ


.. figure:: /images/ja/configuration/ansible/ansible_execution_agent_communication_requirements.drawio.png
   :alt: Ansible Execution Agent 通信要件
   :align: center


.. _ansible_execution_agent_other_requirements:

その他の要件
------------

.. _ansible_execution_agent_rhel_support_requirements:

RHEL(サポート付きライセンス利用の場合)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Ansible-builder および Ansible-runner の有償版をご利用いただく際は、インストーラを実行する前に、必ずサブスクリプションの登録とリポジトリの有効化を完了させてください。

- Red Hat コンテナーレジストリーの認証

  .. code-block:: bash

      podman login registry.redhat.io

- 利用するリポジトリ

  .. code-block:: bash

      rhel-9-for-x86_64-baseos-rpms
      rhel-9-for-x86_64-appstream-rpms
      ansible-automation-platform-2.5-for-rhel-9-x86_64-rpms

- 有効化されているリポジトリの確認、リポジトリの有効化

  .. code-block:: bash

      sudo subscription-manager repos --list-enabled
      sudo subscription-manager repos --enable=rhel-9-for-x86_64-baseos-rpms
      sudo subscription-manager repos --enable=rhel-9-for-x86_64-appstream-rpms
      sudo subscription-manager repos --enable=ansible-automation-platform-2.5-for-rhel-9-x86_64-rpms


.. _ansible_execution_agent_base_images:

Ansible builderで使用する動作確認済みのベースイメージ
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- 動作確認済みビルドのベースイメージ

.. list-table:: 動作確認済みビルドのベースイメージ
   :header-rows: 1
   :align: left

   * - ベースイメージ種別
     - イメージ取得先
     - 備考
   * - ubi9
     - registry.access.redhat.com/ubi9/ubi-init:latest
     -
   * - rhel9
     - registry.redhat.io/ansible-automation-platform-24/ee-supported-rhel9:latest
     - サポート付きライセンス利用の場合

