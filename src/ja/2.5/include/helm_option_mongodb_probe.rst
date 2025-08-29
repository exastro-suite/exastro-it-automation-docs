
.. list-table:: MongodbコンテナのProbeオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - パラメータ
     - 説明
     - 変更
     - デフォルト値・選択可能な設定値
   * - exastro-platform.mariadb.livenessProbe.tcpSocket.port
     - MongoDBへアクセスするためのport番号
     - 不可
     - port-mongo
   * - exastro-platform.mariadb.livenessProbe.initialDelaySeconds
     - 最初のlivenessProbeを実行するまでの待機時間(秒)
     - 可
     - 5
   * - exastro-platform.mariadb.livenessProbe.periodSeconds
     - livenessProbeを実行する間隔(秒)
     - 可
     - 10
   * - exastro-platform.mariadb.livenessProbe.timeoutSeconds
     - livenessProbeがタイムアウトになるまでの時間(秒)
     - 可
     - 3
   * - exastro-platform.mariadb.readinessProbe.tcpSocket.port
     - MongoDBへアクセスするためのport番号
     - 不可
     - port-mongo
   * - exastro-platform.mariadb.readinessProbe.initialDelaySeconds
     - 最初のreadinessProbeを実行するまでの待機時間(秒)
     - 可
     - 5
   * - exastro-platform.mariadb.readinessProbe.periodSeconds
     - readinessProbeを実行する間隔(秒)
     - 可
     - 10
   * - exastro-platform.mariadb.readinessProbe.timeoutSeconds
     - readinessProbeがタイムアウトになるまでの時間(秒)
     - 可
     - 3
