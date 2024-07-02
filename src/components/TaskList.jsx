import React, { useState } from "react";
import { List, Button, Modal, Checkbox, Input, Tag, Typography } from "antd";
import {
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { TextArea } = Input;

function TaskList({ tasks, toggleTask, deleteTask, editTask, theme }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDetails, setEditDetails] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
    setEditDetails(task.details || "");
    setIsModalVisible(true);
  };

  const saveEdit = () => {
    editTask(editingId, editText, editDetails);
    setIsModalVisible(false);
    setEditingId(null);
  };

  const showDetails = (task) => {
    setCurrentTask(task);
    setIsModalVisible(true);
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <ExclamationCircleOutlined style={{ color: "red" }} />;
      case "low":
        return <MinusCircleOutlined style={{ color: "green" }} />;
      default:
        return <CheckCircleOutlined style={{ color: "orange" }} />;
    }
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item
            actions={[
              <Button
                icon={<InfoCircleOutlined />}
                onClick={() => showDetails(task)}
              >
                Details
              </Button>,
              <Button onClick={() => startEditing(task)}>Edit</Button>,
              <Button onClick={() => deleteTask(task.id)}>Delete</Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Checkbox
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
              }
              title={
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
              }
              description={
                <>
                  <Tag color="blue">{task.category}</Tag>
                  {getPriorityIcon(task.priority)}
                  <Text type="secondary" style={{ marginLeft: 8 }}>
                    Due:{" "}
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "Not set"}
                  </Text>
                </>
              }
            />
          </List.Item>
        )}
      />
      <Modal
        title={editingId ? "Edit Task" : "Task Details"}
        visible={isModalVisible}
        onOk={editingId ? saveEdit : () => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        {editingId ? (
          <>
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              style={{ marginBottom: 16 }}
            />
            <TextArea
              rows={4}
              value={editDetails}
              onChange={(e) => setEditDetails(e.target.value)}
              placeholder="Enter additional details (optional)"
            />
          </>
        ) : (
          currentTask && (
            <>
              <p>
                <strong>Task:</strong> {currentTask.text}
              </p>
              <p>
                <strong>Category:</strong> {currentTask.category}
              </p>
              <p>
                <strong>Priority:</strong> {currentTask.priority}
              </p>
              <p>
                <strong>Due Date:</strong>{" "}
                {currentTask.dueDate
                  ? new Date(currentTask.dueDate).toLocaleDateString()
                  : "Not set"}
              </p>
              <p>
                <strong>Details:</strong>{" "}
                {currentTask.details || "No additional details"}
              </p>
            </>
          )
        )}
      </Modal>
    </>
  );
}

export default TaskList;
