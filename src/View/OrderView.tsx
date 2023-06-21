import React, { useEffect, useState } from "react";
import "../css/Home.css";
import "../css/DataPicker.css";
import { Col, DatePicker, Input, Row, Select } from "antd";
import { OrderTable } from "../components/book/OrderTable";
import { Cookies } from "react-cookie";
import { getAllOrder, getOrder } from "../Service/OrderService";
import { IOrder, IOrderItem, IRole } from "../interface";
import dayjs, { Dayjs } from "dayjs";

const { Search } = Input;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD HH:mm:ss";

export const OrderView = () => {
  const onSearch = (value: string) => {
    // const newDate = data.map((order: IOrder) => ({
    //   ...order,
    //   orderItems: order.orderItems.filter((item: IOrderItem) =>
    //     item.book.name.toLowerCase().includes(value.toLowerCase())
    //   ),
    // }));
    //
    // newDate.forEach((order: IOrder) => {
    //   if (order.orderItems.length === 0) {
    //     const index = newDate.indexOf(order);
    //     newDate.splice(index, 1);
    //   }
    // });

    const newDate = data.filter((order: IOrder) => {
      let flag = false;
      order.orderItems.map((item: IOrderItem) => {
        if (item.book.name.toLowerCase().includes(value.toLowerCase())) {
          flag = true;
        }
      });
      if (flag) {
        return order;
      }
    });
    // console.log(newDate);
    setFilterData(newDate);
  };

  const cookie = new Cookies();
  const user = cookie.get("currentUser");
  const [data, setData] = useState<IOrder[]>([]);
  const [filterData, setFilterData] = useState<IOrder[]>([]);

  useEffect(() => {
    //TODO:get all orders if admin
    if (user.role === IRole.ADMIN) {
      getAllOrder().then((res: IOrder[]) => {
        setData(res);
        setFilterData(res);
      });
    } else {
      getOrder(user.id).then((res: IOrder[]) => {
        setData(res);
        setFilterData(res);
      });
    }
  }, []);

  const options = [
    {
      value: "title",
      label: "Book Title",
    },
    {
      value: "time",
      label: "Purchase Time",
    },
  ];

  const [option, setOption] = useState<string>("title");

  const handleSelect = (value: string) => {
    setOption(value);
    setFilterData(data);
  };

  function handleTimeChange(dates: any, dateStrings: any) {
    const newData = data.filter((order) => {
      const purchaseTime = dayjs(order.purchaseTime, dateFormat);
      return purchaseTime.isAfter(dates[0]) && purchaseTime.isBefore(dates[1]);
    });
    console.log(newData);
    setFilterData(newData);
  }

  return (
    <div className="allView">
      <h1>My Order</h1>
      <Row>
        <Col span={4}>
          <Select
            value={option}
            options={options}
            onSelect={(value) => handleSelect(value)}
          ></Select>
        </Col>
        {option === "title" && (
          <Col span={20}>
            <Search
              placeholder="input search text"
              onChange={(event) => onSearch(event.target.value)}
              enterButton
            />
          </Col>
        )}
        {option === "time" && (
          <Col span={12} offset={2}>
            <RangePicker
              defaultValue={null}
              format={dateFormat}
              style={{ width: "500px" }}
              onChange={handleTimeChange}
            />
          </Col>
        )}
      </Row>

      <div style={{ marginRight: "30px", marginTop: "5px" }}>
        {filterData.map((item: IOrder) => (
          <OrderTable
            order={item}
            data={filterData}
            setData={(newData: IOrder[]) => setFilterData(newData)}
            role={user.role}
          />
        ))}
      </div>
    </div>
  );
};
