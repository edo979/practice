import { useLayoutEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { CATEGORIES, MEALS } from '../data/dammy-data'
import MealItem from '../components/MealItem'

const Overview = ({ route, navigation }) => {
  const { categoryId } = route.params
  const meals = MEALS.filter((meal) =>
    meal.categoryIds.some((id) => id === categoryId)
  )

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === categoryId
    ).title
    navigation.setOptions({ title: categoryTitle })
  }, [categoryId, navigation])

  function renderMealItem({ item }) {
    const props = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability,
    }
    return <MealItem {...props} />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  )
}
export default Overview

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
