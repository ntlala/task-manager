import React from "react";
import { Layout, Typography } from "antd";

const { Header } = Layout;
const { Title } = Typography;

function AppHeader() {
  return (
    <Header>
      <Title level={3} style={{ color: "white", margin: 0 }}>
        AI Image Generator
      </Title>
    </Header>
  );
}

export default AppHeader;
