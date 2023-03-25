import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Submission = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  // const [image, setImage] = useState("");
  const [dayuploaded, setDayuploaded] = useState("");
  const [daysAgo, setDaysago] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [gitlink, setGitlink] = useState("");
  const [otherlink, setOtherlink] = useState("");
  const [ispending, setispending] = useState("false");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const handlesubmit = (e) => {
    e.preventDefault();
    const postDate = new Date();
    const hackathon = {
      title,
      summary,
      description,
      name,
      image,
      dayuploaded: postDate.toISOString(),
      daysAgo: Math.round(
        (Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24)
      ),
      startdate,
      enddate,
      gitlink,
      otherlink,
    };
    setispending(true);
    //to make a post request
    fetch("http://localhost:8000/hackathons/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(hackathon),
    }).then(() => {
      alert("New hackathon added");
      setispending(false);
      navigate("/");
    });
  };

  return (
    <div className="submission">
      <h1 className="text1">New Hackathon Submission</h1>

      <span className="title1">Title</span>
      <input
        type="text"
        className="titleinput"
        value={title}
        placeholder="Title of your submission"
        onChange={(e) => setTitle(e.target.value)}
      />
      <span className="title1">Summary</span>
      <input
        type="text"
        className="titleinput"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="A short summary of your submission (this will be visible with your submission)"
      />

      <span className="title1">Description</span>
      <textarea
        type="text"
        className="titledescription"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write a long description of your project. You can describe your idea and approach here."
      />
      <span>Cover Image</span>
      <input type="file" name="file" />

      <span className="xy">Enter the name of Hackathon</span>
      <input
        type="text"
        className="titleinput"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter the name of the hackathon"
      />

      <div className="q">
        <span className="p">Hackathon Start Date</span>

        <span className="o">Hackathon End Date</span>
        <div>
          <input
            type="text"
            className="x"
            value={startdate}
            onChange={(e) => setStartdate(e.target.value)}
            placeholder="Select start date"
          />
          <input
            type="text"
            className="y"
            value={enddate}
            onChange={(e) => setEnddate(e.target.value)}
            placeholder="Select start date"
          />
        </div>
      </div>
      <span className="xy">GitHub Repository</span>
      <input
        type="text"
        className="titleinput"
        value={gitlink}
        onChange={(e) => setGitlink(e.target.value)}
        placeholder="Enter your submission’s public GitHub repository link"
      />
      <span className="xy">Other Links</span>
      <input
        type="text"
        className="titleinput"
        value={otherlink}
        onChange={(e) => setOtherlink(e.target.value)}
        placeholder="You can upload a video demo or URL of you demo app here."
      />
      <button type="submit" onClick={handlesubmit} className="submission-btn1">
        Upload Submission
      </button>
    </div>
  );
};

export default Submission;
