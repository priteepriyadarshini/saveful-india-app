// import SecondaryButton from '../../../common/components/ThemeButtons/SecondaryButton';
// import tw from '../../../common/tailwind';
// import { UserMealResult } from '../../../modules/track/api/types';
// import { Image, Modal, Text, View } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import { h1TextStyle, h7TextStyle } from '../../../theme/typography';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { InitialStackParamList } from '../../navigation/navigator/InitialNavigator';

// export default function CompletedCookModal({
//   isModalVisible,
//   userMeals,
//   toggleModal,
// }: {
//   //UNCOMMENT the line once UserMealResult is available
//   userMeals: UserMealResult[] | null | undefined;
//   //userMeals: any[] | null | undefined;
//   isModalVisible: boolean;
//   toggleModal: () => void;
// }) {

//   type InitialNav = NativeStackNavigationProp<InitialStackParamList, 'Root'>;

// const navigation = useNavigation<InitialNav>();

//   const handleClose = () => {
//     toggleModal(); // close modal
//     // navigate back to Make tab root (MakeHome)
//     navigation.navigate('Root', {
//       screen: 'Make',
//       params: { screen: 'MakeHome' },
//     } as const);
//   };

//   return (
//     <Modal animationType="fade" transparent={true} visible={isModalVisible}>
//       <View
//         style={tw`z-10 flex-1 items-center justify-center bg-black bg-opacity-0`}
//       >
//         <Animatable.View
//           animation="fadeInUp"
//           duration={500}
//           useNativeDriver
//           style={tw`mx-10 rounded-2lg border bg-white pb-10`}
//         >
//           <View style={tw.style('items-center')}>
//             <Image
//               source={require('../../../../assets/placeholder/frying-pan.png')}
//               style={tw`flex-initial`}
//               resizeMode="contain"
//             />
//           </View>
//           <View style={tw`px-6`}>
//             <Text
//               style={tw.style(h7TextStyle, 'pb-1 text-center text-eggplant')}
//               maxFontSizeMultiplier={1}
//             >
//               you’ve cooked
//             </Text>
//             <View
//               style={tw`mx-auto w-full max-w-[188px] items-center rounded-[45px] bg-radish`}
//             >
//               <Text
//                 style={tw.style(h1TextStyle, 'text-eggplant')}
//                 maxFontSizeMultiplier={1}
//               >
//                 {userMeals ? userMeals.length : '0'}
//               </Text>
//             </View>
//             <Text
//               style={tw.style(
//                 h7TextStyle,
//                 'pb-4 pt-1 text-center text-eggplant',
//               )}
//               maxFontSizeMultiplier={1}
//             >
//               {`saveful ${
//                 userMeals && userMeals.length > 1 ? 'meals' : 'meal'
//               }`}
//             </Text>
//             <Text
//               style={tw`mb-7.5 mx-auto max-w-[200px] text-center text-midgray`}
//             >
//               Well done on serving up all kinds of savings.
//             </Text>
//             <SecondaryButton style={tw`rounded-md`} onPress={handleClose}>
//               Close
//             </SecondaryButton>
//           </View>
//         </Animatable.View>
//       </View>
//       <Image
//         style={tw`absolute h-full w-full bg-eggplant opacity-80`}
//         resizeMode="cover"
//         source={require('../../../../assets/placeholder/background-modal.png')}
//       />
//     </Modal>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import SecondaryButton from "../../../common/components/ThemeButtons/SecondaryButton";
import tw from "../../../common/tailwind";
import {
  h1TextStyle,
  h6TextStyle,
  h7TextStyle,
} from "../../../theme/typography";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { InitialStackParamList } from "../../navigation/navigator/InitialNavigator";

type CompletedCookModalProps = {
  isModalVisible: boolean;
  toggleModal: () => void;
};

type InitialNav = NativeStackNavigationProp<InitialStackParamList, "Root">;

export default function CompletedCookModal({
  isModalVisible,
  toggleModal,
}: CompletedCookModalProps) {
  const navigation = useNavigation<InitialNav>();
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (isModalVisible) {
      setRating(0); // reset rating on modal open
    }
  }, [isModalVisible]);

  const handleClose = () => {
    toggleModal(); // close modal
    // navigate back to Make tab root (MakeHome)
    navigation.navigate("Root", {
      screen: "Make",
      params: { screen: "MakeHome" },
    });
  };

  const handleStarPress = (value: number) => {
    setRating(value);
  };

  return (
    <Modal animationType="fade" transparent visible={isModalVisible}>
      <View
        style={tw`z-10 flex-1 items-center justify-center bg-black bg-opacity-0`}
      >
        <Animatable.View
          animation="fadeInUp"
          duration={500}
          useNativeDriver
          style={tw`mx-10 rounded-2lg border bg-white pb-10`}
        >
          <View style={tw.style("items-center")}>
            <Image
              source={require("../../../../assets/placeholder/frying-pan.png")}
              style={tw`flex-initial w-35 h-40`}
              resizeMode="contain"
            />
          </View>

          <View style={tw`px-6`}>
            <Text
              style={tw.style(h6TextStyle, "pb-1 text-center text-eggplant")}
              maxFontSizeMultiplier={1}
            >
              you’ve cooked
            </Text>

            <View
              style={tw`mx-auto w-full max-w-[188px] items-center rounded-[45px] bg-radish`}
            >
              <Text
                style={tw.style(h1TextStyle, "text-eggplant")}
                maxFontSizeMultiplier={1}
              >
                5
              </Text>
            </View>

            <Text
              style={tw.style(
                h6TextStyle,
                "pb-4 pt-1 text-center text-eggplant"
              )}
              maxFontSizeMultiplier={1}
            >
              meals
            </Text>

            <Text
              style={tw`mb-4 mx-auto max-w-[200px] text-center text-midgray`}
            >
              Well done on serving up all kinds of meals.
            </Text>

            {/* Rating Stars */}
            <View style={tw`px-6`}>
              <Text
                style={tw.style(h6TextStyle, "pb-1 text-center text-eggplant")}
                maxFontSizeMultiplier={1}
              >
                Rate the Recipe
              </Text>
            </View>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((level) => {
                const emojis = ["😐", "🙂", "😋", "🤤", "🤯"]; // from neutral → mind-blown
                const isSelected = level <= rating;

                return (
                  <TouchableOpacity
                    key={level}
                    onPress={() => handleStarPress(level)}
                  >
                    <Text
                      style={[
                        styles.emoji,
                        {
                          opacity: isSelected ? 1 : 0.4, // faded if not selected
                          transform: [{ scale: isSelected ? 1.2 : 1 }], // small bounce feel
                        },
                      ]}
                    >
                      {emojis[level - 1]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Close Button */}
            <SecondaryButton style={tw`rounded-md`} onPress={handleClose}>
              Close
            </SecondaryButton>
          </View>
        </Animatable.View>
      </View>

      <Image
        style={tw`absolute h-full w-full bg-eggplant opacity-80`}
        resizeMode="cover"
        source={require("../../../../assets/placeholder/background-modal.png")}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  // starsContainer: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   marginBottom: 24,
  // },
  // starIcon: {
  //   marginHorizontal: 6,
  // },

  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },

  emoji: {
    fontSize: 40,
    marginHorizontal: 8,
  },
});
