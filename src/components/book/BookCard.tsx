import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Image, Radio } from "antd";
import "../../css/Book.css";
import { deleteBook } from "../../Service/BookService";
import { getImg } from "../../Service/ImageService";

const { Meta } = Card;

interface BookCardProps {
  image: string;
  title: string;
  price: number;
  id: number;
  isDelete?: boolean;
  deleted?: boolean;
  setDeleted?: (deleted: boolean) => void;
}

export function BookCard({
  image,
  title,
  price,
  id,
  isDelete,
  deleted,
  setDeleted,
}: BookCardProps) {
  // const info = props;

  const [img, setImg] = useState<string>("");

  useEffect(() => {
    if (image === "") return;
    getImg(image).then((blob) => {
      if (blob === null) return;
      setImg(URL.createObjectURL(blob!));
      //TODO: delete this line
      // console.log("img is", URL.createObjectURL(blob!));
    });
    // console.log(title)
  }, []);

  const handleDelete = () => {
    if (setDeleted) {
      setDeleted(true);
      deleteBook(id);
    }
  };
  return (
    <>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link to={`/home/books/${id}`}>
          <Card
            hoverable
            className="book"
            style={{
              borderStyle: "solid",
              borderWidth: "3px",
              borderColor: "rgba(0, 0, 0, 0.4)",
            }}
            cover={<Image className="book-img" alt="image" src={img!} />}
          >
            <div>{title}</div>
            <Meta title={title} description={"¥" + price} />
          </Card>
        </Link>
        {isDelete && (
          <Button
            style={{ marginLeft: "45px", marginTop: "10px" }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
      </div>
    </>
  );
}
