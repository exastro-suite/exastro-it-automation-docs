.. raw:: html

   <script>
   $(window).on('load', function () {
      setTimeout(function(){
        for (var i = 0; i < $("table.filter-table").length; i++) {
          $("[id^='ft-data-" + i + "-2-r']").removeAttr("checked");
          $("[id^='select-all-" + i + "-2']").removeAttr("checked");
          $("[id^='ft-data-" + i + "-2-r'][value^='可']").prop('checked', true);
          $("[id^='ft-data-" + i + "-2-r'][value*='必須']").prop('checked', true);
          tFilterGo(i);
        }
      },200);
   });
   </script>

==================================
Exastro on Docker Compose - Online
==================================

目的
====

| 本書では、Exastro IT Automation を利用する際に必要となる、Exastro Platform および Exastro IT Automation を Docker もしくは Podman 上に導入する手順について説明します。

特徴
====

| 最も簡単に Exastro IT Automation の利用を開始するための導入方法となります。
| 高い可用性やサービスレベルを必要とする場合には、:doc:`Kubernetes 版<kubernetes>` の利用を推奨します。

前提条件
========

| システム要件については :doc:`構成・構築ガイド<../../../configuration/docker_compose/docker_compose>` を参照してください。

- アプリケーション

  | :command:`curl` と :command:`sudo` コマンドが実行できる必要があります。

.. warning::
   | Exastro のプロセスは一般ユーザ権限で起動する必要があります。(rootユーザーでのインストールはできません)
   | また、利用する一般ユーザは sudoer で、全操作権限を持っている必要があります。


.. _docker_prep:

事前準備
========

| サービス公開用の URL を準備しておく必要があります。

.. list-table:: 例1) IPアドレスによるサービス公開
 :widths: 15, 20
 :header-rows: 1

 * - サービス
   - URL
 * - Exastro サービス
   - http://172.16.0.1:30080
 * - Exastro 管理用サービス
   - http://172.16.0.1:30081
 * - GitLab サービス
   - http://172.16.0.1:40080

.. list-table:: 例2) ドメインによるサービス公開
 :widths: 15, 20
 :header-rows: 1

 * - サービス
   - URL
 * - Exastro サービス
   - http://ita.example.com:30080
 * - Exastro 管理用サービス
   - http://ita.example.com:30081
 * - GitLab サービス
   - http://ita.example.com:40080

.. list-table:: 例3) LoadBalancer を経由したサービス公開
 :widths: 15, 20
 :header-rows: 1

 * - サービス
   - URL
 * - Exastro サービス
   - https://ita.example.com
 * - Exastro 管理用サービス
   - https://ita-mng.example.com
 * - GitLab サービス
   - https://gitlab.example.com

.. tip::
   | HTTPSを利用する場合には、 LoadBalancer または、リバースプロキシを利用する必要があります。
   | LoadBalancer または、リバースプロキシを利用する場合は、別途準備をする必要があります。

.. _install_docker_compose:

インストール (自動)
===================

.. note::
   | インストーラがOSを判断して、DockerまたはPodmanを選択します。

.. note::
   | インストールに失敗した場合は、 :ref:`docker_compose_uninstall` の :ref:`docker_compose_uninstall_all` または :ref:`docker_compose_uninstall_container` を実施して、再度インストールを実施してください。

| 最も簡単なインストール方法はインストールスクリプトを利用するインストールです。
| 1回のコマンド実行と対話型による設定が可能です。
| 以下、ユーザーはtest_user、ホームディレクトリは/home/test_userで実行した例です。


.. code-block:: shell
   :caption: インストールコマンド

   sh <(curl -sf https://ita.exastro.org/setup) install

| 上記のコマンドを実行すると、システムが要件を満たしていることを確認し、Exastro の起動に必要なコンテナ環境の構築を始めます。
| 必要なパッケージなどのインストールが完了すると下記のように対話形式で設定値を投入することが可能です。

.. code-block:: shell
   :caption: OASE コンテナデプロイ要否の確認

   Deploy OASE containers? (y/n) [default: y]:

.. code-block:: shell
   :caption: GitLab コンテナデプロイ要否の確認

   Deploy GitLab container? (y/n) [default: n]:

.. code-block:: shell
   :caption: パスワード自動生成の確認

   # Exastro システムが利用する MariaDB のパスワードや、システム管理者のパスワード自動生成するか？
   Generate all password and token automatically? (y/n) [default: y]:

.. tabs::

   .. group-tab:: https暗号化通信

      .. code-block:: shell
         :caption: Exastro サービスのURL

         Input the Exastro service URL:

      .. tip::
         | URLは https://～:ポート番号 まで指定してください。
         | ポート番号は、OSがRed Hat Enterprise Linuxの場合は30080、それ以外は80を指定してください。

      .. code-block:: shell
         :caption:  Exastro 管理用サービスのURL

         Input the Exastro management URL:

      .. tip::
         | URLは https://～:ポート番号 まで指定してください。
         | ポート番号は、OSがRed Hat Enterprise Linuxの場合は30081、それ以外は81を指定してください。

      .. code-block:: shell
         :caption:  自己署名のSSL/TLS証明書生成の有無

         Generate self-signed SSL certificate? (y/n) [default: y]:

      .. code-block:: shell
         :caption:  サーバ証明書/秘密鍵ファイルパス (上記の「自己署名のSSL/TLS証明書生成の有無」でnの場合)

         Input path to your SSL certificate file.
         certificate file path:
         private-key file path:

      .. tip::
         | certificate file pathは、サーバー証明書のファイルパスを指定してください。
         | private-key file pathは、秘密鍵ファイルのファイルパスを指定してください。

   .. group-tab:: http通信

      .. code-block:: shell
         :caption: Exastro サービスのURL

         Input the Exastro service URL:

      .. tip::
         | URLは http://～:ポート番号 まで指定してください。
         | ポート番号は、OSがRed Hat Enterprise Linuxの場合は30080、それ以外は80を指定してください。

      .. code-block:: shell
         :caption:  Exastro 管理用サービスのURL

         Input the Exastro management URL:

      .. tip::
         | URLは http://～:ポート番号 まで指定してください。
         | ポート番号は、OSがRed Hat Enterprise Linuxの場合は30081、それ以外は81を指定してください。


.. code-block:: shell
   :caption:  GitLabのURL (上記の「GitLab コンテナデプロイ要否の確認」でyの場合)

   Input the external URL of GitLab container [default: (nothing)]:

.. tip::
   | URLはポート番号まで指定してください。
   | ポート番号は40080を指定してください。

.. code-block:: shell
   :caption: 設定ファイルの生成の確認

   System parametes are bellow.

   System administrator password:    ********
   Database password:                ********
   OASE deployment                   true
   MongoDB password                  ********
   Service URL:                      http://ita.example.com:30080
   Manegement URL:                   http://ita.example.com:30081
   Docker GID:                       1000
   Docker Socket path:               /run/user/1000/podman/podman.sock
   GitLab deployment:                false

   Generate .env file with these settings? (y/n) [default: n]:

| :command:`y` もしくは :command:`yes` と入力すると、GitHub から Exastro システムの起動に必要な、Docker Compose ファイルのダウンロードやファイアウォールの設定投入が開始されます。

.. code-block:: shell
   :caption: Exastro コンテナデプロイ実施の確認

   Deploy Exastro containers now? (y/n) [default: n]:

| 詳細な設定を編集する場合は、 :command:`n` もしくは :command:`no` と入力し、以降の処理をスキップします。
| そのまま Exastro システムのコンテナ群を起動する場合は、 :command:`y` もしくは :command:`yes` と入力します。
| Exastro システムのデプロイには数分～数十分程度の時間が掛かります。(通信環境やサーバースペックによって状況は異なります。)

.. code-block:: shell
   :caption: Exastro コンテナデプロイ実行中

   Please wait for a little while. It will take 10 minutes or later..........

| Exastro システムのデプロイが完了すると、サービス接続情報が出力されます。

.. code-block:: shell
   :caption: サービス接続情報の出力

   System manager page:
     URL:                http://ita.example.com:30081/
     Login user:         admin
     Initial password:   ******************

   Organization page:
     URL:                http://ita.example.com:30080/{{ Organization ID }}/platform


   GitLab service is has completely started!

   Run creation organization command:
      bash /home/test_user/exastro-docker-compose/create-organization.sh


   ! ! ! ! ! ! ! ! ! ! ! ! ! ! !
   ! ! !   C A U T I O N   ! ! !
   ! ! ! ! ! ! ! ! ! ! ! ! ! ! !

   Be sure to reboot the you host operating system to ensure proper system operation.

   Reboot now? (y/n) [default: y]: y

| 必要に応じて出力された接続情報を保存し、:command:`y` もしくは :command:`yes` と入力し再起動を実施します。

.. note::
   | 生成された各種パラメータは、:file:`~/exastro-docker-compose/.env` に保存されています。


オーガナイゼーションの作成
==========================

| 再起動後に再度ログインをしたら、オーガナイゼーションの作成を行います。
| オーガナイゼーションの詳細については、 :doc:`../../../manuals/platform_management/organization` を参照してください。

.. tip::
   | GitLab が完全に立ち上がっていない状態では、オーガナイゼーションの作成はできません。

ワークスペースの作成
====================

| 作成したオーガナイゼーションにログインをしたら、ワークスペースを作成する必要があります。
| ワークスペースの作成については、:doc:`../../../manuals/organization_management/workspace` を参照してください。

Let's Try!!
===========

| Exastro IT Automation のトレーニングのために、 :doc:`../../../learn/quickstart/index` を実施することを推奨します。
| クイックスタートを実施することで、Exastro IT Automation の使い方や、パラメータシートの設計方針についての理解の手助けになるでしょう。

アップグレード
==============

| Exastro システムのアップグレード方法について紹介します。

アップグレードの事前確認
------------------------

.. danger::
   | Ansible Core を実行エンジンとしたシステム構成の場合、アップグレードに伴い作業対象機器のシステム要件が変更される場合があります。
   | アップグレード実施前に :doc:`../../../configuration/ansible/ansible_core` の作業対象機器のシステム要件を確認してください。


アップグレードの準備
--------------------

.. warning::
  | アップグレード実施前に、バックアップを取得しておくことを推奨します。
  | バックアップ対象は :file:`~/exastro-docker-compose/.volumes` です。

リポジトリの更新
^^^^^^^^^^^^^^^^^^^^^

| exastro-docker-composeリポジトリを更新します。

.. code-block:: shell
   :linenos:
   :caption: コマンド

   # exastro-docker-composeリポジトリの確認
   cd ~/exastro-docker-compose
   git pull



デフォルト設定値の更新の確認
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| デフォルト値の更新を確認します。
| インストール時に作成した設定ファイル :file:`~/exastro-docker-compose/.env` とアップグレード後の設定ファイルを比較します。

.. code-block:: shell
   :caption: コマンド

   cd ~/exastro-docker-compose

   # OSがAlmaLinuxまたはUbuntuの場合
   diff .env .env.docker.sample
   # OSがRed Hat Enterprise Linuxの場合
   diff .env .env.podman.sample

設定値の更新
^^^^^^^^^^^^

| デフォルト設定値の比較結果から、項目の追加などにより設定値の追加が必要な場合は更新をしてください。
| 設定値の更新が不要であればこの手順はスキップしてください。

アップグレード
--------------

メンテナンスモードへ移行
^^^^^^^^^^^^^^^^^^^^^^^^

| アップグレード中の不整合によるエラーの発生を防ぐためにメンテナンスモードに移行します。
| メンテナンスモードの移行の手順は :doc:`../../../manuals/maintenance/maintenance_mode` を参照してください。

アップグレード実施
^^^^^^^^^^^^^^^^^^

| アップグレードを実施します。

.. code-block:: bash
  :caption: コマンド

  sh <(curl -sf https://ita.exastro.org/setup) install

.. _docker_compose_uninstall:

メンテナンスモードの解除
^^^^^^^^^^^^^^^^^^^^^^^^

| アップグレード前に行ったメンテナンスモードを解除します。
| メンテナンスモードの解除の手順は :doc:`../../../manuals/maintenance/maintenance_mode` を参照してください。

アンインストール
================

| Exastro システムのアンインストール方法について紹介します。

アンインストールの準備
----------------------

.. warning::
  | アンインストール実施前に、バックアップを取得しておくことを推奨します。
  | バックアップ対象は :file:`~/exastro-docker-compose/.volumes` です。


アンインストール
----------------

.. _docker_compose_uninstall_all:

コンテナ＋データを削除する場合
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| コンテナイメージも削除されます。

.. code-block:: bash
   :caption: コマンド

   sh <(curl -sf https://ita.exastro.org/setup) remove -c


.. _docker_compose_uninstall_container:

コンテナイメージを残す場合
^^^^^^^^^^^^^^^^^^^^^^^^^^

コンテナ削除
************

.. code-block:: bash
   :caption: コマンド

   sh <(curl -sf https://ita.exastro.org/setup) remove

volumeを削除
************

.. code-block:: bash
   :caption: コマンド

   docker volume rm $(docker volume ls -qf dangling=true)

   # volumeが消えていることを確認
   docker volume ls

.volumesを削除
****************

.. code-block:: bash
   :caption: コマンド

   cd ~/exastro-docker-compose

   sudo rm -rf .volumes

.volumesを再作成
****************

.. note::
   | 再インストールする場合は下記を実施してください。

.. code-block:: bash
   :caption: コマンド

   cd ~/exastro-docker-compose

   git checkout .volumes
