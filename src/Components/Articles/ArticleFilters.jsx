import {
  Select,
  InputLabel,
  MenuItem,
  Box,
  Popover,
  IconButton,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useSearchParams } from "react-router-dom";

export default function ArticleFilters({ setQuery, topics }) {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic");
  const sort_by = searchParams.get("sort_by");
  const order = searchParams.get("order");

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <FilterListIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box p={2}>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <InputLabel id="topic">Topic</InputLabel>
              <Select
                sx={{ width: "10rem" }}
                labelId="topic"
                id="topic"
                value={topic || ""}
                onChange={(e) => setQuery("topic", e.target.value)}
              >
                {topics.map((topic) => (
                  <MenuItem key={topic.slug} value={topic.slug}>
                    {topic.slug}
                  </MenuItem>
                ))}
              </Select>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <InputLabel id="sort-by">Sort By</InputLabel>
              <Select
                sx={{ width: "10rem" }}
                labelId="sort-by"
                id="sort-by"
                value={sort_by || ""}
                onChange={(e) => setQuery("sort_by", e.target.value)}
              >
                <MenuItem value="created_at">Date</MenuItem>
                <MenuItem value="comment_count">Comment Count</MenuItem>
                <MenuItem value="votes">Votes</MenuItem>
              </Select>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <InputLabel id="order">Order By</InputLabel>
              <Select
                sx={{ width: "10rem" }}
                labelId="order"
                id="order"
                value={order || ""}
                onChange={(e) => setQuery("order", e.target.value)}
              >
                <MenuItem value="asc">Ascend</MenuItem>
                <MenuItem value="desc">Descend</MenuItem>
              </Select>
            </Stack>
          </Stack>
        </Box>
      </Popover>
    </Box>
  );
}
