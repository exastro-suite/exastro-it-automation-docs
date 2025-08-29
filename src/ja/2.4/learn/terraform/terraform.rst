==============
IaaSの払い出し
==============

| 本シナリオでは、簡単な例として、IaaSの払い出しを題材に Exastro IT Automation の基本操作を学習します。


作業概要の作成
==============

| 具体的なパラメータの設定や作業手順を考える前に、作業計画を立てるところから初めます。
| まずは、いつ、どこの機器に対して、何を、どうするかといった情報を簡単に整理しておきましょう。

.. list-table:: 作業の方針
   :widths: 10 15
   :header-rows: 0

   * - 作業実施日時
     - 2024/04/01 12:00:00
   * - 作業対象
     - server01(RHEL8)
   * - 作業内容
     - IaaSの払い出し

作業概要登録
------------

| オペレーション登録では、作業を実施する際の作業概要を定義します。
| 先に決めた作業の方針を元にオペレーション情報を記入しましょう。


| :menuselection:`基本コンソール --> オペレーション一覧` から、作業実施日時や作業名を登録します。

.. figure:: /images/learn/quickstart/Terraform_scenario1/オペレーション登録.png
   :width: 1200px
   :alt: オペレーション登録

.. list-table:: オペレーション登録内容
   :widths: 10 15
   :header-rows: 1

   * - オペレーション名
     - 実施予定日時
   * - :kbd:`TF-AzureVM構築`
     - :kbd:`2024/04/01 12:00:00`

.. tip::
   | 作業実施日時は、本シナリオでは適当な日時で問題ありませんが、作業日が定まっている場合は、正確な作業実施の予定日時を設定することを推奨します。
   | 定期作業などの繰り返し行われる作業のように、作業日が定まっていない場合は現在の日時を登録しても問題ありません。

Workspace管理
=============

| Workspace管理では、Terraformで利用するWorkspaceについてのメンテナンス（閲覧/登録/更新／/廃止リソース削除）を行います。


| Terraformコマンドを実行するためにWorkspaceを作成します。
| :menuselection:`Terraform CLI --> Workspace管理` から、Terraformコマンドを実行するために、「tfe_ws001」というWorkspaceを作成します。

.. figure:: /images/learn/quickstart/Terraform_scenario1/Workspace作成.png
   :width: 1200px
   :alt: Workspace作成

.. list-table:: Movement 情報の設定値
   :widths: 20 10
   :header-rows: 1

   * - Workspace名
     - 備考
   * - :kbd:`tfe_ws001`
     - 

作業項目の設定
--------------

| Exastro IT Automation では、Movement という単位で作業を管理し、作業手順書における作業項目に該当します。
| MovementはTerraform利用情報としてWorkspaceと紐付ける必要があるため、先に「Workspaces管理」にて対象を登録しておく必要があります。

| :menuselection:`Terraform CLI --> Movement一覧` から、IaaSの払い出しのための Movement を登録します。

.. figure:: /images/learn/quickstart/Terraform_scenario1/Movement登録.png
   :width: 1200px
   :alt: Movement登録

.. list-table:: Movement 情報の設定値
   :widths: 10 10
   :header-rows: 2

   * - Movement名
     - Terraform利用情報
   * - 
     - Workspace
   * - :kbd:`tfe_mov001`
     - :kbd:`tfe_ws001`

Module素材集
-----------------

| Module素材集では、ユーザーが作成したModuleのメンテナンス（閲覧/登録/更新/廃止）を行います。


| 使用するModuleファイルをModule素材集から登録します。
| 利用する Moduleファイル は下記になります。
| 本シナリオでは、main.tf と variables.tf を使用します。

.. code-block:: bash
   :caption: main.tf

   provider "azurerm" {
     features {}
     subscription_id = var.subscription_id
     client_id       = var.client_id
     client_secret   = var.client_secret
     tenant_id       = var.tenant_id
   }

   resource "azurerm_resource_group" "hogehoge" {
     name = var.resource_group_name
     location = var.location
   }

   resource "azurerm_resource_group" "hogehoge" {
     name = "terraform-ita-test99"
     location = var.location
   }

   /*
   resource "azurerm_network_security_group" "hogehoge" {
       name =var.security_group
       location = azurerm_resource_group.hogehoge.location
       resource_group_name = azurerm_resource_group.hogehoge.name

       security_rule {
           name                       = "SSH"
           priority                   = 1001
           direction                  = "Inbound"
           access                     = "Allow"
           protocol                   = "Tcp"
           source_port_range          = "*"
           destination_port_range     = "22"
           source_address_prefix      = "*"
           destination_address_prefix = "*"
       }
       security_rule {
           name                       = "HTTP"
           priority                   = 1002
           direction                  = "Inbound"
           access                     = "Allow"
           protocol                   = "Tcp"
           source_port_range          = "*"
           destination_port_range     = "80"
           source_address_prefix      = "*"
           destination_address_prefix = "*"
       }
   }

   resource "azurerm_virtual_network" "hogehoge" {
     name = var.Vnet_name
     address_space = [var.Vnet_address_space]
     location = azurerm_resource_group.hogehoge.location
     resource_group_name = azurerm_resource_group.hogehoge.name
   }

   resource "azurerm_subnet" "hogehoge" {
       name                 = var.subnet_name
       resource_group_name  = azurerm_resource_group.hogehoge.name
       virtual_network_name = azurerm_virtual_network.hogehoge.name
       address_prefixes     = [var.address_prefixes]
   }

   resource "azurerm_public_ip" "hogehoge" {
     count                 = var.VM_count
     name                  = "${var.public_ip_name}-${count.index}"
     location              = azurerm_resource_group.hogehoge.location
     resource_group_name   = azurerm_resource_group.hogehoge.name
     allocation_method     = var.allocation_method
     domain_name_label     = "${var.domain_name_label}-${count.index}"
   }

   resource "azurerm_network_interface" "hogehoge" {
       count               = var.VM_count
       name                = "${var.network_interface_name}-${count.index}"
       location            = azurerm_resource_group.hogehoge.location
       resource_group_name = azurerm_resource_group.hogehoge.name

       ip_configuration {
           name                          = var.NIC_name
           subnet_id                     = azurerm_subnet.hogehoge.id
           private_ip_address_allocation = var.allocation_method
           public_ip_address_id          = azurerm_public_ip.hogehoge[count.index].id
       }
   }

   resource "azurerm_network_interface_security_group_association" "hogehoge" {
     count = var.VM_count
     network_interface_id      = azurerm_network_interface.hogehoge[count.index].id
     network_security_group_id = azurerm_network_security_group.hogehoge.id
   }

   resource "azurerm_linux_virtual_machine" "hogehoge" {
     count                 = var.VM_count
     name                  = "${var.VM_name}-${count.index}"
     resource_group_name   = azurerm_resource_group.hogehoge.name
     location              = azurerm_resource_group.hogehoge.location
     size                  = var.VM_size
     admin_username        = var.admin_username
     network_interface_ids = [azurerm_network_interface.hogehoge[count.index].id]

     admin_ssh_key {
     username   = var.admin_username
     public_key = var.ssh_public_key
     }

     os_disk {
       name                 = "${var.os_disk_name}-${count.index}"
       caching              = var.caching
       storage_account_type = var.storage_account_type
     }

     source_image_reference {
       publisher = var.publisher
       offer     = var.offer
       sku       = var.sku
       version   = var.source_image_version
     }
   }
   */

.. code-block:: bash
   :caption: variables.tf

   variable "subscription_id" {}
   variable "tenant_id" {}
   variable "client_id" {}
   variable "client_secret" {}
   variable "resource_group_name" {}
   variable "location" {}
   /*
   variable "security_group" {}
   variable "Vnet_name" {}
   variable "Vnet_address_space" {}
   variable "subnet_name" {}
   variable "address_prefixes" {}
   variable "public_ip_name" {}
   variable "allocation_method" {}
   variable "domain_name_label" {}
   variable "network_interface_name" {}
   variable "NIC_name" {}
   variable "VM_name" {}
   variable "VM_size" {}
   variable "publisher" {}
   variable "offer" {}
   variable "sku" {}
   variable "source_image_version" {}
   variable "admin_username" {}
   variable "ssh_public_key" {}
   variable "os_disk_name" {}
   variable "caching" {}
   variable "storage_account_type" {}
   variable "VM_count" {}
   */

| :menuselection:`Terraform CLI --> Module素材集` から、IaaSの払い出しのための Module素材集 を登録します。

.. figure:: /images/learn/quickstart/Terraform_scenario1/Module素材集.png
   :width: 1200px
   :alt: Module素材集

.. list-table:: Module素材集 情報の設定値
   :widths: 10 10
   :header-rows: 1

   * - Module素材名
     - Module素材
   * - :kbd:`variables`
     - :kbd:`variables.tf`
   * - :kbd:`main`
     - :kbd:`main.tf`  

Movement-Module紐付
-------------------

| :menuselection:`Terraform CLI --> Movement-Module紐付` から、Movement と Module素材集 の紐付けを行います。

.. figure:: /images/learn/quickstart/Terraform_scenario1/Movement-Module紐付.png
   :width: 1200px
   :alt: Movement-Module紐付

.. list-table:: Movement-Playbook紐付け情報の登録
  :widths: 10 10
  :header-rows: 1

  * - Movement名
    - Module素材
  * - :kbd:`tfe_mov001`
    - :kbd:`main`
  * - :kbd:`tfe_mov001`
    - :kbd:`variables`

パラメータシートの作成
----------------------

| :menuselection:`パラメータシート作成` では、作業時に利用する設定値(パラメータ)を登録するためのパラメータシートを管理します。


| Azure認証情報として、パラメータシートを作成します。
| :menuselection:`パラメータシート作成 --> パラメータシート定義・作成` から、Azure認証情報を管理するために、「Azureパラメータ」というパラメータシートを作成します。

.. figure:: /images/learn/quickstart/Terraform_scenario1/パラメータシート作成①.png
   :width: 1200px
   :alt: パラメータシート作成

.. list-table:: パラメータシート作成(Azureパラメータ)の項目の設定値
   :widths: 10 10 10 10 10 10 10
   :header-rows: 2

   * - グループ
     - Azure認証情報
     - Azure認証情報
     - Azure認証情報
     - Azure認証情報
     - ターゲット
     - ターゲット
   * - 設定項目
     - 項目1設定値
     - 項目2設定値
     - 項目3設定値
     - 項目4設定値
     - 項目5設定値
     - 項目6設定値
   * - 項目の名前
     - :kbd:`サブスクリプションID`
     - :kbd:`テナントID`
     - :kbd:`クライアントID`
     - :kbd:`クライアントシークレット`
     - :kbd:`リソースグループ名`
     - :kbd:`ロケーション`
   * - 項目の名前(Rest API用) 
     - :kbd:`subscription_id`
     - :kbd:`tenant_id`
     - :kbd:`client_id`
     - :kbd:`client_secret`
     - :kbd:`resource_group_name`
     - :kbd:`location`
   * - 入力方式
     - :kbd:`文字列(単一行)`
     - :kbd:`文字列(単一行)`
     - :kbd:`文字列(単一行)`
     - :kbd:`パスワード`
     - :kbd:`文字列(単一行)`
     - :kbd:`文字列(単一行)`
   * - 最大バイト数
     - :kbd:`128`
     - :kbd:`128`
     - :kbd:`128`
     - :kbd:`128`
     - :kbd:`128`
     - :kbd:`128`
   * - 正規表現
     - 
     - 
     - 
     - 
     - 
     - 
   * - 初期値
     - 
     - 
     - 
     - 
     - 
     - 
   * - 必須
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
   * - 一意制約
     - 
     - 
     - 
     - 
     - 
     - 
   * - 説明
     - 
     - 
     - 
     - 
     - 
     - 
   * - 備考
     - 
     - 
     - 
     - 
     - 
     - 

.. list-table:: パラメータシート作成(Azureパラメータ)のパラメータシート作成情報の設定値
   :widths: 5 10
   :header-rows: 1

   * - 設定項目
     - 設定値
   * - 項番
     - (自動入力)
   * - メニュー名
     - :kbd:`Azureパラメータ`
   * - メニュー名(REST)
     - :kbd:`azure_parameters`
   * - 作成対象
     - :kbd:`パラメータシート（オペレーションあり）`
   * - 表示順序
     - :kbd:`1`
   * - バンドル利用
     - 「利用する」にチェックを入れない(無効)
   * - 最終更新日時
     - (自動入力)
   * - 最終更新者
     - (自動入力)

パラメータシートの項目と Moduleファイル の変数の紐付け
-------------------------------------------------------

| :menuselection:`Terraform CLI --> 代入値自動登録設定` から、Azureパラメータの項目に入るパラメータに代入する設定を行います。

.. figure:: /images/learn/quickstart/Terraform_scenario1/代入値自動登録.png
   :width: 1200px
   :alt: 代入値自動登録設定

.. list-table:: 代入値自動登録設定の設定値
  :widths: 45 10 10 20 10
  :header-rows: 2

  * - パラメータシート(From)
    - 登録方式
    - Movement名
    - IaC変数(To)
    -
  * - メニューグループ:メニュー:項目
    -
    -
    - Movement名:変数名
    - HCL設定
  * - :kbd:`代入値自動登録用:Azureパラメータ/ターゲット/リソースグループ名`
    - :kbd:`Value型`
    - :kbd:`tfe_mov001`
    - :kbd:`tfe_mov001:resource_group_name`
    - :kbd:`False`

  * - :kbd:`代入値自動登録用:Azureパラメータ/ターゲット/ロケーション`
    - :kbd:`Value型`
    - :kbd:`tfe_mov001`
    - :kbd:`tfe_mov001:location`
    - :kbd:`False`

  * - :kbd:`代入値自動登録用:Azureパラメータ/認証情報/クライアントID`
    - :kbd:`Value型`
    - :kbd:`tfe_mov001`
    - :kbd:`tfe_mov001:client_id`
    - :kbd:`False`

  * - :kbd:`代入値自動登録用:Azureパラメータ/認証情報/クライアントシークレット`
    - :kbd:`Value型`
    - :kbd:`tfe_mov001`
    - :kbd:`tfe_mov001:client_secret`
    - :kbd:`False`

  * - :kbd:`代入値自動登録用:Azureパラメータ/認証情報/サブスクリプションID`
    - :kbd:`Value型`
    - :kbd:`tfe_mov001`
    - :kbd:`tfe_mov001:subscription_id`
    - :kbd:`False`

  * - :kbd:`代入値自動登録用:Azureパラメータ/認証情報/テナントID`
    - :kbd:`Value型`
    - :kbd:`tfe_mov001`
    - :kbd:`tfe_mov001:tenant_id`
    - :kbd:`False`

作業実施
===========================

| パラメータシートには、設定したい値を機器ごとにパラメータを登録します。
| 本シナリオでは、Azure認証情報として「サブスクリプションID」「テナントID」「クライアントID」「クライアントシークレット」、ターゲットとして「リソースグループ名」「ロケーション」の値を登録​します。

パラメータ設定
--------------

| :menuselection:`入力用 --> Azureパラメータ` から、ホストに対するパラメータを登録します。

.. figure:: /images/learn/quickstart/Terraform_scenario1/パラメータ登録①.png
   :width: 1200px
   :alt: パラメータ登録

.. list-table:: サーバー基本情報パラメータの設定値
  :widths: 10 15 10 10 15 15 10
  :header-rows: 3

  * - オペレーション
    - パラメータ
    - 
    - 
    - 
    - 
    - 
  * - 
    - Azure認証情報
    - Azure認証情報
    - Azure認証情報
    - Azure認証情報
    - ターゲット
    - ターゲット
  * - オペレーション名
    - サブスクリプションID
    - テナントID
    - クライアントID
    - クライアントシークレット
    - リソースグループ名
    - ロケーション
  * - TF-AzureVM構築
    - ※任意のサブスクリプションID
    - ※任意のテナントID
    - ※任意のクライアントID
    - ※任意のクライアントシークレット
    - ※任意のリソースグループ名
    - ※任意のロケーション

作業実行
--------------

1. 作業実行

   | :menuselection:`Terraform --> 作業実行` から、:kbd:`tfe_mov001` Movement を選択し、:guilabel:` 作業実行` を押下します。
   | 次に、:menuselection:`作業実行設定` で、オペレーションに :kbd:`TF-AzureVM構築` を選択し :guilabel:`選択決定` を押下します。

   | :menuselection:`作業状態確認` 画面が開き、実行が完了した後に、ステータスが「完了」になったことを確認します。

.. figure:: /images/learn/quickstart/Terraform_scenario1/作業実行.png
   :width: 1200px
   :alt: 作業実行

2. 実行後作業

   | :menuselection:`Terraform CLI--> Workspace` から、:kbd:`tfe_ws001` Workspace を選択し、:kbd:`リソース削除` を押下します。

まとめ
======

| 本シナリオでは、IaaSの払い出しのシナリオを通して、Exastro IT Automation の基本的な操作方法やコンセプトについて紹介をしました。
| より詳細な情報を知りたい場合は、:doc:`../../../manuals/index` を参照してください。