import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../assets/Requests/api";
import CommentCard from "./CommentCard";

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoadingArticle, setIsLoadingArticle] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isError, setIsError] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setIsLoadingArticle(true);
    getArticleById(articleId)
      .then((response) => {
        setArticle(response.data);
        setIsLoadingArticle(false);
      })
      .catch((error) => {
        setIsLoadingArticle(false);
        setIsError(true);
      });
  }, [articleId]);

  useEffect(() => {
    setIsLoadingComments(true);
    getCommentsByArticleId(articleId)
      .then((response) => {
        setComments(response.data);
        setIsLoadingComments(false);
      })
      .catch((error) => {
        setIsLoadingComments(false);
        setIsError(true);
      });
  }, [articleId]);

  return (
    <div className="ArticleDetail">
      {isLoadingArticle && <p>Loading article...</p>}
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

      {isLoadingComments && <p>Loading comments...</p>}
      {!isLoadingComments && comments && comments.length === 0 && (
        <p>No comments yet for this article.</p>
      )}

      {!isLoadingComments && comments && comments.length > 0 && (
        <>
          <h3>Comments</h3>
          {comments.map((comment) => (
            <CommentCard comment={comment} key={comment.comment_id} />
          ))}
        </>
      )}
    </div>
  );
};

export default ArticleDetail;
