import RegisterForm from '../components/RegisterForm'
import '../styles/register.css'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function Register() {
    return (
    //   <div>
    //     <RegisterForm route="/api/user/register/" />
    //     <Link to="/login">Have an account?</Link>
    //   </div>

      <div className="register-page">
      <div className='register-body'>
          <div className='register-container'>
              <div className="register-img-title">
                  <img src={logo} alt='logo'/>
                  <h1>Register!</h1>
              </div>
          <RegisterForm route="/api/user/register/" />
          <Link to="/login">Have an account?</Link>
          </div>
      </div>
      </div>
    );
}

export default Register