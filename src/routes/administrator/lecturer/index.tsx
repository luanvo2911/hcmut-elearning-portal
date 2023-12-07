import React from "react";
import AdminService from "@services/AdminService";
import { Table, Spin } from "antd";
import LecturerData from "@customTypes/LecturerData";

const Lecturer = () => {
  const [lecturerList, setLecturerList] = React.useState<
    LecturerData[] | undefined
  >(undefined);
  React.useEffect(() => {
    AdminService.getLecturerList().then(
      ({ data }: { data: LecturerData[] }) => {
        setLecturerList(data);
      }
    );
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
    {
      title: "Degree",
      dataIndex: "lecturer_degree",
      key: "lecturer_degree",
    },
    {
      title: "Specialty",
      dataIndex: "lecturer_specialty",
      key: "lecturer_specialty",
    },
  ];
  return (
    <div>
    {
      lecturerList ? <Table dataSource={lecturerList} columns={columns} rowKey={(d)=>{return d.user_id}} /> : <Spin  />
    }
    </div>
  );
};

export default Lecturer;
