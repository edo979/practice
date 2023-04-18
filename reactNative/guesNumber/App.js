import { useState } from 'react'
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import Colors from './constants/collors'

export default function App() {
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />
  const [userNumber, setUserNumber] = useState(0)

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber)
  }

  if (userNumber) {
    screen = <GameScreen />
  }

  return (
    <LinearGradient
      style={styles.rootScreen}
      colors={[Colors.primary700, Colors.accent500]}
    >
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}
        style={styles.rootScreen}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },

  backgroundImage: {
    opacity: 0.15,
  },
})
