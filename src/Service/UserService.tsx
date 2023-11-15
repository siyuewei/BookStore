import { apiUrl } from "../constant/constant";
import { IRole, IUserAuth } from "../interface";

export async function checkUser(userAuth: IUserAuth) {
  return await fetch(
    apiUrl +
      "/user/login?username=" +
      userAuth.username +
      "&password=" +
      userAuth.password,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.status === 0) {
        // console.log(res.data.role.toString() === "ADMIN")
        if (res.data.role.toString() === "ADMIN") {
          res.data.role = IRole.ADMIN;
        } else if (res.data.role.toString() === "CUSTOMER") {
          res.data.role = IRole.CUSTOMER;
        }
      }
      console.log(res.data.role)
      return res;
    })
    .catch((err) => console.log(err));
}

export async function logout() {
  // console.log("logout");
  return await fetch(apiUrl + "/user/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function registerUser(
  username: string,
  password: string,
  // name: string,
  email: string
) {
  return await fetch(apiUrl + "/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      name: "",
      email: email,
      avatar: "default.png",
      notes: "a people who love books",
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function updateUser(
  id: number,
  name: string,
  email: string,
  note: string
) {
  return await fetch(apiUrl + "/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      name: name,
      email: email,
      notes: note,
    }),
  }).catch((error) => {
    console.error("Error:", error);
  });
}

export async function getAllCustomer() {
  return await fetch(apiUrl + "/user/getAll", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}

export async function updateStatus(username: String, status: boolean) {
  let statusInParam = "true";
  if (!status) {
    statusInParam = "false";
  }
  return await fetch(
    apiUrl +
      "/user/changeStatus?username=" +
      username.toString() +
      "&status=" +
      statusInParam,
    {
      method: "POST",
    }
  ).catch((error) => {
    console.error("Error:", error);
  });
}

export async function updateAvatar(userId: number, avatarUrl: string) {
  return await fetch(
    apiUrl +
      "/user/updateAvatar?userId=" +
      userId.toString() +
      "&avatar=" +
      avatarUrl,
    {
      method: "POST",
    }
  ).catch((error) => {
    console.error("Error:", error);
  });
}
