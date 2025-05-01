"use client";
import { message } from "antd";
import { api } from "../api";
export function Postdata(
  apiEndPoint: string,
  values: unknown,
  fetchData: () => void,
  onCloseAdd: () => void
) {
  return api
    .post(`${apiEndPoint}`, values)
    .then(() => {
      fetchData();
      message.success("Muvaffaqiyatli saqlandi");
      onCloseAdd();
    })
    .catch((e) => {
      console.log(e.response.data);
    });
}
