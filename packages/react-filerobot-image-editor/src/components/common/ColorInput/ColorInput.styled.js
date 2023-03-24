/** External Dependencies */
import styled from 'styled-components';
import ColorPicker from '@scaleflex/ui/core/color-picker';

const StyledPickerTrigger = styled.div.attrs(({ $color }) => ({
  style: {
    background:
      $color === 'rgba(0,0,0,0)'
        ? 'repeating-conic-gradient(#5d6d7e 0% 25%, transparent 0% 50%) 50% / 8px 8px'
        : $color,
  },
}))`
  background: ${({ theme }) => theme.palette['icons-primary']};
  border-radius: 2px;
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme }) => theme.palette['borders-strong']};
  cursor: pointer;
  box-sizing: border-box;
`;

const StyledColorPicker = styled(ColorPicker)`
  max-width: 212px;

  ${` & > .jLEkRq {
      max-height: 200px;
      overflow-y: auto;
  }`}

  ${({ colorPickerConfig }) =>
    colorPickerConfig?.restrictPicker &&
    Object.keys(colorPickerConfig?.restrictPicker)
      ? `
    ${
      colorPickerConfig?.restrictPicker?.hideRangePicker
        ? `& > .SfxColorPicker-range-picker {
            display: none !important;
          }`
        : ''
    }
    ${
      colorPickerConfig?.restrictPicker?.hideBarWrapper
        ? `& > .SfxColorPicker-bar-wrapper {
            display: none !important;
          }`
        : ''
    }
    ${
      colorPickerConfig?.restrictPicker?.hidePickerAction
        ? `& > .SfxColorPicker-action {
            display: none !important;
          }`
        : ''
    }  
    
  `
      : ``}
`;

export { StyledPickerTrigger, StyledColorPicker };
