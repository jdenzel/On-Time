import { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from '../api'

const loginSchema = Yup.object().shape({
    username: Yup.string().required('Username Required'),
    password: Yup.string().required('Password Required'),
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
                <Form>
                    <h4>Username:</h4>
                    <Field type="text" name="username"/>
                    <ErrorMessage name="username" component="p"/> 
                    
                    <h4>Password:</h4>
                    <Field type="password" name="password"/>
                    <ErrorMessage name="password" component="p"/>

                    <button type='submit' disabled={isSubmitting}>Log In</button>
                </Form>
            )}
        </Formik>

    )
}

export default LoginForm