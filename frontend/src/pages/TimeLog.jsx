import TimeSheet from "../components/TimeSheet"
import { useState, useEffect } from "react";
import api from "../api";

function TimeLog() {
    const [timeSheetData, setTimeSheetData] = useState([]);

    useEffect(() => {
        api.get('/api/timesheet/')
            .then(r => {
                setTimeSheetData(r.data)
            })
            .catch(error => {
                console.log('An error occurred', error)
            })
    }, [])

    return (
        
        <div>
            {timeSheetData && <h3>Time worked: {timeSheetData.total_time_worked} </h3>}
            {timeSheetData && timeSheetData.timeClocks && <TimeSheet timeClocks={timeSheetData.timeClocks} />}
        </div>
    )
}

export default TimeLog