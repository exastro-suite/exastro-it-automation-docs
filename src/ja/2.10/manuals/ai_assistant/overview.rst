==================
AIアシスタント概要
==================

はじめに
========

| 本書では、AIアシスタント機能の概要について説明します。

概要
====

| ExastroのAIアシスタントは、生成AIとの対話を通じてITAの開発・運用を支援する機能です。
| AIアシスタントのメニューから呼び出すAIアシスタント（以下、AIアシスタント画面）では、自然言語による指示をもとにAIエージェントがパラメータシートの操作やAnsible Legacyの実行などの操作を行うことができ、Exastro IT Automationの知見が少ない担当者でも運用作業を進めやすくなります。
| Ansible Playbookなどのエディタ画面から呼び出すAIアシスタント（LLMエディタ）では、自然言語による問い合わせやコードを含めた相談が可能となり、Ansible Playbookなどのコード作成を効率的に進めることができます。

.. note::
   | AIアシスタント機能は、システム管理者によってオーガナイゼーション毎に有効化/無効化することが可能です

.. note::
   | AIアシスタント機能を使用するにあたって、AIサービスが別途必要です。


AIアシスタント全体図
--------------------

| AIアシスタントはユーザーからの依頼を自然言語で受け付け、AIサービスとMCPサーバーが協力して処理を実施します。
| MCPサーバーはMCPホストであるAIアシスタント画面からの要求を受けて、ITAのAPIを呼び出します。
| RAGにはITAの機能を使っていくためのノウハウが格納されており、AIサービスが必要に応じて参照します。


.. figure:: /images/ja/ai_assistant/overview/overhead_view.png
   :width: 1200px


対応状況
========

AIアシスタント対応機能
----------------------

以下の表にある、Exastro IT Automation 機能のうち、AIアシスタント対応が○となっているものがAIアシスタントで使用できる機能です。

.. list-table:: AIアシスタント対応機能
   :widths: 5 1
   :header-rows: 1
   :align: left

   * - Exastro IT Automation 機能
     - AIアシスタント対応
   * - パラメータシート定義 作成・更新
     - | ○
   * - パラメータシートデータ操作
     - | ○
   * - Ansible-Legacy 実行 (Movement)
     - | ○
   * - Ansible-Pioneer 実行 (Movement)
     - | ×
   * - Ansible-LegacyRole 実行 (Movement)
     - | ×
   * - Conductor定義 作成・更新
     - | ×
   * - Conductor 実行
     - | ×
   * - パラメーター集
     - | ×
   * - 比較機能
     - | ×
   * - OASE機能
     - | ×
   * - CI/CD for IaC
     - | ×
   * - Terraformドライバー機能
     - | ×
   * - エクスポート・インポート機能
     - | ×

| ※AIアシスタントの対応機能については、今後のバージョンで拡充される予定です。


対応AIサービス
--------------

以下の表にある、AIサービスで対応状況が○となっているものが利用できるAIサービスです。
AIアシスタントを利用するために別途必要となります。

.. list-table:: AIサービス
   :widths: 5 1
   :header-rows: 1
   :align: left

   * - AIサービス
     - 対応状況
   * - Amazon Bedrock
     - | ○
   * - OpenAI ChatGPT
     - | ×
   * - Google Gemini
     - | ×

| ※対応するAIサービスについては、今後のバージョンで拡充される予定です。


動作確認済みAIモデル
--------------------

| AIの回答や操作結果は正確性および完全性を保証するものではありませんが、以下のモデルで動作確認を実施しております。
| AIアシスタントに指示する内容によって適切なモデルを選択してください。

.. list-table:: 動作確認済みAIモデル
   :widths: 2 4
   :header-rows: 1
   :align: left

   * - AIサービス
     - モデル
   * - Amazon Bedrock
     - | Global Anthropic Claude Sonnet 5.5
   * - Amazon Bedrock
     - | Global Anthropic Claude Opus 5
   * - Amazon Bedrock
     - | Global Anthropic Claude Opus 5.5

