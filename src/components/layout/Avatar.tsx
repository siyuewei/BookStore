import { Avatar, Button, Dropdown, Menu, Modal } from "antd";
import React, { useEffect, useState } from "react";
import "../../css/index.css";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import { getImg } from "../../Service/ImageService";

export const UserAvatar = () => {
  const cookie = new Cookies();
  const [user, setUser] = useState(cookie.get("currentUser"));
  const [img, setImg] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(user.avatar);

  useEffect(() => {
    if (imgUrl === null) return;
    getImg(imgUrl).then((blob) => {
      if (blob === null) return;
      setImg(URL.createObjectURL(blob!));
    });
  }, []);

  // useEffect(() => {
  //   const updateUser = () => {
  //     console.log("updateUser");
  //     setUser(cookie.get("currentUser"));
  //   };
  //
  //   // 监听 currentUser 变化
  //   cookie.addChangeListener(updateUser);
  //
  //   // 清除监听器
  //   return () => {
  //     cookie.removeChangeListener(updateUser);
  //   };
  // }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedUser = cookie.get("currentUser");
      if (updatedUser !== user) {
        console.log("updateUser");
        setUser(updatedUser);
        setImgUrl(updatedUser.avatar);
        getImg(updatedUser.avatar).then((blob) => {
          if (blob === null) return;
          setImg(URL.createObjectURL(blob!));
        });
      }
    }, 1000); // 每秒轮询检查一次

    return () => {
      clearInterval(interval);
    };
  }, []);

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
        <Avatar src={img} style={{ cursor: "pointer" }} />
      </Dropdown>
      <div className="name">Hi, {user.username}</div>

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
