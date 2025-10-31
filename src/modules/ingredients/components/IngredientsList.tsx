// import SavefulHaptics from '../../../common/helpers/haptics';
// import tw from '../../../common/tailwind';
// import React from 'react';
// import { Animated, Pressable, Text, View } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import { bodyMediumRegular } from '../../../theme/typography';

// export default function IngredientsList({
//   offset,
//   data,
//   selectedIngredients,
//   setSelectedIngredients,
// }: {
//   offset: Animated.Value;
//   data: { id: string; title: string }[];
//   selectedIngredients: string[];
//   setSelectedIngredients: (ingredient: string) => void;
// }) {
//   const isSelected = (value: string) => {
//     return selectedIngredients.findIndex(x => x === value) !== -1;
//   };

//   return (
//     <ScrollView
//       style={tw`w-full flex-1`}
//       contentContainerStyle={tw`p-5 pt-0`}
//       scrollEventThrottle={16}
//       onScroll={Animated.event(
//         [{ nativeEvent: { contentOffset: { y: offset } } }],
//         { useNativeDriver: false },
//       )}
//     >
//       {data
//         .sort((a, b) => a.title.localeCompare(b.title))
//         .map(item => (
//           <Pressable
//             key={item.id}
//             style={tw`flex-row items-center gap-2 border-b border-strokecream py-3.5`}
//             onPress={() => {
//               SavefulHaptics.selectionAsync();
//               setSelectedIngredients(item.id);
//             }}
//           >
//             <View style={tw.style('rounded-full border border-stone p-1')}>
//               <View
//                 style={tw.style('h-2 w-2 rounded-full bg-eggplant opacity-0', {
//                   'opacity-100': isSelected(item.id),
//                 })}
//               />
//             </View>
//             <Text style={tw.style(bodyMediumRegular)}>{item.title}</Text>
//           </Pressable>
//         ))}
//       <View style={tw``} />
//     </ScrollView>
//   );
// }



// src/modules/ingredients/components/IngredientList.tsx
import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import tw from "../../../common/tailwind";
import { bodyMediumRegular } from "../../../theme/typography";
import SavefulHaptics from "../../../common/helpers/haptics";

export interface Ingredient {
  id: number;
  name: string;
  description?: string;
}

interface IngredientListProps {
  ingredients: Ingredient[];
  selectedIngredients: Ingredient[];
  toggleSelect: (ingredient: Ingredient) => void;
}

export default function IngredientList({
  ingredients,
  selectedIngredients,
  toggleSelect,
}: IngredientListProps) {
  const isSelected = (id: number) => selectedIngredients.some((i) => i.id === id);

  const renderItem = ({ item }: { item: Ingredient }) => (
    <Pressable
      style={tw`flex-row items-center gap-2 border-b border-strokecream py-3.5`}
      onPress={() => {
        SavefulHaptics.selectionAsync();
        toggleSelect(item);
      }}
    >
      <View style={tw`rounded-full border border-stone p-1`}>
        <View
          style={tw.style("h-2 w-2 rounded-full bg-eggplant opacity-0", {
            "opacity-100": isSelected(item.id),
          })}
        />
      </View>
      <Text style={tw.style(bodyMediumRegular)}>{item.name}</Text>
    </Pressable>
  );

  return (
    <FlatList
      data={ingredients.sort((a, b) => a.name.localeCompare(b.name))}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}