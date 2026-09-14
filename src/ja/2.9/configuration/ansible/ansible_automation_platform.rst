===========================
Ansible Automation Platform
===========================


はじめに
========

| Exastro IT Automation（以下、ITAとも記載する）のAnsible連携機能（以下、Ansible driver）を運用するためのシステム構成とシステム要件について説明します。
| 本書では、実行エンジンに Ansible Automation Platform を使用した際のシステム構成とシステム要件について解説します。


システム構成
============

| Ansible driver は、Exastro IT Automation をインストールすることにより、標準機能としてご利用できます。
| Exastro IT Automation のインストール方法に関しては、 :doc:`../../installation/index` を参照してください。
|
| Ansible 実行サーバのスケールアウトが必要な場合は、Ansible Automation Platform による構成を推奨します。
|
| 以下に Ansible Automation Platform における構成パターンと構成イメージを記載します。

.. _aap_system_design:

システム構成パターン
--------------------

| Ansible Automation Controller は、Ansible 実行における拡張された機能の利用や、可用性を高めた構成で運用することが可能です。

.. warning::
   | ITA システムおよび Ansible Core とは個別の専用サーバを用意する必要があります。
   | また実行する Playbook を Ansible Vault で暗号化するため、Ansible Core (Ansible driver (Agent)) が必要となります。

| 以下に主な Ansible driver 機能利用の構成パターンと構成イメージを記載します。
| ※ITA システムは省略した構成図を記載します。

.. list-table:: システム構成パターン
   :widths: 5 50 80 25
   :header-rows: 1
   :align: left

   * - No
     - 構成
     - 説明
     - Ansibleスケールアウト可否
   * - 1
     - | Ansible Automation Platform (ハイブリッドパターン)
     - | Ansible Control ノード自体が、実行対象となる Managed ノードに対して作業を実行する構成です。
       | シンプルな構成の反面、各 Managed ノードに対して疎通ができる必要があります。
     - 〇
   * - 2
     - Ansible Automation Platform (実行ノード分離パターン)
     - | Ansible Control ノードが Ansible Execution ノードと連携し、Ansible Execution ノードが、実行対象となる各 Managed ノードに対して作業を実行する構成です。
       | 構成は複雑になりますが、Ansible Control ノードから Ansible Execution ノードに対しての疎通のみできればいいので、各 Managed ノードに対して通信設定をする必要がありません。
     - 〇
   * - 3
     - Ansible Automation Platform (資材Pull型パターン)
     - | AAP 2.5以上、またはRed Hat Ansible Automation Platform (Managed Service)版も対象とした、IaCを利用したリソース連携を行う構成です。
       | ITAからAAPへのSSH接続が不要となり、Ansible Execution EnvironmentからPlatform Gatewayへのアウトバウンド通信のみを許可する構成が可能です。
       | AAPの実行ノードからITA APIを呼び出して、ITA固有のリソースを連携するPull型の通信方式となります。
       | ITA及び、Ansible Automation PlatformからGitLabへ通信が可能である必要があります。
     - 〇

.. tabs::

   .. tab:: AAP 2.5(ハイブリット)

      Ansible Automation Platform 2.5 (ハイブリットパターン)を下記に記載します。

      .. figure:: /images/ja/diagram/aap25_hybrid.drawio.png
        :alt: Ansible Automation Platform 2.5 (ハイブリットパターン)
        :width: 900px

        Ansible Automation Platform 2.5 (ハイブリットパターン)

      | ※Ansible Automation Platform構成内の通信の詳細については
      | 　`Chapter 6. Network ports and protocols | Planning your installation | Red Hat Ansible Automation Platform | 2.5 | Red Hat Documentation <https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.5/html/planning_your_installation/ref-network-ports-protocols_planning>`_ も併せてご参照ください。

      .. list-table:: システム通信要件
         :widths: 10 20 20 40 100
         :header-rows: 1
         :align: left

         * - | 番号
           - FROM
           - TO
           - | プロトコル
             | [ポート番号　※1]
           - 主な用途
         * - ①
           - ITAシステム
           - Platform Gateway
           - | http(s)
             | [80(443)/tcp]
           - Ansible Automation Platform に対する制御通信
         * - ②
           - ITAシステム
           - Hybrid Node
           - ssh [22/tcp]
           - ITA作業用ディレクトリ(/var/lib/exastro)への資材転送
         * - ③
           - ITAシステム
           - GitLab
           - | http(s)
             | [80(443)/tcp]
           - AnsibleProject(Playbook/Role/Inventory等)の同期
         * - ④
           - Hybrid Node
           - Managed Node(作業対象)
           - | Any
             | (ssh [22/tcp] WinRM [5985-5986/tcp] telnet [23/tcp] 等 ※2)
           - Ansible実行のために接続
         * - ⑤
           - Hybrid Node
           - GitLab
           - | http(s)
             | [80(443)/tcp]
           - AnsibleProject(Playbook/Role/Inventory等)の同期

      | ※1 ポート番号はプロトコルに対する標準的なポート番号を記載しており、環境によって異なる場合があります。
      | ※2 ④の通信で使用するプロトコルには代表的な例を記載しています。Ansibleモジュールにより利用プロトコルが異なる場合があります。
   .. tab:: AAP 2.5(実行ノード分離)

      Ansible Automation Platform 2.5 (実行ノード分離パターン)を下記に記載します。

      .. figure:: /images/ja/diagram/aap25_divide.drawio.png
        :alt: Ansible Automation Platform 2.5 (実行ノード分離パターン)
        :width: 1200px

        Ansible Automation Platform 2.5 (実行ノード分離パターン)

      | ※Ansible Automation Platform構成内の通信の詳細については
      | 　`Chapter 6. Network ports and protocols | Planning your installation | Red Hat Ansible Automation Platform | 2.5 | Red Hat Documentation <https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.5/html/planning_your_installation/ref-network-ports-protocols_planning>`_ も併せてご参照ください。

      .. list-table:: システム通信要件
         :widths: 10 20 20 40 100
         :header-rows: 1
         :align: left

         * - | 番号
           - FROM
           - TO
           - | プロトコル
             | [ポート番号　※1]
           - 主な用途
         * - ①
           - ITAシステム
           - Platform Gateway
           - | http(s)
             | [80(443)/tcp]
           - Ansible Automation Platform に対する制御通信
         * - ②
           - ITAシステム
           - Execution Node
           - ssh [22/tcp]
           - ITA作業用ディレクトリ(/var/lib/exastro)への資材転送
         * - ③
           - ITAシステム
           - GitLab
           - | http(s)
             | [80(443)/tcp]
           - AnsibleProject(Playbook/Role/Inventory等)の同期
         * - ④
           - Execution Node
           - Managed Node(作業対象)
           - | Any
             | (ssh [22/tcp] WinRM [5985-5986/tcp] telnet [23/tcp] 等 ※2)
           - Ansible実行のために接続
         * - ⑤
           - Controller Node
           - GitLab
           - | http(s)
             | [80(443)/tcp]
           - AnsibleProject(Playbook/Role/Inventory等)の同期

      | ※1 ポート番号はプロトコルに対する標準的なポート番号を記載しており、環境によって異なる場合があります。
      | ※2 ④の通信で使用するプロトコルには代表的な例を記載しています。Ansibleモジュールにより利用プロトコルが異なる場合があります。

   .. tab:: AAP(資材Pull型)

      .. note::
         | 実行エンジン「Ansible Automation Platform (Cloud)」は、AAP 2.5以上、またはRed Hat Ansible Automation Platform (Managed Service)版も対象としています。

      Ansible Automation Platform (Cloud)について、EE→AAP アウトバウンド通信のみのケースを下記に記載します。

      | 本構成は、ハイブリッドパターンと実行ノード分離パターンの両方に対応しています。
      | いずれのパターンでも、Execution NodeからPlatform Gatewayへのアウトバウンド通信のみを許可する構成が可能です。

      .. figure:: /images/ja/diagram/aapcloud_hybrid.drawio.png
         :alt: AAP Pull型 ハイブリッドパターン
         :align: center
         :width: 800px

      .. figure:: /images/ja/diagram/aapcloud_divide.drawio.png
         :alt: AAP Pull型 実行ノード分離パターン
         :align: center
         :width: 800px


      .. list-table:: システム通信要件(ハイブリッドパターン・実行ノード分離パターン共通)
         :widths: 5 25 25 15 40
         :header-rows: 1
         :align: left


         * - | 番号
           - FROM
           - TO
           - | プロトコル
             | [ポート番号　※1]
           - 主な用途
         * - ①
           - ITAシステム
           - Platform Gateway
           - | http(s)
             | [80(443)/tcp]
           - Ansible Automation Platform に対する制御通信
         * - ②
           - ITAシステム
           - GitLab
           - | http(s)
             | [80(443)/tcp]
           - AnsibleProject(Playbook/Role/Inventory等)の同期
         * - ③
           - Controller Node
           - GitLab
           - | http(s)
             | [80(443)/tcp]
           - | AnsibleProject(Playbook/Role/Inventory等)の同期
             | ※Ansible Automation Platform (Cloud)の場合は、AAPからGitLabへの通信が可能である必要があります
         * - ④
           - Execution Node
           - ITA API
           - | http(s)
             | [80(443)/tcp]
           - | ITA固有の資材取得
             | EE上でlocalhostから実施
             | エンドポイント: GET /api/{org_id}/workspaces/{ws_id}/aap/{exec_no}/populated_data
             | IaC方式による資材連携（投入データ等）
         * - ⑤
           - Execution Node
           - Managed Node(作業対象)
           - | Any
             | (ssh [22/tcp] WinRM [5985-5986/tcp] telnet [23/tcp] 等 ※2)
           - Ansible実行のために接続
         * - ⑥
           - Execution Node
           - ITA API
           - | http(s)
             | [80(443)/tcp]
           - | 結果ファイル送信
             | ITA上で管理する資材、結果ファイル（Conductorディレクトリ等）を送信
             | エンドポイント: POST /api/{org_id}/workspaces/{ws_id}/aap/{exec_no}/result_data

      | ※1 ポート番号はプロトコルに対する標準的なポート番号を記載しており、環境によって異なる場合があります。
      | ※2 ⑤の通信で使用するプロトコルには代表的な例を記載しています。Ansibleモジュールにより利用プロトコルが異なる場合があります。



   .. tab:: AAP 2.4(ハイブリッド)

      Ansible Automation Platform 2.4 (ハイブリッドパターン)を下記に記載します。

      .. figure:: /images/ja/diagram/aap24_hybrid.drawio.png
         :alt: Ansible Automation Platform 2.4 (ハイブリッドパターン)
         :width: 900px

         Ansible Automation Platform 2.4 (ハイブリッドパターン)

      | ※Ansible Automation Platform構成内の通信の詳細については
      | 　`Chapter 5. Network ports and protocols | Red Hat Ansible Automation Platform planning guide | Red Hat Ansible Automation Platform | 2.4 | Red Hat Documentation <https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.4/html/red_hat_ansible_automation_platform_planning_guide/ref-network-ports-protocols_planning>`_ も併せてご参照ください。


      .. list-table:: システム通信要件
         :widths: 10 20 20 40 100
         :header-rows: 1
         :align: left

         * - | 番号
           - FROM
           - TO
           - | プロトコル
             | [ポート番号　※1]
           - 主な用途
         * - ①
           - ITAシステム
           - Hybrid Node
           - | http(s)
             | [80(443)/tcp]
           - Ansible Automation Platform に対する制御通信
         * - ②
           - ITAシステム
           - Hybrid Node
           - ssh [22/tcp]
           - ITA作業用ディレクトリ(/var/lib/exastro)への資材転送
         * - ③
           - ITAシステム
           - GitLab
           - | http(s)
             | [80(443)/tcp]
           - AnsibleProject(Playbook/Role/Inventory等)の同期
         * - ④
           - Hybrid Node
           - Managed Node(作業対象)
           - | Any
             | (ssh [22/tcp] WinRM [5985-5986/tcp] telnet [23/tcp] 等 ※2)
           - Ansible実行のために接続
         * - ⑤
           - Hybrid Node
           - GitLab
           - | http(s)
             | [80(443)/tcp]
           - AnsibleProject(Playbook/Role/Inventory等)の同期

      | ※1 ポート番号はプロトコルに対する標準的なポート番号を記載しており、環境によって異なる場合があります。
      | ※2 ④の通信で使用するプロトコルには代表的な例を記載しています。Ansibleモジュールにより利用プロトコルが異なる場合があります。

   .. tab:: AAP 2.4(実行ノード分離)

      Ansible Automation Platform 2.4 (実行ノード分離パターン)を下記に記載します。

      .. figure:: /images/ja/diagram/aap24_divide.drawio.png
        :alt: Ansible Automation Platform 2.4 (実行ノード分離パターン)
        :width: 1200px

        Ansible Automation Platform 2.4 (実行ノード分離パターン)

      | ※Ansible Automation Platform構成内の通信の詳細については
      | 　`Chapter 5. Network ports and protocols | Red Hat Ansible Automation Platform planning guide | Red Hat Ansible Automation Platform | 2.4 | Red Hat Documentation <https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.4/html/red_hat_ansible_automation_platform_planning_guide/ref-network-ports-protocols_planning>`_ も併せてご参照ください。


      .. list-table:: システム通信要件
         :widths: 10 20 20 40 100
         :header-rows: 1
         :align: left

         * - | 番号
           - FROM
           - TO
           - | プロトコル
             | [ポート番号　※1]
           - 主な用途
         * - ①
           - ITAシステム
           - Controller Node
           - | http(s)
             | [80(443)/tcp]
           - Ansible Automation Platform に対する制御通信
         * - ②
           - ITAシステム
           - Execution Node
           - ssh [22/tcp]
           - ITA作業用ディレクトリ(/var/lib/exastro)への資材転送
         * - ③
           - ITAシステム
           - GitLab
           - | http(s)
             | [80(443)/tcp]
           - AnsibleProject(Playbook/Role/Inventory等)の同期
         * - ④
           - Execution Node
           - Managed Node(作業対象)
           - | Any
             | (ssh [22/tcp] WinRM [5985-5986/tcp] telnet [23/tcp] 等 ※2)
           - Ansible実行のために接続
         * - ⑤
           - Controller Node
           - GitLab
           - | http(s)
             | [80(443)/tcp]
           - AnsibleProject(Playbook/Role/Inventory等)の同期

      | ※1 ポート番号はプロトコルに対する標準的なポート番号を記載しており、環境によって異なる場合があります。
      | ※2 ④の通信で使用するプロトコルには代表的な例を記載しています。Ansibleモジュールにより利用プロトコルが異なる場合があります。

システム要件
============

| Ansible driver は Exastro IT Automation システムのシステム要件に準拠するため、:doc:`Kubernetes クラスターのシステム要件<../kubernetes/kubernetes>` を参照してください。

| ここでは Ansible Automation Platform のシステム要件を記載します。

..  include:: ../../include/aap_versions.rst


Playbook連携
============

| ITAとAnsible Automation Platform間のPlaybook連携について説明します。

実行エンジンによるPlaybook連携の違いについて

- Ansible Automation Controller
- Ansible Automation Platform(Cloud)

.. tabs::

   .. tab:: Ansible Automation Controller

      .. figure:: /images/ja/diagram/playbook_link_between_aap_and_container.drawio.png
         :alt: ITAとAnsible Automation Platform2.xのPlaybook連携図
         :width: 600px

      ITAとAnsible Automation Platform2.x間のPlaybook連携図

      - ① Playbook 一式を抽出する
      - ② Playbook 一式を Ansible Automation Controller と連携する Gitリポジトリを作成
      - ③ RestAPI経由で Playbook 実行に必要なデータリソース（Git 接続情報を含む）の生成
      - ④ Playbook 一式を ITA作業用ディレクトリにファイル転送（scp）
      - ⑤ ITAに作成されている Gitリポジトリを SCM管理ディレクトリに連携

   .. tab:: Ansible Automation Platform(Cloud)

      .. figure:: /images/ja/diagram/playbook_link_between_aaponcloud_and_container.drawio.png
         :alt: ITAとAnsible Automation Platform(PULL型)のPlaybook連携図
         :width: 600px

      ITAとAnsible Automation Platform(Cloud)間のPlaybook連携図

      - ① Playbook 一式を抽出する
      - ② Playbook 一式を Ansible Automation Platform と連携する Gitリポジトリを作成
      - ③ RestAPI経由で Playbook 実行に必要なデータリソース（Git 接続情報を含む）の生成
      - ④ ITAに作成されている Gitリポジトリを SCM管理ディレクトリに連携
      - ⑤ ITA固有の資材を実行ノードに連携(http[s])（実行ノードからITAに対して資材の取得を行う）

      .. note::
         |  ⑤ITA固有の資材の連携については、 :ref:`operational_flow_of_ansible_automation_platform_cloud_approach` を参照してください。


初期設定
========

| Ansible Automation Platformインストール後、実行エンジンに応じて各設定を行ってください。

.. list-table:: Ansible Core システム要件
   :widths: 45 35 20
   :header-rows: 1
   :align: center

   * - 設定項目
     - Ansible Automation Controller
     - Ansible Automation Platform (Cloud)
   * - ITA作業用ディレクトリの準備
     - 〇
     - ×
   * - ITA作業用ディレクトリの公開
     - 〇
     - ×
   * - Ansible Automation Platformへのファイル転送ユーザーの準備
     - 〇
     - ×
   * - Ansible Automation Platformと連携するGitへのユーザーの準備
     - 〇
     - 〇
   * - Proxy設定
     - △
     - ×


| 〇:必須　×:不要　△:必要に応じて



ITA作業用ディレクトリ・ファイル転送ユーザの準備
-------------------------------------------------

| Ansible Automation Platformの Execution Node に ITA作業用ディレクトリを作成してください。
| クラスタ構成の場合は、構成している全ての Execution Node にディレクトリを作成してください。
| Ansible Automation Platformの Platform Gateway(2.5のみ)/Controller Node/Hop Node にはディレクトリ作成不要です。
|

.. list-table:: ITA作業用ディレクトリの作成情報
   :widths: 35 120
   :header-rows: 1
   :align: left

   * - 項目
     - 設定値
   * - ディレクトリパス
     - /var/lib/exastro
   * - オーナー・グループ
     - awx:awx
   * - パーミッション
     - 0755


ITA作業用ディレクトリの公開
---------------------------

| ブラウザより Ansible Automation Platform にログインし、:menuselection:`設定 --> ジョブ --> 分離されたジョブに公開するパス` に :file:`/var/lib/exastro/` を設定します。

.. figure:: /images/ja/diagram/publish_ita_operation_director.png
   :width: 600px


Ansible Automation Platform へのファイル転送ユーザーの準備
----------------------------------------------------------

| ITA から Ansible Automation Platform のプロジェクトを生成する際、Ansible Automation Platform の下記ディレクトリに Playbook 一式をファイル転送する必要があります。
| ファイル転送するLinuxユーザーを準備してください。
| ※Ansible Automation Platform インストール時に生成される awx ユーザーにパスワードを設定し使用することを推奨します。

| ・ITA作業用ディレクトリ(/var/lib/exastro)


| 準備した Linuxユーザーは、ITA システムに登録する必要があります。
| :ref:`ansible_common_ansible_automation_controller_hosts` を参照し、登録を行ってください。


Ansible Automation Platformと連携するGitLabへのユーザーの準備
----------------------------------------------------------------

| ITA から Ansible Automation Platform のプロジェクトを生成する際の SCM タイプを Git にしています。
| 連携先の Git リポジトリは、ITA構築時に指定した外部のGitLab サーバに作成されます。
|
| ユーザーを作成・操作可能なアクセストークンが必要となります。
| 設定方法は :ref:`installation_kubernetes_gitlablinkage` を参照してください。



Proxyの設定
-----------

| Ansible Automation Platform の設定に応じて作業実行時などに Red Hat 社の所定のサイトより実行環境のコンテナイメージのダウンロードが行われます。
| ブラウザより Ansible Automation Platform にログインし、:menuselection:`設定 --> ジョブ --> 追加の環境変数` に下記の環境変数を設定します。

-  https_proxy
-  http_proxy
-  no_proxy
-  HTTPS_PROXY
-  HTTP_PROXY
-  NO_PROXY

.. figure:: /images/ja/diagram/proxy_settings.png
   :width: 600px

.. warning::
  | Ansible Automation Platform が Proxy 環境下にある場合、Ansible Automation Platform に Proxy 設定が必要です。Proxy の設定がされていない状態で作業実行を行った場合、エラー原因が取得できない場合があります。


Organization 追加時の作業
=========================

.. _platform_make_organization:

組織作成
--------

| Organization 用の組織を作成します。
| Ansible Automation Platform は admin(管理ユーザー) でログインしてください。
|

#. | :menuselection:`アクセス --> 組織` の :guilabel:`追加` ボタンをクリックします。
#. | 該当項目を入力し、 :guilabel:`保存` ボタンをクリックしてください。
   |
   | 必須項目及び設定値については下記の表を参照してください。

.. list-table::
   :widths: 35 80 80
   :header-rows: 1
   :align: left

   * - 項目
     - 設定値
     - 備考
   * - 名前
     - 任意の名称
     -
   * - インスタンスグループ
     - ※未選択のままにする
     - 「:ref:`platform_connection_instance` 」で設定


.. _make_application:

アプリケーション登録
--------------------

| 接続トークン払出用のアプリケーション登録をします。
| Ansible Automation Platform は admin(管理ユーザー)でログインしてください。
|

#. | :menuselection:`管理 --> アプリケーション` の :guilabel:`追加` ボタンをクリックしてください。
#. | 該当項目を入力し、 :guilabel:`保存` ボタンをクリックしてください。
   |
   | 必須項目及び設定値については下記の表を参照してください。

.. list-table::
   :widths: 35 80 80
   :header-rows: 1
   :align: left

   * - 項目
     - 設定値
     - 備考
   * - 名前
     - 任意の名称
     - 「 :ref:`platform_output_token` 」で使用する
   * - 組織
     - 「 :ref:`platform_make_organization` 」で作成した組織を選択する
     -
   * - 認証付与タイプ
     - リソース所有者のパスワードベースを選択
     -
   * - クライアントタイプ
     - 秘密
     -

.. _platform_architecture_user:

ユーザー作成
------------

| Organization 用のユーザーを作成します。
| Ansible Automation Platform は admin(管理ユーザー)でログインしてください。
|

#. | :menuselection:`アクセス --> ユーザー` の :guilabel:`追加` ボタンをクリックしてください。
#. | 該当項目を入力し、 :guilabel:`保存` ボタンをクリックしてください。
   |
   | 必須項目及び設定値については下記の表を参照してください。


.. list-table::
   :widths: 35 80 80
   :header-rows: 1
   :align: left

   * - 項目
     - 設定値
     - 備考
   * - ユーザー名
     - 任意のユーザー名
     -
   * - パスワード
     - 任意のパスワード
     -
   * - パスワードの確認
     - 任意のパスワード
     -
   * - ユーザータイプ
     - 標準ユーザーを選択
     -
   * - 組織
     - 「 :ref:`platform_make_organization` 」で作成した組織を選択する
     -

.. _platform_organization_roles:

ロール設定
----------

| Organization 用ユーザーに紐づける組織に対してロールを設定します。
| Ansible Automation Platform は admin(管理ユーザー)でログインしてください。
|

#. | :menuselection:`アクセス --> ユーザー` より「 :ref:`platform_architecture_user` 」で作成したユーザー名をクリックしてください。
#. | ユーザーの詳細画面に遷移されるため、:menuselection:`ロール` タブを選択し、:guilabel:`追加` ボタンをクリックしてください。
#. | 以下の通りにユーザー権限の追加をしてください。

   #. | リソースタイプの追加 では 「組織」 を選択し、:guilabel:`Next` ボタンをクリックしてください。
   #. | リストの項目の選択 では 「 :ref:`platform_make_organization` 」 で作成した組織 を選択し、:guilabel:`Next` ボタンをクリックしてください。
      | ※「 :ref:`platform_make_organization` 」で作成した組織以外のロールは付与しないでください。
   #. | 適用するロールの選択 では 「管理者」と「メンバー」の２つのロールを選択し、:guilabel:`保存` ボタンをクリックしてください



.. _platform_output_token:

認証トークン払出
----------------

| Ansible Automation Platform は :ref:`platform_architecture_user` で作成したユーザーでログインしてください。
|

#. | :menuselection:`アクセス --> ユーザー` の :guilabel:`追加` ボタンを押下する。
#. | 該当項目を入力し、 :guilabel:`保存` ボタンを押下する。
   |
   | 必須項目及び設定値については下記の表を参照してください。

.. list-table::
   :widths: 35 50 30
   :header-rows: 1
   :align: left

   * - 項目
     - 設定値
     - 備考
   * - アプリケーション
     - 「 :ref:`make_application` 」で作成したアプリケーションを選択
     -
   * - 範囲
     - 書き込みを選択
     -

ワークスペース追加時の作業
==========================


インスタンスの作成
----------------------

| インスタンスの作成、及び構築手順について記載します。具体的な構築手順については、Redhat社及びサービス提供元のドキュメントを参照してください。

#. Red Hat Ansible Automation Platform にログインします。
#. ナビゲーションパネルで、インスタンス を選択し、Create instanse をクリックします。
#. ホスト名 フィールドに、実行ノードのドメイン名または IP アドレスを入力し、Create instanse をクリックします。
#. バンドルをインストール の横にあるダウンロードアイコン download をクリックしてください。
#. インベントリを編集
#. receptorのインストールを実行

.. note::
    | Ansible Automation Platformのデプロイ方式（インストールのアーキテクチャ）の違いにより、インスタンス追加の手順が異なります。
    | 構築した環境、利用サービスに従ってインスタンスの作成、を組み込みを実施してください。

.. _platform_ansible_execution_environment:

インスタンスを組み込む
----------------------

| インスタンスであるAnsible Execution Environment (以下、Ansible ee とも表記) を組み込んでください。


インスタンスグループ作成
------------------------

| ※ 組み込んだ インスタンス (Ansible ee) を追加するインスタンスグループが既にある場合、次の 「 :ref:`platform_add_insetance` 」の手順に進んでください。

| Ansible Automation Platform は admin(管理ユーザー)でログインしてください。
|

#. | :menuselection:`管理 --> インスタンスグループ` の :ref:`platform_ansible_execution_environment` で組み込んだインスタンス( Ansible ee )を追加するインスタンスグループを選択してください。
#. | 該当項目を入力し、 :guilabel:`保存` ボタンを押下する。
   |
   | 必須項目及び設定値については下記の表を参照してください。

.. list-table::
   :widths: 35 30 50
   :header-rows: 1
   :align: left

   * - 項目
     - 設定値
     - 備考
   * - 名前
     - 任意の名称
     - 命名規則については下記をご参照ください


.. _platform_add_insetance:

インスタンスグループにインスタンスを追加
----------------------------------------

| インスタンスグループに「 :ref:`platform_ansible_execution_environment` 」で組み込んだインスタンス( Ansible ee )を追加します。
| Ansible Automation Platform は admin(管理ユーザー)でログインしてください。
|

#. | :menuselection:`管理 --> インスタンスグループ` より、「 :ref:`platform_ansible_execution_environment` 」で組み込んだインスタンス( Ansible ee )を追加するインスタンスグループ名をクリックしてください。
#. | インスタンスグループの詳細画面に遷移されるため、:menuselection:`インスタンス` タブを選択し、:guilabel:`関連付け` ボタンをクリックしてください。
#. | インスタンスの選択の画面に遷移され、組み込んだインスタンス( Ansible ee )が表示されるので選択し、:guilabel:`保存` ボタンをクリックしてください。


.. _platform_connection_instance:

組織とインスタンスグループの紐づけ
----------------------------------

| 「 :ref:`platform_make_organization` 」で作成した組織と上記で使用したインスタンスグループを紐づけます。
| Ansible Automation Platform は admin(管理ユーザー)でログインしてください。
|

#. | :menuselection:`アクセス --> 組織` より、「 :ref:`platform_make_organization` 」で作成した組織名をクリックしてください。
#. | 詳細画面に遷移されるため、:guilabel:`編集` ボタンをクリックしてください。
#. | 詳細の編集の画面に遷移されるため、インスタンスグループに上記で使用したインスタンスグループを選択し、:guilabel:`保存` ボタンをクリックしてください。
   | ※複数選択可能


ITA に認証トークンと組織を登録
------------------------------

| :ref:`ansible_common_interface_information` を参照し、:menuselection:`Ansible共通 --> インターフェース情報` に :ref:`platform_output_token` で作成した認証トークンと :ref:`platform_make_organization` で作成した組織の登録を行ってください。
|

.. warning:: | 組織名を登録する際は、認証トークンを登録してから1分程度経過後(※)、「 :ref:`ansible_common_interface_information` 」を再表示し、「 :ref:`platform_make_organization` 」で作成した組織名を選択してください。

  ※ バックヤードで各認証トークンに対応したユーザーに紐づいている組織を収集し、プルダウンに表示しているため。


.. note:: | 「 :ref:`platform_organization_roles` 」で作成したユーザーに複数の組織のロールを付与されていた場合、ランダムに選択された組織をデフォルト値とします。


.. _about_ansible_automation_platform_cloud:

Ansible Automation Platform (Cloud)について
===============================================

クラウド環境での構成例
----------------------

| Ansible Automation Platform (Cloud)は、クラウド環境でのAAP利用に適しています。
| 以下にAWS環境での構成例を記載します（他のクラウドプロバイダーでも同様の考え方が適用できます）。
| Ansible Automation Platform on AWS、クラウド環境でGitLab構築した場合の例です。


.. figure:: /images/ja/configuration/ansible/ansible_overview_sample_aap_on_aws_diagram.drawio.png
   :alt:  Ansible Automation Platform on AWS 利用時の構成例
   :width: 900px

   Ansible Automation Platform on AWS 利用時の構成例

.. warning::
   | 赤線で示した通信は、AAP on AWS、GitLab.com、およびイントラ環境間のネットワーク境界を跨いで発生します。
   | 導入にあたっては、ITA構築時の構成・設定、各通信経路の疎通確認ならびにFirewall、Proxy、DNS等の通信要件を満たしていることを事前に確認してください。



**NW構成の特徴:**

- Execution NodeからPlatform Gatewayへのアウトバウンド通信を許可
- ITAからAAPへのSSH接続が不要
- Execution NodeからITA APIへのアウトバウンド通信[HTTP(S)]を許可
- AAPからGitLabへの通信を許可

.. note::
  | クラウド環境でのAAPからGitLabへの接続が可能な構成で構築する必要があります。


実行エンジンによるITA固有の資材連携の方式について
-------------------------------------------------

.. list-table:: 資材連携方式の比較
   :widths: 25 40 35
   :header-rows: 1
   :align: left

   * - 項目
     - Ansible Automation Controller
     - Ansible Automation Platform (Cloud)
   * - ITA固有の資材の連携方式
     - SSH方式
     - IaC方式
   * - ITAからAAP（Execution Node）へのSSH接続
     - 必要
     - 不要
   * - 資材転送方向
     - ITAからAAPへpush
     - AAPからITAへpull
   * - 資材転送プロトコル
     - SSH/SCP
     - HTTPS（REST API）
   * - ITA作業用ディレクトリ
     - AAP側に必要
     - 不要
   * - ファイル転送ユーザー
     - AAP側に必要
     - 不要
   * - Execution Nodeの通信方向
     - インバウンド（SSH受信）
     - アウトバウンドのみ
   * - Playbook記述
     - 変更なし
     - 変更なし

.. note::
   | Playbook記述に関しては、ITA固有の変数を使用するものについて、実行エンジンによる差異はありません。
   | ITA固有の資材連携方式の違いのみであり、Ansible実行時の動作は同一です。


Ansible Automation Platform (Cloud)連携用資材メニューの有効化
-------------------------------------------------------------

| Ansible Automation Platform (Cloud)方式で使用するIaCをカスタマイズしたい場合、「Ansible Automation Platform (Cloud)連携用資材」メニューをロール・メニュー紐付で有効化する必要があります。
| このメニューは内部処理用のため、デフォルトでは非表示となっています。

| 非表示メニューを表示するには、:menuselection:`管理コンソール-->ロール・メニュー紐付管理` で各メニューの復活処理を行います。詳細は :ref:`role_menu_link` を参照してください。

.. warning::
   | Ansible Automation Platform (Cloud)連携用資材メニューは、作業実行の資材連携で使用されます。
   | 変更することで、作業実行に影響する可能性があるため、手動での編集は推奨されません。
   | 変更する場合は、資材連携処理の影響を考慮して実施してください。

