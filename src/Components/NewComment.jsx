import { useState, useEffect } from "react";
import { postAComment } from "../api/api.js";

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
    <div>
      {isCommentPosted && <p>Comment posted successfully!</p>}
      {isError && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewComment;
