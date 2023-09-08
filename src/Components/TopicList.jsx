import { useNavigate } from "react-router-dom";


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
