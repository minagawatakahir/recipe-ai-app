# Recipe AI Assistant - プロジェクトサマリー

## プロジェクト概要

料理のレシピをAI（OpenAI API）に考案してもらい、気に入ったレシピを保存・管理できるWebアプリケーション。

**プロジェクト位置**: `~/Dev/recipe-ai-app`

## 開発状況

**ステータス**: ✅ Phase 1 (v0.1) 完了

### 完了した機能

1. ✅ React + TypeScript プロジェクトのセットアップ
2. ✅ OpenAI API連携によるレシピ生成機能
3. ✅ ローカルストレージへのレシピ保存機能
4. ✅ レシピ管理機能（一覧、詳細、削除）
5. ✅ 検索・フィルタリング機能
6. ✅ Tailwind CSSによるUI/UXデザイン
7. ✅ ビルドとテスト

### 技術スタック

- **フロントエンド**: React 18 + TypeScript
- **スタイリング**: Tailwind CSS 3
- **AI API**: OpenAI API (GPT-3.5-turbo)
- **データ保存**: localStorage
- **ビルドツール**: Create React App

## ファイル構成

### コアファイル

```
src/
├── types/Recipe.ts              # 型定義
├── services/
│   ├── openai.ts               # OpenAI API連携
│   └── localStorage.ts         # データ永続化
├── hooks/useRecipes.ts         # レシピ管理ロジック
├── components/
│   ├── RecipeForm.tsx          # 入力フォーム
│   ├── RecipeDisplay.tsx       # レシピ表示
│   └── RecipeList.tsx          # 一覧表示
└── App.tsx                     # メインアプリ
```

## 主要機能

### 1. レシピ生成機能

- 材料、料理の種類、難易度、調理時間を入力
- OpenAI APIがJSON形式でレシピを生成
- 材料リストと手順を整形して表示

**実装ファイル**: 
- `src/services/openai.ts`
- `src/components/RecipeForm.tsx`

### 2. レシピ保存機能

- 生成されたレシピをワンクリックで保存
- ローカルストレージに永続化
- 保存日時を自動記録

**実装ファイル**: 
- `src/services/localStorage.ts`
- `src/hooks/useRecipes.ts`

### 3. レシピ管理機能

- 保存済みレシピの一覧表示
- レシピ詳細の閲覧
- レシピの削除

**実装ファイル**: 
- `src/components/RecipeList.tsx`
- `src/components/RecipeDisplay.tsx`

### 4. 検索・フィルタリング機能

- キーワード検索（レシピ名、材料、料理の種類）
- 難易度フィルター
- 調理時間フィルター

**実装ファイル**: 
- `src/services/localStorage.ts`

## データ構造

### Recipe型

```typescript
interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  cookingTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  cuisine: string;
  savedAt?: string;
  userNotes?: string;
}
```

## セットアップ手順

1. **依存関係のインストール**
   ```bash
   cd ~/Dev/recipe-ai-app
   npm install
   ```

2. **環境変数の設定**
   ```bash
   cp .env.example .env
   # .env ファイルに OpenAI API キーを設定
   ```

3. **開発サーバーの起動**
   ```bash
   npm start
   ```

4. **ビルド**
   ```bash
   npm run build
   ```

## 次のステップ（Phase 2）

Phase 2 (v0.2) の実装予定:

- [ ] レシピ編集機能の強化（ユーザーメモ）
- [ ] フィルタリング機能のUI実装
- [ ] レシピのソート機能
- [ ] お気に入り機能

## ドキュメント

- **README**: `/Users/tminagawa/Dev/recipe-ai-app/README.md`
- **仕様書**: [Confluence](https://atlas-one-yokohamademo-01.atlassian.net/wiki/spaces/~5baad3e41fa6b77b16764511/pages/197033986/-)

## ビルド結果

- **ビルドサイズ**: 1.2MB
- **メインJS**: 64.25 kB (gzipped)
- **メインCSS**: 3.43 kB (gzipped)

---

**作成日**: 2026-02-16  
**最終更新**: 2026-02-16
