import { Link, useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN } from '../constants'

function NavBar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/login')
        localStorage.clear()
    }

    const loggedIn = !!localStorage.getItem(ACCESS_TOKEN)

    if(!loggedIn) {
        return null;
    }
    return (
        <div>
            <nav>
                <Link to='/'>Home</Link>
            </nav>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )

}

export default NavBar