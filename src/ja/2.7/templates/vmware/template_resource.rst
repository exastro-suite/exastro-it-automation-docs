================
テンプレート資材
================

| 本書では、テンプレート資材の場所を以下に記載します。

テンプレート資材概要
====================
サイト
------
https://github.com/exastro-suite/templates/releases

ファイル名
----------
template-createVM-1.0.0-ita-2.4.0.kym

インポート方法は「 :ref:`menu_import` 」を参照してください。


モジュール追加
==============
| テンプレートを利用するにはコンテナに、community.vmwareのモジュールの追加が必要です。
| 下記にモジュールを追加するための例を記載します。

1.RHEL環境に接続します。

2.以下のコマンドを入力し、クローンを作成します。

.. code-block::
   :caption: 形式

   sudo su -
   git clone https://github.com/exastro-suite/exastro-it-automation.git -b 2.4.0

3.クローン作成後、以下のコマンドを入力しDockerファイルを開きます。

.. code-block::
   :caption: 形式

   cd exastro-it-automation
   vim ita_root/ita_by_ansible_execute/ita_ansible_agent/Dockerfile

4.Dockerファイル内の「useradd -m -s /bin/bash -g $GROUPNAME $USERNAME」の記述がある行の下に、以下のコマンドを入力します。

.. code-block::
   :caption: 形式

   &&  useradd -m -s /bin/bash -g $GROUPNAME $USERNAME \
   &&  pip3.9 install --upgrade ansible \
   &&  pip3 install pyvmomi \
   &&  pip3 install pyVim \
   && ansible-galaxy collection install community.vmware -p /usr/local/lib/python3.9/site-packages/ansible_collections

5.入力後、Dockerファイルの上書きを行います。

6.以下のコマンドを入力し、ビルドを行います。

.. code-block::
   :caption: 形式

   podman build --format=docker -f ita_root/ita_by_ansible_execute/ita_ansible_agent/Dockerfile -t exastro/ita-ansible-agent:2.4.0 .

7.以下のコマンドを入力し、tarファイルに圧縮します。

.. code-block::
   :caption: 形式

   podman save localhost/exastro/ita-ansible-agent:2.4.0 > /var/ita-agent-24.tar


8.7で作成したtarファイルをITAインストール環境に移動

9.以下のコマンドを入力し、コンテナイメージをファイルから読み込みます。

.. code-block::
   :caption: 形式

   docker load < ita-agent-24.tar

10..envファイルの更新をします。
設定ファイル :file:`~/exastro-docker-compose/.env`

.. code-block::
   :caption: 形式

   cd ~/exastro-docker-compose
   vim .env

.. code-block:: shell
   :linenos:
   :caption: 形式
   :emphasize-lines: 4

   #### Ansible エージェントのコンテナイメージのリポジトリ
   ANSIBLE_AGENT_IMAGE=localhost/exastro/ita-ansible-agent
   #### Ansible エージェントのコンテナイメージのタグ
   ANSIBLE_AGENT_IMAGE_TAG=2.4.0

11.以下のコマンドをdocker環境で入力し、環境変数の反映をします。

.. code-block::
   :caption: 形式

   docker compose stop ita-by-ansible-execute

   docker compose up -d ita-by-ansible-execute
