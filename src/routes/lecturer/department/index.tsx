import React from "react";
import LecturerService from "@services/LecturerService";
import { Table, Spin, Typography } from "antd";
import { DepartmentData } from "@/types/db";

const Department = () => {
  const [departmentList, setDepartmentList] = React.useState<
    DepartmentData[] | undefined
  >(undefined);
  React.useEffect(() => {
    LecturerService.getDepartmentList().then(
      ({ data }: { data: DepartmentData[] }) => {
        setDepartmentList(data);
      }
    );
  }, []);

  const columns = [
    {
      title: "Department ID",
      dataIndex: "department_id",
      key: "department_id",
    },
    {
      title: "Department Name",
      dataIndex: "department_name",
      key: "department_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <div>
      <Typography.Title>All departments</Typography.Title>
      {departmentList ? (
        <Table
          dataSource={departmentList}
          columns={columns}
          rowKey={(d) => {
            return d.department_id;
          }}
        />
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default Department;
