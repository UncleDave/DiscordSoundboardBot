import React, { FC, useCallback } from 'react';
import useSWR from 'swr';
import SoundTile from './SoundTile';
import Sound from '../models/sound';

interface ButtonContainerProps {
  preview: boolean;
  soundRequest: (soundName: string, borderCallback: () => void) => void;
  previewRequest: (soundName: string) => void;
  sortRules: {
    favorites: boolean;
    small: boolean;
    search: string;
  }
}

const ButtonContainer: FC<ButtonContainerProps> = ({ preview, soundRequest, previewRequest, sortRules: { favorites, small, search } }) => {
  const { data: sounds, error, mutate } = useSWR<Sound[]>('/api/sounds');

  const updateFavoritesRequest = useCallback(async (soundName: string) => {
    if (sounds) {
      let method = 'PUT';
      const sound = sounds?.find(x => x.name === soundName);
      if (sound?.isFavorite) method = 'DELETE';
      await fetch(`/api/favorites/${ sound?.id }`, { method });
      if (sound) {
        const newSounds = [...sounds];
        const soundIndex = newSounds.findIndex(x => x.id === sound?.id);
        newSounds[soundIndex] = { ...(sound), isFavorite: !sound?.isFavorite };
        mutate(newSounds, { revalidate: false, rollbackOnError: true });
      }
    }
  }, [sounds]);

  if (sounds)
    return (
      <div className={ `btn-container${ small ? ' btn-container-scale' : '' }` }>
        { sounds.map(x => {
          if (favorites && !x.isFavorite) return null;
          if (search && !x.name.toUpperCase().includes(search)) return null;
          return <SoundTile key={ x.id } preview={ preview } sound={ x } soundRequest={ soundRequest } previewRequest={ previewRequest } updateFavRequest={ updateFavoritesRequest } />;
        })}
      </div>
    );

  return (
    <div className="btn-container">
      { error ? 'Something went wrong :(' : 'Loading sounds...' }
    </div>
  );
};

export default ButtonContainer;
