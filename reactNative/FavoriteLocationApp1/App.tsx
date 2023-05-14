import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddPlace from './screens/AddPlace';
import AllPlaces from './screens/AllPlaces';
import NavigationIconBtn from './components/ui/NavigationIconBtn';
import {DarkTheme} from './constants/style';
import {FavoritePlaceProvider} from './hooks/FavoritePlacesContext';

export type StackParamListT = {
  AllPlaces: undefined;
  AddPlace: undefined;
};

const Stack = createNativeStackNavigator<StackParamListT>();
const AppTheme = {
  ...DarkTheme,
};

const App = () => {
  return (
    <NavigationContainer theme={AppTheme}>
      <FavoritePlaceProvider>
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
        </Stack.Navigator>
      </FavoritePlaceProvider>
    </NavigationContainer>
  );
};

export default App;
