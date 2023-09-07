import { useState, useEffect } from "react";
import { postAComment } from "../assets/Requests/api";

const NewComment = ({ article_id, setComments, comments }) => {
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("jessjelly");

  useEffect(() => {
    setUsername("jessjelly");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setComments((prevState) => {
      return [
        {
          body: comment,
          votes: 0,
          author: "jessjelly",
          created_at: new Date().toISOString(),
        },
        ...prevState,
      ];
    });
    setComment('');
    postAComment(article_id, username, comment).then((newComment) => {
      setComments((currComments) => {
        return [...currComments];
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
