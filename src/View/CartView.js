import React from "react";
import "../css/Home.css";
import { Input } from "antd";
import { CartTable } from "../components/book/CartTable";

export const CartView = () => {
  return (
    <div className="allView">
      <h1>My Cart</h1>
      <div style={{ marginRight: "30px" }}>
        <CartTable />
      </div>
    </div>
  );
};
