import React from "react";
import { format } from "date-fns";
import { Box, Button, Typography, Paper } from "@mui/material";

const CommentCard = ({ comment, handleDelete }) => {
  const { author, body, created_at, votes, comment_id } = comment;

  return (
    <Paper elevation={7} sx={{ p: 1, marginBottom: 1, margin: "0 auto", maxWidth: "70rem" }}>
      <Typography variant="body1">{body}</Typography>
      <Box sx={{ display: "flex", mt: 1 }}>
        <Typography variant="body2" sx={{ flex: 1 }}>
          Author: {author}
        </Typography>
        <Typography variant="body2">
          Created at: {format(new Date(created_at), "dd/MM/yyyy")}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(comment_id)}
        >
          Delete
        </Button>
      </Box>
    </Paper>
  );
};

export default CommentCard;
