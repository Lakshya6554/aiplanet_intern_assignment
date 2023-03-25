import "./App.css";
import Navbar1 from "./navbar";
import Home from "./home";
import Submission from "./Submission";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HackathonDetails from "./hackathondetails";
import EditHackathon from "./edithachathon";
import Favhackathon from "./favhackathon";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar1></Navbar1>
        <div className="container">
          <Routes>
            {/* <Route exact path="/" element={<Home />} /> */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/submission" element={<Submission />} />
            <Route
              exact
              path="/hackathons/:id"
              element={<HackathonDetails />}
            />
            {/* <Route exact path="/edit/:id" element={<EditHackathon />} /> */}
            <Route path="/edit/:id" element={<EditHackathon />} />
            <Route path="/favourite/" element={<Favhackathon />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
