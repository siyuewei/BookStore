import React, { useEffect, useRef, useState } from "react";
import "../css/Home.css";
import {
  Avatar,
  Button,
  Image,
  Input,
  InputRef,
  Space,
  Tooltip,
  Upload,
  UploadFile,
} from "antd";
import {
  TwitterOutlined,
  UserOutlined,
  UploadOutlined,
  AntDesignOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Cookies } from "react-cookie";
import { updateAvatar, updateUser } from "../Service/UserService";
import { getImg, UploadImg } from "../Service/ImageService";
import { RcFile, UploadChangeParam, UploadProps } from "antd/es/upload";
import { UserAvatar } from "../components/layout/Avatar";

const { TextArea } = Input;
export const ProfileView = () => {
  const cookie = new Cookies();
  let user = cookie.get("currentUser");

  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [notes, setNotes] = useState<string>(user.notes);

  const handleCancel = () => {
    setName(user.name);
    setEmail(user.email);
    setNotes(user.notes);
  };

  const handleSave = () => {
    updateUser(user.id, name, email, notes)
      .then(() => {
        cookie.set("currentUser", {
          id: user.id,
          username: user.username,
          name: name,
          email: email,
          notes: notes,
          avatar: user.avatar,
        });
      })
      .then(() => alert("Saved!"));
  };

  const handleUpload = (file: UploadFile<any>, fileList: UploadFile<any>[]) => {
    console.log(file);
    // console.log(fileList);
  };

  // const [img, setImg] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(user.avatar);

  // const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
  //   if (info.file.status === 'uploading') {
  //     setLoading(true);
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj as RcFile, (url) => {
  //       setLoading(false);
  //       setImageUrl(url);
  //     });
  //   }
  // };
  useEffect(() => {
    if (imgUrl === null) return;
    getImg(imgUrl!).then((blob) => {
      if (blob === null) return;
      setImg(URL.createObjectURL(blob!));
    });
  }, []);

  const handleBeforeUpload = (file: UploadFile) => {
    // 发送文件到后端的逻辑
    // 使用fetch或axios等工具发送POST请求，将formData作为请求体发送到后端的上传接口

    // 示例使用fetch发送POST请求到后端上传接口
    UploadImg(file).then((res) => {
      // console.log(res);
      // if (res.status !== 0) {
      //   console.log(res.msg);
      //   return;
      // }
      setImgUrl(res.data.path);
      getImg(res.data.path).then((blob) => {
        if (blob === null) return;
        setImg(URL.createObjectURL(blob!));
      });
      updateAvatar(user.id, res.data.path).then(() => {
        cookie.set("currentUser", {
          ...user,
          avatar: res.data.path,
        });
      });
      user = cookie.get("currentUser");
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
    <div style={{ width: "100%" }}>
      <div>
        <h1>My Profile</h1>
        <h4>Name</h4>
        <div className="name">
          {/*{[*/}
          {/*  {*/}
          {/*    */}
          {/*  },*/}
          {/*  // {*/}
          {/*  //   placeholder: "Your Last Name",*/}
          {/*  //   icon: { icon: UserOutlined, className: "site-form-item-icon" },*/}
          {/*  // },*/}
          {/*].map((inputProps, index) => (*/}
          <div style={{ flex: 1 }}>
            <Input
              placeholder="Your Name"
              prefix={
                <div>
                  <UserOutlined className="site-form-item-icon" />
                </div>
              }
              suffix={
                <Tooltip title="Extra information">
                  <InfoCircleOutlined
                    style={{
                      color: "rgba(0,0,0,.45)",
                    }}
                  />
                </Tooltip>
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>
          {/*))}*/}
        </div>

        <h4>Twitter</h4>
        <Input
          placeholder="123@example.com"
          prefix={
            <div>
              <TwitterOutlined className="site-form-item-icon" />
            </div>
          }
          suffix={
            <Tooltip title="Extra information">
              <InfoCircleOutlined
                style={{
                  color: "rgba(0,0,0,.45)",
                }}
              />
            </Tooltip>
          }
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="avatar-note">
        <Space
          direction="vertical"
          style={{ width: "20%", marginRight: "30px" }}
        >
          <h4>Avatar</h4>
          {/*<UserAvatar/>*/}
          {/*<Avatar*/}
          {/*  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}*/}
          {/*  icon={<AntDesignOutlined />}*/}
          {/*  src={user.avatar}*/}
          {/*  style={{ width: "100px", height: "100px" }}*/}
          {/*/>*/}

          <Upload
            name="/upload"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={handleBeforeUpload}
            // onChange={handleChange}
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

          {/*<div style={{ marginTop: "20px" }}>*/}
          {/*  <Upload*/}
          {/*    onChange={({ file, fileList }) => handleUpload(file, fileList)}*/}
          {/*  >*/}
          {/*    <Button icon={<UploadOutlined />}>Upload</Button>*/}
          {/*  </Upload>*/}
          {/*</div>*/}
        </Space>
        <Space direction="vertical" style={{ display: "flex", width: "100%" }}>
          <h4>Notes</h4>
          <TextArea
            rows={4}
            style={{ width: "100%" }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ marginRight: "20px" }}>
              <Button danger size={"large"} onClick={() => handleSave()}>
                save
              </Button>
            </div>
            <div>
              <Button
                type="primary"
                danger
                size={"large"}
                onClick={() => handleCancel()}
              >
                cancel
              </Button>
            </div>
          </div>
        </Space>
      </div>
    </div>
  );
};
