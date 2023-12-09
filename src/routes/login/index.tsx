import React from "react";
import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { FormType, User } from "@/types/user";
import auth from "@services/Authentication";

const LoginRoute = ({
  setUser,
}: {
  setUser: React.Dispatch<User | undefined>;
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const onFinish = (data: FormType) => {
    setLoading(true);
    // check roles of users
    auth(data).then((returnRoles: User) => {
      if (returnRoles.account_type == "Invalid account") {
        1 == 1;
      } else if (returnRoles.account_type == "Administrator") {
        setUser(returnRoles);
        navigate("/administrator");
      } else if (returnRoles.account_type == "Student") {
        setUser(returnRoles);
        navigate("/student");
      } else if (returnRoles.account_type == "Lecturer") {
        setUser(returnRoles);
        navigate("/lecturer");
      }
    });
  };
  return (
    <div
      style={{
        padding: "60px",
        backgroundColor: "white",
        borderRadius: "5px",
      }}
    >
      <Form
        name="normal-login"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Typography.Title level={2}>Login</Typography.Title>
        <Form.Item<FormType>
          name="username"
          label={<Typography.Text>Username: </Typography.Text>}
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input placeholder="username" />
        </Form.Item>
        <Form.Item<FormType>
          name="password"
          label={<Typography.Text>Password: </Typography.Text>}
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password type="password" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginRoute;
