import { ConfigProvider, theme } from "antd";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import BannersPage from "./components/banners/BannersPage";
import CategoriesPage from "./components/categories/CategoriesPage";
import OrdersPage from "./components/orders/OrdersPage";
import ProductPage from "./components/products/ProductPage";
import Statistics from "./components/statistics/Statistics";
import UsersPage from "./components/users/UsersPage";
import useAuthStore from "./store/my-auth-store";
import useGlobalStore from "./store/my-store";

function App() {
  const MyAuthState = useAuthStore();
  const { newTheme } = useGlobalStore();

  return (
    <div
      className={`w-full h-full${
        newTheme ? " bg-cyan-950 text-white" : " bg-white text-black"
      }`}
    >
      <ConfigProvider
        theme={{
          algorithm: newTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <div className="min-h-screen p-2">
          {MyAuthState.token ? (
            <div className="max-w-[1440px] mx-auto">
              <Header />
              <main className="h-[84vh]  my-2 flex gap-4 ">
                <Sidebar />
                <Routes>
                  <Route path="/" element={<Statistics />} />
                  <Route path="/banners" element={<BannersPage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/products" element={<ProductPage />} />
                  <Route path="/users" element={<UsersPage />} />
                </Routes>
              </main>
            </div>
          ) : (
            <LoginPage />
          )}
        </div>
      </ConfigProvider>
    </div>
  );
}

export default App;
