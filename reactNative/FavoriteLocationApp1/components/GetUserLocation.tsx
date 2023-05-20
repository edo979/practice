import {useState} from 'react';
import {Alert, PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GetLocation from 'react-native-get-location';
import {main, mainStyle} from '../constants/style';
import IconButton from './ui/IconButton';
import {StackParamListT} from '../App';
import Map from './Map';

type MapNavigationPropT = NativeStackScreenProps<
  StackParamListT,
  'PickLocation'
>['navigation'];

export type LocationT = {
  lat: number;
  lng: number;
};

const MapContent = ({
  isLoading,
  location,
}: {
  isLoading: boolean;
  location?: LocationT;
}) => {
  if (isLoading) return <Text>Učitavanje lokacije...</Text>;
  if (!location)
    return <Text style={{fontSize: main.fsLG}}>Nije izabrano mjesto</Text>;

  return <Map location={location} />;
};

const GetUserLocation = () => {
  const [state, setState] = useState<LocationT>();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<MapNavigationPropT>();

  async function locateUserHandler() {
    setIsLoading(true);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Upozorenje',
          message: 'Aplikacija želi pristup vašoj tačnoj lokaciji.',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const {latitude: lat, longitude: lng} =
          await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 6000,
          });

        saveLocation({lat, lng});
      } else {
        Alert.alert(
          'Upozorenje',
          'Da bi nastavili koristiti aplikaciju morate dopustiti upotrebu lokacije.',
        );
      }
    } catch (err) {
      Alert.alert('Upozorenje', 'Došlo je do greške, pokušajte ponovo.');
    } finally {
      setIsLoading(false);
    }
  }

  function saveLocation({lat, lng}: LocationT) {
    setState({lat, lng});
  }

  return (
    <View style={{flex: 3, gap: 12}}>
      <View style={mainStyle.card}>
        <MapContent isLoading={isLoading} location={state} />
      </View>

      <View style={styles.btnGroup}>
        <View style={{flex: 1}}>
          <IconButton
            name="add-location"
            onPress={() => {
              navigation.navigate('PickLocation');
            }}>
            Odaberi
          </IconButton>
        </View>
        <View style={{flex: 1}}>
          <IconButton name="my-location" onPress={locateUserHandler}>
            Lociraj
          </IconButton>
        </View>
      </View>
    </View>
  );
};

export default GetUserLocation;
const styles = StyleSheet.create({
  btnGroup: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
