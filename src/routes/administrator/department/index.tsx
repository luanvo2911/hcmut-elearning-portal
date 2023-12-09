import React from "react";
import AdminService from "@services/AdminService";
import { Table, Spin, Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { DepartmentData } from "@/types/db";

const Department = () => {
  const [departmentList, setDepartmentList] = React.useState<
    DepartmentData[] | undefined
  >(undefined);
  React.useEffect(() => {
    AdminService.getDepartmentList().then(
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
    {
      title: "",
      dataIndex: "",
      key: "",
      render: (record: DepartmentData) => (
        <Popconfirm
          title="Delete the course"
          description="Are you sure to delete this course?"
          onConfirm={() => {
            console.log(record.department_id);
            AdminService.deleteDepartment(record.department_id)
              .then(() => {
                console.log("delete successfully !");
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          // onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
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
