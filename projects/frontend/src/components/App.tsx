import React, { FC, useState, useCallback, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { CSSTransition, TransitionStatus } from 'react-transition-group';
import Nav from './nav/Nav';
import AdminPanel from './admin-panel/AdminPanel';
import Features from './features/Features';
import ButtonContainer from './ButtonContainer';
import SortContainer from './SortContainer';
import TagPicker from './custom-tags/TagPicker';
import * as themes from '../styles/themes';
import GlobalStyle from '../styles/global-style';
import Snowflakes from './decorative/Snowflakes';
import Fireworks from './decorative/Fireworks';
import { useSortRules, SortRulesProvider } from '../hooks/use-sort-rules';
import { useCustomTags, CustomTagsProvider } from '../hooks/use-custom-tags';

const AppMain = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  overflow-y: hidden;
`;

interface SoundboardStyleProps {
  state: TransitionStatus;
}

const Soundboard = styled.div<SoundboardStyleProps>`
  overflow-y: scroll;
  flex: 1;

  transition: opacity 0.4s ease-out;
  opacity: ${ props => props.state === 'entered' || props.state === 'entering' ? '1' : '0' };

  &::-webkit-scrollbar {
    width: 15px;
    height: 100%;
  }

  &::-webkit-scrollbar-track {
    background: ${ props => props.theme.colors.innerB }
  }

  &::-webkit-scrollbar-thumb {
    background: ${ props => props.theme.colors.innerA };
  }
`;

function getThemeFromDate(date: string) {
  if (date.includes('July 4')) return themes.americaTheme;
  if (date.includes('Oct')) return themes.halloweenTheme;
  if (date.includes('Dec')) return themes.christmasTheme;
  return themes.defaultTheme;
}

const theme = getThemeFromDate(new Date().toString());

const App: FC = () => {
  const sortRules = useSortRules();
  const customTags = useCustomTags();

  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const [showPreview, setShowPreview] = useState(false);
  const toggleShowPreview = useCallback(() => {
    setShowPreview(!showPreview);
  }, [showPreview]);

  const [previewVolume, setPreviewVolume] = useState('.5');
  const [previewGain, setPreviewGain] = useState<GainNode | null>(null);
  useEffect(() => {
    if (previewGain)
      previewGain.gain.value = Number(previewVolume);
  }, [previewVolume, previewGain]);

  const previewRequest = useCallback(async (soundId: string) => {
    const soundUrl = await fetch(`/api/preview/${ soundId }`, { headers: { 'Content-Type': 'text/plain' } });
    if (soundUrl.status === 401) {
      window.location.reload();
      return;
    }
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
        <Nav showAdminPanel={ showAdminPanel } setShowAdminPanel={ setShowAdminPanel } />
        <AdminPanel show={ showAdminPanel } adminPanelClosed={ () => setShowAdminPanel(false) } previewRequest={ previewRequest } />
        <CSSTransition in={ !showAdminPanel } timeout={ 410 }>
          { state => (
            <Soundboard state={ state }>
              <SortRulesProvider value={ sortRules }>
                <CustomTagsProvider value={ customTags }>
                  <Features
                    previewToggled={ showPreview }
                    toggleShowPreview={ toggleShowPreview }
                  />
                  <SortContainer
                    showPreview={ showPreview }
                    setPreviewVolume={ setPreviewVolume }
                  />
                  { customTags.showCustomTagPicker && (
                  <TagPicker />
                  ) }
                  <ButtonContainer
                    preview={ showPreview }
                    previewRequest={ previewRequest }
                  />
                </CustomTagsProvider>
              </SortRulesProvider>
            </Soundboard>
          ) }
        </CSSTransition>
      </ThemeProvider>
    </AppMain>
  );
};

export default App;
