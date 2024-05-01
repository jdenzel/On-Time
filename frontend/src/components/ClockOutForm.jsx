import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setClockedOut } from "../redux/slice";
import api from "../api";

function ClockOutForm({ date }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formValues.formData);
  const clockedIn = useSelector((state) => state.clockStatus.clockedIn);

  useEffect(() => {
    if (!clockedIn) {
      navigate("/clockin/");
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
        navigate("/clockin/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="cout-info">
      <div className="date">
        <i class="material-icons">calendar_today </i>
        <div className="date-info"> {date.toLocaleDateString()}</div>
      </div>
      <div className="time">
        <i className="material-icons">schedule </i>
        <div className="time-info"> {date.toLocaleTimeString()}</div>
      </div>
      <div className="cout-form-location">
        <div className="lo-ic">
        <i className="material-icons">location_on </i>
        </div>
        <div className="form-location-1">{formData.location}</div>
      </div>
      <div className="cout-form-role">
        <div className="ro-ic">
        <i className="material-icons">person </i>
        </div>
        <div className="form-role-1">{formData.role}</div>
      </div>
      <button className="cout-form-btn " onClick={handleClockOut}>Clock Out</button>
    </div>
  );
}

export default ClockOutForm;
