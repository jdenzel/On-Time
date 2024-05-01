import ClockOutForm from "../components/ClockOutForm";
import '../styles/timeclock.css'

function ClockOut({ date }) {
  return (
    <div className="clock-page">
      <div className="clock-container">
      <div className="clock-box">
        <ClockOutForm date={date} />
        </div>
      </div>
    </div>
  );
}

export default ClockOut;
