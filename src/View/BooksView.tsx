import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { BookList } from "../components/book/BookList";
import { BookCarousel } from "../components/book/Carousel";
import "../css/Book.css";
import { getBooks } from "../Service/BookService";
import { IBook, IRole } from "../interface";
import { bookData } from "../data";
import { Cookies } from "react-cookie";

const { Search } = Input;

export const BooksView = () => {
  const cookie = new Cookies();
  const user = cookie.get("currentUser");

  const [data, setData] = useState<IBook[]>();
  const [filterData, setFilterData] = useState<IBook[]>();

  useEffect(() => {
    console.log("getBooks");
    getBooks().then((res: IBook[]) => {
      setData(res);
      setFilterData(res);
    });
  }, []);

  const handleSearch = (value: string) => {
    if (data === null) return;
    setFilterData(
      data!.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const [isDelete, setIsDelete] = useState(false);

  return (
    <div className="allView">
      <Search
        placeholder="input search text"
        onChange={(value) => {
          handleSearch(value.target.value);
        }}
        enterButton
      />
      <BookCarousel />
      <BookList
        filterData={filterData!}
        setFilterData={setFilterData}
        isDelete={isDelete}
      />
      {user.role === IRole.ADMIN && (
        <>
          {!isDelete && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                danger
                size={"large"}
                style={{ marginRight: "20px" }}
                href={"/home/addBook"}
              >
                Add Book
              </Button>
              <Button
                type="primary"
                danger
                size={"large"}
                onClick={() => {
                  setIsDelete(true);
                }}
              >
                Delete Book
              </Button>
            </div>
          )}
          {isDelete && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                type="primary"
                onClick={() => {
                  setIsDelete(false);
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
