import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import useFetch from "./usefetch";
import CardList from "./Cardlist";

const Home = () => {
  const { data, ispending, error } = useFetch(
    "http://localhost:8000/hackathons"
  );
  console.log(data);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [activeButton, setActiveButton] = useState(null);

  // const [data, setData] = useState(null);

  const handleSort = (e) => {
    // setSort(e.target.value);
    // if (e.target.value === "newest") {
    //   setData([...data].sort((a, b) => new Date(b.date) - new Date(a.date)));
    // } else if (e.target.value === "oldest") {
    //   setData([...data].sort((a, b) => new Date(a.date) - new Date(b.date)));
    // }
  };

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
            <option value="">Sort by</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </span>
      </div>
      <div>{data && <CardList hackathons={data} searchdata={search} />}</div>
      {/* <div>
        {data && (
          <CardList hackathons={favouritehackathon} searchdata={search} />
        )}
      </div> */}
    </div>
  );
};

export default Home;
