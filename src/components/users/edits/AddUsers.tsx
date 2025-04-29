import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProviderProps,
  Drawer,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
} from "antd";
import FormItem from "antd/es/form/FormItem/index.js";
import axios from "axios";
import { useState } from "react";
import useAuthStore from "../../../store/my-auth-store";
type SizeType = ConfigProviderProps["componentSize"];

function AddUsers({
  onClose,
  open,
  showDrawer,
}: {
  onClose: () => void;
  open: boolean;
  showDrawer: () => void;
}) {
  const MyAuthState = useAuthStore();
  const [size, setSize] = useState<SizeType>("middle");
  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };
  return (
    <>
      <Button
        className="mb-1"
        type="primary"
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        Foydalanuvchi qo{"'"}shish
      </Button>
      <Drawer
        title="Yangi Foydalanuvchi qo'shish"
        width={500}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        destroyOnClose
      >
        <Form
          initialValues={{
            name: "Jaxangir",
            email: "jaxangirr0700@gmail.com",
            password: "070000",
            image: "Img",
            role: "customer",
          }}
          onFinish={(values) => {
            axios
              .post(`https://nt.softly.uz/api/users`, values, {
                headers: { Authorization: `Bearer ${MyAuthState.token}` },
              })
              .then((res) => {
                console.log(res);
                onClose();
                window.location.reload();
              })
              .catch((e) => {
                console.log(e);
              });
          }}
        >
          <FormItem
            label="Ismi"
            name="name"
            rules={[{ required: true, message: "Ism kiritilmadi!!!" }]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email kiritilmadi!!!" }]}
          >
            <Input />
          </FormItem>{" "}
          <FormItem
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
          </FormItem>
          <FormItem label="Rasm" name="image">
            <Input />
          </FormItem>{" "}
          <FormItem label="Telefon" name="phone">
            <Input />
          </FormItem>{" "}
          <FormItem
            label="Roli"
            name="role"
            rules={[{ required: true, message: "Roli kiritilmadi!!!" }]}
          >
            <Radio.Group value={size} onChange={handleSizeChange}>
              <Radio.Button value="customer">Customer</Radio.Button>
              <Radio.Button value="admin">Admin</Radio.Button>
            </Radio.Group>
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
      </Drawer>
    </>
  );
}

export default AddUsers;
