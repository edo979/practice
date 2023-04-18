import { useState, useCallback } from 'react'
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font'

import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import Colors from './constants/collors'
import GameOverScreen from './screens/GameOverScreen'

import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

export default function App() {
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />
  const [userNumber, setUserNumber] = useState(0)
  const [isGameOver, setIsGameOver] = useState(true)
  const [guessRounds, setGuessRounds] = useState(0)

  const [isFontsLoaded] = useFonts({
    'Open-Sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'Open-Sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (isFontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [isFontsLoaded])

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber)
    setIsGameOver(false)
  }

  function gameOverHandler(numOfRounds) {
    setGuessRounds(numOfRounds)
    setIsGameOver(true)
  }

  function startNewGameHandler() {
    setUserNumber(null)
    setGuessRounds(0)
  }

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }

  if (isGameOver && userNumber) {
    screen = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onStartNewGame={startNewGameHandler}
      />
    )
  }

  if (!isFontsLoaded) {
    return null
  }

  return (
    <LinearGradient
      style={styles.rootScreen}
      colors={[Colors.primary700, Colors.accent500]}
      onLayout={onLayoutRootView}
    >
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}
        style={styles.rootScreen}
      >
        <SafeAreaView style={[styles.rootScreen, styles.layout]}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },

  layout: {
    marginTop: 100,
    padding: 16,
  },

  backgroundImage: {
    opacity: 0.15,
  },
})
