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

===============================
Exastro on Kubernetes - Offline
===============================



目的
====

| 本書では、Exastro IT Automation を利用する際に必要となる、Exastro Platform および Exastro IT Automation を Kubernetes 上に導入する手順について説明します。

特徴
====

| 高い可用性やサービスレベルを必要とされる際の、Exastro IT Automation の導入方法となります。
| 評価や一時的な利用など、簡単に利用を開始したい場合には、:doc:`Docker Compose 版<docker_compose>` の利用を推奨します。

前提条件
========

| 資材を収集する環境とインストールする環境では、OSを一致させる必要があります。
| 資材を収集するサーバは :command:`curl` コマンドが実行できる必要があります。
| オフライン環境として使用するサーバはFirewalldがインストールされている必要があります。

.. warning::
  | kubernetesのオフライン用設定ファイルを適用するため、Exastroをインストールサーバは外部と通信できないことを確認してください。

- クライアント要件

  | 動作確認が取れているクライアントアプリケーションのバージョンは下記のとおりです。
  
  .. list-table:: クライアント要件
   :widths: 20, 20
   :header-rows: 1

   * - アプリケーション
     - バージョン
   * - Helm
     - v3.9.x
   * - kubectl
     - 1.23

- 動作確認済みオペレーティングシステム

  以下は、動作確認済のバージョンとなります。

  .. list-table:: オペレーティングシステム
   :widths: 20, 20
   :header-rows: 1

   * - 種別
     - バージョン
   * - Red Hat Enterprise Linux
     - バージョン	8.9

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
     - 10GB
   * - Kubernetes (Container image size)
     - 1.23 以上

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
   * - Kubernetes (Container image size)
     - 1.23 以上

  .. warning::
    | 要求リソースは Exastro IT Automation のコア機能に対する値です。同一クラスタ上に Keycloak や MariaDB などの外部ツールをデプロイする場合は、その分のリソースが別途必要となります。
    | データベースおよびファイルの永続化のために、別途ストレージ領域を用意する必要があります。
    | Storage サイズには、Exastro IT Automation が使用する入出力データのファイルは含まれていないため、利用状況に応じて容量を見積もる必要があります。

- 通信要件

  - | クライアントからデプロイ先のコンテナ環境にアクセスできる必要があります。
  - | Platform 管理者用と一般ユーザー用の2つ通信ポートが使用となります。
  - | コンテナ環境からコンテナイメージの取得のために、Docker Hub に接続できる必要があります。

- 外部コンポーネント

  - | MariaDB、もしくは、MySQL サーバ
  - | GitLab リポジトリ、および、アカウントの払い出しが可能なこと

  .. warning::
    | GitLab 環境を同一クラスタに構築する場合は、GitLab のシステム要件に対応する最小要件を追加で容易する必要があります。
    | Database 環境を同一クラスタに構築する場合は、使用する Database のシステム要件に対応する最小要件を定義する必要があります


全体の流れ
==========
| オンライン環境での作業完了後に、オフライン環境にてインストールを実施します。
| ※本説明では、資材収集サーバー1台、Ansible実行サーバ1台、Exastroインストールサーバ1台の計3台で実施しています。
											
.. figure:: /images/ja/installation/kubernetes/k8s_flow.png
   :width: 900px
   :alt: フローイメージ


オンライン環境での手順
^^^^^^^^^^^^^^^^^^^^^^
													
| ①事前準備
| ②helmリポジトリ及び設定ファイルの取得
| ③kubespray及びkubernetesのコンテナイメージの取得
| ④パッケージファイルの取得
| ⑤Exastroのコンテナイメージを取得
| ⑥オフライン環境で使用するシェルスクリプト等を作成


オフライン環境での手順
^^^^^^^^^^^^^^^^^^^^^^

| ⑦資材受け取り
| ⑧Ansible実行サーバでの準備
| ⑨Exastroインストールサーバでの準備
| ⑩kubernetesのコンテナイメージの設定
| ⑪自己署名証明書及びNginxの設定
| ⑫パッケージのインストール
| ⑬kubesprayのインストール
| ⑭Exastroのインストール
| ⑮Exastroインストール後の設定





オンライン環境(インターネットに接続できる環境)での作業
======================================================

| 資材の収集を行います。


①事前準備
^^^^^^^^^^
| コンテナイメージを取得するため :command:`docker` コマンドを使用します。
| インストールされていない場合は以下の手順でdockerをインストールします。

.. code-block:: shell
   :caption: コマンド

   dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo

   dnf remove -y runc

   dnf install -y docker-ce docker-ce-cli containerd.io container-selinux

   systemctl enable --now docker

   cat /etc/group | grep docker


| ユーザーがグループに追加されていない場合は以下を実行します。

.. code-block:: shell
   :caption: コマンド

   usermod -aG docker ${USER}

   cat /etc/group | grep docker

   reboot


| コンテナイメージを取得する際、dockerのバージョンによってはDocker Image Format v1 及び Docker Image manifestについてのエラーが起きることがあります。
| 環境変数を追加し、事前に対応します。

.. code-block:: shell
   :caption: コマンド

   cd  /etc/systemd/system/docker.service.d   

   #docker.service.dディレクトリが存在しない場合は新しく作成する
   cd  /etc/systemd/system/

   mkdir docker.service.d && cd docker.service.d

| http-proxy.confが存在しない場合は新しく作成し、以下の2行を記載します。

.. code-block:: shell
   :caption: コマンド

   vi http-proxy.conf
   
   [Service]
   Environment="DOCKER_ENABLE_DEPRECATED_PULL_SCHEMA_1_IMAGE=1"

.. note::
    | ファイルが存在する場合はEnvironment="DOCKER_ENABLE_DEPRECATED_PULL_SCHEMA_1_IMAGE=1"を追記します。

| dockerを再起動し、追加した環境変数を確認します。

.. code-block:: shell
   :caption: コマンド

   systemctl daemon-reload

   systemctl restart docker

   systemctl show --property=Environment docker


| その他に必要なパッケージをインストールします。

.. code-block:: shell
   :caption: コマンド

   dnf install -y git python39 

   pip3.9 install ruamel-yaml

   pip3.9 install ansible


②helmリポジトリ及び設定ファイルの編集
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| 作業用ディレクトリを作成します。

.. code-block:: shell
   :caption: コマンド

   cd /tmp

   mkdir work && cd work

|  :command:`helm` コマンドがインストールされていない場合、以下の手順でインストールします。
|  詳細は `helmの公式ドキュメント <https://helm.sh/ja/docs/intro/install/>`_ をご参照ください。

.. code-block:: shell
   :caption: コマンド

   curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3

   chmod 700 get_helm.sh
   
   ./get_helm.sh
   
   helm version

| Exastro システムの Helm リポジトリを登録後、リポジトリを取得します。

.. code-block:: shell
   :caption: コマンド

   helm repo add exastro https://exastro-suite.github.io/exastro-helm/ --namespace exastro

   helm repo update
   
   helm pull exastro/exastro

   rm -f get_helm.sh


| 設定ファイルを取得し、以降の手順でパラメータを設定していきます。

.. code-block:: shell
   :caption: コマンド

   helm show values exastro/exastro > exastro.yaml


.. raw:: html

   <details>
     <summary>exastro.yaml</summary>

.. literalinclude:: ../../literal_includes/exastro.yaml
   :caption: exastro.yaml
   :language: yaml
   :linenos:

.. raw:: html

   </details>


サービス公開の設定
------------------

| :file:`exastro.yaml` を編集しサービス公開に必要なパラメータを設定していきます。
| ここではNodePortを使用する方法を例に記載しています。
| EXTERNAL_URLとEXTERNAL_URL_MNGはExastroをインストールするサーバのIPアドレスを指定します。


.. code-block:: shell
   :caption: コマンド

   EXTERNAL_URL: "http://xx.xx.xx.xx:30080"
   EXTERNAL_URL_MNG: "http://xx.xx.xx.xx:30081"


.. literalinclude:: ../../literal_includes/exastro_nodeport_setting.yaml
   :diff: ../../literal_includes/exastro.yaml
   :caption: exastro.yaml
   :language: yaml


データベース連携
----------------

| Exastro サービスを利用するためには、CMDB やオーガナイゼーションの管理のためのデータベースが必要となります。
| データベースコンテナの root パスワードを作成し、他のコンテナからもアクセスできるように作成した root アカウントのパスワードを設定します。
| また、データベースのデータを永続化するために利用するストレージを指定します。
| ここではデータベースコンテナ 及び hostPathを使用する方法を例に記載しています。

.. warning::
  | :command:`DB_ADMIN_USER` と :command:`MONGO_ADMIN_USER` で指定するDBの管理ユーザには、データベースとユーザを作成する権限が必要です。

.. warning::
  | 認証情報などはすべて平文で問題ありません。(Base64エンコードは不要)

.. _configuration_database_container:

1. | データベースコンテナの設定

   | データベースコンテナの root パスワードを設定します。
   | また、データベースのデータを永続化するために利用するストレージを指定します。

   .. include:: ../../../include/helm_option_databaseDefinition.rst


   .. literalinclude:: ../../literal_includes/exastro_database_hostpath.yaml
      :diff: ../../literal_includes/exastro.yaml
      :caption: exastro.yaml
      :language: yaml

2.  | Exastro IT Automation 用データベースの設定

    | Exastro IT Automation コンテナがデータベースに接続できるようにするために、:ref:`DATABASE_SETUP` で作成した root アカウントのパスワードを設定します。

    .. include:: ../../../include/helm_option_itaDatabaseDefinition.rst

    .. literalinclude:: ../../literal_includes/exastro_database_ita_setting.yaml
       :diff: ../../literal_includes/exastro.yaml
       :caption: exastro.yaml
       :language: yaml

3.  | Exastro 共通基盤用データベースの設定

    | Exastro 共通基盤のコンテナがデータベースに接続できるようにするために、「1.  データベースコンテナの設定」で作成した root アカウントのパスワードを設定します。

    .. include:: ../../../include/helm_option_pfDatabaseDefinition.rst

    .. literalinclude:: ../../literal_includes/exastro_database_pf_setting.yaml
       :diff: ../../literal_includes/exastro.yaml
       :caption: exastro.yaml
       :language: yaml

4.  OASE用データベースの設定

    | OASE用データベースの接続情報を設定します。

    .. warning::
       | MongoDBのユーザやデータベースを「自動払い出し( :ref:`organization_creation` )」で利用する場合は、:command:`MONGO_HOST` の指定が必要です。
       | :command:`MONGO_ADMIN_USER` がユーザやデータベースの作成・削除が可能（rootロールまたは同等の権限）である必要があります。
       | 上記の権限がない場合は「Python接続文字列( :ref:`organization_creation` )」の指定が必要です。
       | また、自動払い出しを利用しない場合は :command:`MONGO_HOST` の指定は不要です。

    .. include:: ../../../include/helm_option_mongoDefinition.rst

    .. literalinclude:: ../../literal_includes/exastro_database_mongo_setting.yaml
       :diff: ../../literal_includes/exastro.yaml
       :caption: exastro.yaml
       :language: yaml
       
5.  MongoDBコンテナの設定

    | データベースのデータを永続化するために利用するストレージを指定します

    .. warning::
       | MongoDBコンテナを利用しない場合、:command:`exastro-platform.mongo.enabled` をfalseに指定して下さい。

    .. include:: ../../../include/helm_option_mongo.rst

    .. literalinclude:: ../../literal_includes/exastro_mongodb_hostpath.yaml
       :diff: ../../literal_includes/exastro.yaml
       :caption: exastro.yaml
       :language: yaml


アプリケーションの DB ユーザー設定
----------------------------------

| Exastro でアプリケーションのために作成する DB ユーザーの設定をします。



設定例
^^^^^^

| 下記のアプリケーションが利用・作成する DB ユーザーをそれぞれ設定します。

- Exastro IT Automation
- Exastro 共通基盤
- Keycloak

.. warning::
  | 認証情報などはすべて平文で問題ありません。(Base64エンコードは不要)

1. | Exastro IT Automation 用データベースの設定

   | アプリケーションが利用・作成する DB ユーザーを設定します。

   .. include:: ../../../include/helm_option_itaDatabaseDefinition.rst

   .. literalinclude:: ../../literal_includes/exastro_db_user_ita.yaml
      :diff: ../../literal_includes/exastro.yaml
      :caption: exastro.yaml
      :language: yaml

2. | Keycloak 用データベースの設定

   | アプリケーションが利用・作成する DB ユーザーを設定します。

   .. include:: ../../../include/helm_option_keycloakDefinition.rst

   .. literalinclude:: ../../literal_includes/exastro_db_user_keycloak.yaml
      :diff: ../../literal_includes/exastro.yaml
      :caption: exastro.yaml
      :language: yaml

3. | Exastro 共通基盤用データベースの設定

   | アプリケーションが利用・作成する DB ユーザーを設定します。

   .. include:: ../../../include/helm_option_pfDatabaseDefinition.rst

   .. literalinclude:: ../../literal_includes/exastro_db_user_pf.yaml
      :diff: ../../literal_includes/exastro.yaml
      :caption: exastro.yaml
      :language: yaml


GitLab 連携設定
---------------

| GitLab 連携のための接続情報を登録します。

.. warning::
     | GitLab 連携を利用しない場合は、下記のように設定してください。
     | GITLAB_HOST: ""

.. include:: ../../../include/helm_option_gitlabDefinition.rst

.. warning::
  | GITLAB_ROOT_TOKEN は下記の権限スコープが割り当てられたトークンが必要です。
  | ・api
  | ・write_repository
  | ・sudo

| 下記は、GitLab 連携の設定例を記載しています。

.. literalinclude:: ../../literal_includes/exastro_gitlab_setting.yaml
   :diff: ../../literal_includes/exastro.yaml
   :caption: exastro.yaml
   :language: yaml



システム管理者の作成
--------------------

| セットアップ時に システム管理者の初期ユーザーを作成するための情報を設定します。

.. include:: ../../../include/helm_option_keycloakDefinition.rst

.. literalinclude:: ../../literal_includes/exastro_usercreate_system_manager.yaml
   :diff: ../../literal_includes/exastro.yaml
   :caption: exastro.yaml
   :language: yaml


永続ボリュームの設定
--------------------

| 永続ボリュームの設定ファイルを作成します。
| データベースのデータ永続化 (クラスタ内コンテナがある場合)、および、ファイルの永続化のために、永続ボリュームを設定する必要があります。
| 永続ボリュームの詳細については、 `永続ボリューム - Kubernetes <https://kubernetes.io/ja/docs/concepts/storage/persistent-volumes/#%E6%B0%B8%E7%B6%9A%E3%83%9C%E3%83%AA%E3%83%A5%E3%83%BC%E3%83%A0>`_ を参照してください。
| ここではKubernetes のノード上のストレージ領域を使用する方法を例に記載しています。

.. note::
    | 監査ログを永続ボリュームに出力する際は、永続ボリュームの設定が必要となります。

.. tip::
    | hostpathで指定するディレクトリは、アクセス権を設定する必要があります
    | 例） chmod 777 [該当のディレクトリ]
.. danger::
    | データの永続化自体は可能ですが、コンピュートノードの増減や変更によりデータが消えてしまう可能性があるため本番環境では使用しないでください。
    | また、Azure で構築した AKS クラスタは、クラスタを停止すると AKS クラスターの Node が解放されるため、保存していた情報は消えてしまいます。そのため、Node が停止しないように注意が必要となります。



| hostPath を使用した例を記載します。

.. code-block:: shell
   :caption: コマンド

   vi pv-database.yaml

.. literalinclude:: ../../literal_includes/pv-database.yaml
   :caption: pv-database.yaml (データベース用ボリューム)
   :linenos:

.. code-block:: shell
   :caption: コマンド

   vi pv-ita-common.yaml

.. literalinclude:: ../../literal_includes/pv-ita-common.yaml
   :caption: pv-ita-common.yaml (ファイル用ボリューム)
   :linenos:

.. code-block:: shell
   :caption: コマンド

   vi pv-mongo.yaml

.. literalinclude:: ../../literal_includes/pv-mongo.yaml
   :caption: pv-mongo.yaml (OASE用ボリューム) ※OASEを利用しない場合設定不要
   :linenos:

.. code-block:: shell
   :caption: コマンド

   vi pv-gitlab.yaml

.. literalinclude:: ../../literal_includes/pv-gitlab.yaml
   :caption: pv-gitlab.yaml (GitLab用ボリューム) ※外部GitLabを利用する場合設定不要
   :linenos:

| ※ 監査ログを永続ボリュームに出力する際は、exastro.yamlに以下の設定が必要となります

.. code-block:: diff
   :caption: exastro.yaml

     pfAuditLogDefinition:
       name: pf-auditlog
       persistence:
   -      enabled: false
   +      enabled: true
         reinstall: false
         accessMode: ReadWriteMany
         size: 10Gi
         volumeType: hostPath # e.g.) hostPath or AKS
         storageClass: "-" # e.g.) azurefile or - (None)

.. code-block:: shell
   :caption: コマンド

   vi pv-pf-auditlog.yaml

.. literalinclude:: ../../literal_includes/pv-pf-auditlog.yaml
   :caption: pv-pf-auditlog.yaml (監査ログファイル用ボリューム)
   :linenos:


③kubespray及びkubernetesのコンテナイメージの取得
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| :kbd:`git clone` を用いてkubesprayを取得します。

.. code-block:: shell
   :caption: コマンド

   cd /tmp

   git clone https://github.com/kubernetes-sigs/kubespray.git -b release-2.23


| kubernetesのコンテナイメージ一覧を取得します。

.. code-block:: shell
   :caption: コマンド

   cd kubespray/contrib/offline
   
   ./generate_list.sh
   
   cp -ip /tmp/kubespray/contrib/offline/temp/images.list /tmp/work/k8s-images.list

| kubernetesのコンテナイメージを取得するシェルスクリプト作成します。

.. code-block:: shell
   :caption: コマンド

   cd /tmp/work

   vi k8s-image-save.sh


.. code-block:: shell
   :caption: 下記のコードをコピー＆ペーストします

   #!/bin/bash

   mkdir k8s-images

   readarray -t image_list < "./k8s-images.list"
   for image in ${image_list[@]}
   do
     image_fullname=$(echo ${image})
     image_name=$(basename ${image_fullname} | sed -e "s/:/-/" -e "s/docker.io//" -e "s/registry.k8s.io//" -e "s/quay.io//" -e "s/ghcr.io//")
     if [ ! -e k8s-images/${image_name}.tar.gz ]; then
       echo $image_fullname $image_name
       docker pull ${image_fullname}
       if [ $? -eq 0 ]; then
         docker save ${image_fullname} | gzip -c > k8s-images/${image_name}.tar.gz
       fi
     fi
   done

| 作成したシェルスクリプトを実行し、kubernetesのコンテナイメージを取得します。

.. code-block:: shell
   :caption: コマンド

   chmod a+x k8s-image-save.sh

   ./k8s-image-save.sh

④パッケージファイルの取得
^^^^^^^^^^^^^^^^^^^^^^^^^^
| Ansible実行サーバにインストールするパッケージファイルをダウンロードします。
| --releasever=x.xはAnsibleを実行するサーバのOSのバージョンを指定します。
| インストール先のディレクトリは/tmp/pkg-repo 、/tmp/pip_whl とします。

.. code-block:: shell
   :caption: コマンド

   cd /tmp/kubespray

   dnf install -y --downloadonly --downloaddir=/tmp/pkg-repo --installroot=/tmp/pkg-installroot --releasever=x.x docker-ce python39 nginx gcc httpd systemd-devel keepalived 
 
   dnf install -y createrepo
   
   createrepo /tmp/pkg-repo

   pip3.9 download -d /tmp/pip_whl -r requirements.txt

| kubernetes内でインストールするパッケージファイルをダウンロードします。
| --releasever=x.xはExastroをインストールするサーバのOSのバージョンを指定します。
| インストール先のディレクトリは /tmp/k8s-repoとします。

.. code-block:: shell
   :caption: コマンド

   dnf install -y --downloadonly --downloaddir=/tmp/k8s-repo --installroot=/tmp/k8s-installroot --releasever=x.x conntrack-tools libnetfilter_cttimeout libnetfilter_cthelper libnetfilter_queue bash-completion e2fsprogs device-mapper-libs ipset libseccomp ipvsadm nss openssl python3-libselinux rsync socat unzip xfsprogs gssproxy libverto-libevent keyutils nfs-utils libev rpcbind container-selinux iproute

.. code-block:: shell
   :caption: コマンド

   createrepo /tmp/k8s-repo   

| manage-offline-files.shは「 NGINX_PORT=8080 」 及び ファイル最下部の「 sudo "${runtime}" container inspect nginx >/dev/null 2>&1 」以降の記載を削除します。

.. code-block:: shell
   :caption: コマンド

   cd contrib/offline

   cp manage-offline-files.sh manage-offline-files.sh.bk

   vi manage-offline-files.sh


.. code-block:: diff
   :caption: manage-offline-files.sh

   #!/bin/bash

   CURRENT_DIR=$( dirname "$(readlink -f "$0")" )
   OFFLINE_FILES_DIR_NAME="offline-files"
   OFFLINE_FILES_DIR="${CURRENT_DIR}/${OFFLINE_FILES_DIR_NAME}"
   OFFLINE_FILES_ARCHIVE="${CURRENT_DIR}/offline-files.tar.gz"
   FILES_LIST=${FILES_LIST:-"${CURRENT_DIR}/temp/files.list"}
   - NGINX_PORT=8080

   - sudo "${runtime}" container inspect nginx >/dev/null 2>&1
   - if [ $? -ne 0 ]; then
   -     sudo "${runtime}" run \
   -         --restart=always -d -p ${NGINX_PORT}:80 \
   -         --volume "${OFFLINE_FILES_DIR}:/usr/share/nginx/html/download" \
   -         --volume "${CURRENT_DIR}"/nginx.conf:/etc/nginx/nginx.conf \
   -         --name nginx nginx:alpine
   - fi 

| manage-offline-files.shを実行します。

.. code-block:: shell
   :caption: コマンド

   ./manage-offline-files.sh

   mv offline-files.tar.gz /tmp/work

.. note::
    | 取得したファイルはoffline-files.tar.gzとして圧縮されます。
    | offline-files.tar.gzが存在しない場合は以下のメッセージが表示されますが問題ありません。
    | rm: cannot remove '/tmp/kubespray/contrib/offline/offline-files.tar.gz': No such file or directory
   

⑤Exastroのコンテナイメージを取得
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| コンテナイメージをダウンロードするシェルスクリプトとコンテナイメージのリストを 30GB以上空き容量がある領域に作成します。
| これら2つは同じディレクトリに作成する必要があります。
| シェルスクリプト内の「["x.x.x"]="x.x.x"」にはExastro IT Automation App VersionとExastro Platform App Versionをそれぞれ記載します。
| `Component version <https://github.com/exastro-suite/exastro-helm?tab=readme-ov-file#component-version>`_ を参照し、最新のバージョンに書き換えてください。

.. code-block:: shell
   :caption: コマンド

   cd /tmp/work

   vi exastro-images.list 

.. code-block:: shell
   :caption: 下記のコードをコピー＆ペーストします

   docker.io/exastro/exastro-it-automation-api-admin:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-api-organization:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-api-oase-receiver:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-execute:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-agent:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-legacy-role-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-legacy-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-pioneer-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-ansible-towermaster-sync:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-cicd-for-iac:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-collector:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-conductor-regularly:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-conductor-synchronize:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-excel-export-import:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-execinstance-dataautoclean:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-file-autoclean:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-hostgroup-split:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-menu-create:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-menu-export-import:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-oase-conclusion:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cli-execute:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cli-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cloud-ep-execute:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-by-terraform-cloud-ep-vars-listup:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-web-server:#__ITA_VERSION__#
   docker.io/exastro/exastro-it-automation-migration:#__ITA_VERSION__#
   docker.io/exastro/exastro-platform-api:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-auth:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-job:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-migration:#__PF_VERSION__#
   docker.io/exastro/exastro-platform-web:#__PF_VERSION__#
   docker.io/exastro/keycloak:#__PF_VERSION__#
   docker.io/gitlab/gitlab-ce:15.11.13-ce.0
   docker.io/mongo:6.0
   docker.io/mongo:6.0.7
   docker.io/mariadb:10.9
   docker.io/mariadb:10.11
   busybox:latest
   registry.access.redhat.com/ubi8/ubi-init:latest


| コンテナイメージを取得するシェルスクリプト作成します。

.. code-block:: shell
   :caption: コマンド

   vi exastro-image-save.sh

.. code-block:: shell
   :caption: 下記のコードをコピー＆ペーストし、x.x.xにはバージョンを指定します

   #!/bin/bash

   ITA_VERSION=$1
   declare -A PF_VERSION=(
     ["x.x.x"]="x.x.x"
   )
   if [ ! -d $1 ]; then
     mkdir $ITA_VERSION
   fi

   readarray -t image_list < "./exastro-images.list"
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


| シェルスクリプトを実行し、コンテナイメージを取得します。x.x.x にはITAのバージョンを指定します。
| 完了するまでに数十分程度の時間がかかります。(通信環境やサーバースペックによって状況は異なります。)  

.. code-block:: shell
   :caption: コマンド

   chmod a+x exastro-image-save.sh
   
   sh exastro-image-save.sh x.x.x 

⑥オフライン環境で使用するシェルスクリプト等を作成
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| シェルスクリプトを作成します。
| ITA_VERSIONにはExastro IT Automation App Versionを記載します。

.. code-block:: shell
   :caption: コマンド

   cd /tmp/work

   vi exastro-image-load.sh

.. code-block:: shell
   :caption: 下記のコードをコピー＆ペーストし、x.x.xにはバージョンを指定します

   #!/bin/bash
   ITA_VERSION=x.x.x
   cd /tmp/work/${ITA_VERSION}

   for file in *.tar.gz; do
     /usr/local/bin/nerdctl load -i ${file}
   done

| IPaddressはAnsible実行サーバとして使用するサーバのIPアドレスを指定します。

.. code-block:: shell
   :caption: コマンド

   vi k8s-image-push.sh

.. code-block:: shell
   :caption: 下記のコードをコピー＆ペーストします

   #!/bin/bash

   IPaddress=xx.xx.xx.xx:6000

   image_list=$(docker images --format "{{.Repository}}:{{.Tag}}" | grep ${IPaddress})

   IFS=$'\n'

   for image in ${image_list}; do
     new_image=$(echo "${image}" | sed -e "s|docker.io/||" -e "s|registry.k8s.io/||" -e "s|quay.io/||" -e "s|ghcr.io/||")
     docker tag "${image}" "${new_image}"
     docker push "${new_image}"
   done

| IPaddressはAnsible実行サーバとして使用するサーバのIPアドレスを指定します。

.. code-block:: shell
   :caption: コマンド

   vi k8s-image-load.sh

.. code-block:: shell
   :caption: 下記のコードをコピー＆ペーストします

   #!/bin/bash

   IPaddress=xx.xx.xx.xx:6000
    
   readarray -t image_list < k8s-images.list
   for image in ${image_list[@]}
   do
     image_fullname=$(echo ${image} )
     image_name=$(basename ${image_fullname} | sed -e "s/:/-/")
     if [ -e k8s-images/${image_name}.tar.gz ]; then
       docker load < k8s-images/${image_name}.tar.gz &&
       docker tag ${image_fullname} ${IPaddress}/${image_fullname} &&
       docker rmi ${image_fullname} &
     fi
   done

   wait


| Ansibleの実行先となるサーバを指定します。

.. code-block:: shell
   :caption: コマンド

   vi inventory.yaml

.. code-block:: shell
   :caption: 下記のコードをコピー＆ペーストし、ホスト名を書き換えます

   [ControlMachine]
   Ansible実行サーバのホスト名

   [k8s-node1] 
   Exastroインストールサーバのホスト名

   [K8S:children]
   k8s-node1

| パッケージファイルをインストールするyamlファイルを作成します。

.. code-block:: shell
   :caption: コマンド

   vi preparation.yaml

| 以下の内容をコピー＆ペーストします。

.. raw:: html

   <details>
     <summary>preparation.yaml</summary>

.. literalinclude:: ../../literal_includes/preparation.yaml
   :caption: preparation.yaml
   :language: yaml
   :linenos:

.. raw:: html

   </details>

| 28行目と89行目のexastro-x.x.xx.tgzのバージョンは手順②で取得したバージョンに書き換えます。
| また、永続ボリュームの設定ファイルは使用状況に合わせて適宜削除します。

.. code-block:: shell
   :caption: コマンド

   vi install-exastro.yaml

.. raw:: html

   <details>
     <summary>install-exastro.yaml</summary>

.. literalinclude:: ../../literal_includes/install-exastro.yaml
   :caption: install-exastro.yaml
   :language: yaml
   :linenos:

.. raw:: html

   </details>

| 永続ボリュームを作成するシェルスクリプトです。
| 永続ボリュームの設定ファイルは使用状況に合わせて適宜削除します。

.. code-block:: shell
   :caption: コマンド

   vi apply-pv.sh
   
.. code-block:: shell
   :caption: 下記のコードをコピー＆ペーストします

   #!/bin/bash
   /usr/local/bin/kubectl apply -f /tmp/work/pv-database.yaml
   /usr/local/bin/kubectl apply -f /tmp/work/pv-ita-common.yaml
   /usr/local/bin/kubectl apply -f /tmp/work/pv-mongo.yaml
   /usr/local/bin/kubectl apply -f /tmp/work/pv-gitlab.yaml 
   /usr/local/bin/kubectl apply -f /tmp/work/pv-pf-auditlog.yaml 

| パッケージファイルをインストールするシェルスクリプトを作成します。

.. code-block:: shell
   :caption: コマンド

   vi k8s-pkg-install.sh


.. code-block:: shell
   :caption: 下記のコードをコピー＆ペーストします

   #!/bin/bash

   #ebtables のインストール
   rpm -ivh --force iptables*.rpm iptables-ebtables*.rpm iptables-libs*.rpm

   # conntrack-tools のインストール
   rpm -ivh --force conntrack-tools*.rpm libnetfilter_cttimeout*.rpm libnetfilter_cthelper*.rpm libnetfilter_queue*.rpm

   # bash-completion のインストール
   rpm -ivh --force bash-completion*.rpm libssh*.rpm libssh-config*.rpm openssl*.rpm  openssl-libs*.rpm

   # curl のインストール
   rpm -ivh --force curl*.rpm libcurl*.rpm

   # e2fsprogs のインストール
   rpm -ivh --force e2fsprogs*.rpm e2fsprogs-libs*.rpm libcom_err*.rpm libss*.rpm 

   # device-mapper-libs のインストール
   rpm -ivh --force device-mapper*.rpm device-mapper-event*.rpm device-mapper-event-libs*.rpm device-mapper-libs*.rpm lvm2*.rpm lvm2-libs*.rpm ipset-libs*.rpm

   # ipset のインストール
   rpm -ivh --force ipset*.rpm

   # libseccomp のインストール
   rpm -ivh --force libseccomp*.rpm

   # ipvsadm のインストール
   rpm -ivh --force ipvsadm*.rpm

   # nss のインストール
   rpm -ivh  --force nspr*.rpm nss*.rpm nss-softokn*.rpm nss-softokn-freebl*.rpm nss-sysinit*.rpm nss-tools*.rpm nss-util*.rpm

   # openssl のインストール
   rpm -ivh --force openssl*.rpm

   # python3-libselinux のインストール
   rpm -ivh --force libselinux*.rpm python3-libselinux*.rpm libselinux-utils*.rpm

   # rsync のインストール
   rpm -ivh --force rsync*.rpm

   # socat のインストール
   rpm -ivh --force socat*.rpm

   # unzip のインストール
   rpm -ivh --force unzip*.rpm

   # xfsprogs のインストール
   rpm -ivh --force xfsprogs*.rpm

   # container-selinux のインストール 
   rpm -ivh --force container-selinux*.rpm selinux-policy*.rpm selinux-policy-targeted*.rpm

   # nfs-utils のインストール 
   rpm -ivh --force  nfs-utils*.rpm

   #iproutes のインストール
   rpm -ivh --force  iproute*.rpm



資材の転送	
^^^^^^^^^^
| 取得した資材を圧縮します。
| ExastroのコンテナイメージはITA_VERSIONで指定したバージョンがディレクトリ名になっているため、x.x.xはバージョンを指定します。

.. code-block:: shell
   :caption: コマンド

   cd /tmp/work

   tar -zcvf exastro-image.tar.gz x.x.x
   
   tar -zcvf k8s-images.tar.gz k8s-images


| シェルスクリプトとyamlファイルを圧縮します。
| 永続ボリュームの設定ファイルは作成したファイルのみ指定します。

.. code-block:: shell
   :caption: コマンド

   tar -zcvf resource.tar.gz k8s-image-push.sh k8s-image-load.sh k8s-images.list exastro.yaml inventory.yaml install-exastro.yaml preparation.yaml apply-pv.sh exastro-image-load.sh k8s-pkg-install.sh pv-database.yaml pv-ita-common.yaml pv-gitlab.yaml pv-mongo.yaml pv-pf-auditlog.yaml


.. code-block:: shell
   :caption: コマンド

   cd /tmp

   tar -zcvf k8s-repo.tar.gz k8s-repo
   
   tar -zcvf pkg-repo.tar.gz pkg-repo
   
   tar -zcvf pip-whl.tar.gz pip_whl

   tar -zcvf kubespray.tar.gz kubespray


| 収集した資材をFTP、SCP、SFTP、記憶媒体等でオフライン環境(Ansible実行サーバ)に転送します。
| Ansible実行サーバの/tmpに/workディレクトリを作成し、以下の資材を配置します。

- exastro-image.tar.gz
- k8s-images.tar.gz 
- resource.tar.gz 
- exastro-x.x.x.tgz
- offline-files.tar.gz
- k8s-repo.tar.gz
  

| オフライン環境の/tmpに以下の資材を配置します。


- pkg-repo.tar.gz 
- pip-whl.tar.gz 
- kubespray.tar.gz


オフライン環境(インターネットに接続できない環境)での作業
========================================================

| オンライン環境での作業完了後、オフライン環境にて下記の手順を実施します。
| 以下は、Ansible実行サーバ1台、Exastroインストールサーバ1台で構成した例です。


⑦資材受け取り	
^^^^^^^^^^^^^^
| Ansible実行サーバで、取得した資材を展開します。

.. code-block:: shell
   :caption: コマンド

   cd /tmp

   tar xzvf kubespray.tar.gz 

   tar xzvf pip-whl.tar.gz 

   tar xzvf pkg-repo.tar.gz 

   cd /tmp/work 

   tar xzvf offline-files.tar.gz

   tar xzvf k8s-images.tar.gz  

   tar xzvf /tmp/work/resource.tar.gz -C /tmp/work

 

⑧Ansible実行サーバでの準備
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: shell
   :caption: コマンド

   cd /tmp

   vi pkg-install.sh 



.. code-block:: shell
   :caption: 下記のコードをコピー＆ペーストします

   #!/bin/bash

   #ローカルリポジトリを作成
   sudo tee /etc/yum.repos.d/pkg-repo.repo <<EOF
   [pkg-repo]
   name=RedHat-\$releaserver - pkg
   baseurl=file:///tmp/pkg-repo
   enabled=1
   gpgcheck=0
   gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release
   EOF

   dnf remove -y runc

   #docker-ceのインストール
   cd /tmp/pkg-repo
    
   docker_ce=$(ls | grep -E "docker-ce|docker-ce-cli|docker-ce-rootless-extras|docker-compose-plugin|fuse3|fuse3-libs|fuse-common|fuse-overlayfs|libcgroup|libslirp|slirp4netns|container-selinux|perl-IO-Socket-SSL|perl-Mozilla-CA|perl-Net-SSLeay")

   dnf install -y --disablerepo=\* --enablerepo=pkg-repo ${docker_ce}
    
   #pythonのインストール
   python=$(ls | grep "python39")

   dnf install -y --disablerepo=\* --enablerepo=pkg-repo ${python}

   #Nginxのインストール
   nginx=$(ls | grep "nginx")

   dnf install -y --disablerepo=\* --enablerepo=pkg-repo ${nginx}
   
   #ansible関連のインストール
   cd /tmp/pip_whl
   pip3.9 install --no-index --find-links=./ ansible cryptography jinja2 jmespath MarkupSafe netaddr pbr ruamel.yaml ruamel.yaml.clib


| パッケージファイルをインストールします。

.. code-block:: shell
   :caption: コマンド

   chmod a+x pkg-install.sh

   ./pkg-install.sh


| エラーメッセージが表示された場合は、表示されているmoduleを検索し全てインストールします。				


.. code-block:: shell
   :caption: メッセージ例

   No available modular metadata for modular package 'perl-Mozilla-CA-20160104-7.module_el8.5.0+2812+ed912d05.noarch', it cannot be installed on the system
   No available modular metadata for modular package 'perl-Net-SSLeay-1.88-2.module_el8.6.0+2811+fe6c84b0.x86_64', it cannot be installed on the system
   Error: No available modular metadata for modular package


.. code-block:: shell
   :caption: 表示されたmoduleを確認し、一度に全てインストールします

   #対象がperl-Mozilla-CA 及び perl-Net-SSLeayだった場合
   cd /tmp/pkg-repo
   ls -l | grep -E "perl-Mozilla-CA|perl-Net-SSLeay" 
   dnf -y --disablerepo=\* --enablerepo=pkg-repo perl-Mozilla-CA-20160104-7.module_el8.5.0+2812+ed912d05.noarch.rmp perl-Net-SSLeay-1.88-2.module_el8.6.0+2811+fe6c84b0.x86_64.rpm        


| dockerグループにユーザを追加します。

.. code-block:: shell
   :caption: コマンド

   systemctl enable --now docker

   cat /etc/group | grep docker

   usermod -aG docker ${USER}

   cat /etc/group | grep docker

   reboot

| ExastroをインストールするサーバのIPアドレスとホスト名をHOSTSに登録します。
| ※本説明では、1台のKubernetesクラスターを構築する例となっております。


.. code-block:: shell
   :caption: コマンド

   vi /etc/hosts


.. code-block:: shell
   :caption: hosts

   xx.xx.xx.xx xxx.cluster.local xxx

   #サーバのIPアドレス：xx.xx.xx.xx
   #サーバホスト名：xxx.cluster.local xxx

| SSH Keyの作成を作成します。
| .sshディレクトリにid_rsa.pubが存在する場合は再度作成する必要はありません。

.. code-block:: shell
   :caption: コマンド

   cd ~ && ls -al

   #.sshディレクトリが存在する場合は作成不要
   mkdir .ssh
   
   cd .ssh
   
   #指定がない場合は全てEnterを押す
   ssh-keygen -t rsa

| 実行しているサーバー自身 及び HOSTSに登録したサーバに対して鍵交換を実施します。
| 実行後はssh接続ができることを確認します。
   
.. code-block:: shell
   :caption: コマンド

   ssh-copy-id -i ~/.ssh/id_rsa.pub root@HOSTSに登録したサーバのホスト名

   ssh-copy-id -i ~/.ssh/id_rsa.pub root@実行しているサーバのホスト名
   
   ssh root@HOSTSに登録したサーバのホスト名

   exit

⑨Exastroインストールサーバでの準備	
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Exastroをインストールするサーバすべてで以下の手順を実施します。


.. code-block:: shell
   :caption: コマンド

   vi /etc/sysctl.conf

| /etc/sysctl.confに以下の1行を追記します。

.. code-block:: shell
   :caption: 追記する1行

   net.ipv4.ip_forward=1  


.. code-block:: diff
   :name: /etc/sysctl.conf
   :caption: sysctl.conf

   # sysctl settings are defined through files in
   # /usr/lib/sysctl.d/, /run/sysctl.d/, and /etc/sysctl.d/.
   #
   # Vendors settings live in /usr/lib/sysctl.d/.
   # To override a whole file, create a new file with the same in
   # /etc/sysctl.d/ and put new settings there. To override
   # only specific settings, add a file with a lexically later
   # name in /etc/sysctl.d/ and put new settings there.
   #
   # For more information, see sysctl.conf(5) and sysctl.d(5).
   +net.ipv4.ip_forward=1


| ファイアーウォールを無効化します。

.. code-block:: shell
   :caption: コマンド

   systemctl disable firewalld

   systemctl stop firewalld

   systemctl status firewalld


| SELinuxを無効化します。Disabled となっている場合は実施不要です。

.. code-block:: shell
   :caption: コマンド

   getenforce

.. code-block:: bash
   :caption: コマンド

   vi /etc/selinux/config

.. code-block:: diff
   :caption: config

   # This file controls the state of SELinux on the system.
   # SELINUX= can take one of these three values:
   #       enforcing - SELinux security policy is enforced.
   #       permissive - SELinux prints warnings instead of enforcing.
   #       disabled - No SELinux policy is loaded.
   +SELINUX=disabled
   # SELINUXTYPE= can take one of these two values:
   #       targeted - Targeted processes are protected,
   #       mls - Multi Level Security protection.
   SELINUXTYPE=targeted

| /etc/selinux/config更新後、システムを再起動します。

.. code-block:: bash
   :caption: コマンド

   reboot

| Disabled となっていることを確認します。

.. code-block:: bash
   :caption: コマンド

   getenforce   

⑩kubernetesのコンテナイメージの設定	
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| Ansible実行サーバとして使用するサーバでdockerの例外レジストリを定義します。
| /etc/dockerディレクトリにdaemon.jsonが存在しない場合は新しく作成します。

.. code-block:: shell
   :caption: コマンド

   vi  /etc/docker/daemon.json


| 以下の1行を追記します。xx.xx.xx.xxには現在作業しているサーバ(Ansible実行サーバ)のIPアドレスを指定します。

.. code-block:: shell
   :caption: daemon.json

   { "insecure-registries":[ "xx.xx.xx.xx:6000" ] }

| 設定ファイルの再読み込みとdockerの再起動を行います。

.. code-block:: shell
   :caption: コマンド

   systemctl daemon-reload 

   systemctl start docker


| シェルスクリプトを実行し、kubernetesのコンテナイメージを読み込みます。
| 完了するまでに数十分程度の時間がかかります。(通信環境やサーバースペックによって状況は異なります。) 

.. code-block:: shell
   :caption: コマンド

   cd /tmp/work

   ls k8s-image-load.sh

   chmod a+x k8s-image-load.sh

   ./k8s-image-load.sh

| docker registryを起動します。
| xx.xx.xx.xxには現在作業しているサーバ(Ansible実行サーバ)のIPアドレスを指定します。

.. code-block:: shell
   :caption: コマンド

   docker images | grep docker.io/library/registry

   #上記で得られたREPOSITORYとTAGを指定します
   docker run -d -p 6000:5000 --restart=always --name registry REPOSITORY:TAG

   #以下は記載例です
   docker run -d -p 6000:5000 --restart=always --name registry xx.xx.xx.xx:6000/docker.io/library/registry:2.8.1
   
   #docker registryが起動していることを確認します
   docker ps

| docker registryにkubernetesのイメージをpushします。

.. code-block:: shell
   :caption: コマンド

   ls k8s-image-push.sh

   chmod a+x k8s-image-push.sh
   
   ./k8s-image-push.sh

.. note::
    | http: server gave HTTP response to HTTPS clientと表示されpushできない場合はsystemctl daemon-reloadを行います



⑪自己署名証明書及びNginxの設定		
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| 自己署名証明書用のディレクトリを作成します。
| 以下の手順をAnsible実行サーバで実施します。

.. code-block:: shell
   :caption: コマンド

   mkdir /etc/nginx/ssl


| 暗号鍵を作成します

.. code-block:: shell
   :caption: コマンド

   openssl genrsa -out /etc/nginx/ssl/server.key 2048


| 自己署名証明書リクエストを作成します。
| Country NameはJP、State or Province NameはTokyo、それ以外はEnterキーを押します。

.. code-block:: shell
   :caption: コマンド

   openssl req -new -key /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.csr


| 自己署名証明書を作成します。

.. code-block:: shell
   :caption: コマンド

   openssl x509 -days 3650 -req -signkey /etc/nginx/ssl/server.key -in /etc/nginx/ssl/server.csr -out /etc/nginx/ssl/server.crt

| 自己署名証明書(server.key server.csr server.srt )が作成されていることを確認します。

.. code-block:: shell
   :caption: コマンド

   ls /etc/nginx/ssl


| Nginxの設定をします。

.. code-block:: shell
   :caption: コマンド

   cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bk

   vi /etc/nginx/nginx.conf 

| バックアップを取得した後、nginx.confに以下のブロックを追記します。
| xx.xx.xx.xxには現在作業しているサーバ(Ansible実行サーバ)のIPアドレスを指定します。 

.. code-block:: shell
   :caption: nginx.conf 

   server {
       listen       81 ssl ;
       ssl_certificate "/etc/nginx/ssl/server.crt";
       ssl_certificate_key "/etc/nginx/ssl/server.key";
       charset UTF-8;
       proxy_set_header X-Forwarded-Proto $http_x_forwarded_proto;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       location /{
       client_max_body_size 256M;
       proxy_set_header Host $host;
       proxy_pass http://xx.xx.xx.xx:6000/;
       proxy_redirect off;
       }
   }

.. code-block:: shell
   :caption: コマンド

   systemctl stop firewalld

   systemctl start nginx


| ブラウザでコンテナイメージが表示されることを確認します(イメージ名にはIPアドレスやタグは表示されません)。
| xx.xx.xx.xxには現在作業しているサーバ(Ansible実行サーバ)のIPアドレスを指定します。 
| 接続がプライベートではありませんと表示されるため、詳細設定をクリックして先に進みます。

.. code-block:: shell
   :caption: コマンド

   https://xx.xx.xx.xx:81/v2/_catalog

.. note::
    | レジストリコンテナに登録したイメージを確認するには、ファイアウォールを無効にし、Nginxサービスを起動する必要あります。

| Exastroをインストールするサーバに対して自己署名証明書を送信します。
| xx.xx.xx.xxにはExastroをインストールするサーバのIPアドレスを指定します。

.. code-block:: shell
   :caption: コマンド

   scp /etc/nginx/ssl/server.crt root@xx.xx.xx.xx:/usr/share/pki/ca-trust-source/anchors

⑫パッケージのインストール	
^^^^^^^^^^^^^^^^^^^^^^^^^^
 
| Ansibleを実行してパッケージファイルをインストールするため、hosts.ymlを以下の手順で作成します。
| 以下の手順をAnsible実行サーバで実施します。

.. code-block:: shell
   :caption: コマンド

   cd /tmp/kubespray

| サンプルのinventoryファイルをコピーします。


.. code-block:: shell
   :caption: コマンド

   cp -rfp inventory/sample inventory/k8s_cluster


| Kubernetesクラスター環境のIPの変数を設定します。
| xx.xx.xx.xxにはExastroをインストールするサーバのIPアドレスを指定します。


.. code-block:: shell
   :caption: コマンド

   declare -a IPS=(xx.xx.xx.xx)

| hosts.ymlを作成します。

.. code-block:: shell
   :caption: コマンド

   CONFIG_FILE=inventory/k8s_cluster/hosts.yml python3.9 contrib/inventory_builder/inventory.py ${IPS[@]}

| 作成された :file:`hosts.yml` のnode1を構成したいKubernetesクラスターのホスト名に書き換えます。
| 以下の記載例はKubernetesクラスターを1台で構成した例です。
| 本説明では、各Kubernetesクラスターがコントロールプレーン、ワーカーノードを兼ねた設定で作成するため、全てのnode1に同じホスト名を指定します。

.. code-block:: shell
   :caption: コマンド

   cd /tmp/kubespray/inventory/k8s_cluster

   vi hosts.yml

.. code-block:: shell
   :caption: hosts.yml

   all:
     hosts:
       node1:
         ansible_host: xx.xx.xx.xx
         ip: xx.xx.xx.xx
         access_ip: xx.xx.xx.xx
     children:
       kube_control_plane:
         hosts:
           node1:
       kube_node:
         hosts:
           node1:
       etcd:
         hosts:
           node1:
       k8s_cluster:
         children:
           kube_control_plane:
           kube_node:
       calico_rr:
         hosts: {}

| Exastroをインストールするサーバにパッケージファイルをインストールします。 

.. code-block:: shell
   :caption: コマンド
   
   cd /tmp/work

   ls inventory.yaml 

   ls preparation.yaml

   ansible-playbook -i inventory.yaml preparation.yaml -become --become-user=root  --private-key=~/.ssh/id_rsa

⑬kubesprayのインストール	
^^^^^^^^^^^^^^^^^^^^^^^^^
| kubenetesクラスタの構築で使用するファイルはNginxコンテナを介して提供します。
| /tmp/workに展開するoffline-filesとnginxコンテナの/usr/share/nginx/html/downloadをマウントします。
| 以下の手順をAnsible実行サーバで実施します。

.. code-block:: shell
   :caption: コマンド

   systemctl restart docker

   docker images | grep docker.io/library/nginx

   #上記で得られたREPOSITORYとTAGを指定します
   docker run --name exastro-nginx -d -p 8080:80 -v /tmp/work/offline-files:/usr/share/nginx/html/download REPOSITORY:TAG

   #以下は記載例です
   docker run --name exastro-nginx -d -p 8080:80 -v /tmp/work/offline-files:/usr/share/nginx/html/download xx.xx.xx.xx:6000/docker.io/library/nginx:1.25.2-alpine

   #Nginxコンテナが起動していることを確認します
   docker ps

| ExastroをインストールするサーバにKubernetesをインストールするための設定ファイルを編集します。
| all.ymlとoffline.ymlを以下のように書き換えます。

.. code-block:: shell
   :caption: コマンド

   cd /tmp/kubespray/inventory/k8s_cluster/group_vars/all

   cp all.yml all.yml.bk

   vi all.yml

.. code-block:: diff
   :caption: all.yml

   ## Set these proxy values in order to update package manager and docker daemon to use proxies and custom CA for https_proxy if needed
   # http_proxy: ""
   # https_proxy: ""

   - # https_proxy_cert_file: ""
   + https_proxy_cert_file: "/usr/share/pki/ca-trust-source/anchors/server.crt"

| xx.xx.xx.xxには現在作業しているサーバ(Ansible実行サーバ)のIPアドレスを指定します。 

.. code-block:: shell
   :caption: コマンド

   cp offline.yml offline.yml.bk

   vi offline.yml


.. code-block:: shell
   :caption: 追記する行

   containerd_registries_mirrors:
     - prefix: "{{ registry_host }}"
       mirrors:
         - host: "{{ registry_host }}"
           capabilities: ["pull", "resolve"]
           skip_verify: true

.. raw:: html

   <details>
     <summary>offline.yml</summary>

.. literalinclude:: ../../literal_includes/offline.yaml
   :caption: offline.yml
   :language: yaml
   :linenos:

.. raw:: html

   </details>


| Kubesparayを実行して、ExastroをインストールするサーバへKubernetesをインストールします。
| 完了するまでに数十分程度の時間がかかります。(通信環境やサーバースペックによって状況は異なります。) 

.. code-block:: shell
   :caption: コマンド

   cd /tmp/kubespray

   ansible-playbook -i inventory/k8s_cluster/hosts.yml --become --become-user=root cluster.yml --private-key=~/.ssh/id_rsa -e "download_retries=10" | tee ~/kubespray_$(date +%Y%m%d%H%M).log


| Exastroをインストールするサーバに接続し、nodeが作成されていることを確認します。

.. code-block:: shell
   :caption: コマンド

   kubectl get nodes


.. code-block:: shell
   :caption: 結果サンプル

   NAME                                    STATUS   ROLES           AGE     VERSION
   ITAをインストールするサーバのホスト名   Ready    control-plane   5m10s   v1.27.10



⑭Exastroのインストール	
^^^^^^^^^^^^^^^^^^^^^^^
| ExastroをインストールするサーバにExastroのコンテナイメージを転送します。 
| xx.xx.xx.xxにはExastroをインストールするサーバ(Kubernetesクラスター環境)のIPアドレスを指定します。
| 完了するまでに数十分程度の時間がかかります。(通信環境やサーバースペックによって状況は異なります。) 
| 以下の手順をAnsible実行サーバで実行します。

.. code-block:: shell
   :caption: コマンド

   cd /tmp/work

   ls exastro-image.tar.gz
   
   scp /tmp/work/exastro-image.tar.gz root@xx.xx.xx.xx:/tmp/work


| Exastroのインストールを実行します。

.. code-block:: shell
   :caption: コマンド

   ls inventory.yaml

   ls install-exastro.yaml
   
   ansible-playbook -i inventory.yaml install-exastro.yaml -become --become-user=root  --private-key=~/.ssh/id_rsa


| Exastroをインストールするサーバに接続し、永続ボリュームとpodが作成されていることを確認します。

.. code-block:: shell
   :caption: コマンド

   kubectl get pv

.. code-block:: shell
   :caption: 結果サンプル

   NAME            CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM                                  STORAGECLASS   REASON   AGE
   pv-auditlog     10Gi       RWX            Retain           Bound       exastro/pvc-pf-auditlog                                        8m10s
   pv-database     20Gi       RWO            Retain           Bound       exastro/pvc-mariadb                                            8m10s
   pv-gitlab       20Gi       RWX            Retain           Available   exastro/pvc-gitlab                                             8m10s
   pv-ita-common   10Gi       RWX            Retain           Bound       exastro/pvc-ita-global                                         8m10s
   pv-mongo        20Gi       RWO            Retain           Bound       exastro/volume-mongo-storage-mongo-0                           8m10s


.. include:: ../../../include/check_installation_status.rst


⑮Exastroインストール後の設定	
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Exastroをインストールしたサーバにて、暗号化キーのバックアップを取得します。

.. include:: ../../../include/backup_encrypt_key_k8s.rst


| 下記5つのコマンドを順に実行します。

.. code-block:: bash
   :caption: コマンド

   export NODE_SVC_PORT=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.spec.ports[0].nodePort}")
   export NODE_MGT_PORT=$(kubectl get services platform-auth --namespace exastro -o jsonpath="{.spec.ports[1].nodePort}")
   export NODE_IP=$(kubectl get nodes --namespace exastro -o jsonpath="{.items[0].status.addresses[0].address}")
   # *************************
   # * Administrator Console *
   # *************************
   echo http://$NODE_IP:$NODE_MGT_PORT/auth/

   # *************************
   # * Service Console       *
   # *************************
   echo http://$NODE_IP:$NODE_SVC_PORT

| 、:menuselection:`Administrator Console` の URL にアクセスします。
| 下記は、実行例のため実際のコマンド実行結果に読み替えてください。

.. code-block:: bash
   :caption: 出力結果(例)

   *************************
   * Administrator Console *
   *************************
   http://172.16.20.xxx:30081/auth/

   *************************
   * Service Console       *
   *************************
   http://172.16.20.xxx:30080


.. list-table:: 接続確認用URL
   :widths: 20 40
   :header-rows: 0
   :align: left

   * - 管理コンソール
     - http://172.16.20.xxx:30081/auth/

管理コンソールへのログイン
--------------------------

| 以下の画面が表示された場合、:menuselection:`Administration Console` を選択して、ログイン画面を開きます。

.. figure:: /images/ja/manuals/platform/keycloak/administrator-console.png
  :alt: administrator-console
  :width: 600px
  :name: 管理コンソール

| ログイン ID とパスワードは :ref:`create_system_manager` で登録した、:kbd:`KEYCLOAK_USER` 及び :kbd:`KEYCLOAK_PASSWORD` です。

.. figure:: /images/ja/manuals/platform/login/exastro-login.png
  :alt: login
  :width: 300px
  :name: ログイン画面

| Keycloak の管理画面が開きます。

.. figure:: /images/ja/manuals/platform/keycloak/keycloak-home.png
  :alt: login
  :width: 600px
  :name: Keycloak 管理画面


オーガナイゼーションの作成
==========================

| 以下のIPアドレスを書き換え作成ページにアクセスし、オーガナイゼーションの作成を行います。
| http://xx.xx.xx.xx:30081/platform/organizations
| 詳細については、 :doc:`../../../manuals/platform_management/organization` を参照してください。



ワークスペースの作成
====================

| 以下のIPアドレスを書き換え作成ページにアクセスし、ワークスペースの作成を行います。
| http://xx.xx.xx.xx:30080/オーガナイゼーションID/platform/workspaces
| ワークスペースの作成については、:doc:`../../../manuals/organization_management/workspace` を参照してください。




kubespray及びExastroのインストール時にエラーが発生した場合の対応
================================================================

| Exastroのインストールにはansibleを実行しますが、この手順でエラーが起きた場合は一度アンインストールし、永続ボリュームとkubernetesの削除を行った後、再インストールします。
| 以下の手順をExastroをインストールするサーバ(Kubernetesクラスター環境)にて実施します。

.. code-block:: shell
   :caption: コマンド

   #削除が完了するまでに数分かかることがあります
   helm uninstall exastro --namespace exastro
   
   #以下は5つの永続ボリュームを作成している場合の例です
   kubectl delete pv pv-auditlog pv-gitlab  pv-mongo  pv-database pv-ita-common

   #podが削除されたことを確認します
   kubectl get pods -n exastro

   #永続ボリュームが削除されたことを確認します
   kibectl get pv


| kubenetesの削除を行います。kubespyayのインストール時にエラーが発生した場合は以下の手順のみ実行します。
| 完了するまでに数十分程度の時間がかかります。(通信環境やサーバースペックによって状況は異なります。) 
| 使用するreset.ymlはgit cloneで取得したkubesprayに含まれているため、作成する必要はありません。
| 完了後、Kubesparayを実行してKubernetesクラスター環境へKubernetesをインストールする手順から再実行します。

.. code-block:: shell
   :caption: コマンド

   cd /tmp/kubespray

   ls reset.yml
   
   ansible-playbook -i inventory/k8s_cluster/hosts.yml reset.yml -b -v   

   #以下のメッセージが表示されるため、yesを手入力します
   Are you sure you want to reset cluster state? Type 'yes' to reset your cluster.:  