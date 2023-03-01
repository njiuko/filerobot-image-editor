/** External Dependencies */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useStore } from 'hooks';
import { TOOLS_IDS, STICKER_ANNOTATION_ID } from 'utils/constants';
import Carousel from 'components/common/Carousel';
import { StyledStickersGalleryItem } from './Sticker.styled';

const StickersGallery = ({ selectStickers, style }) => {
  const { config, annotations } = useStore();

  const currentStickersUrl = useMemo(
    () => (annotations[STICKER_ANNOTATION_ID] || {}).image?.src,
    [annotations[STICKER_ANNOTATION_ID]],
  );

  const getStickersImgAndSelect = (e) => {
    selectStickers(e.currentTarget.children[0]);
  };

  const { gallery = [] } = config[TOOLS_IDS.STICKERS] || {};

  if (gallery.length === 0) {
    return null;
  }

  return (
    <Carousel className="FIE_watermark-gallery" style={style}>
      {gallery.map((stickersUrl) => (
        <StyledStickersGalleryItem
          className="FIE_watermark-selected-item"
          onClick={getStickersImgAndSelect}
          key={stickersUrl}
          aria-selected={stickersUrl === currentStickersUrl}
        >
          <img
            src={stickersUrl}
            alt={stickersUrl}
            crossOrigin="Anonymous"
            draggable={false}
          />
        </StyledStickersGalleryItem>
      ))}
    </Carousel>
  );
};

StickersGallery.defaultProps = {
  style: undefined,
};

StickersGallery.propTypes = {
  selectStickers: PropTypes.func.isRequired,
  style: PropTypes.instanceOf(Object),
};

export default StickersGallery;
