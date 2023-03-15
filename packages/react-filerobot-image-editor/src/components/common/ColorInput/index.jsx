/** External Dependencies */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Popper from '@scaleflex/ui/core/popper';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { SET_LATEST_COLOR } from 'actions';
import { StyledColorPicker, StyledPickerTrigger } from './ColorInput.styled';
import getPinnedColors from '../../../utils/getPinnedColors';

const pinnedColorsKey = 'FIE_pinnedColors';

// colorFor is used to save the latest color for a specific purpose (e.g. fill/shadow/stroke)
const ColorInput = ({
  position = 'top',
  onChange,
  color,
  colorFor,
  colorPickerConfig,
}) => {
  const {
    selectionsIds = [],
    config: { annotationsCommon = {} },
    dispatch,
    latestColors = {},
  } = useStore();
  const latestColor = latestColors[colorFor];
  const [anchorEl, setAnchorEl] = useState();
  const [currentColor, setCurrentColor] = useState(
    () => latestColor || color || annotationsCommon.fill,
  );

  const [pinnedColors, setPinnedColors] = useState(
    getPinnedColors(colorPickerConfig),
  );

  const changePinnedColors = (newPinnedColors) => {
    if (!window?.localStorage) {
      return;
    }
    const localStoragePinnedColors =
      window.localStorage.getItem(pinnedColorsKey);
    if (JSON.stringify(newPinnedColors) !== localStoragePinnedColors) {
      const maxOfSavedColors = colorPickerConfig?.pinnedColorsLimit;
      console.log(maxOfSavedColors)
      const pinnedColorsToSave = newPinnedColors.slice(-maxOfSavedColors);
      window.localStorage.setItem(
        pinnedColorsKey,
        JSON.stringify(pinnedColorsToSave),
      );
      setPinnedColors(pinnedColorsToSave);
    }
  };

  const changeColor = (_newColorHex, rgba, newPinnedColors) => {
    setCurrentColor(rgba);
    onChange(rgba);
    changePinnedColors(newPinnedColors);

    if (latestColor !== rgba) {
      dispatch({
        type: SET_LATEST_COLOR,
        payload: {
          latestColors: {
            [colorFor]: rgba,
          },
        },
      });
    }
  };

  const togglePicker = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  useEffect(() => {
    const colorToSet = (selectionsIds.length === 0 && latestColor) || color;
    setCurrentColor(colorToSet);
    onChange(colorToSet);
  }, [color, selectionsIds]);

  return (
    <>
      <StyledPickerTrigger
        className="FIE_color-picker-triggerer"
        onClick={togglePicker}
        $color={currentColor}
        onChange={onChange}
      />
      <Popper
        className="FIE_color-picker"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        position={position}
        onClick={togglePicker}
        overlay
        zIndex={11111}
      >
        <StyledColorPicker
          onChange={changeColor}
          defaultColor={currentColor}
          pinnedColors={pinnedColors}
          colorPickerConfig={colorPickerConfig}
        />
      </Popper>
    </>
  );
};

ColorInput.defaultProps = {
  position: 'top',
  color: undefined,
  colorPickerConfig: {},
};

ColorInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  colorFor: PropTypes.string.isRequired,
  position: PropTypes.string,
  color: PropTypes.string,
  colorPickerConfig: PropTypes.object,
};

export default ColorInput;
