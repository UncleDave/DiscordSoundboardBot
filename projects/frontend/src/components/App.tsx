import React, { FC, useState, useCallback, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import useSWR from 'swr';
import Nav from './nav/Nav';
import Features from './features/Features';
import ButtonContainer from './ButtonContainer';
import SortContainer from './SortContainer';
import CustomTagPicker from './custom-tags/TagPicker';
import * as themes from '../styles/themes';
import GlobalStyle from '../styles/global-style';
import Snowflakes from './decorative/Snowflakes';
import Fireworks from './decorative/Fireworks';
import CustomTag from '../models/custom-tag';
import TagProps from '../models/tag-props';

const AppMain = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

function getThemeFromDate(date: string) {
  if (date.includes('July 4')) return themes.americaTheme;
  if (date.includes('Oct')) return themes.halloweenTheme;
  if (date.includes('Dec')) return themes.christmasTheme;
  return themes.defaultTheme;
}

// CHANGE DATE BACK
// CHANGE DATE BACK
// Consider getting tag mutate in tag picker with getswrconfig
// Change DB tag color to IDs to allow for future color changes
// Custom Tags QOL shit

const theme = getThemeFromDate('Jun');

const App: FC = () => {
  const [sortRules, setSortRules] = useState({ favorites: false, small: false, searchTerm: '', groups: 0, tags: new Array<string>() });

  const { data: customTags, mutate: mutateTags } = useSWR<CustomTag[]>('/api/customTags');

  const toggleSmallButtons = useCallback(() => {
    setSortRules(oldState => ({ ...oldState, small: !oldState.small }));
  }, [sortRules.small]);

  const toggleFavs = useCallback(() => {
    setSortRules(oldState => ({ ...oldState, favorites: !oldState.favorites }));
  }, [sortRules.favorites]);

  const [showCustomTagPicker, setShowCustomTagPicker] = useState(false);
  const toggleShowCustomTagPicker = useCallback(() => {
    setShowCustomTagPicker(!showCustomTagPicker);
  }, [showCustomTagPicker]);
  const [disableEditTagsButton, setDisableEditTagsButton] = useState(false);

  const [showPreview, setShowPreview] = useState(false);
  const toggleShowPreview = useCallback(() => {
    setShowPreview(!showPreview);
  }, [showPreview]);

  const setSearchTerm = useCallback((searchTerm: string) => {
    setSortRules(oldState => ({ ...oldState, searchTerm }));
  }, [sortRules.searchTerm]);

  const toggleSoundGrouping = useCallback(() => {
    let newMode = 0;
    if (!sortRules.groups) newMode = 1;
    if (sortRules.groups === 1) newMode = 2;
    setSortRules(oldState => ({ ...oldState, groups: newMode }));
  }, [sortRules.groups]);

  const toggleTagFilter = useCallback((tagId: string) => {
    const newTagRules = [...sortRules.tags];
    const index = newTagRules.indexOf(tagId);
    if (index >= 0) newTagRules.splice(index, 1);
    else newTagRules.push(tagId);
    setSortRules(oldState => ({ ...oldState, tags: newTagRules }));
  }, [sortRules.tags]);

  const [previewVolume, setPreviewVolume] = useState('.5');
  const [previewGain, setPreviewGain] = useState<GainNode | null>(null);
  useEffect(() => {
    if (previewGain)
      previewGain.gain.value = Number(previewVolume);
  }, [previewVolume, previewGain]);

  const [currentlyTagging, setCurrentlyTagging] = useState<TagProps | null>(null);
  const [unsavedTagged, setUnsavedTagged] = useState<string[]>([]);
  const beginTagging = useCallback((tagId: string) => {
    if (customTags) {
      const tag = customTags.find(x => x.id === tagId);
      if (tag) {
        setUnsavedTagged([...tag.sounds]);
        setShowCustomTagPicker(false);
        setCurrentlyTagging(tag);
        setShowPreview(false);
        setDisableEditTagsButton(true);
      }
    }
  }, [customTags]);

  const toggleSoundOnTag = useCallback((soundId: string) => {
    if (!currentlyTagging) return;
    let newTaggedSounds = [...unsavedTagged];
    if (newTaggedSounds.includes(soundId))
      newTaggedSounds = unsavedTagged.filter(x => (x !== soundId));
    else newTaggedSounds.push(soundId);
    setUnsavedTagged(newTaggedSounds);
  }, [currentlyTagging, unsavedTagged]);

  const saveTagged = useCallback(async () => {
    if (!customTags || !currentlyTagging) return;
    const tagIndex = customTags.findIndex(x => x.id === currentlyTagging?.id);
    if (customTags[tagIndex]) {
      const oldCurrentTagSounds = [...customTags[tagIndex].sounds];
      const newCustomTags = [...customTags];

      const deleted: string[] = [];

      unsavedTagged.forEach(newSound => {
        const oldTagWithSound = newCustomTags.find(oldTag => oldTag.sounds.includes(newSound));
        if (oldTagWithSound && oldTagWithSound.id !== currentlyTagging.id) {
          deleted.push(newSound);
          const soundOldIndex = oldTagWithSound.sounds.indexOf(newSound);
          const oldTagIndex = newCustomTags.indexOf(oldTagWithSound);
          newCustomTags[oldTagIndex].sounds.splice(soundOldIndex, 1);
        }
      });

      newCustomTags[tagIndex].sounds = [...unsavedTagged];

      const currentDeleted = oldCurrentTagSounds.filter(x => !unsavedTagged.includes(x));
      deleted.push(...currentDeleted);

      const updateTagSounds = async () => {
        const added = unsavedTagged.filter(x => !oldCurrentTagSounds.includes(x));
        const body = { addedId: currentlyTagging.id, added, deleted };
        await fetch('/api/customtags/editsounds', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        return newCustomTags;
      };
      await mutateTags(updateTagSounds(), { optimisticData: newCustomTags, rollbackOnError: true });
      setCurrentlyTagging(null);
      setUnsavedTagged([]);
      setDisableEditTagsButton(false);
    }
  }, [customTags, currentlyTagging, unsavedTagged]);

  const discardTagged = useCallback(() => {
    setCurrentlyTagging(null);
    setUnsavedTagged([]);
    setDisableEditTagsButton(false);
  }, []);

  const previewRequest = useCallback(async (soundName: string) => {
    const soundUrl = await fetch(`/api/preview?soundName=${ soundName }`, { headers: { 'Content-Type': 'text/plain' } });
    const audioRes = await fetch(await soundUrl.text());
    const resBuffer = await audioRes.arrayBuffer();
    const context = new AudioContext();
    const gain = context.createGain();

    setPreviewGain(gain);

    await context.decodeAudioData(resBuffer, buffer => {
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(gain).connect(context.destination);
      source.start(0);
    });
  }, [previewVolume]);

  return (
    <AppMain>
      <ThemeProvider theme={ theme }>
        <GlobalStyle />
        { theme.name === 'america' && <Fireworks /> }
        { (theme.name === 'christmas' || theme.name === 'halloween') && <Snowflakes /> }
        <Nav />
        <Features
          favoritesToggled={ sortRules.favorites }
          toggleFavs={ toggleFavs }
          previewToggled={ showPreview }
          toggleShowPreview={ toggleShowPreview }
          showCustomTagPicker={ showCustomTagPicker }
          toggleShowCustomTagPicker={ toggleShowCustomTagPicker }
          customTagProps={ customTags?.map(x => ({ id: x.id, name: x.name, color: x.color })) }
          toggleSoundGrouping={ toggleSoundGrouping }
          toggleTagFilter={ toggleTagFilter }
          disableEditTagsButton={ disableEditTagsButton }
          setSearchTerm={ setSearchTerm }
        />
        <SortContainer
          showPreview={ showPreview }
          toggleSmallButtons={ toggleSmallButtons }
          setPreviewVolume={ setPreviewVolume }
          currentlyTagging={ currentlyTagging }
          saveTagged={ saveTagged }
          discardTagged={ discardTagged }
        />
        { showCustomTagPicker ? (
          <CustomTagPicker
            customTags={ customTags ?? [] }
            mutateTags={ mutateTags }
            setDisableEditTagsButton={ setDisableEditTagsButton }
            beginTagging={ beginTagging }
          />
        ) : null }
        <ButtonContainer
          preview={ showPreview }
          previewRequest={ previewRequest }
          sortRules={ { favorites: sortRules.favorites, small: sortRules.small, searchTerm: sortRules.searchTerm, groups: sortRules.groups, tags: sortRules.tags } }
          customTags={ customTags ?? [] }
          currentlyTagging={ currentlyTagging }
          unsavedTagged={ unsavedTagged }
          toggleSoundOnTag={ toggleSoundOnTag }
        />
      </ThemeProvider>
    </AppMain>
  );
};

export default App;
