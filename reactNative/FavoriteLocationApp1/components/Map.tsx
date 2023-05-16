import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {LocationT} from './GetUserLocation';
import {useState} from 'react';

type MapPropsT = {
  location?: LocationT;
};

const Map = ({location}: MapPropsT) => {
  const [state, setState] = useState<LocationT>({
    lat: location?.lat ?? 37.78825,
    lng: location?.lng ?? -122.4324,
  });

  return (
    <MapView
      initialRegion={{
        latitude: state.lat,
        longitude: state.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={{height: '100%', width: '100%'}}>
      <Marker
        key={1}
        coordinate={{latitude: state.lat, longitude: state.lng}}
        title={'Lokacija'}
        description={'Trenutna lokacija'}
      />
    </MapView>
  );
};

export default Map;
const styles = StyleSheet.create({});
