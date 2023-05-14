import {Alert, PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import {main, mainStyle} from '../../constants/style';
import IconButton from './IconButton';
import GetLocation from 'react-native-get-location';

type MapProps = {
  location?: {lat: number; lng: number};
};

const Map = ({location}: MapProps) => {
  let content = <Text style={{fontSize: main.fsLG}}>Nije izabrano mjesto</Text>;
  if (location) content = <Text>The Map</Text>;

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
        const {latitude, longitude} = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 6000,
        });

        console.log(latitude, longitude);
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

  async function requestLocationPermission() {}

  return (
    <View style={{flex: 3, gap: 12}}>
      <View style={mainStyle.card}>{content}</View>

      <View style={styles.btnGroup}>
        <View style={{flex: 1}}>
          <IconButton name="add-location" onPress={() => {}}>
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

export default Map;
const styles = StyleSheet.create({
  btnGroup: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
