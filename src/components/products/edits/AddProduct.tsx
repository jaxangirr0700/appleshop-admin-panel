import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import axios from "axios";
import { useState } from "react";
import useAuthStore from "../../../store/my-auth-store";
import { useFetchData } from "../../../utils/axiosData/getData";
import { CategoryDataType } from "../../../types/categories";



function AddProduct({
  onClose,
  open,
  showDrawer,
}: {
  onClose: () => void;
  open: boolean;
  showDrawer: () => void;
}) {
  const MyAuthState = useAuthStore();
  const { data: categoryData } = useFetchData<CategoryDataType>(`/categories`);

  const categories = categoryData?.items || [];
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button
        className="mb-2"
        type="primary"
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        Mahsulot qo{"'"}shish
      </Button>
      <Drawer
        title="Yangi Mahsulot qo'shish"
        width={500}
        onClose={onClose}
        open={open}
        destroyOnClose
      >
        <Form
          initialValues={{}}
          onFinish={(values) => {
            setLoading(true);
            axios
              .post(`https://nt.softly.uz/api/products`, values, {
                headers: { Authorization: `Bearer ${MyAuthState.token}` },
              })
              .then(() => {
                message.success("Mahsulot muvaffaqiyatli qo'shildi!");
                onClose();
                window.location.reload();
              })
              .catch((e) => {
                message.error(e.response.data.message || "Xato yuz berdi");
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          <Form.Item
            label="Mahsulot Nomi"
            name="name"
            rules={[{ required: true, message: "Mahsulot nomi kiritilmadi!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Narxi"
            name="price"
            rules={[{ required: true, message: "Narx kiritilmadi!" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Omborda"
            name="stock"
            rules={[{ required: true, message: "Omborda soni kiritilmadi!" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Kategoriya ID"
            name="categoryId"
            rules={[{ required: true, message: "Kategoriya ID kiritilmadi!" }]}
          >
            <Select>
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Rasm URL"
            name="imageUrl"
            rules={[{ required: true, message: "Rasm URL kiritilmadi!" }]}
          >
            {/* <ImgUpload /> */}
            <Input placeholder="Rasm Kiriting" />
          </Form.Item>
          <Form.Item label="Tavsif" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Qo{"'"}shish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default AddProduct;
