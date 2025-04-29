import { api } from "../api";
class ProductApi {
  static getAll() {
    return api.get(`product`);
  }
  static getOne(id: number) {
    return api.get(`product/${id}`);
  }
  static create(values: any) {
    return api.post(`product`, values);
  }
  static update(id: number) {
    return api.patch(`product/${id}`);
  }
  static delete(id: number, token: string) {
    return api.delete(`product/${id}`);
  }
}
export default ProductApi;
