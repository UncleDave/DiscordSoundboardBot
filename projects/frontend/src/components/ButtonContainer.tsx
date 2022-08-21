import React, { FC } from 'react';
import useSWRImmutable from 'swr/immutable';
import SoundTile from './SoundTile';
import Sound from '../models/sound';

const ButtonContainer: FC = () => {
  const { data: sounds, error } = useSWRImmutable<Sound[]>('/api/sounds');

  if (sounds)
    return (
      <div className="btn-container">
        { sounds.map(x => <SoundTile key={ x.id } sound={ x } />) }
      </div>
    );

  return (
    <div className="btn-container">
      { error ? 'Something went wrong :(' : 'Loading sounds...' }
    </div>
  );
};

export default ButtonContainer;
