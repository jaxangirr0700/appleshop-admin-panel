export type CategoryType = {
  id?: number;
  name: string;
  description: string;
  createdAt?: string;
};

export type CategoryDataType = {
  items: CategoryType[];
  message: string;
  total: number;
};
