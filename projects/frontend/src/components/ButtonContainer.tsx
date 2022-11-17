import React, { FC, useCallback } from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import SoundTile from './SoundTile';
import Sound from '../models/sound';

const ButtonContainerMain = styled.div`
  display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0px 20px;
    padding: 10px 15px 0px;

  @media only screen and (max-width: 780px) {
    padding: 8px 0px;
    margin: 0px 8px;
  }
`;

interface ButtonContainerProps {
  preview: boolean;
  soundRequest: (soundName: string, borderCallback: () => void) => void;
  previewRequest: (soundName: string) => void;
  sortRules: {
    favorites: boolean;
    small: boolean;
    searchTerm: string;
  }
}

const ButtonContainer: FC<ButtonContainerProps> = ({ preview, soundRequest, previewRequest, sortRules: { favorites, small, searchTerm } }) => {
  const { data: sounds, error, mutate: mutateSounds } = useSWR<Sound[]>('/api/sounds');

  const updateFavoritesRequest = useCallback(async (soundName: string) => {
    if (sounds) {
      const sound = sounds.find(x => x.name === soundName);
      if (sound) {
        const newSounds = [...sounds];
        const soundIndex = newSounds.findIndex(x => x.id === sound?.id);
        newSounds[soundIndex] = { ...(sound), isFavorite: !sound?.isFavorite };
        const updateFav = async () => {
          await fetch(`/api/favorites/${ sound?.id }`, { method: sound?.isFavorite ? 'DELETE' : 'PUT' });
          return newSounds;
        };
        await mutateSounds(updateFav(), { optimisticData: newSounds, rollbackOnError: true });
      }
    }
  }, [sounds]);

  if (sounds)
    return (
      <ButtonContainerMain>
        { sounds.map(x => {
          if (favorites && !x.isFavorite) return null;
          if (searchTerm && !x.name.toUpperCase().includes(searchTerm)) return null;
          return <SoundTile key={ x.id } preview={ preview } small={ small } sound={ x } soundRequest={ soundRequest } previewRequest={ previewRequest } updateFavRequest={ updateFavoritesRequest } />;
        })}
      </ButtonContainerMain>
    );

  return (
    <ButtonContainerMain>
      { error ? <h1>Something broke eeeeeek</h1> : <h1>Loading yo sounds...</h1> }
    </ButtonContainerMain>
  );
};

export default ButtonContainer;