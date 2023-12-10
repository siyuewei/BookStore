import {apiUrl, graphqlUrl} from "../constant/constant";
import { IBook } from "../interface";

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

export async function updateBook(book: IBook) {
  console.log("update book: ",book)
  return await fetch(apiUrl + "/book/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  }).catch((err) => console.log(err));
}

export async function deleteBook(id: Number) {
  return await fetch(apiUrl + "/book/delete/" + id.toString(), {
    method: "DELETE",
  }).catch((err) => console.log(err));
}

export async function addBook(book: IBook) {
  return await fetch(apiUrl + "/book/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export async function getBookStatistic(beginTime: Date, endTime: Date) {
  console.log(endTime);
  console.log(endTime.toISOString().replace("T", " ").replace("Z", ""));
  console.log(beginTime);
  console.log(beginTime.toISOString().replace("T", " ").replace("Z", ""));

  return await fetch(
    apiUrl +
      "/book/get/statistics/byBook?beginTime=" +
      beginTime.toISOString().replace("T", " ").replace("Z", "") +
      "&endTime=" +
      endTime.toISOString().replace("T", " ").replace("Z", ""),
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export async function getUserStatistic(beginTime: Date, endTime: Date) {
  console.log(endTime);
  console.log(endTime.toISOString().replace("T", " ").replace("Z", ""));
  console.log(beginTime);
  console.log(beginTime.toISOString().replace("T", " ").replace("Z", ""));
  return await fetch(
    apiUrl +
      "/book/get/statistics/byUser?beginTime=" +
      beginTime.toISOString().replace("T", " ").replace("Z", "") +
      "&endTime=" +
      endTime.toISOString().replace("T", " ").replace("Z", ""),
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export async function getUserBookForm(
  beginTime: Date,
  endTime: Date,
  userId: number
) {
  console.log(
    beginTime,
    beginTime.toISOString().replace("T", " ").replace("Z", ""),
    endTime,
    endTime.toISOString().replace("T", " ").replace("Z", "")
  );
  return await fetch(
    apiUrl +
      "/book/get/statistics/" +
      userId.toString() +
      "?beginTime=" +
      beginTime.toISOString().replace("T", " ").replace("Z", "") +
      "&endTime=" +
      endTime.toISOString().replace("T", " ").replace("Z", ""),
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export async function searchBookByTag(Tag: String) {
  return await fetch(apiUrl + "/book/searchByTag?tag=" + Tag, {
    method: "GET",
  })
      .then((res) => res.json())
      .catch((err) => console.log(err));
}

export async function getBookByName(name:String) {
  const query =`
  query($name: String!) {
    getBookByName(name: $name) {
        name
        isbn
        author
        price
        description
        inventory
        sales
        tag
        image
        isDelete
        id
    }
  }
`;
  const variables = {
    name: name
  }
  const graphqlRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables
    }),
  };
  return await fetch(graphqlUrl, graphqlRequest)
      .then(response => response.json())
      .then(data => {
        // 处理GraphQL响应
        // console.log(data);
        return data;
      })
      .catch(error => {
        console.error('Error during GraphQL request:', error);
      });
}