import React, { FC } from 'react';
import styled from 'styled-components';
import { useCustomTags } from '../contexts/custom-tags-context';
import { button, filterButton, filterButtonMobile } from '../styles/mixins';

interface TaggingInstructionsMainProps {
  tagColor: string;
}

const TaggingInstructionsMain = styled.div<TaggingInstructionsMainProps>`
  display: flex;
  align-items: center;
  padding: 4px 10px;
  margin: 0px 100px;
  flex-grow: 2;
  justify-content: center;
  border: solid ${ props => props.tagColor };
  border-width: 5px 15px;
  border-radius: 5px;
  
  > p {
    color: ${ props => props.tagColor };
    font-weight: bold;
    text-shadow: 2px 2px 3px ${ props => props.theme.colors.shadowDefault };
    margin: 0;
    margin-right: 12px;
  }

  > button {
    ${ button }
    ${ filterButton }
    ${ filterButtonMobile }

    margin: 0;
    margin-left: 12px;
  }
`;

interface TaggingInstructionsProps {
  tagName: string;
  tagColor: string;
}

const TaggingInstructions: FC<TaggingInstructionsProps> = ({ tagName, tagColor }) => {
  const { saveTagged, discardTagged } = useCustomTags();

  return (
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
};
export default TaggingInstructions;
