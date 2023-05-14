import {StyleSheet, Text, FlatList} from 'react-native';
import {useFavoritePlacesContext} from '../hooks/FavoritePlacesContext';
import {DarkTheme} from '../constants/style';

const AllPlaces = () => {
  const {places} = useFavoritePlacesContext();

  if (!places || places.length === 0)
    return (
      <Text style={styles.text}>
        Nijedno mjesto nije dodano, krenite dodavati mjesta.
      </Text>
    );

  return (
    <FlatList
      style={styles.container}
      data={places}
      renderItem={({item: place}) => (
        <Text style={styles.text}>{place.name}</Text>
      )}
    />
  );
};

export default AllPlaces;
const styles = StyleSheet.create({
  container: {
    padding: DarkTheme.util.padding,
  },
  text: {
    fontSize: DarkTheme.util.fsLG,
    color: DarkTheme.colors.border,
  },
});
