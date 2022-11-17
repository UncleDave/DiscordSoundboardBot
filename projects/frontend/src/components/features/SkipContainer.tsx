import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { button } from '../../styles/mixins';
import debounce from '../../utils';

const SkipContainerMain = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 15px;
  width: 100%;

  > button {
    ${ button }
    
    font-size: 1.8rem;
    color: white;
    background-color: ${ theme.colors.innerA };
    border: 5px solid ${ theme.colors.borderDefault };
    border-width: 5px;
    border-radius: 3px;
    min-height: 70px;
    min-width: 45vw;
    margin: 6px 6px;
  }

  @media only screen and (max-width: 780px) {
    min-height: 15vw;

    > button {
      border-width: 4px;
      min-height: 50px;
    }
  }
`;

const SkipContainer: FC = () => {
  const skipSound = useCallback(debounce((all = false) => {
    fetch(`/api/skip${ all ? '?skipAll=true' : '' }`, { method: 'POST', headers: { 'Content-Type': 'text/plain' } });
  }, 500, true), []);

  return (
    <SkipContainerMain>
      <button type="button" onClick={ () => skipSound() }>
        Skip one
      </button>
      <button type="button" onClick={ () => skipSound(true) }>
        Skip all
      </button>
    </SkipContainerMain>
  );
};

export default SkipContainer;