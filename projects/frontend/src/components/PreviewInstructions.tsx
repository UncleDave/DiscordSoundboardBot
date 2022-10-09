import React, { FC, useCallback } from 'react';

interface PreviewInstructionsProps {
  setPreviewVolume: (volume: string) => void;
}

const PreviewInstructions: FC<PreviewInstructionsProps> = ({ setPreviewVolume }) => {
  const animateVolumeInput = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const min = Number(event.currentTarget.min);
    const max = Number(event.currentTarget.max);
    event.currentTarget.style.backgroundSize = `${ ((Number(event.currentTarget.value) - min) * 100) / (max - min) }% 100%`;
  }, []);

  return (
    <div
      className="preview-instructions"
    >
      <p>Sounds will only play through your browser</p>
      <input
        type="range"
        min={ 0 }
        max={ 2 }
        defaultValue=".5"
        step="0.01"
        onInput={ event => {
          setPreviewVolume(event.currentTarget.value);
          animateVolumeInput(event);
        } }
      />
    </div>
  );
};

export default PreviewInstructions;
