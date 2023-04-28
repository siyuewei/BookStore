import React, { useRef } from "react";
import "../css/Home.css";
import { Avatar, Button, Input, Space, Tooltip } from "antd";
import {
  TwitterOutlined,
  UserOutlined,
  UploadOutlined,
  AntDesignOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { InputProfile } from "../components/layout/InputProfile";
import { Cookies } from "react-cookie";

const { TextArea } = Input;
export const ProfileView = () => {
  const cookie = new Cookies();
  const user = cookie.get("currentUser");

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const noteRef = useRef(null);

  const handleCancel = () => {};

  const handleSave = () => {
    console.log(nameRef.current);
    console.log(emailRef.current);
    console.log(noteRef.current);
  };

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
                  Email:
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
              defaultValue={user.name}
              ref={nameRef}
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
              Email:
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
          defaultValue={user.email}
          ref={emailRef}
        />
      </div>

      <div className="avatar-note">
        <Space
          direction="vertical"
          style={{ width: "20%", marginRight: "30px" }}
        >
          <h4>Avatar</h4>
          {/*<UserAvatar/>*/}
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<AntDesignOutlined />}
            src={user.avatar}
            style={{ width: "100px", height: "100px" }}
          />
          <div style={{ marginTop: "20px" }}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </div>
        </Space>
        <Space direction="vertical" style={{ display: "flex", width: "100%" }}>
          <h4>Notes</h4>
          <TextArea
            rows={4}
            style={{ width: "100%" }}
            defaultValue={user.notes}
            ref={noteRef}
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
