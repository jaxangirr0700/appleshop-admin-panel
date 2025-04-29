import { message } from "antd";
import { api } from "../api";

export function PatchtData(
  apiEndPoint: unknown,
  values: unknown,
  fetchData: () => void
) {
  return api
    .patch(`${apiEndPoint}`, values)
    .then(() => {
      message.success("Kategoriya muvaffaqiyatli o'zgartirildi!");
      fetchData();
    })
    .catch((error) => {
      if (error.response) {
        console.error("Server xatosi:", error.response.data);
      } else {
        console.error("Xatolik:", error.message);
      }
    });
}
