import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../assets/Requests/api";
import CommentCard from "./CommentCard";

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(articleId)
      .then((response) => {
        setArticle(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [articleId]);

  useEffect(() => {
    setIsLoading(true);
    getCommentsByArticleId(articleId).then((response) => {
      setComments(response.data);
      setIsLoading(false);
    });
  }, [articleId]);

  return (
    <div className="ArticleDetail">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong!</p>}

      {article && (
        <>
          <h2>{article.title}</h2>
          {article.article_img_url && (
            <img
              src={article.article_img_url}
              alt={`Image for ${article.title}`}
            />
          )}
          <p>Topic: {article.topic}</p>
          <p>Author: {article.author}</p>
          <p>{article.body}</p>
          <p>Created_at: {article.created_at}</p>
          <p>Votes: {article.votes}</p>
        </>
      )}

      {comments && comments.length > 0 && (
        <>
          <h3 className="CommentsTitle">Comments</h3>
          {comments.map((comment) => (
            <CommentCard comment={comment} key={comment.comment_id} />
          ))}
        </>
      )}
    </div>
  );
};
export default ArticleDetail;
