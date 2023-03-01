/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import AnnotationOptions from 'components/common/AnnotationOptions';

const StickersControls = ({ image, saveImage, children, t }) => (
  <AnnotationOptions
    className="FIE_image-tool-options"
    annotation={image}
    updateAnnotation={saveImage}
    t={t}
    hideFillOption
  >
    {children}
  </AnnotationOptions>
);

StickersControls.defaultProps = {
  children: null,
};

StickersControls.propTypes = {
  image: PropTypes.instanceOf(Object).isRequired,
  saveImage: PropTypes.func.isRequired,
  children: PropTypes.node,
  t: PropTypes.func.isRequired,
};

export default StickersControls;
