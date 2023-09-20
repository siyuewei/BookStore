import React from "react";
import "../../css/Home.css";
import { Button, Col, DatePicker, Row, Table, Tag } from "antd";
import dayjs from "dayjs";
import { IOrder, IOrderItem, IRole } from "../../interface";
import { deleteOrder, deleteOrderItem } from "../../Service/OrderService";

const dateFormat = "YYYY-MM-DD";
const { Column } = Table;

interface IProps {
  order: IOrder;
  data: IOrder[];
  setData: Function;
  role: IRole;
}

export const OrderTable = ({ order, data, setData, role }: IProps) => {
  const user = JSON.parse(localStorage.getItem("currentUser")!);

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
      <div style={{ marginBottom: "-25px", marginLeft: "30px" }}>
        <Row>
          <Col span={4}>
            <h4 style={{ height: "20px" }}>总价: {order.totalPrice}</h4>
          </Col>
          <Col span={4} offset={4}>
            {role === IRole.ADMIN && (
              <h4 style={{ height: "20px" }}>buyer: {order.user.username}</h4>
            )}
          </Col>
          <Col
            span={4}
            offset={8}
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            {user.role === IRole.CUSTOMER && (
              <Button
                type="primary"
                size="small"
                danger
                onClick={() => handleDeleteOrder()}
                style={{ height: "20px" }}
              >
                Delete
              </Button>
            )}
            {user.role === IRole.ADMIN && order.isDelete && (
              <Tag color="red" style={{ height: "20px" }}>
                已删除
              </Tag>
            )}
          </Col>
        </Row>
      </div>

      <Table
        dataSource={order.orderItems}
        pagination={false}
        // responsive={['sm', 'md' ,'lg' ,'xl', 'xxl']}
      >
        {/*<ColumnGroup title="BookCard">*/}
        {/*<Column*/}
        {/*  title="Cover"*/}
        {/*  render={(value: IOrderItem) => (*/}
        {/*    <img*/}
        {/*      src={require("../../assets/books/" + value.book.image)}*/}
        {/*      style={{ width: 25, height: 30 }}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}
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

        {/*<Column*/}
        {/*  title="Action"*/}
        {/*  responsive={["md"]}*/}
        {/*  render={(value: IOrderItem) => (*/}
        {/*    <Space size="middle">*/}
        {/*      <Button*/}
        {/*        type="primary"*/}
        {/*        danger*/}
        {/*        onClick={() => handleDeleteOrderItem(value.id)}*/}
        {/*      >*/}
        {/*        Delete*/}
        {/*      </Button>*/}
        {/*    </Space>*/}
        {/*  )}*/}
        {/*/>*/}
      </Table>
    </>
  );
};
