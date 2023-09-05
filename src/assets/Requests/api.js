import axios from "axios";

const API_BASE_URL = `https://nc-news-bbq4.onrender.com`;

export const getArticles = () => {
  return axios.get(`${API_BASE_URL}/api/articles`);
};
