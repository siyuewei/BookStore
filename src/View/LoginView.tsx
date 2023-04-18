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
import { IUser, IUserAuth } from "../interface";
import { checkUser } from "../Service/UserService";
import { message } from "antd";
import { useState } from "react";

export const LoginView = () => {
  const cookie = new Cookies();
  const storeTime = new Date(new Date().getTime() + 60 * 1000 * 60 * 24 * 7); //设置cookie保存时间，一周
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (values: IUserAuth) => {
    checkUser(values)
      .then((res: IUser) => {
        if (res === undefined) {
          setErrorMessage("登录失败，请检查用户名和密码是否正确。");
        }
        cookie.set("currentUser", res, {
          path: "/",
          maxAge: storeTime.getTime(),
        });
      })
      .then(() => {
        if (cookie.get("currentUser") !== undefined) {
          // console.log("success");
          navigate("/home");
        } else {
          console.log("fail");
        }
      });

    // cookie.set(
    //   "currentUser",
    //   {
    //     username: "admin",
    //     email: "123@example.com",
    //     avatar:
    //         "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
    //     notes: "shashasha",
    //   },
    //   {
    //     path: "/",
    //     maxAge: storeTime.getTime(),
    //   }
    // );
    // navigate("/home");
  };

  return (
    <>
      {errorMessage && (
        <div style={{ marginBottom: 10 }}>
          <>{message.error(errorMessage, 3)}</>
        </div>
      )}
      <div className={"login_background"}>
        <div className={"login"}>
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
            <div style={{ marginBlockEnd: 5 }}>
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a style={{ float: "right" }}>忘记密码</a>
            </div>
            <div style={{ marginBlockEnd: 10, textAlign: "center" }}>
              还没有账号？
              <a href="/register">立即注册</a>
            </div>
          </LoginForm>
        </div>
      </div>
    </>
  );
};
