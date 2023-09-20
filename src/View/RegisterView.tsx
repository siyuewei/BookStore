import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { useNavigate } from "react-router-dom";
import logoPic from "../assets/logo.png";
import { IRole } from "../interface";
import { checkUser, registerUser } from "../Service/UserService";
import React from "react";

export const RegisterView = () => {
  const navigate = useNavigate();
  const storeTime = new Date(new Date().getTime() + 60 * 1000 * 60 * 24 * 7); //设置cookie保存时间，一周

  //TODO: now register is not working, need to fix it
  //backend error the key is not unique for email
  const handleSubmit = async (values: any) => {
    if (values.password === values.checkPassword) {
      var reg =
        /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      //调用正则验证test()函数
      let isok = reg.test(values.email);
      if (!isok) {
        alert("邮箱格式不正确，请重新输入！");
        return;
      }

      registerUser(
        values.username,
        values.password,
        values.email === undefined ? "12883@example" : values.email
      ).then((res) => {
        if (res.toString() === "true") {
          let username = values.username;
          let password = values.password;
          checkUser({ username, password }).then((res) => {
            if (res.status === 0) {
              const currentUser = {
                ...res.data,
                role:
                  res.data.role.toString() === "ADMIN"
                    ? IRole.ADMIN
                    : IRole.CUSTOMER,
              };
              localStorage.set("currentUser", currentUser, {
                path: "/",
                maxAge: storeTime.getTime(),
              });
              alert("register success");
              navigate("/home");
              // console.log(res);
            } else {
              alert("Failed to get user info after register");
            }
          });
        } else {
          alert("register failed, the username has been used");
        }
      });
    } else {
      alert("password is not same");
    }
  };

  return (
    <>
      <div className={"login_background"}>
        <div className={"login"}>
          <LoginForm
            logo={logoPic}
            title="BookStore"
            subTitle="与书籍同行"
            onFinish={handleSubmit}
            submitter={{
              searchConfig: {
                submitText: "注册",
              },
            }}
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={"prefixIcon"} />,
              }}
              placeholder={"用户名:"}
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
              placeholder={"密码:"}
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
              ]}
            />
            <ProFormText
              name="checkPassword"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"确认密码"}
              rules={[
                {
                  required: true,
                  message: "请重复密码!",
                },
              ]}
            />
            <ProFormText
              name="email"
              fieldProps={{
                size: "large",
                prefix: <MailOutlined className={"prefixIcon"} />,
              }}
              placeholder={"邮箱:123@example.com"}
              rules={[
                {
                  required: true,
                  message: "请输入邮箱!",
                },
              ]}
            />
            {/*<ProFormText*/}
            {/*  name="name"*/}
            {/*  fieldProps={{*/}
            {/*    size: "large",*/}
            {/*    prefix: <UserOutlined className={"prefixIcon"} />,*/}
            {/*  }}*/}
            {/*  placeholder={"你的姓名: admin or user"}*/}
            {/*  rules={[*/}
            {/*    {*/}
            {/*      required: false,*/}
            {/*      message: "请输入姓名!",*/}
            {/*    },*/}
            {/*  ]}*/}
            {/*/>*/}

            <div
              style={{
                marginBlockEnd: 10,
                marginTop: -10,
                textAlign: "center",
              }}
            >
              已有账号？
              <a href="/login">登录</a>
            </div>
          </LoginForm>
        </div>
      </div>
    </>
  );
};
