.. _mcp_external_agent:


=======================================
外部AIエージェントからのMCPサーバー接続
=======================================

| 本書は、ExastroのAIアシスタント機能以外のAIエージェントからExastroのMCPサーバーへアクセスする方法について記載したものです。


MCPサーバーのアクセス（認証）について
=====================================

| MCPサーバーへのアクセスにはExastroの認証が必要です。
| 認証の方法はAPIと同じです。詳細は「 :ref:`operator_certifications` 」を参照してください。

MCPサーバー接続情報
===================

.. list-table:: MCPサーバー接続情報
    :widths: 20, 40
    :header-rows: 1
    :align: left

    * - 項目
      - 値
    * - エンドポイント
      - {BASEURL}/api/{オーガナイゼーションID}/workspaces/{ワークスペースID}/mcp
    * - プロトコル
      - JSON-RPC 2.0
    * - プロトコルバージョン
      - 2024-11-05


実行手順（サンプル）
====================

| MCPサーバーのツールの呼び出しのサンプルです。
| 事前にトークン発行を実施してください。詳細は「 :ref:`get_refresh_token` 」を参照ください。

| 以下のサンプルは以下を実施します。

#. リフレッシュトークンからアクセストークンの発行
#. MCPの :program:`initialize` 呼び出し
#. MCPの :program:`tools/list` 呼び出し
#. MCPの :program:`list-accessible-menus` ツール呼び出し

.. code-block:: bash

  BASEURL="https://severname"
  REFRESH_TOKEN="eyJhbGci..." # 事前にトークン発行で取得したrefresh_token
  ORG_ID="オーガナイゼーションID"
  WORKSPACE_ID="ワークスペースID"

  # リフレッシュトークンからアクセストークンの発行
  ACCESS_TOKEN=$(\
      curl -X POST \
      -d "client_id=_${ORGANIZATION_ID}-api" \
      -d "grant_type=refresh_token" \
      -d "refresh_token=${REFRESH_TOKEN}" \
      "${BASEURL}/auth/realms/${ORGANIZATION_ID}/protocol/openid-connect/token" \
      | jq -r ".access_token" \
  )

  # MCPのinitialize呼び出し
  curl -X POST \
   -H "Authorization: Bearer ${ACCESS_TOKEN}" \
   -H "Content-Type: application/json" \
   -d '{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {}}' \
   "${BASEURL}/api/${ORG_ID}/workspaces/${WORKSPACE_ID}/mcp"

  # MCPのtools/list呼び出し
  curl -X POST \
   -H "Authorization: Bearer ${ACCESS_TOKEN}" \
   -H "Content-Type: application/json" \
   -d '{"jsonrpc": "2.0", "id": 2, "method": "tools/list", "params": {}}' \
   "${BASEURL}/api/${ORG_ID}/workspaces/${WORKSPACE_ID}/mcp"

  # MCPのlist-accessible-menusツール呼び出し
  curl -X POST \
   -H "Authorization: Bearer ${ACCESS_TOKEN}" \
   -H "Content-Type: application/json" \
   -d '{"jsonrpc": "2.0", "id": 2, "method": "tools/call", "params": {"name": "list-accessible-menus", "arguments": {}}}' \
   "${BASEURL}/api/${ORG_ID}/workspaces/${WORKSPACE_ID}/mcp"


参考:Claude Codeとの連携
========================

| 以下の設定を行うことでClaude CodeからExastroのMCPサーバーを呼び出せるようになります。
| 以下のファイルは同一のディレクトリに格納し、claude.shでClaude Codeを起動します。
| また、必要に応じてCLAUDE.mdを作成してください。

.. code-block:: bash
   :name: claude.sh
   :caption: claude.sh
 
   #!/bin/bash
   # Exastro MCPサーバー接続用のパラメータ
   export BASE_URL=http://localhost:8000
   export ORGANIZATION_ID=org1
   export WORKSPACE_ID=ws1
   # Exastroで払い出したリフレッシュトークン
   export REFRESH_TKN='eyJhbGci...'

   cd $(dirname $0)
   claude

.. code-block:: json
   :name: .mcp.json
   :caption: .mcp.json
 
   {
       "mcpServers": {
           "exastro-mcp": {
               "type": "http",
               "url": "${BASE_URL}/api/${ORGANIZATION_ID}/workspaces/${WORKSPACE_ID}/mcp",
               "headersHelper": "bash ./mcp-headers.sh"
           }
       }
   }

.. code-block:: bash
   :name: mcp-headers.sh
   :caption: mcp-headers.sh

   #!/bin/bash

   ACCESS_TOKEN=$(\
       curl -X POST \
       -d "client_id=_${ORGANIZATION_ID}-api" \
       -d "grant_type=refresh_token" \
       -d "refresh_token=${REFRESH_TKN}" \
       "${BASE_URL}/auth/realms/${ORGANIZATION_ID}/protocol/openid-connect/token" \
       | jq -r ".access_token" \
   )

   if [ -n "${ACCESS_TOKEN}" ]; then 
       printf '{"Authorization": "Bearer %s"}\n' "${ACCESS_TOKEN}"
   fi


| 上記設定を行い、Claude CodeからExastroのMCPサーバーに接続できた際のイメージ

.. figure:: /images/ja/ai_assistant/reference/claude-code-01.png
   :width: 1000px
   :align: left
