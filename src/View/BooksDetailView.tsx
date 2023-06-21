import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Descriptions,
  Button,
  Image,
  InputNumber,
  Input,
  Upload,
  UploadFile,
} from "antd";
import {
  ShoppingCartOutlined,
  MoneyCollectOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { bookData } from "../data";
import "../css/bookDetail.css";
import { getBookByBookId, updateBook } from "../Service/BookService";
import { addCart } from "../Service/CartService";
import { IBook, IRole } from "../interface";
import { Cookies } from "react-cookie";
import { getImg, UploadImg } from "../Service/ImageService";

export const BooksDetailView = () => {
  const book = useParams();

  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<IBook>(null!);
  const [img, setImg] = useState<string>("");
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    getBookByBookId(Number(book.id)).then((res) => {
      setInfo(res);
      if (res.image)
        getImg(res.image).then((blob) => {
          setImg(URL.createObjectURL(blob!));
        });
    });
  }, []);

  const handleBeforeUpload = (file: UploadFile) => {
    UploadImg(file).then((res) => {
      getImg(res.data.path).then((blob) => {
        if (blob === null) return;
        setImg(URL.createObjectURL(blob!));
      });
      setInfo({ ...info, image: res.data.path });
    });
    return false; // 阻止默认上传行为
  };

  const cookie = new Cookies();
  const user = cookie.get("currentUser");

  const [bookNum, setBookNum] = useState(1);

  const [isEdit, setIsEdit] = useState(false);
  const [tmpInfo, setTmpInfo] = useState<IBook>(null!);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    let inputName = e.target.name;
    setInfo({ ...info, [inputName]: inputValue });
  };

  const handleEdit = () => {
    if (!isEdit) {
      setTmpInfo(info);
      setIsEdit(true);
    } else {
      setInfo(tmpInfo);
      setIsEdit(false);
    }
  };

  const handleCancel = () => {
    setInfo(tmpInfo);
  };

  const handleSave = () => {
    setIsEdit(false);
    updateBook(info).then(() => alert("Saved!"));
  };

  return (
    <>
      {info && (
        <div className={"content"}>
          <div style={{ display: "flex" }}>
            <Link to={"/home/books"}>
              <Button type="primary" danger>
                Back
              </Button>
            </Link>

            {user.role === IRole.ADMIN && (
              <Button
                type="primary"
                style={{ marginLeft: "auto" }}
                onClick={handleEdit}
              >
                {isEdit ? "Cancel" : "Edit"}
              </Button>
            )}
          </div>
          <br></br>

          <>
            <h1>{info.name}</h1>
            <div className={"book-detail"}>
              <div className={"book-image"}>
                {img && !isEdit && <Image alt="image" src={img!} />}
                {img && isEdit && (
                  <Upload
                    name="/upload"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={handleBeforeUpload}
                  >
                    {img ? (
                      <img
                        src={img}
                        alt="avatar"
                        style={{ width: "100px", height: "100px" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                )}
              </div>
              <div className="des-group">
                <Descriptions className="all-des">
                  <Descriptions.Item label={"Title"} span={3}>
                    {isEdit ? (
                      <Input
                        name={"name"}
                        value={info.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      info.name
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label={"Author"} span={3}>
                    {isEdit ? (
                      <Input
                        name={"author"}
                        value={info.author}
                        onChange={handleInputChange}
                      />
                    ) : (
                      info.author
                    )}
                  </Descriptions.Item>
                  {/*<Descriptions.Item label={"Class"} span={3} bordered>*/}
                  {/*  {info.type}*/}
                  {/*</Descriptions.Item>*/}
                  <Descriptions.Item label={"Price"} span={3}>
                    {isEdit ? (
                      <Input
                        name={"price"}
                        value={info.price}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span className={"price"}>{"¥" + info.price}</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label={"ISBN"} span={3}>
                    {isEdit ? (
                      <Input
                        name={"isbn"}
                        value={info.isbn}
                        onChange={handleInputChange}
                      />
                    ) : (
                      info.isbn
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label={"State"} span={3}>
                    {isEdit ? (
                      <Input
                        name={"inventory"}
                        value={info.inventory}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span>
                        {info.inventory !== 0 ? (
                          <>
                            有货{" "}
                            <span className={"inventory"}>
                              库存{info.inventory}件
                            </span>
                          </>
                        ) : (
                          <span className={"status"}>无货</span>
                        )}
                      </span>
                    )}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
            {isEdit && <br></br>}
            <div className={"book-intro"}>
              <Descriptions className="int-des">
                <Descriptions.Item label={"Introduce"} span={3}>
                  {isEdit ? (
                    <Input
                      name={"description"}
                      value={info.description}
                      onChange={handleInputChange}
                    ></Input>
                  ) : (
                    info.description
                  )}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </>

          {isEdit && (
            <>
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
                  <Button
                    type="primary"
                    danger
                    size={"large"}
                    onClick={handleCancel}
                  >
                    cancel
                  </Button>
                </div>
              </div>
            </>
          )}

          {user.role === IRole.CUSTOMER && (
            <>
              <div className={"button-groups"}>
                <InputNumber
                  style={{ flex: 1, marginRight: "15%", marginLeft: "5%" }}
                  defaultValue={bookNum}
                  min={1}
                  max={20}
                  onChange={(event) => {
                    setBookNum(event!);
                  }}
                ></InputNumber>
                <Button
                  style={{ flex: 1 }}
                  danger
                  icon={<ShoppingCartOutlined />}
                  size={"large"}
                  onClick={() => addCart(info.id, user.id, bookNum)}
                >
                  加入购物车
                </Button>
                {/*<Button*/}
                {/*  danger*/}
                {/*  icon={<MoneyCollectOutlined />}*/}
                {/*  size={"large"}*/}
                {/*  style={{ marginLeft: "15%" }}*/}
                {/*  ghost*/}
                {/*>*/}
                {/*  立即购买*/}
                {/*</Button>*/}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
