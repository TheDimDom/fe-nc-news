import ArticleCard from "./ArticleCard";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getArticlesByTopic } from "../assets/Requests/api";

const ArticleList = ({ articles, setArticles, sort_by, order }) => {
  const { topicSlug } = useParams();

  useEffect(() => {
    getArticlesByTopic(topicSlug, sort_by, order)
      .then((response) => {
        setArticles(response.data.rows);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, [topicSlug, sort_by, order]);
  console.log(sort_by);
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
