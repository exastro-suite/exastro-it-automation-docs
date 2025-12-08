1. サービス再開

   | サービス停止時に取得した各 Deployment の Pod 起動数を元に戻します。

   .. code-block:: bash
      :caption: コマンド

      kubectl scale deploy,statefulset -n exastro --replicas=1 --all=true

   | 個別にreplicas数を設定する場合は以下のコマンドで再開します。
   | サービス名は、停止時に確認した内容を入力してください。

   .. code-block:: bash
      :caption: コマンド

      kubectl scale deployment [サービス名] -n exastro --replicas=[replicas数]

   | Ver.2.4.0以降、サービス名：keycloak、mongodbについては以下のコマンドで再開します。

   .. code-block:: bash
      :caption: コマンド

      kubectl scale statefulset [サービス名] -n exastro --replicas=[replicas数]

   .. tip::
      | サービス名を複数指定する場合は、カンマ区切りで複数のサービス名を指定することができます。


2. Pod 起動数の確認

   | 上記で起動した対象の Pod 数が元に戻りすべて :kbd:`READY` になっていることを確認します。

   .. code-block:: bash
      :caption: コマンド

      kubectl get deploy,statefulset -n exastro

   .. code-block:: bash
      :caption: 実行結果

      NAME                                                     READY   UP-TO-DATE   AVAILABLE   AGE
      deployment.apps/ita-api-admin                            1/1     1            1           26h
      deployment.apps/ita-api-oase-receiver                    1/1     1            1           26h
      deployment.apps/ita-api-organization                     1/1     1            1           26h
      deployment.apps/ita-by-ansible-execute                   1/1     1            1           26h
      deployment.apps/ita-by-ansible-legacy-role-vars-listup   1/1     1            1           26h
      deployment.apps/ita-by-ansible-legacy-vars-listup        1/1     1            1           26h
      deployment.apps/ita-by-ansible-pioneer-vars-listup       1/1     1            1           26h
      deployment.apps/ita-by-ansible-towermaster-sync          1/1     1            1           26h
      deployment.apps/ita-by-cicd-for-iac                      1/1     1            1           26h
      deployment.apps/ita-by-collector                         1/1     1            1           26h
      deployment.apps/ita-by-conductor-regularly               1/1     1            1           26h
      deployment.apps/ita-by-conductor-synchronize             1/1     1            1           26h
      deployment.apps/ita-by-excel-export-import               1/1     1            1           26h
      deployment.apps/ita-by-hostgroup-split                   1/1     1            1           26h
      deployment.apps/ita-by-menu-create                       1/1     1            1           26h
      deployment.apps/ita-by-menu-export-import                1/1     1            1           26h
      deployment.apps/ita-by-oase-conclusion                   1/1     1            1           26h
      deployment.apps/ita-by-terraform-cli-execute             1/1     1            1           26h
      deployment.apps/ita-by-terraform-cli-vars-listup         1/1     1            1           26h
      deployment.apps/ita-by-terraform-cloud-ep-execute        1/1     1            1           26h
      deployment.apps/ita-by-terraform-cloud-ep-vars-listup    1/1     1            1           26h
      deployment.apps/ita-web-server                           1/1     1            1           26h
      deployment.apps/mariadb                                  1/1     1            1           26h
      deployment.apps/platform-api                             1/1     1            1           26h
      deployment.apps/platform-auth                            1/1     1            1           26h
      deployment.apps/platform-job                             1/1     1            1           26h
      deployment.apps/platform-web                             1/1     1            1           26h

      NAME                        READY   AGE
      statefulset.apps/keycloak   1/1     26h
      statefulset.apps/mongo      1/1     26h

   .. warning::
      | バージョンによって、表示されるサービスが異なります。
