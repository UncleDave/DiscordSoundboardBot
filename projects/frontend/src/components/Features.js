import React, { useState }from 'react';
import { debounce } from '../utils';
import AddsoundDialog from './Addsound-Dialog';
import SortContainer from './Sort-Container';

function Features() {

  const skipRequest = debounce(async (all = false) => {
    await fetch(`/api/skip${ all ? '?skipAll=true' : '' }`, { headers: { 'Content-Type': 'text/plain' } })
      .then(res => {
        if (res.status === 401) window.location.reload();
      })
      .catch(error => console.log(error));
  }, 500, true);

  const [showAddsound, setShowAddsound] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div>
      <div className="features-container">
        <div id="skip-container" className="skip-container">
          <button id="skip-one" className="skip-button btn" onClick={ () => skipRequest() }>
            Skip one
          </button>
          <button id="skip-all" className="skip-button btn" onClick={ () => skipRequest(true) }>
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
              <button id="favorites-btn" className="filter-btn btn">
                Favorites
              </button>
            </div>
            <div id="right-toolbar-container" className="right-toolbar-container">
              <button
                id="sound-preview-button"
                className="filter-btn btn"
                onClick={ () => setShowPreview(!showPreview) }>
                Preview Sounds
              </button>
              <button
                id="add-sound-button"
                className="add-sound-button filter-btn btn"
                onClick={ () => setShowAddsound(!showAddsound) }
              >
                Add Sound
              </button>
            </div>
          </div>
          { showAddsound ? <AddsoundDialog/ > : null }
        </div>
      </div>
        <SortContainer showPreview={showPreview}/>
    </div>
  )
}

export default Features;
