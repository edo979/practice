import { StyleSheet, Pressable, View, Text } from 'react-native'

const CategoryGridTile = ({ title, color }) => {
  return (
    <View style={[styles.gridItem, styles.flex1, { backgroundColor: color }]}>
      <Pressable
        style={[styles.button, styles.flex1]}
        android_ripple={{ color: 'black' }}
      >
        <View style={[styles.innerContainer, styles.flex1]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  )
}
export default CategoryGridTile
const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  gridItem: {
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  button: {},
  innerContainer: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
