
| Exastro システムのパスワードや認証情報といった機密情報はすべて暗号化されています。
| 必ず、下記で取得した暗号化キーをバックアップして、適切に保管してください。

.. danger::
   | 暗号化キーを紛失した場合、バックアップデータからシステムを復旧した際にデータの復号ができなくなります。

.. code-block:: bash
   :caption: コマンド（Exastro IT Automation ENCRYPT_KEY）

   kubectl get secret ita-secret-ita-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

.. code-block:: bash
   :caption: 出力結果

   JnIoXzJtPic2MXFqRl1yI1chMj8hWzQrNypmVn41Pk8=

.. code-block:: bash
   :caption: コマンド（Exastro Platform ENCRYPT_KEY）

   kubectl get secret platform-secret-pf-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

.. code-block:: bash
   :caption: 出力結果

   bHFZe2VEVVM2PmFeQDMqNG4oZT4lTlglLjJJekxBTHE=
