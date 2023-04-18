import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "../../css/Home.css";
import { Space, Table, Tag, Button, InputNumber, Image, Input } from "antd";
import {
  changeBookAmount,
  deleteBook,
  getCart,
} from "../../Service/CartService";
import { ICartData } from "../../interface";
import { cartData } from "../../data";

const { Search } = Input;
const { Column } = Table;

export const CartTable = () => {
  const [allData, setAllData] = useState<ICartData[]>(cartData);
  const [filterData, setFilterData] = useState<ICartData[]>(cartData);

  useEffect(() => {
    getCart(1).then((res: ICartData[]) => {
      setAllData(res);
      setFilterData(res);
    });
  }, []);

  const handleUpdate = (value: ICartData) => {
    if (value.book && value.userId && value.amount)
      changeBookAmount(value.book.id, value.userId, value.amount);
    else {
      alert("Error: bookId or userId or amount is null");
    }
  };

  const handleSearch = (value: string) => {
    if (value === "") {
      setFilterData(allData);
      return;
    }
    setFilterData(
      allData.filter((item: ICartData) => item.book.name.includes(value))
    );
  };

  return (
    <>
      <Search
        placeholder="input search text"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          handleSearch(event.target.value);
        }}
        enterButton
      />
      {filterData && (
        <Table
          dataSource={filterData}
          pagination={{ pageSize: 4 }}
          // className="custom-table"
        >
          <Column
            title="Cover"
            render={(value: ICartData) => (
              <Image
                src={require("../../assets/books/" + value.book.image)}
                style={{ width: 25, height: 30 }}
              />
            )}
          />
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
                  max={10}
                  defaultValue={value.amount}
                  onChange={(event) => {
                    const data: ICartData = {
                      ...value,
                      amount: event!,
                    };
                    handleUpdate(data);
                  }}
                />
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
