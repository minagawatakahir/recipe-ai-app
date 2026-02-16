import React, { useState } from 'react';
import { Recipe, RecipeGenerationRequest } from './types/Recipe';
import { useRecipes } from './hooks/useRecipes';
import { RecipeForm } from './components/RecipeForm';
import { RecipeDisplay } from './components/RecipeDisplay';
import { RecipeList } from './components/RecipeList';
import './App.css';

type AppView = 'home' | 'generated-recipe' | 'saved-recipes' | 'recipe-detail';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    recipes,
    loading,
    error,
    generateRecipe,
    saveRecipe,
    deleteRecipe,
    searchRecipes,
  } = useRecipes();

  const handleGenerateRecipe = async (request: RecipeGenerationRequest) => {
    setErrorMessage(null);
    try {
      const recipe = await generateRecipe(request);
      setGeneratedRecipe(recipe);
      setCurrentView('generated-recipe');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'レシピの生成に失敗しました';
      setErrorMessage(errorMsg);
    }
  };

  const handleSaveRecipe = (recipe: Recipe) => {
    try {
      saveRecipe(recipe);
      setErrorMessage(null);
      setCurrentView('generated-recipe');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'レシピの保存に失敗しました';
      setErrorMessage(errorMsg);
    }
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('recipe-detail');
  };

  const handleDeleteRecipe = (id: string) => {
    try {
      deleteRecipe(id);
      setErrorMessage(null);
      if (selectedRecipe?.id === id) {
        setCurrentView('saved-recipes');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'レシピの削除に失敗しました';
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-600">🍳 Recipe AI Assistant</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-4 py-2 rounded-md font-semibold transition ${
                currentView === 'home'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              新規レシピ
            </button>
            <button
              onClick={() => setCurrentView('saved-recipes')}
              className={`px-4 py-2 rounded-md font-semibold transition ${
                currentView === 'saved-recipes'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              保存済み ({recipes.length})
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Error Message */}
        {(errorMessage || error) && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-semibold">エラーが発生しました</p>
            <p>{errorMessage || error}</p>
          </div>
        )}

        {/* Home View - Recipe Form */}
        {currentView === 'home' && (
          <div className="max-w-2xl mx-auto">
            <RecipeForm onSubmit={handleGenerateRecipe} loading={loading} />
          </div>
        )}

        {/* Generated Recipe View */}
        {currentView === 'generated-recipe' && generatedRecipe && (
          <div className="max-w-4xl mx-auto">
            <RecipeDisplay
              recipe={generatedRecipe}
              onSave={handleSaveRecipe}
              onBack={() => {
                setCurrentView('home');
                setGeneratedRecipe(null);
              }}
            />
          </div>
        )}

        {/* Saved Recipes List View */}
        {currentView === 'saved-recipes' && (
          <div className="max-w-6xl mx-auto">
            <RecipeList
              recipes={recipes}
              onSelectRecipe={handleSelectRecipe}
              onDeleteRecipe={handleDeleteRecipe}
              onSearch={searchRecipes}
            />
          </div>
        )}

        {/* Recipe Detail View */}
        {currentView === 'recipe-detail' && selectedRecipe && (
          <div className="max-w-4xl mx-auto">
            <RecipeDisplay
              recipe={selectedRecipe}
              onSave={() => {}}
              onBack={() => setCurrentView('saved-recipes')}
              saved={true}
            />
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => {
                  if (window.confirm('このレシピを削除しますか？')) {
                    handleDeleteRecipe(selectedRecipe.id);
                  }
                }}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition"
              >
                このレシピを削除
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
