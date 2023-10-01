import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { patchArticleVotes, getArticleById } from "../../api/api.js";

const VoteCounter = ({ articleId, initialVotes }) => {
  const [currentVotes, setCurrentVotes] = useState(initialVotes);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(articleId)
      .then((response) => {
        setCurrentVotes(response.data.votes);
        setIsError(false);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [articleId]);

  const handleVote = (voteValue) => {
    const newVotes = currentVotes + voteValue;
    setCurrentVotes(newVotes);

    patchArticleVotes(articleId, voteValue)
      .then(() => {
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
        setCurrentVotes(currentVotes);
      });
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
      {isLoading && <CircularProgress size={20} />}
      {isError && (
        <Typography variant="body2" color="error">
          Error updating vote. Please try again.
        </Typography>
      )}
      {!isLoading && (
        <>
          <Typography variant="body2">Vote on the article: {currentVotes}</Typography>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleVote(1)}
            sx={{ ml: 1 }} 
          >
            Upvote
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleVote(-1)}
            sx={{ ml: 1 }}
          >
            Downvote
          </Button>
        </>
      )}
    </Box>
  );
};

export default VoteCounter;
