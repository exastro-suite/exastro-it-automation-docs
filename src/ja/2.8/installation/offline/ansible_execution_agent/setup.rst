.. _ansible_execution_agent_offline:

=======================================
Ansible Execution Agent - Offline
=======================================

.. _ansible_execution_agent_purpose_offline:

目的
====

| 本書では、Exastro IT Automation （以下、ITAとも記載する）においてAnsibleをPULL型で実行する際に必要となる、
| Ansible Execution Agentを導入する手順について説明します。


.. tip::
    | Ansible Execution Agentを使用した作業実行、及び設定方法については、マニュアルの以下を参照してください。

    - :ref:`ansible_execution_environment_definition_template_list`
    - :ref:`ansible_execution_environment_list`
    - :ref:`ansible_agent_list`
    - :ref:`ansible_common_environment_definition_make`

.. _ansible_execution_agent_precondition_offline:

前提条件
========

| システム要件については :ref:`構成・構築ガイド <ansible_execution_agent_system_requirements>` を参照してください。
| 有償版のAnsible-builder、Ansible-runnerを利用する場合の、サブスクリプションの登録、リポジトリ有効化については :ref:`構成・構築ガイド <ansible_execution_agent_rhel_support_requirements>` を参照してください。

| 資材を収集するサーバーには docker または podman が必要です。
| 資材を収集する環境とインストールする環境では、構築状態(OSのバージョン及びインストール済のパッケージ)を一致させる必要があります。


全体の流れ
==========
| オンライン環境での作業完了後に、オフライン環境にてインストールを実施します。

.. figure:: /images/ja/installation/docker_compose/flowimage_ae.png
   :width: 800px
   :alt: フローイメージ


オンライン環境での手順
----------------------

| ①RPMパッケージのダウンロード
| ②Pythonパッケージのダウンロード
| ③docker-composeリソースのダウンロード
| ④Exastroリソースのダウンロード
| ⑤実行環境コンテナイメージのビルド


オフライン環境での手順
----------------------

| ⑥環境準備（SELinux無効化、ユーザー作成等）
| ⑦RPMパッケージのインストール
| ⑧Pythonパッケージのインストール
| ⑨docker-composeのインストール
| ⑩Exastroリソースの配置
| ⑪コンテナイメージのロード
| ⑫エージェントサービスの設定と起動


オンライン環境(インターネットに接続できる環境)での作業
======================================================

| 資材の収集を行います。

①RPMパッケージのダウンロード
-----------------------------

作業ディレクトリの作成
^^^^^^^^^^^^^^^^^^^^^^

| 資材をまとめるディレクトリを作成します。

.. code-block:: bash
   :caption: コマンド

   mkdir offline_install_packages
   cd offline_install_packages

.. warning::
   | 資材をダウンロードするサーバとインストールするオフラインサーバのOSバージョンは一致させる必要があります。
   | 以下の手順では、AlmaLinux/RHEL 8.9 を想定しています。

Python 3.11関連RPMのダウンロード
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Python 3.11とその依存パッケージをダウンロードします。

.. code-block:: bash
   :caption: コマンド

   # yum-utilsのインストール（yumdownloaderコマンドに必要）
   sudo yum install yum-utils -y

   # Python 3.11用ディレクトリの作成
   mkdir -p python311-rpms
   cd python311-rpms

   # Python 3.11とその依存パッケージをダウンロード
   yumdownloader --resolve python3.11 python3.11-pip python3.11-devel

   # 元のディレクトリに戻る
   cd ..


gcc関連RPMのダウンロード
^^^^^^^^^^^^^^^^^^^^^^^^

| gccおよびコンパイルに必要なパッケージをダウンロードします。

.. code-block:: bash
   :caption: コマンド

   # gcc用ディレクトリの作成
   mkdir -p gcc-packages

   # gccと依存パッケージをダウンロード
   dnf download --resolve --alldeps --releasever=8.9 --destdir=gcc-packages \
     gcc gcc-c++ make kernel-headers

   # glibc関連パッケージをダウンロード
   dnf download --destdir=gcc-packages --releasever=8.9 \
     glibc glibc-common glibc-devel glibc-headers


言語パックのダウンロード
^^^^^^^^^^^^^^^^^^^^^^^^

| 英語言語パックをダウンロードします。

.. code-block:: bash
   :caption: コマンド

   # 言語パック用ディレクトリの作成
   mkdir -p langpacks-en-packages

   # 言語パックをダウンロード
   dnf download --resolve --alldeps --destdir=langpacks-en-packages langpacks-en


createrepoのダウンロード
^^^^^^^^^^^^^^^^^^^^^^^^

| ローカルリポジトリ作成用のcreaterepoをダウンロードします。

.. code-block:: bash
   :caption: コマンド

   # createrepo用ディレクトリの作成
   mkdir -p createrepo
   cd createrepo

   # createrepoをダウンロード
   dnf download --resolve createrepo

   # 元のディレクトリに戻る  
   cd ..


podman関連RPMのダウンロード
^^^^^^^^^^^^^^^^^^^^^^^^^^^

| podmanとその依存パッケージをダウンロードします。

.. code-block:: bash
   :caption: コマンド

   # podman用ディレクトリの作成
   mkdir -p podman_rpms
   cd podman_rpms

   # podmanと依存パッケージをダウンロード
   yumdownloader --resolve podman

   cd ..


②Pythonパッケージのダウンロード
--------------------------------

Python 3.11のインストール
^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ダウンロード環境にPython 3.11をインストールします。

.. code-block:: bash
   :caption: コマンド

   # Python 3.11のインストール
   sudo dnf install python3.11 python3.11-pip python3.11-devel -y

   # インストール確認
   python3.11 --version
   python3.11 -m pip --version

   # pipのアップグレード
   python3.11 -m pip install --upgrade pip


root用Pythonパッケージのダウンロード
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| root権限で使用するPythonパッケージをダウンロードします。

.. code-block:: bash
   :caption: コマンド

   # root用パッケージディレクトリの作成
   mkdir -p pip_packages_root

   # keyrings.altのダウンロード
   python3.11 -m pip download keyrings.alt -d ./pip_packages_root


一般ユーザー用Pythonパッケージのダウンロード
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| 一般ユーザーで使用するPythonパッケージをダウンロードします。

.. code-block:: bash
   :caption: コマンド

   # 一般ユーザー用パッケージディレクトリの作成
   mkdir -p pip_packages_user

   # pipのダウンロード
   python3.11 -m pip download pip -d ./pip_packages_user

   # requestsのダウンロード（AlmaLinux 8.9 x86_64向け）
   python3.11 -m pip download requests \
     --platform manylinux_2_28_x86_64 \
     --python-version 311 \
     --only-binary=:all: \
     -d ./pip_packages_user

   # poetryのダウンロード
   python3.11 -m pip download poetry==1.6.0 -d ./pip_packages_user

   # cryptographyのダウンロード
   python3.11 -m pip download cryptography \
     --platform manylinux_2_28_x86_64 \
     --python-version 311 \
     --only-binary=:all: \
     -d ./pip_packages_user


③docker-composeリソースのダウンロード
--------------------------------------

| docker-composeバイナリをダウンロードします。

.. code-block:: bash
   :caption: コマンド

   # docker-composeのダウンロード
   sudo curl -L https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-Linux-x86_64 \
     -o docker-compose

   # 実行権限を付与
   chmod +x docker-compose

.. note::
   | プロキシ環境下でダウンロードする場合は、 ``-x ${https_proxy}`` オプションを追加してください。


④Exastroリソースのダウンロード
-------------------------------

gitの設定確認
^^^^^^^^^^^^^

| gitがインストールされているか確認し、未インストールの場合はインストールします。

.. code-block:: bash
   :caption: コマンド

   # gitのバージョン確認
   git --version

   # 未インストールの場合のみ実施
   # sudo dnf install git -y

   # gitの設定確認
   git config --global --list

   # 設定されていない場合は設定
   # git config --global user.name "your_name"
   # git config --global user.email "your_email@example.com"

Exastroソースコードのクローン
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Exastro IT Automationのソースコードをクローンします。

.. code-block:: bash
   :caption: コマンド

   # リポジトリのクローン
   git clone https://github.com/exastro-suite/exastro-it-automation.git

   # 特定のバージョンをチェックアウトする場合
   # cd exastro-it-automation
   # git checkout <バージョンタグまたはブランチ>
   # cd ..


requirements.txtの配置
^^^^^^^^^^^^^^^^^^^^^^

| エージェントの依存関係ファイルをコピーします。

.. code-block:: bash
   :caption: コマンド

   # requirements.txtの場所を確認
   ls exastro-it-automation/ita_root/ita_api_admin/files/*/requirements.txt

   # 表示されたパスを使ってコピー（UUIDは環境により異なる可能性があります）
   cp exastro-it-automation/ita_root/ita_api_admin/files/<UUID>/requirements.txt \
     ~/offline_install_packages/requirements.txt


requirements.txt用Pythonパッケージのダウンロード
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| requirements.txtに基づいて、エージェントの依存パッケージをダウンロードします。

.. code-block:: bash
   :caption: コマンド

   # packagesディレクトリの作成
   mkdir -p packages

   # requirements.txtに基づいてパッケージをダウンロード
   python3.11 -m pip download -r requirements.txt -d ./packages


⑤実行環境コンテナイメージのビルド
----------------------------------

前提条件の確認
^^^^^^^^^^^^^^

| podmanまたはdockerが実行できる環境であることを確認します。

.. code-block:: bash
   :caption: コマンド

   # podmanのインストール確認
   podman --version

   # または、dockerのインストール確認
   # docker --version

   # 未インストールの場合はインストール
   # podmanの場合：
   # sudo dnf install -y podman --allowerasing
   
   # dockerの場合：
   # sudo dnf install -y docker
   # sudo systemctl start docker
   # sudo systemctl enable docker

ベースイメージのダウンロード
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| 実行環境のベースとなるコンテナイメージをダウンロードします。

.. code-block:: bash
   :caption: コマンド

   # ubi9/ubi-initイメージをpull
   podman pull registry.access.redhat.com/ubi9/ubi-init

ビルド設定ファイルの作成
^^^^^^^^^^^^^^^^^^^^^^^^

| ansible-builderでのビルドに必要な設定ファイルを作成します。

.. code-block:: bash
   :caption: コマンド

   # ビルド用ディレクトリの作成
   mkdir -p build
   cd build

   # 証明書ディレクトリの作成（必要な場合）
   mkdir -p files/certs

   # 証明書をコピー（環境に応じて調整）
   # cp /usr/share/pki/ca-trust-source/anchors/ZscalerRootCertificate.cer files/certs/ZscalerRootCertificate.cer

1. execution-environment.j2 の作成

.. code-block:: bash
   :caption: コマンド

   vi execution-environment.j2

.. code-block:: yaml
   :caption: execution-environment.j2の内容例

   version: 3
   
   build_arg_defaults:
     ANSIBLE_GALAXY_CLI_COLLECTION_OPTS: '--ignore-certs'
   
   images:
     base_image:
       name: "registry.access.redhat.com/ubi9/ubi-init:latest"
   
   dependencies:
     ansible_core:
       package_pip: "ansible_core"
     ansible_runner:
       package_pip: "ansible_runner"
     system: "builder.txt"
     python: "requirements.txt"
     galaxy: "galaxy_collection_requirements.yml"
     python_interpreter:
       package_system: "python311"
       python_path: "/usr/bin/python3.11"
   
   # --- Offline artifacts ---
   additional_build_files:
     - src: awscli-exe-linux-x86_64.zip
       dest: files
   
   additional_build_steps:
     prepend_base: |
       RUN yum -y remove python3-requests || microdnf remove -y python3-requests || true
     append_base:
       - RUN /usr/bin/python3.11 -m pip install --upgrade pip
       - RUN /usr/bin/python3.11 -m pip install bindep pyyaml packaging
       - RUN $PYCMD -m pip install --no-cache-dir 'dumb-init==1.2.5'
       - RUN update-crypto-policies --set DEFAULT:SHA1
   
       # AWS CLI v2 (offline)
       - ADD _build/files/awscli-exe-linux-x86_64.zip /tmp/awscliv2.zip
       - RUN dnf -y install unzip && dnf clean all
       - RUN unzip /tmp/awscliv2.zip -d /tmp         && /tmp/aws/install         && rm -rf /tmp/aws /tmp/awscliv2.zip
       - RUN aws --version
   
   options:
     package_manager_path: "/usr/bin/dnf"
     user: root

2. builder.txt の作成

.. code-block:: bash
   :caption: コマンド

   vi builder.txt

.. code-block:: text
   :caption: builder.txtの内容例

   openssh-clients
   sshpass
   expect
   git


3. requirements.txt の作成

.. code-block:: bash
   :caption: コマンド

   vi requirements.txt

.. code-block:: text
   :caption: requirements.txtの内容例

   ansible-builder
   ansible-runner
   attrs
   bindep
   certifi
   charset-normalizer
   click
   clickclick
   colorama ; platform_system == "Windows"
   connexion[swagger-ui,uvicorn]
   distro
   flask
   idna
   importlib-metadata ; python_version < "3.10"
   inflection
   itsdangerous
   jinja2
   jsonschema-specifications
   jsonschema
   lockfile
   markupsafe
   packaging
   parsley
   pbr
   pexpect
   pip
   ptyprocess
   pycryptodome
   python-daemon
   python-dotenv
   pytz
   pyyaml
   referencing
   requests-toolbelt
   requests
   rpds-py
   setuptools
   six
   swagger-ui-bundle
   urllib3
   werkzeug
   zipp ; python_version < "3.10"

4. galaxy_collection_requirements.yml の作成

.. code-block:: bash
   :caption: コマンド

   vi galaxy_collection_requirements.yml

.. code-block:: yaml
   :caption: galaxy_collection_requirements.ymlの内容例

   collections:
     - amazon.aws
     - community.aws
     - azure.azcollection
     - vmware.vmware
     - cisco.ios
     - f5networks.f5_bigip
     - community.general
     - oracle.oci
     - google.cloud

.. note::
   | 上記ファイルの内容は環境に応じて調整してください。
   | AWS CLI等の追加ツールが必要な場合は、以下のようにダウンロードして配置します。
   
   .. code-block:: bash
   
      # AWS CLIのダウンロード（必要な場合）
      curl -O https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip

ansible-builderのインストール
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ansible-builderをインストールします。

.. code-block:: bash
   :caption: コマンド

   # ansible-builderのインストール
   python3.11 -m pip install ansible-builder==3.1.0

コンテナイメージのビルド
^^^^^^^^^^^^^^^^^^^^^^^^

| 実行環境コンテナイメージをビルドします。

.. code-block:: bash
   :caption: コマンド

   # イメージのビルド
   ansible-builder build -t ansible_execution_agent -f execution-environment.j2

   # ビルド完了確認
   podman images | grep ansible_execution_agent

コンテナイメージのエクスポート
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ビルドしたイメージをtar形式でエクスポートします。

.. code-block:: bash
   :caption: コマンド

   # イメージをtar.gzファイルにエクスポート
   podman save -o images.tar.gz localhost/ansible_execution_agent:latest

   # offline_install_packagesディレクトリにコピー
   cp -p images.tar.gz ../

   # 元のディレクトリに戻る
   cd ~/offline_install_packages

資材のアーカイブ作成
^^^^^^^^^^^^^^^^^^^^

| 収集した全ての資材を1つのアーカイブファイルにまとめます。

.. code-block:: bash
   :caption: コマンド

   # 親ディレクトリに移動
   cd ~

   # 資材をtar.gzで圧縮
   tar cvfz offline_install_packages.tar.gz offline_install_packages

   # アーカイブファイルのサイズ確認
   ls -lh offline_install_packages.tar.gz


資材の転送
==========
| オンライン環境で作成した offline_install_packages.tar.gz をFTP、SCP、SFTP、記憶媒体等でオフライン環境に転送します。
| 転送先はオフライン環境の作業ユーザーのホームディレクトリ（例：/home/almalinux/）を推奨します。

.. note::
   | アーカイブには以下の資材が含まれています：
   
   - Python 3.11およびgcc等のRPMパッケージ
   - root用およびユーザー用Pythonパッケージ
   - docker-composeバイナリ
   - Exastroソースコード
   - 実行環境コンテナイメージ


オフライン環境(インターネットに接続できない環境)での作業
========================================================

| オンライン環境での作業完了後、オフライン環境にて下記の手順を実施します。

.. important::
   | オフライン環境での作業を開始する前に、Exastro IT Automation の管理画面から以下の設定を完了してください：
   
   - サービスアカウントユーザーの作成
   - リフレッシュトークンの取得
   
   | 詳細は :doc:`サービスアカウントユーザー管理機能<../../../manuals/organization_management/service_account_users>` を参照してください。


⑥環境準備（SELinux無効化、ユーザー作成等）
------------------------------------------

.. note::
   | 以下の手順は、ユーザー名を ``almalinux`` 、ホームディレクトリを ``/home/almalinux`` として実行した例です。
   | 実際の環境に合わせて読み替えてください。

資材の展開
^^^^^^^^^^

| オンライン環境から転送した資材を展開します。

.. code-block:: bash
   :caption: コマンド

   # 資材の展開
   tar xvfz offline_install_packages.tar.gz
   
   cd offline_install_packages


Firewallの確認
^^^^^^^^^^^^^^

| Firewallの稼働状況を確認します。

.. code-block:: bash
   :caption: コマンド

   # Firewallの状態確認
   systemctl status firewalld

.. note::
   | ``Unit firewalld.service could not be found.`` が表示された場合、Firewallは動作していないため設定は不要です。

| firewalldが起動している場合は、停止して無効化します。

.. code-block:: bash
   :caption: コマンド

   # firewalldの停止
   sudo systemctl stop firewalld

   # firewalldの無効化（自動起動の無効化）
   sudo systemctl disable firewalld

SELinuxの無効化
^^^^^^^^^^^^^^^

| SELinuxを無効化します。

.. code-block:: bash
   :caption: コマンド

   # 現在の状態確認
   getenforce

   # SELinuxがEnforcingの場合、一時的にPermissiveに変更
   sudo setenforce 0

   # 再度確認（Permissiveになっていることを確認）
   getenforce

   # 恒久的に無効化（設定ファイルの編集）
   sudo sed -i 's/SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config

   # 設定を反映するため再起動
   sudo reboot

.. note::
   | `setenforce 0` は再起動まで一時的にPermissive（許容モード）に変更します。
   | 設定ファイルの編集により、再起動後は完全に無効（Disabled）になります。

.. important::
   | 再起動後、再度ログインして作業を継続してください。

エージェント実行ユーザーの作成
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| エージェント実行用のグループとユーザーを作成します。

.. code-block:: bash
   :caption: コマンド

   # グループの作成（GID: 6000）
   sudo groupadd -g 6000 exastro_user

   # ユーザーの作成（UID: 6000）
   sudo useradd -g 6000 -u 6000 exastro_user


sudoers設定
^^^^^^^^^^^

| exastro_userにsudo権限を付与します。

.. code-block:: bash
   :caption: コマンド

   # sudoers設定ファイルの作成
   sudo bash -c 'echo "exastro_user ALL = (root) NOPASSWD: ALL" > /etc/sudoers.d/exastro_user'

   # 権限の確認
   sudo cat /etc/sudoers.d/exastro_user


⑦RPMパッケージのインストール
-----------------------------

Python 3.11のインストール
^^^^^^^^^^^^^^^^^^^^^^^^^

| Python 3.11とその依存パッケージをインストールします。

.. code-block:: bash
   :caption: コマンド

   # python311-rpmsディレクトリに移動
   cd ~/offline_install_packages/python311-rpms

   # RPMパッケージのインストール
   sudo yum localinstall *.rpm -y

   # インストール確認
   python3.11 --version
   python3.11 -m pip --version

   # 元のディレクトリに戻る
   cd ~/offline_install_packages


createrepoのインストール
^^^^^^^^^^^^^^^^^^^^^^^^

| ローカルリポジトリ作成用のcreatereopoをインストールします。

.. code-block:: bash
   :caption: コマンド

   # createrepoディレクトリに移動
   cd ~/offline_install_packages/createrepo

   # drpmを先にインストール
   sudo rpm -ivh drpm-0.4.1-3.el8.x86_64.rpm

   # createrepoをインストール
   sudo rpm -Uvh createrepo*.rpm

   # 元のディレクトリに戻る
   cd ~/offline_install_packages


gcc関連パッケージのインストール
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| gccと依存パッケージをローカルリポジトリ経由でインストールします。

.. code-block:: bash
   :caption: コマンド

   # ローカルリポジトリ設定ファイルの作成
   sudo tee /etc/yum.repos.d/local.repo > /dev/null <<EOF
   [local]
   name=Local RPMs
   baseurl=file:///home/almalinux/offline_install_packages/gcc-packages
   enabled=1
   gpgcheck=0
   EOF

   # gcc-packagesディレクトリに移動
   cd ~/offline_install_packages/gcc-packages

   # リポジトリメタデータの作成
   sudo createrepo .

   # yumキャッシュのクリアと再作成
   sudo yum clean all
   sudo yum makecache

   # gccと依存パッケージのインストール
   sudo dnf install -y gcc glibc-devel kernel-headers --disablerepo='*' --enablerepo=local

   # リポジトリ設定ファイルの削除
   sudo rm -rf /etc/yum.repos.d/local.repo
   dnf clean all

   # 元のディレクトリに戻る
   cd ~/offline_install_packages


言語パックのインストール
^^^^^^^^^^^^^^^^^^^^^^^^

| 英語言語パックをインストールします。

.. code-block:: bash
   :caption: コマンド

   # langpacks-en-packagesディレクトリに移動
   cd ~/offline_install_packages/langpacks-en-packages

   # 言語パックのインストール
   sudo rpm -ivh *

   # 元のディレクトリに戻る
   cd ~/offline_install_packages


podmanのインストール
^^^^^^^^^^^^^^^^^^^^

| podmanとその依存パッケージをインストールします。

.. code-block:: bash
   :caption: コマンド

   # podman_rpmsディレクトリに移動
   cd ~/offline_install_packages/podman_rpms

   # podmanのインストール
   sudo yum localinstall *.rpm -y

   # インストール確認
   podman --version

   # 元のディレクトリに戻る
   cd ~/offline_install_packages


ユーザーセッションの開始
^^^^^^^^^^^^^^^^^^^^^^^^

| exastro_userのsystemdユーザーセッションを開始します。

.. code-block:: bash
   :caption: コマンド

   # ユーザーセッションの開始
   sudo systemctl start user@6000


⑧Pythonパッケージのインストール
--------------------------------

root用Pythonパッケージのインストール
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| root権限で使用するPythonパッケージをインストールします。

.. code-block:: bash
   :caption: コマンド

   # pip_packages_rootディレクトリに移動
   cd ~/offline_install_packages/pip_packages_root

   # keyrings.altのインストール
   sudo python3.11 -m pip install *.whl

   # インストール確認
   python3.11 -c "import keyrings.alt; print('OK')"

   # 元のディレクトリに戻る
   cd ~/offline_install_packages


exastro_userのパスワード設定
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| exastro_userのパスワードを設定します。

.. code-block:: bash
   :caption: コマンド

   # パスワードの設定
   sudo passwd exastro_user

.. note::
   | プロンプトに従ってパスワードを2回入力してください。

資材のコピーとexastro_userへの切り替え
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| 必要な資材をコピーして、exastro_userに切り替えます。

.. code-block:: bash
   :caption: コマンド

   # 元のユーザーから資材をコピー
   sudo cp -rp ~/offline_install_packages/pip_packages_user /home/exastro_user/.
   sudo cp -rp ~/offline_install_packages/packages /home/exastro_user/.
   sudo chown -R exastro_user:exastro_user /home/exastro_user/pip_packages_user
   sudo chown -R exastro_user:exastro_user /home/exastro_user/packages

   # 元のユーザーのホームディレクトリに実行権限を付与
   sudo chmod o+x /home/almalinux

   # offline_install_packagesに読み取り権限を付与
   sudo chmod -R o+rX /home/almalinux/offline_install_packages

   # exastro_userに切り替え
   su - exastro_user


一般ユーザー用Pythonパッケージのインストール
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| exastro_userでPythonパッケージをインストールします。

.. code-block:: bash
   :caption: コマンド（exastro_userで実行）

   # pip_packages_userディレクトリに移動
   cd ~/pip_packages_user

   # pipをアップグレード
   pip3 install pip-*.whl --upgrade

   # 残りのパッケージをインストール
   python3.11 -m pip install *.whl --user --no-cache-dir


poetryのインストールと設定
^^^^^^^^^^^^^^^^^^^^^^^^^^

| poetryをインストールして設定します。

.. code-block:: bash
   :caption: コマンド（exastro_userで実行）

   # poetryと依存パッケージをインストール
   python3.11 -m pip install \
     poetry-1.6.0-py3-none-any.whl \
     poetry_core-1.7.0-py3-none-any.whl \
     poetry_plugin_export-1.6.0-py3-none-any.whl \
     --user --no-cache-dir

   # poetryの設定
   poetry config virtualenvs.in-project true
   poetry config virtualenvs.create true


⑨docker-composeのインストール
------------------------------

| docker-composeバイナリを配置します。

.. code-block:: bash
   :caption: コマンド（元のユーザーに戻って実行）

   # exastro_userから抜ける
   exit

   # docker-composeを配置
   sudo cp -p ~/offline_install_packages/docker-compose /usr/local/bin/
   sudo chown root:root /usr/local/bin/docker-compose
   sudo chmod a+x /usr/local/bin/docker-compose

   # インストール確認
   docker-compose --version


⑩Exastroリソースの配置
-----------------------

インストールディレクトリの作成
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| エージェントをインストールするディレクトリを作成します。

.. code-block:: bash
   :caption: コマンド

   # インストールディレクトリの作成
   sudo mkdir -p /cmn/apl/exastro
   sudo chmod -R 0777 /cmn/apl


Exastroソースコードの配置
^^^^^^^^^^^^^^^^^^^^^^^^^

| Exastroのソースコードをインストールディレクトリにコピーします。

.. code-block:: bash
   :caption: コマンド

   # ソースコードのコピー
   sudo cp -rp ~/offline_install_packages/exastro-it-automation /cmn/apl/exastro/.
   sudo chown -R exastro_user:exastro_user /cmn/apl/exastro/exastro-it-automation

   # コンテナイメージのコピー
   sudo cp -rp ~/offline_install_packages/images.tar.gz /cmn/apl/exastro/.
   sudo chown -R exastro_user:exastro_user /cmn/apl/exastro/images.tar.gz


エージェントディレクトリの構築
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| エージェント用のディレクトリ構造を構築します。

.. code-block:: bash
   :caption: コマンド

   # 作業ディレクトリに移動
   cd /cmn/apl/exastro

   # ディレクトリの作成
   mkdir -p ita_ag_ansible_execution/common_libs

   # 必要なファイルをコピー
   cp -rfa exastro-it-automation/ita_root/ita_ag_ansible_execution/* ita_ag_ansible_execution/
   cp -rfa exastro-it-automation/ita_root/messages ita_ag_ansible_execution/
   cp -rfa exastro-it-automation/ita_root/agent/ ita_ag_ansible_execution/
   cp -rfa exastro-it-automation/ita_root/common_libs/common ita_ag_ansible_execution/common_libs/
   cp -rfa exastro-it-automation/ita_root/common_libs/ag ita_ag_ansible_execution/common_libs/
   cp -rfa exastro-it-automation/ita_root/common_libs/ansible_driver ita_ag_ansible_execution/common_libs/
   cp -rfa exastro-it-automation/ita_root/common_libs/ansible_execution ita_ag_ansible_execution/common_libs/

   # 実行権限の付与
   sudo chmod 0755 ita_ag_ansible_execution/agent/agent_init.py
   sudo chmod 0755 ita_ag_ansible_execution/agent/agent_child_init.py
   sudo chmod 0755 ita_ag_ansible_execution


requirements.txtとpackagesの配置
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| 依存パッケージ情報を配置します。

.. code-block:: bash
   :caption: コマンド

   # requirements.txtのコピー
   sudo cp -rp /home/almalinux/offline_install_packages/requirements.txt \
     /cmn/apl/exastro/ita_ag_ansible_execution/.

   # pyproject.tomlのコピー
   sudo cp -rp /home/almalinux/offline_install_packages/exastro-it-automation/ita_root/ita_ag_ansible_execution/pyproject.toml \
     /cmn/apl/exastro/ita_ag_ansible_execution/.

   # poetry.lockのコピー
   sudo cp -rp /home/almalinux/offline_install_packages/exastro-it-automation/ita_root/ita_ag_ansible_execution/poetry.lock \
     /cmn/apl/exastro/ita_ag_ansible_execution/.

   # 所有者の変更
   sudo chown -R exastro_user:exastro_user /cmn/apl/exastro/ita_ag_ansible_execution/requirements.txt
   sudo chown -R exastro_user:exastro_user /cmn/apl/exastro/ita_ag_ansible_execution/pyproject.toml
   sudo chown -R exastro_user:exastro_user /cmn/apl/exastro/ita_ag_ansible_execution/poetry.lock

   # packagesのコピー
   sudo cp -rp /home/almalinux/offline_install_packages/packages /cmn/apl/exastro/ita_ag_ansible_execution/.
   sudo chown -R exastro_user:exastro_user /cmn/apl/exastro/ita_ag_ansible_execution/packages


⑪コンテナイメージのロード
--------------------------

exastro_userへの切り替えと環境変数設定
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| exastro_userに切り替えて、必要な環境変数を設定します。

.. code-block:: bash
   :caption: コマンド

   # exastro_userに切り替え
   sudo su - exastro_user

   # XDG_RUNTIME_DIRの設定
   export XDG_RUNTIME_DIR=/run/user/6000
   echo "export XDG_RUNTIME_DIR=${XDG_RUNTIME_DIR}" >> ${HOME}/.bashrc

   # BUILDAH_ISOLATIONの設定
   echo "export BUILDAH_ISOLATION=chroot" >> ${HOME}/.bashrc

podman.socketの起動と設定
^^^^^^^^^^^^^^^^^^^^^^^^^

| podmanのソケットを起動して設定します。

.. code-block:: bash
   :caption: コマンド（exastro_userで実行）

   # systemdユーザーセッションディレクトリの作成
   mkdir -p ~/.config/systemd/user

   # podman.socketの有効化と起動
   systemctl --user enable --now podman.socket

   # 状態確認
   systemctl --user status podman.socket --no-pager

   # ソケットの所有者変更
   podman unshare chown 6000:6000 /run/user/6000/podman/podman.sock

   # DOCKER_HOSTの設定
   export DOCKER_HOST=unix:///run/user/6000/podman/podman.sock
   echo "export DOCKER_HOST=${DOCKER_HOST}" >> ${HOME}/.bashrc

   # docker-composeのエイリアス設定
   echo "alias docker-compose='podman unshare docker-compose'" >> ${HOME}/.bashrc


コンテナイメージのロード
^^^^^^^^^^^^^^^^^^^^^^^^

| ビルド済みのコンテナイメージをpodmanにロードします。

.. code-block:: bash
   :caption: コマンド（exastro_userで実行）

   # イメージのロード
   cd /cmn/apl/exastro
   podman load -i images.tar.gz

   # イメージの確認
   podman images


Poetry仮想環境の構築
^^^^^^^^^^^^^^^^^^^^

| poetryで仮想環境を構築し、依存パッケージをインストールします。

.. code-block:: bash
   :caption: コマンド（exastro_userで実行）

   # エージェントディレクトリに移動
   cd /cmn/apl/exastro/ita_ag_ansible_execution

   # poetryで環境構築
   poetry install --no-root --no-interaction

   # 仮想環境の有効化
   source .venv/bin/activate

   # オフラインパッケージからインストール
   pip install --no-index --find-links=./packages -r requirements.txt


⑫エージェントサービスの設定と起動
----------------------------------

サービス識別子の設定とストレージディレクトリの作成
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| サービスの一意な識別子を設定し、エージェントのデータ保存用ディレクトリを作成します。

.. code-block:: bash
   :caption: コマンド（exastro_userで実行）

   # exastro_userから一時的に抜ける
   exit

   # サービス識別子を環境変数に設定（任意の文字列）
   export SERVICE_ID=（オーガナイゼーション名）_（ワークスペース名）

   # ストレージディレクトリの作成
   sudo mkdir -m 755 -p /cmn/apl/exastro/${SERVICE_ID}/storage

   # 所有者の変更
   sudo chown -R exastro_user:exastro_user /cmn/apl/exastro/${SERVICE_ID}

   # exastro_userに再度切り替え
   sudo su - exastro_user

   # 環境変数の再設定
   export SERVICE_ID=（オーガナイゼーション名）_（ワークスペース名）


.envファイルの作成
^^^^^^^^^^^^^^^^^^

| エージェントの設定ファイル（.env）を作成します。

.. code-block:: bash
   :caption: コマンド（exastro_userで実行）

   vi /cmn/apl/exastro/${SERVICE_ID}/.env

.. code-block:: bash
   :caption: .envファイルの内容例

   IS_NON_CONTAINER_LOG=1
   LOG_LEVEL=INFO
   #LOGGING_MAX_SIZE=10485760
   #LOGGING_MAX_FILE=30
   LANGUAGE=ja
   TZ=Asia/Tokyo
   PYTHON_CMD=/cmn/apl/exastro/ita_ag_ansible_execution/.venv/bin/python
   PYTHONPATH=/cmn/apl/exastro/ita_ag_ansible_execution/
   APP_PATH=/cmn/apl/exastro/ita_ag_ansible_execution
   STORAGEPATH=/cmn/apl/exastro/（サービスID）/storage
   LOGPATH=/cmn/apl/exastro/（サービスID）/log
   EXASTRO_ORGANIZATION_ID=<your_organization_id>
   EXASTRO_WORKSPACE_ID=<your_workspace_id>
   EXASTRO_URL=<your_exastro_url>
   EXASTRO_REFRESH_TOKEN=<your_refresh_token>
   EXECUTION_ENVIRONMENT_NAMES=
   AGENT_NAME=ita-ag-ansible-execution-（サービスID）
   USER_ID=（サービスID）
   ITERATION=10
   EXECUTE_INTERVAL=5
   EXECUTION_LIMIT=5
   MOVEMENT_LIMIT=1

.. important::
   | 以下の項目は実際の環境に合わせて変更してください：
   
   - （サービスID）：設定したSERVICE_IDの値（オーガナイゼーション名_ワークスペース名など）
   - EXASTRO_ORGANIZATION_ID：接続先のオーガナイゼーションID
   - EXASTRO_WORKSPACE_ID：接続先のワークスペースID
   - EXASTRO_URL：接続先のExastro IT AutomationのURL
   - EXASTRO_REFRESH_TOKEN：サービスアカウントユーザーのリフレッシュトークン

.. _ansible_execution_agent_parameter_list_offline:

.. list-table:: env内のパラメータ
   :header-rows: 1
   :align: left

   * - パラメータ名
     - 内容
     - デフォルト値
     - 変更可否
     - 追加されたバージョン
     - 備考
   * - IS_NON_CONTAINER_LOG
     - ログをファイル出力する設定項目
     - 1
     - 不可
     - 2.5.1
     -
   * - LOG_LEVEL
     - ログを出力レベルの設定値[INFO/DEBUG]
     - INFO
     - 可
     - 2.5.1
     -
   * - LOGGING_MAX_SIZE
     - ログローテーションのファイルサイズ
     - 10485760
     - 可
     - 2.5.1
     - 初期状態は、コメントアウト
   * - LOGGING_MAX_FILE
     - ログローテーションのバックアップ数
     - 30
     - 可
     - 2.5.1
     - 初期状態は、コメントアウト
   * - LANGUAGE
     - 言語設定
     - en
     - 可
     - 2.5.1
     -
   * - TZ
     - タイムゾーン
     - Asia/Tokyo
     - 可
     - 2.5.1
     -
   * - PYTHON_CMD
     - 実行する仮想環境のpythonの実行コマンド
     - <インストール先のPATH>/poetry run python3
     - 不可
     - 2.5.1
     -
   * - PYTHONPATH
     - 実行する仮想環境のpythonの実行コマンド
     - <インストール先のPATH>/ita_ag_ansible_execution/
     - 可
     - 2.5.1
     -
   * - APP_PATH
     - インストール先のPATH
     - <インストール先のPATH>
     - 可
     - 2.5.1
     -
   * - STORAGEPATH
     - データの保存先のPATH
     - <インストール先のPATH>/<サービスの一意な識別子>/storage
     - 可
     - 2.5.1
     -
   * - LOGPATH
     - ログの保存先のPATH
     - <インストール先のPATH>/<サービスの一意な識別子>/log
     - 可
     - 2.5.1
     -
   * - EXASTRO_ORGANIZATION_ID
     - 接続先のORGANIZATION_ID
     - <ORGANIZATION_ID>
     - 可
     - 2.5.1
     -
   * - EXASTRO_WORKSPACE_ID
     - 接続先のWORKSPACE_ID
     - <WORKSPACE_ID>
     - 可
     - 2.5.1
     -
   * - EXASTRO_URL
     - 接続先のITAのURL
     - <EXASTRO_URL>
     - 可
     - 2.5.1
     -
   * - EXASTRO_REFRESH_TOKEN
     - 接続先のITAのEXASTRO_REFRESH_TOKEN
     - <EXASTRO_REFRESH_TOKEN>
     - 可
     - 2.5.1
     -
   * - EXECUTION_ENVIRONMENT_NAMES
     - | 実行する環実行環境指定できます。
       | 空の場合、全実行環境を作業対象とします。
       | 複数指定する場合は、「,」区切りで指定してください。
     - 空
     - 可
     - 2.5.1
     -
   * - AGENT_NAME
     - サービスに登録する、エージェントの識別子です。
     - ita-ag-ansible-execution-<サービスの一意な識別子>
     - 不可
     - 2.5.1
     -
   * - USER_ID
     - エージェントの識別子です。
     - <サービスの一意な識別子>
     - 不可
     - 2.5.1
     -
   * - ITERATION
     - 設定を初期化するまでの、処理の繰り返し数
     - 10
     - 可
     - 2.5.1
     -
   * - EXECUTE_INTERVAL
     - メインプロセス終了後のインターバル
     - 5
     - 可
     - 2.5.1
     -
   * - EXECUTION_LIMIT
     - エージェントが同時に処理できる作業の最大数を制御できます。
     - 5
     - 可
     - 2.7.0
     -
   * - MOVEMENT_LIMIT
     - エージェントが一度に取得する未実行の作業の最大数を制御できます。
     - 1
     - 可
     - 2.7.0
     -


パラメータの詳細
^^^^^^^^^^^^^^^^
| オンライン版の :ref:`ansible_execution_user_recommendation_detail` を参照してください。


パラメータ変更による動作影響
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| オンライン版の :ref:`ansible_execution_parameter_change` を参照してください。


MOVEMENT_LIMIT・EXECUTION_LIMITの影響
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| オンライン版の :ref:`ansible_execution_limits_impact` を参照してください。


systemdサービスファイルの作成
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| systemdのサービスファイルを作成します。

.. code-block:: bash
   :caption: コマンド（exastro_userで実行）

   vi /cmn/apl/exastro/${SERVICE_ID}/ita-ag-ansible-execution-${SERVICE_ID}.service

.. code-block:: ini
   :caption: サービスファイルの内容例

   [Unit]
   Description=Ansible Execution agent for Exastro IT Automation (（サービスID）)

   [Service]
   WorkingDirectory=/cmn/apl/exastro/ita_ag_ansible_execution/
   ExecStart=/cmn/apl/exastro/ita_ag_ansible_execution/agent/entrypoint.sh /cmn/apl/exastro/（サービスID）/.env /cmn/apl/exastro/ita_ag_ansible_execution/ /cmn/apl/exastro/（サービスID）/storage "/home/exastro_user/.local/bin/poetry run python3"
   ExecReload=/bin/kill -HUP $MAINPID
   ExecStop=/bin/kill $MAINPID
   Restart=always

   [Install]
   WantedBy=default.target


サービスファイルの配置
^^^^^^^^^^^^^^^^^^^^^^

| サービスファイルをsystemdのユーザーディレクトリに配置します。

.. code-block:: bash
   :caption: コマンド（exastro_userで実行）

   # systemdユーザーディレクトリの作成
   mkdir -p ~/.config/systemd/user

   # サービスファイルのコピー
   cp -p /cmn/apl/exastro/${SERVICE_ID}/ita-ag-ansible-execution-${SERVICE_ID}.service \
     ~/.config/systemd/user/


サービスの登録と起動
^^^^^^^^^^^^^^^^^^^^

| エージェントサービスを登録して起動します。

.. code-block:: bash
   :caption: コマンド（exastro_userで実行）

   # systemdの設定再読み込み
   systemctl --user daemon-reload

.. note::
   | ``Failed to connect to bus`` エラーが表示された場合は、以下を実行してください：
   
   .. code-block:: bash
   
      # 別ターミナルで実行
      sudo systemctl start user@6000

.. code-block:: bash
   :caption: コマンド（exastro_userで実行）

   # サービスの有効化
   systemctl --user enable ita-ag-ansible-execution-${SERVICE_ID}

   # サービスの起動
   systemctl --user start ita-ag-ansible-execution-${SERVICE_ID}

   # 状態確認
   systemctl --user status ita-ag-ansible-execution-${SERVICE_ID}


サービスの永続化設定
^^^^^^^^^^^^^^^^^^^^

| システム再起動後もサービスが自動起動するように設定します。

.. code-block:: bash
   :caption: コマンド

   # exastro_userから抜ける
   exit

   # loginctl enable-lingerの設定
   sudo loginctl enable-linger exastro_user

   # 設定確認
   ls -l /var/lib/systemd/linger

動作確認
^^^^^^^^

| エージェントが正常に動作しているか確認します。

.. code-block:: bash
   :caption: コマンド

   # サービス状態の確認
   sudo su - exastro_user
   systemctl --user status ita-ag-ansible-execution-${SERVICE_ID}

   # ログの確認
   tail -f /cmn/apl/exastro/${SERVICE_ID}/log/ita-ag-ansible-execution-${SERVICE_ID}.log

.. tip::
   | Exastro IT Automationの管理画面から、エージェントが登録されていることを確認してください。
   | メニュー：Ansible共通 > エージェント管理
