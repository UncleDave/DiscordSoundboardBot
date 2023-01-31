import React, { FC, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSWRConfig } from 'swr';
import Sound from '../../models/sound';
import { textInput } from '../../styles/mixins';

const Divider = styled.div`
  background: ${ props => props.theme.colors.borderDefault };
  border-radius: 3px;
  height: 10px;
  width: 470px;
`;

const ActionChoiceContainer = styled.div`
  display: flex;
  justify-content: left;
  > span {
    margin: 0px 7px 0px 0px;

    &:nth-child(2) {
      color: ${ props => props.theme.colors.borderRed };
    }

    &:last-child {
      color: ${ props => props.theme.colors.borderGreen };
      margin-right: 0;
    }
  }
`;

const RenameInput = styled.input`
  ${ textInput }

  margin-bottom: 0;
  margin-right: 7px;
`;

interface AdminSoundActionsProps {
  selectedSound: Sound;
  setSelectedSound: (sound: Sound) => void;
  showConfirmDelete: boolean;
  setShowConfirmDelete: (show: boolean) => void;
  showRenameInput: boolean;
  setShowRenameInput: (show: boolean) => void;
  previewRequest: (soundName: string) => Promise<void>
}

const AdminSoundActions: FC<AdminSoundActionsProps> = ({
  selectedSound,
  setSelectedSound,
  showConfirmDelete,
  setShowConfirmDelete,
  showRenameInput,
  setShowRenameInput,
  previewRequest,
}) => {
  const [renameInput, setRenameInput] = useState('');
  const { mutate } = useSWRConfig();

  const renameRequest = useCallback(async () => {
    if (!renameInput) return;
    await fetch(`/api/admin/renamesound/${ selectedSound.name }/${ renameInput }`, { method: 'PUT' });
    setSelectedSound({ ...selectedSound, name: renameInput });
    setRenameInput('');
    setShowRenameInput(false);
    await mutate('/api/sounds');
  }, [renameInput, selectedSound]);

  const soundDeleteRequest = useCallback(async () => {
    const res = await fetch(`/api/admin/deletesound/${ selectedSound?.name }`, { method: 'DELETE' });
    if (res.status === 200) {
      setShowConfirmDelete(false);
      setRenameInput('');
      setSelectedSound({ name: 'ded', id: 'nope', date: 'Dedcember 31st, 1969', isFavorite: false });
      await mutate('/api/sounds');
    }
  }, [selectedSound?.name]);

  // TODO?? search term update after requests

  useEffect(() => setRenameInput(selectedSound.name), [selectedSound.name]);

  return (
    <>
      <div>
        <h3>Preview</h3>
        <span className='material-icons' role='presentation' onClick={ () => previewRequest(selectedSound.name) }>play_circle</span>
      </div>
      <Divider />
      { showConfirmDelete ? (
        <ActionChoiceContainer>
          <h3>Delete for real?</h3>
          <span className='material-icons' role='presentation' onClick={ () => setShowConfirmDelete(false) }>cancel</span>
          <h3>CHOOSE</h3>
          <span className='material-icons' role='presentation' onClick={ soundDeleteRequest }>check</span>
        </ActionChoiceContainer>
      ) : (
        <div>
          <h3>Delete</h3>
          <span className='material-icons' role='presentation' onClick={ () => { setShowConfirmDelete(true); setShowRenameInput(false); setRenameInput(''); } }>delete</span>
        </div>
      )}
      { showRenameInput
        ? (
          <ActionChoiceContainer>
            <h3>Name:</h3>
            <span className='material-icons' role='presentation' onClick={ () => { setShowRenameInput(false); setRenameInput(selectedSound.name); } }>cancel</span>
            <RenameInput type='text' value={ renameInput } onChange={ event => setRenameInput(event.currentTarget.value) } />
            <span className='material-icons' role='presentation' onClick={ renameRequest }>check</span>
          </ActionChoiceContainer>
        ) : (
          <div>
            <h3>Rename</h3>
            <span className='material-icons' role='presentation' onClick={ () => { setShowRenameInput(true); setShowConfirmDelete(false); } }>edit</span>
          </div>
        )}
    </>
  );
};

export default AdminSoundActions;
