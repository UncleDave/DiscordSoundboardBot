import React, { FC } from 'react';
import styled from 'styled-components';
import theme from '../styles/main';
import { iconButton } from '../styles/mixins';
import PreviewInstructions from './PreviewInstructions';

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
  color: ${ theme.colors.borderDefault };

  font-size: 2.5rem;
  margin-right: -10px;
  user-select: none;

  &:first-child {
    font-size: 1.5rem;
  }
`;

interface SortContainerProps {
  showPreview: boolean;
  toggleSmallButtons: () => void;
  setPreviewVolume: (volume: string) => void;
}

const SortContainer: FC<SortContainerProps> = ({ showPreview, toggleSmallButtons, setPreviewVolume }) => (
  <SortToolbar>
    { showPreview && <PreviewInstructions setPreviewVolume={ setPreviewVolume } /> }
    <div>
      <ResizeIcon role="presentation" onClick={ toggleSmallButtons }>
        <ResizeSpan className='material-icons'>crop_square</ResizeSpan>
        <ResizeSpan className='material-icons'>crop_square</ResizeSpan>
      </ResizeIcon>
    </div>
  </SortToolbar>
);

export default SortContainer;
