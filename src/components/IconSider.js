import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  AimOutlined,
  CloudOutlined,
  DotChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
function getItem(label, key, icon, children, disabled = false) {
  return {
    key,
    icon,
    children,
    label,
    disabled, // 항목 비활성화 여부 설정
  };
}

const items = [
  getItem("Dashboard", "1", <DotChartOutlined />, null, true),
  getItem("Weather", "2", <CloudOutlined />, null, true), // 비활성화된 항목
  getItem("Air Quality Information", "3", <AimOutlined />),
  getItem("Settings", "4", <SettingOutlined />, null, true),
];

function IconSider(props) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Sider
      // collapsible
      collapsed={collapsed}
      // onCollapse={(value) => setCollapsed(value)}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        zIndex: 2,
      }}
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={["3"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
}

export default IconSider;
