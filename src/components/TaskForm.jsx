import React, { useState } from "react";
import { Input, Button, Form, Select, DatePicker, Modal } from "antd";

const { Option } = Select;
const { TextArea } = Input;

function TaskForm({ addTask, categories }) {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState(categories[0] || "personal");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState(null);
  const [details, setDetails] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    handleSubmit();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    if (!task.trim()) return;
    addTask({
      text: task,
      category,
      priority,
      dueDate: dueDate ? dueDate.toISOString() : null,
      details,
    });
    setTask("");
    setCategory(categories[0] || "personal");
    setPriority("medium");
    setDueDate(null);
    setDetails("");
  };

  return (
    <>
      <Form layout="inline" style={{ marginBottom: "20px" }}>
        <Form.Item>
          <Input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task"
            onPressEnter={showModal}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={showModal}>
            Add Task
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Add New Task"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Task">
            <Input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Task"
            />
          </Form.Item>
          <Form.Item label="Category">
            <Select value={category} onChange={(value) => setCategory(value)}>
              {categories.map((cat) => (
                <Option key={cat} value={cat}>
                  {cat}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Priority">
            <Select value={priority} onChange={(value) => setPriority(value)}>
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Due Date">
            <DatePicker
              value={dueDate}
              onChange={(date) => setDueDate(date)}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Details">
            <TextArea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Details"
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default TaskForm;
