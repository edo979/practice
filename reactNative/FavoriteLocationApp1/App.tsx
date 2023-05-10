import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddPlace from './screens/AddPlace';
import AllPlaces from './screens/AllPlaces';
import IconButton from './components/ui/IconButton';
import {DarkTheme} from './constants/style';

const Stack = createNativeStackNavigator();
const AppTheme = {
  ...DarkTheme,
};

const App = () => {
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="AllPlaces"
          component={AllPlaces}
          options={({navigation}) => ({
            headerRight: ({tintColor}) => (
              <IconButton
                color={tintColor}
                onPress={() => navigation.navigate('AddPlace')}>
                Dodaj
              </IconButton>
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
    </NavigationContainer>
  );
};

export default App;
