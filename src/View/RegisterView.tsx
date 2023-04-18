import { LockOutlined, UserOutlined, TwitterOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { useNavigate } from "react-router-dom";
import logoPic from "../assets/logo.png";
import { Cookies } from "react-cookie";
import { IUserAuth } from "../interface";
import { registerUser } from "../Service/UserService";

export const RegisterView = () => {
  const navigate = useNavigate();
  const storeTime = new Date(new Date().getTime() + 60 * 1000 * 60 * 24 * 7); //设置cookie保存时间，一周
  const cookie = new Cookies();
  const handleSubmit = async (values: any) => {
    registerUser(
      values.username,
      values.password,
      values.name,
      values.email
    ).then((res) => {
      if (res) {
        cookie.set(
          "currentUser",
          {
            username: values.username,
            name: values.name === undefined ? "" : values.name,
            email: values.email === undefined ? "" : values.email,
            avatar:
              "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            notes: "a people who love books",
          },
          {
            path: "/",
            maxAge: storeTime.getTime(),
          }
        );
        alert("register success");
        navigate("/home");
      } else {
        alert("The username has been used");
      }
    });
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
            <ProFormText
              name="name"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={"prefixIcon"} />,
              }}
              placeholder={"你的姓名: admin or user"}
              rules={[
                {
                  required: false,
                  message: "请输入姓名!",
                },
              ]}
            />
            <ProFormText
              name="email"
              fieldProps={{
                size: "large",
                prefix: <TwitterOutlined className={"prefixIcon"} />,
              }}
              placeholder={"邮箱:123@example.com"}
              rules={[
                {
                  required: false,
                  message: "请输入邮箱!",
                },
              ]}
            />
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
