
export const BASE_URL = "http://10.1.6.31:3000/api";


export const GET_INGREDIENTS = `${BASE_URL}/ingredients`;

//export const GET_INGREDIENTS_FRUITS_VEGETABLES =

export const GET_INGREDIENTS_DETAILS = `${BASE_URL}/ingredients/{id}`;

export const GET_ALL_RECIPES = `${BASE_URL}/recipe`;

export const GET_RECIPES_BY_INGREDIENTS = (ingredients: string | string[]) => {
  const query = Array.isArray(ingredients)? ingredients.join(",") : ingredients;
  return `${BASE_URL}/recipe/by-ingredients?ingredients=${query}`;
};

//export const GET_RECIPES_SAVED_BY_USER =
//export const ADD_RECIPES_SAVED_BY_USER = 
//export const REMOVE_RECIPES_SAVED_BY_USER = 

//export const GET_RECIPES_COOKED_BY_USER =
//export const ADD_RECIPES_COOKED_BY_USER = 
 
//export const GET_HACKS_SAVED_BY_USER =
//export const ADD_HACKS_SAVED_BY_USER =
//export const REMOVE_HACKS_SAVED_BY_USER =

//export const GET_QUANTITY_SAVED_BY_USER =
//export const ADD_QUANTITY_SAVED_BY_USER = 

//export const GET_MONEY_SAVED_BY_USER =
//export const ADD_MONEY_SAVED_BY_USER = 

//export const GET_NUMBER_OF_RECIPES_COOKED_BY_USER =
//export const ADD_NUMBER_OF_RECIPES_COOKED_BY_USER =

//export const GET_QUANTITY_SAVED_BY_SAVEFUL =
//export const ADD_QUANTITY_SAVED_BY_SAVEFUL = 

//export const GET_HACKS =









