import axios from "axios";

const API_BASE_URL = `https://nc-news-bbq4.onrender.com`;

export const getArticles = () => {
  return axios.get(`${API_BASE_URL}/api/articles`);
};

export const getArticleById = (article_id) => {
  return axios.get(`${API_BASE_URL}/api/articles/${article_id}`);
};

export const getCommentsByArticleId = (article_id) => {
  return axios.get(`${API_BASE_URL}/api/articles/${article_id}/comments`);
};

export const patchArticleVotes = (article_id, votes) => {
  return axios.patch(`${API_BASE_URL}/api/articles/${article_id}`, {
    inc_votes: votes,
  });
};

export const postAComment = (article_id, username, body) => {
  return axios.post(`${API_BASE_URL}/api/articles/${article_id}/comments`, {
    username,
    body,
  });
};

export const getTopics = () => {
  return axios.get(`${API_BASE_URL}/api/topics`);
};

export const getArticlesByTopic = (topic, sort_by, order) => {
  return axios.get(
    `${API_BASE_URL}/api/articles?topic=${topic}&sort_by=${sort_by}&order=${order}`
  );
};
