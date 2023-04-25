import { useContext, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'

import { MEALS } from '../data/dammy-data'
import MealDetails from '../components/MealDetails'
import Subtitle from '../components/mealDetails/Subtitle'
import List from '../components/mealDetails/List'
import IconButton from '../components/IconButton'
import { FavoritesContext } from '../store/context/favorite-context'

const Details = ({ route, navigation }) => {
  const {
    ids: favoriteIds,
    addFavorite,
    removeFavorite,
  } = useContext(FavoritesContext)
  const { id } = route.params
  const meal = MEALS.find((meal) => meal.id === id)
  const isFavorite = favoriteIds.includes(id)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={toggleFavoriteHandler}
          icon={isFavorite ? 'star' : 'star-outline'}
          color="white"
        />
      ),
    })
  }, [isFavorite])

  function toggleFavoriteHandler() {
    if (isFavorite) {
      removeFavorite(id)
    } else {
      addFavorite(id)
    }
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      <Text style={[styles.title, styles.textWhite]}>{meal.title}</Text>

      <MealDetails
        complexity={meal.complexity}
        duration={meal.duration}
        affordability={meal.affordability}
        textStyle={styles.textWhite}
      />

      <View style={styles.innerContainer}>
        <Subtitle>Ingredients</Subtitle>
        <List items={meal.ingredients} />

        <Subtitle>Steps:</Subtitle>
        <List items={meal.steps} />
      </View>
    </ScrollView>
  )
}
export default Details
const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    margin: 8,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textWhite: {
    color: 'white',
  },
  innerContainer: {
    maxWidth: '80%',
    alignSelf: 'center',
  },
})
