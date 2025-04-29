"use client";
import { Button, Drawer, Form, Input, Radio } from "antd";
import { UserType } from "../../../types/users";
import { PatchtData } from "../../../utils/axiosData/PatchData";

function EditUser({
  user,
  onCloseEdit,
  open,
  fetchData,
}: {
  user: UserType | null;
  onCloseEdit: () => void;
  open: boolean;
  fetchData: () => void;
}) {
  const initialValues = user ? { ...user, password: "" } : { password: "" };

  return (
    <Drawer
      title="Foydalanuvchini o'zgartirish"
      width={500}
      onClose={onCloseEdit}
      open={open}
      destroyOnClose
    >
      <Form
        initialValues={initialValues}
        onFinish={(values: UserType) => {
          if (user) {
            PatchtData(`users/${user.id}`, values, fetchData);
          }

          onCloseEdit();
        }}
      >
        <Form.Item
          label="Ismi"
          name="name"
          rules={[{ required: true, message: "Ism kiritilmadi!!!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Email kiritilmadi!!!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Parol"
          name="password"
          rules={[
            { required: true, message: "Parol kiritilmadi!!!" },
            {
              min: 6,
              message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="Rasm" name="image">
          <Input />
        </Form.Item>
        <Form.Item
          label="Roli"
          name="role"
          rules={[{ required: true, message: "Roli kiritilmadi!!!" }]}
        >
          <Radio.Group>
            <Radio value="customer">Customer</Radio>
            <Radio value="admin">Admin</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Saqlash
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default EditUser;
