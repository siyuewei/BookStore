import React, { useEffect, useState } from "react";
import { BookCard } from "./BookCard";
import { List } from "antd";
import "../../css/Book.css";
import { IBook } from "../../interface";
import { bookData } from "../../data";

interface BookListProps {
  filterData?: IBook[];
  isDelete?: boolean;
  setFilterData?: Function;
}

export const BookList = ({
  filterData,
  isDelete,
  setFilterData,
}: BookListProps) => {
  interface BookDeleteState {
    id: number;
    deleted: boolean;
  }

  const [bookDeleteState, setBookDeleteState] = useState<BookDeleteState[]>([]);
  useEffect(() => {
    const bookDeleteState = bookData.map((book) => {
      return {
        id: book.id,
        deleted: false,
      };
    });
    setBookDeleteState(bookDeleteState);
  }, []);

  useEffect(() => {
    const newData = filterData?.filter(
      (book) =>
        !bookDeleteState.find((bookDelete) => bookDelete.id === book.id)
          ?.deleted
    );
    setFilterData!(newData);
  }, [bookDeleteState]);

  return (
    <>
      {/*<h1>{searchValue}</h1>*/}
      <List
        // pagination={{ pageSize: 4, hideOnSinglePage: true }}
        grid={{
          gutter: 8,
          column: 4,
        }}
        dataSource={filterData}
        renderItem={(item: IBook) => (
          <List.Item>
            <BookCard
              image={item.image}
              tag={item.tag}
              title={item.name}
              price={item.price}
              id={item.id}
              isDelete={isDelete}
              deleted={
                bookDeleteState.find((book) => book.id === item.id)?.deleted
              }
              setDeleted={(deleted: boolean) => {
                // const newBookDeleteState = bookDeleteState.map((book) => {
                //   if (book.id === item.id) {
                //     console.log("change book", book.id, item.name);
                //     return {
                //       ...book,
                //       deleted,
                //     };
                //   }
                //   return book;
                // });
                // setBookDeleteState(newBookDeleteState);
                // console.log("newBookDeleteState", newBookDeleteState);
                window.location.reload();
              }}
            ></BookCard>
          </List.Item>
        )}
      />
    </>
  );
};
