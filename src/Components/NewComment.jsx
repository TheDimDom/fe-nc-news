import { useState, useEffect } from "react";
import { postAComment } from "../assets/Requests/api";

const NewComment = ({ article_id, setComments }) => {
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("jessjelly");

  useEffect(() => {
    setUsername("jessjelly");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    postAComment(article_id, username, comment).then((newComment) => {
      setComments((currComments) => {
        return [newComment, ...currComments];
      });
    });
  };

  return (
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
  );
};
export default NewComment;
