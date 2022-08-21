import React, { FC } from 'react';
import PreviewInstructions from './PreviewInstructions';

interface SortContainerProps {
  showPreview: boolean;
}

const SortContainer: FC<SortContainerProps> = ({ showPreview }) => (
  <div id="sort-toolbar" className="sort-toolbar">
    { showPreview && <PreviewInstructions /> }
    <div className="sort-buttons">
      <div id="size-toggle-btn" className="size-toggle-btn icon-btn">
        <span
          className="material-icons resize-icon"
          style={ { fontSize: '1.5rem' } }
        >
          crop_square
        </span>
        <span
          className="material-icons resize-icon"
          style={ { fontSize: '2.5rem' } }
        >
          crop_square
        </span>
      </div>
    </div>
  </div>
);

export default SortContainer;
