/** External Dependencies */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '@scaleflex/ui/core/menu';
import Label from '@scaleflex/ui/core/label';
import Padding from '@scaleflex/icons/padding';

/** Internal Dependencies */
import restrictNumber from 'utils/restrictNumber';
import {
  StyledSpacedOptionFields,
  StyledIconWrapper,
  StyledOptionPopupContent,
} from 'components/common/AnnotationOptions/AnnotationOptions.styled';
import Slider from 'components/common/Slider';

const StickersPadding = ({ stickers, saveStickers, t }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openOptionPopup = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeOptionPopup = () => {
    setAnchorEl(null);
  };

  const updatePadding = (newPadding) => {
    saveStickers({ padding: restrictNumber(newPadding, 0, 100) });
  };

  const currentPadding = stickers.padding;

  return (
    <>
      <StyledIconWrapper
        className="FIE_watermark-padding-triggerer"
        title={t('padding')}
        onClick={openOptionPopup}
      >
        <Padding size={18} />
      </StyledIconWrapper>
      <Menu
        className="FIE_watermark-padding-popup"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeOptionPopup}
        position="top"
      >
        <StyledOptionPopupContent>
          <StyledSpacedOptionFields>
            <Label>{t('padding')}</Label>
            <Slider
              annotation="px"
              onChange={updatePadding}
              value={currentPadding}
            />
          </StyledSpacedOptionFields>
        </StyledOptionPopupContent>
      </Menu>
    </>
  );
};

StickersPadding.propTypes = {
  stickers: PropTypes.instanceOf(Object).isRequired,
  saveStickers: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default StickersPadding;
