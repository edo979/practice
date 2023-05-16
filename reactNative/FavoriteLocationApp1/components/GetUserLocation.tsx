import {Alert, PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import {main, mainStyle} from '../constants/style';
import IconButton from './ui/IconButton';
import GetLocation from 'react-native-get-location';
import {useNavigation} from '@react-navigation/native';
import {StackParamListT} from '../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Map from './Map';
import {useEffect, useState} from 'react';

type MapNavigationPropT = NativeStackScreenProps<
  StackParamListT,
  'PickLocation'
>['navigation'];

export type LocationT = {
  lat: number;
  lng: number;
};

type GetUserLocationProps = {
  location?: LocationT;
  saveLocationHandler: (location: LocationT) => void;
};

const GetUserLocation = ({
  location,
  saveLocationHandler,
}: GetUserLocationProps) => {
  const [state, setState] = useState<LocationT>();
  const navigation = useNavigation<MapNavigationPropT>();
  let content = <Text style={{fontSize: main.fsLG}}>Nije izabrano mjesto</Text>;

  useEffect(() => {
    if (!state) return;
    content = (
      <View style={{height: '100%', width: '100%'}}>
        <Map />
      </View>
    );
    console.log(content);
  }, [state]);

  async function getLocationHandler() {
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
        console.log(lat, lng);
        setState(prev => ({lat, lng}));
        saveLocationHandler({lat, lng});
      } else {
        Alert.alert(
          'Upozorenje',
          'Da bi nastavili koristiti aplikaciju morate dopustiti upotrebu lokacije.',
        );
      }
    } catch (err) {
      Alert.alert('Upozorenje', 'Došlo je do greške, pokušajte ponovo.');
    }
  }

  return (
    <View style={{flex: 3, gap: 12}}>
      <View style={mainStyle.card}>{content}</View>

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
          <IconButton name="my-location" onPress={getLocationHandler}>
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
