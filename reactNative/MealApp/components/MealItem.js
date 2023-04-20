import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import MealDetails from './MealDetails'

const MealItem = ({
  id,
  title,
  imageUrl,
  duration,
  complexity,
  affordability,
}) => {
  const navigation = useNavigation()

  function onPressHandler() {
    navigation.navigate('Details', { id })
  }

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: '#ccc', foreground: true }}
        onPress={onPressHandler}
      >
        <View>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
        </View>

        <MealDetails
          duration={duration}
          complexity={complexity}
          affordability={affordability}
        />
      </Pressable>
    </View>
  )
}

export default MealItem

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 8,
  },

  image: {
    width: '100%',
    height: 200,
  },
  title: {
    margin: 8,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnPressed: {
    opacity: 0.5,
  },
})
