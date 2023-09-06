import { useState, useEffect } from "react";
import { patchArticleVotes, getArticleById } from "../assets/Requests/api";

const VoteCounter = ({ articleId, initialVotes }) => {
  const [currentVotes, setCurrentVotes] = useState(initialVotes);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(articleId)
      .then((response) => {
        setCurrentVotes(response.data.article.votes);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [articleId, currentVotes]);

  const handleVote = (voteValue) => {
    const newVotes = currentVotes + voteValue;
    setCurrentVotes(newVotes);

    const requestBody = { inc_votes: voteValue };
    patchArticleVotes(articleId, requestBody)
      .then(() => {
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
        setCurrentVotes(currentVotes);
      });
  };

  return (
    <div className="Votes">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error updating vote. Please try again.</p>}
      {!isLoading && (
        <>
          <p>Votes: {currentVotes}</p>
          <button onClick={() => handleVote(1)}>Upvote</button>
          <button onClick={() => handleVote(-1)}>Downvote</button>
        </>
      )}
    </div>
  );
};

export default VoteCounter;
