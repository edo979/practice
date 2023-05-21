import {useLayoutEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DarkTheme} from '../constants/style';
import {StackParamListT} from '../App';
import Map from '../components/Map';
import NavigationIconBtn from '../components/ui/NavigationIconBtn';
import {PlaceT} from '../store/dt';
import IconButton from '../components/ui/IconButton';
import {useFavoritePlacesContext} from '../hooks/FavoritePlacesContext';
import {useNavigation} from '@react-navigation/native';

type PlacePropT = NativeStackScreenProps<StackParamListT, 'Place'>;
type PlaceNavigationPropT = NativeStackScreenProps<
  StackParamListT,
  'PickLocation'
>['navigation'];

const PlaceHeaderBtn = ({
  color,
  editHandler,
}: {
  color?: string;
  editHandler: () => void;
}) => {
  return (
    <View style={{flexDirection: 'row', gap: 12}}>
      <NavigationIconBtn
        name="delete-forever"
        color={color}
        onPress={editHandler}>
        Izbriši
      </NavigationIconBtn>
      <NavigationIconBtn name="edit" color={color} onPress={editHandler}>
        Uredi
      </NavigationIconBtn>
    </View>
  );
};

const EditForm = ({place}: {place: PlaceT}) => {
  const {updatePlace} = useFavoritePlacesContext();
  const [state, setState] = useState({
    name: place.name,
    address: place.address,
  });
  const navigation = useNavigation<PlaceNavigationPropT>();

  async function onSave() {
    const result = await updatePlace(place.id, {...state});

    if (result) {
      navigation.navigate('AllPlaces');
    } else {
      Alert.alert('Upozorenje', 'Došlo je do greške.');
    }
  }

  return (
    <View style={{flex: 1, padding: DarkTheme.util.padding, gap: 12}}>
      <TextInput
        style={styles.inputField}
        value={state.name}
        onChangeText={text => setState(prev => ({...prev, name: text}))}
      />
      <TextInput
        style={styles.inputField}
        value={state.address}
        onChangeText={text => setState(prev => ({...prev, address: text}))}
      />

      <IconButton name="save" onPress={onSave}>
        Sačuvaj
      </IconButton>
    </View>
  );
};

const Place = ({route, navigation}: PlacePropT) => {
  const place = route.params?.place;
  const [isEditing, setIsEditing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: place?.name,
      headerRight: ({tintColor}) => (
        <PlaceHeaderBtn
          color={tintColor}
          editHandler={() => setIsEditing(true)}
        />
      ),
    });
  });

  if (!place) return <Text>Nema podataka za mjesto</Text>;
  if (isEditing) return <EditForm place={place} />;

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: place.imageUri}} />
      <View style={styles.map}>
        <Map location={place.location} />
      </View>

      <Text style={styles.text}>{place.address}</Text>
    </View>
  );
};

export default Place;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: DarkTheme.util.padding,
  },
  text: {
    fontSize: DarkTheme.util.fsMD,
    color: DarkTheme.colors.border,
  },
  title: {
    fontSize: DarkTheme.util.fsLG,
    fontWeight: 'bold',
  },
  image: {
    ...DarkTheme.imageBaseStyle,
    flex: 4,
    borderRadius: DarkTheme.util.borderRadius,
  },
  map: {
    flex: 3,
    borderRadius: DarkTheme.util.borderRadius,
    overflow: 'hidden',
  },
  inputField: {
    padding: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: DarkTheme.util.borderRadius,
    borderColor: DarkTheme.colors.border,
    fontSize: DarkTheme.util.fsLG,
    color: DarkTheme.colors.border,
  },
});
