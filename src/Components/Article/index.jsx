import React, { useState, useEffect } from "react";
import { Paper, Box, Grid, Typography } from "@mui/material";
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
        setComments(comments);
      });
  };

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
          mx: 6,
          p: 4,
        }}
      >
        <Grid
          container
          spacing={1}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          {isLoadingArticle && <CircularProgress />}
          {isError && (
            <Typography>
              Something went wrong while fetching article data.
            </Typography>
          )}

          {article && (
            <>
              <Grid item xs={12} sx={{ p: 3 }}>
                <Typography variant="h3">{article.title}</Typography>
              </Grid>
              <Grid item xs={12}>
                {article.article_img_url && (
                  <Box
                    component="img"
                    sx={{
                      height: "40rem",
                      width: "60rem",
                    }}
                    alt={`${article.title}-image`}
                    src={article.article_img_url}
                  />
                )}
              </Grid>

              <Grid
                item
                xs={12}
                container
                alignItems="center"
                justifyContent="center"
                py={3}
                style={{ textAlign: "center" }}
              >
                <Box>
                  <Typography>{article.body}</Typography>
                  <Typography>Author: {article.author}</Typography>
                  <Typography>
                    Created_at:{" "}
                    {format(new Date(article.created_at), "dd/MM/yyyy")}
                  </Typography>
                  <VoteCounter
                    initialVotes={article.votes}
                    articleId={article.article_id}
                  />
                </Box>
              </Grid>
            </>
          )}

          {isLoadingComments && <CircularProgress />}
          {isError && (
            <Typography>
              Something went wrong while fetching comments.
            </Typography>
          )}
          {!isLoadingComments && comments && comments.length === 0 ? (
            <Typography>No comments yet for this article.</Typography>
          ) : (
            <>
              <Typography variant="h3">Comments</Typography>
              {article && (
                <NewComment
                  comments={comments}
                  z
                  article_id={article.article_id || 0}
                  setComments={setComments}
                />
              )}

              {comments.map((comment, index) => (
                <Box key={`${comment.comment_id} foo ${index}`}>
                  <CommentCard comment={comment} handleDelete={handleDelete} />
                </Box>
              ))}
            </>
          )}
        </Grid>
      </Paper>
    </>
  );
};

export default ArticleDetail;
