import React from "react";
import { Link } from "react-router-dom";
import TopicList from "./TopicList";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <TopicList />
    </nav>
  );
}

export default Nav;
