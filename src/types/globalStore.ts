export type GlobalStoreTypes = {
  students: StudentTypes[];
  groups: GroupType[];
  categories: CategoriesType[];
  products: ProductTypes[];
  language: Language;
  theme: boolean;
};

export type Language = "uzbek" | "english" | "russian";
export type OrdersTypes = {
  categorieId: number;
  productID: number;
  studentID: number;
  id: number;
  name: string;
  coutnt: number;
  total_price: number;
  address: string;
  status: "qabul_qilindi" | "yetkazib_berilmoqda" | "tugallandi";
};
export interface CategoriesType {
  id: number;
  active: boolean;
  name: string;
  productCount: number;
  image?: string;
}
export interface ProductTypes {
  id: number;
  active: boolean;
  name: string;
  price: number;
  categorieId: number;
  image?: string;
}
export interface StudentTypes {
  id: number;
  active: boolean;
  firstName: string;
  lastName: string;
  age: number;
  gender: "male" | "female";
  group_id: number;
}

export type GroupType = {
  id: number;
  name: string;
  isActive: boolean;
  studentCount: number;
};
