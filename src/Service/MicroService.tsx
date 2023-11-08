import {microUrl} from "../constant/constant";

export async function getAuthorByBookName(bookName:String) {
    // console.log("Try to bookService");
    return await fetch(microUrl + "/book/getAuthorName?bookName=" + bookName, {
        method: "GET",
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
}