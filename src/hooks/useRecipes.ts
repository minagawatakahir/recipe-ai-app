import { useState, useCallback } from 'react';
import { Recipe, RecipeGenerationRequest } from '../types/Recipe';
import * as localStorageService from '../services/localStorage';
import * as openaiService from '../services/openai';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(() => 
    localStorageService.getSavedRecipes()
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRecipe = useCallback(async (request: RecipeGenerationRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const recipe = await openaiService.generateRecipe(request);
      return recipe;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'レシピ生成に失敗しました';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const saveRecipe = useCallback((recipe: Recipe) => {
    try {
      localStorageService.saveRecipe(recipe);
      setRecipes(localStorageService.getSavedRecipes());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'レシピの保存に失敗しました';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const updateRecipe = useCallback((id: string, updates: Partial<Recipe>) => {
    try {
      localStorageService.updateRecipe(id, updates);
      setRecipes(localStorageService.getSavedRecipes());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'レシピの更新に失敗しました';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const deleteRecipe = useCallback((id: string) => {
    try {
      localStorageService.deleteRecipe(id);
      setRecipes(localStorageService.getSavedRecipes());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'レシピの削除に失敗しました';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const searchRecipes = useCallback((keyword: string) => {
    return localStorageService.searchRecipes(keyword);
  }, []);

  const filterByDifficulty = useCallback((difficulty: string) => {
    return localStorageService.filterRecipesByDifficulty(difficulty);
  }, []);

  const filterByCookingTime = useCallback((maxTime: number) => {
    return localStorageService.filterRecipesByCookingTime(maxTime);
  }, []);

  return {
    recipes,
    loading,
    error,
    generateRecipe,
    saveRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipes,
    filterByDifficulty,
    filterByCookingTime,
  };
};
