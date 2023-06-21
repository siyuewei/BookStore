import React, { ChangeEvent, useEffect, useState } from "react";
import "../css/Home.css";
import { CartTable } from "../components/book/CartTable";
import { Button } from "antd";
import { MoneyCollectOutlined } from "@ant-design/icons";
import { ICartData } from "../interface";
import { cartData } from "../data";
import { Cookies } from "react-cookie";
import {
  changeBookAmount,
  checkOutCart,
  getCart,
} from "../Service/CartService";
import Search from "antd/es/input/Search";

const handleCheckout = (userId: number) => {
  checkOutCart(userId).then((res) => {
    if (res.status === 0) window.location.href = "checkOut";
    if (res.status === -1) {
      alert(res.msg);
    }
  });
};

export const CartView = () => {
  const [allData, setAllData] = useState<ICartData[]>();
  const [filterData, setFilterData] = useState<ICartData[]>();

  const cookie = new Cookies();
  const user = cookie.get("currentUser");

  useEffect(() => {
    getCart(user.id).then((res: ICartData[]) => {
      const date = res.map((item: ICartData) => {
        item.userId = user.id;
      });
      console.log(res);
      setAllData(res);
      setFilterData(res);
    });
  }, []);

  const handleUpdate = (value: ICartData) => {
    if (value.book && value.userId && value.amount) {
      changeBookAmount(value.book.id, value.userId, value.amount);

      const newData = allData!.map((item: ICartData) => {
        if (item.book.id === value.book.id) {
          item.amount = value.amount;
        }
        return item;
      });
      setAllData(newData);
      setFilterData(newData);
    } else {
      alert("Error: bookId or userId or amount is null");
    }
  };

  const handleSearch = (value: string) => {
    if (value === "") {
      setFilterData(allData);
      return;
    }
    if (allData === null) return;
    setFilterData(
      allData!.filter((item: ICartData) => item.book.name.includes(value))
    );
  };

  return (
    <div className="allView">
      <h1>My Cart</h1>
      <Search
        placeholder="input search text"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          handleSearch(event.target.value);
        }}
        enterButton
      />
      <div style={{ marginRight: "30px" }}>
        <CartTable
          filterData={filterData!}
          setFilterData={(data: ICartData[]) => setFilterData(data)}
          allData={allData!}
          setAllData={(data: ICartData[]) => setAllData(data)}
          handleUpdate={(data: ICartData) => handleUpdate(data)}
        />
      </div>
      <div style={{ textAlign: "right" }}>
        <Button
          type="primary"
          size="large"
          icon={<MoneyCollectOutlined />}
          ghost
          onClick={() => handleCheckout(user.id)}
        >
          去结算
        </Button>
      </div>
    </div>
  );
};
