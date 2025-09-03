| コマンドラインから以下のコマンドを入力して、インストール（サービス起動）が完了していることを確認します。

.. code-block:: bash
    :caption: コマンド

    # Pod の一覧を取得
    kubectl get po --namespace exastro

| 正常に起動している場合は、:kbd:`ita-migration-xxx` と :kbd:`platform-migration-xxx` が :kbd:`Completed` 、その他すべてが :kbd:`Running` となります。
| ※正常に起動するまで数分かかる場合があります。

.. note::
   | 以下のPODについては :kbd:`READY` が 0/1のままで、メンテナンスモードを解除後に :kbd:`READY` は 1/1となります。
   | ita-by-conductor-regularly-xxxxxxxxxx-xxxxx

.. code-block:: bash
   :caption: 出力結果

   NAME                                                      READY   STATUS      RESTARTS   AGE
   ita-api-admin-dcf7c8768-wkwtx                             1/1     Running     0          3m34s
   ita-api-ansible-execution-receiver-7776748868-kt7b2       1/1     Running     0          3m34s
   ita-api-oase-receiver-75588c6cff-jbmqr                    1/1     Running     0          3m34s
   ita-api-organization-645954959f-lpskv                     1/1     Running     0          3m34s
   ita-by-ansible-execute-dbd8d7dbc-8jk76                    1/1     Running     0          3m34s
   ita-by-ansible-legacy-role-vars-listup-6df9c5dfbf-qhqdd   1/1     Running     0          3m34s
   ita-by-ansible-legacy-vars-listup-6565dcd75f-ngz92        1/1     Running     0          3m34s
   ita-by-ansible-pioneer-vars-listup-56bcbd8fd5-6dqst       1/1     Running     0          3m34s
   ita-by-ansible-towermaster-sync-765fbc4b67-td9cr          1/1     Running     0          3m34s
   ita-by-cicd-for-iac-67f9f6bcb7-fdfk2                      1/1     Running     0          3m34s
   ita-by-collector-bf8bddcf-9pl9g                           1/1     Running     0          3m33s
   ita-by-conductor-regularly-5c7689985f-7rl4n               0/1     Running     0          3m33s
   ita-by-conductor-synchronize-857d7cb585-cnpmq             1/1     Running     0          3m33s
   ita-by-excel-export-import-6975d6d965-sdlhw               1/1     Running     0          3m33s
   ita-by-hostgroup-split-7cbfcc6ff7-lvtxq                   1/1     Running     0          3m33s
   ita-by-menu-create-785769547c-9jr4f                       1/1     Running     0          3m32s
   ita-by-menu-export-import-bccfcbd67-t5zpz                 1/1     Running     0          3m32s
   ita-by-oase-conclusion-6cb7897cb8-hnsrm                   1/1     Running     0          3m32s
   ita-by-terraform-cli-execute-7dc5db9f75-646mf             1/1     Running     0          3m32s
   ita-by-terraform-cli-vars-listup-85498994df-qv6dj         1/1     Running     0          3m31s
   ita-by-terraform-cloud-ep-execute-bcc864cf9-4qqhx         1/1     Running     0          3m31s
   ita-by-terraform-cloud-ep-vars-listup-c4fcd48dc-g55rl     1/1     Running     0          3m31s
   ita-migration-2-6-1-suhp                                  0/1     Completed   0          24m
   ita-web-server-5fcccd684f-lfxmm                           1/1     Running     0          3m31s
   keycloak-0                                                1/1     Running     0          3m30s
   mariadb-5945c44d44-djxkl                                  1/1     Running     0          3m31s
   mongo-0                                                   1/1     Running     0          3m30s
   platform-api-7fd9c9fb6d-njt7j                             1/1     Running     0          3m30s
   platform-auth-84c55fbc64-tkb4f                            1/1     Running     0          3m30s
   platform-job-555d7c76d5-skmzr                             1/1     Running     0          3m30s
   platform-migration-1-10-0-oquu                            0/1     Completed   0          24m
   platform-web-5594fcfb5d-kzgs6                             1/1     Running     0          3m30s
