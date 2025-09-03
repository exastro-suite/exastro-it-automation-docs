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

===================================
Exastro on Docker Compose - Offline
===================================

目的
====

| 本書では、Exastro IT Automation を利用する際に必要となる、Exastro Platform および Exastro IT Automation を Docker もしくは Podman 上に導入する手順について説明します。

特徴
====

| 最も簡単に Exastro IT Automation の利用を開始するための導入方法となります。
| 高い可用性やサービスレベルを必要とする場合には、:doc:`Kubernetes 版<kubernetes>` の利用を推奨します。

前提条件
========

| 資材を収集するサーバーは :command:`docker` が実行できる必要があります。(Podman利用時はpodman-dockerがインストールされている必要があります。)
| 資材を収集する環境とインストールする環境では、構築状態(OSのバージョン及びインストール済のパッケージ)を一致させる必要があります。

- デプロイ環境

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
     - 40GB

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

  .. warning::
    | 最小構成における要求リソースは Exastro IT Automation のコア機能に対する値です。GitLab や Ansible Automation Platform などの外部システムをデプロイする場合は、その分のリソースが別途必要となります。
    | データベースおよびファイルの永続化のために、別途ストレージ領域を用意する必要があります。
    | Storage サイズは、ユーザーの利用状況によるためあくまで目安となります。必要に応じて容量を確保してください。

- 通信要件

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

- 動作確認済みの、オペレーティングシステムとコンテナプラットフォーム

  以下は、動作確認済のバージョンとなります。

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

- アプリケーション

  | :command:`curl` と :command:`sudo` コマンドが実行できる必要があります。

.. warning::
   | Exastro のプロセスは一般ユーザ権限で起動する必要があります。(rootユーザーでのインストールはできません)
   | また、利用する一般ユーザは sudoer で、全操作権限を持っている必要があります。


.. _docker_prep_offline:

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


全体の流れ
==========
| オンライン環境での作業完了後に、オフライン環境にてインストールを実施します。

.. figure:: /images/ja/installation/docker_compose/flowimage.png
   :width: 800px
   :alt: フローイメージ

オンライン環境での手順
^^^^^^^^^^^^^^^^^^^^^^

| ①コンテナイメージのダウンロード
| ②RPMパッケージのダウンロード
| ③docker-composeリソースのダウンロード
| ④Exastroリソースのダウンロード


オフライン環境での手順
^^^^^^^^^^^^^^^^^^^^^^
| ⑤RPMパッケージのインストール
| ⑥コンテナイメージのアップロード
| ⑦docker-composeリソースのインストール
| ⑧Exastroリソースのインストール
| ⑨Exastro ITA起動
| ⑩カスタムイメージのビルド(必要な場合)


オンライン環境(インターネットに接続できる環境)での作業
======================================================

| 資材の収集を行います。
| 以下、ユーザーはtest_user、ホームディレクトリは/home/test_userで実行した例です。

①コンテナイメージのダウンロード
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| コンテナイメージをダウンロードするシェルスクリプトとコンテナイメージのリストを、25GB以上空き容量がある領域に作成します。
| これら2つは同じディレクトリに作成する必要があります。
| save.shの「["x.x.x"]="x.x.x"」にはExastro IT Automation App VersionとExastro Platform App Versionをそれぞれ記載します。
| `Component version <https://github.com/exastro-suite/exastro-helm?tab=readme-ov-file#component-version>`_ を参照し、最新のバージョンに書き換えてください。

.. code-block:: shell
   :caption: コマンド

   vi save.sh


.. code-block:: shell
   :caption: 下記のコードをコピー＆ペーストし、バージョンを書き換えます

   #!/bin/bash

   ITA_VERSION=$1
   declare -A PF_VERSION=(
     ["x.x.x"]="x.x.x"
   )
   if [ ! -d $1 ]; then
     mkdir $ITA_VERSION
   fi

   readarray -t image_list < "./image.list"
   for image in ${image_list[@]}
   do
     image_fullname=$(echo ${image} | sed -e "s/#__ITA_VERSION__#/${ITA_VERSION}/" -e "s/#__PF_VERSION__#/${PF_VERSION[$ITA_VERSION]}/")
     image_name=$(basename ${image_fullname} | sed -e "s/:/-/")
     if [ ! -e ${ITA_VERSION}/${image_name}.tar.gz ]; then
       echo $image_fullname $image_name
       docker pull ${image_fullname}
       if [ $? -eq 0 ]; then
         docker save ${image_fullname} | gzip -c > ${ITA_VERSION}/${image_name}.tar.gz
       fi
     fi
   done



.. code-block:: shell
   :caption: コマンド

   vi image.list

.. code-block:: shell
   :caption: 下記のコードをコピー＆ペーストする

   docker.io/mariadb:10.9.8
   docker.io/mariadb:10.11.4
   docker.io/gitlab/gitlab-ce:15.11.13-ce.0
   docker.io/mongo:6.0.7
   docker.io/exastro/keycloak:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-auth:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-web:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-api:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-job:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-migration:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-migration:#__PF_VERSION__#
   docker.io/exastro/exastro-it-automation-api-organization:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-api-admin:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-api-oase-receiver:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-api-ansible-execution-receiver:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-web-server:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-agent:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-execute:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-execute-onpremises:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-legacy-role-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-legacy-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-pioneer-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-towermaster-sync:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-collector:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-conductor-synchronize:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-conductor-regularly:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-menu-create:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-menu-export-import:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-excel-export-import:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cloud-ep-execute:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cloud-ep-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cli-execute:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cli-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-hostgroup-split:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-cicd-for-iac:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-oase-conclusion:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-execinstance-dataautoclean:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-file-autoclean:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-migration:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-agent:#__ITA_VERSION__#


.. tabs::

   .. group-tab:: docker

      ユーザがグループに追加されていない場合、パーミッションエラーとなることがあります。
      事前に追加作業をしている場合は、ここでの実施は不要です。


      .. code-block:: shell
         :caption: コマンド

         cat /etc/group | grep docker
         #ユーザーがグループに追加されていない場合は以下を実行します
         sudo usermod -aG docker ${USER}
         cat /etc/group | grep docker
         #ユーザーがグループに追加されていることを確認し、サーバーを再起動します
         sudo reboot


      オンライン環境に接続後、シェルスクリプトを実行しコンテナイメージをダウンロードします。
      引数にはITAのバージョンを指定します。	完了するまでに数十分程度の時間がかかります。(通信環境やサーバースペックによって状況は異なります。)


      .. code-block:: shell
         :caption: コマンド

         sudo systemctl start docker
         sudo chmod a+x save.sh
         sh ./save.sh x.x.x


   .. group-tab:: podman

      シェルスクリプトを実行しコンテナイメージをダウンロードします。	引数にはITAのバージョンを指定します。
      完了するまでに数十分程度の時間がかかります。(通信環境やサーバースペックによって状況は異なります。)

      .. code-block:: shell
         :caption: コマンド

         sudo chmod a+x save.sh
         sh ./save.sh x.x.x

②RPMパッケージのダウンロード
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|	パッケージをダウンロードします。

.. tabs::

   .. group-tab:: docker

      | ダウンロード先ディレクトリを/tmp/docker-repo、インストール先ディレクトリを/tmp/docker-installrootとした例です。

      .. code-block:: shell
         :caption: コマンド

         #リポジトリを追加します
         sudo dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo
         #現在のOSのバージョンを確認します
         cat /etc/os-release
         #--releasever=x.xは上記で得られたバージョンを指定します
         sudo dnf install -y --downloadonly --downloaddir=/tmp/docker-repo --installroot=/tmp/docker-installroot --releasever=x.x docker-ce docker-ce-cli containerd.io git container-selinux


      | createrepoをインストールします。

      .. code-block:: shell
         :caption: コマンド

         sudo dnf install -y createrepo


      | ローカルリポジトリを作成します。
      |	オフライン環境ではインターネット上のリポジトリサーバーを参照できないため、dnfによるパッケージのインストールができません。
      |	ローカルリポジトリにパッケージを追加することで、dnfによるパッケージインストールが可能となります。

      .. code-block:: shell
         :caption: コマンド

         sudo createrepo /tmp/docker-repo


   .. group-tab:: podman


      | ダウンロード先ディレクトリを/tmp/podman-repo、インストール先ディレクトリを/tmp/podman-installrootとしています。

      .. code-block:: shell
         :caption: コマンド

         #現在のOSのバージョンを確認します
         cat /etc/os-release
         #--releasever=x.xは上記で得られたバージョンを指定します
         sudo dnf install -y --downloadonly --downloaddir=/tmp/podman-repo --installroot=/tmp/podman-installroot --releasever=x.x container-selinux git podman podman-docker


      | createrepoをインストールします。

      .. code-block:: shell
         :caption: コマンド

         sudo dnf install -y createrepo


      | ローカルリポジトリを作成します。
      |	オフライン環境ではインターネット上のリポジトリサーバーを参照できないため、dnfによるパッケージのインストールができません。
      |	ローカルリポジトリにパッケージを追加することで、dnfによるパッケージインストールが可能となります。

      .. code-block:: shell
         :caption: コマンド

         sudo createrepo /tmp/podman-repo


③docker-composeリソースのダウンロード
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| `docker-compose-linux-x86_64 <https://github.com/docker/compose/releases>`_ をダウンロードします。
| バージョンはリンク先を参照し、必要に応じて書き換えます。
| 以下はバージョンを2.28.0とした例です。

.. code-block:: shell
   :caption: コマンド

   curl -LO https://github.com/docker/compose/releases/download/v2.28.0/docker-compose-linux-x86_64


④Exastroリソースのダウンロード
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|	docker-compose版Exastroのリソースをダウンロードします。
| 以下は/tmpディレクトリにダウンロードした例です。


.. code-block:: shell
   :caption: コマンド

   cd /tmp
   curl -OL https://github.com/exastro-suite/exastro-docker-compose/archive/main.tar.gz



資材の転送
^^^^^^^^^^
| オンライン環境で収集した資材をFTP、SCP、SFTP、記憶媒体等でオフライン環境に転送します。
| 容量が大きい場合は必要に応じて圧縮してください。
| 転送する資材と配置先は以下のとおりです。


- コンテナイメージ:任意のディレクトリ
- RPMパッケージ:/tmpの直下
- Exastroリソース:一般ユーザーのホームディレクトリ直下
- docker-compose-linux-x86_64:/usr/local/bin


オフライン環境(インターネットに接続できない環境)での作業
========================================================

| オンライン環境での作業完了後、オフライン環境にて下記の手順を実施します。


⑤RPMパッケージのインストール
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tabs::

   .. group-tab:: docker

      | ローカルリポジトリの設定ファイルを作成します。

      .. code-block:: shell
         :caption: コマンド

         sudo touch /etc/yum.repos.d/docker-repo.repo


      |	作成した設定ファイルに下記の情報を記載します。(※file: の後ろのスラッシュは3つ)

      .. code-block:: shell
         :caption: コマンド

         sudo vi /etc/yum.repos.d/docker-repo.repo

         [docker-repo]
         name=AlmaLinux-$releaserver - docker
         baseurl=file:///tmp/docker-repo
         enabled=1
         gpgcheck=0
         gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-AlmaLinux



      | パッケージをインストールします。

      .. code-block:: shell
         :caption: コマンド

         sudo dnf -y --disablerepo=\* --enablerepo=docker-repo install docker-ce docker-ce-cli containerd.io git container-selinux

      | エラーメッセージが表示された場合は、表示されているmoduleを検索し全てインストールします。


      .. code-block:: shell
         :caption: メッセージ例

         No available modular metadata for modular package 'perl-Mozilla-CA-20160104-7.module_el8.5.0+2812+ed912d05.noarch', it cannot be installed on the system
         No available modular metadata for modular package 'perl-Net-SSLeay-1.88-2.module_el8.6.0+2811+fe6c84b0.x86_64', it cannot be installed on the system
         Error: No available modular metadata for modular package


      .. code-block:: shell
         :caption: 表示されたmoduleを確認し、一度に全てインストールします

         #対象がperl-Mozilla-CA 及び perl-Net-SSLeayだった場合
         cd /tmp/docker-repo
         ls -l | grep -E "perl-Mozilla-CA|perl-Net-SSLeay"
         sudo dnf -y --disablerepo=\* --enablerepo=docker-repo perl-Mozilla-CA-20160104-7.module_el8.5.0+2812+ed912d05.noarch.rmp perl-Net-SSLeay-1.88-2.module_el8.6.0+2811+fe6c84b0.x86_64.rpm

      | パッケージのインストールを再度実行します。

      .. code-block:: shell
         :caption: コマンド

         sudo dnf -y --disablerepo=\* --enablerepo=docker-repo install docker-ce docker-ce-cli containerd.io git container-selinux


      | ユーザをdockerグループに追加します。

      .. code-block:: shell
         :caption: コマンド

         sudo systemctl enable --now docker
         cat /etc/group | grep docker
         sudo usermod -aG docker ${USER}
         #ユーザ名が表示されることを確認します。
         cat /etc/group | grep docker
         sudo  reboot
         #再度オフライン環境に接続します。



   .. group-tab:: podman

      | ローカルリポジトリの設定ファイルを作成します。

      .. code-block:: shell
         :caption: コマンド

         sudo touch /etc/yum.repos.d/podman-repo.repo


      |	作成した設定ファイルに下記の情報を記載します。(※file: の後ろのスラッシュは3つ)

      .. code-block:: shell
         :caption: コマンド

         sudo vi /etc/yum.repos.d/podman-repo.repo

         [podman-repo]
         name=RedHat-$releaserver - podman
         baseurl=file:///tmp/podman-repo
         enabled=1
         gpgcheck=0
         gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release


      | パッケージをインストールします。

      .. code-block:: shell
         :caption: コマンド

         sudo dnf -y --disablerepo=\* --enablerepo=podman-repo install container-selinux git podman podman-docker


⑥コンテナイメージのアップロード
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| コンテナイメージをアップロードするシェルスクリプトとコンテナイメージのリストを、25GB以上空き容量がある領域に作成します。
| これら2つはオンライン環境から持ち込んだコンテナイメージと同じディレクトリに作成する必要があります。なお、image.listはオンライン環境で作成したものと記載内容は同じです。
| また、load.shの「["x.x.x"]="x.x.x"」にはsave.shに記載したバージョンと同じ値を記載します。


.. code-block:: shell
   :caption: コマンド

   vi load.sh

.. code-block:: shell
   :caption: 下記のコードをコピー＆ペーストし、バージョンを書き換えます

   ITA_VERSION=$1
   declare -A PF_VERSION=(
     ["x.x.x"]="x.x.x"
   )

   readarray -t image_list < "./image.list"
   for image in ${image_list[@]}
   do
     image_fullname=$(echo ${image} | sed -e "s/#__ITA_VERSION__#/${ITA_VERSION}/" -e "s/#__PF_VERSION__#/${PF_VERSION[$ITA_VERSION]}/")
     image_name=$(basename ${image_fullname} | sed -e "s/:/-/")
     docker load < ${ITA_VERSION}/${image_name}.tar.gz
   done

   wait


.. code-block:: shell
   :caption: コマンド

   vi image.list

.. code-block:: shell
   :caption: 下記のコードをコピー＆ペーストする

   docker.io/mariadb:10.9.8
   docker.io/mariadb:10.11.4
   docker.io/gitlab/gitlab-ce:15.11.13-ce.0
   docker.io/mongo:6.0.7
   docker.io/exastro/keycloak:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-auth:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-web:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-api:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-job:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-migration:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-migration:#__PF_VERSION__#
   docker.io/exastro/exastro-it-automation-api-organization:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-api-admin:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-api-oase-receiver:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-api-ansible-execution-receiver:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-web-server:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-agent:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-execute:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-execute-onpremises:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-legacy-role-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-legacy-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-pioneer-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-towermaster-sync:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-collector:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-conductor-synchronize:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-conductor-regularly:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-menu-create:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-menu-export-import:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-excel-export-import:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cloud-ep-execute:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cloud-ep-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cli-execute:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cli-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-hostgroup-split:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-cicd-for-iac:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-oase-conclusion:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-execinstance-dataautoclean:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-file-autoclean:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-migration:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-agent:#__ITA_VERSION__#


.. tabs::

   .. group-tab:: docker

      | コンテナイメージを実行します。	引数にはsave.sh実行時に指定したITAのバージョンを指定します。

      .. code-block:: shell
         :caption: コマンド

         sudo chmod a+x load.sh
         sh ./load.sh x.x.x


   .. group-tab:: podman

      | コンテナイメージを実行します。	引数にはsave.sh実行時に指定したITAのバージョンを指定します。

      .. code-block:: shell
         :caption: コマンド

         sudo systemctl start podman
         sudo chmod a+x load.sh
         sh ./load.sh x.x.x


⑦docker-composeリソースのインストール
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|	 /usr/local/binに配置したdocker-compose-linux-x86_64に、必要なパーミッションを付与します。

.. code-block:: shell
   :caption: コマンド

   cd /usr/local/bin
   sudo mv docker-compose-linux-x86_64 docker-compose
   sudo chmod a+x /usr/local/bin/docker-compose
   sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose


⑧Exastroリソースのインストール
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| docker-compose版Exastroのリソースを一般ユーザーのホームディレクトリ直下に展開し、ディレクトリ名をexastro-docker-composeに変更します。


.. code-block:: shell
   :caption: コマンド

   tar -zxvf main.tar.gz
   sudo mv exastro-docker-compose-main exastro-docker-compose


.. tabs::

   .. group-tab:: docker


      | SELinuxの動作モードをSELINUX=permissiveに書き替えます。


      .. code-block:: shell
         :linenos:
         :caption: コマンド

         sudo vi /etc/selinux/config

      .. code-block:: shell
         :caption: /etc/selinux/config記載例

         # This file controls the state of SELinux on the system.
         # SELINUX= can take one of these three values:
         #     enforcing - SELinux security policy is enforced.
         #     permissive - SELinux prints warnings instead of enforcing.
         #     disabled - No SELinux policy is loaded.
         # See also:
         # https://docs.fedoraproject.org/en-US/quick-docs/getting-started-with-selinux/#getting-started-with-selinux-selinux-states-and-modes
         #
         # NOTE: In earlier Fedora kernel builds, SELINUX=disabled would also
         # fully disable SELinux during boot. If you need a system with SELinux
         # fully disabled instead of SELinux running with no policy loaded, you
         # need to pass selinux=0 to the kernel command line. You can use grubby
         # to persistently set the bootloader to boot with selinux=0:
         #
         #    grubby --update-kernel ALL --args selinux=0
         #
         # To revert back to SELinux enabled:
         #
         #    grubby --update-kernel ALL --remove-args selinux
         #
         SELINUX=permissive
         # SELINUXTYPE= can take one of these three values:
         #     targeted - Targeted processes are protected,
         #     minimum - Modification of targeted policy. Only selected processes are protected.
         #     mls - Multi Level Security protection.
         SELINUXTYPE=targeted

      .. code-block:: shell
         :caption: コマンド

         sudo reboot
         #再度オフライン環境に接続します。


      | ここで使用するsetup.shはExastro on Docker Compose - Onlineで使用しているものと共通です。リポジトリの設定をコメントアウトするため、下記を実施します。

      .. code-block:: shell
         :caption: コマンド

         sed -i 's/sudo dnf config-manager/#sudo dnf config-manager/' setup.sh



      | Exastro ServiceのパッケージとExastro source fileのインストールを行います。

      .. code-block:: shell
         :caption: コマンド

         cd ~/exastro-docker-compose && sh ./setup.sh install


      | 必要なパッケージなどのインストールが完了すると下記のように対話形式で設定値を投入することが可能です。
      | 詳細な設定を編集する場合は、:command:`n` もしくは :command:`no` と入力し、以降の処理をスキップします。
      | そのまま Exastro システムのコンテナ群を起動する場合は、:command:`y` もしくは :command:`yes` と入力します。
      | Exastro システムのデプロイには数分～数十分程度の時間が掛かります。(通信環境やサーバースペックによって状況は異なります。)


      .. code-block:: shell
         :caption: OASE コンテナデプロイ要否の確認

         Deploy OASE container ? (y/n) [default: y]:

      .. code-block:: shell
         :caption: Gitlab コンテナデプロイ要否の確認

         Deploy Gitlab containser? (y/n) [default: n]:

      .. code-block:: shell
         :caption: パスワードとトークンの自動作成の確認

         Generate all password and token automatically? (y/n) [default: y]:


      .. tabs::

         .. group-tab:: https暗号化通信

            .. code-block:: shell
               :caption: Exastro サービスのURL

               #ポート番号は、OSがRed Hat Enterprise Linuxの場合は30080、それ以外は80を指定してください。
               Input the Exastro service URL: https://ita.example.com:30080

            .. code-block:: shell
               :caption:  Exastro 管理用サービスのURL

               #ポート番号は、OSがRed Hat Enterprise Linuxの場合は30081、それ以外は81を指定してください。
               Input the Exastro management URL: https://ita.example.com:30081

            .. code-block:: shell
               :caption:  自己署名のSSL/TLS証明書生成の有無 (上記の「Exastro サービスのURL/Exastro 管理用サービスのURL」がhttpsの場合)

               Generate self-signed SSL certificate? (y/n) [default: y]:

            .. code-block:: shell
               :caption:  サーバ証明書/秘密鍵ファイルパス (上記の「自己署名のSSL/TLS証明書生成の有無」でnの場合)

               #certificate file pathは サーバー証明書のファイルパスを、private-key file pathは 秘密鍵ファイルのファイルパスを指定してください。
               Input path to your SSL certificate file.
               certificate file path:
               private-key file path:

         .. group-tab:: http通信

            .. code-block:: shell
               :caption: Exastro サービスのURL

               #ポート番号は、OSがRed Hat Enterprise Linuxの場合は30080、それ以外は80を指定してください。
               Input the Exastro service URL: http://ita.example.com:30080

            .. code-block:: shell
               :caption:  Exastro 管理用サービスのURL

               #ポート番号は、OSがRed Hat Enterprise Linuxの場合は30081、それ以外は81を指定してください。
               Input the Exastro management URL: http://ita.example.com:30081


      .. code-block:: shell
         :caption: Gitlab コンテナのURL(Gitlab コンテナをデプロイする場合は入力が必要です。)

         #ポート番号は40080を指定してください。
         Input the external URL of Gitlab container  [default: (nothing)]:

      .. code-block:: shell
         :caption: 設定ファイルの生成の確認

         System parametes are bellow.

         System administrator password:    ********
         Database password:                ********
         OASE deployment                   true
         MongoDB password                  ********
         Service URL:                      http://ita.example.com:30080
         Manegement URL:                   http://ita.example.com:30081
         Docker GID:                       985
         Docker Socket path:               /var/run/docker.sock
         GitLab deployment:                false

         Generate .env file with these settings? (y/n) [default: n]


      | サーバーを再起動します。

      .. code-block:: shell
         :caption: コマンド

         sudo reboot


      .. code-block:: shell
         :caption: コマンド

         cd ~/exastro-docker-compose && sh ./setup.sh install


      .. code-block:: shell
         :caption: .env再作成の確認

         #何も入力せずにEnterを押下します。
         Regenerate .env file? (y/n) [default: n]:

      .. code-block:: shell
         :caption: Exastroコンテナのデプロイ確認

         #yを入力します。
         Deploy Exastro containers now? (y/n) [default: n]:



      | コンテナのSTATUSがUPになっていることを確認します。

      .. code-block:: shell
         :caption: コマンド

         docker ps



   .. group-tab:: podman

      | SELinuxの動作モードをSELINUX=permissiveに書き替えます。


      .. code-block:: shell
         :linenos:
         :caption: コマンド

         sudo vi /etc/selinux/config

      .. code-block:: shell
         :caption: /etc/selinux/config記載例

         # This file controls the state of SELinux on the system.
         # SELINUX= can take one of these three values:
         #     enforcing - SELinux security policy is enforced.
         #     permissive - SELinux prints warnings instead of enforcing.
         #     disabled - No SELinux policy is loaded.
         # See also:
         # https://docs.fedoraproject.org/en-US/quick-docs/getting-started-with-selinux/#getting-started-with-selinux-selinux-states-and-modes
         #
         # NOTE: In earlier Fedora kernel builds, SELINUX=disabled would also
         # fully disable SELinux during boot. If you need a system with SELinux
         # fully disabled instead of SELinux running with no policy loaded, you
         # need to pass selinux=0 to the kernel command line. You can use grubby
         # to persistently set the bootloader to boot with selinux=0:
         #
         #    grubby --update-kernel ALL --args selinux=0
         #
         # To revert back to SELinux enabled:
         #
         #    grubby --update-kernel ALL --remove-args selinux
         #
         SELINUX=permissive
         # SELINUXTYPE= can take one of these three values:
         #     targeted - Targeted processes are protected,
         #     minimum - Modification of targeted policy. Only selected processes are protected.
         #     mls - Multi Level Security protection.
         SELINUXTYPE=targeted

      .. code-block:: shell
         :caption: コマンド

         sudo reboot
         #再度オフライン環境に接続します。


      | Exastro ServiceのパッケージとExastro source fileのインストールを行います。

      .. code-block:: shell
         :caption: コマンド

         cd ~/exastro-docker-compose && sh ./setup.sh install


      | 必要なパッケージなどのインストールが完了すると下記のように対話形式で設定値を投入することが可能です。
      | 詳細な設定を編集する場合は、:command:`n` もしくは :command:`no` と入力し、以降の処理をスキップします。
      | そのまま Exastro システムのコンテナ群を起動する場合は、:command:`y` もしくは :command:`yes` と入力します。
      | Exastro システムのデプロイには数分～数十分程度の時間が掛かります。(通信環境やサーバースペックによって状況は異なります。)


      .. code-block:: shell
         :caption: OASE コンテナデプロイ要否の確認

         Deploy OASE container URL? (y/n) [default: y]:

      .. code-block:: shell
         :caption: Gitlab コンテナデプロイ要否の確認

         Deploy Gitlab containser? (y/n) [default: n]:

      .. code-block:: shell
         :caption: パスワードとトークンの自動作成の確認

         Generate all password and token automatically? (y/n) [default: y]:

      .. tabs::

         .. group-tab:: https暗号化通信

            .. code-block:: shell
               :caption: Exastro サービスのURL

               #ポート番号は、OSがRed Hat Enterprise Linuxの場合は30080、それ以外は80を指定してください。
               Input the Exastro service URL: https://ita.example.com:30080

            .. code-block:: shell
               :caption:  Exastro 管理用サービスのURL

               #ポート番号は、OSがRed Hat Enterprise Linuxの場合は30081、それ以外は81を指定してください。
               Input the Exastro management URL: https://ita.example.com:30081

            .. code-block:: shell
               :caption:  自己署名のSSL/TLS証明書生成の有無 (上記の「Exastro サービスのURL/Exastro 管理用サービスのURL」がhttpsの場合)

               Generate self-signed SSL certificate? (y/n) [default: y]:

            .. code-block:: shell
               :caption:  サーバ証明書/秘密鍵ファイルパス (上記の「自己署名のSSL/TLS証明書生成の有無」でnの場合)

               #certificate file pathは サーバー証明書のファイルパスを、private-key file pathは 秘密鍵ファイルのファイルパスを指定してください。
               Input path to your SSL certificate file.
               certificate file path:
               private-key file path:

         .. group-tab:: http通信

            .. code-block:: shell
               :caption: Exastro サービスのURL

               #ポート番号は、OSがRed Hat Enterprise Linuxの場合は30080、それ以外は80を指定してください。
               Input the Exastro service URL: http://ita.example.com:30080

            .. code-block:: shell
               :caption:  Exastro 管理用サービスのURL

               #ポート番号は、OSがRed Hat Enterprise Linuxの場合は30081、それ以外は81を指定してください。
               Input the Exastro management URL: http://ita.example.com:30081

      .. code-block:: shell
         :caption: GitLab コンテナデプロイ要否の確認(Gitlab コンテナをデプロイする場合は入力が必要です。)

         #ポート番号は40080を指定してください。
         Input the external URL of Gitlab container  [default: (nothing)]:

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

         Generate .env file with these settings? (y/n) [default: n]


      | サーバーを再起動します。

      .. code-block:: shell
         :caption: コマンド

         sudo reboot


      .. code-block:: shell
         :caption: コマンド

         cd ~/exastro-docker-compose && sh ./setup.sh install


      .. code-block:: shell
         :caption: .env再作成の確認

         #何も入力せずにEnterを押下します。
         Regenerate .env file? (y/n) [default: n]:

      .. code-block:: shell
         :caption: Exastroコンテナのデプロイ確認

         #yを入力します。
         Deploy Exastro containers now? (y/n) [default: n]:


      | コンテナのSTATUSがUPになっていることを確認します。

      .. code-block:: shell
         :caption: コマンド

         podman ps


⑩カスタムイメージのビルド(必要な場合)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Ansible-Coreでの作業時に、独自に作成した共通モジュールを事前にインストールしたもの等カスタム化を施したAnsible実行イメージを使用する場合は、
| カスタム化を施したイメージをオフライン環境にてビルドするか、予めオンライン環境から転送しておき、
| 設定ファイル(.env)で指定した「レポジトリ名称:タグ」と一致させておく必要があります。


.. tabs::

   .. group-tab:: docker

      | 該当するカスタム化を施したイメージが存在していることを確認します。
      |
      | ・ 現在の設定値を確認します。

      .. code-block:: shell
         :caption: 設定値確認用コマンド(オフライン環境)

         cat ~/exastro-docker-compose/.env | grep -E "ANSIBLE_AGENT_IMAGE|ANSIBLE_AGENT_IMAGE_TAG"

      | 　 ANSIBLE_AGENT_IMAGE：「レポジトリ名称」の指定
      | 　 ANSIBLE_AGENT_IMAGE_TAG：「タグ」の指定  となります。
      | 　 (コメントアウトされている場合は既定値が使用されます)

      .. code-block:: shell
         :caption: 設定値確認結果出力例(オフライン環境)

         ANSIBLE_AGENT_IMAGE=my-exastro-ansible-agent-custom
         ANSIBLE_AGENT_IMAGE_TAG=2.5.3

      | ・ 上記で指定されたイメージが存在していることを確認します。

      .. code-block:: shell
         :caption: イメージ確認用コマンド(オフライン環境)

         docker images <ANSIBLE_AGENT_IMAGEの値>:<ANSIBLE_AGENT_IMAGE_TAGの値>

      .. code-block:: shell
         :caption: イメージ確認結果出力例(オフライン環境)

         REPOSITORY                        TAG       IMAGE ID       CREATED       SIZE
         my-exastro-ansible-agent-custom   2.5.3     c73215585c2f   4 weeks ago   962MB

      |
      | 表示されない場合は、該当するカスタム化を施したイメージをビルドする必要があります。

      .. code-block:: shell
         :caption: ビルド用コマンド例(オフライン環境)

         cd {カスタム用のdocker-compose.yamlが存在するディレクトリ}
         docker compose build

      | 別途、オンライン環境から転送することも可能です。

      .. code-block:: shell
         :caption: イメージエクスポート用コマンド例(オンライン環境)

         docker save <ANSIBLE_AGENT_IMAGEの値>:<ANSIBLE_AGENT_IMAGE_TAGの値> | gzip -c > 2.5.3/my-exastro-ansible-agent-custom.tar.gz

      .. code-block:: shell
         :caption: イメージインポート用コマンド例(オフライン環境)

         docker load  < 2.5.3/my-exastro-ansible-agent-custom.tar.gz


      | 該当するカスタム化を施したイメージが表示されることを確認します。

      .. code-block:: shell
         :caption: イメージ確認用コマンド(オフライン環境)

         docker images <ANSIBLE_AGENT_IMAGEの値>:<ANSIBLE_AGENT_IMAGE_TAGの値>


      .. code-block:: shell
         :caption: イメージ確認結果出力例(オフライン環境)

         REPOSITORY                        TAG       IMAGE ID       CREATED       SIZE
         my-exastro-ansible-agent-custom   2.5.3     c73215585c2f   4 weeks ago   962MB


   .. group-tab:: podman

      | 該当するカスタム化を施したイメージが存在していることを確認します。
      |
      | ・ 現在の設定値を確認します。

      .. code-block:: shell
         :caption: 設定値確認用コマンド(オフライン環境)

         cat ~/exastro-docker-compose/.env | grep -E "ANSIBLE_AGENT_IMAGE|ANSIBLE_AGENT_IMAGE_TAG"

      | 　 ANSIBLE_AGENT_IMAGE：「レポジトリ名称」の指定
      | 　 ANSIBLE_AGENT_IMAGE_TAG：「タグ」の指定  となります。
      | 　 (コメントアウトされている場合は既定値が使用されます)

      .. code-block:: shell
         :caption: 設定値確認結果出力例(オフライン環境)

         ANSIBLE_AGENT_IMAGE=my-exastro-ansible-agent-custom
         ANSIBLE_AGENT_IMAGE_TAG=2.5.3

      | ・ 上記で指定されたイメージが存在していることを確認します。

      .. code-block:: shell
         :caption: イメージ確認用コマンド(オフライン環境)

         podman images <ANSIBLE_AGENT_IMAGEの値>:<ANSIBLE_AGENT_IMAGE_TAGの値>

      .. code-block:: shell
         :caption: イメージ確認結果出力例(オフライン環境)

         REPOSITORY                        TAG       IMAGE ID       CREATED       SIZE
         my-exastro-ansible-agent-custom   2.5.3     c73215585c2f   4 weeks ago   962MB

      |
      | 表示されない場合は、該当するカスタム化を施したイメージをビルドする必要があります。

      .. code-block:: shell
         :caption: ビルド用コマンド例(オフライン環境)

         cd {カスタム用のdocker-compose.yamlが存在するディレクトリ}
         podman compose build

      | 別途、オンライン環境から転送することも可能です。

      .. code-block:: shell
         :caption: イメージエクスポート用コマンド例(オンライン環境)

         podman save <ANSIBLE_AGENT_IMAGEの値>:<ANSIBLE_AGENT_IMAGE_TAGの値> | gzip -c > 2.5.3/my-exastro-ansible-agent-custom.tar.gz

      .. code-block:: shell
         :caption: イメージインポート用コマンド例(オフライン環境)

         podman load  < 2.5.3/my-exastro-ansible-agent-custom.tar.gz

      | 該当するカスタム化を施したイメージが表示されることを確認します。

      .. code-block:: shell
         :caption: イメージ確認用コマンド(オフライン環境)

         podman images <ANSIBLE_AGENT_IMAGEの値>:<ANSIBLE_AGENT_IMAGE_TAGの値>


      .. code-block:: shell
         :caption: イメージ確認結果出力例(オフライン環境)

         REPOSITORY                        TAG       IMAGE ID       CREATED       SIZE
         my-exastro-ansible-agent-custom   2.5.3     c73215585c2f   4 weeks ago   962MB


ログイン
========

| ログインに使用するユーザ名とパスワードの確認方法です。

.. code-block:: shell
   :linenos:
   :caption: コマンド

   cd ~/exastro-docker-compose
   cat .env


.. code-block:: shell
   :linenos:
   :caption: ログイン情報

   ### Initial account information for creating system administrators
   #### Specify the username and password
   # SYSTEM_ADMIN=<ユーザー名>
   SYSTEM_ADMIN_PASSWORD=<パスワード>


オーガナイゼーションの作成
==========================

| 再起動後に再度ログインをしたら、オーガナイゼーションの作成を行います。
| オーガナイゼーションの詳細については、 :doc:`../../../manuals/platform_management/organization` を参照してください。


ワークスペースの作成
====================

| 作成したオーガナイゼーションにログインをしたら、ワークスペースを作成する必要があります。
| ワークスペースの作成については、:doc:`../../../manuals/organization_management/workspace` を参照してください。


アップグレード時のメンテナンスモードへの移行について
====================================================

アップグレード前：メンテナンスモードへ移行
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| アップグレード中の不整合によるエラーの発生を防ぐためにメンテナンスモードに移行します。
| メンテナンスモードの移行の手順は :doc:`../../../manuals/maintenance/maintenance_mode` を参照してください。


アップグレード後：メンテナンスモードの解除
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| アップグレード前に行ったメンテナンスモードを解除します。
| メンテナンスモードの解除の手順は :doc:`../../../manuals/maintenance/maintenance_mode` を参照してください。
