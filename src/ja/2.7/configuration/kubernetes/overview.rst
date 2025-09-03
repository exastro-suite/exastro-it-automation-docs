====
概要
====

はじめに
========

| 本書では、Exastro システムをコンテナ運用管理ツールであるKubernetesに構築した際の特徴について説明します。

特徴
====

| Exastro システムは複数のコンテナにより機能しています。Kubernetesによる運用管理を行うことで、より高い可用性やサービスレベルのシステム構築が実現できます。

可用性
======

自動復旧
--------

| Exastro システムではコンテナを自動復旧させる手段として、Kubernetesのヘルスチェック機能であるProbeを利用します。
| Probeを設定することにより、コンテナの状態がチェックされハングアップが発生した際に自動的に再起動が行われるようになります。

| Probeは以下のフロントエンド系コンテナおよびサーバーサイドジョブ系コンテナに対して設定されています。

- フロントエンド系コンテナ

  - | platform-auth
  - | platform-api
  - | platform-web
  - | ita-api-admin
  - | ita-api-organization
  - | ita-api-ansible-execution-receiver
  - | ita-api-oase-receiver
  - | ita-web-server

- サーバーサイドジョブ系コンテナ

  - | platform-job
  - | ita-by-conductor-regularly

.. warning::
  | ProbeはKubernetesの機能であるため、:doc:`Kubernetesを用いたインストール<../../installation/online/exastro/kubernetes>` をした場合のみ利用可能です。

| ProbeはStartup Probe, Liveness Probe, Readiness Probeの3種類があります。

.. list-table:: Probeの種類
   :widths: 20, 80
   :header-rows: 1
   :align: left

   * - Probe
     - 説明
   * - Startup Probe
     - Startup Probeが成功するまで、Liveness ProbeとReadiness Probeによるチェックを無効にし、アプリケーションの起動に干渉しないようにします。
   * - Liveness Probe
     - コンテナを再起動させるかどうかをチェックをします。
   * - Readiness Probe
     - コンテナがトラフィックを受け入れらえる状態であるかどうかをチェックします。


フロントエンド系コンテナのProbe
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| フロントエンド系コンテナは自身のヘルスチェック用のエンドポイントにHTTP GETリクエストを10秒毎に行います。
| 初回起動時はStartup Probeにより30回失敗した際にコンテナが再起動され、起動後はLiveness Probeにより3回失敗した際にコンテナが再起動されます。

.. list-table:: Startup Probeの設定値
   :widths: 30, 40, 30
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 設定値
   * - httpGet.path
     - HTTP GETリクエストによるパスを指定。
     - （コンテナ毎のヘルスチェック用のパス）
   * - httpGet.port
     - HTTP GETリクエストによるポートを指定。
     - port-http
   * - timeoutSeconds
     - Probeのタイムアウトを指定（秒）。
     - 30
   * - periodSeconds
     - Probeの間隔を指定（秒）。
     - 10
   * - successThreshold
     - Probeが成功したと判断する最小回数を指定。
     - 1
   * - failureThreshold
     - Probeが失敗したと判断する最小回数を指定。
     - 30

.. list-table:: Liveness Probeの設定値
   :widths: 30, 40, 30
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 設定値
   * - httpGet.path
     - HTTP GETリクエストによるパスを指定。
     - （コンテナ毎のヘルスチェック用のパス）
   * - httpGet.port
     - HTTP GETリクエストによるポートを指定。
     - port-http
   * - timeoutSeconds
     - Probeのタイムアウトを指定（秒）。
     - 30
   * - periodSeconds
     - Probeの間隔を指定（秒）。
     - 10
   * - successThreshold
     - Probeが成功したと判断する最小回数を指定。
     - 1
   * - failureThreshold
     - Probeが失敗したと判断する最小回数を指定。
     - 3


.. list-table:: Readiness Probeの設定値
   :widths: 30, 40, 30
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 設定値
   * - httpGet.path
     - HTTP GETリクエストによるパスを指定。
     - （コンテナ毎のヘルスチェック用のパス）
   * - httpGet.port
     - HTTP GETリクエストによるポートを指定。
     - port-http
   * - timeoutSeconds
     - Probeのタイムアウトを指定（秒）。
     - 30
   * - periodSeconds
     - Probeの間隔を指定（秒）。
     - 10
   * - successThreshold
     - Probeが成功したと判断する最小回数を指定。
     - 1
   * - failureThreshold
     - Probeが失敗したと判断する最小回数を指定。
     - 3

サーバーサイドジョブ系コンテナのProbe
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| サーバーサイドジョブ系コンテナはハングアップしていないことを示すファイルが30秒以内に更新されているかの確認を10秒間隔で行っています。
| 初回起動時はStartup Probeにより30回失敗した際にコンテナが再起動され、起動後はLiveness Probeにより3回失敗した際にコンテナが再起動されます。

.. list-table:: Startup Probeの設定値
   :widths: 30, 40, 30
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 設定値
   * - exec.command
     - | Probeで実行するコマンドを指定。
     - | （ハングアップしていないことを示すファイルが30秒以内に更新されているかの確認を行うコマンド）
   * - timeoutSeconds
     - Probeのタイムアウトを指定（秒）。
     - 30
   * - periodSeconds
     - Probeの間隔を指定（秒）。
     - 10
   * - successThreshold
     - Probeが成功したと判断する最小回数を指定。
     - 1
   * - failureThreshold
     - Probeが失敗したと判断する最小回数を指定。
     - 30

.. list-table:: Liveness Probeの設定値
   :widths: 30, 40, 30
   :header-rows: 1
   :align: left

   * - パラメータ
     - 説明
     - 設定値
   * - exec.command
     - | Probeで実行するコマンドを指定。
     - | （ハングアップしていないことを示すファイルが30秒以内に更新されているかの確認を行うコマンド）
   * - timeoutSeconds
     - Probeのタイムアウトを指定（秒）。
     - 30
   * - periodSeconds
     - Probeの間隔を指定（秒）。
     - 10
   * - successThreshold
     - Probeが成功したと判断する最小回数を指定。
     - 1
   * - failureThreshold
     - Probeが失敗したと判断する最小回数を指定。
     - 3
