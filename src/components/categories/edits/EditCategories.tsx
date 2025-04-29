import { Button, Drawer, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem/index.js";
import { CategoryType } from "../../../types/categories";
import { PatchtData } from "../../../utils/axiosData/PatchData";

function EditCategories({
  onCloseEdit,
  open,
  category,
  fetchData,
}: {
  onCloseEdit: () => void;
  open: boolean;
  category: CategoryType | null;
  fetchData: () => void;
}) {

  return (
    <>
      <Drawer
        title=" Kategoriyani o'zgartirish "
        width={500}
        onClose={onCloseEdit}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        destroyOnClose
      >
        <Form
          initialValues={category ? category : {}}
          onFinish={(values) => {
            const newValues = {
              name: values.name,
              description: values.description,
            };
            PatchtData(`categories/${category?.id}`, newValues, fetchData);
            onCloseEdit();
          }}
        >
          <FormItem
            label="Kategoriya nomi"
            name="name"
            rules={[
              { required: true, message: "Kategoriya nomi kiritilmadi!!!" },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="Tarifi"
            name="description"
            rules={[{ required: true, message: "Tarifi  kiritilmadi!!!" }]}
          >
            <Input />
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit">
              Submits
            </Button>
          </FormItem>
        </Form>
      </Drawer>
    </>
  );
}

export default EditCategories;
