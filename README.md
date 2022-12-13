# exastro-it-automation-docs
[![Auto merge](../../actions/workflows/automerge.yaml/badge.svg)](../../actions/workflows/automerge.yaml) 
[![pages-build-deployment](../../actions/workflows/pages/pages-build-deployment/badge.svg)](actions/workflows/pages/pages-build-deployment)

Exastro IT Automation のドキュメントは reStructuredText 形式で記述されています。
通常、reStructuredText はビルドをすることで HTML 形式に変換をしますが、本プロジェクトでは GitHub Actions を利用することで自動的にビルドを行っています。
以下は、自動ビルドをするにあたり必要となる公開鍵と秘密鍵の登録方法について紹介します。

## GitHub Pages の設定

GitHub Actionsで自動生成したファイルをコミットするためにプロジェクトの Deploy keys を設定します。

### Deploy keys の作成

以下のコマンドにより公開鍵と秘密鍵のペアを生成します。

```
ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f my-repo -N ""
```

- my-repo.pub (公開鍵)
- my-repo (秘密鍵)

### Deploy keys の登録
公開鍵は、プロジェクトの `Settings -> Deploy Keys` の `Add deploy key` で登録します。秘密鍵は `Settings -> Secrets -> Actions` の `New repository secret` で登録します。Secret は `MY_ACTIONS_DEPLOY_KEY` という名前で登録しておくことにします。

#### 公開鍵の登録
![image](https://user-images.githubusercontent.com/83527822/207450456-abc28de9-fc5e-4c16-afe7-ee6d12c20211.png)

![image](https://user-images.githubusercontent.com/83527822/207450638-c5e90050-acc5-485f-8011-733b3cceff59.png)

#### 秘密鍵の登録
![image](https://user-images.githubusercontent.com/83527822/207450910-d48a2843-2c92-4e20-a0f7-db3290a98d93.png)

![image](https://user-images.githubusercontent.com/83527822/207450979-5ed43396-7882-4571-8dc0-cc0b996fbded.png)


## 参考

- [GitHub Actionsを用いてGitHub Pagesへのデプロイを自動化する](https://sphinx-users.jp/cookbook/githubaction/index.html)
