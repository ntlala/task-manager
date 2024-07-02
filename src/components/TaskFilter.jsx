import React from "react";
import { Radio } from "antd";

function TaskFilter({ filter, setFilter }) {
  return (
    <Radio.Group
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      style={{ marginBottom: 16 }}
    >
      <Radio.Button value="all">All</Radio.Button>
      <Radio.Button value="active">Active</Radio.Button>
      <Radio.Button value="completed">Completed</Radio.Button>
    </Radio.Group>
  );
}

export default TaskFilter;
