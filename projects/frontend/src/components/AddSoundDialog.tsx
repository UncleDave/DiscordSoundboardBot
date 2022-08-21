import React, { FC } from 'react';

const AddSoundDialog: FC = () => (
  <div id="add-sound-dialog" className="add-sound-dialog">
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
      type="submit"
      id="addsound-confirm-btn"
      className="btn filter-btn btn-hide add-sound-button"
    >
      Go!
    </button>
  </div>
);

export default AddSoundDialog;
