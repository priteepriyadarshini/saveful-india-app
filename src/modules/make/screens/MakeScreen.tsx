{/*import { useLinkTo, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCurentRoute } from '../../route/context/CurrentRouteContext';
import useAnalytics from '../../analytics/hooks/useAnalytics';
import FocusAwareStatusBar from '../../../common/components/FocusAwareStatusBar';
import tw from '../../../common/tailwind';
import { mixpanelEventName } from '../../analytics/analytics';
import FeedSearchBarHeader from '../../feed/components/FeedSearchBarHeader';
import MakeHeader from '../components/MakeHeader';
import Filters from '../components/Filters';
import MealsList from '../components/MealsList';
import { RootNavigationStackParams } from '../../navigation/navigator/root/RootNavigator';
import { InitialNavigationStackParams } from '../../navigation/navigator/InitialNavigator';

export default function MakeScreen() {
  //const linkTo = useLinkTo();
  const navigation = useNavigation<InitialNavigationStackParams<'Ingredients'>['navigation']>();

  const { sendAnalyticsEvent, sendScrollEventInitiation } = useAnalytics();
  const { newCurrentRoute } = useCurentRoute();

  const onSearchTapped = React.useCallback(() => {
    sendAnalyticsEvent({
      event: mixpanelEventName.actionClicked,
      properties: {
        location: newCurrentRoute,
        action: mixpanelEventName.searchbarPressed,
      },
    });
    navigation.navigate('Ingredients', {
    screen: 'IngredientsHome',
    params: undefined,
  });
  }, [navigation, newCurrentRoute, sendAnalyticsEvent]);

  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);

  return (
    <View style={tw`relative flex-1 bg-creme`}>
      <Image
        style={tw`absolute top-0 w-[${Dimensions.get('window').width}px] h-[${
          (Dimensions.get('window').width * 241) / 375
        }px]`}
        resizeMode="contain"
        source={require('../../../../assets/placeholder/make-bg.png')}
        accessibilityIgnoresInvertColors
      />
      <ScrollView
        scrollEventThrottle={1}
        onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
          sendScrollEventInitiation(event, 'Make Page Interacted');
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`relative z-10 flex-1`}>
          <SafeAreaView style={tw`flex-1 pt-[25px]`}>
            <FeedSearchBarHeader
              onPress={onSearchTapped}
              title="What Are you USING UP?"
            />
            <View style={tw`mt-5`}>
              <Image
                style={tw`w-[${Dimensions.get('window').width}px] h-[${
                  (Dimensions.get('window').width * 184) / 375
                }px]`}
                resizeMode="contain"
                source={require('../../../../assets/placeholder/this-plus-that.png')}
                accessibilityIgnoresInvertColors
              />
            </View>
          </SafeAreaView>
        </View>

        <View style={tw`flex-1 bg-creme`}>
          <MakeHeader />

          <Filters
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />

          {/* All filtered meals 
          <MealsList filters={selectedFilters} />
        </View>
      </ScrollView>

      <FocusAwareStatusBar statusBarStyle="light" />
    </View>
  );
}
*/}

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

interface Ingredient {
  id: number;
  name: string;
  quantity: string;
}

interface Meal {
  id: number;
  name: string;
  description: string;
  cuisine: string;
  cookingTime: number;
  difficulty: string;
  imageUrl: string;
  ingredients: Ingredient[];
}

export default function MakeItScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch('http://10.1.3.233:3000/api/recipe/by-ingredient?ingredient=Chicken');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setMeals(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

   return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.mealCard}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Cuisine: {item.cuisine}</Text>
            <Text>Cooking Time: {item.cookingTime} mins</Text>
            <Text>Difficulty: {item.difficulty}</Text>
            <Text>Ingredients:</Text>
            {item.ingredients.map((ing) => (
              <Text key={ing.id}>- {ing.name}: {ing.quantity}</Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mealCard: { marginBottom: 20, padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
});
