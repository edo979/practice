import {useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DarkTheme, main} from '../constants/style';
import GetPhoto from '../components/ui/GetPhoto';
import GetUserLocation from '../components/ui/GetUserLocation';
import NavigationIconBtn from '../components/ui/NavigationIconBtn';
import {useFavoritePlacesContext} from '../hooks/FavoritePlacesContext';
import {StackParamListT} from '../App';
import {RawPlaceT} from '../store/dt';

type AddPlaceProps = NativeStackScreenProps<
  StackParamListT,
  'AddPlace',
  'AllPlaces'
>;

const AddPlace = ({navigation}: AddPlaceProps) => {
  const {savePlace} = useFavoritePlacesContext();
  const [state, setState] = useState<RawPlaceT>({
    name: '',
    address: '',
    imageUri: '',
    location: {lat: 0, lng: 0},
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({tintColor}) => (
        <NavigationIconBtn onPress={onSave} name="save" color={tintColor}>
          Snimi
        </NavigationIconBtn>
      ),
    });
  }, [state]);

  const onSave = async () => {
    await savePlace({
      name: state.name,
      address: state.address,
      imageUri: state.imageUri,
      location: {lat: state.location.lat, lng: state.location.lng},
    });

    navigation.navigate('AllPlaces');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Naziv:</Text>
        <TextInput
          style={styles.input}
          value={state && state.name}
          onChangeText={text => setState(prev => ({...prev, name: text}))}
        />
      </View>
      <GetPhoto
        imgUri={state.imageUri !== '' ? state.imageUri : undefined}
        saveImageHandler={imageUri => setState(prev => ({...prev, imageUri}))}
      />
      <GetUserLocation
        saveLocationHandler={location =>
          setState(prev => ({...prev, location}))
        }
      />
    </View>
  );
};

export default AddPlace;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: main.padding,
    gap: 18,
  },
  label: {
    fontSize: main.fsMD,
    color: DarkTheme.colors.border,
  },
  input: {
    marginTop: main.verticalSpacing,
    paddingHorizontal: 8,
    borderRadius: main.borderRadius,
    borderWidth: 1,
    borderColor: DarkTheme.colors.border,
    fontSize: main.fsLG,
    color: DarkTheme.colors.border,
    backgroundColor: DarkTheme.colors.card,
  },
});
