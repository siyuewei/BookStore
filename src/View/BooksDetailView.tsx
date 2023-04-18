import React from "react";
import { Link, useParams } from "react-router-dom";
import { Descriptions, Button, Image } from "antd";
import { ShoppingCartOutlined, MoneyCollectOutlined } from "@ant-design/icons";
import { bookData } from "../data";
import "../css/bookDetail.css";
import { getBookByBookId } from "../Service/BookService";
import { addCart } from "../Service/CartService";
import { IBook } from "../interface";

export const BooksDetailView = () => {
  const book = useParams();
  const info: IBook = bookData.find(
    (item: IBook) => item.id.toString() === book.id
  )!;

  return (
    <div className={"content"}>
      <div>
        <Link to={"/home/books"}>
          <Button type="primary" danger>
            back
          </Button>
        </Link>
      </div>
      <br></br>
      <h1>{info.name}</h1>
      <div className={"book-detail"}>
        <div className={"book-image"}>
          <Image
            alt="image"
            src={require(`../assets/books/${info.image}`)}
            onClick={() => getBookByBookId(info.id)}
          />
        </div>
        <div className="des-group">
          <Descriptions className="all-des">
            <Descriptions.Item label={"Title"} span={3}>
              {info.name}
            </Descriptions.Item>
            <Descriptions.Item label={"Author"} span={3}>
              {info.author}
            </Descriptions.Item>
            {/*<Descriptions.Item label={"Class"} span={3} bordered>*/}
            {/*  {info.type}*/}
            {/*</Descriptions.Item>*/}
            <Descriptions.Item label={"Price"} span={3}>
              {<span className={"price"}>{"¥" + info.price}</span>}
            </Descriptions.Item>
            <Descriptions.Item label={"State"} span={3}>
              {info.inventory !== 0 ? (
                <span>
                  有货{" "}
                  <span className={"inventory"}>库存{info.inventory}件</span>
                </span>
              ) : (
                <span className={"status"}>无货</span>
              )}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
      <div className={"book-intro"}>
        <Descriptions className="int-des">
          <Descriptions.Item label={"Introduce"} span={3}>
            {info.description}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className={"button-groups"}>
        <Button
          danger
          icon={<ShoppingCartOutlined />}
          size={"large"}
          onClick={() => addCart(info.id, 1, 1)}
        >
          加入购物车
        </Button>
        <Button
          danger
          icon={<MoneyCollectOutlined />}
          size={"large"}
          style={{ marginLeft: "15%" }}
          ghost
        >
          立即购买
        </Button>
      </div>
    </div>
  );
};
