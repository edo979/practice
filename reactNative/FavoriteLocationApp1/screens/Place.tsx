import {Image, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamListT} from '../App';
import {DarkTheme} from '../constants/style';
import Map from '../components/Map';
import {useLayoutEffect} from 'react';

type PlacePropT = NativeStackScreenProps<StackParamListT, 'Place'>;

const Place = ({route, navigation}: PlacePropT) => {
  const place = route.params?.place;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: place?.name,
    });
  });

  if (!place) return <Text>Nema podataka za mjesto</Text>;

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: place.imageUri}} />
      <View style={styles.map}>
        <Map />
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
});
