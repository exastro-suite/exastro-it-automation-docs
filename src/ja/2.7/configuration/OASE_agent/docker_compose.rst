============================
OASE Agent on Docker Compose
============================

はじめに
========

| OASEを利用する際に、外部との連携に必要となる Exastro OASE Agent を、評価や一時的な利用など、簡単に利用を開始したい場合の構成方法となります。
| 高い可用性やサービスレベルのシステム構築を実現したい場合は、 :doc:`Kubernetes 版 OASE Agent<kubernetes>` の利用を推奨します。


システム要件
============

| 動作確認が取れているコンテナ環境の最小要求リソースとバージョンは下記のとおりです。


サーバー要件
------------

.. list-table:: ハードウェア要件(最小構成)
 :widths: 1, 1
 :header-rows: 1

 * - リソース種別
   - 要求リソース
 * - CPU
   - 2 Cores (3.0 GHz, x86_64)
 * - Memory
   - 4GB
 * - Storage (Container image size)
   - 10GB

.. warning::
    | Exastro IT Automation と同じ サーバーに構築する場合、OASE Agentに対応する最小要件を追加で用意する必要があります。


動作確認済み実績
----------------

| 以下は、動作確認済みのオペレーティングシステムとコンテナプラットフォームのバージョンとなります。

.. list-table:: 動作確認実績
 :widths: 25, 20, 20, 20
 :header-rows: 1

 * - OSバージョン
   - podmanバージョン
   - Docker Composeバージョン
   - Dockerバージョン
 * - Red Hat Enterprise Linux release 9.4 (Plow)
   - podman version 4.9.4-rhel
   - Docker Compose version v2.20.3
   - ー
 * - Red Hat Enterprise Linux release 8.9 (Ootpa)
   - podman version 4.9.4-rhel
   - Docker Compose version v2.20.3
   - ー
 * - AlmaLinux release 8.9 (Midnight Oncilla)
   - ー
   - ー
   - Docker version 26.1.3, build b72abbb
 * - AlmaLinux release 9.6 (Sage Margay)
   - ー
   - ー
   - Docker version 28.3.0, build 38b7060

.. tip::
   | RHEL 8.2 もしくは podman 4.x の初期バージョンでは、ルートレスモードで正常に名前解決ができない事象が報告されています。RHEL 8.3 以降のバージョンをご使用ください。
   |
   | https://github.com/containers/podman/issues/10672
   | https://github.com/containers/podman/issues/12565

