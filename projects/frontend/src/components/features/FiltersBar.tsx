import React, { FC } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import CustomTag from '../../models/custom-tag';
import TagFilterButton from './TagFilterButton';
import * as mixins from '../../styles/mixins';
import { useSortRulesContext } from '../../contexts/sort-rules-context';

const FiltersBarMain = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;

  > p {
    margin: 0;
    margin-left: 10px;
    color: ${ props => props.theme.colors.borderDefault };
    font-weight: bold;
  }
`;

interface ButtonProps {
  toggled: boolean;
}

const ButtonToggle = styled.button<ButtonProps>`
  ${ mixins.button }
  ${ mixins.filterButton }
  ${ mixins.filterButtonMobile }
  ${ mixins.textShadowVisibility }

  ${ props => props.toggled && `background-color: ${ props.theme.colors.buttonHighlighted };` }
`;

const FiltersBar: FC = () => {
  const { sortRules, toggleFavs } = useSortRulesContext();
  const { data: customTags } = useSWR<CustomTag[]>('/api/customtags');

  return (
    <FiltersBarMain>
      <ButtonToggle
        toggled={ sortRules.favorites }
        onClick={ toggleFavs }
      >
        Favorites
      </ButtonToggle>
      { customTags ? customTags.map(x => <TagFilterButton key={ x.id } id={ x.id } name={ x.name } color={ x.color } />) : <p>loading tags...</p>}
    </FiltersBarMain>
  );
};

export default FiltersBar;
