import React, { FC } from 'react';
import styled from 'styled-components';
import { TransitionStatus } from 'react-transition-group';
import useCustomTags from '../hooks/use-custom-tags';
import useSortRules from '../hooks/use-sort-rules';
import useSoundPreview from '../hooks/use-sound-preview';
import { SortRulesProvider } from '../contexts/sort-rules-context';
import { CustomTagsProvider } from '../contexts/custom-tags-context';
import Features from './features/Features';
import SortContainer from './SortContainer';
import TagPicker from './custom-tags/TagPicker';
import ButtonContainer from './ButtonContainer';

interface SoundboardStyleProps {
  state: TransitionStatus;
}

const SoundboardMain = styled.div<SoundboardStyleProps>`
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

interface SoundboardProps {
  state: TransitionStatus;
}

const Soundboard: FC<SoundboardProps> = ({ state }) => {
  const sortRules = useSortRules();
  const customTags = useCustomTags();
  const { previewRequest, setPreviewVolume } = useSoundPreview();

  return (
    <SoundboardMain state={ state }>
      <SortRulesProvider value={ sortRules }>
        <CustomTagsProvider value={ customTags }>
          <Features />
          <SortContainer
            setPreviewVolume={ setPreviewVolume }
          />
          { customTags.showCustomTagPicker && (
          <TagPicker />
          ) }
          <ButtonContainer
            previewRequest={ previewRequest }
          />
        </CustomTagsProvider>
      </SortRulesProvider>
    </SoundboardMain>
  );
};

export default Soundboard;
