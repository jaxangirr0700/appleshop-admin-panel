import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  GetProp,
  Input,
  message,
  Switch,
  Upload,
  UploadProps,
} from "antd";

import useAuthStore from "../../../store/my-auth-store";
import { Postdata } from "../../../utils/axiosData/postdata";
import { useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

function AddBanners({
  onCloseAdd,
  addOpen,
  showAddDrawer,
}: {
  onCloseAdd: () => void;
  addOpen: boolean;
  showAddDrawer: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const MyAuthState = useAuthStore();
  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <Button style={{ border: 0, background: "none" }}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </Button>
  );
  return (
    <>
      <Button type="primary" onClick={showAddDrawer} icon={<PlusOutlined />}>
        Banner qo'shish
      </Button>
      <Drawer
        title="Yangi Banner qo'shish"
        width={500}
        onClose={onCloseAdd}
        open={addOpen}
        destroyOnClose
      >
        <Form
          layout="vertical"
          initialValues={{
            title: "Apple",
          }}
          onFinish={(values) => {
            if (!imageUrl) {
              message.error("Iltimos, rasm yuklang!");
              return;
            }

            const newValues = {
              ...values,
              imageUrl: imageUrl,
            };

            Postdata(`banners`, newValues, MyAuthState.token).then(() => {
              onCloseAdd();
              message.success("Banner muvaffaqiyatli qo'shildi");
              setImageUrl(undefined);
            });
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
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={"https://nt.softly.uz/api/files/upload"}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>

          <Form.Item label="Faol" name="isActive" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Qo'shish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default AddBanners;
