import React, { FC } from 'react';
import styled from 'styled-components';
import TagProps from '../../models/tag-props';
import GroupTagsButton from './GroupTagsButton';
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

const AddSoundButton = styled.button<ButtonProps>`
  ${ mixins.filterButton }
  
  border-color: ${ props => props.theme.colors.borderGold };
    /* color gets overwritten by mobile 'button' css, same as green below */
  @media only screen and (max-width: 780px) {
    border-color: ${ props => props.theme.colors.borderGold };
  }

  ${ props => props.toggled ? mixins.buttonGreen : mixins.button }
`;

interface OptionsFiltersContainerProps {
  favoritesToggled: boolean;
  toggleFavs: () => void;
  previewToggled: boolean;
  toggleShowPreview: () => void;
  showCustomTagPicker: boolean;
  toggleShowCustomTagPicker: () => void;
  customTagProps: TagProps[] | undefined;
  toggleSoundGrouping: () => void;
  toggleTagFilter: (tagId: string) => void;
  disableEditTagsButton: boolean;
  disableAddSoundButton: boolean;
  showAddSound: boolean;
  setShowAddSound: (set: boolean) => void;
}

const OptionsFiltersContainer: FC<OptionsFiltersContainerProps> = ({
  favoritesToggled,
  toggleFavs,
  showCustomTagPicker,
  toggleShowCustomTagPicker,
  customTagProps,
  toggleSoundGrouping,
  toggleTagFilter,
  disableEditTagsButton,
  previewToggled,
  toggleShowPreview,
  disableAddSoundButton,
  showAddSound,
  setShowAddSound,
}) => (
  <OptionsFiltersContainerMain>
    <div>
      <ButtonToggle
        toggled={ favoritesToggled }
        onClick={ toggleFavs }
      >
        Favorites
      </ButtonToggle>
      <GroupTagsButton toggleSoundGrouping={ toggleSoundGrouping } />
      { customTagProps?.map(x => <TagFilterButton key={ x.id } id={ x.id } name={ x.name } color={ x.color } toggleTagFilter={ toggleTagFilter } />)}
    </div>
    <div>
      { disableEditTagsButton ? <p>Finish edit/tagging to toggle tag picker</p> : (
        <ButtonToggle
          toggled={ showCustomTagPicker }
          onClick={ toggleShowCustomTagPicker }
        >
          Edit Custom Tags
        </ButtonToggle>
      ) }
      <ButtonToggle
        toggled={ previewToggled }
        onClick={ toggleShowPreview }
      >
        Preview Sounds
      </ButtonToggle>
      <AddSoundButton
        toggled={ disableAddSoundButton }
        disabled={ disableAddSoundButton }
        onClick={ () => setShowAddSound(!showAddSound) }
      >
        Add Sound
      </AddSoundButton>
    </div>
  </OptionsFiltersContainerMain>
);

export default OptionsFiltersContainer;
