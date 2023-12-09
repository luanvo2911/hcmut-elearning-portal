import React from "react";
import { NavBar, ModalForm } from "@/components";
import { User } from "@/types/user";
import { Layout, Breadcrumb, Typography, FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Department from "./department";
import Ticket from "./ticket";
import Course from "./course";

const { Content } = Layout;

const StudentRoute = ({ user }: { user: User | undefined }) => {
  const [items, setItems] = React.useState<string>("Course");
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const breadcrumbTitle = (items: string) => {
    const path = items.split("/"); // Split path into array to make breadcrumb

    return [
      { title: "Student" },
      { title: "Dashboard" },
      ...path.map((p) => {
        return {
          title: (
            <a
              onClick={(e) => {
                e.preventDefault();
                setItems(`${p}`); // bug
              }}
            >
              {p}
            </a>
          ),
        };
      }),
    ];
  };
  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <NavBar setItems={setItems} currentUser={user} />
      <Layout style={{ padding: "0 24px 24px" }}>
        <Typography.Title>Welcome, {user?.user_name}</Typography.Title>

        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={breadcrumbTitle(items)}
        />
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            overflow: "scroll",
          }}
        >
          {items == "Ticket" ? (
            <Ticket studentID={user?.user_id} />
          ) : items == "Department" ? (
            <Department />
          ) : (
            <Course
              setItems={setItems}
              coursePath={items}
              studentID={user?.user_id}
            />
          )}
          <FloatButton
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenModal(true);
            }}
          />
          <ModalForm isOpenModal={openModal} setOpenModal = {setOpenModal} type="student" />
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudentRoute;
