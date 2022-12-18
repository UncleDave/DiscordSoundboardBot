import React, { FC } from 'react';
import styled from 'styled-components';
import { button, filterButton } from '../styles/mixins';

interface TaggingInstructionsMainProps {
  color: string;
}

const TaggingInstructionsMain = styled.div<TaggingInstructionsMainProps>`
  display: flex;
  align-items: center;
  flex-grow: 2;
  justify-content: center;
  
  > p {
    color: ${ props => props.color };
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
}

const TaggingInstructions: FC<TaggingInstructionsProps> = ({ tagName, tagColor }) => (
  <TaggingInstructionsMain color={ tagColor }>
    <p>
      { `Currently tagging sounds for: ${ tagName }` }
    </p>
    <button type='button'>
      Save
    </button>
  </TaggingInstructionsMain>
);

export default TaggingInstructions;
