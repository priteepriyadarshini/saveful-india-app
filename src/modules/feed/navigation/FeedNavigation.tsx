import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import tw from "../../../common/tailwind";
import FeedScreen from "../screens/FeedScreen";
import PartnersScreen from "../screens/PartnersScreen";
import IngredientsStackNavigator, {
  IngredientsStackParamList,
} from "../../ingredients/navigation/IngredientsNavigator";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { RootNavigationStackParams } from "../../navigation/navigator/root/RootNavigator";
import PrepScreen from "../../prep/screens/PrepScreen";
import MakeScreen from "../../make/screens/MakeScreen";
import ProfileScreen from "../../track/screens/ProfileScreen";

export type FeedStackParamList = {
  FeedHome: undefined;
  Partners: undefined;
  PrepDetail: { recipe: any }; 
  MakeHome: undefined;
  Ingredients: NavigatorScreenParams<IngredientsStackParamList>;
  ProfileScreen : undefined;
};

export type FeedStackScreenProps<Screen extends keyof FeedStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<FeedStackParamList, Screen>,
    RootNavigationStackParams<"Feed">
  >;

const NavigationStack = createNativeStackNavigator<FeedStackParamList>();

export default function FeedStackNavigator() {
  return (
    <NavigationStack.Navigator
      screenOptions={({ navigation }) => ({
        detachPreviousScreen: !navigation.isFocused(),
        headerTintColor: tw.color("gray-900"),
      })}
    >
      <NavigationStack.Screen
        name="FeedHome"
        component={FeedScreen}
        options={{ title: "Feed", headerShown: false }}
      />
      <NavigationStack.Screen
        name="Partners"
        component={PartnersScreen}
        options={{ title: "Partners", headerShown: false }}
      />

      <NavigationStack.Screen
        name="Ingredients"
        component={IngredientsStackNavigator}
        options={{ title: "Ingredients", headerShown: false }}
      />

      <NavigationStack.Screen
        name="PrepDetail"
        component={PrepScreen}
        options={{ title: "Make", headerShown: false }}
      />

      <NavigationStack.Screen
        name="MakeHome"
        component={MakeScreen}
        options={{ title: "Make", headerShown: false }}
      />

      <NavigationStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "Profile", headerShown: false }}
      />

      {/* Add other screens here as needed */}
    </NavigationStack.Navigator>
  );
}
