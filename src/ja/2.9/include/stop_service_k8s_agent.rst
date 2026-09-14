
1. Pod 起動数の確認

   | 作業前の Pod 起動数の確認をし、状態を記録します。

   .. code-block:: bash
     :caption: コマンド

     RS_AG=`kubectl get deploy ita-ag-oase -o jsonpath='{@.spec.replicas}{"\n"}' --namespace exastro`

2. バックヤード処理の停止

   | Pod 起動数を 0 に変更し、データベースの更新を停止します。

   .. code-block:: bash
     :caption: コマンド

     kubectl scale deployment ita-ag-oase --namespace exastro --replicas=0

3. Pod 起動数の確認

   | 上記で停止した対象の Pod 数が 0 になっていることを確認

   .. code-block:: bash
     :caption: コマンド

     kubectl get deployment --namespace exastro

   .. code-block:: bash
     :caption: 実行結果

     NAME                                     READY   UP-TO-DATE   AVAILABLE   AGE
     ita-ag-oase                              0/1     1            1           29m
