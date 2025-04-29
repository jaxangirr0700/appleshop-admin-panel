export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
  createdAt: string;
  phone: string | number;
};

export type UserDatatype = {
  items: UserType[];
  message: string;
  page: number;
  total: number;
};