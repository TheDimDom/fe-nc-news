import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticles, getTopics } from "../../api/api";
import ArticleFilters from "./ArticleFilters";
import ArticleCard from "./ArticleCard";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [validTopics, setValidTopics] = useState([]);
  const [searchParams] = useSearchParams();
  const sort_by = searchParams.get("sort_by");
  const order = searchParams.get("order");

  useEffect(() => {
    if (location.pathname === "/") {
      getArticles(undefined, sort_by, order)
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
    <Grid container spacing={4}>
      <Grid item xs={12}>
          <ArticleFilters />
			</Grid>
      {articles.map((article) => (
        <Grid key={article.article_id} item xs={12} sm={12} md={3}>
          <ArticleCard article={article} />
        </Grid>
      ))}
    </Grid>
  );
}
