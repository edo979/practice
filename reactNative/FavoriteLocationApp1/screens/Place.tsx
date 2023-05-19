import {StyleSheet, Text, View} from 'react-native';
import {PlaceT} from '../store/dt';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamListT} from '../App';
import {DarkTheme} from '../constants/style';

type PlacePropT = NativeStackScreenProps<StackParamListT, 'Place'>;

const Place = ({route}: PlacePropT) => {
  const place = route.params?.place;

  if (!place) return <Text>Nema podataka za mjesto</Text>;

  return (
    <View>
      <Text style={styles.title}>{place.name}</Text>
    </View>
  );
};
export default Place;
const styles = StyleSheet.create({
  title: {
    fontSize: DarkTheme.util.fsLG,
    fontWeight: 'bold',
    color: DarkTheme.colors.border,
  },
});
