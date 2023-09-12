import { Select, InputLabel, FormGroup, MenuItem } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export default function ArticleFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort_by = searchParams.get("sort_by");
  const order = searchParams.get("order");

  const handleSortChange = (newSortBy) => {
    setSearchParams({ sort_by: newSortBy, ...order });
    navigate(`?sort_by=${newSortBy}&order=${order}`);
  };

  const handleOrderChange = (newOrder) => {
    setSearchParams({ ...sort_by, order: newOrder });
    navigate(`?sort_by=${sort_by}&order=${newOrder}`);
  };

  return (
    <FormGroup fullWidth>
      <InputLabel id="sort-by">Sort By</InputLabel>
      <Select
        labelId="sort-by"
        id="sort-by"
        value={sort_by || ""}
        label="Sort By"
        onChange={handleSortChange}
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
        onChange={handleOrderChange}
      >
        <MenuItem value="asc">Ascend</MenuItem>
        <MenuItem value="desc">Descend</MenuItem>
      </Select>
    </FormGroup>
  );
}
