import LoginForm from '../components/LoginForm'
import { Link } from 'react-router-dom'


function Login() {
    return (
        <div>
        <LoginForm route='/api/token/'/>
        <Link to='/register'>Create new account</Link>
        </div>
    )
}

export default Login