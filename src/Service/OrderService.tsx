import { apiUrl } from "../constant/constant";

export async function getOrder(userId: number) {
  return await fetch(apiUrl + "/order/get/" + userId)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function deleteOrder(orderId: number) {
  return await fetch(apiUrl + "/order/delete/" + orderId, {
    method: "DELETE",
  }).catch((error) => {
    console.error("Error:", error);
  });
}

export async function deleteOrderItem(orderId: number) {
  return await fetch(apiUrl + "/order/deleteItem/" + orderId, {
    method: "DELETE",
  }).catch((error) => {
    console.error("Error:", error);
  });
}

export async function getAllOrder() {
  return await fetch(apiUrl + "/order/getAll", { method: "GET" })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}
