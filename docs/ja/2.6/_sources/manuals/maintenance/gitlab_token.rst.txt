============================
Gitlab認証トークンの更新手順
============================

目的
====

| Gitlabのバージョン16からアクセストークンの有効期限が（有効期限が設定されていなかったものも含めて）1年以内になりました。
| （参照：https://docs.gitlab.com/update/deprecations/#non-expiring-access-tokens ）

| Exastroでは、Gitlabのルートトークンを使用して、Organization作成時にGitlabのパーソナルアクセストークンを生成しています。
| ルートトークンの有効期限が切れてしまうことで、新規Organization作成時にGitlabのパーソナルアクセストークンを生成できなくなります。
| また、Organization作成時に生成したGitlabのパーソナルアクセストークンの有効期限が切れてしまうことで、Ansible Automation Platform を用いたAnsible作業実行ができなくなります。
| 上記問題を解決する機能を提供するまでの運用回避策として、本頁では手動でのトークン更新手順を説明します。


前提条件
========

| 本頁で説明するGitlabトークンの更新手順では、下記の前提条件を満たしている必要があります。

条件
----

- | ITAが使用しているDBに対してレコード操作できること

- | 下記のいずれかの条件を満たしていること

  - Gitlabをブラウザで表示でき、ルートユーザとしてログインができること

  - Gitlabを動作させているホスト（またはコンテナ内）で :command:`gitlab-rails` が実行できること


概要
====

| 大まかな手順の流れは下記の通りです。

#. ルートトークンの有効期限切れ対応

   #. Gitlab側でルートトークンを新規発行
   #. 新規発行したルートトークンをITAに反映
  
#. Organization毎のパーソナルアクセストークンの有効期限切れ対応

   #. Gitlab側でパーソナルアクセストークンを新規発行
   #. 新規発行したパーソナルアクセストークンをITAに反映

.. danger::
  | 本手順では、サービスの一時的な停止が発生する可能性があります。


ルートトークンの有効期限切れ対応
================================

| 本頁で説明するコマンド例及び実行結果については下記条件で記載しています。

- | Gitlabのルートユーザ名：root


Gitlab側でルートトークンを新規発行
----------------------------------

| 前提条件に応じて方法１または方法２で実施してください。

方法１：ブラウザで実行
^^^^^^^^^^^^^^^^^^^^^^

#. ルートユーザでサインインします。

   .. figure:: /images/ja/gitlab_token/gitlab_token_01.png
     :width: 800px
     :alt: ルートユーザのサインイン画面
     
     ルートユーザのサインイン画面


#. 左上のアイコンを押下し、更に「Edit profile」を押下し、プロフィール編集画面を表示します。

   .. figure:: /images/ja/gitlab_token/gitlab_token_02.png
      :width: 800px
      :alt: 左上のアイコンを押下
      
      左上のアイコンを押下

   .. figure:: /images/ja/gitlab_token/gitlab_token_03.png
      :width: 800px
      :alt: 「Edit profile」を押下
      
      「Edit profile」を押下


#. 「Access tokens」を押下し、トークン管理画面を表示します。

   .. figure:: /images/ja/gitlab_token/gitlab_token_04.png
      :width: 800px
      :alt: 「Access tokens」を押下
      
      「Access tokens」を押下

#. 「Add new token」を押下し、トークン新規発行画面を表示します。

   .. figure:: /images/ja/gitlab_token/gitlab_token_05.png
      :width: 800px
      :alt: 「Add new token」を押下
      
      「Add new token」を押下

#. 下記情報を入力します。

   - | 「Token name」は任意値ですが、管理上区別できるように別の名称とすることを推奨します。
   - | 「Expiration date」は1年後の日付を選択します。
   - | 「Select scopes」は「api」「write_repository」「sudo」を選択します。

   .. figure:: /images/ja/gitlab_token/gitlab_token_06.png
      :width: 800px
      :alt: トークン発行画面
      
      トークン発行画面

#. 「Create personal access token」を押下し、ルートトークンを新規作成します。

   .. figure:: /images/ja/gitlab_token/gitlab_token_07.png
      :width: 800px
      :alt: 「Create personal access token」を押下
      
      「Create personal access token」を押下


#. 「Click to reveal」を押下し、ルートトークンを表示・コピーします。

   .. figure:: /images/ja/gitlab_token/gitlab_token_08.png
      :width: 800px
      :alt: 「Click to reveal」を押下
      
      「Click to reveal」を押下


方法２：コマンドで実行
^^^^^^^^^^^^^^^^^^^^^^

| Gitlabを実行しているサーバ（またはコンテナ内）に接続して下記コマンドを実施します。
| Rubyの起動に数分かかるため、正常でも数分程度（マシンスペックに依ります）無応答状態になります。

- | 作成するルートトークンにつける名称を「 ``name: '<<ここにルートトークンの名称を代入>>'`` 」に代入します。

  - | 任意値ですが、管理上区別できるように既存のものとは別の名称とすることを推奨します。


.. code-block:: console

  root@gitlab:/# 
   gitlab-rails runner "token = User.find_by_username('root').personal_access_tokens.create(scopes: ['api','sudo','write_repository'], name: '<<ここにルートトークンの名称を代入>>', expires_at: 365.days.from_now); token_str = SecureRandom.hex(10); p token_str; token.set_token(token_str); token.save!"


| 20桁の文字列のみが出力されれば成功しています。
| ※成功した場合、表示された20桁の文字列がルートトークンです。

.. code-block:: console

   "81453fa40820de8a4ad6"

   
| なお、コマンドは下記ドキュメントを参考に作成しています。

- | `GitlabのRailsRunnerについて <https://docs.gitlab.com/17.11/administration/operations/rails_console/#using-the-rails-runner>`_
- | `GitlabのRailsRunnerを使用したトークンの作成について <https://docs.gitlab.com/17.11/user/profile/personal_access_tokens/#create-a-personal-access-token-programmatically>`_




新規発行したルートトークンをITAに反映
-------------------------------------

| ITAをインストールした環境に応じて方法１または方法２で実施してください。

方法１：docker-compose版
^^^^^^^^^^^^^^^^^^^^^^^^

.envを修正
~~~~~~~~~~
| 「 :file:`~/exastro-docker-compose/.env` 」の「 ``GITLAB_ROOT_TOKEN`` 」の値を修正します。

.. code-block:: diff

 ### Parameters when using GitLab container
 ...
 - GITLAB_ROOT_TOKEN=glpat-oldoldoldoldoldoldol
 + GITLAB_ROOT_TOKEN=glpat-RRRRRRRRRRRRRRRRRRRR
 ...


修正した.envを反映
~~~~~~~~~~~~~~~~~~
| 「:file:`~/exastro-docker-compose/setup.sh` 」を実行して修正を反映します。

.. code-block:: console
 
 cd ~/exastro-docker-compose
 sh setup.sh install
 
 ...
 Regenerate .env file? (y/n) [default: n]: n
 ...
 Deploy Exastro containers now? (y/n) [default: n]: y
 ...

.. danger::
  | 実行時に各種コンテナの再起動をするため、サービスが一時的に停止します。
  

方法２：Kubenetes版
^^^^^^^^^^^^^^^^^^^

values.yamlを修正
~~~~~~~~~~~~~~~~~
| 「 ``global.gitlabDefinition.secret.GITLAB_ROOT_TOKEN`` 」の値を修正します。

.. code-block:: diff

 global:
 ...
   gitlabDefinition:
     config:
       ...
     secret:
       ...
 -      GITLAB_ROOT_TOKEN: "glpat-oldoldoldoldoldoldol"
 +      GITLAB_ROOT_TOKEN: "glpat-RRRRRRRRRRRRRRRRRRRR"
 ...


修正したvalues.yamlを反映
~~~~~~~~~~~~~~~~~~~~~~~~~
| 「 :command:`helm upgrade` 」を実行した後、「 :command:`kubectl rollout` 」を実行して修正を反映します。

.. code-block:: console
 
 helm upgrade exastro exastro/exastro --install --namespace exastro --create-namespace --values values.yaml

 kubectl rollout restart deploy/ita-api-admin -n exastro


Organization毎のパーソナルアクセストークンの有効期限切れ対応
============================================================

| 本頁で説明するコマンド例及び実行結果については下記条件で記載しています。

- | Gitlabのルートユーザ名：root

- | 対象のオーガナイゼーションID：test-org-01


Gitlab側でパーソナルアクセストークンを新規発行
----------------------------------------------

| 前提条件に応じて方法１または方法２で実施してください。


方法１・２共通：DBに接続して実施
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

現在使用しているユーザ・トークンを確認
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| 対象のORGANIZATION_IDを持つレコードのGITLAB_USER・GITLAB_TOKENの値を確認します。

.. code-block:: console

 [none]> use ita_db;
 [ita_db]> select PRIMARY_KEY,ORGANIZATION_ID,GITLAB_USER,GITLAB_TOKEN,DISUSE_FLAG,LAST_UPDATE_TIMESTAMP from `t_comn_organization_db_info` where DISUSE_FLAG = "0";

 +--------------------------------------+-----------------+----------------------------------------------+----------------------------+-------------+----------------------------+
 | PRIMARY_KEY                          | ORGANIZATION_ID | GITLAB_USER                                  | GITLAB_TOKEN               | DISUSE_FLAG | LAST_UPDATE_TIMESTAMP      |
 +--------------------------------------+-----------------+----------------------------------------------+----------------------------+-------------+----------------------------+
 | 4897f2a4-6167-4efd-bcf9-8919c7174691 | test-org-01     | ITA_ORG_AA1B2F4F-DB58-4ACB-B957-2827DD4E2624 | glpat-XXXXXXXXXXXXXXXXXXXX | 0           | 2025-07-16 08:10:42.684294 |
 | f15d6f77-440f-456e-a350-ac6adcc429df | test-org-02     | ITA_ORG_9DF4997D-6AA6-493B-9EAC-EFF9A33012AF | glpat-AAAAAAAAAAAAAAAAAAAA | 0           | 2025-07-16 16:48:57.401197 |
 | 28e3f7a1-93bd-40f9-9818-d8e146113709 | test-org-03     | ITA_ORG_66F72495-2CE3-4234-A890-6A6710F2A9BF | glpat-BBBBBBBBBBBBBBBBBBBB | 0           | 2025-07-16 16:49:30.051664 |
 | 75b24423-dc4e-4f6d-b334-100305dda867 | test-org-04     | ITA_ORG_C80E920F-8279-4DFA-97EC-A68E4017D6D2 | glpat-CCCCCCCCCCCCCCCCCCCC | 0           | 2025-07-16 16:52:38.068131 |
 | 955927c2-49fb-4ea8-9853-eab8c957b390 | test-org-05     | ITA_ORG_A96A7A66-45BD-4AFE-B7EF-FF554956A1BA | glpat-DDDDDDDDDDDDDDDDDDDD | 0           | 2025-07-16 16:50:41.399886 |
 +--------------------------------------+-----------------+----------------------------------------------+----------------------------+-------------+----------------------------+
 6 rows in set (0.001 sec)



方法１：ブラウザで実行
^^^^^^^^^^^^^^^^^^^^^^

#. ルートユーザでサインインします。

   .. figure:: /images/ja/gitlab_token/gitlab_token_01.png
      :width: 800px
      :alt: ルートユーザのサインイン画面
      
      ルートユーザのサインイン画面

#. 「Admin」を押下し、Admin areaを表示します。

   .. figure:: /images/ja/gitlab_token/gitlab_token_09.png
      :width: 800px
      :alt: 「Admin」を押下
      
      「Admin」を押下

#. 「Users」を押下し、Admin area / Usersを表示します。

   .. figure:: /images/ja/gitlab_token/gitlab_token_10.png
      :width: 800px
      :alt: 「Users」を押下
      
      「Users」を押下


#. 上記の「GITLAB_USER」で表示されていたユーザ名を押下し、ユーザの詳細画面を表示します。

   .. figure:: /images/ja/gitlab_token/gitlab_token_11.png
      :width: 800px
      :alt: ユーザ名を押下
      
      ユーザ名を押下

#. 「Impersonate」を押下し、該当ユーザとしてログインします。

   .. figure:: /images/ja/gitlab_token/gitlab_token_12.png
      :width: 800px
      :alt: 「Impersonate」を押下
      
      「Impersonate」を押下

#. 左上のアイコンを押下し、更に「Edit profile」を押下し、プロフィール編集画面を表示します。

   .. figure:: /images/ja/gitlab_token/gitlab_token_13.png
      :width: 800px
      :alt: 左上のアイコンを押下
      
      左上のアイコンを押下

   .. figure:: /images/ja/gitlab_token/gitlab_token_14.png
      :width: 800px
      :alt: 「Edit profile」を押下
      
      「Edit profile」を押下

#. 「Access tokens」を押下し、パーソナルアクセストークン管理画面を表示します。

   .. figure:: /images/ja/gitlab_token/gitlab_token_15.png
      :width: 800px
      :alt: 「Access tokens」を押下
      
      「Access tokens」を押下

#. 「Add new token」を押下し、パーソナルアクセストークン新規発行画面を表示します。

   .. figure:: /images/ja/gitlab_token/gitlab_token_16.png
      :width: 800px
      :alt: 「Add new token」を押下
      
      「Add new token」を押下

#. 下記情報を入力します。

   - | 「Token name」は任意値（デフォルトではGITLAB_USERと同値）ですが、管理上区別できるように別の名称とすることを推奨します。
   - | 「Expiration date」は1年後の日付を選択します。
   - | 「Select scopes」は「api」のみを選択します。

   .. figure:: /images/ja/gitlab_token/gitlab_token_17.png
      :width: 800px
      :alt: トークン発行画面
      
      トークン発行画面

#. 「Create personal access token」を押下し、パーソナルアクセストークンを新規作成します。

   .. figure:: /images/ja/gitlab_token/gitlab_token_18.png
      :width: 800px
      :alt: 「Create personal access token」を押下
      
      「Create personal access token」を押下

#. 「Click to reveal」を押下し、パーソナルアクセストークンを表示・コピーします。

   .. figure:: /images/ja/gitlab_token/gitlab_token_19.png
      :width: 800px
      :alt: 「Click to reveal」を押下
      
      「Click to reveal」を押下


方法２：コマンドで実行
^^^^^^^^^^^^^^^^^^^^^^

| Gitlabを実行しているサーバ（またはコンテナ内）に接続して下記コマンドを実施します。
| Rubyの起動に数分かかるため、正常でも数分程度（マシンスペックに依ります）無応答状態になります。

- | 作成するパーソナルアクセストークンにつける名称を「 ``name: '<<ここにパーソナルアクセストークンの名称を代入>>'`` 」に代入します。

  - | 任意値で、デフォルトではGITLAB_USERと同値ですが、管理上区別できるように別の名称とすることを推奨します。

- | :menuselection:`■ 現在使用しているユーザ・トークンを確認` で確認したGITLAB_USERの値を「 ``User.find_by_username('<<ここにGITLAB_USERを代入>>')`` 」に代入します。

.. code-block:: console

 root@gitlab:/# 
  gitlab-rails runner "token = User.find_by_username('<<ここにGITLAB_USERを代入>>').personal_access_tokens.create(scopes: ['api'], name: '<<ここにパーソナルアクセストークンの名称を代入>>', expires_at: 365.days.from_now); token_str = SecureRandom.hex(10); p token_str; token.set_token(token_str); token.save!"


| 20桁の文字列のみが出力されれば成功しています。
| ※成功した場合、表示された20桁の文字列がパーソナルアクセストークンです。

.. code-block:: console

  "81453fa40820de8a4ad6"

   
| なお、コマンドは下記ドキュメントを参考に作成しています。

- | `GitlabのRailsRunnerについて <https://docs.gitlab.com/17.11/administration/operations/rails_console/#using-the-rails-runner>`_
- | `GitlabのRailsRunnerを使用したトークンの作成について <https://docs.gitlab.com/17.11/user/profile/personal_access_tokens/#create-a-personal-access-token-programmatically>`_


新規発行したパーソナルアクセストークンをITAに反映
-------------------------------------------------

DBに接続して実施
^^^^^^^^^^^^^^^^

対象レコードの確認
~~~~~~~~~~~~~~~~~~

| 対象のORGANIZATION_IDを持つレコードのGITLAB_USERの値を確認します。

.. code-block:: console

 [none]> use ita_db;
 [ita_db]> select PRIMARY_KEY,ORGANIZATION_ID,GITLAB_USER,GITLAB_TOKEN,DISUSE_FLAG,LAST_UPDATE_TIMESTAMP from `t_comn_organization_db_info` where DISUSE_FLAG = "0";

 +--------------------------------------+-----------------+----------------------------------------------+----------------------------+-------------+----------------------------+
 | PRIMARY_KEY                          | ORGANIZATION_ID | GITLAB_USER                                  | GITLAB_TOKEN               | DISUSE_FLAG | LAST_UPDATE_TIMESTAMP      |
 +--------------------------------------+-----------------+----------------------------------------------+----------------------------+-------------+----------------------------+
 | 4897f2a4-6167-4efd-bcf9-8919c7174691 | test-org-01     | ITA_ORG_AA1B2F4F-DB58-4ACB-B957-2827DD4E2624 | glpat-XXXXXXXXXXXXXXXXXXXX | 0           | 2025-07-16 08:10:42.684294 |
 | f15d6f77-440f-456e-a350-ac6adcc429df | test-org-02     | ITA_ORG_9DF4997D-6AA6-493B-9EAC-EFF9A33012AF | glpat-AAAAAAAAAAAAAAAAAAAA | 0           | 2025-07-16 16:48:57.401197 |
 | 28e3f7a1-93bd-40f9-9818-d8e146113709 | test-org-03     | ITA_ORG_66F72495-2CE3-4234-A890-6A6710F2A9BF | glpat-BBBBBBBBBBBBBBBBBBBB | 0           | 2025-07-16 16:49:30.051664 |
 | 75b24423-dc4e-4f6d-b334-100305dda867 | test-org-04     | ITA_ORG_C80E920F-8279-4DFA-97EC-A68E4017D6D2 | glpat-CCCCCCCCCCCCCCCCCCCC | 0           | 2025-07-16 16:52:38.068131 |
 | 955927c2-49fb-4ea8-9853-eab8c957b390 | test-org-05     | ITA_ORG_A96A7A66-45BD-4AFE-B7EF-FF554956A1BA | glpat-DDDDDDDDDDDDDDDDDDDD | 0           | 2025-07-16 16:50:41.399886 |
 +--------------------------------------+-----------------+----------------------------------------------+----------------------------+-------------+----------------------------+
 6 rows in set (0.001 sec)




対象レコードの更新
~~~~~~~~~~~~~~~~~~

- | :menuselection:`10.5.1. Gitlab側でパーソナルアクセストークンを新規発行` で発行したパーソナルアクセストークンを「 ``GITLAB_TOKEN = "<<ここにパーソナルアクセストークンを代入>>"`` 」に代入します。
- | :menuselection:`■ 対象レコードの確認` で確認したORGANIZATION_IDの値を「 ``ORGANIZATION_ID = "<<ここにORGANIZATION_IDを代入>>"`` 」に代入します。
- | :menuselection:`■ 対象レコードの確認` で確認したGITLAB_USERの値を「 ``GITLAB_USER = "<<ここにGITLAB_USERを代入>>"`` 」に代入します。

.. code-block:: console

 [ita_db]> update `t_comn_organization_db_info` set GITLAB_TOKEN = "<<ここにパーソナルアクセストークンを代入>>" where ORGANIZATION_ID = "<<ここにORGANIZATION_IDを代入>>" and GITLAB_USER = "<<ここにGITLAB_USERを代入>>" and DISUSE_FLAG = "0";

 Query OK, 1 row affected (0.006 sec)
 Rows matched: 1  Changed: 1  Warnings: 0


| 「 ``Query OK, 1 row affected`` 」と表示されることを確認してください。


対象レコードの更新確認
~~~~~~~~~~~~~~~~~~~~~~

| 対象のORGANIZATION_IDを持つレコードのGITLAB_TOKENの値のみが変更されていることを確認してください。

.. code-block:: console

 [ita_db]> select PRIMARY_KEY,ORGANIZATION_ID,GITLAB_USER,GITLAB_TOKEN,DISUSE_FLAG,LAST_UPDATE_TIMESTAMP from `t_comn_organization_db_info` where DISUSE_FLAG = "0";

 +--------------------------------------+-----------------+----------------------------------------------+----------------------------+-------------+----------------------------+
 | PRIMARY_KEY                          | ORGANIZATION_ID | GITLAB_USER                                  | GITLAB_TOKEN               | DISUSE_FLAG | LAST_UPDATE_TIMESTAMP      |
 +--------------------------------------+-----------------+----------------------------------------------+----------------------------+-------------+----------------------------+
 | 4897f2a4-6167-4efd-bcf9-8919c7174691 | test-org-01     | ITA_ORG_AA1B2F4F-DB58-4ACB-B957-2827DD4E2624 | glpat-YYYYYYYYYYYYYYYYYYYY | 0           | 2025-07-16 08:10:42.684294 |
 | f15d6f77-440f-456e-a350-ac6adcc429df | test-org-02     | ITA_ORG_9DF4997D-6AA6-493B-9EAC-EFF9A33012AF | glpat-AAAAAAAAAAAAAAAAAAAA | 0           | 2025-07-16 16:48:57.401197 |
 | 28e3f7a1-93bd-40f9-9818-d8e146113709 | test-org-03     | ITA_ORG_66F72495-2CE3-4234-A890-6A6710F2A9BF | glpat-BBBBBBBBBBBBBBBBBBBB | 0           | 2025-07-16 16:49:30.051664 |
 | 75b24423-dc4e-4f6d-b334-100305dda867 | test-org-04     | ITA_ORG_C80E920F-8279-4DFA-97EC-A68E4017D6D2 | glpat-CCCCCCCCCCCCCCCCCCCC | 0           | 2025-07-16 16:52:38.068131 |
 | 955927c2-49fb-4ea8-9853-eab8c957b390 | test-org-05     | ITA_ORG_A96A7A66-45BD-4AFE-B7EF-FF554956A1BA | glpat-DDDDDDDDDDDDDDDDDDDD | 0           | 2025-07-16 16:50:41.399886 |
 +--------------------------------------+-----------------+----------------------------------------------+----------------------------+-------------+----------------------------+
 6 rows in set (0.001 sec)
