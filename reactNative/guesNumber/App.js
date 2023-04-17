import { ImageBackground, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import StartGameScreen from './screens/StartGameScreen'
import { useState } from 'react'
import GameScreen from './screens/GameScreen'

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
    <LinearGradient style={styles.rootScreen} colors={['#4d0328', '#ddb52f']}>
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}
        style={styles.rootScreen}
      >
        {screen}
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
