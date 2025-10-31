// import { bundledSource } from '../../../common/helpers/uriHelpers';
// import tw from '../../../common/tailwind';
// import { IAsset, ISticker } from '../../../models/craft';
// import useEnvironment from '../../../modules/environment/hooks/useEnvironment';
// import { Dimensions, Image, Text, View } from 'react-native';
// import { bodyLargeBold, bodySmallRegular } from '../../../theme/typography';

// export default function PrepInfoSticker({
//   portions,
//   prepAndCookTime,
//   sticker,
//   heroImage,
// }: {
//   portions: string | null;
//   prepAndCookTime: number | null;
//   sticker: ISticker[];
//   heroImage: IAsset[];
// }) {
//   const env = useEnvironment();

//   return (
//     <View style={tw.style('relative flex-1 items-center')}>
//       <View
//         style={tw.style('z-10 w-full flex-1 flex-row justify-between px-4')}
//       >
//         {portions && (
//           <View style={tw.style('flex-col justify-center')}>
//             <Text style={tw.style(bodyLargeBold)}>{portions}</Text>
//             <Text style={tw.style(bodySmallRegular, 'text-midgray')}>
//               Portions
//             </Text>
//           </View>
//         )}

//         {prepAndCookTime && (
//           <View style={tw.style('flex-col justify-center')}>
//             <Text
//               style={tw.style(bodyLargeBold)}
//             >{`~${prepAndCookTime}min`}</Text>
//             <Text style={tw.style(bodySmallRegular, 'text-midgray')}>
//               Prep + Cook
//             </Text>
//           </View>
//         )}

//         {sticker &&
//         sticker.length > 0 &&
//         sticker[0].image &&
//         !!sticker[0].image[0].url ? (
//           <Image
//             style={tw`h-[90px] w-[90px]`}
//             resizeMode="contain"
//             source={bundledSource(
//               sticker[0].image[0].url,
//               env.useBundledContent,
//             )}
//             accessibilityIgnoresInvertColors
//           />
//         ) : (
//           <View style={tw`h-[90px] w-[90px]`} />
//         )}
//       </View>

//       {heroImage && heroImage.length > 0 && heroImage[0].url && (
//         <View>
//           <Image
//             style={[
//               tw`bottom-4 h-[${
//                 (Dimensions.get('screen').width * 408) / 375
//               }px] w-[${Dimensions.get('screen').width}px] overflow-hidden`,
//             ]}
//             resizeMode="cover"
//             source={bundledSource(heroImage[0].url, env.useBundledContent)}
//             accessibilityIgnoresInvertColors
//           />
//         </View>
//       )}
//     </View>
//   );
// }









import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "../../../common/tailwind";
import { cardDrop } from "../../../theme/shadow";
import { bodyMediumRegular } from "../../../theme/typography";
import { Recipe } from "../types";

interface PrepInfoBoxProps {
  recipe: Recipe;
}

export default function PrepInfoBox({ recipe }: PrepInfoBoxProps) {
  return (
    <>
      {/* Dietary Preferences */}
      {recipe.dietaryPreferences?.length ? (
  <View style={tw`mt-6 items-center flex-row flex-wrap justify-center`}>
    {recipe.dietaryPreferences.map((pref, i) => (
      <Text
        key={i}
        style={tw`bg-emerald-100 px-5 py-1.5 rounded-full text-emerald-800 text-base font-semibold mr-2 mb-2`}
      >
        {pref}
      </Text>
    ))}
  </View>
) : null}

{recipe.allergyFlags?.length ? (
  <View style={tw`flex-row flex-wrap justify-center mt-2`}>
    {recipe.allergyFlags.map((allergy, i) => (
      <View
        key={i}
        style={tw`bg-red-100 px-3 py-1 rounded-full mr-2 mb-2 flex-row items-center`}
      >
        <MaterialCommunityIcons name="alert" size={18} color="#b91c1c" />
        <Text style={tw`text-red-900 ml-2`}>{allergy}</Text>
      </View>
    ))}
  </View>
) : null}


      {/* Image */}
      <Image
        source={{ uri: recipe.imageUrl }}
        style={{
          width: Dimensions.get("window").width - 40,
          height: 380,
          borderRadius: 14,
          marginVertical: 20,
          alignSelf: "center",
        }}
        resizeMode="cover"
      />

      {/* Info Boxes */}
      <View style={tw`flex-row justify-between mb-6`}>
        <View style={[tw`bg-green-50 w-[30%] py-4 rounded-2xl items-center`, cardDrop]}>
          <Ionicons name="people-outline" size={24} color="#245235" />
          <Text style={tw`text-base text-gray-700 mt-1`}>
            {recipe.portions ?? "-"}
          </Text>
        </View>

        <View style={[tw`bg-green-50 w-[30%] py-4 rounded-2xl items-center`, cardDrop]}>
          <Ionicons name="time-outline" size={24} color="#245235" />
          <Text style={tw`text-base text-gray-700 mt-1`}>
            {recipe.cookingTime ? `${recipe.cookingTime} min` : "-"}
          </Text>
        </View>

        <View style={[tw`bg-green-50 w-[30%] py-4 rounded-2xl items-center`, cardDrop]}>
          <Ionicons name="globe-outline" size={24} color="#245235" />
          <Text style={tw`text-base text-gray-700 mt-1`}>
            {recipe.cuisine ?? "-"}
          </Text>
        </View>
      </View>
    </>
  );
}

