import React, { FC, useCallback, useState } from 'react';

interface SearchContainerProps {
  searchCallback: (search: string) => void;
}

const SearchContainer: FC<SearchContainerProps> = ({ searchCallback }) => {
  const [showCancel, setShowCancel] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSearchInput = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const searchTerm = event.currentTarget.value;
    setInputValue(searchTerm);
    searchCallback(searchTerm.toUpperCase());
    setShowCancel(Boolean(searchTerm));
  }, []);

  const handleCancelClick = useCallback(() => {
    searchCallback('');
    setShowCancel(false);
    setInputValue('');
  }, []);

  return (
    <div id="search-container" className="search-container">
      <input
        type="text"
        placeholder=" search for a sound..."
        id="search"
        className="text-input"
        value={ inputValue }
        onChange={ event => handleSearchInput(event) }
      />
      { showCancel ? (
        <span
          id="search-cancel"
          className="material-icons search-cancel icon-btn"
          role="presentation"
          onClick={ handleCancelClick }
        >
          cancel
        </span>
      ) : null }
    </div>
  );
};

export default SearchContainer;
