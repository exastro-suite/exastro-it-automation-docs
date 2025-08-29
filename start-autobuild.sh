#!/bin/sh

if [ -z "$ja_port" ]; then
  sp_ja_port=35001
else
  sp_ja_port=$ja_port
fi
if [ -z "$en_port" ]; then
  sp_en_port=35002
else
  sp_en_port=$en_port
fi
if [ "$sp_ja_port" -ne 0 ]; then
  echo ${sp_ja_port}"port process kill."
  lsof -i :$sp_ja_port | grep -c $sp_ja_port && kill -9 `lsof -i :$sp_ja_port|grep $sp_ja_port|awk '{print $2}'`
fi
if [ "$sp_en_port" -ne 0 ]; then
  echo ${sp_en_port}"port process kill."
  lsof -i :$sp_en_port | grep -c $sp_en_port && kill -9 `lsof -i :$sp_en_port|grep $sp_en_port|awk '{print $2}'`
fi

# version=`git branch --contains | cut -d " " -f 2`
version=2.6
sed "s/#__version__#/$version/" template.code-workspace > /workspace/exastro-it-automation-docs.code-workspace

# make html-all

echo "start sphinx_autobuild."
python -msphinx_autobuild /workspace/src/en/${version} /workspace/docs/en/${version} --port=$sp_en_port &
python -msphinx_autobuild /workspace/src/ja/${version} /workspace/docs/ja/${version} --port=$sp_ja_port