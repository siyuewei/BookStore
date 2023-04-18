import { apiUrl } from "../constant/constant";
import { IUserAuth } from "../interface";

export async function checkUser(userAuth: IUserAuth) {
  return await fetch(
    apiUrl +
      "/user/checkUser?username=" +
      userAuth.username +
      "&password=" +
      userAuth.password,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export async function registerUser(
  username: string,
  password: string,
  name: string,
  email: string
) {
  return await fetch(apiUrl + "/user/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      name: name,
      email: email,
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
      notes: "a people who love books",
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}
