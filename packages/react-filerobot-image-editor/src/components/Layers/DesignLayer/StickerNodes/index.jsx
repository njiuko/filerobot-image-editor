/** External Dependencies */
import React, { useMemo } from 'react';

/** Internal Dependencies */
import { useAnnotationEvents, useStore } from 'hooks';
import MemoizedAnnotation from '../AnnotationNodes/MemoizedAnnotation';

const StickersNodeTabs = () => {
  const { annotations = {}, selectionsIds = [] } = useStore();
  const annotationEvents = useAnnotationEvents();

  return useMemo(
    () =>
      Object.values(annotations).map((annotation) => (
        <MemoizedAnnotation
          key={annotation.id}
          annotation={annotation}
          annotationEvents={annotationEvents}
          selectionsIds={selectionsIds}
        />
      )),
    [annotations, annotationEvents, selectionsIds],
  );
};

export default StickersNodeTabs;
