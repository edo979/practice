import { useLayoutEffect } from 'react'
import { StyleSheet } from 'react-native'
import { CATEGORIES, MEALS } from '../data/dammy-data'
import MealsList from '../components/MealsList/MealsList'

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

  return <MealsList items={meals} />
}
export default Overview

const styles = StyleSheet.create({})
