import { apiUrl } from "../constant/constant";

export async function getBookByBookId(id: Number) {
  // console.log("Try to bookService");
  return await fetch(apiUrl + "/book/" + id.toString(), {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export async function getBooks() {
  // console.log("Try to bookService");
  return await fetch(apiUrl + "/book/get", {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
