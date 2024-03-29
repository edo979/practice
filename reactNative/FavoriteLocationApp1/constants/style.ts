import {StyleSheet} from 'react-native';

export const DarkTheme = {
  dark: false,
  colors: {
    primary: '#394867',
    background: '#212A3E',
    card: '#9BA4B5',
    text: '#212A3E',
    border: '#F1F6F9',
    notification: 'rgb(255, 69, 58)',
  },
  util: {
    padding: 12,
    verticalSpacing: 8,
    borderRadius: 4,
    fsSM: 12,
    fsMD: 16,
    fsLG: 18,
    fsXL: 24,
  },
  imageBaseStyle: {
    height: '100%',
    width: '100%',
  },
};

export const main = {
  padding: 12,
  verticalSpacing: 8,
  borderRadius: 4,
  fsSM: 12,
  fsMD: 16,
  fsLG: 18,
};

export const mainStyle = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: main.borderRadius,
    borderWidth: 1,
    borderColor: DarkTheme.colors.border,
    backgroundColor: DarkTheme.colors.card,
  },
});
