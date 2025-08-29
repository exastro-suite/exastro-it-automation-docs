
1. サービス再開

   | サービス停止時に取得した各 Deployment の Pod 起動数を元に戻します。

   .. code-block:: bash
     :caption: コマンド

     kubectl scale deployment ita-ag-oase --namespace exastro --replicas=${RS_AG}

2. Pod 起動数の確認

   | 上記で起動した対象の Pod 数が元に戻りすべて :kbd:`READY` になっていることを確認

   .. code-block:: bash
     :caption: コマンド

     kubectl get deployment --namespace exastro

   .. code-block:: bash
     :caption: 実行結果

     NAME                                     READY   UP-TO-DATE   AVAILABLE   AGE
     ita-ag-oase                              1/1     1            1           29m
