=============================
Ansible実行環境のカスタマイズ
=============================

はじめに
========
| 本書では、ITAで使用するAnsible実行環境のカスタマイズ方法を説明します。

Ansible 実行環境カスタマイズの概要
==================================
| Ansible-Coreでは、Ansible作業時のビルドにカスタマイズ工程をはさむ（docker-compose版のみ）・Ansible作業時にカスタマイズを施したイメージを使用する等によりAnsible実行環境のカスタマイズを実施することが可能です。
| また、Ansible Execution Agentや Ansible Automation Platformでは、ansible-builderを用いてAnsible実行環境のカスタマイズを実施することが可能です。

| 本書では主に下記パターンについて説明します。

- | Ansible-Coreでのカスタマイズ例

  - | Ansible作業時のビルドにカスタマイズ工程を追加する例（docker-compose版のみ）

    - | コレクションを使用する例
    - | 自作モジュールを使用する例

  - | Ansible作業時にカスタマイズを施したイメージを使用する例

- | Ansible Execution AgentやAnsible Automation Platformでのカスタマイズ例

  - | コレクションを使用する例（無償版ベースイメージ）
  - | コレクションを使用する例（有償版ベースイメージ）
  - | 自作モジュールを使用する例



Ansible-Coreでのカスタマイズ例
==============================

Ansible作業時のビルドにカスタマイズ工程を追加する例
---------------------------------------------------

| Ansible作業時のビルドにカスタマイズ工程を追加するという手順の関係上、本手順は「docker-compose版のみ」となります。


既存の環境変数を確認
^^^^^^^^^^^^^^^^^^^^

| 既存の環境変数を確認します。
| 「 :file:`~/exastro-docker-compose/.env` 」の「 ``ANSIBLE_AGENT_IMAGE`` 」「 ``ANSIBLE_AGENT_IMAGE_TAG`` 」「 ``ANSIBLE_AGENT_BASE_IMAGE`` 」「 ``ANSIBLE_AGENT_BASE_IMAGE_TAG`` 」の値を確認します。

.. code-block:: console
   :caption: コマンド（環境変数を確認）
 
   [user01@ita-sv ~]$ cat ~/exastro-docker-compose/.env | grep ANSIBLE
   ANSIBLE_AGENT_IMAGE=exastro-ansible-agent-custom
   ANSIBLE_AGENT_IMAGE_TAG=devel
   # ANSIBLE_AGENT_BASE_IMAGE=exastro/exastro-it-automation-by-ansible-agent
   # ANSIBLE_AGENT_BASE_IMAGE_TAG=
 
| 項目がコメントアウトされている場合は、既定値としてそれぞれ

.. code-block:: console
 
 ANSIBLE_AGENT_IMAGE=my-exastro-ansible-agent
 ANSIBLE_AGENT_IMAGE_TAG=[[ ITAのバージョン ]]
 ANSIBLE_AGENT_BASE_IMAGE=exastro/exastro-it-automation-by-ansible-agent
 ANSIBLE_AGENT_BASE_IMAGE_TAG=[[ ITAのバージョン ]]

| が使用されています。


既存のイメージを削除
^^^^^^^^^^^^^^^^^^^^

| Ansible-CoreでのAnsible作業を一度でも実施してしている場合は、既にイメージが作成されているため予め「 :command:`docker rmi` 」を実施しイメージを削除します。


.. code-block:: console
   :caption: コマンド（既存のイメージを削除）
 
   [user01@ita-sv ~]$ docker images | grep [[ここにANSIBLE_AGENT_IMAGEを代入]]
   [[ANSIBLE_AGENT_IMAGE]]                      [[ANSIBLE_AGENT_IMAGE_TAG]]    18493d96333g   12 hours ago   953MB
 
   [user01@ita-sv ~]$ docker rmi -f 18493d96333g


ビルドファイルの編集
^^^^^^^^^^^^^^^^^^^^

| Ansible-Coreでは通常「 :file:`~/exastro-docker-compose/ita_by_ansible_execute/templates/` 」の「 :file:`./docker-compose.yml` 」及び「 :file:`./work/Dockerfile` 」を使用してAnsible実行環境をビルドしています。
| そのため、実施したいカスタマイズ工程は上記の2ファイルに記載します。


.. warning::
  | ITA2.6.0よりデフォルトのベースイメージである「exastro/exastro-it-automation-by-ansible-agent」に搭載されているPythonが Python3.9から **Python3.11** へ変更されています。
  | また、pipに関しても pip3.9から **pip3.11** へ変更されています。

コレクションを使用する例
~~~~~~~~~~~~~~~~~~~~~~~~

| 「exastro/exastro-it-automation-by-ansible-agent」の2.6.0には標準で下記のようなコレクションが含まれています。
| そのため下記以外のコレクションを追加する場合、及びコレクションに必要なライブラリをインストール場合の手順となります。

.. code-block:: console
   :caption:  :command:`ansible-galaxy collection list` で確認されたコレクション

   # /usr/local/lib/python3.11/site-packages/ansible_collections
   Collection                               Version
   ---------------------------------------- -------
   amazon.aws                               9.5.0  , ansible.netcommon                        7.2.0  , ansible.posix                            1.6.2  , ansible.utils                            5.1.2  , ansible.windows                          2.8.0  , arista.eos                               10.1.1 , awx.awx                                  24.6.1 , 
   azure.azcollection                       3.3.1  , check_point.mgmt                         6.4.0  , chocolatey.chocolatey                    1.5.3  , cisco.aci                                2.11.0 , cisco.asa                                6.1.0  , cisco.dnac                               6.31.3 , cisco.intersight                         2.1.0  , 
   cisco.ios                                9.2.0  , cisco.iosxr                              10.3.1 , cisco.ise                                2.10.0 , cisco.meraki                             2.21.1 , cisco.mso                                2.10.0 , cisco.nxos                               9.4.0  , cisco.ucs                                1.16.0 , 
   cloud.common                             4.1.0  , cloudscale_ch.cloud                      2.4.1  , community.aws                            9.3.0  , community.ciscosmb                       1.0.10 , community.crypto                         2.26.1 , community.digitalocean                   1.27.0 , community.dns                            3.2.4  , 
   community.docker                         4.6.0  , community.general                        10.7.0 , community.grafana                        2.2.0  , community.hashi_vault                    6.2.0  , community.hrobot                         2.3.0  , community.library_inventory_filtering_v1 1.1.1  , community.libvirt                        1.3.1  , 
   community.mongodb                        1.7.9  , community.mysql                          3.13.0 , community.network                        5.1.0  , community.okd                            4.0.1  , community.postgresql                     3.14.1 , community.proxysql                       1.6.0  , community.rabbitmq                       1.4.0  , 
   community.routeros                       3.6.0  , community.sap_libs                       1.4.2  , community.sops                           2.0.5  , community.vmware                         5.6.0  , community.windows                        2.4.0  , community.zabbix                         3.3.0  , containers.podman                        1.16.3 , 
   cyberark.conjur                          1.3.3  , cyberark.pas                             1.0.35 , dellemc.enterprise_sonic                 2.5.1  , dellemc.openmanage                       9.12.0 , dellemc.powerflex                        2.6.0  , dellemc.unity                            2.0.0  , f5networks.f5_modules                    1.35.0 , 
   fortinet.fortimanager                    2.9.1  , fortinet.fortios                         2.4.0  , google.cloud                             1.5.3  , grafana.grafana                          5.7.0  , hetzner.hcloud                           4.3.0  , hitachivantara.vspone_block              3.4.1  , ibm.qradar                               4.0.0  , 
   ibm.spectrum_virtualize                  2.0.0  , ibm.storage_virtualize                   2.7.3  , ieisystem.inmanage                       3.0.0  , infinidat.infinibox                      1.4.5  , infoblox.nios_modules                    1.8.0  , inspur.ispim                             2.2.3  , junipernetworks.junos                    9.1.0  , 
   kaytus.ksmanage                          2.0.0  , kubernetes.core                          5.3.0  , kubevirt.core                            2.2.2  , lowlydba.sqlserver                       2.6.1  , microsoft.ad                             1.9.0  , microsoft.iis                            1.0.2  , netapp.cloudmanager                      21.24.0, 
   netapp.ontap                             22.14.0, netapp.storagegrid                       21.14.0, netapp_eseries.santricity                1.4.1  , netbox.netbox                            3.21.0 , ngine_io.cloudstack                      2.5.0  , openstack.cloud                          2.4.1  , ovirt.ovirt                              3.2.0  , 
   purestorage.flasharray                   1.34.1 , purestorage.flashblade                   1.20.0 , sensu.sensu_go                           1.14.0 , splunk.es                                4.0.0  , telekom_mms.icinga_director              2.2.2  , theforeman.foreman                       4.2.0  , vmware.vmware                            1.11.0 , 
   vmware.vmware_rest                       4.7.0  , vultr.cloud                              1.13.0 , vyos.vyos                                5.0.0  , wti.remote                               1.0.10 

| 「 :file:`~/exastro-docker-compose/ita_by_ansible_execute/templates/work/Dockerfile` 」を下記のように編集します。
| なお、:command:`ansible-galaxy collection install` の直後に実施している :command:`pip3.11 install` については、コレクションに必要なライブラリを指定してください。
| （コレクションに必要なライブラリは、`Ansible Galaxy - コレクション <https://galaxy.ansible.com/ui/collections/>`_ の各コレクション用のドキュメントに記載があることが多いです。）

.. code-block:: diff
   :caption: ~/exastro-docker-compose/ita_by_ansible_execute/templates/work/Dockerfile
 
   ARG ANSIBLE_AGENT_BASE_IMAGE
   ARG ANSIBLE_AGENT_BASE_IMAGE_TAG

   FROM ${ANSIBLE_AGENT_BASE_IMAGE}:${ANSIBLE_AGENT_BASE_IMAGE_TAG}

   + RUN ansible-galaxy collection install [[ここにインストールしたいコレクション名を代入]] \
   + && pip3.11 install [[ここにコレクションに必要なライブラリを代入]] 
   
   ## Add module command bellow, if you need to use extend ansible module.

   # Example:
   # RUN ansible-galaxy collection install amazon.aws \
   #  &&  pip3.11 install --upgrade boto3 botocore

| また、透過型プロキシ等でSSL/TLSインスペクションを実施している場合は、:command:`ansible-galaxy` の実施時に証明書エラーが発生してしまうため、引数に「:command:`--ignore-certs`」を付与する必要があります。
| ※カスタムCA証明書をインストールすることで適切に証明書検証をすることも可能です。

.. code-block:: diff
   :caption: ~/exastro-docker-compose/ita_by_ansible_execute/templates/work/Dockerfile

   ARG ANSIBLE_AGENT_BASE_IMAGE
   ARG ANSIBLE_AGENT_BASE_IMAGE_TAG

   FROM ${ANSIBLE_AGENT_BASE_IMAGE}:${ANSIBLE_AGENT_BASE_IMAGE_TAG}

   + RUN ansible-galaxy collection install --ignore-certs [[ここにインストールしたいコレクション名を代入]] \
   + && pip3.11 install [[ここにコレクションに必要なライブラリを代入]] 
   
   ## Add module command bellow, if you need to use extend ansible module.

   # Example:
   # RUN ansible-galaxy collection install amazon.aws \
   #  &&  pip3.11 install --upgrade boto3 botocore

| Dockerfileの編集後、Ansible-CoreでのAnsible作業実行を実施します。

| なお、Ansible作業実行時に下記のようなエラーが発生した場合はビルドに失敗しています。

.. code-block:: text
 
   Service ita_ansible_agent  Building\nThe command \'/bin/sh -c ansible-galaxy collection install [[インストールしたいコレクション名]]\' returned a non-zero code: 1\n'


自作モジュールを使用する例
~~~~~~~~~~~~~~~~~~~~~~~~~~

| 使用したい自作モジュールを「 :file:`~/exastro-docker-compose/ita_by_ansible_execute/templates/work/my_module.py` 」に配置します。
| また、Ansible-Coreの実行ユーザがアクセスできるように読み取り権限を付与します。

.. code-block:: console
   :caption: コマンド例（読み取り権限の付与）

   [user01@ita-sv ~]$ chmod a+r ~/exastro-docker-compose/ita_by_ansible_execute/templates/work/my_module.py
   [user01@ita-sv ~]$ ls -al ~/exastro-docker-compose/ita_by_ansible_execute/templates/work/my_module.py
   -rw-r--r--. 1 user01 user01 1024 Jan 1 00:00 ~/exastro-docker-compose/ita_by_ansible_execute/templates/work/my_module.py


| 「 :file:`~/exastro-docker-compose/ita_by_ansible_execute/templates/work/Dockerfile` 」を下記編集します。

.. code-block:: diff
   :caption: ~/exastro-docker-compose/ita_by_ansible_execute/templates/work/Dockerfile

   ARG ANSIBLE_AGENT_BASE_IMAGE
   ARG ANSIBLE_AGENT_BASE_IMAGE_TAG

   FROM ${ANSIBLE_AGENT_BASE_IMAGE}:${ANSIBLE_AGENT_BASE_IMAGE_TAG}

   + RUN mkdir -p /home/app_user/.ansible/plugins/modules
   + COPY my_module.py /home/app_user/.ansible/plugins/modules/
   
   ## Add module command bellow, if you need to use extend ansible module.

   # Example:
   # RUN ansible-galaxy collection install amazon.aws \
   #  &&  pip3.11 install --upgrade boto3 botocore

| Dockerfileの編集後、Ansible-CoreでのAnsible作業実行を実施します。


Ansible作業時にカスタマイズを施したイメージを使用する例
-------------------------------------------------------

カスタマイズを施したイメージの出力
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| カスタマイズを施したイメージが存在するサーバでイメージを出力します。

| まず対象となるイメージを確認します。
| 例として、「exastro-ansible-agent-custom:devel」を対象となるイメージとします。

.. code-block:: console
   :caption: コマンド例（対象となるイメージの確認）

   [user01@ita-sv ~]$ docker images | grep exastro-ansible-agent-custom
   exastro-ansible-agent-custom                      devel    18493d96333g   12 hours ago   953MB
 
| なお、Kubenetesではタグ名が「latest」又は「none」であるとローカルイメージを使用しないため、
| Kubenetesで使用する場合はこの時点でタグ名を「latest」又は「none」以外としておくことを推奨します。
| （参考：https://kubernetes.io/docs/concepts/containers/images/#imagepullpolicy-defaulting）

.. code-block:: console
   :caption: コマンド例（タグ名の変更）

   [user01@ita-sv ~]$ docker images | grep exastro-ansible-agent-custom
   exastro-ansible-agent-custom                     <none>    18493d96333g   12 hours ago   953MB

   [user01@ita-sv ~]$ docker tag 18493d96333g exastro-ansible-agent-custom:devel
  
   [user01@ita-sv ~]$ docker images | grep exastro-ansible-agent-custom
   exastro-ansible-agent-custom                      devel    18493d96333g   12 hours ago   953MB
 
 
| 下記コマンドを実行してイメージを出力します。
| コマンドには「18493d96333g」等のイメージIDではなく、「exastro-ansible-agent-custom:devel」といったイメージ名とタグ名を使用してください。

.. code-block:: console
   :caption: コマンド例（イメージを出力）

   [user01@ita-sv ~]$ docker save exastro-ansible-agent-custom:devel | gzip -c > /tmp/custom-docker-image.tar.gz
  
 

カスタマイズを施したイメージの投入
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

docker-compose版
~~~~~~~~~~~~~~~~

| 予め、イメージを投入したいサーバへ :file:`/tmp/custom-docker-image.tar.gz` を転送しておきます。

| 下記コマンドを実行してイメージを投入します。

.. code-block:: console
   :caption: コマンド例（イメージを投入）

   [user01@ita-sv-02 ~]$ docker load < /tmp/custom-docker-image.tar.gz
  

| その後、イメージが正常に投入されていることを確認します。

.. code-block:: console
   :caption: コマンド例（イメージを確認）

   [user01@ita-sv-02 ~]$ docker images | grep exastro-ansible-agent-custom
   exastro-ansible-agent-custom                      devel    18493d96333g   12 hours ago   953MB
 

| イメージの確認後、Ansible-CoreでのAnsible作業時に対象のイメージを使用するように環境変数を設定します。
| 「 :file:`~/exastro-docker-compose/.env` 」の「 ``ANSIBLE_AGENT_IMAGE`` 」「 ``ANSIBLE_AGENT_IMAGE_TAG`` 」の値を編集します。

.. code-block:: diff
   :caption: /exastro-docker-compose/.env
  
   ...
   #### Local Repository for the Ansible Agent container
   - # ANSIBLE_AGENT_IMAGE=my-exastro-ansible-agent
   + ANSIBLE_AGENT_IMAGE=exastro-ansible-agent-custom
   #### Tag for the Ansible Agent container local image
   - # ANSIBLE_AGENT_IMAGE_TAG=
   + ANSIBLE_AGENT_IMAGE_TAG=devel
   ...


| 環境変数の編集後、「:file:`~/exastro-docker-compose/setup.sh` 」を実行して編集を反映します。

.. code-block:: console
   :caption: コマンド（編集を反映）
 
   [user01@ita-sv-02 ~]$ cd ~/exastro-docker-compose
   [user01@ita-sv-02 ~]$ sh setup.sh install
 
   ...
   Regenerate .env file? (y/n) [default: n]: n
   ...
   Deploy Exastro containers now? (y/n) [default: n]: y
   ...



Kubenetes版
~~~~~~~~~~~

| 予め、クラスタ内の全てのノードに対して :file:`/tmp/custom-docker-image.tar.gz` を転送します。

| 下記コマンドをクラスタ内の全てのノードに対して実行し、イメージを投入します。

.. code-block:: console
   :caption: コマンド例（イメージを投入）

   [user01@ita-node01 ~]$ ctr images -n k8s.io import /tmp/custom-docker-image.tar.gz
  

| イメージの投入後、Ansible-CoreでのAnsible作業時に対象のイメージを使用するように環境変数を設定します。
| values.yaml の「 ``exastro-it-automation.ita-by-ansible-execute.extraEnv.ANSIBLE_AGENT_IMAGE`` 」及び「 ``exastro-it-automation.ita-by-ansible-execute.extraEnv.ANSIBLE_AGENT_IMAGE_TAG`` 」の値を編集します。

.. code-block:: diff
   :caption: values.yaml
  
   exastro-it-automation:
   ...
     ita-by-ansible-execute:
       extraEnv:
         ...
   -     ANSIBLE_AGENT_IMAGE: "docker.io/exastro/exastro-it-automation-by-ansible-agent"
   +     ANSIBLE_AGENT_IMAGE: "exastro-ansible-agent-custom"
   -     ANSIBLE_AGENT_IMAGE_TAG: ""
   +     ANSIBLE_AGENT_IMAGE_TAG: "devel"
   ...

| values.yaml の編集後、「 :command:`helm upgrade` 」及び「 :command:`kubectl rollout` 」を実行して編集を反映します。

.. code-block:: console
   :caption: コマンド（編集を反映）
 
   $ helm upgrade exastro exastro/exastro --install --namespace exastro --create-namespace --values values.yaml

   $ kubectl rollout restart deploy/ita-by-ansible-execute -n exastro


Ansible Execution Agentでのカスタマイズ例
=========================================

コレクションを使用する例（無償版ベースイメージ）
------------------------------------------------


- | このケースでは下記条件でカスタマイズを施します。

  - | ベースイメージは「registry.access.redhat.com/ubi9/ubi-init:latest」を使用する
  - | コレクションは「Azure.AzCollection」を使用する


ITAでの実行環境定義登録
^^^^^^^^^^^^^^^^^^^^^^^


| :menuselection:`Ansible共通 --> 実行環境定義テンプレート管理` に実行環境定義のテンプレートファイルを登録します。

.. table::  :menuselection:`Ansible共通 --> 実行環境定義テンプレート管理` に設定するパラメータ一覧
   :widths: 150 160 150
   :align: left

   +---------------------------------------------+----------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
   | 項目名                                      | 設定値                                                                                 | 備考                                                                                     |
   +=============================================+========================================================================================+==========================================================================================+
   | テンプレート名                              | azure_ee_template                                                                      | 今回の説明では「azure_ee_template」を使用しますが、\                                     |
   |                                             |                                                                                        | 変更した場合は必要に応じて読み替えてください。                                           |
   +---------------------------------------------+----------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
   | テンプレートファイル                        | 下記内容を登録します。                                                                 | 将来的に、必要となる `ansible_core` のバージョンは変更となる可能性があります。           | 
   |                                             |                                                                                        |                                                                                          |
   |                                             | .. code-block:: yaml+jinja                                                             | その結果、必要となる `Python` のバージョンが変更となり、\                                | 
   |                                             |                                                                                        | `python_interpreter` の値も変更となる可能性があります。                                  | 
   |                                             |                                                                                        |                                                                                          |
   |                                             |   version: 3                                                                           |                                                                                          | 
   |                                             |                                                                                        |                                                                                          |
   |                                             |   build_arg_defaults:                                                                  |                                                                                          |
   |                                             |     ANSIBLE_GALAXY_CLI_COLLECTION_OPTS: '--ignore-certs'                               |                                                                                          | 
   |                                             |                                                                                        |                                                                                          |
   |                                             |   images:                                                                              |                                                                                          |
   |                                             |     base_image:                                                                        |                                                                                          |
   |                                             |       name: {{ image }}                                                                |                                                                                          | 
   |                                             |                                                                                        |                                                                                          |
   |                                             |   dependencies:                                                                        |                                                                                          |
   |                                             |     ansible_core:                                                                      |                                                                                          |
   |                                             |       package_pip: {{ ansible_core }}                                                  |                                                                                          |
   |                                             |     ansible_runner:                                                                    |                                                                                          |
   |                                             |       package_pip: {{ ansible_runner }}                                                |                                                                                          |
   |                                             |     system: {{ bindep_file }}                                                          |                                                                                          |
   |                                             |     python: {{ python_requirements_file }}                                             |                                                                                          |
   |                                             |   {% if galaxy_requirements_file == "" %}                                              |                                                                                          |
   |                                             |   {% else %}                                                                           |                                                                                          |
   |                                             |     galaxy: {{ galaxy_requirements_file }}                                             |                                                                                          |
   |                                             |   {% endif %}                                                                          |                                                                                          |
   |                                             |     python_interpreter:                                                                |                                                                                          |
   |                                             |       package_system: "python3.11"                                                     |                                                                                          |
   |                                             |       python_path: "/usr/bin/python3.11"                                               |                                                                                          | 
   |                                             |                                                                                        |                                                                                          |
   |                                             |   additional_build_steps:                                                              |                                                                                          |
   |                                             |     append_base:                                                                       |                                                                                          |
   |                                             |       - RUN /usr/bin/python3.11 -m pip install --upgrade pip                           |                                                                                          | 
   |                                             |                                                                                        |                                                                                          |
   |                                             |   options:                                                                             |                                                                                          |
   |                                             |     package_manager_path: {{ package_manager_path }}                                   |                                                                                          |
   |                                             |     user: root                                                                         |                                                                                          |  
   |                                             |                                                                                        |                                                                                          |
   +---------------------------------------------+----------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------+


| :menuselection:`Ansible共通 --> 実行環境管理` に実行環境定義のテンプレートファイルとテンプレートファイルに代入する設定値の紐付けを登録します。

.. table::  :menuselection:`Ansible共通 --> 実行環境管理` に設定するパラメータ一覧
   :widths: 150 160 150
   :align: left

   +-----------------------------+-----------------------------------------+-----------------------------------------------------------------------------------+
   | 項目名                      | 設定値                                  | 備考                                                                              |
   +=============================+=========================================+===================================================================================+
   | 実行環境名                  | azure_ee_ubi9                           | ー                                                                                |
   |                             |                                         |                                                                                   |
   +-----------------------------+-----------------------------------------+-----------------------------------------------------------------------------------+
   | 実行環境構築方法            | ITA                                     | ー                                                                                |
   |                             |                                         |                                                                                   |
   +-----------------------------+-----------------------------------------+-----------------------------------------------------------------------------------+
   | タグ名                      | azure_ee_image_ubi9                     | ー                                                                                |
   |                             |                                         |                                                                                   |
   +-----------------------------+-----------------------------------------+-----------------------------------------------------------------------------------+
   | 実行環境定義名              | 実行環境パラメータ定義/~[Exastro standa\| 初期データとして用意されているものを使用します。                                  |
   |                             | rd] default (galaxy collection is azure |                                                                                   |
   |                             | only)                                   |                                                                                   |
   |                             |                                         |                                                                                   |
   +-----------------------------+-----------------------------------------+-----------------------------------------------------------------------------------+
   | テンプレート名              | azure_ee_template                       | :menuselection:`Ansible共通 --> 実行環境定義テンプレート管理` のテンプレート名    |
   |                             |                                         |                                                                                   |
   +-----------------------------+-----------------------------------------+-----------------------------------------------------------------------------------+


| :menuselection:`Ansible[Legacy/Pioneer/Legacy-Role] --> Movement一覧` （実行しようとするAnsible作業のMovement）に実行環境設定を登録します。
| 実行環境設定に関連しないパラメータについては記載省略としています。

.. table::  :menuselection:`Ansible[Legacy/Pioneer/Legacy-Role] --> Movement一覧` に設定するパラメータ一覧
   :widths: 50 50 50 160 150
   :align: left

   +-------------------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | 項目名                              | 設定値                                                                      | 備考                                                        |
   +=====================================+=============================================================================+=============================================================+
   | MovementID                          | （記載省略）                                                                | ー                                                          |
   |                                     |                                                                             |                                                             |
   +-------------------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | Movement名                          | （記載省略）                                                                | ー                                                          |
   |                                     |                                                                             |                                                             |
   +-------------------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | 遅延タイマー                        | （記載省略）                                                                | ー                                                          |
   |                                     |                                                                             |                                                             |
   +-----------+-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | Ansible   | ホスト指定形式          | （記載省略）                                                                | ー                                                          |
   | 利用情報  |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | WinRM接続               | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | ヘッダーセクション      | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | オプションパラメータ    | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | ansible.cfg             | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------+-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | Ansible \   | 実行環境  | azure_ee_ubi9                                                               | :menuselection:`Ansible共通 --> 実行環境管理` の実行環境名  |
   |           | Execution \ |           |                                                                             |                                                             |
   |           | Agent \     |           |                                                                             |                                                             |
   |           | 利用情報    |           |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   |           +             +-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           |             | ansible-\ | ansible-builderで実行環境をbuildする際に\                                   | 通常は設定不要です。                                        |
   |           |             | builder\  | ansible-builderのパラメータが必要であれば入力します。                       |                                                             |
   |           |             |           |                                                                             | （ビルド時のデバッグ用途で ``-v 3`` を指定する等で使用）    |
   |           |             | パラメ\   | 詳細については、 `ansible-builder <https://ansible.readthedocs.io/proj      |                                                             |
   |           |             | ータ      | ects/builder/en/latest/usage/>`_ のマニュアルをご参照ください。             |                                                             |
   |           |             |           |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   |           +-------------+-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | Ansible \   | 実行環境  | （記載省略・使用しません）                                                  | ー                                                          |
   |           | Automation \|           |                                                                             |                                                             |
   |           | Controll\   |           |                                                                             |                                                             |
   |           | er 利用情報 |           |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   +-----------+-------------+-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+



コレクションを使用する例（有償版ベースイメージ）
------------------------------------------------


- | このケースでは下記条件でカスタマイズを施します。

  - | ベースイメージは「registry.redhat.io/ansible-automation-platform-24/ee-minimal-rhel9:latest」を使用する
  - | コレクションは「Azure.AzCollection」を使用する


Ansible Execution Agentでの事前準備
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ベースイメージをPullできるように予め「 :command:`podman login` 」を実施します。

.. code-block:: console
   :caption: コマンド（registry.redhat.ioでの認証）

   [userA@aea ~]$ podman login registry.redhat.io
   
    Username: [[RedHatアカウントのユーザ名]]
    Password: [[RedHatアカウントのパスワード]]
    Login Succeeded!


ITAでの実行環境定義登録
^^^^^^^^^^^^^^^^^^^^^^^

| :menuselection:`入力用 --> 実行環境パラメータ定義` に実行環境定義のテンプレートファイルに代入する設定値を登録します。

.. table::  :menuselection:`入力用 --> 実行環境パラメータ定義` に設定するパラメータ一覧
   :widths: 150 160 150
   :align: left

   +---------------------------------------------+----------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
   | 項目名                                      | 設定値                                                                     | 備考                                                                                     |
   +=============================================+============================================================================+==========================================================================================+
   | execution_environment_name                  | azure_ee                                                                   | 今回の説明では「azure_ee」を使用しますが、変更した場合は必要に応じて読み替えてください。 | 
   |                                             |                                                                            |                                                                                          |
   +---------------------------------------------+----------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
   | image                                       | registry.redhat.io/ansible-automation-platform-24/ee-minimal-rhel9:latest  | ー                                                                                       | 
   |                                             |                                                                            |                                                                                          |
   +---------------------------------------------+----------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
   | ansible_core                                | ansible_core==2.16.0                                                       | 将来的に、必要となる `ansible_core` のバージョンは変更となる可能性があります。           | 
   |                                             |                                                                            |                                                                                          |
   +---------------------------------------------+----------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
   | ansible_runner                              | ansible_runner                                                             | ー                                                                                       |  
   |                                             |                                                                            |                                                                                          |
   +---------------------------------------------+----------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
   | bindep_file                                 | 下記内容を登録します。                                                     | ー                                                                                       | 
   |                                             |                                                                            |                                                                                          |
   |                                             | .. code-block:: text                                                       |                                                                                          | 
   |                                             |                                                                            |                                                                                          |
   |                                             |   systemd-devel                                                            |                                                                                          | 
   |                                             |   gcc                                                                      |                                                                                          | 
   |                                             |   python3.11-devel                                                         |                                                                                          |  
   |                                             |                                                                            |                                                                                          |
   +---------------------------------------------+----------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
   | python_requirements_file                    | 下記内容を登録します。                                                     | ー                                                                                       | 
   |                                             |                                                                            |                                                                                          |
   |                                             | .. code-block:: text                                                       |                                                                                          | 
   |                                             |                                                                            |                                                                                          |
   |                                             |   pywinrm                                                                  |                                                                                          | 
   |                                             |   setuptools                                                               |                                                                                          | 
   |                                             |   pexpect                                                                  |                                                                                          | 
   |                                             |   boto3                                                                    |                                                                                          | 
   |                                             |   paramiko                                                                 |                                                                                          | 
   |                                             |   boto                                                                     |                                                                                          | 
   |                                             |   certifi                                                                  |                                                                                          | 
   |                                             |                                                                            |                                                                                          |
   +---------------------------------------------+----------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
   | galaxy_requirements_file                    | 下記内容を登録します。                                                     | ー                                                                                       | 
   |                                             |                                                                            |                                                                                          |
   |                                             | .. code-block:: yaml                                                       |                                                                                          | 
   |                                             |                                                                            |                                                                                          |
   |                                             |   collections:                                                             |                                                                                          | 
   |                                             |    - azure.azcollection                                                    |                                                                                          | 
   |                                             |                                                                            |                                                                                          |
   +---------------------------------------------+----------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
   | package_manager_path                        | /usr/bin/microdnf                                                          | ー                                                                                       | 
   |                                             |                                                                            |                                                                                          |
   +---------------------------------------------+----------------------------------------------------------------------------+------------------------------------------------------------------------------------------+


| :menuselection:`Ansible共通 --> 実行環境定義テンプレート管理` に実行環境定義のテンプレートファイルを登録します。

.. table::  :menuselection:`Ansible共通 --> 実行環境定義テンプレート管理` に設定するパラメータ一覧
   :widths: 150 160 150
   :align: left

   +---------------------------------------------+----------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
   | 項目名                                      | 設定値                                                                                 | 備考                                                                                     |
   +=============================================+========================================================================================+==========================================================================================+
   | テンプレート名                              | azure_ee_template                                                                      | 今回の説明では「azure_ee_template」を使用しますが、\                                     |
   |                                             |                                                                                        | 変更した場合は必要に応じて読み替えてください。                                           |
   +---------------------------------------------+----------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
   | テンプレートファイル                        | 下記内容を登録します。                                                                 | 将来的に、必要となる `ansible_core` のバージョンは変更となる可能性があります。           | 
   |                                             |                                                                                        |                                                                                          |
   |                                             | .. code-block:: yaml+jinja                                                             | その結果、必要となる `Python` のバージョンが変更となり、\                                | 
   |                                             |                                                                                        | `python_interpreter` の値も変更となる可能性があります。                                  | 
   |                                             |                                                                                        |                                                                                          |
   |                                             |   version: 3                                                                           |                                                                                          | 
   |                                             |                                                                                        |                                                                                          |
   |                                             |   build_arg_defaults:                                                                  |                                                                                          |
   |                                             |     ANSIBLE_GALAXY_CLI_COLLECTION_OPTS: '--ignore-certs'                               |                                                                                          | 
   |                                             |                                                                                        |                                                                                          |
   |                                             |   images:                                                                              |                                                                                          |
   |                                             |     base_image:                                                                        |                                                                                          |
   |                                             |       name: {{ image }}                                                                |                                                                                          | 
   |                                             |                                                                                        |                                                                                          |
   |                                             |   dependencies:                                                                        |                                                                                          |
   |                                             |     ansible_core:                                                                      |                                                                                          |
   |                                             |       package_pip: {{ ansible_core }}                                                  |                                                                                          |
   |                                             |     ansible_runner:                                                                    |                                                                                          |
   |                                             |       package_pip: {{ ansible_runner }}                                                |                                                                                          |
   |                                             |     system: {{ bindep_file }}                                                          |                                                                                          |
   |                                             |     python: {{ python_requirements_file }}                                             |                                                                                          |
   |                                             |   {% if galaxy_requirements_file == "" %}                                              |                                                                                          |
   |                                             |   {% else %}                                                                           |                                                                                          |
   |                                             |     galaxy: {{ galaxy_requirements_file }}                                             |                                                                                          |
   |                                             |   {% endif %}                                                                          |                                                                                          |
   |                                             |     python_interpreter:                                                                |                                                                                          |
   |                                             |       package_system: "python3.11"                                                     |                                                                                          |
   |                                             |       python_path: "/usr/bin/python3.11"                                               |                                                                                          | 
   |                                             |                                                                                        |                                                                                          |
   |                                             |   additional_build_steps:                                                              |                                                                                          |
   |                                             |     append_base:                                                                       |                                                                                          |
   |                                             |       - RUN /usr/bin/python3.11 -m pip install --upgrade pip                           |                                                                                          | 
   |                                             |                                                                                        |                                                                                          |
   |                                             |   options:                                                                             |                                                                                          |
   |                                             |     package_manager_path: {{ package_manager_path }}                                   |                                                                                          |
   |                                             |     user: root                                                                         |                                                                                          |  
   |                                             |                                                                                        |                                                                                          |
   +---------------------------------------------+----------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------+


| :menuselection:`Ansible共通 --> 実行環境管理` に実行環境定義のテンプレートファイルとテンプレートファイルに代入する設定値の紐付けを登録します。

.. table::  :menuselection:`Ansible共通 --> 実行環境管理` に設定するパラメータ一覧
   :widths: 150 160 150
   :align: left

   +-----------------------------+-----------------------------------------+-----------------------------------------------------------------------------------+
   | 項目名                      | 設定値                                  | 備考                                                                              |
   +=============================+=========================================+===================================================================================+
   | 実行環境名                  | azure_ee                                | ー                                                                                |
   |                             |                                         |                                                                                   |
   +-----------------------------+-----------------------------------------+-----------------------------------------------------------------------------------+
   | 実行環境構築方法            | ITA                                     | ー                                                                                |
   |                             |                                         |                                                                                   |
   +-----------------------------+-----------------------------------------+-----------------------------------------------------------------------------------+
   | タグ名                      | azure_ee_image                          | ー                                                                                |
   |                             |                                         |                                                                                   |
   +-----------------------------+-----------------------------------------+-----------------------------------------------------------------------------------+
   | 実行環境定義名              | 実行環境パラメータ定義/azure_ee         |  :menuselection:`入力用 --> 実行環境パラメータ定義` のexecution_environment_name  |  
   |                             |                                         |                                                                                   |
   +-----------------------------+-----------------------------------------+-----------------------------------------------------------------------------------+
   | テンプレート名              | azure_ee_template                       |  :menuselection:`Ansible共通 --> 実行環境定義テンプレート管理` のテンプレート名   | 
   |                             |                                         |                                                                                   |
   +-----------------------------+-----------------------------------------+-----------------------------------------------------------------------------------+


| :menuselection:`Ansible[Legacy/Pioneer/Legacy-Role] --> Movement一覧` （実行しようとするAnsible作業のMovement）に実行環境設定を登録します。
| 実行環境設定に関連しないパラメータについては記載省略としています。

.. table::  :menuselection:`Ansible[Legacy/Pioneer/Legacy-Role] --> Movement一覧` に設定するパラメータ一覧
   :widths: 50 50 50 160 150
   :align: left

   +-------------------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | 項目名                              | 設定値                                                                      | 備考                                                        |
   +=====================================+=============================================================================+=============================================================+
   | MovementID                          | （記載省略）                                                                | ー                                                          |
   |                                     |                                                                             |                                                             |
   +-------------------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | Movement名                          | （記載省略）                                                                | ー                                                          |
   |                                     |                                                                             |                                                             |
   +-------------------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | 遅延タイマー                        | （記載省略）                                                                | ー                                                          |
   |                                     |                                                                             |                                                             |
   +-----------+-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | Ansible   | ホスト指定形式          | （記載省略）                                                                | ー                                                          |
   | 利用情報  |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | WinRM接続               | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | ヘッダーセクション      | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | オプションパラメータ    | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | ansible.cfg             | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------+-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | Ansible \   | 実行環境  | azure_ee                                                                    | :menuselection:`Ansible共通 --> 実行環境管理` の実行環境名  |
   |           | Execution \ |           |                                                                             |                                                             |
   |           | Agent \     |           |                                                                             |                                                             |
   |           | 利用情報    |           |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   |           +             +-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           |             | ansible-\ | ansible-builderで実行環境をbuildする際に\                                   | 通常は設定不要です。                                        |
   |           |             | builder\  | ansible-builderのパラメータが必要であれば入力します。                       |                                                             |
   |           |             |           |                                                                             | （ビルド時のデバッグ用途で ``-v 3`` を指定する等で使用）    |
   |           |             | パラメ\   | 詳細については、 `ansible-builder <https://ansible.readthedocs.io/proj      |                                                             |
   |           |             | ータ      | ects/builder/en/latest/usage/>`_ のマニュアルをご参照ください。             |                                                             |
   |           |             |           |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   |           +-------------+-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | Ansible \   | 実行環境  | （記載省略・使用しません）                                                  | ー                                                          |
   |           | Automation \|           |                                                                             |                                                             |
   |           | Controll\   |           |                                                                             |                                                             |
   |           | er 利用情報 |           |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   +-----------+-------------+-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+


自作モジュールを使用する例
--------------------------

- | このケースでは下記条件でカスタマイズを施します。

  - | ベースイメージは「registry.access.redhat.com/ubi9/ubi-init:latest」を使用する
  - | 自作モジュールは「 :file:`/tmp/ansible_module/my_module.py` 」を使用する

自作モジュールの配置
^^^^^^^^^^^^^^^^^^^^

| 使用したい自作モジュールをAnsible Execution Agentの「 :file:`/tmp/ansible_module/my_module.py` 」に配置します。
| また、Ansible Execution Agentの実行ユーザがアクセスできるように読み取り権限を付与します。

.. code-block:: console
   :caption: コマンド例（読み取り権限の付与）

   [userA@aea ~]$ chmod a+r /tmp/ansible_module/my_module.py
   [userA@aea ~]$ ls -al /tmp/ansible_module/my_module.py
   -rw-r--r--. 1 userA userA 1024 Jan 1 00:00 /tmp/ansible_module/my_module.py


ITAでの実行環境定義登録
^^^^^^^^^^^^^^^^^^^^^^^

| :menuselection:`Ansible共通 --> 実行環境定義テンプレート管理` に実行環境定義のテンプレートファイルを登録します。

.. table::  :menuselection:`Ansible共通 --> 実行環境定義テンプレート管理` に設定するパラメータ一覧
   :widths: 150 160 150
   :align: left

   +---------------------------------------------+---------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
   | 項目名                                      | 設定値                                                                                      | 備考                                                                                     |
   +=============================================+=============================================================================================+==========================================================================================+
   | テンプレート名                              | my_module_ubi9_template                                                                     | 今回の説明では「my_module_ubi9_template」を使用しますが、\                               |
   |                                             |                                                                                             | 変更した場合は必要に応じて読み替えてください。                                           |
   +---------------------------------------------+---------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
   | テンプレートファイル                        | 下記内容を登録します。                                                                      | 自作モジュールのファイルパスが異なる場合は、\                                            | 
   |                                             |                                                                                             | :menuselection:`additional_build_files --> src` 及び \                                   |
   |                                             | .. code-block:: yaml+jinja                                                                  | :menuselection:`additional_build_steps --> append_base --> COPY` の値を \                | 
   |                                             |   :emphasize-lines: 25-27,31                                                                | 変更してください。                                                                       |
   |                                             |                                                                                             |                                                                                          | 
   |                                             |   version: 3                                                                                |                                                                                          | 
   |                                             |                                                                                             |                                                                                          |
   |                                             |   build_arg_defaults:                                                                       |                                                                                          |
   |                                             |     ANSIBLE_GALAXY_CLI_COLLECTION_OPTS: '--ignore-certs'                                    |                                                                                          |
   |                                             |                                                                                             |                                                                                          |
   |                                             |   images:                                                                                   |                                                                                          |
   |                                             |     base_image:                                                                             |                                                                                          |
   |                                             |       name: {{ image }}                                                                     |                                                                                          |
   |                                             |                                                                                             |                                                                                          |
   |                                             |   dependencies:                                                                             |                                                                                          |
   |                                             |     ansible_core:                                                                           |                                                                                          |
   |                                             |       package_pip: {{ ansible_core }}                                                       |                                                                                          |
   |                                             |     ansible_runner:                                                                         |                                                                                          |
   |                                             |       package_pip: {{ ansible_runner }}                                                     |                                                                                          |
   |                                             |     system: {{ bindep_file }}                                                               |                                                                                          |
   |                                             |     python: {{ python_requirements_file }}                                                  |                                                                                          |
   |                                             |   {% if galaxy_requirements_file == "" %}                                                   |                                                                                          |
   |                                             |   {% else %}                                                                                |                                                                                          |
   |                                             |     galaxy: {{ galaxy_requirements_file }}                                                  |                                                                                          |
   |                                             |   {% endif %}                                                                               |                                                                                          |
   |                                             |     python_interpreter:                                                                     |                                                                                          |
   |                                             |       package_system: "python39"                                                            |                                                                                          |
   |                                             |       python_path: "/usr/bin/python3.9"                                                     |                                                                                          |
   |                                             |                                                                                             |                                                                                          |
   |                                             |   additional_build_files:                                                                   |                                                                                          |
   |                                             |     - src: /tmp/ansible_module/my_module.py                                                 |                                                                                          |
   |                                             |       dest: configs                                                                         |                                                                                          |
   |                                             |                                                                                             |                                                                                          |
   |                                             |   additional_build_steps:                                                                   |                                                                                          |
   |                                             |     append_base:                                                                            |                                                                                          |
   |                                             |       - COPY _build/configs/my_module.py /usr/share/ansible/plugins/modules/                |                                                                                          |
   |                                             |       - RUN /usr/bin/python3.9 -m pip install --upgrade pip                                 |                                                                                          |
   |                                             |                                                                                             |                                                                                          |
   |                                             |   options:                                                                                  |                                                                                          |
   |                                             |     package_manager_path: {{ package_manager_path }}                                        |                                                                                          |
   |                                             |     user: root                                                                              |                                                                                          |
   |                                             |                                                                                             |                                                                                          |
   +---------------------------------------------+---------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------+


| :menuselection:`Ansible共通 --> 実行環境管理` に実行環境定義のテンプレートファイルとテンプレートファイルに代入する設定値の紐付けを登録します。

.. table::  :menuselection:`Ansible共通 --> 実行環境管理` に設定するパラメータ一覧
   :widths: 150 160 150
   :align: left

   +-----------------------------+----------------------------------------------------------------------------------+-----------------------------------------------------------------------------------+
   | 項目名                      | 設定値                                                                           | 備考                                                                              |
   +=============================+==================================================================================+===================================================================================+
   | 実行環境名                  | my_module_ubi9                                                                   | ー                                                                                |
   |                             |                                                                                  |                                                                                   |
   +-----------------------------+----------------------------------------------------------------------------------+-----------------------------------------------------------------------------------+
   | 実行環境構築方法            | ITA                                                                              | ー                                                                                |
   |                             |                                                                                  |                                                                                   |
   +-----------------------------+----------------------------------------------------------------------------------+-----------------------------------------------------------------------------------+
   | タグ名                      | my_module_ubi9_image                                                             | ー                                                                                |
   |                             |                                                                                  |                                                                                   |
   +-----------------------------+----------------------------------------------------------------------------------+-----------------------------------------------------------------------------------+
   | 実行環境定義名              | 実行環境パラメータ定義/~[Exastro standard] default (no galaxy collection)        |  初期データとして用意されているものを使用します。                                 |  
   |                             |                                                                                  |                                                                                   |
   +-----------------------------+----------------------------------------------------------------------------------+-----------------------------------------------------------------------------------+
   | テンプレート名              | my_module_ubi9_template                                                          |  :menuselection:`Ansible共通 --> 実行環境定義テンプレート管理` のテンプレート名   | 
   |                             |                                                                                  |                                                                                   |
   +-----------------------------+----------------------------------------------------------------------------------+-----------------------------------------------------------------------------------+



| :menuselection:`Ansible[Legacy/Pioneer/Legacy-Role] --> Movement一覧` （実行しようとするAnsible作業のMovement）に実行環境設定を登録します。
| 実行環境設定に関連しないパラメータについては記載省略としています。

.. table::  :menuselection:`Ansible[Legacy/Pioneer/Legacy-Role] --> Movement一覧` に設定するパラメータ一覧
   :widths: 50 50 50 160 150
   :align: left

   +-------------------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | 項目名                              | 設定値                                                                      | 備考                                                        |
   +=====================================+=============================================================================+=============================================================+
   | MovementID                          | （記載省略）                                                                | ー                                                          |
   |                                     |                                                                             |                                                             |
   +-------------------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | Movement名                          | （記載省略）                                                                | ー                                                          |
   |                                     |                                                                             |                                                             |
   +-------------------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | 遅延タイマー                        | （記載省略）                                                                | ー                                                          |
   |                                     |                                                                             |                                                             |
   +-----------+-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | Ansible   | ホスト指定形式          | （記載省略）                                                                | ー                                                          |
   | 利用情報  |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | WinRM接続               | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | ヘッダーセクション      | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | オプションパラメータ    | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | ansible.cfg             | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------+-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | Ansible \   | 実行環境  | my_module_ubi9                                                              | :menuselection:`Ansible共通 --> 実行環境管理` の実行環境名  |
   |           | Execution \ |           |                                                                             |                                                             |
   |           | Agent \     |           |                                                                             |                                                             |
   |           | 利用情報    |           |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   |           +             +-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           |             | ansible-\ | ansible-builderで実行環境をbuildする際に\                                   | 通常は設定不要です。                                        |
   |           |             | builder\  | ansible-builderのパラメータが必要であれば入力します。                       |                                                             |
   |           |             |           |                                                                             | （ビルド時のデバッグ用途で ``-v 3`` を指定する等で使用）    |
   |           |             | パラメ\   | 詳細については、 `ansible-builder <https://ansible.readthedocs.io/proj      |                                                             |
   |           |             | ータ      | ects/builder/en/latest/usage/>`_ のマニュアルをご参照ください。             |                                                             |
   |           |             |           |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   |           +-------------+-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | Ansible \   | 実行環境  | （記載省略・使用しません）                                                  | ー                                                          |
   |           | Automation \|           |                                                                             |                                                             |
   |           | Controll\   |           |                                                                             |                                                             |
   |           | er 利用情報 |           |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   +-----------+-------------+-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+




Ansible Automation Platformでのカスタマイズ例
=============================================

コレクションを使用する例（無償版ベースイメージ）
------------------------------------------------


- | このケースでは下記条件でカスタマイズを施します。

  - | ベースイメージは「registry.access.redhat.com/ubi9/ubi-init:latest」を使用する
  - | コレクションは「Azure.AzCollection」を使用する


ansible-builderのインストール
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ansible-builderのインストールを行います。

.. code-block:: console
   :caption: コマンド（ControlNodeで実施）

   [root@control-node ~]# dnf install --enablerepo=ansible-automation-platform-2.4-for-rhel-8-x86_64-rpms ansible-builder


必要ファイルの準備
^^^^^^^^^^^^^^^^^^

| ansible-builderでイメージを作成するために必要なファイルを作成します。
| 今回は下記ファイルを作成します。
| （下記の4ファイルは特定の同一ディレクトリに格納することを推奨します）

- | execution-environment.yml
  
  - ansible-builderの定義ファイル

.. code-block:: yaml
   :caption: execution-environment.yml

   version: 3

   build_arg_defaults:
     ANSIBLE_GALAXY_CLI_COLLECTION_OPTS: '--ignore-certs'

   images:
     base_image:
       name: registry.access.redhat.com/ubi9/ubi-init:latest

   dependencies:
     ansible_core:
       package_pip: ansible_core
     ansible_runner:
       package_pip: ansible_runner
     system: bindep.txt
     python: python-requirements.txt
     galaxy: galaxy-requirements.yml
     python_interpreter:
       package_system: "python3.11"
       python_path: "/usr/bin/python3.11"

   additional_build_steps:
     append_base:
       - RUN /usr/bin/python3.11 -m pip install --upgrade pip

   options:
     package_manager_path: /usr/bin/dnf
     user: root


- | galaxy-requirements.yml
  
  - インストールしたいansible-galaxy コレクションリストを記載するファイル

.. code-block:: yaml
   :caption: galaxy-requirements.yml
   
   collections:
     - azure.azcollection


- | python-requirements.txt

  - Python の依存関係を解決するためにPython 要件を記載するファイル

.. code-block:: text
   :caption: python-requirements.txt

   pywinrm
   setuptools
   pexpect
   boto3
   paramiko
   boto
   certifi


- | bindep.txt

  - システムレベルの依存関係を解決するためにパッケージ要件を記載するファイル

.. code-block:: text
   :caption: bindep.txt

   openssh-clients
   sshpass
   expect


ansible-builderの実行
^^^^^^^^^^^^^^^^^^^^^

| 上記ファイルを基に、ansible-builderコマンドでイメージを作成します。
| ここで指定したタグ名は後々使用するので控えておきます。

.. code-block:: console
   :caption: コマンド（ControlNodeで実施）

   [root@control-node ~]# ansible-builder build -t [[タグ名]]



| 10分程度後に下記表示がされれば、正常にビルドが完了しています。

.. code-block:: console

   Complete! The build context can be found at: /[[pwd]]/context


| 念のため、「podman images」でカスタムイメージを確認します。

.. code-block:: console
   :caption: コマンド（ControlNodeで実施）

   [root@control-node ~]# podman images
   
   --表示例--
   REPOSITORY                                                          TAG         IMAGE ID      CREATED             SIZE
   localhost/[[タグ名]]                                                latest      fb7a51d88886  About a minute ago  1.99 GB
   <none>                                                              <none>      cc220af5af51  5 minutes ago       2 GB
   <none>                                                              <none>      a1bf761c249f  9 minutes ago       464 MB
   registry.access.redhat.com/ubi9/ubi-init                            latest      b3be55cf7793  3 weeks ago         311 MB


ControlNodeのawxユーザ用にカスタムイメージをコピー
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| 作成したカスタムイメージを ControlNode のawxユーザで使用できるようにします。

.. code-block:: console
   :caption: コマンド（ControlNodeで実施）

    [root@control-node ~]# podman save -o /tmp/azure_ee.tar localhost/[[タグ名]]
    ...
    Writing manifest to image destination
    [root@control-node ~]# chown awx:awx /tmp/azure_ee.tar
    [root@control-node ~]# su awx -
    [awx@control-node ~]$ podman load -i /tmp/azure_ee.tar
    ...
    Writing manifest to image destination
    [awx@control-node ~]$ podman images
     
    --表示例--
    REPOSITORY                                                          TAG         IMAGE ID      CREATED             SIZE
    localhost/[[タグ名]]                                                latest      fb7a51d88886  About a minute ago  1.99 GB
    registry.access.redhat.com/ubi9/ubi-init                            latest      b3be55cf7793  3 weeks ago         311 MB


ExecutionNodeのawxユーザ用にカスタムイメージをコピー
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| 作成したカスタムイメージを ExecutionNode のawxユーザで使用できるようにします。
| 予め、ControlNodeより「/tmp/azure_ee.tar」の資材を転送しておきます。

.. code-block:: console
   :caption: コマンド（ExecutionNodeで実施）

    [awx@execution-node ~]$ podman load -i /tmp/azure_ee.tar
    ...
    Writing manifest to image destination
    [awx@execution-node ~]$ podman images
     
    --表示例--
    REPOSITORY                                                          TAG         IMAGE ID      CREATED             SIZE
    localhost/[[タグ名]]                                                latest      fb7a51d88886  About a minute ago  1.99 GB
    registry.access.redhat.com/ubi9/ubi-init                            latest      b3be55cf7793  3 weeks ago         311 MB


AAPに実行環境を登録
^^^^^^^^^^^^^^^^^^^
| コピーしたカスタムイメージを使用する実行環境設定をAnsible Automation Platformに登録します。

.. figure:: /images/ja/ansible-ee/aap-env-3.png
   :width: 800px
   :alt: 実行環境/新規実行環境の作成
   
   実行環境/新規実行環境の作成
   

ITAに実行環境を登録
^^^^^^^^^^^^^^^^^^^
| ITAに実行環境設定を登録します。
| 登録する環境名は、AAPで登録した名前（上記ではazure_ee_ubi9）となります。


| :menuselection:`Ansible[Legacy/Pioneer/Legacy-Role] --> Movement一覧` （実行しようとするAnsible作業のMovement）に実行環境設定を登録します。
| 実行環境設定に関連しないパラメータについては記載省略としています。

.. table::  :menuselection:`Ansible[Legacy/Pioneer/Legacy-Role] --> Movement一覧` に設定するパラメータ一覧
   :widths: 50 50 50 160 150
   :align: left

   +-------------------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | 項目名                              | 設定値                                                                      | 備考                                                        |
   +=====================================+=============================================================================+=============================================================+
   | MovementID                          | （記載省略）                                                                | ー                                                          |
   |                                     |                                                                             |                                                             |
   +-------------------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | Movement名                          | （記載省略）                                                                | ー                                                          |
   |                                     |                                                                             |                                                             |
   +-------------------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | 遅延タイマー                        | （記載省略）                                                                | ー                                                          |
   |                                     |                                                                             |                                                             |
   +-----------+-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | Ansible   | ホスト指定形式          | （記載省略）                                                                | ー                                                          |
   | 利用情報  |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | WinRM接続               | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | ヘッダーセクション      | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | オプションパラメータ    | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | ansible.cfg             | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------+-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | Ansible \   | 実行環境  | （記載省略・使用しません）                                                  | ー                                                          |
   |           | Execution \ |           |                                                                             |                                                             |
   |           | Agent \     |           |                                                                             |                                                             |
   |           | 利用情報    |           |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   |           +             +-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           |             | ansible-\ | （記載省略・使用しません）                                                  | ー                                                          |
   |           |             | builder\  |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   |           |             | パラメ\   |                                                                             |                                                             |
   |           |             | ータ      |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   |           +-------------+-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | Ansible \   | 実行環境  | e.g.) azure_ee_ubi9                                                         | :menuselection:`AAPに実行環境を登録` で登録した実行環境名   |
   |           | Automation \|           |                                                                             |                                                             |
   |           | Controll\   |           |                                                                             |                                                             |
   |           | er 利用情報 |           |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   +-----------+-------------+-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+




コレクションを使用する例（有償版ベースイメージ）
------------------------------------------------


- | このケースでは下記条件でカスタマイズを施します。

  - | ベースイメージは「registry.redhat.io/ansible-automation-platform-24/ee-minimal-rhel9:latest」を使用する
  - | コレクションは「Azure.AzCollection」を使用する

ansible-builderのインストール
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ansible-builderのインストールを行います。

.. code-block:: console
   :caption: コマンド（ControlNodeで実施）

   [root@control-node ~]# dnf install --enablerepo=ansible-automation-platform-2.4-for-rhel-8-x86_64-rpms ansible-builder


必要ファイルの準備
^^^^^^^^^^^^^^^^^^

| ansible-builderでイメージを作成するために必要なファイルを作成します。
| 今回は下記ファイルを作成します。
| （下記の4ファイルは特定の同一ディレクトリに格納することを推奨します）

- | execution-environment.yml
  
  - ansible-builderの定義ファイル

.. code-block:: yaml
   :caption: execution-environment.yml

   version: 3

   build_arg_defaults:
     ANSIBLE_GALAXY_CLI_COLLECTION_OPTS: '--ignore-certs'

   images:
     base_image:
       name: registry.redhat.io/ansible-automation-platform-24/ee-minimal-rhel9:latest

   dependencies:
     ansible_core:
       package_pip: ansible_core==2.16.0
     ansible_runner:
       package_pip: ansible_runner
     system: bindep.txt
     python: python-requirements.txt
     galaxy: galaxy-requirements.yml
     python_interpreter:
       package_system: "python3.11"
       python_path: "/usr/bin/python3.11"

   additional_build_steps:
     append_base:
       - RUN /usr/bin/python3.11 -m pip install --upgrade pip

   options:
     package_manager_path: /usr/bin/microdnf
     user: root


- | galaxy-requirements.yml
  
  - インストールしたいansible-galaxy コレクションリストを記載するファイル

.. code-block:: yaml
   :caption: galaxy-requirements.yml
   
   collections:
     - azure.azcollection


- | python-requirements.txt

  - Python の依存関係を解決するためにPython 要件を記載するファイル

.. code-block:: text
   :caption: python-requirements.txt

   pywinrm
   setuptools
   pexpect
   boto3
   paramiko
   boto
   certifi


- | bindep.txt

  - システムレベルの依存関係を解決するためにパッケージ要件を記載するファイル

.. code-block:: text
   :caption: bindep.txt

   systemd-devel
   gcc
   python3.11-devel


ansible-builderの実行
^^^^^^^^^^^^^^^^^^^^^
| ansible-builderを実行する前に、ベースイメージをPullできるように「 :command:`podman login` 」を実施します。

.. code-block:: console
   :caption: コマンド（ControlNodeで実施）

   [root@control-node ~]# podman login registry.redhat.io
   
    Username: [[RedHatアカウントのユーザ名]]
    Password: [[RedHatアカウントのパスワード]]
    Login Succeeded!


| 認証後、上記ファイルを基に、ansible-builderコマンドでイメージを作成します。
| ここで指定したタグ名は後々使用するので控えておきます。

.. code-block:: console
   :caption: コマンド（ControlNodeで実施）

   [root@control-node ~]# ansible-builder build -t [[タグ名]]



| 10分程度後に下記表示がされれば、正常にビルドが完了しています。

.. code-block:: console

   Complete! The build context can be found at: /[[pwd]]/context


| 念のため、「podman images」でカスタムイメージを確認します。

.. code-block:: console
   :caption: コマンド（ControlNodeで実施）

   [root@control-node ~]# podman images
   
   --表示例--
   REPOSITORY                                                          TAG         IMAGE ID      CREATED             SIZE
   localhost/[[タグ名]]                                                latest      fb7a51d88886  About a minute ago  1.99 GB
   <none>                                                              <none>      cc220af5af51  5 minutes ago       2 GB
   <none>                                                              <none>      a1bf761c249f  9 minutes ago       464 MB
   registry.redhat.io/ansible-automation-platform-24/ee-minimal-rhel9  latest      b3be55cf7793  3 weeks ago         311 MB


ControlNodeのawxユーザ用にカスタムイメージをコピー
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| 作成したカスタムイメージを ControlNode のawxユーザで使用できるようにします。

.. code-block:: console
   :caption: コマンド（ControlNodeで実施）

    [root@control-node ~]# podman save -o /tmp/azure_ee.tar localhost/[[タグ名]]
    ...
    Writing manifest to image destination
    [root@control-node ~]# chown awx:awx /tmp/azure_ee.tar
    [root@control-node ~]# su awx -
    [awx@control-node ~]$ podman load -i /tmp/azure_ee.tar
    ...
    Writing manifest to image destination
    [awx@control-node ~]$ podman images
     
    --表示例--
    REPOSITORY                                                          TAG         IMAGE ID      CREATED             SIZE
    localhost/[[タグ名]]                                                latest      fb7a51d88886  About a minute ago  1.99 GB
    registry.redhat.io/ansible-automation-platform-24/ee-minimal-rhel9  latest      b3be55cf7793  3 weeks ago         311 MB


ExecutionNodeのawxユーザ用にカスタムイメージをコピー
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| 作成したカスタムイメージを ExecutionNode のawxユーザで使用できるようにします。
| 予め、ControlNodeより「/tmp/azure_ee.tar」の資材を転送しておきます。

.. code-block:: console
   :caption: コマンド（ExecutionNodeで実施）

    [awx@execution-node ~]$ podman load -i /tmp/azure_ee.tar
    ...
    Writing manifest to image destination
    [awx@execution-node ~]$ podman images
     
    --表示例--
    REPOSITORY                                                          TAG         IMAGE ID      CREATED             SIZE
    localhost/[[タグ名]]                                                latest      fb7a51d88886  About a minute ago  1.99 GB
    registry.redhat.io/ansible-automation-platform-24/ee-minimal-rhel9  latest      b3be55cf7793  3 weeks ago         311 MB


AAPに実行環境を登録
^^^^^^^^^^^^^^^^^^^
| コピーしたカスタムイメージを使用する実行環境設定をAnsible Automation Platformに登録します。

.. figure:: /images/ja/ansible-ee/aap-env.png
   :width: 800px
   :alt: 実行環境/新規実行環境の作成
   
   実行環境/新規実行環境の作成
   

ITAに実行環境を登録
^^^^^^^^^^^^^^^^^^^
| ITAに実行環境設定を登録します。
| 登録する環境名は、AAPで登録した名前（上記ではazure_ee）となります。


| :menuselection:`Ansible[Legacy/Pioneer/Legacy-Role] --> Movement一覧` （実行しようとするAnsible作業のMovement）に実行環境設定を登録します。
| 実行環境設定に関連しないパラメータについては記載省略としています。

.. table::  :menuselection:`Ansible[Legacy/Pioneer/Legacy-Role] --> Movement一覧` に設定するパラメータ一覧
   :widths: 50 50 50 160 150
   :align: left

   +-------------------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | 項目名                              | 設定値                                                                      | 備考                                                        |
   +=====================================+=============================================================================+=============================================================+
   | MovementID                          | （記載省略）                                                                | ー                                                          |
   |                                     |                                                                             |                                                             |
   +-------------------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | Movement名                          | （記載省略）                                                                | ー                                                          |
   |                                     |                                                                             |                                                             |
   +-------------------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | 遅延タイマー                        | （記載省略）                                                                | ー                                                          |
   |                                     |                                                                             |                                                             |
   +-----------+-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | Ansible   | ホスト指定形式          | （記載省略）                                                                | ー                                                          |
   | 利用情報  |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | WinRM接続               | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | ヘッダーセクション      | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | オプションパラメータ    | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | ansible.cfg             | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------+-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | Ansible \   | 実行環境  | （記載省略・使用しません）                                                  | ー                                                          |
   |           | Execution \ |           |                                                                             |                                                             |
   |           | Agent \     |           |                                                                             |                                                             |
   |           | 利用情報    |           |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   |           +             +-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           |             | ansible-\ | （記載省略・使用しません）                                                  | ー                                                          |
   |           |             | builder\  |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   |           |             | パラメ\   |                                                                             |                                                             |
   |           |             | ータ      |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   |           +-------------+-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | Ansible \   | 実行環境  | e.g.) azure_ee                                                              | :menuselection:`AAPに実行環境を登録` で登録した実行環境名   |
   |           | Automation \|           |                                                                             |                                                             |
   |           | Controll\   |           |                                                                             |                                                             |
   |           | er 利用情報 |           |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   +-----------+-------------+-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+



自作モジュールを使用する例
--------------------------

- | このケースでは下記条件でカスタマイズを施します。

  - | ベースイメージは「registry.access.redhat.com/ubi9/ubi-init:latest」を使用する
  - | 自作モジュールは「 :file:`/tmp/ansible_module/my_module.py` 」を使用する

自作モジュールの配置
^^^^^^^^^^^^^^^^^^^^

| 使用したい自作モジュールをAnsible Automation PlatformのControlNodeの「 :file:`/tmp/ansible_module/my_module.py` 」に配置します。
| また、ansible-builderの実行ユーザがアクセスできるように読み取り権限を付与します。

.. code-block:: console
   :caption: コマンド（ControlNodeで実施）

   [root@control-node ~]# chmod a+r /tmp/ansible_module/my_module.py
   [root@control-node ~]# ls -al /tmp/ansible_module/my_module.py
   -rw-r--r--. 1 root root 1024 Jan 1 00:00 /tmp/ansible_module/my_module.py


ansible-builderのインストール
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| ansible-builderのインストールを行います。

.. code-block:: console
   :caption: コマンド（ControlNodeで実施）

   [root@control-node ~]# dnf install --enablerepo=ansible-automation-platform-2.4-for-rhel-8-x86_64-rpms ansible-builder


必要ファイルの準備
^^^^^^^^^^^^^^^^^^
| ansible-builderでイメージを作成するために必要なファイルを作成します。
| 今回は下記ファイルを作成します。
| （下記の3ファイルは特定の同一ディレクトリに格納することを推奨します）

| なお自作モジュールを使用するにあたり、 :file:`execution-environment.yml` の21～23行目・27行目を追加していますが、
| :menuselection:`コレクションを使用する例` で作成した :file:`execution-environment.yml` に対して同様に追加することで応用することも可能です。

- | execution-environment.yml
  
  - ansible-builderの定義ファイル

.. code-block:: yaml
   :emphasize-lines: 21-23,27
   :caption: execution-environment.yml
   
   version: 3

   build_arg_defaults:
     ANSIBLE_GALAXY_CLI_COLLECTION_OPTS: '--ignore-certs'

   images:
     base_image:
       name: registry.access.redhat.com/ubi9/ubi-init:latest

   dependencies:
     ansible_core:
       package_pip: ansible_core
     ansible_runner:
       package_pip: ansible_runner
     system: bindep.txt
     python: python-requirements.txt
     python_interpreter:
       package_system: "python39"
       python_path: "/usr/bin/python3.9"

   additional_build_files:
     - src: /tmp/ansible_module/my_module.py
       dest: configs
    
   additional_build_steps:
     append_base:
       - COPY _build/configs/my_module.py /usr/share/ansible/plugins/modules/
       - RUN /usr/bin/python3.11 -m pip install --upgrade pip

   options:
     package_manager_path: /usr/bin/microdnf
     user: root


- | python-requirements.txt

  - Python の依存関係を解決するためにPython 要件を記載するファイル

.. code-block:: text
   :caption: python-requirements.txt

   pywinrm
   setuptools
   pexpect
   boto3
   paramiko
   boto
   certifi


- | bindep.txt

  - システムレベルの依存関係を解決するためにパッケージ要件を記載するファイル

.. code-block:: text
   :caption: bindep.txt

   openssh-clients
   sshpass
   expect



ansible-builderの実行
^^^^^^^^^^^^^^^^^^^^^
| 上記ファイルを基に、ansible-builderコマンドでイメージを作成します。
| ここで指定したタグ名は後々使用するので控えておきます。

.. code-block:: console
   :caption: コマンド（ControlNodeで実施）

   [root@control-node ~]# ansible-builder build -t [[タグ名]]



| 10分程度後に下記表示がされれば、正常にビルドが完了しています。

.. code-block:: console

   Complete! The build context can be found at: /[[pwd]]/context


| 念のため、「podman images」でカスタムイメージを確認します。

.. code-block:: console
   :caption: コマンド（ControlNodeで実施）

   [root@control-node ~]# podman images
   
   --表示例--
   REPOSITORY                                                          TAG         IMAGE ID      CREATED             SIZE
   localhost/[[タグ名]]                                                latest      fb7a51d88886  About a minute ago  1.99 GB
   <none>                                                              <none>      cc220af5af51  5 minutes ago       2 GB
   <none>                                                              <none>      a1bf761c249f  9 minutes ago       464 MB
   registry.access.redhat.com/ubi9/ubi-init                            latest      b3be55cf7793  3 weeks ago         311 MB




ControlNodeのawxユーザ用にカスタムイメージをコピー
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| 作成したカスタムイメージを ControlNode のawxユーザで使用できるようにします。

.. code-block:: console
   :caption: コマンド（ControlNodeで実施）

    [root@control-node ~]# podman save -o /tmp/my_module_ubi9.tar localhost/[[タグ名]]
    ...
    Writing manifest to image destination
    [root@control-node ~]# chown awx:awx /tmp/my_module_ubi9.tar
    [root@control-node ~]# su awx -
    [awx@control-node ~]$ podman load -i /tmp/my_module_ubi9.tar
    ...
    Writing manifest to image destination
    [awx@control-node ~]$ podman images
     
    --表示例--
    REPOSITORY                                                          TAG         IMAGE ID      CREATED             SIZE
    localhost/[[タグ名]]                                                latest      fb7a51d88886  About a minute ago  1.99 GB
    registry.access.redhat.com/ubi9/ubi-init                            latest      b3be55cf7793  3 weeks ago         311 MB


ExecutionNodeのawxユーザ用にカスタムイメージをコピー
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| 作成したカスタムイメージを ExecutionNode のawxユーザで使用できるようにします。
| 予め、ControlNodeより「/tmp/my_module_ubi9.tar」の資材を転送しておきます。

.. code-block:: console
   :caption: コマンド（ExecutionNodeで実施）

    [awx@execution-node ~]$ podman load -i /tmp/my_module_ubi9.tar
    ...
    Writing manifest to image destination
    [awx@execution-node ~]$ podman images
     
    --表示例--
    REPOSITORY                                                          TAG         IMAGE ID      CREATED             SIZE
    localhost/[[タグ名]]                                                latest      fb7a51d88886  About a minute ago  1.99 GB
    registry.access.redhat.com/ubi9/ubi-init                            latest      b3be55cf7793  3 weeks ago         311 MB


AAPに実行環境を登録
^^^^^^^^^^^^^^^^^^^
| コピーしたカスタムイメージを使用する実行環境設定をAnsible Automation Platformに登録します。

.. figure:: /images/ja/ansible-ee/aap-env-2.png
   :width: 800px
   :alt: 実行環境/新規実行環境の作成
   
   実行環境/新規実行環境の作成
   

ITAに実行環境を登録
^^^^^^^^^^^^^^^^^^^
| ITAに実行環境設定を登録します。
| 登録する環境名は、AAPで登録した名前（上記ではmy_module_ubi9_image）となります。


| :menuselection:`Ansible[Legacy/Pioneer/Legacy-Role] --> Movement一覧` （実行しようとするAnsible作業のMovement）に実行環境設定を登録します。
| 実行環境設定に関連しないパラメータについては記載省略としています。

.. table::  :menuselection:`Ansible[Legacy/Pioneer/Legacy-Role] --> Movement一覧` に設定するパラメータ一覧
   :widths: 50 50 50 160 150
   :align: left

   +-------------------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | 項目名                              | 設定値                                                                      | 備考                                                        |
   +=====================================+=============================================================================+=============================================================+
   | MovementID                          | （記載省略）                                                                | ー                                                          |
   |                                     |                                                                             |                                                             |
   +-------------------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | Movement名                          | （記載省略）                                                                | ー                                                          |
   |                                     |                                                                             |                                                             |
   +-------------------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | 遅延タイマー                        | （記載省略）                                                                | ー                                                          |
   |                                     |                                                                             |                                                             |
   +-----------+-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   | Ansible   | ホスト指定形式          | （記載省略）                                                                | ー                                                          |
   | 利用情報  |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | WinRM接続               | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | ヘッダーセクション      | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | オプションパラメータ    | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------------------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | ansible.cfg             | （記載省略）                                                                | ー                                                          |
   |           |                         |                                                                             |                                                             |
   |           +-------------+-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | Ansible \   | 実行環境  | （記載省略・使用しません）                                                  | ー                                                          |
   |           | Execution \ |           |                                                                             |                                                             |
   |           | Agent \     |           |                                                                             |                                                             |
   |           | 利用情報    |           |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   |           +             +-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           |             | ansible-\ | （記載省略・使用しません）                                                  | ー                                                          |
   |           |             | builder\  |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   |           |             | パラメ\   |                                                                             |                                                             |
   |           |             | ータ      |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   |           +-------------+-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+
   |           | Ansible \   | 実行環境  | e.g.) my_module_ubi9_image                                                  | :menuselection:`AAPに実行環境を登録` で登録した実行環境名   |
   |           | Automation \|           |                                                                             |                                                             |
   |           | Controll\   |           |                                                                             |                                                             |
   |           | er 利用情報 |           |                                                                             |                                                             |
   |           |             |           |                                                                             |                                                             |
   +-----------+-------------+-----------+-----------------------------------------------------------------------------+-------------------------------------------------------------+

