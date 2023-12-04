import {Dimensions, Platform, type ScaledSize} from 'react-native';

let {height, width}: ScaledSize = Dimensions.get('window');

if (width > height) {
  [width, height] = [height, width];
}

const guidelineBaseWidth: number = 375;

const guidelineBaseHeight: number = 812;

const horizontalScale = (size: number): number =>
  (width / guidelineBaseWidth) * size;

const verticalScale = (size: number): number =>
  (height / guidelineBaseHeight) * size;

const moderateScale = (size: number, factor = 0.5): number =>
  size + (horizontalScale(size) - size) * factor;

type GlobalMetricsType = {
  isAndroid: boolean;
  behavior: 'height' | 'padding';
};

export const globalMetrics: GlobalMetricsType = {
  isAndroid: Platform.OS !== 'ios',
  behavior: Platform.OS !== 'ios' ? 'height' : 'padding',
};

function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
}

export {
  height,
  width,
  horizontalScale,
  verticalScale,
  moderateScale,
  isIphoneX,
};
