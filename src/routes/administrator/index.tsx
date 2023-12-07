import React from "react";
import { NavBar } from "@/components";
import { Layout, Breadcrumb } from "antd";
import Admin from "./admin";
import Lecturer from "./lecturer";
import Student from "./student";
import Ticket from "./ticket";
import Department from "./department";
import Course from "./course";
import { User } from "@/types/user";

const { Content } = Layout;

const AdminRoute = ({user}: {user: User | undefined}) => {
  const [items, setItems] = React.useState<string>("Administrator");
  const breadcrumbTitle = (items: string) => {
    const path = items.split("/"); // Split path into array to make breadcrumb
    
    return [{ title: "Admin" }, { title: "Dashboard" }, ...path.map((p)=>{
      return {title: <a onClick = { (e)=>{ 
        e.preventDefault()
        setItems(`${p}`) // bug
      }}>{p}</a>}
    })];
  };
  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <NavBar setItems={setItems} currentUser={user}  />
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={breadcrumbTitle(items)}
        />
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            overflow: 'scroll'
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
            <Course setItems = {setItems} coursePath={items} />
          }
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminRoute;
