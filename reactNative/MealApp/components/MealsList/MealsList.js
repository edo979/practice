import { StyleSheet, View, FlatList } from 'react-native'
import MealItem from './MealItem'

const MealsList = ({ items }) => {
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
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  )
}
export default MealsList
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
