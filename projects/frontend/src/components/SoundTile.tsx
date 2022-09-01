import React, { FC, useCallback, useState } from 'react';
import Sound from '../models/sound';

interface SoundTileProps {
  preview: boolean;
  sound: Sound;
  soundRequest: (soundName: string, borderCallback: () => void) => void;
  previewRequest: (soundName: string) => void;
  updateFavRequest: (soundId: string) => void;
}

const SoundTile: FC<SoundTileProps> = ({ preview, sound: { name, isFavorite }, soundRequest, previewRequest, updateFavRequest }) => {
  const [statusBorder, setStatusBorder] = useState('');

  const raiseStatusSet = useCallback(() => setStatusBorder(' btn-green'), []);

  const handleSoundClick = useCallback(() => {
    setStatusBorder(' btn-red');
    soundRequest(name, raiseStatusSet);
    setTimeout(() => setStatusBorder(''), 1);
  }, []);

  return (
    <div className={ `${ isFavorite ? 'fav ' : '' }sound-tile` }>
      <button type="button" className={ `btn sound-btn${ preview ? ' preview-btn' : '' }${ statusBorder }` } onClick={ preview ? () => previewRequest(name) : handleSoundClick }>{ name }</button>
      <span
        className={ `material-icons favStar icon-btn ${ isFavorite ? 'fav-set' : '' }` }
        role="presentation"
        onClick={ () => updateFavRequest(name) }
      >
        { isFavorite ? 'star' : 'star_outline' }
      </span>
    </div>
  );
};

export default SoundTile;
