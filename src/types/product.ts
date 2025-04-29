export type ProductType = {
  categoryId: number;
  createdAt: string;
  description: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  stock: number;
};

export type ProductDataType = {
  items: ProductType[];
  message: string;
  total: number;
};
