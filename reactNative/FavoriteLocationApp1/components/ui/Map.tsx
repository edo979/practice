import {StyleSheet, Text, View} from 'react-native';
import {main, mainStyle} from '../../constants/style';
import IconButton from './IconButton';

type MapProps = {
  location?: {lat: number; lng: number};
};

const Map = ({location}: MapProps) => {
  let content = <Text style={{fontSize: main.fsLG}}>Nije izabrano mjesto</Text>;
  if (location) content = <Text>The Map</Text>;

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
          <IconButton name="my-location" onPress={() => {}}>
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
