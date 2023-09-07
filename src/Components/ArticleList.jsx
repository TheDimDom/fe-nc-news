import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../assets/Requests/api";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
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
      {articles.map((article) => (
        <div key={article.article_id} className="center-text">
          <ArticleCard article={article} />
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
