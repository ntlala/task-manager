import React from "react";
import { Input } from "antd";

const { Search } = Input;

function TaskSearch({ searchTerm, setSearchTerm, visible }) {
  if (!visible) return null; // Hide component if not visible

  return (
    <Search
      placeholder="Search tasks"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ marginBottom: 16 }}
    />
  );
}

export default TaskSearch;
