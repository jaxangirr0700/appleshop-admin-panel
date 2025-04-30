import { Button, Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import useAuthStore from "../store/my-auth-store";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await api.post("auth/login", {
        email: values.email,
        password: values.password,
      });

      useAuthStore.setState({
        user: res.data.user,
        token: res.data.accessToken,
      });

      api.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
      localStorage.setItem("auth", JSON.stringify(res.data));

      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      message.error("Parolni yoki emailni tekshiring!");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Modal open={true} footer={null} closable={false}>
        <Form
          layout="vertical"
          initialValues={{ email: "admin@nt.uz", password: "pass123" }}
          onFinish={onFinish}
          className="hover:scale-101 transition-all duration-500 p-4"
        >
          <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default React.memo(LoginPage);
