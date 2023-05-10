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
    <>
      <View style={mainStyle.card}>{content}</View>
      <View>
        <IconButton onPress={() => {}} name="camera-alt">
          Slikaj
        </IconButton>
      </View>
    </>
  );
};

export default ShowPhoto;
