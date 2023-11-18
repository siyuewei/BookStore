import { Button, Descriptions, Input, Upload, UploadFile } from "antd";
import { addBook,  } from "../Service/BookService";
import React, {  useState } from "react";
import { IBook } from "../interface";
import { getImg, UploadImg } from "../Service/ImageService";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

export function AddBookView() {
  const [info, setInfo] = useState<IBook>({
    id: 0,
    name: "",
    isbn: "",
    author: "",
    price: 0,
    inventory: 0,
    sales: 0,
    isDelete: false,
    description: "",
    image: "",
    tag:""
  });
  const [tmpInfo, setTmpInfo] = useState<IBook>({
    id: 0,
    name: "",
    isbn: "",
    author: "",
    price: 0,
    inventory: 0,
    sales: 0,
    isDelete: false,
    description: "",
    image: "",
    tag:""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    let inputName = e.target.name;
    setInfo({ ...info, [inputName]: inputValue });
  };

  const handleCancel = () => {
    setInfo(tmpInfo);
  };

  const handleSave = () => {
    if (
      info.name &&
      info.author &&
      info.price > 0 &&
      info.isbn &&
      info.description &&
      info.image &&
      info.inventory >= 0 &&
        info.tag !== ""
    ) {
      addBook(info).then((res) => {
        if (res.status === 0) {
          alert("Add book successfully!");
        } else {
          alert(res.msg);
        }
      });
      setInfo(tmpInfo);
      setImg(null);
      setImgUrl(null);
    } else {
      //price is not a number
      if (isNaN(info.price)) {
        alert("Price should be a number!");
      } else if (isNaN(info.inventory)) {
        alert("Inventory should be a number!");
      } else if (info.price <= 0) {
        alert("Price should be positive!");
      } else if (info.inventory < 0) {
        alert("Inventory should be positive!");
      } else if (info.tag === "") {
        alert("Tag should not be null!");
      } else {
        alert("Please fill all the information!");
      }
    }
  };

  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  const handleBeforeUpload = (file: UploadFile) => {
    UploadImg(file).then((res) => {
      setImgUrl(res.data.path);
      getImg(res.data.path).then((blob) => {
        if (blob === null) return;
        setImg(URL.createObjectURL(blob!));
        // console.log("get image")
      });
      setInfo({ ...info, image: res.data.path });
    });
    return false; // 阻止默认上传行为
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <h1>AddBookView</h1>

      <h1>{info.name}</h1>
      <div className={"book-detail"}>
        <div className={"book-image"}>
          {/*<Image alt="image" src={require("../assets/books/三体.jpg")} />*/}
          <Upload
            name="/upload"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={handleBeforeUpload}
          >
            {img ? <img src={img} alt="avatar" /> : uploadButton}
          </Upload>
        </div>
        <div className="des-group">
          <Descriptions className="all-des">
            <Descriptions.Item label={"Title"} span={3}>
              <Input
                name={"name"}
                value={info.name}
                onChange={handleInputChange}
              />
            </Descriptions.Item>
            <Descriptions.Item label={"Author"} span={3}>
              <Input
                name={"author"}
                value={info.author}
                onChange={handleInputChange}
              />
            </Descriptions.Item>

            <Descriptions.Item label={"Price"} span={3}>
              <Input
                name={"price"}
                value={info.price}
                onChange={handleInputChange}
              />
            </Descriptions.Item>
            <Descriptions.Item label={"ISBN"} span={3}>
              <Input
                name={"isbn"}
                value={info.isbn}
                onChange={handleInputChange}
              />
            </Descriptions.Item>
            <Descriptions.Item label={"Inventory"} span={3}>
              <Input
                name={"inventory"}
                value={info.inventory}
                onChange={handleInputChange}
              />
            </Descriptions.Item>
            <Descriptions.Item label={"Tag"} span={3}>
              <Input
                  name={"tag"}
                  value={info.tag}
                  onChange={handleInputChange}
              />
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className={"book-intro"}>
        <Descriptions className="int-des">
          <Descriptions.Item label={"Introduce"} span={3}>
            <Input
              name={"description"}
              value={info.description}
              onChange={handleInputChange}
            ></Input>
          </Descriptions.Item>
        </Descriptions>
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ marginRight: "20px" }}>
          <Button danger size={"large"} onClick={handleSave}>
            save
          </Button>
        </div>
        <div>
          <Button type="primary" danger size={"large"} onClick={handleCancel}>
            cancel
          </Button>
        </div>
      </div>
    </>
  );
}
