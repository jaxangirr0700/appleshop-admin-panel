export type DashboardType = {
  recentOrders: RentsOrderstype[];
  topProducts: TopProductsType[];
  totalOrders: string;
  totalProducts: string;
  totalRevenue: string;
  totalUsers: string;
};

export type RentsOrderstype = {
  createdAt: string;
  customerId: number;
  id: number;
  status: string;
  totalPrice: number;
};
export type TopProductsType = { id: number; name: string; totalSold: string };
