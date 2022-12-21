import React, { FC, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { button, filterButton } from '../../styles/mixins';

interface ButtonMainProps {
  toggled: number;
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
  const [mode, setMode] = useState(0);
  const [text, setText] = useState('Group Tags: Off');
  useEffect(() => {
    if (!mode) setText('Group Tags: Off');
    else if (mode === 1) setText('Group Tags: Start');
    else setText('Group Tags: End');
  }, [mode]);

  const handleClick = useCallback(() => {
    if (!mode) setMode(1);
    else if (mode === 1) setMode(2);
    else setMode(0);
  }, [mode]);

  return (
    <ButtonMain toggled={ mode } onClick={ () => { handleClick(); toggleSoundGrouping(); } }>
      { text }
    </ButtonMain>
  );
};

export default GroupTagsButton;
