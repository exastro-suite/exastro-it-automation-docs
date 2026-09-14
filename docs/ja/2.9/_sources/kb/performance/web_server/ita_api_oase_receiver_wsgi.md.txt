---
orphan: true
---

# OASE大量イベント処理のためのWSGIチューニング例（ita-api-oase-receiver）

## 概要

ita-api-oase-receiverで大量のイベント処理が遅い場合、WSGIのプロセス数・スレッド数を調整することで性能改善できる場合があります。本ドキュメントでは、大量のラベル付与などのCPUバウンドな処理に対する具体的なチューニング例を紹介します。

## チューニング例

### 前提
- **ITAバージョン**: 2.8.0
- **Platformバージョン**: 1.12.0
- **インストール環境**: kubernetes
- **システム環境**: 8コアCPU

### シナリオ
- **処理対象**: ita-api-oase-receiverで受け取った1リクエストにつき100件のイベント
- **ラベル付与設定**: 処理対象のイベント1件あたり正規表現を用いたラベル付与設定が約1,300件

このような環境では、大量の正規表現マッチング処理がCPUバウンドとなり、処理が遅くなる場合があります。

### 設定

```diff
# exastro.yaml
exastro-it-automation:
# 中略
  ita-api-oase-receiver:
    image:
      repository: "docker.io/exastro/exastro-it-automation-api-oase-receiver"
      tag: ""
      pullPolicy: IfNotPresent
    extraEnv:
      LISTEN_PORT: "8000"
      PLATFORM_API_HOST: "platform-api"
      PLATFORM_API_PORT: "8000"
+     OASE_RECEIVER_WSGI_PROCESSES: "7"
+     OASE_RECEIVER_WSGI_THREADS: "2"
```

Exastroのデフォルト設定はプロセス数2、スレッド数8です。この設定では最大2コアまでしか使えませんが、プロセス数を7に増やすことで7コアを並列活用でき、CPUバウンドなラベル付与処理の高速化が期待できます。

### 設定パラメータ

| 項目 | デフォルト値 | 設定値 | 説明 |
|-----|-----|-----|------|
| `OASE_RECEIVER_WSGI_PROCESSES` | 2 | 7 | プロセス数。CPUコア数に応じて調整（目安: コア数 - 1） |
| `OASE_RECEIVER_WSGI_THREADS` | 8 | 2 | プロセスあたりのスレッド数。CPUバウンドな処理では少なめに設定 |


### 期待される効果

- **スループット向上**: 複数CPUコアの並列活用により、大量のイベント処理が高速化
- **レイテンシ削減**: イベント処理の完了時間が短縮

実環境での効果は、チューニング前後でのイベント処理時間やCPU使用率等をご確認ください。
