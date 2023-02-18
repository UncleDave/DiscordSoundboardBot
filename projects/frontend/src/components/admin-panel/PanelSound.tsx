import React, { FC } from 'react';
import styled from 'styled-components';
import Sound from '../../models/sound';
import { textShadowVisibility, button } from '../../styles/mixins';

const PanelSoundMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    cursor: pointer;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
`;

interface SoundSectionStyleProps {
  isSelected?: boolean;
}

const PanelSoundSection = styled.div<SoundSectionStyleProps>`
  display: flex;
  border: 3px solid ${ props => props.theme.colors.borderDefault };
  border-radius: 3px;
  padding: 5px 15px;
  margin: 7px 7px 7px 0px;
  background-color: ${ props => props.isSelected ? props.theme.colors.buttonHighlighted : props.theme.colors.innerA };
  ${ textShadowVisibility }
  
  h4 {
    margin: 0px 20px 0px 0px;
  }

  &:first-child {
    flex-grow: 1;
    ${ button }
  }

  &:last-child {
    margin-right: 0;
  }
`;

interface PanelSoundProps {
  sound: Sound;
  selectedSoundId: string | undefined;
  setSelectedSound: (sound: Sound) => void;
  previewRequest: (soundName: string) => Promise<void>
}

const PanelSound: FC<PanelSoundProps> = ({ sound, selectedSoundId, setSelectedSound, previewRequest }) => (
  <PanelSoundMain>
    <PanelSoundSection onClick={ () => setSelectedSound(sound) } isSelected={ selectedSoundId === sound.id }>
      <h4>{ sound.name }</h4>
    </PanelSoundSection>
    <span className='material-icons' role='presentation' onClick={ () => previewRequest(sound.id) }>play_circle</span>
  </PanelSoundMain>
);

export default PanelSound;