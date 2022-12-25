====
書式
====

H1 (見出し1、タイトル)
======================

| H1レベルの見出しを表現する書式です。

記載方法
--------

| タイトルの上下にタイトルの文字数と同じ幅だけ :kbd:`=` を記述します。

記述例
------

.. code-block:: 

   ========
   タイトル
   ========

表示結果
--------

本ページのタイトルを参照してください。


H2 (見出し2)
============

| H2レベルの見出しを表現する書式です。

記載方法
--------

| 見出しの下に見出しの文字数と同じ幅だけ :kbd:`=` を記述します。

記述例
------

.. code-block:: 

   見出し2
   =======


H3 (見出し3)
============

| H3ベルの見出しを表現する書式です。

記載方法
--------

| 見出しの下に見出しの文字数と同じ幅だけ :kbd:`-` を記述します。

記述例
------

.. code-block:: 

   見出し3
   -------


H4 (見出し4)
============

| H4レベルの見出しを表現する書式です。

記載方法
--------

| 見出しの下に見出しの文字数と同じ幅だけ :kbd:`~` を記述します。

記述例
------

.. code-block:: 

   見出し4
   ~~~~~~~


H5 (見出し5)
============

| H5レベルの見出しを表現する書式です。

記載方法
--------

| 見出しの下に見出しの文字数と同じ幅だけ :kbd:`*` を記述します。

記述例
------

.. code-block:: 

   見出し5
   *******


H6 (見出し6)
============

| H6レベルの見出しを表現する書式です。
| H6レベル以上の見出し(H6を含む)は使ってはなりません。

.. danger:: 
   | 通常、H6レベル以上の見出しになる場合は、文章の構造が複雑過ぎています。
   | 書き方を工夫するなどしてH6レベル以上を使わないようにしなければなりません。


記載方法
--------

| 見出しの下に見出しの文字数と同じ幅だけ :kbd:`^` を記述します。

記述例
------

.. code-block:: 

   見出し6
   ^^^^^^^


見出し2から見出し6までの表示例
==============================

見出し3
-------

見出し4
~~~~~~~

見出し5
*******

見出し6
^^^^^^^


メモ
====

| ユーザが確認すべき内容ごとにレベルが分けをしたメモを記載している箇所がいくつかあります。
| Note や Tip については読み飛ばしてもそれほど運用に影響はありませんが、Warning や Danger は運用上注意が必要な項目となりますので、ユーザが確認することを推奨します。
| 吹き出し形式のメモには下記の意味があります。

記載方法
--------

| 情報の重要度に応じて適切なレベルを選択してください。
| レベルは :kbd:`Note`` から :kbd:`Danger` まで全部で4レベルあります。
| 各レベルの説明について下記を参照してください。

記述例
------

.. code-block:: 

   # Note
   .. note::
      | 補足的な情報を示しています。
      | Note に記載されている内容は読み飛ばしても困ることは無いでしょう。

   # Tip
   .. tip::
      | 操作や作業におけるノウハウを示しています。
      | Tip に記載されている内容を読み飛ばした場合ユーザに混乱が生じる可能性があります。

   # Warning
   .. warning::
      | 操作上の注意点を示しています。
      | Warning に記載された内容はユーザが把握しておくほうが適切な情報です。

   # Danger
   .. danger::
      | 正常なサービスへ影響を与える可能性がある操作についての危険性を示しています。
      | Danger に記載された内容を知らない場合、大きな問題を引き起こす可能性があります。

表示結果
--------

.. note::
   | 補足的な情報を示しています。
   | Note に記載されている内容は読み飛ばしても困ることは無いでしょう。

.. tip::
   | 操作や作業におけるノウハウを示しています。
   | Tip に記載されている内容を読み飛ばした場合ユーザに混乱が生じる可能性があります。

.. warning::
   | 操作上の注意点を示しています。
   | Warning に記載された内容はユーザが把握しておくほうが適切な情報です。

.. danger::
   | 正常なサービスへ影響を与える可能性がある操作についての危険性を示しています。
   | Danger に記載された内容を知らない場合、大きな問題を引き起こす可能性があります。


単語表現
========

| 本マニュアルでは、内容に応じて下記のような表現方法を用います。

.. csv-table::  表現例
   :header: 名前, 表現例, 実際の表記(入力例)
   :widths: 20, 20, 60

   menuselection, メニュー・画面・画面内の項目, :menuselection:`メニュー --> サブメニュー`、:menuselection:`画面名`、:menuselection:`項目`
   guilabel, ボタン, :guilabel:`ボタン`
   kbd, キーボード入力, :kbd:`Ctrl + Z`、 :kbd:`入力文字列`
   program, GUI上の設定項目・設定値, :program:`Item`、 :program:`Input data`
   file, ファイル・ディレクトリのパス, :file:`/path/to/file`
   dfn, 用語定義, :dfn:`用語`


機能1
-----
| ビルド時、システムはドキュメントルート、、大章ディレクトリの配下に置かれたindex.rst の内容を見て章と章を紐づけ、全体を構成します。
.. figure:: ../../../images/ja_manual_design/role_of_index_rst_v2_0.png
   :width: 5.84375in
   :height: 1.09375in
   :align: center
   :alt: role_of_index

   index.rstの役割

機能2
-----
| 各 index.rst で章見出しを定義する事が出来ます。
|
| 各index.rst 内に記述した見出と出力結果

.. code-block:: bash

  documentation
  　|-- html
  　|-- images
  　|-- v2.0
  　|   |-- ja_manual_design
  　|   |   |-- index.rst <-- "マニュアル構成法" を記述
  　|   |
  　|   |-- ja
  　|   |   |-- index.rst <--- "Exastro-it-automation 2.0 操作マニュアル" を記述
  　|   |
  　|   |-- index.rst
  　|-- install
  　|-- index.rst <--- "xastro-it-automation Documentation" を記述

.. figure:: ../../images/ja_manual_design/title_in_index_rst_v_2_0.png
   :width: 5.84375in
   :height: 1.09375in
   :align: center
   :alt: title_in_index_rst

   各index.rst 内見出

index.rst 内構文
----------------
| indes.rst 内の記述方法について大章「インストール」内に配置した index.rst を例に挙げて説明します。
.. code-block:: bash
   
   ============ 
   インストール
   ============

   .. toctree::
   :maxdepth: 1

   getting_oase
   requirements
   installer/index
   container/index

| 記述した内容が章見出し (インストール) となります。
.. code-block:: bash
   
   ============ 
   インストール
   ============

.. figure:: ../../images/ja_manual_design/indexrst_syntax1_v2_0.png
   :width: 5.84375in
   :height: 1.09375in
   :align: center
   :alt: role_of_index

   大章まで表示

| どのレベルの見出しまで右側の見出一覧に表示するかを指定します。
.. code-block:: bash
   
   .. toctree::
   :maxdepth: 1

.. figure:: ../../images/ja_manual_design/toctree_lvl1.png
   :width: 5.84375in
   :height: 1.09375in
   :align: center
   :alt: role_of_index

   中章まで表示


.. code-block:: bash
   
   .. toctree::
   :maxdepth: 2

.. figure:: ../../images/ja_manual_design/toctree_lvl2.png
   :width: 5.84375in
   :height: 1.09375in
   :align: center
   :alt: role_of_index

   小章まで表示

| 配下にくる章が格納されているディレクトリを指定します。
.. code-block:: bash
   
   getting_oase
   requirements
   installer/index
   container/index

.. _doc-rns:
ドキュメント記述用 .rst ファイル
================================

構文 (リスト)
-----------
番号なしリスト
~~~~~~~~~~~~~~
.. code-block:: bash
   
   - リストa
   - リストb
- リストa
- リストb

番号付リスト
~~~~~~~~~~~~
.. code-block:: bash
   
   #. リストa
   #. リストb
#. リストa
#. リストb

構文 (強調)
-----------

強調
~~~~

| 下記に記載する、太字や斜体は使用してはなりません。
| 適切な単語表現を選択してください。

.. code-block:: bash

   **使用禁止**

**使用禁止**

コマンド
~~~~~~~~
.. code-block:: bash

   ファイル一覧は :command:`ls` で見ることができます。 
ファイル一覧は :command:`ls` で見ることができます。 

ファイルパス
~~~~~~~~~~~~
.. code-block:: bash

   nginx のメインの設定ファイルは :file:`/etc/nginx/nginx.conf` です。
nginx のメインの設定ファイルは :file:`/etc/nginx/nginx.conf` です。

構文 (パラグラフ)
-----------------
パラグラフ
~~~~~~~~~~
.. code-block:: bash

   | パラグラフはじまり
   | つづきのパラグラ

   | 第二パラグラフ
| パラグラフはじまり
| つづきのパラグラフ

| 第二パラグラフ

見出+パラグラフ
~~~~~~~~~~~~~~~~
.. code-block:: bash

   見出
     | 内容1
     | 内容2
見出
  | 内容1
  | 内容2

番号付見出+パラグラフ
~~~~~~~~~~~~~~~~~~~~~
.. code-block:: bash

   #. | 番号付見出
      | 内容1
      | 内容2
#. | 番号付見出
   | 内容1
   | 内容2

構文 (画像差込)
---------------
画像差込 (キャプション付)
~~~~~~~~~~~~~~~~~~~~~~~~~
.. code-block:: bash

   幅 5 inch x scale 60% = 幅 3 inch で表示されます。

   .. figure:: ../../images/ja_manual_design/charg.png
      :width: 5in
      :scale: 80%
      :align: center
      :alt: role_of_index

      index.rstの役割  <--- キャプション
幅 5 inch x scale 60% = 幅 3 inch で表示されます。

.. figure:: ../../images/ja_manual_design/chart.png
   :width: 5in
   :scale: 80%
   :align: center
   :alt: role_of_index

   index.rstの役割

画像差込 (キャプションなし)
~~~~~~~~~~~~~~~~~~~~~~~~~
.. code-block:: bash

   幅 300px x scale 80% = 幅 240px で表示されます。
   .. image:: ../../images/ja_manual_design/chart.png
      :width: 300px
      :scale: 80%
      :align: center
      :alt: role_of_index
幅 300px x scale 80% = 幅 240px で表示されます。

.. image:: ../../images/ja_manual_design/chart.png
   :width: 300px
   :height: 300px
   :scale: 80%
   :align: center
   :alt: role_of_index

画像差込 (文中引用))
~~~~~~~~~~~~~~~~~~~~
.. code-block:: bash

   画像がここに→　|aa| 差し込まれます。

   .. |aa| image:: ../../images/ja_manual_design/sample_img_v2_0.png
      :width: 1.5in
      :alt: サンプルイメージ指定したパスにある画像が差し込まれます。

画像がここに→　|aa| 差し込まれます。

|

グリッドテーブル
~~~~~~~~~~~~~~~~
.. code-block:: bash

   .. table:: グリッドテーブルサンプル

      +----------+-------+---------+
      | 見出1    | 見出2 | 見出3   |
      |          |       |         |
      +==========+=======+=========+
      | 内容1    | 内容2 | 内容3   |
      +----------+-------+---------+
.. table:: グリッドテーブルサンプル

   +----------+-------+---------+
   | 見出1    | 見出2 | 見出3   |
   |          |       |         |
   +==========+=======+=========+
   | 内容1    | 内容2 | 内容3   |
   +----------+-------+---------+

CSVテーブル
~~~~~~~~~~~
.. code-block:: bash

   .. csv-table:: CSVテーブルサンプル
      :header: 項目名1, 項目名2, 項目名3
      :widths: 10, 30, 30

      内容1, 内容2, 内容3

.. csv-table:: CSVテーブルサンプル
   :header: 項目名1, 項目名2, 項目名3
   :widths: 10, 30, 30

   内容1, 内容2, 内容3
|
.. warning:: | 表組1 では以下の記号は半角記号扱いとなります。
   | ※ (こめじるし),  ①などの〇付記号


グリッドテーブル内表記の注意点
------------------------------

複数行をつなげて表示
~~~~~~~~~~~~~~~~~~~~
**正**

.. code-block:: bash

   +-------
   | 通信条\    --> "通信条件" とつなげて出力されます。
   | 件
**誤**

.. code-block:: bash

   +-------
   | 通信条    --> "通信条 件" と出力されます。
   | 件

文字強調
~~~~~~~~
**正**

.. code-block:: bash

   +-------
   | **通\    --> 正しく強調されます。
   | 信** 
**誤**

.. code-block:: bash

   +-------
   |**通\     --> 強調されません。(罫線と、** の間に空きがない)
   | 信** 
**誤**

.. code-block:: bash

   +-------
   |**通\     --> 強調されません。(終わりの ** が続いていない)
   | 信* 
   |*

複数行をつなげて出力 (任意の箇所に空白をいれる時)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"Exastro ITAのWebコンテンツへのアクセス" と一行で出力する場合。
空白は行末につけます。

**正**

.. code-block:: bash

   | Exastro \                | --> "Exastro ITAのWebコンテンツへのアクセス"
   | ITAのWebコンテンツへの\  |
   | アクセス                 |
   |                          |
  -+--------------------------+
**誤**

.. code-block:: bash

   | Exastro\                 | -->文字列が崩れます。 (空白が行頭にきています。)
   |  ITAのWebコンテンツへの\ |
   | アクセス                 |
   |                          |
  -+--------------------------+

表内での一覧表記
~~~~~~~~~~~~~~~~
.. code-block:: bash

   .. table:: 表組例1

      +-----------------+---------+
      | 新機\           | 項目B   |
      | 能について      |         |   --> "*" 又は "#." を使って項目を列挙します。
      |                 |         |   --> 前行との間に要空白  
      | * 項目1         |         |
      | * 項目2         |         |
      +-----------------+---------+

構文 (ボタン)
-------------
ボタン
~~~~~~
.. code-block:: bash

   :guilabel:` アクション`
:guilabel:` アクション`

