import React, { FC, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { KeyedMutator } from 'swr';
import * as mixins from '../../styles/mixins';
import CustomTag from '../../models/custom-tag';
import CustomTagColorPicker from './TagColorPicker';

const ToolbarMain = styled.div`
  display: flex;
  align-items: center;
  
  color: ${ props => props.theme.colors.borderDefault };
  margin: 3px;
  border-bottom: 4px solid ${ props => props.theme.colors.borderDefault };
  border-radius: 4px;
  height: fit-content;
  padding-left: 20px;

  @media only screen and (max-width: 780px) {
    justify-content: center;
    padding: 2px 6px
  }
`;

const Dialog = styled.p`
  text-shadow: 2px 2px 3px ${ props => props.theme.colors.shadowDefault };
  font-weight: bold;

  @media only screen and (max-width: 780px) {

  }
`;

const ToolbarRight = styled.div`
  display: flex;
  align-items: center;
  border-left: 4px solid ${ props => props.theme.colors.borderDefault };
  margin: 0px 0px 4px 12px;

  @media only screen and (max-width: 780px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NameField = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 12px;
  
  > p {
    font-weight: bold;
    text-shadow: 2px 2px 3px ${ props => props.theme.colors.shadowDefault };
  }

  > input {
    ${ mixins.textInput }
    ${ mixins.textInputMobile }

    margin-left: 10px;
    margin-bottom: 0px;

    @media only screen and (max-width: 780px) {
      margin-left: 10px;
    }
  }

  @media only screen and (max-width: 780px) {
    margin-left: 8px;
  }
`;

const ToolbarButton = styled.button`
  ${ mixins.button }
  ${ mixins.filterButton }
  ${ mixins.filterButtonMobile }

  margin-left: 10px;
`;

const ConfirmDelete = styled(ToolbarButton)`
  border-color: ${ props => props.theme.colors.borderRed };
`;

interface ColorButtonProps {
  color: string;
}

const ColorButton = styled.div<ColorButtonProps>`
  ${ mixins.filterButton }
  ${ mixins.filterButtonMobile }

  min-height: 30px;
  width: 60px;
  cursor: pointer;
  position: relative;
  margin-left: 10px;
  background-color: ${ props => props.color };
  z-index: 10;

  @media only screen and (max-width: 780px) {
    max-height: 26px;
  }
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

  const addOrEditTagRequest = useCallback(async () => {
    let tag: CustomTag = { id: '', name: nameInput, color: tagColor, sounds: [] };
    let route = 'create';
    let newTags = [...customTags];
    if (customTags && currentlyEditing) {
      const foundTag = customTags.find(x => x.id === currentlyEditing.id);
      if (foundTag) tag = foundTag;
      route = 'edit';
      newTags[newTags.findIndex(x => x.id === tag.id)] = { ...(tag), name: nameInput, color: tagColor };
    } else if (customTags) {
      const id = uuidv4();
      tag.id = id;
      newTags = [...newTags, tag];
    }
    const tagRequest = async () => {
      fetch(`/api/customTags/${ route }/${ tag.id }/${ nameInput }/${ `%23${ tagColor.split('#')[1] }` }`, { method: 'POST' });
      return newTags;
    };
    mutateTags(tagRequest(), { optimisticData: newTags, rollbackOnError: true });
    resetToolbar();
  }, [nameInput, customTags, currentlyEditing, tagColor]);

  const deleteTagRequest = useCallback(async () => {
    if (customTags && currentlyEditing) {
      const newTags = customTags.filter(x => x.id !== currentlyEditing.id);
      const deleteTag = async () => {
        fetch(`/api/customTags/delete/${ currentlyEditing.id }`, { method: 'DELETE' });
        return newTags;
      };
      mutateTags(deleteTag(), { optimisticData: newTags, rollbackOnError: true });
      resetToolbar();
    }
  }, [customTags, currentlyEditing]);

  return (
    <ToolbarMain>
      <Dialog>
        { editMode ? 'Edit tag properties' : 'Select a tag to begin tagging or create/edit a tag. ' }
      </Dialog>
      { editMode && (
      <ToolbarRight>
        <NameField>
          <p>Name:</p>
          <input type='text' value={ nameInput } onChange={ event => setNameInput(event.currentTarget.value) } />
        </NameField>
        <ColorButton color={ tagColor } onClick={ () => setShowColorPicker(!showColorPicker) }>
          { showColorPicker && <CustomTagColorPicker selectColor={ selectColor } /> }
        </ColorButton>
        <ToolbarButton onClick={ addOrEditTagRequest }>
          Save
        </ToolbarButton>
        <ToolbarButton onClick={ resetToolbar }>
          Discard Changes
        </ToolbarButton>
        { currentlyEditing && (
          <ToolbarButton onClick={ () => setShowConfirmDelete(!showConfirmDelete) }>
            { showConfirmDelete ? 'Cancel Delete' : 'Delete' }
          </ToolbarButton>
        ) }
        { showConfirmDelete && (
          <ConfirmDelete onClick={ () => deleteTagRequest() }>
            Confirm Delete
          </ConfirmDelete>
        ) }
      </ToolbarRight>
      ) }
    </ToolbarMain>
  );
};

export default CustomTagToolbar;