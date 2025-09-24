// src/services/api/recipe.api.ts
export async function fetchRecipeByIngredient(ingredient: string) {
  const res = await fetch(
    `http://10.1.3.233:3000/api/recipe/by-ingredient?ingredient=${ingredient}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch recipe: ${res.status}`);
  }

  return res.json();
}
