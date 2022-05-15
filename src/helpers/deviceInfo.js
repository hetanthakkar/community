import {Platform, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export const isLargeIosDevice =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === 812 ||
    width === 812 ||
    height === 844 ||
    width === 844 ||
    height === 896 ||
    width === 896 ||
    height === 926 ||
    width === 926);

export const isSmallIosDevice =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  !(
    height === 812 ||
    width === 812 ||
    height === 844 ||
    width === 844 ||
    height === 896 ||
    width === 896 ||
    height === 926 ||
    width === 926
  );
