import { Link } from "react-router-dom";

function Nav() {
  const options = ["Home"];

  return (
    <nav>
      <ul>
        {options.map((option) => {
          return (
            <li key={option}>
              <Link to={`/${option}`}>{option}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Nav;
