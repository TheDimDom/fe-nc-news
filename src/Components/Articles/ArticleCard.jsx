import React from "react";

const ArticleCard = ({ article }) => {
  const { title, topic, author, created_at, article_img_url, article_id } =
    article;

  const articleDetailURL = `/articles/${article_id}`;

  return (
    <a href={articleDetailURL} className="ArticleCard">
      <h3>{title}</h3>
      {article_img_url && (
        <img src={article_img_url} alt={`Image for ${title}`} />
      )}
      <div>
        <p>Topic: {topic}</p>
        <p>Author: {author}</p>
        <p>Created_at: {created_at}</p>
      </div>
    </a>
  );
};

export default ArticleCard;
