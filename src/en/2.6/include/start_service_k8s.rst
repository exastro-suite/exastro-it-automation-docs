
1. Service resumption

   | Restore the number of Pods for each Deployment to the values recorded at the time of service shutdown.

   .. code-block:: bash
      :caption: Command

      kubectl scale deploy,statefulset -n exastro --replicas=1 --all=true

   | To resume with individually specified replica counts, use the following command.
   | Enter the service name that was confirmed when the service was stopped.

   .. code-block:: bash
      :caption: Command

      kubectl scale deployment [Service Name] -n exastro --replicas=[replicas数]

   | For version 2.4.0 and later, use the following commands to resume the services 'keycloak' and 'mongodb'.

   .. code-block:: bash
      :caption: Command

      kubectl scale statefulset [Service Name] -n exastro --replicas=[replicas数]

   .. tip::
      | To specify multiple service names, separate them using commas.


2. Check the number of running Pods

   | Verify that the number of target Pods started above has been restored and all are in the READY state.

   .. code-block:: bash
      :caption: Command

      kubectl get deploy,statefulset -n exastro

   .. code-block:: bash
      :caption: Execution result

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
      | The displayed services vary depending on the version.
