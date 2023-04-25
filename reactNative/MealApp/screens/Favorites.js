//import { useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'
//import { FavoritesContext } from '../store/context/favorite-context'
import { MEALS } from '../data/dammy-data'
import MealsList from '../components/MealsList/MealsList'
import { useSelector } from 'react-redux'

const Favorites = () => {
  const { ids } = useSelector((state) => state.favoriteMeals)
  const favoriteMeals = MEALS.filter((meal) => ids.includes(meal.id))

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You have not favorite Meals yet.</Text>
      </View>
    )
  }

  return <MealsList items={favoriteMeals} />
}
export default Favorites
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
})
