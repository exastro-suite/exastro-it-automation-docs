=========
MCPツール
=========

| 本書は、ExastroのMCPツールについて記載したものです。

MCPツール一覧
=============

| MCPサーバーが提供しているMCPツールは以下になります。
| ただし、利用するユーザーの権限によって使用可能なツールは変化します。※権限のないツールは :program:`tools/list` の一覧に入らなくなります。

.. list-table:: MCPツール一覧
   :header-rows: 1
   :widths: 20 20 20 35

   * - ツール名
     - ツール
     - 分類
     - 概要
   * - アクセス可能メニュー一覧取得
     - ``list-accessible-menus``
     - メニュー・パラメータシート操作
     - アクセス可能なメニューグループとメニューの一覧を取得
   * - メニュー情報取得
     - ``list-menu-info``
     - メニュー・パラメータシート操作
     - メニューの基本情報と項目情報を取得
   * - プルダウン値取得
     - ``list-menu-info-pulldown``
     - メニュー・パラメータシート操作
     - IDColumn 項目のプルダウン指定可能値を取得
   * - メニューレコード検索
     - ``menu-filter``
     - メニュー・パラメータシート操作
     - 検索条件でメニューのレコードを取得
   * - メニューレコード件数取得
     - ``menu-filter-count``
     - メニュー・パラメータシート操作
     - 検索条件に合致するレコード件数を取得
   * - レコード一括メンテナンス
     - ``maintenance-all``
     - メニュー・パラメータシート操作
     - レコードの一括登録・更新・廃止・復活・物理削除
   * - パラメータシート作成
     - ``create-menu``
     - メニュー・パラメータシート操作
     - 新規パラメータシート(メニュー)を作成
   * - パラメータシート更新
     - ``update-menu``
     - メニュー・パラメータシート操作
     - 既存パラメータシートを更新
   * - パラメータシート定義取得
     - ``get-menu-definition``
     - メニュー・パラメータシート操作
     - パラメータシートの定義情報を取得
   * - Movement本番実行
     - ``execute-driver``
     - Movement 実行
     - Movement を本番実行
   * - Movementドライラン実行
     - ``dry-run-driver``
     - Movement 実行
     - Movement をドライラン実行(Ansible)
   * - 実行状況取得
     - ``get-driver-status``
     - Movement 実行
     - 実行番号から実行状況を取得
   * - ドキュメント検索
     - ``search-docs``
     - ドキュメント検索
     - ITA ドキュメントを意味検索(RAG)。クエリは英語
   * - ドキュメント取得
     - ``get-document``
     - ドキュメント検索
     - ドキュメントの全文を取得
   * - ユーザー一覧取得
     - ``list-users``
     - ユーザー管理
     - 組織内のユーザー一覧を取得
   * - ユーザー作成
     - ``create-user``
     - ユーザー管理
     - 新規ユーザーを作成(username / password / email)
   * - テキストファイル作成
     - ``create-attachment-text-file``
     - 添付ファイル操作
     - 生テキストから添付ファイルを作成し、file_id を発行
   * - テキストファイル取得
     - ``get-attachment-text-file``
     - 添付ファイル操作
     - 添付ファイルのテキスト内容を取得
   * - ZIPファイル作成
     - ``create-attachment-zip-file``
     - 添付ファイル操作
     - 複数の添付ファイルを ZIP にまとめ、新しい file_id を発行
   * - Base64エンコード
     - ``base64-encode``
     - 添付ファイル操作
     - テキストを Base64 にエンコード
   * - Base64デコード
     - ``base64-decode``
     - 添付ファイル操作
     - Base64 をテキストにデコード
