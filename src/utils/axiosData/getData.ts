"use client";
import { useEffect, useState, useCallback } from "react"; // ✅ useCallback qo‘shildi
import { api } from "../api";
import useAuthStore from "../../store/my-auth-store";

export function useFetchData<T>(apiEndPoint: string) {
  const MyAuthState = useAuthStore();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await api.get(`${apiEndPoint}`, {
        headers: { Authorization: `Bearer ${MyAuthState.token}` },
      });
      setData(res.data);
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        setError(e);
      } else {
        setError(new Error("Noma'lum xatolik yuz berdi"));
      }
    } finally {
      setLoading(false);
    }
  }, [apiEndPoint, MyAuthState.token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, fetchData, loading, error };
}
