import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../assets/Requests/api";

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    getArticleById(articleId)
      .then((response) => {
        setArticle(response.data);
      })
      .catch((error) => {
        console.log("Error fetching article", error);
      });
  }, [articleId]);

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <div className="ArticleDetail">
      <h2>{article.title}</h2>
      {article.article_img_url && (
        <img src={article.article_img_url} alt={`Image for ${article.title}`} />
      )}
      <p>Topic: {article.topic}</p>
      <p>Author: {article.author}</p>
      <p>{article.body}</p>
      <p>Created_at: {article.created_at}</p>
      <p>Votes: {article.votes}</p>
    </div>
  );
};

export default ArticleDetail;
