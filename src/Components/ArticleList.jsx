import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles, getTopics } from "../assets/Requests/api";
import { useParams } from "react-router-dom";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [validTopics, setValidTopics] = useState([]);
  const { topicSlug } = useParams();
  const isValidTopic = validTopics.includes(topicSlug);
  const filteredArticlesByTopic = articles.filter(
    (article) => article.topic === topicSlug
  );

  useEffect(() => {
    getTopics().then((response) => {
      setValidTopics(response.data);
    });
    getArticles()
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.log("Error fetching categories", error);
      });
  }, []);

  return (
    <div className="ArticleList">
      <h2>Articles</h2>
      {isValidTopic
        ? filteredArticlesByTopic.map((article) => (
            <div key={article.article_id} className="center-text">
              <ArticleCard article={article} />
            </div>
          ))
        : articles.map((article) => (
            <div key={article.article_id} className="center-text">
              <ArticleCard article={article} />
            </div>
          ))}
    </div>
  );
};

export default ArticleList;
