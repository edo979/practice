import {Text, View} from 'react-native';
import {main, mainStyle} from '../../constants/style';

type MapProps = {
  location?: {lat: number; lng: number};
};

const Map = ({location}: MapProps) => {
  let content = <Text style={{fontSize: main.fsLG}}>Nije izabrano mjesto</Text>;
  if (location) content = <Text>The Map</Text>;

  return <View style={mainStyle.card}>{content}</View>;
};

export default Map;
