======================
ドキュメント記述ルール
======================

ドキュメントの構成
==================

.. code-block:: bash

    exastro-it-automation-docs
    |-- LICENSE
    |-- README.md
    |-- apple-touch-icon.png
    |-- asset                    # 素材ファイルを格納
    |   |-- css                  # CSSファイル
    |   |-- img                  # 画像素材
    |   `-- json                 # コンテンツデータ
    |       `-- faq.json         # FAQデータ
    |-- documentation
    |   |-- Makefile
    |   |-- _static
    |   |   |-- custom.css
    |   |   `-- favicon.ico
    |   |-- conf.py
    |   |-- exastro_documents
    |   |   |-- layout.html
    |   |   |-- static
    |   |   |   |-- exastro_documents.css
    |   |   |   |-- exastro_documents.js
    |   |   |   |-- fonts
    |   |   |   |-- img
    |   |   |   `-- option.css_t
    |   |   `-- theme.conf
    |   |-- html
    |   |   |-- _images
    |   |   |-- _sources
    |   |   |-- _static
    |   |   |-- genindex.html
    |   |   |-- index.html
    |   |   |-- objects.inv
    |   |   |-- search.html
    |   |   |-- searchindex.js
    |   |   `-- v2.0
    |   |       |-- index.html
    |   |       |-- ja
    |   |       `-- ja_manual_design
    |   |-- images
    |   |   |-- ja_manual_design
    |   |   |   |-- before_after_2_0.png
    |   |   |   |-- chart.png
    |   |   |   |-- image2.png
    |   |   |   |-- indexrst_syntax1_v2_0.png
    |   |   |   |-- role_of_index_rst_v2_0.png
    |   |   |   |-- sample_img_v2_0.png
    |   |   |   |-- title_in_index_rst_v_2_0.png
    |   |   |   |-- toctree2_v2_0.png
    |   |   |   |-- toctree_lvl1.png
    |   |   |   `-- toctree_lvl2.png
    |   |   `-- platform
    |   |       `-- administrator-console.png
    |   |-- index.rst
    |   |-- requirements.txt
    |   `-- v2.0
    |       |-- index.rst
    |       `-- ja
    |           |-- ansible-driver
    |           |-- appendix
    |           |-- create_param
    |           |-- index.rst
    |           |-- installation
    |           |-- installation_appendix
    |           |-- it_automation_base
    |           |-- manual_design
    |           |-- platform
    |           `-- rest_api
    |-- documents.html
    |-- documents_ja.html
    |-- downloads.html
    |-- downloads_ja.html
    |-- faq.html
    |-- faq_ja.html
    |-- favicon.ico
    |-- index.html
    |-- index_ja.html
    |-- learn.html
    |-- learn_ja.html
    |-- overview.html
    |-- overview_ja.html
    `-- webinar_ja.html


文体，語句
==========

文体:
  | ですます体 (体言止めなし)

長音記号有無:
  | つけない: 単語が 3 音以上 (e.g. ブラウザ)
  | つける  : 単語が 2 音以下 (e.g. エラー)
  | ※ JIS（日本工業規格）の「Z8301」準拠


表記のゆれ
==========

| 同じ意味をもつ２つ以上の表現は避け、１つに統一します。
|  e.g. 
|  　ビルド、生成  --> 「ビルド」に統一します。
|  　できます、出来ます  --> 「出来ます」に統一します。

ターミノロジ
============

| ターミノロジ（専門用語）を用いる場合は、必ずその意味を最初に説明してから使用します。
