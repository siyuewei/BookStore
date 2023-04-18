import React, { useEffect, useState } from "react";
import { Book } from "./Book";
import { List } from "antd";
import "../../css/Book.css";
import { IBook } from "../../interface";
import { getBooks } from "../../Service/BookService";
import { bookData } from "../../data";

export const BookList = () => {
  const [data, setData] = useState<IBook[]>(bookData);

  useEffect(() => {
    getBooks().then((res: IBook[]) => {
      setData(res);
      console.log(res);
    });
  }, []);

  return (
    <List
      pagination={{ pageSize: 8 }}
      grid={{
        gutter: 8,
        column: 4,
      }}
      dataSource={data}
      renderItem={(item: IBook) => (
        <List.Item>
          <Book
            className="book"
            image={item.image}
            title={item.name}
            price={item.price}
            id={item.id}
          ></Book>
        </List.Item>
      )}
    />
  );
};
