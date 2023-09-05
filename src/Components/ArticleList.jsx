import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../assets/Requests/api";
import axios from "axios";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles()
      .then((response) => {
        console.log(response, ",,,,,,,");
        setArticles(response.data);
      })
      .catch((error) => {
        console.log("Error fetching categories", error);
      });
  }, []);

  return (
    <div className="ArticleList">
      <h2>Articles</h2>
      {articles.map((article) => {
        return <ArticleCard article={article} key={article.article_id} />;
      })}
    </div>
  );
};

export default ArticleList;
