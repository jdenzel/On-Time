import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import '../styles/login.css'
import logo from '../assets/logo.png'

function Login() {
  return (
    <div className="login-page">
        <div className='login-body'>
            <div className='login-container'>
                <div className="login-img-title">
                    <img src={logo} alt='logo'/>
                    <h1>Welcome!</h1>
                </div>
            <LoginForm route="/api/token/" />
            <Link to="/register">Create new account</Link>
            </div>
        </div>
    </div>
  );
}

export default Login;
