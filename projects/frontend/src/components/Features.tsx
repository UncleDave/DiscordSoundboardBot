import React, { FC, useCallback, useState } from 'react';
import debounce from '../utils';
import AddSoundDialog from './AddSoundDialog';
import SearchContainer from './SearchContainer';

interface FeaturesProps {
  favoritesToggled: boolean
  previewToggled: boolean;
  toggleFavs: () => void;
  toggleShowPreview: () => void;
  setSearchTerm: (search: string) => void;
}

const Features: FC<FeaturesProps> = ({ favoritesToggled, previewToggled, toggleFavs, toggleShowPreview, setSearchTerm }) => {
  const [showAddSound, setShowAddSound] = useState(false);
  const [disableAddSoundButton, setDisableAddSoundButton] = useState(false);

  const skipSound = useCallback(debounce((all = false) => {
    fetch(`/api/skip${ all ? '?skipAll=true' : '' }`, { method: 'POST', headers: { 'Content-Type': 'text/plain' } });
  }, 500, true), []);

  return (
    <div>
      <div className="features-container">
        <div className="skip-container">
          <button type="button" className="skip-button btn" onClick={ skipSound }>
            Skip one
          </button>
          <button type="button" className="skip-button btn" onClick={ () => skipSound(true) }>
            Skip all
          </button>
        </div>
        <div className="filters-container">
          <SearchContainer setSearchTerm={ setSearchTerm } />
          <div className="option-btns-container">
            <div className="filter-btns-container">
              <button type="button" className={ `filter-btn btn${ favoritesToggled ? ' filter-btn-on' : '' }` } onClick={ toggleFavs }>
                Favorites
              </button>
            </div>
            <div className="right-toolbar-container">
              <button
                type="button"
                className={ `filter-btn btn${ previewToggled ? ' filter-btn-on' : '' }` }
                onClick={ toggleShowPreview }
              >
                Preview Sounds
              </button>
              <button
                type="button"
                className={ `add-sound-button filter-btn${ disableAddSoundButton ? ' btn-green' : ' btn' }` }
                disabled={ disableAddSoundButton }
                onClick={ () => setShowAddSound(!showAddSound) }
              >
                Add Sound
              </button>
            </div>
          </div>
          { showAddSound ? <AddSoundDialog setShowAddsound={ setShowAddSound } setDisableAddSoundButton={ setDisableAddSoundButton } /> : null }
        </div>
      </div>
    </div>
  );
};

export default Features;
