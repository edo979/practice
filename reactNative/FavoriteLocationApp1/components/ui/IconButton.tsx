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
  color = DarkTheme.colors.card,
  children,
  size = 24,
  onPress,
}: NavigationIconBtn) => {
  return (
    <Pressable
      android_ripple={{color: DarkTheme.colors.card, foreground: true}}>
      <View style={styles.container}>
        <Icon name={name} size={size} color={color} />
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
    fontWeight: 'bold',
    color: DarkTheme.colors.card,
  },
});
