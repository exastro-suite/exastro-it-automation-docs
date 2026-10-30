.. _ai_service_settings:

==============
AIサービス設定
==============

はじめに
========

| 本書では、AIアシスタント機能を利用する際に必要なAIサービスの設定について説明します。
| AIサービスの設定はユーザー毎に実施する必要があります。
| AIサービスの設定にはAIサービスの認証情報が必要です。事前に使用するAIサービスを準備してください。

AIサービス設定
==============

AIサービス設定画面の起動
------------------------

#. | AIアシスタントのメニューより、AIアシスタントの画面を起動します。
   | または、Ansible Playbookなどのエディタ画面から、 :guilabel:`` ボタンをクリックしてAIアシスタントの画面を起動します。

   .. note::
      | AIアシスタントメニューが表示されていない、もしくはエディタ画面に :guilabel:`` ボタンが表示されていない場合、AIアシスタントの機能が無効化されています。
      | 有効化するにはシステム管理者にて、オーガナイゼーションの設定変更が必要になります。

   .. note::
      | AIアシスタントの画面で、「ご用件を入力してください。」のテキストボックスが表示されている場合はAIアシスタントの設定は完了しています。


#. | :guilabel:` AIサービス設定` ボタンをクリックします。

   .. figure:: /images/ja/ai_assistant/settings/ai-assistant-header-1.png
      :width: 931px
      :alt: AIアシスタントヘッダー1

#. | :guilabel:` AIサービスを追加` ボタンをクリックします。

   .. figure:: /images/ja/ai_assistant/settings/ai-service-setting-1.png
      :width: 810px
      :alt: AIサービス設定1

.. tip::
   | 以下のような画面が表示された際は、認証情報の有効期限が切れている可能性があるので、:guilabel:` AIサービス設定` ボタンをクリックして、AIサービスの更新を行ってください。

   .. figure:: /images/ja/ai_assistant/settings/ai-service-setting-expired.png
      :width: 931px
      :alt: AIサービスの認証に失敗しました
      

AIサービスの追加・更新
----------------------

| 準備したAIサービス毎に設定項目が異なります、準備したAIサービスの認証情報の設定を実施してください。

.. tip::
   | Amazon Bedrockをご利用の場合
   | ご使用のAWSのアカウントでアクセスキーの作成が行える場合はAIサービスに「Amazon Bedrock」を選択します。
   | アクセスキーの作成が行えない場合は「Amazon Bedrock (Login Cache)」を選択します。（ただしaws loginコマンドでログインできることが前提になります）

Amazon Bedrock
^^^^^^^^^^^^^^
| AIサービスに「Amazon Bedrock」をお使いで、アクセスキーの作成が行える場合こちらを使用します。
| 以下の項目を設定して :guilabel:`登録` ボタンをクリックします。

.. figure:: /images/ja/ai_assistant/settings/ai-service-setting-bedrock.png
   :width: 729px
   :alt: AIサービス設定_bedrock

.. list-table:: AIサービス設定(Amazon Bedrock)
   :widths: 2 4
   :header-rows: 1
   :align: left

   * - 項目
     - 内容
   * - AIサービス
     - | Amazon Bedrock
   * - Credential名
     - | 任意の名前
   * - AWS Access Key ID
     - | AWSにて払い出したアクセスキー
   * - AWS Region
     - | AWSのリージョン
   * - AWS Secret Access Key
     - | AWSにて払い出したシークレットアクセスキー


Amazon Bedrock (Login Cache)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| AIサービスに「Amazon Bedrock」をお使いで、アクセスキーの作成が行えない場合は「Amazon Bedrock (Login Cache)」を選択します。
| ※ただしaws loginコマンドでログインできることが前提になります。
| 以下の項目を設定して :guilabel:`登録` ボタンをクリックします。

.. figure:: /images/ja/ai_assistant/settings/ai-service-setting-bedrock-login-cache.png
   :width: 735px
   :alt: AIサービス設定_bedrock_login_cache

.. list-table:: AIサービス設定(Amazon Bedrock)
   :widths: 2 4
   :header-rows: 1
   :align: left

   * - 項目
     - 内容
   * - AIサービス
     - | Amazon Bedrock (Login Cache)
   * - Credential名
     - | 任意の名前
   * - 認証情報 (Login Cache)
     - | aws loginした後に作成されるjsonファイル(格納場所: ~/.aws/login/cache)
       | ファイルの内容を転記するか、:guilabel:`` ボタンからファイルをアップロードします。

.. tip::
   | aws loginを複数のアカウントで実施している場合、~/.aws/login/cache配下に複数のjsonファイルが存在することがあります。
   | その場合は、aws loginした時間帯のjsonファイルを使用してください。

.. tip::
   | 認証情報 (Login Cache)は一定時間で無効となります。有効期限が切れた場合は再設定してください。

モデルの設定
------------

| AIアシスタントで使う、AIのモデルを設定します。
| AIアシスタントの画面の既定（デフォルト）のモデルや、会話中に切り替え可能なモデルの選択を行います。


#. | :guilabel:` モデル` ボタンをクリックします。

   .. figure:: /images/ja/ai_assistant/settings/ai-service-setting-no-model.png
      :width: 814px
      :alt: AIサービス設定_no_model

#. | モデルの選択画面が表示されます。

   .. figure:: /images/ja/ai_assistant/settings/ai-service-setting-model-init.png
      :width: 976px
      :alt: AIサービス設定_モデル選択初期画面

#. | ピックアップモデルで切り替え可能なモデルを選択し、既定のモデルを選択し、:guilabel:`設定` ボタンをクリックします。

   .. figure:: /images/ja/ai_assistant/settings/ai-service-setting-model-selected.png
      :width: 972px
      :alt: AIサービス設定_モデル選択済み画面
