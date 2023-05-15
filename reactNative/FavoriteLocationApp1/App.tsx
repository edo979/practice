import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddPlace from './screens/AddPlace';
import AllPlaces from './screens/AllPlaces';
import NavigationIconBtn from './components/ui/NavigationIconBtn';
import {DarkTheme} from './constants/style';
import {FavoritePlaceProvider} from './hooks/FavoritePlacesContext';
import Map from './components/Map';

export type StackParamListT = {
  AllPlaces: undefined;
  AddPlace: undefined;
  Map: undefined;
};

const Stack = createNativeStackNavigator<StackParamListT>();
const AppTheme = {
  ...DarkTheme,
};

const App = () => {
  return (
    <FavoritePlaceProvider>
      <NavigationContainer theme={AppTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({navigation}) => ({
              headerRight: ({tintColor}) => (
                <NavigationIconBtn
                  name="add"
                  color={tintColor}
                  onPress={() => navigation.navigate('AddPlace')}>
                  Dodaj
                </NavigationIconBtn>
              ),
              title: 'Sva mjesta',
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{title: 'Novo mjesto'}}
          />
          <Stack.Screen name="Map" component={Map} options={{title: 'Map'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritePlaceProvider>
  );
};

export default App;
