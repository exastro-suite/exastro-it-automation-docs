==============
開発サーバ構築
==============

**はじめに**
============

本手順はOpenStackのITA2.0開発環境ベースイメージを使えない場合の開発環境のベースイメージ部分を作りこむ手順となります
一部手順は後日記入となってますが、そちらについてはネット等で調べて実施ください

また、\ **本手順実施後**\ に\ `/ExastroPlatform/開発環境/構築手順 </ExastroPlatform/開発環境/構築手順>`__\ を実施してください

**手順**
========

証明書の複製
------------

::

   cd /usr/share/pki/ca-trust-source/anchors
   ls *
   cp ZscalerRootCertificate.cer UserRootCertificate.crt

dockerインストール
------------------

以下のコマンドで、DockerのリポジトリのURLを追加します。

::

   dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

以下のコマンドで、docker-ce、docker-ce-cli、containerd.io
をインストールします。

::

   dnf install -y docker-ce docker-ce-cli containerd.io

docker -vのコマンドでインストールされたDockerのバージョンを確認します。

::

   docker -v

docker設定
----------

1. /etc/docker/daemon.json

   ::

      mkdir /etc/docker

   以下の内容を設定して保存する

   ::

      cat > /etc/docker/daemon.json <<EOF
      {
        "exec-opts": ["native.cgroupdriver=systemd"],
        "log-driver": "json-file",
        "log-opts": {
          "max-size": "100m"
        },
        "storage-driver": "overlay2",
        "storage-opts": [
          "overlay2.override_kernel_check=true"
        ]
      }
      EOF

2. docker.service.d/http-proxy.conf

   ::

      mkdir -p /etc/systemd/system/docker.service.d

   ::

      MyIP=`hostname -I | cut -f1 -d' '`

   ::

      cat > /etc/systemd/system/docker.service.d/http-proxy.conf <<EOF
      [Service]
      Environment="HTTP_PROXY=http://proxygate2.nic.nec.co.jp:8080" 
      Environment="HTTPS_PROXY=http://proxygate2.nic.nec.co.jp:8080" 
      Environment="NO_PROXY=localhost,127.0.0.1,${MyIP},10.96.0.0/12,10.244.0.0/16"
      EOF

   適用後、以下のコマンドでDockerの再起動を実施する

   ::

      systemctl daemon-reload

   ::

      systemctl enable docker && systemctl start docker

   ::

      systemctl restart docker

   確認 ``docker info | grep Proxy``

docker-composeインストール
--------------------------

1. ターミナルを開いて以下コマンドを実行
   ``bash     curl -L https://github.com/docker/compose/releases/download/v2.5.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose     chmod +x /usr/local/bin/docker-compose``

2. 起動確認 ``bash     docker-compose --version``

nfs-utilsをインストール(mountに必要)
------------------------------------

::

   dnf -y install nfs-utils

talismanrcのmount
-----------------

以下のフォルダを作成

.. code:: bash

   sudo mkdir /mnt/mainte

.. code:: bash

   sudo vi /etc/fstab

以下を追記

::

   10.197.19.188:/ky/share/mainte/ /mnt/mainte nfs defaults 0 0

設定を反映

.. code:: bash

   sudo mount -a

almalinuxユーザ作成
-------------------

作業用のアカウントのalmalinuxユーザを作成してください ※手順は後日記入

::

   useradd almalinux

鍵ファイルを使用しない場合は、\ ``-p``\ オプションでパスワードを付与するか以下のコマンドでパスワードを設定してください。

::

   passwd almalinux

almalinuxユーザーで、sudo
をパスワード入力なしで実行できるように設定します。

::

   sudo visudo

表示された内容の一番最後に、 almalinuxユーザーの設定を追加します

変更前

::

   ## Read drop-in files from /etc/sudoers.d (the # here does not mean a comment)
   #includedir /etc/sudoers.d

変更後

::

   ## Read drop-in files from /etc/sudoers.d (the # here does not mean a comment)
   #includedir /etc/sudoers.d
   almalinux       ALL=(ALL)       NOPASSWD: ALL

almalinuxユーザでdocker起動を可能に設定
---------------------------------------

almalinuxユーザでdockerコマンドを使えるように設定してください
※手順は後日記入

1. dockerグループ確認

   ::

      cat /etc/group | grep docker

   なければ作成する ``groupadd docker``

2. dockerグループにalmalinuxを追加する

   ::

      usermod -aG docker almalinux

3. dockerコマンドが実行できるか確認する

   ::

      su almalinux
      docker ps

talismanインストール
--------------------

1. shasumインストール（インストール済みの場合は不要）

   以下のコマンドでインストール
   ``bash  sudo yum install perl-Digest-SHA``
   以下のコマンドでバージョン確認 ``bash  shasum -v``

   .. code:: bash

      sudo yum install perl-Digest-SHA

2. talismanインストール almalinuxユーザで実施 ``su almalinux``

   ::

      curl --silent  https://raw.githubusercontent.com/thoughtworks/talisman/master/global_install_scripts/install.bash > /tmp/install_talisman.bash && /bin/bash /tmp/install_talisman.bash pre-commit

   インストール時以下の応答があるので、1を選択 \```bash PLEASE CHOOSE
   WHERE YOU WISH TO SET TALISMAN_HOME VARIABLE AND talisman binary PATH
   (Enter option number):

   1) Set TALISMAN_HOME in ~/.bashrc
   2) Set TALISMAN_HOME in ~/.bash_profile
   3) Set TALISMAN_HOME in ~/.profile
   4) I will set it later #? 1

   ::

      インタラクティブモードの確認がでますが、任意のキーを押してください("y"以外)
      ```bash
      DO YOU WANT TO BE PROMPTED WHEN ADDING EXCEPTIONS TO .talismanrc FILE? 
      Enter y to install in interactive mode. Press any key to continue without interactive mode (y/n):

   テンポラリフォルダの確認はデフォルトのまま、Enterキーを押下してください
   ``bash  Git template directory: (/root/.git-template)``
   検索時のルートフォルダの確認はデフォルトのまま、Enterキーを押下してください
   ``bash  Please enter root directory to search for git repos (Default: /root):``

git hook設定
------------

almalinuxユーザで実施

以下ファイルが存在しない時は実施

::

   ~/.git-template/hooks/pre-commit

::

   mkdir -p ~/.git-template/hooks
   cd ~/.git-template/hooks
   ln -s pre-commit /home/almalinux/.talisman/bin/talisman_hook_script

talisman_hook_scriptの修正
--------------------------

::

   vi ~/.talisman/bin/talisman_hook_script

２行追加する

変更前

::

   #!/bin/bash
   shopt -s extglob

変更後

::

   #!/bin/bash
   GIT_TOP_DIR=`git rev-parse --show-toplevel`
   cp -f /mnt/mainte/talisman/.talismanrc ${GIT_TOP_DIR}/.talismanrc
   shopt -s extglob

git ignoreの設定
----------------

::

   mkdir -p ~/.config/git
   cat <<EOF >> ~/.config/git/ignore
   .talismanrc
   EOF

鍵ファイルの設定
----------------

以下のフォルダに、鍵ファイルを上書きします。

::

   /home/alumalinux/.ssh/authorized_keys

フォルダ・ファイルが無い場合は、.sshフォルダ作成し、ファイルを作成

その後、以下のコマンドで権限を変更

.. code:: bash

   chmod 700 .ssh

.. code:: bash

   chmod 600 authorized_keys
