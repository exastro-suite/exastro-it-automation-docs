============
Ansible Core
============


はじめに
========

| Exastro IT Automation（以下、ITAとも記載する）のAnsible連携機能（以下、Ansible driver）を運用するためのシステム構成とシステム要件について説明します。
| 本書では、実行エンジンに Ansible Core を使用した際のシステム構成とシステム要件について解説します。


システム構成
============

| Ansible driver は、Exastro IT Automation をインストールすることにより、標準機能としてご利用できます。
| Exastro IT Automation のインストール方法に関しては、 :doc:`../../installation/index` を参照してください。
|
| 簡易的な Ansible 実行の場合は、Ansible Core による構成が可能です。
|
| 以下に Ansible Core における構成パターンと構成イメージを記載します。

システム構成パターン
--------------------

.. list-table:: システム構成パターン
   :widths: 50 50 50
   :header-rows: 1
   :align: left

   * - 構成
     - 説明
     - Ansibleスケールアウト可否
   * - Ansible Core
     - Exastro IT Automation システムと Ansible Core を同一環境に構成
     - ○ (Kubernetes環境に限る)

システム構成イメージ
--------------------------------------------------------

.. figure:: /images/ja/diagram/ansible_core.png
    :alt: Ansible Core
    :width: 600px

    Ansible Core

.. list-table:: システム通信要件
   :widths: 10 20 20 40 80
   :header-rows: 1
   :align: left

   * - | 通信番号
       | ※1
     - FROM
     - TO
     - | プロトコル
       | (ポート番号※2)
     - 主な用途
   * - ①
     - Ansible Core
     - ストレージ機器
     - | ファイルシステム、NFS, iSCSI等
       | (ストレージ I/O、各プロトコルの接続ポート)
     - | Ansible コマンド実行時の実行情報(Playbook host_vars 等)の連携
   * - ②
     - Ansible Core
     - 対象機器
     - | Any
       | (22/tcp(ssh), 23/tcp(telnet)等 ※3）
     - 作業対象機器へのコマンド実行

| ※1 Ansible Coreの構成イメージの番号と紐づく通信番号を記載。
| ※2 ポート番号は標準的なポート番号を記載。
| ※3 代表的な例を記載。Ansibleモジュールにより利用プロトコルが異なる。


システム要件
============

| Ansible driver は Exastro IT Automation システムのシステム要件に準拠するため、:doc:`Kubernetes クラスターのシステム要件<../kubernetes/kubernetes>` を参照してください。

| ここでは Ansible Core に関するシステム要件を記載します。

作業対象機器
------------

| Ansible Coreで接続する作業対象機器には下記のソフトウェアのいずれかが必要となります。

.. list-table:: ソフトウェア要件
   :widths: 50 50
   :header-rows: 1
   :align: left

   * - | ソフトウェア
     - | バージョン
   * - | Python
     - | 3.8 - 3.13
   * - | PowerShell
     - | 5.1

.. note::
   | Exastro IT Automation 2.6 で使用する Ansible Core のバージョンは 2.18 です。

.. danger::
   | 作業対象機器のソフトウェア要件 は Exastro IT Automation のバージョン（Ansible Coreのバージョン）によって変更される可能性があります。
   | Exastro IT Automationのバージョンを変更する際は、必ず作業対象機器のソフトウェア要件を確認してください。


Playbook連携
============

| Exastro IT Automation と Ansible Core との Playbook 連携について説明します。
| Exastro IT Automation は Playbook やパラメータ値のやり取りのためにファイルシステムを中継した連携を行います。

.. figure:: /images/ja/diagram/playbook_link_containers.png
   :alt: Exastro IT Automation と Ansible Core 間のファイル連携図
   :width: 750px

   Exastro IT Automation と Ansible Core 間の Playbook 連携図


初期設定
========

| Ansible Core インストール後、Exastro IT Automation と Ansible Core からアクセス可能な共有ディレクトリを準備してください。
| インストールマニュアルの :ref:`persistent_volume` で作成したボリューム内に共有ディレクトリを作成します。

