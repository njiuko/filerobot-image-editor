/** Internal Dependencies */
import { TOOLS_IDS } from 'utils/constants';
import TextNode from '../AnnotationNodes/TextNode';
import ImageNode from '../AnnotationNodes/ImageNode';

export const STICKER_NAMES_TO_COMPONENT = {
  [TOOLS_IDS.TEXT]: TextNode,
  [TOOLS_IDS.IMAGE]: ImageNode,
};
