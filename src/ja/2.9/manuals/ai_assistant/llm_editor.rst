===========
LLMエディタ
===========

はじめに
========

| 本書は、ITAのLLMエディタの機能および操作方法について説明します。
| LLMエディタを使用するにあたっては、LLMモデルの認証情報が必要となりますが、
| 本説明においては、Amazon Bedrock（Claude Code）を利用した場合の例として記載しています。

LLMエディタ詳細
---------------

機能について
^^^^^^^^^^^^
| LLMエディタはLLMモデルと会話を通じて開発支援を行います。

開発支援設定
============
| 本章では、開発支援設定の操作について説明します。

開発支援設定登録
----------------

#. | エディタより、 :guilabel:`` ボタンをクリックします。

   .. figure:: /images/ja/ai_assistant/llm_editor/llm_editor_editor_window.png
      :width: 516px
      :alt: 開発支援設定を開く

#. | AI選択からAmazon Bedrock（Claude Code）を選択します。

   .. figure:: /images/ja/ai_assistant/llm_editor/llm_editor_ai_selection.png
      :width: 516px
      :alt: AI選択

#. | AWS Access Key ID・AWS Secret Access Key・AWS Session Token (optional for SSO)・AWS Regionを入力して、 :guilabel:`` ボタンをクリックします。

   .. figure:: /images/ja/ai_assistant/llm_editor/llm_editor_credentials.png
      :width: 516px
      :alt: 認証情報入力

#. | モデル選択・モデル初期値を選択して、 :guilabel:`設定更新` ボタンをクリックします。

   .. figure:: /images/ja/ai_assistant/llm_editor/llm_editor_model_selection.png
      :width: 622px
      :alt: モデル選択

開発支援設定削除
----------------

#. 開発支援設定を開き、:guilabel:`設定削除` ボタンをクリックします。

   .. figure:: /images/ja/ai_assistant/llm_editor/llm_editor_config_delete.png
      :width: 622px
      :alt: 設定削除

#. 削除確認で本当に削除する場合は、:guilabel:`OK` ボタンをクリックします。

   .. figure:: /images/ja/ai_assistant/llm_editor/llm_editor_config_delete_confirm.png
      :width: 622px
      :alt: 削除確認

.. warning:: | 削除された設定は、復活することはできませんので、削除する際は十分にお気を付けください。


開発支援
========

| 本章では、開発支援の操作について説明します。

メッセージ送信
---------------

#. | エディタより、 :guilabel:`` ボタンをクリックします。

   .. figure:: /images/ja/ai_assistant/llm_editor/llm_editor_editor_window_open.png
      :width: 516px
      :alt: 開発支援を開く

#. | メッセージを入力しEnterまたは、 :guilabel:`` ボタンでメッセージを送信します。

   .. figure:: /images/ja/ai_assistant/llm_editor/llm_editor_send.png
      :width: 892px
      :alt: メッセージ送信

#. | エディタの内容を添付したい場合は、 :guilabel:`` ボタンをクリックします。

   .. figure:: /images/ja/ai_assistant/llm_editor/llm_editor_send_file.png
      :width: 892px
      :alt: コード添付

コードの反映
------------

コードブロックの内容をエディタに反映したい場合はコードブロックをクリックします。

.. figure:: /images/ja/ai_assistant/llm_editor/llm_editor_code_copy.png
   :width: 892px
   :alt: コードコピー

.. warning::
   | Exastro IT Automation エンドポイントのプロトコルがhttpの場合は利用できません。

会話履歴ダウンロード
--------------------

会話内容をダウンロードしたい場合は、 :guilabel:`` ボタンをクリックします。

.. figure:: /images/ja/ai_assistant/llm_editor/llm_editor_download.png
   :width: 892px
   :alt: 会話履歴ダウンロード

.. tip:: | すべての会話内容がjson形式ファイルで保存されます。