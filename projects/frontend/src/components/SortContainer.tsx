import React, { FC } from 'react';
import PreviewInstructions from './PreviewInstructions';

interface SortContainerProps {
  showPreview: boolean;
  toggleSmallButtons: () => void;
  setPreviewVolume: (volume: string) => void;
}

const SortContainer: FC<SortContainerProps> = ({ showPreview, toggleSmallButtons, setPreviewVolume }) => (
  <div className="sort-toolbar">
    { showPreview && <PreviewInstructions setPreviewVolume={ setPreviewVolume } /> }
    <div className="sort-buttons">
      <div className="size-toggle-btn icon-btn" role="presentation" onClick={ toggleSmallButtons }>
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
