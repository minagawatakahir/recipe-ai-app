import { Recipe } from '../types/Recipe';

const STORAGE_KEY = 'saved-recipes';

export const saveRecipe = (recipe: Recipe): void => {
  const recipes = getSavedRecipes();
  const recipeWithTimestamp = {
    ...recipe,
    savedAt: new Date().toISOString(),
  };
  
  recipes.push(recipeWithTimestamp);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
};

export const getSavedRecipes = (): Recipe[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error parsing saved recipes:', error);
    return [];
  }
};

export const getRecipeById = (id: string): Recipe | null => {
  const recipes = getSavedRecipes();
  return recipes.find(recipe => recipe.id === id) || null;
};

export const updateRecipe = (id: string, updates: Partial<Recipe>): void => {
  const recipes = getSavedRecipes();
  const index = recipes.findIndex(recipe => recipe.id === id);
  
  if (index !== -1) {
    recipes[index] = { ...recipes[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }
};

export const deleteRecipe = (id: string): void => {
  const recipes = getSavedRecipes();
  const filtered = recipes.filter(recipe => recipe.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const searchRecipes = (keyword: string): Recipe[] => {
  const recipes = getSavedRecipes();
  const lowerKeyword = keyword.toLowerCase();
  
  return recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(lowerKeyword) ||
    recipe.ingredients.some(ing => ing.name.toLowerCase().includes(lowerKeyword)) ||
    recipe.cuisine.toLowerCase().includes(lowerKeyword)
  );
};

export const filterRecipesByDifficulty = (difficulty: string): Recipe[] => {
  const recipes = getSavedRecipes();
  return recipes.filter(recipe => recipe.difficulty === difficulty);
};

export const filterRecipesByCookingTime = (maxTime: number): Recipe[] => {
  const recipes = getSavedRecipes();
  return recipes.filter(recipe => recipe.cookingTime <= maxTime);
};
