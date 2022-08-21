import React, { FC } from 'react';

const PreviewInstructions: FC = () => (
  <div
    id="preview-instructions"
    className="preview-instructions"
  >
    <p>Sounds will only play through your browser</p>
    <input
      type="range"
      id="preview-volume"
      min={ 0 }
      max={ 2 }
      defaultValue=".5"
      step="0.01"
    />
  </div>
);

export default PreviewInstructions;
