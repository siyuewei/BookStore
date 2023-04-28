import React, { useState } from "react";
import { Input } from "antd";
import { BookList } from "../components/book/BookList";
import { BookCarousel } from "../components/book/Carousel";
import "../css/Book.css";

const { Search } = Input;

export const BooksView = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="allView">
      <Search
        placeholder="input search text"
        onChange={(value) => {
          handleChange(value.target.value);
        }}
        enterButton
      />
      <BookCarousel />
      <BookList searchValue={searchValue} />
    </div>
  );
};
