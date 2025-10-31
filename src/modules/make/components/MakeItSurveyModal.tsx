// import { Feather } from '@expo/vector-icons';
// import { skipToken } from '@reduxjs/toolkit/query';
// import SecondaryButton from '../../../common/components/ThemeButtons/SecondaryButton';
// import SavefulHaptics from '../../../common/helpers/haptics';
// import useContent from '../../../common/hooks/useContent';
// import tw from '../../../common/tailwind';
// import { IChallenge } from '../../../models/craft';
// import { mixpanelEventName } from '../../analytics/analytics';
// import useAnalytics from '../../analytics/hooks/useAnalytics';
// import {
//   useGetUserChallengeQuery,
//   useUpdateUserChallengeMutation,
// } from '../../../modules/challenges/api/api';
// import useNotifications from '../../../modules/notifications/hooks/useNotifications';
// import { useCurentRoute } from '../../route/context/CurrentRouteContext';
// import {
//   useCreateFeedbackMutation,
//   useGetUserMealsQuery,
//   useUpdateUserMealMutation,
// } from '../../../modules/track/api/api';
// import moment from 'moment';
// import React, { useEffect, useState } from 'react';
// import { Alert, Modal, Pressable, Text, View } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import { ScrollView } from 'react-native-gesture-handler';
// import {
//   bodySmallRegular,
//   h7TextStyle,
//   subheadLargeUppercase,
// } from '../../../theme/typography';

// export default function MakeItSurveyModal({
//   isVisible,
//   setIsVisible,
//   setIsCompltedModalVisible,
//   frameworkId,
//   title,
//   mealId,
//   ingredientsForComponents,
//   mealIngredients,
//   preExistingIngredients,
//   setPreExistingIngredients,
//   totalWeightOfSelectedIngredients,
// }: {
//   isVisible: boolean;
//   setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
//   setIsCompltedModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
//   frameworkId: string;
//   title: string;
//   mealId: string;
//   ingredientsForComponents: string[][];
//   mealIngredients: { id: string; title: string; averageWeight: number }[];
//   preExistingIngredients: {
//     id: string;
//     title: string;
//     averageWeight: number;
//   }[];
//   setPreExistingIngredients: React.Dispatch<
//     React.SetStateAction<{ id: string; title: string; averageWeight: number }[]>
//   >;
//   totalWeightOfSelectedIngredients: number;
// }) {
//   const isSelected = (value: string | undefined) => {
//     return preExistingIngredients.findIndex(x => x.id === value) !== -1;
//   };

//   const { scheduleNotification } = useNotifications();

//   const { sendAnalyticsEvent } = useAnalytics();
//   const { newCurrentRoute } = useCurentRoute();

//   // User meals object
//   const [updateUserMeal, { isLoading: isUpdateUserMealLoading }] =
//     useUpdateUserMealMutation();
//   // Create feedback to record food saved
//   const [createFeedback, { isLoading: isCreateFeedbackLoading }] =
//     useCreateFeedbackMutation();

//   // Update user challenge with cooks and food saved
//   const { getChallenges } = useContent();
//   const [challenge, setChallenge] = useState<IChallenge>();
//   const { data: userChallenge } = useGetUserChallengeQuery(
//     challenge?.slug ? { slug: challenge.slug } : skipToken,
//   );
//   const [updateUserChallenge] = useUpdateUserChallengeMutation();

//   const { data: userMeals } = useGetUserMealsQuery();

//   const currentUserChallenge =
//     userChallenge?.data?.challengeStatus === 'joined' ? userChallenge : null;

//   const getChallengesData = async () => {
//     // setIsLoading(true);
//     const data = await getChallenges();

//     if (data) {
//       const currentChallenges = data.filter(challenge => {
//         return moment().isBetween(
//           moment(challenge.optInStartDate),
//           moment(challenge.optInStartDate).add(60, 'days'),
//         );
//       });

//       if (currentChallenges.length > 0) {
//         setChallenge(currentChallenges[0]);
//       }
//     }
//   };

//   useEffect(() => {
//     getChallengesData();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const onStartCooking = async () => {
//     const isLoading = isUpdateUserMealLoading || isCreateFeedbackLoading;

//     if (isLoading) {
//       return;
//     }

//     try {
//       await updateUserMeal({
//         id: mealId,
//         completed: true,
//         saved: true, // Use this for notifications
//         data: {
//           ingredients: ingredientsForComponents,
//         },
//       }).unwrap();

//       await createFeedback({
//         frameworkId,
//         prompted: false, // Use it to still show feedback
//         foodSaved: totalWeightOfSelectedIngredients / 1000,
//         mealId,
//       }).unwrap();

//       if (currentUserChallenge) {
//         await updateUserChallenge({
//           slug: currentUserChallenge.slug,
//           data: {
//             ...currentUserChallenge.data,
//             foodSaved:
//               currentUserChallenge.data.foodSaved +
//               totalWeightOfSelectedIngredients,
//             noOfCooks: currentUserChallenge.data.noOfCooks + 1,
//           },
//         }).unwrap();
//       }

//       sendAnalyticsEvent({
//         event: mixpanelEventName.actionClicked,
//         properties: {
//           location: newCurrentRoute,
//           action: mixpanelEventName.cookCompleted,
//           meal_id: frameworkId,
//           meal_name: title,
//           total_cooked: userMeals?.length,
//           food_saved: `${totalWeightOfSelectedIngredients / 1000}Kg`,
//           number_of_selected_ingredients: preExistingIngredients.length,
//           selected_ingredients: preExistingIngredients,
//         },
//       });

//       scheduleNotification({
//         message: `How was your ${title ?? 'meal'}?`,
//         delayInSeconds: 30 * 60, // 30 minutes
//         url: `/survey/postmake/${mealId}`,
//       });

//       setIsVisible(false);
//       setIsCompltedModalVisible(true);
//       // setIsVisible(false);
//     } catch (error: unknown) {
//       Alert.alert(
//         'Feedback create error. Try again later.',
//         JSON.stringify(error),
//       );
//     }
//   };

//   return (
//     <Modal animationType="fade" transparent={true} visible={isVisible}>
//       <View
//         style={tw`z-10 flex-1 items-center justify-center bg-black bg-opacity-80 px-5`}
//       >
//         <Animatable.View
//           animation="fadeInUp"
//           duration={500}
//           useNativeDriver
//           style={tw`pb-7.5 w-full rounded-2lg border bg-white pt-2.5`}
//         >
//           <View style={tw`px-4`}>
//             <Pressable
//               onPress={() => setIsVisible(false)}
//               style={tw.style('items-end')}
//             >
//               <Feather name="x" size={24} color={tw.color('black')} />
//             </Pressable>
//           </View>
//           <View style={tw`px-6 py-4`}>
//             <Text
//               style={tw.style(h7TextStyle, 'pb-3 text-center')}
//               maxFontSizeMultiplier={1}
//             >
//               Which ingredients were already in your kitchen?
//             </Text>
//             <Text
//               style={tw.style(bodySmallRegular, 'text-center text-midgray')}
//               maxFontSizeMultiplier={1}
//             >
//               This helps us estimate how much food you'll potentially save with
//               this dish. If it's already in your kitchen and you're using it up,
//               you’re saving it from the bin (and that’s a win win!).
//             </Text>

//             <ScrollView style={tw`my-5 max-h-[250px] overflow-hidden pb-5`}>
//               {mealIngredients.map(ingredient => {
//                 return (
//                   <Pressable
//                     key={ingredient.id}
//                     style={tw`flex-row items-center gap-2 py-3`}
//                     onPress={() => {
//                       SavefulHaptics.selectionAsync();

//                       const valueIndex = preExistingIngredients.findIndex(
//                         x => x.id === ingredient.id,
//                       );

//                       if (valueIndex === -1) {
//                         setPreExistingIngredients([
//                           ...preExistingIngredients,
//                           ingredient,
//                         ]);
//                       } else {
//                         const updatedArray = [...preExistingIngredients];
//                         updatedArray.splice(valueIndex, 1);

//                         setPreExistingIngredients(updatedArray);
//                       }
//                     }}
//                   >
//                     <View
//                       style={tw.style(
//                         'rounded border p-0.5',
//                         isSelected(ingredient.id)
//                           ? 'border-black'
//                           : 'border-stone',
//                       )}
//                     >
//                       <Feather
//                         name="check"
//                         size={12}
//                         color={
//                           isSelected(ingredient.id)
//                             ? tw.color('black')
//                             : tw.color('white')
//                         }
//                       />
//                     </View>
//                     <Text
//                       style={tw.style(
//                         subheadLargeUppercase,
//                         isSelected(ingredient.id)
//                           ? 'text-black'
//                           : 'text-midgray',
//                       )}
//                     >
//                       {ingredient.title}
//                     </Text>
//                   </Pressable>
//                 );
//               })}
//             </ScrollView>

//             <SecondaryButton
//               onPress={onStartCooking}
//               loading={isUpdateUserMealLoading || isCreateFeedbackLoading}
//             >
//               Next
//             </SecondaryButton>
//             <Pressable
//               style={tw`mt-4`}
//               onPress={() => {
//                 setPreExistingIngredients([]);
//                 // onStartCooking();
//                 setIsVisible(false);

//                 sendAnalyticsEvent({
//                   event: mixpanelEventName.actionClicked,
//                   properties: {
//                     action: mixpanelEventName.exploreFramework,
//                     meal_id: frameworkId,
//                     meal_name: title,
//                   },
//                 });
//               }}
//             >
//               <Text style={tw`text-center text-midgray underline`}>
//                 I’m just exploring the framework
//               </Text>
//             </Pressable>
//           </View>
//         </Animatable.View>
//       </View>
//     </Modal>
//   );
// }

// import React, { useState } from "react";
// import { View, Text, Modal, Pressable, ScrollView } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import tw from "../../../common/tailwind";
// import SecondaryButton from "../../../common/components/ThemeButtons/SecondaryButton";

// interface Ingredient {
//   id?: number;
//   name?: string;
//   stapleName?: string;
//   quantity: string;
//   description?: string | null;
//   imageUrl?: string | null;
// }

// interface MakeItSurveyModalProps {
//   isVisible: boolean;
//   setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
//   setIsCompletedModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
//   ingredients: Ingredient[];
//   recipeTitle: string;
//   userId: string;
// }

// export default function MakeItSurveyModal({
//   isVisible,
//   setIsVisible,
//   setIsCompletedModalVisible,
//   ingredients,
// }: MakeItSurveyModalProps) {
//   const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
//     []
//   );

//   const isSelected = (id?: number) => {
//     return selectedIngredients.some((ing) => ing.id === id);
//   };

//   const totalSavedKg = selectedIngredients.length ;

//   const handleContinue = () => {
//     // TODO: Save totalSavedKg to user profile using API/mutation
//     setIsVisible(false);
//     setIsCompletedModalVisible(true);
//   };

//   return (
//     <Modal animationType="fade" transparent={true} visible={isVisible}>
//       <View
//         style={tw`flex-1 items-center justify-center bg-black bg-opacity-80 px-5`}
//       >
//         <View style={tw`bg-white w-full rounded-2xl p-6`}>
//           {/* Close */}
//           <View style={tw`items-end`}>
//             <Pressable onPress={() => setIsVisible(false)}>
//               <Feather name="x" size={24} color={tw.color("black")} />
//             </Pressable>
//           </View>

//           {/* Title */}
//           <Text style={tw`text-xl font-bold text-center mb-3`}>
//             Which ingredients were already in your kitchen?
//           </Text>

//           <Text style={tw`text-center text-gray-500 mb-4`}>
//             This helps us estimate how much food you'll potentially save with
//             this dish.
//           </Text>

//           {/* Ingredient list */}
//           <ScrollView style={tw`max-h-[250px] mb-4`}>
//             {ingredients
//               .filter((ingredient) => ingredient.id) // <-- keep only those with id
//               .map((ingredient) => (
//                 <Pressable
//                   key={ingredient.id} // safe now
//                   onPress={() => {
//                     if (!ingredient.id) return;
//                     if (isSelected(ingredient.id)) {
//                       setSelectedIngredients((prev) =>
//                         prev.filter((ing) => ing.id !== ingredient.id)
//                       );
//                     } else {
//                       setSelectedIngredients((prev) => [...prev, ingredient]);
//                     }
//                   }}
//                   style={tw`flex-row items-center py-2`}
//                 >
//                   <View
//                     style={tw.style(
//                       "rounded border p-1 mr-2",
//                       isSelected(ingredient.id)
//                         ? "border-black bg-green-600"
//                         : "border-gray-300"
//                     )}
//                   >
//                     <Feather
//                       name="check"
//                       size={14}
//                       color={
//                         isSelected(ingredient.id)
//                           ? tw.color("white")
//                           : tw.color("transparent")
//                       }
//                     />
//                   </View>
//                   <Text
//                     style={tw.style(
//                       "text-base",
//                       isSelected(ingredient.id)
//                         ? "text-black font-bold"
//                         : "text-gray-500"
//                     )}
//                   >
//                     {ingredient.name ??
//                       ingredient.stapleName ??
//                       "Unnamed Ingredient"}
//                   </Text>
//                 </Pressable>
//               ))}
//           </ScrollView>

//           {/* Saved calculation */}
//           {selectedIngredients.length > 0 && (
//             <Text style={tw`text-center text-green-700 font-semibold mb-4`}>
//               You’re saving approximately {totalSavedKg.toFixed(2)} kg of food
//               🎉
//             </Text>
//           )}

//           {/* Continue */}
//           <SecondaryButton onPress={handleContinue}>Next</SecondaryButton>

//           {/* Skip */}
//           <Pressable
//             style={tw`mt-4`}
//             onPress={() => {
//               setSelectedIngredients([]);
//               setIsVisible(false);
//             }}
//           >
//             <Text style={tw`text-center text-gray-400 underline`}>
//               I’m just exploring
//             </Text>
//           </Pressable>
//         </View>
//       </View>
//     </Modal>
//   );
// }












import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import tw from "../../../common/tailwind";
import { h5TextStyle, bodySmallRegular } from "../../../theme/typography";

// Example mock data (replace with real ingredients later)
const dummyIngredients = [
  { id: 1, name: "Tomatoes", quantity: "500g" },
  { id: 2, name: "Rice", quantity: "1 kg" },
  { id: 3, name: "Salt", quantity: "1 tsp" },
];

interface Props {
  isVisible: boolean;
  setIsVisible: (v: boolean) => void;
}

export default function MakeItSurveyModal({ isVisible, setIsVisible }: Props) {
  const [selected, setSelected] = useState<{ [key: number]: boolean }>({});
  const [totalSaved, setTotalSaved] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const toggleSelect = (id: number) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Option A: Convert only weight-based (g, kg)
  const convertToKg = (quantity: string): number => {
    const q = quantity.toLowerCase();
    if (q.includes("kg")) return parseFloat(q) || 0;
    if (q.includes("g")) return (parseFloat(q) || 0) / 1000;
    return 0;
  };

  const handleNext = () => {
    let total = 0;
    dummyIngredients.forEach((item) => {
      if (selected[item.id]) total += convertToKg(item.quantity);
    });
    setTotalSaved(total);
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setIsVisible(false);
    }, 2000);
  };

  if (!isVisible) return null;

  return (
    <Modal transparent animationType="fade" visible={isVisible}>
      <View style={tw`flex-1 bg-black/60 justify-center items-center`}>
        <View style={tw`bg-white w-11/12 rounded-2xl p-5 max-h-[80%]`}>
          {/* Header */}
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw.style(h5TextStyle)}>Select Ingredients</Text>
            <Pressable onPress={() => setIsVisible(false)}>
              <Text style={tw`text-gray-500 text-lg`}>✕</Text>
            </Pressable>
          </View>

          {/* Ingredient list */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-4`}
          >
            {dummyIngredients.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => toggleSelect(item.id)}
                style={tw.style(
                  "flex-row justify-between items-center py-3 px-4 mb-2 rounded-xl border",
                  selected[item.id]
                    ? "bg-green-100 border-green-600"
                    : "bg-white border-gray-200"
                )}
              >
                <View>
                  <Text style={tw`font-semibold text-gray-800`}>
                    {item.name}
                  </Text>
                  <Text style={tw.style(bodySmallRegular, "text-gray-500")}>
                    {item.quantity}
                  </Text>
                </View>
                <Text style={tw`text-xl`}>
                  {selected[item.id] ? "✅" : "⬜"}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Next button */}
          <Pressable
            style={tw`bg-green-700 py-3 rounded-full`}
            onPress={handleNext}
          >
            <Text style={tw`text-white text-center font-semibold`}>Next</Text>
          </Pressable>

          {/* Result */}
          {showResult && (
            <View style={tw`mt-4`}>
              <Text style={tw`text-center text-green-700 font-semibold`}>
                🎉 You saved {totalSaved.toFixed(2)} kg of food!
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
