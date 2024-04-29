import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../api";

const registerSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

function RegisterForm({ route }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={{
        username: "",
        first_name: "",
        last_name: "",
        password: "",
      }}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const res = await api.post(route, values);
          navigate("/");
        } catch (error) {
          alert(error);
          setSubmitting(false);
        } finally {
          setLoading(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="register-form-container" autoComplete="off">
          <div className="register-fs-ls">
            <div className="register-form-field">
              <Field className='input-field' type="text" name="first_name" placeholder='first name'/>
              <ErrorMessage className='register-form-err' name="first_name" component="p" />
            </div>

            <div className="register-form-field">
              <Field type="text" name="last_name" placeholder='last name'/>
              <ErrorMessage className='register-form-err' name="last_name" component="p" />
            </div>
          </div>

          <div className="login-form-field">
            <Field type="text" name="username" placeholder='username'/>
            <ErrorMessage className='register-form-err' name="username" component="p" />
          </div>

          <div className="register-form-field">
            <Field type="password" name="password" placeholder='password'/>
            <ErrorMessage className='register-form-err' name="password" component="p" />
          </div>

          <button className='register-form-btn' type="submit" disabled={isSubmitting}>
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
