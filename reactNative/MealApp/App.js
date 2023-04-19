import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import Categories from './screens/Categories'

export default function App() {
  return (
    <View style={styles.container}>
      <Categories />
      <StatusBar style="light" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
