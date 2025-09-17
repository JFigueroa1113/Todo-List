import { useState, useEffect } from 'react';

export default function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  const handleSortFieldChange = (e) => setSortField(e.target.value);
  const handleSortDirectionChange = (e) => setSortDirection(e.target.value);
  const handleQueryChange = (e) => setLocalQueryString(e.target.value);

  const handleClear = () => {
    setLocalQueryString('');
    setQueryString('');
  };

  return (
    <form className="todos-view-form">
      <label>
        Sort Field:
        <select value={sortField} onChange={handleSortFieldChange}>
          <option value="createdTime">Created Time</option>
          <option value="title">Title</option>
        </select>
      </label>

      <label>
        Sort Direction:
        <select value={sortDirection} onChange={handleSortDirectionChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>

      <label>
        Filter:
        <input
          type="text"
          value={localQueryString}
          onChange={handleQueryChange}
          placeholder="Search todos..."
        />
      </label>

      <button type="button" onClick={handleClear}>
        Clear
      </button>
    </form>
  );
}
