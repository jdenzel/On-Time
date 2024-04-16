import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
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
        username: '',
        first_name: '',
        last_name: '',
        password: '',
      }}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const res = await api.post(route, values);
          console.log(res.data);
        //   localStorage.setItem(ACCESS_TOKEN, res.data.access);
        //   localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
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
        <Form>
          <h4>Username:</h4>
          <Field type="text" name="username" />
          <ErrorMessage name="username" component="p" />

          <h4>First Name:</h4>
          <Field type="text" name="first_name" />
          <ErrorMessage name="first_name" component="p" />

          <h4>Last Name:</h4>
          <Field type="text" name="last_name" />
          <ErrorMessage name="last_name" component="p" />

          <h4>Password:</h4>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="p" />

          <button type="submit" disabled={isSubmitting}>
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
