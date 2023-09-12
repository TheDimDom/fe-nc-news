import React, { useState, useEffect } from "react";
import { Paper, Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../../api/api.js";
import CommentCard from "../Comments/CommentCard";
import VoteCounter from "../VoteCounter.jsx";
import NewComment from "../NewComment.jsx";
import CircularProgress from "@mui/material/CircularProgress";

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
                    height: "50rem",
                    width: "70rem",
                  }}
                  alt={`${article.title}-image`}
                  src={article.article_img_url}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography>Topic: {article.topic}</Typography>
              <Typography>Author: {article.author}</Typography>
              <Typography>{article.body}</Typography>
              <Typography>Created_at: {article.created_at}</Typography>
              <VoteCounter
                initialVotes={article.votes}
                articleId={article.article_id}
              />
            </Grid>
          </>
        )}

        {isLoadingComments && <CircularProgress />}
        {isError && (
          <Typography>Something went wrong while fetching comments.</Typography>
        )}
        {!isLoadingComments && comments && comments.length === 0 ? (
          <Typography>No comments yet for this article.</Typography>
        ) : (
          <>
            <Typography variant="h3">Comments</Typography>
            {article && (
              <NewComment
                comments={comments}
                article_id={article.article_id || 0}
                setComments={setComments}
              />
            )}

            {comments.map((comment, index) => (
              <Box key={`${comment.comment_id} foo ${index}`}>
                <CommentCard comment={comment} />
              </Box>
            ))}
          </>
        )}
      </Grid>
    </Paper>
  );
};

export default ArticleDetail;
