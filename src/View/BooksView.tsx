import React, { useState } from "react";
import { Carousel, Input, Space } from "antd";
import { BookList } from "../components/book/BookList";
import { BookCarousel } from "../components/book/Carousel";
import "../css/Book.css";

const { Search } = Input;
const onSearch = (value: string) => console.log(value);

export const BooksView = () => {
  return (
    <div className="allView">
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      <BookCarousel />
      <BookList />
    </div>
  );
};
