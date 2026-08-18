
.. list-table:: データベースコンテナのProbeオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - exastro-platform.mariadb.livenessProbe.exec.command
     - livenessProbee実行時に行うコマンド
     - 不可
     - healthcheck.sh --su-mysql --connect --innodb_initialized
   * - exastro-platform.mariadb.livenessProbe.initialDelaySeconds
     - 最初のlivenessProbeを実行するまでの待機時間(秒)
     - 可
     - 30
   * - exastro-platform.mariadb.livenessProbe.periodSeconds
     - livenessProbeを実行する間隔(秒)
     - 可
     - 10
   * - exastro-platform.mariadb.livenessProbe.timeoutSeconds
     - livenessProbeがタイムアウトになるまでの時間(秒)
     - 可
     - 3
   * - exastro-platform.mariadb.readinessProbe.exec.command
     - readinessProbe実行時に行うコマンド
     - 不可
     - healthcheck.sh --su-mysql --connect --innodb_initialized
   * - exastro-platform.mariadb.readinessProbe.initialDelaySeconds
     - 最初のreadinessProbeを実行するまでの待機時間(秒)
     - 可
     - 30
   * - exastro-platform.mariadb.readinessProbe.periodSeconds
     - readinessProbeを実行する間隔(秒)
     - 可
     - 10
   * - exastro-platform.mariadb.readinessProbe.timeoutSeconds
     - readinessProbeがタイムアウトになるまでの時間(秒)
     - 可
     - 3
