import React from "react";
import AdminService from "@services/AdminService";
import { Table, Spin } from "antd";
import { StudentData } from "@/types/db";

const Student = () => {
  const [studentList, setStudentList] = React.useState<
    StudentData[] | undefined
  >(undefined);
  React.useEffect(() => {
    AdminService.getStudentList().then(({ data }: { data: StudentData[] }) => {
      setStudentList(data);
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
    {
      title: "Degree",
      dataIndex: "student_degree",
      key: "student_degree",
    },
    {
      title: "Major",
      dataIndex: "student_major",
      key: "student_major",
    },
    {
      title: "Program",
      dataIndex: "student_program",
      key: "student_program",
    },
  ];
  return (
    <div>
      {studentList ? (
        <Table
          dataSource={studentList}
          columns={columns}
          rowKey={(d) => {
            return d.user_id;
          }}
        />
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default Student;
