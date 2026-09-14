====
概要
====

はじめに
========

| Exastro OASE Agentとは、Exastro IT AutomationにおいてOASEを利用する際に、外部との連携を行う機能です。
| 具体的には、外部システム（例.監視システムやメールサーバー）から情報収集し、それらを最適化されたイベントとしてOASEに送信することを実現します。
| 本書では、Exastro OASE Agentを導入するための、構築要件や構成パターンについて解説します。


システム要件
============

構築環境
--------
| OASE Agentはコンテナにより提供されます。
| 本マニュアル内では、Kubernetesもしくは、DockerおよびPodmanで構築した場合について解説しています。


サーバー要件
------------
:doc:`Kubernetes 版 OASE Agent<kubernetes>` もしくは :doc:`Docker Compose 版 OASE Agent<docker_compose>` をご確認ください。


通信要件
--------

| OASE Agentから収集対象サーバ および Exastro IT Automation に対してアウトバウンド通信できる必要があります。


.. list-table:: 通信要件
 :widths: 6, 20, 5, 8, 5
 :header-rows: 1

 * - 用途
   - 説明
   - 通信元 (FROM)
   - 通信先 (TO)
   - プロトコル
 * - Exastro OASE 連携用
   - 収集設定の取得と収集したイベントのOASE機能への送信
   - OASE Agent
   - | Exastro IT Automation
     |  (Exastro ITA OASE Receiver API)
   - HTTP/HTTPS
 * - イベント収集先 連携用
   - 外部システム（例.監視ツールやメールサーバー）から情報（障害等）の収集を行う
   - OASE Agent
   - 収集対象サーバ (監視ツール)
   - HTTP/HTTPS/IMAP


システム構成
============


基本的な構成イメージ
----------------------------

.. figure:: /images/ja/diagram/oase_agent_kousei_default.drawio.png
    :alt: OASE Agent default
    :width: 750px


構成パターン
------------

.. list-table:: 構成パターン
   :widths: 100 200
   :header-rows: 1
   :align: left

   * - 構成
     - 説明
   * - 複数の外部システムとまとめて連携
     - 1つのOASE Agentで、複数の収集対象から情報収集（直列処理）が可能です。
   * - 外部システムと個別に連携
     - | 収集対象ごとにOASE Agentを用意します。
       | 1つのコンテナ基盤で、複数のOASE Agentを起動することも可能です。
   * - Active-Standby構成
     - ストレージを共有した、Active-Standby構成によって可用性を実現します。
   * - 監視ツールとAgentの冗長構成
     - | 収集対象が1つで、監視ツールが冗長構成の場合、複数のOASE Agentが各監視ツールから情報を収集します。
       | 重複排除機能により、1つの情報として統合して収集することが可能です。
       | この機能により、OASE Agentの冗長構成による高可用性を実現します。


- 複数の外部システムとまとめて連携

.. figure:: /images/ja/diagram/oase_agent_kousei_01.drawio.png
   :alt: 複数の外部システムとまとめて連携 イメージ
   :width: 750px

- 外部システムと個別に連携

.. figure:: /images/ja/diagram/oase_agent_kousei_02.drawio.png
   :alt: 外部システムと個別に連携 イメージ
   :width: 750px

- Active-Standby構成

.. figure:: /images/ja/diagram/oase_agent_kousei_03.drawio.png
   :alt: 外部システムと個別に連携 イメージ
   :width: 750px

- 監視ツールとAgentの冗長構成

.. figure:: /images/ja/diagram/oase_agent_kousei_04.drawio.png
   :alt: 監視ツールとAgentの冗長構成
   :width: 750px
