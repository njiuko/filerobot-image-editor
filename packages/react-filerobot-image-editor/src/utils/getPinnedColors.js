import { DEFAULT_COLORS_CONFIG } from './constants';

const pinnedColorsKey = 'FIE_pinnedColors';
const getPinnedColors = (colorPickerConfig) => {
  if (DEFAULT_COLORS_CONFIG.length && Object.keys(colorPickerConfig)) {
    return DEFAULT_COLORS_CONFIG;
  }
  return window?.localStorage
    ? JSON.parse(localStorage.getItem(pinnedColorsKey) || '[]')
    : [];
};

export default getPinnedColors;
