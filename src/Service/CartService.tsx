import { apiUrl } from "../constant/constant";

export async function addCart(bookId: number, userId: number, amount: number) {
  return await fetch(apiUrl + "/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bookId: bookId,
      userId: userId,
      amount: amount,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    })
    .then((data) => {
      if (data) {
        alert("Added to cart");
      } else {
        alert("The book is already in the cart, add the number of book");
      }
    });
}

export async function changeBookAmount(
  bookId: number,
  userId: number,
  amount: number
) {
  return await fetch(apiUrl + "/cart/change", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bookId: bookId,
      userId: userId,
      amount: amount,
    }),
  }).catch((error) => {
    console.error("Error:", error);
  });
}

export async function deleteBook(bookId: number, userId: number) {
  return await fetch(
    apiUrl + "/cart/delete?userId=" + userId + "&bookId=" + bookId,
    {
      method: "DELETE",
    }
  ).catch((error) => {
    console.error("Error:", error);
  });
}

export async function getCart(userId: number) {
  return await fetch(apiUrl + "/cart/get/" + userId)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}
