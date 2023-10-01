import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Shared/Header";
import Articles from "./Articles";
import ArticleDetail from "./Article";
import ErrorPage from "./Shared/ErrorPage";
import CssBaseline from "@mui/material/CssBaseline";
import ToggleColorMode from "./Shared/ToggleColorMode";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Shared/Theme";

function App() {
  const [validTopics, setValidTopics] = useState([]);

  return (
    <ThemeProvider theme={theme} >
      <ToggleColorMode >
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Articles />} />
          <Route path="/Home" element={<Articles />} />
          <Route path="/articles/:articleId" element={<ArticleDetail />} />
          <Route path="/topics/:topicSlug" element={<Articles />} />
        </Routes>
      </ToggleColorMode>
    </ThemeProvider>
  );
}

export default App;
