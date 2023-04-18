import { Avatar, Button, Dropdown, Menu, Modal } from "antd";
import React, { useState } from "react";
import "../../css/index.css";
import { Link } from "react-router-dom";
import cookie from "react-cookies";

export const UserAvatar = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleLogout = () => {
    setIsModalVisible(true); // 显示弹出框
  };

  const handleModalOk = () => {
    // 执行退出逻辑
    setIsModalVisible(false); // 隐藏弹出框
    // 退出登录
    cookie.remove("currentUser");
    window.location.href = "/login";
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); // 隐藏弹出框
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/home/profile">Show Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <a href="#" onClick={() => handleLogout()}>
          Log Out
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div id="avatar">
      <Dropdown overlay={menu} placement="bottomCenter">
        <Avatar src={props.user.avatar} style={{ cursor: "pointer" }} />
      </Dropdown>
      <div className="name">Hi, {props.user.username}</div>

      <Modal // 弹出框组件
        title="Are you sure you want to log out?"
        visible={isModalVisible} // 显示控制
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>Click "OK" to log out or "Cancel" to stay.</p>
      </Modal>
    </div>
  );
};
