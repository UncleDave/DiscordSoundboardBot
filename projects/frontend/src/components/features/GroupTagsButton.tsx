import React, { FC, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { button, filterButton } from '../../styles/mixins';
import usePrefs from '../../hooks/use-prefs';

interface ButtonMainProps {
  toggled: boolean;
}

const ButtonMain = styled.button<ButtonMainProps>`
  ${ button }
  ${ filterButton }

  min-width: 170px;
  text-shadow: 1px 1px 3px ${ props => props.theme.colors.shadowDefault };
  ${ props => props.toggled && `background-color: ${ props.theme.colors.buttonHighlighted };` }
`;

interface GroupTagsButtonProps {
  toggleSoundGrouping: () => void;
}

const GroupTagsButton: FC<GroupTagsButtonProps> = ({ toggleSoundGrouping }) => {
  const [mode, setMode] = useState(usePrefs().groups);
  const [text, setText] = useState('Off');
  useEffect(() => {
    let newText = 'Off';
    if (mode === 'start') newText = 'Start';
    else if (mode === 'end') newText = 'End';
    setText(newText);
  }, [mode]);

  const handleClick = useCallback(() => {
    let newMode = 'none';
    if (mode === 'none') newMode = 'start';
    else if (mode === 'start') newMode = 'end';
    setMode(newMode);
  }, [mode]);

  return (
    <ButtonMain toggled={ mode !== 'none' } onClick={ () => { handleClick(); toggleSoundGrouping(); } }>
      { `Group Tags: ${ text }` }
    </ButtonMain>
  );
};

export default GroupTagsButton;
