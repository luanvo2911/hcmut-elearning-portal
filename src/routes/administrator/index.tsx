import React from "react";
import { NavBar, ModalForm } from "@/components";
import { Layout, Breadcrumb, Typography, FloatButton, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Admin from "./admin";
import Lecturer from "./lecturer";
import Student from "./student";
import Ticket from "./ticket";
import Department from "./department";
import Course from "./course";
import { User } from "@/types/user";

const { Content } = Layout;

const AdminRoute = ({ user }: { user: User | undefined }) => {
  const [api, contextHolder] = notification.useNotification();
  const [items, setItems] = React.useState<string>("Administrator");
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  React.useEffect(()=>{
    api.info({
      message: "Login successfully!!",
      description: `Welcome to administration dashboard!!`,
      duration: 3
    })
  }, [api])
  const breadcrumbTitle = (items: string) => {
    const path = items.split("/"); // Split path into array to make breadcrumb

    return [
      { title: "Admin" },
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
      {contextHolder}
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
          {items == "Administrator" ? (
            <Admin />
          ) : items == "Student" ? (
            <Student />
          ) : items == "Lecturer" ? (
            <Lecturer />
          ) : items == "Ticket" ? (
            <Ticket />
          ) : items == "Department" ? (
            <Department />
          ) : (
            <Course setItems={setItems} coursePath={items} />
          )}
          <FloatButton
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenModal(true);
            }}
          />
          <ModalForm isOpenModal={openModal} setOpenModal = {setOpenModal} type="admin" userID = {undefined}/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminRoute;
