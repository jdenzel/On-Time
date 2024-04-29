import TimeSheet from "../components/TimeSheet";
import { useState, useEffect } from "react";
import api from "../api";
import "../styles/timesheet.css";

function TimeLog() {
  const [timeSheetData, setTimeSheetData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    api
      .get("/api/timesheet/")
      .then((r) => {
        setTimeSheetData(r.data);
      })
      .catch((error) => {
        console.log("An error occurred", error);
      });
  }, []);

  return (
    <div className="ts-page">
      <div className="ts-container">
        {timeSheetData && (
          <h3>Time worked: {timeSheetData.total_time_worked} </h3>
        )}
        <div className="ts-log-container">
          {timeSheetData && timeSheetData.timeClocks && (
            <TimeSheet timeClocks={timeSheetData.timeClocks} />
          )}
        </div>
      </div>
    </div>
  );
}

export default TimeLog;
