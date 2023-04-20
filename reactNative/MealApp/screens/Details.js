import { StyleSheet, Text, View, Image } from 'react-native'
import { MEALS } from '../data/dammy-data'
import MealDetails from '../components/MealDetails'

const Details = ({ route }) => {
  const { id } = route.params
  const meal = MEALS.find((meal) => meal.id === id)

  return (
    <View>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      <Text>{meal.title}</Text>

      <MealDetails
        complexity={meal.complexity}
        duration={meal.duration}
        affordability={meal.affordability}
      />

      <Text>Ingredients:</Text>
      {meal.ingredients.map((ingredient) => (
        <Text key={ingredient}>{ingredient}</Text>
      ))}
      <Text>Steps:</Text>
      {meal.steps.map((step) => (
        <Text key={step}>{step}</Text>
      ))}
    </View>
  )
}
export default Details
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
})
