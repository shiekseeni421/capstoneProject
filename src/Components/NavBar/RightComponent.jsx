import React from "react";
import {
  ShoppingCartOutlined,
  LogoutOutlined,
  HomeOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { Popconfirm } from "antd";

function RightComponent() {
  const navigate = useNavigate();

  const confirm = (e) => {
    navigate("/signin");
  };

  return (
    <div className="rghtBar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "ActiveBar" : "NonActiveBar")}
      >
        <HomeOutlined /> Home
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) => (isActive ? "ActiveBar" : "NonActiveBar")}
      >
        <ShoppingCartOutlined /> Cart
      </NavLink>

      <NavLink
        to="/Histroy"
        className={({ isActive }) => (isActive ? "ActiveBar" : "NonActiveBar")}
      >
        <HistoryOutlined /> History
      </NavLink>

      <Popconfirm
        title="LogOut"
        description="Are you sure want to LogOut?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <span className="NonActiveBar">
          <LogoutOutlined />
        </span>
      </Popconfirm>
    </div>
  );
}

export default RightComponent;
