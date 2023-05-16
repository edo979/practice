import {StyleSheet, Text, FlatList, View, Image} from 'react-native';
import {useFavoritePlacesContext} from '../hooks/FavoritePlacesContext';
import {DarkTheme, mainStyle} from '../constants/style';

const AllPlaces = () => {
  const {places} = useFavoritePlacesContext();

  if (places.length === 0)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Nijedno mjesto nije dodano, krenite dodavati mjesta.
        </Text>
      </View>
    );

  return (
    <FlatList
      style={styles.container}
      data={places}
      renderItem={({item: place}) => (
        <View style={styles.itemContainer}>
          {place.imageUri !== '' ? (
            <Image source={{uri: place.imageUri}} style={styles.image} />
          ) : (
            <Text>Nema slike</Text>
          )}

          <View style={styles.detailsContainer}>
            <Text style={[styles.text, styles.title]}>{place.name}</Text>
            <Text style={styles.text}>{place.name}</Text>
          </View>
        </View>
      )}
    />
  );
};

export default AllPlaces;
const styles = StyleSheet.create({
  container: {
    padding: DarkTheme.util.padding,
  },
  itemContainer: {
    ...mainStyle.card,
    height: 100,
    marginBottom: DarkTheme.util.verticalSpacing,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  title: {
    marginBottom: 8,
    fontSize: DarkTheme.util.fsXL,
  },
  text: {
    fontSize: DarkTheme.util.fsMD,
    color: DarkTheme.colors.text,
  },
  image: {
    ...DarkTheme.imageBaseStyle,
    borderRadius: DarkTheme.util.borderRadius,
    flex: 1,
  },
  detailsContainer: {
    flex: 2,
  },
});
