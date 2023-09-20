import React from "react";
import "../../css/Home.css";
import { Button, InputNumber, Space, Table, Tag } from "antd";
import { deleteBook } from "../../Service/CartService";
import { ICartData } from "../../interface";

const { Column } = Table;

interface ICartTableProps {
  filterData: ICartData[];
  setFilterData: Function;
  allData: ICartData[];
  setAllData: Function;
  handleUpdate: Function;
}

export const CartTable = ({
  filterData,
  setFilterData,
  allData,
  setAllData,
  handleUpdate,
}: ICartTableProps) => {
  return (
    <>
      <>
        {/*{filterData.map((data) => {*/}
        {/*  console.log(data);*/}
        {/*})}*/}
      </>
      {filterData && (
        <Table
          dataSource={filterData}
          // pagination={{ pageSize: 4 }}
          pagination={false}
          // className="custom-table"
        >
          {/*<Column*/}
          {/*  title="Cover"*/}
          {/*  render={(value: ICartData) => (*/}
          {/*    <Image*/}
          {/*      src={require("../../assets/books/" + value.book.image)}*/}
          {/*      style={{ width: 25, height: 30 }}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*/>*/}
          <Column
            title="Title"
            render={(value: ICartData) => value.book.name}
          />
          <Column
            title="Amount"
            render={(value: ICartData) => (
              <Space size="middle">
                <InputNumber
                  min={1}
                  max={100}
                  // defaultValue={value.amount}
                  value={value.amount}
                  onChange={(event) => {
                    console.log(event);
                    const data: ICartData = {
                      ...value,
                      amount: event!,
                    };
                    handleUpdate(data);
                  }}
                />
                {/*<>{value.amount}</>*/}
              </Space>
            )}
          />
          <Column
            title="Price"
            render={(value: ICartData) => (
              <>
                <Tag color="blue" key={value.book.price}>
                  ¥{value.book.price}
                </Tag>
              </>
            )}
          />
          <Column
            title="Action"
            render={(value: ICartData) => (
              <Space size="middle">
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    deleteBook(value.book.id, value.userId);
                    setAllData(
                      allData.filter(
                        (item: ICartData) =>
                          item.book.id !== value.book.id &&
                          item.userId === value.userId
                      )
                    );
                    setFilterData(
                      filterData.filter(
                        (item: ICartData) =>
                          item.book.id !== value.book.id &&
                          item.userId === value.userId
                      )
                    );
                  }}
                >
                  Delete
                </Button>
              </Space>
            )}
          />
        </Table>
      )}
    </>
  );
};
