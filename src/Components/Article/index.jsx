import React, { useState, useEffect } from "react";
import { Paper, Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  getArticleById,
  getCommentsByArticleId,
  deleteComment,
} from "../../api/api.js";
import CommentCard from "./CommentCard.jsx";
import VoteCounter from "./VoteCounter.jsx";
import NewComment from "./NewComment.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { format } from "date-fns";
import Nav from "../Shared/Nav";

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoadingArticle, setIsLoadingArticle] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isError, setIsError] = useState(false);
  const [comments, setComments] = useState([]);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleDelete = (commentId) => {
    const newComments = comments.filter(
      (comment) => comment.comment_id !== commentId
    );

    setComments(newComments);

    deleteComment(commentId)
      .then(() => {
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
        setComments(newComments);
      });
  };

  useEffect(() => {
    setIsLoadingArticle(true);
    getArticleById(articleId)
      .then((response) => {
        setArticle(response.data);
        setIsLoadingArticle(false);
      })
      .catch(() => {
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
      .catch(() => {
        setIsLoadingComments(false);
        setIsError(true);
      });
  }, [articleId]);

  return (
    <>
      <Grid container spacing={1} direction="row">
        <Grid item xs={12} md={12}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Nav />
          </Box>
        </Grid>
      </Grid>
      <Paper
        sx={{
          mx: isSmallScreen ? 2 : 15,
          p: 4,
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {isLoadingArticle && (
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
          )}
          {isError && (
            <Grid item xs={12}>
              <Typography variant="body1" color="error">
                Something went wrong while fetching article data.
              </Typography>
            </Grid>
          )}

          {article && (
            <>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography variant="h3" sx={{ textDecoration: "underline", fontSize: isSmallScreen ? "2rem" : "3rem", paddingBottom: 3 }}>
                  {article.title}
                </Typography>
              </Grid>
              {article.article_img_url && (
                <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
                  <Box
                    component="img"
                    sx={{
                      height: isSmallScreen ? "100%" : "35rem",
                      width: isSmallScreen ? "100%" : "100%",
                      margin: "0 auto",
                    }}
                    alt={`${article.title}-image`}
                    src={article.article_img_url}
                  />
                </Grid>
              )}
              <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
                <Typography variant="body1" sx={{ fontSize: isSmallScreen ? "1rem" : "1.1rem", paddingTop: isSmallScreen ? "10rem" : "1rem" }}>
                  {article.body}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: isSmallScreen ? "0.5rem" : "0.9rem" }}>Author: {article.author}</Typography>
                <Typography variant="body1" sx={{ fontSize: isSmallScreen ? "0.4rem" : "0.8rem" }}>
                  Date: {format(new Date(article.created_at), "dd/MM/yyyy")}
                </Typography>
                <VoteCounter
                  initialVotes={article.votes}
                  articleId={article.article_id}
                  sx={{ fontSize: isSmallScreen ? "1rem" : "1.1rem" }}
                />
              </Grid>
            </>
          )}

          {isLoadingComments && (
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
          )}
          {isError && (
            <Grid item xs={12}>
              <Typography variant="body1" color="error">
                Something went wrong while fetching comments.
              </Typography>
            </Grid>
          )}
          {!isLoadingComments && comments && comments.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="h3">Comments</Typography>
              <Typography variant="body1">
                No comments yet for this article.
              </Typography>
            </Grid>
          ) : (
            <>
              <Grid item xs={12}>
                <Typography variant="h3" sx={{ textAlign: "center", justifyContent: "center" }}>Comments</Typography>
                {article && (
                  <NewComment
                    comments={comments}
                    article_id={article.article_id || 0}
                    setComments={setComments}
                  />
                )}
              </Grid>

              {comments.map((comment, index) => (
                <Grid
                  item
                  xs={12}
                  key={`${comment.comment_id}-${index}`}
                  sx={{ textAlign: "center", justifyContent: "center" }}
                >
                  <CommentCard comment={comment} handleDelete={handleDelete} />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Paper>
    </>
  );
};

export default ArticleDetail;
