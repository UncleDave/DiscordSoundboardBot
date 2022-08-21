import React, { FC, useCallback, useState } from 'react';
import debounce from '../utils';
import AddSoundDialog from './AddSoundDialog';
import SortContainer from './SortContainer';

const Features: FC = () => {
  const [showAddsound, setShowAddsound] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const skipSound = useCallback(debounce((all = false) => {
    fetch(`/api/skip${ all ? '?skipAll=true' : '' }`, { headers: { 'Content-Type': 'text/plain' } });
  }, 500, true), []);

  return (
    <div>
      <div className="features-container">
        <div id="skip-container" className="skip-container">
          <button id="skip-one" type="button" className="skip-button btn" onClick={ skipSound }>
            Skip one
          </button>
          <button id="skip-all" type="button" className="skip-button btn" onClick={ () => skipSound(true) }>
            Skip all
          </button>
        </div>
        <div className="filters-container">
          <div id="search-container" className="search-container">
            <input
              type="text"
              placeholder=" search for a sound..."
              id="search"
              className="text-input"
            />
            <span
              id="search-cancel"
              className="material-icons search-cancel icon-btn"
            >
              cancel
            </span>
          </div>
          <div className="option-btns-container">
            <div className="filter-btns-container">
              <button id="favorites-btn" type="button" className="filter-btn btn">
                Favorites
              </button>
            </div>
            <div id="right-toolbar-container" className="right-toolbar-container">
              <button
                id="sound-preview-button"
                type="button"
                className="filter-btn btn"
                onClick={ () => setShowPreview(!showPreview) }
              >
                Preview Sounds
              </button>
              <button
                id="add-sound-button"
                type="button"
                className="add-sound-button filter-btn btn"
                onClick={ () => setShowAddsound(!showAddsound) }
              >
                Add Sound
              </button>
            </div>
          </div>
          { showAddsound ? <AddSoundDialog /> : null }
        </div>
      </div>
      <SortContainer showPreview={ showPreview } />
    </div>
  );
};

export default Features;
