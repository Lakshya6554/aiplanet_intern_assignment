import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "./usefetch";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getDownloadURL } from "firebase/storage";
const EditHackathon = () => {
  const { id } = useParams();
  const {
    data: hackathons,
    error,
    ispending,
  } = useFetch("http://localhost:8000/hackathons/" + id);
  const navigate = useNavigate();

  const [title, setTitle] = useState(hackathons?.title || "");
  const [summary, setSummary] = useState(hackathons?.summary || "");
  const [description, setDescription] = useState(hackathons?.description || "");
  const [name, setName] = useState(hackathons?.name || "");
  const [image, setImage] = useState(hackathons?.image || "");
  const [startdate, setStartdate] = useState(hackathons?.startdate || "");
  const [enddate, setEnddate] = useState(hackathons?.enddate || "");
  const [gitlink, setGitlink] = useState(hackathons?.gitlink || "");
  const [otherlink, setOtherlink] = useState(hackathons?.otherlink || "");
  useEffect(() => {
    setTitle(hackathons?.title);
    setSummary(hackathons?.summary);
    setDescription(hackathons?.description);
    setName(hackathons?.name);
    setImage(hackathons?.image);
    setStartdate(hackathons?.startdate);
    setEnddate(hackathons?.enddate);
    setGitlink(hackathons?.gitlink);
    setOtherlink(hackathons?.otherlink);
  }, [hackathons]);
  const firebaseConfig = {
    apiKey: "AIzaSyATqtAZ7hWppbl3WZb3-ZoWEYfdyvHdw7M",
    authDomain: "aiplanet-6e952.firebaseapp.com",
    projectId: "aiplanet-6e952",
    storageBucket: "aiplanet-6e952.appspot.com",
    messagingSenderId: "526298114045",
    appId: "1:526298114045:web:0df6740217cfd84a52db94",
    measurementId: "G-PW70EGQ4KB",
  }; // your Firebase config
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  if (!hackathons) {
    return <div>Loading...</div>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);
    const imageURL = await getDownloadURL(storageRef);

    const updatedHackathon = {
      title,
      summary,
      description,
      name,
      image: imageURL,
      startdate,
      enddate,
      gitlink,
      otherlink,
    };

    fetch("http://localhost:8000/hackathons/" + hackathons.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedHackathon),
    }).then(() => {
      navigate("/hackathons/" + hackathons.id);
    });
  };

  return (
    <div className="submission">
      <h1 className="text1">Edit Hackathon</h1>

      <span className="title1">Title</span>
      <input
        type="text"
        className="titleinput"
        required
        defaultValue={hackathons.title}
        placeholder="Title of your submission"
        onChange={(e) => setTitle(e.target.value)}
      />
      <span className="title1">Summary</span>
      <input
        type="text"
        className="titleinput"
        required
        defaultValue={hackathons.summary}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="A short summary of your submission (this will be visible with your submission)"
      />
      <span className="title1">Description</span>
      <textarea
        type="text"
        className="titledescription"
        required
        defaultValue={hackathons.description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write a long description of your project. You can describe your idea and approach here."
      />
      <span>Cover Image</span>
      <input
        type="file"
        required
        name="file"
        // defaultValue={hackathons.image}
        onChange={(e) => setImage(e.target.files[0])}
      />
      <span className="xy">Enter the name of Hackathon</span>
      <input
        type="text"
        className="titleinput"
        required
        defaultValue={hackathons.name}
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
            defaultValue={hackathons.startdate}
            required
            onChange={(e) => setStartdate(e.target.value)}
            placeholder="Select start date"
          />
          <input
            type="text"
            className="y"
            defaultValue={hackathons.enddate}
            required
            onChange={(e) => setEnddate(e.target.value)}
            placeholder="Select start date"
          />
        </div>
      </div>
      <span className="xy">GitHub Repository</span>
      <input
        type="text"
        className="titleinput"
        defaultValue={hackathons.gitlink}
        required
        onChange={(e) => setGitlink(e.target.value)}
        placeholder="Enter your submission’s public GitHub repository link"
      />
      <span className="xy">Other Links</span>
      <input
        type="text"
        className="titleinput"
        defaultValue={otherlink}
        onChange={(e) => setOtherlink(e.target.value)}
        placeholder="You can upload a video demo or URL of you demo app here."
      />
      <button type="submit" onClick={handleUpdate} className="submission-btn1">
        Update Submission
      </button>
    </div>
  );
};

export default EditHackathon;
