import { apiUrl } from "../constant/constant";

export async function checkUser(username: String, password: String) {
  return await fetch(
    apiUrl + "/user/checkUser?username=" + username + "&password=" + password,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
