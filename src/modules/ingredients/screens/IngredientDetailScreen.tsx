// import AnimatedHeader from '../../../common/components/AnimatedHeader';
// import FocusAwareStatusBar from '../../../common/components/FocusAwareStatusBar';
// import useContent from '../../../common/hooks/useContent';
// import tw from '../../../common/tailwind';
// import { IIngredient } from '../../../models/craft';
// import useAnalytics from '../../../modules/analytics/hooks/useAnalytics';
// import { bgTheme } from '../../../modules/feed/utils/ingredientTheme';
// import Facts from '../../../modules/ingredients/components/Facts';
// import Featuring from '../../../modules/ingredients/components/Featuring';
// import Hero from '../../../modules/ingredients/components/Hero';
// import IngredientsHacksCarousel from '../../../modules/ingredients/components/IngredientsHacksCarousel';
// import ReadyToCook from '../../../modules/ingredients/components/ReadyToCook';
// import { IngredientsStackScreenProps } from '../../../modules/ingredients/navigation/IngredientsNavigator';
// import React, { useEffect, useRef } from 'react';
// import {
//   Animated,
//   Dimensions,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
//   Pressable,
//   ScrollView,
//   View,
// } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
// import { subheadLargeUppercase } from '../../../theme/typography';

// const screenWidth = Dimensions.get('window').width;

// const DetailTabs = ({
//   pillAnim,
//   value,
//   setValue,
// }: {
//   pillAnim: Animated.Value;
//   value: string;
//   setValue: (value: string) => void;
// }) => {
//   useEffect(() => {
//     const isCook = () => {
//       Animated.timing(pillAnim, {
//         toValue: 0,
//         duration: 150,
//         useNativeDriver: false,
//       }).start();
//     };

//     const isLearn = () => {
//       Animated.timing(pillAnim, {
//         toValue: 1,
//         duration: 150,
//         useNativeDriver: false,
//       }).start();
//     };

//     if (value === 'cook') {
//       isCook();
//     } else {
//       isLearn();
//     }
//   }, [value, pillAnim]);

//   const cookStyle = {
//     color: pillAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: ['rgba(26, 26, 27, 1)', 'rgba(109, 109, 114, 1)'],
//     }),
//   };
//   const learnStyle = {
//     color: pillAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: ['rgba(109, 109, 114, 1)', 'rgba(26, 26, 27, 1)'],
//     }),
//   };

//   return (
//     <View style={tw`relative`}>
//       <View style={tw`absolute top-1/2 h-1/2 w-full bg-creme`} />
//       <View
//         style={tw`mx-5 flex-row items-center justify-center overflow-hidden rounded-full border border-strokecream bg-strokecream`}
//       >
//         <Animated.View
//           style={[
//             tw`absolute left-0 top-0 h-full w-1/2 rounded-full bg-white`,
//             {
//               transform: [
//                 {
//                   translateX: pillAnim.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0, (screenWidth - 42) / 2],
//                   }),
//                 },
//               ],
//             },
//           ]}
//         />
//         <Pressable
//           onPress={() => setValue('cook')}
//           style={tw`w-1/2 items-center rounded-full py-2`}
//         >
//           <Animated.Text style={[tw.style(subheadLargeUppercase), cookStyle]}>
//             Cook
//           </Animated.Text>
//         </Pressable>
//         <Pressable
//           onPress={() => setValue('learn')}
//           style={tw`w-1/2 items-center py-2`}
//         >
//           <Animated.Text style={[tw.style(subheadLargeUppercase), learnStyle]}>
//             Learn
//           </Animated.Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// export default function IngredientDetailScreen({
//   route: {
//     params: { id },
//   },
// }: IngredientsStackScreenProps<'IngredientDetail'>) {
//   const pillAnim = useRef(new Animated.Value(0)).current;
//   const [tabValue, setTabValue] = React.useState('cook');

//   const getItemLayout = (_data: any, index: number) => ({
//     length: screenWidth,
//     offset: screenWidth * index,
//     index,
//   });

//   const flatListRef = useRef<FlatList>(null);
//   const scrollToItem = (index: number) => {
//     if (flatListRef.current) {
//       flatListRef.current.scrollToOffset({
//         animated: true,
//         offset: index * screenWidth,
//       });
//     }
//   };

//   const offset = useRef(new Animated.Value(0)).current;

//   const { sendScrollEventInitiation } = useAnalytics();

//   const { getIngredient } = useContent();
//   const [ingredient, setIngredient] = React.useState<IIngredient>();

//   const getIngredientsData = async () => {
//     const data = await getIngredient(id);

//     if (data) {
//       setIngredient(data);
//     }
//   };

//   useEffect(() => {
//     getIngredientsData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (!ingredient) return null;

//   return (
//     <View style={tw`flex-1 ${bgTheme(ingredient?.ingredientTheme)}`} key={id}>
//       <AnimatedHeader animatedValue={offset} title={ingredient.title} />
//       <ScrollView
//         scrollEventThrottle={16}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: offset } } }],
//           {
//             useNativeDriver: false,
//             listener: (event: NativeSyntheticEvent<NativeScrollEvent>) =>
//               sendScrollEventInitiation(
//                 event,
//                 'Ingredient Details Page Interacted',
//               ),
//           },
//         )}
//       >
//         <View>
//           <View style={tw`items-center justify-start`}>
//             <Hero
//               title={ingredient.title}
//               heroImage={ingredient.heroImage}
//               ingredientTheme={ingredient.ingredientTheme}
//               sticker={ingredient.sticker}
//             />

//             <DetailTabs
//               pillAnim={pillAnim}
//               value={tabValue}
//               setValue={value => {
//                 setTabValue(value);
//                 if (value === 'cook') {
//                   scrollToItem(0);
//                 } else {
//                   scrollToItem(1);
//                 }
//               }}
//             />

//             <FlatList
//               ref={flatListRef}
//               data={[
//                 {
//                   id: 'cook',
//                 },
//                 {
//                   id: 'learn',
//                 },
//               ]}
//               renderItem={({ item }) => {
//                 if (item.id === 'learn') {
//                   return (
//                     <View style={{ width: screenWidth }}>
//                       <Facts {...ingredient} />
//                     </View>
//                   );
//                 }

//                 return (
//                   <View style={{ width: screenWidth }}>
//                     <Featuring
//                       ingredientId={ingredient?.id}
//                       title={ingredient.title}
//                     />
//                     <ReadyToCook {...ingredient} />
//                     {ingredient.relatedHacks.length > 0 && (
//                       <IngredientsHacksCarousel {...ingredient} />
//                     )}
//                   </View>
//                 );
//               }}
//               horizontal
//               scrollEnabled={false}
//               showsHorizontalScrollIndicator={false}
//               bounces={false}
//               decelerationRate={0}
//               getItemLayout={getItemLayout}
//               renderToHardwareTextureAndroid
//               contentContainerStyle={tw`content-center bg-creme pt-8`}
//               snapToInterval={screenWidth}
//               snapToAlignment="start"
//               scrollEventThrottle={16}
//               viewabilityConfig={{
//                 itemVisiblePercentThreshold: 100,
//               }}
//             />
//           </View>
//         </View>
//       </ScrollView>
//       <FocusAwareStatusBar statusBarStyle="dark" />
//     </View>
//   );
// }






import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../../common/tailwind";
import { h2TextStyle, subheadMedium, bodyMediumRegular } from "../../../theme/typography";

export interface Ingredient {
  id: number;
  name: string;
  imageUrl?: string | null;
  description?: string | null;
}

export type IngredientsStackParamList = {
  IngredientsHome: undefined;
  IngredientDetail: { ingredient: Ingredient };
  IngredientsResults: { selectedIngredients: { id: number; name: string }[] };
  PrepDetail: { recipe: any };
};

type Props = NativeStackScreenProps<
  IngredientsStackParamList,
  "IngredientDetail"
>;

const screenWidth = Dimensions.get("window").width;
const heroImageHeight = (Dimensions.get("screen").width * 400) / 374;

export default function IngredientDetailScreen({ route, navigation }: Props) {
  const { ingredient } = route.params;

  return (
    <SafeAreaView style={tw`flex-1 bg-creme`}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFF8E1"
        translucent={false}
      />

      <ScrollView style={tw`flex-1`}>
        {/* Header with Back Arrow */}
        <View style={tw`flex-row items-center px-5 py-3 bg-creme`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#14532D" />
          </TouchableOpacity>
        </View>

        {/* Ingredient Name */}
        <Text
          style={tw`${h2TextStyle} text-center mt-3`}
          maxFontSizeMultiplier={1}
        >
          {ingredient.name}
        </Text>

        {/* Hero Image */}
        <View
          style={[
            tw`mt-5 rounded-lg overflow-hidden self-center`,
            { width: screenWidth - 40, height: heroImageHeight },
          ]}
        >
          <Image
            source={
              ingredient.imageUrl && ingredient.imageUrl.startsWith("http")
                ? { uri: ingredient.imageUrl }
                : require("../../../../assets/ingredients/placeholder.png")
            }
            style={tw`w-full h-full`}
            resizeMode="cover"
          />
        </View>

        {/* Description Heading */}
        <View style={tw`self-center mt-8 bg-green-100 px-6 py-2 rounded-full`}>
          <Text style={tw`${subheadMedium}`}>DESCRIPTION</Text>
        </View>

        {/* Description Text */}
        <Text
          style={tw`${bodyMediumRegular} mt-5 px-5 leading-6`}
          maxFontSizeMultiplier={1}
        >
          {ingredient.description || "No description available."}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
