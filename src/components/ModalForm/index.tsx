import React from "react";
import { Form, Input, Button, Modal, Typography, Select } from "antd";
import AdminService from "@/services/AdminService";
import StudentService from "@/services/StudentService";

const itemsAdmin = [
  {
    title: "Course",
    value: "course",
  },
  {
    title: "Department",
    value: "department",
  },
];

const itemsStudent = [
  {
    title: "Ticket",
    value: "ticket",
  },
];

const CourseForm = () => {
  return (
    <div>
      <Form.Item label="Course ID" name="course_id">
        <Input />
      </Form.Item>
      <Form.Item label="Course Name" name="course_name">
        <Input />
      </Form.Item>
      <Form.Item label="Course Description" name="course_description">
        <Input />
      </Form.Item>
      <Form.Item label="Lecturer ID" name="lecturer_id">
        <Input />
      </Form.Item>
      {/* <Form.Item label='Course ID' name='course_id'>
        <Input />
      </Form.Item> */}
    </div>
  );
};

const DepartmentForm = () => {
  return (
    <div>
      <Form.Item label="Department ID" name="department_id">
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>
      <Form.Item label="Address" name="address">
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input />
      </Form.Item>
      <Form.Item label="Department Name" name="department_name">
        <Input />
      </Form.Item>
    </div>
  );
};

const TicketForm = ({ userID }: { userID: string | undefined }) => {
  return (
    <div>
      <Form.Item label="Ticket ID" name="ticket_id">
        <Input />
      </Form.Item>
      <Form.Item label="Ticket Type" name="ticket_type">
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input />
      </Form.Item>
      <Form.Item label="Your ID" name="user_id">
        <Input disabled placeholder={userID} />
      </Form.Item>
      <Form.Item label="Admin ID" name="admin_id">
        <Input />
      </Form.Item>
    </div>
  );
};

const ModalForm = ({
  isOpenModal,
  setOpenModal,
  type,
  userID,
}: {
  isOpenModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  userID: string | undefined;
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [table, setTable] = React.useState<string | undefined>(undefined);
  const handleCancel = () => {
    setOpenModal(false);
  };
  const handleSubmit = (value: any) => {
    setLoading(true);
    if (table == "department") {
      AdminService.postDepartment(value)
        .then(() => {
          setOpenModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (table == "course") {
      AdminService.postCourse(value)
        .then(() => {
          setOpenModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (table == "ticket") {
      StudentService.postTicket({ ...value, user_id: userID })
        .then(() => {
          console.log("POST SUCCESSFULLY");
          setOpenModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Modal
      title="Add new item"
      open={isOpenModal}
      footer={null}
      onCancel={handleCancel}
    >
      <Form onFinish={handleSubmit}>
        <Form.Item
          // name="table"
          label={<Typography.Text>Choose table</Typography.Text>}
        >
          <Select
            onChange={(value) => {
              setTable(value);
              console.log(value);
            }}
          >
            {type == "admin"
              ? itemsAdmin.map((item) => {
                  return (
                    <Select.Option value={item.value} key={item.title}>
                      {item.title}
                    </Select.Option>
                  );
                })
              : itemsStudent.map((item) => {
                  return (
                    <Select.Option value={item.value} key={item.title}>
                      {item.title}
                    </Select.Option>
                  );
                })}
          </Select>
        </Form.Item>
        {table == "course" ? (
          <CourseForm />
        ) : table == "department" ? (
          <DepartmentForm />
        ) : (
          <TicketForm userID={userID} />
        )}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
