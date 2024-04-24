import { useEffect, useState } from "react";
import api from "../api";

function TimeSheet({ user }) {
    const [timeClocks, setTimeClocks] = useState([]);
    
    useEffect(() => {
        api.get('/api/timesheet/')
            .then(r => {
                setTimeClocks(r.data);
            })
            .catch(error => {
                console.log('An error occurred', error)
            })
    }, [])

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
                        <td>{timeClock.time_worked}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}

export default TimeSheet;