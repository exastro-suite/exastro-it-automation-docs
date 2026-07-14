========================
Azure Kubernetes Service
========================

はじめに
========

| 本書では、Exastro IT Automation のデプロイ先となる、Azure Kubernetes Service (AKS) クラスターのシステム要件および構築手順について説明します。


システム要件
============

Azure Kubernetes Service (AKS) クラスター
-----------------------------------------

.. list-table:: ハードウェア要件(最小構成)
 :widths: 20, 20
 :header-rows: 1

 * - リソース種別
   - 要求リソース
 * - 仮想マシンサイズ
   - Standard B4ms (4 vCPU / Memory 16 GiB)
 * - Storage (Container image size)
   - 10GB
 * - Kubernetes
   - 1.23 以上
 * - サーバー台数
   - 1台

.. list-table:: ハードウェア要件(推奨構成)
 :widths: 20, 20
 :header-rows: 1

 * - リソース種別
   - 要求リソース
 * - 仮想マシンサイズ
   - Standard D4as v5 (4 vCPU / Memory 16 GiB)
 * - Storage
   - 120GB
 * - Kubernetes
   - 1.23 以上
 * - サーバー台数
   - 2台 以上

.. warning::
  | 要求リソースは Exastro IT Automation のコア機能に対する値です。同一クラスタ上に Keycloak や MariaDB などの外部ツールをデプロイする場合は、その分のリソースが別途必要となります。
  | データベースおよびファイルの永続化のために、別途ReadWriteManyで接続可能なNFS等のストレージ領域を用意する必要があります。
  | Storage サイズには、Exastro IT Automation が使用する入出力データのファイルは含まれていないため、利用状況に応じて容量を見積もる必要があります。

通信要件
--------

- | クライアントからデプロイ先のコンテナ環境にアクセスできる必要があります。
- | Platform 管理者用と一般ユーザー用の2つ通信ポートが使用となります。
- | コンテナ環境からコンテナイメージの取得のために、Docker Hub に接続できる必要があります。

外部コンポーネント
------------------

- | MariaDB、もしくは、MySQL サーバ
- | GitLab リポジトリ、および、アカウントの払い出しが可能なこと

.. warning::
  | GitLab 環境を同一クラスタに構築する場合は、GitLab のシステム要件に対応する最小要件を追加で用意する必要があります。
  | Database 環境を同一クラスタに構築する場合は、使用する Database のシステム要件に対応する最小要件を定義する必要があります


Azure Kubernetes Service (AKS) クラスター構築
=============================================

前提条件
--------

- Azure CLI が利用可能であること。
- 下記の操作を行うために必要な権限を持っていること。


AKS クラスターの作成例
----------------------

| AKS 環境へデプロイした Exastro Suite に接続するための AKS クラスター作成におけるセットアップ例を紹介します。
| 必要な設定などは適宜確認の上、環境に合った設定値を投入して下さい。

#. はじめに

   | サービス公開をするために Exastro Platform のサービスに、External IP の設定と DNS 登録をしてインターネットを経由した接続をする手順を説明します。
   | External IP を設定するにあたり、パブリック IP プレフィックスを作成する必要があるため、はじめにAKSを構築するまでの手順を合わせて記載します。
   | なお、パブリック IP プレフィックスの作成は GUI を使った方法もありますが、ここでは Azure CLI を使用した構築例を記載します。

#. 変数設定

   | クラスタ作成時のパラメータを定義します。

   .. csv-table::
    :header: 変数, 説明
    :widths: 30, 30

      RESOURCE_GROUP, 利用するリソースグループ名
      CLUSTER_NAME, 作成する AKS クラスター名
      PUBLIC_IP_PREFIX_NAME, パブリック IP プレフィックス名
      AUTHORIZED_IP_RANGES, 接続元IPアドレス設定

   | コマンド実行に必要な変数の設定を行います。

   .. warning::
    | 下記のパラメータは設定例となるため、環境に応じて適切な値を設定してください。

   .. code:: bash

      # 利用するリソースグループ名
      RESOURCE_GROUP=exastro-suite-group
      # 作成する AKS クラスター名
      CLUSTER_NAME=exastro-suite

      # パブリック IP プレフィックス名
      PUBLIC_IP_PREFIX_NAME=${CLUSTER_NAME}-ipprefix
      # 接続元IPアドレス設定
      AUTHORIZED_IP_RANGES=xxx.xxx.xxx.xxx/31

#. パブリックIPプレフィックスの作成

   .. code:: bash

      # パブリック IP アドレスの払い出し
      az network public-ip prefix create \
        --resource-group ${RESOURCE_GROUP} \
        --name ${PUBLIC_IP_PREFIX_NAME} \
        --length 31 \
        --location japaneast

      # パブリック IP プレフィックスの作成結果を変数に格納
      PUBLIC_IP_PREFIX_ID=$(az network public-ip prefix show --resource-group ${RESOURCE_GROUP} --name ${PUBLIC_IP_PREFIX_NAME} --query id --output tsv)
      AUTHORIZED_IP_RANGES+=,$(az network public-ip prefix show --resource-group ${RESOURCE_GROUP} --name ${PUBLIC_IP_PREFIX_NAME} --query ipPrefix --output tsv)

#. AKS クラスター作成

   .. code:: bash

      # AKS クラスタ作成
      az aks create \
        --resource-group ${RESOURCE_GROUP} \
        --name ${CLUSTER_NAME} \
        --generate-ssh-keys \
        --kubernetes-version 1.23.8 \
        --node-count 1 \
        --node-vm-size Standard_D4a_v4 \
        --os-sku Ubuntu \
        --enable-node-public-ip \
        --node-public-ip-prefix-id ${PUBLIC_IP_PREFIX_ID} \
        --enable-addons http_application_routing \
        --api-server-authorized-ip-ranges ${AUTHORIZED_IP_RANGES}

.. _aks-dns:

ドメイン名の確認
----------------

| 作成した AKS クラスターにインターネットから接続するためのドメイン名を確認します。

.. code:: bash

   # AKS クラスターに設定されているドメイン名の取得
   az aks show -g ${RESOURCE_GROUP} -n ${CLUSTER_NAME} --query addonProfiles.httpApplicationRouting.config.HTTPApplicationRoutingZoneName -o table

::

   Result
   ----------------------------------------
   xxxxxxx.japaneast.aksapp.io

| ※この出力結果のドメインを後続のIngress利用時の設定として利用します。

| AKS クラスターの構築が完了したら :doc:`../../installation/online/exastro/kubernetes` に従って、Exastro IT Automation をインストールします。
