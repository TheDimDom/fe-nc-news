import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Shared/Header";
import Nav from "./Shared/Nav";
import Articles from "./Articles";
import ArticleDetail from "./Article";
// import TopicList from "./TopicList";
import ErrorPage from "./Shared/ErrorPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import darkTheme from "../darkTheme";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const [validTopics, setValidTopics] = useState([]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header />
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
