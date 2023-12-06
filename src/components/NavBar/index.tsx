import React from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";

const { Sider } = Layout;
const items: MenuProps["items"] = [
  "Ticket",
  "Student",
  "Lecturer",
  "Administrator",
  "Course",
  "Department",
  // Below should in course
  // "Question",
  // "Lecture",
  // "Document",
  // "Quiz",
  // "Attempt",
].map((key) => ({
  key,
  label: `${key}`,
}));

const NavBar = ({ setItems }: { setItems: React.Dispatch<React.SetStateAction<string>> }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu
        mode="inline"
        defaultSelectedKeys={["Administrator"]}
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={items}
        onSelect={(item) => {
          setItems(item.key);
        }}
      />
    </Sider>
  );
};

export default NavBar;
