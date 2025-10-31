// import { useLinkTo, useNavigation } from '@react-navigation/native';
// import { Pressable, View, Text, Image } from 'react-native';
// import { bundledSource } from '../../../common/helpers/uriHelpers';
// import useContent from '../../../common/hooks/useContent';
// import tw from '../../../common/tailwind';
// import { IAsset, ITag } from '../../../models/craft';
// import { cardDrop } from '../../../theme/shadow';
// import { h7TextStyle, subheadSmallUppercase } from '../../../theme/typography';
// import useEnvironment from '../../environment/hooks/useEnvironment';
// import React from 'react';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { InitialStackParamList } from '../../navigation/navigator/InitialNavigator';

// export default function MealCard({
//   id,
//   heroImage,
//   title,
//   variantTags,
//   maxHeight = 0,
//   setMaxHeight,
// }: {
//   id: string;
//   heroImage: IAsset[];
//   title: string;
//   variantTags: ITag[];
//   maxHeight?: number;
//   setMaxHeight?: (value: number) => void;
// }) {
//   const env = useEnvironment();
//   const { getFramework } = useContent();

//   // const linkTo = useLinkTo();
//   // const onPress = async () => {
//   //   const framework = await getFramework(id);
//   //   if (framework) {
//   //     linkTo(`/make/prep/${framework.slug}`);
//   //   }
//   // };

//   // Navigation prop
//   type InitialNav = NativeStackNavigationProp<InitialStackParamList, 'Root'>;
//   const navigation = useNavigation<InitialNav>();

//   const onPress = async () => {
//     const framework = await getFramework(id);
//     if (framework) {
//       // Navigate directly to Make tab → PrepDetail screen
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
//       <Image
//         style={tw`h-[221px] w-full overflow-hidden rounded`}
//         resizeMode="cover"
//         source={bundledSource(heroImage[0].url, env.useBundledContent)}
//         accessibilityIgnoresInvertColors
//       />

//       <View style={tw`w-full content-center items-center gap-1 pb-2.5`}>
//         <Text
//           style={tw.style(h7TextStyle, 'text-center')}
//           maxFontSizeMultiplier={1}
//         >
//           {title}
//         </Text>
//         {variantTags.length > 1 && (
//           <Text style={tw.style(subheadSmallUppercase, 'text-midgray')}>
//             {variantTags[0].title}
//           </Text>
//         )}
//       </View>
//     </Pressable>
//   );
// }




import React from "react";
import { Pressable, View, Text, Image, Dimensions } from "react-native";
import tw from "../../../common/tailwind";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { MakeStackScreenProps } from "../../make/navigation/MakeNavigation";
import { cardDrop } from "../../../theme/shadow";
import { h7TextStyle, subheadSmallUppercase } from "../../../theme/typography";
import { FeedStackScreenProps } from "../navigation/FeedNavigation";

interface Recipe {
  id: number;
  name: string;
  imageUrl: string;
  dietaryPreferences?: string[];
  allergyFlags?: string[];
}

interface MealCardProps {
  recipe: Recipe;
  maxHeight?: number;
  setMaxHeight?: (value: number) => void;
}

export default function MealCard({ recipe, maxHeight = 0, setMaxHeight }: MealCardProps) {
  
  const navigation = useNavigation<FeedStackScreenProps<'FeedHome'>['navigation']>();

  const onPress = () => {
    navigation.navigate("PrepDetail", { recipe });
  };


  return (
    <Pressable
      onPress={onPress}
      onLayout={(event) => {
        const height = event.nativeEvent.layout.height;
        if (setMaxHeight && height > maxHeight) {
          setMaxHeight(height);
        }
      }}
      style={[
        tw`w-full items-center gap-3 rounded border border-strokecream bg-white p-2.5`,
        cardDrop,
        { minHeight: maxHeight },
      ]}
    >
      <Image
        source={{ uri: recipe.imageUrl }}
        style={tw`h-[221px] w-full overflow-hidden rounded`}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />

      <View style={tw`w-full content-center items-center gap-1 pb-2.5`}>
        <Text style={tw.style(h7TextStyle, "text-center")} maxFontSizeMultiplier={1}>
          {recipe.name}
        </Text>

        {/* Dietary Preferences shown similar to variantTags if more than 1 */}
        {recipe.dietaryPreferences && recipe.dietaryPreferences.length > 1 && (
          <Text style={tw.style(subheadSmallUppercase, "text-midgray")}>
            {recipe.dietaryPreferences[0]}
          </Text>
        )}

        {/* Allergens below dietary preferences */}
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






