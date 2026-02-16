import React from 'react';
import { Recipe } from '../types/Recipe';

interface RecipeDisplayProps {
  recipe: Recipe;
  onSave: (recipe: Recipe) => void;
  onBack: () => void;
  saved?: boolean;
}

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ 
  recipe, 
  onSave, 
  onBack,
  saved = false 
}) => {
  const difficultyLabels = {
    beginner: '初心者',
    intermediate: '中級者',
    advanced: '上級者',
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{recipe.name}</h2>
        <div className="flex gap-2">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md transition duration-200"
          >
            戻る
          </button>
          {!saved && (
            <button
              onClick={() => onSave(recipe)}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition duration-200"
            >
              保存する
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-orange-50 rounded-lg">
        <div>
          <p className="text-sm text-gray-600">料理の種類</p>
          <p className="text-lg font-semibold text-gray-800">{recipe.cuisine}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">難易度</p>
          <p className="text-lg font-semibold text-gray-800">
            {difficultyLabels[recipe.difficulty]}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">調理時間</p>
          <p className="text-lg font-semibold text-gray-800">{recipe.cookingTime}分</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">材料</h3>
        <ul className="space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              <span className="text-gray-700">
                {ingredient.name}: {ingredient.quantity} {ingredient.unit}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">作り方</h3>
        <ol className="space-y-4">
          {recipe.instructions.map((instruction) => (
            <li key={instruction.step} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                {instruction.step}
              </span>
              <p className="text-gray-700 pt-1">{instruction.description}</p>
            </li>
          ))}
        </ol>
      </div>

      {saved && recipe.savedAt && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            保存日時: {new Date(recipe.savedAt).toLocaleString('ja-JP')}
          </p>
        </div>
      )}
    </div>
  );
};
