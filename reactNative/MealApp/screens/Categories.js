import { StyleSheet, FlatList } from 'react-native'
import { CATEGORIES } from '../data/dammy-data'
import CategoryGridTile from '../components/CategoryGridTile'

function renderCategoryItem(itemData) {
  return (
    <CategoryGridTile title={itemData.item.title} color={itemData.item.color} />
  )
}

const Categories = () => {
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  )
}
export default Categories

const styles = StyleSheet.create({})
