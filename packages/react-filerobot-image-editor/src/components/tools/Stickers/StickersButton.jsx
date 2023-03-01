/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { ImageOutline as ImageIcon } from '@scaleflex/icons/image-outline';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const StickersButton = ({ selectTool, isSelected, t }) => (
  <ToolsBarItemButton
    className="FIE_image-tool-button"
    id={TOOLS_IDS.STICKERS}
    label={t('stickerTool')}
    Icon={ImageIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

StickersButton.defaultProps = {
  isSelected: false,
};

StickersButton.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default StickersButton;
