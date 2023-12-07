import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import FormType from "../../customTypes/FormData";
import auth from "../../services/Authentication";

const LoginRoute = () => {
  const navigate = useNavigate();
  const onFinish = (data: FormType) => {
    // check roles of users
    auth(data).then((returnRoles: string) => {
      if (returnRoles == "Invalid account") {
        1 == 1;
      } else if (returnRoles == "Administrator") {
        navigate("/administrator");
      } else if (returnRoles == "Student") {
        1 == 1;
      } else if (returnRoles == "Lecturer") {
        1 == 1;
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
          <Input placeholder="password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginRoute;
