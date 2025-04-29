import { Button, Drawer, Form, Input, Select } from "antd";
import { useState } from "react";
import { BannerType } from "../../../types/banners-type";
import { PatchtData } from "../../../utils/axiosData/PatchData";

function EditBanners({
  onCloseEdit,
  open,
  banner,
  fetchData,
}: {
  onCloseEdit: () => void;
  open: boolean;
  banner: BannerType | null;
  fetchData: () => void;
}) {
  const [loading, setloading] = useState<boolean>(false);

  return (
    <Drawer
      title="Kategoriyani o'zgartirish"
      width={500}
      onClose={onCloseEdit}
      open={open}
      destroyOnClose
    >
      <Form
        initialValues={
          banner ? banner : { title: "", imageUrl: "", isActive: false }
        }
        onFinish={(values) => {
          setloading(true);
          const newValues = {
            title: values.title,
            imageUrl: values.imageUrl,
            isActive: values.isActive,
          };
          PatchtData(`banners/${banner?.id}`, newValues, fetchData);
          fetchData();
          onCloseEdit();
          setloading(false);
        }}
      >
        <Form.Item
          label="Nomi"
          name="title"
          rules={[{ required: true, message: "Nomi kiritilmadi!!!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="imageUrl"
          rules={[{ required: true, message: "Image URL kiritilmadi!!!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Faol?"
          name="isActive"
          rules={[{ required: true, message: "Holat kiritilmadi!!!" }]}
        >
          <Select>
            <Select.Option value={true}>Faol</Select.Option>
            <Select.Option value={false}>Nofaol</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Jo'natish
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default EditBanners;
