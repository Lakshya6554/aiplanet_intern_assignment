import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import useFetch from "./usefetch";
import CardList from "./Cardlist";

const Home = () => {
  const { data, isPending, error } = useFetch(
    "http://localhost:8000/hackathons"
  );
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [activeButton, setActiveButton] = useState(null);

  const handleSort = (e) => {
    setSort(e.target.value);
  };
  console.log(sort);
  const sortData = (hackathons) => {
    console.log("sorting data", hackathons);
    if (sort === "Newest") {
      const sorted = [...hackathons].sort((a, b) => b.daysAgo - a.daysAgo);
      console.log("sorted data", sorted);
      return sorted;
    } else if (sort === "Oldest") {
      const sorted = [...hackathons].sort((a, b) => a.daysAgo - b.daysAgo);
      console.log("sorted data", sorted);
      return sorted;
    }
    return hackathons;
  };

  console.log(sortData);
  return (
    <div className="container">
      <div className="home-div">
        <div className="title">
          <h1 className="heading">Hackathon Submissions</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci
            quas atque id nobis suscipit totam eligendi, nihil velit nostrum
            odio repellat nemo accusantium officia dolorum esse incidunt
            corporis fuga at! Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Omnis distinctio magni dicta cumque non. Quisquam
            eligendi, illum omnis, minus culpa consequatur at excepturi
            repellendus quidem corporis nihil maxime aliquam cum.
          </p>
          <Link to="/submission">
            {" "}
            <button className="submission-btn">Upload Submission</button>
          </Link>
        </div>
      </div>
      <div className="a">
        <Link to="/">
          <button
            className={`x1 ${activeButton === "all" ? "active" : ""}`}
            onClick={() => setActiveButton("all")}
          >
            All Submissions
          </button>
        </Link>
        <Link to="/favourite">
          <button
            className={`x2 ${activeButton === "favourites" ? "active" : ""}`}
            onClick={() => setActiveButton("favourites")}
          >
            Favourite Submissions
          </button>
        </Link>

        <span className="a123">
          <button>
            <SearchIcon style={{ aligntext: "center" }} />
            <input
              type="text"
              className="search-text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </button>
          <select value={sort} onChange={handleSort}>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </span>
      </div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && (
        <div className="on">
          <CardList hackathons={sortData(data)} searchdata={search} />
        </div>
      )}
    </div>
  );
};

export default Home;
