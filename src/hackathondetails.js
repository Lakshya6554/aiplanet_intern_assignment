import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useFetch from "./usefetch";
import img from "./assets/Figma ipsum.png";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Popup from "./popup";
// import { useNavigate } from "react-router-dom";

const HackathonDetails = () => {
  const [Buttonpopup, setButtonpopup] = useState(false);
  const navigate = useNavigate();
  // const [favorites, setFavorites] = useState([]);
  const routeChange = () => {
    let path = `/edit/${hackathons.id}`;
    navigate(path);
  };
  const { id } = useParams();
  const {
    data: hackathons,
    error,
    ispending1,
  } = useFetch("http://localhost:8000/hackathons/" + id);
  const { data: favourites } = useFetch(
    "http://localhost:8000/favourites/" + id
  );
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [dayuploaded, setDayuploaded] = useState("");
  const [daysAgo, setDaysago] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [gitlink, setGitlink] = useState("");
  const [otherlink, setOtherlink] = useState("");
  const [ispending, setispending] = useState("false");
  const addtofav = (e) => {
    e.preventDefault();
    const postDate = new Date();
    const favourites = {
      title: hackathons.title,
      summary: hackathons.summary,
      description: hackathons.description,
      name: hackathons.name,
      image: hackathons.image,
      dayuploaded: postDate.toISOString(),
      daysAgo: Math.round(
        (Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24)
      ),
      startdate: hackathons.startdate,
      enddate: hackathons.enddate,
      gitlink: hackathons.gitlink,
      otherlink: hackathons.otherlink,
    };
    setispending(true);
    //to make a post request
    fetch("http://localhost:8000/favourites/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(favourites),
    }).then(() => {
      alert("added Hackathon added to fav");
      setispending(false);
      // navigate("/");
    });
  };

  // const navigate = useNavigate();
  const handleClick = () => {
    setButtonpopup(true);
  };

  return (
    <div className="container">
      {ispending && <div>Loading........</div>}
      {error && <div>{error}</div>}
      {hackathons && (
        <article>
          <div className="home-div">
            <div className="title3">
              <span>
                <img src={hackathons.image} className="sat" alt="" />
                <span>
                  <h2 className="heading">{hackathons.title}</h2>
                </span>
              </span>
              {/* <h2 className="heading">{hackathons.title}</h2> */}
              {/* <button></button> */}
              <span id="a89">
                <button onClick={routeChange}>
                  <EditIcon /> Edit
                </button>
                {/* </Link> */}
                <button onClick={handleClick}>
                  <DeleteIcon /> Delete
                </button>
                <Popup
                  props={hackathons}
                  trigger={Buttonpopup}
                  setTrigger={setButtonpopup}
                >
                  <h3>My popup</h3>
                </Popup>
              </span>
              <p className="para">{hackathons.summary}</p>
              <br />
              <StarOutlineIcon onClick={addtofav} />
              <button className="date-btn">
                <CalendarTodayIcon />
                {hackathons.startdate}
              </button>
            </div>
            <div className="a">
              <span className="ax">Description</span>
              <p className="descrip">{hackathons.description}</p>
              <span className="op">Hackathon</span>
              <strong>
                <span className="op1">{hackathons.name}</span>
              </strong>
              <span className="date-span">
                {hackathons.startdate}-{hackathons.enddate}
              </span>
              <span className="btn-span">
                <button className="git-btn" to={hackathons.gitlink}>
                  <GitHubIcon />
                  Github Repository
                </button>
                <button className="oth-btn" to={hackathons.otherlink}>
                  <OpenInNewIcon /> Other Link
                </button>
              </span>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default HackathonDetails;
