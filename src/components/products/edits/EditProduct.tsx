import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import { CategoryType } from "../../../types/categories";
import { ProductType } from "../../../types/product";
import { api } from "../../../utils/api";

function EditProduct({
  categories,
  open,
  product,
  setEditProduct,
  fetchData,
}: {
  fetchData: () => void;
  product: ProductType | null;
  open: boolean;
  categories: CategoryType[];
  setEditProduct: (product: ProductType | null) => void;
}) {

  return (
    <Drawer
      title="Mahsulotni o'zgartirish"
      width={500}
      onClose={() => setEditProduct(null)}
      open={product ? open : false}
      destroyOnClose
    >
      <Form
        initialValues={product ? product : {}}
        onFinish={(values: ProductType) => {
          if (product) {
            api
              .patch(`https://nt.softly.uz/api/products/${product.id}`, {
                ...values,
                categoryId: values.categoryId,
              })
              .then(() => {
                setEditProduct(null);
                fetchData();
                message.success("Mahsulot muvaffaqiyatli o'zgartirildi!");
              })
              .catch((error) => {
                console.error("Error updating product:", error);
              });
          }
        }}
      >
        <Form.Item
          label="Mahsulot nomi"
          name="name"
          rules={[{ required: true, message: "Mahsulot nomi kiritilmadi!!!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mahsulot ta'rifi"
          name="description"
          rules={[
            { required: true, message: "Mahsulot ta'rifi kiritilmadi!!!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mahsulot narxi"
          name="price"
          rules={[{ required: true, message: "Mahsulot narxi kiritilmadi!!!" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Omborda mavjudlik"
          name="stock"
          rules={[
            {
              required: true,
              message: "Omborda mahsulot mavjudligini kiriting!!!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Kategoriyasining nomi"
          name="categoryId"
          rules={[{ required: true, message: "Kategoriyani tanlang!" }]}
        >
          <Select
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </Form.Item>

        <Form.Item label="Rasm URL" name="imageUrl">
          <Input />
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

export default EditProduct;
