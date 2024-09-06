# Next.js×ExpreesでTodoアプリ
TypeScriptベースのNode.jsとExpress,Next.jsを使用して開発する練習用リポジトリ

## 環境構築
### フロントエンドのセットアップ
frontendディレクトリに移動して、以下のコマンドを実行してください。
```shell
# frotendディレクトリにいる状態で実行
npm install
```
### バックエンドのセットアップ
backendディレクトリに移動して、以下のコマンドを実行してください。
```shell
# backendディレクトリにいる状態で実行
npm install
```

### 環境変数の設定
フロントエンドの接続先エンドポイントは.envファイルから読み取られるため、frontendディレクトリ直下に.envファイルを作成し、以下の内容を追加してください
```
NEXT_PUBLIC_API_URL="http://localhost:8000"
```
コマンドを使用してファイルを作成する場合は、以下を実行してください。

```shell
cp .env.example .env
```

## アプリケーション起動方法
### フロントエンドの起動
frontendディレクトリに移動して、以下のコマンドを実行します。

```shell
# frotendディレクトリにいる状態で実行
npm run dev
```

### バックエンドの起動
backendディレクトリに移動して、以下のコマンドを実行します。
```shell
# backendディレクトリにいる状態で実行
npm run dev
```

## Prisma Studioでデータを閲覧する
backendディレクトリに移動して、以下のコマンドを実行すると、GUIでPrismaのデータを閲覧できます。ブラウザで http://localhost:5555 にアクセスしてください。
```shell
npx prisma studio
```

## API ドキュメント
http://localhost:8000/api-docs/ にアクセスすると、ブラウザ上で OpenAPI 形式のドキュメントを確認できます。
※ドキュメントを表示するには、バックエンドサーバーが起動している必要があります。