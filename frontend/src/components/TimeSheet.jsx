import { useEffect, useState } from "react";
import api from "../api";

function TimeSheet({ user, timeClocks }) {
    // const [timeSheet, setTimeSheet] = useState([]);
    
    // useEffect(() => {
    //     api.get('/api/timesheet/')
    //         .then(r => {
    //             setTimeSheet(r.data);
    //         })
    //         .catch(error => {
    //             console.log('An error occurred', error)
    //         })
    // }, [])

    // console.log(timeClocks)


    return (
        <div>
            <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Clock in Time</th>
                    <th>Clock out Time</th>
                    <th>Location</th>
                    <th>Role</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {timeClocks.map(timeClock => (
                    <tr key={timeClock.id}>
                        <td>{user.first_name} {user.last_name}</td>
                        <td>{timeClock.date}</td>
                        <td>{timeClock.clock_in_time}</td>
                        <td>{timeClock.clock_out_time}</td>
                        <td>{timeClock.location}</td>
                        <td>{timeClock.role}</td>
                        <td>{Math.floor(timeClock.time_worked / 60)} hrs {timeClock.time_worked % 60} mins</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}

export default TimeSheet;