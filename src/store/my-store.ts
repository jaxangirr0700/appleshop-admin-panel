import { create } from "zustand";
import {
  CategoriesType,
  GroupType,
  OrdersTypes,
  ProductTypes,
  StudentTypes,
} from "../types/globalStore";
import { getRandomID } from "../utils/number";

const useGlobalStore = create(() => {
  const studentIdReal = getRandomID();
  const groupIdReal = getRandomID();
  const productIdReal = getRandomID();
  const cartegorieIdReal = getRandomID();
  const orderIdReal = getRandomID();

  const initialStudents: StudentTypes[] = [
    {
      id: studentIdReal,
      active: true,
      firstName: "Jaxangir",
      lastName: "Raxmarullayev",
      age: 0,
      gender: "male",
      group_id: groupIdReal,
    },
  ];
  const initialOrders: OrdersTypes[] = [
    {
      categorieId: cartegorieIdReal,
      productID: productIdReal,
      studentID: studentIdReal,
      id: orderIdReal,
      name: "Order",
      coutnt: 2,
      total_price: 1212,
      address: "Tashkent",
      status: "qabul_qilindi",
    },
  ];
  const initialCategories: CategoriesType[] = [
    {
      id: cartegorieIdReal,
      active: true,
      name: "Categories",
      productCount: 0,
    },
  ];
  const initialProduct: ProductTypes[] = [
    {
      id: productIdReal,
      active: true,
      name: "Product",
      price: 0,
      categorieId: getRandomID(),
    },
  ];
  const initialGroups = [
    {
      id: groupIdReal,
      name: "guruh 1",
      isActive: false,
      studentCount: 0,
    },
  ];

  const storedStudents: StudentTypes[] =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("students") || "[]")
      : [];
  const storedGroups: GroupType[] =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("groups") || "[]")
      : [];
  const storedCategories: CategoriesType[] =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("categories") || "[]")
      : [];
  const storedProducts: ProductTypes[] =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("products") || "[]")
      : [];
  const storedOrders: OrdersTypes[] =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("orders") || "[]")
      : [];
  const storedTheme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : null;

  return {
    students: storedStudents.length > 0 ? storedStudents : initialStudents,
    groups: storedGroups.length > 0 ? storedGroups : initialGroups,
    categories:
      storedCategories.length > 0 ? storedCategories : initialCategories,
    products: storedProducts.length > 0 ? storedProducts : initialProduct,
    orders: storedOrders.length > 0 ? storedOrders : initialOrders,
    language: "uzbek",
    newTheme: storedTheme ? JSON.parse(storedTheme) : false,
  };
});

export default useGlobalStore;
