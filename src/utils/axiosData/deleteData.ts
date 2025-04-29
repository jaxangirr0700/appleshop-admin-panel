import { message } from "antd";
import { AxiosError } from "axios";
import { useState } from "react";
import { api } from "../api";

export const useDeleteData = () => {
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const deleteData = async (apiEndPoint: string, fetchData: () => void) => {
    setLoadingDelete(true);
    try {
      await api.delete(`https://nt.softly.uz/api/${apiEndPoint}`);
      message.success("Muvaffaqiyatli o'chirildi!");
      fetchData();
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      console.error(err);
      message.error(err.response?.data?.message || "Xato yuz berdi");
    } finally {
      setLoadingDelete(false);
    }
  };

  return { deleteData, loadingDelete };
};
