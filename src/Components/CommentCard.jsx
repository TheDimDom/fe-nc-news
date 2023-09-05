import React from "react";


const CommentCard = ({ comment }) => {
  const { author, body, created_at, votes,  } = comment;

  return (
    <div className="CommentCard">
      <p>{body}</p>
      <p>Votes: {votes}</p>
      <p>Author: {author}</p>
      <p>Created_at: {created_at}</p>
      
    </div>
  );
}
export default CommentCard;