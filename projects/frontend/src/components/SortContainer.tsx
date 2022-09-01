import React, { FC } from 'react';
import PreviewInstructions from './PreviewInstructions';

interface SortContainerProps {
  showPreview: boolean;
  smallCallback: () => void;
  volumeCallback: (volume: string) => void;
}

const SortContainer: FC<SortContainerProps> = ({ showPreview, smallCallback, volumeCallback }) => (
  <div id="sort-toolbar" className="sort-toolbar">
    { showPreview && <PreviewInstructions volumeCallback={ volumeCallback } /> }
    <div className="sort-buttons">
      <div id="size-toggle-btn" className="size-toggle-btn icon-btn" role="presentation" onClick={ smallCallback }>
        <span
          className="material-icons resize-icon no-select"
          style={ { fontSize: '1.5rem' } }
        >
          crop_square
        </span>
        <span
          className="material-icons resize-icon no-select"
          style={ { fontSize: '2.5rem' } }
        >
          crop_square
        </span>
      </div>
    </div>
  </div>
);

export default SortContainer;
