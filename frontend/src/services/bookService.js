import api from "./api";

const getBooks = async (params = {}) => {
  const res = await api.get("/books", { params });
  return res.data.data;
};

const getBook = async (id) => {
  const res = await api.get(`/books/${id}`);
  return res.data.data;
};

const addBook = async (data) => {
  const res = await api.post("/books", data);
  return res.data.data;
};

const updateBook = async (id, data) => {
  const res = await api.put(`/books/${id}`, data);
  return res.data.data;
};

const deleteBook = async (id) => {
  const res = await api.delete(`/books/${id}`);
  return res.data.data;
};

export default { getBooks, getBook, addBook, updateBook, deleteBook };
