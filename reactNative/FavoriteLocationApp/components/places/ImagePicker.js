import { Image, StyleSheet, Text, View } from 'react-native'
import { launchCameraAsync } from 'expo-image-picker'
import { useState } from 'react'
import { Colors } from '../../constants/colors'
import OutlineButton from '../ui/OutlineButton'

const ImagePicker = () => {
  const [imageUri, setImageUri] = useState()

  async function takeImageHandler() {
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    })

    setImageUri(image.assets[0].uri)
  }

  let imagePreview = <Text>No image taken.</Text>

  if (imageUri)
    imagePreview = <Image source={{ uri: imageUri }} style={styles.image} />

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlineButton onPress={takeImageHandler} icon="camera">
        Take Image
      </OutlineButton>
    </View>
  )
}

export default ImagePicker
const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
