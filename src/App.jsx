import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Button,
  Row,
  Col,
  Switch,
  Modal,
  Input,
  List,
  Popconfirm,
} from "antd";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import TaskSearch from "./components/TaskSearch";
import TaskStats from "./components/TaskStats";
import {
  SearchOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./App.css";

const { Content, Header } = Layout;
const { Title } = Typography;

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories
      ? JSON.parse(savedCategories)
      : ["personal", "work", "shopping"];
  });
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), ...task }]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText, newDetails) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText, details: newDetails } : task
      )
    );
  };

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const deleteCategory = (category) => {
    setCategories(categories.filter((cat) => cat !== category));
    setTasks(tasks.filter((task) => task.category !== category)); // Remove tasks of deleted category
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed);

    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <Layout className={`layout ${theme}`}>
      <Header className="header">
        <Row justify="space-between" align="middle" style={{ width: "100%" }}>
          <Col>
            <Title level={3} style={{ color: "white", margin: 0 }}>
              Task Manager
            </Title>
          </Col>
          <Col>
            <Button
              type="text"
              icon={searchVisible ? <CloseOutlined /> : <SearchOutlined />}
              onClick={handleSearchClick}
              style={{ color: "white" }}
            />
          </Col>
          <Col>
            <Button
              type="text"
              onClick={() => setIsCategoryModalVisible(true)}
              style={{ color: "white" }}
            >
              Manage Categories
            </Button>
          </Col>
          <Col>
            <Switch
              checkedChildren="Dark"
              unCheckedChildren="Light"
              checked={theme === "dark"}
              onChange={toggleTheme}
              style={{ marginLeft: "10px" }}
            />
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: "20px" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={18} xl={18}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <TaskForm
                  addTask={addTask}
                  categories={categories}
                  theme={theme}
                />
              </Col>
              {searchVisible && (
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <TaskSearch
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    visible={searchVisible}
                  />
                </Col>
              )}
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6}>
            <TaskFilter filter={filter} setFilter={setFilter} />
            <TaskStats tasks={tasks} />
          </Col>
          <Col xs={24} sm={24} md={24} lg={18} xl={18}>
            <TaskList
              tasks={filteredTasks}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              editTask={editTask}
              theme={theme} // Pass theme prop to TaskList component
            />
          </Col>
        </Row>
      </Content>

      {/* Modal for managing categories */}
      <Modal
        title="Manage Categories"
        visible={isCategoryModalVisible}
        onCancel={() => setIsCategoryModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsCategoryModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => setIsCategoryModalVisible(false)}
          >
            Done
          </Button>,
        ]}
      >
        <Input
          placeholder="Add new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onPressEnter={addCategory}
          style={{ marginBottom: "10px" }}
        />
        <Button
          type="primary"
          onClick={addCategory}
          style={{ marginBottom: "20px" }}
        >
          Add Category
        </Button>
        <List
          bordered
          dataSource={categories}
          renderItem={(category) => (
            <List.Item>
              {category}
              <Popconfirm
                title="Are you sure you want to delete this category?"
                onConfirm={() => deleteCategory(category)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="text" icon={<DeleteOutlined />} />
              </Popconfirm>
            </List.Item>
          )}
        />
      </Modal>
    </Layout>
  );
}

export default App;
