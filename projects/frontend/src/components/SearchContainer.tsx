import React, { FC, useCallback, useState, useRef } from 'react';

interface SearchContainerProps {
  setSearchTerm: (search: string) => void;
}

const SearchContainer: FC<SearchContainerProps> = ({ setSearchTerm }) => {
  const [showCancel, setShowCancel] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const textInput = useRef<HTMLInputElement>(null);

  const handleSearchInput = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const searchTerm = event.currentTarget.value;
    setInputValue(searchTerm);
    setSearchTerm(searchTerm.toUpperCase());
    setShowCancel(Boolean(searchTerm));
  }, []);

  const handleCancelClick = useCallback(() => {
    setSearchTerm('');
    setShowCancel(false);
    setInputValue('');
    textInput.current?.focus();
  }, []);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder=" search for a sound..."
        className="text-input"
        value={ inputValue }
        ref={ textInput }
        onChange={ event => handleSearchInput(event) }
      />
      { showCancel ? (
        <span
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
