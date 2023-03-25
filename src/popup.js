// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "./usefetch";
import { useNavigate } from "react-router-dom";
const Popup = (props) => {
  const { id } = useParams();
  const { data: hackathons } = useFetch(
    "http://localhost:8000/hackathons/" + id
  );
  const navigate = useNavigate();

  const handleClick = () => {
    fetch("http://localhost:8000/hackathons/" + hackathons.id, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
    });
  };
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <h2>Delete model</h2>
        <p>
          This action is irreversible. Are you sure you want to delete this
          model?
        </p>
        <button onClick={() => props.setTrigger(false)}>cancel</button>
        <button onClick={handleClick}>delete</button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
