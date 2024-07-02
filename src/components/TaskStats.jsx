import React from "react";
import { Statistic, Row, Col } from "antd";

function TaskStats({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  return (
    <Row gutter={16} style={{ marginBottom: 16 }}>
      <Col span={8}>
        <Statistic title="Total Tasks" value={totalTasks} />
      </Col>
      <Col span={8}>
        <Statistic title="Active Tasks" value={activeTasks} />
      </Col>
      <Col span={8}>
        <Statistic title="Completed Tasks" value={completedTasks} />
      </Col>
    </Row>
  );
}

export default TaskStats;