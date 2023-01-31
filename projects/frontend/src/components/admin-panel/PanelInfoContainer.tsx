import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import Sound from '../../models/sound';
import { textShadowVisibility } from '../../styles/mixins';
import AdminSoundActions from './AdminSoundActions';

const InfoContainer = styled.div`
  padding: 20px;
  ${ textShadowVisibility }

  > div {
    display: flex;
    margin-bottom: 5px;
    align-items: center;
  
    > h2 {
      margin: 0px 7px 0px 0px;
  
      &:first-child {
      color: ${ props => props.theme.colors.borderDefault }
      }
    }

    h3 {
      margin: 0px 7px 0px 0px;
    }

    > span {
      font-size: 1.5rem;
      
      cursor: pointer;
      opacity: 0.7;

      &:hover {
      opacity: 1;
      }
    }
  }
`;

const Divider = styled.div`
  background: ${ props => props.theme.colors.borderDefault };
  border-radius: 3px;
  height: 10px;
  width: 470px;
`;

interface PanelInfoContainerProps {
  selectedSound: Sound | null;
  setSelectedSound: (sound: Sound | null) => void;
  previewRequest: (soundName: string) => Promise<void>
}

const PanelInfoContainer:FC<PanelInfoContainerProps> = ({ selectedSound, setSelectedSound, previewRequest }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showRenameInput, setShowRenameInput] = useState(false);

  useEffect(() => {
    setShowConfirmDelete(false);
    setShowRenameInput(false);
  }, [selectedSound]);

  return (
    <InfoContainer>
      <div>
        <h2>Name:</h2>
        <h2>{ selectedSound?.name }</h2>
      </div>
      <div>
        <h2>Id:</h2>
        <h2>{ selectedSound?.id }</h2>
      </div>
      <div>
        <h2>Created:</h2>
        <h2>{ selectedSound?.date }</h2>
      </div>
      <Divider />
      { selectedSound && selectedSound.id !== 'nope'
      && (
      <AdminSoundActions
        selectedSound={ selectedSound }
        setSelectedSound={ setSelectedSound }
        showConfirmDelete={ showConfirmDelete }
        setShowConfirmDelete={ setShowConfirmDelete }
        showRenameInput={ showRenameInput }
        setShowRenameInput={ setShowRenameInput }
        previewRequest={ previewRequest }
      />
      )}
    </InfoContainer>
  );
};

export default PanelInfoContainer;
