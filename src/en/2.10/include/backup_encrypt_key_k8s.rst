
| All sensitive information, such as passwords and authentication credentials in the Exastro system, is encrypted.
| Be sure to back up the encryption key obtained below and store it securely.

.. danger::
   | If you lose the encryption key, it will not be possible to decrypt the data during system recovery from backup.

.. code-block:: bash
   :caption: Command

   # Exastro IT Automation ENCRYPT_KEY
   kubectl get secret ita-secret-ita-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

.. code-block:: bash
   :caption: Output Results

   JnIoXzJtPic2MXFqRl1yI1chMj8hWzQrNypmVn41Pk8=

.. code-block:: bash
   :caption: Command

   # Exastro Platform ENCRYPT_KEY
   kubectl get secret platform-secret-pf-global --namespace exastro -o jsonpath='{.data.ENCRYPT_KEY}' | base64 -d

.. code-block:: bash
   :caption: Output Results

   bHFZe2VEVVM2PmFeQDMqNG4oZT4lTlglLjJJekxBTHE=
