import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { button } from '../../styles/mixins';
import debounce from '../../utils';

const SkipContainerMain = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  height: 56%;
  flex-grow: 1;
  position: relative;
  z-index: 10;

  > button {
    ${ button }
    
    font-size: 1.2rem;
    color: white;
    background-color: ${ props => props.theme.colors.innerA };
    border: 5px solid ${ props => props.theme.colors.borderDefault };
    box-shadow: 0px 1px 8px 1px ${ props => props.theme.colors.shadowDefault };
    border-width: 5px;
    border-radius: 3px;
    width: 50%;
    margin: 6px 0px;

    &:first-child {
      margin-right: 6px;
    }
  }

  @media only screen and (max-width: 780px) {
    min-height: 80px;
    margin: 8px 8px 0px;

    > button {
      border-width: 4px;
      min-height: 50px;
    }
  }
`;

const SkipContainer: FC = () => {
  const skipSound = useCallback(debounce(async (all?: boolean) => {
    const res = await fetch(`/api/skip/${ all && 'skip all' }`);
    if (res.status === 401)
      window.location.reload();
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
