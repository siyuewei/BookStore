import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
  ProConfigProvider,
} from "@ant-design/pro-components";
import { useNavigate } from "react-router-dom";
import logoPic from "../assets/logo.png";
import { Cookies } from "react-cookie";
import { IBook, IUser, IUserAuth } from "../interface";
import { getBooks } from "../Service/BookService";

// const iconStyles = {
//   marginInlineStart: "16px",
//   color: "rgba(0, 0, 0, 0.2)",
//   fontSize: "24px",
//   verticalAlign: "middle",
//   cursor: "pointer",
// };

export const LoginView = () => {
  // const [loginType, setLoginType] = useState('phone');
  const cookie = new Cookies();
  const storeTime = new Date(new Date().getTime() + 60 * 1000 * 60 * 24 * 7); //设置cookie保存时间，一周

  // useEffect(() => {
  //   ().then((res: IUser) => {
  //     cookie.set("currentUser", res, {
  //       path: "/",
  //       maxAge: storeTime.getTime(),
  //     });
  //   });
  // }, []);

  // cookie.set(
  //   "users",
  //   [
  //     {
  //       id: 1,
  //       username: "admin",
  //       password: "admin",
  //       email: "1",
  //       avatar:
  //         "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
  //       notes: "a man who loves books",
  //     },
  //     {
  //       id: 2,
  //       username: "123",
  //       password: "123",
  //       email: "2",
  //       avatar:
  //         "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
  //       notes: "do not know what to say",
  //     },
  //     {
  //       id: 3,
  //       username: "thunderboy",
  //       password: "reins1409",
  //       email: "3",
  //       avatar: "https://avatars.githubusercontent.com/u/8186664?v=4",
  //       notes: "ddl is coming",
  //     },
  //   ],
  //   {
  //     path: "/",
  //     maxAge: storeTime.getTime(),
  //   }
  // );

  const navigate = useNavigate();
  // const users = cookie.get("users");

  const handleSubmit = async (values: IUserAuth) => {
    if (
      // (currentUser = users.find(
      //   (item: IUserAuth) =>
      //     item.username === values.username && item.password === values.password
      // )) !== undefined
      cookie.get("currentUser") !== undefined
    ) {
      // cookie.set("currentUser", currentUser, { path: "/" });
      console.log("success");
      navigate("/home");
    } else {
      console.log("fail");
    }
  };

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: "white" }}>
        <LoginForm
          logo={logoPic}
          title="BookStore"
          subTitle="与书籍同行"
          onFinish={handleSubmit}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={"prefixIcon"} />,
            }}
            placeholder={"用户名: admin or user"}
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={"prefixIcon"} />,
            }}
            placeholder={"密码: ant.design"}
            rules={[
              {
                required: true,
                message: "请输入密码！",
              },
            ]}
          />
          <div style={{ marginBlockEnd: 24 }}>
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a style={{ float: "right" }}>忘记密码</a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};
