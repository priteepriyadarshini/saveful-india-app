// import { useLinkTo, useNavigation } from '@react-navigation/native';
// import { bundledSource } from '../../../common/helpers/uriHelpers';
// import useContent from '../../../common/hooks/useContent';
// import tw from '../../../common/tailwind';
// import { IAsset, ISticker, ITag } from '../../../models/craft';
// import { mixpanelEventName } from '../../analytics/analytics';
// import useAnalytics from '../../analytics/hooks/useAnalytics';
// import useEnvironment from '../../environment/hooks/useEnvironment';
// import { useCurentRoute } from '../../route/context/CurrentRouteContext';
// import React from 'react';
// import { Dimensions, Image, Pressable, Text, View } from 'react-native';
// import { cardDrop } from '../../../theme/shadow';
// import { h5TextStyle, subheadMediumUppercase } from '../../../theme/typography';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { InitialStackParamList } from '../../navigation/navigator/InitialNavigator';

// export default function MealCard({
//   id,
//   heroImage,
//   title,
//   variantTags,
//   sticker,
//   maxHeight = 0,
//   setMaxHeight,
// }: {
//   id: string;
//   heroImage: IAsset[];
//   sticker?: ISticker[];
//   title: string;
//   variantTags: ITag[];
//   maxHeight?: number;

//   setMaxHeight?: (value: number) => void;
// }) {
//   const env = useEnvironment();
//   const { sendAnalyticsEvent } = useAnalytics();
//   const { newCurrentRoute } = useCurentRoute();
//   const { getFramework } = useContent();

//   // const linkTo = useLinkTo();

//   // Navigation prop
//   type InitialNav = NativeStackNavigationProp<InitialStackParamList, 'Root'>;
//   const navigation = useNavigation<InitialNav>();

//   const onPress = async () => {
//     sendAnalyticsEvent({
//       event: mixpanelEventName.actionClicked,
//       properties: {
//         location: newCurrentRoute,
//         action: mixpanelEventName.mealViewed,
//         meal_id: id,
//         meal_name: title,
//       },
//     });
//     const framework = await getFramework(id);
//     if (framework) {
//       //linkTo(`/make/prep/${framework.slug}`);
//       navigation.navigate('Root', {
//         screen: 'Make',
//         params: {
//           screen: 'PrepDetail',
//           params: { slug: framework.slug },
//         },
//       });
//     }
//   };

//   return (
//     <Pressable
//       style={[
//         tw`w-full items-center gap-3 rounded border border-strokecream bg-white p-2.5 min-h-[${maxHeight}px]`,
//         cardDrop,
//       ]}
//       onPress={onPress}
//       onLayout={event => {
//         const height = event.nativeEvent.layout.height;
//         if (setMaxHeight && height > maxHeight) {
//           setMaxHeight(height);
//         }
//       }}
//     >
//       {sticker && sticker.length > 0 && (
//         <Image
//           style={tw`absolute left-6 top-4 z-10 h-[120px] w-[109px] overflow-hidden`}
//           resizeMode="contain"
//           source={bundledSource(sticker[0].image[0].url, env.useBundledContent)}
//           accessibilityIgnoresInvertColors
//         />
//       )}
//       <Image
//         style={tw`h-[${
//           ((Dimensions.get('screen').width - 80) * 262) / 305
//         }px] w-full overflow-hidden rounded`}
//         resizeMode="cover"
//         source={bundledSource(heroImage[0].url, env.useBundledContent)}
//         accessibilityIgnoresInvertColors
//       />

//       <View style={tw`w-full items-center gap-2`}>
//         <Text
//           style={tw.style(h5TextStyle, 'text-center')}
//           maxFontSizeMultiplier={1}
//         >
//           {title}
//         </Text>
//         {variantTags.length > 1 && (
//           <Text style={tw.style(subheadMediumUppercase, 'text-stone')}>
//             {`${variantTags.length} flavour variations`}
//           </Text>
//         )}
//       </View>
//     </Pressable>
//   );
// }

//GET DATA FROM NODE.JS BACKEND
import React from "react";
import { Pressable, Text, Image, Dimensions, View } from "react-native";
import tw from "../../../common/tailwind";
import { useNavigation } from "@react-navigation/native";
import { MakeStackScreenProps } from "../navigation/MakeNavigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { h5TextStyle } from "../../../theme/typography";

interface Recipe {
  id: number;
  name: string;
  imageUrl: string;
  dietaryPreferences?: string[];
  allergyFlags?: string[];
  // include any other props if needed
}

interface MealCardProps {
  recipe: Recipe;
}

export default function MealCard({ recipe }: MealCardProps) {
  const navigation =
    useNavigation<MakeStackScreenProps<"MakeHome">["navigation"]>();

  const handlePress = () => {
    navigation.navigate("PrepDetail", { recipe });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={tw`mb-4 rounded overflow-hidden border border-gray-300`}
    >
      <Image
        source={{ uri: recipe.imageUrl }}
        style={{
          width: Dimensions.get("window").width - 80,
          height: 300,
          marginTop: 20,
          marginBottom: 10,
          marginLeft: 20,
        }}
        resizeMode="cover"
      />

      <View style={tw`w-full items-center gap-2 mb-2`}>
        <Text
          style={tw.style(h5TextStyle, "text-center")}
          maxFontSizeMultiplier={1}
        >
          {recipe.name}
        </Text>

        {/* Dietary Preferences */}
        {recipe.dietaryPreferences && recipe.dietaryPreferences.length > 0 && (
          <Text style={tw`text-xs text-green-700 text-center`}>
            {recipe.dietaryPreferences.join(" • ")}
          </Text>
        )}

        {/* Allergies */}
        {recipe.allergyFlags && recipe.allergyFlags.length > 0 && (
          <View style={tw`flex-row items-center justify-center mt-1`}>
            <MaterialCommunityIcons name="alert" size={14} color="red" />
            <Text style={tw`text-xs text-red-600 ml-1`}>
              ALLERGENS: {recipe.allergyFlags.join(", ")}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
