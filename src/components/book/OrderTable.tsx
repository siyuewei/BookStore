import React from "react";
import "../../css/Home.css";
import { Button, Space, Table, Tag, DatePicker } from "antd";
import { orderData as data } from "../../data";
import dayjs from "dayjs";

const dateFormat = "YYYY-MM-DD";
const { Column, ColumnGroup } = Table;

export const OrderTable = () => {
  return (
    <Table
      dataSource={data}
      pagination={{ pageSize: 5 }}
      // responsive={['sm', 'md' ,'lg' ,'xl', 'xxl']}
    >
      {/*<ColumnGroup title="Book">*/}
      <Column
        title="Cover"
        dataIndex="image"
        key="image"
        render={(image) => (
          <img
            src={require("../../assets/books/" + image)}
            style={{ width: 25, height: 30 }}
          />
        )}
      />
      <Column title="Title" dataIndex="title" key="title" />
      {/*</ColumnGroup>*/}
      <Column title="Amount" dataIndex="amount" key="amount" />
      <Column
        title="Price"
        dataIndex="price"
        key="price"
        render={(price) => (
          <>
            <Tag color="blue" key={price}>
              ¥{price}
            </Tag>
          </>
        )}
      />
      <Column
        title="Purchase Time"
        key="purchaseTime"
        // render={(item) => (
        //     <DatePicker defaultValue={dayjs(item.purchaseTime, dateFormat)} disabled />
        // )}
        dataIndex="purchaseTime"
        render={(purchaseTime) => (
          <DatePicker
            defaultValue={dayjs(purchaseTime, dateFormat)}
            disabled
            style={{ transform: "scale(0.8)", width: "150px" }}
          />
          // purchaseTime
        )}
      />
      <Column
        title="Action"
        key="action"
        responsive={["md"]}
        render={(_, record) => (
          <Space size="middle">
            <Button type="primary" danger>
              Delete
            </Button>
          </Space>
        )}
      />
    </Table>
  );
};
