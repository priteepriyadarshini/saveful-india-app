// import React from 'react';
// import { Image, Pressable, Text, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { bundledSource } from '../../../common/helpers/uriHelpers';
// import useContent from '../../../common/hooks/useContent';
// import tw from '../../../common/tailwind';
// import { IAsset, ITag } from '../../../models/craft';
// import { mixpanelEventName } from '../../../modules/analytics/analytics';
// import useAnalytics from '../../../modules/analytics/hooks/useAnalytics';
// import useEnvironment from '../../../modules/environment/hooks/useEnvironment';
// import { useCurentRoute } from '../../../modules/route/context/CurrentRouteContext';
// import { cardDrop } from '../../../theme/shadow';
// import {
//   h5TextStyle,
//   subheadMediumUppercase,
//   subheadSmallUppercase,
// } from '../../../theme/typography';
// import { IngredientsStackParamList } from '../../ingredients/navigation/IngredientsNavigator';



// type IngredientsNavigationProp =
//   NativeStackNavigationProp<IngredientsStackParamList, "IngredientsResults">;

// export default function RecipeCard({
//   id,
//   title,
//   heroImage,
//   variantTags,
//   cardStyle,
//   kind,
//   maxHeight = 0,
//   setMaxHeight,
// }: {
//   id: string;
//   title: string;
//   heroImage: IAsset[];
//   kind?: string[];
//   variantTags: ITag[];
//   cardStyle?: any;
//   maxHeight?: number;
//   setMaxHeight?: (value: number) => void;
// }) {
//   const env = useEnvironment();
//   const { getFramework } = useContent();
//   const navigation = useNavigation<IngredientsNavigationProp>();
//   const { sendAnalyticsEvent } = useAnalytics();
//   const { newCurrentRoute } = useCurentRoute();

//   const onMakeIt = React.useCallback(
//   async (id: string) => {
//     const framework = await getFramework(id);
//     if (framework) {
//       navigation.navigate('PrepDetail', { slug: framework.slug });
//     }
//   },
//   [getFramework, navigation],
// );

//   return (
//     <Pressable
//       onPress={() => {
//         sendAnalyticsEvent({
//           event: mixpanelEventName.actionClicked,
//           properties: {
//             action: mixpanelEventName.mealViewed,
//             location: newCurrentRoute,
//             meal_id: id,
//             meal_title: title,
//           },
//         });
//         onMakeIt(id);
//       }}
//       style={tw.style(cardStyle)}
//     >
//       <View
//         style={[
//           tw`pt-5.5 overflow-hidden rounded border border-strokecream bg-white p-4 min-h-[${maxHeight}px]`,
//           cardDrop,
//         ]}
//         onLayout={event => {
//           const height = event.nativeEvent.layout.height;
//           if (setMaxHeight && height > maxHeight) {
//             setMaxHeight(height);
//           }
//         }}
//       >
//         <Image
//           style={[tw`h-[262px] w-full overflow-hidden rounded`]}
//           resizeMode="cover"
//           source={bundledSource(heroImage[0].url, env.useBundledContent)}
//           accessibilityIgnoresInvertColors
//         />

//         {variantTags.length > 0 && (
//           <View style={tw`mt-3`}>
//             <Text style={tw.style(h5TextStyle, 'text-center')}>{title}</Text>
//             <Text
//               style={tw.style(
//                 subheadMediumUppercase,
//                 'mt-1.5 text-center text-stone',
//               )}
//             >
//               {variantTags.length} flavour{' '}
//               {variantTags.length === 1 ? 'guide' : 'guides'}
//             </Text>
//           </View>
//         )}

//         <View style={tw`mt-3 border-t border-strokecream pt-3.5`}>
//           <Text
//             style={tw.style(
//               subheadSmallUppercase,
//               'mb-2.5 text-center text-midgray',
//             )}
//           >
//             This meal uses :
//           </Text>

//           <View style={tw`flex-row flex-wrap justify-center gap-1`}>
//             {kind?.map((kindItem, index) => (
//               <View
//                 key={index}
//                 style={tw`rounded-lg bg-strokecream px-2 py-0.5`}
//               >
//                 <Text style={tw.style(subheadSmallUppercase)}>{kindItem}</Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       </View>
//     </Pressable>
//   );
// }



// import React from "react";
// import { Image, Pressable, Text, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import tw from "../../../common/tailwind";
// import { IngredientsStackParamList } from "../../ingredients/navigation/IngredientsNavigator";
// import { cardDrop } from "../../../theme/shadow";
// import {
//   h5TextStyle,
//   bodySmallRegular,
//   subheadMediumUppercase,
//   subheadSmallUppercase,
// } from "../../../theme/typography";


// type IngredientsNavigationProp =
//   NativeStackNavigationProp<IngredientsStackParamList, "IngredientsResults">;

// interface RecipeCardProps {
//   id: number;
//   title: string;
//   imageUrl: string;
//   kind?: string[];
//   cardStyle?: any;
//   onPress?: () => void; // add this
// }

// export default function RecipeCard({
//   id,
//   title,
//   imageUrl,
//   kind,
//   cardStyle,
//   onPress,
// }: RecipeCardProps) {
//   const navigation = useNavigation<IngredientsNavigationProp>();

//   return (
//     <Pressable
//       onPress={() => navigation.navigate("PrepDetail", { slug: id.toString() })}
//       style={[tw.style("mb-4"), cardStyle]}
//     >
//       <View style={[tw`overflow-hidden border border-strokecream bg-white p-4`, cardDrop]}>
//         {imageUrl ? (
//           <Image
//             source={{ uri: imageUrl }}
//             style={{ width: "100%", height: 200 }}
//             resizeMode="cover"
//           />
//         ) : null}

//         <Text style={tw.style(h5TextStyle, "text-center mt-3")}>{title}</Text>

//         <View style={tw`mt-3 border-t border-strokecream pt-3.5`}>
//           <Text
//             style={tw.style(subheadSmallUppercase, "mb-2.5 text-center text-midgray")}
//           >
//             This meal uses:
//           </Text>

//           <View style={tw`flex-row flex-wrap justify-center gap-1`}>
//             {kind?.map((ingredient, index) => (
//               <View
//                 key={index}
//                 style={tw`rounded-lg bg-strokecream px-2 py-0.5`}
//               >
//                 <Text style={tw.style(subheadSmallUppercase)}>{ingredient}</Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       </View>
//     </Pressable>
//   );
// }






import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import tw from "../../../common/tailwind";
import { h5TextStyle, subheadSmallUppercase } from "../../../theme/typography";
import { MakeStackParamList } from "../../make/navigation/MakeNavigation";
import { IngredientsStackParamList } from "../../ingredients/navigation/IngredientsNavigator";
import { cardDrop } from "../../../theme/shadow";

// Recipe type
export interface Recipe {
  id: number;
  name: string;
  description: string;
  cuisine: string;
  cookingTime: number;
  portions?: number;
  difficulty?: string;
  imageUrl: string;
  videoUrl: string;
  dietaryPreferences?: string[];
  allergyFlags?: string[];
  ingredients: {
    id: number;
    name: string;
    quantity: string;
    description?: string | null;
  }[];
  categories: { id: number; name: string }[];
  steps: { order: number; content: string }[];
}

type MakeNavigationProp = NativeStackNavigationProp<MakeStackParamList>;
type IngredientsNavigationProp =
  NativeStackNavigationProp<IngredientsStackParamList>;

interface RecipeCardProps {
  recipe: Recipe; // full recipe
  selectedIngredients?: { id: number; name: string }[]; // only show these
  cardStyle?: any;
}

export default function RecipeCard({
  recipe,
  selectedIngredients,
  cardStyle,
}: RecipeCardProps) {
  const navigation =
    useNavigation<MakeNavigationProp | IngredientsNavigationProp>();

  const handlePress = () => {
    if ("navigate" in navigation) {
      // @ts-ignore
      navigation.navigate("PrepDetail", { recipe });
    }
  };

  // Filter recipe ingredients to show only selected ones
  const filteredIngredients = recipe.ingredients
    .filter((ing) =>
      selectedIngredients?.some(
        (sel) => sel.name.toLowerCase() === ing.name.toLowerCase()
      )
    )
    .map((ing) => ing.name);

  return (
    <Pressable onPress={handlePress} style={[tw`mb-4`, cardStyle]}>
      <View
        style={[tw`overflow-hidden border border-strokecream bg-white p-4`, cardDrop]}
      >
        {recipe.imageUrl ? (
          <Image
            source={{ uri: recipe.imageUrl }}
            style={{ width: "100%", height: 200 }}
            resizeMode="cover"
          />
        ) : null}

        <Text style={tw.style(h5TextStyle, "text-center mt-3")}>{recipe.name}</Text>

        <View style={tw`mt-3 border-t border-strokecream pt-3.5`}>
          <Text
            style={tw.style(subheadSmallUppercase, "mb-2.5 text-center text-midgray")}
          >
            This meal uses:
          </Text>

          <View style={tw`flex-row flex-wrap justify-center gap-1`}>
            {filteredIngredients.length > 0 ? (
              filteredIngredients.map((ingredient, index) => (
                <View key={index} style={tw`rounded-lg bg-strokecream px-2 py-0.5`}>
                  <Text style={tw.style(subheadSmallUppercase)}>{ingredient}</Text>
                </View>
              ))
            ) : (
              <Text style={tw.style(subheadSmallUppercase, "text-center text-midgray")}>
                None of the selected ingredients
              </Text>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}
