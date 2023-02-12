import React, { FC, useCallback, useMemo } from 'react';
import useSWR from 'swr';
import styled, { useTheme } from 'styled-components';
import debounce from '../utils';
import SoundTile from './SoundTile';
import Sound from '../models/sound';
import FullMoon from './decorative/FullMoon';
import CustomTag from '../models/custom-tag';
import { useSortRulesContext } from '../contexts/sort-rules-context';
import { useCustomTagsContext } from '../contexts/custom-tags-context';

const ButtonContainerMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  padding: 10px 15px 0px;
  position: relative;
  z-index: 0;

  @media only screen and (max-width: 780px) {
    padding: 8px 0px;
    margin: 0px 8px;
  }
`;

function sortByDate(soundList: Sound[], sortOrder: string) {
  const compareFn = (a: Sound, b: Sound) => {
    if (sortOrder === 'Date - New') return a.date > b.date ? -1 : 1;
    return a.date < b.date ? -1 : 1;
  };

  return soundList.sort(compareFn);
}

function sortSoundGroups(sounds: Sound[], groupMode: string, customTags: CustomTag[]) {
  const soundList = [...sounds];

  const idsGroupedByTag = customTags.map(x => [...x.sounds]);

  const allTaggedSoundsGrouped = idsGroupedByTag.reduce((groupedList, group) => {
    const total = [...groupedList];
    group.forEach(sound => {
      const soundButton = soundList.find(x => x.id === sound);
      if (soundButton) total.push(soundButton);
    });
    return total;
  }, new Array<Sound>());

  const allTagged = idsGroupedByTag.flat();

  const unTagged = soundList.filter(x => !allTagged.includes(x.id));

  if (groupMode === 'start') return [...allTaggedSoundsGrouped, ...unTagged];
  return [...unTagged, ...allTaggedSoundsGrouped];
}

interface ButtonContainerProps {
  previewRequest: (soundId: string) => Promise<void>;
}

const ButtonContainer: FC<ButtonContainerProps> = ({ previewRequest }) => {
  const { data: sounds, error, mutate: mutateSounds } = useSWR<Sound[]>('/api/sounds');
  const { data: customTags } = useSWR<CustomTag[]>('/api/customtags');
  const theme = useTheme();
  const { sortRules: { favorites, small, searchTerm, sortOrder, groups, tags } } = useSortRulesContext();
  const { currentlyTagging, unsavedTagged } = useCustomTagsContext();

  const soundRequest = useCallback(debounce(async (soundId: string, borderCallback: () => void) => {
    borderCallback();
    const res = await fetch(`/api/sounds/${ soundId }`);
    if (res.status === 401)
      window.location.reload();
  }, 2000, true), []);

  const updateFavoritesRequest = useCallback((soundName: string) => {
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
        mutateSounds(updateFav(), { optimisticData: newSounds, rollbackOnError: true });
      }
    }
  }, [sounds]);

  const orderedSounds = useMemo(() => {
    if (!sounds || !customTags)
      return [];
    let soundList = [...sounds];
    if (sortOrder !== 'A-Z')
      soundList = sortByDate(soundList, sortOrder);
    if (groups === 'none')
      return soundList;
    return sortSoundGroups(soundList, groups, customTags);
  }, [sortOrder, sounds, groups, customTags]);

  if (orderedSounds && customTags)
    return (
      <ButtonContainerMain>
        { theme.name === 'halloween' && <FullMoon /> }
        { orderedSounds.map(x => {
          let tagColor;
          const savedTag = customTags.find(tag => tag.sounds.includes(x.id));
          if (savedTag && savedTag?.id !== currentlyTagging?.id && unsavedTagged.includes(x.id)) tagColor = currentlyTagging?.color;
          else if (savedTag && savedTag?.id !== currentlyTagging?.id) tagColor = savedTag?.color;
          else if (unsavedTagged.includes(x.id)) tagColor = currentlyTagging?.color;

          if (tags.length && (!savedTag || !tags.includes(savedTag.id))) return null;
          if (favorites && !x.isFavorite) return null;
          if (searchTerm && !x.name.toUpperCase().includes(searchTerm)) return null;

          return (
            <SoundTile
              key={ x.id }
              small={ small }
              sound={ x }
              soundRequest={ soundRequest }
              previewRequest={ previewRequest }
              tagColor={ tagColor }
              updateFavRequest={ updateFavoritesRequest }
              currentlyTagging={ !!currentlyTagging }
              unsavedTagged={ unsavedTagged }
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
