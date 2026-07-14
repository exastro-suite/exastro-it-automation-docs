=======================
WebサーバへPlaybook実行
=======================

ファイル管理のキーペアを変更​
==============================

1. ITAに「インフラ管理者」でログインする

   .. tip::
      | 実行者：インフラ管理者
      | ユーザー名：infra-admin
      | パスワード：password

2. メインメニューの「Ansible共通」アイコンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/playbook/playbook_file_keypair_01.png
      :width: 4.72721in
      :height: 4.6604in

3. 「ファイル管理」へ移動して「フィルタ」ボタンを押下する

4. 「ファイル埋込変数名」が”CPF_KEY_PAIR_BASTION”と”CPF_KEY_PAIR_WEB”のレコードをチェックして「編集」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/playbook/playbook_file_keypair_02.png
      :width: 4.72721in
      :height: 4.6604in

5. 「ファイル埋込変数名」が”CPF_KEY_PAIR_BASTION”のレコードの「ファイル素材」をクリックする

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/playbook/playbook_file_keypair_03.png
      :width: 4.72721in
      :height: 4.6604in

6. ファイル選択のダイアログで「:ref:`1stモデル導入手順/AWS環境設定<aws_environment_configuration>`」の②で取得した「踏み台サーバ」のキーペアファイルを選択して「開く」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/playbook/playbook_file_keypair_04.png
      :width: 4.72721in
      :height: 4.6604in

7. 「ファイル埋込変数名」が”CPF_KEY_PAIR_WEB”のレコードの「ファイル素材」をクリックする

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/playbook/playbook_file_keypair_05.png
      :width: 4.72721in
      :height: 4.6604in

8. ファイル選択のダイアログで「:ref:`1stモデル導入手順/AWS環境設定<aws_environment_configuration>`」の②で取得した「Webサーバ」のキーペアファイルを選択して「開く」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/playbook/playbook_file_keypair_06.png
      :width: 4.72721in
      :height: 4.6604in

9. 「編集確認」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/playbook/playbook_file_keypair_07.png
      :width: 4.72721in
      :height: 4.6604in

10. 「編集確認」ポップアップ画面の「編集反映」ボタンを押下する

    .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/playbook/playbook_file_keypair_07.png
       :width: 4.72721in
       :height: 4.6604in


Conductor実行
=============

1. ITAに「インフラ管理者」でログインする

   .. tip::
      | 実行者：インフラ管理者
      | ユーザー名：infra-admin
      | パスワード：password

2. メインメニューの「Conductor」アイコンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/playbook/playbook_conductor_01.png
      :width: 4.72721in
      :height: 4.6604in

3. | 「Conductor一覧」画面の「Conductor名称」が”WebサーバへPlaybook実行”のレコードの「詳細」ボタンを押下する。
   | フィルタの「Conductor名称」で検索すると間違いがない

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/playbook/playbook_conductor_02.png
      :width: 4.72721in
      :height: 4.6604in

4. 「Conductor編集/作業実行」画面の「作業実行」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/playbook/playbook_conductor_03.png
      :width: 4.72721in
      :height: 4.6604in

5. 「作業実行設定」ポップアップ画面の「オペレーション選択」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/playbook/playbook_conductor_04.png
      :width: 4.72721in
      :height: 4.6604in

6. 「オペレーション選択」ポップアップ画面の”環境A(1stモデル)”のレコードを選択して「選択決定」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/playbook/playbook_conductor_05.png
      :width: 4.72721in
      :height: 4.6604in

7. 「作業実行設定」ポップアップ画面の「作業実行」ボタンを押下する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/playbook/playbook_conductor_06.png
      :width: 4.72721in
      :height: 4.6604in

8. ステータスに「正常終了」が表示されることを確認する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/playbook/playbook_conductor_07.png
      :width: 4.72721in
      :height: 4.6604in


Webページの確認
===============

1. ブラウザのアドレスバーに「:ref:`auto_scaling_aws_resource_check_after_conductor`」の（※3）でメモしたELB DNS名を張り付けてEnterキーを押下する

2. 下図の画面に画像が表示されることを確認する

   .. figure:: /images/ja/templates/deploymentGuide/system_build_and_update_guide/playbook/playbook_web_page.png
      :width: 4.72721in
      :height: 4.6604in


