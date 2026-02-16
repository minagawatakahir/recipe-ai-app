export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface Instruction {
  step: number;
  description: string;
}

export interface Recipe {
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

export interface RecipeGenerationRequest {
  ingredients: string;
  cuisine?: string;
  difficulty?: string;
  cookingTime?: number;
}
