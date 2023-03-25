import Popup from "./popup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const main_popup = () => {
  return (
    <Router>
      <Routes>
        <Route path="/popup" component={Popup}></Route>
      </Routes>
    </Router>
  );
};

export default main_popup;
