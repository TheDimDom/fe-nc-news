import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Articles from "./Articles";
import ArticleDetail from "./Articles/ArticleDetail";
import TopicList from "./TopicList";
import ErrorPage from "./ErrorPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import darkTheme from "../darkTheme";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const [validTopics, setValidTopics] = useState([]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header />
      <Nav />

      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Articles />} />
        <Route path="/Home" element={<Articles />} />
        <Route path="/articles/:articleId" element={<ArticleDetail />} />
        <Route path="/topics/:topicSlug" element={<Articles />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
