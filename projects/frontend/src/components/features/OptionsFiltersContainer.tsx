import React, { FC } from 'react';
import styled from 'styled-components';
import TagProps from '../../models/tag-props';
import TagFilterButton from './TagFilterButton';
import * as mixins from '../../styles/mixins';

const OptionsFiltersContainerMain = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
  }

  p {
    font-size: 0.7rem;
    font-weight: bold;
    margin-right: 12px;
  }
`;

interface ButtonProps {
  toggled: boolean;
}

const ButtonToggle = styled.button<ButtonProps>`
  ${ mixins.button }
  ${ mixins.filterButton }

  ${ props => props.toggled && `background-color: ${ props.theme.colors.buttonHighlighted };` }
`;

interface OptionsFiltersContainerProps {
  favoritesToggled: boolean;
  toggleFavs: () => void;
  customTagProps: TagProps[] | undefined;
  toggleTagFilter: (tagId: string) => void;
}

const OptionsFiltersContainer: FC<OptionsFiltersContainerProps> = ({
  favoritesToggled,
  toggleFavs,
  customTagProps,
  toggleTagFilter,
}) => (
  <OptionsFiltersContainerMain>
    <div>
      <ButtonToggle
        toggled={ favoritesToggled }
        onClick={ toggleFavs }
      >
        Favorites
      </ButtonToggle>
      { customTagProps?.map(x => <TagFilterButton key={ x.id } id={ x.id } name={ x.name } color={ x.color } toggleTagFilter={ toggleTagFilter } />)}
    </div>
  </OptionsFiltersContainerMain>
);

export default OptionsFiltersContainer;
