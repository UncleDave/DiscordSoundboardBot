import React, { FC, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { KeyedMutator } from 'swr';
import CustomTag from '../../models/custom-tag';
import CustomTagToolbar from './CustomTagToolbar';
import CustomTagTileContainer from './CustomTagTileContainer';

const CustomTagPickerMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  background-color: ${ props => props.theme.colors.innerA };
  border: 5px solid ${ props => props.theme.colors.borderDefault };
  border-radius: 5px;
  box-shadow: 0px 2px 5px 2px ${ props => props.theme.colors.shadowDefault };

  height: 40vh;
  margin: 0px 50px;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface CustomTagPickerProps {
  customTags: CustomTag[];
  mutateTags: KeyedMutator<CustomTag[]>;
  setDisableEditTagsButton: (disable: boolean) => void;
  beginTagging: (tagId: string) => void;
}

const CustomTagPicker: FC<CustomTagPickerProps> = ({ customTags, mutateTags, setDisableEditTagsButton, beginTagging }) => {
  const [editMode, setEditMode] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState<CustomTag | null>(null);
  const handleEditTagClick = useCallback((id: string) => {
    const tag = customTags.find(x => (x.id === id));
    if (tag) {
      setCurrentlyEditing(tag);
      setEditMode(true);
    }
  }, [customTags]);

  useEffect(() => {
    if (editMode) setDisableEditTagsButton(true);
    else setDisableEditTagsButton(false);
  });

  return (
    <CustomTagPickerMain>
      <ColumnDiv>
        <CustomTagToolbar
          editMode={ editMode }
          setEditMode={ setEditMode }
          customTags={ customTags }
          currentlyEditing={ currentlyEditing }
          setCurrentlyEditing={ setCurrentlyEditing }
          mutateTags={ mutateTags }
        />
        <CustomTagTileContainer
          customTags={ customTags }
          editMode={ editMode }
          currentlyEditing={ currentlyEditing }
          setEditMode={ setEditMode }
          handleEditTagClick={ handleEditTagClick }
          beginTagging={ beginTagging }
        />
      </ColumnDiv>
    </CustomTagPickerMain>
  );
};

export default CustomTagPicker;
