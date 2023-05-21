import {useLayoutEffect} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DarkTheme, main} from '../constants/style';
import GetPhoto from '../components/GetPhoto';
import GetUserLocation from '../components/GetUserLocation';
import NavigationIconBtn from '../components/ui/NavigationIconBtn';
import {useFavoritePlacesContext} from '../hooks/FavoritePlacesContext';
import {StackParamListT} from '../App';

type AddPlaceProps = NativeStackScreenProps<
  StackParamListT,
  'AddPlace',
  'AllPlaces'
>;

const AddPlace = ({navigation}: AddPlaceProps) => {
  const {savePlace, newPlace, updateNewPlace} = useFavoritePlacesContext();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({tintColor}) => (
        <NavigationIconBtn onPress={onSave} name="save" color={tintColor}>
          Snimi
        </NavigationIconBtn>
      ),
    });
  }, [newPlace]);

  const onSave = async () => {
    const errors = await savePlace();

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

    navigation.navigate('AllPlaces');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Naziv:</Text>
        <TextInput
          style={styles.input}
          value={newPlace && newPlace.name}
          onChangeText={text => updateNewPlace({name: text})}
        />
      </View>
      <GetPhoto
        imgUri={newPlace?.imageUri ? newPlace.imageUri : undefined}
        saveImageHandler={imageUri => updateNewPlace({imageUri})}
      />
      <GetUserLocation />
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
