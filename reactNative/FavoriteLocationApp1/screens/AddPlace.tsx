import {useLayoutEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DarkTheme, main} from '../constants/style';
import GetPhoto from '../components/GetPhoto';
import GetUserLocation, {LocationT} from '../components/GetUserLocation';
import NavigationIconBtn from '../components/ui/NavigationIconBtn';
import {useFavoritePlacesContext} from '../hooks/FavoritePlacesContext';
import {StackParamListT} from '../App';
import {RawPlaceT} from '../store/dt';
import {getAddress} from '../services/locationServices';

type AddPlaceProps = NativeStackScreenProps<
  StackParamListT,
  'AddPlace',
  'AllPlaces'
>;

type ErrorsT = {
  name: string | null;
  address: string | null;
  imageUri: string | null;
  location: string | null;
};

const AddPlace = ({navigation}: AddPlaceProps) => {
  const {savePlace, errorFromDB} = useFavoritePlacesContext();
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
    const errors = validateData();

    if (errors) {
      Alert.alert(
        'Upozorenje',
        `${errors.name ? errors.name + '\n' : ''}${
          errors.imageUri ? errors.imageUri + '\n' : ''
        }${errors.address ? errors.address + '\n' : ''}${
          errors.location ? errors.location + '\n' : ''
        }`,
      );

      return;
    }

    await savePlace({
      name: state.name,
      address: state.address,
      imageUri: state.imageUri,
      location: {lat: state.location.lat, lng: state.location.lng},
    });
    if (errorFromDB) Alert.alert('Upozorenje', errorFromDB);

    navigation.navigate('AllPlaces');
  };

  function validateData() {
    const errors: ErrorsT = {
      name: state.name ? null : 'Upišite naziv za novo mjesto.',
      address: state.address ? null : 'Lokacija nije određena.',
      imageUri: state.imageUri ? null : 'Novo mjesto nema slike.',
      location: state.location ? null : 'Greška prilikom lociranja.',
    };

    const hasErrors = Object.values(errors).some(Boolean);

    if (hasErrors) return errors;
    return false;
  }

  async function saveLocationHandler(location: LocationT) {
    const address = await getAddress(location);

    setState(prev => ({
      ...prev,
      location,
      address,
    }));
  }

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
      <GetUserLocation saveLocationHandler={saveLocationHandler} />
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
