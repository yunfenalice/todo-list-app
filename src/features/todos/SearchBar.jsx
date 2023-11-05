/* eslint-disable react/prop-types */

function SearchBar({ onSearch }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search "
        onChange={(e) => onSearch(e.target.value)}
        className="input"
      />
    </div>
  );
}

export default SearchBar;
