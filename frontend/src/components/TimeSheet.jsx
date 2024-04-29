import Table from 'react-bootstrap/Table'
import '../styles/timesheet.css'

function TimeSheet({ timeClocks }) {
    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <div className='ts-log'>
            <Table striped bordered hover responsive='sm md lg xl' >
            <thead className='ts-log-head'>
                <tr>
                    <th>Name</th>
                    <th style={{maxWidth: '100px'}}>Date</th>
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
        </Table>
        </div>
    )
}

export default TimeSheet;