import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {LocationT} from './GetUserLocation';
import {useState} from 'react';

type MapPropsT = {
  location?: LocationT;
  style?: {};
};

const Map = ({location, style}: MapPropsT) => {
  const [state, setState] = useState<LocationT>({
    lat: location?.lat ?? 37.78825,
    lng: location?.lng ?? -122.4324,
  });

  return (
    <MapView
      provider={'google'}
      showsMyLocationButton={true}
      mapType="standard"
      initialRegion={{
        latitude: state.lat,
        longitude: state.lng,
        latitudeDelta: 0.035,
        longitudeDelta: 0.01,
      }}
      style={{flex: 1, height: '100%', width: '100%', ...style}}>
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
