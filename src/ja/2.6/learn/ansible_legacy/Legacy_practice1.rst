=======================
ユーザー管理 (演習問題)
=======================

| 本シナリオでは、:doc:`前のシナリオ <Legacy_scenario3>` までに構築した Web サーバに対して、ユーザーを管理できるようにしましょう。
| 利用する Ansible Playbook は、下記の2つです。

.. code-block:: bash
   :caption: group.yml

   ---
   - name: create/update group
     group:
       name: "{{ item.0 }}"
       gid: "{{ item.1 }}"
     with_together:
       - "{{ group_name }}"
       - "{{ group_id }}"
       - "{{ group_action }}"
     when: item.2 == 'present'

   - name: create/update group
     group:
       name: "{{ item.0 }}"
       gid: "{{ item.1 }}"
     with_together:
       - "{{ group_name }}"
       - "{{ group_id }}"
       - "{{ group_action }}"
     when: item.2 == 'absent'

.. code-block:: bash
   :caption: user.yml

   ---
   - name: create user
     user:
       name: "{{ item.0 }}"
       uid: "{{ item.1 }}"
       group: "{{ item.2 }}"
       comment: "{{ item.3 }}"
       home: "{{ item.4 }}"
       shell: "{{ item.5 }}"
       password: "{{ item.6 | password_hash('sha512') }}"
     with_together:
       - "{{ user_name }}"
       - "{{ user_id }}"
       - "{{ group }}"
       - "{{ comment }}"
       - "{{ home_dir }}"
       - "{{ login_shell }}"
       - "{{ password }}"
       - "{{ user_action }}"
       - "{{ password_apply }}"
     when: item.7 == 'present' and password_apply

   - name: create user
     user:
       name: "{{ item.0 }}"
       uid: "{{ item.1 }}"
       group: "{{ item.2 }}"
       comment: "{{ item.3 }}"
       home: "{{ item.4 }}"
       shell: "{{ item.5 }}"
     with_together:
       - "{{ user_name }}"
       - "{{ user_id }}"
       - "{{ group }}"
       - "{{ comment }}"
       - "{{ home_dir }}"
       - "{{ login_shell }}"
       - "{{ user_action }}"
       - "{{ password_apply }}"
     when: item.6 == 'present' and not password_apply

   - name: delete user
     user:
       state: absent
       name: "{{ item.0 }}"
       remove: 'yes'
     with_together:
       - "{{ user_name }}"
       - "{{ user_action }}"
     when: item.1 == 'absent'

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

| :doc:`Legacy_answer1`
