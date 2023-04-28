import React from "react";
import "../../css/Home.css";
import { Button, Space, Table, Tag, DatePicker } from "antd";
import { orderData as data } from "../../data";
import dayjs from "dayjs";
import { IOrder, IOrderItem } from "../../interface";
import { deleteOrder, deleteOrderItem } from "../../Service/OrderService";

const dateFormat = "YYYY-MM-DD";
const { Column } = Table;

interface IProps {
  order: IOrder;
  data: IOrder[];
  setData: Function;
}

export const OrderTable = ({ order, data, setData }: IProps) => {
  const handleDeleteOrder = () => {
    function callBack() {
      const newData = data.filter((item: IOrder) => item.id !== order.id);
      setData(newData);
      // window.location.reload();
      // console.log("reload");
    }

    deleteOrder(order.id).then(() => callBack());

    // window.location.reload();
  };

  const handleDeleteOrderItem = (orderItemId: number) => {
    function callBack() {
      const newData = data.map((item: IOrder) => {
        if (item.id === order.id) {
          item.orderItems = item.orderItems.filter(
            (item: IOrderItem) => item.id !== orderItemId
          );
        }
        return item;
      });
      setData(newData);

      let isEmpty: boolean = false;
      newData.forEach((item: IOrder) => {
        if (item.id === order.id) {
          if (item.orderItems.length === 0) {
            isEmpty = true;
          }
        }
      });

      if (isEmpty) {
        handleDeleteOrder();
      }
    }

    deleteOrderItem(orderItemId).then(() => callBack());
  };

  return (
    <>
      <div style={{ marginBottom: "-20px" }}>
        <h4>总价:{order.totalPrice}</h4>
      </div>

      <div>
        <Button type="primary" danger onClick={() => handleDeleteOrder()} />
      </div>

      <Table
        dataSource={order.orderItems}
        pagination={false}
        // responsive={['sm', 'md' ,'lg' ,'xl', 'xxl']}
      >
        {/*<ColumnGroup title="Book">*/}
        <Column
          title="Cover"
          render={(value: IOrderItem) => (
            <img
              src={require("../../assets/books/" + value.book.image)}
              style={{ width: 25, height: 30 }}
            />
          )}
        />
        <Column title="Title" render={(value: IOrderItem) => value.book.name} />
        {/*</ColumnGroup>*/}
        <Column title="Amount" render={(value: IOrderItem) => value.amount} />
        <Column
          title="Price"
          render={(value: IOrderItem) => (
            <>
              <Tag color="blue">¥{value.book.price}</Tag>
            </>
          )}
        />
        <Column
          title="Purchase Time"
          // render={(item) => (
          //     <DatePicker defaultValue={dayjs(item.purchaseTime, dateFormat)} disabled />
          // )}
          render={() => (
            <DatePicker
              defaultValue={dayjs(order.purchaseTime, dateFormat)}
              disabled
              style={{ transform: "scale(0.8)", width: "150px" }}
            />
          )}
        />
        <Column
          title="Action"
          responsive={["md"]}
          render={(value: IOrderItem) => (
            <Space size="middle">
              <Button
                type="primary"
                danger
                onClick={() => handleDeleteOrderItem(value.id)}
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};
