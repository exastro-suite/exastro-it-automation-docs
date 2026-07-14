| Use the command below to check whether the installation and service startup have finished.

.. code-block:: bash
    :caption: Command

    # Retrieve the list of Pods
    kubectl get po --namespace exastro

| If the system has started successfully, :kbd:`ita-migration-xxx` and :kbd:`platform-migration-xxx` will show as :kbd:`Completed`, and all other pods will be in the :kbd:`Running` state.
| Note: It may take a few minutes for the system to start up completely.

.. code-block:: bash
   :caption: Output

   NAME                                                      READY   STATUS      RESTARTS   AGE
   ita-api-admin-6b8567596d-rgjms                            1/1     Running     0          7h40m
   ita-api-oase-receiver-6b74bdff6-zmcrw                     1/1     Running     0          7h40m
   ita-api-organization-559d7d8f89-ptphh                     1/1     Running     0          7h40m
   ita-by-ansible-execute-5dc444c999-w6gmr                   1/1     Running     0          7h40m
   ita-by-ansible-legacy-role-vars-listup-6d8f98895f-bvjgn   1/1     Running     0          7h40m
   ita-by-ansible-legacy-vars-listup-6ccd997cf-hvkzq         1/1     Running     0          7h40m
   ita-by-ansible-pioneer-vars-listup-6cfcfd4479-8bqst       1/1     Running     0          7h40m
   ita-by-ansible-towermaster-sync-6759486f8f-wrbbp          1/1     Running     0          7h40m
   ita-by-cicd-for-iac-7b75cc56f5-rrrvg                      1/1     Running     0          7h40m
   ita-by-collector-7748d54f59-8j5r2                         1/1     Running     0          7h40m
   ita-by-conductor-regularly-779ff79775-xnt29               1/1     Running     0          7h40m
   ita-by-conductor-synchronize-5d5485479-5df54              1/1     Running     0          7h40m
   ita-by-excel-export-import-6f84f97dcf-hlm4h               1/1     Running     0          7h40m
   ita-by-hostgroup-split-59b698f479-cxggd                   1/1     Running     0          7h40m
   ita-by-menu-create-796bdc9c75-l79zq                       1/1     Running     0          7h40m
   ita-by-menu-export-import-849d796bb5-5mpw2                1/1     Running     0          7h40m
   ita-by-oase-conclusion-b484595d7-kssv4                    1/1     Running     0          7h40m
   ita-by-terraform-cli-execute-769d874d7-sknn6              1/1     Running     0          7h40m
   ita-by-terraform-cli-vars-listup-7f589cdddc-g5xz6         1/1     Running     0          7h40m
   ita-by-terraform-cloud-ep-execute-7f8b6d87cc-kfmfv        1/1     Running     0          7h40m
   ita-by-terraform-cloud-ep-vars-listup-6cccbd4899-6frcn    1/1     Running     0          7h40m
   ita-migration-1-3-6-lydz                                  0/1     Completed   0          7h40m
   ita-web-server-b4cd4cdf8-wkx78                            1/1     Running     0          7h40m
   keycloak-0                                                1/1     Running     0          7h40m
   mariadb-778786f7d-ss4cq                                   1/1     Running     0          7h40m
   mongo-0                                                   1/1     Running     0          7h40m
   platform-api-ffb78f578-svd5t                              1/1     Running     0          7h40m
   platform-auth-75895d784-9hhxw                             1/1     Running     0          7h40m
   platform-job-864c47d4f-8vvvq                              1/1     Running     0          7h40m
   platform-migration-1-8-0-rjwr                             0/1     Completed   0          7h40m
   platform-web-6644884657-dmwp6                             1/1     Running     0          7h40m
