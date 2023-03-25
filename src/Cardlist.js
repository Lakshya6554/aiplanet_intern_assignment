import { useState } from "react";
import { Link } from "react-router-dom";
import img from "./assets/AI Planet Logo.png";

const CardList = ({ hackathons, searchdata }) => {
  const hackathonList = Array.isArray(hackathons)
    ? hackathons
    : Array.from(hackathons);

  // Sort the hackathonList by daysAgo
  hackathonList.sort((a, b) => a.daysAgo - b.daysAgo);

  return (
    <div>
      {hackathonList
        ?.filter((hackathonList) => {
          return searchdata.toLowerCase() === ""
            ? hackathonList
            : hackathonList.title.toLowerCase().includes(searchdata);
        })
        .map((hackathons) => {
          return (
            <div className="cards" key={hackathons.id}>
              <Link className="card-text" to={`/hackathons/${hackathons.id}`}>
                <span>
                  <img id="card-image" src={hackathons.image} alt="" />
                </span>
                <span>
                  {" "}
                  <h2 className="card-title">{hackathons.title}</h2>
                </span>
                <p> {hackathons.summary}</p>
              </Link>
              <span>Uploaded {hackathons.daysAgo} days ago</span>
            </div>
          );
        })}
    </div>
  );
};

export default CardList;
