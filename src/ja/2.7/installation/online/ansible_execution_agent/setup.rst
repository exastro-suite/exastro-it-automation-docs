.. _ansible_execution_agent:

================================
Ansible Execution Agent - Online
================================

.. _ansible_execution_agent_purpose:

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

.. _ansible_execution_agent_precondition:

前提条件
========

| システム要件については :ref:`構成・構築ガイド <ansible_execution_agent_system_requirements>` を参照してください。
| 有償版のAnsible-builder、Ansible-runnerを利用する場合の、サブスクリプションの登録、リポジトリ有効化については :ref:`構成・構築ガイド <ansible_execution_agent_rhel_support_requirements>` を参照してください。

推奨事項
========

.. _ansible_execution_user_recommendation:

専用ユーザーの払い出し
----------------------

| Ansible Execution Agent の利用には、:doc:`サービスアカウントユーザー管理機能<../../../manuals/organization_management/service_account_users>` で作成したサービスアカウントユーザーを使用することを推奨します。

.. _ansible_execution_agent_parameter_list:

パラメータ一覧
==============

| インストーラで生成される、env内のパラメータについて

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
     - <インストールした環境のPATH>/poetry run python3
     - 不可
     - 2.5.1
     -
   * - PYTHONPATH
     - 実行する仮想環境のpythonの実行コマンド
     - <対話事項で入力したインストール先>/ita_ag_ansible_execution/
     - 可
     - 2.5.1
     -
   * - APP_PATH
     - インストール先のPATH
     - <対話事項で入力したインストール先>
     - 可
     - 2.5.1
     -
   * - STORAGEPATH
     - データの保存先のPATH
     - <対話事項で入力した保存先>/<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>/storage
     - 可
     - 2.5.1
     -
   * - LOGPATH
     - ログの保存先のPATH
     - <対話事項で入力した保存先>/<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>/log
     - 可
     - 2.5.1
     -
   * - EXASTRO_ORGANIZATION_ID
     - 接続先のORGANIZATION_ID
     - <対話事項で入力したORGANIZATION_ID>
     - 可
     - 2.5.1
     -
   * - EXASTRO_WORKSPACE_ID
     - 接続先のWORKSPACE_ID
     - <対話事項で入力したWORKSPACE_ID>
     - 可
     - 2.5.1
     -
   * - EXASTRO_URL
     - 接続先のITAのURL
     - <対話事項で入力したURL>
     - 可
     - 2.5.1
     -
   * - EXASTRO_REFRESH_TOKEN
     - 接続先のITAのEXASTRO_REFRESH_TOKEN
     - <対話事項で入力したEXASTRO_REFRESH_TOKEN>
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
     - ita-ag-ansible-execution-<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>
     - 不可
     - 2.5.1
     -
   * - USER_ID
     - エージェントの識別子です。
     - <サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>
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


.. _ansible_execution_user_recommendation_detail:

パラメータの詳細
----------------

EXECUTION_ENVIRONMENT_NAMES
^^^^^^^^^^^^^^^^^^^^^^^^^^^
| 実行環境名を指定することで、ITA上で定義されている実行環境のうち、特定の実行環境のみをエージェントで作業対象とすることができます。
| エージェントで作業対象とする実行環境を分けたい場合等に指定してください。
| 複数指定する際には、「,」区切りで指定してください。


.. code-block:: bash

       EXECUTION_ENVIRONMENT_NAMES=<実行環境名1>,<実行環境名2>

| 実行環境名については、 :ref:`ansible_execution_environment_list` を参照してください。


MOVEMENT_LIMIT
^^^^^^^^^^^^^^

| MOVEMENT_LIMIT は、1つのワークスペース内で複数の Ansible Execution Agent を構成している場合に、作業の分散を制御する設定です。

- MOVEMENT_LIMIT の値を小さく設定すると、作業が複数の Ansible Execution Agent に均等に分散されます。
- MOVEMENT_LIMIT の値を大きく設定すると、作業が特定の Ansible Execution Agent に集中しやすくなります。

.. code-block:: bash

       MOVEMENT_LIMIT=1

| 設定値の変更方法、影響について、 :ref:`ansible_execution_limits_impact` を参照してください。


EXECUTION_LIMIT
^^^^^^^^^^^^^^^

| EXECUTION_LIMIT は、Ansible Execution Agent が同時に実行できる作業の最大数を制御する設定です。
| EXECUTION_LIMIT の値を大きく設定すると、Ansible Execution Agent が同時に実行できる作業の数が増えます。


.. code-block:: bash

       EXECUTION_LIMIT=5


.. tip:: | この設定値を変更する際は、Ansible Execution Agent がインストールされているサーバーのスペックやリソース状況を考慮する必要があります。


| 設定値の変更方法、影響について、 :ref:`ansible_execution_limits_impact` を参照してください。


パラメータ変更による動作影響
----------------------------

.. _ansible_execution_parameter_change:

パラメータの変更・反映方法方法について
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| env内のパラメータを変更する場合は、envファイルを直接編集し、サービスを再起動してください。
| サービスの再起動手順については、 :ref:`ansible_execution_agent_service_cmd` を参照してください。


.. _ansible_execution_limits_impact:

MOVEMENT_LIMIT・EXECUTION_LIMITの影響
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| エージェントの同時実行数や一度に取得する作業件数を変更するには、以下のパラメータを変更後、設定を反映してください。

- MOVEMENT_LIMIT: エージェントが一度に取得する未実行の作業の最大数の変更
- EXECUTION_LIMIT: エージェントが同時に処理できる作業の最大数の変更



| MOVEMENT_LIMITとEXECUTION_LIMITの設定値により、未実行作業の取得方法が異なります。
| 実行中の作業がある場合、EXECUTION_LIMITの設定値と、実行中の作業件数の差分を使用して未実行作業を取得します。

.. tip:: | 例えば、MOVEMENT_LIMIT=5、EXECUTION_LIMIT=10と設定した場合、以下のように動作します。

  .. code-block:: bash

       MOVEMENT_LIMIT=5
       EXECUTION_LIMIT=10

  | EXECUTION_LIMIT=10と設定すると、最大10件の作業が並列で実行されます。
  | MOVEMENT_LIMIT=5と設定すると、一度に最大5件の未実行作業を取得します。実行中の作業がある場合、取得する未実行作業の件数は、EXECUTION_LIMITの設定値と実行中の作業件数の差分となります。

  | 以下のように動作します。

  - 作業実施件数が0件の場合: 5件の未実行作業取得します。
  - 作業実施件数が5件の場合: 5件の未実行作業取得します。
  - 作業実施件数が8件の場合: 2件の未実行作業取得します。
  - 作業実施件数が10件の場合: 作業件数が10件以下になるまで、未実行作業取得はスキップします。


.. _ansible_execution_agent_install:

インストール
============

準備
----

| 以下より、最新のsetup.shを取得し、実行権限を付与してください。

.. code-block:: bash

    $ wget https://raw.githubusercontent.com/exastro-suite/exastro-it-automation/refs/heads/main/ita_root/ita_ag_ansible_execution/setup.sh

    $ chmod 755 ./setup.sh


対話での問い合わせ事項
----------------------

- エージェントのバージョン情報
- サービス名
- ソースコードのインストール先
- データの保存先
- 使用するAnsible-builder、Ansible-runnerについて
- 接続先のITAの接続情報（URL、ORGANIZATION_ID、WORKSPACE_ID、REFRESH_TOKEN）


Ansible Execution Agentのインストール
-------------------------------------

| setup.shを実行し、後述する対話事項に沿って進めてください。

.. code-block:: bash

    $ ./setup.sh install


1. | エージェントのインストールモードを聞かれるので、指定してください。
   | 1: 必要なモジュールのインストール、サービスのソースコードのインストール、サービスの登録・起動を行います。
   | 2: 追加でサービスの登録・起動を行います。
   | 3: envファイルを指定して、サービスの登録・起動を行います。
   | ※ 2.3については、1が実行されている前提になります。

.. code-block:: text

    Please select which process to execute.
        1: Create ENV, Install, Register service
        2: Create ENV, Register service
        3: Register service
        q: Quit installer
    select value: (1, 2, 3, q) :

.. tip:: | 以下、「default: xxxxxx」がある項目については、Enterを押下すると、defaultの値が適用されます。

2.  以下、Enterを押下すると、必要な設定値を対話形式で、入力が開始されます。

.. tabs::

   .. tab:: 1.インストールから、エージェントサービス起動

      | ① 以下、Enterを押下すると、必要な設定値を対話形式での入力が開始されます。

      .. code-block:: bash

         'No value + Enter' is input while default value exists, the default value will be used.
         ->  Enter

      | ② インストールするエージェントのバージョンを指定できます。デフォルトでは、最新のソースコードが使用されます。

      .. code-block:: bash

         Input the version of the Agent. Tag specification: X.Y.Z, Branch specification: X.Y [default: No Input+Enter(Latest release version)]:
         Input Value [default: main ]:

      | ③ インストールするエージェントサービスの名称を設定する場合は、nを押して以降の対話で、指定してください。

      .. code-block:: bash

         The Agent service name is in the following format: ita-ag-ansible-execution-20241112115209622. Select n to specify individual names. (y/n):
         Input Value [default: y ]:

      | ④ ③で「n」を入力した場合のみこちら表示されます。

      .. code-block:: bash

         Input the Agent service name . The string ita-ag-ansible-execution- is added to the start of the name.:
         Input Value :

      | ⑤ ソースコードのインストール先を指定する場合は入力してください。

      .. code-block:: bash

         Specify full path for the install location.:
         Input Value [default: /home/<ログインユーザー>/exastro ]:

      | ⑥ データの保存先を指定する場合は入力してください。

      .. code-block:: bash

         Specify full path for the data storage location.:
         Input Value [default: /home/<ログインユーザー>/exastro ]:

      | ⑦ 使用するAnsible-builder、Ansible-runnerを指定してください。
      |   有償版を利用する場合は、リポジトリ有効化したうえで、2を指定してください。

      .. code-block:: bash

         Select which Ansible-builder and/or Ansible-runner to use(1, 2) [1=Ansible 2=Red Hat Ansible Automation Platform] :
         Input Value [default: 1 ]:

      | ⑧ 接続先のITAのURLを指定してください。　e.g. http://exastro.example.com:30080

      .. code-block:: bash

         Input the ITA connection URL.:
         Input Value :

      | ⑨ 接続先のITAのORGANIZATIONを指定してください。

      .. code-block:: bash

         Input ORGANIZATION_ID.:
         Input Value :

      | ⑩ 接続先のITAのWORKSPACEを指定してください。

      .. code-block:: bash

         Input WORKSPACE_ID.:
         Input Value :

      | ⑪ 接続先のITAのリフレッシュトークンを指定してください。（:ref:`サービスアカウントユーザー<ansible_execution_user_recommendation>` のトークンを利用することを推奨します。）
      |
      |   後で設定する場合は、Enter押して次に進んでください。
      |   .envのEXASTRO_REFRESH_TOKENを書き換えてください。

      .. code-block:: bash

         Input a REFRESH_TOKEN for a user that can log in to ITA. If the token cannot be input here, change the EXASTRO_REFRESH_TOKEN in the generated .env file.:
         Input Value [default:  ]:

      | ⑫ サービスの起動を行う場合は、を選択してください。起動しない場合は、後ほど手動で起動してください。

      .. code-block:: bash

         Do you want to start the Agent service? (y/n)y

      | ⑬ インストールしたサービスの情報が表示されます。

      .. code-block:: bash

         Install Ansible Execution Agent Infomation:
             Agent Service id:   <サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>
             Agent Service Name: ita-ag-ansible-execution-<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>
             Storage Path:       /home/<ログインユーザー>/exastro/<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>/storage
             Env Path:           /home/<ログインユーザー>/exastro/<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>/.env

   .. tab:: 2.エージェントサービスの追加、起動

      | ① 以下、Enterを押下すると、必要な設定値を対話形式での入力が開始されます。

      .. code-block:: bash

         'No value + Enter' is input while default value exists, the default value will be used.
         ->  Enter

      | ② インストールするエージェントサービスの名称を設定する場合は、nを押して以降の対話で、指定してください。

      .. code-block:: bash

         The Agent service name is in the following format: ita-ag-ansible-execution-20241112115209622. Select n to specify individual names. (y/n):
         Input Value [default: y ]:

      | ③ ②で「n」を入力した場合のみこちら表示されます。

      .. code-block:: bash

         Input the Agent service name . The string ita-ag-ansible-execution- is added to the start of the name.:
         Input Value :

      | ④ ソースコードのインストール先を指定する場合は入力してください。

      .. code-block:: bash

         Specify full path for the install location.:
         Input Value [default: /home/<ログインユーザー>/exastro ]:

      | ⑤ データの保存先を指定する場合は入力してください。

      .. code-block:: bash

         Specify full path for the data storage location.:
         Input Value [default: /home/<ログインユーザー>/exastro ]:


      | ⑥ 接続先のITAのURLを指定してください。　e.g. http://exastro.example.com:30080

      .. code-block:: bash

         Input the ITA connection URL.:
         Input Value :

      | ⑦ 接続先のITAのORGANIZATIONを指定してください。

      .. code-block:: bash

         Input ORGANIZATION_ID.:
         Input Value :

      | ⑧ 接続先のITAのWORKSPACEを指定してください。

      .. code-block:: bash

         Input WORKSPACE_ID.:
         Input Value :

      | ⑨ 接続先のITAのリフレッシュトークンを指定してください。（:ref:`サービスアカウントユーザー<ansible_execution_user_recommendation>` のトークンを利用することを推奨します。）
      |
      |   後で設定する場合は、Enter押して次に進んでください。
      |   .envのEXASTRO_REFRESH_TOKENを書き換えてください。

      .. code-block:: bash

         Input a REFRESH_TOKEN for a user that can log in to ITA. If the token cannot be input here, change the EXASTRO_REFRESH_TOKEN in the generated .env file.:
         Input Value [default:  ]:

      | ⑩ サービスの起動を行う場合は、を選択してください。起動しない場合は、後ほど手動で起動してください。

      .. code-block:: bash

         Do you want to start the Agent service? (y/n)y

      | ⑪ インストールしたサービスの情報が表示されます。

      .. code-block:: bash

         Install Ansible Execution Agent Infomation:
             Agent Service id:   <サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>
             Agent Service Name: ita-ag-ansible-execution-<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>
             Storage Path:       /home/<ログインユーザー>/exastro/<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>/storage
             Env Path:           /home/<ログインユーザー>/exastro/<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>/.env


   .. tab:: 3.サービス起動


      | ① 以下、Enterを押下すると、必要な設定値を対話形式での入力が開始されます。

      .. code-block:: bash

         'No value + Enter' is input while default value exists, the default value will be used.
         ->  Enter

      | ② 使用する.envのパスを指定してください。envの情報をもとに、サービスの登録・起動を行います。

      .. code-block:: bash

         Input the full path for the .env file.:
         Input Value :

      | ③ サービスの起動を行う場合は、を選択してください。起動しない場合は、後ほど手動で起動してください。

      .. code-block:: bash

        Do you want to start the Agent service? (y/n)y

      | ④ インストールしたサービスの情報が表示されます。

      .. code-block:: bash

         Install Ansible Execution Agent Infomation:
             Agent Service id:   <サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>
             Agent Service Name: ita-ag-ansible-execution-<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>
             Storage Path:       /home/<ログインユーザー>/exastro/<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>/storage
             Env Path:           /home/<ログインユーザー>/exastro/<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>/.env


.. _ansible_execution_agent_uninstall:

アンインストール
================

| setup.shを実行し、後述する対話事項に沿って進めてください。

.. code-block:: bash

    $ ./setup.sh uninstall

.. tip:: | 以下、アンインストールでは、サービスの削除、データの削除は実施可能ですが、アプリケーションのソースコードは、削除されません。
         | 削除する場合は、手動での対応が必要となります。

1. | エージェントのアンインストールモードを聞かれるので、指定してください。
   | 1: サービスの削除、データの削除を行います。
   | 2: サービスの削除、を行います。データは削除されません。
   | 3: データの削除
   | ※ 3については、2が実行されている前提になります。

.. code-block:: text

    Please select which process to execute.
        1: Delete service, Delete Data
        2: Delete service
        3: Delete Data
        q: Quit uninstaller
    select value: (1, 2, 3, q):


1.  以下、Enterを押下すると、必要な設定値を対話形式で、入力が開始されます。

.. tabs::

   .. tab:: 1.エージェントサービス削除、データ削除

      | ①アンインストールするエージェントのサービス名（ita-ag-ansible-execution-<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>）を指定してください。

      .. code-block:: bash

        Input a SERVICE_NAME.(e.g. ita-ag-ansible-execution-xxxxxxxxxxxxx):

      | ②①で指定した、サービス名のデータの保存先を指定してください。

      .. code-block:: bash

        Input a STORAGE_PATH.(e.g. /home/cloud-user/exastro/<SERVICE_ID>):

   .. tab:: 2.エージェントサービス削除

      | ①アンインストールするエージェントのサービス名（ita-ag-ansible-execution-<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>）を指定してください。

      .. code-block:: bash

        Input a SERVICE_NAME.(e.g. ita-ag-ansible-execution-xxxxxxxxxxxxx):

   .. tab:: 3.データ削除

      | ① サービスのデータの保存先を指定してください。

      .. code-block:: bash

        Input a STORAGE_PATH.(e.g. /home/cloud-user/exastro/<SERVICE_ID>):


アップグレード
==============
アップグレードの準備
--------------------

ソフトウェア要件の確認
^^^^^^^^^^^^^^^^^^^^^^
| アップグレード対象バージョンのソフトウェア要件を満たしているか確認します。
| 詳細は :ref:`ansible_execution_agent_software_requirements` をご参照ください。

対象サービス情報の取得
^^^^^^^^^^^^^^^^^^^^^^
| アップグレード対象のサービス情報を事前に取得します。

.. list-table:: 必要サービス情報
   :header-rows: 1
   :align: left

   * - 項目
     - .envの変数名
     - 値の例
     - 備考
   * - サービス名
     - AGENT_NAME
     - ita-ag-ansible-execution-20250723015915991
     -
   * - サービス識別子
     - AGENT_NAME
     - 20250723015915991
     - サービス名の「ita-ag-ansible-execution-」より後ろの部分
   * - インストールディレクトリ
     - PYTHONPATH
     - /home/almalinux/exastro
     - パスの「/ita_ag_ansible_execution」より前の部分
   * - ストレージディレクトリ
     - STORAGEPATH
     - /home/almalinux/exastro
     - パスの「/<サービス識別子>/storage」より前の部分

| ※20250723015915991の部分には、インストール時に設定した一意のサービス識別子が入ります


データバックアップ
^^^^^^^^^^^^^^^^^^
| 必要に応じて下記データのバックアップを取得することを推奨します。

.. list-table:: バックアップ推奨データ
   :header-rows: 1
   :align: left

   * - 項目
     - パス
     - 備考
   * - エージェントのアプリログ
     - /<インストールディレクトリ>/<サービス識別子>/log/ita-ag-ansible-execution-<サービス識別子>.log
     -
   * - 過去の作業実行データ
     - /<ストレージディレクトリ>/<サービス識別子>/storage
     - ※Ansible共通 - インターフェース情報で実行時データ削除をFalseにしている場合
   * - .envファイル
     - /<インストールディレクトリ>/<サービス識別子>/.env
     -

注意事項
^^^^^^^^

| 下記条件の両方に当てはまる場合、アップグレードによる影響が発生します。

- 1つのサーバーで複数のエージェントのサービスを運用している
- 上記サービスのインストールディレクトリが同一である

| 具体例：

- 同一ワークスペースに対して複数サービスを運用しているケース
- 同一オーガナイゼーションの複数ワークスペースそれぞれに対してエージェントを運用しているケース


アンインストール実行
--------------------

| アップグレード対象サービスのアンインストールを行います。
| アンインストールのモードは2を指定します。
| アンインストール対象サービスは、準備で控えたサービス名を指定します。
|  手順は :ref:`ansible_execution_agent_uninstall` をご参照ください。


アップグレード（再インストール）
---------------------------------

1. 任意のディレクトリに最新のsetup.shを取得し、実行権限を付与します。

.. code-block:: bash

    $ wget https://raw.githubusercontent.com/exastro-suite/exastro-it-automation/refs/heads/main/ita_root/ita_ag_ansible_execution/setup.sh

.. code-block:: bash

    $ chmod 755 ./setup.sh

2. setup.shを実行し、後述する対話事項に沿って進めてください。

.. code-block:: bash

    $ ./setup.sh install

3. エージェントのインストールモードは1を選択します。

.. code-block:: bash

    Please select which process to execute.
        1: Create ENV, Install, Register service
        2: Create ENV, Register service
        3: Register service
        q: Quit installer
    select value: (1, 2, 3, q)  : 1

4. 以下、Enterを押下すると、必要な設定値を対話形式での入力が開始されます。

.. code-block:: bash

   'No value + Enter' is input while default value exists, the default value will be used.
   ->  Enter

5. インストールするエージェントのバージョンを指定します。最新バージョンへアップグレードする場合は、未入力でEnterを押下します。

.. code-block:: bash

   Input the version of the Agent. Tag specification: X.Y.Z, Branch specification: X.Y [default: No Input+Enter(Latest release version)]:
   Input Value [default: main ]: 2.6.0


6. エージェントサービス名称の設定では、nを入力します。

.. code-block:: bash

   The Agent service name is in the following format: ita-ag-ansible-execution-20241112115209622. Select n to specify individual names. (y/n):
   Input Value [default: y ]:

7. 準備で控えたサービス識別子を入力します。

.. code-block:: bash

   Input the Agent service name . The string ita-ag-ansible-execution- is added to the start of the name.:
   Input Value : <サービス識別子>

8. 準備で控えたインストールディレクトリを指定します。

.. code-block:: bash

   Specify full path for the install location.:
   Input Value [default: /home/<ログインユーザー>/exastro ]: <インストールディレクトリ>

9. 準備で控えたストレージディレクトリを指定します。

.. code-block:: bash

   Specify full path for the data storage location.:
   Input Value [default: /home/<ログインユーザー>/exastro ]: <ストレージディレクトリ>

10. 以降、初回インストール時と同じ情報を入力します。

.. code-block:: bash

   Select which Ansible-builder and/or Ansible-runner to use(1, 2) [1=Ansible 2=Red Hat Ansible Automation Platform] :
   Input Value [default: 1 ]: 1

   Input the ITA connection URL.:
   Input Value : http://xx.xx.xx.xx

   Input ORGANIZATION_ID.:
   Input Value : your_org_id

   Input WORKSPACE_ID.:
   Input Value : your_ws_id

   Input a REFRESH_TOKEN for a user that can log in to ITA. If the token cannot be input here, change the EXASTRO_REFRESH_TOKEN in the generated .env file.:
   Input Value [default:  ]: your_token (invisible)

.. tip::
   | 残りの有効期限に応じてリフレッシュトークンを更新することを推奨します。

11. yを入力し、既存ソースを削除・再インストールします。

.. code-block:: bash

   A source already exists in the installation destination. Do you want to delete it and re-install?  (y:Re-install/n:Move to the next process without installing) (y/n)
   ※If a registered service already exists with a different version, the existing service might be affected.(y/n): y

.. _ansible_execution_agent_service_cmd:

サービスの手動での操作、確認方法
================================

| 以下のコマンドにて、サービスの状態を確認できます。

.. tabs::

   .. tab:: AlmaLinux

     .. code-block:: bash

        # 設定ファイルの変更を反映
        $ sudo systemctl daemon-reload
        # サービスの状況確認
        $ sudo systemctl status  ita-ag-ansible-execution-<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>
        # サービスの開始
        $ sudo systemctl start ita-ag-ansible-execution-<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>
        # サービスの停止
        $ sudo systemctl stop  ita-ag-ansible-execution-<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>
        # サービスの再起動
        $ sudo systemctl restart  ita-ag-ansible-execution-<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>

   .. tab:: RHEL9

     .. code-block:: bash

        # 設定ファイルの変更を反映
        $ systemctl --user daemon-reload
        # サービスの状況確認
        $ systemctl --user status  ita-ag-ansible-execution-<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>
        # サービスの開始
        $ systemctl --user start ita-ag-ansible-execution-<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>
        # サービスの停止
        $ systemctl --user stop  ita-ag-ansible-execution-<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>
        # サービスの再起動
        $ systemctl --user restart  ita-ag-ansible-execution-<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>


.. _ansible_execution_agent_service_log:

サービスのログ確認方法
======================

- | アプリケーションログ

  | 以下のフォルダ・ファイル名に格納されます。

.. code-block::
   :caption: フォルダ

   /home/<ログインユーザー>/exastro/<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>/log/

.. code-block::
   :caption: ファイル名

   ita-ag-ansible-execution-<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>.log
   ita-ag-ansible-execution-<サービスの一意な識別子:yyyyMMddHHmmssfff or 対話で指定した文字列>.log.xx

.. tip::
  | ログローテーションされたファイルは、末尾に数値が付与されます。ログのローテートのサイズ、保存期間は、を参照してください。

- | システムログ、各コンポーネントのログ

.. code-block::
   :caption: フォルダ

   /var/log/message

.. tip::
  | podman、Ansible-builder、Ansible-runner他の関連コンポーネントについては、各コンポーネントのログ出力先について参照してください。
