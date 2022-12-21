import React, { FC, useState } from 'react';
import styled from 'styled-components';
import AddSoundDialog from './AddSoundDialog';
import SearchContainer from './SearchContainer';
import OptionsFiltersContainer from './OptionsFiltersContainer';
import SkipContainer from './SkipContainer';
import TagProps from '../../models/tag-props';
import { candyCaneBG } from '../../styles/mixins';

const FeaturesContainer = styled.div`
  padding: 0px 0px 14px;
  box-shadow: 0px 5px 5px 2px ${ props => props.theme.colors.shadowDefault };
  position: relative;

  ${ props => props.theme.name === 'christmas' && candyCaneBG };
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
  margin: 10px 3.2vw;
  padding: 6px 6px;
  border-radius: 5px;
  background-color: ${ props => props.theme.colors.innerA };
  box-shadow: 0px 1px 8px 1px ${ props => props.theme.colors.shadowDefault };

  @media only screen and (max-width: 780px) {
    margin: 0.5vh 3vw 0vh;
  }
`;

interface FeaturesProps {
  favoritesToggled: boolean
  previewToggled: boolean
  toggleFavs: () => void;
  toggleShowPreview: () => void;
  showCustomTagPicker: boolean;
  toggleShowCustomTagPicker: () => void;
  customTagProps: TagProps[] | undefined;
  toggleSoundGrouping: () => void;
  toggleTagFilter: (tagId: string) => void;
  disableEditTagsButton: boolean;
  setSearchTerm: (search: string) => void;
}

const Features: FC<FeaturesProps> = ({
  favoritesToggled,
  previewToggled,
  toggleFavs,
  toggleShowPreview,
  showCustomTagPicker,
  toggleShowCustomTagPicker,
  customTagProps,
  toggleSoundGrouping,
  toggleTagFilter,
  disableEditTagsButton,
  setSearchTerm,
}) => {
  const [showAddSound, setShowAddSound] = useState(false);
  const [disableAddSoundButton, setDisableAddSoundButton] = useState(false);

  return (
    <FeaturesContainer>
      <SkipContainer />
      <FiltersContainer>
        <SearchContainer setSearchTerm={ setSearchTerm } />
        <OptionsFiltersContainer
          favoritesToggled={ favoritesToggled }
          toggleFavs={ toggleFavs }
          showCustomTagPicker={ showCustomTagPicker }
          toggleShowCustomTagPicker={ toggleShowCustomTagPicker }
          customTagProps={ customTagProps }
          toggleSoundGrouping={ toggleSoundGrouping }
          toggleTagFilter={ toggleTagFilter }
          disableEditTagsButton={ disableEditTagsButton }
          previewToggled={ previewToggled }
          toggleShowPreview={ toggleShowPreview }
          disableAddSoundButton={ disableAddSoundButton }
          showAddSound={ showAddSound }
          setShowAddSound={ setShowAddSound }
        />
        { showAddSound ? <AddSoundDialog setShowAddsound={ setShowAddSound } setDisableAddSoundButton={ setDisableAddSoundButton } /> : null }
      </FiltersContainer>
    </FeaturesContainer>
  );
};

export default Features;
