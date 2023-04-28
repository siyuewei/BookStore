import React, { useEffect, useState } from "react";
import "../css/Home.css";
import { Input } from "antd";
import { OrderTable } from "../components/book/OrderTable";
import { Cookies } from "react-cookie";
import { getOrder } from "../Service/OrderService";
import { IOrder } from "../interface";

const { Search } = Input;
const onSearch = (value: String) => console.log(value);

export const OrderView = () => {
  const cookie = new Cookies();
  const user = cookie.get("currentUser");
  const [data, setData] = useState<IOrder[]>([]);
  const [filterData, setFilterData] = useState<IOrder[]>([]);

  useEffect(() => {
    getOrder(user.id).then((res: IOrder[]) => {
      setData(res);
      setFilterData(res);
    });
  }, []);

  return (
    <div className="allView">
      <h1>My Order</h1>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />

      <div style={{ marginRight: "30px" }}>
        {data.map((item: IOrder) => (
          <OrderTable
            order={item}
            data={data}
            setData={(newData: IOrder[]) => setData(newData)}
          />
        ))}
      </div>
    </div>
  );
};
