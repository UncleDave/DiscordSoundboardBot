import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import CustomTagTile from './TagTile';
import CustomTag from '../../models/custom-tag';
import { button } from '../../styles/mixins';

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const tagButtonTemplate = css`
  color: white;
  font-weight: bold;
  background-color: ${ props => props.theme.colors.innerB };
  border: 3px solid ${ props => props.theme.colors.borderDefault };
  border-radius: 3px;
   
  margin: 3px;
  height: 110px;
  width: 110px;
`;

const NewTagButton = styled.button`
  ${ tagButtonTemplate }
  border-color: ${ props => props.theme.colors.borderGold };
  ${ button }
`;

const EmptyNewTag = styled.button`
  ${ tagButtonTemplate }
  border-style: dashed;
`;

interface CustomTagTileContainerProps {
  customTags: CustomTag[];
  editMode: boolean;
  currentlyEditing: CustomTag | null;
  setEditMode: (editmode: boolean) => void;
  handleEditTagClick: (id: string) => void;
  beginTagging: (tagId: string) => void;
}

const CustomTagTileContainer: FC<CustomTagTileContainerProps> = ({ customTags, editMode, currentlyEditing, setEditMode, handleEditTagClick, beginTagging }) => (
  <TagsContainer>
    <NewTagButton onClick={ () => setEditMode(true) }>
      New
    </NewTagButton>
    { customTags.map(tag => (
      <CustomTagTile
        key={ tag.id }
        id={ tag.id }
        name={ tag.name }
        color={ tag.color }
        editMode={ editMode }
        handleEditTagClick={ handleEditTagClick }
        beginTagging={ beginTagging }
      />
    )) }
    { (editMode && !currentlyEditing) && <EmptyNewTag disabled>??</EmptyNewTag> }
  </TagsContainer>
);

export default CustomTagTileContainer;
