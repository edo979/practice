import { StyleSheet, FlatList } from 'react-native'
import { CATEGORIES } from '../data/dammy-data'
import CategoryGridTile from '../components/CategoryGridTile'

const Categories = ({ navigation }) => {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate('Overview', {
        categoryId: itemData.item.id,
      })
    }

    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    )
  }

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
