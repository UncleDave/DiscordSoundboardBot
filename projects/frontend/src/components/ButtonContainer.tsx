import React, { FC, useCallback } from 'react';
import useSWR from 'swr';
import styled, { useTheme } from 'styled-components';
import debounce from '../utils';
import SoundTile from './SoundTile';
import Sound from '../models/sound';
import FullMoon from './decorative/FullMoon';
import CustomTag from '../models/custom-tag';
import TagProps from '../models/tag-props';

const ButtonContainerMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0px 20px;
  padding: 10px 15px 0px;
  position: relative;
  z-index: 0;

  @media only screen and (max-width: 780px) {
    padding: 8px 0px;
    margin: 0px 8px;
  }
`;

interface ButtonContainerProps {
  preview: boolean;
  previewRequest: (soundName: string) => void;
  sortRules: {
    favorites: boolean;
    small: boolean;
    searchTerm: string;
  }
  customTags: CustomTag[];
  currentlyTagging: TagProps | null;
  unsavedTagged: string[];
  toggleSoundOnTag: (soundId: string) => void;
}

const ButtonContainer: FC<ButtonContainerProps> = ({
  preview,
  previewRequest,
  sortRules: { favorites, small, searchTerm },
  customTags,
  currentlyTagging,
  unsavedTagged,
  toggleSoundOnTag,
}) => {
  const { data: sounds, error, mutate: mutateSounds } = useSWR<Sound[]>('/api/sounds');
  const theme = useTheme();

  const soundRequest = useCallback(debounce((soundName: string, borderCallback: () => void) => {
    borderCallback();
    fetch('/api/sound', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: soundName,
    })
      .then(res => {
        if (res.status === 401) window.location.reload();
      })
      .catch();
  }, 2000, true), []);

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
        { theme.name === 'halloween' && <FullMoon /> }
        { sounds.map(x => {
          let tagColor;
          const savedTag = customTags.find(tag => tag.sounds.includes(x.id));
          if (savedTag && savedTag?.id !== currentlyTagging?.id) tagColor = savedTag?.color;
          else if (savedTag?.id === currentlyTagging?.id && !unsavedTagged.includes(x.id)) tagColor = undefined;
          else if (unsavedTagged.includes(x.id)) tagColor = currentlyTagging?.color;

          if (favorites && !x.isFavorite) return null;
          if (searchTerm && !x.name.toUpperCase().includes(searchTerm)) return null;

          return (
            <SoundTile
              key={ x.id }
              id={ x.id }
              preview={ preview }
              small={ small }
              sound={ x }
              soundRequest={ soundRequest }
              previewRequest={ previewRequest }
              tagColor={ tagColor }
              updateFavRequest={ updateFavoritesRequest }
              currentlyTagging={ !!currentlyTagging }
              unsavedTagged={ unsavedTagged }
              toggleSoundOnTag={ toggleSoundOnTag }
            />
          );
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
