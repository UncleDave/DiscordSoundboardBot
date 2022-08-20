import React from "react";


function SortContainer({ showPreview }) {
  const renderPreview = () => {
    return(
      <div
          id="preview-instructions"
          className="preview-instructions"
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
    )
  }

  return(
    <div id="sort-toolbar" className="sort-toolbar">
        { showPreview ? renderPreview() : null }
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
  )
}

export default SortContainer;
