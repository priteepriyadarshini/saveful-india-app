// import {
//   GenericCarouselFlatlist,
//   GenericCarouselWrapper,
// } from '../../../common/components/GenericCarousel';
// import Pill from '../../../common/components/Pill';
// import SkeletonLoader from '../../../common/components/SkeletonLoader';
// import { filterAllergiesByUserPreferences } from '../../../common/helpers/filterIngredients';
// import useContent from '../../../common/hooks/useContent';
// import tw from '../../../common/tailwind';
// import { IFramework } from '../../../models/craft';
// import { mixpanelEventName } from '../../../modules/analytics/analytics';
// import useAnalytics from '../../../modules/analytics/hooks/useAnalytics';
// import MealCard from '../../../modules/feed/components/MealCard';
// import { useGetUserOnboardingQuery } from '../../../modules/intro/api/api';
// import { useCurentRoute } from '../../../modules/route/context/CurrentRouteContext';
// import {
//   useGetFavouritesQuery,
//   useGetUserMealsQuery,
// } from '../../../modules/track/api/api';
// import React, { useEffect, useState } from 'react';
// import { Dimensions, ImageBackground, Text, View } from 'react-native';
// import { h6TextStyle } from '../../../theme/typography';

// const windowWidth = Dimensions.get('window').width;
// const itemLength = windowWidth - 40;

// export default function MealsCarousel() {
//   const [mealType, setMealType] = useState<string>('Trending');
//   const isChecked = (value: string) => {
//     return mealType === value;
//   };

//   const { getFrameworks } = useContent();
//   const { data: cookedMeals } = useGetUserMealsQuery();
//   const { data: savedMeals } = useGetFavouritesQuery();
//   const { data: userOnboarding } = useGetUserOnboardingQuery();

//   const MEAL_TYPES = [
//     {
//       id: 1,
//       name: 'Trending',
//     },
//     // Only add cooked option if user has cooked meals
//     ...(cookedMeals?.length
//       ? [
//           {
//             id: 2,
//             name: 'Cooked',
//           },
//         ]
//       : []),
//     // Only add saved option if user has saved meals
//     ...(savedMeals?.length
//       ? [
//           {
//             id: 3,
//             name: 'Saved',
//           },
//         ]
//       : []),
//   ];

//   const [, updateState] = React.useState<unknown>();
//   const forceUpdate = React.useCallback(() => updateState({}), []);

//   const { sendAnalyticsEvent } = useAnalytics();
//   const { newCurrentRoute } = useCurentRoute();

//   const [maxHeight, setMaxHeight] = useState<number>(0);

//   const [frameworks, setFrameworks] = React.useState<IFramework[]>([]);
//   const [isLoading, setIsLoading] = React.useState<boolean>(false);

//   const flatListRef = React.useRef<any>(null); // Reference to the FlatList component

//   // Function to scroll the FlatList
//   const scrollCarousel = (offset: number) => {
//     if (flatListRef.current) {
//       flatListRef.current.scrollToOffset({ offset, animated: true });
//     }
//   };

//   const getFrameworksData = async () => {
//     setIsLoading(true);
//     const data = await getFrameworks();

//     if (data) {
//       setFrameworks(
//         filterAllergiesByUserPreferences(data, userOnboarding?.allergies),
//       );
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getFrameworksData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const carouselItems = frameworks.filter((framework, index) => {
//     if (mealType === 'Cooked') {
//       return cookedMeals?.some(meal => meal.framework_id === framework.id);
//     } else if (mealType === 'Saved') {
//       return savedMeals?.some(meal => `${meal.framework_id}` === framework.id);
//     } else {
//       if (index < 5) {
//         return true;
//       }
//     }

//     return false;
//   });

//   const skeletonStyles = [
//     `mb-3 h-[311px] w-[${itemLength}px] overflow-hidden rounded`,
//   ];

//   return (
//     <ImageBackground
//       style={tw`w-full items-center py-10`}
//       source={require('../../../../assets/ribbons/lemon.png')}
//     >
//       <Text
//         style={tw.style(h6TextStyle, 'mb-5 px-5 text-center')}
//         maxFontSizeMultiplier={1}
//       >
//         MAXIMUM-FLAVOUR, MINIMAL-WASTE meals
//       </Text>
//       {isLoading ? (
//         <View style={tw`flex-row pl-5`}>
//           {Array.from(Array(3).keys()).map((_, index) => (
//             <View style={tw`mr-3`} key={index}>
//               <SkeletonLoader styles={skeletonStyles} />
//             </View>
//           ))}
//         </View>
//       ) : (
//         <>
//           <View style={tw`mb-3 flex-row flex-wrap justify-center gap-1`}>
//             {MEAL_TYPES.map((item, index) => (
//               <Pill
//                 key={index}
//                 text={item.name}
//                 size="small"
//                 kind="vibrant"
//                 isActive={isChecked(item.name)}
//                 setIsActive={() => {
//                   sendAnalyticsEvent({
//                     event: mixpanelEventName.actionClicked,
//                     properties: {
//                       location: newCurrentRoute,
//                       item: item.name,
//                       action: 'Meal Tab Filtered',
//                     },
//                   });
//                   scrollCarousel(0);
//                   setMealType(item.name);
//                   forceUpdate();
//                 }}
//               />
//             ))}
//           </View>
//           <GenericCarouselWrapper style={tw`relative overflow-hidden pb-5`}>
//             <GenericCarouselFlatlist
//               flatListRef={flatListRef}
//               contentContainerStyle={tw`pl-5 pr-3`}
//               data={carouselItems}
//               itemLength={itemLength + 8}
//               renderItem={(renderItem: { item: IFramework; index: number }) => (
//                 <View style={tw.style(`w-[${itemLength}px] mr-2`)}>
//                   <MealCard
//                     {...renderItem.item}
//                     maxHeight={maxHeight}
//                     setMaxHeight={setMaxHeight}
//                   />
//                 </View>
//               )}
//               section={'Meals'}
//               snapToAlignment="start"
//             />
//           </GenericCarouselWrapper>
//         </>
//       )}
//     </ImageBackground>
//   );
// }














import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import tw from "../../../common/tailwind";
import MealCard from "./MealCard";
import { h6TextStyle } from "../../../theme/typography";

// Import all your API constants (you’ll define them below)
import { GET_ALL_RECIPES } from "../../../services/api";

const windowWidth = Dimensions.get("window").width;
const itemLength = windowWidth - 80;

interface Recipe {
  id: number;
  name: string;
  imageUrl: string;
  dietaryPreferences?: string[];
  allergyFlags?: string[];
}

const MEAL_TYPES = [
  { id: 1, name: "Trending" },
  { id: 2, name: "Cooked" },
  { id: 3, name: "Saved" },
];

export default function MealsCarousel() {
  const [mealType, setMealType] = useState<string>("Trending");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const flatListRef = useRef<FlatList>(null);

  const scrollCarousel = (offset: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset, animated: true });
    }
  };

  const fetchRecipes = async () => {
    try {
      setIsLoading(true);

      let endpoint = "";
      switch (mealType) {
        case "Trending":
          endpoint = GET_ALL_RECIPES;
          break;
        case "Cooked":
          endpoint = GET_ALL_RECIPES;
          break;
        case "Saved":
          endpoint = GET_ALL_RECIPES;
          break;
        default:
          endpoint = GET_ALL_RECIPES;
      }

      const res = await fetch(endpoint);
      const data = await res.json();
      setRecipes(data || []);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [mealType]);

  return (
    <ImageBackground
      source={require("../../../../assets/ribbons/lemon.png")}
      style={tw`w-full items-center py-10`}
      resizeMode="cover"
    >
      <Text
        style={tw.style(h6TextStyle, "mb-5 px-5 text-center")}
        maxFontSizeMultiplier={1}
      >
        MAXIMUM-FLAVOUR, MINIMAL-WASTE MEALS
      </Text>

      {/* Category Tabs */}
      <View style={tw`mb-3 flex-row flex-wrap justify-center gap-1`}>
        {MEAL_TYPES.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => {
              setMealType(item.name);
              scrollCarousel(0);
            }}
            style={tw.style(
              "px-4 py-1 rounded-full border",
              mealType === item.name
                ? "bg-green-700 border-green-700"
                : "bg-white border-gray-300"
            )}
          >
            <Text
              style={tw.style(
                "text-sm font-semibold",
                mealType === item.name ? "text-white" : "text-gray-800"
              )}
            >
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#2E7D32" style={tw`mt-5`} />
      ) : (
        <FlatList
          ref={flatListRef}
          horizontal
          data={recipes}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          contentContainerStyle={tw`pl-5 pr-3`}
          renderItem={({ item }) => (
            <View style={tw.style(`w-[${itemLength}px] mr-3`)}>
              <MealCard
                recipe={item}
                maxHeight={maxHeight}
                setMaxHeight={setMaxHeight}
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </ImageBackground>
  );
}
