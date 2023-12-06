import React from "react";
import { NavBar } from "../../components";
import { Layout, Breadcrumb } from "antd";
import Admin from "./admin";
import Lecturer from "./lecturer";
import Student from "./student";
import Ticket from "./ticket";
import Department from "./department";
import Course from "./course";

const { Content } = Layout;

const AdminRoute = () => {
  const [items, setItems] = React.useState<string>("Administrator");
  const breadcrumbTitle = (items: string) => {
    console.log("Items: ", items)
    const path = items.split("/");
    
    return [{ title: "Admin" }, { title: "Dashboard" }, ...path.map((p)=>{
      return {title: p}
    })];
    // return [{ title: "Admin" }, { title: "Dashboard" }, { title: items }];
  };
  return (
    <Layout
      style={{
        // padding: '20px',
        height: "100vh",
        width: "100vw",
      }}
    >
      <NavBar setItems={setItems} />
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={breadcrumbTitle(items)}
        ></Breadcrumb>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {items == "Administrator" ? (
            <Admin />
          ) : items == "Student" ? (
            <Student />
          ): items == "Lecturer" ? (
            <Lecturer />
          ) : items == "Ticket" ? (
            <Ticket />
          ) : items == "Department" ?
          (
            <Department />
          ):
            <Course setItems = {setItems} courseID={items.includes("/") ? items.split("/")[1] : null} />
          }
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminRoute;
