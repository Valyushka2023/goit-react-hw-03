import css from './SearchBox.module.css';

const SearchBox = ({ filterText, setFilterText }) => {
  const handleChange = (event) => {
    setFilterText(event.target.value.toLowerCase());
  };

  return (
    <div className={css.searchBox}>
      <p className={css.textSearch}>Find contacts by name</p>
      <input
        type="text"
        value={filterText}
        onChange={handleChange}
        className={css.input}
      />
    </div>
  );
};

export default SearchBox;
