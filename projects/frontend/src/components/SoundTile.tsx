import React, { FC } from 'react';
import Sound from '../models/sound';

interface SoundTileProps {
  sound: Sound;
}

const SoundTile: FC<SoundTileProps> = ({ sound: { name, isFavorite } }) => (
  <div className={ `${ isFavorite ? 'fav ' : '' }sound-tile` }>
    <button type="button" className="btn sound-btn">{ name }</button>
    <span className={ `material-icons favStar icon-btn ${ isFavorite ? 'fav-set' : '' }` }>{ isFavorite ? 'star' : 'star_outline' }</span>
  </div>
);

export default SoundTile;
