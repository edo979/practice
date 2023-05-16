import {StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';
import {LocationT} from './GetUserLocation';

type MapPropsT = {
  location?: LocationT;
};

const Map = ({location}: MapPropsT) => {
  return (
    <MapView
      initialRegion={{
        latitude: location?.lat ?? 37.78825,
        longitude: location?.lng ?? -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={{height: '100%', width: '100%'}}
    />
  );
};

export default Map;
const styles = StyleSheet.create({});
