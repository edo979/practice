import {PropsWithChildren} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DarkTheme, main} from '../../constants/style';

type NavigationIconBtn = PropsWithChildren<{
  name: string;
  onPress: () => void;
  color?: string;
  size?: number;
}>;

const IconButton = ({
  name,
  children,
  color = 'black',
  size = 24,
  onPress,
}: NavigationIconBtn) => {
  return (
    <Pressable style={{marginLeft: 'auto'}}>
      <View style={styles.container}>
        <Icon name="camera-alt" size={28} color={DarkTheme.colors.card} />
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
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: main.borderRadius,
    borderWidth: 1,
    borderColor: DarkTheme.colors.border,
    backgroundColor: DarkTheme.colors.primary,
  },
  text: {
    fontSize: main.fsLG,
    color: DarkTheme.colors.border,
  },
});
