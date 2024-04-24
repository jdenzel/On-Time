import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setClockedOut } from "../redux/slice";
import api from "../api";

function Clockout({ date }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formValues.formData);
  const clockedIn = useSelector((state) => state.clockStatus.clockedIn);

  useEffect(() => {
    if (!clockedIn) {
      navigate("/clockin");
    }
  }, [clockedIn, navigate]);

  const handleClockOut = () => {
    const form = {
      clock_out_time: date.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    api
      .patch(`api/clockout/${formData.id}/`, form)
      .then((response) => {
        console.log(response);
        dispatch(setClockedOut());
        navigate("clockin/");
      })
      .catch((error) => {
        console.log(error);
      });

    return (
      <div>
        <h3>Date: {date.toLocaleDateString()}</h3>
        <h3>Location: {formData.location}</h3>
        <h3>Role: {formData.role}</h3>
        <h3>Clocking out at: {date.toLocaleTimeString()}</h3>
        <button onClick={handleClockOut}>Clock Out</button>
      </div>
    );
  };
}

export default Clockout;
