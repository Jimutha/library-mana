import api from "./api";

const getOverview = async () => {
  const res = await api.get("/analytics/overview");
  return res.data.data;
};

const getDueSoon = async (days = 3) => {
  const res = await api.get(`/analytics/due-soon?days=${days}`);
  return res.data.data;
};

export default { getOverview, getDueSoon };
