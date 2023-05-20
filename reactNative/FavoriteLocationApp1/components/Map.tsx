import {Image, StyleSheet, Text, View} from 'react-native';
import {LocationT} from './GetUserLocation';
import {getMapImage} from '../services/locationServices';

const Map = ({location}: {location: LocationT}) => {
  return (
    <Image style={styles.allSpace} source={{uri: getMapImage(location)}} />
  );
};

export default Map;
const styles = StyleSheet.create({
  allSpace: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
