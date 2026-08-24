====
概要
====

はじめに
========

| Exastro IT Automation（以下、ITAとも記載する）で対応しているAnsibleの実行環境種類は、「Ansible Core」「Ansible Automation Platform (AAP)」「Ansible Automation Platform (Cloud)」「Ansible Execution Agent」となります。
| Ansible実行エンジンの特徴は次の通りとなります。

.. list-table:: Ansible実行エンジンの特徴
   :widths: 10  20
   :header-rows: 1
   :align: left

   * - | Ansible実行エンジン
     -	| 特徴
   * - | **Ansible Core**
     - | **シンプルで軽量:** エージェントレスで、導入コストが低い。
       | 詳細は :ref:`ansible_overview_ansible_core` 参照
   * - | **Ansible Automation Platform (AAP)**
     - | **ユーザー使用のAAP活用:** 既にお使いのRed hat Ansible Automation Platform 環境と連携できる。
       | 詳細は :ref:`ansible_overview_aap` 参照
   * - | **Ansible Automation Platform (Cloud)**
     - | **IaC方式による資材連携:** ITA固有の資材の連携について、ITAから実行ノードに対するSSH接続不要で、実行ノードからITAにAPI経由で資材連携が可能。
       | **AAP 2.5以上対応:** AAP 2.5以上、またはRed Hat Ansible Automation Platform (Managed Service)版と連携できる。
       | 詳細は :ref:`ansible_overview_aap_cloud` 参照
   * - | **Ansible Execution Agent**
     - | **実行ノードとの調和性:** ITA本体と、実行ノード(クローズド環境)に配置されたAnsibleEngineとの連携による自動化機能。
       | **動的なAnsible実行環境の構築:** Ansible BuilderとAnsible Runnerを使った動的なAnsible作業実行環境の生成ができる。
       | 詳細は :ref:`ansible_overview_ansible_excecution_agent` 参照

.. note::
   - | 連携先システムであるAAPには、自社で構築・運用する Self-Managed版 と、クラウドで提供される Managed Service版 の2つの形態があります。
   - | Red Hat Ansible Automation Platform (Managed Service)版を導入・利用する際は、事前にサービス提供元（Red Hat社または各クラウドベンダー）の最新マニュアルにて通信要件をご確認ください。
     | その要件に基づき、各ネットワーク（オンプレミス環境や他VPC等）との接続性、ネットワーク構成(ファイアウォール、DNS設定など)を設計・構築してください。

構成イメージ
============

.. figure:: /images/ja/configuration/ansible/ansible_overview_ansible_core_diagram.drawio.png
   :alt: Ansible Core 構成イメージ
   :align: center

.. figure:: /images/ja/configuration/ansible/ansible_overview_ansible_automation_platform_diagram.drawio.png
   :alt: Red Hat Ansible Automation Platform 構成イメージ
   :align: center

.. figure:: /images/ja/configuration/ansible/ansible_overview_aap_cloud_diagram.drawio.png
   :alt: Red Hat Ansible Automation Platform (Cloud) 構成イメージ
   :align: center

.. figure:: /images/ja/configuration/ansible/ansible_overview_ansible_execution_agent_diagram.drawio.png
   :alt: Ansible Execution Agent 構成イメージ
   :align: center


.. _ansible_execution_engine_features:

Ansible実行環境ごとの特徴
=========================

.. _ansible_overview_ansible_core:

Ansible Core
------------

| Ansible Coreは、オープンソースの自動化エンジンです。 :doc:`構成・構築ガイドはこちら<./ansible_core>`
| シンプルなYAML構文で記述されたプレイブックを使用し、SSHやWinRMなどの標準プロトコルを通じてリモートノードの構成管理、アプリケーションデプロイ、タスク自動化を行います。
| エージェントレスであるため、管理対象サーバーに追加ソフトウェアをインストールする必要がありません。

.. note::

   | 導入コストが低いため、簡単なワークフロー実行などに適しております

.. _ansible_overview_aap:

Ansible Automation Platform (AAP)
---------------------------------

| Ansible Automation Platform (AAP) は、Ansible Coreを基盤としたエンタープライズ向けの自動化プラットフォームです。 :doc:`構成・構築ガイドはこちら<./ansible_automation_platform>`
| ユーザーが現在ご利用中のRed Hat Ansible Automation Platform環境がある場合は、Exastro IT Automationとの連携で、より効率・効果的にご利用できます。

.. note::

   | ご利用中のAAPとの連携で、資源を無駄なくご利用したい場合に適しております。

.. _ansible_overview_aap_cloud:

Ansible Automation Platform (Cloud)
-----------------------------------

| Ansible Automation Platform (Cloud) は、AAP 2.5以上、またはRed Hat Ansible Automation Platform (Managed Service)とも連携するための実行エンジンです。 :doc:`構成・構築ガイドはこちら<./ansible_automation_platform>`
| 従来のITA固有の資材連携について、ITAから実行ノードへ通信を行うSSH方式とは異なり、実行ノードからのITAに通信を行うIaC (Infrastructure as Code) 方式による資材連携を採用しています。
| IaC (Infrastructure as Code) 方式における資材連携では、Execution Environment (EE) のローカルアクションを利用し、API経由でITAとの間で資材の同期・連携を行います。

**主な特徴:**

- **SSH接続不要:** ITAからAAPへのSSH接続が不要となり、ネットワーク構成がシンプルになります。
- **API経由の資材連携:** AAPの実行ノードからITA APIを呼び出して資材を取得するpull型の通信方式です。
- **セキュアな通信:** 実行ノードからPlatform Gatewayへの通信のみを許可する構成が可能です。

**資材連携方式の違い:**

Ansible Automation Controller:
  ITA固有の資材に関して、ITAからAAPにSSH/SCPで資材をpush転送し、AAPの作業用ディレクトリに配置します。

Ansible Automation Platform (Cloud):
  AAPの実行ノードからITA APIにアクセスし、必要な資材を取得します。実行完了後、結果データもAPI経由でITAに送信します。

.. note::

   | AAP 2.5以上の環境、またはクラウド環境でのAAP利用に適しております。
   | SSH接続が制限される環境でも利用可能です。
   | 資材連携では以下のサービスアカウントが使用されます。

   - aap_service_account_user_<organization_id>_<workspace_id>

   | サービスアカウントについては、:ref:`service_account_settings` を参照してください。

.. _ansible_overview_ansible_excecution_agent:

Ansible Execution Agent
-----------------------

| Ansible Execution Agentは、Exastro IT Automationで実行する、「Ansible-Legacy」、「Ansible-Pioneer」、「Ansible-LegacyRole」の作業実行を、PULL型で行うためのエージェント機能です。
| Ansible BuilderとAnsible Runnerを使った動的なAnsible作業実行環境となります。 :doc:`構成・構築ガイドはこちら<./ansible_execution_agent>`

| Ansible BuilderとAnsible Runnerは、Ansibleの自動化をより柔軟かつ一貫性のある方法で実行するためのツールです。
| これらはAnsible Automation Platformの基盤技術であり、独自の自動化実行環境を構築・管理する際に特に重要となります。

- | Ansible Builder

  | カスタムの実行環境（Execution Environment）イメージを作成するためのツールです。
  | 特定のPythonバージョン、Ansibleバージョン、必要なコレクション、追加ライブラリなどをパッケージ化し、コンテナイメージとして定義できます。
  | これにより、自動化が常に同じ環境で実行されることが保証され、環境差異による問題を排除できます。

- | Ansible Runner
  | 実行環境内でAnsibleプレイブックやモジュールを実行するためのツールです。
  | Runnerは、コンテナ化された環境でAnsibleを実行するロジックを提供し、実行のライフサイクル（環境のセットアップ、プレイブックの実行、結果の収集）を管理します。

| これらを活用することで、以下のような動的な自動化環境を構築できます。

- | 実行環境の標準化

  | 開発、テスト、本番といった異なるフェーズで、全く同じAnsible実行環境を使用できます。

- | 依存関係の分離

  | プロジェクトごとに異なる依存関係を持つ実行環境を作成し、競合を避けることができます。

- | 効率的な配布とデプロイ
  | 必要なすべての依存関係が組み込まれたコンテナイメージとして実行環境を配布・デプロイできるため、環境構築の手間を削減できます。

.. note::

   | Exastro IT Automationとの連携により実行ノードへの構築のカスタムの自動化ニーズや特定の依存関係を持つ複雑な自動化ワークフローを管理する際に大きな力を発揮します。
