import React, { useEffect, useState, useCallback } from "react";
import { Grid, Box, Pagination, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { getArticles, getTopics } from "../../api/api";
import ArticleFilters from "./ArticleFilters";
import ArticleCard from "./ArticleCard";
import Nav from "../Shared/Nav";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [validTopics, setValidTopics] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

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
        console.error("Error fetching articles", error);
      });

    getTopics().then((response) => {
      setValidTopics(response.data);
    });
  }, [searchParams, topic, sort_by, order]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedArticles = articles.slice(startIndex, endIndex);

  return (
    <>
      <Grid container spacing={1} direction="row">
        <Grid item xs={12} md={12}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Nav />
            <ArticleFilters setQuery={setQuery} topics={validTopics} />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ padding: 2}}>
        {paginatedArticles &&
          paginatedArticles.map((article) => (
            <Grid key={article.article_id} item xs={12} sm={12} md={4}>
              <ArticleCard article={article} />
            </Grid>
          ))}
      </Grid>
      <Box mt={3} display="flex" justifyContent="center">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(articles.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"

          />
        </Stack>
      </Box>
    </>
  );
}
