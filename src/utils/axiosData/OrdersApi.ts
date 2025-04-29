import { api } from "../api";
class OrdersApi {
  static getAll() {
    return api.get(`orders`);
  }
  static getOne(id: number) {
    return api.get(`orders/${id}`);
  }
  static create(values: any) {
    return api.post(`orders`, values);
  }
  static update(id: number) {
    return api.patch(`orders/${id}`);
  }
  static delete(id: number, token: string) {
    return api.delete(`orders/${id}`);
  }
}
export default OrdersApi;
