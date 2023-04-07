import { Button } from "antd";
import { useState } from "react";
import { getBook } from "../Service/getBook";

export interface IBook {
  id: number;
  title: string;
}

export const DemoView = () => {
  const [title, setTitle] = useState("");
  return (
    <>
      <Button onClick={() => getBook(1)}></Button>
      <p>{title}</p>
    </>
  );
};
