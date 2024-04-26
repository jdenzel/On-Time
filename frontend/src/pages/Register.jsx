import RegisterForm from '../components/RegisterForm'
import '../styles/register.css'
import { Link } from 'react-router-dom'

function Register() {
    return (
        <div>
            <RegisterForm route='/api/user/register/'/>
            <Link to='/login'>Have an account?</Link>
        </div>
    )
}

export default Register