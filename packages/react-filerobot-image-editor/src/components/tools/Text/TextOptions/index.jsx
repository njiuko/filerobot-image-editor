/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { TOOLS_IDS } from 'utils/constants';
import TextControls from './TextControls';

const TextOptions = ({ t, config }) => {
  const [text, saveText] = useAnnotation({ name: TOOLS_IDS.TEXT }, 20);
  return (
    <TextControls
      textOptionsConfig={config}
      text={text}
      saveText={saveText}
      t={t}
    />
  );
};

TextOptions.defaultProps = {
  config: {},
};

TextOptions.propTypes = {
  t: PropTypes.func.isRequired,
  config: PropTypes.instanceOf(Object),
};

export default TextOptions;
