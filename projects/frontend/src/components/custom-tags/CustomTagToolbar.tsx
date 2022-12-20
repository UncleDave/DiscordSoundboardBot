import React, { FC, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { KeyedMutator } from 'swr';
import { button, filterButton, textInput } from '../../styles/mixins';
import CustomTag from '../../models/custom-tag';
import CustomTagColorPicker from './CustomTagColorPicker';

const ToolbarMain = styled.div`
  display: flex;
  align-items: center;
  
  color: ${ props => props.theme.colors.borderDefault };
  margin: 3px;
  border-bottom: 4px solid ${ props => props.theme.colors.borderDefault };
  border-radius: 4px;
  height: fit-content;
  padding-left: 20px;
`;

const Dialog = styled.p`
  text-shadow: 2px 2px 3px ${ props => props.theme.colors.shadowDefault };
  font-weight: bold;
`;

const NameField = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 16px;
  border-left: 4px solid ${ props => props.theme.colors.borderDefault };
  
  > p {
    margin-left: 10px;
    font-weight: bold;
    text-shadow: 2px 2px 3px ${ props => props.theme.colors.shadowDefault };
  }

  > input {
    ${ textInput }

    margin-left: 10px;
    margin-bottom: 0px;
  }
`;

const ToolbarButton = styled.button`
  ${ button }
  ${ filterButton }

  margin-left: 10px;
`;

const ConfirmDelete = styled(ToolbarButton)`
  border-color: ${ props => props.theme.colors.borderRed };
`;

interface ColorButtonProps {
  color: string;
}

const ColorButton = styled.div<ColorButtonProps>`
  ${ filterButton }

  min-height: 30px;
  width: 60px;
  cursor: pointer;
  position: relative;
  margin-left: 10px;
  background-color: ${ props => props.color };
  z-index: 10;
`;

interface CustomTagToolbarProps {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  customTags: CustomTag[];
  currentlyEditing: CustomTag | null;
  setCurrentlyEditing: (tag: CustomTag | null) => void;
  mutateTags: KeyedMutator<CustomTag[]>
}

const CustomTagToolbar: FC<CustomTagToolbarProps> = ({ editMode, setEditMode, customTags, currentlyEditing, setCurrentlyEditing, mutateTags }) => {
  const [nameInput, setNameInput] = useState('');
  const [tagColor, setTagColor] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const selectColor = useCallback((color: string) => {
    setTagColor(color);
    setShowColorPicker(false);
  }, []);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (currentlyEditing) {
      setNameInput(currentlyEditing.name);
      setTagColor(currentlyEditing.color);
    }
  }, [currentlyEditing, editMode]);

  const resetToolbar = useCallback(() => {
    setNameInput('');
    setEditMode(false);
    setCurrentlyEditing(null);
    setShowConfirmDelete(false);
  }, []);

  const addTagRequest = useCallback(async () => {
    if (customTags) {
      const id = uuidv4();
      const tag = { id, name: nameInput, color: tagColor, sounds: [] };
      const newTags = [...customTags, tag];
      const addTag = async () => {
        await fetch(`/api/customTags/create/${ id }/${ nameInput }/${ `%23${ tagColor.split('#')[1] }` }`, { method: 'POST' });
        return newTags;
      };
      await mutateTags(addTag(), { optimisticData: newTags, rollbackOnError: true });
      resetToolbar();
    }
  }, [nameInput, customTags, tagColor]);

  const editTagRequest = useCallback(async () => {
    if (customTags && currentlyEditing) {
      const tag = customTags.find(x => x.id === currentlyEditing.id);
      if (tag) {
        const newTags = [...customTags];
        const tagIndex = newTags.findIndex(x => x.id === tag.id);
        newTags[tagIndex] = { ...(tag), name: nameInput };
        const editTag = async () => {
          await fetch(`/api/customTags/edit/${ tag.id }/${ nameInput }/${ `%23${ tagColor.split('#')[1] }` }`, { method: 'POST' });
          return newTags;
        };
        await mutateTags(editTag(), { optimisticData: newTags, rollbackOnError: true });
        resetToolbar();
      }
    }
  }, [nameInput, customTags, currentlyEditing, tagColor]);

  const deleteTagRequest = useCallback(async () => {
    if (customTags && currentlyEditing) {
      const newTags = customTags.filter(x => x.id !== currentlyEditing.id);
      const deleteTag = async () => {
        await fetch(`/api/customTags/delete/${ currentlyEditing.id }`, { method: 'DELETE' });
        return newTags;
      };
      await mutateTags(deleteTag(), { optimisticData: newTags, rollbackOnError: true });
      resetToolbar();
    }
  }, [customTags, currentlyEditing]);

  return (
    <ToolbarMain>
      <Dialog>
        { editMode ? 'Edit tag properties' : 'Select a tag to begin tagging or create/edit a tag. ' }
      </Dialog>
      { editMode && (
      <>
        <NameField>
          <p>Name:</p>
          <input type='text' value={ nameInput } onChange={ event => setNameInput(event.currentTarget.value) } />
        </NameField>
        <ColorButton color={ tagColor } onClick={ () => setShowColorPicker(!showColorPicker) }>
          { showColorPicker ? <CustomTagColorPicker selectColor={ selectColor } /> : null }
        </ColorButton>
        <ToolbarButton onClick={ () => currentlyEditing ? editTagRequest() : addTagRequest() }>
          Save
        </ToolbarButton>
        <ToolbarButton onClick={ resetToolbar }>
          Discard Changes
        </ToolbarButton>
        { currentlyEditing ? (
          <ToolbarButton onClick={ () => setShowConfirmDelete(!showConfirmDelete) }>
            { showConfirmDelete ? 'Cancel Delete' : 'Delete' }
          </ToolbarButton>
        ) : null }
        { showConfirmDelete ? (
          <ConfirmDelete onClick={ () => deleteTagRequest() }>
            Confirm Delete
          </ConfirmDelete>
        ) : null}
      </>
      ) }
    </ToolbarMain>
  );
};

export default CustomTagToolbar;
