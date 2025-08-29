========================
Azure Kubernetes Service
========================

はじめに
========

| 本書では、Exastro IT Automation のデプロイ先となる、Azure Kubernetes Service (AKS) クラスタにおけるセットアップ方法について説明します。


前提条件
========

- Azure CLI が利用可能であること。
- 下記の操作を行うために必要な権限を持っていること。


AKS クラスタ構築
================


AKS クラスタの作成例
--------------------

| AKS 環境へデプロイした Exastro Suite に接続するための AKS クラスタ作成におけるセットアップ例を紹介します。
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
      CLUSTER_NAME, 作成する AKS クラスタ名
      PUBLIC_IP_PREFIX_NAME, パブリック IP プレフィックス名
      AUTHORIZED_IP_RANGES, 接続元IPアドレス設定

   | コマンド実行に必要な変数の設定を行います。

   .. warning::
    | 下記のパラメータは設定例となるため、環境に応じて適切な値を設定してください。

   .. code:: bash

      # 利用するリソースグループ名
      RESOURCE_GROUP=exastro-suite-group
      # 作成する AKS クラスタ名
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

#. AKS クラスタ作成

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

| 作成した AKS クラスタにインターネットから接続するためのドメイン名を確認します。

.. code:: bash

   # AKS クラスタに設定されているドメイン名の取得
   az aks show -g ${RESOURCE_GROUP} -n ${CLUSTER_NAME} --query addonProfiles.httpApplicationRouting.config.HTTPApplicationRoutingZoneName -o table

::

   Result
   ----------------------------------------
   xxxxxxx.japaneast.aksapp.io

| ※この出力結果のドメインを後続のIngress利用時の設定として利用します。

| AKS クラスタの構築が完了したら :doc:`../../installation/online/exastro/kubernetes` に従って、Exastro IT Automation をインストールします。
