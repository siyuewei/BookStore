import React from "react";
import "../css/Home.css";
import { Input } from "antd";
import { OrderTable } from "../components/book/OrderTable";

const { Search } = Input;
const onSearch = (value: String) => console.log(value);

export const OrderView = () => {
  return (
    <div className="allView">
      <h1>My Order</h1>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />

      <div style={{ marginRight: "30px" }}>
        <OrderTable />
      </div>
    </div>
  );
};
