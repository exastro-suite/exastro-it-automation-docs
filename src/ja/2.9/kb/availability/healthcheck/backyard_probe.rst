
==========================================================
バックヤードコンテナのProbe設定カスタマイズ
==========================================================

概要
====

| バックヤードコンテナには、標準で Liveness Probe および Startup Probe が設定されています。
| 既定値は汎用的な運用を想定した値（24時間: 86,400秒）ですが、運用要件に合わせてマニフェストファイルでカスタマイズすることができます。
| 本ドキュメントでは、バックヤード処理周期を確認し、Probeの設定をカスタマイズする手順を紹介します。

.. warning::
  | Probeの閾値を短く設定しすぎると、一時的な処理遅延でもProbeが失敗と判定され、不要な再起動が増えてしまいます。
  | その結果、本来進めるべきバックヤード処理が完了できなくなる可能性があるため、閾値は処理周期に十分な余裕を持たせて設定してください。


前提
====

- ITA バージョン: 2.8.0
- Platform バージョン: 1.12.0
- インストール環境: Kubernetes


シナリオ
========

本シナリオでは、以下の流れで Liveness Probe および Startup Probe の設定を行います。

1. バックヤード処理の実際の動作周期をログから確認する
2. 周期を踏まえて、設定値を決定する
3. 設定変更を適用する

目的は「標準設定のまま運用」ではなく、「停止・ハングアップをより早く検知する」ことです。


バックヤード周期の取得
======================

| Probe設定の閾値を決定するにあたり、バックヤード処理の実際の動作周期をログから確認します。
| バックヤードコンテナは、1ループごとに ``Backyard job has started`` というログを出力します。
| ログに出力されたタイムスタンプの間隔から、バックヤード処理の実行周期を確認できます。
|

.. note::
  | 処理対象のデータ量が増えるほど、バックヤード処理の周期は長くなる傾向があります。
  | そのため、実運用で想定されるデータ量が蓄積された状態で計測してください。

ログ取得手順（ita-by-ansible-executeの場合）
---------------------------------------------

``ita-by-ansible-execute`` を例に、実際のバックヤード周期を kubectlログから確認する手順を示します。

**1. Pod名を確認する**

.. code-block:: bash

   kubectl get pods -n exastro | grep ita-by-ansible-execute

実行例（出力イメージ）:

.. code-block:: text

   ita-by-ansible-execute-xxxxxxxxxx-xxxxx   1/1   Running   0   10m

**2. ログから Backyard job has started のタイムスタンプを取得する**

.. code-block:: bash

   kubectl logs <pod名> -n exastro | grep "Backyard job has started"

実行例（出力イメージ）:

.. code-block:: text

   2025-06-01 10:00:00,123 INFO  Backyard job has started
   2025-06-01 10:00:07,456 INFO  Backyard job has started
   2025-06-01 10:00:13,523 INFO  Backyard job has started
   2025-06-01 10:00:21,889 INFO  Backyard job has started
   2025-06-01 10:00:28,456 INFO  Backyard job has started
   2025-06-01 10:00:34,123 INFO  Backyard job has started

**3. タイムスタンプの差分を確認する**

| 上記の例では連続するログ間隔が 5〜8秒程度であることが読み取れます。

| コンテナによっては周期が一定にならない場合があります。
| そのため、計測したログ間隔のうち最大値を周期として採用し、その値を基準に閾値を検討します。
| 例で取り上げた ``ita-by-ansible-execute`` のバックヤード処理の周期は、最大で約8秒でした。

.. code-block:: text

   2025-06-01 10:00:00,123 INFO  Backyard job has started
   2025-06-01 10:00:07,456 INFO  Backyard job has started (差分: 7.333秒)
   2025-06-01 10:00:13,523 INFO  Backyard job has started (差分: 6.067秒)
   2025-06-01 10:00:21,889 INFO  Backyard job has started (差分: 8.366秒)
   2025-06-01 10:00:28,456 INFO  Backyard job has started (差分: 6.567秒)
   2025-06-01 10:00:34,123 INFO  Backyard job has started (差分: 5.667秒)


設定方針
--------
| 本シナリオでは、「障害を15分以内に検知できるように運用したい」という顧客要件を前提としています。
| この要件を踏まえ、バックヤード処理の最大周期を計測したところ、実測値は約8秒でした。
| そのため、Probeの閾値を 15分（900秒）に設定した場合でも、正常に稼働しているバックヤード処理が誤ってProbe失敗と誤判定されることなく、顧客要件を満たせると判断しました。
| 
| 以上を踏まえ、本シナリオではProbeの設定値を以下のように変更します。
| 既定値では ``exec.command`` の閾値が 86,400秒（24時間）、 ``periodSeconds`` が 10秒、 ``timeoutSeconds`` が 30秒に設定されています。
| 本シナリオではこれらをそれぞれ 900秒・5秒・10秒に変更します。
| 
| なお、``startupProbe`` は、起動後に一度でも ``/tmp/liveness`` が書き込まれたかを確認するためのProbeです。
| そのため、今回変更する ``exec.command`` の閾値・ ``periodSeconds`` ・ ``timeoutSeconds`` の3項目については、 ``livenessProbe`` と同じ値に揃えます。
| 
| ``/tmp/liveness`` はバックヤード処理が正常に動作している間、定期的に更新されます。
| Probeはこの最終更新時刻を参照し、最後に更新されてから 900秒以上が経過した（更新が止まっている）場合にProbe失敗と判定します。
| また、コンテナの再起動は ``failureThreshold`` の連続失敗回数によって決定されます。
| 今回の設定では ``livenessProbe`` が5秒間隔で実行されるため、更新停止から約900秒経過後、さらに最大 15秒（5秒 × 3回連続失敗）程度でコンテナ再起動が実施されます。



カスタマイズ例
==============

| 設定方針に基づき、マニフェストファイルを以下のように変更します。

.. code-block:: diff

   startupProbe:
     exec:
       command:
         - sh
         - -c
   -     - test "$(cat /tmp/liveness 2>/dev/null || echo 0)" -gt "$(($(date +%s) - 86400))"
   +     - test "$(cat /tmp/liveness 2>/dev/null || echo 0)" -gt "$(($(date +%s) - 900))"
   - timeoutSeconds: 30
   + timeoutSeconds: 10
   - periodSeconds: 10
   + periodSeconds: 5
     successThreshold: 1
     failureThreshold: 30

   livenessProbe:
     exec:
       command:
         - sh
         - -c
   -     - test "$(cat /tmp/liveness 2>/dev/null || echo 0)" -gt "$(($(date +%s) - 86400))"
   +     - test "$(cat /tmp/liveness 2>/dev/null || echo 0)" -gt "$(($(date +%s) - 900))"
   - timeoutSeconds: 30
   + timeoutSeconds: 10
   - periodSeconds: 10
   + periodSeconds: 5
     successThreshold: 1
     failureThreshold: 3


| 上記設定による異常判定の流れは以下のとおりです。
|
| ``startupProbe`` は 900秒超過後に失敗が連続30回（約150秒）で異常判定、
| ``livenessProbe`` は 900秒超過後に失敗が連続3回（約15秒）で異常判定となります。



パラメータ（デフォルト値）
==========================

| 以下はバックヤードコンテナに設定されているデフォルト値です。

.. list-table::
   :header-rows: 1
   :widths: 32 14 54
   :align: left

   * - パラメータ
     - デフォルト値
     - 説明
   * - ``exec.command`` 内の閾値秒数
     - 86,400
     - ``/tmp/liveness`` の最終更新からの許容秒数（24時間）
   * - ``timeoutSeconds``
     - 30
     - Probe1回あたりのタイムアウト秒数
   * - ``periodSeconds``
     - 10
     - Probe実行間隔（秒）
   * - ``successThreshold``
     - 1
     - 成功とみなす最小連続回数
   * - ``failureThreshold`` (startupProbe)
     - 30
     - 起動時の失敗許容回数（デフォルト起動猶予の目安: 10 × 30 = 約300秒）
   * - ``failureThreshold`` (livenessProbe)
     - 3
     - 稼働時の失敗許容回数（デフォルトでの再起動判断目安: 10 × 3 = 約30秒）


期待できる効果（運用状況により変動）
=====================================

- **異常検知の明確化**

  ``/tmp/liveness`` の更新停止を基準に、停止・ハングアップを判定しやすくなります。

- **自動復旧**

  ``livenessProbe`` により、異常時の自動再起動につなげやすくなります。


運用時の注意
============

- カスタマイズ後の値はあくまで参考値です。最適値は環境ごとに異なります。
- 閾値が長すぎると、障害検知が遅くなります。
