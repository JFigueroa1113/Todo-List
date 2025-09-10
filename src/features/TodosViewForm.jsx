function TodosViewForm({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) {
  const preventRefresh = (e) => e.preventDefault();

  return (
    <form onSubmit={preventRefresh}>
      <div style={{ marginBottom: "0.5rem" }}>
        <label>
          Search todos:
          <input
            type="text"
            value={queryString}
            onChange={(e) => setQueryString(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          />
        </label>
        <button
          type="button"
          onClick={() => setQueryString("")}
          style={{ marginLeft: "0.5rem" }}
        >
          Clear
        </button>
      </div>

      <div>
        <label>
          Sort by:
          <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
            <option value="createdTime">Created Time</option>
            <option value="title">Title</option>
          </select>
        </label>

        <label style={{ marginLeft: "1rem" }}>
          Direction:
          <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>
    </form>
  );
}

export default TodosViewForm;
