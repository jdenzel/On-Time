import { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from '../api'
import '../styles/login.css'

const loginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
})

function LoginForm({ route }) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    return (
        <Formik initialValues={{
            username: '',
            password: ''
        }}
        validationSchema={loginSchema}
        onSubmit={async (values, {setSubmitting}) => {
            try {
                const res = await api.post(route, values)
              localStorage.setItem(ACCESS_TOKEN, res.data.access);
              localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
              api.get('/api/user/')
                  .then((res) => res.data)
                  .then((data) => {
                    localStorage.setItem('user', JSON.stringify(data));
                  })
                  .catch((err) => console.log(err));
              navigate("/");
            } catch (error) {
                console.log(values)
              alert(error);
              setSubmitting(false)
            } finally {
              setLoading(false);
            }
        }}>
            {({ isSubmitting }) => (
                <Form className='login-form-container'>
                    <div className="login-form-field">
                        <Field type="text" name="username" placeholder="username"/>
                        <ErrorMessage className='login-form-err' name="username" component="p"/> 
                    </div>
                    <div className="login-form-field">
                        <Field type="password" name="password" placeholder="password"/>
                        <ErrorMessage className='login-form-err' name="password" component="p"/>
                    </div>
                    
                    <button className='login-form-btn' type='submit' disabled={isSubmitting}>Login</button>
                </Form>
            )}
        </Formik>

    )
}

export default LoginForm