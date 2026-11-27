# Gitコマンド

## 口コミ削除申請の設定

削除申請機能を使う前に、プレビュー用・本番用のD1データベースへ `migrations/0002_review_deletion_requests.sql` を適用してください。Cloudflare Workersのシークレット `ADMIN_TOKEN` に32文字以上のランダムな値を設定すると、`/admin/deletion-requests` から申請を確認できます。ローカル開発では `.dev.vars` に `ADMIN_TOKEN=<32文字以上のランダムな値>` を設定してください。

口コミ詳細の「この口コミを通報」から、誰でも削除審査を依頼できます。申請者の本人確認や個人情報の収集は行いません。同じ口コミへの未処理申請は重複登録されません。

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
