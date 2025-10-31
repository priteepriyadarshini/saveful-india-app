// import AsyncStorage from '@react-native-async-storage/async-storage';
// import FocusAwareStatusBar from '../../../common/components/FocusAwareStatusBar';
// import { getAllIngredientsFromComponents } from '../../../common/helpers/filterIngredients';
// import useContent from '../../../common/hooks/useContent';
// import tw from '../../../common/tailwind';
// import { IFramework } from '../../../models/craft';
// import { mixpanelEventName } from '../../../modules/analytics/analytics';
// import useAnalytics from '../../../modules/analytics/hooks/useAnalytics';
// import CompletedCookWithSurvey from '../../../modules/make/components/CompletedCookWithSurvey';
// import MakeItCarousel from '../../../modules/make/components/MakeItCarousel';
// import MakeItHeader from '../../../modules/make/components/MakeItHeader';
// import MakeItNavigation from '../../../modules/make/components/MakeItNavigation';
// import MakeItSurveyModal from '../components/MakeItSurveyModal';
// import { InitialNavigationStackParams } from '../../navigation/navigator/InitialNavigator';
// import TutorialModal from '../../../modules/prep/components/TutorialModal';
// import { MAKETUTORIAL } from '../../../modules/prep/data/data';
// import { useCurentRoute } from '../../../modules/route/context/CurrentRouteContext';
// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   Dimensions,
//   Image,
//   ImageBackground,
//   ImageRequireSource,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const screenWidth = Dimensions.get('screen').width;
// const StorageKey = 'MakeTutorial';

// export default function MakeItScreen({
//   route: {
//     params: { id, variant, ingredients, mealId },
//   },
// }: InitialNavigationStackParams<'MakeIt'>) {
//   const { getFramework } = useContent();
//   const { sendAnalyticsEvent } = useAnalytics();
//   const { newCurrentRoute } = useCurentRoute();
//   const [framework, setFramework] = useState<IFramework>();
//   const [isIntercted, setIsIntercted] = useState<boolean>(false);
//   const [isFirstMakeSession, setIsFirstMakeSession] = useState<boolean>(false);
//   const [isIngredientsModalVisible, setIngredientsModalVisible] =
//     useState(false);
//   const [isCompletedModalVisible, setIsCompletedModalVisible] = useState(false);
//   const [preExistingIngredients, setPreExistingIngredients] = useState<
//     { id: string; title: string; averageWeight: number }[]
//   >([]);

//   const getFrameworksData = async () => {
//     const data = await getFramework(id);

//     if (data) {
//       setFramework(data);
//     }
//   };

//   useEffect(() => {
//     const checkIsFirstMakeTutorial = async () => {
//       const isFirstMakeTutorial = await AsyncStorage.getItem(StorageKey);

//       if (!isFirstMakeTutorial) {
//         setIsFirstMakeSession(true);
//       } else {
//         setIngredientsModalVisible(true);
//       }
//     };

//     checkIsFirstMakeTutorial();
//   }, []);

//   useEffect(() => {
//     getFrameworksData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const [slideIndex, setSlideIndex] = useState(0);

//   const onScroll = useCallback(
//     (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//       const currentSlideSize =
//         screenWidth || event.nativeEvent.layoutMeasurement.width;
//       const index = event.nativeEvent.contentOffset.x / currentSlideSize;

//       const roundIndex = Math.round(index);

//       setSlideIndex(index);

//       if (setCurrentIndex !== undefined) {
//         setCurrentIndex(roundIndex);
//       }
//     },
//     [setCurrentIndex, setSlideIndex],
//   );

//   useEffect(() => {
//     if (!isIntercted && currentIndex > 1) {
//       setIsIntercted(true);
//       sendAnalyticsEvent({
//         event: mixpanelEventName.actionClicked,
//         properties: {
//           location: newCurrentRoute,
//           action: 'Make Ingredient Interacted',
//           meal_id: framework?.id,
//           meal_name: framework?.title,
//         },
//       });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentIndex]);

//   if (!framework) {
//     return null;
//   }

//   let iconSource: ImageRequireSource;

//   switch (currentIndex) {
//     case 0:
//     case 5:
//     case 10:
//       iconSource = require('../../../../assets/animations/cook-01.png');
//       break;
//     case 1:
//     case 6:
//     case 11:
//       iconSource = require('../../../../assets/animations/cook-02.png');
//       break;
//     case 2:
//     case 7:
//     case 12:
//       iconSource = require('../../../../assets/animations/cook-03.png');
//       break;
//     case 3:
//     case 8:
//     case 13:
//       iconSource = require('../../../../assets/animations/cook-04.png');
//       break;
//     case 4:
//     case 9:
//     case 14:
//       iconSource = require('../../../../assets/animations/cook-05.png');
//       break;
//     default:
//       iconSource = require('../../../../assets/animations/cook-01.png');
//       break;
//   }

//   const makeItSteps = framework.components
//     .filter(component =>
//       component.includedInVariants.some(item => item.id === variant),
//     )
//     .flatMap(component =>
//       component.componentSteps.map(step => ({
//         ...step,
//         // Title of the component
//         title: component.componentTitle,
//         // Only ingredients that are required for this component
//         ingredients: ingredients.filter(item => item.id === component.id),
//       })),
//     )
//     // Remove any steps that don't have ingredients
//     .filter((item, index, array) => {
//       if (item.alwaysShow || index === array.length - 1) {
//         return true;
//       }

//       return item.ingredients.length > 0;
//     })
//     // Remove any steps if relevantIngredients is not empty and the step doesn't have any of the relevant ingredients
//     .filter((item, index, array) => {
//       if (item.alwaysShow || index === array.length - 1) {
//         return true;
//       }

//       if (item.relevantIngredients.length === 0) {
//         return true;
//       }

//       return item.ingredients.some(
//         ingredient =>
//           item.relevantIngredients.findIndex(
//             item => item.title === ingredient.title,
//           ) !== -1,
//       );
//     })
//     // Add a step to the end of the array to show the "Let's eat" screen
//     .concat({
//       title: 'Let’s eat',
//       ingredients: [],
//       id: 'lets-eat',
//       stepInstructions: `<p>That’s it! Time to eat!</p>`,
//       hackOrTip: [],
//       relevantIngredients: [],
//       alwaysShow: true,
//     });

//   if (!makeItSteps) {
//     return null;
//   }

//   // To capture feedback regarding the ingredients used in the meal
//   const usedIngredients = makeItSteps
//     .flatMap(item => item.ingredients)
//     .map(item => item.title);

//   const mealIngredients = getAllIngredientsFromComponents(framework.components)
//     .filter(
//       (ingredient, index, self) =>
//         index === self.findIndex(t => t.id === ingredient.id),
//     )
//     // Show only the ingredients actually used in make this dish
//     // Using title as a unique identifier
//     .filter(ingredient => usedIngredients?.includes(ingredient.title))
//     // Sort by title
//     .sort((a, b) => a.title.localeCompare(b.title));

//   // Total weight of selected ingredients
//   const totalWeightOfSelectedIngredients = preExistingIngredients.reduce(
//     (acc, ingredient) => acc + ingredient.averageWeight,
//     0,
//   );

//   const completedSteps = () => {
//     const percentage = (currentIndex + 1 / makeItSteps.length) * 100;
//     sendAnalyticsEvent({
//       event: mixpanelEventName.actionClicked,
//       properties: {
//         location: newCurrentRoute,
//         action: 'Make Steps Progressed',
//         total_steps: makeItSteps.length,
//         completed_steps: currentIndex + 1,
//         end_steps: makeItSteps[currentIndex].title,
//         total_percentage: Math.min(100, Math.max(0, percentage)),
//         meal_id: framework?.id,
//         meal_name: framework?.title,
//       },
//     });
//   };

//   return (
//     <View style={tw`flex-1 bg-kale`}>
//       <ImageBackground
//         source={require('../../../../assets/ribbons/makeit.png')}
//         style={tw`relative flex-1`}
//       >
//         <MakeItHeader
//           completedSteps={completedSteps}
//           mealName={framework?.title}
//           title={makeItSteps?.[currentIndex]?.title ?? ''}
//           mealId={mealId}
//           frameworkId={id}
//         />

//         <Image
//           style={[
//             tw`absolute bottom-0 left-0 w-[${
//               Dimensions.get('screen').width
//             }px] h-[${
//               (Dimensions.get('screen').width * 288) / 636
//             }px] opacity-50`,
//           ]}
//           resizeMode="contain"
//           source={iconSource}
//           accessibilityIgnoresInvertColors
//         />

//         <View style={tw`relative flex-1`}>
//           <SafeAreaView edges={['top']}>
//             <View style={tw`h-full items-center justify-start py-11`}>
//               <MakeItNavigation
//                 slideIndex={slideIndex}
//                 currentIndex={currentIndex}
//                 items={makeItSteps}
//               />

//               <MakeItCarousel
//                 frameworkId={id}
//                 title={framework?.title}
//                 data={makeItSteps}
//                 totalWeightOfSelectedIngredients={
//                   totalWeightOfSelectedIngredients
//                 }
//                 mealId={mealId}
//                 completedSteps={completedSteps}
//                 onScroll={onScroll}
//               />
//             </View>
//           </SafeAreaView>
//         </View>
//       </ImageBackground>

//       <MakeItSurveyModal
//         isVisible={isIngredientsModalVisible}
//         setIsVisible={setIngredientsModalVisible}
//         setIsCompltedModalVisible={setIsCompletedModalVisible}
//         frameworkId={id}
//         title={framework.title}
//         mealId={mealId}
//         ingredientsForComponents={makeItSteps.map(item =>
//           item.ingredients.map(ingredient => ingredient.title),
//         )}
//         mealIngredients={mealIngredients}
//         preExistingIngredients={preExistingIngredients}
//         setPreExistingIngredients={setPreExistingIngredients}
//         totalWeightOfSelectedIngredients={totalWeightOfSelectedIngredients}
//       />

//       <CompletedCookWithSurvey
//         isModalVisible={isCompletedModalVisible}
//         //toggleModal={toggleCompletedModal}
//         setIsModalVisible={setIsCompletedModalVisible}
//         totalWeightOfSelectedIngredients={totalWeightOfSelectedIngredients}
//       />

//       <TutorialModal
//         data={MAKETUTORIAL}
//         isFirst={isFirstMakeSession}
//         setIsFirst={(value: boolean) => {
//           setIsFirstMakeSession(value);
//           if (!value) {
//             setIngredientsModalVisible(true);
//           }
//         }}
//         storageKey={StorageKey}
//       />
//       <FocusAwareStatusBar statusBarStyle="light" />
//     </View>
//   );
// }




import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Animated,
  Pressable,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InitialStackParamList } from "../../navigation/navigator/InitialNavigator";
import { cardDrop } from "../../../theme/shadow";
import tw from "../../../common/tailwind";
import {
  h5TextStyle,
  bodyLargeMedium,
  h2TextStyle,
} from "../../../theme/typography";
import CompletedCookModal from "../components/CompletedCookModal";

type MakeItScreenProps = NativeStackScreenProps<
  InitialStackParamList,
  "MakeIt"
>;

export default function MakeItScreen({ route, navigation }: MakeItScreenProps) {
  const { steps, recipeName } = route.params;
  const screenWidth = Dimensions.get("window").width;
  const cardSize = screenWidth - 60;

  const totalSteps = steps.length + 1;
  const [activeStep, setActiveStep] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible((prev) => !prev);

  const progressAnimations = useRef(
    Array.from({ length: totalSteps }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    progressAnimations.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: i <= activeStep ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [activeStep]);

  const getCardBackground = (index: number) => {
    switch (index % 5) {
      case 0:
        return require("../../../../assets/animations/cook-01.png");
      case 1:
        return require("../../../../assets/animations/cook-02.png");
      case 2:
        return require("../../../../assets/animations/cook-03.png");
      case 3:
        return require("../../../../assets/animations/cook-04.png");
      case 4:
        return require("../../../../assets/animations/cook-05.png");
      default:
        return require("../../../../assets/animations/cook-01.png");
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const isLast = index === totalSteps - 1;
    const backgroundImage = getCardBackground(index);

    return (
      <ImageBackground
        source={backgroundImage}
        resizeMode="contain"
        imageStyle={tw`rounded-2xl`}
        style={[tw`self-center my-7 justify-center overflow-hidden`, cardDrop, { width: cardSize, height: cardSize }]}
      >
        <View style={tw`flex-1 bg-white/70 rounded-2xl justify-between p-6`}>
          {/* Step number */}
          <Text
            style={tw.style(h5TextStyle, "text-green-700 text-center mb-4")}
          >
            {isLast ? "" : `STEP ${index + 1}`}
          </Text>

          {/* Step content */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={tw.style("text-center text-gray-900 text-xl leading-7", bodyLargeMedium)}
            >
              {isLast ? "THAT'S IT… IT'S TIME TO EAT!" : item.content}
            </Text>
          </ScrollView>

          {/* Completion button */}
          {isLast && (
            <Pressable
              onPress={toggleModal}
              style={tw`bg-green-600 rounded-lg py-4 px-6 mt-8 flex-row justify-center items-center self-center w-full`}
            >
              <Ionicons name="checkmark-circle" size={24} color="#fff" style={tw`mr-2`} />
              <Text style={tw`text-white text-lg font-bold`}>
                Complete the Recipe
              </Text>
            </Pressable>
          )}
        </View>
      </ImageBackground>
    );
  };

  return (
    <View style={tw`flex-1 bg-green-100 pt-8`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-3 py-2 bg-green-100`}>
        <Pressable onPress={() => navigation.goBack()} style={tw`p-2`}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </Pressable>
        <Text
          style={tw.style(
            h2TextStyle,
            "ml-2 text-gray-800 font-extrabold text-lg"
          )}
        >
          {recipeName.toUpperCase()}
        </Text>
      </View>

      {/* Steps */}
      <FlatList
        ref={flatListRef}
        data={[...steps, { final: true }]}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.y / (cardSize + 60)
          );
          setActiveStep(newIndex);
        }}
      />

      <CompletedCookModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
      />
    </View>
  );
}
