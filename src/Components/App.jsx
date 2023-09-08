import { useState, useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import "../Styles/App.css";
import Header from "./Header";
import Nav from "./Nav";
import ArticleList from "./ArticleList";
import ArticleDetail from "./ArticleDetail";
import TopicList from "./TopicList";
import ErrorPage from "./ErrorPage";
import { getArticles, getTopics } from "../assets/Requests/api";

function App() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [validTopics, setValidTopics] = useState([]);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    if (location.pathname === "/") {
      getArticles()
        .then((response) => {
          setArticles(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories", error);
        });
    }
    getTopics().then((response) => {
      setValidTopics(response.data);
    });
  }, [location]);

  const handleSortChange = (newSortBy) => {
    setSearchParams({ sort_by: newSortBy, order });
    navigate(`?sort_by=${newSortBy}&order=${order}`);
  };
  const handleOrderChange = (newOrder) => {
    setSearchParams({ sort_by, order: newOrder });
    navigate(`?sort_by=${sort_by}&order=${newOrder}`);
  };

  return (
    <>
      <Header />
      <Nav />
      <TopicList topics={validTopics} />
      <div>
        <div>
          <label>Sort by:</label>
          <select
            value={sort_by}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="created_at">Date</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
          </select>
        </div>
        <div>
          <label>Order:</label>
          <select
            value={order}
            onChange={(e) => handleOrderChange(e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<ArticleList articles={articles} />} />
        <Route path="/Home" element={<ArticleList articles={articles} />} />
        <Route path="/articles/:articleId" element={<ArticleDetail />} />
        <Route
          path="/topics/:topicSlug"
          element={
            <ArticleList
              articles={articles}
              setArticles={setArticles}
              isTopicsPage
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;

// /:sort_by/:order
// sort_by={sort_by}
// order={order}
