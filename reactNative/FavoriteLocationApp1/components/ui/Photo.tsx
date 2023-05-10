import {StyleSheet, Text, View, Image} from 'react-native';
import {main, mainStyle} from '../../constants/style';
import IconButton from './IconButton';

type ShowPhotoProps = {
  imgUri?: string;
};

const ShowPhoto = ({imgUri}: ShowPhotoProps) => {
  let content = <Text style={{fontSize: main.fsLG}}>Nema Fotografije</Text>;
  if (imgUri) content = <Image source={{}} />;

  return (
    <View>
      <View style={mainStyle.card}>{content}</View>
      <View style={{marginTop: 12}}>
        <IconButton onPress={() => {}} name="camera-alt" size={28}>
          Slikaj
        </IconButton>
      </View>
    </View>
  );
};

export default ShowPhoto;
