import React from "react";

const Header = (props) => {
  const callSearch = (e) => {
    props.onSearch(e.target.value);
  };

  return (
    <header className="app-header__title">
      <h1>Super Sticky Notes</h1>
      <aside className="app-header__controls">
        <button className="add-new" onClick={props.addNote}>
          + New Note
        </button>
        <div className="search-field">
          <img
            src="magnifying-glass-solid-full.svg"
            alt="search icon"
            className="search-icon"
          />
          <label className="visually-hidden" for="search">
            Search notes
          </label>
          <input
            className="search-field"
            type="text"
            id="search"
            placeholder="ToDo"
            value={props.searchText}
            onChange={callSearch}
          />
        </div>
      </aside>
    </header>
  );
};

export default Header;
