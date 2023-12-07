import React from "react";
import AdminService from "@services/AdminService";
import { Table, Spin } from "antd";
import AdminData from "@customTypes/AdminData";

const Admin = () => {
  const [adminList, setAdminList] = React.useState<AdminData[] | undefined>(
    undefined
  );
  React.useEffect(() => {
    AdminService.getAdminList().then(({ data }: { data: AdminData[] }) => {
      setAdminList(data);
    });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Username",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Gender",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Department",
      dataIndex: "department_name",
      key: "department_name",
    },
  ];
  return (
    <div>
      {
        adminList ? <Table dataSource={adminList} columns={columns} rowKey={(d)=>{return d.user_id}} /> : <Spin  />
      }
    </div>
  );
};

export default Admin;
