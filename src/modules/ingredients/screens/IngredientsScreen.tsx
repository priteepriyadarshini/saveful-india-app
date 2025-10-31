// import FocusAwareStatusBar from '../../../common/components/FocusAwareStatusBar';
// import SkeletonLoader from '../../../common/components/SkeletonLoader';
// import {
//   filterAllergiesByUserPreferences,
//   getAllIngredientsFromComponents,
// } from '../../../common/helpers/filterIngredients';
// import useContent from '../../../common/hooks/useContent';
// import tw from '../../../common/tailwind';
// import { IFramework, IIngredient } from '../../../models/craft';
// import { mixpanelEventName } from '../../../modules/analytics/analytics';
// import useAnalytics from '../../../modules/analytics/hooks/useAnalytics';
// import IngredientsFooter from '../../../modules/ingredients/components/IngredientsFooter';
// import IngredientsList from '../../../modules/ingredients/components/IngredientsList';
// import IngredientsSearchBarHeader from '../../../modules/ingredients/components/IngredientsSearchBarHeader';
// import { IngredientsStackScreenProps } from '../../../modules/ingredients/navigation/IngredientsNavigator';
// import { useGetUserOnboardingQuery } from '../../../modules/intro/api/api';
// import React, { useEffect, useRef } from 'react';
// import {
//   Animated,
//   Dimensions,
//   KeyboardAvoidingView,
//   Platform,
//   View,
// } from 'react-native';

// const windowWidth = Dimensions.get('window').width;
// const itemLength = windowWidth - 40;

// export default function IngredientsScreen({
//   navigation,
// }: IngredientsStackScreenProps<'IngredientsHome'>) {
//   const offset = useRef(new Animated.Value(0)).current;
//   const [selectedIngredients, setSelectedIngredients] = React.useState<string[]>([]);
//   const [, updateState] = React.useState<unknown>();
//   const forceUpdate = React.useCallback(() => updateState({}), []);
//   const onValueChecked = (value: string) => {
//     const valueIndex = selectedIngredients.findIndex(x => x === value);

//     if (valueIndex === -1) {
//       setSelectedIngredients([...selectedIngredients, value]);
//     } else {
//       const updatedArray = [...selectedIngredients];
//       updatedArray.splice(valueIndex, 1);

//       setSelectedIngredients(updatedArray);
//     }

//     forceUpdate();
//   };

//   const { getIngredients, getFrameworks } = useContent();

//   const { data: userOnboarding } = useGetUserOnboardingQuery();

//   const [ingredients, setIngredients] = React.useState<IIngredient[]>([]);
//   const [frameworks, setFrameworks] = React.useState<IFramework[]>([]);
//   const [isLoading, setIsLoading] = React.useState<boolean>(true);

//   const getIngredientsData = async () => {
//     const data = await getIngredients();

//     if (data) {
//       setIngredients(data);
//       setIsLoading(false);
//     }
//   };

//   const getFrameworksData = async () => {
//     const data = await getFrameworks();

//     if (data) {
//       setFrameworks(
//         filterAllergiesByUserPreferences(data, userOnboarding?.allergies),
//       );
//     }
//   };

//   useEffect(() => {
//     getIngredientsData();
//     getFrameworksData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const [searchInput, setSearchInput] = React.useState<string>('');

//   const allExistingIngredients = (frameworks: IFramework[]) => {
//     const allExtractedIngredients = [] as string[];
//     frameworks.forEach(framework => {
//       allExtractedIngredients.push(
//         ...getAllIngredientsFromComponents(framework.components).map(
//           item => item.title,
//         ),
//       );
//     });
//     return Array.from(new Set(allExtractedIngredients));
//   };

//   const extractedIngredients = allExistingIngredients(frameworks);

//   const filteredIngredients = ingredients.filter(ingredient =>
//     extractedIngredients.some(ex => ex === ingredient.title),
//   );

//   const filteredData = filteredIngredients.filter(item => {
//     const matchInput = item.title.toLowerCase().includes(searchInput.toLowerCase());
//     const activeIngredients = selectedIngredients.includes(item.id);
//     return activeIngredients || matchInput;
//   });

//   const skeletonStyles = [`w-[${itemLength}px] h-8 my-2`];

//   // Record what people are searching for - when no results are found
//   const { sendAnalyticsEvent } = useAnalytics();
//   useEffect(() => {
//     if (searchInput !== '' && filteredData.length === 0) {
//       sendAnalyticsEvent({
//         event: mixpanelEventName.ingredientSearchNoResults,
//         properties: {
//           search: searchInput,
//         },
//       });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [filteredData, searchInput]);

//   return (
//     <View style={tw`flex-1 bg-[#FFF5E7]`}>
//       <IngredientsSearchBarHeader
//         animatedValue={offset}
//         searchInput={searchInput}
//         setSearchInput={setSearchInput}
//       />
//       <View style={tw`flex-1`}>
//         {isLoading ? (
//           <View style={tw`items-center pt-4`}>
//             {Array.from(Array(20).keys()).map((_, index) => (
//               <View key={index}>
//                 <SkeletonLoader styles={skeletonStyles} />
//               </View>
//             ))}
//           </View>
//         ) : (
//           <View style={tw`flex-1 items-center justify-start`}>
//             <IngredientsList
//               offset={offset}
//               data={filteredData}
//               selectedIngredients={selectedIngredients}
//               setSelectedIngredients={onValueChecked}
//             />
//           </View>
//         )}
//       </View>

//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <IngredientsFooter
//           selectedIngredients={ingredients.filter(x =>
//             selectedIngredients.includes(x.id),
//           )}
//           onValueChecked={onValueChecked}
//           navigation={navigation}
//         />
//       </KeyboardAvoidingView>
//       <FocusAwareStatusBar statusBarStyle="dark" />
//     </View>
//   );
// }

// src/modules/ingredients/screens/IngredientsScreen.tsx
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  Animated,
} from "react-native";
import tw from "../../../common/tailwind";

import { IngredientsStackScreenProps } from "../navigation/IngredientsNavigator";
import IngredientList, { Ingredient } from "../components/IngredientsList";
import { GET_INGREDIENTS } from "../../../services/api";
import IngredientsSearchBarHeader from "../components/IngredientsSearchBarHeader";
import IngredientsFooter from "../components/IngredientsFooter";

export default function IngredientsScreen({
  navigation,
}: IngredientsStackScreenProps<"IngredientsHome">) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>(
    []
  );
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const offset = useRef(new Animated.Value(0)).current;

  // Fetch ingredients
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await fetch(GET_INGREDIENTS);
        const data: Ingredient[] = await res.json();
        setIngredients(data);
        setFilteredIngredients(data);
      } catch (err) {
        console.error("Failed to fetch ingredients", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIngredients();
  }, []);

  // Filter ingredients when search changes
  useEffect(() => {
    if (searchInput.trim() === "") {
      setFilteredIngredients(ingredients);
    } else {
      const filtered = ingredients.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredIngredients(filtered);
    }
  }, [searchInput, ingredients]);

  const toggleSelect = (ingredient: Ingredient) => {
    setSelectedIngredients((prev) =>
      prev.some((i) => i.id === ingredient.id)
        ? prev.filter((i) => i.id !== ingredient.id)
        : [...prev, ingredient]
    );
  };

  const onFindMeals = () => {
    navigation.navigate("IngredientsResults", { selectedIngredients });
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color={tw.color("green-600")} />
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-[#FFF5E7]`}>
      {/* Search Header */}
      <IngredientsSearchBarHeader
        animatedValue={offset}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      {/* Ingredients list */}
      <FlatList
        data={filteredIngredients.sort((a, b) => a.name.localeCompare(b.name))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <IngredientList
            ingredients={[item]}
            selectedIngredients={selectedIngredients}
            toggleSelect={toggleSelect}
          />
        )}
        contentContainerStyle={tw`px-4 pb-20 pt-2`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false }
        )}
      />

      {/* Footer */}
      <IngredientsFooter
        selectedIngredients={selectedIngredients}
        onFindMeals={onFindMeals}
        onRemoveIngredient={(ingredient) =>
          setSelectedIngredients((prev) =>
            prev.filter((i) => i.id !== ingredient.id)
          )
        }
      />
    </SafeAreaView>
  );
}
