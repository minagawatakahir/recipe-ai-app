import React, { useState, useMemo } from 'react';
import { Recipe } from '../types/Recipe';
import { FilterPanel } from './FilterPanel';

interface RecipeListProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (id: string) => void;
  onSearch: (keyword: string) => Recipe[];
}

export const RecipeList: React.FC<RecipeListProps> = ({ 
  recipes, 
  onSelectRecipe, 
  onDeleteRecipe,
  onSearch 
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [maxCookingTime, setMaxCookingTime] = useState<number>(180);

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const displayRecipes = useMemo(() => {
    let result = recipes;

    // 検索キーワードでフィルタ
    if (searchKeyword.trim()) {
      result = onSearch(searchKeyword);
    }

    // 難易度でフィルタ
    if (selectedDifficulty !== 'all') {
      result = result.filter(recipe => recipe.difficulty === selectedDifficulty);
    }

    // 調理時間でフィルタ
    result = result.filter(recipe => recipe.cookingTime <= maxCookingTime);

    return result;
  }, [recipes, searchKeyword, selectedDifficulty, maxCookingTime, onSearch]);

  const difficultyLabels = {
    beginner: '初心者',
    intermediate: '中級者',
    advanced: '上級者',
  };

  return (
    <div className="space-y-6">
      {/* Filter Panel */}
      <FilterPanel
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        maxCookingTime={maxCookingTime}
        onCookingTimeChange={setMaxCookingTime}
      />

      {/* Recipe List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">保存済みレシピ</h2>
        
        <div className="mb-6">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="レシピを検索..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {displayRecipes.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            {searchKeyword ? '検索結果がありません' : '条件に合うレシピはありません'}
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {displayRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition duration-200 cursor-pointer recipe-card"
                onClick={() => onSelectRecipe(recipe)}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">{recipe.name}</h3>
                
                <div className="space-y-1 text-sm text-gray-600 mb-3">
                  <p>🍽️ {recipe.cuisine}</p>
                  <p>⏱️ {recipe.cookingTime}分</p>
                  <p>📊 {difficultyLabels[recipe.difficulty]}</p>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRecipe(recipe);
                    }}
                    className="text-orange-500 hover:text-orange-600 font-semibold text-sm"
                  >
                    詳細を見る
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('このレシピを削除しますか？')) {
                        onDeleteRecipe(recipe.id);
                      }
                    }}
                    className="text-red-500 hover:text-red-600 font-semibold text-sm"
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
