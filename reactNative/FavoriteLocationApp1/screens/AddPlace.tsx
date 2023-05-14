import {StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DarkTheme, main} from '../constants/style';
import GetPhoto from '../components/ui/GetPhoto';
import GetUserLocation from '../components/ui/GetUserLocation';
import NavigationIconBtn from '../components/ui/NavigationIconBtn';
import {useFavoritePlacesContext} from '../hooks/FavoritePlacesContext';
import {StackParamListT} from '../App';

type AddPlaceProps = NativeStackScreenProps<StackParamListT, 'AddPlace'>;

const AddPlace = ({navigation}: AddPlaceProps) => {
  const {savePlace} = useFavoritePlacesContext();

  function savePlaceHandler() {
    savePlace({
      id: 2,
      name: 'Prvo',
      address: 'Prva',
      location: {lat: 77, lng: 88},
    });
  }

  navigation.setOptions({
    headerRight: ({tintColor}) => (
      <NavigationIconBtn
        onPress={() => {
          savePlaceHandler();
          navigation.navigate('AllPlaces');
        }}
        name="save"
        color={tintColor}>
        {' '}
        Snimi
      </NavigationIconBtn>
    ),
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Naziv:</Text>
        <TextInput style={styles.input} />
      </View>
      <GetPhoto />
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
