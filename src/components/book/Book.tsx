import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import "../../css/Book.css";

const { Meta } = Card;

export function Book(props: any) {
  const info = props;
  // console.log(info.image);

  return (
    <div>
      <Link to={`/home/books/${props.id}`}>
        <Card
          hoverable
          // style={{
          //     width: 120,
          // }}
          cover={
            <img
              className="book-img"
              alt="image"
              src={require(`../../assets/books/${info.image}`)}
            />
            // <div>a book image</div>
          }
        >
          <Meta
            title={info.title}
            description={"¥" + info.price}
            // style={
            //     {
            //         width:"100%",
            //         height:"10px",
            //     }
            // }
          />
        </Card>
      </Link>
    </div>
  );
}
