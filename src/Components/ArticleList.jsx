import ArticleCard from "./ArticleCard";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getArticlesByTopic } from "../assets/Requests/api";

const ArticleList = ({
  articles,
  setArticles,
  isTopicsPage = false,
}) => {
  const { topicSlug } = useParams();

  useEffect(() => {
    isTopicsPage &&
      getArticlesByTopic(topicSlug)
        .then((response) => {
          setArticles(response.data.rows);
        })
        .catch((error) => {
          console.error("Error");
        });
  }, [topicSlug]);

  return (
    <div className="ArticleList">
      <h2>Articles</h2>
      {articles &&
        articles.map((article) => (
          <div key={article.article_id} className="center-text">
            <ArticleCard article={article} />
          </div>
        ))}
    </div>
  );
};

export default ArticleList;
