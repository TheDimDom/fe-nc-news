import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "../Styles/App.css";
import Header from "./Header";
import Nav from "./Nav";
import ArticleList from "./ArticleList";
import ArticleDetail from "./ArticleDetail";
import TopicPage from "./TopicPage";
import ErrorPage from "./ErrorPage";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<ArticleList />} />
        <Route path="/Home" element={<ArticleList />} />
        <Route path="/articles/:articleId" element={<ArticleDetail />} />
        <Route path="/topics/:topicSlug" element={<ArticleList />} />
      </Routes>
    </>
  );
}

export default App;
