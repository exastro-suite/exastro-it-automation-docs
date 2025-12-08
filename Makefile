# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line, and also
# from the environment for the first two.
SPHINXOPTS    ?=
SPHINXBUILD   ?= sphinx-build
PROJECTDIR    = .
VERSION       = 2.5
VERSIONS      = 2.0 2.1 2.2 2.3 2.4 2.5 2.6 2.7
SOURCEDIR     = $(PROJECTDIR)/src
BUILDDIR      = $(PROJECTDIR)/_build
DOCSDIR       = $(PROJECTDIR)/docs
POTDIR        = $(BUILDDIR)/$(VERSION)/gettext
LANGUAGES     = en ja
LOCALE_DIR    = $(PROJECTDIR)/locale

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

# # gettext ターゲット: .pot ファイルを取り出し
# gettext:
# 	@$(SPHINXBUILD) -M gettext $(SOURCEDIR)/$(VERSION) $(BUILDDIR)/$(VERSION)

# gettext-all:
# 	@for version in $(VERSIONS) ; do \
# 	$(SPHINXBUILD) -M gettext $(SOURCEDIR)/$$version $(BUILDDIR)/$$version ; \
# 	done

# # resources ターゲット: .po ファイルを更新し、.mo ファイルを生成
# resources: gettext
# 	@for lang in $(LANGUAGES) ; do \
# 	cd $(SOURCEDIR)/$(VERSION) ; \
# 	sphinx-intl update -p $(POTDIR) -l $$lang ; \
# 	done

# resources-all: gettext-all
# 	@for version in $(VERSIONS) ; do \
# 	cd $(SOURCEDIR)/$$version ; \
#  for lang in $(LANGUAGES) ; do \
# 	sphinx-intl update -p ../../$(BUILDDIR)/$$version/gettext -l $$lang ; \
# 	done ; \
# 	cd ../../ ; \
# 	done

html: Makefile
# 	@$(SPHINXBUILD) -b html "$(SOURCEDIR)" "$(DOCSDIR)" $(SPHINXOPTS) $(O)
# 	touch $(DOCSDIR)/.nojekyll
	version=`git branch --contains | cut -d " " -f 2` ; \
	sed -e "s/#__version__#/$$version/" $(SOURCEDIR)/index.html > $(DOCSDIR)/index.html

html-%: $(addprefix html-, $(NAMES))

html-%:
	@for lang in $(LANGUAGES) ; do \
	if [ -d "$(SOURCEDIR)/$$lang/${@:html-%=%}" ] && [ -e "$(SOURCEDIR)/$$lang/${@:html-%=%}/conf.py" ] ; then \
	$(SPHINXBUILD) -b html "$(SOURCEDIR)/$$lang/${@:html-%=%}" "$(DOCSDIR)/$$lang/${@:html-%=%}" $(SPHINXOPTS) $(O) ; \
	fi \
	done
	touch $(DOCSDIR)/.nojekyll
	version=`git branch --contains | cut -d " " -f 2` ; \
	sed -e "s/#__version__#/$$version/" $(SOURCEDIR)/index.html > $(DOCSDIR)/index.html

html-all:
	@for version in `ls -1 $(SOURCEDIR)/ja` ; do \
	for lang in $(LANGUAGES) ; do \
	if [ -d "$(SOURCEDIR)/$$lang/$$version" ] && [ -e "$(SOURCEDIR)/$$lang/$$version/conf.py" ] ; then \
	$(SPHINXBUILD) -b html "$(SOURCEDIR)/$$lang/$$version" "$(DOCSDIR)/$$lang/$$version" $(SPHINXOPTS) $(O) ; \
	fi \
	done ; \
	done
	touch $(DOCSDIR)/.nojekyll
	version=`ls -1r "$(SOURCEDIR)/ja/" | head -n 1` ; \
	sed -e "s/#__version__#/$$version/" $(SOURCEDIR)/index.html > $(DOCSDIR)/index.html

clean:
	rm -rf $(BUILDDIR) $(DOCSDIR)/*
