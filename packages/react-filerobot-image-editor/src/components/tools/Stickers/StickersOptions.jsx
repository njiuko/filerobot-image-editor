/** External Dependencies */
import React, { useEffect, useMemo, useState } from 'react';

/** Internal Dependencies */
import { useAnnotation, usePhoneScreen, useStore } from 'hooks';
import { FEEDBACK_STATUSES, TOOLS_IDS } from 'utils/constants';
import {
  CLEAR_ANNOTATIONS_SELECTIONS,
  SELECT_ANNOTATION,
  SET_ANNOTATION,
  SET_FEEDBACK,
} from 'actions';
import StickersControls from './StickersControls';
import StickersPadding from './StickersPadding';
import { StyledStickersWrapper } from './Sticker.styled';
import StickersGallery from './StickersGallery';

const ADDED_IMG_SPACING_PERCENT = 0.15;
const STICKER_ANNOTATION_ID = 'stickers';

const StickersOptions = () => {
  const {
    annotations,
    shownImageDimensions,
    selectionsIds,
    dispatch,
    t,
    adjustments: { crop = {} },
  } = useStore();
  const isPhoneScreen = usePhoneScreen();
  const [showGallery, setShowGallery] = useState(true);
  const [image, saveImage, addNewImage] = useAnnotation(
    {
      name: TOOLS_IDS.IMAGE,
      opacity: 1,
    },
    false,
  );
  const stickers = useMemo(
    () => annotations[STICKER_ANNOTATION_ID],
    [annotations[STICKER_ANNOTATION_ID]],
  );

  const addImgStickers = (loadedImg) => {
    console.log(loadedImg);
    const layerWidth = crop.width || shownImageDimensions.width;
    const layerHeight = crop.height || shownImageDimensions.height;
    const layerCropX = crop.x || 0;
    const layerCropY = crop.y || 0;

    const newImgRatio = Math.min(
      1,
      layerWidth /
        (loadedImg.width + loadedImg.width * ADDED_IMG_SPACING_PERCENT),
      layerHeight /
        (loadedImg.height + loadedImg.height * ADDED_IMG_SPACING_PERCENT),
    );

    addNewImage({
      image: loadedImg,
      x: layerCropX + layerWidth / 2 - (loadedImg.width * newImgRatio) / 2,
      y: layerCropY + layerHeight / 2 - (loadedImg.height * newImgRatio) / 2,
      width: loadedImg.width * newImgRatio,
      height: loadedImg.height * newImgRatio,
    });
  };

  const updateStickersOptions = (newOptions) => {
    dispatch({
      type: SET_ANNOTATION,
      payload: {
        ...(typeof newOptions === 'function'
          ? newOptions(stickers)
          : newOptions),
        id: STICKER_ANNOTATION_ID,
      },
    });
  };

  const setFeedback = (errorMsg) => {
    dispatch({
      type: SET_FEEDBACK,
      payload: {
        feedback: {
          message: errorMsg,
          status: FEEDBACK_STATUSES.WARNING,
        },
      },
    });
  };

  useEffect(() => {
    if (stickers) {
      dispatch({
        type: CLEAR_ANNOTATIONS_SELECTIONS,
      });
      dispatch({
        type: SELECT_ANNOTATION,
        payload: {
          annotationId: 'stickers',
        },
      });
    }
  }, [stickers]);

  // Always keep stickers selected
  useEffect(() => {
    if (
      stickers &&
      (selectionsIds.length === 0 ||
        selectionsIds[0].id !== STICKER_ANNOTATION_ID)
    ) {
      dispatch({
        type: SELECT_ANNOTATION,
        payload: {
          annotationId: 'stickers',
        },
      });
    }
  }, [selectionsIds]);

  const renderStickersPadding = () => (
    <StickersPadding
      stickers={stickers}
      saveStickers={updateStickersOptions}
      t={t}
    />
  );

  return (
    <StickersControls image={image} saveImage={saveImage} t={t}>
      <StyledStickersWrapper
        className="FIE_watermark-add-wrapper"
        noWrap={Boolean(stickers?.name)}
      >
        {showGallery ? (
          <StickersGallery
            selectStickers={addImgStickers}
            style={
              isPhoneScreen && Boolean(stickers?.name)
                ? { width: '55%' }
                : undefined
            }
          />
        ) : null}
      </StyledStickersWrapper>
    </StickersControls>
  );
};

export default StickersOptions;
