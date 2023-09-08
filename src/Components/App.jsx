import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "../Styles/App.css";
import Header from "./Header";
import Nav from "./Nav";
import ArticleList from "./ArticleList";
import ArticleDetail from "./ArticleDetail";
import TopicList from "./TopicList";
import ErrorPage from "./ErrorPage";
import { getArticles, getTopics } from "../assets/Requests/api";

function App() {
  const [articles, setArticles] = useState([]);
  const [validTopics, setValidTopics] = useState([]);
  const location = useLocation();


  useEffect(() => {
    if(location.pathname === '/'){
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

  return (
    <>
      <Header />
      <Nav />
      <TopicList topics={validTopics} />
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
