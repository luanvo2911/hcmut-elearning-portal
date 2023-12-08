import React from "react";
import { NavBar } from "@/components";
import { User } from "@/types/user"
import { Layout, Breadcrumb, Typography } from "antd";
import Department from "./department";
import Ticket from "./ticket";

const { Content } = Layout;

const LecturerRoute = ({user}: {user: User | undefined}) => {
  const [items, setItems] = React.useState<string>("Course");
  const breadcrumbTitle = (items: string) => {
    const path = items.split("/"); // Split path into array to make breadcrumb

    return [
      { title: "Lecturer" },
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
        {
          items == "Ticket" ? (
            <Ticket lecturerID = {user?.user_id} />
          ) : items == "Department" ? (
            <Department />
          ) : <div />
        }
        </Content>
      </Layout>
    </Layout>
  )
}

export default LecturerRoute;