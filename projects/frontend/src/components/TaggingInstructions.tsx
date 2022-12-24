import React, { FC } from 'react';
import styled from 'styled-components';
import { button, filterButton } from '../styles/mixins';

interface TaggingInstructionsMainProps {
  tagColor: string;
}

const TaggingInstructionsMain = styled.div<TaggingInstructionsMainProps>`
  display: flex;
  align-items: center;
  flex-grow: 0.5;
  justify-content: center;
  
  > p {
    color: ${ props => props.tagColor };
    font-weight: bold;
    text-shadow: 2px 2px 3px ${ props => props.theme.colors.shadowDefault };
  }

  > button {
    ${ button }
    ${ filterButton }

    margin-left: 12px;
  }
`;

interface TaggingInstructionsProps {
  tagName: string;
  tagColor: string;
  saveTagged: () => void;
  discardTagged: () => void;
}

const TaggingInstructions: FC<TaggingInstructionsProps> = ({ tagName, tagColor, saveTagged, discardTagged }) => (
  <TaggingInstructionsMain tagColor={ tagColor }>
    <p>
      { `Currently tagging sounds for: ${ tagName }` }
    </p>
    <button type='button' onClick={ saveTagged }>
      Save
    </button>
    <button type='button' onClick={ discardTagged }>
      Discard
    </button>
  </TaggingInstructionsMain>
);

export default TaggingInstructions;
