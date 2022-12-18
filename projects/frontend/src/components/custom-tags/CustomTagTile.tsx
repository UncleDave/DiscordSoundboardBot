import React, { FC } from 'react';
import styled from 'styled-components';
import { button } from '../../styles/mixins';

interface CustomTagStyleProps {
  color: string;
}

const CustomTagTileMain = styled.div<CustomTagStyleProps>`
  position: relative;
  
  > button {
    color: white;
    background-color: ${ props => props.theme.colors.innerB };
    border: 4px solid ${ props => props.theme.colors.borderDefault };
    border-radius: 4px;
   
    margin: 3px;
    height: 110px;
    width: 110px;
    
    ${ button }
  }

  > span {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    opacity: 50%;

    &:hover {
      opacity: 100%;
    }
  }
`;

interface CustomTagTileProps {
  id: string;
  name: string;
  color: string;
  editMode: boolean;
  handleEditTagClick: (id: string) => void;
  beginTagging: (tagId: string) => void;
}

const CustomTagTile: FC<CustomTagTileProps> = ({ id, name, color, editMode, handleEditTagClick, beginTagging }) => (
  <CustomTagTileMain color={ color }>
    <button type='button' onClick={ () => editMode ? null : beginTagging(id) }>
      { name }
    </button>
    <span className='material-icons' role='presentation' onClick={ () => handleEditTagClick(id) }>edit</span>
  </CustomTagTileMain>
);

export default CustomTagTile;
