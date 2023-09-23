import React from "react";
import { format } from "date-fns";
import { Box, Button, Typography } from "@mui/material";


const CommentCard = ({ comment, handleDelete }) => {
  const { author, body, created_at, votes, comment_id } = comment;

  return (
    <Box>
      <Typography>{body}</Typography>
      <Typography>Votes: {votes}</Typography>
      <Typography>Author: {author}</Typography>
      <Typography>
        Created_at: {format(new Date(created_at), "dd/MM/yyyy")}
      </Typography>
      <Button onClick={() => handleDelete(comment_id)}>Delete</Button>
    </Box>
  );
};
export default CommentCard;
