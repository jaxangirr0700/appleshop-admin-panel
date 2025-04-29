"use client";
import {
  AppleOutlined,
  ExclamationCircleFilled,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/my-auth-store";
import useGlobalStore from "../store/my-store";

function Header() {
  const { newTheme } = useGlobalStore();
  const MyAuthState = useAuthStore();
  const [user, setUser] = useState(MyAuthState.user);

  useEffect(() => {
    setUser(MyAuthState.user);
  }, [MyAuthState.user]);

  const items: MenuProps["items"] = [
    {
      label: user?.role,
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: user?.email,
      key: "2",
      icon: <ExclamationCircleFilled />,
    },
    {
      label: (
        <span
          onClick={() => {
            localStorage.removeItem("auth");
            useAuthStore.setState({ token: "", user: null });
          }}
        >
          Logout
        </span>
      ),
      key: "4",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const menuProps = {
    items,
  };

  return (
    <header
      className={`${
        newTheme
          ? "bg-zinc-900 text-white border-r-2 border-b-2 border-b-slate-600 border-r-slate-600"
          : "bg-slate-100 text-slate-900 border-2 border-slate-300 "
      } p-4  sm:p-6 flex items-center justify-between   rounded-xl shadow-lg`}
    >
      <Link to={"/"} className="text-2xl sm:text-4xl font-bold italic ">
        <AppleOutlined />
      </Link>

      <div className="flex items-center gap-2">
        <Dropdown.Button menu={menuProps} className="w-full sm:w-auto">
          <UserOutlined />
          {user?.name || "User"}
        </Dropdown.Button>
      </div>
    </header>
  );
}
export default React.memo(Header);
