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
