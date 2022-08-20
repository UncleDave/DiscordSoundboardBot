import React from 'react';
import ButtonContainer from './Button-Container';

class Main extends React.Component {
  render() {
    return (
      <main>
      <div className="main-container">
        <div id="error-container" className="message-container error-container">
          <h1>Server error.</h1>
          <h4>*/sound horrible mistake*</h4>
        </div>
        <div className="features-container">
          <div id="skip-container" className="skip-container">
            <button id="skip-one" className="skip-button btn">
              Skip one
            </button>
            <button id="skip-all" className="skip-button btn">
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
                <button id="sound-preview-button" className="filter-btn btn">
                  Preview Sounds
                </button>
                <button
                  id="add-sound-button"
                  className="add-sound-button filter-btn btn"
                >
                  Add Sound
                </button>
              </div>
            </div>
            <div id="add-sound-dialog" className="add-sound-dialog btn-hide">
              <h4 id="add-sound-text">Upload a new sound file</h4>
              <input
                id="file-upload"
                type="file"
                accept=".wav, .mp3, .webm, .ogg"
                className="file-upload text-input add-sound-input"
              />
              <input
                id="sound-name-input"
                type="text"
                name=""
                placeholder="Enter a name for the sound"
                enterKeyHint="done"
                className="add-sound-input text-input"
              />
              <button
                id="addsound-confirm-btn"
                className="btn filter-btn btn-hide add-sound-button"
              >
                Go!
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="sort-toolbar" className="sort-toolbar">
        <div
          id="preview-instructions"
          className="preview-instructions button-instructions-hide"
        >
          <p>Sounds will only play through your browser</p>
          <input
            type="range"
            id="preview-volume"
            min={0}
            max={2}
            defaultValue=".5"
            step="0.01"
          />
        </div>
        <div className="sort-buttons">
          <div id="size-toggle-btn" className="size-toggle-btn icon-btn">
            <span
              className="material-icons resize-icon"
              style={{ fontSize: '1.5rem' }}
            >
              crop_square
            </span>
            <span
              className="material-icons resize-icon"
              style={{ fontSize: '2.5rem' }}
            >
              crop_square
            </span>
          </div>
        </div>
      </div>
      <ButtonContainer />
      <div id="empty-search-container" className="message-container">
        <h1>No results ¯\_(ツ)_/¯</h1>
      </div>
    </main>
    );
  }
}

export default Main;
