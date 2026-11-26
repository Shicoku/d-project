# Gitコマンド

## Cloudflare Workers へデプロイする

このプロジェクトは Cloudflare Workers 上で `vinext` を使って動かします。通常の Next.js 開発環境はそのまま使えます。

### ローカルで確認する

```sh
npm run dev:vinext
npm run build:vinext
npm run start:vinext
```

Cloudflare Workers へ直接デプロイする場合は、Cloudflare にログインしてから次を実行します。

```sh
npm run deploy:vinext
```

### GitHub 連携で自動デプロイする

1. このリポジトリを GitHub に push します。
2. Cloudflare ダッシュボードの **Workers & Pages → Create application → GitHub** からリポジトリを接続します。
3. 本番ブランチを選び、ビルドコマンドに `npm run build:vinext`、デプロイコマンドに `npm run deploy:vinext -- --skip-build` を設定します。
4. Worker 名は `d-project` にします。これは `cloudflare.config.ts` の名前と一致させます。
5. 保存してデプロイし、以後は GitHub の本番ブランチへの push で更新します。

Workers Builds は Node.js のバージョンファイルを読み込みます。このリポジトリは `.node-version` で `24.22.1` を指定しています。

現在はデータベースのバインディングを設定していません。口コミの保存には、次の段階で D1 を作成して `cloudflare.config.ts` に追加する必要があります。

## メインブランチを更新する

```
git switch main
git pull
```

## ブランチを作って切り替える

```
git switch -c <ブランチ名>
```

| ブランチ名 | 用途       |
| ---------- | ---------- |
| dev/login  | 新機能開発 |
| fix/header | バグ修正   |

## コミットする

```
git add .
git commit -m "コメント"
```

## プッシュする

```
git push -u origin <ブランチ名>
```
