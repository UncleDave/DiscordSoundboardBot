import React, { FC } from 'react';
import styled from 'styled-components';
import { iconButton } from '../styles/mixins';
import PreviewInstructions from './PreviewInstructions';
import TaggingInstructions from './TaggingInstructions';
import { useSortRules } from '../contexts/sort-rules-context';
import { useCustomTags } from '../contexts/custom-tags-context';

const SortToolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: right;
  margin: 20px 4vw 0px;

  > div {
    display: flex;

    @media only screen and (max-width: 780px) {
      width: 100%;
      margin-top: 6px;
      justify-content: center;
    }
  }

  @media only screen and (max-width: 780px) {
    justify-content: right;
    margin: 5px;
  }
`;

const ResizeIcon = styled.div`
  ${ iconButton }

  @media only screen and (max-width: 780px) {
    width: 100%;
    display: flex;
    margin-right: 10px;
    justify-content: right;
  }
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
  setPreviewVolume: (volume: string) => void;
}

const SortContainer: FC<SortContainerProps> = ({ setPreviewVolume }) => {
  const { toggleSmallButtons } = useSortRules();
  const { currentlyTagging } = useCustomTags();

  return (
    <SortToolbar>
      <PreviewInstructions setPreviewVolume={ setPreviewVolume } />
      { currentlyTagging && (
      <TaggingInstructions
        tagName={ currentlyTagging.name }
        tagColor={ currentlyTagging.color }
      />
      ) }
      <div>
        <ResizeIcon role="presentation" onClick={ toggleSmallButtons }>
          { [0, 1].map(x => <ResizeSpan key={ x } className='material-icons'>crop_square</ResizeSpan>) }
        </ResizeIcon>
      </div>
    </SortToolbar>
  );
};

export default SortContainer;
