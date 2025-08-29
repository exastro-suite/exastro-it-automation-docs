=====================
Terraform driver 共通
=====================

はじめに
========

| 本書では、「:doc:`./terraform_cloud_ep`」「:doc:`./terraform_cli`」（以下、Terraform driver）における共通の機能について説明します。

概要
====

| 本章ではTerraformおよびTerraform driverについて説明します。

Terraformについて
-----------------

| Terraform とは HashiCorp社 が提供するインフラストラクチャを効率化するオーケストレーションツールです。
| HCL(HashiCorp ConfigurationLanguage)という言語でコード化したインフラストラクチャ構成について、実行計画を生成したうえで構築を実行します。
| また、Terraform CloudおよびTerraform EnterpriseではPolicy as Codeによるアクセスポリシーをコード化して管理することが可能です。
| Terraformの詳細情報については、Terraformの製品マニュアルを参照してください。

Terrform driverについて
--------------------------------
| Terraform driverはITAの機能として、Teraformへの実行および実行ログの取得を行うことができます。
| 作業の実行（Plan /Apply）に利用するModuleファイルや、PolicyCheckを行うためのPolicyファイルをITA上で部品化し、再利用できるよう管理することができます。
| また、Terraform driverは、Module中の変数を画面から設定することができます。
| 詳細は「:ref:`terraform_common_variable_handling`」を参照してください。

.. figure:: /images/ja/diagram/overview.png
   :width: 800px
   :alt: ITAシステム概要

   ITAシステム概要

| Terraform driverには以下の2種類があります。

-  | **Terraform Cloud/EP driver**
   | ITAで登録した Terraform Cloud もしくは Terraform Enterprise に対し、Organizationの作成、Workspaceの作成、作業の実行（Plan/ PolicyCheck / Apply）および作業ログの取得を行うことができます。
   | 操作方法等については「:doc:`./terraform_cloud_ep`」を参照してください。

-  | **Terraform CLI driver**
   | ITAと同一の環境内にインストールしたTerraformに対し、作業の実行（Plan/ Apply）および作業ログの取得を行うことができます。
   | 操作方法等については「:doc:`./terraform_cli`」を参照してください。

.. _terraform_common_variable_handling:

変数の取り扱い
==============

変数の種類
----------

| Terraform driverでは、Module中の変数の具体値をITAの設定画面から設定することができます。

| ※設定方法の詳細は、「:doc:`./terraform_cloud_ep` -> :ref:`terraform_cloud_ep_substitution_value_auto_registration_setting`」「:doc:`./terraform_cli` -> :ref:`terraform_cli_substitution_value_auto_registration_setting`」を参照してください。
| Moduleファイルの中のVariableブロックに定義した対象を変数として扱えます。

+----------+----------------------------------------------------------+
| 種類     | 内容                                                     |
+==========+==========================================================+
| 通常変数 | 変数名に対して具体値を定義できる変数です。               |
|          |                                                          |
|          | Module内の変数は HCL（HashiCorp Configuration Language）\|
|          | のVariableブロックのルールに従い以下の形式で記述して\    |
|          | ください。                                               |
|          |                                                          |
|          | この場合「xxx」がModuleから変数として抜出されます。      |
|          |                                                          |
|          | また、typeとdefault値を設定することができます。          |
|          |                                                          |
|          | この場合、                                               |
|          | 「○○」がtypeとして、「△△」がdefaultとして抜出されます。  |
|          |                                                          |
|          | typeとdefaultの設定は必須ではありません。                |
|          |                                                          |
|          | +------------------+                                     |
|          | | variable "xxx" { |                                     |
|          | |                  |                                     |
|          | | 　type = ○○      |                                     |
|          | |                  |                                     |
|          | | 　default = △△   |                                     |
|          | |                  |                                     |
|          | | 　～省略～       |                                     |
|          | |                  |                                     |
|          | | }                |                                     |
|          | +------------------+                                     |
+----------+----------------------------------------------------------+

変数の抜出および具体値登録
--------------------------

| ITAにアップロードされたModule素材から変数を抜出して具体値を登録できます。
| 抜出した変数の具体値は「:doc:`./terraform_cloud_ep` -> :ref:`terraform_cloud_ep_substitution_value_auto_registration_setting`」「:doc:`./terraform_cli` -> :ref:`terraform_cli_substitution_value_auto_registration_setting`」にて、パラメータシートと連携させることで具体値を登録します。

| Terraform Cloud/EP driverでは、登録された変数と具体値は作業実行時に連携先TerraformのWorkspaceで管理するVariablesに対し、「変数名」が「Key」、「具体値」が「Value」として登録されます。
| Terraform CLI driverでは、登録された変数と具体値は、作業実行時に生成されるterraform.tfvarsファイルに「変数名」が「Key」、「具体値」が「Value」として記載され、作業実行で使用されます。

.. _terraform_common_variable_type:

変数のタイプについて
--------------------

| 変数内でtypeを設定することができます。
| Module内の変数は HCL（HashiCorp ConfigurationLanguage）の変数ルールに従い記述してください。

| ITA内で扱う変数は以下の通りです。

.. list-table:: 変数タイプ
   :widths: 1 3 1 1 2 2
   :header-rows: 1
   :align: left

   * - type
     - 詳細
     - | メンバー変数対象
       | ※1
     - | 代入順序対象
       | ※2
     - typeの記述例
     - defaultの記述例
   * - string
     - 文字列型。
     - ×
     - ×
     - string
     - あいう
   * - number
     - 数字型。
     - ×
     - ×
     - number
     - 123
   * - bool
     - Boolean型（trueまたはfalse）。
     - ×
     - ×
     - bool
     - true
   * - list
     - 配列型。
     - ×
     - 〇
     - list(string)
     - ["あ", "い", "う"]
   * - set
     - | 配列型。ユニークな値の設定が求められる。
       | ITA上では具体値がユニークか否かは判定されません。
     - ×
     - 〇
     - set(number)
     - [1, 2, 3]
   * - tuple
     - | 配列型。予めn番目にどのtypeを設定するか決めておく必要があります。
       | 値の入力数が決められているため、ITシステムA上ではメンバー変数としてプルダウンで選択します。
     - 〇
     - ×
     - tuple([string, number])
     - ["あいう", 2023]
   * - map
     - | key-value（連想配列）型。ITA上ではmap型が一つ以上含まれているtypeを設定した場合、type情報からkey値を特定できないため、代入値自動登録設定をする場合はHCL設定をONする必要があります。
       | HCL設定については「:ref:`terraform_cloud_ep_substitution_value_auto_registration_setting`」を参照してください。
     - ×
     - ×
     - map(string)
     - {"test_key" = "test_value"}
   * - object
     - | key-value（連想配列）型。ITA上ではkey名をメンバー変数として扱います。key名に日本語は含まないでください。
     - 〇
     - ×
     - object({test_key = string})
     - {"test_key" = "test_value"}
   * - any
     - すべてに適合する型ですが、ITA上ではstring型と同じ扱いになります。
     - ×
     - ×
     - any
     - あいう
   * - 記載なし
     - typeを記載しなかった場合、ITA上では string型と同じ扱いになります。
     - ×
     - ×
     -
     - あいう

.. _terraform_common_member_vars_description:

-  | **※1 …メンバー変数対象**
   | 変数がkey-value型である場合のkey名です。
   | 変数のタイプがobjectの場合、<KEY> = <TYPE> の <KEY> をメンバー変数とします。
   | 変数のタイプがtupleの場合、tuple内に定義した変数を先頭から[0],[1],[2]…と採番してメンバー変数となります。

   | 変数のタイプが変数ネスト管理メニューの登録対象の場合、最大繰返数をもとに[0],[1],[2]…と採番してメンバー変数となります。
   | 変数ネストに関しては「:doc:`./terraform_cloud_ep` -> :ref:`terraform_cloud_ep_nested_variable`」「:doc:`./terraform_cli` -> :ref:`terraform_cli_nested_variable`」を参照してください。

      - | **例: 変数タイプがobjectの場合**

      #. | tfファイルと登録値

         .. code-block:: hcl

           variable "VAR_hoge" {
               type = object({
                 NAME = string,
                 IP = string
               })
               default = {
                 "NAME" = "machine_01",
                 "IP" = "127.0.0.1"
              }
           }

      #. | 代入値例(代入値自動登録設定)

         .. list-table::
            :widths: 5 10 10 5 10
            :header-rows: 1
            :align: left

            * - 項番
              - 変数名
              - メンバー変数
              - 代入順序
              - パラメータシートの入力値
            * -  1
              -  VAR_hoge
              -  NAME
              -  入力不可
              -  my_machine
            * - 2
              - VAR_hoge
              - IP
              - 入力不可
              - 192.168.100.1

      #. | Terraformに送信される値

         .. code-block:: bash

            {
                NAME = "my_machine"
                IP = "192.168.100.1"
            }

   |

      -  | **例: 変数のタイプがtupleの場合**

      #. | tfファイルと登録値

         .. code-block:: hcl

           variable "VAR_hoge" {
               type = tuple([string,number])
               default = ["abc",2023]
           }

      #. | 代入値例(代入値自動登録設定)

         .. list-table::
            :widths: 5 10 10 5 10
            :header-rows: 1
            :align: left

            * - 項番
              - 変数名
              - メンバー変数
              - 代入順序
              - パラメータシートの入力値
            * -  1
              -  VAR_hoge
              -  [0]
              -  入力不可
              -  def
            * -  2
              -  VAR_hoge
              -  [1]
              -  入力不可
              -  2024

      #. | Terraformに送信される値

         .. code-block:: bash

            ["def", 2024]

   |

      -  | **例: 変数のタイプがネスト管理対象の場合**

      #. | tfファイルと登録値

         .. code-block:: hcl

           variable "VAR_hoge" {
               type = list(set(string))
               default = [
                 ["aaa","bbb"]
                 ["ccc","ddd"]
               ]
           }

      #. | 代入値例(代入値自動登録設定)

         .. list-table::
            :widths: 5 10 10 5 10
            :header-rows: 1
            :align: left

            * - 項番
              - 変数名
              - メンバー変数
              - 代入順序
              - パラメータシートの入力値
            * -  1
              -  VAR_hoge
              -  [0]
              -  1
              -  あああ
            * -  2
              -  VAR_hoge
              -  [0]
              -  2
              -  いいい
            * - 3
              - VAR_hoge
              - [1]
              - 1
              - ううう
            * - 4
              - VAR_hoge
              - [1]
              - 2
              - えええ

      #. | Terraformに送信される値

         .. code-block:: bash

            [
               ["あああ", "いいい"],
               ["ううう", "えええ"]
            ]

.. _terraform_common_substitution_order_description:

-  | **※2 …代入順序対象**
   | 変数に複数具体値を設定する際の先頭から代入する順序です。
   | 変数または階層構造の変数の最下層の変数のタイプがlist,setの場合、「:doc:`./terraform_cloud_ep` -> :ref:`terraform_cloud_ep_substitution_value_auto_registration_setting`」「:doc:`./terraform_cli` -> :ref:`terraform_cli_substitution_value_auto_registration_setting`」にて設定可能です。

      -  | **例: 変数タイプがlistの場合**

      #. | tfファイルと登録値

         .. code-block:: hcl

            variable "VAR_hoge" {
               type = list(string)
            }

      #. | 代入値例(代入値自動登録設定)

         .. list-table::
            :widths: 5 10 10 5 10
            :header-rows: 1
            :align: left

            * - 項番
              - 変数名
              - メンバー変数
              - 代入順序
              - パラメータシートの入力値
            * -  1
              -  VAR_hoge
              -  入力不要
              -  1
              -  あいう
            * - 2
              - VAR_hoge
              - 入力不要
              - 2
              - かきく

      #. | Terraformに送信される値

         .. code-block:: bash

            ["あいう","かきく"]

   |

      -  | **例: 階層構造の変数の最下層の変数タイプがsetの場合**

      #. | tfファイルと登録値

         .. code-block:: hcl

            variable "VAR_hoge" {
               type = object({
                  key = set(number)
               })
            }

      #. | 代入値例(代入値自動登録設定)

         .. list-table::
            :widths: 5 10 10 5 10
            :header-rows: 1
            :align: left

            * - 項番
              - 変数名
              - メンバー変数
              - 代入順序
              - パラメータシートの入力値
            * -  1
              -  VAR_hoge
              -  key
              -  1
              -  1
            * - 2
              - VAR_hoge
              - key
              - 2
              - 2

      #. | Terraformに送信される値

         .. code-block:: bash

            {
                key = [1,2]
            }


構築コード記述方法
==================

| Terraform driverでModuleおよびPolicyの記述について説明します。
| Policyについては Terraform Cloud/EP driver のみ有効な機能です。

.. _terraform_common_module_description:

Moduleの記述
------------

| Moduleファイルは、HCL（HashiCorp ConfigurationLanguage）というHashiCorp社独自の言語により記述します。
| HCLの詳細については、Terraformの製品マニュアルを参照してください。

.. _terraform_common_policy_description:

Policyの記述
------------

| Policyファイルは、Sentinel languageいうHashiCorp社独自の言語により記述します。
| Sentinel languageの詳細については、Terraformの製品マニュアルを参照してください。


付録
====

.. _terraform_cloud_ep_module_example:

Module素材「Variableブロック」記入例・登録例
--------------------------------------------

Module素材の「Variableブロック」の記入例と、代入値自動登録設定への登録例を、変数のタイプ毎に記載します。

#. | **シンプルなパターン**

   #. | string型

      .. figure:: /images/ja/terraform_common/variable_string.png
         :alt: string型
         :align: left
         :width: 600px

   #. | number型

      .. figure:: /images/ja/terraform_common/variable_number.png
         :alt: number型
         :align: left
         :width: 600px

   #. | bool型

      .. figure:: /images/ja/terraform_common/variable_bool.png
         :alt: bool型
         :align: left
         :width: 600px

   #. | list型

      .. figure:: /images/ja/terraform_common/variable_list.png
         :alt: list型
         :align: left
         :width: 600px

   #. | set型

      .. figure:: /images/ja/terraform_common/variable_set.png
         :alt: set型
         :align: left
         :width: 600px


   #. | tuple型

      .. figure:: /images/ja/terraform_common/variable_tuple.png
         :alt: tuple型
         :align: left
         :width: 600px

   #. | map型

      .. figure:: /images/ja/terraform_common/variable_map.png
         :alt: map型
         :align: left
         :width: 600px


   #. | object型

      .. figure:: /images/ja/terraform_common/variable_object.png
         :alt: object型
         :align: left
         :width: 600px

   #. | any型

      .. figure:: /images/ja/terraform_common/variable_any.png
         :alt: map型
         :align: left
         :width: 600px


   #. | typeの記載がない

      .. figure:: /images/ja/terraform_common/variable_no_type.png
         :alt: typeの記載がない
         :align: left
         :width: 600px

#. | **複雑なパターン**

   #. | list型の中にlist型

      .. figure:: /images/ja/terraform_common/variable_list_list.png
         :alt: list型の中にlist型
         :align: left
         :width: 600px

   #. | list型の中にobject型

      .. figure:: /images/ja/terraform_common/variable_list_object.png
         :alt: list型の中にobject型
         :align: left
         :width: 600px


   #. | object型の中のlist型の中にobject型

      .. figure:: /images/ja/terraform_common/variable_object_list_object.png
         :alt: object型の中のlist型の中にobject型
         :align: left
         :width: 600px

#. | **特殊なパターン**

   #. | list型の中にmap型

      .. figure:: /images/ja/terraform_common/variable_list_map.png
         :alt: list型の中にmap型
         :align: left
         :width: 600px

.. _terraform_nested_example:

変数ネスト管理フロー例
----------------------

変数ネスト管理の操作例を記載します。

#. | **最大繰返数を増加させる**

   .. figure:: /images/ja/terraform_common/nested_gain.png
        :alt: 最大繰返数を増加させる
        :align: left
        :width: 600px

#. | **最大繰返数を減少させる**

   .. figure:: /images/ja/terraform_common/nested_decrease.png
        :alt: 最大繰返数を減少させる
        :align: left
        :width: 600px

