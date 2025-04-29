export type OrdersItemType = {
  id: number;
  orderId: number;
  price: number;
  productId: number;
  quantity: number;
};

export type OrsderType = {
  createdAt: string;
  customerId: number;
  id: number;
  items: OrdersItemType;
  status: string;
  totalPrice: number;
};

export type OrderDataType = {
  items: OrsderType[];
  message: string;
  total: number;
  page: number;
};
