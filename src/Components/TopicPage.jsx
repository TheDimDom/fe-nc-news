import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticlesByTopic } from "../assets/Requests/api";

function TopicPage() {
  const { topicSlug } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getArticlesByTopic(topicSlug)
      .then((response) => {
        setArticles(response.data.rows)
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles by topic:", error);
        setError("Failed to fetch articles. Please try again later.");
        setIsLoading(false);
      });
  }, [topicSlug]);

  return (
    <div>
      <h2>Articles related to {topicSlug}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.article_id}>
              <a href={`/articles/${article.article_id}`}>{article.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TopicPage;
