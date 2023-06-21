import { apiUrl } from "../constant/constant";
import { UploadFile } from "antd";
import { RcFile } from "antd/es/upload";

export const UploadImg = async (
  file: UploadFile
): Promise<{
  msg: string;
  status: number;
  data: { path: string };
}> => {
  const url = `${apiUrl}/img/upload`;
  const body = new FormData();
  body.append("file", file as RcFile);
  return await fetch(url, {
    method: "POST",
    body: body,
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export async function getImg(imgName: string) {
  return await fetch(apiUrl + "/img/" + imgName, { method: "GET" })
    .then((response) => response.blob())
    .catch((error) => {
      console.error("Error:", error);
    });
}
