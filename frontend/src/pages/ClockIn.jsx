import ClockInForm from "../components/ClockInForm";
import "../styles/timeclock.css";

function ClockIn({ date }) {
  return (
    <div className="clock-page">
      <div className="clock-container">
        <div className="clock-box">
          <div className="cin-form-info">
            <div className="cin-form-dt">
              <div className="date">
                <i class="material-icons">calendar_today </i>
                <div className="date-info"> {date.toLocaleDateString()}</div>
              </div>
              <div className="time">
                <i className="material-icons">schedule </i>
                <div className="time-info"> {date.toLocaleTimeString()}</div>
              </div>
            </div>
            <ClockInForm date={date} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClockIn;
