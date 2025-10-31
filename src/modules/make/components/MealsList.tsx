// import SkeletonLoader from '../../../common/components/SkeletonLoader';
// import { filterAllergiesByUserPreferences } from '../../../common/helpers/filterIngredients';
// import useContent from '../../../common/hooks/useContent';
// import tw from '../../../common/tailwind';
// import { IFramework } from '../../../models/craft';
// import { useGetUserOnboardingQuery } from '../../../modules/intro/api/api';
// import MealCard from './MealCard';
// import React, { useEffect } from 'react';
// import { Dimensions, View } from 'react-native';

// const windowWidth = Dimensions.get('window').width;
// const itemLength = windowWidth - 40;

// export default function MealsList({ filters }: { filters: string[] }) {
//   const { getFrameworks } = useContent();
//   const { data: userOnboarding } = useGetUserOnboardingQuery();
//   const [frameworks, setFrameworks] = React.useState<IFramework[]>([]);
//   const [isLoading, setIsLoading] = React.useState<boolean>(true);

//   const getFrameworksData = async () => {
//     const data = await getFrameworks();

//     if (data) {
//       setFrameworks(
//         filterAllergiesByUserPreferences(data, userOnboarding?.allergies),
//       );
//       setIsLoading(false);
//     }
//   };

//  useEffect(() => {
//     getFrameworksData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userOnboarding]);

//   const skeletonStyles = [
//     `mb-3 h-[311px] w-[${itemLength}px] overflow-hidden rounded`,
//   ];

//   if (isLoading || !frameworks.length) {
//     return (
//       <View style={tw`flex-row flex-wrap justify-center pt-5`}>
//         {Array.from(Array(2).keys()).map((_, index: number) => (
//           <View key={index}>
//             <SkeletonLoader styles={skeletonStyles} />
//           </View>
//         ))}
//       </View>
//     );
//   }

//   return (
//     <View style={tw`m-5 gap-2`}>
//       {frameworks
//         .filter(framework =>
//           framework.frameworkCategories.some(
//             category => filters.includes(category.id) || filters.length === 0,
//           ),
//         )
//         .map(item => (
//           <MealCard key={item.id} {...item} />
//         ))}
//     </View>
//   );
// }

//TO GET DATA FROM NODEJS BACKEND
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";
import tw from "../../../common/tailwind";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SkeletonLoader from "../../../common/components/SkeletonLoader";
import MealCard from "./MealCard";
import {
  GET_ALL_RECIPES,
  GET_RECIPES_BY_INGREDIENTS,
} from "../../../services/api";

interface Ingredient {
  id: number;
  name: string;
  quantity: string;
  description?: string | null;
}

interface Step {
  id: number;
  order: number;
  content: string;
}

interface Category {
  id: number;
  name: string;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  cuisine: string;
  cookingTime: number;
  difficulty: string;
  imageUrl: string;
  videoUrl?: string;
  ingredients: Ingredient[];
  steps: Step[];
  categories: Category[];
  slug?: string; // optional for navigation param
}

interface MealsListProps {
  filters: string[]; // category ids as strings
}

const windowWidth = Dimensions.get("window").width;
const itemLength = windowWidth - 40;

export default function MealsList({ filters }: MealsListProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(GET_ALL_RECIPES);
      const json = await response.json();
      //console.log('API response:', json);

      // Check if data is wrapped in a "recipes" key
      const data = Array.isArray(json) ? json : json.recipes;

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format from API");
      }

      setRecipes(data);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Logs for debugging
  useEffect(() => {
    //console.log("Loaded recipes:", recipes);
    //console.log("Active filters:", filters);
  }, [recipes, filters]);

  // Filter recipes by category id string
  const filteredRecipes =
    filters.length === 0
      ? recipes
      : recipes.filter((recipe) =>
          recipe.categories?.some((category) =>
            filters.includes(category.id.toString())
          )
        );

  const skeletonStyles = [
    `mb-3 h-[311px] w-[${itemLength}px] overflow-hidden rounded`,
  ];

  if (isLoading) {
    return (
      <View style={tw`flex-row flex-wrap justify-center pt-5`}>
        {Array.from(Array(2).keys()).map((index) => (
          <View key={index}>
            <SkeletonLoader styles={skeletonStyles} />
          </View>
        ))}
      </View>
    );
  }

  // No recipes at all
  if (!recipes.length) {
    return (
      <View style={tw`m-5 flex-row items-center`}>
        <MaterialCommunityIcons name="alert" size={16} color="red" />
        <Text style={tw`text-red-600 text-sm ml-2`}>
          No meals available. Please check your API or try again later.
        </Text>
      </View>
    );
  }

  // No recipes match the current filters
  if (!filteredRecipes.length) {
    return (
      <View style={tw`m-5 flex-row items-center`}>
        <MaterialCommunityIcons name="alert" size={16} color="red" />
        <Text style={tw`text-red-600 text-sm ml-2`}>
          No meals found matching your filters.
        </Text>
      </View>
    );
  }

  // Recipes are loaded and filtered
  return (
    <ScrollView style={tw`m-5`} contentContainerStyle={tw`gap-4`}>
      {filteredRecipes.map((recipe) => (
        <MealCard
          key={recipe.id}
          recipe={recipe} // Pass full recipe to card
        />
      ))}
    </ScrollView>
  );
}
