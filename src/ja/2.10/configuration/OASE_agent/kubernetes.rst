========================
OASE Agent on Kubernetes
========================

はじめに
========

| OASEを利用する際に、外部との連携に必要となる Exastro OASE Agent を、高い可用性やサービスレベルでの運用を行う場合の構成方法となります。
| 評価や一時的な利用など、簡単に利用を開始したい場合には、:doc:`Docker Compose 版 OASE Agent<docker_compose>` の利用を推奨します。


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
 * - Kubernetes
   - 1.23 以上
 * - サーバー台数
   - 1台

.. warning::
    | Exastro IT Automation と同じ Kubernetes クラスター に構築する場合、OASE Agentに対応する最小要件を追加で用意する必要があります。

