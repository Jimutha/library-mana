// helpers.js

// format a date to something like: Jan 01, 2025
export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// calculate due date by adding days
export const calculateDueDate = (days) => {
  const now = new Date();
  now.setDate(now.getDate() + days);
  return now;
};

// shorten long text (used in cards)
export const truncateText = (text, length = 100) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};
