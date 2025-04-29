import axios from "axios";

export const api = axios.create({
  baseURL: `https://nt.softly.uz/api/`,
});
api.interceptors.response.use(null, (e) => {
  console.log(e);
  if (e.status === 401) {
    import("../store/my-auth-store")
      .then((res) => {
        console.log(res.default.getState().logout());
      })
      .catch((e) => {
        console.log(e);
      });
  }
});
