import React from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { User } from "@/types/user";

const { Sider } = Layout;

const itemsAdmin: MenuProps["items"] = [
  "Ticket",
  "Student",
  "Lecturer",
  "Administrator",
  "Course",
  "Department",
].map((key) => ({
  key,
  label: `${key}`,
}));

const itemsStudent: MenuProps["items"] = [
  "Ticket",
  "Course",
  "Department"
].map((key) => ({
  key,
  label: `${key}`,
}));

const itemsLecturer: MenuProps["items"] = [
  "Ticket",
  "Student",
  "Course",
  "Department",
].map((key) => ({
  key,
  label: `${key}`,
}));
const NavBar = ({
  setItems,
  currentUser,
}: {
  setItems: React.Dispatch<React.SetStateAction<string>>;
  currentUser: User | undefined;
}) => {
  const userRoles: string | undefined = currentUser ? currentUser.account_type : "";
  
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
        defaultSelectedKeys={[userRoles == "Administrator" ? "Administrator" : "Course"]}
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={userRoles == 'Administrator' ? itemsAdmin : userRoles == 'Lecturer' ? itemsLecturer : itemsStudent}
        onSelect={(item) => {
          setItems(item.key);
        }}
      />
    </Sider>
  );
};

export default NavBar;
