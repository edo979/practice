import { Pressable, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const IconBtn = ({ icon, size, color, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.container}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  )
}

export default IconBtn

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 6,
    marginVertical: 2,
    marginHorizontal: 8,
  },
  pressed: {
    opacity: 0.75,
  },
})
