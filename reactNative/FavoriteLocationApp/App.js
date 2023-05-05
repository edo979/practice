import { useCallback, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import AllPlaces from './screens/AllPlaces'
import AddPlace from './screens/AddPlace'
import IconButton from './components/ui/IconButton'
import { Colors } from './constants/colors'
import Map from './screens/Map'
import { init } from './util/database'
import PlaceDetails from './screens/PlaceDetails'

SplashScreen.preventAutoHideAsync()

const Stack = createNativeStackNavigator()

export default function App() {
  const [isDBInit, setIsDBinit] = useState(false)

  useEffect(() => {
    init()
      .then(() => setIsDBinit(true))
      .catch((err) => console.log(err))
  }, [])

  const onReady = useCallback(async () => {
    if (isDBInit) await SplashScreen.hideAsync()
  }, [isDBInit])

  if (!isDBInit) return null

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer onReady={onReady}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate('AddPlace')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{ title: 'Add a new place' }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{ title: 'Loading places data...' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
