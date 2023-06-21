import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { useNavigate } from "react-router-dom";
import logoPic from "../assets/logo.png";
import { Cookies } from "react-cookie";
import { IRole, IUser, IUserAuth } from "../interface";
import { checkUser } from "../Service/UserService";
import { message, notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";

export const LoginView = () => {
  const cookie = new Cookies();
  const storeTime = new Date(new Date().getTime() + 60 * 1000 * 60 * 24 * 7); //设置cookie保存时间，一周
  const navigate = useNavigate();

  let infoNumber = 0;

  // useEffect(() => {
  //     const interval = setInterval(() => {
  //         if (infoNumber > 0) infoNumber = infoNumber - 1;
  //     }, 3000);
  //
  //     return () => clearInterval(interval);
  // }, []);

  const openNotification = (placement: NotificationPlacement) => {
    if (infoNumber < 3) {
      notification.error({
        message: "Login Failed",
        description: "username or password is wrong",
        placement,
        icon: <UserOutlined style={{ color: "#108ee9" }} />,
        duration: 3,
        onClose: () => {
          infoNumber = infoNumber - 1;
        },
      });
      infoNumber = infoNumber + 1;
    }
    // console.log(infoNumber);
  };

  const handleSubmit = async (values: IUserAuth) => {
    checkUser(values).then((res) => {
      if (res.status === 0) {
        const user: IUser = {
          ...res.data,
          role:
            res.data.role.toString() === "ADMIN" ? IRole.ADMIN : IRole.CUSTOMER,
        };
        cookie.set("currentUser", user, {
          path: "/",
          maxAge: storeTime.getTime(),
        });
        message.success(res.msg, 3);
        navigate("/home");
      } else {
        message.error(res.msg, 3);
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
            {/*<div style={{ marginBlockEnd: 5 }}>*/}
            {/*  <ProFormCheckbox noStyle name="autoLogin">*/}
            {/*    自动登录*/}
            {/*  </ProFormCheckbox>*/}
            {/*  <a style={{ float: "right" }}>忘记密码</a>*/}
            {/*</div>*/}
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
