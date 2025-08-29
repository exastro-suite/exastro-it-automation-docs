==============
Docker Compose
==============

はじめに
========

| 本書では、Exastro IT Automation のデプロイ先となるコンテナプラットフォームのシステム要件について説明します。

システム要件
============

サーバー要件
------------

| 動作確認が取れているコンテナ環境の最小要求リソースとバージョンは下記のとおりです。

.. list-table:: ハードウェア要件(最小構成)
 :widths: 20, 20
 :header-rows: 1

 * - リソース種別
   - 要求リソース
 * - CPU
   - 2 Cores (3.0 GHz, x86_64)
 * - Memory
   - 4GB
 * - Storage (Container image size)
   - 35GB　※

.. list-table:: ハードウェア要件(推奨構成)
 :widths: 20, 20
 :header-rows: 1

 * - リソース種別
   - 要求リソース
 * - CPU
   - 4 Cores (3.0 GHz, x86_64)
 * - Memory
   - 16GB
 * - Storage (Container image size)
   - 120GB

| ※ パーテーション単位でディスク容量が必要です。
| ▼RHEL
| ・コンテナイメージ
| /home/ユーザ名/.local  25GB
| ・Exastroのデータ
| /home/ユーザ名/exastro-docker-compose 10GB(目安です。使い方によって大きく異なります。)
|
| ▼RHEL 以外
| ・コンテナイメージ
| /var/lib/ 25GB
| ・Exastroのデータ
| /home/ユーザ名/exastro-docker-compose 10GB(目安です。使い方によって大きく異なります。)
|

.. warning::
  | 最小構成における要求リソースはGitLabコンテナとOASEコンテナのデプロイでnを選択した場合の値です。GitLabコンテナとOASEコンテナのデプロイをする場合は、その分のリソースが別途必要となります。
  | データベースおよびファイルの永続化のために、別途ストレージ領域を用意する必要があります。
  | Storage サイズは、ユーザーの利用状況によるためあくまで目安となります。必要に応じて容量を確保してください。

通信要件
--------

.. list-table:: 通信要件
 :widths: 15, 20, 10, 10, 5
 :header-rows: 1

 * - 用途
   - 説明
   - 通信元
   - 通信先
   - デフォルト
 * - Exastro サービス用
   - Exastro サービスとの接続に利用
   - クライアント
   - Exastro システム
   - 30080/tcp
 * - Exastro システム管理用
   - Exastro システム管理機能に利用
   - クライアント
   - Exastro システム
   - 30081/tcp
 * - GitLab サービス用(オプション)
   - AAP連携時の GitLab サービス接続に利用
   - Ansible Automation Platform
   - Exastro システム
   - 40080/tcp
 * - GitLab サービス用(オプション)
   - GitLab サービス監視用
   - Exastro システム
   - Exastro システム
   - 40080/tcp
 * - 資材取得
   - GitHub、コンテナイメージ、導入パッケージなど
   - Exastro システム
   - インターネット
   - 443/tcp


動作確認済み実績
================

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

