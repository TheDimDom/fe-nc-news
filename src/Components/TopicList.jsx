import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTopics, getArticlesByTopic } from "../assets/Requests/api";

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  console.log(selectedTopic);
  useEffect(() => {
    getTopics()
      .then((response) => {
        setTopics(response.data);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
      });
  }, []);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    getArticlesByTopic(topic)
      .then((response) => {
        setArticles(response.data.rows);
        navigate(`/topics/${topic}`);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  };

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <button onClick={() => handleTopicSelect(topic.slug)}>
              {topic.slug}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicList;
