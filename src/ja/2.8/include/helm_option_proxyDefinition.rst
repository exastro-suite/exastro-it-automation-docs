.. warning::
     | Exastro IT Automation Ver.2.4以上、Exastro Platform Ver.1.8.1以上で利用可能
     | Proxy環境下で、IdP連携を使用する際に、必要な設定となっております。
     | その他の機能については、本設定は適用されません。

.. list-table:: 共通設定 (Proxy設定) のオプションパラメータ
   :widths: 25 25 10 20
   :header-rows: 1
   :align: left
   :class: filter-table

   * - | パラメータ
     - | 説明
     - | 変更
     - | デフォルト値・選択可能な設定値
   * - | global.proxyDefinition.name
     - | Proxy定義名
     - 不可
     - proxy-global
   * - | global.proxyDefinition.enabled
     - | Proxy定義の利用有無
     - 可
     - false
   * - | global.proxyDefinition.config.HTTP_PROXY
     - | Proxy定義のHTTP_PROXY設定
     - 可
     - ""
   * - | global.proxyDefinition.config.HTTPS_PROXY
     - | Proxy定義のHTTPS_PROXY設定
     - 可
     - ""
   * - | global.proxyDefinition.config.NO_PROXY
     - | Proxy定義のNO_PROXY設定
       | 追加設定がある場合のみ変更してください
     - 可
     - "127.0.0.1,localhost,keycloak,platform-auth,platform-api,ita-api-admin,ita-api-organization,ita-api-oase-receiver,ita-api-ansible-execution-receiver"
