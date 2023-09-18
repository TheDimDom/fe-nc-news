import { Select, InputLabel, FormGroup, MenuItem } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export default function ArticleFilters({ setQuery, topics }) {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic");
  const sort_by = searchParams.get("sort_by");
  const order = searchParams.get("order");

  return (
    <FormGroup fullwidth="true">
      <InputLabel id="topic">Topic</InputLabel>
      <Select
        labelId="topic"
        id="topic"
        value={topic || ""}
        label="topic"
        onChange={(e) => setQuery("topic", e.target.value)}
      >
        {topics.map((topic) => {
          return (
            <MenuItem key={topic.slug} value={topic.slug}>
              {topic.slug}
            </MenuItem>
          );
        })}
      </Select>
      <InputLabel id="sort-by">Sort By</InputLabel>
      <Select
        labelId="sort-by"
        id="sort-by"
        value={sort_by || ""}
        label="Sort By"
        onChange={(e) => setQuery("sort_by", e.target.value)}
      >
        <MenuItem value="created_at">Date</MenuItem>
        <MenuItem value="comment_count">Comment Count</MenuItem>
        <MenuItem value="votes">Votes</MenuItem>
      </Select>
      <InputLabel id="order">Order By</InputLabel>
      <Select
        labelId="order"
        id="order"
        value={order || ""}
        label="order"
        onChange={(e) => setQuery("order", e.target.value)}
      >
        <MenuItem value="asc">Ascend</MenuItem>
        <MenuItem value="desc">Descend</MenuItem>
      </Select>
    </FormGroup>
  );
}
