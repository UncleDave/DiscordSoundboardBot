import React, { FC, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import theme from '../styles/theme';
import * as mixins from '../styles/mixins';
import Sound from '../models/sound';

interface SoundTileMainProps {
  preview: boolean;
  statusBorder: string;
  small: boolean;
  isFavorite: boolean;
}

const soundTileSmall = css`
  font-size: 0.6rem;
  border: 2px solid ${ theme.colors.borderDefault };
  border-radius: 2px;
  min-width: 75px;
  min-height: 75px;
  max-width: 75px;
  margin: 4px 4px;
`;

const selectSoundTileMainBorder = (props: any) => {
  if (props.statusBorder === 'success') return mixins.buttonGreen;
  if (props.statusBorder === 'error') return mixins.buttonRed;
  return css`
    transition-property: border-color;
    transition-duration: 1s;
    transition-delay: 2s;
  `;
};

const SoundTileMain = styled.div<SoundTileMainProps>`
  position: relative;

  > button {
    ${ mixins.button }
    
    font-size: 1.2rem;
    color: white;
    border: 5px solid ${ theme.colors.borderDefault };
    border-radius: 3px;
    min-width: 150px;
    min-height: 150px;
    max-width: 150px;
    margin: 6px 6px;
    background-color: ${ theme.colors.innerA };
    word-wrap: break-word;
  
    ${ props => props.small ? soundTileSmall : '' }

    ${ props => props.preview ? 'border-style: dashed;' : '' }
    ${ props => selectSoundTileMainBorder(props) }
  
    @media only screen and (max-width: 780px) {
      border: 3px solid ${ theme.colors.borderDefault };
      border-width: 3px;
      border-radius: 2px;
      min-width: 20vw;
      min-height: 20vw;
      max-width: 20vw;
    }
  }

  > span {
    ${ mixins.iconButton }
    
    position: absolute;
    right: 12px;
    top: 12px;
    opacity: 50%;
    
    ${ props => props.small ? css`
    font-size: 12px;
    right: 8px;
    top: 8px;
    ` : '' }

    ${ props => props.isFavorite ? css`
      color:#fcc82a;
      opacity: 75%;
    ` : '' }

    &:hover {
      opacity: 100%;
    }

    @media only screen and (max-width: 780px) {
      font-size: 1.4rem;
      right: 11px;
      top: 11px; 
    }
  }
`;

interface SoundTileProps {
  preview: boolean;
  small: boolean;
  sound: Sound;
  soundRequest: (soundName: string, borderCallback: () => void) => void;
  previewRequest: (soundName: string) => void;
  updateFavRequest: (soundId: string) => void;
}

const SoundTile: FC<SoundTileProps> = ({ preview, small, sound: { name, isFavorite }, soundRequest, previewRequest, updateFavRequest }) => {
  const [statusBorder, setStatusBorder] = useState('');

  const raiseStatusSet = useCallback(() => setStatusBorder('success'), []);

  const handleSoundClick = useCallback(() => {
    setStatusBorder('error');
    soundRequest(name, raiseStatusSet);
    setTimeout(() => setStatusBorder(''), 1);
  }, []);

  return (
    <SoundTileMain
      preview={ preview }
      statusBorder={ statusBorder }
      small={ small }
      isFavorite={ isFavorite }
    >
      <button
        type="button"
        onClick={ preview ? () => previewRequest(name) : handleSoundClick }
      >
        { name }

      </button>
      <span
        className='material-icons'
        role="presentation"
        onClick={ () => updateFavRequest(name) }
      >
        { isFavorite ? 'star' : 'star_outline' }
      </span>
    </SoundTileMain>
  );
};

export default SoundTile;