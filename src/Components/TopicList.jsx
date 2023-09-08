import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTopics, getArticlesByTopic } from "../assets/Requests/api";

const TopicList = ({ topics }) => {
  const navigate = useNavigate();

  const handleTopicSelect = (topic) => {
    navigate(`/topics/${topic}`);
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
