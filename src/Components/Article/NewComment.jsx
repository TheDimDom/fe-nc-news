import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  Button,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { postAComment } from "../../api/api";

const NewComment = ({ article_id, setComments, comments }) => {
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("jessjelly");
  const [isCommentPosted, setIsCommentPosted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setUsername("jessjelly");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!comment.trim()) {
      setIsError(true);
      setErrorMessage("Please enter a non-empty comment.");
      return;
    }

    setIsError(false);
    setErrorMessage("");

    const newComment = {
      body: comment,
      votes: 0,
      author: "jessjelly",
      created_at: new Date().toISOString(),
    };

    setComments((prevState) => [newComment, ...prevState]);
    setComment("");
    setIsCommentPosted(true);

    postAComment(article_id, username, comment)
      .then((response) => {
        const updatedComment = response.data;
        setComments((currComments) =>
          currComments.map((comment) =>
            comment.created_at === newComment.created_at
              ? updatedComment
              : comment
          )
        );
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
        setIsError(true);
        setErrorMessage("Failed to post the comment. Please try again later.");
        setComments((prevState) => prevState.filter((c) => c !== newComment));
      });
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isError && (
        <Typography variant="body1" color="error">
          {errorMessage}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
          <TextareaAutosize
            minRows={3}
            placeholder="Enter your comment..."
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
            style={{ width: "100%" }}
          />
        {isCommentPosted && (
          <Typography variant="body1" color="success">
            Comment posted successfully!
          </Typography>
        )}
        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default NewComment;
