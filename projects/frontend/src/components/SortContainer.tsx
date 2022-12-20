import React, { FC } from 'react';
import styled from 'styled-components';
import { iconButton } from '../styles/mixins';
import PreviewInstructions from './PreviewInstructions';
import TagProps from '../models/tag-props';
import TaggingInstructions from './TaggingInstructions';

const SortToolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 20px 4vw 0px;

  div {
    display: flex;
  }
`;

const ResizeIcon = styled.div`
  ${ iconButton }
`;

const ResizeSpan = styled.span`
  color: ${ props => props.theme.colors.borderDefault };

  font-size: 2.5rem;
  margin-right: -10px;
  user-select: none;
  text-shadow: 0px 2px 5px ${ props => props.theme.colors.shadowDefault };

  ${ props => props.theme.name === 'christmas' && 'filter: brightness(1.2);' }

  &:first-child {
    font-size: 1.5rem;
  }

  @media only screen and (max-width: 780px) {
    margin-right: -4px;
  }
`;

interface SortContainerProps {
  showPreview: boolean;
  toggleSmallButtons: () => void;
  setPreviewVolume: (volume: string) => void;
  currentlyTagging: TagProps | null;
  saveTagged: () => void;
  discardTagged: () => void;
}

const SortContainer: FC<SortContainerProps> = ({ showPreview, toggleSmallButtons, setPreviewVolume, currentlyTagging, saveTagged, discardTagged }) => (
  <SortToolbar>
    { currentlyTagging ? (
      <TaggingInstructions
        tagName={ currentlyTagging.name }
        tagColor={ currentlyTagging.color }
        saveTagged={ saveTagged }
        discardTagged={ discardTagged }
      />
    ) : null }
    { showPreview && <PreviewInstructions setPreviewVolume={ setPreviewVolume } taggingModeOn={ !!currentlyTagging } /> }
    <div>
      <ResizeIcon role="presentation" onClick={ toggleSmallButtons }>
        { [0, 1].map(x => <ResizeSpan key={ x } className='material-icons'>crop_square</ResizeSpan>) }
      </ResizeIcon>
    </div>
  </SortToolbar>
);

export default SortContainer;
