# Recipe AI Assistant 🍳

料理のレシピをAIに考案してもらい、気に入ったレシピを保存・管理できるWebアプリケーションです。

## 機能

### ✨ 主要機能
- **AIレシピ生成**: OpenAI APIを使用して、材料や条件からレシピを自動生成
- **レシピ保存**: お気に入りのレシピをローカルストレージに保存
- **レシピ管理**: 保存したレシピの閲覧、編集、削除
- **検索機能**: キーワード検索、難易度・調理時間でのフィルタリング

## 技術スタック

- **React 18** + **TypeScript**
- **Tailwind CSS 3** - スタイリング
- **OpenAI API** - レシピ生成
- **localStorage** - データ保存

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env` ファイルを作成し、OpenAI APIキーを設定してください：

```bash
cp .env.example .env
```

`.env` ファイルを編集：

```env
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
```

> **注意**: OpenAI APIキーは [OpenAI Platform](https://platform.openai.com/api-keys) から取得できます。

### 3. アプリの起動

```bash
npm start
```

ブラウザで `http://localhost:3000` を開いてください。

## 使い方

### 📝 レシピを生成する

1. 「新規レシピ」タブをクリック
2. 材料を入力（カンマ区切り）
   - 例: `トマト, 玉ねぎ, にんにく, パスタ`
3. 料理の種類、難易度、調理時間を選択（オプション）
4. 「レシピを生成」ボタンをクリック
5. 生成されたレシピを確認
6. 気に入ったら「保存する」ボタンで保存

### 📚 保存したレシピを管理する

1. 「保存済み」タブをクリック
2. レシピ一覧から見たいレシピをクリック
3. 詳細を確認、必要に応じて削除

### 🔍 レシピを検索する

1. 「保存済み」タブで検索ボックスにキーワードを入力
2. レシピ名、材料、料理の種類で検索可能

## プロジェクト構造

```
recipe-ai-app/
├── src/
│   ├── components/         # UIコンポーネント
│   │   ├── RecipeForm.tsx       # レシピ生成フォーム
│   │   ├── RecipeDisplay.tsx    # レシピ表示
│   │   └── RecipeList.tsx       # レシピ一覧
│   ├── hooks/             # カスタムフック
│   │   └── useRecipes.ts        # レシピ管理ロジック
│   ├── services/          # ビジネスロジック
│   │   ├── openai.ts           # OpenAI API連携
│   │   └── localStorage.ts     # ローカルストレージ管理
│   ├── types/             # TypeScript型定義
│   │   └── Recipe.ts           # レシピ関連の型
│   ├── App.tsx            # メインコンポーネント
│   ├── App.css            # アプリケーションスタイル
│   ├── index.tsx          # エントリーポイント
│   └── index.css          # グローバルスタイル
├── public/
├── .env.example           # 環境変数テンプレート
├── package.json
├── tailwind.config.js     # Tailwind CSS設定
├── postcss.config.js      # PostCSS設定
└── README.md
```

## 開発

### ビルド

```bash
npm run build
```

ビルド成功後、`build/` フォルダに最適化されたプロダクションビルドが生成されます。

### テストの実行

```bash
npm test
```

### リンティング

```bash
npm run lint
```

## 実装済み機能

✅ React + TypeScript プロジェクトセットアップ  
✅ OpenAI API連携によるレシピ生成  
✅ ローカルストレージへのレシピ保存  
✅ レシピ一覧表示・詳細表示  
✅ レシピ削除機能  
✅ キーワード検索機能  
✅ Tailwind CSSによるレスポンシブデザイン  
✅ エラーハンドリング  

## 今後の機能追加予定

- [ ] レシピ編集機能（ユーザーメモの追加・編集）
- [ ] 難易度・調理時間でのフィルタリング強化
- [ ] ユーザー認証機能
- [ ] クラウド同期
- [ ] 栄養情報の表示
- [ ] レシピ共有機能
- [ ] ダークモード
- [ ] レシピ印刷機能
- [ ] CSV/PDFエクスポート

## トラブルシューティング

### ビルドエラー

Tailwind CSSのエラーが出る場合:

```bash
npm install -D tailwindcss@3 postcss autoprefixer
```

### APIエラー

OpenAI APIキーが正しく設定されていることを確認してください:

1. `.env` ファイルが存在するか確認
2. `REACT_APP_OPENAI_API_KEY` が正しく設定されているか確認
3. APIキーが有効か確認

## ライセンス

MIT

## 作者

Recipe AI Assistant Team

---

**仕様書**: [Confluence - 料理レシピ考案・保存アプリ仕様書](https://atlas-one-yokohamademo-01.atlassian.net/wiki/spaces/~5baad3e41fa6b77b16764511/pages/197033986/-)
