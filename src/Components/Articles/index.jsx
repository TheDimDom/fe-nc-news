import { Grid, Box } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticles, getTopics } from "../../api/api";
import ArticleFilters from "./ArticleFilters";
import ArticleCard from "./ArticleCard";
import Nav from "../Shared/Nav";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [validTopics, setValidTopics] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic");
  const sort_by = searchParams.get("sort_by");
  const order = searchParams.get("order");

  const setQuery = useCallback(
    (key, value) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, value);

      if (value === "") {
        newSearchParams.delete(key);
      }

      setSearchParams(newSearchParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  useEffect(() => {
    getArticles(topic, sort_by, order)
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
    getTopics().then((response) => {
      setValidTopics(response.data);
    });
  }, [searchParams]);

  return (
    <>
      <Grid container spacing={1} direction="row">
        <Grid item xs={12} md={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Nav />
            <ArticleFilters setQuery={setQuery} topics={validTopics} />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {articles &&
          articles.map((article) => (
            <Grid key={article.article_id} item xs={12} sm={12} md={3}>
              <ArticleCard article={article} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}
