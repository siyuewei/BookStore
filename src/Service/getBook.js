export async function getBook(id) {
  return await fetch("/api/book/" + id.toString(), {
    method: "GET",
  })
    .then((res) => res.json)
    .catch((err) => console.log(err));
}
