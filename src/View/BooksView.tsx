import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { BookList } from "../components/book/BookList";
import { BookCarousel } from "../components/book/Carousel";
import "../css/Book.css";
import { getBooks } from "../Service/BookService";
import { IBook, IRole } from "../interface";
import {getAuthorByBookName} from "../Service/MicroService";

const { Search } = Input;

export const BooksView = () => {
  const user = JSON.parse(localStorage.getItem("currentUser")!);

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
  const [author,setAuthor] = useState("")

    const getAuthor=(bookName: String)=>{
        getAuthorByBookName(bookName).then((res)=>{
            console.log(res)
            if(res.status === 0){
                setAuthor(res.data.author)
            }
            else{
                setAuthor(res.msg)
            }
        })
    }

  return (
    <div className="allView">
      <Search
        placeholder="input search text"
        onChange={(value) => {
          handleSearch(value.target.value);
        }}
        enterButton
      />
        <hr/>
      <Search
          placeholder={"search author by book name"}
          onSearch={(value)=>{
              getAuthor(value);
          }}
          enterButton
      >
        </Search>
        {author === "" ?<></>:<div>{author}</div>}
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
