import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const ArticleCard = ({ article }) => {
  const { title, topic, author, created_at, article_img_url, article_id } =
    article;
  const navigate = useNavigate();
  const articleDetailURL = `/articles/${article_id}`;

  const handleClick = () => {
    navigate(articleDetailURL);
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", boxShadow: "10px 10px 6px rgba(0, 0, 0, 0.1)"}}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          sx={{ height: 350, overflow: "hidden" }}
          image={article_img_url}
          title={`Image for ${title}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author: {author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {format(new Date(created_at), "dd/MM/yyyy")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ArticleCard;
