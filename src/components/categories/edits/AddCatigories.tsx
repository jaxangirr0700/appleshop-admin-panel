import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem/index.js";
import useAuthStore from "../../../store/my-auth-store";
import { Postdata } from "../../../utils/axiosData/postdata";

function AddCategories({ onCloseAdd, addOpen, showAddDrawer }: any) {
  const MyAuthState = useAuthStore();

  return (
    <>
      <Button type="primary" onClick={showAddDrawer} icon={<PlusOutlined />}>
        Kategoriya qo'shish
      </Button>
      <Drawer
        title="Yangi Kategoriya qo'shish"
        width={500}
        onClose={onCloseAdd}
        open={addOpen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        destroyOnClose
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            Postdata(`categories`, values, MyAuthState.token);
          }}
        >
          <FormItem
            label="Nomi"
            name="name"
            rules={[{ required: true, message: "Nomi kiritilmadi!!!" }]}
          >
            <Input />
          </FormItem>

          <FormItem label="Tarifi" name="description">
            <Input />
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

export default AddCategories;
