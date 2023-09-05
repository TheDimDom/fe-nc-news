import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "../Styles/App.css";
import Header from "./Header";
import Nav from "./Nav";
import ArticleList from "./ArticleList";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/Home" element={<ArticleList />} />
      </Routes>
    </>
  );
}

export default App;
