import React from "react";
import "../css/Home.css";
import { Avatar, Button, Input, Space } from "antd";
import {
  TwitterOutlined,
  UserOutlined,
  UploadOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";
import { InputProfile } from "../components/layout/InputProfile";
import { Cookies } from "react-cookie";

const { TextArea } = Input;
export const ProfileView = () => {
  const cookie = new Cookies();
  const user = cookie.get("currentUser");

  const handleCancel = () => {};

  const handleSave = () => {};

  return (
    <div style={{ width: "100%" }}>
      <div>
        <h1>My Profile</h1>
        <h4>Name</h4>
        <div className="name">
          {[
            {
              placeholder: "Your Name",
              icon: { icon: UserOutlined, className: "site-form-item-icon" },
              defaultValue: user.name,
            },
            // {
            //   placeholder: "Your Last Name",
            //   icon: { icon: UserOutlined, className: "site-form-item-icon" },
            // },
          ].map((inputProps, index) => (
            <div style={{ flex: 1 }}>
              <InputProfile
                key={index}
                {...inputProps}
                style={{ width: "100%" }}
              />
            </div>
          ))}
        </div>

        <h4>Twitter</h4>
        <InputProfile
          placeholder="123@example.com"
          icon={{ icon: TwitterOutlined, className: "site-form-item-icon" }}
          defaultValue={user.email}
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
