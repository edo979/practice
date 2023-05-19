import {Image, StyleSheet, Text, View} from 'react-native';
import {PlaceT} from '../store/dt';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamListT} from '../App';
import {DarkTheme} from '../constants/style';
import Map from '../components/Map';

type PlacePropT = NativeStackScreenProps<StackParamListT, 'Place'>;

const Place = ({route}: PlacePropT) => {
  const place = route.params?.place;

  if (!place) return <Text>Nema podataka za mjesto</Text>;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>{place.name}</Text>
      <Text style={styles.text}>{place.address}</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: place.imageUri}} />
        <Map style={styles.map} />
      </View>
    </View>
  );
};
export default Place;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  imageContainer: {
    flex: 1,
    gap: 8,
  },
  image: {
    ...DarkTheme.imageBaseStyle,
    flex: 4,
  },
  map: {
    flex: 3,
  },
});
