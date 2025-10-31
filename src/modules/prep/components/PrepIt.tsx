// import { Feather } from '@expo/vector-icons';
// import { BottomSheetModal } from '@gorhom/bottom-sheet';
// import tw from '../../../common/tailwind';
// import CircularHeader from '../../../modules/prep/components/CircularHeader';
// import React, { useCallback, useMemo, useRef } from 'react';
// import { Dimensions, Pressable, Text, View } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import { useReducedMotion } from 'react-native-reanimated';
// import RenderHTML from 'react-native-render-html';
// import {
//   bodyLargeBold,
//   bodyMediumRegular,
//   h7TextStyle,
//   tagStyles,
// } from '../../../theme/typography';

// export default function PrepIt({
//   shortDescription,
//   description,
// }: {
//   shortDescription: string;
//   description: string | null;
// }) {
//   // ref
//   const bottomSheetModalRef = useRef<BottomSheetModal>(null);

//   /* https://github.com/gorhom/react-native-bottom-sheet/issues/1560#issuecomment-1750466864
//   Added fixes for ios / android users who uses reduce motion */
//   const reducedMotion = useReducedMotion();

//   // variables
//   const snapPoints = useMemo(() => ['1%', '90%'], []);

//   // callbacks
//   const handlePresentModalPress = useCallback(() => {
//     bottomSheetModalRef.current?.present();
//   }, [bottomSheetModalRef]);
//   const handlePresentModalDismiss = useCallback(() => {
//     bottomSheetModalRef.current?.close();
//   }, [bottomSheetModalRef]);

//   return (
//     <View style={tw.style('pt-4.5 px-5')}>
//       <CircularHeader title="prep it" />
//       <Text style={tw.style('pt-4 text-left', bodyMediumRegular)}>
//         {shortDescription}
//       </Text>

//       {description && (
//         <Pressable onPress={handlePresentModalPress} style={tw.style('pt-2.5')}>
//           <Text
//             style={tw.style(
//               bodyMediumRegular,
//               'text-eggplant-vibrant underline',
//             )}
//           >
//             Read more...
//           </Text>
//         </Pressable>
//       )}

//       {description && (
//         <BottomSheetModal
//           ref={bottomSheetModalRef}
//           index={1}
//           animateOnMount={!reducedMotion}
//           snapPoints={snapPoints}
//           // onChange={handleSheetChanges}
//           containerStyle={{ backgroundColor: 'rgba(26, 26, 27, 0.7)' }}
//           style={tw.style(
//             'overflow-hidden rounded-2.5xl border border-strokecream',
//           )}
//           handleStyle={tw.style('hidden')}
//           enableContentPanningGesture={false}
//         >
//           <ScrollView style={tw.style('px-5')}>
//             <View style={tw.style('items-end py-4')}>
//               <Pressable onPress={handlePresentModalDismiss}>
//                 <Feather name={'x'} size={16} color="black" />
//               </Pressable>
//             </View>
//             <View style={tw.style('items-center justify-center')}>
//               <Text style={tw.style(h7TextStyle)}>Prep it</Text>
//             </View>
//             <View style={tw.style('pb-[50px] pt-[22px]')}>
//               <Text style={tw.style(bodyLargeBold, 'text-stone')}>
//                 {shortDescription}
//               </Text>
//               <RenderHTML
//                 source={{
//                   html: description || '',
//                 }}
//                 contentWidth={Dimensions.get('window').width - 40}
//                 tagsStyles={tagStyles}
//                 defaultViewProps={{
//                   style: tw`m-0 p-0`,
//                 }}
//                 defaultTextProps={{
//                   style: tw.style(bodyMediumRegular, 'pt-2.5 text-stone'),
//                 }}
//               />
//             </View>
//           </ScrollView>
//         </BottomSheetModal>
//       )}
//     </View>
//   );
// }







import React from "react";
import { View, Text } from "react-native";
import tw from "../../../common/tailwind";
import { cardIngredientDrop } from "../../../theme/shadow";
import CircularHeader from "./CircularHeader";
import { Ingredient, Recipe } from "../types";


interface PrepItProps {
  recipe: Recipe;
}

export default function PrepIt({ recipe }: PrepItProps) {
  return (
    <>
      <CircularHeader title="PREP IT" />
      <View
        style={[
          tw`mt-6 bg-white rounded-xl p-4`,
          cardIngredientDrop, 
        ]}
      >
        {/* Table Header */}
        <View style={tw`flex-row justify-between border-b border-green-500 pb-3 mb-3`}>
          <Text style={tw`text-base font-semibold text-gray-700`}>Ingredient</Text>
          <Text style={tw`text-base font-semibold text-gray-700`}>Quantity</Text>
        </View>

        {/* Table Rows */}
        {recipe.ingredients.map((ingredient: Ingredient, index: number) => {
          const ingredientName =
            ingredient.name || ingredient.stapleName || "Unknown";
          const uniqueKey = `${ingredient.id ?? "staple"}-${index}`;
          const rowStyle = index % 2 === 0 ? "bg-gray-50" : "bg-gray-100";

          return (
            <View
              key={uniqueKey}
              style={tw.style("flex-row justify-between py-2 px-2 rounded", rowStyle)}
            >
              <Text style={tw`text-base text-gray-800`}>{ingredientName}</Text>
              <Text style={tw`text-base text-gray-600`}>{ingredient.quantity}</Text>
            </View>
          );
        })}
      </View>
    </>
  );
}