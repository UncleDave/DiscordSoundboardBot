import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Sound from '../../models/sound';
import { textShadowVisibility, button } from '../../styles/mixins';

const PanelSoundMain = styled.div`
  display: flex;
  justify-content: space-between;
  border: 3px solid ${ props => props.theme.colors.borderDefault };
  border-radius: 3px;
  padding: 5px 15px;
  margin: 7px 0px;
  background-color: ${ props => props.theme.colors.innerA };
  ${ textShadowVisibility }
  
  h4 {
    margin: 0px 20px 0px 0px;
  }

  span {
    cursor: pointer;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
`;

const DeleteChoiceButtons = styled.div`
  display: flex;
  justify-content: space-between;

  > button {
    ${ button }
    margin: 0;
  }

  > span {
    margin-right: 5px;

    &:nth-child(2) {
      color: ${ props => props.theme.colors.borderGreen };
    }

    &:nth-child(3) {
      color: ${ props => props.theme.colors.borderRed };
    }
  }
`;

interface PanelSoundProps {
  sound: Sound;
}

const PanelSound: FC<PanelSoundProps> = ({ sound }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  return (
    <PanelSoundMain>
      <h4>{ sound.name }</h4>
      { showConfirmDelete ? (
        <DeleteChoiceButtons>
          <h4>Confirm Delete:</h4>
          <span className='material-icons'>check</span>
          <span className='material-icons' role='presentation' onClick={ () => setShowConfirmDelete(false) }>cancel</span>
        </DeleteChoiceButtons>
      ) : <span role='presentation' onClick={ () => setShowConfirmDelete(true) } className='material-icons'>delete</span> }
    </PanelSoundMain>
  );
};

export default PanelSound;
