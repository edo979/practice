import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddPlace from './screens/AddPlace';
import AllPlaces from './screens/AllPlaces';
import NavigationIconBtn from './components/ui/NavigationIconBtn';
import {DarkTheme} from './constants/style';
import {FavoritePlaceProvider} from './hooks/FavoritePlacesContext';
import Place from './screens/Place';
import {PlaceT} from './store/dt';
import PickLocation from './screens/PickLocation';

export type StackParamListT = {
  AllPlaces: undefined;
  AddPlace: undefined;
  PickLocation: undefined;
  Place: {place: PlaceT} | undefined;
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
          <Stack.Screen
            name="PickLocation"
            component={PickLocation}
            options={{title: 'Odaberi lokaciju'}}
          />
          <Stack.Screen name="Place" component={Place} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritePlaceProvider>
  );
};

export default App;
