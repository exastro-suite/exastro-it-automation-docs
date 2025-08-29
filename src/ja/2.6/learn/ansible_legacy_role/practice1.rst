=======================
ユーザー管理 (演習問題)
=======================

| 本シナリオでは、:doc:`前のシナリオ <scenario3>` までに構築した Web サーバに対して、ユーザーを管理できるようにしましょう。
| 利用する Ansible Role パッケージは、下記の2つです。

- `ユーザー設定 <https://github.com/exastro-playbook-collection/OS-RHEL8/tree/master/RH_user/OS_build>`_
- `グループ設定 <https://github.com/exastro-playbook-collection/OS-RHEL8/tree/master/RH_group/OS_build>`_

問題
====

| 下記のようなユーザを Exastro IT Automation を使って管理できるようにしてください。
| また、その際に、ユーザー管理だけではなく、ホスト名設定、パッケージ管理も併せて実施できる様にしてください。

.. list-table:: ユーザー情報
  :widths: 10 10 10 10
  :header-rows: 1

  * - ユーザー名
    - ユーザーID
    - グループ名
    - ログインパスワード
  * - wwwuser01
    - 10001
    - www
    - password01
  * - wwwuser01
    - 10002
    - www
    - password02
  * - appuser01
    - 20001
    - app
    - password01
  * - appuser01
    - 20002
    - app
    - password02


解答
====

| :doc:`answer1`
