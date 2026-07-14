.. monitoring:

==========
監視
==========

はじめに
========

| 本書では、Exastroシステムの監視を行う方法について説明します。


Zabbixによる監視設定(Kubernetes)
================================

| Zabbix 6を使用して、Kubernetes上のExastroシステムを監視する設定の例を記載します。
| 本手順では以下を実施します。

- | KubernetesクラスターにZabbixエージェントのインストール
- | Kubernetesクラスターの監視設定
- | ExastroシステムのPOD障害等発生時のメール通知設定
- | Exastroシステムのログの集約先のサーバーにZabbixエージェントのインストール
- | Exastroシステムのログ監視およびメール通知設定

前提条件
--------

| 本説明で使用する環境の前提条件は以下の通りとなります。

- | Zabbixサーバーが構築済みであること
- | Exastroシステムのログの集約を実施済みであること。ログの集約の方法は :doc:`./log_aggregation` を参照
- | :kbd:`kubectl` コマンドでExastroシステムが稼働するKubernetesクラスターにアクセス可能であること


Kubernetes監視設定
------------------

| ZabbixのKubernetes nodes by HTTPテンプレートおよびKubernetes cluster state by HTTP テンプレートを使用して、Exastroシステムが稼働するKubernetesクラスターの監視設定を行います。


KubernetesクラスターにZabbixエージェントインストール
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| KubernetesクラスターへのZabbixエージェントのインストールは、Helm charts を利用してインストールします。
| 公式サイト: `Zabbix Tools / Kubernetes Helm <https://git.zabbix.com/projects/ZT/repos/kubernetes-helm/browse>`_

Zabbixエージェント: helm charts values.yamlの準備
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| helm chartsでインストールする際に使用する :kbd:`values.yaml` は、以下のコマンドで抽出して、編集する

.. code-block:: shell
   :caption: コマンド

   helm show values zabbix-chart-6.4/zabbix-helm-chrt > ./zabbix_agent_values.yaml

.. tip::
   | Zabbixエージェントのhelmリポジトリ登録は以下のコマンドで実施できます。 :kbd:`helm show values` を実行する前に１度だけ必要となります。

   .. code-block:: shell
      :caption: コマンド

      # Zabbixエージェントの Helm リポジトリを登録
      helm repo add zabbix-chart-6.4  https://cdn.zabbix.com/zabbix/integrations/kubernetes-helm/6.4
      # リポジトリ情報の更新
      helm repo update

| 出力された :kbd:`zabbix_agent_values.yaml` を以下のように修正します。

.. literalinclude:: /share/ja/manuals/maintenance/literal_includes/zabbix_agent_values.yaml
   :diff: /share/ja/manuals/maintenance/literal_includes/zabbix_agent_values.org.yaml
   :language: yaml
   :linenos:
   :caption: zabbix_agent_values.yaml

.. note::

   | :kbd:`helm show values` で出力された内容をそのまま使用しているため、コメント化された内容もそのまま記載しています。

Zabbixエージェント: インストール
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| helmによるインストール手順は公式の手順に従ってインストールします。

.. note::
   | 公式の手順のまま実施しているため、namespaceはmonitoringを指定しております。

- | namespaceの作成

  .. code-block:: shell
     :caption: コマンド

     kubectl create namespace monitoring

- | Zabbixエージェント: インストール

  .. code-block:: shell
     :caption: コマンド

     helm install zabbix zabbix-chart-6.4/zabbix-helm-chrt --dependency-update -f ./zabbix_agent_values.yaml -n monitoring

- | インストールされた :kbd:`Zabbixエージェント` の確認

  .. code-block:: shell
     :caption: コマンド

     kubectl get po -n monitoring

  .. code-block:: shell
     :caption: 実行結果

     NAME                                               READY   STATUS    RESTARTS   AGE
     zabbix-agent-85cmm                                 1/1     Running   0          54s
     zabbix-agent-86r8k                                 1/1     Running   0          54s
     zabbix-agent-brrk7                                 1/1     Running   0          54s
     zabbix-agent-gbzsx                                 1/1     Running   0          54s
     zabbix-agent-kube-state-metrics-698cc89ff5-8mp29   1/1     Running   0          54s
     zabbix-proxy-d8cb67dfc-88ns9                       1/1     Running   0          54s

Kubernetes nodes by HTTPテンプレートによる監視設定
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

zabbix-service-accountのtoken取得
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ZabbixのKubernetes nodes by HTTPテンプレートの設定に必要なtokenを取得します。

.. code-block:: shell
   :caption: コマンド

   kubectl get secret zabbix-service-account -n monitoring -o jsonpath={.data.token} | base64 -d

ホストの追加
^^^^^^^^^^^^

| ZabbixのWebコンソール画面で、ホストを追加します
| マクロで設定可能な項目の詳細は `公式サイト: Zabbix + Kubernetes (Kubernetes nodes by HTTP) <https://www.zabbix.com/integrations/kubernetes#kubernetes_nodes_http>`_ を参照

.. list-table:: ホストタブ指定
 :widths: 20, 20, 20
 :header-rows: 1

 * - 項目
   - 設定値
   - 備考
 * - ホスト名
   - 任意の値
   -
 * - テンプレート
   - Kubernetes nodes by HTTP
   - Templates/Applicationsの中から選択します
 * - グループ
   - Templates/Applications
   -

.. list-table:: マクロタブ指定
 :widths: 20, 20, 20
 :header-rows: 1

 * - マクロ
   - 値
   - 備考
 * - {$KUBE.API.TOKEN}
   - 取得したtokenの値
   -
 * - {$KUBE.API.URL}
   - Kubernetes API serverのURL
   - ZABBIX serverがKubernetesクラスター外の場合のみ必要

Kubernetes cluster state by HTTP テンプレートによる監視設定
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

zabbix-service-accountのtoken取得
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ZabbixのKubernetes nodes by HTTPテンプレートの設定に必要なtokenを取得します。

.. code-block:: shell
   :caption: コマンド

   kubectl get secret zabbix-service-account -n monitoring -o jsonpath={.data.token} | base64 -d

ホストの追加
^^^^^^^^^^^^

| ZabbixのWebコンソール画面で、ホストを追加します
| マクロで設定可能な項目の詳細は `公式サイト: Zabbix + Kubernetes (Kubernetes cluster state by HTTP) <https://www.zabbix.com/integrations/kubernetes#kubernetes_state_http>`_ を参照

.. list-table:: ホストタブ指定
 :widths: 20, 20, 20
 :header-rows: 1

 * - 項目
   - 設定値
   - 備考
 * - ホスト名
   - 任意の値
   -
 * - テンプレート
   - Kubernetes cluster state by HTTP
   - Templates/Applicationsの中から選択します
 * - グループ
   - Templates/Applications
   -

.. list-table:: マクロタブ指定
 :widths: 20, 20, 20
 :header-rows: 1

 * - マクロ
   - 値
   - 備考
 * - {$KUBE.API.TOKEN}
   - 取得したtokenの値
   -
 * - {$KUBE.STATE.ENDPOINT.NAME}
   - zabbix-agent-kube-state-metrics
   -
 * - {$KUBE.API.URL}
   - Kubernetes API serverのURL
   - ZABBIX serverがKubernetesクラスター外の場合のみ必要


Exastroシステムのリソース障害発生時の通知設定
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
| ExastroシステムのPOD障害等が発生した場合にメール通知を行う設定を行います。

前提条件
^^^^^^^^

| メールサーバーおよび通知先のユーザーのメールの設定が完了していること

トリガーアクションの追加
^^^^^^^^^^^^^^^^^^^^^^^^
| ZabbixのWebコンソール画面で、トリガーアクションを追加します

.. list-table:: アクションタブ指定
 :widths: 20, 20, 20
 :header-rows: 1

 * - 項目
   - 設定値
   - 備考
 * - 名前
   - 任意の値
   -
 * - 実行条件 タイプ
   - タグの値
   -
 * - 実行条件 タグ
   - namespace
   -
 * - 実行条件 オペレータ
   - 等しい
   -
 * - 実行条件 値
   - exastro
   - Exastroシステムのインストール先のnamespace

.. list-table:: 実行内容タブ指定
 :widths: 20, 20, 20
 :header-rows: 1

 * - 項目
   - 設定値
   - 備考
 * - 実行内容 - ユーザーグループに送信
   - 任意のグループ
   - ユーザーグループに通知する場合はユーザーグループを選択
 * - 実行内容 - ユーザーに送信
   - 任意のユーザー
   - ユーザーに通知する場合はユーザーを選択
 * - 実行内容 - 次のメディアのみ使用
   - Email
   - 通知を行うメディアを選択


ログ監視設定
-----------------------------

ログ収集先サーバーにZabbixエージェントインストール
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
| ログ収集先サーバーへのZabbixエージェントのインストールは、公式の手順を利用してインストールします。
| 公式サイト: `Download and install Zabbix <https://www.zabbix.com/jp/download?zabbix=6.4&components=agent>`_

.. list-table::
 :widths: 20, 20, 20
 :header-rows: 1

 * - 項目
   - 選択値
   - 備考
 * - ZABBIXバージョン
   - 6.4
   -
 * - OSディストリビューション
   - ログ収集先のサーバーで該当するものを選択
   -
 * - OSバージョン
   - ログ収集先のサーバーで該当するものを選択
   -
 * - ZABBIX COMPONENT
   - Agent
   -


Zabbixエージェントの設定
~~~~~~~~~~~~~~~~~~~~~~~~

| Zabbixエージェントの設定は、公式のリファレンスを参照して設定を行います。
| 公式サイト: `Zabbix エージェント <https://www.zabbix.com/documentation/current/jp/manual/appendix/config/zabbix_agentd>`_

.. note::
   | アクティブチェックを実施するため次のパラメータ設定は必須です。
   | Hostname ログ収集先サーバーのホスト名を指定
   | ServerActive Zabbixサーバーの接続先

ホストの追加
^^^^^^^^^^^^

| ZabbixのWebコンソール画面で、ホストを追加します

.. list-table::
 :widths: 20, 20, 20
 :header-rows: 1

 * - 項目
   - 設定値
   - 備考
 * - ホスト名
   - ログ収集先サーバーのホスト名を指定
   -
 * - テンプレート
   - Linux by Zabbix agent active
   - Templates/Operating systemsの中から選択します
 * - グループ
   - Linux servers
   -

アイテムの追加
^^^^^^^^^^^^^^

| ZabbixのWebコンソール画面で、追加したホストにログファイルのアイテムを追加します
| アイテムはログファイル毎（ログローテーション用の日付部分を除く）に設定する必要があります
| ログ一覧は :doc:`./log_list` を参照
| 監視対象のログファイル（正規表現）は、 :kbd:`^exastro-suite\\.exastro\\.{ログ一覧のサービス}\\..*\\.log$` になります

.. tip::
   | 以下のコマンドで監視対象のログファイル（正規表現）の一覧を取得できます。

   .. code-block:: shell
      :caption: コマンド

      (\
        kubectl get deploy -n exastro -o jsonpath='{range .items[*]}{@.metadata.name}{"\n"}'; \
        kubectl get sts  -n exastro -o jsonpath='{range .items[*]}{@.metadata.name}{"\n"}'; \
        kubectl get ds  -n exastro -o jsonpath='{range .items[*]}{@.metadata.name}{"\n"}'; \
        kubectl get cj  -n exastro -o jsonpath='{range .items[*]}{@.metadata.name}{"\n"}'; \
      ) | sed -e '/^$/d' \
          -e '/^ita-web-server/d' \
          -e '/^platform-web/d' \
          -e 's|^|^exastro-suite\\.exastro\\.|' \
          -e 's|$|\\..*\\.log$|'

   .. code-block:: shell
      :caption: 実行結果（抜粋）

      ^exastro-suite\.exastro\.ita-api-admin\..*\.log$
      ^exastro-suite\.exastro\.ita-api-oase-receiver\..*\.log$
      ^exastro-suite\.exastro\.ita-api-organization\..*\.log$
      ^exastro-suite\.exastro\.ita-by-ansible-execute\..*\.log$

.. list-table::
 :widths: 20, 20, 20
 :header-rows: 1

 * - 項目
   - 設定値
   - 備考
 * - 名前
   - ログファイルの名前
   - 例) exastro-suite.exastro.ita-api-admin.log
 * - タイプ
   - Zabbixエージェント(アクティブ)
   -
 * - キー
   - logrt
   - logrtのパラメータを指定後の設定値の例) logrt[/var/PersistentVolume/ha-conf-k8s/exastro-logs/^exastro-suite\.exastro\.ita-api-admin\..*\.log$,"[ []ERROR[ \]]","UTF-8",,skip]
 * - logrt file_regexp パラメータ
   - {ログ集約先のディレクトリ}/{監視対象のログファイル（正規表現）}
   - 例) /var/PersistentVolume/ha-conf-k8s/exastro-logs/^exastro-suite\.exastro\.ita-api-admin\..*\.log$
 * - logrt <regexp> パラメータ
   - ログファイル毎のログ抽出条件の指定の表参照
   - | 例1) "[ []ERROR[ \\]]"
       例2) "[ [](FATAL|ERROR)[ \\]]"
 * - logrt <encoding> パラメータ
   - "UTF-8"
   -
 * - logrt <maxproclines> パラメータ
   - 指定なし
   -
 * - logrt <mode> パラメータ
   - skip
   -
 * - logrt <maxdelay> パラメータ
   - 指定なし
   -
 * - logrt <options> パラメータ
   - 指定なし
   -
 * - logrt <persistent_dir> パラメータ
   - 指定なし
   -
 * - データ型
   - ログ
   -
 * - 監視間隔
   - 任意の時間
   - 問題なければデフォルト値の1mとする
 * - ヒストリの保存期間
   - 任意の期間
   - 問題なければデフォルト値の90dとする

- | ログファイル毎のログ抽出条件の指定

  .. list-table::
   :widths: 20, 20, 20
   :header-rows: 1

   * - 監視対象のログファイル
     - logrt <regexp> パラメータ
     - 備考
   * - exastro-suite.exastro.ita-*
     - "[ []ERROR[ \\]]"
     -
   * - exastro-suite.exastro.platform-*
     - "[ []ERROR[ \\]]"
     -
   * - exastro-suite.exastro.keycloak
     - "[ [](FATAL|ERROR)[ \\]]"
     -
   * - exastro-suite.exastro.mariadb
     - "[ []ERROR[ \\]]"
     -
   * - exastro-suite.exastro.mongodb
     - "\\"s\\": \\"(E|F)\\""
     -
   * - exastro-suite.exastro.gitlab
     - "[ [](FATAL|ERROR)[ \\]]"
     -


トリガーの追加
^^^^^^^^^^^^^^

| ZabbixのWebコンソール画面で、追加したホストにログファイルのトリガーを追加します
| トリガーはアイテム毎に設定する必要があります

.. list-table::
 :widths: 20, 20, 20
 :header-rows: 1

 * - 項目
   - 設定値
   - 備考
 * - 名前
   - ログファイルの名前
   - 例) exastro-suite.exastro.ita-api-admin.log
 * - 深刻度
   - 軽度の障害
   - 深刻度は運用に運用に合わせて設定
 * - 条件式 - アイテム
   - 作成したアイテムを選択
   - 例) exastro-suite.exastro.ita-api-admin.log
 * - 条件式 - 関数
   - find() を選択
   -
 * - 条件式 - 最新の
   - 指定なし
   -
 * - 条件式 - タイムシフト
   - 指定なし
   -
 * - 条件式 - O
   - regexp
   -
 * - 条件式 - V
   - .*
   -
 * - 条件式 - 結果
   - = 1
   -
 * - 正常イベントの生成
   - なし
   -
 * - 障害イベント生成モード
   - 複数
   -
 * - 手動クローズを許可
   - チェックON
   -

Exastroシステムのエラーログ検出時の通知設定
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
| Exastroシステムのログにエラーが検出された場合にメール通知を行う設定を行います。

前提条件
^^^^^^^^

| メールサーバーおよび通知先のユーザーのメールの設定が完了していること

トリガーアクションの追加
^^^^^^^^^^^^^^^^^^^^^^^^
| ZabbixのWebコンソール画面で、トリガーアクションを追加します
| トリガーアクションには作成したトリガー全てを追加する必要があります

.. list-table:: アクションタブ指定
 :widths: 20, 20, 20
 :header-rows: 1

 * - 項目
   - 設定値
   - 備考
 * - 名前
   - 任意の値
   -
 * - 計算のタイプ
   - Or
   - ２つ目の実行条件を入力後に表示されます
 * - 実行条件 - タイプ
   - トリガー
   - ※実行条件は作成したトリガー全て追加します
 * - 実行条件 - オペレータ
   - 等しい
   -
 * - 実行条件 - トリガー
   - 作成したトリガーを選択
   - 例) exastro-suite.exastro.ita-api-admin.log


.. list-table:: 実行内容タブ指定
 :widths: 20, 20, 20
 :header-rows: 1

 * - 項目
   - 設定値
   - 備考
 * - 実行内容 - ユーザーグループに送信
   - 任意のグループ
   - ユーザーグループに通知する場合はユーザーグループを選択
 * - 実行内容 - ユーザーに送信
   - 任意のユーザー
   - ユーザーに通知する場合はユーザーを選択
 * - 実行内容 - 次のメディアのみ使用
   - Email
   - 通知を行うメディアを選択
