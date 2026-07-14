
1. Service Resumption

   | Restore the number of running Pods for each Deployment to the values recorded at the time of service shutdown.

   .. code-block:: bash
     :caption: Command

     kubectl scale deployment ita-ag-oase --namespace exastro --replicas=${RS_AG}

2. Check the number of running Pods

   | Verify that the number of target Pods started above has been restored and all are in the READY state.

   .. code-block:: bash
     :caption: Command

     kubectl get deployment --namespace exastro

   .. code-block:: bash
     :caption: Execution result

     NAME                                     READY   UP-TO-DATE   AVAILABLE   AGE
     ita-ag-oase                              1/1     1            1           29m
