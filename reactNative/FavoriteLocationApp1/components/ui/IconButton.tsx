import {PropsWithChildren} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type IconButtonProps = PropsWithChildren<{
  onPress: () => void;
  color?: string;
  size?: number;
}>;

const IconButton = ({
  children,
  color = 'black',
  size = 24,
  onPress,
}: IconButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Icon name="add" size={size} color={color} />
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default IconButton;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
