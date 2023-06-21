// import dayjs from "dayjs";
// import React, { useEffect, useState } from "react";
// import {
//   DatePicker,
//   Image,
//   message,
//   Upload,
//   UploadFile,
//   UploadProps,
// } from "antd";
// import "../css/DataPicker.css";
// import Icon from "antd/es/icon";
// import { getImg, UploadImg } from "../Service/ImageService";
// import { apiUrl } from "../constant/constant";
//
// export function TestView() {
//   // const [fileList, setFileList] = useState<UploadFile[]>([]);
//   // const [, setUploading] = useState(false);
//   // const uploadProps: UploadProps = {
//   //   multiple: false,
//   //   beforeUpload: (file) => {
//   //     setFileList([file]);
//   //     return false;
//   //   },
//   //   fileList,
//   // };
//   // const ModUserAvatar = async (
//   //   user_id: number,
//   //   avatar: string
//   // ): Promise<Response> => {
//   //   let url = apiUrl + "/user/avatar";
//   //   let body = {
//   //     id: user_id,
//   //     avatar: avatar,
//   //   };
//   //   return await fetch(url, postJSONRequestInit(JSON.stringify(body)));
//   // };
//   // const handleUpload = async () => {
//   //   if (fileList.length === 0) {
//   //     message.error("请选择图片", 1);
//   //     return;
//   //   }
//   //   setUploading(true);
//   //   const response = await UploadImg(fileList[0]);
//   //   await ModUserAvatar(user.id, response.data.path);
//   //   setUploading(false);
//   //   setFileList([]);
//   // };
//
//   const [imageUrl, setImageUrl] = useState("");
//
//   useEffect(() => {
//     getImg("avatar1.png").then((res) => {
//       // 从后端获取到图像数据
//       console.log(res);
//       if (res === undefined) return;
//       const imageUrl = URL.createObjectURL(res!); // 创建 URL 对象
//       setImageUrl(imageUrl); // 设置图像URL
//     });
//   }, []);
//
//   return (
//     <>
//       <h1>TestView</h1>
//       {imageUrl && (
//         <img src={imageUrl} alt="Avatar" style={{ width: "100%" }} />
//       )}
//     </>
//   );
// }

import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { UploadImg } from "../Service/ImageService";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export function TestView() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleBeforeUpload = (file: UploadFile) => {
    // 发送文件到后端的逻辑
    // 使用fetch或axios等工具发送POST请求，将formData作为请求体发送到后端的上传接口

    // 示例使用fetch发送POST请求到后端上传接口
    UploadImg(file).then((res) => {
      console.log(res);
    });
    return false; // 阻止默认上传行为
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const [imageUrl, setImageUrl] = useState<string>();

  return (
    <>
      {/*<Upload*/}
      {/*  action="/upload" // 修改为后端接口的URL*/}
      {/*  listType="picture-card"*/}
      {/*  fileList={fileList}*/}
      {/*  onPreview={handlePreview}*/}
      {/*  onChange={handleChange}*/}
      {/*  beforeUpload={handleBeforeUpload} // 添加beforeUpload属性*/}
      {/*>*/}
      {/*  {fileList.length >= 8 ? null : uploadButton}*/}
      {/*</Upload>*/}

      <Upload
        name="/upload"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={handleBeforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>

      <Modal
        visible={previewOpen} // 将open修改为visible
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
}
