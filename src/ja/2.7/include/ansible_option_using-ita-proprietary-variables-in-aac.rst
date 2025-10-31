
| 下記ITA独自変数を利用してファイル出力をするPlyabookを含むMovementをクラスタ構成のAnsible Automation Controllerで作業実行した場合の留意事項について記載します。
|
| 　対象のITA独自変数
| 　・ __workflowdir_\_
| 　・ __conductor_workflowdir_\_
| 　・ __movement_status_filepath_\_
| 　・ __parameters_dir_for_epc_\_
| 　・ __parameters_file_dir_for_epc_\_
| 　・ __parameter_dir_\_
| 　・ __parameters_file_dir_\_
|

ITA独自変数を利用して作成したファイルの取り扱い
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ITA独自変数を利用して作成したファイルの出力先ディレクトリパスはAnsible Automation ControllerのITA作業用ディレクトリ配下「/var/lib/exastro」に設定されます。Movement実行前に結果データをAnsible Automation Controller（各実行ノード）のITA作業用ディレクトリ配下「/var/lib/exastro」にファイル転送します。Movement実行でここに作成されたファイルは、Movement実行後に各Ansible Automation Controller（各実行ノード）より結果データに上書きモードでファイル転送します。同一ファイル名でファイルを作成している場合、更新したファイルが結果データに正しく反映されない場合があります。

.. figure:: /images/ja/ansible_common/template_management/original_hensu.png
   :width: 7.49606in
   :height: 5.84593in
   :align: center

#. | Movementをconductorから実行している場合、Movement実行前に該当conductorインスタンス配下のファイルをAnsible Automation Controller（各実行ノード）のITA作業用ディレクトリ配下にファイル転送
#. | Movement実行前に該当Movement配下のファイルをAnsible Automation Controller（各実行ノード）のITA作業用ディレクトリにファイル転送
#. | Movementをconductorから実行している場合、Movement実行後にAnsible Automation Controller（各実行ノード）のITA作業用ディレクトリの該当Movementで作成したファイルを結果データにファイル転送
#. | Movement実行後にAnsible Automation Controller（各実行ノード）のITA作業用ディレクトリの該当conductorインスタンス配下に作成したファイルを結果データにファイル転送


留意事項
^^^^^^^^

#. | ファイル名はansible「inventory_hostname」を含めるなどして、Movementに紐づいている作業対象ホスト毎に同一ファイル名に出力しないように工夫してください。
#. | conductorから実行する場合、複数のMovementで同一ファイル名への出力しないよう工夫してください。

