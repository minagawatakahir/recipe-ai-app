import React, { useState } from 'react';
import { RecipeGenerationRequest } from '../types/Recipe';

interface RecipeFormProps {
  onSubmit: (request: RecipeGenerationRequest) => void;
  loading: boolean;
}

export const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, loading }) => {
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [cookingTime, setCookingTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const request: RecipeGenerationRequest = {
      ingredients,
      cuisine: cuisine || undefined,
      difficulty: difficulty || undefined,
      cookingTime: cookingTime ? parseInt(cookingTime) : undefined,
    };
    
    onSubmit(request);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">レシピを考案</h2>
      
      <div>
        <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
          材料 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="例: トマト, 玉ねぎ, にんにく"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          required
        />
        <p className="text-xs text-gray-500 mt-1">カンマ区切りで複数の材料を入力してください</p>
      </div>

      <div>
        <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-2">
          料理の種類（オプション）
        </label>
        <select
          id="cuisine"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="">指定なし</option>
          <option value="和食">和食</option>
          <option value="洋食">洋食</option>
          <option value="中華">中華</option>
          <option value="イタリアン">イタリアン</option>
          <option value="フレンチ">フレンチ</option>
          <option value="エスニック">エスニック</option>
        </select>
      </div>

      <div>
        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
          難易度（オプション）
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="">指定なし</option>
          <option value="初心者">初心者</option>
          <option value="中級者">中級者</option>
          <option value="上級者">上級者</option>
        </select>
      </div>

      <div>
        <label htmlFor="cookingTime" className="block text-sm font-medium text-gray-700 mb-2">
          調理時間（オプション）
        </label>
        <input
          type="number"
          id="cookingTime"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
          placeholder="分"
          min="1"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">指定した時間内で完成するレシピを提案します</p>
      </div>

      <button
        type="submit"
        disabled={loading || !ingredients}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'レシピを生成中...' : 'レシピを生成'}
      </button>
    </form>
  );
};
