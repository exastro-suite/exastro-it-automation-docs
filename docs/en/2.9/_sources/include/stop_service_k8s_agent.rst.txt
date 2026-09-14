
1. Checking the number of running Pods

   | Check the number of running Pods before starting the operation and record their status.

   .. code-block:: bash
     :caption: Command

     RS_AG=`kubectl get deploy ita-ag-oase -o jsonpath='{@.spec.replicas}{"\n"}' --namespace exastro`

2. Stopping background processes

   | Set the number of running Pods to zero to stop database updates.

   .. code-block:: bash
     :caption: Command

     kubectl scale deployment ita-ag-oase --namespace exastro --replicas=0

3. Check the number of running Pods

   | Verify that the number of target Pods stopped above has reached zero.

   .. code-block:: bash
     :caption: Command

     kubectl get deployment --namespace exastro

   .. code-block:: bash
     :caption: Execution result

     NAME                                     READY   UP-TO-DATE   AVAILABLE   AGE
     ita-ag-oase                              0/1     1            1           29m
