import { Recipe, RecipeGenerationRequest } from '../types/Recipe';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const generateRecipe = async (request: RecipeGenerationRequest): Promise<Recipe> => {
  const prompt = buildPrompt(request);

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'あなたは経験豊富な料理のプロフェッショナルです。ユーザーの要望に基づいて、詳細で実用的なレシピを提案してください。JSON形式で回答してください。',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    const recipeData = JSON.parse(content);
    
    return {
      id: generateId(),
      ...recipeData,
    };
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw error;
  }
};

const buildPrompt = (request: RecipeGenerationRequest): string => {
  let prompt = `以下の条件でレシピを作成してください:\n\n`;
  prompt += `材料: ${request.ingredients}\n`;
  
  if (request.cuisine) {
    prompt += `料理の種類: ${request.cuisine}\n`;
  }
  
  if (request.difficulty) {
    prompt += `難易度: ${request.difficulty}\n`;
  }
  
  if (request.cookingTime) {
    prompt += `調理時間: ${request.cookingTime}分以内\n`;
  }
  
  prompt += `\n以下のJSON形式で回答してください:\n`;
  prompt += `{
  "name": "レシピ名",
  "ingredients": [
    {
      "name": "材料名",
      "quantity": "量",
      "unit": "単位"
    }
  ],
  "instructions": [
    {
      "step": 1,
      "description": "手順の説明"
    }
  ],
  "cookingTime": 調理時間(数値),
  "difficulty": "beginner" | "intermediate" | "advanced",
  "cuisine": "料理の種類"
}`;
  
  return prompt;
};

const generateId = (): string => {
  return `recipe-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
