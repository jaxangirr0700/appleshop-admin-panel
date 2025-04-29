import {
  FolderOpenOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  PictureOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu, Switch } from "antd";
import React, { useState } from "react";
import useGlobalStore from "../store/my-store";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const pathname = location.pathname;

  const state = useGlobalStore();

  const toggleTheme = () => {
    const newTheme = !state.newTheme;
    localStorage.setItem("theme", JSON.stringify(newTheme));
    useGlobalStore.setState({ newTheme: newTheme });
  };

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "/categories",
      icon: <FolderOpenOutlined />,
      label: <Link to="/categories">Categories</Link>,
    },
    {
      key: "/banners",
      icon: <PictureOutlined />,
      label: <Link to="/banners">Bannerlar</Link>,
    },
    {
      key: "/users",
      icon: <UserOutlined />,
      label: <Link to="/users">Users</Link>,
    },
    {
      key: "/products",
      icon: <ProductOutlined />,
      label: <Link to="/products">Products</Link>,
    },
    {
      key: "/orders",
      icon: <OrderedListOutlined />,
      label: <Link to="/orders">Buyurtmalar</Link>,
    },
  ];

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col mb-2 ">
        <Button
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          className="mb-2 bg-green-500 rounded-xl"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Switch
          onChange={toggleTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
          checked={state.newTheme}
        />
      </div>
      <Menu
        className="h-full rounded-xl "
        inlineCollapsed={collapsed}
        style={{
          padding: 0,
          maxWidth: 150,
          height: "100%",
        }}
        selectedKeys={[pathname]}
        mode="inline"
        items={menuItems}
      />
    </div>
  );
}

export default React.memo(Sidebar);
