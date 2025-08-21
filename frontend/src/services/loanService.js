import api from "./api";

const borrowBook = async (bookId, memberId, durationDays) => {
  const res = await api.post("/loans", { bookId, memberId, durationDays });
  return res.data.data;
};

const returnBook = async (id) => {
  const res = await api.put(`/loans/${id}/return`);
  return res.data.data;
};

export default { borrowBook, returnBook };
