import React, { FC, useCallback } from 'react';

interface PreviewInstructionsProps {
  volumeCallback: (volume: string) => void;
}

const PreviewInstructions: FC<PreviewInstructionsProps> = ({ volumeCallback }) => {
  const inputStyle = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const min = Number(event.currentTarget.min);
    const max = Number(event.currentTarget.max);
    event.currentTarget.style.backgroundSize = `${ ((Number(event.currentTarget.value) - min) * 100) / (max - min) }% 100%`;
  }, []);

  return (
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
        onInput={ event => {
          volumeCallback(event.currentTarget.value);
          inputStyle(event);
        } }
      />
    </div>
  );
};

export default PreviewInstructions;
