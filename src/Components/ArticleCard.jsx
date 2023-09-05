const ArticleCard = ({ article }) => {
  const { title, topic, author, body, created_at, votes, article_img_url } = article;

  return (
    <div className="ArticleCard">
      <h3>{title}</h3>
      {article_img_url && <img src={article_img_url} alt={`Image for ${title}`} />}
      <div>
        <p>Topic: {topic}</p>
        <p>Author: {author}</p>
        <p>Body: {body}</p>
        <p>Created_at: {created_at}</p>
        <p>Votes: {votes}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
