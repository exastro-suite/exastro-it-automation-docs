====================
テンプレート資材
====================

| 本書では、VMwareテンプレートを利用するために必要な資材の取得方法と、動作環境の準備手順について説明します。

テンプレート資材の取得
=======================
配布サイト
------------
| テンプレートは以下のURLから取得できます。
| https://github.com/exastro-suite/templates/tree/main/VMWare/createVM/package

使用ファイル
-------------
| 使用するテンプレートファイル名は以下の通りです。
| インポート方法については「 :ref:`menu_import` 」を参照してください。

| **template-createVM-1.0.0-ita-2.6.1.kym**


モジュールの追加手順
=========================
| VMwareテンプレートの動作には、`community.vmware` モジュールの導入が必要です。
| 以下に、モジュールの追加手順例を記載します。

#. | **ITAインストール環境への接続**
   | ITAがインストールされた環境に接続します。

#. | **Dockerfileの編集**
   | 以下のコマンドを実行して、Dockerfileを開きます。

   .. code-block:: console
    :caption: コマンド（Dockerfileの編集）

    cd ~/exastro-docker-compose
    vim ita_by_ansible_execute/templates/work/Dockerfile

   | Dockerfileの末尾に、以下を追記します。

   .. code-block:: docker
    :caption: Dockerfileの追記内容

    ENV http_proxy=http://<your-proxy-host>:<port>/
    ENV HTTP_PROXY=http://<your-proxy-host>:<port>/
    ENV https_proxy=http://<your-proxy-host>:<port>/
    ENV HTTPS_PROXY=http://<your-proxy-host>:<port>/

    RUN pip3.11 install pyvmomi==8.0.3.0.1 \
           && pip3.11 install pyVim \
           && ansible-galaxy collection install community.vmware

#. | **Dockerイメージのビルド**
   | 編集したDockerfileをもとに、以下のコマンドで新しいイメージをビルドします。

   .. code-block:: console
    :caption: コマンド（Dockerイメージのビルド）

    docker build -f ita_by_ansible_execute/templates/work/Dockerfile -t my-exastro-ansible-agent:2.6.1 . --build-arg ANSIBLE_AGENT_BASE_IMAGE=exastro/exastro-it-automation-by-ansible-agent --build-arg ANSIBLE_AGENT_BASE_IMAGE_TAG=2.6.1

#. | **.env ファイルの更新**
   | 以下のコマンドで `.env` ファイルを開き、イメージ名とタグを更新します。

   .. code-block:: console
    :caption: コマンド（`.env` ファイルの編集）

    cd ~/exastro-docker-compose
    vim .env

   .. code-block:: ini
    :emphasize-lines: 2,4

    #### Local Repository for the Ansible Agent container
    ANSIBLE_AGENT_IMAGE=my-exastro-ansible-agent
    #### Tag for the Ansible Agent container local image
    ANSIBLE_AGENT_IMAGE_TAG=2.6.1


#. | **環境の再構築**
   | `.env` ファイルの編集後、以下のコマンドを実行して環境を再構築します。

   .. code-block:: console
    :caption: コマンド（編集を反映）

    cd ~/exastro-docker-compose
    sh setup.sh install

   | 実行中に以下のようなプロンプトが表示されます。

   .. code-block:: ini
    :emphasize-lines: 2,4
    :caption: 実行時のプロンプト

    ...
    Regenerate .env file? (y/n) [default: n]: n
    ...
    Deploy Exastro containers now? (y/n) [default: n]: y
    ...
