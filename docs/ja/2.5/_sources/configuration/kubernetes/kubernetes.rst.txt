=====================
Kubernetes クラスター
=====================

はじめに
========

| 本説明では、Exastro IT Automation のデプロイ先となるKubernetesクラスターを、Kubesprayを用いて構築する方法について説明します。


前提条件
========

- Kubesprayを実行する Ansible実行環境
- Kubernetesクラスターの構築先の環境（本説明では OS:kbd:`Red Hat Enterprise Linux 8` を使用した手順）

Kubernetesクラスター構築
========================

本説明は、公式サイトの手順を参考に実施した手順となっており、Kubernetesのバージョンアップ等により、実際の手順とは異なる場合があります。

公式サイト： https://kubernetes.io/ja/docs/setup/production-environment/tools/kubespray/

Ansible実行環境での準備
-----------------------

ツールのインストール
~~~~~~~~~~~~~~~~~~~~

| Kubesprayを実行する環境に、以下の手順でツールをインストールします

#. | ルートユーザーに切り替え

   .. code-block:: bash
      :caption: コマンド

      sudo su -

#. | Python3.9の導入

   .. code-block:: bash
      :caption: コマンド

      yum -y install python39

#. | pip3.9の導入

   .. code-block:: bash
      :caption: コマンド

      pip3.9 install ruamel-yaml

#. | gitの導入

   .. code-block:: bash
      :caption: コマンド

      yum -y install git

.. note::
   | すでに導入済みのコマンドは手順を省略して構いません。

HOST設定
~~~~~~~~

| 続いて、作成先の情報をHOSTSに登録します。
| ※本説明では、3台のKubernetesクラスターを構築する例となっております。

.. code-block:: bash
   :caption: コマンド

   vi /etc/hosts

.. code-block:: text
   :name: /etc/hosts
   :caption: hosts

   # Kubernetesクラスターの情報を追加
   192.168.1.1 ha-conf-k8s-01.cluster.local ha-conf-k8s-01
   192.168.1.2 ha-conf-k8s-02.cluster.local ha-conf-k8s-02
   192.168.1.3 ha-conf-k8s-03.cluster.local ha-conf-k8s-03

.. note::
   | クラスタ名やIPアドレスは、使用する環境に合わせて変更してください。

SSH key の作成
~~~~~~~~~~~~~~

.. code-block:: bash
   :caption: コマンド

   ssh-keygen -t rsa


| 作成したSSHキー( :file:`/root/.ssh/id_ras.pub` )は、作成するクラスタに配置します。


Kubesprayインストール
~~~~~~~~~~~~~~~~~~~~~

| Kubesprayのインストールは :kbd:`git clone` を用いてインストールします。

.. code-block:: bash
   :caption: コマンド

   git clone https://github.com/kubernetes-sigs/kubespray.git -b release-2.23

   cd kubespray/

   pip3.9 install -r requirements.txt

:kbd:`Successfully installed` が最後に表示されれば、:kbd:`Kubespray` のインストールは完了となります。


Kubernetesクラスター環境用の前準備
----------------------------------

| Kubernetes クラスター環境すべてで以下の手順を実施します。

IPv4 フォワーディングの有効化
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. | ルートユーザーに切り替え

   .. code-block:: bash
      :caption: コマンド

      sudo su -

#. | :file:`/etc/sysctl.conf` の書き換え

   | net.ipv4.ip_forward=1 の行を追加します。

   .. code-block:: bash
      :caption: コマンド

      vi /etc/sysctl.conf

   .. code-block:: diff
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

#. | ファイアーウォールのインストール・無効化

   .. code-block:: bash
      :caption: コマンド

      dnf install firewalld

      disable firewalld

      stop firewalld

      status firewalld

#. | SELinux の無効化

   | 現状の確認

   .. code-block:: bash
      :caption: コマンド

      getenforce

   | Disabled となっていれば、以下は不要

   | SELINUX=disabled オプションを設定

   .. code-block:: bash
      :caption: コマンド

      vi /etc/selinux/config

   .. code-block:: diff
      :caption: sysctl.conf

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

   | 設定後、システム再起動します。

   .. code-block:: bash
      :caption: コマンド

      reboot

   | Disabled となっているか確認します。

   .. code-block:: bash
      :caption: コマンド

      getenforce

Kubernetesインストール
----------------------

| Ansible実行環境にて、以下の手順に従って用意したKubernetesクラスター環境へKubernetesをインストールします。

hosts.ymlの作成
~~~~~~~~~~~~~~~

| Kubernetesクラスターは、:file:`hosts.yml` の内容を元に作成されます。
| はじめに、:file:`hosts.yml` を以下の手順で作成します。

#. | ルートユーザーに切り替え

   .. code-block:: bash
      :caption: コマンド

      sudo su -

#. | :kbd:`git clone` したKubesprayフォルダにカレントを変更

   .. code-block:: bash
      :caption: コマンド

      cd kubespray/

#. | サンプルのinventoryファイルをコピー

   .. code-block:: bash
      :caption: コマンド

      cp -rfp inventory/sample inventory/k8s_cluster

#. | 使用するKubernetesクラスター環境のIPの変数設定

   .. code-block:: bash
      :caption: コマンド

      declare -a IPS=(192.168.1.1 192.168.1.2 192.168.1.3)

#. :file:`hosts.yml` の作成

   .. code-block:: bash
      :caption: コマンド

      CONFIG_FILE=inventory/k8s_cluster/hosts.yml python3.9 contrib/inventory_builder/inventory.py ${IPS[@]}

#. :file:`hosts.yml` の確認

   .. code-block:: bash
      :caption: コマンド

      cat inventory/k8s_cluster/hosts.yml

hosts.ymlの編集
~~~~~~~~~~~~~~~
| 作成された :file:`hosts.yml` を構成したいKubernetesクラスターの情報に置き換えます。
| 本説明では、各Kubernetesクラスターがコントロールプレーン、ワーカーノードを兼ねた設定で作成します。

.. literalinclude:: literal_includes/hosts.yml
   :caption: hosts.yml
   :language: yaml
   :linenos:

proxy設定
~~~~~~~~~
| proxyの設定が必要な場合は、以下のファイルを編集する必要があります。

- :file:`inventory/k8s_cluster/group_vars/all/all.yml`

Kubernetesインストール
~~~~~~~~~~~~~~~~~~~~~~

| Kubesparayを実行して、Kubernetesクラスター環境へKubernetesをインストールします。

.. code-block:: bash
   :caption: コマンド

   ansible-playbook -i inventory/k8s_cluster/hosts.yml --become --become-user=root cluster.yml --private-key=~/.ssh/id_rsa -e "download_retries=10" | tee ~/kubespray_$(date +%Y%m%d%H%M).log

| 環境やクラスター数にもよりますが、20～30分ほどかかります。

Kubernetes環境の確認
~~~~~~~~~~~~~~~~~~~~
| 作成されましたら、実際に作成されたKubernetesクラスター環境に接続して以下のコマンドでコントロールプレーンやワーカーノードを確認します。

.. code-block:: bash
   :caption: コマンド

   kubectl get nodes

| 以下のような結果が表示されていれば、作成完了です。

.. code-block:: bash
   :caption: 結果

   NAME             STATUS   ROLES           AGE     VERSION
   v2ha-k8s-node1   Ready    control-plane   8m48s   v1.27.7
   v2ha-k8s-node2   Ready    control-plane   7m28s   v1.27.7
   v2ha-k8s-node3   Ready    control-plane   7m17s   v1.27.7
