// src/services/memberService.js
import api from "./api";

const getAllMembers = async () => {
  const res = await api.get("/members");
  return res.data;
};

const getMemberById = async (id) => {
  const res = await api.get(`/members/${id}`);
  return res.data;
};

const createMember = async (data) => {
  const res = await api.post("/members", data);
  return res.data;
};

const updateMember = async (id, data) => {
  const res = await api.put(`/members/${id}`, data);
  return res.data;
};

const deleteMember = async (id) => {
  const res = await api.delete(`/members/${id}`);
  return res.data;
};

export default {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
