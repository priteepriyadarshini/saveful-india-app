// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, Image, Pressable } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useLinkTo, useNavigation } from '@react-navigation/native';
// import useAnalytics from '../../analytics/hooks/useAnalytics';
// import {
//     GenericCarouselWrapper,
//     GenericCarouselFlatlist
// } from '../../../common/components/GenericCarousel';
// import currentMonth from '../../../common/helpers/currentMonths';
// import SkeletonLoader from '../../../common/components/SkeletonLoader';
// import { bundledSource } from '../../../common/helpers/uriHelpers';
// import tw from '../../../common/tailwind';
// import { IAsset, IIngredient } from '../../../models/craft';
// import { cardDrop } from '../../../theme/shadow';
// import { subheadMediumUppercase, h7TextStyle } from '../../../theme/typography';
// import { mixpanelEventName } from '../../analytics/analytics';
// import useEnvironment from '../../environment/hooks/useEnvironment';
// import { bgTheme } from '../utils/ingredientTheme';
// import { useGetUserOnboardingQuery } from '../../../modules/intro/api/api';
// import useContent from '../../../common/hooks/useContent';
// import { useCurentRoute } from '../../route/context/CurrentRouteContext';
// import { FeedStackScreenProps } from '../navigation/FeedNavigation';

// interface RenderItemProps {
//   id: string;
//   title: string;
//   heroImage: IAsset[];
//   ingredientTheme: string | null;
// }

// const itemLength = 160;

// function IngredientCard({
//   id,
//   title,
//   heroImage,
//   ingredientTheme,
// }: RenderItemProps) {
//   const env = useEnvironment();
//   const { sendAnalyticsEvent } = useAnalytics();
//   const { newCurrentRoute } = useCurentRoute();

//   //const linkTo = useLinkTo();
//   const navigation = useNavigation<FeedStackScreenProps<'FeedHome'>['navigation']>();

//   const onIngredientTapped = React.useCallback(() => {
//     sendAnalyticsEvent({
//       event: mixpanelEventName.actionClicked,
//       properties: {
//         location: newCurrentRoute,
//         action: mixpanelEventName.ingredientOpened,
//         id,
//         title,
//       },
//     });

//     // navigate into Ingredients stack
//     navigation.navigate('Ingredients', {
//       screen: 'IngredientDetail',
//       params: { id },
//     });
//   }, [id, title, navigation, sendAnalyticsEvent, newCurrentRoute]);

//   return (
//     <Pressable style={tw`mr-3`} onPress={onIngredientTapped}>
//       <View
//         style={[
//           tw`mb-3 rounded-full border border-strokecream ${bgTheme(
//             ingredientTheme,
//           )} p-3`,
//           cardDrop,
//         ]}
//       >
//         <Image
//           style={[tw`h-[124px] w-[124px] overflow-hidden rounded`]}
//           resizeMode="contain"
//           source={
//             heroImage[0]?.url
//               ? bundledSource(heroImage[0].url, env.useBundledContent)
//               : require('../../../../assets/ingredients/placeholder.png')
//           }
//           accessibilityIgnoresInvertColors
//         />
//       </View>

//       <Text
//         style={tw.style(subheadMediumUppercase, 'text-center text-midgray')}
//       >
//         {title}
//       </Text>
//     </Pressable>
//   );
// }

// export default function IngredientsCarousel() {
//   const flatListRef = React.useRef<any>(null);

//   const { getIngredients } = useContent();
//   const { data: userOnboarding } = useGetUserOnboardingQuery();
//   const [ingredients, setIngredients] = React.useState<IIngredient[]>([]);
//   const [isLoading, setIsLoading] = React.useState<boolean>(true);

//   const getIngredientsData = async () => {
//     setIsLoading(true);
//     const data = await getIngredients();

//     if (data) {
//       setIngredients(
//         data
//           .filter(x => currentMonth(x.inSeason as string[]))
//           .filter(x => !userOnboarding?.allergies.some(f => f === x.id))
//           .sort((a, b) => a.title.localeCompare(b.title)),
//       );
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getIngredientsData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userOnboarding]);

//   const skeletonStyles = [
//     'mb-3 h-[148px] w-[148px] overflow-hidden rounded-full',
//     'mx-auto h-3.5 w-[124px]',
//   ];

//   return (
//     <View style={tw.style('bg-creme pb-12 pt-6')}>
//       <Text
//         style={tw.style(h7TextStyle, 'mx-5 text-center')}
//         maxFontSizeMultiplier={1}
//       >
//         Turn in-season fruit & veg into something delicious
//       </Text>

//       <GenericCarouselWrapper style={tw.style(`relative mt-7 overflow-hidden`)}>
//         {isLoading ? (
//           <View style={tw`flex-row pl-5 pr-2`}>
//             {Array.from(Array(3).keys()).map((_, index) => (
//               <View style={tw`mr-3`} key={index}>
//                 <SkeletonLoader styles={skeletonStyles} />
//               </View>
//             ))}
//           </View>
//         ) : (
//           <GenericCarouselFlatlist
//             flatListRef={flatListRef}
//             contentContainerStyle={tw`pl-5 pr-2`}
//             data={ingredients}
//             renderItem={({ item }) => <IngredientCard {...item} />}
//             itemLength={itemLength}
//             section={'Ingredient'}
//           />
//         )}
//       </GenericCarouselWrapper>
//       <LinearGradient
//         colors={['#F3E9DA00', '#F3E9DA']}
//         start={[0, 0]}
//         end={[0, 1]}
//         style={tw`absolute bottom-0 left-0 right-0 h-8`}
//       />
//     </View>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import tw from "../../../common/tailwind";
import { LinearGradient } from "expo-linear-gradient";
import {
  GenericCarouselWrapper,
  GenericCarouselFlatlist,
} from "../../../common/components/GenericCarousel";
import SkeletonLoader from "../../../common/components/SkeletonLoader";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GET_INGREDIENTS } from "../../../services/api";

// Define Ingredient type
interface Ingredient {
  id: number;
  name: string;
  description ?: string | null;
  imageUrl?: string | null;
}

// Type navigation to include nested Ingredients stack
type NavigationProp = NativeStackNavigationProp<any>; // fallback any, or RootStack if typed

export default function IngredientsCarousel() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const flatListRef = useRef(null);
  const itemLength = 130;
  const navigation = useNavigation<NavigationProp>();

  // Fetch ingredients from API
  const fetchIngredients = async () => {
    try {
      const response = await fetch(GET_INGREDIENTS);
      const jsonData = await response.json();
      if (Array.isArray(jsonData)) {
        setIngredients(jsonData);
      } else {
        setIngredients([]);
      }
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      setIngredients([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const IngredientCircle = ({ name, imageUrl }: Ingredient) => (
    <View style={tw`items-center`}>
      <View
        style={tw`w-40 h-40 rounded-full border border-green-700 overflow-hidden bg-white justify-center items-center`}
      >
        <Image
          source={
            imageUrl && imageUrl.startsWith("http")
              ? { uri: imageUrl }
              : require("../../../../assets/ingredients/placeholder.png")
          }
          style={tw`w-full h-full`}
          resizeMode="cover"
        />
      </View>
      <Text
        style={tw`text-center text-green-900 font-semibold text-base mt-3 px-2`}
      >
        {name}
      </Text>
    </View>
  );

  return (
    <View style={tw.style("bg-creme pb-15 pt-2")}>
      <Text
        style={tw.style(
          "text-xl font-bold mx-5 text-center uppercase text-green-900"
        )}
        maxFontSizeMultiplier={1}
      >
        Turn in-season fruit & veg into something delicious
      </Text>

      <GenericCarouselWrapper style={tw.style("relative mt-7 overflow-hidden")}>
        {isLoading ? (
          <View style={tw`flex-row pl-5 pr-2`}>
            {Array.from(Array(3).keys()).map((_, index) => (
              <View style={tw`mr-4`} key={index}>
                <SkeletonLoader styles={["w-32 h-32 rounded-full"]} />
                <SkeletonLoader styles={["w-24 h-5 mt-3 rounded-md"]} />
              </View>
            ))}
          </View>
        ) : (
          <GenericCarouselFlatlist
            flatListRef={flatListRef}
            contentContainerStyle={tw`pl-6 pr-2`}
            data={ingredients}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={tw`mr-4`}
                onPress={() =>
                  navigation.navigate("Ingredients", {
                    screen: "IngredientDetail",
                    params: { ingredient: item },
                  })
                }
              >
                <IngredientCircle {...item} />
              </TouchableOpacity>
            )}
            itemLength={itemLength}
            section={"Ingredient"}
          />
        )}
      </GenericCarouselWrapper>

      <LinearGradient
        colors={["#F3E9DA00", "#F3E9DA"]}
        start={[0, 0]}
        end={[0, 1]}
        style={tw`absolute bottom-0 left-0 right-0 h-8`}
      />
    </View>
  );
}
