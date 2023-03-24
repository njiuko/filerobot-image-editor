const pinnedColorsKey = 'FIE_pinnedColors';
const getPinnedColors = (colorPickerConfig, DEFAULT_COLORS_CONFIG) => {
  if (DEFAULT_COLORS_CONFIG.length && Object.keys(colorPickerConfig)) {
    return DEFAULT_COLORS_CONFIG;
  }
  return window?.localStorage
    ? JSON.parse(localStorage.getItem(pinnedColorsKey) || '[]')
    : [];
};

export default getPinnedColors;
