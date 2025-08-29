
1. Pod 起動数の確認

   | 作業前の Pod 起動数の確認をし、状態を記録します。

   .. code-block:: bash
     :caption: コマンド

      kubectl get deploy,statefulset -o jsonpath='{range .items[*]}{@.metadata.name}:{@.spec.replicas}{"\n"}' -n exastro

   .. code-block:: bash
      :caption: 実行結果

      ita-api-admin:1
      ita-api-oase-receiver:1
      ita-api-organization:1
      ita-by-ansible-execute:1
      ita-by-ansible-legacy-role-vars-listup:1
      ita-by-ansible-legacy-vars-listup:1
      ita-by-ansible-pioneer-vars-listup:1
      ita-by-ansible-towermaster-sync:1
      ita-by-cicd-for-iac:1
      ita-by-collector:1
      ita-by-conductor-regularly:1
      ita-by-conductor-synchronize:1
      ita-by-excel-export-import:1
      ita-by-hostgroup-split:1
      ita-by-menu-create:1
      ita-by-menu-export-import:1
      ita-by-oase-conclusion:1
      ita-by-terraform-cli-execute:1
      ita-by-terraform-cli-vars-listup:1
      ita-by-terraform-cloud-ep-execute:1
      ita-by-terraform-cloud-ep-vars-listup:1
      ita-web-server:1
      mariadb:1
      platform-api:1
      platform-auth:1
      platform-job:1
      platform-web:1
      keycloak:1
      mongo:1
      :

   | 各Deployment, StatefulSetのサービス名、replicas数が表示されます。

   .. warning::
      | バージョンによって、表示されるサービスが異なります。

2. アプリケーションの停止

   | アプリケーション (platform-auth) の Pod 起動数を 0 に変更し、アクセスを制限します。

   .. code-block:: bash
     :caption: コマンド

     kubectl scale deploy,statefulset -n exastro --replicas=0 --all=true

   .. code-block:: bash
     :caption: 実行結果

     deployment.apps/ita-api-admin scaled
     deployment.apps/ita-api-oase-receiver scaled
     deployment.apps/ita-api-organization scaled
     deployment.apps/ita-by-ansible-execute scaled
     deployment.apps/ita-by-ansible-legacy-role-vars-listup scaled
     deployment.apps/ita-by-ansible-legacy-vars-listup scaled
     deployment.apps/ita-by-ansible-pioneer-vars-listup scaled
     deployment.apps/ita-by-ansible-towermaster-sync scaled
     deployment.apps/ita-by-cicd-for-iac scaled
     deployment.apps/ita-by-collector scaled
     deployment.apps/ita-by-conductor-regularly scaled
     deployment.apps/ita-by-conductor-synchronize scaled
     deployment.apps/ita-by-excel-export-import scaled
     deployment.apps/ita-by-hostgroup-split scaled
     deployment.apps/ita-by-menu-create scaled
     deployment.apps/ita-by-menu-export-import scaled
     deployment.apps/ita-by-oase-conclusion scaled
     deployment.apps/ita-by-terraform-cli-execute scaled
     deployment.apps/ita-by-terraform-cli-vars-listup scaled
     deployment.apps/ita-by-terraform-cloud-ep-execute scaled
     deployment.apps/ita-by-terraform-cloud-ep-vars-listup scaled
     deployment.apps/ita-web-server scaled
     deployment.apps/mariadb scaled
     deployment.apps/platform-api scaled
     deployment.apps/platform-auth scaled
     deployment.apps/platform-job scaled
     deployment.apps/platform-web scaled
     statefulset.apps/keycloak scaled
     statefulset.apps/mongo scaled

   .. warning::
      | バージョンによって、表示されるサービスが異なります。

3. データベースサービスのみ起動

   | 作業のため、データベースのサービスのみ再起動します。

   .. code-block:: bash
     :caption: コマンド

     kubectl scale deployment mariadb -n exastro --replicas=1

   | OASE ドライバをインストールしている場合は、MongoDB のサービスを起動します。

   .. code-block:: bash
     :caption: コマンド

     kubectl scale statefulset mongo -n exastro --replicas=1

4. Pod 起動数の確認

   | データベース以外の Pod 数が 0 になっていることを確認します。

   .. code-block:: bash
     :caption: コマンド

     kubectl get deploy,statefulset -n exastro

   .. code-block:: bash
     :caption: 実行結果

     NAME                                                     READY   UP-TO-DATE   AVAILABLE   AGE
     deployment.apps/ita-api-admin                            0/0     0            0           26h
     deployment.apps/ita-api-oase-receiver                    0/0     0            0           26h
     deployment.apps/ita-api-organization                     0/0     0            0           26h
     deployment.apps/ita-by-ansible-execute                   0/0     0            0           26h
     deployment.apps/ita-by-ansible-legacy-role-vars-listup   0/0     0            0           26h
     deployment.apps/ita-by-ansible-legacy-vars-listup        0/0     0            0           26h
     deployment.apps/ita-by-ansible-pioneer-vars-listup       0/0     0            0           26h
     deployment.apps/ita-by-ansible-towermaster-sync          0/0     0            0           26h
     deployment.apps/ita-by-cicd-for-iac                      0/0     0            0           26h
     deployment.apps/ita-by-collector                         0/0     0            0           26h
     deployment.apps/ita-by-conductor-regularly               0/0     0            0           26h
     deployment.apps/ita-by-conductor-synchronize             0/0     0            0           26h
     deployment.apps/ita-by-excel-export-import               0/0     0            0           26h
     deployment.apps/ita-by-hostgroup-split                   0/0     0            0           26h
     deployment.apps/ita-by-menu-create                       0/0     0            0           26h
     deployment.apps/ita-by-menu-export-import                0/0     0            0           26h
     deployment.apps/ita-by-oase-conclusion                   0/0     0            0           26h
     deployment.apps/ita-by-terraform-cli-execute             0/0     0            0           26h
     deployment.apps/ita-by-terraform-cli-vars-listup         0/0     0            0           26h
     deployment.apps/ita-by-terraform-cloud-ep-execute        0/0     0            0           26h
     deployment.apps/ita-by-terraform-cloud-ep-vars-listup    0/0     0            0           26h
     deployment.apps/ita-web-server                           0/0     0            0           26h
     deployment.apps/mariadb                                  1/1     1            1           26h
     deployment.apps/platform-api                             0/0     0            0           26h
     deployment.apps/platform-auth                            0/0     0            0           26h
     deployment.apps/platform-job                             0/0     0            0           26h
     deployment.apps/platform-web                             0/0     0            0           26h

     NAME                        READY   AGE
     statefulset.apps/keycloak   0/0     25h
     statefulset.apps/mongo      1/1     26h

   .. warning::
      | バージョンによって、表示されるサービスが異なります。
