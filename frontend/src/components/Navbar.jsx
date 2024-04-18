import { Link, useNavigate } from 'react-router-dom'

function NavBar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/login')
        localStorage.clear()
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